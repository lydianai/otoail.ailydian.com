// ============================================
// TÜRK OTO AI - Vehicle Management Service
// Multi-Vehicle CRUD & Management System
// ============================================

import type { Vehicle, FuelType, TransmissionType } from '@/types';

// ==================== Types ====================
interface VehicleInput {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  engineSize?: number;
  color?: string;
  purchaseDate?: Date;
  mileage?: number;
}

interface VehicleStats {
  totalDistance: number;
  averageFuelConsumption: number;
  totalTrips: number;
  totalDrivingTime: number; // seconds
  co2Emissions: number; // kg
}

interface VehicleServiceConfig {
  userId?: string;
  debug?: boolean;
}

// ==================== Vehicle Service ====================
export class VehicleService {
  private config: Required<VehicleServiceConfig>;
  private vehicles: Map<string, Vehicle> = new Map();
  private activeVehicleId: string | null = null;

  constructor(config: VehicleServiceConfig = {}) {
    this.config = {
      userId: config.userId || 'default-user',
      debug: config.debug ?? false,
    };

    // Load vehicles from localStorage on client-side
    if (typeof window !== 'undefined') {
      this.loadVehiclesFromStorage();
    }
  }

  // ==================== CRUD Operations ====================

  /**
   * Create a new vehicle
   */
  async createVehicle(input: VehicleInput): Promise<Vehicle> {
    this.log('Creating vehicle:', input);

    // Validate input
    this.validateVehicleInput(input);

    // Check for duplicate license plate
    const existingVehicle = Array.from(this.vehicles.values()).find(
      v => v.licensePlate === input.licensePlate
    );

    if (existingVehicle) {
      throw new Error(`Araç plakası ${input.licensePlate} zaten kayıtlı`);
    }

    // Generate unique ID
    const id = this.generateVehicleId();

    // Create vehicle object
    const vehicle: Vehicle = {
      id,
      userId: this.config.userId,
      make: input.make.trim(),
      model: input.model.trim(),
      year: input.year,
      licensePlate: input.licensePlate.toUpperCase().trim(),
      vin: input.vin?.trim(),
      fuelType: input.fuelType,
      transmission: input.transmission,
      engineSize: input.engineSize,
      color: input.color,
      purchaseDate: input.purchaseDate,
      mileage: input.mileage || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: this.vehicles.size === 0, // First vehicle is active by default
      obdData: [],
    };

    // Save to memory
    this.vehicles.set(id, vehicle);

    // If this is the first vehicle, set it as active
    if (this.vehicles.size === 1) {
      this.activeVehicleId = id;
    }

    // Persist to storage
    this.saveVehiclesToStorage();

    this.log('Vehicle created:', vehicle);
    return vehicle;
  }

  /**
   * Get vehicle by ID
   */
  async getVehicle(id: string): Promise<Vehicle | null> {
    const vehicle = this.vehicles.get(id);
    return vehicle || null;
  }

  /**
   * Get all vehicles for current user
   */
  async getAllVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values())
      .filter(v => v.userId === this.config.userId)
      .sort((a, b) => {
        // Active vehicle first
        if (a.isActive && !b.isActive) return -1;
        if (!a.isActive && b.isActive) return 1;
        // Then by creation date
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }

  /**
   * Update vehicle
   */
  async updateVehicle(id: string, updates: Partial<VehicleInput>): Promise<Vehicle> {
    const vehicle = this.vehicles.get(id);

    if (!vehicle) {
      throw new Error('Araç bulunamadı');
    }

    // Check if updating license plate to existing one
    if (updates.licensePlate && updates.licensePlate !== vehicle.licensePlate) {
      const existingVehicle = Array.from(this.vehicles.values()).find(
        v => v.id !== id && v.licensePlate === updates.licensePlate
      );

      if (existingVehicle) {
        throw new Error(`Araç plakası ${updates.licensePlate} zaten kayıtlı`);
      }
    }

    // Update vehicle
    const updatedVehicle: Vehicle = {
      ...vehicle,
      ...updates,
      licensePlate: updates.licensePlate?.toUpperCase().trim() || vehicle.licensePlate,
      updatedAt: new Date(),
    };

    this.vehicles.set(id, updatedVehicle);
    this.saveVehiclesToStorage();

    this.log('Vehicle updated:', updatedVehicle);
    return updatedVehicle;
  }

  /**
   * Delete vehicle
   */
  async deleteVehicle(id: string): Promise<void> {
    const vehicle = this.vehicles.get(id);

    if (!vehicle) {
      throw new Error('Araç bulunamadı');
    }

    // If deleting active vehicle, switch to another
    if (vehicle.isActive && this.vehicles.size > 1) {
      const otherVehicle = Array.from(this.vehicles.values()).find(v => v.id !== id);
      if (otherVehicle) {
        await this.setActiveVehicle(otherVehicle.id);
      }
    }

    this.vehicles.delete(id);
    this.saveVehiclesToStorage();

    this.log('Vehicle deleted:', id);
  }

  // ==================== Active Vehicle Management ====================

  /**
   * Get active vehicle
   */
  async getActiveVehicle(): Promise<Vehicle | null> {
    if (!this.activeVehicleId) {
      // Try to find any active vehicle
      const activeVehicle = Array.from(this.vehicles.values()).find(v => v.isActive);
      if (activeVehicle) {
        this.activeVehicleId = activeVehicle.id;
        return activeVehicle;
      }
      return null;
    }

    return this.vehicles.get(this.activeVehicleId) || null;
  }

  /**
   * Set active vehicle
   */
  async setActiveVehicle(id: string): Promise<void> {
    const vehicle = this.vehicles.get(id);

    if (!vehicle) {
      throw new Error('Araç bulunamadı');
    }

    // Deactivate all vehicles
    this.vehicles.forEach(v => {
      v.isActive = false;
    });

    // Activate selected vehicle
    vehicle.isActive = true;
    this.activeVehicleId = id;

    this.saveVehiclesToStorage();
    this.log('Active vehicle set:', vehicle);
  }

  // ==================== Vehicle Statistics ====================

  /**
   * Get vehicle statistics
   */
  async getVehicleStats(id: string): Promise<VehicleStats> {
    const vehicle = this.vehicles.get(id);

    if (!vehicle) {
      throw new Error('Araç bulunamadı');
    }

    // Calculate stats from OBD data
    const obdData = vehicle.obdData || [];

    // Total distance (from mileage or OBD)
    const totalDistance = vehicle.mileage || 0;

    // Average fuel consumption (L/100km)
    const fuelConsumptions = obdData
      .map(d => d.fuelLevel)
      .filter((f): f is number => f !== undefined && f > 0);

    const averageFuelConsumption = fuelConsumptions.length > 0
      ? fuelConsumptions.reduce((a, b) => a + b, 0) / fuelConsumptions.length
      : 0;

    // Total trips (simplified - would be from trip data)
    const totalTrips = Math.floor(totalDistance / 50); // Assume 50km per trip

    // Total driving time (simplified - would be from trip data)
    const totalDrivingTime = totalTrips * 3600; // Assume 1 hour per trip

    // CO2 emissions calculation (simplified)
    const co2PerLiter = 2.31; // kg CO2 per liter of gasoline
    const co2Emissions = (totalDistance / 100) * averageFuelConsumption * co2PerLiter;

    return {
      totalDistance,
      averageFuelConsumption,
      totalTrips,
      totalDrivingTime,
      co2Emissions,
    };
  }

  /**
   * Update vehicle mileage
   */
  async updateMileage(id: string, mileage: number): Promise<void> {
    const vehicle = this.vehicles.get(id);

    if (!vehicle) {
      throw new Error('Araç bulunamadı');
    }

    if (mileage < (vehicle.mileage || 0)) {
      throw new Error('Kilometre geri alınamaz');
    }

    vehicle.mileage = mileage;
    vehicle.updatedAt = new Date();

    this.vehicles.set(id, vehicle);
    this.saveVehiclesToStorage();

    this.log('Mileage updated:', mileage);
  }

  // ==================== Vehicle Search & Filter ====================

  /**
   * Search vehicles by keyword
   */
  async searchVehicles(keyword: string): Promise<Vehicle[]> {
    const lowerKeyword = keyword.toLowerCase().trim();

    return Array.from(this.vehicles.values())
      .filter(v =>
        v.userId === this.config.userId &&
        (
          v.make.toLowerCase().includes(lowerKeyword) ||
          v.model.toLowerCase().includes(lowerKeyword) ||
          v.licensePlate.toLowerCase().includes(lowerKeyword) ||
          v.vin?.toLowerCase().includes(lowerKeyword)
        )
      );
  }

  /**
   * Filter vehicles by fuel type
   */
  async filterByFuelType(fuelType: FuelType): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values())
      .filter(v => v.userId === this.config.userId && v.fuelType === fuelType);
  }

  /**
   * Filter vehicles by year range
   */
  async filterByYearRange(minYear: number, maxYear: number): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values())
      .filter(v =>
        v.userId === this.config.userId &&
        v.year >= minYear &&
        v.year <= maxYear
      );
  }

  // ==================== Storage Management ====================

  /**
   * Load vehicles from localStorage
   */
  private loadVehiclesFromStorage(): void {
    try {
      const stored = localStorage.getItem('turk-oto-vehicles');
      if (stored) {
        const data = JSON.parse(stored);

        // Convert dates back to Date objects
        data.forEach((vehicle: any) => {
          vehicle.createdAt = new Date(vehicle.createdAt);
          vehicle.updatedAt = new Date(vehicle.updatedAt);
          if (vehicle.purchaseDate) {
            vehicle.purchaseDate = new Date(vehicle.purchaseDate);
          }

          // Convert OBD data timestamps
          if (vehicle.obdData && Array.isArray(vehicle.obdData)) {
            vehicle.obdData = vehicle.obdData.map((obd: any) => ({
              ...obd,
              timestamp: new Date(obd.timestamp),
            }));
          }

          this.vehicles.set(vehicle.id, vehicle);

          if (vehicle.isActive) {
            this.activeVehicleId = vehicle.id;
          }
        });

        this.log(`Loaded ${this.vehicles.size} vehicles from storage`);
      }
    } catch (error) {
      this.log('Error loading vehicles from storage:', error);
    }
  }

  /**
   * Save vehicles to localStorage
   */
  private saveVehiclesToStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const data = Array.from(this.vehicles.values());
      localStorage.setItem('turk-oto-vehicles', JSON.stringify(data));
      this.log(`Saved ${data.length} vehicles to storage`);
    } catch (error) {
      this.log('Error saving vehicles to storage:', error);
    }
  }

  /**
   * Clear all vehicles from storage
   */
  async clearAllVehicles(): Promise<void> {
    this.vehicles.clear();
    this.activeVehicleId = null;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('turk-oto-vehicles');
    }

    this.log('All vehicles cleared');
  }

  // ==================== Validation ====================

  /**
   * Validate vehicle input
   */
  private validateVehicleInput(input: VehicleInput): void {
    if (!input.make || input.make.trim().length === 0) {
      throw new Error('Marka girilmelidir');
    }

    if (!input.model || input.model.trim().length === 0) {
      throw new Error('Model girilmelidir');
    }

    if (!input.year || input.year < 1900 || input.year > new Date().getFullYear() + 1) {
      throw new Error('Geçerli bir yıl girilmelidir');
    }

    if (!input.licensePlate || input.licensePlate.trim().length === 0) {
      throw new Error('Plaka girilmelidir');
    }

    // Turkish license plate format validation (e.g., 34 ABC 123)
    const plateRegex = /^[0-9]{2}\s?[A-Z]{1,3}\s?[0-9]{1,4}$/i;
    if (!plateRegex.test(input.licensePlate)) {
      throw new Error('Geçersiz plaka formatı (örn: 34 ABC 123)');
    }

    if (input.engineSize && (input.engineSize < 0.5 || input.engineSize > 10)) {
      throw new Error('Motor hacmi 0.5 ile 10.0 arasında olmalıdır');
    }

    if (input.mileage && input.mileage < 0) {
      throw new Error('Kilometre negatif olamaz');
    }
  }

  /**
   * Generate unique vehicle ID
   */
  private generateVehicleId(): string {
    return `vehicle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ==================== Utility Methods ====================

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[Vehicle Service]', ...args);
    }
  }

  // ==================== Public Getters ====================

  getVehicleCount(): number {
    return Array.from(this.vehicles.values())
      .filter(v => v.userId === this.config.userId)
      .length;
  }

  hasVehicles(): boolean {
    return this.getVehicleCount() > 0;
  }
}

// ==================== Singleton Instance ====================
let vehicleServiceInstance: VehicleService | null = null;

export function getVehicleService(config?: VehicleServiceConfig): VehicleService {
  if (!vehicleServiceInstance) {
    vehicleServiceInstance = new VehicleService(config);
  }
  return vehicleServiceInstance;
}

// ==================== Helper Functions ====================

/**
 * Format license plate for display
 */
export function formatLicensePlate(plate: string): string {
  // Remove all spaces
  const cleaned = plate.replace(/\s/g, '');

  // Turkish format: 34 ABC 123
  const match = cleaned.match(/^([0-9]{2})([A-Z]{1,3})([0-9]{1,4})$/i);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`.toUpperCase();
  }

  return plate.toUpperCase();
}

/**
 * Get vehicle age
 */
export function getVehicleAge(year: number): number {
  return new Date().getFullYear() - year;
}

/**
 * Get fuel type display name
 */
export function getFuelTypeDisplay(fuelType: FuelType): string {
  const names: Record<FuelType, string> = {
    gasoline: 'Benzin',
    diesel: 'Dizel',
    electric: 'Elektrik',
    hybrid: 'Hibrit',
    lpg: 'LPG',
  };
  return names[fuelType] || fuelType;
}

/**
 * Get transmission display name
 */
export function getTransmissionDisplay(transmission: TransmissionType): string {
  const names: Record<TransmissionType, string> = {
    manual: 'Manuel',
    automatic: 'Otomatik',
    cvt: 'CVT',
  };
  return names[transmission] || transmission;
}

/**
 * Format mileage for display
 */
export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString('tr-TR')} km`;
}

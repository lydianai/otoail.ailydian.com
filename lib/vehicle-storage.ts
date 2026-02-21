// ============================================
// TÜRK OTO AI - Vehicle Data Storage Service
// Persistent storage for OBD data and vehicle info
// ============================================

import type { OBDData } from '@/types';

interface StoredVehicleData {
  vehicleId: string;
  vehicleName: string;
  lastConnected: string;
  obdHistory: OBDData[];
  deviceInfo: {
    deviceName: string | null;
    deviceId: string | null;
    lastPaired: string;
  };
  statistics: {
    totalTrips: number;
    totalDistance: number;
    averageSpeed: number;
    averageFuelEfficiency: number;
  };
}

interface TripData {
  id: string;
  startTime: string;
  endTime: string;
  distance: number;
  averageSpeed: number;
  maxSpeed: number;
  fuelUsed: number;
  obdData: OBDData[];
}

const STORAGE_KEYS = {
  CURRENT_VEHICLE: 'turk_oto_ai_current_vehicle',
  VEHICLES: 'turk_oto_ai_vehicles',
  TRIPS: 'turk_oto_ai_trips',
  SETTINGS: 'turk_oto_ai_settings',
} as const;

const MAX_HISTORY_ITEMS = 1000; // Maximum OBD data points to store
const MAX_TRIPS = 100; // Maximum trips to store

/**
 * Vehicle Storage Service
 * Manages persistent storage for vehicle data using localStorage/IndexedDB
 */
export class VehicleStorageService {
  private static instance: VehicleStorageService | null = null;

  private constructor() {
    // Initialize IndexedDB if available
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      this.initIndexedDB();
    }
  }

  static getInstance(): VehicleStorageService {
    if (!VehicleStorageService.instance) {
      VehicleStorageService.instance = new VehicleStorageService();
    }
    return VehicleStorageService.instance;
  }

  /**
   * Initialize IndexedDB for large data storage
   */
  private async initIndexedDB(): Promise<void> {
    try {
      const request = indexedDB.open('TurkOtoAI', 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('vehicles')) {
          db.createObjectStore('vehicles', { keyPath: 'vehicleId' });
        }

        if (!db.objectStoreNames.contains('trips')) {
          const tripStore = db.createObjectStore('trips', { keyPath: 'id' });
          tripStore.createIndex('vehicleId', 'vehicleId', { unique: false });
        }

        if (!db.objectStoreNames.contains('obdHistory')) {
          const obdStore = db.createObjectStore('obdHistory', { keyPath: 'timestamp' });
          obdStore.createIndex('vehicleId', 'vehicleId', { unique: false });
        }
      };

      request.onsuccess = () => {
        console.log('[VehicleStorage] IndexedDB initialized');
      };

      request.onerror = () => {
        console.error('[VehicleStorage] IndexedDB initialization failed');
      };
    } catch (error) {
      console.error('[VehicleStorage] IndexedDB not available:', error);
    }
  }

  /**
   * Save OBD data point
   */
  async saveOBDData(data: OBDData): Promise<void> {
    try {
      const currentVehicle = this.getCurrentVehicle();
      if (!currentVehicle) {
        console.warn('[VehicleStorage] No current vehicle set');
        return;
      }

      // Save to IndexedDB if available
      if (typeof window !== 'undefined' && 'indexedDB' in window) {
        await this.saveToIndexedDB('obdHistory', {
          ...data,
          vehicleId: currentVehicle.vehicleId,
        });
      }

      // Also save recent data to localStorage for quick access
      const recentData = this.getRecentOBDData();
      recentData.push(data);

      // Keep only last 100 items in localStorage
      if (recentData.length > 100) {
        recentData.shift();
      }

      localStorage.setItem(
        `${STORAGE_KEYS.CURRENT_VEHICLE}_recent_obd`,
        JSON.stringify(recentData)
      );
    } catch (error) {
      console.error('[VehicleStorage] Failed to save OBD data:', error);
    }
  }

  /**
   * Get recent OBD data from localStorage
   */
  getRecentOBDData(): OBDData[] {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.CURRENT_VEHICLE}_recent_obd`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[VehicleStorage] Failed to get recent OBD data:', error);
      return [];
    }
  }

  /**
   * Get current vehicle
   */
  getCurrentVehicle(): StoredVehicleData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_VEHICLE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('[VehicleStorage] Failed to get current vehicle:', error);
      return null;
    }
  }

  /**
   * Set current vehicle
   */
  setCurrentVehicle(vehicle: StoredVehicleData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_VEHICLE, JSON.stringify(vehicle));
    } catch (error) {
      console.error('[VehicleStorage] Failed to set current vehicle:', error);
    }
  }

  /**
   * Get all vehicles
   */
  getAllVehicles(): StoredVehicleData[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VEHICLES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[VehicleStorage] Failed to get all vehicles:', error);
      return [];
    }
  }

  /**
   * Add or update vehicle
   */
  saveVehicle(vehicle: StoredVehicleData): void {
    try {
      const vehicles = this.getAllVehicles();
      const index = vehicles.findIndex((v) => v.vehicleId === vehicle.vehicleId);

      if (index >= 0) {
        vehicles[index] = vehicle;
      } else {
        vehicles.push(vehicle);
      }

      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));

      // Also update current vehicle if it's the same
      const current = this.getCurrentVehicle();
      if (current && current.vehicleId === vehicle.vehicleId) {
        this.setCurrentVehicle(vehicle);
      }
    } catch (error) {
      console.error('[VehicleStorage] Failed to save vehicle:', error);
    }
  }

  /**
   * Delete vehicle
   */
  deleteVehicle(vehicleId: string): void {
    try {
      const vehicles = this.getAllVehicles();
      const filtered = vehicles.filter((v) => v.vehicleId !== vehicleId);
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(filtered));

      // Clear current vehicle if it's the deleted one
      const current = this.getCurrentVehicle();
      if (current && current.vehicleId === vehicleId) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_VEHICLE);
      }
    } catch (error) {
      console.error('[VehicleStorage] Failed to delete vehicle:', error);
    }
  }

  /**
   * Save trip data
   */
  async saveTrip(trip: TripData): Promise<void> {
    try {
      // Save to IndexedDB if available
      if (typeof window !== 'undefined' && 'indexedDB' in window) {
        await this.saveToIndexedDB('trips', trip);
      }

      // Also save to localStorage for recent trips
      const trips = this.getRecentTrips();
      trips.unshift(trip);

      // Keep only last MAX_TRIPS
      if (trips.length > MAX_TRIPS) {
        trips.pop();
      }

      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
    } catch (error) {
      console.error('[VehicleStorage] Failed to save trip:', error);
    }
  }

  /**
   * Get recent trips
   */
  getRecentTrips(): TripData[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRIPS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[VehicleStorage] Failed to get recent trips:', error);
      return [];
    }
  }

  /**
   * Update device info for current vehicle
   */
  updateDeviceInfo(deviceName: string | null, deviceId: string | null): void {
    const vehicle = this.getCurrentVehicle();
    if (!vehicle) return;

    vehicle.deviceInfo = {
      deviceName,
      deviceId,
      lastPaired: new Date().toISOString(),
    };

    vehicle.lastConnected = new Date().toISOString();

    this.saveVehicle(vehicle);
  }

  /**
   * Update vehicle statistics
   */
  updateStatistics(stats: Partial<StoredVehicleData['statistics']>): void {
    const vehicle = this.getCurrentVehicle();
    if (!vehicle) return;

    vehicle.statistics = {
      ...vehicle.statistics,
      ...stats,
    };

    this.saveVehicle(vehicle);
  }

  /**
   * Clear all data
   */
  clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_VEHICLE);
      localStorage.removeItem(STORAGE_KEYS.VEHICLES);
      localStorage.removeItem(STORAGE_KEYS.TRIPS);
      localStorage.removeItem(`${STORAGE_KEYS.CURRENT_VEHICLE}_recent_obd`);

      // Clear IndexedDB
      if (typeof window !== 'undefined' && 'indexedDB' in window) {
        indexedDB.deleteDatabase('TurkOtoAI');
      }

      console.log('[VehicleStorage] All data cleared');
    } catch (error) {
      console.error('[VehicleStorage] Failed to clear data:', error);
    }
  }

  /**
   * Export data as JSON
   */
  exportData(): string {
    try {
      const data = {
        currentVehicle: this.getCurrentVehicle(),
        vehicles: this.getAllVehicles(),
        trips: this.getRecentTrips(),
        recentOBD: this.getRecentOBDData(),
        exportDate: new Date().toISOString(),
      };

      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('[VehicleStorage] Failed to export data:', error);
      return '{}';
    }
  }

  /**
   * Import data from JSON
   */
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);

      if (data.currentVehicle) {
        this.setCurrentVehicle(data.currentVehicle);
      }

      if (data.vehicles) {
        localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(data.vehicles));
      }

      if (data.trips) {
        localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(data.trips));
      }

      if (data.recentOBD) {
        localStorage.setItem(
          `${STORAGE_KEYS.CURRENT_VEHICLE}_recent_obd`,
          JSON.stringify(data.recentOBD)
        );
      }

      console.log('[VehicleStorage] Data imported successfully');
      return true;
    } catch (error) {
      console.error('[VehicleStorage] Failed to import data:', error);
      return false;
    }
  }

  /**
   * Helper: Save to IndexedDB
   */
  private async saveToIndexedDB(storeName: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('TurkOtoAI', 1);

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        const addRequest = store.put(data);

        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(addRequest.error);
      };

      request.onerror = () => reject(request.error);
    });
  }
}

// Export singleton instance
export const vehicleStorage = VehicleStorageService.getInstance();

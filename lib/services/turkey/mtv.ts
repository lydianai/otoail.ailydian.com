// ============================================
// TÜRK OTO AI - MTV & Traffic Fines Service
// Motor Vehicles Tax & Traffic Violations
// ============================================

export interface MTVInfo {
  year: number;
  amount: number;
  paid: boolean;
  dueDate: Date;
  vehiclePlate: string;
  vehicleType: string;
  engineSize: number;
  lateFee?: number;
}

export interface TrafficFine {
  id: string;
  date: Date;
  location: string;
  violation: string;
  violationType: ViolationType;
  amount: number;
  discountedAmount?: number;
  paid: boolean;
  dueDate: Date;
  vehiclePlate: string;
  hasDiscount: boolean;
}

export enum ViolationType {
  SPEEDING = 'SPEEDING',
  RED_LIGHT = 'RED_LIGHT',
  PARKING = 'PARKING',
  SEAT_BELT = 'SEAT_BELT',
  PHONE_USE = 'PHONE_USE',
  LANE_VIOLATION = 'LANE_VIOLATION',
  NO_INSURANCE = 'NO_INSURANCE',
  EMISSION = 'EMISSION',
  OTHER = 'OTHER',
}

export interface MTVServiceConfig {
  debug?: boolean;
}

// ==================== MTV Service ====================
export class MTVService {
  private config: Required<MTVServiceConfig>;

  constructor(config: MTVServiceConfig = {}) {
    this.config = {
      debug: config.debug ?? false,
    };
  }

  // ==================== MTV Queries ====================

  /**
   * Calculate MTV for a vehicle
   * Based on: engine size, age, type
   * NOTE: This is simplified calculation. Real implementation uses official tables
   */
  calculateMTV(
    engineSize: number, // cc
    year: number,
    vehicleType: 'car' | 'suv' | 'commercial' = 'car'
  ): number {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    // Base rates per cc (simplified)
    let ratePerCC = 0;

    if (age <= 3) {
      ratePerCC = vehicleType === 'commercial' ? 15 : 25;
    } else if (age <= 6) {
      ratePerCC = vehicleType === 'commercial' ? 12 : 20;
    } else if (age <= 11) {
      ratePerCC = vehicleType === 'commercial' ? 10 : 15;
    } else if (age <= 16) {
      ratePerCC = vehicleType === 'commercial' ? 8 : 12;
    } else {
      ratePerCC = vehicleType === 'commercial' ? 5 : 8;
    }

    const baseMTV = engineSize * ratePerCC;

    // Apply coefficient based on engine size brackets
    let coefficient = 1.0;
    if (engineSize > 2000) coefficient = 1.3;
    else if (engineSize > 1600) coefficient = 1.15;
    else if (engineSize > 1300) coefficient = 1.0;
    else coefficient = 0.85;

    return Math.round(baseMTV * coefficient);
  }

  /**
   * Get MTV payment info for vehicle
   */
  async getMTVInfo(vehiclePlate: string, year?: number): Promise<MTVInfo> {
    this.log('Getting MTV info for:', vehiclePlate);

    const currentYear = year || new Date().getFullYear();
    const isPaid = Math.random() > 0.5; // Mock

    // Mock MTV calculation
    const mockInfo: MTVInfo = {
      year: currentYear,
      amount: Math.floor(Math.random() * 3000) + 500, // 500-3500 TL
      paid: isPaid,
      dueDate: new Date(currentYear, 0, 31), // January 31
      vehiclePlate,
      vehicleType: 'Otomobil',
      engineSize: 1600,
      lateFee: isPaid ? undefined : Math.floor(Math.random() * 200) + 50,
    };

    return mockInfo;
  }

  /**
   * Check if MTV payment is overdue
   */
  isMTVOverdue(dueDate: Date): boolean {
    return new Date() > dueDate;
  }

  // ==================== Traffic Fines ====================

  /**
   * Query traffic fines for a vehicle
   */
  async getTrafficFines(vehiclePlate: string): Promise<TrafficFine[]> {
    this.log('Getting traffic fines for:', vehiclePlate);

    // Mock traffic fines
    const mockFines: TrafficFine[] = [
      {
        id: 'fine-1',
        date: new Date(Date.now() - 86400000 * 15), // 15 days ago
        location: 'İstanbul - D-100 Karayolu',
        violation: 'Hız Sınırı Aşımı (20-30 km/h)',
        violationType: ViolationType.SPEEDING,
        amount: 1096,
        discountedAmount: 274, // 25% discount within 15 days
        paid: false,
        dueDate: new Date(Date.now() + 86400000 * 45), // 45 days from now
        vehiclePlate,
        hasDiscount: true,
      },
      {
        id: 'fine-2',
        date: new Date(Date.now() - 86400000 * 45), // 45 days ago
        location: 'Ankara - Eskişehir Yolu',
        violation: 'Kırmızı Işık İhlali',
        violationType: ViolationType.RED_LIGHT,
        amount: 1096,
        discountedAmount: undefined,
        paid: true,
        dueDate: new Date(Date.now() - 86400000 * 15),
        vehiclePlate,
        hasDiscount: false,
      },
    ];

    return mockFines;
  }

  /**
   * Get unpaid traffic fines
   */
  async getUnpaidFines(vehiclePlate: string): Promise<TrafficFine[]> {
    const allFines = await this.getTrafficFines(vehiclePlate);
    return allFines.filter((f) => !f.paid);
  }

  /**
   * Calculate total unpaid fine amount
   */
  async getTotalUnpaidAmount(vehiclePlate: string): Promise<number> {
    const unpaidFines = await this.getUnpaidFines(vehiclePlate);
    return unpaidFines.reduce((sum, fine) => {
      const amount = fine.hasDiscount && fine.discountedAmount
        ? fine.discountedAmount
        : fine.amount;
      return sum + amount;
    }, 0);
  }

  /**
   * Check if fine has early payment discount
   */
  hasEarlyPaymentDiscount(fine: TrafficFine): boolean {
    const daysSinceViolation = Math.floor(
      (new Date().getTime() - fine.date.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceViolation <= 15 && !fine.paid;
  }

  // ==================== Utility Methods ====================

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[MTV Service]', ...args);
    }
  }
}

// ==================== Singleton Instance ====================
let mtvServiceInstance: MTVService | null = null;

export function getMTVService(config?: MTVServiceConfig): MTVService {
  if (!mtvServiceInstance) {
    mtvServiceInstance = new MTVService(config);
  }
  return mtvServiceInstance;
}

// ==================== Helper Functions ====================

/**
 * Get violation type display name
 */
export function getViolationDisplayName(type: ViolationType): string {
  const names: Record<ViolationType, string> = {
    [ViolationType.SPEEDING]: 'Hız Sınırı Aşımı',
    [ViolationType.RED_LIGHT]: 'Kırmızı Işık İhlali',
    [ViolationType.PARKING]: 'Park İhlali',
    [ViolationType.SEAT_BELT]: 'Emniyet Kemeri Takmama',
    [ViolationType.PHONE_USE]: 'Sürüş Sırasında Telefon Kullanımı',
    [ViolationType.LANE_VIOLATION]: 'Şerit İhlali',
    [ViolationType.NO_INSURANCE]: 'Zorunlu Trafik Sigortası Eksikliği',
    [ViolationType.EMISSION]: 'Egzoz Emisyon İhlali',
    [ViolationType.OTHER]: 'Diğer İhlal',
  };
  return names[type] || type;
}

/**
 * Get violation severity level
 */
export function getViolationSeverity(type: ViolationType): 'low' | 'medium' | 'high' {
  const highSeverity = [
    ViolationType.RED_LIGHT,
    ViolationType.NO_INSURANCE,
    ViolationType.SPEEDING,
  ];
  const mediumSeverity = [
    ViolationType.PHONE_USE,
    ViolationType.SEAT_BELT,
    ViolationType.LANE_VIOLATION,
  ];

  if (highSeverity.includes(type)) return 'high';
  if (mediumSeverity.includes(type)) return 'medium';
  return 'low';
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Calculate days until due date
 */
export function getDaysUntilDue(dueDate: Date): number {
  const diffTime = dueDate.getTime() - new Date().getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ============================================
// TÜRK OTO AI - HGS/OGS Service
// Turkish Highway Toll System Integration
// ============================================

export interface HGSBalance {
  balance: number;
  lastUpdate: Date;
  cardNumber: string;
  cardType: 'HGS' | 'OGS';
}

export interface HGSTransaction {
  id: string;
  date: Date;
  location: string;
  direction: string;
  amount: number;
  balance: number;
  vehiclePlate: string;
}

export interface HGSServiceConfig {
  apiKey?: string;
  debug?: boolean;
}

// ==================== HGS Service ====================
export class HGSService {
  private config: Required<HGSServiceConfig>;

  constructor(config: HGSServiceConfig = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.HGS_API_KEY || '',
      debug: config.debug ?? false,
    };
  }

  // ==================== Balance Query ====================

  /**
   * Get HGS/OGS balance
   * NOTE: This is a mock implementation. Real implementation would require:
   * - Official HGS API integration
   * - User authentication
   * - Card number verification
   */
  async getBalance(cardNumber: string): Promise<HGSBalance> {
    this.log('Getting HGS balance for:', cardNumber);

    // Validate card number format (HGS: 16 digits, OGS: 10 digits)
    if (!this.validateCardNumber(cardNumber)) {
      throw new Error('Geçersiz kart numarası formatı');
    }

    // Mock data for demonstration
    // In production, this would call real HGS API
    const mockBalance: HGSBalance = {
      balance: Math.floor(Math.random() * 500) + 50, // 50-550 TL
      lastUpdate: new Date(),
      cardNumber: this.maskCardNumber(cardNumber),
      cardType: cardNumber.length === 16 ? 'HGS' : 'OGS',
    };

    return mockBalance;
  }

  /**
   * Get transaction history
   */
  async getTransactions(
    cardNumber: string,
    startDate: Date,
    endDate: Date
  ): Promise<HGSTransaction[]> {
    this.log('Getting HGS transactions for:', cardNumber);

    // Mock transactions for demonstration
    const mockTransactions: HGSTransaction[] = [
      {
        id: 'txn-1',
        date: new Date(Date.now() - 86400000 * 2), // 2 days ago
        location: 'Fatih Sultan Mehmet Köprüsü',
        direction: 'Avrupa → Asya',
        amount: 48.50,
        balance: 250.00,
        vehiclePlate: '34 ABC 123',
      },
      {
        id: 'txn-2',
        date: new Date(Date.now() - 86400000 * 5), // 5 days ago
        location: 'Osmangazi Köprüsü',
        direction: 'Güney → Kuzey',
        amount: 249.00,
        balance: 298.50,
        vehiclePlate: '34 ABC 123',
      },
      {
        id: 'txn-3',
        date: new Date(Date.now() - 86400000 * 7), // 1 week ago
        location: 'Kuzey Marmara Otoyolu',
        direction: 'İstanbul → Kocaeli',
        amount: 35.75,
        balance: 547.50,
        vehiclePlate: '34 ABC 123',
      },
    ];

    return mockTransactions.filter(
      (t) => t.date >= startDate && t.date <= endDate
    );
  }

  /**
   * Check if balance is low
   */
  isBalanceLow(balance: number, threshold: number = 100): boolean {
    return balance < threshold;
  }

  /**
   * Calculate recommended top-up amount
   */
  getRecommendedTopUp(currentBalance: number, monthlyUsage: number = 200): number {
    const targetBalance = monthlyUsage * 1.5; // 1.5 months buffer
    const topUpAmount = Math.max(0, targetBalance - currentBalance);

    // Round to nearest 50 TL
    return Math.ceil(topUpAmount / 50) * 50;
  }

  // ==================== Validation ====================

  /**
   * Validate HGS/OGS card number format
   */
  private validateCardNumber(cardNumber: string): boolean {
    // Remove spaces and dashes
    const cleaned = cardNumber.replace(/[\s-]/g, '');

    // HGS: 16 digits, OGS: 10 digits
    if (cleaned.length !== 16 && cleaned.length !== 10) {
      return false;
    }

    // Must be all numbers
    return /^\d+$/.test(cleaned);
  }

  /**
   * Mask card number for security (show only last 4 digits)
   */
  private maskCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/[\s-]/g, '');
    const lastFour = cleaned.slice(-4);
    const masked = '*'.repeat(cleaned.length - 4) + lastFour;
    return masked;
  }

  // ==================== Utility Methods ====================

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[HGS Service]', ...args);
    }
  }
}

// ==================== Singleton Instance ====================
let hgsServiceInstance: HGSService | null = null;

export function getHGSService(config?: HGSServiceConfig): HGSService {
  if (!hgsServiceInstance) {
    hgsServiceInstance = new HGSService(config);
  }
  return hgsServiceInstance;
}

// ==================== Helper Functions ====================

/**
 * Format currency for Turkish Lira
 */
export function formatTRY(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
}

/**
 * Get bridge/highway display name
 */
export function getLocationDisplayName(location: string): string {
  const locationMap: Record<string, string> = {
    'fsm': 'Fatih Sultan Mehmet Köprüsü',
    'bogazici': 'Boğaziçi Köprüsü',
    'yavuz': 'Yavuz Sultan Selim Köprüsü',
    'osmangazi': 'Osmangazi Köprüsü',
    'kuzey_marmara': 'Kuzey Marmara Otoyolu',
    'tem': 'TEM Otoyolu',
    'o3': 'O-3 Otoyolu',
  };

  return locationMap[location.toLowerCase()] || location;
}

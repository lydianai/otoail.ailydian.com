// ============================================
// TÜRK OTO AI - EPDK Fuel Prices Service
// Turkish Energy Market Regulatory Authority
// Real-time fuel prices across Turkey
// ============================================

export interface FuelPrice {
  city: string;
  fuelType: 'gasoline' | 'diesel' | 'lpg' | 'electric';
  price: number;
  station: string;
  brand: string;
  lastUpdate: Date;
  priceChange?: number; // Change from previous week
}

export interface FuelPriceComparison {
  fuelType: string;
  averagePrice: number;
  lowestPrice: number;
  highestPrice: number;
  lowestStation: string;
  highestStation: string;
  priceRange: number;
}

export interface FuelPriceServiceConfig {
  apiKey?: string;
  defaultCity?: string;
  debug?: boolean;
}

// ==================== Fuel Prices Service ====================
export class FuelPricesService {
  private config: Required<FuelPriceServiceConfig>;

  constructor(config: FuelPriceServiceConfig = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.EPDK_API_KEY || '',
      defaultCity: config.defaultCity || 'İstanbul',
      debug: config.debug ?? false,
    };
  }

  // ==================== Price Queries ====================

  /**
   * Get current fuel prices for a city
   * NOTE: This is mock data. Real implementation would use EPDK API
   * https://www.epdk.gov.tr/Detay/Icerik/3-0-0-138/akaryakit-fiyatlari
   */
  async getPricesForCity(city: string): Promise<FuelPrice[]> {
    this.log('Getting fuel prices for:', city);

    // Mock data for demonstration
    const baseGasolinePrice = 42.50;
    const baseDieselPrice = 43.20;
    const baseLPGPrice = 22.80;
    const baseElectricPrice = 5.50; // per kWh

    const stations = [
      { brand: 'Opet', variance: 0 },
      { brand: 'Shell', variance: 0.5 },
      { brand: 'BP', variance: 0.3 },
      { brand: 'Petrol Ofisi', variance: -0.2 },
      { brand: 'Total', variance: 0.4 },
      { brand: 'Aytemiz', variance: -0.5 },
      { brand: 'İpragaz', variance: -0.3 },
    ];

    const mockPrices: FuelPrice[] = [];

    stations.forEach((station) => {
      // Gasoline
      mockPrices.push({
        city,
        fuelType: 'gasoline',
        price: baseGasolinePrice + station.variance + (Math.random() - 0.5) * 0.5,
        station: `${station.brand} - ${city} ${['Merkez', 'Kartal', 'Beşiktaş', 'Kadıköy'][Math.floor(Math.random() * 4)]}`,
        brand: station.brand,
        lastUpdate: new Date(),
        priceChange: (Math.random() - 0.5) * 2, // ±1 TL change
      });

      // Diesel
      mockPrices.push({
        city,
        fuelType: 'diesel',
        price: baseDieselPrice + station.variance + (Math.random() - 0.5) * 0.5,
        station: `${station.brand} - ${city} ${['Merkez', 'Kartal', 'Beşiktaş', 'Kadıköy'][Math.floor(Math.random() * 4)]}`,
        brand: station.brand,
        lastUpdate: new Date(),
        priceChange: (Math.random() - 0.5) * 2,
      });

      // LPG
      if (station.brand !== 'Shell' && station.brand !== 'BP') {
        mockPrices.push({
          city,
          fuelType: 'lpg',
          price: baseLPGPrice + station.variance * 0.5 + (Math.random() - 0.5) * 0.3,
          station: `${station.brand} - ${city} ${['Merkez', 'Kartal', 'Beşiktaş'][Math.floor(Math.random() * 3)]}`,
          brand: station.brand,
          lastUpdate: new Date(),
          priceChange: (Math.random() - 0.5) * 1,
        });
      }
    });

    // Electric charging stations
    mockPrices.push(
      {
        city,
        fuelType: 'electric',
        price: baseElectricPrice,
        station: `TOGG Şarj İstasyonu - ${city}`,
        brand: 'TOGG',
        lastUpdate: new Date(),
        priceChange: 0,
      },
      {
        city,
        fuelType: 'electric',
        price: baseElectricPrice + 0.5,
        station: `Eşarj - ${city} AVM`,
        brand: 'Eşarj',
        lastUpdate: new Date(),
        priceChange: 0.2,
      }
    );

    return mockPrices.sort((a, b) => a.price - b.price);
  }

  /**
   * Get cheapest fuel prices in a city
   */
  async getCheapestPrices(
    city: string,
    fuelType: 'gasoline' | 'diesel' | 'lpg' | 'electric'
  ): Promise<FuelPrice[]> {
    const allPrices = await this.getPricesForCity(city);
    return allPrices
      .filter((p) => p.fuelType === fuelType)
      .sort((a, b) => a.price - b.price)
      .slice(0, 5);
  }

  /**
   * Compare fuel prices by type
   */
  async comparePrices(city: string, fuelType: string): Promise<FuelPriceComparison> {
    const prices = await this.getPricesForCity(city);
    const filtered = prices.filter((p) => p.fuelType === fuelType);

    if (filtered.length === 0) {
      throw new Error(`${fuelType} fiyatı bulunamadı`);
    }

    const priceValues = filtered.map((p) => p.price);
    const lowestPrice = Math.min(...priceValues);
    const highestPrice = Math.max(...priceValues);
    const averagePrice = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;

    const lowestStation = filtered.find((p) => p.price === lowestPrice)!.station;
    const highestStation = filtered.find((p) => p.price === highestPrice)!.station;

    return {
      fuelType,
      averagePrice,
      lowestPrice,
      highestPrice,
      lowestStation,
      highestStation,
      priceRange: highestPrice - lowestPrice,
    };
  }

  /**
   * Calculate fuel cost for a trip
   */
  calculateTripCost(
    distance: number, // km
    consumption: number, // L/100km or kWh/100km
    fuelPrice: number // TL/L or TL/kWh
  ): number {
    return (distance / 100) * consumption * fuelPrice;
  }

  /**
   * Find nearby cheap fuel stations (would use geolocation in production)
   */
  async findNearbyStations(
    lat: number,
    lng: number,
    fuelType: string,
    radius: number = 5 // km
  ): Promise<FuelPrice[]> {
    // Mock: In production, this would use geolocation + EPDK API
    const city = this.config.defaultCity;
    const prices = await this.getPricesForCity(city);

    return prices
      .filter((p) => p.fuelType === fuelType)
      .slice(0, 10)
      .map((p) => ({
        ...p,
        // Mock distance
        distance: Math.random() * radius,
      }))
      .sort((a: any, b: any) => a.distance - b.distance) as any;
  }

  // ==================== Utility Methods ====================

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[Fuel Prices Service]', ...args);
    }
  }
}

// ==================== Singleton Instance ====================
let fuelPricesServiceInstance: FuelPricesService | null = null;

export function getFuelPricesService(
  config?: FuelPriceServiceConfig
): FuelPricesService {
  if (!fuelPricesServiceInstance) {
    fuelPricesServiceInstance = new FuelPricesService(config);
  }
  return fuelPricesServiceInstance;
}

// ==================== Helper Functions ====================

/**
 * Get fuel type display name in Turkish
 */
export function getFuelTypeDisplayName(fuelType: string): string {
  const names: Record<string, string> = {
    gasoline: 'Benzin',
    diesel: 'Dizel',
    lpg: 'LPG',
    electric: 'Elektrik',
  };
  return names[fuelType] || fuelType;
}

/**
 * Format fuel price with currency
 */
export function formatFuelPrice(price: number, fuelType: string): string {
  const unit = fuelType === 'electric' ? 'kWh' : 'L';
  return `${price.toFixed(2)} ₺/${unit}`;
}

/**
 * Get price trend indicator
 */
export function getPriceTrend(priceChange: number): {
  direction: 'up' | 'down' | 'stable';
  text: string;
  color: string;
} {
  if (priceChange > 0.1) {
    return { direction: 'up', text: `↑ ${priceChange.toFixed(2)} ₺`, color: '#E74C3C' };
  } else if (priceChange < -0.1) {
    return {
      direction: 'down',
      text: `↓ ${Math.abs(priceChange).toFixed(2)} ₺`,
      color: '#27AE60',
    };
  } else {
    return { direction: 'stable', text: '→ Stabil', color: '#95A5A6' };
  }
}

/**
 * Calculate monthly fuel cost estimate
 */
export function estimateMonthlyFuelCost(
  dailyKm: number,
  consumption: number,
  fuelPrice: number
): number {
  const monthlyKm = dailyKm * 30;
  return (monthlyKm / 100) * consumption * fuelPrice;
}

// ============================================
// TÜRK OTO AI - Predictive Maintenance AI
// Machine Learning-based vehicle health prediction
// ============================================

export enum ComponentType {
  ENGINE = 'ENGINE',
  TRANSMISSION = 'TRANSMISSION',
  BRAKES = 'BRAKES',
  TIRES = 'TIRES',
  BATTERY = 'BATTERY',
  SUSPENSION = 'SUSPENSION',
  EXHAUST = 'EXHAUST',
  COOLANT_SYSTEM = 'COOLANT_SYSTEM',
  FUEL_SYSTEM = 'FUEL_SYSTEM',
  ELECTRICAL = 'ELECTRICAL',
}

export enum SeverityLevel {
  INFO = 'INFO',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum MaintenanceType {
  INSPECTION = 'INSPECTION',
  SERVICE = 'SERVICE',
  REPAIR = 'REPAIR',
  REPLACEMENT = 'REPLACEMENT',
  EMERGENCY = 'EMERGENCY',
}

export interface VehicleHealthData {
  vehicleId: string;
  mileage: number;
  age: number; // years
  lastServiceMileage: number;
  lastServiceDate: Date;

  // OBD-II metrics
  engineRPM: number;
  coolantTemp: number;
  oilPressure: number;
  fuelLevel: number;
  batteryVoltage: number;
  intakeAirTemp: number;
  engineLoad: number;
  throttlePosition: number;

  // Driving patterns
  avgSpeed: number;
  maxSpeed: number;
  hardBraking: number; // events per 100km
  rapidAcceleration: number; // events per 100km
  idlingTime: number; // percentage

  // Environmental
  avgTemperature: number;
  dustyConditions: boolean;
  cityDriving: number; // percentage
}

export interface MaintenancePrediction {
  id: string;
  component: ComponentType;
  severity: SeverityLevel;
  type: MaintenanceType;

  // Prediction
  predictedDaysUntilService: number;
  predictedMileageUntilService: number;
  confidence: number; // 0-100

  // Description
  title: string;
  description: string;
  symptoms: string[];
  recommendations: string[];

  // Cost estimation
  estimatedCost: {
    min: number;
    max: number;
    currency: string;
  };

  // Urgency
  canDeferService: boolean;
  maxDeferralDays?: number;
  riskIfDeferred?: string;
}

export interface HealthReport {
  vehicleId: string;
  timestamp: Date;
  overallHealth: number; // 0-100

  predictions: MaintenancePrediction[];

  componentHealth: Map<ComponentType, {
    health: number; // 0-100
    trend: 'improving' | 'stable' | 'degrading';
    lastChecked: Date;
  }>;

  upcomingMaintenance: {
    immediate: MaintenancePrediction[]; // < 7 days
    soon: MaintenancePrediction[]; // 7-30 days
    future: MaintenancePrediction[]; // 30+ days
  };

  totalEstimatedCost: number;
}

export interface PredictionConfig {
  debug?: boolean;
  conservativeMode?: boolean; // More cautious predictions
  includePreventive?: boolean; // Include preventive maintenance
}

// ==================== Predictive Maintenance Service ====================
export class PredictiveMaintenanceService {
  private config: Required<PredictionConfig>;

  constructor(config: Partial<PredictionConfig> = {}) {
    this.config = {
      debug: config.debug ?? false,
      conservativeMode: config.conservativeMode ?? true,
      includePreventive: config.includePreventive ?? true,
    };
  }

  // ==================== Main Prediction ====================

  /**
   * Analyze vehicle health and predict maintenance needs
   */
  async predictMaintenance(healthData: VehicleHealthData): Promise<HealthReport> {
    this.log('Analyzing vehicle health:', healthData.vehicleId);

    const predictions: MaintenancePrediction[] = [];

    // Analyze each component
    predictions.push(...this.analyzeEngine(healthData));
    predictions.push(...this.analyzeTransmission(healthData));
    predictions.push(...this.analyzeBrakes(healthData));
    predictions.push(...this.analyzeTires(healthData));
    predictions.push(...this.analyzeBattery(healthData));
    predictions.push(...this.analyzeSuspension(healthData));
    predictions.push(...this.analyzeCoolantSystem(healthData));
    predictions.push(...this.analyzeFuelSystem(healthData));

    // Calculate component health
    const componentHealth = this.calculateComponentHealth(healthData);

    // Calculate overall health
    const overallHealth = this.calculateOverallHealth(componentHealth);

    // Categorize by urgency
    const upcomingMaintenance = this.categorizeByUrgency(predictions);

    // Calculate total cost
    const totalEstimatedCost = predictions.reduce(
      (sum, p) => sum + (p.estimatedCost.min + p.estimatedCost.max) / 2,
      0
    );

    return {
      vehicleId: healthData.vehicleId,
      timestamp: new Date(),
      overallHealth,
      predictions,
      componentHealth,
      upcomingMaintenance,
      totalEstimatedCost,
    };
  }

  // ==================== Component Analysis ====================

  /**
   * Analyze engine health
   */
  private analyzeEngine(data: VehicleHealthData): MaintenancePrediction[] {
    const predictions: MaintenancePrediction[] = [];

    // Oil change prediction
    const mileageSinceService = data.mileage - data.lastServiceMileage;
    const oilChangeInterval = data.cityDriving > 70 ? 5000 : 10000; // km

    if (mileageSinceService >= oilChangeInterval * 0.8) {
      const daysUntilService = this.estimateDaysUntil(
        oilChangeInterval - mileageSinceService,
        data.avgSpeed,
        data.cityDriving
      );

      predictions.push({
        id: `pred-${Date.now()}-oil`,
        component: ComponentType.ENGINE,
        severity: mileageSinceService >= oilChangeInterval * 0.95 ? SeverityLevel.HIGH : SeverityLevel.MEDIUM,
        type: MaintenanceType.SERVICE,
        predictedDaysUntilService: Math.max(0, daysUntilService),
        predictedMileageUntilService: Math.max(0, oilChangeInterval - mileageSinceService),
        confidence: 95,
        title: 'Motor Yağı Değişimi',
        description: 'Motor yağınızın değişim zamanı yaklaşıyor',
        symptoms: [
          'Motor sesi artabilir',
          'Performans düşüşü',
          'Yakıt tüketimi artışı',
        ],
        recommendations: [
          'En kısa sürede motor yağını değiştirin',
          'Yağ filtresini de değiştirin',
          'Sentetik yağ kullanımını değerlendirin',
        ],
        estimatedCost: {
          min: 500,
          max: 1200,
          currency: 'TRY',
        },
        canDeferService: daysUntilService > 7,
        maxDeferralDays: 30,
        riskIfDeferred: 'Motor hasarı riski artar',
      });
    }

    // High coolant temperature warning
    if (data.coolantTemp > 95) {
      predictions.push({
        id: `pred-${Date.now()}-coolant`,
        component: ComponentType.COOLANT_SYSTEM,
        severity: data.coolantTemp > 100 ? SeverityLevel.CRITICAL : SeverityLevel.HIGH,
        type: data.coolantTemp > 100 ? MaintenanceType.EMERGENCY : MaintenanceType.INSPECTION,
        predictedDaysUntilService: data.coolantTemp > 100 ? 0 : 3,
        predictedMileageUntilService: 0,
        confidence: 85,
        title: 'Soğutma Sistemi Kontrolü',
        description: 'Motor sıcaklığı normalden yüksek',
        symptoms: [
          'Yüksek motor sıcaklığı',
          'Buhar çıkışı olabilir',
          'Performans kaybı',
        ],
        recommendations: [
          'Hemen servise gidin',
          'Soğutma sıvısı seviyesini kontrol edin',
          'Termostat kontrolü yaptırın',
        ],
        estimatedCost: {
          min: 300,
          max: 2000,
          currency: 'TRY',
        },
        canDeferService: false,
        riskIfDeferred: 'Motor aşırı ısınma ve ciddi hasar riski',
      });
    }

    return predictions;
  }

  /**
   * Analyze transmission health
   */
  private analyzeTransmission(data: VehicleHealthData): MaintenancePrediction[] {
    const predictions: MaintenancePrediction[] = [];

    // Transmission oil change (every 60,000 km or 4 years)
    const mileageSinceService = data.mileage - data.lastServiceMileage;
    const transmissionInterval = 60000;

    if (mileageSinceService >= transmissionInterval * 0.85) {
      predictions.push({
        id: `pred-${Date.now()}-transmission`,
        component: ComponentType.TRANSMISSION,
        severity: SeverityLevel.MEDIUM,
        type: MaintenanceType.SERVICE,
        predictedDaysUntilService: this.estimateDaysUntil(
          transmissionInterval - mileageSinceService,
          data.avgSpeed,
          data.cityDriving
        ),
        predictedMileageUntilService: transmissionInterval - mileageSinceService,
        confidence: 90,
        title: 'Şanzıman Yağı Değişimi',
        description: 'Şanzıman yağı değişim periyodu yaklaşıyor',
        symptoms: [
          'Vites değişiminde gecikme',
          'Ani hızlanmalarda takılma',
          'Anormal sesler',
        ],
        recommendations: [
          'Şanzıman yağını değiştirin',
          'Şanzıman filtresini kontrol edin',
          'Orijinal yağ kullanın',
        ],
        estimatedCost: {
          min: 1500,
          max: 3500,
          currency: 'TRY',
        },
        canDeferService: true,
        maxDeferralDays: 60,
        riskIfDeferred: 'Şanzıman hasarı riski',
      });
    }

    return predictions;
  }

  /**
   * Analyze brake system
   */
  private analyzeBrakes(data: VehicleHealthData): MaintenancePrediction[] {
    const predictions: MaintenancePrediction[] = [];

    // Brake pad wear (hard braking increases wear)
    const hardBrakingFactor = 1 + (data.hardBraking / 10);
    const brakeLifeExpectancy = 40000 / hardBrakingFactor; // km
    const brakeWearPercentage = (data.mileage % brakeLifeExpectancy) / brakeLifeExpectancy;

    if (brakeWearPercentage >= 0.75) {
      predictions.push({
        id: `pred-${Date.now()}-brakes`,
        component: ComponentType.BRAKES,
        severity: brakeWearPercentage >= 0.9 ? SeverityLevel.HIGH : SeverityLevel.MEDIUM,
        type: MaintenanceType.REPLACEMENT,
        predictedDaysUntilService: this.estimateDaysUntil(
          brakeLifeExpectancy * (1 - brakeWearPercentage),
          data.avgSpeed,
          data.cityDriving
        ),
        predictedMileageUntilService: Math.round(brakeLifeExpectancy * (1 - brakeWearPercentage)),
        confidence: 80,
        title: 'Fren Balatası Değişimi',
        description: 'Fren balataları aşınıyor',
        symptoms: [
          'Fren pedalında titreşim',
          'Fren gıcırtısı',
          'Fren mesafesi artışı',
        ],
        recommendations: [
          'Fren balatalarını kontrol ettirin',
          'Fren disklerini inceletin',
          'Fren hidroliğini kontrol ettirin',
        ],
        estimatedCost: {
          min: 800,
          max: 2500,
          currency: 'TRY',
        },
        canDeferService: brakeWearPercentage < 0.85,
        maxDeferralDays: 30,
        riskIfDeferred: 'Fren performansı düşer, kaza riski artar',
      });
    }

    return predictions;
  }

  /**
   * Analyze tire health
   */
  private analyzeTires(data: VehicleHealthData): MaintenancePrediction[] {
    const predictions: MaintenancePrediction[] = [];

    // Tire wear (average 40,000-60,000 km)
    const tireLifeExpectancy = 50000; // km
    const tireAge = data.mileage % tireLifeExpectancy;
    const tireWearPercentage = tireAge / tireLifeExpectancy;

    if (tireWearPercentage >= 0.80) {
      predictions.push({
        id: `pred-${Date.now()}-tires`,
        component: ComponentType.TIRES,
        severity: SeverityLevel.HIGH,
        type: MaintenanceType.REPLACEMENT,
        predictedDaysUntilService: this.estimateDaysUntil(
          tireLifeExpectancy - tireAge,
          data.avgSpeed,
          data.cityDriving
        ),
        predictedMileageUntilService: tireLifeExpectancy - tireAge,
        confidence: 75,
        title: 'Lastik Değişimi',
        description: 'Lastikler aşınma sınırına yaklaşıyor',
        symptoms: [
          'Tutunma kaybı',
          'Yağışta kayma',
          'Yol tutuşu azalması',
        ],
        recommendations: [
          'Lastik diş derinliğini kontrol ettirin',
          '4 lastiği birlikte değiştirin',
          'Mevsime uygun lastik seçin',
        ],
        estimatedCost: {
          min: 3000,
          max: 8000,
          currency: 'TRY',
        },
        canDeferService: true,
        maxDeferralDays: 45,
        riskIfDeferred: 'Patlama ve kaza riski artar',
      });
    }

    return predictions;
  }

  /**
   * Analyze battery health
   */
  private analyzeBattery(data: VehicleHealthData): MaintenancePrediction[] {
    const predictions: MaintenancePrediction[] = [];

    // Battery voltage check
    if (data.batteryVoltage < 12.4) {
      predictions.push({
        id: `pred-${Date.now()}-battery`,
        component: ComponentType.BATTERY,
        severity: data.batteryVoltage < 12.0 ? SeverityLevel.CRITICAL : SeverityLevel.HIGH,
        type: MaintenanceType.REPLACEMENT,
        predictedDaysUntilService: data.batteryVoltage < 12.0 ? 0 : 7,
        predictedMileageUntilService: 0,
        confidence: 85,
        title: 'Akü Değişimi',
        description: 'Akü voltajı düşük',
        symptoms: [
          'Marş sıkıntısı',
          'Zayıf farlar',
          'Elektronik aksamda sorun',
        ],
        recommendations: [
          'Akü yükünü test ettirin',
          'Alternatör kontrolü yaptırın',
          'Yeni akü takın',
        ],
        estimatedCost: {
          min: 800,
          max: 2000,
          currency: 'TRY',
        },
        canDeferService: data.batteryVoltage >= 12.0,
        maxDeferralDays: 14,
        riskIfDeferred: 'Aracın çalışmama riski',
      });
    }

    // Battery age (typically 3-5 years)
    if (data.age >= 3) {
      const batteryAgeScore = (data.age - 3) / 2; // 0 at 3 years, 1 at 5 years
      if (batteryAgeScore >= 0.5) {
        predictions.push({
          id: `pred-${Date.now()}-battery-age`,
          component: ComponentType.BATTERY,
          severity: SeverityLevel.LOW,
          type: MaintenanceType.INSPECTION,
          predictedDaysUntilService: Math.round((1 - batteryAgeScore) * 365),
          predictedMileageUntilService: 0,
          confidence: 70,
          title: 'Akü Kontrolü',
          description: 'Akü yaşlanıyor, kontrol gerekli',
          symptoms: ['Akü ömrü sonuna yaklaşıyor'],
          recommendations: [
            'Akü performans testi yaptırın',
            'Yeni akü almayı değerlendirin',
          ],
          estimatedCost: {
            min: 800,
            max: 2000,
            currency: 'TRY',
          },
          canDeferService: true,
          maxDeferralDays: 90,
        });
      }
    }

    return predictions;
  }

  /**
   * Analyze suspension system
   */
  private analyzeSuspension(data: VehicleHealthData): MaintenancePrediction[] {
    const predictions: MaintenancePrediction[] = [];

    // Suspension typically needs inspection every 80,000 km
    if (data.mileage % 80000 > 75000) {
      predictions.push({
        id: `pred-${Date.now()}-suspension`,
        component: ComponentType.SUSPENSION,
        severity: SeverityLevel.LOW,
        type: MaintenanceType.INSPECTION,
        predictedDaysUntilService: 30,
        predictedMileageUntilService: 80000 - (data.mileage % 80000),
        confidence: 65,
        title: 'Süspansiyon Kontrolü',
        description: 'Süspansiyon sistemi kontrolü gerekli',
        symptoms: [
          'Sarsıntılı sürüş',
          'Virajlarda yalpalama',
          'Anormal lastik aşınması',
        ],
        recommendations: [
          'Amortisör kontrolü yaptırın',
          'Salıncak ve rotil kontrolü',
          'Balans ve rot ayarı',
        ],
        estimatedCost: {
          min: 1000,
          max: 4000,
          currency: 'TRY',
        },
        canDeferService: true,
        maxDeferralDays: 90,
      });
    }

    return predictions;
  }

  /**
   * Analyze coolant system
   */
  private analyzeCoolantSystem(data: VehicleHealthData): MaintenancePrediction[] {
    const predictions: MaintenancePrediction[] = [];

    // Coolant change every 2 years or 40,000 km
    const daysSinceService = Math.floor(
      (new Date().getTime() - data.lastServiceDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceService >= 365 * 2 * 0.9) {
      predictions.push({
        id: `pred-${Date.now()}-coolant`,
        component: ComponentType.COOLANT_SYSTEM,
        severity: SeverityLevel.MEDIUM,
        type: MaintenanceType.SERVICE,
        predictedDaysUntilService: Math.max(0, 365 * 2 - daysSinceService),
        predictedMileageUntilService: 0,
        confidence: 85,
        title: 'Antifriz Değişimi',
        description: 'Soğutma sıvısı değişim zamanı',
        symptoms: [
          'Soğutma sıvısı rengi değişmiş olabilir',
          'Korozyon riski',
        ],
        recommendations: [
          'Antifriz değiştirin',
          'Soğutma sistemini temizleyin',
          'Hortum ve kelepçeleri kontrol edin',
        ],
        estimatedCost: {
          min: 400,
          max: 800,
          currency: 'TRY',
        },
        canDeferService: true,
        maxDeferralDays: 60,
      });
    }

    return predictions;
  }

  /**
   * Analyze fuel system
   */
  private analyzeFuelSystem(data: VehicleHealthData): MaintenancePrediction[] {
    const predictions: MaintenancePrediction[] = [];

    // Fuel filter change every 40,000 km
    if (data.mileage % 40000 > 38000) {
      predictions.push({
        id: `pred-${Date.now()}-fuel-filter`,
        component: ComponentType.FUEL_SYSTEM,
        severity: SeverityLevel.LOW,
        type: MaintenanceType.SERVICE,
        predictedDaysUntilService: 30,
        predictedMileageUntilService: 40000 - (data.mileage % 40000),
        confidence: 80,
        title: 'Yakıt Filtresi Değişimi',
        description: 'Yakıt filtresi değişim zamanı yaklaşıyor',
        symptoms: [
          'Motor performansında düşüş',
          'Aniden durma',
          'Güç kaybı',
        ],
        recommendations: [
          'Yakıt filtresini değiştirin',
          'Enjektörleri temizletin',
        ],
        estimatedCost: {
          min: 300,
          max: 600,
          currency: 'TRY',
        },
        canDeferService: true,
        maxDeferralDays: 45,
      });
    }

    return predictions;
  }

  // ==================== Health Calculation ====================

  /**
   * Calculate health score for each component
   */
  private calculateComponentHealth(data: VehicleHealthData): Map<ComponentType, {
    health: number;
    trend: 'improving' | 'stable' | 'degrading';
    lastChecked: Date;
  }> {
    const health = new Map();

    // Engine health (based on coolant temp, RPM, oil pressure)
    const engineHealth = Math.max(0, 100 -
      (data.coolantTemp > 90 ? (data.coolantTemp - 90) * 2 : 0) -
      (data.oilPressure < 30 ? (30 - data.oilPressure) : 0)
    );

    health.set(ComponentType.ENGINE, {
      health: Math.round(engineHealth),
      trend: engineHealth > 85 ? 'stable' : 'degrading' as const,
      lastChecked: new Date(),
    });

    // Battery health
    const batteryHealth = Math.max(0, Math.min(100, (data.batteryVoltage - 11) / 0.15 * 100));
    health.set(ComponentType.BATTERY, {
      health: Math.round(batteryHealth),
      trend: batteryHealth > 80 ? 'stable' : 'degrading' as const,
      lastChecked: new Date(),
    });

    // Add other components with default values
    const defaultHealth = { health: 85, trend: 'stable' as const, lastChecked: new Date() };
    health.set(ComponentType.TRANSMISSION, defaultHealth);
    health.set(ComponentType.BRAKES, defaultHealth);
    health.set(ComponentType.TIRES, defaultHealth);
    health.set(ComponentType.SUSPENSION, defaultHealth);

    return health;
  }

  /**
   * Calculate overall vehicle health
   */
  private calculateOverallHealth(
    componentHealth: Map<ComponentType, { health: number }>
  ): number {
    let totalHealth = 0;
    let count = 0;

    componentHealth.forEach((data) => {
      totalHealth += data.health;
      count++;
    });

    return count > 0 ? Math.round(totalHealth / count) : 100;
  }

  /**
   * Categorize predictions by urgency
   */
  private categorizeByUrgency(predictions: MaintenancePrediction[]) {
    return {
      immediate: predictions.filter((p) => p.predictedDaysUntilService < 7),
      soon: predictions.filter(
        (p) => p.predictedDaysUntilService >= 7 && p.predictedDaysUntilService < 30
      ),
      future: predictions.filter((p) => p.predictedDaysUntilService >= 30),
    };
  }

  // ==================== Helper Methods ====================

  /**
   * Estimate days until certain mileage based on driving patterns
   */
  private estimateDaysUntil(
    remainingKm: number,
    avgSpeed: number,
    cityDrivingPercentage: number
  ): number {
    // Estimate daily km based on driving pattern
    const avgDailyHours = 1.5; // Average 1.5 hours driving per day
    const effectiveSpeed = avgSpeed * 0.7; // Account for stops, traffic
    const dailyKm = avgDailyHours * effectiveSpeed;

    return Math.ceil(remainingKm / dailyKm);
  }

  // ==================== Utility ====================

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[Predictive Maintenance]', ...args);
    }
  }
}

// ==================== Singleton Instance ====================
let predictiveMaintenanceInstance: PredictiveMaintenanceService | null = null;

export function getPredictiveMaintenanceService(
  config?: Partial<PredictionConfig>
): PredictiveMaintenanceService {
  if (!predictiveMaintenanceInstance) {
    predictiveMaintenanceInstance = new PredictiveMaintenanceService(config);
  }
  return predictiveMaintenanceInstance;
}

// ==================== Helper Functions ====================

/**
 * Get severity color
 */
export function getSeverityColor(severity: SeverityLevel): string {
  switch (severity) {
    case SeverityLevel.INFO:
      return '#3498DB'; // Blue
    case SeverityLevel.LOW:
      return '#27AE60'; // Green
    case SeverityLevel.MEDIUM:
      return '#F39C12'; // Orange
    case SeverityLevel.HIGH:
      return '#E67E22'; // Dark orange
    case SeverityLevel.CRITICAL:
      return '#E74C3C'; // Red
  }
}

/**
 * Get severity icon
 */
export function getSeverityIcon(severity: SeverityLevel): string {
  switch (severity) {
    case SeverityLevel.INFO:
      return 'ℹ️';
    case SeverityLevel.LOW:
      return '✅';
    case SeverityLevel.MEDIUM:
      return '⚠️';
    case SeverityLevel.HIGH:
      return '🔴';
    case SeverityLevel.CRITICAL:
      return '🚨';
  }
}

/**
 * Format cost range
 */
export function formatCostRange(min: number, max: number, currency: string = 'TRY'): string {
  return `${min.toLocaleString('tr-TR')} - ${max.toLocaleString('tr-TR')} ${currency}`;
}

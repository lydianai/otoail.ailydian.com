// ============================================
// TÜRK OTO AI - Gamification Scoring System
// Driving behavior analysis and score calculation
// ============================================

export interface DrivingSession {
  id: string;
  userId: string;
  vehicleId: string;
  startTime: Date;
  endTime: Date;
  distance: number; // km
  duration: number; // minutes
  avgSpeed: number; // km/h
  maxSpeed: number; // km/h
  fuelConsumption: number; // liters
  fuelEfficiency: number; // km/L
  harshBrakings: number;
  harshAccelerations: number;
  idlingTime: number; // minutes
  nightDriving: boolean;
  weatherCondition: 'sunny' | 'rainy' | 'snowy' | 'foggy';
  routeType: 'city' | 'highway' | 'mixed';
}

export interface DrivingScore {
  overall: number; // 0-100
  breakdown: {
    safetyScore: number; // 0-100
    efficiencyScore: number; // 0-100
    smoothnessScore: number; // 0-100
    ecoScore: number; // 0-100
    complianceScore: number; // 0-100
  };
  level: number; // 1-50
  xp: number;
  xpToNextLevel: number;
  rank: string;
  totalDistance: number; // Total km driven
  totalSessions: number;
  achievements: string[]; // Achievement IDs
}

export interface ScoreCalculationConfig {
  weights: {
    safety: number;
    efficiency: number;
    smoothness: number;
    eco: number;
    compliance: number;
  };
  debug?: boolean;
}

// ==================== Scoring Service ====================
export class ScoringService {
  private config: Required<ScoreCalculationConfig>;

  constructor(config: Partial<ScoreCalculationConfig> = {}) {
    this.config = {
      weights: config.weights || {
        safety: 0.30,
        efficiency: 0.25,
        smoothness: 0.20,
        eco: 0.15,
        compliance: 0.10,
      },
      debug: config.debug ?? false,
    };
  }

  // ==================== Score Calculation ====================

  /**
   * Calculate comprehensive driving score from session data
   */
  calculateSessionScore(session: DrivingSession): DrivingScore['breakdown'] {
    const safetyScore = this.calculateSafetyScore(session);
    const efficiencyScore = this.calculateEfficiencyScore(session);
    const smoothnessScore = this.calculateSmoothnessScore(session);
    const ecoScore = this.calculateEcoScore(session);
    const complianceScore = this.calculateComplianceScore(session);

    this.log('Session scores:', {
      safetyScore,
      efficiencyScore,
      smoothnessScore,
      ecoScore,
      complianceScore,
    });

    return {
      safetyScore,
      efficiencyScore,
      smoothnessScore,
      ecoScore,
      complianceScore,
    };
  }

  /**
   * Calculate overall score from breakdown
   */
  calculateOverallScore(breakdown: DrivingScore['breakdown']): number {
    const overall =
      breakdown.safetyScore * this.config.weights.safety +
      breakdown.efficiencyScore * this.config.weights.efficiency +
      breakdown.smoothnessScore * this.config.weights.smoothness +
      breakdown.ecoScore * this.config.weights.eco +
      breakdown.complianceScore * this.config.weights.compliance;

    return Math.round(Math.max(0, Math.min(100, overall)));
  }

  // ==================== Individual Score Components ====================

  /**
   * Safety Score (0-100)
   * Based on: speed limits, harsh maneuvers, night driving
   */
  private calculateSafetyScore(session: DrivingSession): number {
    let score = 100;

    // Speed limit compliance (deduct up to 30 points)
    const citySpeedLimit = 50;
    const highwaySpeedLimit = 120;
    const speedLimit = session.routeType === 'highway' ? highwaySpeedLimit : citySpeedLimit;

    if (session.maxSpeed > speedLimit) {
      const overspeedPercentage = ((session.maxSpeed - speedLimit) / speedLimit) * 100;
      score -= Math.min(30, overspeedPercentage * 0.5);
    }

    // Harsh maneuvers (deduct up to 25 points)
    const harshManeuversPer10km = ((session.harshBrakings + session.harshAccelerations) / session.distance) * 10;
    score -= Math.min(25, harshManeuversPer10km * 5);

    // Night driving bonus/penalty (up to 10 points)
    if (session.nightDriving) {
      score -= 10; // Night driving is riskier
    }

    // Weather conditions (up to 15 points)
    switch (session.weatherCondition) {
      case 'snowy':
        score -= 15;
        break;
      case 'rainy':
        score -= 10;
        break;
      case 'foggy':
        score -= 8;
        break;
    }

    return Math.round(Math.max(0, Math.min(100, score)));
  }

  /**
   * Efficiency Score (0-100)
   * Based on: fuel consumption, route optimization, idle time
   */
  private calculateEfficiencyScore(session: DrivingSession): number {
    let score = 100;

    // Fuel efficiency (deduct up to 40 points)
    const expectedEfficiency = session.routeType === 'highway' ? 15 : 12; // km/L
    if (session.fuelEfficiency < expectedEfficiency) {
      const efficiencyLoss = ((expectedEfficiency - session.fuelEfficiency) / expectedEfficiency) * 100;
      score -= Math.min(40, efficiencyLoss * 0.8);
    }

    // Idling time (deduct up to 30 points)
    const idlingPercentage = (session.idlingTime / session.duration) * 100;
    score -= Math.min(30, idlingPercentage * 2);

    // Average speed optimization (deduct up to 20 points)
    const optimalSpeed = session.routeType === 'highway' ? 90 : 40;
    const speedDeviation = Math.abs(session.avgSpeed - optimalSpeed);
    score -= Math.min(20, speedDeviation * 0.5);

    return Math.round(Math.max(0, Math.min(100, score)));
  }

  /**
   * Smoothness Score (0-100)
   * Based on: acceleration patterns, braking behavior
   */
  private calculateSmoothnessScore(session: DrivingSession): number {
    let score = 100;

    // Harsh accelerations (deduct up to 50 points)
    const harshAccelsPer10km = (session.harshAccelerations / session.distance) * 10;
    score -= Math.min(50, harshAccelsPer10km * 10);

    // Harsh brakings (deduct up to 50 points)
    const harshBrakesPer10km = (session.harshBrakings / session.distance) * 10;
    score -= Math.min(50, harshBrakesPer10km * 10);

    return Math.round(Math.max(0, Math.min(100, score)));
  }

  /**
   * Eco Score (0-100)
   * Based on: emissions, fuel type, eco driving techniques
   */
  private calculateEcoScore(session: DrivingSession): number {
    let score = 100;

    // Fuel consumption per km (deduct up to 40 points)
    const fuelPerKm = session.fuelConsumption / session.distance;
    const expectedFuelPerKm = 1 / (session.routeType === 'highway' ? 15 : 12);
    if (fuelPerKm > expectedFuelPerKm) {
      const excessConsumption = ((fuelPerKm - expectedFuelPerKm) / expectedFuelPerKm) * 100;
      score -= Math.min(40, excessConsumption * 0.8);
    }

    // Idling emissions (deduct up to 30 points)
    const idlingPercentage = (session.idlingTime / session.duration) * 100;
    score -= Math.min(30, idlingPercentage * 2);

    // Speed optimization for emissions (deduct up to 30 points)
    const ecoSpeedRange = session.routeType === 'highway' ? [80, 100] : [30, 50];
    if (session.avgSpeed < ecoSpeedRange[0] || session.avgSpeed > ecoSpeedRange[1]) {
      const deviation = Math.min(
        Math.abs(session.avgSpeed - ecoSpeedRange[0]),
        Math.abs(session.avgSpeed - ecoSpeedRange[1])
      );
      score -= Math.min(30, deviation * 0.5);
    }

    return Math.round(Math.max(0, Math.min(100, score)));
  }

  /**
   * Compliance Score (0-100)
   * Based on: traffic rules, speed limits, lane discipline
   */
  private calculateComplianceScore(session: DrivingSession): number {
    let score = 100;

    // Speed limit violations (deduct up to 60 points)
    const citySpeedLimit = 50;
    const highwaySpeedLimit = 120;
    const speedLimit = session.routeType === 'highway' ? highwaySpeedLimit : citySpeedLimit;

    if (session.maxSpeed > speedLimit) {
      const violation = session.maxSpeed - speedLimit;
      score -= Math.min(60, violation * 1.5);
    }

    // Aggressive driving patterns (deduct up to 40 points)
    const aggressiveScore = session.harshBrakings + session.harshAccelerations;
    score -= Math.min(40, aggressiveScore * 5);

    return Math.round(Math.max(0, Math.min(100, score)));
  }

  // ==================== XP & Level System ====================

  /**
   * Calculate XP gained from session score
   */
  calculateXPGain(score: number, distance: number, duration: number): number {
    const baseXP = score * 2; // 0-200 XP base
    const distanceBonus = Math.min(100, distance * 5); // Up to 100 XP for distance
    const timeBonus = Math.min(50, duration * 0.5); // Up to 50 XP for time

    return Math.round(baseXP + distanceBonus + timeBonus);
  }

  /**
   * Calculate required XP for level
   */
  getXPForLevel(level: number): number {
    // Exponential curve: level^2 * 100
    return level * level * 100;
  }

  /**
   * Get level from total XP
   */
  getLevelFromXP(xp: number): number {
    let level = 1;
    while (this.getXPForLevel(level + 1) <= xp) {
      level++;
    }
    return Math.min(50, level); // Max level 50
  }

  /**
   * Get rank title based on level
   */
  getRankTitle(level: number): string {
    if (level >= 40) return '🏆 Efsane Sürücü';
    if (level >= 35) return '💎 Usta Sürücü';
    if (level >= 30) return '👑 Profesyonel';
    if (level >= 25) return '⭐ Uzman';
    if (level >= 20) return '🥇 İleri Seviye';
    if (level >= 15) return '🥈 Deneyimli';
    if (level >= 10) return '🥉 Orta Seviye';
    if (level >= 5) return '🎯 Gelişen';
    return '🔰 Başlangıç';
  }

  // ==================== Statistics ====================

  /**
   * Calculate aggregated stats from multiple sessions
   */
  calculateAggregateStats(sessions: DrivingSession[]): {
    totalDistance: number;
    totalDuration: number;
    avgScore: number;
    avgFuelEfficiency: number;
    totalHarshManeuvers: number;
    safestDrive: DrivingSession;
    mostEfficientDrive: DrivingSession;
  } {
    const totalDistance = sessions.reduce((sum, s) => sum + s.distance, 0);
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalHarshManeuvers = sessions.reduce(
      (sum, s) => sum + s.harshBrakings + s.harshAccelerations,
      0
    );

    const sessionScores = sessions.map(s => {
      const breakdown = this.calculateSessionScore(s);
      return { session: s, score: this.calculateOverallScore(breakdown) };
    });

    const avgScore = sessionScores.reduce((sum, s) => sum + s.score, 0) / sessions.length;
    const avgFuelEfficiency = sessions.reduce((sum, s) => sum + s.fuelEfficiency, 0) / sessions.length;

    const safestDrive = sessionScores.sort((a, b) => b.score - a.score)[0].session;
    const mostEfficientDrive = sessions.sort((a, b) => b.fuelEfficiency - a.fuelEfficiency)[0];

    return {
      totalDistance,
      totalDuration,
      avgScore: Math.round(avgScore),
      avgFuelEfficiency: Math.round(avgFuelEfficiency * 10) / 10,
      totalHarshManeuvers,
      safestDrive,
      mostEfficientDrive,
    };
  }

  // ==================== Utility ====================

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[Scoring Service]', ...args);
    }
  }
}

// ==================== Singleton Instance ====================
let scoringServiceInstance: ScoringService | null = null;

export function getScoringService(config?: Partial<ScoreCalculationConfig>): ScoringService {
  if (!scoringServiceInstance) {
    scoringServiceInstance = new ScoringService(config);
  }
  return scoringServiceInstance;
}

// ==================== Helper Functions ====================

/**
 * Get score grade letter
 */
export function getScoreGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'C+';
  if (score >= 65) return 'C';
  if (score >= 60) return 'D+';
  if (score >= 55) return 'D';
  return 'F';
}

/**
 * Get score color
 */
export function getScoreColor(score: number): string {
  if (score >= 85) return '#27AE60'; // Green
  if (score >= 70) return '#F39C12'; // Orange
  if (score >= 55) return '#E67E22'; // Dark orange
  return '#E74C3C'; // Red
}

/**
 * Format score display
 */
export function formatScore(score: number): string {
  return `${score}/100 (${getScoreGrade(score)})`;
}

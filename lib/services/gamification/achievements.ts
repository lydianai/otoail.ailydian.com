// ============================================
// TÜRK OTO AI - Achievements & Badges System
// Gamification rewards and milestones
// ============================================

import { DrivingSession, DrivingScore } from './scoring';

export enum AchievementCategory {
  SAFETY = 'SAFETY',
  EFFICIENCY = 'EFFICIENCY',
  DISTANCE = 'DISTANCE',
  CONSISTENCY = 'CONSISTENCY',
  SPECIAL = 'SPECIAL',
  SOCIAL = 'SOCIAL',
}

export enum AchievementRarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;
  xpReward: number;
  condition: AchievementCondition;
  unlockedAt?: Date;
  progress?: number; // 0-100
}

export interface AchievementCondition {
  type: 'score' | 'distance' | 'sessions' | 'streak' | 'efficiency' | 'safety' | 'custom';
  target: number;
  metric?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: AchievementCategory;
  rarity: AchievementRarity;
}

export interface Streak {
  current: number; // days
  longest: number; // days
  lastDriveDate: Date;
}

// ==================== Achievement Definitions ====================

export const ACHIEVEMENTS: Achievement[] = [
  // ==================== SAFETY ACHIEVEMENTS ====================
  {
    id: 'safe_driver_bronze',
    name: 'Güvenli Sürücü - Bronz',
    description: '100 km güvenli sürüş (emniyet skoru 85+)',
    category: AchievementCategory.SAFETY,
    rarity: AchievementRarity.COMMON,
    icon: '🛡️',
    xpReward: 100,
    condition: { type: 'safety', target: 100 },
  },
  {
    id: 'safe_driver_silver',
    name: 'Güvenli Sürücü - Gümüş',
    description: '500 km güvenli sürüş (emniyet skoru 85+)',
    category: AchievementCategory.SAFETY,
    rarity: AchievementRarity.RARE,
    icon: '🛡️',
    xpReward: 250,
    condition: { type: 'safety', target: 500 },
  },
  {
    id: 'safe_driver_gold',
    name: 'Güvenli Sürücü - Altın',
    description: '1000 km güvenli sürüş (emniyet skoru 85+)',
    category: AchievementCategory.SAFETY,
    rarity: AchievementRarity.EPIC,
    icon: '🛡️',
    xpReward: 500,
    condition: { type: 'safety', target: 1000 },
  },
  {
    id: 'perfect_score',
    name: 'Mükemmel Sürüş',
    description: '100 puan genel skor al',
    category: AchievementCategory.SAFETY,
    rarity: AchievementRarity.LEGENDARY,
    icon: '💯',
    xpReward: 1000,
    condition: { type: 'score', target: 100 },
  },
  {
    id: 'zero_violations',
    name: 'İhlalsiz Sürücü',
    description: '30 gün ihlalsiz sürüş',
    category: AchievementCategory.SAFETY,
    rarity: AchievementRarity.EPIC,
    icon: '✅',
    xpReward: 600,
    condition: { type: 'streak', target: 30 },
  },

  // ==================== EFFICIENCY ACHIEVEMENTS ====================
  {
    id: 'eco_warrior_bronze',
    name: 'Eko Savaşçı - Bronz',
    description: '100 km yakıt verimliliği 15+ km/L',
    category: AchievementCategory.EFFICIENCY,
    rarity: AchievementRarity.COMMON,
    icon: '🌱',
    xpReward: 100,
    condition: { type: 'efficiency', target: 100 },
  },
  {
    id: 'eco_warrior_silver',
    name: 'Eko Savaşçı - Gümüş',
    description: '500 km yakıt verimliliği 15+ km/L',
    category: AchievementCategory.EFFICIENCY,
    rarity: AchievementRarity.RARE,
    icon: '🌱',
    xpReward: 250,
    condition: { type: 'efficiency', target: 500 },
  },
  {
    id: 'eco_warrior_gold',
    name: 'Eko Savaşçı - Altın',
    description: '1000 km yakıt verimliliği 15+ km/L',
    category: AchievementCategory.EFFICIENCY,
    rarity: AchievementRarity.EPIC,
    icon: '🌱',
    xpReward: 500,
    condition: { type: 'efficiency', target: 1000 },
  },
  {
    id: 'fuel_saver',
    name: 'Yakıt Tasarrufçusu',
    description: 'Tek seferde 50L yakıt tasarrufu',
    category: AchievementCategory.EFFICIENCY,
    rarity: AchievementRarity.RARE,
    icon: '⛽',
    xpReward: 300,
    condition: { type: 'custom', target: 50, metric: 'fuelSaved' },
  },

  // ==================== DISTANCE ACHIEVEMENTS ====================
  {
    id: 'road_warrior_100',
    name: 'Yol Savaşçısı I',
    description: '100 km tamamla',
    category: AchievementCategory.DISTANCE,
    rarity: AchievementRarity.COMMON,
    icon: '🛣️',
    xpReward: 50,
    condition: { type: 'distance', target: 100 },
  },
  {
    id: 'road_warrior_500',
    name: 'Yol Savaşçısı II',
    description: '500 km tamamla',
    category: AchievementCategory.DISTANCE,
    rarity: AchievementRarity.COMMON,
    icon: '🛣️',
    xpReward: 150,
    condition: { type: 'distance', target: 500 },
  },
  {
    id: 'road_warrior_1000',
    name: 'Yol Savaşçısı III',
    description: '1000 km tamamla',
    category: AchievementCategory.DISTANCE,
    rarity: AchievementRarity.RARE,
    icon: '🛣️',
    xpReward: 300,
    condition: { type: 'distance', target: 1000 },
  },
  {
    id: 'road_warrior_5000',
    name: 'Yol Savaşçısı IV',
    description: '5000 km tamamla',
    category: AchievementCategory.DISTANCE,
    rarity: AchievementRarity.EPIC,
    icon: '🛣️',
    xpReward: 800,
    condition: { type: 'distance', target: 5000 },
  },
  {
    id: 'road_warrior_10000',
    name: 'Yol Efsanesi',
    description: '10000 km tamamla',
    category: AchievementCategory.DISTANCE,
    rarity: AchievementRarity.LEGENDARY,
    icon: '🏆',
    xpReward: 2000,
    condition: { type: 'distance', target: 10000 },
  },

  // ==================== CONSISTENCY ACHIEVEMENTS ====================
  {
    id: 'consistent_7',
    name: 'Haftalık Tutarlı',
    description: '7 gün üst üste sür',
    category: AchievementCategory.CONSISTENCY,
    rarity: AchievementRarity.COMMON,
    icon: '📅',
    xpReward: 100,
    condition: { type: 'streak', target: 7 },
  },
  {
    id: 'consistent_30',
    name: 'Aylık Tutarlı',
    description: '30 gün üst üste sür',
    category: AchievementCategory.CONSISTENCY,
    rarity: AchievementRarity.RARE,
    icon: '📅',
    xpReward: 400,
    condition: { type: 'streak', target: 30 },
  },
  {
    id: 'consistent_100',
    name: 'Tutarlılık Ustası',
    description: '100 gün üst üste sür',
    category: AchievementCategory.CONSISTENCY,
    rarity: AchievementRarity.EPIC,
    icon: '📅',
    xpReward: 1000,
    condition: { type: 'streak', target: 100 },
  },
  {
    id: 'high_scorer',
    name: 'Yüksek Skorcu',
    description: '10 sürüş üst üste 80+ skor',
    category: AchievementCategory.CONSISTENCY,
    rarity: AchievementRarity.RARE,
    icon: '⭐',
    xpReward: 500,
    condition: { type: 'custom', target: 10, metric: 'consecutiveHighScores' },
  },

  // ==================== SPECIAL ACHIEVEMENTS ====================
  {
    id: 'night_owl',
    name: 'Gece Kuşu',
    description: '50 gece sürüşü tamamla',
    category: AchievementCategory.SPECIAL,
    rarity: AchievementRarity.RARE,
    icon: '🌙',
    xpReward: 300,
    condition: { type: 'custom', target: 50, metric: 'nightDrives' },
  },
  {
    id: 'weather_master',
    name: 'Hava Koşulları Ustası',
    description: 'Her hava koşulunda sür (güneşli, yağmurlu, karlı, sisli)',
    category: AchievementCategory.SPECIAL,
    rarity: AchievementRarity.EPIC,
    icon: '🌦️',
    xpReward: 600,
    condition: { type: 'custom', target: 4, metric: 'uniqueWeathers' },
  },
  {
    id: 'long_haul',
    name: 'Uzun Yol Şoförü',
    description: 'Tek seferde 500 km sür',
    category: AchievementCategory.SPECIAL,
    rarity: AchievementRarity.EPIC,
    icon: '🚗',
    xpReward: 700,
    condition: { type: 'custom', target: 500, metric: 'singleTripDistance' },
  },
  {
    id: 'speed_demon_reformed',
    name: 'İyileşmiş Hız Canavarı',
    description: 'Hız ihlalinden sonra 30 gün ihlalsiz',
    category: AchievementCategory.SPECIAL,
    rarity: AchievementRarity.RARE,
    icon: '🏎️➡️🐢',
    xpReward: 500,
    condition: { type: 'custom', target: 30, metric: 'reformedStreak' },
  },

  // ==================== SOCIAL ACHIEVEMENTS ====================
  {
    id: 'social_climber',
    name: 'Sosyal Tırmanıcı',
    description: 'Lider tablosunda ilk 10\'a gir',
    category: AchievementCategory.SOCIAL,
    rarity: AchievementRarity.RARE,
    icon: '📊',
    xpReward: 400,
    condition: { type: 'custom', target: 10, metric: 'leaderboardRank' },
  },
  {
    id: 'top_dog',
    name: 'Birinci',
    description: 'Lider tablosunda 1. ol',
    category: AchievementCategory.SOCIAL,
    rarity: AchievementRarity.LEGENDARY,
    icon: '🥇',
    xpReward: 1500,
    condition: { type: 'custom', target: 1, metric: 'leaderboardRank' },
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: '10 kullanıcıyı davet et',
    category: AchievementCategory.SOCIAL,
    rarity: AchievementRarity.RARE,
    icon: '👥',
    xpReward: 600,
    condition: { type: 'custom', target: 10, metric: 'referrals' },
  },
];

// ==================== Achievements Service ====================
export class AchievementsService {
  private debug: boolean;

  constructor(debug: boolean = false) {
    this.debug = debug;
  }

  // ==================== Achievement Checking ====================

  /**
   * Check which achievements were unlocked in this session
   */
  checkAchievements(
    session: DrivingSession,
    score: DrivingScore,
    userStats: {
      totalDistance: number;
      totalSessions: number;
      streak: Streak;
      safeDistance: number;
      efficientDistance: number;
      nightDrives: number;
      uniqueWeathers: Set<string>;
      consecutiveHighScores: number;
    },
    unlockedAchievements: string[]
  ): Achievement[] {
    const newAchievements: Achievement[] = [];

    for (const achievement of ACHIEVEMENTS) {
      // Skip if already unlocked
      if (unlockedAchievements.includes(achievement.id)) {
        continue;
      }

      const unlocked = this.checkAchievementCondition(
        achievement,
        session,
        score,
        userStats
      );

      if (unlocked) {
        newAchievements.push({
          ...achievement,
          unlockedAt: new Date(),
          progress: 100,
        });
        this.log(`Achievement unlocked: ${achievement.name}`);
      }
    }

    return newAchievements;
  }

  /**
   * Check if a specific achievement condition is met
   */
  private checkAchievementCondition(
    achievement: Achievement,
    session: DrivingSession,
    score: DrivingScore,
    userStats: any
  ): boolean {
    const { condition } = achievement;

    switch (condition.type) {
      case 'score':
        return score.overall >= condition.target;

      case 'distance':
        return userStats.totalDistance >= condition.target;

      case 'sessions':
        return userStats.totalSessions >= condition.target;

      case 'streak':
        return userStats.streak.current >= condition.target;

      case 'efficiency':
        return userStats.efficientDistance >= condition.target;

      case 'safety':
        return userStats.safeDistance >= condition.target;

      case 'custom':
        return this.checkCustomCondition(achievement, session, userStats);

      default:
        return false;
    }
  }

  /**
   * Check custom achievement conditions
   */
  private checkCustomCondition(
    achievement: Achievement,
    session: DrivingSession,
    userStats: any
  ): boolean {
    const { metric, target } = achievement.condition;

    switch (metric) {
      case 'fuelSaved':
        return userStats.totalFuelSaved >= target;

      case 'nightDrives':
        return userStats.nightDrives >= target;

      case 'uniqueWeathers':
        return userStats.uniqueWeathers.size >= target;

      case 'singleTripDistance':
        return session.distance >= target;

      case 'consecutiveHighScores':
        return userStats.consecutiveHighScores >= target;

      case 'leaderboardRank':
        return userStats.leaderboardRank <= target;

      case 'referrals':
        return userStats.referrals >= target;

      case 'reformedStreak':
        return userStats.reformedStreak >= target;

      default:
        return false;
    }
  }

  // ==================== Progress Tracking ====================

  /**
   * Calculate progress towards achievement
   */
  calculateProgress(
    achievement: Achievement,
    userStats: any
  ): number {
    const { condition } = achievement;

    let current = 0;
    switch (condition.type) {
      case 'distance':
        current = userStats.totalDistance;
        break;
      case 'sessions':
        current = userStats.totalSessions;
        break;
      case 'streak':
        current = userStats.streak.current;
        break;
      case 'safety':
        current = userStats.safeDistance;
        break;
      case 'efficiency':
        current = userStats.efficientDistance;
        break;
    }

    return Math.min(100, (current / condition.target) * 100);
  }

  /**
   * Get achievements in progress
   */
  getAchievementsInProgress(
    userStats: any,
    unlockedAchievements: string[]
  ): Achievement[] {
    return ACHIEVEMENTS.filter(
      (a) => !unlockedAchievements.includes(a.id)
    ).map((achievement) => ({
      ...achievement,
      progress: this.calculateProgress(achievement, userStats),
    }));
  }

  // ==================== Badges ====================

  /**
   * Convert achievement to badge
   */
  achievementToBadge(achievement: Achievement): Badge {
    return {
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      icon: achievement.icon,
      earnedAt: achievement.unlockedAt || new Date(),
      category: achievement.category,
      rarity: achievement.rarity,
    };
  }

  /**
   * Get badges by category
   */
  getBadgesByCategory(badges: Badge[]): Map<AchievementCategory, Badge[]> {
    const categoryMap = new Map<AchievementCategory, Badge[]>();

    for (const badge of badges) {
      if (!categoryMap.has(badge.category)) {
        categoryMap.set(badge.category, []);
      }
      categoryMap.get(badge.category)!.push(badge);
    }

    return categoryMap;
  }

  // ==================== Streak Management ====================

  /**
   * Update driving streak
   */
  updateStreak(lastDriveDate: Date, currentDate: Date = new Date()): Streak {
    const daysDiff = Math.floor(
      (currentDate.getTime() - lastDriveDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // If more than 1 day has passed, streak is broken
    if (daysDiff > 1) {
      return {
        current: 1,
        longest: 0, // Will be updated separately
        lastDriveDate: currentDate,
      };
    }

    // Continue streak
    return {
      current: daysDiff === 1 ? 0 : 0, // Increment handled separately
      longest: 0,
      lastDriveDate: currentDate,
    };
  }

  // ==================== Utility ====================

  /**
   * Get rarity color
   */
  getRarityColor(rarity: AchievementRarity): string {
    switch (rarity) {
      case AchievementRarity.COMMON:
        return '#95A5A6'; // Gray
      case AchievementRarity.RARE:
        return '#3498DB'; // Blue
      case AchievementRarity.EPIC:
        return '#9B59B6'; // Purple
      case AchievementRarity.LEGENDARY:
        return '#F39C12'; // Gold
    }
  }

  /**
   * Get category display name
   */
  getCategoryDisplayName(category: AchievementCategory): string {
    const names: Record<AchievementCategory, string> = {
      [AchievementCategory.SAFETY]: 'Güvenlik',
      [AchievementCategory.EFFICIENCY]: 'Verimlilik',
      [AchievementCategory.DISTANCE]: 'Mesafe',
      [AchievementCategory.CONSISTENCY]: 'Tutarlılık',
      [AchievementCategory.SPECIAL]: 'Özel',
      [AchievementCategory.SOCIAL]: 'Sosyal',
    };
    return names[category];
  }

  private log(...args: any[]): void {
    if (this.debug) {
      console.log('[Achievements Service]', ...args);
    }
  }
}

// ==================== Singleton Instance ====================
let achievementsServiceInstance: AchievementsService | null = null;

export function getAchievementsService(debug?: boolean): AchievementsService {
  if (!achievementsServiceInstance) {
    achievementsServiceInstance = new AchievementsService(debug);
  }
  return achievementsServiceInstance;
}

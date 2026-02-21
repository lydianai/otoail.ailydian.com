// ============================================
// TÜRK OTO AI - Leaderboard System
// Competitive rankings and social features
// ============================================

import { DrivingScore } from './scoring';

export enum LeaderboardPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  ALL_TIME = 'ALL_TIME',
}

export enum LeaderboardCategory {
  OVERALL = 'OVERALL',
  SAFETY = 'SAFETY',
  EFFICIENCY = 'EFFICIENCY',
  ECO = 'ECO',
  DISTANCE = 'DISTANCE',
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  level: number;
  totalDistance: number;
  totalSessions: number;
  achievements: number;
  change: number; // Rank change from previous period
  isCurrentUser?: boolean;
}

export interface LeaderboardStats {
  totalPlayers: number;
  averageScore: number;
  topScore: number;
  userRank: number;
  userPercentile: number; // Top X%
}

export interface CompetitionGroup {
  id: string;
  name: string;
  description: string;
  members: string[]; // user IDs
  startDate: Date;
  endDate: Date;
  prize?: string;
  standings: LeaderboardEntry[];
}

// ==================== Leaderboard Service ====================
export class LeaderboardService {
  private debug: boolean;

  constructor(debug: boolean = false) {
    this.debug = debug;
  }

  // ==================== Leaderboard Queries ====================

  /**
   * Get leaderboard for specific period and category
   */
  async getLeaderboard(
    period: LeaderboardPeriod,
    category: LeaderboardCategory,
    limit: number = 100,
    offset: number = 0
  ): Promise<LeaderboardEntry[]> {
    this.log(`Getting ${period} leaderboard for ${category}`);

    // Mock leaderboard data
    const mockEntries: LeaderboardEntry[] = this.generateMockLeaderboard(limit);

    // Sort by score
    mockEntries.sort((a, b) => b.score - a.score);

    // Assign ranks
    mockEntries.forEach((entry, index) => {
      entry.rank = index + 1 + offset;
    });

    return mockEntries;
  }

  /**
   * Get user's position on leaderboard
   */
  async getUserPosition(
    userId: string,
    period: LeaderboardPeriod,
    category: LeaderboardCategory
  ): Promise<LeaderboardEntry> {
    this.log(`Getting position for user ${userId}`);

    const allEntries = await this.getLeaderboard(period, category, 10000);
    const userEntry = allEntries.find((e) => e.userId === userId);

    if (!userEntry) {
      // Create default entry for new user
      return {
        rank: allEntries.length + 1,
        userId,
        username: 'Yeni Sürücü',
        score: 0,
        level: 1,
        totalDistance: 0,
        totalSessions: 0,
        achievements: 0,
        change: 0,
        isCurrentUser: true,
      };
    }

    return { ...userEntry, isCurrentUser: true };
  }

  /**
   * Get leaderboard with context (users around current user)
   */
  async getLeaderboardWithContext(
    userId: string,
    period: LeaderboardPeriod,
    category: LeaderboardCategory,
    contextSize: number = 5
  ): Promise<LeaderboardEntry[]> {
    const userPosition = await this.getUserPosition(userId, period, category);
    const userRank = userPosition.rank;

    // Get top 10
    const topEntries = await this.getLeaderboard(period, category, 10);

    // If user is in top 10, just return top entries
    if (userRank <= 10) {
      return topEntries.map((e) => ({
        ...e,
        isCurrentUser: e.userId === userId,
      }));
    }

    // Otherwise, get users around current user
    const startRank = Math.max(1, userRank - contextSize);
    const contextEntries = await this.getLeaderboard(
      period,
      category,
      contextSize * 2 + 1,
      startRank - 1
    );

    // Combine top 3 + context
    return [
      ...topEntries.slice(0, 3),
      {
        rank: 0,
        userId: 'separator',
        username: '...',
        score: 0,
        level: 0,
        totalDistance: 0,
        totalSessions: 0,
        achievements: 0,
        change: 0,
      },
      ...contextEntries.map((e) => ({
        ...e,
        isCurrentUser: e.userId === userId,
      })),
    ];
  }

  // ==================== Statistics ====================

  /**
   * Get leaderboard statistics
   */
  async getLeaderboardStats(
    userId: string,
    period: LeaderboardPeriod,
    category: LeaderboardCategory
  ): Promise<LeaderboardStats> {
    const allEntries = await this.getLeaderboard(period, category, 10000);
    const userPosition = await this.getUserPosition(userId, period, category);

    const totalPlayers = allEntries.length;
    const averageScore = allEntries.reduce((sum, e) => sum + e.score, 0) / totalPlayers;
    const topScore = allEntries[0]?.score || 0;
    const userRank = userPosition.rank;
    const userPercentile = ((totalPlayers - userRank) / totalPlayers) * 100;

    return {
      totalPlayers,
      averageScore: Math.round(averageScore),
      topScore,
      userRank,
      userPercentile: Math.round(userPercentile * 10) / 10,
    };
  }

  // ==================== Competition Groups ====================

  /**
   * Create a competition group
   */
  async createCompetition(
    name: string,
    description: string,
    memberIds: string[],
    durationDays: number,
    prize?: string
  ): Promise<CompetitionGroup> {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

    const competition: CompetitionGroup = {
      id: `comp-${Date.now()}`,
      name,
      description,
      members: memberIds,
      startDate,
      endDate,
      prize,
      standings: [],
    };

    this.log('Competition created:', competition);

    return competition;
  }

  /**
   * Get competition standings
   */
  async getCompetitionStandings(competitionId: string): Promise<LeaderboardEntry[]> {
    this.log(`Getting standings for competition ${competitionId}`);

    // Mock standings
    const mockStandings = this.generateMockLeaderboard(10);
    mockStandings.sort((a, b) => b.score - a.score);
    mockStandings.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return mockStandings;
  }

  /**
   * Get active competitions for user
   */
  async getUserCompetitions(userId: string): Promise<CompetitionGroup[]> {
    this.log(`Getting competitions for user ${userId}`);

    // Mock competitions
    const mockCompetitions: CompetitionGroup[] = [
      {
        id: 'comp-weekly-1',
        name: 'Haftalık Güvenli Sürüş Yarışması',
        description: 'En güvenli sürücü kim?',
        members: ['user-1', 'user-2', 'user-3', userId],
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        prize: '500 TL Shell yakıt kuponu',
        standings: [],
      },
      {
        id: 'comp-monthly-1',
        name: 'Aylık Mesafe Maratonu',
        description: 'En çok km kim yapacak?',
        members: ['user-1', 'user-4', 'user-5', userId],
        startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        prize: 'Ücretsiz araç bakımı',
        standings: [],
      },
    ];

    return mockCompetitions;
  }

  // ==================== Social Features ====================

  /**
   * Get friends leaderboard
   */
  async getFriendsLeaderboard(
    userId: string,
    friendIds: string[],
    period: LeaderboardPeriod
  ): Promise<LeaderboardEntry[]> {
    this.log(`Getting friends leaderboard for user ${userId}`);

    const allEntries = await this.getLeaderboard(period, LeaderboardCategory.OVERALL, 10000);

    // Filter to friends only
    const friendEntries = allEntries
      .filter((e) => friendIds.includes(e.userId) || e.userId === userId)
      .map((e, index) => ({
        ...e,
        rank: index + 1,
        isCurrentUser: e.userId === userId,
      }));

    return friendEntries;
  }

  /**
   * Compare with specific user
   */
  async compareWithUser(
    userId: string,
    targetUserId: string,
    period: LeaderboardPeriod
  ): Promise<{
    user: LeaderboardEntry;
    target: LeaderboardEntry;
    scoreDiff: number;
    rankDiff: number;
  }> {
    const userPosition = await this.getUserPosition(userId, period, LeaderboardCategory.OVERALL);
    const targetPosition = await this.getUserPosition(targetUserId, period, LeaderboardCategory.OVERALL);

    return {
      user: userPosition,
      target: targetPosition,
      scoreDiff: userPosition.score - targetPosition.score,
      rankDiff: targetPosition.rank - userPosition.rank,
    };
  }

  // ==================== Achievements Integration ====================

  /**
   * Get top achievers (most achievements unlocked)
   */
  async getTopAchievers(limit: number = 100): Promise<LeaderboardEntry[]> {
    this.log('Getting top achievers');

    const mockEntries = this.generateMockLeaderboard(limit);
    mockEntries.sort((a, b) => b.achievements - a.achievements);
    mockEntries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return mockEntries;
  }

  // ==================== Mock Data Generation ====================

  private generateMockLeaderboard(count: number): LeaderboardEntry[] {
    const entries: LeaderboardEntry[] = [];

    const turkishNames = [
      'Ahmet Yılmaz',
      'Mehmet Demir',
      'Ayşe Kaya',
      'Fatma Çelik',
      'Mustafa Şahin',
      'Emine Yıldız',
      'Ali Özdemir',
      'Zeynep Aydın',
      'Hüseyin Özkan',
      'Hatice Arslan',
      'İbrahim Kurt',
      'Elif Koç',
      'Osman Çetin',
      'Meryem Güneş',
      'Hasan Aslan',
      'Özlem Polat',
      'Yunus Erdoğan',
      'Seda Aksoy',
      'Ramazan Taş',
      'Sevgi Kılıç',
    ];

    for (let i = 0; i < count; i++) {
      const name = turkishNames[i % turkishNames.length];
      const baseScore = Math.max(0, 100 - i * 2 + Math.random() * 20);

      entries.push({
        rank: i + 1,
        userId: `user-${i + 1}`,
        username: `${name} ${i > 19 ? i - 19 : ''}`.trim(),
        score: Math.round(baseScore),
        level: Math.max(1, Math.floor(baseScore / 4)),
        totalDistance: Math.floor(Math.random() * 5000) + 100,
        totalSessions: Math.floor(Math.random() * 100) + 5,
        achievements: Math.floor(Math.random() * 25),
        change: Math.floor(Math.random() * 11) - 5, // -5 to +5
      });
    }

    return entries;
  }

  // ==================== Utility Functions ====================

  /**
   * Get period display name
   */
  getPeriodDisplayName(period: LeaderboardPeriod): string {
    const names: Record<LeaderboardPeriod, string> = {
      [LeaderboardPeriod.DAILY]: 'Günlük',
      [LeaderboardPeriod.WEEKLY]: 'Haftalık',
      [LeaderboardPeriod.MONTHLY]: 'Aylık',
      [LeaderboardPeriod.ALL_TIME]: 'Tüm Zamanlar',
    };
    return names[period];
  }

  /**
   * Get category display name
   */
  getCategoryDisplayName(category: LeaderboardCategory): string {
    const names: Record<LeaderboardCategory, string> = {
      [LeaderboardCategory.OVERALL]: 'Genel',
      [LeaderboardCategory.SAFETY]: 'Güvenlik',
      [LeaderboardCategory.EFFICIENCY]: 'Verimlilik',
      [LeaderboardCategory.ECO]: 'Eko',
      [LeaderboardCategory.DISTANCE]: 'Mesafe',
    };
    return names[category];
  }

  /**
   * Get rank change icon
   */
  getRankChangeIcon(change: number): string {
    if (change > 0) return '🔼';
    if (change < 0) return '🔽';
    return '➖';
  }

  /**
   * Get rank change color
   */
  getRankChangeColor(change: number): string {
    if (change > 0) return '#27AE60'; // Green
    if (change < 0) return '#E74C3C'; // Red
    return '#95A5A6'; // Gray
  }

  /**
   * Format percentile
   */
  formatPercentile(percentile: number): string {
    if (percentile >= 99) return 'Top 1%';
    if (percentile >= 95) return 'Top 5%';
    if (percentile >= 90) return 'Top 10%';
    if (percentile >= 75) return 'Top 25%';
    if (percentile >= 50) return 'Top 50%';
    return `Top ${Math.round(100 - percentile)}%`;
  }

  private log(...args: any[]): void {
    if (this.debug) {
      console.log('[Leaderboard Service]', ...args);
    }
  }
}

// ==================== Singleton Instance ====================
let leaderboardServiceInstance: LeaderboardService | null = null;

export function getLeaderboardService(debug?: boolean): LeaderboardService {
  if (!leaderboardServiceInstance) {
    leaderboardServiceInstance = new LeaderboardService(debug);
  }
  return leaderboardServiceInstance;
}

// ==================== Helper Functions ====================

/**
 * Get medal icon for rank
 */
export function getMedalIcon(rank: number): string {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `#${rank}`;
  }
}

/**
 * Get rank tier
 */
export function getRankTier(rank: number, totalPlayers: number): 'top' | 'high' | 'mid' | 'low' {
  const percentile = ((totalPlayers - rank) / totalPlayers) * 100;

  if (percentile >= 90) return 'top';
  if (percentile >= 70) return 'high';
  if (percentile >= 40) return 'mid';
  return 'low';
}

/**
 * Get tier color
 */
export function getTierColor(tier: 'top' | 'high' | 'mid' | 'low'): string {
  switch (tier) {
    case 'top':
      return '#F39C12'; // Gold
    case 'high':
      return '#3498DB'; // Blue
    case 'mid':
      return '#27AE60'; // Green
    case 'low':
      return '#95A5A6'; // Gray
  }
}

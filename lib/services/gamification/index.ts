// ============================================
// TÜRK OTO AI - Gamification Services Index
// Centralized exports for gamification features
// ============================================

// Scoring System
export {
  ScoringService,
  getScoringService,
  getScoreGrade,
  getScoreColor,
  formatScore,
} from './scoring';
export type {
  DrivingSession,
  DrivingScore,
  ScoreCalculationConfig,
} from './scoring';

// Achievements & Badges
export {
  AchievementsService,
  getAchievementsService,
  AchievementCategory,
  AchievementRarity,
  ACHIEVEMENTS,
} from './achievements';
export type {
  Achievement,
  AchievementCondition,
  Badge,
  Streak,
} from './achievements';

// Leaderboard
export {
  LeaderboardService,
  getLeaderboardService,
  LeaderboardPeriod,
  LeaderboardCategory,
  getMedalIcon,
  getRankTier,
  getTierColor,
} from './leaderboard';
export type {
  LeaderboardEntry,
  LeaderboardStats,
  CompetitionGroup,
} from './leaderboard';

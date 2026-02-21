// ============================================
// TÜRK OTO AI - Gamification API
// Scoring, achievements, and leaderboard endpoints
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import {
  getScoringService,
  getAchievementsService,
  getLeaderboardService,
  LeaderboardPeriod,
  LeaderboardCategory,
  DrivingSession,
} from '@/lib/services/gamification';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'leaderboard';
    const userId = searchParams.get('userId') || 'demo-user';

    switch (action) {
      // ==================== LEADERBOARD ====================
      case 'leaderboard': {
        const period = (searchParams.get('period') || 'WEEKLY') as LeaderboardPeriod;
        const category = (searchParams.get('category') || 'OVERALL') as LeaderboardCategory;
        const limit = parseInt(searchParams.get('limit') || '100');

        const leaderboardService = getLeaderboardService(true);
        const leaderboard = await leaderboardService.getLeaderboard(period, category, limit);

        return NextResponse.json({
          success: true,
          data: leaderboard,
          period,
          category,
        });
      }

      case 'leaderboard-context': {
        const period = (searchParams.get('period') || 'WEEKLY') as LeaderboardPeriod;
        const category = (searchParams.get('category') || 'OVERALL') as LeaderboardCategory;

        const leaderboardService = getLeaderboardService(true);
        const contextLeaderboard = await leaderboardService.getLeaderboardWithContext(
          userId,
          period,
          category
        );

        return NextResponse.json({
          success: true,
          data: contextLeaderboard,
          period,
          category,
        });
      }

      case 'leaderboard-stats': {
        const period = (searchParams.get('period') || 'WEEKLY') as LeaderboardPeriod;
        const category = (searchParams.get('category') || 'OVERALL') as LeaderboardCategory;

        const leaderboardService = getLeaderboardService(true);
        const stats = await leaderboardService.getLeaderboardStats(userId, period, category);

        return NextResponse.json({
          success: true,
          data: stats,
        });
      }

      case 'user-position': {
        const period = (searchParams.get('period') || 'WEEKLY') as LeaderboardPeriod;
        const category = (searchParams.get('category') || 'OVERALL') as LeaderboardCategory;

        const leaderboardService = getLeaderboardService(true);
        const position = await leaderboardService.getUserPosition(userId, period, category);

        return NextResponse.json({
          success: true,
          data: position,
        });
      }

      // ==================== ACHIEVEMENTS ====================
      case 'achievements': {
        const { ACHIEVEMENTS } = await import('@/lib/services/gamification/achievements');

        return NextResponse.json({
          success: true,
          data: {
            available: ACHIEVEMENTS,
            unlocked: [], // Would come from database
            inProgress: [],
          },
        });
      }

      case 'top-achievers': {
        const limit = parseInt(searchParams.get('limit') || '100');
        const leaderboardService = getLeaderboardService(true);
        const topAchievers = await leaderboardService.getTopAchievers(limit);

        return NextResponse.json({
          success: true,
          data: topAchievers,
        });
      }

      // ==================== COMPETITIONS ====================
      case 'competitions': {
        const leaderboardService = getLeaderboardService(true);
        const competitions = await leaderboardService.getUserCompetitions(userId);

        return NextResponse.json({
          success: true,
          data: competitions,
        });
      }

      case 'competition-standings': {
        const competitionId = searchParams.get('competitionId');
        if (!competitionId) {
          return NextResponse.json(
            { error: 'Competition ID gereklidir' },
            { status: 400 }
          );
        }

        const leaderboardService = getLeaderboardService(true);
        const standings = await leaderboardService.getCompetitionStandings(competitionId);

        return NextResponse.json({
          success: true,
          data: standings,
        });
      }

      // ==================== FRIENDS ====================
      case 'friends-leaderboard': {
        const friendIds = searchParams.get('friendIds')?.split(',') || [];
        const period = (searchParams.get('period') || 'WEEKLY') as LeaderboardPeriod;

        const leaderboardService = getLeaderboardService(true);
        const friendsLeaderboard = await leaderboardService.getFriendsLeaderboard(
          userId,
          friendIds,
          period
        );

        return NextResponse.json({
          success: true,
          data: friendsLeaderboard,
        });
      }

      case 'compare': {
        const targetUserId = searchParams.get('targetUserId');
        if (!targetUserId) {
          return NextResponse.json(
            { error: 'Target user ID gereklidir' },
            { status: 400 }
          );
        }

        const period = (searchParams.get('period') || 'WEEKLY') as LeaderboardPeriod;
        const leaderboardService = getLeaderboardService(true);
        const comparison = await leaderboardService.compareWithUser(userId, targetUserId, period);

        return NextResponse.json({
          success: true,
          data: comparison,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Geçersiz işlem' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('[Gamification API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Gamification sorgulaması başarısız' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || 'calculate-score';

    switch (action) {
      // ==================== SCORE CALCULATION ====================
      case 'calculate-score': {
        const session: DrivingSession = body.session;
        if (!session) {
          return NextResponse.json(
            { error: 'Session data gereklidir' },
            { status: 400 }
          );
        }

        const scoringService = getScoringService({ debug: true });

        // Calculate scores
        const breakdown = scoringService.calculateSessionScore(session);
        const overall = scoringService.calculateOverallScore(breakdown);

        // Calculate XP
        const xpGain = scoringService.calculateXPGain(
          overall,
          session.distance,
          session.duration
        );

        return NextResponse.json({
          success: true,
          data: {
            overall,
            breakdown,
            xpGain,
          },
        });
      }

      // ==================== CHECK ACHIEVEMENTS ====================
      case 'check-achievements': {
        const session: DrivingSession = body.session;
        const score = body.score;
        const userStats = body.userStats;
        const unlockedAchievements = body.unlockedAchievements || [];

        const achievementsService = getAchievementsService(true);
        const newAchievements = achievementsService.checkAchievements(
          session,
          score,
          userStats,
          unlockedAchievements
        );

        return NextResponse.json({
          success: true,
          data: newAchievements,
          count: newAchievements.length,
        });
      }

      // ==================== CREATE COMPETITION ====================
      case 'create-competition': {
        const { name, description, memberIds, durationDays, prize } = body;

        if (!name || !memberIds || !durationDays) {
          return NextResponse.json(
            { error: 'name, memberIds ve durationDays gereklidir' },
            { status: 400 }
          );
        }

        const leaderboardService = getLeaderboardService(true);
        const competition = await leaderboardService.createCompetition(
          name,
          description,
          memberIds,
          durationDays,
          prize
        );

        return NextResponse.json({
          success: true,
          data: competition,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Geçersiz işlem' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('[Gamification API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'İşlem başarısız' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

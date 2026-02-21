// ============================================
// TÜRK OTO AI - Battery Savings API
// Akü tasarruf hesaplama ve rapor endpoint'i
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// ==================== GET - Tasarruf raporunu getir ====================
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID gerekli' }, { status: 400 });
    }

    // Verify vehicle ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    // Get or create savings record
    let savings = await prisma.batterySavings.findUnique({
      where: { vehicleId }
    });

    if (!savings) {
      // Create initial record
      savings = await prisma.batterySavings.create({
        data: {
          vehicleId,
          userId: session.user.id
        }
      });
    }

    // Calculate weekly and monthly totals if needed (reset logic)
    const now = new Date();
    const lastWeeklyReset = new Date(savings.lastWeeklyReset);
    const lastMonthlyReset = new Date(savings.lastMonthlyReset);

    // Check if weekly reset needed (7 days)
    const weekDiff = Math.floor((now.getTime() - lastWeeklyReset.getTime()) / (1000 * 60 * 60 * 24));
    if (weekDiff >= 7) {
      savings = await prisma.batterySavings.update({
        where: { vehicleId },
        data: {
          weeklyEnergySaved: 0,
          weeklyCostSaved: 0,
          weeklyRangeAdded: 0,
          weeklyCO2Avoided: 0,
          lastWeeklyReset: now
        }
      });
    }

    // Check if monthly reset needed (30 days)
    const monthDiff = Math.floor((now.getTime() - lastMonthlyReset.getTime()) / (1000 * 60 * 60 * 24));
    if (monthDiff >= 30) {
      savings = await prisma.batterySavings.update({
        where: { vehicleId },
        data: {
          monthlyEnergySaved: 0,
          monthlyCostSaved: 0,
          monthlyRangeAdded: 0,
          monthlyCO2Avoided: 0,
          lastMonthlyReset: now
        }
      });
    }

    // Get latest battery health
    const latestHealth = await prisma.batteryHealthLog.findFirst({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' }
    });

    // Get charging statistics
    const totalCharges = await prisma.chargingSession.count({
      where: { vehicleId, status: 'COMPLETED' }
    });

    const optimizedCharges = await prisma.chargingSession.count({
      where: { vehicleId, status: 'COMPLETED', wasOptimal: true }
    });

    // Get recent eco driving sessions
    const recentEcoSessions = await prisma.ecoDrivingSession.findMany({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' },
      take: 10
    });

    const avgEcoScore = recentEcoSessions.length > 0
      ? recentEcoSessions.reduce((sum: number, s: any) => sum + s.overallScore, 0) / recentEcoSessions.length
      : 0;

    return NextResponse.json({
      success: true,
      savings: {
        // Weekly savings
        weekly: {
          energySaved: savings.weeklyEnergySaved,
          costSaved: savings.weeklyCostSaved,
          rangeAdded: savings.weeklyRangeAdded,
          co2Avoided: savings.weeklyCO2Avoided
        },
        // Monthly savings
        monthly: {
          energySaved: savings.monthlyEnergySaved,
          costSaved: savings.monthlyCostSaved,
          rangeAdded: savings.monthlyRangeAdded,
          co2Avoided: savings.monthlyCO2Avoided
        },
        // Total savings
        total: {
          energySaved: savings.totalEnergySaved,
          costSaved: savings.totalCostSaved,
          rangeAdded: savings.totalRangeAdded,
          co2Avoided: savings.totalCO2Avoided
        },
        // Battery life extension
        batteryLife: {
          extensionMonths: savings.batteryLifeExtension,
          cyclesAvoided: savings.cyclesAvoided,
          degradationAvoided: savings.degradationAvoided
        },
        // Optimization stats
        optimization: {
          optimizedCharges,
          totalCharges,
          optimizationRate: totalCharges > 0 ? (optimizedCharges / totalCharges) * 100 : 0
        },
        // Current battery health
        health: latestHealth ? {
          soh: latestHealth.soh,
          status: latestHealth.status,
          estimatedMonths: latestHealth.estimatedMonths
        } : null,
        // Eco driving
        ecoDriving: {
          avgScore: avgEcoScore,
          recentSessions: recentEcoSessions.length
        }
      },
      vehicle: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        fuelType: vehicle.fuelType
      }
    });

  } catch (error: any) {
    console.error('Battery Savings API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Tasarruf verileri alınamadı' },
      { status: 500 }
    );
  }
}

// ==================== POST - Tasarruf verisi ekle/güncelle ====================
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      vehicleId,
      energySaved,
      costSaved,
      rangeAdded,
      co2Avoided,
      batteryLifeExtension,
      cyclesAvoided,
      degradationAvoided
    } = body;

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID gerekli' }, { status: 400 });
    }

    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    // Get or create savings record
    let savings = await prisma.batterySavings.findUnique({
      where: { vehicleId }
    });

    if (!savings) {
      savings = await prisma.batterySavings.create({
        data: {
          vehicleId,
          userId: session.user.id
        }
      });
    }

    // Update savings (add to existing values)
    const updated = await prisma.batterySavings.update({
      where: { vehicleId },
      data: {
        // Weekly
        weeklyEnergySaved: { increment: energySaved || 0 },
        weeklyCostSaved: { increment: costSaved || 0 },
        weeklyRangeAdded: { increment: rangeAdded || 0 },
        weeklyCO2Avoided: { increment: co2Avoided || 0 },
        // Monthly
        monthlyEnergySaved: { increment: energySaved || 0 },
        monthlyCostSaved: { increment: costSaved || 0 },
        monthlyRangeAdded: { increment: rangeAdded || 0 },
        monthlyCO2Avoided: { increment: co2Avoided || 0 },
        // Total
        totalEnergySaved: { increment: energySaved || 0 },
        totalCostSaved: { increment: costSaved || 0 },
        totalRangeAdded: { increment: rangeAdded || 0 },
        totalCO2Avoided: { increment: co2Avoided || 0 },
        // Battery life
        batteryLifeExtension: batteryLifeExtension !== undefined
          ? batteryLifeExtension
          : savings.batteryLifeExtension,
        cyclesAvoided: { increment: cyclesAvoided || 0 },
        degradationAvoided: degradationAvoided !== undefined
          ? degradationAvoided
          : savings.degradationAvoided
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Tasarruf verileri güncellendi',
      savings: updated
    });

  } catch (error: any) {
    console.error('Battery Savings Update Error:', error);
    return NextResponse.json(
      { error: error.message || 'Tasarruf verileri güncellenemedi' },
      { status: 500 }
    );
  }
}

// ==================== DELETE - Tasarruf verilerini sıfırla ====================
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');
    const period = searchParams.get('period'); // 'weekly' | 'monthly' | 'all'

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID gerekli' }, { status: 400 });
    }

    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    let updateData: any = {};

    if (period === 'weekly') {
      updateData = {
        weeklyEnergySaved: 0,
        weeklyCostSaved: 0,
        weeklyRangeAdded: 0,
        weeklyCO2Avoided: 0,
        lastWeeklyReset: new Date()
      };
    } else if (period === 'monthly') {
      updateData = {
        monthlyEnergySaved: 0,
        monthlyCostSaved: 0,
        monthlyRangeAdded: 0,
        monthlyCO2Avoided: 0,
        lastMonthlyReset: new Date()
      };
    } else {
      // Reset everything
      updateData = {
        weeklyEnergySaved: 0,
        weeklyCostSaved: 0,
        weeklyRangeAdded: 0,
        weeklyCO2Avoided: 0,
        monthlyEnergySaved: 0,
        monthlyCostSaved: 0,
        monthlyRangeAdded: 0,
        monthlyCO2Avoided: 0,
        totalEnergySaved: 0,
        totalCostSaved: 0,
        totalRangeAdded: 0,
        totalCO2Avoided: 0,
        batteryLifeExtension: 0,
        cyclesAvoided: 0,
        degradationAvoided: 0,
        optimizedCharges: 0,
        totalCharges: 0,
        optimizationRate: 0,
        lastWeeklyReset: new Date(),
        lastMonthlyReset: new Date()
      };
    }

    const updated = await prisma.batterySavings.update({
      where: { vehicleId },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: `${period || 'Tüm'} tasarruf verileri sıfırlandı`,
      savings: updated
    });

  } catch (error: any) {
    console.error('Battery Savings Reset Error:', error);
    return NextResponse.json(
      { error: error.message || 'Tasarruf verileri sıfırlanamadı' },
      { status: 500 }
    );
  }
}

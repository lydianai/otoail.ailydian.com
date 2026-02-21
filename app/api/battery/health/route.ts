// ============================================
// TÜRK OTO AI - Battery Health API
// Akü sağlık durumu takibi ve analiz
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// ==================== GET - Akü sağlık durumunu getir ====================
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');
    const limit = parseInt(searchParams.get('limit') || '30');

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

    // Get latest health log
    const latestHealth = await prisma.batteryHealthLog.findFirst({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' }
    });

    // Get historical data
    const healthHistory = await prisma.batteryHealthLog.findMany({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' },
      take: limit
    });

    // Calculate trends
    let sohTrend = 0;
    let capacityTrend = 0;
    let cycleTrend = 0;

    if (healthHistory.length >= 2) {
      const recent = healthHistory[0];
      const older = healthHistory[healthHistory.length - 1];

      sohTrend = recent.soh - older.soh;
      capacityTrend = recent.capacityLoss ? (recent.capacityLoss - (older.capacityLoss || 0)) : 0;
      cycleTrend = recent.cycleCount - older.cycleCount;
    }

    // Calculate average degradation rate
    const avgDegradationRate = healthHistory.length > 0
      ? healthHistory.reduce((sum: number, h: any) => sum + (h.degradationRate || 0), 0) / healthHistory.length
      : 0;

    // Calculate health score (0-100)
    let healthScore = 100;
    if (latestHealth) {
      healthScore = latestHealth.soh * 0.7 + // SOH is 70% of score
                   (latestHealth.impedance ? Math.max(0, 100 - latestHealth.impedance * 10) : 15) * 0.15 + // Impedance 15%
                   (latestHealth.batteryTemp && latestHealth.batteryTemp >= 20 && latestHealth.batteryTemp <= 25 ? 15 : 10); // Temp 15%
    }

    return NextResponse.json({
      success: true,
      current: latestHealth ? {
        timestamp: latestHealth.timestamp,
        soh: latestHealth.soh,
        soc: latestHealth.soc,
        cycleCount: latestHealth.cycleCount,
        currentCapacity: latestHealth.currentCapacity,
        originalCapacity: latestHealth.originalCapacity,
        capacityLoss: latestHealth.capacityLoss,
        batteryTemp: latestHealth.batteryTemp,
        voltage: latestHealth.voltage,
        impedance: latestHealth.impedance,
        estimatedMonths: latestHealth.estimatedMonths,
        estimatedYears: latestHealth.estimatedYears,
        status: latestHealth.status,
        warnings: latestHealth.warnings,
        healthScore
      } : null,
      trends: {
        sohTrend,
        capacityTrend,
        cycleTrend,
        avgDegradationRate
      },
      history: healthHistory.map((h: any) => ({
        timestamp: h.timestamp,
        soh: h.soh,
        soc: h.soc,
        cycleCount: h.cycleCount,
        capacityLoss: h.capacityLoss,
        batteryTemp: h.batteryTemp,
        voltage: h.voltage,
        status: h.status
      })),
      vehicle: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        fuelType: vehicle.fuelType
      }
    });

  } catch (error: any) {
    console.error('Battery Health API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Akü sağlık verileri alınamadı' },
      { status: 500 }
    );
  }
}

// ==================== POST - Akü sağlık verisi ekle ====================
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      vehicleId,
      soh,
      soc,
      cycleCount,
      currentCapacity,
      originalCapacity,
      batteryTemp,
      voltage,
      impedance
    } = body;

    if (!vehicleId || soh === undefined || soc === undefined) {
      return NextResponse.json({
        error: 'vehicleId, soh ve soc alanları gerekli'
      }, { status: 400 });
    }

    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    // Get previous health log for change calculations
    const previousHealth = await prisma.batteryHealthLog.findFirst({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' }
    });

    // Calculate changes
    const sohChange = previousHealth ? soh - previousHealth.soh : 0;
    const cycleCountChange = previousHealth && cycleCount
      ? cycleCount - previousHealth.cycleCount
      : 0;

    // Calculate capacity loss
    const capacityLoss = originalCapacity
      ? ((originalCapacity - currentCapacity) / originalCapacity) * 100
      : undefined;

    // Calculate degradation rate (monthly)
    let degradationRate = undefined;
    if (previousHealth && previousHealth.timestamp) {
      const daysDiff = Math.max(1, Math.floor(
        (new Date().getTime() - new Date(previousHealth.timestamp).getTime()) / (1000 * 60 * 60 * 24)
      ));
      const monthlyRate = (Math.abs(sohChange) / daysDiff) * 30;
      degradationRate = monthlyRate;
    }

    // Estimate remaining lifespan
    const estimatedMonths = degradationRate && degradationRate > 0
      ? Math.floor((soh - 50) / degradationRate) // Assume 50% is end of life
      : undefined;

    const estimatedYears = estimatedMonths ? estimatedMonths / 12 : undefined;

    // Determine status
    let status: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'CRITICAL' = 'GOOD';
    if (soh >= 95) status = 'EXCELLENT';
    else if (soh >= 85) status = 'GOOD';
    else if (soh >= 70) status = 'FAIR';
    else if (soh >= 50) status = 'POOR';
    else status = 'CRITICAL';

    // Generate warnings
    const warnings: string[] = [];
    if (soh < 70) warnings.push('Akü sağlığı düşük');
    if (batteryTemp && batteryTemp > 40) warnings.push('Akü sıcaklığı yüksek');
    if (batteryTemp && batteryTemp < 5) warnings.push('Akü sıcaklığı düşük');
    if (impedance && impedance > 10) warnings.push('Yüksek direnç tespit edildi');
    if (voltage && voltage < 11.5) warnings.push('Düşük voltaj');

    // Create health log
    const healthLog = await prisma.batteryHealthLog.create({
      data: {
        vehicleId,
        soh,
        sohChange,
        degradationRate,
        soc,
        socMin: soc,
        socMax: soc,
        cycleCount: cycleCount || 0,
        cycleCountChange,
        currentCapacity,
        originalCapacity,
        capacityLoss,
        batteryTemp,
        voltage,
        impedance,
        estimatedMonths,
        estimatedYears,
        status,
        warnings
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Akü sağlık verisi kaydedildi',
      health: healthLog
    });

  } catch (error: any) {
    console.error('Battery Health Create Error:', error);
    return NextResponse.json(
      { error: error.message || 'Akü sağlık verisi kaydedilemedi' },
      { status: 500 }
    );
  }
}

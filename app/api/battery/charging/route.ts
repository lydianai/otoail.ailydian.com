// ============================================
// TÜRK OTO AI - Charging Optimization API
// Akıllı şarj optimizasyonu ve analiz
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// ==================== GET - Şarj geçmişini ve önerileri getir ====================
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');
    const action = searchParams.get('action');

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

    // Get recommendations
    if (action === 'recommendations') {
      const currentHour = new Date().getHours();

      // Get electricity pricing for recommendations
      const pricing = await prisma.electricityPricing.findFirst({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      });

      const isPeakHour = pricing
        ? currentHour >= pricing.peakHoursStart && currentHour <= pricing.peakHoursEnd
        : false;

      const isOffPeakHour = pricing
        ? currentHour >= pricing.offPeakHoursStart && currentHour <= pricing.offPeakHoursEnd
        : false;

      // Get latest battery health
      const latestHealth = await prisma.batteryHealthLog.findFirst({
        where: { vehicleId },
        orderBy: { timestamp: 'desc' }
      });

      const currentSOC = latestHealth?.soc || 50;
      const batteryTemp = latestHealth?.batteryTemp || 20;

      // Generate recommendations
      const recommendations: any[] = [];

      // SOC recommendations
      if (currentSOC < 20) {
        recommendations.push({
          type: 'URGENT',
          title: 'Acil Şarj Gerekli',
          message: 'Akü seviyesi %20\'nin altında. En yakın şarj istasyonuna gidin.',
          icon: 'alert-circle',
          color: 'red'
        });
      } else if (currentSOC < 30) {
        recommendations.push({
          type: 'WARNING',
          title: 'Şarj Önerilir',
          message: 'Akü seviyesi düşük. Yakında şarj etmeyi planlayın.',
          icon: 'battery-low',
          color: 'orange'
        });
      } else if (currentSOC > 80) {
        recommendations.push({
          type: 'INFO',
          title: '80/20 Kuralı',
          message: 'Akü sağlığı için %80\'de şarjı durdurun.',
          icon: 'info',
          color: 'blue'
        });
      }

      // Time-of-use recommendations
      if (isPeakHour) {
        recommendations.push({
          type: 'COST',
          title: 'Pahalı Saat',
          message: `Şu an elektrik fiyatları yüksek (${pricing?.peakPrice} TL/kWh). Off-peak saatlerini bekleyin.`,
          icon: 'clock',
          color: 'orange',
          optimalTime: `${pricing?.offPeakHoursStart}:00 - ${pricing?.offPeakHoursEnd}:00`
        });
      } else if (isOffPeakHour) {
        recommendations.push({
          type: 'SAVINGS',
          title: 'Ucuz Saat!',
          message: `Şarj için ideal zaman (${pricing?.offPeakPrice} TL/kWh). Tasarruf edin!`,
          icon: 'trending-down',
          color: 'green'
        });
      }

      // Temperature recommendations
      if (batteryTemp < 10) {
        recommendations.push({
          type: 'WARNING',
          title: 'Düşük Sıcaklık',
          message: 'Akü soğuk. Şarj hızı düşük olabilir. Ön ısıtma önerilir.',
          icon: 'thermometer',
          color: 'blue'
        });
      } else if (batteryTemp > 35) {
        recommendations.push({
          type: 'WARNING',
          title: 'Yüksek Sıcaklık',
          message: 'Akü sıcak. Soğumayı bekleyin veya yavaş şarj kullanın.',
          icon: 'thermometer',
          color: 'red'
        });
      }

      return NextResponse.json({
        success: true,
        recommendations,
        pricing,
        currentConditions: {
          soc: currentSOC,
          temperature: batteryTemp,
          isPeakHour,
          isOffPeakHour
        }
      });
    }

    // Get charging history
    const sessions = await prisma.chargingSession.findMany({
      where: { vehicleId },
      orderBy: { startTime: 'desc' },
      take: 50
    });

    // Get active session
    const activeSession = await prisma.chargingSession.findFirst({
      where: { vehicleId, status: 'IN_PROGRESS' },
      orderBy: { startTime: 'desc' }
    });

    // Calculate statistics
    const completedSessions = sessions.filter((s: any) => s.status === 'COMPLETED');
    const totalEnergy = completedSessions.reduce((sum: number, s: any) => sum + (s.energyAdded || 0), 0);
    const totalCost = completedSessions.reduce((sum: number, s: any) => sum + (s.cost || 0), 0);
    const totalSavings = completedSessions.reduce((sum: number, s: any) => sum + (s.savings || 0), 0);
    const avgCostPerKWh = totalEnergy > 0 ? totalCost / totalEnergy : 0;
    const optimizedCount = completedSessions.filter((s: any) => s.wasOptimal).length;
    const optimizationRate = completedSessions.length > 0
      ? (optimizedCount / completedSessions.length) * 100
      : 0;

    return NextResponse.json({
      success: true,
      activeSession,
      sessions: sessions.map((s: any) => ({
        id: s.id,
        startTime: s.startTime,
        endTime: s.endTime,
        duration: s.duration,
        status: s.status,
        startSOC: s.startSOC,
        endSOC: s.endSOC,
        targetSOC: s.targetSOC,
        energyAdded: s.energyAdded,
        cost: s.cost,
        costPerKWh: s.costPerKWh,
        savings: s.savings,
        chargerType: s.chargerType,
        locationType: s.locationType,
        wasOptimal: s.wasOptimal,
        optimizedBy: s.optimizedBy
      })),
      statistics: {
        totalSessions: completedSessions.length,
        totalEnergy,
        totalCost,
        totalSavings,
        avgCostPerKWh,
        optimizedCount,
        optimizationRate
      }
    });

  } catch (error: any) {
    console.error('Charging API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Şarj verileri alınamadı' },
      { status: 500 }
    );
  }
}

// ==================== POST - Şarj oturumu başlat/kaydet ====================
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      vehicleId,
      startSOC,
      targetSOC,
      chargerType,
      locationType,
      locationLat,
      locationLong,
      chargerPower,
      startTemp
    } = body;

    if (!vehicleId || startSOC === undefined) {
      return NextResponse.json({
        error: 'vehicleId ve startSOC gerekli'
      }, { status: 400 });
    }

    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    // Get current pricing
    const pricing = await prisma.electricityPricing.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    const currentHour = new Date().getHours();
    const isPeakHour = pricing
      ? currentHour >= pricing.peakHoursStart && currentHour <= pricing.peakHoursEnd
      : false;

    // Determine if this is optimal charging time
    const wasOptimal = !isPeakHour && startTemp >= 15 && startTemp <= 30 && targetSOC <= 80;

    // Calculate optimal time
    const optimalTime = pricing && isPeakHour
      ? new Date(new Date().setHours(pricing.offPeakHoursStart, 0, 0, 0))
      : undefined;

    // Get current electricity price
    let costPerKWh = 2.5; // Default TL/kWh
    if (pricing) {
      if (isPeakHour) costPerKWh = pricing.peakPrice;
      else if (currentHour >= pricing.offPeakHoursStart && currentHour <= pricing.offPeakHoursEnd) {
        costPerKWh = pricing.offPeakPrice;
      } else {
        costPerKWh = pricing.normalPrice;
      }
    }

    // Create charging session
    const chargingSession = await prisma.chargingSession.create({
      data: {
        vehicleId,
        userId: session.user.id,
        startTime: new Date(),
        status: 'IN_PROGRESS',
        startSOC,
        targetSOC: targetSOC || 80,
        chargerType: chargerType || 'LEVEL_2',
        locationType: locationType || 'HOME',
        locationLat,
        locationLong,
        chargerPower,
        startTemp,
        costPerKWh,
        wasOptimal,
        optimizedBy: wasOptimal ? 'AI' : 'Manual',
        optimalTime,
        peakHourCharging: isPeakHour,
        usedSlowCharging: targetSOC <= 80,
        temperatureOK: startTemp >= 15 && startTemp <= 30
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Şarj oturumu başlatıldı',
      session: chargingSession,
      recommendations: wasOptimal
        ? 'Optimal şarj koşulları! Devam edin.'
        : 'Daha iyi tasarruf için önerilerimizi kontrol edin.'
    });

  } catch (error: any) {
    console.error('Charging Session Create Error:', error);
    return NextResponse.json(
      { error: error.message || 'Şarj oturumu başlatılamadı' },
      { status: 500 }
    );
  }
}

// ==================== PUT - Şarj oturumunu tamamla ====================
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      sessionId,
      endSOC,
      endTemp,
      energyAdded
    } = body;

    if (!sessionId || endSOC === undefined) {
      return NextResponse.json({
        error: 'sessionId ve endSOC gerekli'
      }, { status: 400 });
    }

    // Get charging session
    const chargingSession = await prisma.chargingSession.findUnique({
      where: { id: sessionId }
    });

    if (!chargingSession || chargingSession.userId !== session.user.id) {
      return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 404 });
    }

    // Calculate duration
    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - new Date(chargingSession.startTime).getTime()) / (1000 * 60));

    // Calculate cost
    const cost = energyAdded && chargingSession.costPerKWh
      ? energyAdded * chargingSession.costPerKWh
      : undefined;

    // Calculate savings (if charged during off-peak vs peak)
    const pricing = await prisma.electricityPricing.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    let savings = 0;
    if (pricing && energyAdded && !chargingSession.peakHourCharging) {
      const peakCost = energyAdded * pricing.peakPrice;
      const actualCost = cost || 0;
      savings = peakCost - actualCost;
    }

    // Update session
    const updated = await prisma.chargingSession.update({
      where: { id: sessionId },
      data: {
        endTime,
        duration,
        status: 'COMPLETED',
        endSOC,
        endTemp,
        energyAdded,
        cost,
        savings
      }
    });

    // Update battery savings
    if (savings > 0 && energyAdded) {
      const vehicleSavings = await prisma.batterySavings.findUnique({
        where: { vehicleId: chargingSession.vehicleId }
      });

      if (vehicleSavings) {
        await prisma.batterySavings.update({
          where: { vehicleId: chargingSession.vehicleId },
          data: {
            weeklyEnergySaved: { increment: energyAdded * 0.1 }, // 10% efficiency gain
            weeklyCostSaved: { increment: savings },
            monthlyEnergySaved: { increment: energyAdded * 0.1 },
            monthlyCostSaved: { increment: savings },
            totalEnergySaved: { increment: energyAdded * 0.1 },
            totalCostSaved: { increment: savings },
            totalCharges: { increment: 1 },
            optimizedCharges: { increment: updated.wasOptimal ? 1 : 0 }
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Şarj oturumu tamamlandı',
      session: updated,
      savings: savings > 0 ? `${savings.toFixed(2)} TL tasarruf edildi!` : undefined
    });

  } catch (error: any) {
    console.error('Charging Session Complete Error:', error);
    return NextResponse.json(
      { error: error.message || 'Şarj oturumu tamamlanamadı' },
      { status: 500 }
    );
  }
}

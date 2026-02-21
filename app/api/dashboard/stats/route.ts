import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');

    // Kullanıcının tüm araçlarını al
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: session.user.id },
      include: {
        obdData: {
          orderBy: { timestamp: 'desc' },
          take: 1
        },
        obdDevice: true,
        maintenanceAlerts: {
          where: { resolved: false }
        }
      }
    });

    if (vehicles.length === 0) {
      return NextResponse.json({
        success: true,
        hasVehicles: false,
        message: 'No vehicles found'
      });
    }

    // Aktif araç (belirtilmişse o, yoksa ilk araç)
    const activeVehicle = vehicleId
      ? vehicles.find((v: typeof vehicles[0]) => v.id === vehicleId) || vehicles[0]
      : vehicles[0];

    // Son OBD verisi
    const latestOBD = activeVehicle.obdData[0];

    // Kullanıcı istatistikleri
    const userStats = await prisma.userStats.findFirst({
      where: {
        userId: session.user.id,
        period: 'ALLTIME'
      }
    });

    // Sürüş skorları
    const drivingScores = await prisma.drivingScore.findMany({
      where: {
        userId: session.user.id,
        vehicleId: activeVehicle.id
      },
      orderBy: { date: 'desc' },
      take: 30
    });

    const avgScore = drivingScores.length > 0
      ? drivingScores.reduce((sum: number, s: typeof drivingScores[0]) => sum + s.overall, 0) / drivingScores.length
      : 0;

    // HGS bilgisi
    const hgsInfo = await prisma.hGSInfo.findUnique({
      where: { userId: session.user.id },
      include: {
        transactions: {
          orderBy: { timestamp: 'desc' },
          take: 5
        }
      }
    });

    // Trafik cezaları
    const trafficFines = await prisma.trafficFine.findMany({
      where: {
        userId: session.user.id,
        paid: false
      }
    });

    // MTV bilgisi
    const mtvInfo = await prisma.mTVInfo.findMany({
      where: {
        vehicleId: activeVehicle.id,
        paid: false
      },
      orderBy: { dueDate: 'asc' }
    });

    // Yakıt fiyatları (kullanıcının şehrinden)
    const fuelPrices = await prisma.fuelPrice.findMany({
      where: { city: 'İstanbul' }, // TODO: Kullanıcının şehrini al
      orderBy: { lastUpdate: 'desc' },
      take: 1,
      distinct: ['fuelType']
    });

    // Son konuşmalar
    const recentConversations = await prisma.conversation.findMany({
      where: { userId: session.user.id },
      include: {
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 2
        }
      },
      orderBy: { startedAt: 'desc' },
      take: 5
    });

    // Bakım uyarıları
    const maintenanceAlerts = activeVehicle.maintenanceAlerts;

    // Rozet ve başarılar
    const badges = await prisma.badge.findMany({
      where: {
        drivingScore: {
          userId: session.user.id
        }
      },
      include: {
        drivingScore: true
      },
      orderBy: { earnedAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      hasVehicles: true,
      vehicle: {
        id: activeVehicle.id,
        make: activeVehicle.make,
        model: activeVehicle.model,
        year: activeVehicle.year,
        licensePlate: activeVehicle.licensePlate,
        fuelType: activeVehicle.fuelType,
        transmission: activeVehicle.transmission,
        hasOBD: !!activeVehicle.obdDevice,
        obdConnected: activeVehicle.obdDevice?.connected || false
      },
      obdData: latestOBD ? {
        rpm: latestOBD.rpm,
        speed: latestOBD.speed,
        engineLoad: latestOBD.engineLoad,
        throttlePosition: latestOBD.throttlePosition,
        coolantTemp: latestOBD.coolantTemp,
        intakeTemp: latestOBD.intakeTemp,
        oilTemp: latestOBD.oilTemp,
        fuelLevel: latestOBD.fuelLevel,
        fuelConsumption: latestOBD.fuelConsumption,
        fuelPressure: latestOBD.fuelPressure,
        batteryVoltage: latestOBD.batteryVoltage,
        horsepower: latestOBD.horsepower,
        torque: latestOBD.torque,
        efficiency: latestOBD.efficiency,
        maf: latestOBD.maf,
        dtcCodes: latestOBD.dtcCodes,
        timestamp: latestOBD.timestamp
      } : null,
      userStats: userStats ? {
        totalDistance: userStats.totalDistance,
        totalDuration: userStats.totalDuration,
        totalFuelConsumed: userStats.totalFuelConsumed,
        totalFuelSaved: userStats.totalFuelSaved,
        totalCO2Reduced: userStats.totalCO2Reduced,
        averageScore: avgScore,
        badgesEarned: badges.length,
        rank: userStats.rank
      } : {
        totalDistance: 0,
        totalDuration: 0,
        totalFuelConsumed: 0,
        totalFuelSaved: 0,
        totalCO2Reduced: 0,
        averageScore: 0,
        badgesEarned: 0,
        rank: 'BEGINNER'
      },
      drivingScores: drivingScores.slice(0, 7).map((s: typeof drivingScores[0]) => ({
        date: s.date,
        overall: s.overall,
        acceleration: s.acceleration,
        braking: s.braking,
        cornering: s.cornering,
        efficiency: s.efficiency
      })),
      hgsInfo: hgsInfo ? {
        balance: hgsInfo.balance,
        lastUpdate: hgsInfo.lastUpdate,
        recentTransactions: hgsInfo.transactions.map((t: typeof hgsInfo.transactions[0]) => ({
          date: t.timestamp,
          location: t.location,
          amount: t.amount,
          balance: t.balance
        }))
      } : null,
      trafficFines: trafficFines.map((f: typeof trafficFines[0]) => ({
        id: f.id,
        date: f.date,
        location: f.location,
        violation: f.violation,
        amount: f.amount,
        dueDate: f.dueDate
      })),
      mtvInfo: mtvInfo.map((m: typeof mtvInfo[0]) => ({
        id: m.id,
        year: m.year,
        amount: m.amount,
        dueDate: m.dueDate
      })),
      fuelPrices: fuelPrices.map((fp: typeof fuelPrices[0]) => ({
        fuelType: fp.fuelType,
        price: fp.price,
        station: fp.station,
        lastUpdate: fp.lastUpdate
      })),
      maintenanceAlerts: maintenanceAlerts.map((ma: typeof maintenanceAlerts[0]) => ({
        id: ma.id,
        type: ma.type,
        severity: ma.severity,
        description: ma.description,
        recommendation: ma.recommendation,
        estimatedCost: ma.estimatedCost,
        prediction: ma.prediction
      })),
      badges: badges.slice(0, 5).map((b: typeof badges[0]) => ({
        name: b.name,
        description: b.description,
        icon: b.icon,
        rarity: b.rarity,
        earnedAt: b.earnedAt
      })),
      recentConversations: recentConversations.map((c: typeof recentConversations[0]) => ({
        id: c.id,
        startedAt: c.startedAt,
        userIntent: c.userIntent,
        lastMessage: c.messages[0]?.content || ''
      })),
      availableVehicles: vehicles.map((v: typeof vehicles[0]) => ({
        id: v.id,
        name: `${v.make} ${v.model}`,
        licensePlate: v.licensePlate
      }))
    });

  } catch (error) {
    console.error('Dashboard Stats API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

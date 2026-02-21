import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET - Araç OBD verilerini al
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');
    const limit = parseInt(searchParams.get('limit') || '1');
    const timeRange = searchParams.get('timeRange'); // 'hour', 'day', 'week', 'month'

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    // Araç sahibini doğrula
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { user: true }
    });

    if (!vehicle || vehicle.userId !== session.user.id) {
      return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
    }

    // Zaman aralığına göre filtrele
    let timeFilter = {};
    if (timeRange) {
      const now = new Date();
      let startDate = new Date();

      switch (timeRange) {
        case 'hour':
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
          break;
        case 'day':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }

      timeFilter = {
        timestamp: {
          gte: startDate
        }
      };
    }

    // OBD verilerini al
    const obdData = await prisma.oBDData.findMany({
      where: {
        vehicleId,
        ...timeFilter
      },
      orderBy: { timestamp: 'desc' },
      take: limit
    });

    // İstatistikler hesapla
    const stats = obdData.length > 0 ? {
      avgRPM: obdData.reduce((sum: number, d: typeof obdData[0]) => sum + d.rpm, 0) / obdData.length,
      avgSpeed: obdData.reduce((sum: number, d: typeof obdData[0]) => sum + d.speed, 0) / obdData.length,
      avgFuelConsumption: obdData.reduce((sum: number, d: typeof obdData[0]) => sum + d.fuelConsumption, 0) / obdData.length,
      avgEfficiency: obdData.reduce((sum: number, d: typeof obdData[0]) => sum + d.efficiency, 0) / obdData.length,
      maxRPM: Math.max(...obdData.map((d: typeof obdData[0]) => d.rpm)),
      maxSpeed: Math.max(...obdData.map((d: typeof obdData[0]) => d.speed)),
      totalDistance: obdData.length * 0.1 // Yaklaşık hesaplama
    } : null;

    // DTC kodlarını topla
    const allDTCs = obdData
      .flatMap((d: typeof obdData[0]) => d.dtcCodes)
      .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i); // Unique

    return NextResponse.json({
      success: true,
      data: obdData[0] || null, // En son veri
      history: obdData,
      stats,
      dtcCodes: allDTCs,
      vehicle: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        licensePlate: vehicle.licensePlate
      }
    });

  } catch (error) {
    console.error('OBD Data API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Yeni OBD verisi kaydet (OBD cihazından gelen veriler için)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { vehicleId, ...obdMetrics } = data;

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    // Araç sahibini doğrula
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!vehicle || vehicle.userId !== session.user.id) {
      return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
    }

    // OBD verisi kaydet
    const obdData = await prisma.oBDData.create({
      data: {
        vehicleId,
        rpm: obdMetrics.rpm || 0,
        speed: obdMetrics.speed || 0,
        engineLoad: obdMetrics.engineLoad || 0,
        throttlePosition: obdMetrics.throttlePosition || 0,
        coolantTemp: obdMetrics.coolantTemp || 0,
        intakeTemp: obdMetrics.intakeTemp || 0,
        oilTemp: obdMetrics.oilTemp || null,
        fuelLevel: obdMetrics.fuelLevel || 0,
        fuelConsumption: obdMetrics.fuelConsumption || 0,
        fuelPressure: obdMetrics.fuelPressure || null,
        batteryVoltage: obdMetrics.batteryVoltage || 0,
        horsepower: obdMetrics.horsepower || null,
        torque: obdMetrics.torque || null,
        efficiency: obdMetrics.efficiency || 0,
        maf: obdMetrics.maf || null,
        dtcCodes: obdMetrics.dtcCodes || []
      }
    });

    // Verimlilik skorunu hesapla ve kaydet
    if (obdMetrics.efficiency > 0) {
      await updateDrivingScore(vehicle.userId, vehicleId, {
        efficiency: obdMetrics.efficiency,
        fuelConsumption: obdMetrics.fuelConsumption
      });
    }

    // Bakım uyarıları oluştur
    await checkMaintenanceAlerts(vehicleId, obdData);

    return NextResponse.json({
      success: true,
      data: obdData
    });

  } catch (error) {
    console.error('OBD Data POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Sürüş skorunu güncelle
async function updateDrivingScore(userId: string, vehicleId: string, metrics: any) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingScore = await prisma.drivingScore.findFirst({
    where: {
      userId,
      vehicleId,
      date: {
        gte: today
      }
    }
  });

  if (existingScore) {
    // Mevcut skoru güncelle
    await prisma.drivingScore.update({
      where: { id: existingScore.id },
      data: {
        efficiency: (existingScore.efficiency + metrics.efficiency) / 2,
        fuelSaved: existingScore.fuelSaved + (metrics.fuelConsumption < 7 ? 0.1 : 0)
      }
    });
  } else {
    // Yeni skor oluştur
    await prisma.drivingScore.create({
      data: {
        userId,
        vehicleId,
        overall: metrics.efficiency,
        acceleration: 85,
        braking: 85,
        cornering: 85,
        efficiency: metrics.efficiency,
        distance: 0,
        duration: 0,
        fuelSaved: 0
      }
    });
  }
}

// Bakım uyarıları kontrol et
async function checkMaintenanceAlerts(vehicleId: string, obdData: any) {
  const alerts = [];

  // Motor yağı sıcaklığı kontrolü
  if (obdData.oilTemp && obdData.oilTemp > 120) {
    alerts.push({
      vehicleId,
      type: 'OIL_CHANGE',
      severity: 'WARNING',
      description: 'Motor yağı sıcaklığı yüksek',
      recommendation: 'Motor yağını kontrol ettirin',
      estimatedCost: 450,
      prediction: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 hafta sonra
    });
  }

  // Soğutma sıvısı kontrolü
  if (obdData.coolantTemp > 105) {
    alerts.push({
      vehicleId,
      type: 'COOLANT',
      severity: 'CRITICAL',
      description: 'Soğutma sıvısı sıcaklığı kritik seviyede',
      recommendation: 'Acil servis gerekli',
      estimatedCost: 350,
      prediction: new Date()
    });
  }

  // Akü voltajı kontrolü
  if (obdData.batteryVoltage < 12.5) {
    alerts.push({
      vehicleId,
      type: 'BATTERY',
      severity: 'WARNING',
      description: 'Akü voltajı düşük',
      recommendation: 'Akü kontrolü yaptırın',
      estimatedCost: 850,
      prediction: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 1 ay sonra
    });
  }

  // Uyarıları kaydet
  for (const alert of alerts) {
    const existing = await prisma.maintenanceAlert.findFirst({
      where: {
        vehicleId: alert.vehicleId,
        type: alert.type,
        resolved: false
      }
    });

    if (!existing) {
      await prisma.maintenanceAlert.create({
        data: alert as any
      });
    }
  }
}

// ============================================
// TÜRK OTO AI - AI Range Prediction API
// Çok faktörlü yapay zeka menzil tahmini
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// AI Range Prediction Algorithm
function calculateAIRangePrediction(params: {
  currentSOC: number;
  batteryHealth: number;
  temperature: number;
  drivingStyle: number;
  terrain: 'flat' | 'hilly' | 'mixed';
  traffic: 'light' | 'moderate' | 'heavy';
  climate: boolean;
  passengers: number;
  cargo: number;
  baseRange: number; // Nominal range at 100% SOC
}) {
  const {
    currentSOC,
    batteryHealth,
    temperature,
    drivingStyle,
    terrain,
    traffic,
    climate,
    passengers,
    cargo,
    baseRange
  } = params;

  // Base calculation from SOC
  let predictedRange = (currentSOC / 100) * baseRange;

  // Battery health factor (SOH affects capacity)
  const healthFactor = batteryHealth / 100;
  predictedRange *= healthFactor;

  // Temperature impact (optimal: 20-25°C)
  let tempFactor = 1.0;
  if (temperature < 0) tempFactor = 0.6; // -40% at freezing
  else if (temperature < 10) tempFactor = 0.8; // -20% cold
  else if (temperature < 20) tempFactor = 0.9; // -10% cool
  else if (temperature <= 25) tempFactor = 1.0; // optimal
  else if (temperature <= 30) tempFactor = 0.95; // -5% warm
  else if (temperature <= 35) tempFactor = 0.85; // -15% hot
  else tempFactor = 0.7; // -30% very hot

  predictedRange *= tempFactor;

  // Driving style impact (0-100 score, higher is better)
  const styleFactor = 0.7 + (drivingStyle / 100) * 0.3; // 0.7-1.0 range
  predictedRange *= styleFactor;

  // Terrain impact
  const terrainFactors = {
    flat: 1.0,
    mixed: 0.85,
    hilly: 0.75
  };
  predictedRange *= terrainFactors[terrain];

  // Traffic impact
  const trafficFactors = {
    light: 1.0,
    moderate: 0.9,
    heavy: 0.8
  };
  predictedRange *= trafficFactors[traffic];

  // Climate control (AC/Heating)
  if (climate) {
    const climateFactor = temperature < 15 || temperature > 25 ? 0.85 : 0.95;
    predictedRange *= climateFactor;
  }

  // Passenger/cargo weight (assuming 70kg per passenger, base weight)
  const extraWeight = passengers * 70 + cargo;
  const weightFactor = Math.max(0.85, 1 - (extraWeight / 2000) * 0.15); // Max 15% reduction
  predictedRange *= weightFactor;

  // Calculate conservative and optimistic ranges
  const conservativeRange = predictedRange * 0.85; // -15%
  const optimisticRange = predictedRange * 1.1; // +10%

  // Calculate confidence (based on data quality)
  let confidence = 90;
  if (drivingStyle === 0) confidence -= 10; // No driving data
  if (temperature === 20) confidence -= 5; // Default temp (no sensor)

  return {
    predicted: Math.round(predictedRange),
    conservative: Math.round(conservativeRange),
    optimistic: Math.round(optimisticRange),
    confidence,
    factors: {
      soc: currentSOC,
      health: healthFactor,
      temperature: tempFactor,
      drivingStyle: styleFactor,
      terrain: terrainFactors[terrain],
      traffic: trafficFactors[traffic],
      climate: climate ? 0.85 : 1.0,
      weight: weightFactor
    }
  };
}

// ==================== GET - Menzil tahmini al ====================
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

    // Get latest battery health
    const latestHealth = await prisma.batteryHealthLog.findFirst({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' }
    });

    // Get recent eco driving sessions for driving style
    const recentSessions = await prisma.ecoDrivingSession.findMany({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' },
      take: 10
    });

    const avgDrivingScore = recentSessions.length > 0
      ? recentSessions.reduce((sum: number, s: any) => sum + s.overallScore, 0) / recentSessions.length
      : 75; // Default to average

    // Get prediction history
    const history = await prisma.rangePrediction.findMany({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' },
      take: 20
    });

    // Calculate accuracy from past predictions
    const completedPredictions = history.filter((p: any) => p.actualRange !== null);
    const avgAccuracy = completedPredictions.length > 0
      ? completedPredictions.reduce((sum: number, p: any) => sum + (p.predictionAccuracy || 0), 0) / completedPredictions.length
      : 0;

    return NextResponse.json({
      success: true,
      current: latestHealth ? {
        soc: latestHealth.soc,
        soh: latestHealth.soh,
        temperature: latestHealth.batteryTemp,
        drivingScore: avgDrivingScore
      } : null,
      history: history.map((p: any) => ({
        timestamp: p.timestamp,
        currentSOC: p.currentSOC,
        predicted: p.predictedRange,
        conservative: p.conservativeRange,
        optimistic: p.optimisticRange,
        actual: p.actualRange,
        accuracy: p.predictionAccuracy
      })),
      statistics: {
        totalPredictions: history.length,
        completedPredictions: completedPredictions.length,
        avgAccuracy: avgAccuracy.toFixed(1)
      }
    });

  } catch (error: any) {
    console.error('Range Prediction API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Menzil tahmini alınamadı' },
      { status: 500 }
    );
  }
}

// ==================== POST - Yeni menzil tahmini oluştur ====================
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      vehicleId,
      currentSOC,
      baseRange,
      temperature,
      terrain,
      traffic,
      climate,
      passengers,
      cargo
    } = body;

    if (!vehicleId || currentSOC === undefined || !baseRange) {
      return NextResponse.json({
        error: 'vehicleId, currentSOC ve baseRange gerekli'
      }, { status: 400 });
    }

    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    // Get battery health
    const latestHealth = await prisma.batteryHealthLog.findFirst({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' }
    });

    // Get driving style score
    const recentSessions = await prisma.ecoDrivingSession.findMany({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' },
      take: 10
    });

    const drivingScore = recentSessions.length > 0
      ? recentSessions.reduce((sum: number, s: any) => sum + s.overallScore, 0) / recentSessions.length
      : 75;

    // Calculate AI prediction
    const prediction = calculateAIRangePrediction({
      currentSOC,
      batteryHealth: latestHealth?.soh || 95,
      temperature: temperature || latestHealth?.batteryTemp || 20,
      drivingStyle: drivingScore,
      terrain: terrain || 'mixed',
      traffic: traffic || 'moderate',
      climate: climate !== undefined ? climate : false,
      passengers: passengers || 1,
      cargo: cargo || 0,
      baseRange
    });

    // Get current display range (from vehicle computer)
    const currentRange = (currentSOC / 100) * baseRange;

    // Save prediction
    const rangePrediction = await prisma.rangePrediction.create({
      data: {
        vehicleId,
        currentSOC,
        currentRange,
        predictedRange: prediction.predicted,
        conservativeRange: prediction.conservative,
        optimisticRange: prediction.optimistic,
        batteryHealth: latestHealth?.soh,
        temperature: temperature || latestHealth?.batteryTemp,
        drivingStyle: drivingScore,
        terrain: terrain || 'mixed',
        traffic: traffic || 'moderate',
        climate: climate || false,
        passengers: passengers || 1,
        cargo: cargo || 0,
        confidenceLevel: prediction.confidence,
        modelVersion: 'v1.0-ai'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'AI menzil tahmini oluşturuldu',
      prediction: {
        predicted: prediction.predicted,
        conservative: prediction.conservative,
        optimistic: prediction.optimistic,
        confidence: prediction.confidence,
        vehicleRange: currentRange,
        difference: prediction.predicted - currentRange,
        factors: prediction.factors,
        recommendations: generateRecommendations(prediction.factors)
      },
      id: rangePrediction.id
    });

  } catch (error: any) {
    console.error('Range Prediction Create Error:', error);
    return NextResponse.json(
      { error: error.message || 'Menzil tahmini oluşturulamadı' },
      { status: 500 }
    );
  }
}

// ==================== PUT - Gerçekleşen menzili güncelle ====================
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { predictionId, actualRange } = body;

    if (!predictionId || actualRange === undefined) {
      return NextResponse.json({
        error: 'predictionId ve actualRange gerekli'
      }, { status: 400 });
    }

    // Get prediction
    const prediction = await prisma.rangePrediction.findUnique({
      where: { id: predictionId }
    });

    if (!prediction) {
      return NextResponse.json({ error: 'Tahmin bulunamadı' }, { status: 404 });
    }

    // Calculate accuracy
    const error = Math.abs(prediction.predictedRange - actualRange);
    const accuracy = Math.max(0, 100 - (error / actualRange) * 100);

    // Update prediction
    const updated = await prisma.rangePrediction.update({
      where: { id: predictionId },
      data: {
        actualRange,
        predictionAccuracy: accuracy,
        error
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Tahmin doğruluğu güncellendi',
      prediction: updated,
      accuracy: accuracy.toFixed(1) + '%',
      error: error.toFixed(1) + ' km'
    });

  } catch (error: any) {
    console.error('Range Prediction Update Error:', error);
    return NextResponse.json(
      { error: error.message || 'Tahmin güncellenemedi' },
      { status: 500 }
    );
  }
}

// Helper: Generate recommendations based on factors
function generateRecommendations(factors: any): string[] {
  const recommendations: string[] = [];

  if (factors.temperature < 0.85) {
    recommendations.push('Akü sıcaklığını optimize edin (ön ısıtma kullanın)');
  }

  if (factors.drivingStyle < 0.85) {
    recommendations.push('Eko sürüş modu kullanarak menzili %15-20 artırabilirsiniz');
  }

  if (factors.climate < 0.95) {
    recommendations.push('Klima kullanımını azaltarak ekstra 10-15 km menzil kazanın');
  }

  if (factors.terrain < 0.9) {
    recommendations.push('Düz rotalar tercih ederek enerji tasarrufu sağlayın');
  }

  if (factors.traffic < 0.95) {
    recommendations.push('Trafiğin az olduğu saatlerde seyahat edin');
  }

  if (recommendations.length === 0) {
    recommendations.push('Tüm parametreler optimal! Sürüşünüze devam edin.');
  }

  return recommendations;
}

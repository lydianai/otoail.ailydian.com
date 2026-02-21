// ============================================
// TÜRK OTO AI - Vehicle Screen Configuration API
// Auto-detect and configure dashboard for specific vehicle screens
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import {
  findVehicleScreen,
  getDashboardConfig,
  getOptimalFontSizes,
  getSupportedMakes,
  getModelsForMake
} from '@/lib/vehicle-screen-database';

// ==================== GET - Fetch screen config for vehicle ====================
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');
    const action = searchParams.get('action');

    // Return supported makes/models for UI
    if (action === 'makes') {
      return NextResponse.json({
        success: true,
        makes: getSupportedMakes()
      });
    }

    if (action === 'models') {
      const make = searchParams.get('make');
      if (!make) {
        return NextResponse.json({ error: 'Make required' }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        models: getModelsForMake(make)
      });
    }

    // Get vehicle screen config
    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    // Check if screen config already exists
    if (vehicle.screenSize && vehicle.screenWidth && vehicle.screenHeight) {
      const dashboardConfig = getDashboardConfig({
        make: vehicle.make,
        model: vehicle.model,
        yearStart: vehicle.year,
        screenSize: vehicle.screenSize,
        screenWidth: vehicle.screenWidth,
        screenHeight: vehicle.screenHeight,
        screenRatio: vehicle.screenRatio || '16:9',
        isPortrait: vehicle.isPortrait,
        isTouchscreen: true,
        recommendedScale: vehicle.dashboardScale || 1.0,
        fontSizeMultiplier: vehicle.dashboardScale || 1.0
      });

      const fontSizes = getOptimalFontSizes({
        make: vehicle.make,
        model: vehicle.model,
        yearStart: vehicle.year,
        screenSize: vehicle.screenSize,
        screenWidth: vehicle.screenWidth,
        screenHeight: vehicle.screenHeight,
        screenRatio: vehicle.screenRatio || '16:9',
        isPortrait: vehicle.isPortrait,
        isTouchscreen: true,
        recommendedScale: vehicle.dashboardScale || 1.0,
        fontSizeMultiplier: vehicle.dashboardScale || 1.0
      });

      return NextResponse.json({
        success: true,
        vehicle: {
          id: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year
        },
        screenConfig: {
          screenSize: vehicle.screenSize,
          screenWidth: vehicle.screenWidth,
          screenHeight: vehicle.screenHeight,
          screenRatio: vehicle.screenRatio,
          isPortrait: vehicle.isPortrait,
          dashboardScale: vehicle.dashboardScale
        },
        dashboardConfig,
        fontSizes,
        source: 'database'
      });
    }

    // Try to auto-detect from database
    const screenSpec = findVehicleScreen(vehicle.make, vehicle.model, vehicle.year);

    if (screenSpec) {
      // Auto-detected, return config
      const dashboardConfig = getDashboardConfig(screenSpec);
      const fontSizes = getOptimalFontSizes(screenSpec);

      return NextResponse.json({
        success: true,
        vehicle: {
          id: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year
        },
        screenConfig: {
          screenSize: screenSpec.screenSize,
          screenWidth: screenSpec.screenWidth,
          screenHeight: screenSpec.screenHeight,
          screenRatio: screenSpec.screenRatio,
          isPortrait: screenSpec.isPortrait,
          dashboardScale: screenSpec.recommendedScale
        },
        dashboardConfig,
        fontSizes,
        source: 'auto-detected',
        autoDetected: true,
        recommendation: `${screenSpec.screenSize}" ${screenSpec.screenType || 'Display'} - ${screenSpec.resolution || screenSpec.screenRatio}`
      });
    }

    // No auto-detection available, return default
    return NextResponse.json({
      success: true,
      vehicle: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year
      },
      screenConfig: null,
      dashboardConfig: getDashboardConfig(null),
      fontSizes: getOptimalFontSizes(null),
      source: 'default',
      autoDetected: false,
      message: 'Manuel ekran yapılandırması gerekli'
    });

  } catch (error: any) {
    console.error('Screen Config API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}

// ==================== POST - Save screen configuration ====================
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { vehicleId, screenSize, screenWidth, screenHeight, screenRatio, isPortrait, dashboardScale } = body;

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    // Validate vehicle ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    // Update vehicle with screen config
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        screenSize: screenSize ? parseFloat(screenSize) : null,
        screenWidth: screenWidth ? parseInt(screenWidth) : null,
        screenHeight: screenHeight ? parseInt(screenHeight) : null,
        screenRatio: screenRatio || null,
        isPortrait: isPortrait || false,
        dashboardScale: dashboardScale ? parseFloat(dashboardScale) : 1.0
      }
    });

    // Generate new config
    const screenSpec = updatedVehicle.screenSize ? {
      make: updatedVehicle.make,
      model: updatedVehicle.model,
      yearStart: updatedVehicle.year,
      screenSize: updatedVehicle.screenSize,
      screenWidth: updatedVehicle.screenWidth!,
      screenHeight: updatedVehicle.screenHeight!,
      screenRatio: updatedVehicle.screenRatio || '16:9',
      isPortrait: updatedVehicle.isPortrait,
      isTouchscreen: true,
      recommendedScale: updatedVehicle.dashboardScale || 1.0,
      fontSizeMultiplier: updatedVehicle.dashboardScale || 1.0
    } : null;

    const dashboardConfig = getDashboardConfig(screenSpec);
    const fontSizes = getOptimalFontSizes(screenSpec);

    return NextResponse.json({
      success: true,
      message: 'Ekran yapılandırması kaydedildi',
      vehicle: {
        id: updatedVehicle.id,
        make: updatedVehicle.make,
        model: updatedVehicle.model,
        year: updatedVehicle.year
      },
      screenConfig: {
        screenSize: updatedVehicle.screenSize,
        screenWidth: updatedVehicle.screenWidth,
        screenHeight: updatedVehicle.screenHeight,
        screenRatio: updatedVehicle.screenRatio,
        isPortrait: updatedVehicle.isPortrait,
        dashboardScale: updatedVehicle.dashboardScale
      },
      dashboardConfig,
      fontSizes
    });

  } catch (error: any) {
    console.error('Save Screen Config Error:', error);
    return NextResponse.json(
      { error: error.message || 'Ekran yapılandırması kaydedilemedi' },
      { status: 500 }
    );
  }
}

// ==================== PUT - Auto-configure from database ====================
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { vehicleId } = body;

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    // Try to auto-detect
    const screenSpec = findVehicleScreen(vehicle.make, vehicle.model, vehicle.year);

    if (!screenSpec) {
      return NextResponse.json({
        success: false,
        error: 'Bu araç modeli için otomatik tespit mevcut değil',
        message: 'Lütfen manuel olarak ekran boyutunu girin'
      }, { status: 404 });
    }

    // Apply auto-detected config
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        screenSize: screenSpec.screenSize,
        screenWidth: screenSpec.screenWidth,
        screenHeight: screenSpec.screenHeight,
        screenRatio: screenSpec.screenRatio,
        isPortrait: screenSpec.isPortrait,
        dashboardScale: screenSpec.recommendedScale
      }
    });

    const dashboardConfig = getDashboardConfig(screenSpec);
    const fontSizes = getOptimalFontSizes(screenSpec);

    return NextResponse.json({
      success: true,
      message: `Otomatik yapılandırma uygulandı: ${screenSpec.screenSize}" ${screenSpec.screenType || 'Display'}`,
      vehicle: {
        id: updatedVehicle.id,
        make: updatedVehicle.make,
        model: updatedVehicle.model,
        year: updatedVehicle.year
      },
      screenConfig: {
        screenSize: screenSpec.screenSize,
        screenWidth: screenSpec.screenWidth,
        screenHeight: screenSpec.screenHeight,
        screenRatio: screenSpec.screenRatio,
        isPortrait: screenSpec.isPortrait,
        dashboardScale: screenSpec.recommendedScale
      },
      dashboardConfig,
      fontSizes,
      autoDetected: true,
      details: {
        screenType: screenSpec.screenType,
        resolution: screenSpec.resolution,
        notes: screenSpec.notes
      }
    });

  } catch (error: any) {
    console.error('Auto-Configure Error:', error);
    return NextResponse.json(
      { error: error.message || 'Otomatik yapılandırma başarısız' },
      { status: 500 }
    );
  }
}

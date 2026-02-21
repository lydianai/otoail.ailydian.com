// ============================================
// TÜRK OTO AI - Predictive Maintenance API
// AI-powered vehicle health prediction
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import {
  getPredictiveMaintenanceService,
  VehicleHealthData,
} from '@/lib/services/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || 'predict';

    const maintenanceService = getPredictiveMaintenanceService({
      debug: true,
      conservativeMode: true,
      includePreventive: true,
    });

    switch (action) {
      // ==================== PREDICT MAINTENANCE ====================
      case 'predict': {
        const healthData: VehicleHealthData = body.healthData;

        if (!healthData) {
          return NextResponse.json(
            { error: 'healthData gereklidir' },
            { status: 400 }
          );
        }

        // Validate required fields
        if (!healthData.vehicleId || !healthData.mileage) {
          return NextResponse.json(
            { error: 'vehicleId ve mileage gereklidir' },
            { status: 400 }
          );
        }

        const report = await maintenanceService.predictMaintenance(healthData);

        return NextResponse.json({
          success: true,
          data: {
            report,
            summary: {
              overallHealth: report.overallHealth,
              totalPredictions: report.predictions.length,
              immediateConcerns: report.upcomingMaintenance.immediate.length,
              estimatedCost: report.totalEstimatedCost,
            },
          },
        });
      }

      // ==================== GET MOCK DATA ====================
      case 'mock': {
        // Generate mock health data for testing
        const mockHealthData: VehicleHealthData = {
          vehicleId: body.vehicleId || 'demo-vehicle',
          mileage: body.mileage || 45000,
          age: body.age || 3,
          lastServiceMileage: body.lastServiceMileage || 40000,
          lastServiceDate: body.lastServiceDate
            ? new Date(body.lastServiceDate)
            : new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago

          // OBD-II metrics
          engineRPM: 2500,
          coolantTemp: 88,
          oilPressure: 45,
          fuelLevel: 60,
          batteryVoltage: 12.6,
          intakeAirTemp: 25,
          engineLoad: 45,
          throttlePosition: 30,

          // Driving patterns
          avgSpeed: 45,
          maxSpeed: 120,
          hardBraking: 3,
          rapidAcceleration: 2,
          idlingTime: 15,

          // Environmental
          avgTemperature: 25,
          dustyConditions: false,
          cityDriving: 60,
        };

        const report = await maintenanceService.predictMaintenance(mockHealthData);

        return NextResponse.json({
          success: true,
          data: {
            healthData: mockHealthData,
            report,
          },
        });
      }

      default:
        return NextResponse.json(
          { error: 'Geçersiz işlem' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('[Predictive Maintenance API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Tahmin işlemi başarısız' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vehicleId = searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'vehicleId gereklidir' },
        { status: 400 }
      );
    }

    // In a real implementation, this would fetch from database
    // For now, return mock data
    const mockHealthData: VehicleHealthData = {
      vehicleId,
      mileage: 45000,
      age: 3,
      lastServiceMileage: 40000,
      lastServiceDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),

      engineRPM: 2500,
      coolantTemp: 88,
      oilPressure: 45,
      fuelLevel: 60,
      batteryVoltage: 12.6,
      intakeAirTemp: 25,
      engineLoad: 45,
      throttlePosition: 30,

      avgSpeed: 45,
      maxSpeed: 120,
      hardBraking: 3,
      rapidAcceleration: 2,
      idlingTime: 15,

      avgTemperature: 25,
      dustyConditions: false,
      cityDriving: 60,
    };

    const maintenanceService = getPredictiveMaintenanceService({
      debug: true,
      conservativeMode: true,
      includePreventive: true,
    });

    const report = await maintenanceService.predictMaintenance(mockHealthData);

    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (error: any) {
    console.error('[Predictive Maintenance API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Sağlık raporu alınamadı' },
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

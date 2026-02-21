import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const vehicleData = await req.json();

    // Validate required fields
    if (!vehicleData.make || !vehicleData.model || !vehicleData.year || !vehicleData.licensePlate) {
      return NextResponse.json(
        { error: 'Marka, model, yıl ve plaka bilgileri zorunludur' },
        { status: 400 }
      );
    }

    // Check if license plate already exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { licensePlate: vehicleData.licensePlate }
    });

    if (existingVehicle) {
      return NextResponse.json(
        { error: 'Bu plaka numarası zaten kayıtlı' },
        { status: 409 }
      );
    }

    // Create vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        userId: session.user.id,
        make: vehicleData.make,
        model: vehicleData.model,
        year: parseInt(vehicleData.year),
        licensePlate: vehicleData.licensePlate.toUpperCase(),
        vin: vehicleData.vin || null,
        fuelType: vehicleData.fuelType || 'GASOLINE',
        transmission: vehicleData.transmission || 'MANUAL',
        engineSize: vehicleData.engineSize ? parseFloat(vehicleData.engineSize) : null,
        horsepower: vehicleData.horsepower ? parseInt(vehicleData.horsepower) : null,
        torque: vehicleData.torque ? parseInt(vehicleData.torque) : null,
        cylinders: vehicleData.cylinders ? parseInt(vehicleData.cylinders) : null,
        color: vehicleData.color || null,
        bodyType: vehicleData.bodyType || null,
        mileage: vehicleData.mileage ? parseInt(vehicleData.mileage) : 0,
        condition: vehicleData.condition || 'USED',
        previousOwners: vehicleData.previousOwners ? parseInt(vehicleData.previousOwners) : 1,
        serviceHistory: vehicleData.serviceHistory || false,
        modifications: vehicleData.modifications || null,
        notes: vehicleData.notes || null,
        obdConnected: vehicleData.hasOBD || false,
        obdProtocol: vehicleData.obdProtocol || null,
        obdDeviceSerial: vehicleData.obdDeviceSerial || null
      }
    });

    // Initialize OBD data if device is connected
    if (vehicleData.hasOBD) {
      await prisma.oBDData.create({
        data: {
          vehicleId: vehicle.id,
          rpm: 0,
          speed: 0,
          engineLoad: 0,
          throttlePosition: 0,
          coolantTemp: 20,
          intakeTemp: 20,
          fuelLevel: 50,
          fuelConsumption: 0,
          batteryVoltage: 12.6,
          efficiency: 0,
          dtcCodes: []
        }
      });
    }

    // Create initial driving score
    await prisma.drivingScore.create({
      data: {
        userId: session.user.id,
        vehicleId: vehicle.id,
        overall: 85,
        acceleration: 85,
        braking: 85,
        cornering: 85,
        efficiency: 85,
        distance: 0,
        duration: 0,
        fuelSaved: 0
      }
    });

    // Award "First Vehicle" badge if this is user's first vehicle
    const vehicleCount = await prisma.vehicle.count({
      where: { userId: session.user.id }
    });

    if (vehicleCount === 1) {
      // Get the driving score we just created to attach the badge
      const drivingScore = await prisma.drivingScore.findFirst({
        where: {
          userId: session.user.id,
          vehicleId: vehicle.id
        },
        orderBy: { date: 'desc' }
      });

      if (drivingScore) {
        await prisma.badge.create({
          data: {
            drivingScoreId: drivingScore.id,
            name: 'İlk Araç',
            description: 'İlk aracınızı sisteme eklediniz',
            icon: 'car',
            rarity: 'COMMON'
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      vehicle: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        licensePlate: vehicle.licensePlate,
        obdConnected: vehicle.obdConnected
      },
      message: 'Araç başarıyla eklendi'
    });

  } catch (error) {
    console.error('Vehicle Add API Error:', error);
    return NextResponse.json(
      { error: 'Araç eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

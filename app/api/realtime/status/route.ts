import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const vehicleId = searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    // Araç kontrolü
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
        userId: session.user.id
      }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    // Real-time status al
    const status = await prisma.vehicleRealtimeStatus.findUnique({
      where: { vehicleId }
    });

    return NextResponse.json({
      success: true,
      status: status || null,
      vehicle: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        licensePlate: vehicle.licensePlate,
        obdConnected: vehicle.obdConnected
      }
    });
  } catch (error) {
    console.error('Realtime status API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { vehicleId, ...statusData } = body;

    // Araç kontrolü
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
        userId: session.user.id
      }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    // Status güncelle veya oluştur
    const status = await prisma.vehicleRealtimeStatus.upsert({
      where: { vehicleId },
      create: {
        vehicleId,
        ...statusData,
        lastUpdate: new Date()
      },
      update: {
        ...statusData,
        lastUpdate: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Update realtime status error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

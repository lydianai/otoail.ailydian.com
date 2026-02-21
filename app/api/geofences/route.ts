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

    const where: any = {};

    if (vehicleId) {
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

      where.vehicleId = vehicleId;
    } else {
      // Kullanıcının tüm araçlarının geo-fence'lerini al
      const vehicles = await prisma.vehicle.findMany({
        where: { userId: session.user.id },
        select: { id: true }
      });

      where.vehicleId = { in: vehicles.map((v: { id: string }) => v.id) };
    }

    const geofences = await prisma.geoFence.findMany({
      where,
      include: {
        vehicle: {
          select: {
            make: true,
            model: true,
            licensePlate: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      geofences
    });
  } catch (error) {
    console.error('GeoFences API error:', error);
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
    const { vehicleId, name, latitude, longitude, radius, shape, notifyOnExit } = body;

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

    const geofence = await prisma.geoFence.create({
      data: {
        vehicleId,
        name,
        latitude,
        longitude,
        radius,
        shape: shape || 'CIRCLE',
        notifyOnExit: notifyOnExit !== false
      }
    });

    return NextResponse.json({
      success: true,
      geofence
    });
  } catch (error) {
    console.error('Create geofence error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    // Geo-fence'in kullanıcıya ait olduğunu kontrol et
    const geofence = await prisma.geoFence.findFirst({
      where: { id },
      include: { vehicle: true }
    });

    if (!geofence || geofence.vehicle.userId !== session.user.id) {
      return NextResponse.json({ error: 'GeoFence not found' }, { status: 404 });
    }

    await prisma.geoFence.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'GeoFence deleted'
    });
  } catch (error) {
    console.error('Delete geofence error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

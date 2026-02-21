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

    // Kullanıcının araçlarını al
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: session.user.id },
      select: { id: true }
    });

    const vehicleIds = vehicles.map((v: { id: string }) => v.id);

    // Belirli bir araç için mi yoksa tüm araçlar için mi?
    const where: any = {
      vehicleId: vehicleId || { in: vehicleIds }
    };

    const trips = await prisma.trip.findMany({
      where,
      include: {
        vehicle: {
          select: {
            make: true,
            model: true,
            licensePlate: true,
            year: true
          }
        },
        routePoints: {
          orderBy: { timestamp: 'asc' },
          take: 100 // İlk 100 nokta
        },
        events: {
          orderBy: { timestamp: 'desc' }
        }
      },
      orderBy: { startTime: 'desc' },
      take: 50
    });

    // İstatistikler
    const stats = {
      totalTrips: trips.length,
      totalDistance: trips.reduce((sum: number, trip: any) => sum + (trip.distance || 0), 0),
      totalDuration: trips.reduce((sum: number, trip: any) => sum + (trip.duration || 0), 0),
      avgScore: trips.length > 0
        ? trips.reduce((sum: number, trip: any) => sum + (trip.overallScore || 0), 0) / trips.length
        : 0,
      hardAccelerations: trips.reduce((sum: number, trip: any) => sum + trip.hardAccelerations, 0),
      hardBrakes: trips.reduce((sum: number, trip: any) => sum + trip.hardBrakes, 0)
    };

    return NextResponse.json({
      success: true,
      trips,
      stats
    });
  } catch (error) {
    console.error('Trips API error:', error);
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
    const { vehicleId, startTime, endTime, distance, routePoints, events } = body;

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

    // Trip oluştur
    const trip = await prisma.trip.create({
      data: {
        vehicleId,
        userId: session.user.id,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        distance,
        routePoints: {
          create: routePoints?.map((point: any) => ({
            latitude: point.latitude,
            longitude: point.longitude,
            altitude: point.altitude,
            speed: point.speed,
            timestamp: new Date(point.timestamp)
          })) || []
        },
        events: {
          create: events?.map((event: any) => ({
            type: event.type,
            severity: event.severity,
            description: event.description,
            latitude: event.latitude,
            longitude: event.longitude,
            timestamp: new Date(event.timestamp),
            data: event.data
          })) || []
        }
      },
      include: {
        routePoints: true,
        events: true
      }
    });

    return NextResponse.json({
      success: true,
      trip
    });
  } catch (error) {
    console.error('Create trip error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

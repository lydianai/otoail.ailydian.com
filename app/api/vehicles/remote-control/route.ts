import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// PIN encryption
const PIN_KEY = process.env.PIN_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');

function encryptPIN(pin: string): string {
  const cipher = crypto.createCipheriv('aes-256-ecb', Buffer.from(PIN_KEY.slice(0, 32)), '');
  let encrypted = cipher.update(pin, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptPIN(encrypted: string): string {
  const decipher = crypto.createDecipheriv('aes-256-ecb', Buffer.from(PIN_KEY.slice(0, 32)), '');
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// GET - Uzaktan kontrol ayarlarını al
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    // Araç sahibini doğrula
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: {
        remoteControl: {
          include: {
            commands: {
              orderBy: { requestedAt: 'desc' },
              take: 20
            }
          }
        },
        realtimeStatus: true
      }
    });

    if (!vehicle || vehicle.userId !== session.user.id) {
      return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      remoteControl: vehicle.remoteControl ? {
        ...vehicle.remoteControl,
        pin: vehicle.remoteControl.pin ? '••••' : null
      } : null,
      realtimeStatus: vehicle.realtimeStatus
    });

  } catch (error) {
    console.error('Get Remote Control Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Uzaktan kontrol ayarlarını kaydet/güncelle
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { vehicleId, pin, ...controlData } = data;

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

    // PIN'i encrypt et
    const encryptedPin = pin ? encryptPIN(pin) : null;

    // Mevcut ayarları kontrol et
    const existingControl = await prisma.vehicleRemoteControl.findUnique({
      where: { vehicleId }
    });

    let remoteControl;
    if (existingControl) {
      // Update
      remoteControl = await prisma.vehicleRemoteControl.update({
        where: { vehicleId },
        data: {
          ...controlData,
          ...(encryptedPin && { pin: encryptedPin })
        }
      });
    } else {
      // Create
      remoteControl = await prisma.vehicleRemoteControl.create({
        data: {
          vehicleId,
          ...controlData,
          pin: encryptedPin
        }
      });
    }

    return NextResponse.json({
      success: true,
      remoteControl: {
        ...remoteControl,
        pin: remoteControl.pin ? '••••' : null
      },
      message: 'Uzaktan kontrol ayarları başarıyla kaydedildi'
    });

  } catch (error) {
    console.error('Save Remote Control Error:', error);
    return NextResponse.json(
      { error: 'Uzaktan kontrol ayarları kaydedilirken hata oluştu' },
      { status: 500 }
    );
  }
}

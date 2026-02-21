import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Encryption helpers
const ENCRYPTION_KEY = process.env.CONNECTIVITY_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16;

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.slice(0, 32)), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string): string {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift()!, 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.slice(0, 32)), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// GET - Araç internet bağlantı ayarlarını al
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
        connectivity: {
          include: {
            connectionLogs: {
              orderBy: { timestamp: 'desc' },
              take: 10
            }
          }
        }
      }
    });

    if (!vehicle || vehicle.userId !== session.user.id) {
      return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
    }

    // Şifreleri decrypt et (sadece gösterim için masked)
    if (vehicle.connectivity) {
      const connectivity = vehicle.connectivity;
      return NextResponse.json({
        success: true,
        connectivity: {
          ...connectivity,
          primaryPassword: connectivity.primaryPassword ? '••••••••' : null,
          backupPassword: connectivity.backupPassword ? '••••••••' : null,
        }
      });
    }

    return NextResponse.json({
      success: true,
      connectivity: null
    });

  } catch (error) {
    console.error('Get Connectivity Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Araç internet bağlantı ayarlarını kaydet/güncelle
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { vehicleId, ...connectivityData } = data;

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

    // Şifreleri encrypt et
    const encryptedData = {
      ...connectivityData,
      primaryPassword: connectivityData.primaryPassword
        ? encrypt(connectivityData.primaryPassword)
        : null,
      backupPassword: connectivityData.backupPassword
        ? encrypt(connectivityData.backupPassword)
        : null,
    };

    // Mevcut connectivity ayarları var mı kontrol et
    const existingConnectivity = await prisma.vehicleConnectivity.findUnique({
      where: { vehicleId }
    });

    let connectivity;
    if (existingConnectivity) {
      // Update
      connectivity = await prisma.vehicleConnectivity.update({
        where: { vehicleId },
        data: encryptedData
      });
    } else {
      // Create
      connectivity = await prisma.vehicleConnectivity.create({
        data: {
          vehicleId,
          ...encryptedData
        }
      });
    }

    // Log the configuration change
    await prisma.connectivityLog.create({
      data: {
        connectivityId: connectivity.id,
        provider: connectivityData.primaryProvider,
        event: 'CONNECTED',
        metadata: {
          action: existingConnectivity ? 'updated' : 'created',
          timestamp: new Date().toISOString()
        }
      }
    });

    return NextResponse.json({
      success: true,
      connectivity: {
        ...connectivity,
        primaryPassword: connectivity.primaryPassword ? '••••••••' : null,
        backupPassword: connectivity.backupPassword ? '••••••••' : null,
      },
      message: 'İnternet bağlantı ayarları başarıyla kaydedildi'
    });

  } catch (error) {
    console.error('Save Connectivity Error:', error);
    return NextResponse.json(
      { error: 'Bağlantı ayarları kaydedilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT - Bağlantı durumunu güncelle (araç cihazından gelecek)
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { vehicleId, status, provider, signalStrength, dataUsage } = data;

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    const connectivity = await prisma.vehicleConnectivity.findUnique({
      where: { vehicleId }
    });

    if (!connectivity) {
      return NextResponse.json({ error: 'Connectivity config not found' }, { status: 404 });
    }

    // Update connectivity status
    const updated = await prisma.vehicleConnectivity.update({
      where: { vehicleId },
      data: {
        isConnected: status === 'connected',
        currentProvider: provider,
        signalStrength,
        dataUsage: dataUsage || connectivity.dataUsage,
        lastConnected: status === 'connected' ? new Date() : connectivity.lastConnected,
        lastDisconnected: status === 'disconnected' ? new Date() : connectivity.lastDisconnected
      }
    });

    // Log the event
    await prisma.connectivityLog.create({
      data: {
        connectivityId: connectivity.id,
        provider,
        event: status === 'connected' ? 'CONNECTED' : 'DISCONNECTED',
        signalStrength,
        metadata: {
          timestamp: new Date().toISOString()
        }
      }
    });

    // Update realtime status
    await prisma.vehicleRealtimeStatus.upsert({
      where: { vehicleId },
      create: {
        vehicleId,
        internetConnected: status === 'connected',
        signalStrength
      },
      update: {
        internetConnected: status === 'connected',
        signalStrength,
        lastUpdate: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      connectivity: updated
    });

  } catch (error) {
    console.error('Update Connectivity Status Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Bağlantı ayarlarını sil
export async function DELETE(req: NextRequest) {
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
      where: { id: vehicleId }
    });

    if (!vehicle || vehicle.userId !== session.user.id) {
      return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
    }

    await prisma.vehicleConnectivity.delete({
      where: { vehicleId }
    });

    return NextResponse.json({
      success: true,
      message: 'Bağlantı ayarları silindi'
    });

  } catch (error) {
    console.error('Delete Connectivity Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

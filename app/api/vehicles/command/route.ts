import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// POST - Araca komut gönder
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { vehicleId, command, pin, biometric } = data;

    if (!vehicleId || !command) {
      return NextResponse.json(
        { error: 'Vehicle ID and command are required' },
        { status: 400 }
      );
    }

    // Araç sahibini doğrula
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: {
        remoteControl: true,
        realtimeStatus: true,
        connectivity: true
      }
    });

    if (!vehicle || vehicle.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Vehicle not found or unauthorized' },
        { status: 404 }
      );
    }

    if (!vehicle.remoteControl) {
      return NextResponse.json(
        { error: 'Remote control not configured for this vehicle' },
        { status: 400 }
      );
    }

    // Komutun etkin olup olmadığını kontrol et
    const commandEnabledMap: Record<string, boolean> = {
      START_ENGINE: vehicle.remoteControl.remoteStartEnabled,
      STOP_ENGINE: vehicle.remoteControl.remoteStartEnabled,
      LOCK_DOORS: vehicle.remoteControl.remoteLockEnabled,
      UNLOCK_DOORS: vehicle.remoteControl.remoteLockEnabled,
      HORN_LIGHTS: vehicle.remoteControl.remoteHornEnabled,
      CLIMATE_ON: vehicle.remoteControl.remoteClimateEnabled,
      CLIMATE_OFF: vehicle.remoteControl.remoteClimateEnabled,
      SEAT_HEAT_ON: vehicle.remoteControl.remoteClimateEnabled,
      SEAT_HEAT_OFF: vehicle.remoteControl.remoteClimateEnabled,
      LOCATE: vehicle.remoteControl.remoteLocateEnabled,
      DIAGNOSTICS: vehicle.remoteControl.remoteDiagnosticsEnabled,
      REFRESH_STATUS: true,
      PANIC_MODE: true
    };

    if (!commandEnabledMap[command]) {
      return NextResponse.json(
        { error: 'This remote command is not enabled' },
        { status: 403 }
      );
    }

    // PIN doğrulama (gerekiyorsa)
    let pinVerified = false;
    if (vehicle.remoteControl.pinRequired && pin) {
      // TODO: PIN doğrulama mantığı
      pinVerified = true; // Şimdilik her zaman true
    } else if (vehicle.remoteControl.pinRequired && !pin) {
      return NextResponse.json(
        { error: 'PIN required for this operation' },
        { status: 403 }
      );
    }

    // Biyometrik doğrulama
    const biometricVerified = vehicle.remoteControl.biometricEnabled && biometric ? true : false;

    // Internet bağlantısı kontrolü
    if (!vehicle.connectivity?.isConnected) {
      return NextResponse.json(
        { error: 'Vehicle is not connected to internet' },
        { status: 503 }
      );
    }

    // Komut kaydı oluştur
    const remoteCommand = await prisma.remoteCommand.create({
      data: {
        remoteControlId: vehicle.remoteControl.id,
        userId: session.user.id,
        command: command as any,
        status: 'PENDING',
        pinVerified,
        biometricVerified,
        requestIP: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      }
    });

    // Burada gerçek araç cihazına komut gönderme mantığı olacak
    // WebSocket, MQTT, veya HTTP webhook kullanarak

    // Simüle edilmiş komut işleme
    setTimeout(async () => {
      try {
        await executeCommand(command, vehicleId, vehicle);

        await prisma.remoteCommand.update({
          where: { id: remoteCommand.id },
          data: {
            status: 'COMPLETED',
            executedAt: new Date(),
            completedAt: new Date(),
            response: {
              success: true,
              timestamp: new Date().toISOString()
            }
          }
        });
      } catch (error) {
        await prisma.remoteCommand.update({
          where: { id: remoteCommand.id },
          data: {
            status: 'FAILED',
            failedAt: new Date(),
            errorMessage: error instanceof Error ? error.message : 'Unknown error'
          }
        });
      }
    }, 1000);

    return NextResponse.json({
      success: true,
      commandId: remoteCommand.id,
      status: 'PENDING',
      message: getCommandMessage(command),
      estimatedTime: 5 // seconds
    });

  } catch (error) {
    console.error('Send Command Error:', error);
    return NextResponse.json(
      { error: 'Komut gönderilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// GET - Komut durumunu sorgula
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const commandId = searchParams.get('commandId');
    const vehicleId = searchParams.get('vehicleId');

    if (commandId) {
      // Tek komut sorgula
      const command = await prisma.remoteCommand.findUnique({
        where: { id: commandId },
        include: {
          remoteControl: {
            include: {
              vehicle: true
            }
          }
        }
      });

      if (!command || command.remoteControl.vehicle.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Command not found or unauthorized' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        command: {
          id: command.id,
          command: command.command,
          status: command.status,
          requestedAt: command.requestedAt,
          executedAt: command.executedAt,
          completedAt: command.completedAt,
          response: command.response,
          errorMessage: command.errorMessage
        }
      });
    } else if (vehicleId) {
      // Araç komut geçmişi
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
        include: {
          remoteControl: {
            include: {
              commands: {
                orderBy: { requestedAt: 'desc' },
                take: 50
              }
            }
          }
        }
      });

      if (!vehicle || vehicle.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Vehicle not found or unauthorized' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        commands: vehicle.remoteControl?.commands || []
      });
    }

    return NextResponse.json(
      { error: 'Command ID or Vehicle ID is required' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Get Command Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper: Komut mesajları
function getCommandMessage(command: string): string {
  const messages: Record<string, string> = {
    START_ENGINE: 'Motor çalıştırılıyor...',
    STOP_ENGINE: 'Motor durduruluyor...',
    LOCK_DOORS: 'Kapılar kilitleniyor...',
    UNLOCK_DOORS: 'Kapılar açılıyor...',
    HORN_LIGHTS: 'Korna ve farlar aktif...',
    LOCATE: 'Araç konumu alınıyor...',
    CLIMATE_ON: 'Klima açılıyor...',
    CLIMATE_OFF: 'Klima kapatılıyor...',
    SEAT_HEAT_ON: 'Koltuk ısıtma açılıyor...',
    SEAT_HEAT_OFF: 'Koltuk ısıtma kapatılıyor...',
    DIAGNOSTICS: 'Araç durumu kontrol ediliyor...',
    REFRESH_STATUS: 'Durum yenileniyor...',
    PANIC_MODE: 'Panik modu aktif!'
  };
  return messages[command] || 'Komut gönderiliyor...';
}

// Helper: Komutu çalıştır ve araç durumunu güncelle
async function executeCommand(command: string, vehicleId: string, vehicle: any) {
  const updates: any = {
    lastUpdate: new Date()
  };

  switch (command) {
    case 'START_ENGINE':
      updates.engineRunning = true;
      break;
    case 'STOP_ENGINE':
      updates.engineRunning = false;
      break;
    case 'LOCK_DOORS':
      updates.doorsLocked = true;
      break;
    case 'UNLOCK_DOORS':
      updates.doorsLocked = false;
      break;
    case 'CLIMATE_ON':
      updates.climateOn = true;
      updates.targetTemp = 22;
      break;
    case 'CLIMATE_OFF':
      updates.climateOn = false;
      break;
    case 'PANIC_MODE':
      updates.alarmActive = true;
      break;
  }

  // Realtime status güncelle
  await prisma.vehicleRealtimeStatus.upsert({
    where: { vehicleId },
    create: {
      vehicleId,
      ...updates
    },
    update: updates
  });

  // Bildirim gönder (eğer ayarlarda etkinse)
  if (vehicle.remoteControl) {
    const shouldNotify =
      (command === 'START_ENGINE' && vehicle.remoteControl.notifyOnStart) ||
      (command === 'LOCK_DOORS' && vehicle.remoteControl.notifyOnLock) ||
      (command === 'UNLOCK_DOORS' && vehicle.remoteControl.notifyOnUnlock);

    if (shouldNotify) {
      // TODO: Push notification gönder
      console.log(`Notification: ${command} executed on vehicle ${vehicleId}`);
    }
  }
}

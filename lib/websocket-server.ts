// WebSocket Server for Real-time Vehicle Communication
// Bu sistem araç ile sunucu arasında çift yönlü gerçek zamanlı iletişim sağlar

import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { prisma } from './prisma';

let io: SocketIOServer | null = null;

export function initializeWebSocketServer(server: HTTPServer) {
  if (io) {
    return io;
  }

  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket) => {
    console.log(`[WebSocket] Client connected: ${socket.id}`);

    // Kullanıcı aracını kaydet
    socket.on('register:vehicle', async (data: { vehicleId: string, userId: string }) => {
      try {
        // Kullanıcı doğrulama
        const vehicle = await prisma.vehicle.findUnique({
          where: { id: data.vehicleId },
          include: { user: true }
        });

        if (vehicle && vehicle.userId === data.userId) {
          socket.join(`vehicle:${data.vehicleId}`);
          socket.join(`user:${data.userId}`);

          console.log(`[WebSocket] Vehicle ${data.vehicleId} registered for user ${data.userId}`);

          socket.emit('registered', { success: true, vehicleId: data.vehicleId });
        } else {
          socket.emit('registered', { success: false, error: 'Unauthorized' });
        }
      } catch (error) {
        console.error('[WebSocket] Registration error:', error);
        socket.emit('registered', { success: false, error: 'Server error' });
      }
    });

    // Araç durumu güncellemesi (araç cihazından)
    socket.on('vehicle:status', async (data: {
      vehicleId: string,
      status: any
    }) => {
      try {
        // Realtime status güncelle
        await prisma.vehicleRealtimeStatus.upsert({
          where: { vehicleId: data.vehicleId },
          create: {
            vehicleId: data.vehicleId,
            ...data.status
          },
          update: {
            ...data.status,
            lastUpdate: new Date()
          }
        });

        // Kullanıcılara broadcast
        io!.to(`vehicle:${data.vehicleId}`).emit('status:update', {
          vehicleId: data.vehicleId,
          status: data.status,
          timestamp: new Date().toISOString()
        });

        console.log(`[WebSocket] Status updated for vehicle ${data.vehicleId}`);
      } catch (error) {
        console.error('[WebSocket] Status update error:', error);
      }
    });

    // GPS konum güncellemesi
    socket.on('vehicle:location', async (data: {
      vehicleId: string,
      latitude: number,
      longitude: number,
      altitude?: number,
      heading?: number,
      speed?: number,
      accuracy?: number
    }) => {
      try {
        // Realtime status güncelle
        await prisma.vehicleRealtimeStatus.upsert({
          where: { vehicleId: data.vehicleId },
          create: {
            vehicleId: data.vehicleId,
            latitude: data.latitude,
            longitude: data.longitude,
            altitude: data.altitude,
            heading: data.heading,
            speed: data.speed,
            accuracy: data.accuracy,
            lastUpdate: new Date()
          },
          update: {
            latitude: data.latitude,
            longitude: data.longitude,
            altitude: data.altitude,
            heading: data.heading,
            speed: data.speed,
            accuracy: data.accuracy,
            lastUpdate: new Date()
          }
        });

        // Kullanıcılara broadcast
        io!.to(`vehicle:${data.vehicleId}`).emit('location:update', {
          vehicleId: data.vehicleId,
          location: {
            latitude: data.latitude,
            longitude: data.longitude,
            altitude: data.altitude,
            heading: data.heading,
            speed: data.speed,
            accuracy: data.accuracy
          },
          timestamp: new Date().toISOString()
        });

        // Geo-fence kontrolü
        await checkGeoFence(data.vehicleId, data.latitude, data.longitude);

      } catch (error) {
        console.error('[WebSocket] Location update error:', error);
      }
    });

    // Komut gönderme (kullanıcıdan araca)
    socket.on('command:send', async (data: {
      vehicleId: string,
      userId: string,
      commandId: string,
      command: string
    }) => {
      try {
        // Komutu araca gönder
        io!.to(`vehicle:${data.vehicleId}`).emit('command:execute', {
          commandId: data.commandId,
          command: data.command,
          timestamp: new Date().toISOString()
        });

        // Komut durumunu güncelle
        await prisma.remoteCommand.update({
          where: { id: data.commandId },
          data: {
            status: 'SENT',
            executedAt: new Date()
          }
        });

        console.log(`[WebSocket] Command ${data.command} sent to vehicle ${data.vehicleId}`);
      } catch (error) {
        console.error('[WebSocket] Command send error:', error);
      }
    });

    // Komut sonucu (araçtan)
    socket.on('command:result', async (data: {
      commandId: string,
      success: boolean,
      response?: any,
      error?: string
    }) => {
      try {
        // Komut durumunu güncelle
        await prisma.remoteCommand.update({
          where: { id: data.commandId },
          data: {
            status: data.success ? 'COMPLETED' : 'FAILED',
            completedAt: data.success ? new Date() : undefined,
            failedAt: data.success ? undefined : new Date(),
            response: data.response,
            errorMessage: data.error
          }
        });

        // Kullanıcıya bildir
        const command = await prisma.remoteCommand.findUnique({
          where: { id: data.commandId },
          include: {
            remoteControl: {
              include: {
                vehicle: true
              }
            }
          }
        });

        if (command) {
          io!.to(`user:${command.userId}`).emit('command:complete', {
            commandId: data.commandId,
            success: data.success,
            response: data.response,
            error: data.error
          });
        }

        console.log(`[WebSocket] Command ${data.commandId} completed: ${data.success}`);
      } catch (error) {
        console.error('[WebSocket] Command result error:', error);
      }
    });

    // Bağlantı koptuğunda
    socket.on('disconnect', () => {
      console.log(`[WebSocket] Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

// Geo-fence kontrolü
async function checkGeoFence(vehicleId: string, latitude: number, longitude: number) {
  try {
    const remoteControl = await prisma.vehicleRemoteControl.findUnique({
      where: { vehicleId },
      include: { vehicle: true }
    });

    if (!remoteControl || !remoteControl.geoFenceEnabled || !remoteControl.geoFenceCenter) {
      return;
    }

    const center = remoteControl.geoFenceCenter as any;
    const radius = remoteControl.geoFenceRadius || 1000; // meters

    // Haversine formülü ile mesafe hesapla
    const distance = calculateDistance(
      latitude,
      longitude,
      center.lat,
      center.lng
    );

    // Geo-fence dışına çıkıldı mı?
    if (distance > radius) {
      // Bildirim gönder
      if (remoteControl.notifyOnGeoFence && io) {
        io.to(`user:${remoteControl.vehicle.userId}`).emit('alert:geofence', {
          vehicleId,
          distance,
          radius,
          location: { latitude, longitude },
          message: `Araç belirlenen bölgenin ${Math.round(distance - radius)}m dışında!`,
          timestamp: new Date().toISOString()
        });
      }
    }
  } catch (error) {
    console.error('[GeoFence] Check error:', error);
  }
}

// Haversine mesafe hesaplama
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// WebSocket instance'ını dışa aktar
export function getWebSocketServer(): SocketIOServer | null {
  return io;
}

// Push notification gönder
export async function sendPushNotification(userId: string, notification: {
  title: string,
  body: string,
  data?: any
}) {
  if (!io) return;

  io.to(`user:${userId}`).emit('notification:push', {
    ...notification,
    timestamp: new Date().toISOString()
  });

  console.log(`[Push] Notification sent to user ${userId}: ${notification.title}`);
}

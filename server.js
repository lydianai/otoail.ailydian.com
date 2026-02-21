const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// In-memory storage for active vehicle connections
const activeVehicles = new Map();
const vehicleLocations = new Map();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_APP_URL
        : 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket) => {
    console.log(`[WebSocket] Client connected: ${socket.id}`);

    // Vehicle registration
    socket.on('register-vehicle', (vehicleId) => {
      console.log(`[WebSocket] Vehicle registered: ${vehicleId}`);
      socket.join(`vehicle-${vehicleId}`);
      activeVehicles.set(vehicleId, socket.id);

      // Send confirmation
      socket.emit('vehicle-registered', { vehicleId, success: true });
    });

    // Handle location updates from vehicle/OBD device
    socket.on('location-update', (data) => {
      const { vehicleId, latitude, longitude, altitude, speed, heading } = data;
      console.log(`[WebSocket] Location update for vehicle ${vehicleId}:`, { latitude, longitude });

      // Store latest location
      vehicleLocations.set(vehicleId, {
        latitude,
        longitude,
        altitude,
        speed,
        heading,
        timestamp: new Date()
      });

      // Broadcast to all clients watching this vehicle
      io.to(`vehicle-${vehicleId}`).emit('location-update', {
        vehicleId,
        latitude,
        longitude,
        altitude,
        speed,
        heading,
        timestamp: new Date()
      });
    });

    // Handle vehicle status updates
    socket.on('status-update', (data) => {
      const { vehicleId, ...statusData } = data;
      console.log(`[WebSocket] Status update for vehicle ${vehicleId}`);

      // Broadcast to all clients watching this vehicle
      io.to(`vehicle-${vehicleId}`).emit('status-update', {
        vehicleId,
        ...statusData,
        timestamp: new Date()
      });
    });

    // Handle geo-fence alerts
    socket.on('geofence-alert', (data) => {
      const { vehicleId, geofenceId, geofenceName, type } = data;
      console.log(`[WebSocket] Geo-fence alert: ${type} for vehicle ${vehicleId}`);

      // Broadcast to all clients watching this vehicle
      io.to(`vehicle-${vehicleId}`).emit('geofence-alert', {
        vehicleId,
        geofenceId,
        geofenceName,
        type, // 'enter' or 'exit'
        timestamp: new Date()
      });
    });

    // Handle command execution (from dashboard to vehicle)
    socket.on('send-command', (data) => {
      const { vehicleId, commandId, command } = data;
      console.log(`[WebSocket] Command sent to vehicle ${vehicleId}:`, command);

      // Forward command to vehicle
      io.to(`vehicle-${vehicleId}`).emit('vehicle-command', {
        commandId,
        command,
        timestamp: new Date()
      });
    });

    // Handle command completion (from vehicle to dashboard)
    socket.on('command-complete', (data) => {
      const { vehicleId, commandId, success, result } = data;
      console.log(`[WebSocket] Command ${commandId} completed for vehicle ${vehicleId}`);

      // Broadcast completion to dashboard
      io.to(`vehicle-${vehicleId}`).emit('command-complete', {
        vehicleId,
        commandId,
        success,
        result,
        timestamp: new Date()
      });
    });

    // Handle push notifications
    socket.on('push-notification', (data) => {
      const { vehicleId, title, message, severity } = data;
      console.log(`[WebSocket] Push notification for vehicle ${vehicleId}:`, title);

      // Broadcast to all clients watching this vehicle
      io.to(`vehicle-${vehicleId}`).emit('push-notification', {
        vehicleId,
        title,
        message,
        severity,
        timestamp: new Date()
      });
    });

    // Handle trip events
    socket.on('trip-event', (data) => {
      const { vehicleId, type, severity, description, latitude, longitude } = data;
      console.log(`[WebSocket] Trip event for vehicle ${vehicleId}:`, type);

      io.to(`vehicle-${vehicleId}`).emit('trip-event', {
        vehicleId,
        type,
        severity,
        description,
        latitude,
        longitude,
        timestamp: new Date()
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`[WebSocket] Client disconnected: ${socket.id}`);

      // Remove from active vehicles
      for (const [vehicleId, socketId] of activeVehicles.entries()) {
        if (socketId === socket.id) {
          activeVehicles.delete(vehicleId);
          console.log(`[WebSocket] Vehicle ${vehicleId} disconnected`);
        }
      }
    });

    // Send current active vehicles count periodically
    const statsInterval = setInterval(() => {
      socket.emit('server-stats', {
        activeVehicles: activeVehicles.size,
        connectedClients: io.sockets.sockets.size
      });
    }, 30000); // Every 30 seconds

    socket.on('disconnect', () => {
      clearInterval(statsInterval);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Socket.IO server running on ws://${hostname}:${port}`);
      console.log(`> Environment: ${dev ? 'development' : 'production'}`);
    });
});

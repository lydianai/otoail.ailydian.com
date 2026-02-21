'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

interface VehicleStatus {
  vehicleId: string;
  status: any;
  timestamp: string;
}

interface LocationUpdate {
  vehicleId: string;
  location: {
    latitude: number;
    longitude: number;
    altitude?: number;
    heading?: number;
    speed?: number;
    accuracy?: number;
  };
  timestamp: string;
}

interface GeoFenceAlert {
  vehicleId: string;
  distance: number;
  radius: number;
  location: {
    latitude: number;
    longitude: number;
  };
  message: string;
  timestamp: string;
}

interface CommandComplete {
  commandId: string;
  success: boolean;
  response?: any;
  error?: string;
}

interface WebSocketContextType {
  socket: Socket | null;
  connected: boolean;
  registerVehicle: (vehicleId: string) => void;
  sendCommand: (vehicleId: string, commandId: string, command: string) => void;
  onStatusUpdate: (callback: (data: VehicleStatus) => void) => () => void;
  onLocationUpdate: (callback: (data: LocationUpdate) => void) => () => void;
  onGeoFenceAlert: (callback: (data: GeoFenceAlert) => void) => () => void;
  onCommandComplete: (callback: (data: CommandComplete) => void) => () => void;
  onPushNotification: (callback: (data: any) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Production'da WebSocket devre dışı (Railway'e geçince aktif edilecek)
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
      console.log('[WebSocket] Disabled in production - will be enabled when migrated to Railway');
      return;
    }

    if (!session?.user) {
      return;
    }

    // Socket.IO bağlantısı oluştur (sadece development)
    const newSocket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    newSocket.on('connect', () => {
      console.log('[WebSocket] Connected to server');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('[WebSocket] Disconnected from server');
      setConnected(false);
    });

    newSocket.on('error', (error) => {
      console.error('[WebSocket] Error:', error);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      newSocket.close();
      socketRef.current = null;
    };
  }, [session]);

  const registerVehicle = useCallback((vehicleId: string) => {
    if (socketRef.current && session?.user?.id) {
      console.log(`[WebSocket] Registering vehicle ${vehicleId}`);
      socketRef.current.emit('register:vehicle', {
        vehicleId,
        userId: session.user.id,
      });
    }
  }, [session]);

  const sendCommand = useCallback((vehicleId: string, commandId: string, command: string) => {
    if (socketRef.current && session?.user?.id) {
      console.log(`[WebSocket] Sending command ${command} to vehicle ${vehicleId}`);
      socketRef.current.emit('command:send', {
        vehicleId,
        userId: session.user.id,
        commandId,
        command,
      });
    }
  }, [session]);

  const onStatusUpdate = useCallback((callback: (data: VehicleStatus) => void) => {
    if (!socketRef.current) return () => {};

    socketRef.current.on('status:update', callback);
    return () => {
      socketRef.current?.off('status:update', callback);
    };
  }, []);

  const onLocationUpdate = useCallback((callback: (data: LocationUpdate) => void) => {
    if (!socketRef.current) return () => {};

    socketRef.current.on('location:update', callback);
    return () => {
      socketRef.current?.off('location:update', callback);
    };
  }, []);

  const onGeoFenceAlert = useCallback((callback: (data: GeoFenceAlert) => void) => {
    if (!socketRef.current) return () => {};

    socketRef.current.on('alert:geofence', callback);
    return () => {
      socketRef.current?.off('alert:geofence', callback);
    };
  }, []);

  const onCommandComplete = useCallback((callback: (data: CommandComplete) => void) => {
    if (!socketRef.current) return () => {};

    socketRef.current.on('command:complete', callback);
    return () => {
      socketRef.current?.off('command:complete', callback);
    };
  }, []);

  const onPushNotification = useCallback((callback: (data: any) => void) => {
    if (!socketRef.current) return () => {};

    socketRef.current.on('notification:push', callback);
    return () => {
      socketRef.current?.off('notification:push', callback);
    };
  }, []);

  const value: WebSocketContextType = {
    socket,
    connected,
    registerVehicle,
    sendCommand,
    onStatusUpdate,
    onLocationUpdate,
    onGeoFenceAlert,
    onCommandComplete,
    onPushNotification,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}

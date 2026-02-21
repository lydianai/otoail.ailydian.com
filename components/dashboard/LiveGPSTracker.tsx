'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWebSocket } from '@/lib/websocket-context';
import { MapPin, Navigation, Gauge, Clock } from 'lucide-react';

interface GPSData {
  latitude: number;
  longitude: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp: Date;
}

interface LiveGPSTrackerProps {
  vehicleId: string;
}

export default function LiveGPSTracker({ vehicleId }: LiveGPSTrackerProps) {
  const [gpsData, setGpsData] = useState<GPSData | null>(null);
  const [tracking, setTracking] = useState(false);
  const { onLocationUpdate, connected, registerVehicle } = useWebSocket();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vehicleId || !connected) return;

    // Aracı kaydet
    registerVehicle(vehicleId);

    // Konum güncellemelerini dinle
    const unsubscribe = onLocationUpdate((data) => {
      if (data.vehicleId === vehicleId) {
        setGpsData({
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          altitude: data.location.altitude,
          speed: data.location.speed,
          heading: data.location.heading,
          timestamp: new Date()
        });
        setTracking(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [vehicleId, connected, registerVehicle, onLocationUpdate]);

  const formatCoordinate = (value: number, isLat: boolean) => {
    const direction = isLat ? (value >= 0 ? 'K' : 'G') : (value >= 0 ? 'D' : 'B');
    return `${Math.abs(value).toFixed(6)}° ${direction}`;
  };

  return (
    <div className="space-y-4">
      {/* GPS Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${tracking ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`} />
          <h3 className="text-lg font-semibold text-white">
            {tracking ? 'Canlı GPS Takip' : 'GPS Bekleniyor...'}
          </h3>
        </div>
        {gpsData && (
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Clock className="w-4 h-4" />
            {gpsData.timestamp.toLocaleTimeString('tr-TR')}
          </div>
        )}
      </div>

      {/* GPS Data Cards */}
      {gpsData && (
        <div className="grid grid-cols-2 gap-3">
          {/* Latitude */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-white/70">Enlem</span>
            </div>
            <p className="text-lg font-bold text-white">
              {formatCoordinate(gpsData.latitude, true)}
            </p>
          </motion.div>

          {/* Longitude */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-white/70">Boylam</span>
            </div>
            <p className="text-lg font-bold text-white">
              {formatCoordinate(gpsData.longitude, false)}
            </p>
          </motion.div>

          {/* Speed */}
          {gpsData.speed !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-500/20 border border-green-500/50 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 text-green-400" />
                <span className="text-xs text-white/70">Hız</span>
              </div>
              <p className="text-lg font-bold text-white">
                {Math.round(gpsData.speed)} km/s
              </p>
            </motion.div>
          )}

          {/* Altitude */}
          {gpsData.altitude !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-white/70">Rakım</span>
              </div>
              <p className="text-lg font-bold text-white">
                {Math.round(gpsData.altitude)} m
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Map Placeholder */}
      <div
        ref={mapRef}
        className="w-full h-64 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center"
      >
        {gpsData ? (
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-white/70">Harita Görünümü</p>
            <p className="text-xs text-white/50 mt-1">
              {gpsData.latitude.toFixed(4)}, {gpsData.longitude.toFixed(4)}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-white/50">GPS verisi bekleniyor...</p>
          </div>
        )}
      </div>

      {/* Connection Status */}
      {!connected && (
        <div className="bg-yellow-500/20 border border-yellow-500 rounded-xl p-3 text-center">
          <p className="text-sm text-yellow-300">
            WebSocket bağlantısı kuruluyor...
          </p>
        </div>
      )}
    </div>
  );
}

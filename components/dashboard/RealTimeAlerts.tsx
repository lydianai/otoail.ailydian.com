'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebSocket } from '@/lib/websocket-context';
import {
  AlertTriangle,
  MapPin,
  TrendingUp,
  TrendingDown,
  Navigation,
  Zap,
  Wind,
  Droplets,
  X
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'geofence' | 'status' | 'trip' | 'notification';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  vehicleId?: string;
  vehicleName?: string;
}

export default function RealTimeAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { onGeoFenceAlert, onStatusUpdate, onPushNotification, connected } = useWebSocket();

  useEffect(() => {
    // Geo-fence alerts
    const unsubGeoFence = onGeoFenceAlert((data) => {
      const alert: Alert = {
        id: `geo-${Date.now()}`,
        type: 'geofence',
        severity: 'warning',
        title: 'Geo-Fence Uyarısı',
        message: data.message,
        timestamp: new Date(),
        vehicleId: data.vehicleId
      };
      setAlerts(prev => [alert, ...prev].slice(0, 5)); // Son 5 uyarı
    });

    // Status updates
    const unsubStatus = onStatusUpdate((data) => {
      // Kritik durumlar için uyarı oluştur
      if (data.status?.engineTemp && data.status.engineTemp > 100) {
        const alert: Alert = {
          id: `status-${Date.now()}`,
          type: 'status',
          severity: 'critical',
          title: 'Motor Sıcaklığı Uyarısı',
          message: `Motor sıcaklığı yüksek: ${data.status.engineTemp}°C`,
          timestamp: new Date(),
          vehicleId: data.vehicleId
        };
        setAlerts(prev => [alert, ...prev].slice(0, 5));
      }

      if (data.status?.fuelLevel && data.status.fuelLevel < 15) {
        const alert: Alert = {
          id: `fuel-${Date.now()}`,
          type: 'status',
          severity: 'warning',
          title: 'Yakıt Seviyesi Düşük',
          message: `Yakıt seviyesi: ${data.status.fuelLevel}%`,
          timestamp: new Date(),
          vehicleId: data.vehicleId
        };
        setAlerts(prev => [alert, ...prev].slice(0, 5));
      }
    });

    // Push notifications
    const unsubPush = onPushNotification((data) => {
      const alert: Alert = {
        id: `push-${Date.now()}`,
        type: 'notification',
        severity: data.severity || 'info',
        title: data.title,
        message: data.message,
        timestamp: new Date(),
        vehicleId: data.vehicleId,
        vehicleName: data.vehicleName
      };
      setAlerts(prev => [alert, ...prev].slice(0, 5));
    });

    return () => {
      unsubGeoFence();
      unsubStatus();
      unsubPush();
    };
  }, [onGeoFenceAlert, onStatusUpdate, onPushNotification]);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'geofence':
        return <MapPin className="w-5 h-5" />;
      case 'status':
        return <AlertTriangle className="w-5 h-5" />;
      case 'trip':
        return <Navigation className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getAlertColors = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 border-red-500 text-red-300';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-300';
      default:
        return 'bg-blue-500/20 border-blue-500 text-blue-300';
    }
  };

  if (!connected || alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`p-4 border-2 rounded-xl backdrop-blur-md shadow-2xl ${getAlertColors(alert.severity)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-white/80 mt-1">{alert.message}</p>
                {alert.vehicleName && (
                  <p className="text-xs text-white/60 mt-1">📍 {alert.vehicleName}</p>
                )}
                <p className="text-xs text-white/50 mt-2">
                  {alert.timestamp.toLocaleTimeString('tr-TR')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

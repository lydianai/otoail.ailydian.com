'use client';

// ============================================
// TÜRK OTO AI - OBD Connection Component
// ELM327 Bluetooth Connection Manager
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bluetooth, AlertCircle, CheckCircle, Loader2, Unplug, Info } from 'lucide-react';
import { getOBDManager, OBDBluetoothManager } from '@/lib/obd-bluetooth';
import { vehicleStorage } from '@/lib/vehicle-storage';
import type { OBDData } from '@/types';

interface OBDConnectionProps {
  onDataUpdate?: (data: Partial<OBDData>) => void;
  autoConnect?: boolean;
}

export default function OBDConnection({ onDataUpdate, autoConnect = false }: OBDConnectionProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Check Web Bluetooth support
  useEffect(() => {
    const supported = OBDBluetoothManager.isSupported();
    setIsSupported(supported);

    if (!supported) {
      setError('Web Bluetooth API desteklenmiyor. Lütfen Chrome, Edge veya Opera kullanın.');
    }
  }, []);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect && isSupported && connectionState === 'disconnected') {
      handleConnect();
    }
  }, [autoConnect, isSupported]);

  // Handle connection to OBD-II device
  const handleConnect = async () => {
    if (!isSupported) {
      setError('Web Bluetooth API desteklenmiyor');
      return;
    }

    try {
      setConnectionState('connecting');
      setError(null);

      const obdManager = getOBDManager();

      // Request device pairing
      await obdManager.requestDevice();

      // Connect to device
      await obdManager.connect();

      const name = obdManager.getDeviceName();
      setDeviceName(name || 'Unknown Device');
      setConnectionState('connected');

      // Update device info in storage
      vehicleStorage.updateDeviceInfo(name, obdManager.getDeviceName());

      // Start polling data
      obdManager.startPolling((data) => {
        setLastUpdate(new Date());

        // Save to persistent storage
        if (data.timestamp) {
          vehicleStorage.saveOBDData(data as OBDData);
        }

        // Notify parent component
        if (onDataUpdate) {
          onDataUpdate(data);
        }
      }, 1000); // Poll every 1 second

    } catch (err: any) {
      setConnectionState('error');
      setError(err.message || 'Bağlantı hatası');
      console.error('OBD Connection error:', err);
    }
  };

  // Handle disconnection
  const handleDisconnect = async () => {
    try {
      const obdManager = getOBDManager();
      await obdManager.disconnect();
      setConnectionState('disconnected');
      setDeviceName(null);
      setLastUpdate(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Bağlantı kesme hatası');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const obdManager = getOBDManager();
      if (obdManager.isConnected()) {
        obdManager.stopPolling();
      }
    };
  }, []);

  // Connection status indicator
  const getStatusColor = () => {
    switch (connectionState) {
      case 'connected':
        return '#10b981'; // green
      case 'connecting':
        return '#f59e0b'; // orange
      case 'error':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  const getStatusIcon = () => {
    switch (connectionState) {
      case 'connected':
        return <CheckCircle className="w-5 h-5" />;
      case 'connecting':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Bluetooth className="w-5 h-5" />;
    }
  };

  const getStatusText = () => {
    switch (connectionState) {
      case 'connected':
        return deviceName || 'Bağlandı';
      case 'connecting':
        return 'Bağlanıyor...';
      case 'error':
        return 'Hata';
      default:
        return 'Bağlı Değil';
    }
  };

  return (
    <div className="w-full">
      {/* Connection Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 rounded-2xl bg-white border-2 shadow-lg"
        style={{ borderColor: getStatusColor() }}
      >
        <div className="flex items-center gap-3">
          {/* Status Icon */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: getStatusColor() + '20', color: getStatusColor() }}
          >
            {getStatusIcon()}
          </div>

          {/* Status Text */}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-900">OBD-II Bağlantısı</p>
              {lastUpdate && connectionState === 'connected' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
              )}
            </div>
            <p className="text-sm" style={{ color: getStatusColor() }}>
              {getStatusText()}
            </p>
            {lastUpdate && connectionState === 'connected' && (
              <p className="text-xs text-gray-400">
                Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
              </p>
            )}
          </div>
        </div>

        {/* Connect/Disconnect Button */}
        <div className="flex items-center gap-2">
          {connectionState === 'disconnected' || connectionState === 'error' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConnect}
              disabled={!isSupported}
              className="px-6 py-3 rounded-full bg-[#E30A17] text-white font-semibold shadow-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <div className="flex items-center gap-2">
                <Bluetooth className="w-5 h-5" />
                <span>Bağlan</span>
              </div>
            </motion.button>
          ) : connectionState === 'connected' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDisconnect}
              className="px-6 py-3 rounded-full bg-gray-600 text-white font-semibold shadow-lg hover:bg-gray-700 transition-all"
            >
              <div className="flex items-center gap-2">
                <Unplug className="w-5 h-5" />
                <span>Bağlantıyı Kes</span>
              </div>
            </motion.button>
          ) : (
            <div className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-lg">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-4 rounded-xl bg-red-50 border border-red-200"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Bağlantı Hatası</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Box for unsupported browsers */}
      {!isSupported && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-4 rounded-xl bg-blue-50 border border-blue-200"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">Tarayıcı Desteği Gerekli</p>
              <p className="text-sm text-blue-700 mb-2">
                OBD-II Bluetooth bağlantısı için Web Bluetooth API desteği gereklidir.
              </p>
              <p className="text-xs text-blue-600">
                Desteklenen tarayıcılar: Chrome, Edge, Opera (masaüstü ve Android)
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Help Text when disconnected */}
      {connectionState === 'disconnected' && !error && isSupported && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-200"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-2">Bağlantı Talimatları:</p>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>ELM327 OBD-II cihazınızı aracınızın OBD portuna takın</li>
                <li>Cihazın Bluetooth'unu açın (genellikle otomatik)</li>
                <li>"Bağlan" butonuna tıklayın</li>
                <li>Listeden cihazınızı seçin (OBD, ELM327, vb.)</li>
                <li>Eşleştirme tamamlandıktan sonra canlı veriler görünecek</li>
              </ol>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

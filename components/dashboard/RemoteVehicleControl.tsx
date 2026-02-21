'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Power, Lock, Unlock, MapPin, Wind, Zap, Activity, AlertTriangle,
  ThermometerSun, Check, X, Loader, Shield, Volume2, RefreshCw,
  Navigation, Battery, Fuel, Key, Clock, ChevronRight
} from 'lucide-react';

interface RemoteControlData {
  remoteStartEnabled: boolean;
  remoteLockEnabled: boolean;
  remoteClimateEnabled: boolean;
  remoteHornEnabled: boolean;
  remoteLocateEnabled: boolean;
  pinRequired: boolean;
}

interface RealtimeStatus {
  engineRunning: boolean;
  doorsLocked: boolean;
  isMoving: boolean;
  speed?: number;
  climateOn: boolean;
  internetConnected: boolean;
  signalStrength?: number;
  latitude?: number;
  longitude?: number;
  batteryVoltage?: number;
  fuelLevel?: number;
  interiorTemp?: number;
  lastUpdate: string;
}

interface RemoteVehicleControlProps {
  vehicleId: string;
  vehicleName: string;
}

export default function RemoteVehicleControl({ vehicleId, vehicleName }: RemoteVehicleControlProps) {
  const [remoteControl, setRemoteControl] = useState<RemoteControlData | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState<RealtimeStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin] = useState('');
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);
  const [commandStatus, setCommandStatus] = useState<{type: 'success' | 'error' | 'loading' | null, message: string}>({type: null, message: ''});
  const [commandHistory, setCommandHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchRemoteControl();
    fetchRealtimeStatus();
    const interval = setInterval(fetchRealtimeStatus, 5000); // Her 5 saniyede bir güncelle
    return () => clearInterval(interval);
  }, [vehicleId]);

  const fetchRemoteControl = async () => {
    try {
      const response = await fetch(`/api/vehicles/remote-control?vehicleId=${vehicleId}`);
      const result = await response.json();

      if (result.success) {
        setRemoteControl(result.remoteControl);
        setRealtimeStatus(result.realtimeStatus);
      }
    } catch (error) {
      console.error('Fetch remote control error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealtimeStatus = async () => {
    try {
      const response = await fetch(`/api/vehicles/remote-control?vehicleId=${vehicleId}`);
      const result = await response.json();

      if (result.success && result.realtimeStatus) {
        setRealtimeStatus(result.realtimeStatus);
      }
    } catch (error) {
      console.error('Fetch realtime status error:', error);
    }
  };

  const executeCommand = async (command: string, requiresPin: boolean = true) => {
    if (requiresPin && remoteControl?.pinRequired) {
      setPendingCommand(command);
      setShowPinDialog(true);
      return;
    }

    await sendCommand(command);
  };

  const sendCommand = async (command: string, pinValue?: string) => {
    setCommandStatus({ type: 'loading', message: 'Komut gönderiliyor...' });

    try {
      const response = await fetch('/api/vehicles/command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleId,
          command,
          pin: pinValue || pin
        }),
      });

      const result = await response.json();

      if (result.success) {
        setCommandStatus({ type: 'success', message: result.message });
        setShowPinDialog(false);
        setPin('');
        setPendingCommand(null);

        // Durum güncellemesi için bekle
        setTimeout(() => {
          fetchRealtimeStatus();
          setCommandStatus({ type: null, message: '' });
        }, 3000);
      } else {
        setCommandStatus({ type: 'error', message: result.error || 'Komut gönderilemedi' });
      }
    } catch (error) {
      setCommandStatus({ type: 'error', message: 'Bir hata oluştu' });
    }
  };

  const handlePinSubmit = () => {
    if (pin.length >= 4 && pendingCommand) {
      sendCommand(pendingCommand, pin);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!remoteControl) {
    return (
      <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
        <AlertTriangle className="w-12 h-12 text-yellow-600 mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Uzaktan Kontrol Aktif Değil</h3>
        <p className="text-gray-600 mb-4">Bu araç için uzaktan kontrol özellikleri henüz yapılandırılmamış.</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
          Şimdi Yapılandır
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Vehicle Status Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{vehicleName}</h2>
            <p className="text-sm text-gray-400">Uzaktan Kontrol Paneli</p>
          </div>
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            realtimeStatus?.internetConnected
              ? 'bg-green-500/20 border border-green-500/50'
              : 'bg-red-500/20 border border-red-500/50'
          }`}>
            <div className={`w-2 h-2 rounded-full ${realtimeStatus?.internetConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-xs font-semibold">
              {realtimeStatus?.internetConnected ? 'Çevrimiçi' : 'Çevrimdışı'}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Power className={`w-4 h-4 ${realtimeStatus?.engineRunning ? 'text-green-400' : 'text-gray-400'}`} />
              <span className="text-xs text-gray-400">Motor</span>
            </div>
            <p className="text-sm font-bold">{realtimeStatus?.engineRunning ? 'Çalışıyor' : 'Kapalı'}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              {realtimeStatus?.doorsLocked ? (
                <Lock className="w-4 h-4 text-red-400" />
              ) : (
                <Unlock className="w-4 h-4 text-green-400" />
              )}
              <span className="text-xs text-gray-400">Kapılar</span>
            </div>
            <p className="text-sm font-bold">{realtimeStatus?.doorsLocked ? 'Kilitli' : 'Açık'}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Wind className={`w-4 h-4 ${realtimeStatus?.climateOn ? 'text-blue-400' : 'text-gray-400'}`} />
              <span className="text-xs text-gray-400">Klima</span>
            </div>
            <p className="text-sm font-bold">
              {realtimeStatus?.climateOn ? `${realtimeStatus.interiorTemp || 22}°C` : 'Kapalı'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Fuel className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-400">Yakıt</span>
            </div>
            <p className="text-sm font-bold">%{realtimeStatus?.fuelLevel?.toFixed(0) || '--'}</p>
          </div>
        </div>

        {realtimeStatus?.lastUpdate && (
          <div className="mt-4 text-xs text-gray-400 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Son güncelleme: {new Date(realtimeStatus.lastUpdate).toLocaleTimeString('tr-TR')}
          </div>
        )}
      </div>

      {/* Command Status */}
      <AnimatePresence>
        {commandStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl flex items-center gap-3 ${
              commandStatus.type === 'success' ? 'bg-green-50 border-2 border-green-200' :
              commandStatus.type === 'error' ? 'bg-red-50 border-2 border-red-200' :
              'bg-blue-50 border-2 border-blue-200'
            }`}
          >
            {commandStatus.type === 'success' && <Check className="w-5 h-5 text-green-600" />}
            {commandStatus.type === 'error' && <X className="w-5 h-5 text-red-600" />}
            {commandStatus.type === 'loading' && <Loader className="w-5 h-5 text-blue-600 animate-spin" />}
            <p className={`text-sm font-semibold ${
              commandStatus.type === 'success' ? 'text-green-700' :
              commandStatus.type === 'error' ? 'text-red-700' :
              'text-blue-700'
            }`}>
              {commandStatus.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Start/Stop Engine */}
        {remoteControl.remoteStartEnabled && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => executeCommand(realtimeStatus?.engineRunning ? 'STOP_ENGINE' : 'START_ENGINE')}
            disabled={!realtimeStatus?.internetConnected}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
              realtimeStatus?.engineRunning
                ? 'bg-red-50 border-red-200 hover:border-red-400'
                : 'bg-green-50 border-green-200 hover:border-green-400'
            }`}
          >
            <Power className={`w-8 h-8 ${realtimeStatus?.engineRunning ? 'text-red-600' : 'text-green-600'}`} />
            <div className="text-center">
              <p className="font-bold text-gray-900">
                {realtimeStatus?.engineRunning ? 'Motoru Durdur' : 'Motoru Çalıştır'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {realtimeStatus?.engineRunning ? 'Motor çalışıyor' : 'Motor kapalı'}
              </p>
            </div>
          </motion.button>
        )}

        {/* Lock/Unlock */}
        {remoteControl.remoteLockEnabled && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => executeCommand(realtimeStatus?.doorsLocked ? 'UNLOCK_DOORS' : 'LOCK_DOORS')}
            disabled={!realtimeStatus?.internetConnected}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50 ${
              realtimeStatus?.doorsLocked
                ? 'bg-red-50 border-red-200 hover:border-red-400'
                : 'bg-blue-50 border-blue-200 hover:border-blue-400'
            }`}
          >
            {realtimeStatus?.doorsLocked ? (
              <Unlock className="w-8 h-8 text-red-600" />
            ) : (
              <Lock className="w-8 h-8 text-blue-600" />
            )}
            <div className="text-center">
              <p className="font-bold text-gray-900">
                {realtimeStatus?.doorsLocked ? 'Kapıları Aç' : 'Kapıları Kilitle'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {realtimeStatus?.doorsLocked ? 'Kapılar kilitli' : 'Kapılar açık'}
              </p>
            </div>
          </motion.button>
        )}

        {/* Climate */}
        {remoteControl.remoteClimateEnabled && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => executeCommand(realtimeStatus?.climateOn ? 'CLIMATE_OFF' : 'CLIMATE_ON')}
            disabled={!realtimeStatus?.internetConnected}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50 ${
              realtimeStatus?.climateOn
                ? 'bg-blue-50 border-blue-200 hover:border-blue-400'
                : 'bg-gray-50 border-gray-200 hover:border-gray-400'
            }`}
          >
            <Wind className={`w-8 h-8 ${realtimeStatus?.climateOn ? 'text-blue-600' : 'text-gray-600'}`} />
            <div className="text-center">
              <p className="font-bold text-gray-900">Klima</p>
              <p className="text-xs text-gray-500 mt-1">
                {realtimeStatus?.climateOn ? 'Açık' : 'Kapalı'}
              </p>
            </div>
          </motion.button>
        )}

        {/* Horn & Lights */}
        {remoteControl.remoteHornEnabled && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => executeCommand('HORN_LIGHTS', false)}
            disabled={!realtimeStatus?.internetConnected}
            className="p-6 rounded-2xl border-2 bg-yellow-50 border-yellow-200 hover:border-yellow-400 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50"
          >
            <Volume2 className="w-8 h-8 text-yellow-600" />
            <div className="text-center">
              <p className="font-bold text-gray-900">Korna & Farlar</p>
              <p className="text-xs text-gray-500 mt-1">Ses ve ışık sinyali</p>
            </div>
          </motion.button>
        )}

        {/* Locate */}
        {remoteControl.remoteLocateEnabled && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => executeCommand('LOCATE', false)}
            disabled={!realtimeStatus?.internetConnected}
            className="p-6 rounded-2xl border-2 bg-purple-50 border-purple-200 hover:border-purple-400 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50"
          >
            <MapPin className="w-8 h-8 text-purple-600" />
            <div className="text-center">
              <p className="font-bold text-gray-900">Konum</p>
              <p className="text-xs text-gray-500 mt-1">Aracı bul</p>
            </div>
          </motion.button>
        )}

        {/* Refresh Status */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => executeCommand('REFRESH_STATUS', false)}
          disabled={!realtimeStatus?.internetConnected}
          className="p-6 rounded-2xl border-2 bg-gray-50 border-gray-200 hover:border-gray-400 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50"
        >
          <RefreshCw className="w-8 h-8 text-gray-600" />
          <div className="text-center">
            <p className="font-bold text-gray-900">Yenile</p>
            <p className="text-xs text-gray-500 mt-1">Durumu güncelle</p>
          </div>
        </motion.button>
      </div>

      {/* PIN Dialog */}
      <AnimatePresence>
        {showPinDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Güvenlik PIN</h3>
                  <p className="text-sm text-gray-500">Bu işlem için PIN gerekli</p>
                </div>
              </div>

              <input
                type="password"
                placeholder="4 haneli PIN"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-center text-2xl tracking-widest focus:border-blue-500 focus:outline-none mb-6"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPinDialog(false);
                    setPin('');
                    setPendingCommand(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100"
                >
                  İptal
                </button>
                <button
                  onClick={handlePinSubmit}
                  disabled={pin.length < 4}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Onayla
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

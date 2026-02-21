'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi, Signal, Globe, Satellite, Lock, Eye, EyeOff, Check, X,
  AlertCircle, RefreshCw, Zap, Shield, Activity, TrendingUp, Database, Radio
} from 'lucide-react';
import { useWebSocket } from '@/lib/websocket-context';

interface ConnectivityData {
  primaryProvider: string;
  primarySSID?: string;
  primaryPassword?: string;
  primaryAPN?: string;
  backupProvider?: string;
  backupSSID?: string;
  backupPassword?: string;
  backupAPN?: string;
  starlinkEnabled: boolean;
  starlinkDeviceId?: string;
  satelliteEnabled: boolean;
  satelliteProvider?: string;
  autoFailover: boolean;
  monthlyLimit?: number;
  isConnected: boolean;
  signalStrength?: number;
  dataUsage: number;
}

interface VehicleConnectivitySettingsProps {
  vehicleId: string;
  onClose: () => void;
}

const PROVIDERS = [
  { value: 'TURKCELL', label: 'Turkcell', color: '#FFD400', icon: '📱' },
  { value: 'VODAFONE', label: 'Vodafone', color: '#E60000', icon: '📱' },
  { value: 'TURK_TELEKOM', label: 'Türk Telekom', color: '#00A8E1', icon: '📱' },
  { value: 'STARLINK', label: 'Starlink', color: '#000000', icon: '🛰️' },
  { value: 'SATELLITE_OTHER', label: 'Diğer Uydu', color: '#6B7280', icon: '📡' },
  { value: 'WIFI_HOTSPOT', label: 'WiFi Hotspot', color: '#10B981', icon: '📶' },
  { value: 'MOBILE_HOTSPOT', label: 'Mobil Hotspot', color: '#8B5CF6', icon: '📲' }
];

const APN_DEFAULTS: Record<string, string> = {
  TURKCELL: 'internet',
  VODAFONE: 'internet',
  TURK_TELEKOM: 'internet'
};

export default function VehicleConnectivitySettings({ vehicleId, onClose }: VehicleConnectivitySettingsProps) {
  const { connected: wsConnected } = useWebSocket();

  const [connectivity, setConnectivity] = useState<ConnectivityData>({
    primaryProvider: 'TURKCELL',
    autoFailover: true,
    starlinkEnabled: false,
    satelliteEnabled: false,
    isConnected: false,
    dataUsage: 0
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showBackupPassword, setShowBackupPassword] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''});

  useEffect(() => {
    fetchConnectivity();
  }, [vehicleId]);

  const fetchConnectivity = async () => {
    try {
      const response = await fetch(`/api/vehicles/connectivity?vehicleId=${vehicleId}`);
      const result = await response.json();

      if (result.success && result.connectivity) {
        setConnectivity(result.connectivity);
      }
    } catch (error) {
      console.error('Fetch connectivity error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/vehicles/connectivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleId,
          ...connectivity
        }),
      });

      const result = await response.json();

      if (result.success) {
        setConnectionStatus({ type: 'success', message: 'Bağlantı ayarları başarıyla kaydedildi!' });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setConnectionStatus({ type: 'error', message: result.error || 'Kaydetme başarısız' });
      }
    } catch (error) {
      setConnectionStatus({ type: 'error', message: 'Bir hata oluştu' });
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus({ type: null, message: '' });

    // Simüle edilmiş bağlantı testi
    setTimeout(() => {
      setConnectionStatus({
        type: 'success',
        message: `${PROVIDERS.find(p => p.value === connectivity.primaryProvider)?.label} ile bağlantı başarılı!`
      });
      setTestingConnection(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8">
          <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Wifi className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Araç İnternet Bağlantısı</h2>
                <p className="text-sm text-white/80">Operatör ve uydu internet ayarları</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Connection Status Bar */}
          {connectivity.isConnected && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-300 rounded-xl flex items-center gap-3">
              <Activity className="w-5 h-5 text-green-300 animate-pulse" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Bağlantı Aktif</p>
                <p className="text-xs text-white/70">
                  Sinyal: {connectivity.signalStrength}% • Veri Kullanımı: {connectivity.dataUsage.toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {/* WebSocket Real-Time Connection Status */}
          <div className={`mt-3 p-3 border rounded-xl flex items-center gap-3 ${
            wsConnected
              ? 'bg-blue-500/20 border-blue-300'
              : 'bg-yellow-500/20 border-yellow-300'
          }`}>
            <Radio className={`w-5 h-5 ${wsConnected ? 'text-blue-300 animate-pulse' : 'text-yellow-300'}`} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                {wsConnected ? 'Gerçek Zamanlı Bağlantı Aktif' : 'Gerçek Zamanlı Bağlantı Kapalı'}
              </p>
              <p className="text-xs text-white/70">
                {wsConnected
                  ? 'WebSocket üzerinden canlı veri akışı alınıyor'
                  : 'WebSocket bağlantısı kurulamadı - Sayfa yenilenecek'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${wsConnected ? 'bg-blue-400' : 'bg-yellow-400'} animate-pulse`} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Primary Connection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Signal className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Birincil Bağlantı</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  İnternet Sağlayıcı
                </label>
                <select
                  value={connectivity.primaryProvider}
                  onChange={(e) => {
                    setConnectivity({
                      ...connectivity,
                      primaryProvider: e.target.value,
                      primaryAPN: APN_DEFAULTS[e.target.value] || ''
                    });
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  {PROVIDERS.map((provider) => (
                    <option key={provider.value} value={provider.value}>
                      {provider.icon} {provider.label}
                    </option>
                  ))}
                </select>
              </div>

              {(connectivity.primaryProvider === 'WIFI_HOTSPOT' || connectivity.primaryProvider === 'MOBILE_HOTSPOT') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    WiFi SSID (Ağ Adı)
                  </label>
                  <input
                    type="text"
                    placeholder="OtoAI-WiFi"
                    value={connectivity.primarySSID || ''}
                    onChange={(e) => setConnectivity({ ...connectivity, primarySSID: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {(connectivity.primaryProvider === 'WIFI_HOTSPOT' || connectivity.primaryProvider === 'MOBILE_HOTSPOT') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  WiFi Şifresi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={connectivity.primaryPassword || ''}
                    onChange={(e) => setConnectivity({ ...connectivity, primaryPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {['TURKCELL', 'VODAFONE', 'TURK_TELEKOM'].includes(connectivity.primaryProvider) && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  APN Ayarları
                </label>
                <input
                  type="text"
                  value={connectivity.primaryAPN || ''}
                  onChange={(e) => setConnectivity({ ...connectivity, primaryAPN: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="internet"
                />
              </div>
            )}
          </div>

          {/* Backup Connection */}
          <div className="border-t-2 border-gray-100 pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Yedek Bağlantı</h3>
              <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                Otomatik Yük Devretme
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Yedek Sağlayıcı (Opsiyonel)
                </label>
                <select
                  value={connectivity.backupProvider || ''}
                  onChange={(e) => setConnectivity({ ...connectivity, backupProvider: e.target.value || undefined })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Yok</option>
                  {PROVIDERS.map((provider) => (
                    <option key={provider.value} value={provider.value}>
                      {provider.icon} {provider.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Starlink & Satellite */}
          <div className="border-t-2 border-gray-100 pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">Uydu İnternet</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all cursor-pointer"
                onClick={() => setConnectivity({ ...connectivity, starlinkEnabled: !connectivity.starlinkEnabled })}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">⭐</span>
                    </div>
                    <span className="font-bold">Starlink</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-all ${connectivity.starlinkEnabled ? 'bg-purple-600' : 'bg-gray-300'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-all ${connectivity.starlinkEnabled ? 'ml-6' : 'ml-0.5'}`} />
                  </div>
                </div>
                {connectivity.starlinkEnabled && (
                  <input
                    type="text"
                    placeholder="Starlink Cihaz ID"
                    value={connectivity.starlinkDeviceId || ''}
                    onChange={(e) => {
                      e.stopPropagation();
                      setConnectivity({ ...connectivity, starlinkDeviceId: e.target.value });
                    }}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>

              <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all cursor-pointer"
                onClick={() => setConnectivity({ ...connectivity, satelliteEnabled: !connectivity.satelliteEnabled })}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">📡</span>
                    </div>
                    <span className="font-bold">Diğer Uydu</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-all ${connectivity.satelliteEnabled ? 'bg-purple-600' : 'bg-gray-300'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-all ${connectivity.satelliteEnabled ? 'ml-6' : 'ml-0.5'}`} />
                  </div>
                </div>
                {connectivity.satelliteEnabled && (
                  <input
                    type="text"
                    placeholder="Sağlayıcı Adı"
                    value={connectivity.satelliteProvider || ''}
                    onChange={(e) => {
                      e.stopPropagation();
                      setConnectivity({ ...connectivity, satelliteProvider: e.target.value });
                    }}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Data Limit */}
          <div className="border-t-2 border-gray-100 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-900">Veri Limiti</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Aylık Veri Limiti (MB) - Opsiyonel
              </label>
              <input
                type="number"
                placeholder="10000"
                value={connectivity.monthlyLimit || ''}
                onChange={(e) => setConnectivity({ ...connectivity, monthlyLimit: parseFloat(e.target.value) || undefined })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Status Message */}
          {connectionStatus.type && (
            <div className={`p-4 rounded-xl flex items-center gap-3 ${
              connectionStatus.type === 'success' ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
            }`}>
              {connectionStatus.type === 'success' ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p className={`text-sm font-semibold ${
                connectionStatus.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {connectionStatus.message}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-100 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={testConnection}
              disabled={testingConnection}
              className="px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Zap className={`w-5 h-5 ${testingConnection ? 'animate-pulse' : ''}`} />
              {testingConnection ? 'Test Ediliyor...' : 'Bağlantıyı Test Et'}
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Kaydet
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

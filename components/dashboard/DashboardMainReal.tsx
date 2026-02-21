'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Car, Gauge, Navigation, Radio, Settings as SettingsIcon, Battery, Thermometer,
  Fuel, Activity, MapPin, User, Users, CreditCard, Shield, Loader, AlertTriangle,
  TrendingUp, Plus, BatteryCharging
} from 'lucide-react';
import TeslaLiveMapUltra from '@/components/TeslaLiveMapUltra';
import VehicleOnboardingNew from './VehicleOnboardingNew';
import EVChargingStations from './EVChargingStations';

interface DashboardData {
  vehicle: any;
  obdData: any;
  userStats: any;
  drivingScores: any[];
  maintenanceAlerts: any[];
  availableVehicles: any[];
}

interface DashboardMainRealProps {
  onViewChange: (view: string) => void;
}

export default function DashboardMainReal({ onViewChange }: DashboardMainRealProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLiveMap, setShowLiveMap] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    // Her 10 saniyede bir güncelle
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const result = await response.json();

      if (result.success && result.hasVehicles) {
        setData(result);
        setError(null);
        setShowOnboarding(false);
      } else {
        // Araç yoksa onboarding popup göster
        setShowOnboarding(true);
        setError(null);
      }
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      // Hata durumunda (401, network error, vb.) onboarding göster
      setShowOnboarding(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Araç yoksa sadece onboarding göster
  if (showOnboarding) {
    return (
      <div className="h-full">
        <VehicleOnboardingNew
          onComplete={async () => {
            setShowOnboarding(false);
            await fetchDashboardData();
          }}
          onClose={() => {
            setShowOnboarding(false);
          }}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center max-w-md px-6">
          <Car className="w-20 h-20 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-3">Hoş Geldiniz!</h2>
          <p className="text-gray-400 mb-8">
            Gerçek verilerle çalışan dashboard'unuzu kullanmaya başlamak için lütfen bir araç ekleyin.
          </p>
          <button
            onClick={() => setShowOnboarding(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <Plus className="w-6 h-6" />
            Araç Ekle
          </button>
        </div>
      </div>
    );
  }

  const { vehicle, obdData, userStats, maintenanceAlerts } = data;

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-6 overflow-auto">
      {/* Left Panel - Vehicle Info & Quick Stats */}
      <div className="col-span-1 lg:col-span-4 space-y-4">
        {/* Vehicle Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E30A17] flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{vehicle.make} {vehicle.model}</h3>
                <p className="text-sm text-gray-400">{vehicle.year} • {vehicle.licensePlate}</p>
              </div>
            </div>
            {vehicle.obdConnected && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-semibold">Bağlı</span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-[#E30A17]" />
                <span className="text-xs text-gray-400">Toplam Mesafe</span>
              </div>
              <p className="text-2xl font-bold">{userStats.totalDistance.toLocaleString('tr-TR')} km</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#E30A17]" />
                <span className="text-xs text-gray-400">Ortalama Puan</span>
              </div>
              <p className="text-2xl font-bold">{userStats.averageScore.toFixed(0)}</p>
            </div>
          </div>

          {/* Maintenance Alerts */}
          {maintenanceAlerts.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">
                  {maintenanceAlerts.length} Bakım Uyarısı
                </span>
              </div>
              <p className="text-xs text-gray-400">{maintenanceAlerts[0].description}</p>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { icon: MapPin, label: 'Real Mode', view: 'realmode', color: '#10b981' },
            { icon: Radio, label: 'Sesli Asistan', view: 'voice', color: '#E30A17' },
            { icon: Navigation, label: 'Navigasyon', view: 'navigation', color: '#2563eb' },
            { icon: BatteryCharging, label: 'Şarj İstasyonları', view: 'charging', color: '#10b981' },
            { icon: Gauge, label: 'OBD Veriler', view: 'obd', color: '#16a34a' },
            { icon: User, label: 'Profil', view: 'profile', color: '#9333ea' },
            { icon: Users, label: 'Topluluk', view: 'community', color: '#f59e0b' },
            { icon: CreditCard, label: 'Abonelik', view: 'subscription', color: '#ec4899' },
            { icon: Shield, label: 'Admin', view: 'admin', color: '#06b6d4' },
            { icon: SettingsIcon, label: 'Ayarlar', view: 'settings', color: '#64748b' },
          ].map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewChange(action.view)}
              className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#E30A17] shadow-lg hover:shadow-xl transition-all group"
            >
              <action.icon
                className="w-8 h-8 text-gray-600 group-hover:text-[#E30A17] transition-colors mb-2"
                style={{ color: action.color }}
              />
              <p className="text-sm font-semibold text-gray-900">{action.label}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Center Panel - Live Map / OBD Data */}
      <div className="col-span-1 lg:col-span-8">
        {showLiveMap ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full rounded-3xl overflow-hidden relative"
          >
            <TeslaLiveMapUltra className="h-full min-h-[600px]" />
            <button
              onClick={() => setShowLiveMap(false)}
              className="absolute top-4 right-4 px-6 py-3 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2 z-10"
            >
              <Gauge className="w-5 h-5" />
              OBD Verileri
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Canlı Araç Verileri</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLiveMap(true)}
                  className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Canlı Harita
                </button>
                <button
                  onClick={() => onViewChange('obd')}
                  className="px-4 py-2 rounded-full bg-[#E30A17] text-white text-sm font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  Detaylı Görünüm
                </button>
              </div>
            </div>

            {/* Live Metrics Grid */}
            {obdData ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { icon: Gauge, label: 'Motor Devri', value: obdData.rpm?.toLocaleString('tr-TR') || '0', unit: 'RPM', color: '#E30A17' },
                  { icon: Activity, label: 'Hız', value: obdData.speed?.toString() || '0', unit: 'km/h', color: '#2563eb' },
                  { icon: TrendingUp, label: 'Motor Yükü', value: obdData.engineLoad?.toFixed(0) || '0', unit: '%', color: '#16a34a' },
                  { icon: Thermometer, label: 'Sıcaklık', value: obdData.coolantTemp?.toFixed(0) || '0', unit: '°C', color: '#f59e0b' },
                  { icon: Battery, label: 'Akü', value: obdData.batteryVoltage?.toFixed(1) || '0', unit: 'V', color: '#8b5cf6' },
                  { icon: Fuel, label: 'Yakıt Seviyesi', value: obdData.fuelLevel?.toFixed(0) || '0', unit: '%', color: '#ec4899' },
                  { icon: Gauge, label: 'Gaz Pedalı', value: obdData.throttlePosition?.toFixed(0) || '0', unit: '%', color: '#06b6d4' },
                  { icon: Activity, label: 'Verim', value: obdData.efficiency?.toFixed(0) || '0', unit: '%', color: '#10b981' },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: metric.color }}
                    >
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">{metric.label}</p>
                    <p className="text-3xl font-black mb-1" style={{ color: metric.color }}>{metric.value}</p>
                    <p className="text-xs text-gray-400 font-medium">{metric.unit}</p>

                    <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full w-full" style={{ backgroundColor: metric.color }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                OBD verisi bulunamadı. Araç OBD cihazı bağlı değil.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

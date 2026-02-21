'use client';

/**
 * TESLA PRO DASHBOARD
 * Gerçek OBD-II, GPS, Hava Durumu ve ADAS entegrasyonlu
 * Ultra-premium Tesla Model 3 inspired UI
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Navigation, Cloud, Settings, Gauge, Activity,
  Bluetooth, MapPin, Thermometer, Wind, Droplets,
  Battery, Fuel, AlertCircle, TrendingUp, Radio, BatteryCharging
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useRealTimeOBD } from '@/hooks/useRealTimeOBD';
import { useGPSTracking } from '@/hooks/useGPSTracking';
import { useWeatherAPI } from '@/hooks/useWeatherAPI';
import EnergyChart from '@/components/tesla-dashboard/EnergyChart';

type TabType = 'overview' | 'energy' | 'navigation' | 'climate' | 'settings';

export default function TeslaProPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Real-time data hooks
  const {
    obdData,
    isConnected: obdConnected,
    isConnecting: obdConnecting,
    error: obdError,
    connect: connectOBD,
    disconnect: disconnectOBD,
  } = useRealTimeOBD(false);

  const {
    position: gpsPosition,
    isTracking: gpsTracking,
    error: gpsError,
    startTracking: startGPS,
    stopTracking: stopGPS,
  } = useGPSTracking(false);

  const {
    weather,
    isLoading: weatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeatherAPI();

  // Auto-fetch weather when GPS position changes
  useEffect(() => {
    if (gpsPosition) {
      refetchWeather(gpsPosition.latitude, gpsPosition.longitude);
    }
  }, [gpsPosition, refetchWeather]);

  // Vehicle visualization
  const renderVehicleView = () => (
    <div className="relative h-64 sm:h-80 md:h-96 lg:h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-800">
      {/* 3D Vehicle Visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 400 600" className="w-full h-full opacity-30">
          {/* Car body outline */}
          <path
            d="M 150 200 L 100 250 L 100 450 L 150 500 L 250 500 L 300 450 L 300 250 L 250 200 Z"
            fill="none"
            stroke="url(#carGradient)"
            strokeWidth="4"
          />
          {/* Windows */}
          <rect x="120" y="220" width="160" height="80" rx="10" fill="rgba(59, 130, 246, 0.2)" />
          <rect x="120" y="320" width="160" height="80" rx="10" fill="rgba(59, 130, 246, 0.2)" />
          {/* Headlights */}
          <circle cx="130" cy="190" r="8" fill="#3b82f6" opacity="0.8" />
          <circle cx="270" cy="190" r="8" fill="#3b82f6" opacity="0.8" />

          <defs>
            <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Tire Pressure Indicators */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 space-y-1 sm:space-y-2">
        <TirePressure position="FL" pressure={2.3} temp={32} />
        <TirePressure position="RL" pressure={2.4} temp={34} />
      </div>
      <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 space-y-1 sm:space-y-2 text-right">
        <TirePressure position="FR" pressure={2.3} temp={33} />
        <TirePressure position="RR" pressure={2.4} temp={35} />
      </div>

      {/* Status Badges */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 sm:gap-3 md:gap-4 px-4">
        <StatusBadge icon={<Radio />} label="OBD" status={obdConnected} />
        <StatusBadge icon={<MapPin />} label="GPS" status={gpsTracking} />
        <StatusBadge icon={<Cloud />} label="Hava" status={weather !== null} />
      </div>
    </div>
  );

  // Main panel content based on active tab
  const renderMainPanel = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPanel obdData={obdData} gpsPosition={gpsPosition} weather={weather} />;
      case 'energy':
        return <EnergyChart obdData={obdData} />;
      case 'navigation':
        return <NavigationPanel gpsPosition={gpsPosition} />;
      case 'climate':
        return <ClimatePanel weather={weather} />;
      case 'settings':
        return <SettingsPanel
          obdConnected={obdConnected}
          obdConnecting={obdConnecting}
          gpsTracking={gpsTracking}
          connectOBD={connectOBD}
          disconnectOBD={disconnectOBD}
          startGPS={startGPS}
          stopGPS={stopGPS}
        />;
      default:
        return null;
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'} overflow-x-hidden`}>
      {/* Top Status Bar */}
      <div className={`h-14 sm:h-16 md:h-20 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between px-4 sm:px-6 md:px-8`}>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10">
            <Logo size="sm" />
            <BatteryCharging className="w-5 h-5 text-[#E30A17]" />
          </div>
          <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'} hidden md:block`}>
            {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {weather && (
            <div className="flex items-center gap-1 sm:gap-2">
              <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-sm md:text-base">{weather.temp}°C</span>
            </div>
          )}
          {obdData && (
            <div className="flex items-center gap-1 sm:gap-2">
              <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-sm md:text-base">{obdData.speed?.toFixed(0) || 0} km/h</span>
            </div>
          )}
          {obdData && (
            <div className="hidden sm:flex items-center gap-1 sm:gap-2">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-sm md:text-base">{obdData.rpm?.toFixed(0) || 0} RPM</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="min-h-[calc(100vh-14rem)] sm:min-h-[calc(100vh-16rem)] md:min-h-[calc(100vh-20rem)] flex flex-col lg:flex-row">
        {/* Left Panel - Vehicle View */}
        <div className="w-full lg:w-[40%] p-3 sm:p-4 md:p-6">
          {renderVehicleView()}
        </div>

        {/* Right Panel - Tab Content */}
        <div className="w-full lg:w-[60%] p-3 sm:p-4 md:p-6 lg:pl-0">
          <div className={`h-full ${isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-2xl sm:rounded-3xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} overflow-hidden`}>
            {renderMainPanel()}
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className={`h-14 sm:h-16 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-around px-2 sm:px-4`}>
        {[
          { id: 'overview' as TabType, icon: Gauge, label: 'Genel' },
          { id: 'energy' as TabType, icon: Zap, label: 'Enerji' },
          { id: 'navigation' as TabType, icon: Navigation, label: 'Nav' },
          { id: 'climate' as TabType, icon: Thermometer, label: 'İklim' },
          { id: 'settings' as TabType, icon: Settings, label: 'Ayarlar' },
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 md:px-6 py-1 sm:py-2 rounded-lg sm:rounded-xl transition-all min-h-[48px] ${
              activeTab === tab.id
                ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                : isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Helper Components
function TirePressure({ position, pressure, temp }: { position: string; pressure: number; temp: number }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-700">
      <p className="text-[10px] sm:text-xs text-gray-400">{position}</p>
      <p className="font-bold text-xs sm:text-sm">{pressure} bar</p>
      <p className="text-[10px] sm:text-xs text-gray-500">{temp}°C</p>
    </div>
  );
}

function StatusBadge({ icon, label, status }: { icon: React.ReactNode; label: string; status: boolean }) {
  return (
    <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full ${
      status ? 'bg-green-500/20 border border-green-500/50' : 'bg-gray-800/50 border border-gray-700'
    }`}>
      <div className={`${status ? 'text-green-400' : 'text-gray-500'} [&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4`}>{icon}</div>
      <span className={`text-[10px] sm:text-xs md:text-sm font-medium ${status ? 'text-green-400' : 'text-gray-500'} hidden sm:inline`}>{label}</span>
      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${status ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
    </div>
  );
}

// Panel Components
function OverviewPanel({ obdData, gpsPosition, weather }: any) {
  return (
    <div className="h-full p-3 sm:p-4 md:p-6 overflow-auto">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Genel Bakış</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Speed */}
        <MetricCard
          icon={<Gauge className="w-6 h-6" />}
          label="Hız"
          value={obdData?.speed?.toFixed(0) || '0'}
          unit="km/h"
          color="blue"
        />

        {/* RPM */}
        <MetricCard
          icon={<Activity className="w-6 h-6" />}
          label="Devir"
          value={obdData?.rpm?.toFixed(0) || '0'}
          unit="RPM"
          color="purple"
        />

        {/* Fuel */}
        <MetricCard
          icon={<Fuel className="w-6 h-6" />}
          label="Yakıt"
          value={obdData?.fuelLevel?.toFixed(0) || '0'}
          unit="%"
          color="yellow"
        />

        {/* Battery */}
        <MetricCard
          icon={<Battery className="w-6 h-6" />}
          label="Akü"
          value={obdData?.batteryVoltage?.toFixed(1) || '0'}
          unit="V"
          color="green"
        />

        {/* Coolant Temp */}
        <MetricCard
          icon={<Thermometer className="w-6 h-6" />}
          label="Soğutma"
          value={obdData?.coolantTemp?.toFixed(0) || '0'}
          unit="°C"
          color="red"
        />

        {/* Efficiency */}
        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Verimlilik"
          value={obdData?.efficiency?.toFixed(0) || '0'}
          unit="%"
          color="green"
        />
      </div>

      {/* GPS Info */}
      {gpsPosition && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800 rounded-xl">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            GPS Konum
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div>
              <span className="text-gray-400">Enlem:</span> {gpsPosition.latitude.toFixed(6)}
            </div>
            <div>
              <span className="text-gray-400">Boylam:</span> {gpsPosition.longitude.toFixed(6)}
            </div>
            <div>
              <span className="text-gray-400">Doğruluk:</span> {gpsPosition.accuracy.toFixed(0)}m
            </div>
            <div>
              <span className="text-gray-400">Yön:</span> {gpsPosition.heading?.toFixed(0) || 'N/A'}°
            </div>
          </div>
        </div>
      )}

      {/* Weather Info */}
      {weather && (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-800 rounded-xl">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
            <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
            Hava Durumu - {weather.location}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{weather.temp}°C (Hissedilen: {weather.feelsLike}°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{weather.windSpeed} m/s</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Nem: {weather.humidity}%</span>
            </div>
            <div>
              <span className="text-gray-400">{weather.description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ icon, label, value, unit, color }: any) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-3 sm:p-4 bg-gray-800 rounded-xl border border-gray-700"
    >
      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 text-gray-400 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
        {icon}
        <span className="text-xs sm:text-sm">{label}</span>
      </div>
      <div className="flex items-baseline gap-1 sm:gap-2">
        <span className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${colors[color as keyof typeof colors]} bg-clip-text text-transparent`}>
          {value}
        </span>
        <span className="text-gray-500 text-xs sm:text-sm">{unit}</span>
      </div>
    </motion.div>
  );
}

function NavigationPanel({ gpsPosition }: any) {
  return (
    <div className="h-full p-3 sm:p-4 md:p-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Navigasyon</h2>
      {gpsPosition ? (
        <div className="text-center">
          <MapPin className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-blue-400" />
          <p className="text-base sm:text-lg">GPS Aktif</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            {gpsPosition.latitude.toFixed(6)}, {gpsPosition.longitude.toFixed(6)}
          </p>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <MapPin className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
          <p className="text-sm sm:text-base">GPS bekleniyor...</p>
        </div>
      )}
    </div>
  );
}

function ClimatePanel({ weather }: any) {
  return (
    <div className="h-full p-3 sm:p-4 md:p-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">İklim Kontrolü</h2>
      {weather ? (
        <div>
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold">{weather.temp}°C</p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">{weather.description}</p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-800 rounded-xl text-sm sm:text-base">
              <span>Nem</span>
              <span className="font-bold">{weather.humidity}%</span>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-800 rounded-xl text-sm sm:text-base">
              <span>Rüzgar</span>
              <span className="font-bold">{weather.windSpeed} m/s</span>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-800 rounded-xl text-sm sm:text-base">
              <span>Basınç</span>
              <span className="font-bold">{weather.pressure} hPa</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <Cloud className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
          <p className="text-sm sm:text-base">Hava durumu yükleniyor...</p>
        </div>
      )}
    </div>
  );
}

function SettingsPanel({ obdConnected, obdConnecting, gpsTracking, connectOBD, disconnectOBD, startGPS, stopGPS }: any) {
  return (
    <div className="h-full p-3 sm:p-4 md:p-6 overflow-auto">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Ayarlar</h2>

      <div className="space-y-3 sm:space-y-4">
        {/* OBD Connection */}
        <div className="p-3 sm:p-4 bg-gray-800 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                <Bluetooth className="w-4 h-4 sm:w-5 sm:h-5" />
                OBD-II Bağlantısı
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {obdConnected ? 'Bağlı' : obdConnecting ? 'Bağlanıyor...' : 'Bağlı değil'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={obdConnected ? disconnectOBD : connectOBD}
              disabled={obdConnecting}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base min-h-[48px] ${
                obdConnected
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } disabled:opacity-50`}
            >
              {obdConnected ? 'Bağlantıyı Kes' : obdConnecting ? 'Bağlanıyor...' : 'Bağlan'}
            </motion.button>
          </div>
        </div>

        {/* GPS Tracking */}
        <div className="p-3 sm:p-4 bg-gray-800 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                GPS Takibi
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {gpsTracking ? 'Aktif' : 'Pasif'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={gpsTracking ? stopGPS : startGPS}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base min-h-[48px] ${
                gpsTracking
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {gpsTracking ? 'Durdur' : 'Başlat'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

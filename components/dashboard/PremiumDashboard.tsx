'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio, Navigation, Gauge, User, Users, CreditCard, Shield,
  BatteryCharging, MapPin, Activity, Fuel, Layers, Compass,
  Bluetooth, Cloud, Thermometer, Wind, Droplets, Zap, TrendingUp,
  Eye, Settings, DollarSign, Camera, AlertTriangle, Battery
} from 'lucide-react';
import AdvancedMapView from '@/components/maps/AdvancedMapView';
import GoogleMapsView from '@/components/maps/GoogleMapsView';
import { useRealTimeOBD } from '@/hooks/useRealTimeOBD';
import { useGPSTracking } from '@/hooks/useGPSTracking';
import { useWeatherAPI } from '@/hooks/useWeatherAPI';
import { useTurkeyPOIs } from '@/hooks/useTurkeyPOIs';
import EnergyChart from '@/components/tesla-dashboard/EnergyChart';
import AdasVisualization from '@/components/adas/AdasVisualization';

export default function PremiumDashboard({ onViewChange }: { onViewChange: (view: string) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEnergyChart, setShowEnergyChart] = useState(false);
  const [showADAS, setShowADAS] = useState(false);
  const [showWeather, setShowWeather] = useState(true);
  const [useGoogleMaps, setUseGoogleMaps] = useState(false); // Map toggle

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
    startTracking: startGPS,
    stopTracking: stopGPS,
  } = useGPSTracking(true); // Auto-start GPS

  const {
    weather,
    refetch: refetchWeather,
  } = useWeatherAPI();

  // Turkey POIs hook
  const { filters: poiFilters, toggleFilter } = useTurkeyPOIs();

  // Auto-fetch weather when GPS position changes
  useEffect(() => {
    if (gpsPosition) {
      refetchWeather(gpsPosition.latitude, gpsPosition.longitude);
    }
  }, [gpsPosition, refetchWeather]);

  const quickActions = [
    { icon: Battery, label: 'Akü Optimizasyonu', view: 'battery', color: 'green', gradient: true },
    { icon: Radio, label: 'Sesli Asistan', view: 'voice', color: 'red' },
    { icon: Navigation, label: 'Navigasyon', view: 'navigation', color: 'blue' },
    { icon: BatteryCharging, label: 'Şarj İstasyonları', view: 'charging', color: 'emerald' },
    { icon: AlertTriangle, label: 'EV & Alarmlar', view: 'ev-alarms', color: 'orange' },
    { icon: Gauge, label: 'OBD Veriler', view: 'obd', color: 'purple' },
    { icon: User, label: 'Profil', view: 'profile', color: 'indigo' },
    { icon: Users, label: 'Topluluk', view: 'community', color: 'amber' },
    { icon: CreditCard, label: 'Abonelik', view: 'subscription', color: 'pink' },
    { icon: Shield, label: 'Admin', view: 'admin', color: 'cyan' },
  ];

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative">
      {/* Full Screen Map */}
      <div className="absolute inset-0">
        {useGoogleMaps ? (
          <GoogleMapsView
            className="h-full w-full"
            speed={obdData?.speed || 0}
            accentColor="#3b82f6"
            poiFilters={poiFilters}
          />
        ) : (
          <AdvancedMapView
            className="h-full w-full"
            speed={obdData?.speed || 0}
            accentColor="#3b82f6"
          />
        )}
      </div>
      {/* Top Bar - Ultra Minimal */}
      <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-30">
        <div className="flex items-center justify-between">
          {/* Left: Vehicle Info Card */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/30 backdrop-blur-3xl border border-white/10 rounded-2xl px-4 py-2.5 shadow-2xl"
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <div className="flex items-center gap-4">
              {/* Car Icon - Larger */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-white">TÜRK OTO AI</h2>
                <p className="text-sm text-white/70 font-medium">
                  {obdData?.speed ? `${obdData.speed.toFixed(0)} km/h` : '34 AI 2024'}
                </p>
              </div>
              {/* Real-time Stats */}
              <div className="hidden lg:flex items-center gap-3 ml-3 pl-3 border-l border-white/10">
                <div className="text-center">
                  <div className="text-xs text-white/60">Devir</div>
                  <div className="text-sm font-bold text-white">
                    {obdData?.rpm?.toFixed(0) || '0'} RPM
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/60">Yakıt</div>
                  <div className="text-sm font-bold text-white">
                    {obdData?.fuelLevel?.toFixed(0) || '0'}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/60">Sıcaklık</div>
                  <div className="text-sm font-bold text-white">
                    {obdData?.coolantTemp?.toFixed(0) || '0'}°C
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Menu Button - Larger and more prominent */}
          <motion.button
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(!showMenu)}
            className="bg-black/40 backdrop-blur-3xl border-2 border-white/20 rounded-2xl p-4 shadow-2xl hover:bg-black/50 transition-all"
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Removed center HUD to prevent overlap with map elements */}

      {/* Bottom Bar - Enhanced Status with Larger Icons */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* Real Mode Button - Prominent */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewChange('realmode')}
            className="bg-gradient-to-r from-emerald-500 to-green-600 backdrop-blur-3xl border-2 border-emerald-400/50 rounded-2xl px-6 py-3 shadow-2xl hover:shadow-emerald-500/50 transition-all flex items-center gap-3 group"
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <Zap className="w-5 h-5 text-white animate-pulse" />
            <span className="text-sm font-bold text-white">Gerçek Moda Geç</span>
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          </motion.button>

          {/* GPS Status */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`bg-black/40 backdrop-blur-3xl border-2 ${gpsTracking ? 'border-emerald-500/70' : 'border-white/20'} rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3`}
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <MapPin className={`w-5 h-5 ${gpsTracking ? 'text-emerald-400' : 'text-gray-400'}`} />
            <span className={`text-sm font-bold ${gpsTracking ? 'text-emerald-400' : 'text-gray-400'}`}>
              GPS
            </span>
            {gpsTracking && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
          </motion.div>

          {/* OBD Connection Status */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={obdConnected ? disconnectOBD : connectOBD}
            disabled={obdConnecting}
            className={`bg-black/40 backdrop-blur-3xl border-2 ${
              obdConnected ? 'border-blue-500/70' : 'border-white/20'
            } rounded-2xl px-5 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-3 disabled:opacity-50`}
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <Bluetooth className={`w-5 h-5 ${obdConnected ? 'text-blue-400' : 'text-gray-400'}`} />
            <span className={`text-sm font-bold ${obdConnected ? 'text-blue-400' : 'text-gray-400'}`}>
              {obdConnecting ? 'Bağlanıyor' : obdConnected ? 'OBD' : 'OBD Bağlan'}
            </span>
            {obdConnected && <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />}
          </motion.button>

          {/* Weather Widget */}
          {weather && showWeather && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-3xl border-2 border-white/20 rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3"
              style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
            >
              <Cloud className="w-5 h-5 text-sky-400" />
              <span className="text-sm font-bold text-white">{weather.temp}°C</span>
            </motion.div>
          )}

          {/* Energy Chart Toggle */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEnergyChart(!showEnergyChart)}
            className={`bg-black/40 backdrop-blur-3xl border-2 ${showEnergyChart ? 'border-purple-500/70 bg-purple-500/20' : 'border-white/20'} rounded-2xl px-5 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-3`}
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <Zap className={`w-5 h-5 ${showEnergyChart ? 'text-purple-400' : 'text-white'}`} />
            <span className={`text-sm font-bold ${showEnergyChart ? 'text-purple-400' : 'text-white'}`}>Enerji</span>
          </motion.button>

          {/* ADAS Toggle */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowADAS(!showADAS)}
            className={`bg-black/40 backdrop-blur-3xl border-2 ${showADAS ? 'border-yellow-500/70 bg-yellow-500/20' : 'border-white/20'} rounded-2xl px-5 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-3`}
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <Eye className={`w-5 h-5 ${showADAS ? 'text-yellow-400' : 'text-white'}`} />
            <span className={`text-sm font-bold ${showADAS ? 'text-yellow-400' : 'text-white'}`}>ADAS</span>
          </motion.button>

          {/* Google Maps Toggle */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUseGoogleMaps(!useGoogleMaps)}
            className={`bg-black/40 backdrop-blur-3xl border-2 ${useGoogleMaps ? 'border-green-500/70 bg-green-500/20' : 'border-white/20'} rounded-2xl px-5 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-3`}
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <Layers className={`w-5 h-5 ${useGoogleMaps ? 'text-green-400' : 'text-white'}`} />
            <span className={`text-sm font-bold ${useGoogleMaps ? 'text-green-400' : 'text-white'}`}>
              {useGoogleMaps ? 'Google Maps' : 'SVG Harita'}
            </span>
          </motion.button>

          {/* POI Filters - Only show when Google Maps is active */}
          {useGoogleMaps && (
            <>
              {/* HGS Toggle */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter('showHGS')}
                className={`bg-black/40 backdrop-blur-3xl border-2 ${poiFilters.showHGS ? 'border-yellow-500/70 bg-yellow-500/20' : 'border-white/20'} rounded-2xl px-4 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-2`}
                style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
              >
                <DollarSign className={`w-4 h-4 ${poiFilters.showHGS ? 'text-yellow-400' : 'text-white'}`} />
                <span className={`text-xs font-bold ${poiFilters.showHGS ? 'text-yellow-400' : 'text-white'}`}>HGS</span>
              </motion.button>

              {/* Radar Toggle */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter('showRadar')}
                className={`bg-black/40 backdrop-blur-3xl border-2 ${poiFilters.showRadar ? 'border-red-500/70 bg-red-500/20' : 'border-white/20'} rounded-2xl px-4 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-2`}
                style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
              >
                <Camera className={`w-4 h-4 ${poiFilters.showRadar ? 'text-red-400' : 'text-white'}`} />
                <span className={`text-xs font-bold ${poiFilters.showRadar ? 'text-red-400' : 'text-white'}`}>Radar</span>
              </motion.button>

              {/* Gas Stations Toggle */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter('showGas')}
                className={`bg-black/40 backdrop-blur-3xl border-2 ${poiFilters.showGas ? 'border-green-500/70 bg-green-500/20' : 'border-white/20'} rounded-2xl px-4 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-2`}
                style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
              >
                <Fuel className={`w-4 h-4 ${poiFilters.showGas ? 'text-green-400' : 'text-white'}`} />
                <span className={`text-xs font-bold ${poiFilters.showGas ? 'text-green-400' : 'text-white'}`}>Benzin</span>
              </motion.button>

              {/* EV Charging Toggle */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter('showEV')}
                className={`bg-black/40 backdrop-blur-3xl border-2 ${poiFilters.showEV ? 'border-blue-500/70 bg-blue-500/20' : 'border-white/20'} rounded-2xl px-4 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-2`}
                style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
              >
                <Zap className={`w-4 h-4 ${poiFilters.showEV ? 'text-blue-400' : 'text-white'}`} />
                <span className={`text-xs font-bold ${poiFilters.showEV ? 'text-blue-400' : 'text-white'}`}>Şarj</span>
              </motion.button>
            </>
          )}

          {/* OBD Quick Access */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewChange('obd')}
            className="bg-black/40 backdrop-blur-3xl border-2 border-white/20 rounded-2xl px-5 py-3 shadow-2xl hover:bg-black/50 transition-all flex items-center gap-3"
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <Gauge className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">Detaylı</span>
          </motion.button>
        </div>
      </div>

      {/* Right Side Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full sm:w-96 bg-gradient-to-b from-slate-900/95 to-black/95 backdrop-blur-3xl border-l border-white/10 z-50 overflow-y-auto"
              style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-white">Menü</h3>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Vehicle Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <Activity className="w-5 h-5 text-red-500 mb-2" />
                    <div className="text-xs text-white/60 mb-1">Toplam Mesafe</div>
                    <div className="text-xl font-black text-white">12,450 <span className="text-sm text-white/60">km</span></div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <Fuel className="w-5 h-5 text-red-500 mb-2" />
                    <div className="text-xs text-white/60 mb-1">Ort. Tüketim</div>
                    <div className="text-xl font-black text-white">6.2 <span className="text-sm text-white/60">L</span></div>
                  </div>
                </div>
              </div>

              {/* Menu Actions */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        onViewChange(action.view);
                        setShowMenu(false);
                      }}
                      className={`group ${
                        action.gradient
                          ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 border-green-400/50 hover:border-green-400'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                      } backdrop-blur-sm border rounded-2xl p-5 transition-all relative overflow-hidden`}
                    >
                      {action.gradient && (
                        <>
                          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full blur-2xl -mr-8 -mt-8" />
                          <span className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </>
                      )}
                      <action.icon className={`w-7 h-7 ${action.gradient ? 'text-green-400' : `text-${action.color}-500`} mb-3 group-hover:scale-110 transition-transform relative z-10`} />
                      <p className="text-sm font-bold text-white text-left relative z-10">{action.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Energy Chart Overlay */}
      <AnimatePresence>
        {showEnergyChart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEnergyChart(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border-t border-white/10 z-50 overflow-hidden"
              style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="text-xl font-bold">Enerji & Performans</h3>
                  <button
                    onClick={() => setShowEnergyChart(false)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <EnergyChart obdData={obdData} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ADAS Overlay */}
      <AnimatePresence>
        {showADAS && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowADAS(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[80vh] bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border border-white/10 z-50 rounded-3xl overflow-hidden shadow-2xl"
              style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="text-xl font-bold">ADAS - Gelişmiş Sürücü Destek Sistemi</h3>
                  <button
                    onClick={() => setShowADAS(false)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <AdasVisualization />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Zoom Controls - Right Center - Larger and more prominent */}
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-3xl border-2 border-white/20 flex items-center justify-center text-white text-2xl font-bold hover:bg-black/50 transition-all shadow-2xl"
          style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
        >
          +
        </motion.button>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-3xl border-2 border-white/20 flex items-center justify-center text-white text-lg font-black shadow-2xl"
          style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
        >
          16
        </motion.div>
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-3xl border-2 border-white/20 flex items-center justify-center text-white text-2xl font-bold hover:bg-black/50 transition-all shadow-2xl"
          style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
        >
          −
        </motion.button>
      </div>
    </div>
  );
}

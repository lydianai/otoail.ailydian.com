'use client';

// ============================================
// TÜRK OTO AI - Tesla-Style Dashboard
// Full-screen touchscreen interface
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Gauge, Navigation, Radio, Settings as SettingsIcon, Battery, Thermometer,
  Fuel, Activity, Clock, TrendingUp, MapPin, Menu, X, ChevronLeft,
  ChevronRight, Maximize2, Minimize2, AlertCircle, CheckCircle,
  User, Users, CreditCard, Shield
} from 'lucide-react';
import VoiceAssistant from '@/components/VoiceAssistant';
import OBDConnection from '@/components/OBDConnection';
import NavigationMap from '@/components/NavigationMap';
import TeslaLiveMap from '@/components/TeslaLiveMap';
import TeslaLiveMapV2 from '@/components/TeslaLiveMapV2';
import VehicleManager from '@/components/VehicleManager';
import UserProfile from '@/components/UserProfile';
import SocialCommunity from '@/components/SocialCommunity';
import PaymentSubscription from '@/components/PaymentSubscription';
import AdminPanel from '@/components/AdminPanel';
import Settings from '@/components/Settings';
import Onboarding from '@/components/Onboarding';
import type { OBDData, Vehicle } from '@/types';

// ==================== Types ====================
type DashboardView = 'main' | 'obd' | 'navigation' | 'voice' | 'settings' | 'vehicles' | 'profile' | 'community' | 'subscription' | 'admin';

// ==================== Helper Functions (OUTSIDE component to prevent re-creation) ====================
const generateStaticMockData = () => {
  const baseRPM = 2500;
  const baseSpeed = 80;
  const variation = Math.random() * 10 - 5;

  return {
    rpm: Math.round(baseRPM + variation * 20),
    speed: Math.round(baseSpeed + variation),
    engineLoad: Math.round(45 + variation),
    throttlePosition: Math.round(35 + variation),
    coolantTemp: Math.round(88 + variation * 0.5),
    fuelLevel: Math.round(55 + variation * 0.2),
    batteryVoltage: parseFloat((14.2 + variation * 0.05).toFixed(1)),
    efficiency: Math.round(75 + variation),
    dtcCodes: [],
  };
};

// ==================== Component ====================
export default function Dashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>('main');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false); // Start with dashboard visible
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [showLiveMap, setShowLiveMap] = useState(true); // Toggle between map and OBD

  // ABSOLUTE FREEZE MODE - If refresh persists, this will COMPLETELY stop all updates
  const FREEZE_MODE = false; // Set to true to completely freeze all state updates

  // Handle vehicle change from Vehicle Manager
  const handleVehicleChange = (vehicle: Vehicle) => {
    setActiveVehicle(vehicle);
  };

  // Real-time OBD data - using polling instead of EventSource
  const [obdData, setObdData] = useState<Partial<OBDData>>({
    rpm: 0,
    speed: 0,
    engineLoad: 0,
    throttlePosition: 0,
    coolantTemp: 0,
    fuelLevel: 0,
    batteryVoltage: 12.0,
    efficiency: 0,
    dtcCodes: [],
  });

  // Polling interval ref
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mark component as mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true);

    // Set default demo vehicle for testing
    const demoVehicle: Vehicle = {
      id: 'demo-vehicle-1',
      userId: 'demo-user',
      make: 'TOGG',
      model: 'T10X',
      year: 2024,
      licensePlate: '34 AI 2024',
      fuelType: 'electric',
      transmission: 'automatic',
      color: 'Gümüş',
      mileage: 12450,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setActiveVehicle(demoVehicle);
  }, []);

  // Page Visibility API - pause all updates when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
      console.log(`[Dashboard] Tab ${document.hidden ? 'hidden' : 'visible'}`);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Update time every second - ONLY when tab is visible
  useEffect(() => {
    if (FREEZE_MODE || !isTabVisible) return;

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isTabVisible, FREEZE_MODE]);

  // Initialize mock data ONCE on mount - CRITICAL FIX: use callback to avoid stale closure
  useEffect(() => {
    if (FREEZE_MODE || !mounted) return;

    // Initial data
    setObdData(generateStaticMockData());

    // Update every 10 seconds
    const intervalId = setInterval(() => {
      if (!FREEZE_MODE && document.visibilityState === 'visible') {
        setObdData(generateStaticMockData());
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [mounted, FREEZE_MODE]); // Only depend on mounted and FREEZE_MODE

  // Handle OBD data updates from Bluetooth connection
  const handleOBDDataUpdate = (data: Partial<OBDData>) => {
    setObdData(prevData => ({ ...prevData, ...data }));
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // ==================== Main Dashboard View ====================
  const MainDashboard = () => {
    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
      return <div className="h-full grid grid-cols-12 gap-4 p-6"><div className="col-span-12 flex items-center justify-center h-full"><div className="text-gray-500">Yükleniyor...</div></div></div>;
    }

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
                <h3 className="text-2xl font-bold">{activeVehicle?.make || 'Araç'} {activeVehicle?.model || 'Seçilmedi'}</h3>
                <p className="text-sm text-gray-400">{activeVehicle ? `${activeVehicle.year} • ${activeVehicle.licensePlate}` : 'Araç eklemek için tıklayın'}</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('vehicles')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-[#E30A17]" />
                <span className="text-xs text-gray-400">Toplam Mesafe</span>
              </div>
              <p className="text-2xl font-bold">12,450 km</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-4 h-4 text-[#E30A17]" />
                <span className="text-xs text-gray-400">Ort. Tüketim</span>
              </div>
              <p className="text-2xl font-bold">6.2 L/100km</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { icon: Radio, label: 'Sesli Asistan', view: 'voice' as DashboardView, color: '#E30A17' },
            { icon: Navigation, label: 'Navigasyon', view: 'navigation' as DashboardView, color: '#2563eb' },
            { icon: Gauge, label: 'OBD Veriler', view: 'obd' as DashboardView, color: '#16a34a' },
            { icon: User, label: 'Profil', view: 'profile' as DashboardView, color: '#9333ea' },
            { icon: Users, label: 'Topluluk', view: 'community' as DashboardView, color: '#f59e0b' },
            { icon: CreditCard, label: 'Abonelik', view: 'subscription' as DashboardView, color: '#ec4899' },
            { icon: Shield, label: 'Admin', view: 'admin' as DashboardView, color: '#06b6d4' },
            { icon: SettingsIcon, label: 'Ayarlar', view: 'settings' as DashboardView, color: '#64748b' },
          ].map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView(action.view)}
              className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#E30A17] shadow-lg hover:shadow-xl transition-all group"
            >
              <action.icon className="w-8 h-8 text-gray-600 group-hover:text-[#E30A17] transition-colors mb-2" style={{ color: action.color }} />
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
            <TeslaLiveMapV2 className="h-full min-h-[600px]" />
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
                  onClick={() => setCurrentView('obd')}
                  className="px-4 py-2 rounded-full bg-[#E30A17] text-white text-sm font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  Detaylı Görünüm
                </button>
              </div>
            </div>

          {/* Live Metrics Grid */}
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
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: metric.color }}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">{metric.label}</p>
                <p className="text-3xl font-black mb-1" style={{ color: metric.color }}>{metric.value}</p>
                <p className="text-xs text-gray-400 font-medium">{metric.unit}</p>

                {/* Animated Progress Bar */}
                <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: metric.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          </motion.div>
        )}
      </div>
    </div>
  );
  };

  // ==================== Voice Assistant View ====================
  const VoiceView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="h-full flex items-center justify-center p-6"
    >
      <div className="w-full max-w-4xl">
        <VoiceAssistant />
      </div>
    </motion.div>
  );

  // ==================== OBD Detailed View ====================
  const OBDView = () => {
    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
      return <div className="h-full flex items-center justify-center"><div className="text-gray-500">Yükleniyor...</div></div>;
    }

    return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-auto p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* OBD Connection Card */}
        <OBDConnection onDataUpdate={handleOBDDataUpdate} />

        {/* Real-time Metrics Grid - Large Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* RPM - Large Display */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-1 p-8 rounded-3xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-2xl"
          >
            <Gauge className="w-12 h-12 mb-4 opacity-80" />
            <p className="text-sm opacity-80 uppercase tracking-wider mb-2">Motor Devri</p>
            <p className="text-6xl font-black mb-2">{obdData.rpm?.toLocaleString('tr-TR') || '0'}</p>
            <p className="text-lg opacity-80">RPM</p>
          </motion.div>

          {/* Speed - Large Display */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-1 p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-2xl"
          >
            <Activity className="w-12 h-12 mb-4 opacity-80" />
            <p className="text-sm opacity-80 uppercase tracking-wider mb-2">Hız</p>
            <p className="text-6xl font-black mb-2">{obdData.speed || '0'}</p>
            <p className="text-lg opacity-80">km/h</p>
          </motion.div>

          {/* Temperature - Large Display */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-1 p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-2xl"
          >
            <Thermometer className="w-12 h-12 mb-4 opacity-80" />
            <p className="text-sm opacity-80 uppercase tracking-wider mb-2">Soğutma Suyu</p>
            <p className="text-6xl font-black mb-2">{obdData.coolantTemp?.toFixed(0) || '0'}</p>
            <p className="text-lg opacity-80">°C</p>
          </motion.div>
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: TrendingUp, label: 'Motor Yükü', value: obdData.engineLoad?.toFixed(0) || '0', unit: '%', color: 'bg-green-500' },
            { icon: Gauge, label: 'Gaz Pedalı', value: obdData.throttlePosition?.toFixed(0) || '0', unit: '%', color: 'bg-cyan-500' },
            { icon: Battery, label: 'Akü Voltajı', value: obdData.batteryVoltage?.toFixed(1) || '0', unit: 'V', color: 'bg-purple-500' },
            { icon: Fuel, label: 'Yakıt Seviyesi', value: obdData.fuelLevel?.toFixed(0) || '0', unit: '%', color: 'bg-pink-500' },
          ].map((metric, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl ${metric.color} text-white shadow-xl`}
            >
              <metric.icon className="w-8 h-8 mb-3 opacity-80" />
              <p className="text-xs opacity-80 uppercase tracking-wider mb-2">{metric.label}</p>
              <p className="text-4xl font-black mb-1">{metric.value}</p>
              <p className="text-sm opacity-80">{metric.unit}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance & Efficiency Card */}
        <div className="p-6 rounded-3xl bg-white border-2 border-gray-200 shadow-xl">
          <h3 className="text-2xl font-black text-gray-900 mb-4">Performans & Verimlilik</h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Efficiency Gauge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">Yakıt Verimliliği</span>
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${obdData.efficiency || 0}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                />
              </div>
              <p className="mt-2 text-3xl font-black text-green-600">{obdData.efficiency?.toFixed(0) || '0'}%</p>
            </div>

            {/* DTC Codes */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">Arıza Kodları (DTC)</span>
                <AlertCircle className="w-5 h-5 text-gray-600" />
              </div>
              {obdData.dtcCodes && obdData.dtcCodes.length > 0 ? (
                <div className="space-y-2">
                  {obdData.dtcCodes.map((code, i) => (
                    <div key={i} className="px-3 py-2 bg-red-100 rounded-lg text-red-900 font-mono text-sm">
                      {code}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Arıza Yok</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
  };

  // ==================== Header ====================
  const Header = () => (
    <div className="h-16 px-6 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="flex items-center gap-4">
        {currentView !== 'main' && (
          <button
            onClick={() => setCurrentView('main')}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E30A17] flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold">TÜRK OTO AI</h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {mounted && (
        <div className="text-right">
          <p className="text-sm font-semibold">
            {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs text-gray-400">
            {currentTime.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
          </p>
        </div>
        )}

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );

  // ==================== Render ====================
  return (
    <div className="h-screen w-screen bg-gray-100 overflow-hidden flex flex-col">
      <Header />

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'main' && <MainDashboard key="main" />}
          {currentView === 'voice' && <VoiceView key="voice" />}
          {currentView === 'obd' && <OBDView key="obd" />}
          {currentView === 'navigation' && (
            <motion.div
              key="navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-hidden"
            >
              <NavigationMap />
            </motion.div>
          )}
          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-hidden"
            >
              <Settings />
            </motion.div>
          )}
          {currentView === 'vehicles' && (
            <motion.div
              key="vehicles"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-hidden"
            >
              <VehicleManager onVehicleChange={handleVehicleChange} />
            </motion.div>
          )}
          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-hidden"
            >
              <UserProfile />
            </motion.div>
          )}
          {currentView === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-hidden"
            >
              <SocialCommunity />
            </motion.div>
          )}
          {currentView === 'subscription' && (
            <motion.div
              key="subscription"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-hidden"
            >
              <PaymentSubscription />
            </motion.div>
          )}
          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-hidden"
            >
              <AdminPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dashboard Onboarding */}
      {showOnboarding && (
        <Onboarding
          type="dashboard"
          onComplete={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}

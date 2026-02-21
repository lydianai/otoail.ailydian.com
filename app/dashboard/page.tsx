'use client';

// ============================================
// TÜRK OTO AI - Tesla-Style Dashboard
// ZERO REFRESH - Optimized Version
// ============================================

import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Gauge, Navigation, Radio, Settings as SettingsIcon, Battery, Thermometer,
  Fuel, Activity, Clock, TrendingUp, MapPin, Menu, X, ChevronLeft,
  ChevronRight, Maximize2, Minimize2, AlertCircle, CheckCircle,
  User, Users, CreditCard, Shield, BatteryCharging, Zap
} from 'lucide-react';
import VoiceAssistant from '@/components/VoiceAssistant';
import OBDConnection from '@/components/OBDConnection';
import NavigationMap from '@/components/NavigationMap';
import TeslaLiveMapV2 from '@/components/TeslaLiveMapV2';
import TeslaLiveMapUltra from '@/components/TeslaLiveMapUltra';
import VehicleManager from '@/components/VehicleManager';
import UserProfile from '@/components/UserProfile';
import SocialCommunity from '@/components/SocialCommunity';
import PaymentSubscription from '@/components/PaymentSubscription';
import AdminPanel from '@/components/AdminPanel';
import Settings from '@/components/Settings';
import VoiceAssistantPanelReal from '@/components/dashboard/VoiceAssistantPanelReal';
import NavigationPanel from '@/components/dashboard/NavigationPanel';
import OBDDataPanelReal from '@/components/dashboard/OBDDataPanelReal';
import ProfilePanel from '@/components/dashboard/ProfilePanel';
import CommunityPanel from '@/components/dashboard/CommunityPanel';
import SubscriptionPanel from '@/components/dashboard/SubscriptionPanel';
import AdminPanelNew from '@/components/dashboard/AdminPanel';
import SettingsPanel from '@/components/dashboard/SettingsPanel';
import DashboardMainReal from '@/components/dashboard/DashboardMainReal';
import RealTimeAlerts from '@/components/dashboard/RealTimeAlerts';
import RealModePanel from '@/components/dashboard/RealModePanel';
import EVChargingStations from '@/components/dashboard/EVChargingStations';
import DiagnosticsPanel from '@/components/dashboard/DiagnosticsPanel';
import PremiumDashboard from '@/components/dashboard/PremiumDashboard';
import EVAlarmsPanel from '@/components/dashboard/EVAlarmsPanel';
import BatteryPanel from '@/components/dashboard/BatteryPanel';
import Logo from '@/components/Logo';
import type { OBDData, Vehicle } from '@/types';

// ==================== Types ====================
type DashboardView = 'main' | 'obd' | 'navigation' | 'voice' | 'settings' | 'vehicles' | 'profile' | 'community' | 'subscription' | 'admin' | 'realmode' | 'charging' | 'diagnostics' | 'ev-alarms' | 'battery';

// ==================== Helper Functions (OUTSIDE component) ====================
const generateStaticMockData = (): Partial<OBDData> => {
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

// Create demo vehicle ONCE outside component
const DEMO_VEHICLE: Vehicle = {
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
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

// ==================== Memoized Sub-Components ====================
const TimeDisplay = memo(({ time }: { time: string }) => (
  <div className="text-right">
    <p className="text-sm font-semibold">{time}</p>
    <p className="text-xs text-gray-400">
      {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
    </p>
  </div>
));
TimeDisplay.displayName = 'TimeDisplay';

// ==================== Main Component ====================
export default function Dashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>('main');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeVehicle] = useState<Vehicle>(DEMO_VEHICLE); // Don't use setActiveVehicle to prevent re-renders
  const [mounted, setMounted] = useState(false);
  const [showLiveMap, setShowLiveMap] = useState(true);
  const [realMode, setRealMode] = useState(false); // Demo mode by default

  // Time as string to prevent Date object re-creation
  const [currentTimeString, setCurrentTimeString] = useState('');

  // OBD data state
  const [obdData, setObdData] = useState<Partial<OBDData>>(generateStaticMockData());

  // Refs for intervals
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const obdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mark component as mounted
  useEffect(() => {
    setMounted(true);
    setCurrentTimeString(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
  }, []);

  // Update time every second - isolated to prevent re-renders
  useEffect(() => {
    if (!mounted) return;

    timeIntervalRef.current = setInterval(() => {
      setCurrentTimeString(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    };
  }, [mounted]);

  // Update OBD data every 10 seconds - isolated
  useEffect(() => {
    if (!mounted) return;

    obdIntervalRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        setObdData(generateStaticMockData());
      }
    }, 10000);

    return () => {
      if (obdIntervalRef.current) clearInterval(obdIntervalRef.current);
    };
  }, [mounted]);

  // Handle OBD data updates - memoized
  const handleOBDDataUpdate = useCallback((data: Partial<OBDData>) => {
    setObdData(prevData => ({ ...prevData, ...data }));
  }, []);

  // Handle vehicle change - memoized
  const handleVehicleChange = useCallback((_vehicle: Vehicle) => {
    // Prevent state update that causes re-render
    // If needed, implement without triggering render
  }, []);

  // Fullscreen toggle - memoized
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // ==================== Main Dashboard View (Memoized) ====================
  const MainDashboard = useMemo(() => {
    if (!mounted) {
      return (
        <div className="h-full grid grid-cols-12 gap-4 p-6">
          <div className="col-span-12 flex items-center justify-center h-full">
            <div className="text-gray-500">Yükleniyor...</div>
          </div>
        </div>
      );
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
                  <h3 className="text-2xl font-bold">{activeVehicle.make} {activeVehicle.model}</h3>
                  <p className="text-sm text-gray-400">{activeVehicle.year} • {activeVehicle.licensePlate}</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('vehicles')}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stats - Static data */}
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
              { icon: Battery, label: 'Akü Optimizasyonu', view: 'battery' as DashboardView, color: '#10b981', gradient: true },
              { icon: Radio, label: 'Sesli Asistan', view: 'voice' as DashboardView, color: '#E30A17' },
              { icon: Navigation, label: 'Navigasyon', view: 'navigation' as DashboardView, color: '#2563eb' },
              { icon: BatteryCharging, label: 'Şarj İstasyonları', view: 'charging' as DashboardView, color: '#10b981' },
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
                className={`p-6 rounded-2xl ${
                  action.gradient
                    ? 'bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 hover:border-green-400 shadow-lg shadow-green-100/50 hover:shadow-xl hover:shadow-green-200/50'
                    : 'bg-white border-2 border-gray-200 hover:border-[#E30A17] shadow-lg hover:shadow-xl'
                } transition-all group relative overflow-hidden`}
              >
                {action.gradient && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl -mr-10 -mt-10" />
                )}
                <action.icon
                  className={`w-8 h-8 ${action.gradient ? 'text-green-600' : 'text-gray-600 group-hover:text-[#E30A17]'} transition-colors mb-2 relative z-10`}
                  style={{ color: action.gradient ? undefined : action.color }}
                />
                <p className={`text-sm font-semibold ${action.gradient ? 'text-green-900' : 'text-gray-900'} relative z-10`}>{action.label}</p>
                {action.gradient && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
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

                    <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full w-full" style={{ backgroundColor: metric.color }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }, [mounted, activeVehicle, showLiveMap, obdData]);

  // ==================== Header (Memoized) ====================
  const Header = useMemo(() => (
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
        <Logo size="sm" />
      </div>

      {/* Quick Access Demo Buttons - Center */}
      <div className="hidden md:flex items-center gap-2">
        <a
          href="/tesla-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#E30A17] transition-all min-h-[40px]"
        >
          <Zap className="w-4 h-4 text-[#E30A17]" />
          <span className="text-sm font-semibold">Tesla Demo</span>
        </a>
        <a
          href="/adas-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-400 transition-all min-h-[40px]"
        >
          <Activity className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold">ADAS Demo</span>
        </a>
        <a
          href="/sesli-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-emerald-400 transition-all min-h-[40px]"
        >
          <Radio className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold">Sesli Demo</span>
        </a>
        <a
          href="/tesla-pro"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E30A17] to-red-600 hover:from-red-600 hover:to-[#E30A17] border border-red-400/50 transition-all min-h-[40px] shadow-lg shadow-red-500/30"
        >
          <BatteryCharging className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold">Tesla Pro</span>
        </a>
      </div>

      <div className="flex items-center gap-6">
        <TimeDisplay time={currentTimeString} />
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  ), [currentView, currentTimeString, isFullscreen, toggleFullscreen, realMode]);

  // ==================== Render ====================
  return (
    <div className="h-screen w-screen bg-gray-100 overflow-hidden flex flex-col">
      {currentView !== 'main' && Header}

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'main' && (
            <div key="main" className="h-full w-full">
              <PremiumDashboard onViewChange={(view: string) => setCurrentView(view as DashboardView)} />
            </div>
          )}
          {currentView === 'voice' && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <VoiceAssistantPanelReal />
            </motion.div>
          )}
          {currentView === 'obd' && (
            <motion.div
              key="obd"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <OBDDataPanelReal />
            </motion.div>
          )}
          {currentView === 'navigation' && (
            <motion.div
              key="navigation"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <NavigationPanel />
            </motion.div>
          )}
          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <SettingsPanel />
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <ProfilePanel />
            </motion.div>
          )}
          {currentView === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <CommunityPanel />
            </motion.div>
          )}
          {currentView === 'subscription' && (
            <motion.div
              key="subscription"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <SubscriptionPanel />
            </motion.div>
          )}
          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <AdminPanelNew />
            </motion.div>
          )}
          {currentView === 'realmode' && (
            <motion.div
              key="realmode"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <RealModePanel
                vehicleId={activeVehicle.id}
                onClose={() => setCurrentView('main')}
              />
            </motion.div>
          )}
          {currentView === 'charging' && (
            <motion.div
              key="charging"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <EVChargingStations />
            </motion.div>
          )}
          {currentView === 'ev-alarms' && (
            <motion.div
              key="ev-alarms"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <EVAlarmsPanel />
            </motion.div>
          )}
          {currentView === 'battery' && (
            <motion.div
              key="battery"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <BatteryPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Real-time alerts overlay */}
      <RealTimeAlerts />
    </div>
  );
}

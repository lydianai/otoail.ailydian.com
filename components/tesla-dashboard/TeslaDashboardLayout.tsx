'use client';

/**
 * TESLA MODEL 3 INSPIRED DASHBOARD LAYOUT
 * ========================================
 *
 * Split-screen design:
 * - Left 40%: 3D Vehicle Visualization + Status
 * - Right 60%: Multi-purpose panel (Nav, Media, Climate, Settings)
 * - Bottom: Quick Access Bar
 * - Top: Status Bar
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation, Radio, Wind, Settings, Zap, BarChart3,
  Phone, Calendar, Home, Lock, Unlock, Sun, Moon,
  Volume2, UserCircle2, Wifi, Battery, Signal
} from 'lucide-react';
import Logo from '@/components/Logo';

type PanelView = 'navigation' | 'media' | 'climate' | 'energy' | 'controls' | 'settings';

interface VehicleStatus {
  locked: boolean;
  doorsOpen: { fl: boolean; fr: boolean; rl: boolean; rr: boolean };
  trunkOpen: boolean;
  frunkOpen: boolean;
  windowsOpen: { fl: boolean; fr: boolean; rl: boolean; rr: boolean };
  chargePortOpen: boolean;
  charging: boolean;
  batteryLevel: number; // 0-100
  range: number; // km
  speed: number; // km/h
  odometer: number; // km
  tirePressure: { fl: number; fr: number; rl: number; rr: number }; // PSI
  climateOn: boolean;
  climateTemp: { driver: number; passenger: number }; // °C
  seatHeat: { driver: 0 | 1 | 2 | 3; passenger: 0 | 1 | 2 | 3 };
}

export default function TeslaDashboardLayout() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePanel, setActivePanel] = useState<PanelView>('navigation');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Mock vehicle status - will be replaced with real OBD/API data
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus>({
    locked: true,
    doorsOpen: { fl: false, fr: false, rl: false, rr: false },
    trunkOpen: false,
    frunkOpen: false,
    windowsOpen: { fl: false, fr: false, rl: false, rr: false },
    chargePortOpen: false,
    charging: false,
    batteryLevel: 85,
    range: 420,
    speed: 0,
    odometer: 12450,
    tirePressure: { fl: 35, fr: 35, rl: 33, rr: 34 },
    climateOn: false,
    climateTemp: { driver: 22, passenger: 22 },
    seatHeat: { driver: 0, passenger: 0 },
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigationPanels = [
    { id: 'navigation', icon: Navigation, label: 'Navigasyon', color: 'blue' },
    { id: 'media', icon: Radio, label: 'Medya', color: 'purple' },
    { id: 'climate', icon: Wind, label: 'İklim', color: 'cyan' },
    { id: 'energy', icon: Zap, label: 'Enerji', color: 'green' },
    { id: 'controls', icon: Home, label: 'Kontroller', color: 'orange' },
    { id: 'settings', icon: Settings, label: 'Ayarlar', color: 'gray' },
  ] as const;

  return (
    <div className={`h-screen w-screen ${isDarkMode ? 'bg-black' : 'bg-white'} overflow-hidden`}>
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/95 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: Logo & Time & Date */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10">
              <Logo size="sm" />
              <Zap className="w-5 h-5 text-[#E30A17]" />
            </div>
            <div className="text-white text-lg font-bold">
              {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-white/60 text-sm hidden md:block">
              {currentTime.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>

          {/* Center: Vehicle Name */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="text-white font-black text-lg">TOGG T10X</div>
            <div className="text-white/60 text-sm">34 AI 2024</div>
          </div>

          {/* Right: Connectivity & Profile */}
          <div className="flex items-center gap-4">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <Signal className="w-4 h-4 text-blue-400" />
            <Battery className="w-5 h-5 text-emerald-400" />
            <div className="text-white text-sm">{vehicleStatus.batteryLevel}%</div>
            <UserCircle2 className="w-6 h-6 text-white/80 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="pt-12 pb-20 h-full flex">
        {/* LEFT PANEL: Vehicle Visualization (40%) */}
        <motion.div
          className="w-[40%] border-r border-white/10 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 overflow-auto"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full flex flex-col">
            {/* Vehicle 3D View Placeholder */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative w-full max-w-md">
                {/* Car Silhouette */}
                <svg viewBox="0 0 400 600" className="w-full h-auto drop-shadow-2xl">
                  <defs>
                    <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#E30A17', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#8B0510', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>

                  {/* Car body - Top view */}
                  <path
                    d="M 200 50
                       L 280 120 L 290 150 L 295 300 L 290 450 L 280 480 L 200 550
                       L 120 480 L 110 450 L 105 300 L 110 150 L 120 120 Z"
                    fill="url(#carGradient)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />

                  {/* Doors */}
                  <g id="doors">
                    {/* Front Left Door */}
                    <rect
                      x="115"
                      y="180"
                      width="35"
                      height="100"
                      rx="3"
                      fill={vehicleStatus.doorsOpen.fl ? '#EF4444' : 'rgba(255,255,255,0.1)'}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    {/* Front Right Door */}
                    <rect
                      x="250"
                      y="180"
                      width="35"
                      height="100"
                      rx="3"
                      fill={vehicleStatus.doorsOpen.fr ? '#EF4444' : 'rgba(255,255,255,0.1)'}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    {/* Rear Left Door */}
                    <rect
                      x="115"
                      y="320"
                      width="35"
                      height="100"
                      rx="3"
                      fill={vehicleStatus.doorsOpen.rl ? '#EF4444' : 'rgba(255,255,255,0.1)'}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                    {/* Rear Right Door */}
                    <rect
                      x="250"
                      y="320"
                      width="35"
                      height="100"
                      rx="3"
                      fill={vehicleStatus.doorsOpen.rr ? '#EF4444' : 'rgba(255,255,255,0.1)'}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                  </g>

                  {/* Trunk */}
                  <rect
                    x="170"
                    y="480"
                    width="60"
                    height="50"
                    rx="5"
                    fill={vehicleStatus.trunkOpen ? '#EF4444' : 'rgba(255,255,255,0.1)'}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />

                  {/* Frunk */}
                  <rect
                    x="170"
                    y="70"
                    width="60"
                    height="50"
                    rx="5"
                    fill={vehicleStatus.frunkOpen ? '#EF4444' : 'rgba(255,255,255,0.1)'}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />

                  {/* Wheels */}
                  <g id="wheels">
                    <circle cx="140" cy="160" r="18" fill="#1A1A1A" stroke="#888" strokeWidth="3" />
                    <circle cx="260" cy="160" r="18" fill="#1A1A1A" stroke="#888" strokeWidth="3" />
                    <circle cx="140" cy="440" r="18" fill="#1A1A1A" stroke="#888" strokeWidth="3" />
                    <circle cx="260" cy="440" r="18" fill="#1A1A1A" stroke="#888" strokeWidth="3" />
                  </g>

                  {/* Lock Status Indicator */}
                  <g transform="translate(200, 300)">
                    {vehicleStatus.locked ? (
                      <Lock className="w-8 h-8 text-emerald-400" x="-16" y="-16" />
                    ) : (
                      <Unlock className="w-8 h-8 text-orange-400" x="-16" y="-16" />
                    )}
                  </g>
                </svg>

                {/* Tire Pressure Indicators */}
                <div className="absolute top-28 left-8 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                  {vehicleStatus.tirePressure.fl} PSI
                </div>
                <div className="absolute top-28 right-8 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                  {vehicleStatus.tirePressure.fr} PSI
                </div>
                <div className="absolute bottom-32 left-8 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                  {vehicleStatus.tirePressure.rl} PSI
                </div>
                <div className="absolute bottom-32 right-8 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                  {vehicleStatus.tirePressure.rr} PSI
                </div>
              </div>
            </div>

            {/* Vehicle Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                <div className="text-white/60 text-xs mb-1">Batarya</div>
                <div className="text-white text-xl font-black">{vehicleStatus.batteryLevel}%</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                <div className="text-white/60 text-xs mb-1">Menzil</div>
                <div className="text-white text-xl font-black">{vehicleStatus.range} km</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                <div className="text-white/60 text-xs mb-1">Toplam KM</div>
                <div className="text-white text-xl font-black">{vehicleStatus.odometer.toLocaleString()}</div>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setVehicleStatus(prev => ({ ...prev, locked: !prev.locked }))}
                className={`p-4 rounded-xl border transition-all ${
                  vehicleStatus.locked
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {vehicleStatus.locked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  <span className="font-bold">{vehicleStatus.locked ? 'Kilitli' : 'Açık'}</span>
                </div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setVehicleStatus(prev => ({ ...prev, climateOn: !prev.climateOn }))}
                className={`p-4 rounded-xl border transition-all ${
                  vehicleStatus.climateOn
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5" />
                  <span className="font-bold">{vehicleStatus.climateOn ? 'İklim Açık' : 'İklim Kapalı'}</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANEL: Multi-Purpose Panel (60%) */}
        <motion.div
          className="w-[60%] bg-gradient-to-br from-gray-900 via-gray-950 to-black p-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Panel Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {navigationPanels.map((panel) => {
              const Icon = panel.icon;
              const isActive = activePanel === panel.id;

              return (
                <motion.button
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id as PanelView)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#E30A17] border-[#E30A17] text-white shadow-lg shadow-red-500/50'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{panel.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Panel Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-[calc(100%-60px)] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              {/* Placeholder content - will be replaced with actual panels */}
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white/60 text-lg mb-2">
                    {navigationPanels.find(p => p.id === activePanel)?.label} Paneli
                  </div>
                  <div className="text-white/40 text-sm">
                    Bu panel yakında geliştirilecek...
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Quick Access Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/95 backdrop-blur-xl border-t border-white/10 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Climate Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-orange-400" />
              <div className="text-white text-lg font-bold">{vehicleStatus.climateTemp.driver}°C</div>
            </div>

            <div className="w-px h-8 bg-white/10" />

            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <motion.button
                  key={level}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setVehicleStatus(prev => ({
                    ...prev,
                    seatHeat: { ...prev.seatHeat, driver: level as 1 | 2 | 3 }
                  }))}
                  className={`w-8 h-8 rounded-lg border transition-all ${
                    vehicleStatus.seatHeat.driver >= level
                      ? 'bg-orange-500/30 border-orange-500 text-orange-400'
                      : 'bg-white/5 border-white/10 text-white/40'
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-white/60" />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-32 accent-[#E30A17]"
            />
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

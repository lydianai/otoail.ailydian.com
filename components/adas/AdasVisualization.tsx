'use client';

/**
 * ADAS VISUALIZATION - TESLA AUTOPILOT STYLE
 * ===========================================
 *
 * Advanced Driver Assistance Systems görselleştirmesi:
 * - Perspektif yol görünümü
 * - Yol şeridi tespiti
 * - Çevredeki araçlar (önde, arkada, yanlarda)
 * - Mesafe göstergeleri
 * - Trafik işaretleri (hız limiti, dur, dikkat)
 * - Çarpışma uyarıları
 * - Kör nokta algılama
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, Eye, Navigation2, Gauge,
  Triangle, Octagon, AlertCircle, Car
} from 'lucide-react';

interface DetectedVehicle {
  id: string;
  type: 'car' | 'truck' | 'motorcycle' | 'bus';
  position: 'front' | 'front-left' | 'front-right' | 'rear' | 'rear-left' | 'rear-right' | 'left' | 'right';
  distance: number; // meters
  relativeSpeed: number; // km/h (+ approaching, - moving away)
  collisionRisk: 'none' | 'low' | 'medium' | 'high';
  lane: 'current' | 'left' | 'right';
}

interface LaneMarking {
  id: string;
  side: 'left' | 'right' | 'center';
  type: 'solid' | 'dashed' | 'double';
  detected: boolean;
  confidence: number; // 0-100
}

interface TrafficSign {
  id: string;
  type: 'speed-limit' | 'stop' | 'yield' | 'warning' | 'no-entry' | 'school';
  value?: string; // e.g., "50" for speed limit
  distance: number; // meters
  confidence: number; // 0-100
}

interface AdasData {
  enabled: boolean;
  speed: number; // km/h
  speedLimit?: number; // km/h
  vehicles: DetectedVehicle[];
  laneMarkings: LaneMarking[];
  trafficSigns: TrafficSign[];
  safeDistance: number; // meters
  blindSpot: {
    left: boolean;
    right: boolean;
  };
  warnings: {
    collisionWarning: boolean;
    laneDepartureWarning: boolean;
    blindSpotWarning: boolean;
    speedLimitExceeded: boolean;
  };
}

export default function AdasVisualization() {
  // Simulated ADAS data - will be replaced with real camera/sensor data
  const [adasData, setAdasData] = useState<AdasData>({
    enabled: true,
    speed: 65,
    speedLimit: 50,
    vehicles: [
      {
        id: 'v1',
        type: 'car',
        position: 'front',
        distance: 45,
        relativeSpeed: -5,
        collisionRisk: 'low',
        lane: 'current'
      },
      {
        id: 'v2',
        type: 'truck',
        position: 'front-right',
        distance: 80,
        relativeSpeed: 0,
        collisionRisk: 'none',
        lane: 'right'
      },
      {
        id: 'v3',
        type: 'car',
        position: 'left',
        distance: 5,
        relativeSpeed: 10,
        collisionRisk: 'medium',
        lane: 'left'
      }
    ],
    laneMarkings: [
      { id: 'l1', side: 'left', type: 'dashed', detected: true, confidence: 95 },
      { id: 'l2', side: 'right', type: 'dashed', detected: true, confidence: 92 },
      { id: 'l3', side: 'center', type: 'dashed', detected: true, confidence: 88 }
    ],
    trafficSigns: [
      { id: 's1', type: 'speed-limit', value: '50', distance: 120, confidence: 98 }
    ],
    safeDistance: 30,
    blindSpot: {
      left: true,
      right: false
    },
    warnings: {
      collisionWarning: false,
      laneDepartureWarning: false,
      blindSpotWarning: true,
      speedLimitExceeded: true
    }
  });

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAdasData(prev => ({
        ...prev,
        vehicles: prev.vehicles.map(v => ({
          ...v,
          distance: Math.max(5, v.distance + (Math.random() - 0.5) * 2),
          relativeSpeed: v.relativeSpeed + (Math.random() - 0.5) * 2,
          collisionRisk: v.distance < 20 ? 'high' : v.distance < 40 ? 'medium' : 'low'
        })),
        speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 1),
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: DetectedVehicle['collisionRisk']) => {
    switch (risk) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getVehicleIcon = (type: DetectedVehicle['type']) => {
    switch (type) {
      case 'truck': return '🚛';
      case 'motorcycle': return '🏍️';
      case 'bus': return '🚌';
      default: return '🚗';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20">
        <div className="flex items-center justify-between">
          {/* ADAS Status */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-emerald-400"
            />
            <span className="text-white font-bold">ADAS Aktif</span>
            <Eye className="w-5 h-5 text-emerald-400" />
          </div>

          {/* Speed & Limit */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-white/60 text-xs mb-1">Hızınız</div>
              <div className={`text-3xl font-black ${
                adasData.speedLimit && adasData.speed > adasData.speedLimit
                  ? 'text-red-500'
                  : 'text-white'
              }`}>
                {Math.round(adasData.speed)}
              </div>
              <div className="text-white/60 text-xs">km/s</div>
            </div>

            {adasData.speedLimit && (
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-red-500 bg-white flex items-center justify-center">
                  <span className="text-black text-2xl font-black">{adasData.speedLimit}</span>
                </div>
                {adasData.warnings.speedLimitExceeded && (
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500"
                  />
                )}
              </div>
            )}
          </div>

          {/* Warnings */}
          <div className="flex items-center gap-2">
            {adasData.warnings.collisionWarning && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="p-2 rounded-lg bg-red-500/20 border border-red-500"
              >
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </motion.div>
            )}
            {adasData.warnings.blindSpotWarning && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="p-2 rounded-lg bg-orange-500/20 border border-orange-500"
              >
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main ADAS Visualization */}
      <svg viewBox="0 0 1200 800" className="w-full h-full">
        <defs>
          {/* Road gradient */}
          <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1F2937', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#111827', stopOpacity: 0.9 }} />
          </linearGradient>

          {/* Lane line gradient */}
          <linearGradient id="laneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.8 }} />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Perspective Road */}
        <motion.path
          d="M 300 200 L 200 800 L 1000 800 L 900 200 Z"
          fill="url(#roadGradient)"
          opacity={0.6}
        />

        {/* Grid lines (for depth perception) */}
        {[100, 200, 300, 400, 500, 600].map((y, i) => (
          <motion.line
            key={`grid-${i}`}
            x1={300 + (y / 800) * 600}
            y1={200 + y}
            x2={900 - (y / 800) * 600}
            y2={200 + y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}

        {/* Lane Markings */}
        {adasData.laneMarkings.map((lane, idx) => {
          const xPositions = {
            left: 350,
            center: 600,
            right: 850
          };

          const x = xPositions[lane.side];
          const segments = 20;

          return (
            <g key={lane.id}>
              {Array.from({ length: segments }).map((_, i) => {
                const y1 = 200 + (i * 600 / segments);
                const y2 = 200 + ((i + 0.5) * 600 / segments);
                const perspectiveFactor = 1 - (i / segments) * 0.4;

                return (
                  <motion.line
                    key={`${lane.id}-${i}`}
                    x1={600 + (x - 600) * perspectiveFactor}
                    y1={y1}
                    x2={600 + (x - 600) * perspectiveFactor}
                    y2={y2}
                    stroke={lane.detected ? '#10B981' : '#6B7280'}
                    strokeWidth={lane.type === 'solid' ? 4 : 3}
                    strokeDasharray={lane.type === 'solid' ? '0' : '20,20'}
                    opacity={0.8}
                    filter="url(#glow)"
                    animate={{
                      y: [0, 30, 0],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.05
                    }}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Detected Vehicles */}
        {adasData.vehicles.map(vehicle => {
          const positions = {
            'front': { x: 600, y: 300 - (vehicle.distance * 2) },
            'front-left': { x: 450, y: 300 - (vehicle.distance * 2) },
            'front-right': { x: 750, y: 300 - (vehicle.distance * 2) },
            'left': { x: 350, y: 500 },
            'right': { x: 850, y: 500 },
            'rear': { x: 600, y: 700 },
            'rear-left': { x: 450, y: 700 },
            'rear-right': { x: 750, y: 700 }
          };

          const pos = positions[vehicle.position];
          const size = vehicle.type === 'truck' ? 60 : vehicle.type === 'motorcycle' ? 30 : 40;

          return (
            <g key={vehicle.id}>
              {/* Vehicle bounding box */}
              <motion.rect
                x={pos.x - size/2}
                y={pos.y - size/2}
                width={size}
                height={size}
                fill="rgba(0,0,0,0.3)"
                stroke={getRiskColor(vehicle.collisionRisk)}
                strokeWidth="3"
                rx="5"
                animate={{
                  strokeOpacity: vehicle.collisionRisk === 'high' ? [0.5, 1, 0.5] : 1
                }}
                transition={{
                  duration: 0.5,
                  repeat: vehicle.collisionRisk === 'high' ? Infinity : 0
                }}
              />

              {/* Vehicle icon */}
              <text
                x={pos.x}
                y={pos.y + 8}
                fontSize="24"
                textAnchor="middle"
              >
                {getVehicleIcon(vehicle.type)}
              </text>

              {/* Distance label */}
              <motion.text
                x={pos.x}
                y={pos.y - size/2 - 10}
                fontSize="14"
                fill={getRiskColor(vehicle.collisionRisk)}
                textAnchor="middle"
                fontWeight="bold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {Math.round(vehicle.distance)}m
              </motion.text>

              {/* Relative speed indicator */}
              {vehicle.relativeSpeed !== 0 && (
                <motion.text
                  x={pos.x}
                  y={pos.y + size/2 + 20}
                  fontSize="12"
                  fill="#FFFFFF"
                  textAnchor="middle"
                  opacity={0.7}
                >
                  {vehicle.relativeSpeed > 0 ? '↑' : '↓'} {Math.abs(Math.round(vehicle.relativeSpeed))} km/h
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Ego Vehicle (Your Car) */}
        <g transform="translate(600, 650)">
          {/* Car body */}
          <motion.rect
            x="-40"
            y="-60"
            width="80"
            height="120"
            fill="url(#carGradient)"
            stroke="#E30A17"
            strokeWidth="3"
            rx="8"
            filter="url(#glow)"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <defs>
            <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#E30A17', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#8B0510', stopOpacity: 0.9 }} />
            </linearGradient>
          </defs>

          {/* Windshield */}
          <rect x="-30" y="-40" width="60" height="40" fill="rgba(100,150,200,0.3)" rx="4" />

          {/* Headlights */}
          <circle cx="-25" cy="-55" r="4" fill="#FFFACD" filter="url(#glow)" />
          <circle cx="25" cy="-55" r="4" fill="#FFFACD" filter="url(#glow)" />

          {/* Direction indicator */}
          <motion.path
            d="M 0 -90 L -10 -70 L 10 -70 Z"
            fill="#10B981"
            animate={{
              y: [-10, -5, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </g>

        {/* Safe Distance Arc */}
        <motion.path
          d={`M 450 650 Q 600 ${650 - adasData.safeDistance * 4} 750 650`}
          fill="none"
          stroke={adasData.vehicles.some(v => v.distance < adasData.safeDistance && v.position.includes('front'))
            ? '#EF4444'
            : '#10B981'}
          strokeWidth="2"
          strokeDasharray="10,10"
          opacity={0.5}
          animate={{
            strokeDashoffset: [0, 20]
          }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Blind Spot Indicators */}
      <AnimatePresence>
        {adasData.blindSpot.left && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="p-4 rounded-xl bg-orange-500/20 border-2 border-orange-500 backdrop-blur-sm"
            >
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div className="text-orange-500 text-xs font-bold mt-1">KÖR NOKTA</div>
              <div className="text-orange-500 text-xs">SOL</div>
            </motion.div>
          </motion.div>
        )}

        {adasData.blindSpot.right && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="p-4 rounded-xl bg-orange-500/20 border-2 border-orange-500 backdrop-blur-sm"
            >
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div className="text-orange-500 text-xs font-bold mt-1">KÖR NOKTA</div>
              <div className="text-orange-500 text-xs">SAĞ</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-20">
        <div className="grid grid-cols-4 gap-3">
          {/* Detected Vehicles Count */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Car className="w-4 h-4 text-blue-400" />
              <span className="text-white/60 text-xs">Tespit Edilen</span>
            </div>
            <div className="text-white text-2xl font-black">{adasData.vehicles.length}</div>
          </div>

          {/* Lane Detection Status */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Navigation2 className="w-4 h-4 text-emerald-400" />
              <span className="text-white/60 text-xs">Şerit Tespiti</span>
            </div>
            <div className="text-emerald-400 text-lg font-black">
              {adasData.laneMarkings.filter(l => l.detected).length}/{adasData.laneMarkings.length}
            </div>
          </div>

          {/* Safe Distance */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span className="text-white/60 text-xs">Güvenli Mesafe</span>
            </div>
            <div className="text-cyan-400 text-2xl font-black">{adasData.safeDistance}m</div>
          </div>

          {/* Traffic Signs */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Octagon className="w-4 h-4 text-red-400" />
              <span className="text-white/60 text-xs">Trafik İşaretleri</span>
            </div>
            <div className="text-red-400 text-2xl font-black">{adasData.trafficSigns.length}</div>
          </div>
        </div>

        {/* Traffic Signs Details */}
        {adasData.trafficSigns.length > 0 && (
          <div className="mt-3 flex gap-2">
            {adasData.trafficSigns.map(sign => (
              <motion.div
                key={sign.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="text-white text-xs mb-1">
                  {sign.type === 'speed-limit' && 'Hız Limiti'}
                  {sign.type === 'stop' && 'DUR'}
                  {sign.type === 'yield' && 'YOL VER'}
                </div>
                <div className="text-white text-lg font-black">{sign.value}</div>
                <div className="text-white/60 text-xs">{Math.round(sign.distance)}m</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

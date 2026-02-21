'use client';

// ============================================
// TÜRK OTO AI - Ultra Tesla-Style Live Map
// Real 3D vehicle with road-aligned perspective
// ============================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation2, MapPin, Zap, TrendingUp, AlertTriangle,
  Gauge, Fuel, Cloud, Wind, Droplets, Sun, Wifi, Target,
  Compass, Activity, Battery, Thermometer, ChevronDown,
  ChevronUp, Layers, Navigation as NavIcon
} from 'lucide-react';

interface TeslaLiveMapUltraProps {
  className?: string;
  onLocationUpdate?: (location: GeolocationCoordinates) => void;
}

interface TrafficSegment {
  id: string;
  type: 'heavy' | 'moderate' | 'light' | 'free';
  lat: number;
  lng: number;
  length: number;
  angle: number;
  speed?: number;
  animationOffset: number;
}

interface WeatherData {
  temp: number;
  condition: 'clear' | 'cloudy' | 'rain';
  windSpeed: number;
  humidity: number;
}

interface ServiceStation {
  id: string;
  type: 'fuel' | 'service' | 'charging' | 'parking';
  name: string;
  distance: number;
  lat: number;
  lng: number;
  price?: number;
}

interface RoadLane {
  id: string;
  points: { x: number; y: number }[];
  type: 'current' | 'adjacent';
}

export default function TeslaLiveMapUltra({ className, onLocationUpdate }: TeslaLiveMapUltraProps) {
  // Core GPS & Navigation State
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
  const [heading, setHeading] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isTracking, setIsTracking] = useState(true);
  const [mapZoom, setMapZoom] = useState(16);

  // Advanced Features
  const [trafficSegments, setTrafficSegments] = useState<TrafficSegment[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [serviceStations, setServiceStations] = useState<ServiceStation[]>([]);
  const [roadLanes, setRoadLanes] = useState<RoadLane[]>([]);

  // UI State
  const [showWeatherPanel, setShowWeatherPanel] = useState(false);
  const [showServicesPanel, setShowServicesPanel] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);
  const [show3DView, setShow3DView] = useState(true);

  // Animation
  const [pulseScale, setPulseScale] = useState(1);

  // Refs
  const watchIdRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize GPS tracking
  useEffect(() => {
    if (!isTracking || typeof window === 'undefined') return;

    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { coords } = position;
        setCurrentLocation(coords);
        setSpeed(coords.speed || 0);
        setHeading(coords.heading || 0);

        if (onLocationUpdate) {
          onLocationUpdate(coords);
        }

        generateTrafficSegments(coords.latitude, coords.longitude);
        generateWeatherData(coords.latitude, coords.longitude);
        generateServiceStations(coords.latitude, coords.longitude);
        generateRoadLanes();
      },
      (error) => {
        console.error('Geolocation error:', error);
        const fallbackCoords = {
          latitude: 41.0082,
          longitude: 28.9784,
          altitude: null,
          accuracy: 10,
          altitudeAccuracy: null,
          heading: 45,
          speed: 20,
        } as GeolocationCoordinates;
        setCurrentLocation(fallbackCoords);
        generateTrafficSegments(fallbackCoords.latitude, fallbackCoords.longitude);
        generateWeatherData(fallbackCoords.latitude, fallbackCoords.longitude);
        generateServiceStations(fallbackCoords.latitude, fallbackCoords.longitude);
        generateRoadLanes();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isTracking, onLocationUpdate]);

  // Pulse animation
  useEffect(() => {
    const animate = () => {
      setPulseScale(prev => {
        const next = prev + 0.02;
        return next > 1.5 ? 1 : next;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Generate road lanes for 3D effect
  const generateRoadLanes = useCallback(() => {
    const lanes: RoadLane[] = [];

    // Current lane (center)
    const currentLane: RoadLane = {
      id: 'current',
      type: 'current',
      points: []
    };

    for (let i = 0; i < 20; i++) {
      currentLane.points.push({
        x: 400,
        y: 100 + i * 30
      });
    }

    lanes.push(currentLane);

    // Left adjacent lane
    const leftLane: RoadLane = {
      id: 'left',
      type: 'adjacent',
      points: []
    };

    for (let i = 0; i < 20; i++) {
      const perspectiveFactor = 1 - (i * 0.03);
      leftLane.points.push({
        x: 400 - 80 * perspectiveFactor,
        y: 100 + i * 30
      });
    }

    lanes.push(leftLane);

    // Right adjacent lane
    const rightLane: RoadLane = {
      id: 'right',
      type: 'adjacent',
      points: []
    };

    for (let i = 0; i < 20; i++) {
      const perspectiveFactor = 1 - (i * 0.03);
      rightLane.points.push({
        x: 400 + 80 * perspectiveFactor,
        y: 100 + i * 30
      });
    }

    lanes.push(rightLane);

    setRoadLanes(lanes);
  }, []);

  // Generate realistic traffic segments
  const generateTrafficSegments = useCallback((lat: number, lng: number) => {
    const segments: TrafficSegment[] = [];
    const trafficTypes: TrafficSegment['type'][] = ['free', 'light', 'moderate', 'heavy'];

    for (let i = 0; i < 40; i++) {
      const angle = (i * 9) + Math.random() * 8;
      const distance = 0.001 + Math.random() * 0.02;
      const type = trafficTypes[Math.floor(Math.random() * trafficTypes.length)];

      segments.push({
        id: `traffic-${i}`,
        type,
        lat: lat + distance * Math.cos(angle * Math.PI / 180),
        lng: lng + distance * Math.sin(angle * Math.PI / 180),
        length: 80 + Math.random() * 150,
        angle,
        speed: type === 'free' ? 90 : type === 'light' ? 60 : type === 'moderate' ? 35 : 15,
        animationOffset: Math.random() * 100,
      });
    }

    setTrafficSegments(segments);
  }, []);

  // Generate weather data
  const generateWeatherData = useCallback((lat: number, lng: number) => {
    const conditions: WeatherData['condition'][] = ['clear', 'cloudy', 'rain'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    setWeather({
      temp: Math.round(15 + Math.random() * 15),
      condition,
      windSpeed: Math.round(10 + Math.random() * 20),
      humidity: Math.round(40 + Math.random() * 40),
    });
  }, []);

  // Generate nearby service stations
  const generateServiceStations = useCallback((lat: number, lng: number) => {
    const stationTypes: ServiceStation['type'][] = ['fuel', 'service', 'charging', 'parking'];
    const stationNames = {
      fuel: ['Shell', 'BP', 'Opet', 'Total', 'Petrol Ofisi'],
      service: ['Bosch Service', 'Fiat Servis', 'Ford Servis', 'Toyota Plaza'],
      charging: ['Tesla Supercharger', 'Eşarj', 'Voltrun', 'ZES'],
      parking: ['Kapalı Otopark', 'Açık Park', 'Vale Park', 'AVM Otoparkı'],
    };

    const stations: ServiceStation[] = [];
    for (let i = 0; i < 12; i++) {
      const type = stationTypes[Math.floor(Math.random() * stationTypes.length)];
      const angle = Math.random() * 360;
      const distance = 0.5 + Math.random() * 4.5;

      stations.push({
        id: `station-${i}`,
        type,
        name: stationNames[type][Math.floor(Math.random() * stationNames[type].length)],
        distance: parseFloat(distance.toFixed(1)),
        lat: lat + (distance / 111) * Math.cos(angle * Math.PI / 180),
        lng: lng + (distance / 111) * Math.sin(angle * Math.PI / 180),
        price: type === 'fuel' ? parseFloat((35 + Math.random() * 5).toFixed(2)) : undefined,
      });
    }

    stations.sort((a, b) => a.distance - b.distance);
    setServiceStations(stations.slice(0, 8));
  }, []);

  // Get traffic color
  const getTrafficColor = (type: TrafficSegment['type']) => {
    switch (type) {
      case 'free': return '#10B981';
      case 'light': return '#F59E0B';
      case 'moderate': return '#EF4444';
      case 'heavy': return '#DC2626';
      default: return '#6B7280';
    }
  };

  // Convert lat/lng to screen coordinates with perspective
  const latLngToScreen = (lat: number, lng: number) => {
    if (!currentLocation) return { x: 0, y: 0 };

    const centerLat = currentLocation.latitude;
    const centerLng = currentLocation.longitude;

    const scale = 120000 / Math.pow(2, 16 - mapZoom);
    let x = (lng - centerLng) * scale + 400;
    let y = -(lat - centerLat) * scale + 350;

    // Apply 3D perspective if enabled
    if (show3DView) {
      const distanceFromCenter = Math.sqrt(Math.pow(x - 400, 2) + Math.pow(y - 350, 2));
      const perspective = 1 + (distanceFromCenter / 1000);
      y = 350 + (y - 350) / perspective;
    }

    return { x, y };
  };

  // Get weather icon
  const getWeatherIcon = () => {
    if (!weather) return Sun;
    switch (weather.condition) {
      case 'clear': return Sun;
      case 'cloudy': return Cloud;
      case 'rain': return Droplets;
      default: return Sun;
    }
  };

  if (!currentLocation) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-900 rounded-2xl`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-4"
          >
            <Compass className="w-20 h-20 text-[#E30A17]" />
          </motion.div>
          <p className="text-white font-bold text-lg">GPS Aktifleştiriliyor...</p>
          <p className="text-gray-400 text-sm mt-2">Yüksek doğruluk modu etkinleştiriliyor</p>
        </div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon();

  return (
    <div className={`${className} relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-black`}>
      {/* 3D Road Perspective Canvas */}
      <div className="absolute inset-0">
        {/* Animated Grid Background with 3D Effect */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 0%, #E30A17 1px, transparent 1px),
                radial-gradient(circle at 50% 100%, #E30A17 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0, 25px 25px',
            }}
            animate={{
              backgroundPositionY: ['0px', '50px'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Ultra Realistic 3D Road Surface with Environment */}
        {show3DView && (
          <svg className="absolute inset-0 w-full h-full" style={{ perspective: '1000px' }}>
            <defs>
              {/* Realistic asphalt texture gradient */}
              <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#2C3E50', stopOpacity: 0.5 }} />
                <stop offset="30%" style={{ stopColor: '#34495E', stopOpacity: 0.7 }} />
                <stop offset="60%" style={{ stopColor: '#2C3E50', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#1A252F', stopOpacity: 0.9 }} />
              </linearGradient>

              {/* Road edge gradient */}
              <linearGradient id="roadEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#95A5A6', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#7F8C8D', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: '#95A5A6', stopOpacity: 0.8 }} />
              </linearGradient>

              {/* Grass/environment gradient */}
              <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#27AE60', stopOpacity: 0.3 }} />
                <stop offset="50%" style={{ stopColor: '#229954', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#1E8449', stopOpacity: 0.5 }} />
              </linearGradient>

              {/* Realistic glow filters */}
              <filter id="glowStrong">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <filter id="laneGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Asphalt noise pattern for realism */}
              <pattern id="asphaltNoise" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="#2C3E50" opacity="0.1" />
                <circle cx="10" cy="10" r="1" fill="#1A1A1A" opacity="0.3" />
                <circle cx="30" cy="20" r="1.5" fill="#3A3A3A" opacity="0.2" />
                <circle cx="45" cy="35" r="1" fill="#1A1A1A" opacity="0.3" />
                <circle cx="15" cy="40" r="1" fill="#2A2A2A" opacity="0.25" />
              </pattern>
            </defs>

            {/* Environment - Grass on sides */}
            <motion.rect
              x="0"
              y="0"
              width="180"
              height="700"
              fill="url(#grassGradient)"
              opacity={0.6}
            />
            <motion.rect
              x="620"
              y="0"
              width="180"
              height="700"
              fill="url(#grassGradient)"
              opacity={0.6}
            />

            {/* Left road edge/shoulder */}
            <motion.path
              d="M 180 50 L 140 700"
              stroke="url(#roadEdge)"
              strokeWidth="12"
              opacity={0.8}
            />

            {/* Right road edge/shoulder */}
            <motion.path
              d="M 620 50 L 660 700"
              stroke="url(#roadEdge)"
              strokeWidth="12"
              opacity={0.8}
            />

            {/* Main realistic road surface with perspective */}
            <motion.path
              d={`M 192 80 L 140 700 L 660 700 L 608 80 Z`}
              fill="url(#roadAsphalt)"
              opacity={0.85}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 1 }}
            />

            {/* Asphalt texture overlay */}
            <motion.path
              d={`M 192 80 L 140 700 L 660 700 L 608 80 Z`}
              fill="url(#asphaltNoise)"
              opacity={0.4}
            />

            {/* Road center double yellow lines */}
            <g>
              <motion.path
                d="M 398 100 L 395 700"
                stroke="#F39C12"
                strokeWidth="3"
                opacity={0.9}
                strokeLinecap="round"
              />
              <motion.path
                d="M 402 100 L 405 700"
                stroke="#F39C12"
                strokeWidth="3"
                opacity={0.9}
                strokeLinecap="round"
              />
            </g>

            {/* Enhanced Lane markings with realistic glow */}
            {roadLanes.map((lane) => (
              <g key={lane.id}>
                {lane.points.map((point, i) => {
                  if (i === 0 || i % 2 === 0) {
                    const nextPoint = lane.points[i + 1];
                    if (!nextPoint) return null;

                    return (
                      <motion.line
                        key={`${lane.id}-${i}`}
                        x1={point.x}
                        y1={point.y}
                        x2={nextPoint.x}
                        y2={nextPoint.y}
                        stroke={lane.type === 'current' ? '#FFFFFF' : '#95A5A6'}
                        strokeWidth={lane.type === 'current' ? 4 : 3}
                        strokeDasharray={lane.type === 'current' ? '25,25' : '18,18'}
                        strokeLinecap="round"
                        opacity={0.85}
                        filter="url(#laneGlow)"
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: 1,
                          y: [0, 25, 0],
                          opacity: [0.85, 0.95, 0.85]
                        }}
                        transition={{
                          pathLength: { duration: 0.5, delay: i * 0.05 },
                          y: { duration: 2.5, repeat: Infinity, ease: 'linear' },
                          opacity: { duration: 2, repeat: Infinity }
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </g>
            ))}

            {/* Road reflections from headlights */}
            {speed > 10 && (
              <motion.ellipse
                cx="400"
                cy="300"
                rx="120"
                ry="80"
                fill="rgba(255,255,220,0.08)"
                animate={{
                  opacity: [0.08, 0.12, 0.08],
                  ry: [80, 90, 80]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Roadside markers/reflectors */}
            {[...Array(15)].map((_, i) => (
              <g key={`marker-${i}`}>
                {/* Left side reflectors */}
                <motion.rect
                  x="195"
                  y={100 + i * 40}
                  width="4"
                  height="8"
                  rx="1"
                  fill="#FFA500"
                  opacity={0.7}
                  animate={{
                    opacity: [0.7, 0.9, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
                {/* Right side reflectors */}
                <motion.rect
                  x="601"
                  y={100 + i * 40}
                  width="4"
                  height="8"
                  rx="1"
                  fill="#FFA500"
                  opacity={0.7}
                  animate={{
                    opacity: [0.7, 0.9, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
              </g>
            ))}
          </svg>
        )}

        {/* Traffic Segments with Animation */}
        {showTraffic && (
          <svg className="absolute inset-0 w-full h-full">
            {trafficSegments.map((segment) => {
              const pos = latLngToScreen(segment.lat, segment.lng);
              const endX = pos.x + segment.length * Math.cos(segment.angle * Math.PI / 180);
              const endY = pos.y + segment.length * Math.sin(segment.angle * Math.PI / 180);

              return (
                <motion.g key={segment.id}>
                  <motion.line
                    x1={pos.x}
                    y1={pos.y}
                    x2={endX}
                    y2={endY}
                    stroke={getTrafficColor(segment.type)}
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#glowStrong)"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{
                      opacity: [0.7, 0.9, 0.7],
                      pathLength: 1,
                    }}
                    transition={{
                      opacity: { duration: 2, repeat: Infinity, delay: segment.animationOffset / 100 },
                      pathLength: { duration: 1, delay: Math.random() * 0.5 }
                    }}
                  />
                  {/* Speed indicator dots */}
                  <motion.circle
                    cx={pos.x + segment.length * 0.3 * Math.cos(segment.angle * Math.PI / 180)}
                    cy={pos.y + segment.length * 0.3 * Math.sin(segment.angle * Math.PI / 180)}
                    r="3"
                    fill={getTrafficColor(segment.type)}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: segment.animationOffset / 50
                    }}
                  />
                </motion.g>
              );
            })}
          </svg>
        )}

        {/* Ultra Realistic 3D Vehicle (Center) - Road Aligned */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '55%' }}>
          <motion.div
            animate={{ rotate: heading }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Outer pulsing ring */}
            <motion.div
              className="absolute inset-0 w-40 h-40 -translate-x-8 -translate-y-8"
              style={{
                background: 'radial-gradient(circle, rgba(227, 10, 23, 0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
                scale: pulseScale,
              }}
            />

            {/* Speed trail effect */}
            {speed > 5 && (
              <>
                <motion.div
                  className="absolute -bottom-20 left-1/2 w-2 h-16 -translate-x-1/2 bg-gradient-to-b from-[#E30A17] to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3], scaleY: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-20 left-1/2 w-2 h-16 -translate-x-1/2 bg-gradient-to-b from-[#E30A17] to-transparent blur-md"
                  animate={{ opacity: [0.2, 0.4, 0.2], scaleY: [0.7, 1.2, 0.7] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              </>
            )}

            {/* 3D Vehicle Container with Shadow */}
            <div className="relative" style={{ transform: 'perspective(1000px) rotateX(10deg)' }}>
              {/* Vehicle shadow */}
              <div
                className="absolute top-0 left-0 w-28 h-28 rounded-full blur-xl opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, transparent 70%)',
                  transform: 'translateY(35px) scaleY(0.3)',
                }}
              />

              {/* Ultra Realistic Photo-realistic Vehicle */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                style={{ transform: 'translateZ(20px)' }}
              >
                {/* Ultra Premium Tesla/Porsche Level Car SVG - Top-down view */}
                <svg
                  viewBox="0 0 240 360"
                  className="w-40 h-60 drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 35px 70px rgba(0,0,0,0.8)) drop-shadow(0 0 50px rgba(227, 10, 23, 0.6)) drop-shadow(0 0 100px rgba(227, 10, 23, 0.3))',
                    transform: 'rotateX(-3deg) perspective(1200px)'
                  }}
                >
                  <defs>
                    {/* Ultra Premium Metallic Paint - Multi-layer */}
                    <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#FF3B47', stopOpacity: 1 }} />
                      <stop offset="15%" style={{ stopColor: '#FF1A2A', stopOpacity: 1 }} />
                      <stop offset="35%" style={{ stopColor: '#E30A17', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#B30713', stopOpacity: 1 }} />
                      <stop offset="65%" style={{ stopColor: '#8B0510', stopOpacity: 1 }} />
                      <stop offset="80%" style={{ stopColor: '#E30A17', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#FF1A2A', stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Secondary body highlights */}
                    <linearGradient id="bodyHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: 'rgba(255,255,255,0.5)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Premium hood reflection */}
                    <radialGradient id="hoodReflection">
                      <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.8)', stopOpacity: 1 }} />
                      <stop offset="30%" style={{ stopColor: 'rgba(255,255,255,0.4)', stopOpacity: 1 }} />
                      <stop offset="60%" style={{ stopColor: 'rgba(255,255,255,0.1)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(0,0,0,0.2)', stopOpacity: 1 }} />
                    </radialGradient>

                    {/* Tesla-style dark glass */}
                    <linearGradient id="roofGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgba(30,40,60,0.6)', stopOpacity: 1 }} />
                      <stop offset="40%" style={{ stopColor: 'rgba(15,25,45,0.8)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(10,15,30,0.95)', stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Glass reflection overlay */}
                    <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgba(100,150,255,0.3)', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: 'rgba(255,255,255,0.2)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(100,150,255,0.1)', stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Chrome mirror gradient */}
                    <radialGradient id="mirrorGradient">
                      <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.95)', stopOpacity: 1 }} />
                      <stop offset="30%" style={{ stopColor: 'rgba(220,220,220,0.9)', stopOpacity: 1 }} />
                      <stop offset="60%" style={{ stopColor: 'rgba(150,150,150,0.85)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(80,80,80,0.95)', stopOpacity: 1 }} />
                    </radialGradient>

                    {/* Performance tire gradient */}
                    <radialGradient id="tireGradient">
                      <stop offset="0%" style={{ stopColor: '#404040', stopOpacity: 1 }} />
                      <stop offset="40%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
                      <stop offset="70%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                    </radialGradient>

                    {/* Premium alloy rim */}
                    <radialGradient id="rimGradient">
                      <stop offset="0%" style={{ stopColor: '#E8E8E8', stopOpacity: 1 }} />
                      <stop offset="40%" style={{ stopColor: '#BEBEBE', stopOpacity: 1 }} />
                      <stop offset="70%" style={{ stopColor: '#A0A0A0', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#707070', stopOpacity: 1 }} />
                    </radialGradient>

                    {/* LED headlight glow - enhanced */}
                    <filter id="headlightGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>

                    {/* Premium body shadow with depth */}
                    <filter id="bodyShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                      <feOffset dx="3" dy="6" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.6"/>
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>

                    {/* Specular highlight filter */}
                    <filter id="specular">
                      <feGaussianBlur stdDeviation="1" result="blur"/>
                      <feComposite in="blur" in2="SourceGraphic" operator="over"/>
                    </filter>
                  </defs>

                  {/* Premium Sedan Body - Tesla Model S inspired */}

                  {/* Main car body - Sleek aerodynamic shape */}
                  <path
                    d="M 120 40
                       C 120 38, 125 36, 130 36
                       L 150 42
                       C 158 46, 165 52, 172 62
                       L 185 85
                       C 190 95, 192 108, 193 125
                       L 195 180
                       C 195 200, 193 220, 190 240
                       L 185 275
                       C 182 290, 178 305, 172 318
                       L 160 332
                       C 150 340, 135 344, 120 344
                       C 105 344, 90 340, 80 332
                       L 68 318
                       C 62 305, 58 290, 55 275
                       L 50 240
                       C 47 220, 45 200, 45 180
                       L 47 125
                       C 48 108, 50 95, 55 85
                       L 68 62
                       C 75 52, 82 46, 90 42
                       L 110 36
                       C 115 36, 120 38, 120 40 Z"
                    fill="url(#carBodyGradient)"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="2"
                    filter="url(#bodyShadow)"
                  />

                  {/* Body side highlight line */}
                  <path
                    d="M 68 62 C 75 52, 82 46, 90 42 L 150 42 C 158 46, 165 52, 172 62"
                    fill="none"
                    stroke="url(#bodyHighlight)"
                    strokeWidth="2"
                    opacity="0.6"
                  />

                  {/* Hood reflection - Premium quality */}
                  <ellipse
                    cx="120"
                    cy="90"
                    rx="45"
                    ry="35"
                    fill="url(#hoodReflection)"
                    opacity="0.75"
                    filter="url(#specular)"
                  />

                  {/* Secondary hood highlight */}
                  <ellipse
                    cx="120"
                    cy="85"
                    rx="30"
                    ry="20"
                    fill="rgba(255,255,255,0.3)"
                    opacity="0.5"
                  />

                  {/* Premium front windshield - Tesla dark tint */}
                  <path
                    d="M 75 95 C 82 88, 98 84, 120 84 C 142 84, 158 88, 165 95 L 170 120 L 70 120 Z"
                    fill="url(#roofGlass)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    opacity="0.95"
                  />
                  {/* Windshield reflection */}
                  <path
                    d="M 85 95 C 92 90, 103 87, 120 87 C 137 87, 148 90, 155 95 L 158 108 L 82 108 Z"
                    fill="url(#glassReflection)"
                    opacity="0.4"
                  />

                  {/* Premium panoramic roof glass */}
                  <rect
                    x="72"
                    y="120"
                    width="96"
                    height="125"
                    rx="12"
                    fill="url(#roofGlass)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                    opacity="0.92"
                  />
                  {/* Roof glass reflection overlay */}
                  <ellipse
                    cx="120"
                    cy="170"
                    rx="40"
                    ry="50"
                    fill="url(#glassReflection)"
                    opacity="0.25"
                  />

                  {/* Rear windshield with curve */}
                  <path
                    d="M 70 250 L 170 250 L 165 275 C 158 282, 142 286, 120 286 C 98 286, 82 282, 75 275 Z"
                    fill="url(#roofGlass)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    opacity="0.95"
                  />

                  {/* Front bumper - Carbon fiber style */}
                  <rect
                    x="85"
                    y="45"
                    width="70"
                    height="12"
                    rx="3"
                    fill="rgba(20,20,20,0.95)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.8"
                  />
                  {/* Air intake grille */}
                  <rect
                    x="100"
                    y="48"
                    width="40"
                    height="6"
                    rx="1"
                    fill="rgba(10,10,10,0.9)"
                  />

                  {/* Rear bumper - Premium design */}
                  <rect
                    x="85"
                    y="325"
                    width="70"
                    height="12"
                    rx="3"
                    fill="rgba(20,20,20,0.95)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.8"
                  />

                  {/* Chrome side mirrors - Left */}
                  <g>
                    <ellipse
                      cx="42"
                      cy="115"
                      rx="13"
                      ry="16"
                      fill="url(#mirrorGradient)"
                      stroke="rgba(0,0,0,0.6)"
                      strokeWidth="1.5"
                    />
                    <ellipse
                      cx="42"
                      cy="115"
                      rx="8"
                      ry="11"
                      fill="rgba(100,150,200,0.3)"
                      opacity="0.7"
                    />
                    {/* Mirror highlight */}
                    <ellipse
                      cx="40"
                      cy="112"
                      rx="4"
                      ry="5"
                      fill="rgba(255,255,255,0.6)"
                      opacity="0.8"
                    />
                  </g>

                  {/* Chrome side mirrors - Right */}
                  <g>
                    <ellipse
                      cx="198"
                      cy="115"
                      rx="13"
                      ry="16"
                      fill="url(#mirrorGradient)"
                      stroke="rgba(0,0,0,0.6)"
                      strokeWidth="1.5"
                    />
                    <ellipse
                      cx="198"
                      cy="115"
                      rx="8"
                      ry="11"
                      fill="rgba(100,150,200,0.3)"
                      opacity="0.7"
                    />
                    {/* Mirror highlight */}
                    <ellipse
                      cx="200"
                      cy="112"
                      rx="4"
                      ry="5"
                      fill="rgba(255,255,255,0.6)"
                      opacity="0.8"
                    />
                  </g>

                  {/* Premium LED Matrix Headlights */}
                  <g filter="url(#headlightGlow)">
                    {/* Left headlight assembly */}
                    <ellipse cx="92" cy="58" rx="11" ry="8" fill="#F5F5DC" opacity="0.98" />
                    <ellipse cx="92" cy="58" rx="7" ry="5" fill="#FFFACD" />
                    <ellipse cx="90" cy="56" rx="3" ry="2" fill="#FFFFFF" opacity="0.9" />
                    {/* Right headlight assembly */}
                    <ellipse cx="148" cy="58" rx="11" ry="8" fill="#F5F5DC" opacity="0.98" />
                    <ellipse cx="148" cy="58" rx="7" ry="5" fill="#FFFACD" />
                    <ellipse cx="150" cy="56" rx="3" ry="2" fill="#FFFFFF" opacity="0.9" />
                  </g>

                  {/* DRL (Daytime Running Lights) strips */}
                  <line x1="80" y1="62" x2="104" y2="62" stroke="#E0E0FF" strokeWidth="2" opacity="0.8" filter="url(#headlightGlow)" />
                  <line x1="136" y1="62" x2="160" y2="62" stroke="#E0E0FF" strokeWidth="2" opacity="0.8" filter="url(#headlightGlow)" />

                  {/* Headlight beams - Dynamic */}
                  {speed > 0 && (
                    <g opacity="0.35">
                      <path d="M 92 58 L 82 15 L 102 15 Z" fill="rgba(255,255,220,0.5)" />
                      <path d="M 148 58 L 138 15 L 158 15 Z" fill="rgba(255,255,220,0.5)" />
                    </g>
                  )}

                  {/* Premium LED Tail Lights - 3D effect */}
                  <g>
                    {/* Left tail light */}
                    <ellipse cx="92" cy="320" rx="9" ry="7" fill="#8B0000" opacity="0.95" />
                    <ellipse cx="92" cy="320" rx="6" ry="4.5" fill="#FF0000" opacity="0.95" />
                    <ellipse cx="92" cy="320" rx="3" ry="2" fill="#FF4444" />
                    {/* Right tail light */}
                    <ellipse cx="148" cy="320" rx="9" ry="7" fill="#8B0000" opacity="0.95" />
                    <ellipse cx="148" cy="320" rx="6" ry="4.5" fill="#FF0000" opacity="0.95" />
                    <ellipse cx="148" cy="320" rx="3" ry="2" fill="#FF4444" />
                  </g>

                  {/* Front Left Wheel - Premium 20" Alloy */}
                  <g>
                    {/* Performance tire */}
                    <ellipse cx="65" cy="105" rx="20" ry="28" fill="url(#tireGradient)" stroke="#000" strokeWidth="2.5" />
                    {/* Sidewall detail */}
                    <ellipse cx="65" cy="105" rx="17" ry="25" fill="none" stroke="rgba(100,100,100,0.4)" strokeWidth="1" />
                    {/* Premium alloy rim */}
                    <ellipse cx="65" cy="105" rx="13" ry="18" fill="url(#rimGradient)" stroke="rgba(80,80,80,0.9)" strokeWidth="2" />
                    {/* 5-spoke design */}
                    <line x1="65" y1="87" x2="65" y2="123" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="52" y1="95" x2="78" y2="115" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="52" y1="115" x2="78" y2="95" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="53" y1="105" x2="77" y2="105" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    {/* Center cap */}
                    <circle cx="65" cy="105" r="6" fill="rgba(40,40,40,0.95)" stroke="rgba(200,200,200,0.6)" strokeWidth="1" />
                    <circle cx="65" cy="105" r="3" fill="rgba(227, 10, 23,0.9)" />
                  </g>

                  {/* Front Right Wheel */}
                  <g>
                    <ellipse cx="175" cy="105" rx="20" ry="28" fill="url(#tireGradient)" stroke="#000" strokeWidth="2.5" />
                    <ellipse cx="175" cy="105" rx="17" ry="25" fill="none" stroke="rgba(100,100,100,0.4)" strokeWidth="1" />
                    <ellipse cx="175" cy="105" rx="13" ry="18" fill="url(#rimGradient)" stroke="rgba(80,80,80,0.9)" strokeWidth="2" />
                    <line x1="175" y1="87" x2="175" y2="123" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="162" y1="95" x2="188" y2="115" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="162" y1="115" x2="188" y2="95" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="163" y1="105" x2="187" y2="105" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <circle cx="175" cy="105" r="6" fill="rgba(40,40,40,0.95)" stroke="rgba(200,200,200,0.6)" strokeWidth="1" />
                    <circle cx="175" cy="105" r="3" fill="rgba(227, 10, 23,0.9)" />
                  </g>

                  {/* Rear Left Wheel */}
                  <g>
                    <ellipse cx="65" cy="275" rx="20" ry="28" fill="url(#tireGradient)" stroke="#000" strokeWidth="2.5" />
                    <ellipse cx="65" cy="275" rx="17" ry="25" fill="none" stroke="rgba(100,100,100,0.4)" strokeWidth="1" />
                    <ellipse cx="65" cy="275" rx="13" ry="18" fill="url(#rimGradient)" stroke="rgba(80,80,80,0.9)" strokeWidth="2" />
                    <line x1="65" y1="257" x2="65" y2="293" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="52" y1="265" x2="78" y2="285" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="52" y1="285" x2="78" y2="265" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="53" y1="275" x2="77" y2="275" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <circle cx="65" cy="275" r="6" fill="rgba(40,40,40,0.95)" stroke="rgba(200,200,200,0.6)" strokeWidth="1" />
                    <circle cx="65" cy="275" r="3" fill="rgba(227, 10, 23,0.9)" />
                  </g>

                  {/* Rear Right Wheel */}
                  <g>
                    <ellipse cx="175" cy="275" rx="20" ry="28" fill="url(#tireGradient)" stroke="#000" strokeWidth="2.5" />
                    <ellipse cx="175" cy="275" rx="17" ry="25" fill="none" stroke="rgba(100,100,100,0.4)" strokeWidth="1" />
                    <ellipse cx="175" cy="275" rx="13" ry="18" fill="url(#rimGradient)" stroke="rgba(80,80,80,0.9)" strokeWidth="2" />
                    <line x1="175" y1="257" x2="175" y2="293" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="162" y1="265" x2="188" y2="285" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="162" y1="285" x2="188" y2="265" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <line x1="163" y1="275" x2="187" y2="275" stroke="rgba(100,100,100,0.95)" strokeWidth="2.5" />
                    <circle cx="175" cy="275" r="6" fill="rgba(40,40,40,0.95)" stroke="rgba(200,200,200,0.6)" strokeWidth="1" />
                    <circle cx="175" cy="275" r="3" fill="rgba(227, 10, 23,0.9)" />
                  </g>

                  {/* Chrome door handles - Tesla style */}
                  <rect x="35" y="145" width="10" height="4" rx="2" fill="url(#mirrorGradient)" opacity="0.9" />
                  <rect x="195" y="145" width="10" height="4" rx="2" fill="url(#mirrorGradient)" opacity="0.9" />
                  <rect x="35" y="200" width="10" height="4" rx="2" fill="url(#mirrorGradient)" opacity="0.9" />
                  <rect x="195" y="200" width="10" height="4" rx="2" fill="url(#mirrorGradient)" opacity="0.9" />

                  {/* Premium body character lines */}
                  <path
                    d="M 70 165 L 170 165"
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  <path
                    d="M 70 168 L 170 168"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    opacity="0.5"
                  />

                  {/* Shark fin antenna - Modern style */}
                  <path
                    d="M 120 135 L 125 125 L 120 128 Z"
                    fill="rgba(30,30,30,0.95)"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="0.5"
                  />

                  {/* Premium Speed LED strip - Integrated in body */}
                  <g>
                    {[...Array(5)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={95 + i * 12.5}
                        cy="180"
                        r="3"
                        fill="#00FF88"
                        opacity={speed > i * 20 ? 0.98 : 0.15}
                        animate={{
                          opacity: speed > i * 20 ? [0.98, 1, 0.98] : 0.15,
                          filter: speed > i * 20 ?
                            ['drop-shadow(0 0 4px #00FF88)', 'drop-shadow(0 0 8px #00FF88)', 'drop-shadow(0 0 4px #00FF88)']
                            : 'none',
                        }}
                        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }}
                      />
                    ))}
                  </g>

                  {/* Logo badge on hood */}
                  <circle cx="120" cy="70" r="6" fill="rgba(30,30,30,0.9)" stroke="rgba(200,200,200,0.6)" strokeWidth="1" />
                  <text x="120" y="74" fontSize="10" fill="rgba(227, 10, 23,0.95)" textAnchor="middle" fontWeight="bold">T</text>
                </svg>
              </motion.div>

              {/* Dynamic heading arrow */}
              <motion.div
                className="absolute -top-20 left-1/2 -translate-x-1/2"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  y: [-8, -4, -8],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div
                  className="w-4 h-16 bg-gradient-to-t from-[#E30A17] via-[#FF3344] to-transparent rounded-full"
                  style={{ filter: 'drop-shadow(0 0 10px #E30A17)' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top HUD - Tesla Style */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
        <div className="flex items-center justify-between">
          {/* Speed & Heading Display */}
          <div className="flex items-center gap-4">
            {/* Digital Speedometer */}
            <motion.div
              className="relative px-6 py-4 bg-black/95 rounded-2xl border-2 border-[#E30A17]/60 backdrop-blur-xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02, borderColor: 'rgba(227, 10, 23, 1)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E30A17]/20 to-transparent" />
              <div className="relative flex items-baseline gap-2">
                <motion.div
                  className="text-5xl font-black text-white leading-none"
                  animate={{ scale: speed > 50 ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {Math.round(speed * 3.6)}
                </motion.div>
                <div className="text-sm text-gray-400 font-bold">km/s</div>
              </div>
              <div className="relative text-xs text-[#E30A17] font-semibold mt-1">
                {speed > 80 ? 'YÜKSEK HIZ' : speed > 50 ? 'NORMAL' : 'YAVAS'}
              </div>
            </motion.div>

            {/* Compass with Animation */}
            <motion.div
              className="px-5 py-4 bg-black/95 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: heading }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Navigation2 className="w-7 h-7 text-[#E30A17] drop-shadow-lg" />
                  <motion.div
                    className="absolute inset-0 bg-[#E30A17] rounded-full blur-md"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <div className="text-white font-black text-2xl leading-none">{Math.round(heading)}°</div>
                  <div className="text-xs text-gray-400 font-semibold">
                    {heading < 45 || heading >= 315 ? 'KUZEY' :
                     heading < 135 ? 'DOĞU' :
                     heading < 225 ? 'GÜNEY' : 'BATI'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShow3DView(!show3DView)}
              className={`p-3 rounded-xl backdrop-blur-xl border transition-all ${
                show3DView
                  ? 'bg-[#E30A17] border-[#E30A17] text-white shadow-lg shadow-red-500/50'
                  : 'bg-black/90 border-white/20 text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Layers className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => setShowWeatherPanel(!showWeatherPanel)}
              className={`p-3 rounded-xl backdrop-blur-xl border transition-all ${
                showWeatherPanel
                  ? 'bg-[#E30A17] border-[#E30A17] text-white shadow-lg shadow-red-500/50'
                  : 'bg-black/90 border-white/20 text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WeatherIcon className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => setShowTraffic(!showTraffic)}
              className={`p-3 rounded-xl backdrop-blur-xl border transition-all ${
                showTraffic
                  ? 'bg-[#E30A17] border-[#E30A17] text-white shadow-lg shadow-red-500/50'
                  : 'bg-black/90 border-white/20 text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Activity className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => setIsTracking(!isTracking)}
              className={`p-3 rounded-xl backdrop-blur-xl border transition-all ${
                isTracking
                  ? 'bg-[#E30A17] border-[#E30A17] text-white shadow-lg shadow-red-500/50'
                  : 'bg-black/90 border-white/20 text-gray-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Stats - Enhanced */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-md">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            className="p-4 bg-black/95 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl"
            whileHover={{ scale: 1.02, borderColor: 'rgba(227, 10, 23, 0.5)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-[#E30A17]" />
              <span className="text-xs text-gray-400 font-bold">GPS Konum</span>
            </div>
            <p className="text-white font-black text-xs leading-relaxed">
              {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
            </p>
          </motion.div>

          <motion.div
            className="p-4 bg-black/95 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl"
            whileHover={{ scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.5)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400 font-bold">Doğruluk</span>
            </div>
            <p className="text-white font-black text-sm">±{Math.round(currentLocation.accuracy)}m</p>
          </motion.div>

          <motion.div
            className="p-4 bg-black/95 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl"
            whileHover={{ scale: 1.02, borderColor: 'rgba(34, 197, 94, 0.5)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400 font-bold">Bağlantı</span>
            </div>
            <motion.p
              className="text-white font-black text-sm flex items-center gap-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              AKTİF
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Zoom Controls - Modern Style */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <motion.button
          onClick={() => setMapZoom(Math.min(20, mapZoom + 1))}
          className="w-12 h-12 rounded-xl bg-black/95 backdrop-blur-xl border-2 border-white/20 text-white hover:border-[#E30A17]/50 transition-all flex items-center justify-center text-2xl font-black shadow-2xl"
          whileHover={{ scale: 1.1, borderColor: 'rgba(227, 10, 23, 0.8)' }}
          whileTap={{ scale: 0.9 }}
        >
          +
        </motion.button>
        <motion.div
          className="w-12 h-20 rounded-xl bg-black/95 backdrop-blur-xl border-2 border-white/20 text-white flex items-center justify-center font-black shadow-2xl"
          animate={{ borderColor: ['rgba(255,255,255,0.2)', 'rgba(227, 10, 23, 0.3)', 'rgba(255,255,255,0.2)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {mapZoom}
        </motion.div>
        <motion.button
          onClick={() => setMapZoom(Math.max(10, mapZoom - 1))}
          className="w-12 h-12 rounded-xl bg-black/95 backdrop-blur-xl border-2 border-white/20 text-white hover:border-[#E30A17]/50 transition-all flex items-center justify-center text-2xl font-black shadow-2xl"
          whileHover={{ scale: 1.1, borderColor: 'rgba(227, 10, 23, 0.8)' }}
          whileTap={{ scale: 0.9 }}
        >
          −
        </motion.button>
      </div>
    </div>
  );
}

'use client';

// ============================================
// TÜRK OTO AI - Next-Gen Tesla-Style Live Map V2
// Advanced real-time GPS with AI-powered features
// ============================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation, MapPin, Zap, TrendingUp, AlertTriangle, Car,
  Navigation2, Clock, Route, Maximize2, Minimize2, Layers,
  Settings, Info, Radio, Target, Compass, Fuel, Cloud, Wind,
  Droplets, Sun, Moon, Snowflake, CloudRain, Wifi, WifiOff,
  ChevronDown, ChevronUp, Activity, Battery, Thermometer,
  Gauge, Navigation as NavIcon, MapPinned, Building, ParkingCircle,
  Zap as ChargingIcon, Wrench
} from 'lucide-react';

interface TeslaLiveMapProps {
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
}

interface WeatherData {
  temp: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'snow';
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
  available?: boolean;
}

export default function TeslaLiveMapV2({ className, onLocationUpdate }: TeslaLiveMapProps) {
  // Core GPS & Navigation State
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
  const [heading, setHeading] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isTracking, setIsTracking] = useState(true);
  const [mapZoom, setMapZoom] = useState(15);

  // Traffic & Environment State
  const [trafficSegments, setTrafficSegments] = useState<TrafficSegment[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [serviceStations, setServiceStations] = useState<ServiceStation[]>([]);

  // UI State
  const [showWeatherPanel, setShowWeatherPanel] = useState(false);
  const [showServicesPanel, setShowServicesPanel] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);

  // Refs
  const watchIdRef = useRef<number | null>(null);

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

  // Generate realistic traffic segments
  const generateTrafficSegments = useCallback((lat: number, lng: number) => {
    const segments: TrafficSegment[] = [];
    const trafficTypes: TrafficSegment['type'][] = ['free', 'light', 'moderate', 'heavy'];

    for (let i = 0; i < 30; i++) {
      const angle = (i * 12) + Math.random() * 10;
      const distance = 0.001 + Math.random() * 0.015;
      const type = trafficTypes[Math.floor(Math.random() * trafficTypes.length)];

      segments.push({
        id: `traffic-${i}`,
        type,
        lat: lat + distance * Math.cos(angle * Math.PI / 180),
        lng: lng + distance * Math.sin(angle * Math.PI / 180),
        length: 60 + Math.random() * 120,
        angle,
        speed: type === 'free' ? 80 : type === 'light' ? 50 : type === 'moderate' ? 30 : 10,
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
        available: Math.random() > 0.2,
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

  // Convert lat/lng to screen coordinates
  const latLngToScreen = (lat: number, lng: number) => {
    if (!currentLocation) return { x: 0, y: 0 };

    const centerLat = currentLocation.latitude;
    const centerLng = currentLocation.longitude;

    const scale = 100000 / Math.pow(2, 15 - mapZoom);
    const x = (lng - centerLng) * scale + 350;
    const y = -(lat - centerLat) * scale + 300;

    return { x, y };
  };

  // Get weather icon
  const getWeatherIcon = () => {
    if (!weather) return Sun;
    switch (weather.condition) {
      case 'clear': return Sun;
      case 'cloudy': return Cloud;
      case 'rain': return CloudRain;
      case 'snow': return Snowflake;
      default: return Sun;
    }
  };

  // Get service icon
  const getServiceIcon = (type: ServiceStation['type']) => {
    switch (type) {
      case 'fuel': return Fuel;
      case 'service': return Wrench;
      case 'charging': return ChargingIcon;
      case 'parking': return ParkingCircle;
    }
  };

  // Get service color
  const getServiceColor = (type: ServiceStation['type']) => {
    switch (type) {
      case 'fuel': return '#3B82F6';
      case 'service': return '#F59E0B';
      case 'charging': return '#10B981';
      case 'parking': return '#8B5CF6';
    }
  };

  if (!currentLocation) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-900 rounded-2xl`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Compass className="w-16 h-16 text-[#E30A17]" />
          </motion.div>
          <p className="text-white font-semibold">GPS Bekleniyor...</p>
          <p className="text-gray-400 text-sm mt-2">Konum servisleri aktifleştiriliyor</p>
        </div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon();

  return (
    <div className={`${className} relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black`}>
      {/* Map Canvas */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #E30A17 1px, transparent 1px),
                linear-gradient(to bottom, #E30A17 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            animate={{ opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Traffic Segments */}
        {showTraffic && (
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {trafficSegments.map((segment) => {
              const pos = latLngToScreen(segment.lat, segment.lng);
              const endX = pos.x + segment.length * Math.cos(segment.angle * Math.PI / 180);
              const endY = pos.y + segment.length * Math.sin(segment.angle * Math.PI / 180);

              return (
                <motion.line
                  key={segment.id}
                  x1={pos.x}
                  y1={pos.y}
                  x2={endX}
                  y2={endY}
                  stroke={getTrafficColor(segment.type)}
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 0.9, pathLength: 1 }}
                  transition={{ duration: 0.8, delay: Math.random() * 0.3 }}
                />
              );
            })}
          </svg>
        )}

        {/* Service Stations on Map */}
        {serviceStations.slice(0, 5).map((station) => {
          const pos = latLngToScreen(station.lat, station.lng);
          const Icon = getServiceIcon(station.type);

          return (
            <motion.div
              key={station.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.3 }}
              className="absolute cursor-pointer"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative group">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
                  style={{ backgroundColor: getServiceColor(station.type) }}
                  animate={{ boxShadow: ['0 0 10px rgba(255,255,255,0.3)', '0 0 20px rgba(255,255,255,0.5)', '0 0 10px rgba(255,255,255,0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm border border-white/20">
                  <p className="font-bold">{station.name}</p>
                  <p className="text-gray-300">{station.distance} km</p>
                  {station.price && <p className="text-green-400">₺{station.price}/L</p>}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Current Vehicle Position (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: heading }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative"
          >
            {/* Pulsing circle */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 w-28 h-28 bg-[#E30A17] rounded-full -translate-x-2 -translate-y-2"
              style={{ filter: 'blur(12px)' }}
            />

            {/* Vehicle icon with 3D effect */}
            <motion.div
              className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #E30A17 0%, #B30713 50%, #E30A17 100%)',
                boxShadow: '0 10px 40px rgba(227, 10, 23, 0.6), inset 0 2px 10px rgba(255,255,255,0.2)',
                border: '3px solid rgba(255,255,255,0.3)',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Car className="w-14 h-14 text-white drop-shadow-lg" style={{ transform: 'rotate(-90deg)' }} />
            </motion.div>

            {/* Heading indicator arrow */}
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2"
              animate={{ opacity: [0.5, 1, 0.5], y: [-5, 0, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-3 h-12 bg-gradient-to-t from-[#E30A17] via-red-500 to-transparent rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Speed & Heading */}
          <div className="flex items-center gap-3">
            <motion.div
              className="px-5 py-3 bg-black/90 rounded-2xl border-2 border-[#E30A17]/50 backdrop-blur-md shadow-xl"
              whileHover={{ scale: 1.05, borderColor: 'rgba(227, 10, 23, 1)' }}
            >
              <div className="flex items-center gap-2">
                <Gauge className="w-6 h-6 text-[#E30A17]" />
                <div>
                  <div className="text-4xl font-black text-white leading-none">
                    {Math.round(speed * 3.6)}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold">km/s</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="px-4 py-3 bg-black/90 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: heading }}
                  transition={{ duration: 0.3 }}
                >
                  <Navigation2 className="w-5 h-5 text-[#E30A17]" />
                </motion.div>
                <span className="text-white font-bold text-lg">{Math.round(heading)}°</span>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowWeatherPanel(!showWeatherPanel)}
              className={`p-3 rounded-xl backdrop-blur-md border transition-all ${
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
              onClick={() => setShowServicesPanel(!showServicesPanel)}
              className={`p-3 rounded-xl backdrop-blur-md border transition-all ${
                showServicesPanel
                  ? 'bg-[#E30A17] border-[#E30A17] text-white shadow-lg shadow-red-500/50'
                  : 'bg-black/90 border-white/20 text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Fuel className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => setShowTraffic(!showTraffic)}
              className={`p-3 rounded-xl backdrop-blur-md border transition-all ${
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
              className={`p-3 rounded-xl backdrop-blur-md border transition-all ${
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

      {/* Weather Panel */}
      <AnimatePresence>
        {showWeatherPanel && weather && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="absolute left-4 top-20 w-72 p-5 bg-black/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <WeatherIcon className="w-6 h-6 text-[#E30A17]" />
                Hava Durumu
              </h3>
              <button onClick={() => setShowWeatherPanel(false)} className="text-gray-400 hover:text-white">
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                <span className="text-gray-300 flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Sıcaklık
                </span>
                <span className="text-white font-bold text-xl">{weather.temp}°C</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                <span className="text-gray-300 flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  Rüzgar
                </span>
                <span className="text-white font-bold">{weather.windSpeed} km/s</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                <span className="text-gray-300 flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Nem
                </span>
                <span className="text-white font-bold">{weather.humidity}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Panel */}
      <AnimatePresence>
        {showServicesPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute right-4 top-20 w-80 max-h-[500px] overflow-y-auto p-5 bg-black/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#E30A17]" />
                Yakındaki Yerler
              </h3>
              <button onClick={() => setShowServicesPanel(false)} className="text-gray-400 hover:text-white">
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {serviceStations.map((station) => {
                const Icon = getServiceIcon(station.type);
                return (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer border border-transparent hover:border-[#E30A17]/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: getServiceColor(station.type) }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">{station.name}</p>
                        <p className="text-gray-400 text-xs">{station.distance} km uzaklıkta</p>
                        {station.price && (
                          <p className="text-green-400 text-xs font-bold mt-1">₺{station.price}/L</p>
                        )}
                      </div>
                      {station.available && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            className="p-4 bg-black/90 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl"
            whileHover={{ scale: 1.02, borderColor: 'rgba(227, 10, 23, 0.5)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-[#E30A17]" />
              <span className="text-xs text-gray-400 font-semibold">Konum</span>
            </div>
            <p className="text-white font-bold text-xs leading-relaxed">
              {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
            </p>
          </motion.div>

          <motion.div
            className="p-4 bg-black/90 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl"
            whileHover={{ scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.5)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400 font-semibold">Doğruluk</span>
            </div>
            <p className="text-white font-bold text-sm">±{Math.round(currentLocation.accuracy)}m</p>
          </motion.div>

          <motion.div
            className="p-4 bg-black/90 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl"
            whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-400 font-semibold">Sinyal</span>
            </div>
            <p className="text-white font-bold text-sm flex items-center gap-1">
              <Wifi className="w-4 h-4 text-green-500" />
              Güçlü
            </p>
          </motion.div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <motion.button
          onClick={() => setMapZoom(Math.min(20, mapZoom + 1))}
          className="w-12 h-12 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:border-[#E30A17]/50 transition-all flex items-center justify-center text-2xl font-bold shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          +
        </motion.button>
        <div className="w-12 h-20 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-sm font-bold shadow-xl">
          {mapZoom}
        </div>
        <motion.button
          onClick={() => setMapZoom(Math.max(10, mapZoom - 1))}
          className="w-12 h-12 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:border-[#E30A17]/50 transition-all flex items-center justify-center text-2xl font-bold shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          −
        </motion.button>
      </div>
    </div>
  );
}

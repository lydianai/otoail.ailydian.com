'use client';

// ============================================
// TÜRK OTO AI - Next-Gen Tesla-Style Live Map
// Real-time GPS tracking with advanced features
// ============================================

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation, MapPin, Zap, TrendingUp, AlertTriangle, Car,
  Navigation2, Clock, Route, Maximize2, Minimize2, Layers,
  Settings, Info, Radio, Target, Compass, Fuel, Cloud, Wind,
  Droplets, Sun, Moon, Snowflake, CloudRain, Wifi, WifiOff,
  ChevronDown, ChevronUp, Activity, Battery, Thermometer
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
  incidents?: number;
}

interface WeatherData {
  temp: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'snow';
  windSpeed: number;
  humidity: number;
  icon: any;
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

interface RouteInfo {
  distance: number;
  duration: number;
  traffic: 'low' | 'medium' | 'high';
  fuelNeeded?: number;
}

export default function TeslaLiveMap({ className, onLocationUpdate }: TeslaLiveMapProps) {
  // Core GPS & Navigation State
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
  const [heading, setHeading] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isTracking, setIsTracking] = useState(true);
  const [mapZoom, setMapZoom] = useState(15);
  const [mapStyle, setMapStyle] = useState<'satellite' | 'street' | 'dark'>('dark');

  // Traffic & Environment State
  const [trafficSegments, setTrafficSegments] = useState<TrafficSegment[]>([]);
  const [nearbyPOIs, setNearbyPOIs] = useState<any[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [serviceStations, setServiceStations] = useState<ServiceStation[]>([]);

  // Route & Navigation State
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // UI State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWeatherOverlay, setShowWeatherOverlay] = useState(true);
  const [showTrafficOverlay, setShowTrafficOverlay] = useState(true);
  const [showServiceStations, setShowServiceStations] = useState(true);
  const [activePanel, setActivePanel] = useState<'none' | 'route' | 'services' | 'weather'>('none');

  // Refs
  const watchIdRef = useRef<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize GPS tracking
  useEffect(() => {
    if (!isTracking || typeof window === 'undefined') return;

    // Check if geolocation is available
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    // Start watching position
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { coords } = position;
        setCurrentLocation(coords);
        setSpeed(coords.speed || 0);
        setHeading(coords.heading || 0);

        if (onLocationUpdate) {
          onLocationUpdate(coords);
        }

        // Generate traffic segments around current location
        generateTrafficSegments(coords.latitude, coords.longitude);

        // Generate nearby POIs
        generateNearbyPOIs(coords.latitude, coords.longitude);

        // Generate weather data
        generateWeatherData(coords.latitude, coords.longitude);

        // Generate nearby service stations
        generateServiceStations(coords.latitude, coords.longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Fallback to Istanbul coordinates for demo
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
        generateNearbyPOIs(fallbackCoords.latitude, fallbackCoords.longitude);
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

    // Generate traffic segments in different directions
    for (let i = 0; i < 20; i++) {
      const angle = (i * 18) + Math.random() * 10; // Distribute around 360 degrees
      const distance = 0.001 + Math.random() * 0.01; // Random distance
      const segmentLat = lat + distance * Math.cos(angle * Math.PI / 180);
      const segmentLng = lng + distance * Math.sin(angle * Math.PI / 180);

      segments.push({
        id: `traffic-${i}`,
        type: trafficTypes[Math.floor(Math.random() * trafficTypes.length)],
        lat: segmentLat,
        lng: segmentLng,
        length: 50 + Math.random() * 100,
        angle,
      });
    }

    setTrafficSegments(segments);
  }, []);

  // Generate nearby Points of Interest
  const generateNearbyPOIs = useCallback((lat: number, lng: number) => {
    const poiTypes = [
      { icon: '⛽', name: 'Benzin İstasyonu', color: '#3B82F6' },
      { icon: '🏥', name: 'Hastane', color: '#EF4444' },
      { icon: '🍔', name: 'Restoran', color: '#F59E0B' },
      { icon: '🏪', name: 'Market', color: '#10B981' },
      { icon: 'P', name: 'Otopark', color: '#8B5CF6' },
    ];

    const pois = [];
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * 360;
      const distance = 0.002 + Math.random() * 0.008;
      const poiType = poiTypes[Math.floor(Math.random() * poiTypes.length)];

      pois.push({
        id: `poi-${i}`,
        lat: lat + distance * Math.cos(angle * Math.PI / 180),
        lng: lng + distance * Math.sin(angle * Math.PI / 180),
        ...poiType,
      });
    }

    setNearbyPOIs(pois);
  }, []);

  // Generate weather data
  const generateWeatherData = useCallback((lat: number, lng: number) => {
    const conditions: WeatherData['condition'][] = ['clear', 'cloudy', 'rain', 'snow'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    const weatherIcons = {
      clear: Sun,
      cloudy: Cloud,
      rain: CloudRain,
      snow: Snowflake,
    };

    setWeather({
      temp: Math.round(15 + Math.random() * 15), // 15-30°C
      condition,
      windSpeed: Math.round(10 + Math.random() * 20), // 10-30 km/h
      humidity: Math.round(40 + Math.random() * 40), // 40-80%
      icon: weatherIcons[condition],
    });
  }, []);

  // Generate nearby service stations
  const generateServiceStations = useCallback((lat: number, lng: number) => {
    const stationTypes: ServiceStation['type'][] = ['fuel', 'service', 'charging', 'parking'];
    const stationNames = {
      fuel: ['Shell', 'BP', 'Opet', 'Total', 'Petrol Ofisi'],
      service: ['Bosch Car Service', 'Fiat Servisi', 'Ford Yetkili Servis', 'Toyota Plaza'],
      charging: ['Tesla Supercharger', 'Eşarj İstasyonu', 'Voltrun', 'ZES'],
      parking: ['Kapalı Otopark', 'Açık Park', 'Vale Park', 'AVM Otoparkı'],
    };

    const stations: ServiceStation[] = [];
    for (let i = 0; i < 12; i++) {
      const type = stationTypes[Math.floor(Math.random() * stationTypes.length)];
      const angle = Math.random() * 360;
      const distance = 0.5 + Math.random() * 4.5; // 0.5-5 km

      stations.push({
        id: `station-${i}`,
        type,
        name: stationNames[type][Math.floor(Math.random() * stationNames[type].length)],
        distance: parseFloat(distance.toFixed(1)),
        lat: lat + (distance / 111) * Math.cos(angle * Math.PI / 180),
        lng: lng + (distance / 111) * Math.sin(angle * Math.PI / 180),
        price: type === 'fuel' ? parseFloat((35 + Math.random() * 5).toFixed(2)) : undefined,
        available: Math.random() > 0.2, // 80% available
      });
    }

    // Sort by distance
    stations.sort((a, b) => a.distance - b.distance);
    setServiceStations(stations.slice(0, 8)); // Keep closest 8
  }, []);

  // Get traffic color
  const getTrafficColor = (type: TrafficSegment['type']) => {
    switch (type) {
      case 'free': return '#10B981'; // Green
      case 'light': return '#F59E0B'; // Yellow
      case 'moderate': return '#EF4444'; // Orange
      case 'heavy': return '#DC2626'; // Red
      default: return '#6B7280';
    }
  };

  // Convert lat/lng to screen coordinates (simplified projection)
  const latLngToScreen = (lat: number, lng: number) => {
    if (!currentLocation) return { x: 0, y: 0 };

    const centerLat = currentLocation.latitude;
    const centerLng = currentLocation.longitude;

    // Simple mercator-like projection
    const scale = 100000 / Math.pow(2, 15 - mapZoom);
    const x = (lng - centerLng) * scale + 300; // 300 is half canvas width
    const y = -(lat - centerLat) * scale + 300; // 300 is half canvas height

    return { x, y };
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

  return (
    <div className={`${className} relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black`}>
      {/* Map Canvas */}
      <div ref={mapRef} className="absolute inset-0">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #E30A17 1px, transparent 1px),
                linear-gradient(to bottom, #E30A17 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Traffic Segments */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </svg>

        {/* Nearby POIs */}
        {nearbyPOIs.map((poi) => {
          const pos = latLngToScreen(poi.lat, poi.lng);

          return (
            <motion.div
              key={poi.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              className="absolute"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative group">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer"
                  style={{ backgroundColor: poi.color }}
                >
                  {poi.icon}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {poi.name}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Current Vehicle Position (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: heading }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Pulsing circle */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 w-24 h-24 bg-[#E30A17] rounded-full"
              style={{ filter: 'blur(8px)' }}
            />

            {/* Vehicle icon */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-[#E30A17] to-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
              <Car className="w-12 h-12 text-white" style={{ transform: 'rotate(-90deg)' }} />
            </div>

            {/* Heading indicator */}
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-10 bg-gradient-to-t from-[#E30A17] to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          {/* Speed & Heading */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-black/80 rounded-xl border border-white/20 backdrop-blur-sm">
              <div className="text-3xl font-black text-white">
                {Math.round(speed * 3.6)}
                <span className="text-sm ml-1 text-gray-400">km/s</span>
              </div>
            </div>

            <div className="px-4 py-2 bg-black/80 rounded-xl border border-white/20 backdrop-blur-sm flex items-center gap-2">
              <Navigation2 className="w-5 h-5 text-[#E30A17]" style={{ transform: `rotate(${heading}deg)` }} />
              <span className="text-white font-bold">{Math.round(heading)}°</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`p-2 rounded-lg backdrop-blur-sm border transition-colors ${
                isTracking
                  ? 'bg-[#E30A17] border-[#E30A17] text-white'
                  : 'bg-black/80 border-white/20 text-gray-400'
              }`}
            >
              <Target className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMapStyle(mapStyle === 'dark' ? 'satellite' : mapStyle === 'satellite' ? 'street' : 'dark')}
              className="p-2 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              <Layers className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-black/80 rounded-xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#E30A17]" />
              <span className="text-xs text-gray-400">Konum</span>
            </div>
            <p className="text-white font-bold text-sm">
              {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
            </p>
          </div>

          <div className="p-3 bg-black/80 rounded-xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400">Doğruluk</span>
            </div>
            <p className="text-white font-bold text-sm">±{Math.round(currentLocation.accuracy)}m</p>
          </div>

          <div className="p-3 bg-black/80 rounded-xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <Radio className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-400">Uydu Sinyali</span>
            </div>
            <p className="text-white font-bold text-sm">Güçlü</p>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <button
          onClick={() => setMapZoom(Math.min(20, mapZoom + 1))}
          className="w-10 h-10 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center text-2xl font-bold"
        >
          +
        </button>
        <div className="w-10 h-16 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center text-sm font-bold">
          {mapZoom}
        </div>
        <button
          onClick={() => setMapZoom(Math.max(10, mapZoom - 1))}
          className="w-10 h-10 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center text-2xl font-bold"
        >
          −
        </button>
      </div>
    </div>
  );
}

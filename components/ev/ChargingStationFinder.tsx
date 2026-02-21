'use client';

/**
 * EV Charging Station Finder & Navigator
 * Find nearest charging stations with price comparison and availability
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MapPin, DollarSign, Clock, Navigation, Filter, Star } from 'lucide-react';

interface ChargingStation {
  id: string;
  name: string;
  provider: string;
  lat: number;
  lng: number;
  distance: number; // km
  power: number; // kW
  plugs: string[];
  price: number; // TL/kWh
  available: boolean;
  availablePlugs: number;
  totalPlugs: number;
  rating: number;
  estimatedTime: number; // minutes to charge to 80%
}

interface ChargingStationFinderProps {
  currentLocation?: { lat: number; lng: number };
  currentBatterySOC?: number;
  className?: string;
  onNavigate?: (station: ChargingStation) => void;
}

export default function ChargingStationFinder({
  currentLocation = { lat: 41.0082, lng: 28.9784 },
  currentBatterySOC = 45,
  className = '',
  onNavigate
}: ChargingStationFinderProps) {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [filteredStations, setFilteredStations] = useState<ChargingStation[]>([]);
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'power'>('distance');
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);

  // Load charging stations from turkey-pois.json
  useEffect(() => {
    async function loadStations() {
      try {
        const response = await fetch('/data/turkey-pois.json');
        const data = await response.json();

        // Calculate distance and add additional info
        const stationsWithDistance: ChargingStation[] = data.ev_charging.map((station: any) => {
          const distance = calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            station.lat,
            station.lng
          );

          const estimatedTime = calculateChargingTime(currentBatterySOC, station.power);

          return {
            ...station,
            distance,
            availablePlugs: station.available ? Math.floor(Math.random() * station.plugs.length) + 1 : 0,
            totalPlugs: station.plugs.length + 2, // Assume 2-4 total plugs
            rating: 4 + Math.random(),
            estimatedTime,
          };
        });

        setStations(stationsWithDistance);
        setFilteredStations(stationsWithDistance);
      } catch (error) {
        console.error('Error loading charging stations:', error);
      }
    }

    loadStations();
  }, [currentLocation, currentBatterySOC]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...stations];

    if (showAvailableOnly) {
      filtered = filtered.filter(s => s.available);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'price':
          return a.price - b.price;
        case 'power':
          return b.power - a.power;
        default:
          return 0;
      }
    });

    setFilteredStations(filtered);
  }, [stations, sortBy, showAvailableOnly]);

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10;
  }

  function calculateChargingTime(currentSOC: number, power: number): number {
    const batteryCapacity = 75; // kWh (typical EV battery)
    const targetSOC = 80; // Usually charge to 80% for fast charging
    const neededEnergy = (targetSOC - currentSOC) / 100 * batteryCapacity;
    const efficiency = 0.9; // Charging efficiency
    return Math.round(neededEnergy / (power * efficiency) * 60);
  }

  const getPowerColor = (power: number) => {
    if (power >= 150) return 'text-purple-400 border-purple-500/50 bg-purple-500/20';
    if (power >= 50) return 'text-blue-400 border-blue-500/50 bg-blue-500/20';
    return 'text-green-400 border-green-500/50 bg-green-500/20';
  };

  const getPowerLabel = (power: number) => {
    if (power >= 150) return 'Çok Hızlı';
    if (power >= 50) return 'Hızlı';
    return 'Normal';
  };

  return (
    <div className={`bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 sm:p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Şarj İstasyonları</h2>
            <p className="text-xs sm:text-sm text-gray-400">{filteredStations.length} istasyon bulundu</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-400">Batarya</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-400">{currentBatterySOC}%</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <span className="text-xs sm:text-sm text-gray-400">Sırala:</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSortBy('distance')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            sortBy === 'distance'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Mesafe
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSortBy('price')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            sortBy === 'price'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Fiyat
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSortBy('power')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            sortBy === 'power'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Güç
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAvailableOnly(!showAvailableOnly)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            showAvailableOnly
              ? 'bg-green-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Sadece Müsait
        </motion.button>
      </div>

      {/* Stations List */}
      <div className="space-y-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {filteredStations.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-black/40 border rounded-2xl p-3 sm:p-4 cursor-pointer transition-all ${
                selectedStation?.id === station.id
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedStation(station)}
            >
              <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2 sm:gap-0">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{station.name}</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <span>{station.provider}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{station.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className={`px-2 sm:px-3 py-1 rounded-lg border text-xs font-bold ${getPowerColor(station.power)}`}>
                  {getPowerLabel(station.power)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-xs sm:text-sm text-white font-bold">{station.distance} km</span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-xs sm:text-sm text-white font-bold">₺{station.price}/kWh</span>
                </div>

                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-xs sm:text-sm text-white font-bold">{station.power} kW</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-xs sm:text-sm text-white font-bold">~{station.estimatedTime} dk</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Fişler:</span>
                  <div className="flex flex-wrap gap-1">
                    {station.plugs.map(plug => (
                      <span key={plug} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                        {plug}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {station.available ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400 font-bold">
                        {station.availablePlugs}/{station.totalPlugs} Müsait
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span className="text-xs text-red-400 font-bold">Dolu</span>
                    </>
                  )}
                </div>
              </div>

              {selectedStation?.id === station.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate?.(station)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base transition-all"
                  >
                    <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                    Navigasyonu Başlat
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

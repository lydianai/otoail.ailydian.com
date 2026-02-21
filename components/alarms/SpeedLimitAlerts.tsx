'use client';

/**
 * Speed Limit Alert System
 * Monitor speed limits, warn drivers, and log violations
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, AlertTriangle, Camera, TrendingUp, Download, Filter } from 'lucide-react';

interface SpeedViolation {
  id: string;
  timestamp: Date;
  location: { lat: number; lng: number; address: string };
  speedLimit: number;
  actualSpeed: number;
  difference: number;
  severity: 'low' | 'medium' | 'high';
  radarDetected: boolean;
}

interface SpeedZone {
  id: string;
  name: string;
  limit: number;
  lat: number;
  lng: number;
  radius: number; // meters
  active: boolean;
}

interface SpeedLimitAlertsProps {
  currentSpeed?: number;
  currentLocation?: { lat: number; lng: number };
  className?: string;
}

export default function SpeedLimitAlerts({
  currentSpeed = 0,
  currentLocation = { lat: 41.0082, lng: 28.9784 },
  className = ''
}: SpeedLimitAlertsProps) {
  const [violations, setViolations] = useState<SpeedViolation[]>([]);
  const [speedZones, setSpeedZones] = useState<SpeedZone[]>([]);
  const [currentSpeedLimit, setCurrentSpeedLimit] = useState(50);
  const [isViolating, setIsViolating] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [tolerance, setTolerance] = useState(5); // km/h tolerance
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Default speed zones in Turkey
  useEffect(() => {
    const defaultZones: SpeedZone[] = [
      { id: 'zone_1', name: 'Şehir İçi', limit: 50, lat: 41.0082, lng: 28.9784, radius: 5000, active: true },
      { id: 'zone_2', name: 'Okul Bölgesi', limit: 30, lat: 40.9895, lng: 29.0234, radius: 300, active: true },
      { id: 'zone_3', name: 'TEM Otoyolu', limit: 120, lat: 41.0789, lng: 28.7912, radius: 2000, active: true },
      { id: 'zone_4', name: 'E-5 Yan Yol', limit: 90, lat: 40.9897, lng: 28.7234, radius: 1500, active: true },
    ];
    setSpeedZones(defaultZones);
  }, []);

  // Detect current speed zone
  useEffect(() => {
    for (const zone of speedZones) {
      if (!zone.active) continue;

      const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        zone.lat,
        zone.lng
      );

      if (distance * 1000 <= zone.radius) {
        setCurrentSpeedLimit(zone.limit);
        break;
      }
    }
  }, [currentLocation, speedZones]);

  // Monitor speed violations
  useEffect(() => {
    if (!alertsEnabled) return;

    const effectiveLimit = currentSpeedLimit + tolerance;
    const isCurrentlyViolating = currentSpeed > effectiveLimit;

    if (isCurrentlyViolating && !isViolating) {
      // Started violating
      setIsViolating(true);
      playAlertSound();
    } else if (!isCurrentlyViolating && isViolating) {
      // Stopped violating - log violation
      if (currentSpeed > currentSpeedLimit) {
        logViolation();
      }
      setIsViolating(false);
    }
  }, [currentSpeed, currentSpeedLimit, tolerance, alertsEnabled]);

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  function logViolation() {
    const difference = currentSpeed - currentSpeedLimit;
    const severity = difference <= 10 ? 'low' : difference <= 30 ? 'medium' : 'high';

    const violation: SpeedViolation = {
      id: `viol_${Date.now()}`,
      timestamp: new Date(),
      location: {
        ...currentLocation,
        address: 'İstanbul, Türkiye', // In production, use reverse geocoding
      },
      speedLimit: currentSpeedLimit,
      actualSpeed: currentSpeed,
      difference,
      severity,
      radarDetected: Math.random() > 0.7, // Simulate radar detection
    };

    setViolations(prev => [violation, ...prev].slice(0, 50)); // Keep last 50
  }

  function playAlertSound() {
    // In production, play actual alert sound
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  function getSeverityColor(severity: string) {
    switch (severity) {
      case 'low': return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/20';
      case 'medium': return 'text-orange-400 border-orange-500/50 bg-orange-500/20';
      case 'high': return 'text-red-400 border-red-500/50 bg-red-500/20';
      default: return 'text-gray-400 border-gray-500/50 bg-gray-500/20';
    }
  }

  function getSeverityLabel(severity: string) {
    switch (severity) {
      case 'low': return 'Düşük';
      case 'medium': return 'Orta';
      case 'high': return 'Yüksek';
      default: return 'Bilinmiyor';
    }
  }

  function exportViolations() {
    const data = violations.map(v => ({
      Tarih: v.timestamp.toLocaleString('tr-TR'),
      Konum: v.location.address,
      'Hız Limiti': v.speedLimit,
      'Gerçek Hız': v.actualSpeed,
      Fark: v.difference,
      Önem: getSeverityLabel(v.severity),
      'Radar Tespit': v.radarDetected ? 'Evet' : 'Hayır',
    }));

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hiz-ihlalleri-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  const filteredViolations = filterSeverity === 'all'
    ? violations
    : violations.filter(v => v.severity === filterSeverity);

  const stats = {
    total: violations.length,
    low: violations.filter(v => v.severity === 'low').length,
    medium: violations.filter(v => v.severity === 'medium').length,
    high: violations.filter(v => v.severity === 'high').length,
    avgExcess: violations.length > 0
      ? Math.round(violations.reduce((sum, v) => sum + v.difference, 0) / violations.length)
      : 0,
  };

  return (
    <div className={`bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 sm:p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 bg-red-500/20 rounded-xl">
            <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Hız Limiti Takibi</h2>
            <p className="text-xs sm:text-sm text-gray-400">{violations.length} ihlal kaydı</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              alertsEnabled
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {alertsEnabled ? 'Aktif' : 'Pasif'}
          </motion.button>

          {violations.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportViolations}
              className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Dışa Aktar</span>
              <span className="sm:hidden">Aktar</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Current Speed Display */}
      <div className={`mb-4 sm:mb-6 bg-black/40 border-2 rounded-2xl p-4 sm:p-6 transition-all ${
        isViolating ? 'border-red-500 animate-pulse' : 'border-white/10'
      }`}>
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Anlık Hız</div>
            <div className={`text-3xl sm:text-5xl font-bold ${isViolating ? 'text-red-400' : 'text-white'}`}>
              {currentSpeed.toFixed(0)}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">km/h</div>
          </div>

          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Hız Limiti</div>
            <div className="text-3xl sm:text-5xl font-bold text-blue-400">
              {currentSpeedLimit}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">km/h</div>
          </div>

          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Tolerans</div>
            <div className="text-3xl sm:text-5xl font-bold text-yellow-400">
              +{tolerance}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">km/h</div>
          </div>
        </div>

        {isViolating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 sm:mt-4 bg-red-500/20 border border-red-500 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
          >
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 animate-pulse flex-shrink-0" />
            <div>
              <div className="text-red-400 font-bold text-sm sm:text-base">HIZ LİMİTİ AŞILDI!</div>
              <div className="text-xs sm:text-sm text-red-300">
                {(currentSpeed - currentSpeedLimit).toFixed(0)} km/h fazla hızlısınız
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-black/40 border border-white/10 rounded-xl p-2 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-[10px] sm:text-xs text-gray-400">Toplam</div>
        </div>

        <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-2 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-yellow-400">{stats.low}</div>
          <div className="text-[10px] sm:text-xs text-gray-400">Düşük</div>
        </div>

        <div className="bg-black/40 border border-orange-500/20 rounded-xl p-2 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-orange-400">{stats.medium}</div>
          <div className="text-[10px] sm:text-xs text-gray-400">Orta</div>
        </div>

        <div className="bg-black/40 border border-red-500/20 rounded-xl p-2 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-red-400">{stats.high}</div>
          <div className="text-[10px] sm:text-xs text-gray-400">Yüksek</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <span className="text-xs sm:text-sm text-gray-400">Filtre:</span>
        </div>

        {(['all', 'low', 'medium', 'high'] as const).map(severity => (
          <motion.button
            key={severity}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterSeverity(severity)}
            className={`px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
              filterSeverity === severity
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {severity === 'all' ? 'Tümü' : getSeverityLabel(severity)}
          </motion.button>
        ))}
      </div>

      {/* Violations List */}
      <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {filteredViolations.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Gauge className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-400">Henüz hız ihlali kaydı yok</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Güvenli sürüş!</p>
            </div>
          ) : (
            filteredViolations.map((violation, index) => (
              <motion.div
                key={violation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-black/40 border rounded-2xl p-3 sm:p-4 ${getSeverityColor(violation.severity)}`}
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <h3 className="text-sm sm:text-lg font-bold text-white">
                        {violation.actualSpeed} km/h ({violation.speedLimit} limit)
                      </h3>
                      {violation.radarDetected && (
                        <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
                      )}
                    </div>

                    <div className="text-xs sm:text-sm text-gray-400">
                      {violation.timestamp.toLocaleString('tr-TR')}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      {violation.location.address}
                    </div>
                  </div>

                  <div className="text-right ml-2">
                    <div className="text-lg sm:text-2xl font-bold">+{violation.difference}</div>
                    <div className="text-[10px] sm:text-xs opacity-80 whitespace-nowrap">km/h fazla</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="px-2 py-1 bg-black/40 rounded text-[10px] sm:text-xs">
                    {getSeverityLabel(violation.severity)} Önem
                  </span>

                  {violation.radarDetected && (
                    <span className="px-2 py-1 bg-red-500/30 rounded flex items-center gap-1 text-[10px] sm:text-xs">
                      <Camera className="w-3 h-3" />
                      Radar Tespit
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

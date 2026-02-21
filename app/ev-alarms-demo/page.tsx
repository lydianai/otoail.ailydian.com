'use client';

/**
 * EV & Alarms Demo Page
 * Showcase EV battery monitoring, charging stations, geofence, and speed alerts
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging } from 'lucide-react';
import Logo from '@/components/Logo';
import EVBatteryMonitor from '@/components/ev/EVBatteryMonitor';
import ChargingStationFinder from '@/components/ev/ChargingStationFinder';
import GeofenceManager from '@/components/alarms/GeofenceManager';
import SpeedLimitAlerts from '@/components/alarms/SpeedLimitAlerts';

export default function EVAlarmsDemo() {
  const [currentSpeed, setCurrentSpeed] = useState(65);
  const [batterySoc, setBatterySoc] = useState(72);

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 w-fit mb-8">
          <Logo size="sm" />
          <BatteryCharging className="w-5 h-5 text-[#E30A17]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Elektrikli Araç & Alarm Sistemleri
          </h1>
          <p className="text-gray-400 text-lg">
            Batarya yönetimi, şarj istasyonu bulucu, geofence ve hız uyarıları
          </p>
        </motion.div>

        {/* Quick Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-3 sm:p-4">
            <label className="text-xs sm:text-sm text-gray-400 mb-2 block">Simüle Et: Anlık Hız</label>
            <input
              type="range"
              min="0"
              max="150"
              value={currentSpeed}
              onChange={(e) => setCurrentSpeed(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2 text-white font-bold text-xl sm:text-2xl">
              {currentSpeed} km/h
            </div>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-3 sm:p-4">
            <label className="text-xs sm:text-sm text-gray-400 mb-2 block">Simüle Et: Batarya SOC</label>
            <input
              type="range"
              min="0"
              max="100"
              value={batterySoc}
              onChange={(e) => setBatterySoc(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2 text-white font-bold text-xl sm:text-2xl">
              {batterySoc}%
            </div>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        {/* Row 1: EV Battery & Charging Stations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <EVBatteryMonitor
              batteryData={{
                soc: batterySoc,
                soh: 95,
                voltage: 385.5,
                current: 15.2,
                temperature: 28,
                power: 5.86,
                rangeKm: Math.round((batterySoc / 100) * 450),
                chargingStatus: 'idle',
                timeToFull: 0,
                cellBalance: 98,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChargingStationFinder
              currentBatterySOC={batterySoc}
              onNavigate={(station) => alert(`Navigasyon başlatıldı: ${station.name}`)}
            />
          </motion.div>
        </div>

        {/* Row 2: Geofence & Speed Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GeofenceManager
              onGeofenceTriggered={(geofence, type) =>
                console.log(`Geofence ${type}: ${geofence.name}`)
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SpeedLimitAlerts currentSpeed={currentSpeed} />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p>TÜRK OTO AI - Gelişmiş Elektrikli Araç & Alarm Sistemleri</p>
        <p className="mt-2">Tüm özellikler gerçek zamanlı çalışmaktadır</p>
      </div>
    </div>
  );
}

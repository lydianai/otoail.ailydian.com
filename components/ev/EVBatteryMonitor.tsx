'use client';

/**
 * EV Battery Management System
 * Real-time battery monitoring with SOC, SOH, range prediction
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, TrendingUp, TrendingDown, AlertTriangle, Thermometer, Clock } from 'lucide-react';

interface BatteryData {
  soc: number; // State of Charge (0-100%)
  soh: number; // State of Health (0-100%)
  voltage: number; // Battery voltage (V)
  current: number; // Current (A)
  temperature: number; // Temperature (°C)
  power: number; // Power (kW)
  rangeKm: number; // Estimated range (km)
  chargingStatus: 'idle' | 'charging' | 'discharging' | 'fast-charging';
  timeToFull: number; // Minutes to full charge
  cellBalance: number; // Cell balance (0-100%)
}

interface EVBatteryMonitorProps {
  batteryData?: BatteryData;
  className?: string;
}

export default function EVBatteryMonitor({ batteryData, className = '' }: EVBatteryMonitorProps) {
  const [data, setData] = useState<BatteryData>(batteryData || {
    soc: 72,
    soh: 95,
    voltage: 385.5,
    current: 15.2,
    temperature: 28,
    power: 5.86,
    rangeKm: 324,
    chargingStatus: 'idle',
    timeToFull: 0,
    cellBalance: 98,
  });

  // Simulate real-time data updates (in production, this would come from OBD/CAN bus)
  useEffect(() => {
    if (batteryData) {
      setData(batteryData);
      return;
    }

    const interval = setInterval(() => {
      setData(prev => {
        let newSoc = prev.soc;
        let newCurrent = prev.current;
        let newPower = prev.power;

        if (prev.chargingStatus === 'charging') {
          newSoc = Math.min(100, prev.soc + 0.1);
          newCurrent = 15 + Math.random() * 5;
          newPower = (prev.voltage * newCurrent) / 1000;
        } else if (prev.chargingStatus === 'fast-charging') {
          newSoc = Math.min(100, prev.soc + 0.3);
          newCurrent = 80 + Math.random() * 20;
          newPower = (prev.voltage * newCurrent) / 1000;
        } else if (prev.chargingStatus === 'discharging') {
          newSoc = Math.max(0, prev.soc - 0.05);
          newCurrent = -(10 + Math.random() * 10);
          newPower = (prev.voltage * Math.abs(newCurrent)) / 1000;
        }

        const newTemperature = 25 + Math.random() * 10;
        const newRangeKm = Math.round((newSoc / 100) * 450); // Assuming 450km max range
        const timeToFull = prev.chargingStatus === 'charging'
          ? Math.round((100 - newSoc) * 2)
          : prev.chargingStatus === 'fast-charging'
          ? Math.round((100 - newSoc) * 0.6)
          : 0;

        return {
          ...prev,
          soc: newSoc,
          current: newCurrent,
          power: newPower,
          temperature: newTemperature,
          rangeKm: newRangeKm,
          timeToFull,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [batteryData]);

  const getBatteryColor = (soc: number) => {
    if (soc > 60) return '#10b981'; // Green
    if (soc > 20) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const getHealthColor = (soh: number) => {
    if (soh > 85) return '#10b981';
    if (soh > 70) return '#f59e0b';
    return '#ef4444';
  };

  const getChargingIcon = () => {
    switch (data.chargingStatus) {
      case 'charging':
      case 'fast-charging':
        return <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />;
      case 'discharging':
        return <TrendingDown className="w-6 h-6 text-red-400" />;
      default:
        return <Battery className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className={`bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 sm:p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          {getChargingIcon()}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Batarya Yönetimi</h2>
            <p className="text-xs sm:text-sm text-gray-400">Gerçek zamanlı izleme</p>
          </div>
        </div>

        {data.chargingStatus !== 'idle' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-blue-500/20 border border-blue-500/50 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2"
          >
            <div className="text-xs text-blue-400 font-bold">
              {data.chargingStatus === 'fast-charging' ? 'Hızlı Şarj' :
               data.chargingStatus === 'charging' ? 'Şarj Ediliyor' : 'Deşarj'}
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Battery Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* SOC - State of Charge */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span className="text-xs sm:text-sm text-gray-400">Şarj Durumu</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: getBatteryColor(data.soc) }}>
              {data.soc.toFixed(1)}%
            </div>
          </div>

          <div className="w-full h-3 sm:h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: getBatteryColor(data.soc) }}
              initial={{ width: 0 }}
              animate={{ width: `${data.soc}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
            Tahmini Menzil: <span className="text-white font-bold">{data.rangeKm} km</span>
          </div>

          {data.timeToFull > 0 && (
            <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-blue-400">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Tam şarj: {Math.floor(data.timeToFull / 60)}s {data.timeToFull % 60}dk</span>
            </div>
          )}
        </motion.div>

        {/* SOH - State of Health */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span className="text-xs sm:text-sm text-gray-400">Batarya Sağlığı</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: getHealthColor(data.soh) }}>
              {data.soh}%
            </div>
          </div>

          <div className="w-full h-3 sm:h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: getHealthColor(data.soh) }}
              initial={{ width: 0 }}
              animate={{ width: `${data.soh}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
            Hücre Dengesi: <span className="text-white font-bold">{data.cellBalance}%</span>
          </div>

          {data.soh < 85 && (
            <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-yellow-400">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Batarya bakımı önerilir</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Voltage */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-3 sm:p-4">
          <div className="text-xs text-gray-400 mb-2">Voltaj</div>
          <div className="text-xl sm:text-2xl font-bold text-white">{data.voltage.toFixed(1)}</div>
          <div className="text-xs text-gray-500">V</div>
        </div>

        {/* Current */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-3 sm:p-4">
          <div className="text-xs text-gray-400 mb-2">Akım</div>
          <div className="text-xl sm:text-2xl font-bold text-white">{data.current.toFixed(1)}</div>
          <div className="text-xs text-gray-500">A</div>
        </div>

        {/* Power */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-3 sm:p-4">
          <div className="text-xs text-gray-400 mb-2">Güç</div>
          <div className="text-xl sm:text-2xl font-bold text-white">{data.power.toFixed(2)}</div>
          <div className="text-xs text-gray-500">kW</div>
        </div>

        {/* Temperature */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-3 sm:p-4">
          <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <Thermometer className="w-3 h-3" />
            Sıcaklık
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">{data.temperature.toFixed(1)}</div>
          <div className="text-xs text-gray-500">°C</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setData(prev => ({ ...prev, chargingStatus: 'charging' }))}
          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-blue-400 transition-all"
        >
          Normal Şarj
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setData(prev => ({ ...prev, chargingStatus: 'fast-charging' }))}
          className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-yellow-400 transition-all"
        >
          Hızlı Şarj
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setData(prev => ({ ...prev, chargingStatus: 'idle' }))}
          className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-gray-400 transition-all"
        >
          Durdur
        </motion.button>
      </div>
    </div>
  );
}

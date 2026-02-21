'use client';

/**
 * Tesla-Style Energy & Performance Chart
 * Gerçek zamanlı enerji tüketimi ve performans grafikleri
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, TrendingDown, Activity, Gauge } from 'lucide-react';
import type { OBDData } from '@/types';

interface EnergyChartProps {
  obdData: Partial<OBDData> | null;
}

interface DataPoint {
  time: number;
  consumption: number;
  efficiency: number;
  power: number;
}

export default function EnergyChart({ obdData }: EnergyChartProps) {
  const [history, setHistory] = useState<DataPoint[]>([]);
  const [timeRange, setTimeRange] = useState<'5min' | '30min' | '1h'>('5min');

  // Add data point to history
  useEffect(() => {
    if (!obdData) return;

    const now = Date.now();
    const consumption = obdData.fuelConsumption || 0;
    const efficiency = obdData.efficiency || 0;
    const power = (obdData.rpm || 0) * (obdData.engineLoad || 0) / 100; // Simplified power calculation

    const newPoint: DataPoint = {
      time: now,
      consumption,
      efficiency,
      power,
    };

    setHistory(prev => {
      const updated = [...prev, newPoint];

      // Keep only relevant time range
      const maxAge = timeRange === '5min' ? 5 * 60 * 1000 :
                     timeRange === '30min' ? 30 * 60 * 1000 :
                     60 * 60 * 1000;

      const filtered = updated.filter(p => now - p.time < maxAge);

      // Keep max 100 points for performance
      if (filtered.length > 100) {
        return filtered.slice(-100);
      }

      return filtered;
    });
  }, [obdData, timeRange]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (history.length === 0) {
      return {
        avgConsumption: 0,
        avgEfficiency: 0,
        avgPower: 0,
        trend: 'stable' as 'up' | 'down' | 'stable',
      };
    }

    const avgConsumption = history.reduce((sum, p) => sum + p.consumption, 0) / history.length;
    const avgEfficiency = history.reduce((sum, p) => sum + p.efficiency, 0) / history.length;
    const avgPower = history.reduce((sum, p) => sum + p.power, 0) / history.length;

    // Calculate trend (compare last 25% vs first 25%)
    const quarterLength = Math.floor(history.length / 4);
    const firstQuarter = history.slice(0, quarterLength);
    const lastQuarter = history.slice(-quarterLength);

    const firstAvg = firstQuarter.reduce((sum, p) => sum + p.efficiency, 0) / firstQuarter.length;
    const lastAvg = lastQuarter.reduce((sum, p) => sum + p.efficiency, 0) / lastQuarter.length;

    const trend = lastAvg > firstAvg + 5 ? 'up' :
                  lastAvg < firstAvg - 5 ? 'down' :
                  'stable';

    return { avgConsumption, avgEfficiency, avgPower, trend };
  }, [history]);

  // Normalize data for display (0-100 scale)
  const normalizedData = useMemo(() => {
    if (history.length === 0) return [];

    const maxConsumption = Math.max(...history.map(p => p.consumption), 1);
    const maxPower = Math.max(...history.map(p => p.power), 1);

    return history.map(point => ({
      ...point,
      normalizedConsumption: (point.consumption / maxConsumption) * 100,
      normalizedEfficiency: point.efficiency,
      normalizedPower: (point.power / maxPower) * 100,
    }));
  }, [history]);

  return (
    <div className="h-full flex flex-col bg-black text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Enerji & Performans</h2>
            <p className="text-sm text-gray-400">Gerçek zamanlı analiz</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['5min', '30min', '1h'] as const).map(range => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {range === '5min' ? '5 dk' : range === '30min' ? '30 dk' : '1 sa'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-gray-900 rounded-xl border border-gray-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-yellow-400" />
            <p className="text-sm text-gray-400">Ort. Tüketim</p>
          </div>
          <p className="text-2xl font-bold">{stats.avgConsumption.toFixed(1)}</p>
          <p className="text-xs text-gray-500">L/100km</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-gray-900 rounded-xl border border-gray-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-green-400" />
            <p className="text-sm text-gray-400">Ort. Verimlilik</p>
          </div>
          <p className="text-2xl font-bold">{stats.avgEfficiency.toFixed(0)}%</p>
          <div className="flex items-center gap-1 mt-1">
            {stats.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-400" />}
            {stats.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
            <p className="text-xs text-gray-500">
              {stats.trend === 'up' ? 'Artıyor' : stats.trend === 'down' ? 'Azalıyor' : 'Sabit'}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-gray-900 rounded-xl border border-gray-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <p className="text-sm text-gray-400">Ort. Güç</p>
          </div>
          <p className="text-2xl font-bold">{stats.avgPower.toFixed(0)}</p>
          <p className="text-xs text-gray-500">birim</p>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="flex-1 relative bg-gray-900 rounded-xl p-4 border border-gray-800 overflow-hidden">
        {normalizedData.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Veri bekleniyor...</p>
          </div>
        ) : (
          <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
            {/* Grid lines */}
            <g opacity="0.1">
              {[0, 25, 50, 75, 100].map(y => (
                <line
                  key={y}
                  x1="0"
                  y1={300 - (y / 100) * 300}
                  x2="800"
                  y2={300 - (y / 100) * 300}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Efficiency line (green) */}
            <polyline
              points={normalizedData
                .map((point, index) => {
                  const x = (index / (normalizedData.length - 1 || 1)) * 800;
                  const y = 300 - (point.normalizedEfficiency / 100) * 300;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Consumption line (yellow) */}
            <polyline
              points={normalizedData
                .map((point, index) => {
                  const x = (index / (normalizedData.length - 1 || 1)) * 800;
                  const y = 300 - (point.normalizedConsumption / 100) * 300;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Power line (blue) */}
            <polyline
              points={normalizedData
                .map((point, index) => {
                  const x = (index / (normalizedData.length - 1 || 1)) * 800;
                  const y = 300 - (point.normalizedPower / 100) * 300;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Verimlilik</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>Tüketim</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Güç</span>
          </div>
        </div>
      </div>

      {/* Current Values */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-500">Anlık Tüketim</p>
          <p className="text-lg font-bold text-yellow-400">
            {obdData?.fuelConsumption?.toFixed(1) || '0.0'} L/100km
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Anlık Verimlilik</p>
          <p className="text-lg font-bold text-green-400">
            {obdData?.efficiency?.toFixed(0) || '0'}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Motor Devri</p>
          <p className="text-lg font-bold text-blue-400">
            {obdData?.rpm?.toFixed(0) || '0'} RPM
          </p>
        </div>
      </div>
    </div>
  );
}

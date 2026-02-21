'use client';

// ============================================
// TÜRK OTO AI - Battery Savings Widget
// Akü tasarruf göstergesi widget'ı
// ============================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Zap,
  Battery,
  Leaf,
  TrendingUp,
  Calendar,
  Award,
  Info
} from 'lucide-react';

interface BatterySavings {
  weekly: {
    energySaved: number;
    costSaved: number;
    rangeAdded: number;
    co2Avoided: number;
  };
  monthly: {
    energySaved: number;
    costSaved: number;
    rangeAdded: number;
    co2Avoided: number;
  };
  total: {
    energySaved: number;
    costSaved: number;
    rangeAdded: number;
    co2Avoided: number;
  };
  batteryLife: {
    extensionMonths: number;
    cyclesAvoided: number;
    degradationAvoided: number;
  };
  optimization: {
    optimizedCharges: number;
    totalCharges: number;
    optimizationRate: number;
  };
  health?: {
    soh: number;
    status: string;
    estimatedMonths: number;
  };
}

interface Props {
  vehicleId: string;
  compact?: boolean;
}

export default function BatterySavingsWidget({ vehicleId, compact = false }: Props) {
  const [savings, setSavings] = useState<BatterySavings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'total'>('week');

  useEffect(() => {
    fetchSavings();
  }, [vehicleId]);

  const fetchSavings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/battery/savings?vehicleId=${vehicleId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Veri alınamadı');
      }

      setSavings(data.savings);
    } catch (err: any) {
      console.error('Battery savings fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-2"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !savings) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-red-700">
          <Info className="w-5 h-5" />
          <p>{error || 'Tasarruf verileri yüklenemedi'}</p>
        </div>
      </div>
    );
  }

  const currentData = activeTab === 'week' ? savings.weekly :
                      activeTab === 'month' ? savings.monthly :
                      savings.total;

  const stats = [
    {
      icon: DollarSign,
      label: 'Para Tasarrufu',
      value: currentData.costSaved,
      unit: '₺',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Zap,
      label: 'Enerji Kazancı',
      value: currentData.energySaved,
      unit: 'kWh',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Battery,
      label: 'Ekstra Menzil',
      value: currentData.rangeAdded,
      unit: 'km',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Leaf,
      label: 'CO₂ Azaltma',
      value: currentData.co2Avoided,
      unit: 'kg',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    }
  ];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Akü Tasarrufu
          </h3>
          <span className="text-2xl font-bold text-green-600">
            {currentData.costSaved.toFixed(0)}₺
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <p className="text-gray-600">Enerji</p>
            <p className="font-bold text-yellow-600">{currentData.energySaved.toFixed(1)} kWh</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Menzil</p>
            <p className="font-bold text-blue-600">{currentData.rangeAdded.toFixed(0)} km</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">CO₂</p>
            <p className="font-bold text-emerald-600">{currentData.co2Avoided.toFixed(0)} kg</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-green-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-xl">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            Akü Tasarruf Raporu
          </h2>
          <p className="text-gray-600 mt-1">Optimizasyon ile kazandıklarınız</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchSavings}
          className="bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <TrendingUp className="w-5 h-5 text-green-600" />
        </motion.button>
      </div>

      {/* Period Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'week', label: 'Bu Hafta', icon: Calendar },
          { key: 'month', label: 'Bu Ay', icon: Calendar },
          { key: 'total', label: 'Toplam', icon: Award }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === key
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all"
          >
            <div className={`${stat.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>
              {stat.value.toFixed(stat.unit === '₺' ? 0 : 1)}
              <span className="text-lg ml-1">{stat.unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Battery Life Extension */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="w-5 h-5 text-purple-600" />
            <p className="text-gray-600 text-sm font-medium">Akü Ömrü Uzatma</p>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            +{savings.batteryLife.extensionMonths}
            <span className="text-lg ml-1">ay</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <p className="text-gray-600 text-sm font-medium">Kaçınılan Döngü</p>
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {savings.batteryLife.cyclesAvoided}
            <span className="text-lg ml-1">döngü</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <p className="text-gray-600 text-sm font-medium">Optimizasyon Oranı</p>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {savings.optimization.optimizationRate.toFixed(0)}
            <span className="text-lg ml-1">%</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {savings.optimization.optimizedCharges}/{savings.optimization.totalCharges} şarj
          </p>
        </div>
      </div>

      {/* Battery Health (if available) */}
      {savings.health && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Akü Sağlığı</p>
              <p className="text-3xl font-bold">{savings.health.soh.toFixed(1)}%</p>
              <p className="text-sm opacity-90 mt-1">
                Tahmini Ömür: {savings.health.estimatedMonths} ay
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <p className="text-sm font-medium">{savings.health.status}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

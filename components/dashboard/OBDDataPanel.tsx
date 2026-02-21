'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Gauge,
  Thermometer,
  Fuel,
  Battery,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Download,
  Calendar,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Wrench,
  AlertCircle,
  Target,
  Cpu,
  HardDrive,
  Wind,
  Droplets,
  Power,
  Radio
} from 'lucide-react';

// ==================== TYPES ====================

type MetricCategory = 'engine' | 'temperature' | 'fuel' | 'electrical' | 'performance' | 'diagnostics';

interface OBDMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  category: MetricCategory;
  status: 'normal' | 'warning' | 'critical';
  min: number;
  max: number;
  optimal: number;
  trend: 'up' | 'down' | 'stable';
  history: number[];
}

interface DiagnosticCode {
  code: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: Date;
  resolved: boolean;
}

interface MaintenancePrediction {
  id: string;
  component: string;
  prediction: string;
  confidence: number;
  daysRemaining: number;
  severity: 'info' | 'warning' | 'critical';
  recommendation: string;
  estimatedCost: number;
}

// ==================== MOCK DATA ====================

const generateMockMetrics = (): OBDMetric[] => [
  {
    id: 'rpm',
    name: 'Motor Devir (RPM)',
    value: 2450 + Math.random() * 200,
    unit: 'RPM',
    category: 'engine',
    status: 'normal',
    min: 0,
    max: 7000,
    optimal: 2500,
    trend: 'stable',
    history: Array(20).fill(0).map(() => 2400 + Math.random() * 300)
  },
  {
    id: 'speed',
    name: 'Hız',
    value: 85 + Math.random() * 10,
    unit: 'km/h',
    category: 'engine',
    status: 'normal',
    min: 0,
    max: 220,
    optimal: 90,
    trend: 'up',
    history: Array(20).fill(0).map(() => 80 + Math.random() * 15)
  },
  {
    id: 'engineLoad',
    name: 'Motor Yükü',
    value: 45 + Math.random() * 10,
    unit: '%',
    category: 'engine',
    status: 'normal',
    min: 0,
    max: 100,
    optimal: 50,
    trend: 'stable',
    history: Array(20).fill(0).map(() => 40 + Math.random() * 20)
  },
  {
    id: 'throttle',
    name: 'Gaz Kelebeği',
    value: 35 + Math.random() * 10,
    unit: '%',
    category: 'engine',
    status: 'normal',
    min: 0,
    max: 100,
    optimal: 40,
    trend: 'down',
    history: Array(20).fill(0).map(() => 30 + Math.random() * 20)
  },
  {
    id: 'coolant',
    name: 'Soğutma Sıvısı',
    value: 88 + Math.random() * 4,
    unit: '°C',
    category: 'temperature',
    status: 'normal',
    min: 0,
    max: 120,
    optimal: 90,
    trend: 'stable',
    history: Array(20).fill(0).map(() => 85 + Math.random() * 8)
  },
  {
    id: 'intake',
    name: 'Hava Girişi',
    value: 45 + Math.random() * 5,
    unit: '°C',
    category: 'temperature',
    status: 'normal',
    min: 0,
    max: 100,
    optimal: 50,
    trend: 'stable',
    history: Array(20).fill(0).map(() => 42 + Math.random() * 8)
  },
  {
    id: 'oil',
    name: 'Motor Yağı',
    value: 95 + Math.random() * 5,
    unit: '°C',
    category: 'temperature',
    status: 'warning',
    min: 0,
    max: 150,
    optimal: 90,
    trend: 'up',
    history: Array(20).fill(0).map(() => 90 + Math.random() * 10)
  },
  {
    id: 'fuelLevel',
    name: 'Yakıt Seviyesi',
    value: 68 + Math.random() * 2,
    unit: '%',
    category: 'fuel',
    status: 'normal',
    min: 0,
    max: 100,
    optimal: 70,
    trend: 'down',
    history: Array(20).fill(0).map(() => 70 - Math.random() * 5)
  },
  {
    id: 'fuelConsumption',
    name: 'Anlık Tüketim',
    value: 7.2 + Math.random() * 0.5,
    unit: 'L/100km',
    category: 'fuel',
    status: 'normal',
    min: 0,
    max: 20,
    optimal: 7,
    trend: 'stable',
    history: Array(20).fill(0).map(() => 7 + Math.random() * 1)
  },
  {
    id: 'fuelPressure',
    name: 'Yakıt Basıncı',
    value: 3.8 + Math.random() * 0.2,
    unit: 'bar',
    category: 'fuel',
    status: 'normal',
    min: 0,
    max: 6,
    optimal: 4,
    trend: 'stable',
    history: Array(20).fill(0).map(() => 3.7 + Math.random() * 0.4)
  },
  {
    id: 'battery',
    name: 'Akü Voltajı',
    value: 13.8 + Math.random() * 0.3,
    unit: 'V',
    category: 'electrical',
    status: 'normal',
    min: 0,
    max: 16,
    optimal: 14,
    trend: 'stable',
    history: Array(20).fill(0).map(() => 13.5 + Math.random() * 0.8)
  },
  {
    id: 'horsepower',
    name: 'Anlık Güç',
    value: 145 + Math.random() * 20,
    unit: 'HP',
    category: 'performance',
    status: 'normal',
    min: 0,
    max: 300,
    optimal: 150,
    trend: 'up',
    history: Array(20).fill(0).map(() => 140 + Math.random() * 30)
  },
  {
    id: 'torque',
    name: 'Tork',
    value: 280 + Math.random() * 30,
    unit: 'Nm',
    category: 'performance',
    status: 'normal',
    min: 0,
    max: 500,
    optimal: 300,
    trend: 'stable',
    history: Array(20).fill(0).map(() => 270 + Math.random() * 40)
  },
  {
    id: 'efficiency',
    name: 'Verimlilik Skoru',
    value: 85 + Math.random() * 10,
    unit: '%',
    category: 'performance',
    status: 'normal',
    min: 0,
    max: 100,
    optimal: 90,
    trend: 'up',
    history: Array(20).fill(0).map(() => 80 + Math.random() * 15)
  }
];

const mockDiagnosticCodes: DiagnosticCode[] = [
  {
    code: 'P0128',
    description: 'Soğutma sıvısı termostat - sıcaklık eşiğin altında',
    severity: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    resolved: false
  },
  {
    code: 'P0171',
    description: 'Sistem çok zayıf (Bank 1)',
    severity: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    resolved: true
  }
];

const mockMaintenancePredictions: MaintenancePrediction[] = [
  {
    id: 'oil',
    component: 'Motor Yağı',
    prediction: '~850 km sonra değişim gerekli',
    confidence: 94,
    daysRemaining: 12,
    severity: 'warning',
    recommendation: 'Sentetik motor yağı kullanın (5W-30)',
    estimatedCost: 450
  },
  {
    id: 'brake',
    component: 'Fren Balataları',
    prediction: '~3,200 km sonra değişim gerekli',
    confidence: 87,
    daysRemaining: 45,
    severity: 'info',
    recommendation: 'Orijinal parça kullanımı önerilir',
    estimatedCost: 1200
  },
  {
    id: 'air-filter',
    component: 'Hava Filtresi',
    prediction: '~5,000 km sonra değişim gerekli',
    confidence: 91,
    daysRemaining: 60,
    severity: 'info',
    recommendation: 'Yüksek kaliteli filtre tercih edin',
    estimatedCost: 180
  },
  {
    id: 'battery',
    component: 'Akü',
    prediction: 'Performans düşüşü tespit edildi',
    confidence: 78,
    daysRemaining: 90,
    severity: 'warning',
    recommendation: 'Yük testi yaptırın, gerekirse değiştirin',
    estimatedCost: 850
  }
];

// ==================== COMPONENT ====================

export default function OBDDataPanel() {
  const [metrics, setMetrics] = useState<OBDMetric[]>(generateMockMetrics());
  const [selectedCategory, setSelectedCategory] = useState<MetricCategory | 'all'>('all');
  const [selectedMetric, setSelectedMetric] = useState<OBDMetric | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [diagnosticCodes, setDiagnosticCodes] = useState<DiagnosticCode[]>(mockDiagnosticCodes);
  const [maintenancePredictions, setMaintenancePredictions] = useState<MaintenancePrediction[]>(mockMaintenancePredictions);
  const [viewMode, setViewMode] = useState<'live' | 'diagnostics' | 'maintenance'>('live');

  // Real-time data updates
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const newValue = metric.value + (Math.random() - 0.5) * 10;
        const clampedValue = Math.max(metric.min, Math.min(metric.max, newValue));

        const newHistory = [...metric.history.slice(1), clampedValue];

        let status: 'normal' | 'warning' | 'critical' = 'normal';
        if (clampedValue > metric.optimal * 1.15 || clampedValue < metric.optimal * 0.85) {
          status = 'warning';
        }
        if (clampedValue > metric.optimal * 1.3 || clampedValue < metric.optimal * 0.7) {
          status = 'critical';
        }

        return {
          ...metric,
          value: clampedValue,
          status,
          history: newHistory
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const categories = [
    { id: 'all' as const, name: 'Tümü', icon: Activity, color: 'text-blue-400' },
    { id: 'engine' as const, name: 'Motor', icon: Cpu, color: 'text-purple-400' },
    { id: 'temperature' as const, name: 'Sıcaklık', icon: Thermometer, color: 'text-red-400' },
    { id: 'fuel' as const, name: 'Yakıt', icon: Fuel, color: 'text-yellow-400' },
    { id: 'electrical' as const, name: 'Elektrik', icon: Battery, color: 'text-green-400' },
    { id: 'performance' as const, name: 'Performans', icon: Zap, color: 'text-orange-400' }
  ];

  const filteredMetrics = useMemo(() => {
    if (selectedCategory === 'all') return metrics;
    return metrics.filter(m => m.category === selectedCategory);
  }, [metrics, selectedCategory]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'critical': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-400" />;
      default: return <div className="w-3 h-3 rounded-full bg-gray-500" />;
    }
  };

  const getProgressPercentage = (metric: OBDMetric) => {
    return ((metric.value - metric.min) / (metric.max - metric.min)) * 100;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: isConnected ? 360 : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
          >
            <Radio className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OBD-II Telemetri
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
              <p className="text-sm text-gray-400">
                {isConnected ? 'Canlı Veri Akışı' : 'Bağlantı Kesildi'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsConnected(!isConnected)}
            className={`px-4 py-2 rounded-lg font-medium ${
              isConnected ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
            }`}
          >
            {isConnected ? 'Durdur' : 'Başlat'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Dışa Aktar
          </motion.button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'live' as const, name: 'Canlı Veriler', icon: Activity },
          { id: 'diagnostics' as const, name: 'Tanı Kodları', icon: AlertCircle },
          { id: 'maintenance' as const, name: 'Tahmine Dayalı Bakım', icon: Wrench }
        ].map(mode => (
          <motion.button
            key={mode.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setViewMode(mode.id)}
            className={`flex-1 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              viewMode === mode.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
            }`}
          >
            <mode.icon className="w-5 h-5" />
            {mode.name}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {viewMode === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Category Filter */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <cat.icon className={`w-4 h-4 ${cat.color}`} />
                    {cat.name}
                  </motion.button>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedMetric(metric)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      metric.status === 'critical' ? 'bg-red-500/10 border border-red-500/30' :
                      metric.status === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/30' :
                      'bg-gray-800/50 border border-gray-700/30'
                    } hover:shadow-lg`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(metric.status)}
                        <h3 className="font-semibold text-sm">{metric.name}</h3>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-bold">{metric.value.toFixed(1)}</span>
                      <span className="text-gray-400 text-sm">{metric.unit}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage(metric)}%` }}
                        className={`h-full ${
                          metric.status === 'critical' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          metric.status === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                          'bg-gradient-to-r from-blue-500 to-purple-600'
                        }`}
                      />
                      {/* Optimal marker */}
                      <div
                        className="absolute top-0 w-1 h-full bg-green-400"
                        style={{ left: `${((metric.optimal - metric.min) / (metric.max - metric.min)) * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{metric.min}</span>
                      <span className="text-green-400">Optimal: {metric.optimal}</span>
                      <span>{metric.max}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {viewMode === 'diagnostics' && (
            <motion.div
              key="diagnostics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                  Tanı Kodları (DTC)
                </h2>

                {diagnosticCodes.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-green-400">Hata Kodu Bulunamadı</p>
                    <p className="text-gray-400 mt-2">Araç sistemleri normal çalışıyor</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {diagnosticCodes.map((code, index) => (
                      <motion.div
                        key={code.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          code.resolved
                            ? 'bg-gray-700/30 border-gray-600/30'
                            : code.severity === 'critical'
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-yellow-500/10 border-yellow-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            {code.resolved ? (
                              <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                            ) : code.severity === 'critical' ? (
                              <XCircle className="w-5 h-5 text-red-400 mt-1" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-lg">{code.code}</span>
                                {code.resolved && (
                                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                    Çözüldü
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-300 mb-2">{code.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {code.timestamp.toLocaleDateString('tr-TR')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {code.timestamp.toLocaleTimeString('tr-TR')}
                                </div>
                              </div>
                            </div>
                          </div>
                          {!code.resolved && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium"
                            >
                              Çöz
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {viewMode === 'maintenance' && (
            <motion.div
              key="maintenance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-400" />
                  AI Tahmine Dayalı Bakım Sistemi
                </h2>

                <div className="space-y-4">
                  {maintenancePredictions.map((prediction, index) => (
                    <motion.div
                      key={prediction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-5 rounded-xl border ${
                        prediction.severity === 'critical'
                          ? 'bg-red-500/10 border-red-500/30'
                          : prediction.severity === 'warning'
                          ? 'bg-yellow-500/10 border-yellow-500/30'
                          : 'bg-blue-500/10 border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Wrench className={`w-6 h-6 mt-1 ${
                            prediction.severity === 'critical' ? 'text-red-400' :
                            prediction.severity === 'warning' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`} />
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-1">{prediction.component}</h3>
                            <p className="text-gray-300 mb-2">{prediction.prediction}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-gray-700 rounded-full h-2 w-32">
                                  <div
                                    className={`h-full rounded-full ${
                                      prediction.confidence >= 90 ? 'bg-green-500' :
                                      prediction.confidence >= 80 ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${prediction.confidence}%` }}
                                  />
                                </div>
                                <span className="text-gray-400">%{prediction.confidence} güven</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            prediction.daysRemaining < 15 ? 'text-red-400' :
                            prediction.daysRemaining < 30 ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {prediction.daysRemaining} gün
                          </div>
                          <div className="text-sm text-gray-400">kaldı</div>
                        </div>
                      </div>

                      <div className="bg-gray-900/50 rounded-lg p-4 mb-3">
                        <div className="flex items-start gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-blue-400 mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-blue-400 mb-1">Öneri</p>
                            <p className="text-sm text-gray-300">{prediction.recommendation}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-400">Tahmini Maliyet: </span>
                          <span className="font-bold text-green-400">₺{prediction.estimatedCost.toLocaleString('tr-TR')}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-medium"
                        >
                          Randevu Al
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

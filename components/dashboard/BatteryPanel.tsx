'use client';

// ============================================
// TÜRK OTO AI - Battery Optimizer Dashboard Panel
// Integrated version for main dashboard
// ============================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Battery,
  Zap,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Thermometer,
  Activity,
  Clock,
  Leaf,
  Award,
  Info,
  ChevronRight,
  BatteryCharging,
  Sun,
  Moon
} from 'lucide-react';
import BatterySavingsWidget from '@/components/BatterySavingsWidget';
import AkuBot from '@/components/AkuBot';

export default function BatteryPanel() {
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [batteryHealth, setBatteryHealth] = useState<any>(null);
  const [chargingRecommendations, setChargingRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, get vehicle ID from user session/selection
    // For now, we'll simulate it
    const mockVehicleId = 'vehicle_123';
    setVehicleId(mockVehicleId);

    fetchBatteryHealth(mockVehicleId);
    fetchChargingRecommendations(mockVehicleId);
  }, []);

  const fetchBatteryHealth = async (vehicleId: string) => {
    try {
      const response = await fetch(`/api/battery/health?vehicleId=${vehicleId}`);
      const data = await response.json();

      if (data.success) {
        setBatteryHealth(data.current);
      }
    } catch (error) {
      console.error('Battery health fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChargingRecommendations = async (vehicleId: string) => {
    try {
      const response = await fetch(`/api/battery/charging?vehicleId=${vehicleId}&action=recommendations`);
      const data = await response.json();

      if (data.success) {
        setChargingRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Recommendations fetch error:', error);
    }
  };

  const getHealthColor = (soh: number) => {
    if (soh >= 95) return 'text-green-600';
    if (soh >= 85) return 'text-blue-600';
    if (soh >= 70) return 'text-yellow-600';
    if (soh >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (soh: number) => {
    if (soh >= 95) return 'bg-green-100';
    if (soh >= 85) return 'bg-blue-100';
    if (soh >= 70) return 'bg-yellow-100';
    if (soh >= 50) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'URGENT': return AlertCircle;
      case 'WARNING': return AlertCircle;
      case 'INFO': return Info;
      case 'COST': return DollarSign;
      case 'SAVINGS': return TrendingUp;
      default: return Info;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-2xl">
              <Battery className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Akü Optimizasyonu
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Yapay Zeka Destekli Akü Yönetimi ve Tasarruf Sistemi
          </p>
        </motion.div>
      </div>

      {/* Battery Savings Widget */}
      {vehicleId && (
        <div className="mb-6">
          <BatterySavingsWidget vehicleId={vehicleId} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Battery Health Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Akü Sağlık Durumu
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Detaylar
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-gray-200 rounded-2xl"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-gray-200 rounded-xl"></div>
                <div className="h-24 bg-gray-200 rounded-xl"></div>
                <div className="h-24 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          ) : batteryHealth ? (
            <>
              {/* SOH Gauge */}
              <div className="relative mb-6">
                <div className={`${getHealthBgColor(batteryHealth.soh)} rounded-2xl p-8 text-center`}>
                  <p className="text-gray-600 text-sm mb-2">State of Health (SOH)</p>
                  <p className={`text-6xl font-bold ${getHealthColor(batteryHealth.soh)}`}>
                    {batteryHealth.soh.toFixed(1)}%
                  </p>
                  <p className="text-gray-600 mt-2">{batteryHealth.status}</p>
                </div>
              </div>

              {/* Health Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <Battery className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Şarj Seviyesi</p>
                  <p className="text-xl font-bold text-blue-600">{batteryHealth.soc}%</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <Activity className="w-5 h-5 text-purple-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Döngü Sayısı</p>
                  <p className="text-xl font-bold text-purple-600">{batteryHealth.cycleCount}</p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4">
                  <Thermometer className="w-5 h-5 text-yellow-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Sıcaklık</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {batteryHealth.batteryTemp?.toFixed(1)}°C
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <Zap className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Voltaj</p>
                  <p className="text-xl font-bold text-green-600">
                    {batteryHealth.voltage?.toFixed(1)}V
                  </p>
                </div>
              </div>

              {/* Warnings */}
              {batteryHealth.warnings && batteryHealth.warnings.length > 0 && (
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800 mb-2">Uyarılar</p>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        {batteryHealth.warnings.map((warning: string, i: number) => (
                          <li key={i}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Battery className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Akü sağlık verileri yükleniyor...</p>
            </div>
          )}
        </motion.div>

        {/* Recommendations Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-yellow-600" />
            Öneriler
          </h2>

          <div className="space-y-4">
            {chargingRecommendations.length > 0 ? (
              chargingRecommendations.map((rec, index) => {
                const Icon = getRecommendationIcon(rec.type);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-xl p-4 border-2 ${
                      rec.color === 'red' ? 'bg-red-50 border-red-200' :
                      rec.color === 'orange' ? 'bg-orange-50 border-orange-200' :
                      rec.color === 'green' ? 'bg-green-50 border-green-200' :
                      rec.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        rec.color === 'red' ? 'text-red-600' :
                        rec.color === 'orange' ? 'text-orange-600' :
                        rec.color === 'green' ? 'text-green-600' :
                        rec.color === 'blue' ? 'text-blue-600' :
                        'text-gray-600'
                      }`} />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-1">{rec.title}</p>
                        <p className="text-sm text-gray-600">{rec.message}</p>
                        {rec.optimalTime && (
                          <div className="mt-2 flex items-center gap-2 text-xs text-gray-700">
                            <Clock className="w-3 h-3" />
                            <span>Optimal: {rec.optimalTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Info className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Şu an öneriniz yok</p>
                <p className="text-xs mt-1">Tüm parametreler optimal durumda</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <BatteryCharging className="w-5 h-5" />
              Şarjı Başlat
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-gray-300 transition-all flex items-center justify-center gap-2"
            >
              <Activity className="w-5 h-5" />
              Sağlık Analizi
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: BatteryCharging,
            title: 'Akıllı Şarj',
            description: '80/20 kuralı ve fiyat optimizasyonu',
            color: 'from-green-500 to-emerald-600',
            stats: '30-40% tasarruf'
          },
          {
            icon: TrendingUp,
            title: 'AI Menzil Tahmini',
            description: 'Çok faktörlü yapay zeka analizi',
            color: 'from-blue-500 to-cyan-600',
            stats: '%95 doğruluk'
          },
          {
            icon: Thermometer,
            title: 'Termal Yönetim',
            description: 'Optimal sıcaklık kontrolü',
            color: 'from-orange-500 to-red-600',
            stats: '20-25°C ideal'
          },
          {
            icon: Leaf,
            title: 'Eko Sürüş Koçu',
            description: 'Gerçek zamanlı tasarruf önerileri',
            color: 'from-emerald-500 to-green-600',
            stats: '15-25% verim'
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
          >
            <div className={`bg-gradient-to-br ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                {feature.stats}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AküBot AI Assistant */}
      {vehicleId && <AkuBot vehicleId={vehicleId} />}
    </div>
  );
}

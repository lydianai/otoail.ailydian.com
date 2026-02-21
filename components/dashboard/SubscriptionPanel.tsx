'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Star,
  Zap,
  Shield,
  Check,
  X,
  CreditCard,
  Calendar,
  TrendingUp,
  Users,
  Sparkles,
  Rocket,
  Award,
  ChevronRight,
  Gift,
  Percent,
  Bell,
  Lock,
  Unlock,
  Download,
  BarChart3,
  MessageCircle,
  Car,
  Cpu,
  Cloud,
  Database,
  Radio,
  Settings,
  Target,
  Clock
} from 'lucide-react';

// ==================== TYPES ====================

interface SubscriptionTier {
  id: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  description: string;
  features: Feature[];
  highlighted: boolean;
  color: string;
  icon: typeof Crown;
}

interface Feature {
  name: string;
  included: boolean;
  description?: string;
}

interface BillingHistory {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoice: string;
}

interface UsageStats {
  obdDataPoints: { used: number; limit: number | null };
  apiCalls: { used: number; limit: number | null };
  storage: { used: number; limit: number | null };
  vehicles: { used: number; limit: number | null };
}

// ==================== MOCK DATA ====================

const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'FREE',
    name: 'Ücretsiz',
    price: 0,
    billing: 'monthly',
    description: 'Temel özelliklerle başlayın',
    highlighted: false,
    color: 'gray',
    icon: Shield,
    features: [
      { name: '1 Araç Kaydı', included: true },
      { name: 'Temel OBD Verileri', included: true },
      { name: 'Günlük İstatistikler', included: true },
      { name: 'Topluluk Erişimi', included: true, description: 'Sadece okuma' },
      { name: 'Sesli Asistan', included: false },
      { name: 'Gelişmiş Navigasyon', included: false },
      { name: 'Tahmine Dayalı Bakım', included: false },
      { name: 'Öncelikli Destek', included: false },
      { name: 'API Erişimi', included: false },
      { name: 'Veri İhracatı', included: false }
    ]
  },
  {
    id: 'PREMIUM',
    name: 'Premium',
    price: 149.99,
    billing: 'monthly',
    description: 'Tüm premium özelliklerin kilidini açın',
    highlighted: true,
    color: 'purple',
    icon: Star,
    features: [
      { name: '5 Araç Kaydı', included: true },
      { name: 'Gelişmiş OBD Telemetri', included: true },
      { name: 'Gerçek Zamanlı Veriler', included: true },
      { name: 'Topluluk Tam Erişim', included: true },
      { name: 'AI Sesli Asistan', included: true },
      { name: 'Quantum Navigasyon', included: true },
      { name: 'Tahmine Dayalı Bakım', included: true },
      { name: 'Öncelikli Destek', included: true },
      { name: 'Temel API Erişimi', included: true, description: '10,000 istek/ay' },
      { name: 'CSV Veri İhracatı', included: true }
    ]
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: 499.99,
    billing: 'monthly',
    description: 'İşletmeler için sınırsız güç',
    highlighted: false,
    color: 'yellow',
    icon: Crown,
    features: [
      { name: 'Sınırsız Araç', included: true },
      { name: 'Ultra OBD Telemetri', included: true },
      { name: 'Özel Raporlama', included: true },
      { name: 'Topluluk Yönetim', included: true },
      { name: 'Kurumsal AI Asistan', included: true },
      { name: 'Özel Rota Optimizasyonu', included: true },
      { name: 'İleri Tahmin Sistemi', included: true },
      { name: '7/24 Özel Destek', included: true },
      { name: 'Sınırsız API Erişimi', included: true },
      { name: 'Tüm Format Veri İhracatı', included: true },
      { name: 'Özel Entegrasyonlar', included: true },
      { name: 'SLA Garantisi', included: true }
    ]
  }
];

const mockBillingHistory: BillingHistory[] = [
  {
    id: '1',
    date: new Date('2024-11-01'),
    amount: 149.99,
    status: 'paid',
    invoice: 'INV-2024-001'
  },
  {
    id: '2',
    date: new Date('2024-10-01'),
    amount: 149.99,
    status: 'paid',
    invoice: 'INV-2024-002'
  },
  {
    id: '3',
    date: new Date('2024-09-01'),
    amount: 149.99,
    status: 'paid',
    invoice: 'INV-2024-003'
  }
];

const mockUsageStats: UsageStats = {
  obdDataPoints: { used: 45820, limit: 100000 },
  apiCalls: { used: 7340, limit: 10000 },
  storage: { used: 2.4, limit: 10 },
  vehicles: { used: 2, limit: 5 }
};

// ==================== COMPONENT ====================

export default function SubscriptionPanel() {
  const [currentTier, setCurrentTier] = useState<'FREE' | 'PREMIUM' | 'ENTERPRISE'>('PREMIUM');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedTab, setSelectedTab] = useState<'plans' | 'billing' | 'usage'>('plans');
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>(mockBillingHistory);
  const [usageStats, setUsageStats] = useState<UsageStats>(mockUsageStats);

  const getDiscountedPrice = (price: number) => {
    return billingCycle === 'yearly' ? price * 12 * 0.8 : price;
  };

  const getProgressPercentage = (used: number, limit: number | null) => {
    if (limit === null) return 0;
    return (used / limit) * 100;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'from-red-500 to-red-600';
    if (percentage >= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl"
          >
            <Crown className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Abonelik Yönetimi
            </h1>
            <p className="text-sm text-gray-400">Premium özellikleri keşfedin</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-lg font-bold ${
            currentTier === 'ENTERPRISE' ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
            currentTier === 'PREMIUM' ? 'bg-gradient-to-r from-purple-500 to-blue-600' :
            'bg-gray-700'
          }`}>
            {currentTier}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'plans' as const, name: 'Planlar', icon: Star },
          { id: 'billing' as const, name: 'Faturalama', icon: CreditCard },
          { id: 'usage' as const, name: 'Kullanım', icon: BarChart3 }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.name}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {selectedTab === 'plans' && (
            <motion.div
              key="plans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className={`font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
                  Aylık
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    billingCycle === 'yearly' ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: billingCycle === 'yearly' ? 32 : 0 }}
                    className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  />
                </motion.button>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
                    Yıllık
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-bold">
                    20% indirim
                  </span>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionTiers.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative rounded-2xl p-6 border ${
                      tier.highlighted
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500 shadow-2xl shadow-purple-500/50 scale-105'
                        : 'bg-gray-800/50 border-gray-700'
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-sm font-bold">
                          En Popüler
                        </span>
                      </div>
                    )}

                    {currentTier === tier.id && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 rounded-full p-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <tier.icon className={`w-12 h-12 mx-auto mb-4 text-${tier.color}-400`} />
                      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">
                          ₺{getDiscountedPrice(tier.price).toFixed(2)}
                        </span>
                        <span className="text-gray-400">/{billingCycle === 'monthly' ? 'ay' : 'yıl'}</span>
                      </div>
                      {billingCycle === 'yearly' && tier.price > 0 && (
                        <div className="mt-2 text-sm text-gray-400 line-through">
                          ₺{(tier.price * 12).toFixed(2)}/yıl
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                              {feature.name}
                            </span>
                            {feature.description && (
                              <p className="text-xs text-gray-500 mt-0.5">{feature.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-bold ${
                        currentTier === tier.id
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : tier.highlighted
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                      disabled={currentTier === tier.id}
                    >
                      {currentTier === tier.id ? 'Mevcut Plan' : tier.id === 'FREE' ? 'Düşür' : 'Yükselt'}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'billing' && (
            <motion.div
              key="billing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Payment Method */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                  Ödeme Yöntemi
                </h2>
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-400">Son kullanma: 12/2025</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-medium"
                  >
                    Güncelle
                  </motion.button>
                </div>
              </div>

              {/* Next Billing */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  Sonraki Fatura
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">₺149.99</p>
                    <p className="text-gray-400 mt-1">1 Aralık 2024</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-medium"
                  >
                    İptal Et
                  </motion.button>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-purple-400" />
                  Fatura Geçmişi
                </h2>
                <div className="space-y-3">
                  {billingHistory.map((bill, index) => (
                    <motion.div
                      key={bill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          bill.status === 'paid' ? 'bg-green-400' :
                          bill.status === 'pending' ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`} />
                        <div>
                          <p className="font-semibold">{bill.invoice}</p>
                          <p className="text-sm text-gray-400">{bill.date.toLocaleDateString('tr-TR')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-xl font-bold">₺{bill.amount.toFixed(2)}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gray-700 rounded-lg font-medium flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          İndir
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'usage' && (
            <motion.div
              key="usage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'OBD Veri Noktaları',
                    icon: Radio,
                    used: usageStats.obdDataPoints.used,
                    limit: usageStats.obdDataPoints.limit,
                    unit: 'veri noktası'
                  },
                  {
                    name: 'API Çağrıları',
                    icon: Cloud,
                    used: usageStats.apiCalls.used,
                    limit: usageStats.apiCalls.limit,
                    unit: 'istek'
                  },
                  {
                    name: 'Depolama',
                    icon: Database,
                    used: usageStats.storage.used,
                    limit: usageStats.storage.limit,
                    unit: 'GB'
                  },
                  {
                    name: 'Kayıtlı Araçlar',
                    icon: Car,
                    used: usageStats.vehicles.used,
                    limit: usageStats.vehicles.limit,
                    unit: 'araç'
                  }
                ].map((stat, index) => {
                  const percentage = stat.limit ? getProgressPercentage(stat.used, stat.limit) : 0;
                  return (
                    <motion.div
                      key={stat.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <stat.icon className="w-8 h-8 text-purple-400" />
                          <h3 className="font-bold text-lg">{stat.name}</h3>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Kullanım</span>
                          <span className="font-semibold">
                            {stat.used.toLocaleString('tr-TR')} {stat.limit ? `/ ${stat.limit.toLocaleString('tr-TR')}` : ''} {stat.unit}
                          </span>
                        </div>
                        {stat.limit && (
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${getProgressColor(percentage)}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        )}
                      </div>

                      {stat.limit && percentage >= 80 && (
                        <div className="flex items-center gap-2 mt-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                          <Bell className="w-4 h-4 text-yellow-400" />
                          <p className="text-sm text-yellow-400">Limite yaklaşıyorsunuz</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {currentTier !== 'ENTERPRISE' && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30">
                  <div className="flex items-start gap-4">
                    <Rocket className="w-12 h-12 text-purple-400" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Daha Fazla Kapasiteye mi İhtiyacınız Var?</h3>
                      <p className="text-gray-400 mb-4">
                        Enterprise planına yükseltin ve sınırsız kullanımın keyfini çıkarın
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTab('plans')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-bold flex items-center gap-2"
                      >
                        Planları İncele
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

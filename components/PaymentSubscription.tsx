'use client';

// FAZ 11: Payment & Subscription System

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Shield, Zap, Crown } from 'lucide-react';

export default function PaymentSubscription() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'pro'>('free');

  const plans = [
    {
      id: 'free',
      name: 'Ücretsiz',
      price: 0,
      features: ['Temel OBD Verileri', 'Sesli Asistan (Sınırlı)', '10 Navigasyon/Ay'],
      color: 'from-gray-500 to-gray-700'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99,
      features: ['Tüm OBD Verileri', 'Sınırsız Sesli Asistan', 'Sınırsız Navigasyon', 'Bakım Tahmini'],
      color: 'from-[#E30A17] to-red-700',
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 199,
      features: ['Premium +', 'Topluluk Özellikleri', 'Özel Destek', 'API Erişimi', 'Çoklu Araç'],
      color: 'from-purple-500 to-purple-700'
    },
  ];

  return (
    <div className="h-full p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-gray-900 mb-4">Planınızı Seçin</h2>
          <p className="text-xl text-gray-600">Her bütçeye uygun seçenekler</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedPlan(plan.id as any)}
              className={`relative p-8 rounded-3xl cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'bg-white shadow-2xl ring-4 ring-purple-500'
                  : 'bg-white shadow-xl'
              } ${plan.popular ? 'border-4 border-[#E30A17]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-[#E30A17] text-white font-bold text-sm shadow-lg">
                  En Popüler
                </div>
              )}

              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                {plan.id === 'pro' && <Crown className="w-8 h-8 text-white" />}
                {plan.id === 'premium' && <Zap className="w-8 h-8 text-white" />}
                {plan.id === 'free' && <Shield className="w-8 h-8 text-white" />}
              </div>

              <h3 className="text-3xl font-black text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">{plan.price}₺</span>
                <span className="text-gray-500">/ay</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-full font-bold shadow-lg transition-all ${
                  selectedPlan === plan.id
                    ? `bg-gradient-to-r ${plan.color} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === plan.id ? 'Seçildi' : 'Seç'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

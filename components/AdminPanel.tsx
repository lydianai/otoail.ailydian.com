'use client';

// FAZ 12: Admin Panel

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Car, Activity, DollarSign, TrendingUp, Settings } from 'lucide-react';

export default function AdminPanel() {
  const stats = [
    { label: 'Toplam Kullanıcı', value: '10,245', icon: Users, color: 'blue' },
    { label: 'Aktif Araçlar', value: '8,432', icon: Car, color: 'green' },
    { label: 'Aylık Gelir', value: '₺485K', icon: DollarSign, color: 'purple' },
    { label: 'Sistem Sağlığı', value: '99.8%', icon: Activity, color: 'red' },
  ];

  return (
    <div className="h-full p-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-4xl font-black text-gray-900 mb-2">Admin Panel</h2>
        <p className="text-gray-600">Sistem yönetimi ve izleme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="text-2xl font-black text-gray-900 mb-4">Son Kullanıcılar</h3>
          <div className="space-y-3">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                  U{i}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Kullanıcı {i}</div>
                  <div className="text-sm text-gray-500">user{i}@example.com</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="text-2xl font-black text-gray-900 mb-4">Sistem Durumu</h3>
          <div className="space-y-4">
            {[
              { service: 'API Server', status: 'Online', uptime: '99.9%' },
              { service: 'Database', status: 'Online', uptime: '99.8%' },
              { service: 'OBD Service', status: 'Online', uptime: '98.5%' },
              { service: 'AI Service', status: 'Online', uptime: '99.2%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <div className="font-bold text-gray-900">{item.service}</div>
                  <div className="text-sm text-gray-500">Uptime: {item.uptime}</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

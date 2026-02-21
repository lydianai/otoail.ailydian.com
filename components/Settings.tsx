'use client';

// ============================================
// TÜRK OTO AI - Settings Component
// Premium settings interface
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon, Bell, Shield, Globe, Palette, Volume2,
  Navigation, User, Car, Bluetooth, Wifi, Database, Clock, Map,
  Battery, Zap, Sun, Moon, Monitor
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'privacy'>('general');

  const [settings, setSettings] = useState({
    general: {
      language: 'tr',
      units: 'metric',
      autoStart: true,
      soundEnabled: true,
      voiceVolume: 80,
    },
    appearance: {
      theme: 'dark',
      accentColor: '#E30A17',
      fontSize: 'medium',
      animations: true,
    },
    notifications: {
      maintenanceAlerts: true,
      trafficUpdates: true,
      fuelWarnings: true,
      performanceReports: true,
      weeklyDigest: true,
    },
    privacy: {
      shareLocation: false,
      shareDrivingData: false,
      analytics: true,
      crashReports: true,
    },
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <div className="h-full p-6 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Ayarlar</h2>
              <p className="text-gray-500">Uygulamayı istediğiniz gibi özelleştirin</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'general', label: 'Genel', icon: SettingsIcon },
              { id: 'appearance', label: 'Görünüm', icon: Palette },
              { id: 'notifications', label: 'Bildirimler', icon: Bell },
              { id: 'privacy', label: 'Gizlilik', icon: Shield },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#E30A17] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Dil & Bölge
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dil</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] outline-none font-semibold"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Birimler</label>
                  <select
                    value={settings.general.units}
                    onChange={(e) => handleSettingChange('general', 'units', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] outline-none font-semibold"
                  >
                    <option value="metric">Metrik (km, L)</option>
                    <option value="imperial">Imperial (mi, gal)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Ses & Sesli Asistan
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div>
                    <p className="font-bold text-gray-900">Ses Etkin</p>
                    <p className="text-sm text-gray-500">Sistem seslerini aç/kapat</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('general', 'soundEnabled', !settings.general.soundEnabled)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      settings.general.soundEnabled ? 'bg-[#E30A17]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                      settings.general.soundEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sesli Asistan Ses Seviyesi: {settings.general.voiceVolume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.general.voiceVolume}
                    onChange={(e) => handleSettingChange('general', 'voiceVolume', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Tema & Renkler
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { id: 'light', name: 'Açık', icon: Sun },
                  { id: 'dark', name: 'Koyu', icon: Moon },
                  { id: 'auto', name: 'Otomatik', icon: Monitor },
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleSettingChange('appearance', 'theme', theme.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      settings.appearance.theme === theme.id
                        ? 'border-[#E30A17] bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <theme.icon className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                    <p className="font-bold text-sm">{theme.name}</p>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vurgu Rengi</label>
                <div className="flex gap-3">
                  {['#E30A17', '#2563eb', '#16a34a', '#9333ea', '#f59e0b'].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleSettingChange('appearance', 'accentColor', color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        settings.appearance.accentColor === color ? 'border-gray-900 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Settings */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Bildirim Tercihleri
            </h3>
            <div className="space-y-3">
              {[
                { key: 'maintenanceAlerts', label: 'Bakım Uyarıları', desc: 'Araç bakım zamanı geldiğinde bildirim' },
                { key: 'trafficUpdates', label: 'Trafik Güncellemeleri', desc: 'Gerçek zamanlı trafik bildirimleri' },
                { key: 'fuelWarnings', label: 'Yakıt Uyarıları', desc: 'Yakıt seviyesi düştüğünde uyar' },
                { key: 'performanceReports', label: 'Performans Raporları', desc: 'Haftalık sürüş performans özeti' },
                { key: 'weeklyDigest', label: 'Haftalık Özet', desc: 'Haftalık aktivite özeti' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div>
                    <p className="font-bold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('notifications', item.key, !settings.notifications[item.key as keyof typeof settings.notifications])}
                    className={`w-14 h-8 rounded-full transition-all ${
                      settings.notifications[item.key as keyof typeof settings.notifications] ? 'bg-[#E30A17]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                      settings.notifications[item.key as keyof typeof settings.notifications] ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Gizlilik & Güvenlik
            </h3>
            <div className="space-y-3">
              {[
                { key: 'shareLocation', label: 'Konum Paylaşımı', desc: 'Konum verilerini topluluk ile paylaş' },
                { key: 'shareDrivingData', label: 'Sürüş Verisi Paylaşımı', desc: 'Sürüş istatistiklerini paylaş' },
                { key: 'analytics', label: 'Analitik', desc: 'Uygulamayı iyileştirmek için kullanım verisi topla' },
                { key: 'crashReports', label: 'Çökme Raporları', desc: 'Hata raporlarını otomatik gönder' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div>
                    <p className="font-bold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('privacy', item.key, !settings.privacy[item.key as keyof typeof settings.privacy])}
                    className={`w-14 h-8 rounded-full transition-all ${
                      settings.privacy[item.key as keyof typeof settings.privacy] ? 'bg-[#E30A17]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                      settings.privacy[item.key as keyof typeof settings.privacy] ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E30A17] to-red-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
        >
          Ayarları Kaydet
        </motion.button>
      </div>
    </div>
  );
}

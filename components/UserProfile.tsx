'use client';

// ============================================
// FAZ 9: User Profile & Settings Component
// Advanced user management with avatar upload
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X,
  Camera, Shield, Bell, Globe, Eye, Lock, Smartphone,
  Upload, Check, AlertCircle
} from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  avatar: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    plate: string;
  };
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'privacy'>('profile');
  const [userData, setUserData] = useState<UserData>({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 532 123 45 67',
    location: 'İstanbul, Türkiye',
    birthDate: '1990-05-15',
    avatar: '',
    vehicleInfo: {
      make: 'TOGG',
      model: 'T10X',
      year: 2024,
      plate: '34 ABC 123'
    }
  });

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      maintenance: true,
      traffic: true,
      achievements: true,
    },
    privacy: {
      shareLocation: true,
      shareDrivingData: false,
      publicProfile: false,
    },
    language: 'tr',
    theme: 'light',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save to backend
    console.log('Saving user data:', userData);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Ayarlar', icon: Bell },
    { id: 'privacy', label: 'Gizlilik', icon: Shield },
  ] as const;

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Profil & Ayarlar</h2>
            <p className="text-gray-500">Hesap bilgilerinizi yönetin</p>
          </div>
          {activeTab === 'profile' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-6 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 ${
                isEditing
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-[#E30A17] hover:bg-red-700 text-white'
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  <span>Kaydet</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  <span>Düzenle</span>
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b-2 border-gray-200">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-bold rounded-t-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-[#E30A17] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Avatar Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-black text-gray-900 mb-6">Profil Fotoğrafı</h3>
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#E30A17] to-red-700 flex items-center justify-center overflow-hidden shadow-2xl">
                    {userData.avatar ? (
                      <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-20 h-20 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <Camera className="w-10 h-10 text-white" />
                    </label>
                  )}
                </div>
                <h4 className="text-2xl font-black text-gray-900 mt-4">{userData.name}</h4>
                <p className="text-gray-500">{userData.email}</p>
              </div>
            </div>

            {/* Personal Info */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-black text-gray-900 mb-6">Kişisel Bilgiler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <User className="w-4 h-4 text-[#E30A17]" />
                    İsim Soyisim
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-[#E30A17]" />
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-[#E30A17]" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-[#E30A17]" />
                    Konum
                  </label>
                  <input
                    type="text"
                    value={userData.location}
                    onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-[#E30A17]" />
                    Doğum Tarihi
                  </label>
                  <input
                    type="date"
                    value={userData.birthDate}
                    onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>
              </div>

              {/* Vehicle Info */}
              <h3 className="text-xl font-black text-gray-900 mt-8 mb-6">Araç Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Marka</label>
                  <input
                    type="text"
                    value={userData.vehicleInfo.make}
                    onChange={(e) => setUserData({
                      ...userData,
                      vehicleInfo: { ...userData.vehicleInfo, make: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Model</label>
                  <input
                    type="text"
                    value={userData.vehicleInfo.model}
                    onChange={(e) => setUserData({
                      ...userData,
                      vehicleInfo: { ...userData.vehicleInfo, model: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Yıl</label>
                  <input
                    type="number"
                    value={userData.vehicleInfo.year}
                    onChange={(e) => setUserData({
                      ...userData,
                      vehicleInfo: { ...userData.vehicleInfo, year: parseInt(e.target.value) }
                    })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">Plaka</label>
                  <input
                    type="text"
                    value={userData.vehicleInfo.plate}
                    onChange={(e) => setUserData({
                      ...userData,
                      vehicleInfo: { ...userData.vehicleInfo, plate: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium disabled:bg-gray-100 transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-black text-gray-900 mb-8">Bildirim Ayarları</h3>

            <div className="space-y-6">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#E30A17]" />
                    <div>
                      <p className="font-bold text-gray-900 capitalize">
                        {key === 'email' && 'E-posta Bildirimleri'}
                        {key === 'push' && 'Push Bildirimleri'}
                        {key === 'sms' && 'SMS Bildirimleri'}
                        {key === 'maintenance' && 'Bakım Hatırlatmaları'}
                        {key === 'traffic' && 'Trafik Uyarıları'}
                        {key === 'achievements' && 'Başarım Bildirimleri'}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-block w-14 h-8">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, [key]: e.target.checked }
                      })}
                      className="peer sr-only"
                    />
                    <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-[#E30A17] transition-all cursor-pointer"></div>
                    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-8">Genel Ayarlar</h3>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Globe className="w-4 h-4 text-[#E30A17]" />
                  Dil
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium transition-all"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Eye className="w-4 h-4 text-[#E30A17]" />
                  Tema
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E30A17] focus:outline-none font-medium transition-all"
                >
                  <option value="light">Açık</option>
                  <option value="dark">Koyu</option>
                  <option value="auto">Otomatik</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'privacy' && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-black text-gray-900 mb-8">Gizlilik Ayarları</h3>

            <div className="space-y-6">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#E30A17]" />
                    <div>
                      <p className="font-bold text-gray-900 capitalize">
                        {key === 'shareLocation' && 'Konum Paylaşımı'}
                        {key === 'shareDrivingData' && 'Sürüş Verilerini Paylaş'}
                        {key === 'publicProfile' && 'Herkese Açık Profil'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {key === 'shareLocation' && 'Konumunuzu diğer kullanıcılarla paylaşın'}
                        {key === 'shareDrivingData' && 'Sürüş verilerinizi analiz için paylaşın'}
                        {key === 'publicProfile' && 'Profilinizi herkese görünür yapın'}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-block w-14 h-8">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, [key]: e.target.checked }
                      })}
                      className="peer sr-only"
                    />
                    <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-[#E30A17] transition-all cursor-pointer"></div>
                    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-amber-50 border-2 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-amber-900 mb-2">Veri Güvenliği</h4>
                  <p className="text-sm text-amber-800">
                    Tüm verileriniz end-to-end şifreleme ile korunmaktadır.
                    Verileriniz asla üçüncü taraflarla paylaşılmaz.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

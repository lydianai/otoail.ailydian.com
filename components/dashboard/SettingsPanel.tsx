'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Volume2,
  Database,
  Shield,
  Eye,
  EyeOff,
  Check,
  X,
  Smartphone,
  Mail,
  MapPin,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  Bluetooth,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Save,
  AlertTriangle,
  Info,
  HelpCircle,
  FileText,
  Link,
  Share2,
  Calendar,
  Clock,
  Zap,
  Target,
  Radio
} from 'lucide-react';

// ==================== TYPES ====================

interface SettingsState {
  // Account
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;

  // Privacy
  shareLocation: boolean;
  shareStats: boolean;
  publicProfile: boolean;
  showOnLeaderboard: boolean;

  // Appearance
  theme: 'light' | 'dark' | 'auto';
  language: 'tr' | 'en';
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  timeFormat: '12h' | '24h';

  // Voice Assistant
  voiceEnabled: boolean;
  voiceVolume: number;
  voiceSpeed: number;
  wakeWord: string;

  // OBD & Data
  obdAutoConnect: boolean;
  dataSyncInterval: number;
  saveRawData: boolean;
  dataRetention: number;

  // Notifications
  maintenanceAlerts: boolean;
  fuelPriceAlerts: boolean;
  trafficAlerts: boolean;
  communityUpdates: boolean;

  // Advanced
  developerMode: boolean;
  debugMode: boolean;
  betaFeatures: boolean;
}

// ==================== COMPONENT ====================

export default function SettingsPanel() {
  const [selectedTab, setSelectedTab] = useState<'account' | 'privacy' | 'appearance' | 'notifications' | 'advanced'>('account');
  const [showPassword, setShowPassword] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<'wifi' | '4g' | '5g' | 'ethernet' | 'unknown'>('wifi');
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'medium' | 'fast'>('fast');

  const [settings, setSettings] = useState<SettingsState>({
    // Account
    twoFactorEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,

    // Privacy
    shareLocation: true,
    shareStats: true,
    publicProfile: true,
    showOnLeaderboard: true,

    // Appearance
    theme: 'dark',
    language: 'tr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',

    // Voice Assistant
    voiceEnabled: true,
    voiceVolume: 80,
    voiceSpeed: 1.0,
    wakeWord: 'Hey Assistant',

    // OBD & Data
    obdAutoConnect: true,
    dataSyncInterval: 5,
    saveRawData: true,
    dataRetention: 365,

    // Notifications
    maintenanceAlerts: true,
    fuelPriceAlerts: true,
    trafficAlerts: true,
    communityUpdates: false,

    // Advanced
    developerMode: false,
    debugMode: false,
    betaFeatures: true
  });

  // Monitor internet connection
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Check connection type using Network Information API
    const updateConnectionInfo = () => {
      if ('connection' in navigator || 'mozConnection' in navigator || 'webkitConnection' in navigator) {
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

        if (connection) {
          const type = connection.effectiveType;
          if (type === 'wifi' || type === '4g' || type === '5g') {
            setConnectionType(type);
          } else if (type === 'slow-2g' || type === '2g') {
            setConnectionSpeed('slow');
            setConnectionType('4g');
          } else if (type === '3g') {
            setConnectionSpeed('medium');
            setConnectionType('4g');
          } else {
            setConnectionSpeed('fast');
          }
        }
      }
    };

    updateOnlineStatus();
    updateConnectionInfo();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    if ('connection' in navigator) {
      (navigator as any).connection?.addEventListener('change', updateConnectionInfo);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if ('connection' in navigator) {
        (navigator as any).connection?.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    setHasChanges(false);
  };

  const handleReset = () => {
    // Reset to defaults logic here
    setHasChanges(false);
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-700'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 0 }}
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
      />
    </motion.button>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl"
          >
            <Settings className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
              Ayarlar
            </h1>
            <p className="text-sm text-gray-400">Uygulama tercihlerinizi yönetin</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Internet Connection Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${
              isOnline
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {connectionType === 'wifi' && 'WiFi'}
                  {connectionType === '4g' && '4G'}
                  {connectionType === '5g' && '5G'}
                  {connectionType === 'ethernet' && 'Ethernet'}
                  {connectionType === 'unknown' && 'Bağlı'}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  connectionSpeed === 'fast' ? 'bg-green-400' :
                  connectionSpeed === 'medium' ? 'bg-yellow-400' :
                  'bg-red-400'
                } animate-pulse`} />
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span className="text-sm font-semibold">Çevrimdışı</span>
              </>
            )}
          </motion.div>

          {hasChanges && (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                İptal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Kaydet
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'account' as const, name: 'Hesap', icon: User },
          { id: 'privacy' as const, name: 'Gizlilik', icon: Shield },
          { id: 'appearance' as const, name: 'Görünüm', icon: Palette },
          { id: 'notifications' as const, name: 'Bildirimler', icon: Bell },
          { id: 'advanced' as const, name: 'Gelişmiş', icon: Settings }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/50'
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
          {selectedTab === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Email & Phone */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-400" />
                  İletişim Bilgileri
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">E-posta</label>
                    <input
                      type="email"
                      defaultValue="ahmet.yilmaz@example.com"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Telefon</label>
                    <input
                      type="tel"
                      defaultValue="+90 532 123 4567"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-purple-400" />
                  Şifre Değiştir
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Mevcut Şifre</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Yeni Şifre</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Yeni Şifre (Tekrar)</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-bold"
                  >
                    Şifreyi Güncelle
                  </motion.button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-400" />
                    <div>
                      <h3 className="font-bold">İki Faktörlü Kimlik Doğrulama</h3>
                      <p className="text-sm text-gray-400">Hesabınız için ekstra güvenlik</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.twoFactorEnabled}
                    onChange={(value) => updateSetting('twoFactorEnabled', value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {[
                {
                  key: 'shareLocation' as const,
                  icon: MapPin,
                  title: 'Konum Paylaşımı',
                  description: 'Konumunuzu topluluk ile paylaşın',
                  color: 'blue'
                },
                {
                  key: 'shareStats' as const,
                  icon: Target,
                  title: 'İstatistik Paylaşımı',
                  description: 'Sürüş istatistiklerinizi paylaşın',
                  color: 'green'
                },
                {
                  key: 'publicProfile' as const,
                  icon: User,
                  title: 'Herkese Açık Profil',
                  description: 'Profilinizi diğer kullanıcılar görebilir',
                  color: 'purple'
                },
                {
                  key: 'showOnLeaderboard' as const,
                  icon: Target,
                  title: 'Liderlik Tablosunda Göster',
                  description: 'Sıralamada görünün',
                  color: 'yellow'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings[item.key]}
                      onChange={(value) => updateSetting(item.key, value)}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Data Export */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <Download className="w-8 h-8 text-blue-400" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Verilerinizi İndirin</h3>
                    <p className="text-gray-400 mb-4">
                      Tüm kişisel verilerinizi ve sürüş geçmişinizi indirin
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-blue-500/20 text-blue-400 rounded-lg font-bold"
                    >
                      Veri Dışa Aktar
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl p-6 border border-red-500/30">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-red-400">Hesabı Sil</h3>
                    <p className="text-gray-400 mb-4">
                      Hesabınızı ve tüm verilerinizi kalıcı olarak silin. Bu işlem geri alınamaz!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-red-500/20 text-red-400 rounded-lg font-bold flex items-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Hesabı Sil
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'appearance' && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Theme */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Palette className="w-6 h-6 text-purple-400" />
                  Tema
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light' as const, label: 'Açık', icon: Sun },
                    { value: 'dark' as const, label: 'Koyu', icon: Moon },
                    { value: 'auto' as const, label: 'Otomatik', icon: Settings }
                  ].map((theme) => (
                    <motion.button
                      key={theme.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSetting('theme', theme.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings.theme === theme.value
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-gray-700 bg-gray-900/50'
                      }`}
                    >
                      <theme.icon className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">{theme.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-400" />
                  Dil
                </h2>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value as 'tr' | 'en')}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                </select>
              </div>

              {/* Date & Time Format */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-400" />
                  Tarih ve Saat Formatı
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Tarih Formatı</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => updateSetting('dateFormat', e.target.value as any)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="DD/MM/YYYY">GG/AA/YYYY</option>
                      <option value="MM/DD/YYYY">AA/GG/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-AA-GG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Saat Formatı</label>
                    <select
                      value={settings.timeFormat}
                      onChange={(e) => updateSetting('timeFormat', e.target.value as '12h' | '24h')}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="12h">12 Saat</option>
                      <option value="24h">24 Saat</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {[
                {
                  key: 'emailNotifications' as const,
                  icon: Mail,
                  title: 'E-posta Bildirimleri',
                  description: 'E-posta ile bildirim alın',
                  color: 'blue'
                },
                {
                  key: 'pushNotifications' as const,
                  icon: Smartphone,
                  title: 'Push Bildirimleri',
                  description: 'Anlık bildirimler alın',
                  color: 'green'
                },
                {
                  key: 'smsNotifications' as const,
                  icon: Mail,
                  title: 'SMS Bildirimleri',
                  description: 'SMS ile bildirim alın',
                  color: 'purple'
                },
                {
                  key: 'maintenanceAlerts' as const,
                  icon: AlertTriangle,
                  title: 'Bakım Uyarıları',
                  description: 'Bakım zamanı geldiğinde bildirim alın',
                  color: 'yellow'
                },
                {
                  key: 'fuelPriceAlerts' as const,
                  icon: Zap,
                  title: 'Yakıt Fiyat Uyarıları',
                  description: 'Yakıt fiyatı değişikliklerini takip edin',
                  color: 'orange'
                },
                {
                  key: 'trafficAlerts' as const,
                  icon: MapPin,
                  title: 'Trafik Uyarıları',
                  description: 'Trafik durumu hakkında bildirim alın',
                  color: 'red'
                },
                {
                  key: 'communityUpdates' as const,
                  icon: User,
                  title: 'Topluluk Güncellemeleri',
                  description: 'Topluluk aktiviteleri hakkında bilgi alın',
                  color: 'pink'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings[item.key]}
                      onChange={(value) => updateSetting(item.key, value)}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedTab === 'advanced' && (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* OBD Settings */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Radio className="w-6 h-6 text-blue-400" />
                  OBD Ayarları
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">Otomatik Bağlan</h3>
                      <p className="text-sm text-gray-400">Motor çalıştığında OBD'ye otomatik bağlan</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.obdAutoConnect}
                      onChange={(value) => updateSetting('obdAutoConnect', value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Veri Senkronizasyon Aralığı (saniye)</label>
                    <input
                      type="number"
                      value={settings.dataSyncInterval}
                      onChange={(e) => updateSetting('dataSyncInterval', parseInt(e.target.value))}
                      min={1}
                      max={60}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">Ham Veri Kaydet</h3>
                      <p className="text-sm text-gray-400">Tüm OBD verilerini kaydet</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.saveRawData}
                      onChange={(value) => updateSetting('saveRawData', value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Veri Saklama Süresi (gün)</label>
                    <input
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
                      min={30}
                      max={365}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Voice Assistant Settings */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Volume2 className="w-6 h-6 text-purple-400" />
                  Sesli Asistan
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">Sesli Asistan Aktif</h3>
                      <p className="text-sm text-gray-400">Sesli komutları kullan</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.voiceEnabled}
                      onChange={(value) => updateSetting('voiceEnabled', value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ses Seviyesi: {settings.voiceVolume}%</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={settings.voiceVolume}
                      onChange={(e) => updateSetting('voiceVolume', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Konuşma Hızı: {settings.voiceSpeed}x</label>
                    <input
                      type="range"
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      value={settings.voiceSpeed}
                      onChange={(e) => updateSetting('voiceSpeed', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Developer Settings */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-orange-400" />
                  Geliştirici Ayarları
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      key: 'developerMode' as const,
                      title: 'Geliştirici Modu',
                      description: 'Gelişmiş ayarları ve logları göster'
                    },
                    {
                      key: 'debugMode' as const,
                      title: 'Debug Modu',
                      description: 'Detaylı hata ayıklama bilgilerini göster'
                    },
                    {
                      key: 'betaFeatures' as const,
                      title: 'Beta Özellikleri',
                      description: 'Test aşamasındaki özellikleri aktif et'
                    }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings[item.key]}
                        onChange={(value) => updateSetting(item.key, value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cache & Storage */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/30">
                <div className="flex items-start gap-4">
                  <Database className="w-8 h-8 text-orange-400" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Önbellek ve Depolama</h3>
                    <p className="text-gray-400 mb-4">
                      Yerel önbelleği temizle ve depolama alanı aç
                    </p>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-orange-500/20 text-orange-400 rounded-lg font-bold flex items-center gap-2"
                      >
                        <Trash2 className="w-5 h-5" />
                        Önbelleği Temizle
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-blue-500/20 text-blue-400 rounded-lg font-bold flex items-center gap-2"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Fabrika Ayarları
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

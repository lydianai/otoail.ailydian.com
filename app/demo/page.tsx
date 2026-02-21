'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mic, Car, Navigation, Gauge, MapPin, Zap, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function DemoPage() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<'voice' | 'obd' | 'navigation'>('voice');

  const demoSections = [
    {
      id: 'voice' as const,
      title: 'Sesli Asistan',
      icon: Mic,
      description: 'Türkçe ses komutlarıyla aracınızı kontrol edin',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'obd' as const,
      title: 'OBD Verileri',
      icon: Gauge,
      description: 'Gerçek zamanlı araç performans verileri',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'navigation' as const,
      title: 'Akıllı Navigasyon',
      icon: Navigation,
      description: 'Sesli komutla rota planlama',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const voiceCommands = [
    "Motor durumunu göster",
    "En yakın benzin istasyonunu bul",
    "Eve git",
    "Klima açık mı?",
    "Yakıt seviyesi nedir?"
  ];

  const obdMetrics = [
    { label: 'Motor Sıcaklığı', value: '92°C', status: 'normal' },
    { label: 'Yakıt Seviyesi', value: '%78', status: 'good' },
    { label: 'Motor Devri', value: '2450 RPM', status: 'normal' },
    { label: 'Hız', value: '65 km/h', status: 'normal' },
    { label: 'Anlık Tüketim', value: '6.2 L/100km', status: 'good' },
    { label: 'Batarya Voltajı', value: '14.2V', status: 'good' }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
      {/* Top Premium Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 w-fit">
          <Logo size="sm" />
          <Zap className="w-5 h-5 text-[#E30A17]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Demo Section Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {demoSections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentDemo(section.id)}
              className={`p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all ${
                currentDemo === section.id
                  ? 'border-[#E30A17] bg-gradient-to-br from-gray-800 to-gray-900'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-3 sm:mb-4`}>
                <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{section.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{section.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Voice Demo */}
        {currentDemo === 'voice' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Sesli Asistan Demo</h2>
              <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">
                Mikrofon butonuna basın ve Türkçe komut verin
              </p>

              {/* Voice Button */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                    isVoiceActive
                      ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-red-500/50 animate-pulse'
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                  }`}
                >
                  <Mic className="w-14 h-14 sm:w-16 sm:h-16" />
                </motion.button>
              </div>

              {isVoiceActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                >
                  <p className="text-red-400 font-medium">🎤 Dinliyorum...</p>
                </motion.div>
              )}

              {/* Sound Control */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                <span>{isMuted ? 'Sessiz' : 'Sesli'}</span>
              </button>
            </div>

            {/* Example Commands */}
            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">Örnek Komutlar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {voiceCommands.map((command, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/50 border border-gray-700 hover:border-[#E30A17] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#E30A17] group-hover:rotate-12 transition-transform flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{command}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* OBD Demo */}
        {currentDemo === 'obd' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">OBD Verileri Demo</h2>
              <p className="text-sm sm:text-base text-gray-400">
                Gerçek zamanlı araç performans izleme
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {obdMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-gray-400">{metric.label}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      metric.status === 'good' ? 'bg-green-500' :
                      metric.status === 'normal' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`} />
                  </div>
                  <p className="text-xl sm:text-2xl font-bold">{metric.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Live Graph Simulation */}
            <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-900 border border-gray-700">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Canlı Grafik</h3>
              <div className="h-48 bg-gradient-to-b from-blue-500/10 to-transparent rounded-xl border border-blue-500/30 flex items-end justify-around p-4">
                {[65, 45, 80, 55, 90, 70, 60, 85, 75, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-8 bg-gradient-to-t from-[#E30A17] to-orange-500 rounded-t-lg"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Demo */}
        {currentDemo === 'navigation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Akıllı Navigasyon Demo</h2>
              <p className="text-sm sm:text-base text-gray-400">
                Sesli komutla rota planlama ve trafik bilgisi
              </p>
            </div>

            {/* Map Simulation */}
            <div className="relative h-96 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 bg-[#E30A17] rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50"
                >
                  <Car className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Route Points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-1/4 left-1/4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            {/* Route Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-500/30">
                <p className="text-xs sm:text-sm text-green-400 mb-2">Tahmini Süre</p>
                <p className="text-2xl sm:text-3xl font-bold">24 dk</p>
              </div>
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-500/30">
                <p className="text-xs sm:text-sm text-blue-400 mb-2">Mesafe</p>
                <p className="text-2xl sm:text-3xl font-bold">18.5 km</p>
              </div>
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-900/30 to-orange-800/30 border border-orange-500/30">
                <p className="text-xs sm:text-sm text-orange-400 mb-2">Trafik</p>
                <p className="text-2xl sm:text-3xl font-bold">Akıcı</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#E30A17] to-red-600 text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4 px-4">Tüm Özellikleri Deneyin</h3>
          <p className="text-base sm:text-lg mb-5 sm:mb-6 opacity-90 px-4">
            Dashboard'a giderek tüm özelliklere erişim sağlayın
          </p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-white text-[#E30A17] font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 sm:gap-3 min-h-[48px]"
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              Dashboard Başlat
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
    </>
  );
}

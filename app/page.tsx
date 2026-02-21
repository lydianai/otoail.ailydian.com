'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Car, Activity, Navigation, Trophy, Flag, Clock, Wifi, Battery, Thermometer,
  Fuel, Radio, Settings, Circle, Zap, ChevronRight, Gauge, Shield, Brain,
  Wrench, MapPin, TrendingUp, Globe, Smartphone, Users, CheckCircle2,
  Star, BarChart3, Lock, Sparkles, Target, Rocket, Award, Eye,
  MessageCircle, Cpu, Database, Cloud
} from 'lucide-react';
import Onboarding from '@/components/Onboarding';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedHighway from '@/components/AnimatedHighway';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <>
      {showOnboarding && (
        <Onboarding
          type="landing"
          onComplete={() => setShowOnboarding(false)}
        />
      )}
    <Header />
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative">
      {/* Turkish Flag Inspired Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E30A17] rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Neon Grid Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#E30A17 1px, transparent 1px), linear-gradient(90deg, #E30A17 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <AnimatedHighway />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto text-center z-10">
          {/* Turkish Flag Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#E30A17] text-white shadow-lg shadow-red-500/30"
          >
            <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-bold tracking-wider">YOLLARDA ZEKA, YOLCULUKTA GÜÇ</span>
          </motion.div>

          {/* Main Title with Neon Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 relative"
          >
            <span className="relative inline-block">
              <span className="text-[#E30A17] drop-shadow-[0_0_30px_rgba(227,10,23,0.5)]">
                LyDian
              </span>
              <span className="text-gray-900 mx-2 sm:mx-3 md:mx-4">Oto</span>
              <span className="text-[#E30A17] drop-shadow-[0_0_30px_rgba(227,10,23,0.5)]">
                AI
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto font-medium px-4"
          >
            <span className="text-[#E30A17] font-bold">Türkiye'nin yollarına özel</span> geliştirilmiş{' '}
            yapay zeka destekli araç asistanı
          </motion.p>

          {/* Stats Grid with Neon Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-5xl mx-auto px-2 sm:px-4"
          >
            {[
              { icon: Activity, value: '100Hz', label: 'OBD-II Örnekleme', color: '#E30A17' },
              { icon: Brain, value: '99%', label: 'Ses Tanıma Doğruluk', color: '#E30A17' },
              { icon: Clock, value: '7/24', label: 'Canlı AI Destek', color: '#E30A17' },
              { icon: Trophy, value: '250M+', label: 'Kullanıcı Hedefi', color: '#E30A17' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-gray-200 shadow-xl hover:border-[#E30A17] hover:shadow-[0_0_30px_rgba(227,10,23,0.3)] transition-all duration-300">
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E30A17] flex items-center justify-center shadow-lg shadow-red-500/50">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#E30A17] mb-1 sm:mb-2 mt-3 sm:mt-4">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-4"
          >
            <motion.a
              href="/demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-[#E30A17] text-white font-bold text-base sm:text-lg shadow-xl shadow-red-500/50 hover:shadow-[0_0_40px_rgba(227,10,23,0.6)] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 min-h-[48px]"
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
              Canlı Demo İzle
            </motion.a>
            <motion.a
              href="/sesli-demo"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(227, 10, 23, 0.4)',
                  '0 0 40px rgba(227, 10, 23, 0.6)',
                  '0 0 20px rgba(227, 10, 23, 0.4)'
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="group relative w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#E30A17] via-red-600 to-[#E30A17] bg-size-200 animate-gradient text-white font-bold text-base sm:text-lg hover:shadow-[0_0_60px_rgba(227,10,23,0.8)] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden min-h-[48px]"
            >
              {/* Animated shine effect */}
              <motion.div
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Wifi className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              </motion.div>
              <span className="relative z-10">Sesli Asistan Dene</span>
              <motion.div
                animate={{
                  x: [0, 3, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Circle className="w-2 h-2 fill-white animate-pulse relative z-10" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Automotive Theme */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-4 sm:px-6 py-2 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
              <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-[#E30A17]" />
              <span className="text-xs sm:text-sm font-bold text-[#E30A17] tracking-wider">TÜRKİYE'NİN GURURLU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-4">
              <span className="text-gray-900">Senin Yolculuğun,</span>{' '}
              <span className="text-[#E30A17] drop-shadow-[0_0_20px_rgba(227,10,23,0.3)]">Bizim Teknolojimiz</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-medium px-4">
              6 benzersiz özellik ile otomotiv teknolojisinde çığır açıyoruz
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Brain,
                iconBg: Car,
                title: 'Sesli AI Asistan',
                description: '50+ mesaj bağlam hafızası ile Siri kalitesinde Türkçe ses tanıma',
                stats: '99% doğruluk, 7 lehçe desteği',
                gradient: 'from-[#E30A17] to-red-700'
              },
              {
                icon: Wrench,
                iconBg: Settings,
                title: 'Akıllı Teşhis',
                description: 'Fotoğraf çek, AI anında teşhis koysun. Motor sesi kaydet, sorun tespit etsin',
                stats: '90%+ doğruluk, 5000+ arıza kodu',
                gradient: 'from-[#E30A17] to-red-700'
              },
              {
                icon: MapPin,
                iconBg: Navigation,
                title: 'Süper Navigasyon',
                description: 'Google Maps + Yandex Harita + Waze birleşik! Türkiye trafiğine özel',
                stats: '3 kaynak, gerçek zamanlı trafik',
                gradient: 'from-[#E30A17] to-red-700'
              },
              {
                icon: TrendingUp,
                iconBg: Trophy,
                title: 'Sürüş Skoru',
                description: 'Gamification ile sürüş analizi. Liderlik tablosu, sigorta indirimleri',
                stats: '15% yakıt tasarrufu, %20 indirim',
                gradient: 'from-[#E30A17] to-red-700'
              },
              {
                icon: Globe,
                iconBg: Flag,
                title: 'Türkiye Entegrasyonu',
                description: 'HGS/OGS, trafik cezaları, yakıt fiyatları, MTV ödemeleri - hepsi tek yerde',
                stats: '7+ servis entegre',
                gradient: 'from-[#E30A17] to-red-700'
              },
              {
                icon: Shield,
                iconBg: Activity,
                title: 'Tahmine Dayalı Bakım',
                description: 'OBD-II verisi ile arıza tahmini. 30 gün önceden uyarı',
                stats: '%40 bakım maliyeti azaltma',
                gradient: 'from-[#E30A17] to-red-700'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-gray-200 hover:border-[#E30A17] shadow-xl hover:shadow-[0_0_40px_rgba(227,10,23,0.2)] transition-all duration-300">
                  {/* Icon Container with Neon Effect */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg shadow-red-500/50 group-hover:shadow-[0_0_30px_rgba(227,10,23,0.6)] transition-all`}>
                      <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
                    </div>
                    {/* Rotating Background Icon */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 opacity-10"
                    >
                      <feature.iconBg className="w-16 h-16 sm:w-20 sm:h-20 text-[#E30A17]" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-[#E30A17] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
                    <span className="text-xs sm:text-sm text-[#E30A17] font-bold">{feature.stats}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section - Neon Dashboard */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-4">
              <span className="text-[#E30A17] drop-shadow-[0_0_20px_rgba(227,10,23,0.3)]">Canlı Demo</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium px-4">
              Sesli asistanı şimdi dene - mikrofon izni ver ve konuş
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-[#E30A17]/20 shadow-2xl">
              {/* Animated Pulse Circle */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[#E30A17]"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="absolute inset-2 rounded-full bg-[#E30A17]"
                />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#E30A17] to-red-700 flex items-center justify-center shadow-xl shadow-red-500/50">
                  <Radio className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 text-center font-medium max-w-2xl mx-auto px-4">
                "Merhaba LyDian, arabanın motor ışığı yanıyor ne yapmalıyım?"
              </p>

              <motion.a
                href="/sesli-demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group mx-auto flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-[#E30A17] text-white font-bold text-base sm:text-lg shadow-xl shadow-red-500/50 hover:shadow-[0_0_40px_rgba(227,10,23,0.6)] transition-all min-h-[48px]"
              >
                <Wifi className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                Sesli Demo Başlat
                <Circle className="w-2 h-2 animate-pulse" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OBD Dashboard Preview - Realistic Car Dashboard */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-4 sm:px-6 py-2 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
              <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-[#E30A17]" />
              <span className="text-xs sm:text-sm font-bold text-[#E30A17] tracking-wider">GERÇEK ZAMANLI VERİ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-4">
              <span className="text-gray-900">OBD-II</span>{' '}
              <span className="text-[#E30A17] drop-shadow-[0_0_20px_rgba(227,10,23,0.3)]">Dashboard</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium px-4">
              Aracınızın tüm verilerini tek ekranda görün - 100Hz örnekleme hızıyla
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: Gauge, label: 'Motor Devri', value: '2,850', unit: 'RPM', color: '#E30A17', glow: 'shadow-red-500/50' },
              { icon: Zap, label: 'Hız', value: '87', unit: 'km/h', color: '#E30A17', glow: 'shadow-red-500/50' },
              { icon: Fuel, label: 'Yakıt Tüketimi', value: '12.3', unit: 'L/100km', color: '#E30A17', glow: 'shadow-red-500/50' },
              { icon: Thermometer, label: 'Motor Sıcaklığı', value: '92', unit: '°C', color: '#E30A17', glow: 'shadow-red-500/50' },
              { icon: Battery, label: 'Akü Voltajı', value: '14.2', unit: 'V', color: '#E30A17', glow: 'shadow-red-500/50' },
              { icon: Activity, label: 'Anlık Güç', value: '185', unit: 'HP', color: '#E30A17', glow: 'shadow-red-500/50' },
              { icon: Clock, label: 'Çalışma Süresi', value: '2:15', unit: 'saat', color: '#E30A17', glow: 'shadow-red-500/50' },
              { icon: TrendingUp, label: 'Verimlilik', value: '94', unit: '%', color: '#E30A17', glow: 'shadow-red-500/50' },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className={`p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-gray-200 hover:border-[#E30A17] shadow-xl hover:shadow-[0_0_30px_rgba(227,10,23,0.2)] transition-all duration-300`}>
                  {/* Icon Badge */}
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[${metric.color}] flex items-center justify-center shadow-lg ${metric.glow}`}>
                      <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-500 font-semibold mb-2 sm:mb-3 mt-5 sm:mt-6 uppercase tracking-wide">{metric.label}</div>
                  <div className="flex items-baseline gap-1 sm:gap-2 mb-1">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#E30A17]">{metric.value}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">{metric.unit}</div>

                  {/* Animated Progress Bar */}
                  <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#E30A17] to-red-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Türkiye'ye Özel Özellikler - Turkey-Specific Features */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#E30A17 1px, transparent 1px), linear-gradient(90deg, #E30A17 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full bg-[#E30A17]/20 border border-[#E30A17]">
              <MapPin className="w-5 h-5 text-[#E30A17]" />
              <span className="text-sm font-bold text-[#E30A17] tracking-wider">TÜRKİYE'YE ÖZEL</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
              <span className="text-white">Türk Sürücüler İçin</span><br/>
              <span className="text-[#E30A17] drop-shadow-[0_0_30px_rgba(227,10,23,0.5)]">Özel Tasarlandı</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: 'HGS & OGS Entegrasyonu',
                description: 'Gerçek zamanlı köprü ve otoyol ücretleri takibi',
                stats: '7/24 Anlık Güncelleme'
              },
              {
                icon: Shield,
                title: 'MTV & Trafik Cezası',
                description: 'Otomatik MTV hatırlatma ve ceza sorgulama',
                stats: 'Tüm İller Desteklenir'
              },
              {
                icon: Fuel,
                title: 'Yakıt Fiyat Haritası',
                description: 'Türkiye genelinde en ucuz benzinlik bulma',
                stats: '50.000+ Benzinlik'
              },
              {
                icon: MessageCircle,
                title: 'Türkçe Sesli Asistan',
                description: 'Doğal dil işleme ile Türkçe komut desteği',
                stats: '%99 Doğruluk Oranı'
              },
              {
                icon: Navigation,
                title: 'Akıllı Yol Planla',
                description: 'Türkiye yollarına özel trafik tahminleme',
                stats: 'Gerçek Zamanlı Trafik'
              },
              {
                icon: Users,
                title: 'Sürücü Topluluğu',
                description: 'Türk sürücülerle deneyim paylaşımı',
                stats: '100.000+ Kullanıcı'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 hover:border-[#E30A17] transition-all duration-300">
                  <div className="absolute -top-4 left-6">
                    <div className="w-12 h-12 rounded-full bg-[#E30A17] flex items-center justify-center shadow-lg shadow-red-500/50 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#E30A17] transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E30A17]/20 border border-[#E30A17]/30">
                      <CheckCircle2 className="w-4 h-4 text-[#E30A17]" />
                      <span className="text-xs text-[#E30A17] font-semibold">{feature.stats}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Dashboard Preview - Canlı İstatistikler */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
              <BarChart3 className="w-5 h-5 text-[#E30A17]" />
              <span className="text-sm font-bold text-[#E30A17] tracking-wider">CANLI İSTATİSTİKLER</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-gray-900">
              Her Detayı <span className="text-[#E30A17]">Anlık Takip Et</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Eye, value: '2.5M+', label: 'Analiz Edilen Veri', trend: '+125%', color: 'blue' },
              { icon: Target, value: '98.7%', label: 'Tahmin Doğruluğu', trend: '+5.2%', color: 'green' },
              { icon: Rocket, value: '<50ms', label: 'Yanıt Süresi', trend: '-30%', color: 'purple' },
              { icon: Award, value: '4.9/5', label: 'Kullanıcı Puanı', trend: '+0.3', color: 'red' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-[#E30A17] hover:shadow-2xl transition-all duration-300">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4"
                  >
                    <stat.icon className="w-10 h-10 text-[#E30A17]" />
                  </motion.div>
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                  <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Vehicle Showcase - Araç Vitrini */}
      <section className="relative py-20 sm:py-24 md:py-32 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#E30A17] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-6 px-8 py-4 rounded-full bg-[#E30A17]/20 border-2 border-[#E30A17]/50 backdrop-blur-lg"
            >
              <Car className="w-6 h-6 text-[#E30A17]" />
              <span className="text-sm font-black text-white tracking-widest">AKILLI ARAÇ DENEYİMİ</span>
            </motion.div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white">
              Aracınız <span className="text-[#E30A17]">Artık Daha Akıllı</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Yapay zeka destekli araç yönetimi ile sürüş deneyiminizi bir üst seviyeye taşıyın
            </p>
          </motion.div>

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Yapay Zeka Asistanı',
                description: 'Aracınızla konuşun, sorularınıza anında yanıt alın',
                color: 'from-purple-600 to-pink-600',
                stats: 'Anlık Yanıt'
              },
              {
                icon: Activity,
                title: 'Gerçek Zamanlı Takip',
                description: 'Aracınızın her anını canlı olarak izleyin',
                color: 'from-blue-600 to-cyan-600',
                stats: '100Hz Örnekleme'
              },
              {
                icon: Gauge,
                title: 'Akıllı Diagnostik',
                description: 'Arıza öncesi uyarılar ve otomatik çözümler',
                color: 'from-orange-600 to-red-600',
                stats: '%98.7 Doğruluk'
              },
              {
                icon: MapPin,
                title: 'Akıllı Navigasyon',
                description: 'Trafik tahmini ile en hızlı rotayı bulun',
                color: 'from-green-600 to-emerald-600',
                stats: 'Canlı Trafik'
              },
              {
                icon: Battery,
                title: 'Enerji Optimizasyonu',
                description: 'Yakıt tasarrufu ve verimlilik önerileri',
                color: 'from-yellow-600 to-orange-600',
                stats: '%30 Tasarruf'
              },
              {
                icon: Shield,
                title: 'Güvenlik Merkezi',
                description: 'Hırsızlık önleme ve acil durum sistemi',
                color: 'from-red-600 to-pink-600',
                stats: '7/24 Korumalı'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.color} shadow-2xl hover:shadow-[#E30A17]/50 transition-all duration-500`}>
                  {/* Glowing Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-white/10"
                    animate={{
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mb-6 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center"
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-black text-white mb-3">{feature.title}</h3>
                    <p className="text-white/80 mb-4">{feature.description}</p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-sm font-bold text-white">{feature.stats}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Success Stories - Müşteri Hikayeleri */}
      <section className="relative py-20 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
              <Star className="w-5 h-5 text-[#E30A17]" />
              <span className="text-sm font-bold text-[#E30A17] tracking-wider">MÜŞTERİ DENEYİMLERİ</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-gray-900">
              Binlerce Mutlu <span className="text-[#E30A17]">Sürücü</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              LyDian Oto AI kullanıcılarının gerçek deneyimleri
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ahmet Yılmaz',
                role: 'BMW 3 Serisi Sahibi',
                image: '👨‍💼',
                rating: 5,
                comment: 'Aracımın her detayını gerçek zamanlı takip edebiliyorum. Özellikle yapay zeka asistanı harika, tüm sorularıma anında cevap veriyor!',
                achievement: '15.000 km sorunsuz sürüş'
              },
              {
                name: 'Zeynep Kaya',
                role: 'Tesla Model 3 Sahibi',
                image: '👩‍💼',
                rating: 5,
                comment: 'Yakıt tasarrufu özelliği sayesinde ayda ortalama 500₺ tasarruf ediyorum. Uygulama çok kullanıcı dostu ve işlevsel.',
                achievement: '%32 yakıt tasarrufu'
              },
              {
                name: 'Mehmet Demir',
                role: 'Audi A4 Sahibi',
                image: '👨‍🔧',
                rating: 5,
                comment: 'Arıza öncesi uyarı sistemi sayesinde büyük bir motor arızasını önledim. Gerçekten hayat kurtarıcı bir teknoloji!',
                achievement: '20.000₺ tasarruf'
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-[#E30A17] shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.15 + j * 0.05 }}
                      >
                        <Star className="w-5 h-5 fill-[#E30A17] text-[#E30A17]" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 text-lg italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E30A17] to-red-600 flex items-center justify-center text-3xl shadow-lg">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
                    <Trophy className="w-4 h-4 text-[#E30A17]" />
                    <span className="text-sm font-bold text-[#E30A17]">{testimonial.achievement}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Preview - Canlı Demo */}
      <section className="relative py-20 sm:py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Animated Road Lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-20 bg-white rounded-full"
              style={{ top: `${20 + i * 20}%` }}
              animate={{
                x: [-100, 2000],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(227, 10, 23, 0.3)',
                  '0 0 40px rgba(227, 10, 23, 0.6)',
                  '0 0 20px rgba(227, 10, 23, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-6 px-8 py-4 rounded-full bg-[#E30A17] border-2 border-white/20"
            >
              <Zap className="w-6 h-6 text-white" />
              <span className="text-sm font-black text-white tracking-widest">CANLI DEMO</span>
            </motion.div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">
              Hemen <span className="text-[#E30A17]">Deneyin</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Kayıt olmadan tüm özellikleri keşfedin
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Car, label: 'Tesla Demo', href: '/tesla-demo', color: 'from-blue-600 to-cyan-600' },
                { icon: Activity, label: 'ADAS Demo', href: '/adas-demo', color: 'from-purple-600 to-pink-600' },
                { icon: Radio, label: 'Sesli Demo', href: '/sesli-demo', color: 'from-green-600 to-emerald-600' },
                { icon: Zap, label: 'EV Alarmlar', href: '/ev-alarms-demo', color: 'from-orange-600 to-red-600' }
              ].map((demo, i) => (
                <motion.a
                  key={i}
                  href={demo.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${demo.color} shadow-2xl hover:shadow-[#E30A17]/50 transition-all duration-300`}>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <demo.icon className="w-12 h-12 text-white mx-auto mb-3" />
                    </motion.div>
                    <p className="font-bold text-white">{demo.label}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Security Badges */}
      <section className="relative py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-gray-900">
              Güvenlik ve <span className="text-[#E30A17]">Güven</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'SSL Şifreli', desc: '256-bit Güvenlik' },
              { icon: Lock, title: 'KVKK Uyumlu', desc: 'Veri Gizliliği' },
              { icon: CheckCircle2, title: 'ISO 27001', desc: 'Sertifikalı' },
              { icon: Star, title: '4.9/5 Puan', desc: '10.000+ Değerlendirme' }
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#E30A17]/10 flex items-center justify-center">
                  <badge.icon className="w-8 h-8 text-[#E30A17]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{badge.title}</h3>
                <p className="text-sm text-gray-600">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Turkish Flag Inspired */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 bg-gradient-to-br from-[#E30A17] to-red-700 text-white overflow-hidden">
        {/* Turkish Flag Star Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Flag className="w-full h-full text-white" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-bold tracking-wider">TÜRKİYE'NİN GURURU</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight px-4">
              Türkiye'nin İlk Premium
              <br />
              <span className="drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                Otomotiv AI'ı ile Tanışın
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 opacity-90 font-medium px-4">
              Beta erişimi için şimdi kaydol - ilk 1000 kullanıcıya özel <span className="font-black text-lg sm:text-xl md:text-2xl">%50 indirim</span>
            </p>

            <motion.a
              href="/beta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full sm:w-auto px-8 sm:px-10 md:px-12 py-5 sm:py-6 rounded-full bg-white text-[#E30A17] font-black text-base sm:text-lg md:text-xl shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2 sm:gap-3 mx-auto min-h-[48px]"
            >
              <Flag className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform" />
              Beta Erişimi İste
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}

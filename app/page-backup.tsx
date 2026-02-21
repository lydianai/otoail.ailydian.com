'use client';

import { motion } from 'framer-motion';
import {
  Car, Activity, Navigation, Trophy, Flag, Clock, Wifi, Battery, Thermometer,
  Fuel, Radio, Settings, Circle, Zap, ChevronRight, Gauge, Shield, Brain,
  Wrench, MapPin, TrendingUp, Globe
} from 'lucide-react';

export default function Home() {
  return (
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

      {/* Animated Highway - Top of Page */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden pointer-events-none z-20 bg-gradient-to-b from-gray-900 via-gray-800 to-transparent">
        {/* 3-Lane Highway */}
        <div className="absolute top-0 left-0 right-0 h-full">
          {/* Road Surface with Perspective */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500 opacity-40" />

          {/* Lane Dividers - Animated Dashes */}
          <div className="absolute top-8 left-0 right-0 h-0.5 flex justify-around">
            {/* Lane 1-2 divider */}
            <div className="flex-1 flex gap-6 overflow-hidden">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`lane1-${i}`}
                  className="w-10 h-0.5 bg-yellow-400/60"
                  initial={{ x: 0 }}
                  animate={{ x: -80 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>
          </div>

          <div className="absolute top-16 left-0 right-0 h-0.5 flex justify-around">
            {/* Lane 2-3 divider */}
            <div className="flex-1 flex gap-6 overflow-hidden">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`lane2-${i}`}
                  className="w-10 h-0.5 bg-yellow-400/60"
                  initial={{ x: 0 }}
                  animate={{ x: -80 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tesla Model 3 - Lane 1 */}
        <motion.div
          className="absolute top-2"
          initial={{ x: '-15%' }}
          animate={{ x: '115%' }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 0
          }}
        >
          <svg width="100" height="45" viewBox="0 0 120 55" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="tesla" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E30A17" />
                <stop offset="50%" stopColor="#FF1F2F" />
                <stop offset="100%" stopColor="#E30A17" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Shadow */}
            <ellipse cx="60" cy="48" rx="40" ry="4" fill="#000" opacity="0.3" />
            {/* Car Body - Sleek Tesla Design */}
            <path d="M 25,40 Q 20,35 25,28 L 30,22 Q 35,18 45,18 L 75,18 Q 85,18 90,22 L 95,28 Q 100,35 95,40 Z"
                  fill="url(#tesla)" stroke="#B00812" strokeWidth="0.5"/>
            {/* Roof Line */}
            <path d="M 35,22 Q 40,19 50,19 L 70,19 Q 80,19 85,22" fill="#C00915" />
            {/* Windshield - Blue Tint */}
            <path d="M 45,18 L 48,21 L 72,21 L 75,18 Z" fill="#4A90E2" opacity="0.7" />
            {/* Side Windows */}
            <path d="M 33,24 L 36,26 L 44,26 L 44,32 L 33,32 Z" fill="#87CEEB" opacity="0.6" />
            <path d="M 76,26 L 84,26 L 87,24 L 87,32 L 76,32 Z" fill="#87CEEB" opacity="0.6" />
            {/* Door Lines */}
            <line x1="55" y1="26" x2="55" y2="38" stroke="#B00812" strokeWidth="0.5" opacity="0.6"/>
            {/* Wheels - Sporty Design */}
            <g filter="url(#glow)">
              <circle cx="35" cy="42" r="7" fill="#1a1a1a" stroke="#E30A17" strokeWidth="1.5" />
              <circle cx="85" cy="42" r="7" fill="#1a1a1a" stroke="#E30A17" strokeWidth="1.5" />
              <circle cx="35" cy="42" r="4" fill="#333" />
              <circle cx="85" cy="42" r="4" fill="#333" />
              {/* Rim Details */}
              <path d="M 35,38 L 35,46 M 31,42 L 39,42" stroke="#666" strokeWidth="0.8" />
              <path d="M 85,38 L 85,46 M 81,42 L 89,42" stroke="#666" strokeWidth="0.8" />
            </g>
            {/* LED Headlights */}
            <rect x="96" y="30" width="3" height="6" rx="1" fill="#00D9FF" opacity="0.9" filter="url(#glow)"/>
            <rect x="96" y="36" width="3" height="3" rx="1" fill="#FFD700" opacity="0.8"/>
            {/* Tesla Badge */}
            <text x="58" y="35" fontSize="6" fill="#fff" fontFamily="Arial" fontWeight="bold" textAnchor="middle">T</text>
          </svg>
        </motion.div>

        {/* TOGG T10X - Lane 3 (Opposite Direction) */}
        <motion.div
          className="absolute top-14"
          initial={{ x: '115%' }}
          animate={{ x: '-15%' }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 3
          }}
        >
          <svg width="110" height="48" viewBox="0 0 130 58" className="drop-shadow-2xl scale-x-[-1]">
            <defs>
              <linearGradient id="togg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A2E4D" />
                <stop offset="50%" stopColor="#1A4D7A" />
                <stop offset="100%" stopColor="#0A2E4D" />
              </linearGradient>
              <radialGradient id="toggLED">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="100%" stopColor="#0080FF" />
              </radialGradient>
            </defs>
            {/* Shadow */}
            <ellipse cx="65" cy="51" rx="45" ry="4" fill="#000" opacity="0.3" />
            {/* TOGG Body - Modern Electric SUV */}
            <path d="M 22,43 Q 18,38 22,30 L 28,23 Q 34,19 48,19 L 82,19 Q 96,19 102,23 L 108,30 Q 112,38 108,43 Z"
                  fill="url(#togg)" stroke="#05192A" strokeWidth="0.6"/>
            {/* Roof Line - Panoramic */}
            <path d="M 38,23 Q 44,20 55,20 L 75,20 Q 86,20 92,23" fill="#0F3A5F" />
            {/* Windshield - Large Panoramic */}
            <path d="M 48,19 L 52,22 L 78,22 L 82,19 Z" fill="#4A90E2" opacity="0.6" />
            {/* Side Windows */}
            <path d="M 32,25 L 36,28 L 46,28 L 46,35 L 32,35 Z" fill="#6BB6FF" opacity="0.5" />
            <path d="M 84,28 L 94,28 L 98,25 L 98,35 L 84,35 Z" fill="#6BB6FF" opacity="0.5" />
            {/* TOGG Character Line */}
            <path d="M 25,32 Q 45,30 65,30 Q 85,30 105,32" stroke="#1A4D7A" strokeWidth="1" opacity="0.8" fill="none"/>
            {/* Wheels - Large EV Wheels */}
            <g>
              <circle cx="38" cy="45" r="8" fill="#1a1a1a" stroke="#0A2E4D" strokeWidth="1.8" />
              <circle cx="92" cy="45" r="8" fill="#1a1a1a" stroke="#0A2E4D" strokeWidth="1.8" />
              <circle cx="38" cy="45" r="4.5" fill="#2C3E50" />
              <circle cx="92" cy="45" r="4.5" fill="#2C3E50" />
              {/* Aerodynamic Rims */}
              <path d="M 38,40 L 38,50 M 33,45 L 43,45 M 35,42 L 41,48 M 41,42 L 35,48" stroke="#34495E" strokeWidth="0.8" />
              <path d="M 92,40 L 92,50 M 87,45 L 97,45 M 89,42 L 95,48 M 95,42 L 89,48" stroke="#34495E" strokeWidth="0.8" />
            </g>
            {/* LED Light Signature - TOGG Style */}
            <path d="M 110,28 L 115,28 L 116,32 L 115,36 L 110,36" stroke="url(#toggLED)" strokeWidth="2" fill="none" opacity="0.9"/>
            <rect x="112" y="38" width="4" height="2" rx="1" fill="#FFD700" opacity="0.8"/>
            {/* TOGG Badge */}
            <text x="63" y="38" fontSize="7" fill="#00D9FF" fontFamily="Arial" fontWeight="bold" textAnchor="middle">TOGG</text>
          </svg>
        </motion.div>

        {/* OBD-II Connected Car - Lane 2 (Delayed) */}
        <motion.div
          className="absolute top-6"
          initial={{ x: '-15%' }}
          animate={{ x: '115%' }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
            delay: 7
          }}
        >
          <svg width="105" height="46" viewBox="0 0 125 56" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="obd" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2ECC71" />
                <stop offset="50%" stopColor="#27AE60" />
                <stop offset="100%" stopColor="#2ECC71" />
              </linearGradient>
              <radialGradient id="obdGlow">
                <stop offset="0%" stopColor="#2ECC71" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#27AE60" stopOpacity="0"/>
              </radialGradient>
            </defs>
            {/* Diagnostic Data Glow */}
            <circle cx="60" cy="28" r="35" fill="url(#obdGlow)" opacity="0.3" />
            {/* Shadow */}
            <ellipse cx="62" cy="49" rx="42" ry="4" fill="#000" opacity="0.3" />
            {/* Car Body - Data-Driven Design */}
            <path d="M 24,42 Q 20,37 24,29 L 29,23 Q 35,19 46,19 L 78,19 Q 89,19 95,23 L 100,29 Q 104,37 100,42 Z"
                  fill="url(#obd)" stroke="#229954" strokeWidth="0.6"/>
            {/* Digital Display Windshield */}
            <path d="M 46,19 L 50,22 L 74,22 L 78,19 Z" fill="#00D9FF" opacity="0.6" />
            {/* HUD Display Effect */}
            <rect x="48" y="21" width="28" height="3" rx="1" fill="#00FF88" opacity="0.7" />
            {/* Side Sensor Panels */}
            <rect x="30" y="25" width="2" height="12" rx="1" fill="#2ECC71" opacity="0.8" />
            <rect x="92" y="25" width="2" height="12" rx="1" fill="#2ECC71" opacity="0.8" />
            {/* Windows with Data Overlay */}
            <path d="M 33,25 L 37,27 L 45,27 L 45,34 L 33,34 Z" fill="#4ECDC4" opacity="0.5" />
            <path d="M 79,27 L 87,27 L 91,25 L 91,34 L 79,34 Z" fill="#4ECDC4" opacity="0.5" />
            {/* OBD-II Port Indicator */}
            <rect x="56" y="38" width="12" height="3" rx="1" fill="#00D9FF" opacity="0.9" />
            <text x="62" y="40" fontSize="2" fill="#fff" fontFamily="monospace">OBD-II</text>
            {/* Smart Wheels */}
            <g>
              <circle cx="37" cy="44" r="7.5" fill="#1a1a1a" stroke="#2ECC71" strokeWidth="1.8" />
              <circle cx="87" cy="44" r="7.5" fill="#1a1a1a" stroke="#2ECC71" strokeWidth="1.8" />
              <circle cx="37" cy="44" r="4" fill="#27AE60" />
              <circle cx="87" cy="44" r="4" fill="#27AE60" />
              {/* Digital Rim Pattern */}
              <circle cx="37" cy="44" r="6" stroke="#2ECC71" strokeWidth="0.5" fill="none" strokeDasharray="2,1"/>
              <circle cx="87" cy="44" r="6" stroke="#2ECC71" strokeWidth="0.5" fill="none" strokeDasharray="2,1"/>
            </g>
            {/* AI LED Lights */}
            <rect x="102" y="30" width="4" height="8" rx="1.5" fill="#00FF88" opacity="0.9" filter="url(#glow)"/>
            <circle cx="104" cy="38" r="1.5" fill="#FFD700" opacity="0.8"/>
            {/* ECO Badge */}
            <text x="60" y="36" fontSize="6" fill="#00FF88" fontFamily="Arial" fontWeight="bold" textAnchor="middle">ECO</text>
          </svg>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto text-center z-10">
          {/* Turkish Flag Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-[#E30A17] text-white shadow-lg shadow-red-500/30"
          >
            <Flag className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wider">DAHA ÖNCE YAPILMAMIŞ TEKNOLOJİ</span>
          </motion.div>

          {/* Main Title with Neon Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-7xl md:text-9xl font-black mb-6 relative"
          >
            <span className="relative inline-block">
              <span className="text-[#E30A17] drop-shadow-[0_0_30px_rgba(227,10,23,0.5)]">
                TÜRK
              </span>
              <span className="text-gray-900 mx-4">OTO</span>
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
            className="text-xl md:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto font-medium"
          >
            <span className="text-[#E30A17] font-bold">Türkiye'nin yollarına özel</span> geliştirilmiş{' '}
            yapay zeka destekli araç asistanı
          </motion.p>

          {/* Stats Grid with Neon Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto"
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
                <div className="p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-xl hover:border-[#E30A17] hover:shadow-[0_0_30px_rgba(227,10,23,0.3)] transition-all duration-300">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-[#E30A17] flex items-center justify-center shadow-lg shadow-red-500/50">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-[#E30A17] mb-2 mt-4">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 rounded-full bg-[#E30A17] text-white font-bold text-lg shadow-xl shadow-red-500/50 hover:shadow-[0_0_40px_rgba(227,10,23,0.6)] transition-all duration-300 flex items-center gap-3"
            >
              <Car className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Dashboard Aç
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-5 rounded-full bg-white border-2 border-[#E30A17] text-[#E30A17] font-bold text-lg hover:bg-[#E30A17] hover:text-white transition-all duration-300 flex items-center gap-3"
            >
              <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Canlı Demo İzle
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Automotive Theme */}
      <section className="relative py-32 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
              <Flag className="w-5 h-5 text-[#E30A17]" />
              <span className="text-sm font-bold text-[#E30A17] tracking-wider">TÜRKİYE'NİN GURURLU</span>
            </div>
            <h2 className="text-6xl font-black mb-6">
              <span className="text-gray-900">Senin Yolculuğun,</span>{' '}
              <span className="text-[#E30A17] drop-shadow-[0_0_20px_rgba(227,10,23,0.3)]">Bizim Teknolojimiz</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              6 benzersiz özellik ile otomotiv teknolojisinde çığır açıyoruz
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="h-full p-8 rounded-3xl bg-white border-2 border-gray-200 hover:border-[#E30A17] shadow-xl hover:shadow-[0_0_40px_rgba(227,10,23,0.2)] transition-all duration-300">
                  {/* Icon Container with Neon Effect */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg shadow-red-500/50 group-hover:shadow-[0_0_30px_rgba(227,10,23,0.6)] transition-all`}>
                      <feature.icon className="w-10 h-10 text-white relative z-10" />
                    </div>
                    {/* Rotating Background Icon */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 w-20 h-20 opacity-10"
                    >
                      <feature.iconBg className="w-20 h-20 text-[#E30A17]" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#E30A17] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-block px-4 py-2 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
                    <span className="text-sm text-[#E30A17] font-bold">{feature.stats}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section - Neon Dashboard */}
      <section className="relative py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-black mb-6">
              <span className="text-[#E30A17] drop-shadow-[0_0_20px_rgba(227,10,23,0.3)]">Canlı Demo</span>
            </h2>
            <p className="text-2xl text-gray-600 font-medium">
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
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-[#E30A17]/20 shadow-2xl">
              {/* Animated Pulse Circle */}
              <div className="relative w-40 h-40 mx-auto mb-8">
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
                  <Radio className="w-16 h-16 text-white" />
                </div>
              </div>

              <p className="text-xl text-gray-700 mb-8 text-center font-medium max-w-2xl mx-auto">
                "Merhaba LyDian, arabanın motor ışığı yanıyor ne yapmalıyım?"
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group mx-auto flex items-center gap-3 px-12 py-5 rounded-full bg-[#E30A17] text-white font-bold text-lg shadow-xl shadow-red-500/50 hover:shadow-[0_0_40px_rgba(227,10,23,0.6)] transition-all"
              >
                <Wifi className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Sesli Demo Başlat
                <Circle className="w-2 h-2 animate-pulse" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OBD Dashboard Preview - Realistic Car Dashboard */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20">
              <Gauge className="w-5 h-5 text-[#E30A17]" />
              <span className="text-sm font-bold text-[#E30A17] tracking-wider">GERÇEK ZAMANLI VERİ</span>
            </div>
            <h2 className="text-6xl font-black mb-6">
              <span className="text-gray-900">OBD-II</span>{' '}
              <span className="text-[#E30A17] drop-shadow-[0_0_20px_rgba(227,10,23,0.3)]">Dashboard</span>
            </h2>
            <p className="text-2xl text-gray-600 font-medium">
              Aracınızın tüm verilerini tek ekranda görün - 100Hz örnekleme hızıyla
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
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
                <div className={`p-8 rounded-3xl bg-white border-2 border-gray-200 hover:border-[#E30A17] shadow-xl hover:shadow-[0_0_30px_rgba(227,10,23,0.2)] transition-all duration-300`}>
                  {/* Icon Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className={`w-12 h-12 rounded-full bg-[${metric.color}] flex items-center justify-center shadow-lg ${metric.glow}`}>
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 font-semibold mb-3 mt-6 uppercase tracking-wide">{metric.label}</div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-[#E30A17]">{metric.value}</span>
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{metric.unit}</div>

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

      {/* Final CTA - Turkish Flag Inspired */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-[#E30A17] to-red-700 text-white overflow-hidden">
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
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wider">TÜRKİYE'NİN GURURU</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Türkiye'nin İlk Premium
              <br />
              <span className="drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                Otomotiv AI'ı ile Tanışın
              </span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 opacity-90 font-medium">
              Beta erişimi için şimdi kaydol - ilk 1000 kullanıcıya özel <span className="font-black text-2xl">%50 indirim</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-6 rounded-full bg-white text-[#E30A17] font-black text-xl shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all flex items-center gap-3 mx-auto"
            >
              <Flag className="w-7 h-7 group-hover:rotate-12 transition-transform" />
              Beta Erişimi İste
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Clean & Professional */}
      <footer className="relative py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E30A17] flex items-center justify-center shadow-lg shadow-red-500/50">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-[#E30A17]">TÜRK OTO AI</div>
                  <div className="text-xs text-gray-400">Daha Önce Yapılmamış Teknoloji</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Türkiye'nin yollarına özel yapay zeka. Her yolculukta yanınızda, her anlamda akıllı.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#E30A17]">Hızlı Bağlantılar</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Özellikler</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fiyatlandırma</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#E30A17]">Yasal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kullanım Şartları</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">KVKK</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Flag className="w-4 h-4 text-[#E30A17]" />
              <span>© 2025 Ailydian. Tüm hakları saklıdır.</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Türkiye'de</span>
              <span className="text-[#E30A17] font-bold">❤️</span>
              <span>ile geliştirildi</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

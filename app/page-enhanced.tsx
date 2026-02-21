'use client';

// ============================================
// TÜRK OTO AI - Premium Landing Page
// Enhanced with 3D animations, screenshots, and testimonials
// ============================================

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';
import {
  Car, Activity, Navigation, Trophy, Clock, Wifi, Battery, Thermometer,
  Fuel, Radio, Settings, Zap, ChevronRight, Gauge, Shield, Brain,
  Wrench, MapPin, TrendingUp, Globe, Star, Check, Play, Users,
  BarChart3, MessageSquare, Award, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: Brain,
      title: 'Yapay Zeka Asistan',
      description: 'Türkçe sesli AI asistan, sürüş deneyiminizi kişiselleştirir',
      color: '#E30A17',
      gradient: 'from-red-500 to-red-700',
      stats: '7/24 Destek'
    },
    {
      icon: Gauge,
      title: 'OBD-II Entegrasyonu',
      description: 'Gerçek zamanlı araç verileri ve performans takibi',
      color: '#2563eb',
      gradient: 'from-blue-500 to-blue-700',
      stats: '50+ Veri Noktası'
    },
    {
      icon: Navigation,
      title: 'Akıllı Navigasyon',
      description: 'Türkiye özel yol bilgileri ve canlı trafik',
      color: '#16a34a',
      gradient: 'from-green-500 to-green-700',
      stats: 'Canlı Trafik'
    },
    {
      icon: Trophy,
      title: 'Gamification',
      description: 'Sürüş skorları, başarımlar ve liderlik tablosu',
      color: '#f59e0b',
      gradient: 'from-amber-500 to-amber-700',
      stats: '30+ Başarım'
    },
    {
      icon: Wrench,
      title: 'Bakım Tahmini',
      description: 'AI destekli öngörücü bakım ve arıza tespit',
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-purple-700',
      stats: '10 Bileşen'
    },
    {
      icon: Globe,
      title: 'Türkiye Servisleri',
      description: 'HGS/OGS, MTV, EPDK yakıt fiyatları entegre',
      color: '#ec4899',
      gradient: 'from-pink-500 to-pink-700',
      stats: 'Otomatik Güncelleme'
    },
  ];

  const dashboardFeatures = [
    {
      title: 'Canlı OBD Verileri',
      description: 'Motor devri, hız, sıcaklık, yakıt seviyesi anlık takip',
      image: '/screenshots/obd-live.png', // We'll add these
      stats: ['50+ Parametre', 'Gerçek Zamanlı', 'Grafik Gösterim']
    },
    {
      title: 'Sesli AI Komutlar',
      description: 'El kullanmadan navigasyon, müzik, araç kontrolü',
      image: '/screenshots/voice-assistant.png',
      stats: ['Türkçe Destek', 'Öğrenme Yeteneği', 'Offline Mod']
    },
    {
      title: 'Performans Analizi',
      description: 'Sürüş alışkanlıkları, yakıt verimliliği, karbon ayak izi',
      image: '/screenshots/analytics.png',
      stats: ['Detaylı Raporlar', 'Karşılaştırma', 'Öneriler']
    },
  ];

  const testimonials = [
    {
      name: 'Mehmet Yılmaz',
      role: 'TOGG T10X Sahibi',
      avatar: '👨‍💼',
      rating: 5,
      text: 'TÜRK OTO AI sayesinde aracımı çok daha iyi tanıyorum. Yakıt tasarrufu %15 arttı!'
    },
    {
      name: 'Ayşe Demir',
      role: 'Tesla Model 3 Kullanıcısı',
      avatar: '👩‍💼',
      rating: 5,
      text: 'Sesli asistan harika! Trafikte eller serbest, güvenli sürüş. Türkçe desteği mükemmel.'
    },
    {
      name: 'Can Özdemir',
      role: 'Renault Clio Sürücüsü',
      avatar: '👨‍🔧',
      rating: 5,
      text: 'Bakım hatırlatmaları sayesinde büyük bir arızanın önüne geçtim. Teşekkürler!'
    },
  ];

  const stats = [
    { value: '10K+', label: 'Aktif Kullanıcı' },
    { value: '50M+', label: 'Toplam KM' },
    { value: '98%', label: 'Memnuniyet' },
    { value: '24/7', label: 'Destek' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">

      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E30A17]/10 via-transparent to-gray-900/10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#E30A17]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Car className="w-5 h-5 text-[#E30A17]" />
              <span className="text-sm font-bold text-[#E30A17]">TÜRKİYE'NİN AKILLI ARAÇ SİSTEMİ</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-[#E30A17] via-gray-900 to-[#E30A17] bg-clip-text text-transparent">
              TÜRK OTO AI
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
              Senin Yolculuğun, Bizim Teknolojimiz
            </p>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Türkiye'nin yollarına özel geliştirilmiş yapay zeka destekli akıllı araç asistanı.
              OBD-II entegrasyonu, sesli AI asistan, akıllı navigasyon ve daha fazlası.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(227, 10, 23, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 rounded-full bg-gradient-to-r from-[#E30A17] to-red-700 text-white font-bold text-lg shadow-2xl flex items-center gap-3"
                >
                  <span>Dashboard'a Git</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-full border-2 border-gray-300 hover:border-[#E30A17] text-gray-700 hover:text-[#E30A17] font-bold text-lg flex items-center gap-3 transition-all"
              >
                <Play className="w-6 h-6" />
                <span>Tanıtım Videosu</span>
              </motion.button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg"
                >
                  <div className="text-4xl font-black text-[#E30A17] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#E30A17] flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#E30A17]"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Grid - Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">Özellikler</h2>
            <p className="text-xl text-gray-600">Her yolculukta yanınızda, her anlamda akıllı</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={() => setHoveredFeature(null)}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} text-white shadow-2xl overflow-hidden cursor-pointer`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-3xl"
                  animate={{
                    opacity: hoveredFeature === i ? 1 : 0,
                  }}
                />

                <feature.icon className="w-16 h-16 mb-6 opacity-90" />

                <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
                <p className="text-white/90 mb-4">{feature.description}</p>

                <div className="flex items-center gap-2 text-sm font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{feature.stats}</span>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredFeature === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">Dashboard Özellikleri</h2>
            <p className="text-xl text-gray-300">Tesla-tarzı tam ekran deneyim</p>
          </motion.div>

          <div className="space-y-16">
            {dashboardFeatures.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Screenshot Placeholder */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-700 to-gray-600"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BarChart3 className="w-24 h-24 text-white/20" />
                    </div>
                    <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur text-sm">
                      📸 Screenshot: {item.title}
                    </div>
                  </motion.div>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <h3 className="text-4xl font-black mb-4">{item.title}</h3>
                  <p className="text-xl text-gray-300 mb-6">{item.description}</p>

                  <div className="flex flex-wrap gap-3">
                    {item.stats.map((stat, j) => (
                      <div key={j} className="px-4 py-2 rounded-full bg-[#E30A17]/20 border border-[#E30A17]/30 text-sm font-semibold flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#E30A17]" />
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">Kullanıcı Yorumları</h2>
            <p className="text-xl text-gray-600">Binlerce mutlu sürücünün deneyimleri</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-xl"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-[#E30A17] text-[#E30A17]" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#E30A17] to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-black/20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Hemen Başla
            </h2>
            <p className="text-2xl mb-12 text-white/90">
              Aracını daha akıllı hale getirmeye hazır mısın?
            </p>

            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 rounded-full bg-white text-[#E30A17] font-black text-xl shadow-2xl hover:shadow-3xl transition-shadow"
              >
                Ücretsiz Dene
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="w-6 h-6 text-[#E30A17]" />
            <span className="font-bold text-white text-xl">TÜRK OTO AI</span>
          </div>
          <p className="mb-4">© 2024 TÜRK OTO AI. Tüm hakları saklıdır.</p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="#" className="hover:text-[#E30A17] transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-[#E30A17] transition-colors">Kullanım Koşulları</a>
            <a href="#" className="hover:text-[#E30A17] transition-colors">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

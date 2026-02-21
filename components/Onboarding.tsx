'use client';

// ============================================
// TÜRK OTO AI - Premium Onboarding Component
// Responsive full-screen intro animation
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Sparkles, Zap, Shield, Trophy, ChevronRight,
  CheckCircle, ArrowRight
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  type?: 'landing' | 'dashboard';
}

export default function Onboarding({ onComplete, type = 'landing' }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const landingSteps = [
    {
      icon: Car,
      title: 'TÜRK OTO AI\'ye Hoş Geldiniz',
      description: 'Türkiye\'nin yollarına özel geliştirilmiş yapay zeka destekli akıllı araç asistanı',
      gradient: 'from-[#E30A17] to-red-700',
      features: [
        'Sesli AI Asistan',
        'OBD-II Entegrasyonu',
        'Akıllı Navigasyon'
      ]
    },
    {
      icon: Sparkles,
      title: 'Yapay Zeka Gücü',
      description: '7/24 yanınızda olan akıllı asistanınız ile aracınızı sesli komutlarla kontrol edin',
      gradient: 'from-blue-500 to-blue-700',
      features: [
        '99% Ses Tanıma Doğruluğu',
        'Türkçe Dil Desteği',
        'Bağlam Hafızası'
      ]
    },
    {
      icon: Shield,
      title: 'Güvenli ve Akıllı',
      description: 'Verileriniz güvende, aracınız her zaman kontrol altında',
      gradient: 'from-green-500 to-green-700',
      features: [
        'End-to-End Şifreleme',
        'Öngörücü Bakım',
        'Gerçek Zamanlı Trafik'
      ]
    },
    {
      icon: Trophy,
      title: 'Hemen Başlayın!',
      description: 'Dashboard\'a geçin ve aracınızı akıllı hale getirmeye başlayın',
      gradient: 'from-purple-500 to-purple-700',
      features: [
        'Ücretsiz Deneme',
        'Kolay Kurulum',
        'Anında Destek'
      ]
    }
  ];

  const dashboardSteps = [
    {
      icon: Car,
      title: 'Dashboard\'a Hoş Geldiniz',
      description: 'Aracınızın tüm verilerini tek ekranda görüntüleyin ve yönetin',
      gradient: 'from-[#E30A17] to-red-700',
      features: [
        'Canlı OBD Verileri',
        'Performans Grafikleri',
        'Sürüş Skorları'
      ]
    },
    {
      icon: Zap,
      title: 'Gerçek Zamanlı İzleme',
      description: 'Motor devri, hız, yakıt tüketimi ve daha fazlasını anlık takip edin',
      gradient: 'from-blue-500 to-blue-700',
      features: [
        '50+ Veri Noktası',
        '100Hz Örnekleme',
        'Anlık Uyarılar'
      ]
    },
    {
      icon: Trophy,
      title: 'Gamification',
      description: 'Sürüş skorlarınızı artırın, başarımları kazanın ve liderlik tablosunda yükselin',
      gradient: 'from-amber-500 to-amber-700',
      features: [
        '30+ Başarım',
        'Liderlik Tablosu',
        'Ödül Sistemi'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Hazırsınız!',
      description: 'Artık dashboard\'unuzu kullanmaya başlayabilirsiniz',
      gradient: 'from-green-500 to-green-700',
      features: [
        'Kolay Kullanım',
        'Özelleştirilebilir',
        'Mobil Uyumlu'
      ]
    }
  ];

  const steps = type === 'landing' ? landingSteps : dashboardSteps;
  const currentStepData = steps[currentStep];

  useEffect(() => {
    // Check if user has seen onboarding before - ONLY once on mount
    const hasSeenOnboarding = localStorage.getItem(`onboarding_${type}_completed`);
    if (hasSeenOnboarding === 'true') {
      setIsVisible(false);
      // Use setTimeout to avoid calling onComplete during render
      const timer = setTimeout(() => onComplete(), 0);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run ONLY once on mount - never re-run

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem(`onboarding_${type}_completed`, 'true');
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br ${currentStepData.gradient} opacity-20 blur-3xl`}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl ${currentStepData.gradient} opacity-20 blur-3xl`}
            animate={{
              rotate: [360, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="mb-8 flex justify-center"
              >
                <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${currentStepData.gradient} flex items-center justify-center shadow-2xl`}>
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(227, 10, 23, 0.3)',
                        '0 0 60px rgba(227, 10, 23, 0.6)',
                        '0 0 20px rgba(227, 10, 23, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full"
                  />
                  <currentStepData.icon className="w-16 h-16 text-white relative z-10" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-black text-white mb-4"
              >
                {currentStepData.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
              >
                {currentStepData.description}
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
              >
                {currentStepData.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white font-semibold text-sm md:text-base">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Progress Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center gap-2 mb-8"
              >
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentStep
                        ? 'w-12 bg-white'
                        : i < currentStep
                        ? 'w-2 bg-green-400'
                        : 'w-2 bg-white/30'
                    }`}
                    animate={{
                      scale: i === currentStep ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: i === currentStep ? Infinity : 0,
                    }}
                  />
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                {currentStep < steps.length - 1 ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className={`group px-10 py-5 rounded-full bg-gradient-to-r ${currentStepData.gradient} text-white font-bold text-lg shadow-2xl flex items-center gap-3`}
                    >
                      <span>Devam Et</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSkip}
                      className="px-10 py-5 rounded-full border-2 border-white/30 hover:border-white/60 text-white font-bold text-lg transition-all"
                    >
                      Atla
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                    className={`group px-12 py-6 rounded-full bg-gradient-to-r ${currentStepData.gradient} text-white font-black text-xl shadow-2xl flex items-center gap-3`}
                  >
                    <span>Başlayalım!</span>
                    <ChevronRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                )}
              </motion.div>

              {/* Step Counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-8 text-white/60 text-sm font-semibold"
              >
                Adım {currentStep + 1} / {steps.length}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

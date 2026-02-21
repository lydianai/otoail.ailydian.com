'use client';

import { motion } from 'framer-motion';
import { Car, Flag, Users, Target, Sparkles, TrendingUp, Award, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HakkimizdaPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E30A17]/20 to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-14 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-[#E30A17]" />
              <span className="text-xs sm:text-sm font-bold tracking-wider">TÜRK OTO AI HAKKINDA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight px-4">
              Türkiye'nin İlk
              <br />
              <span className="text-[#E30A17] drop-shadow-[0_0_30px_rgba(227,10,23,0.5)]">
                Premium Otomotiv AI'ı
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Yerli teknoloji ile geliştirilen, Türkiye'nin yollarına ve sürücülerine özel yapay zeka çözümü
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-14 md:mb-16"
          >
            {[
              { number: '1M+', label: 'Hedef Kullanıcı', icon: Users },
              { number: '%99.9', label: 'Uptime Garantisi', icon: TrendingUp },
              { number: '24/7', label: 'Destek Hizmeti', icon: Zap },
              { number: '100%', label: 'Yerli Teknoloji', icon: Flag },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-[#E30A17]" />
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E30A17]/20">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#E30A17]" />
                <span className="text-xs sm:text-sm font-bold">MİSYONUMUZ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
                Türk Sürücülerine
                <span className="text-[#E30A17]"> Akıllı Çözümler</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                TÜRK OTO AI, Türkiye'nin otomotiv sektöründe yapay zeka çağını başlatan öncü platformdur.
                Yerli ve milli teknoloji ile geliştirilen sistemimiz, Türk sürücülerin ihtiyaçlarına özel tasarlanmıştır.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                HGS, MTV, trafik cezaları gibi Türkiye'ye özel servisleri, gerçek zamanlı OBD-II araç takibi ve
                Türkçe sesli asistan ile bir araya getirerek benzersiz bir deneyim sunuyoruz.
              </p>
            </div>

            <div className="relative mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E30A17]/30 to-transparent rounded-2xl sm:rounded-3xl blur-3xl"></div>
              <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="space-y-4 sm:space-y-6">
                  {[
                    { icon: Sparkles, title: 'Yerli Teknoloji', desc: '100% Türkiye\'de geliştirildi' },
                    { icon: Zap, title: 'Gerçek Zamanlı', desc: 'Anlık veri ve AI analizi' },
                    { icon: Award, title: 'Premium Kalite', desc: 'Enterprise seviye güvenilirlik' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#E30A17]/20">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#E30A17]" />
                      </div>
                      <div>
                        <div className="font-bold text-base sm:text-lg mb-1">{item.title}</div>
                        <div className="text-xs sm:text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E30A17]/20">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#E30A17]" />
              <span className="text-xs sm:text-sm font-bold">VİZYONUMUZ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 px-4">
              Geleceğin <span className="text-[#E30A17]">Otomotiv Ekosistemi</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              2025 yılında Türkiye'nin en büyük otomotiv AI platformu olmayı hedefliyoruz
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Kapsamlı Entegrasyon',
                desc: 'Tüm Türk otomotiv ekosistemi ile entegrasyon: HGS, E-Devlet, Sigorta, Servis ağları',
                color: 'from-red-500/20 to-red-600/20',
              },
              {
                title: 'Akıllı Tahmin',
                desc: 'AI ile bakım önceden tahmin, yakıt tasarrufu önerileri, rota optimizasyonu',
                color: 'from-blue-500/20 to-blue-600/20',
              },
              {
                title: 'Topluluk Gücü',
                desc: 'Türkiye\'nin en büyük sürücü topluluğu, deneyim paylaşımı, liderlik tabloları',
                color: 'from-purple-500/20 to-purple-600/20',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#E30A17]/50 transition-all"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 sm:mb-6`}>
                  <div className="text-2xl sm:text-3xl font-black">{i + 1}</div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-[#E30A17] to-[#B50811]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 px-4">
              Türkiye'nin Otomotiv Devrimi'ne Katıl
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-4">
              Beta erişimi için şimdi kaydol, premium özelliklere ilk sen sahip ol
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-full bg-white text-[#E30A17] font-bold text-base sm:text-lg shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  Dashboard'u İncele
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-full border-2 border-white text-white font-bold text-base sm:text-lg hover:bg-white hover:text-[#E30A17] transition-all min-h-[48px]"
                >
                  Ana Sayfa
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}

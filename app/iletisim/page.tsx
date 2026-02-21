'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Flag, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function IletisimPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#E30A17]" />
              <span className="text-xs sm:text-sm font-bold tracking-wider">İLETİŞİM</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-4">
              Bizimle <span className="text-[#E30A17]">İletişime Geçin</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Sorularınız, önerileriniz veya destek talepleriniz için buradan ulaşabilirsiniz
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">Mesaj Gönderin</h2>
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2">Adınız Soyadınız</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 focus:border-[#E30A17] outline-none transition-colors text-sm sm:text-base"
                    placeholder="Ad Soyad"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2">E-posta Adresiniz</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 focus:border-[#E30A17] outline-none transition-colors text-sm sm:text-base"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2">Konu</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 focus:border-[#E30A17] outline-none transition-colors text-sm sm:text-base"
                    placeholder="Mesaj konusu"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2">Mesajınız</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 focus:border-[#E30A17] outline-none transition-colors resize-none text-sm sm:text-base"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 rounded-xl bg-[#E30A17] text-white font-bold hover:bg-[#B50811] transition-colors flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base"
                >
                  <Send className="w-5 h-5" />
                  Gönder
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#E30A17]/20 to-transparent border border-white/10">
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-[#E30A17] mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-black mb-1 sm:mb-2">E-posta</h3>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">Yazılı destek için</p>
                <a href="mailto:destek@turkotoai.com" className="text-sm sm:text-base text-[#E30A17] font-bold hover:underline break-all">
                  destek@turkotoai.com
                </a>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/20 to-transparent border border-white/10">
                <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-black mb-1 sm:mb-2">Telefon</h3>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">Acil destek hattı</p>
                <a href="tel:+908501234567" className="text-sm sm:text-base text-blue-400 font-bold hover:underline">
                  0850 123 45 67
                </a>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500/20 to-transparent border border-white/10">
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-black mb-1 sm:mb-2">Çalışma Saatleri</h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Pazartesi - Cuma: 09:00 - 18:00<br />
                  Cumartesi: 10:00 - 16:00<br />
                  Pazar: Kapalı
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-green-500/20 to-transparent border border-white/10">
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-black mb-1 sm:mb-2">Adres</h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Ailydian Teknoloji A.Ş.<br />
                  Maslak Mahallesi<br />
                  Büyükdere Caddesi No: 123<br />
                  34398 Sarıyer / İstanbul
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}

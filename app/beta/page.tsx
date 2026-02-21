'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle, Sparkles, Users, Zap, Shield, Rocket, Mail, User, Phone, Car } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BetaPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carModel: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const betaFeatures = [
    {
      icon: Sparkles,
      title: 'Öncelikli Erişim',
      description: 'Yeni özelliklere ilk erişim sağlayın'
    },
    {
      icon: Users,
      title: 'Beta Topluluğu',
      description: 'Özel beta kullanıcı grubuna katılın'
    },
    {
      icon: Zap,
      title: 'Premium Özellikler',
      description: 'Beta döneminde tüm premium özellikler ücretsiz'
    },
    {
      icon: Shield,
      title: 'Teknik Destek',
      description: '7/24 öncelikli teknik destek hizmeti'
    }
  ];

  const stats = [
    { value: '500+', label: 'Beta Kullanıcısı' },
    { value: '%95', label: 'Memnuniyet Oranı' },
    { value: '24/7', label: 'Teknik Destek' },
    { value: '0 TL', label: 'Beta Ücreti' }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 px-4"
          >
            Başvurunuz Alındı!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 px-4"
          >
            Beta programı başvurunuz için teşekkür ederiz. <br />
            Ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700 mb-6 sm:mb-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Sonraki Adımlar</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E30A17] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-1">E-posta Onayı</p>
                  <p className="text-xs sm:text-sm text-gray-400 break-all">
                    {formData.email} adresinize onay e-postası gönderdik
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E30A17] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-1">Değerlendirme</p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Başvurunuz 2-3 iş günü içinde değerlendirilecek
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E30A17] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold mb-1">Beta Erişimi</p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Onay sonrası beta hesabınız aktif edilecek
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <Link href="/" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-full bg-gradient-to-r from-[#E30A17] to-red-600 text-white font-bold min-h-[48px]"
            >
              Ana Sayfaya Dön
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#E30A17]/20 to-red-600/20 border border-[#E30A17]/30 mb-4 sm:mb-6">
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-[#E30A17]" />
            <span className="text-xs sm:text-sm font-semibold text-[#E30A17]">Beta v2.0 Şimdi Açık</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 px-4">
            Beta Programına
            <br />
            <span className="bg-gradient-to-r from-[#E30A17] to-red-400 bg-clip-text text-transparent">
              Katılın
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            TÜRK OTO AI'ın geliştirilmesinde aktif rol alın ve yeni özelliklere ilk erişim sağlayın
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 text-center"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-[#E30A17] to-red-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Beta Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {betaFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-[#E30A17] transition-colors"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#E30A17] to-red-600 flex items-center justify-center mb-3 sm:mb-4">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Beta Başvuru Formu</h3>
              <p className="text-sm sm:text-base text-gray-400">
                Formu doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  Ad Soyad *
                </label>
                <div className="relative">
                  <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl focus:border-[#E30A17] focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="İsminizi girin"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  E-posta Adresi *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl focus:border-[#E30A17] focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  Telefon Numarası *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl focus:border-[#E30A17] focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
              </div>

              {/* Car Model */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  Araç Modeli *
                </label>
                <div className="relative">
                  <Car className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl focus:border-[#E30A17] focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="Örn: Toyota Corolla 2020"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">
                  Mesajınız (Opsiyonel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl focus:border-[#E30A17] focus:outline-none transition-colors resize-none text-sm sm:text-base"
                  placeholder="Beta programından beklentilerinizi paylaşın..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all min-h-[48px] ${
                  isSubmitting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#E30A17] to-red-600 hover:shadow-lg hover:shadow-red-500/50'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                    Başvuruyu Gönder
                  </>
                )}
              </motion.button>

              <p className="text-xs sm:text-sm text-gray-400 text-center">
                Başvurunuzu göndererek{' '}
                <Link href="/kvkk" className="text-[#E30A17] hover:underline">
                  KVKK Aydınlatma Metni
                </Link>
                'ni kabul etmiş olursunuz.
              </p>
            </form>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 sm:mt-12 max-w-3xl mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-black text-center mb-6 sm:mb-8 px-4">Sıkça Sorulan Sorular</h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: 'Beta programı ne kadar sürecek?',
                a: 'Beta programı yaklaşık 3 ay sürecek ve bu süre boyunca tüm premium özellikler ücretsiz olacak.'
              },
              {
                q: 'Herkes beta programına kabul edilir mi?',
                a: 'Başvurular değerlendirilerek uygun kullanıcılar beta programına dahil edilir. Genellikle 2-3 iş günü içinde geri dönüş yapılır.'
              },
              {
                q: 'Beta kullanıcıları hangi avantajlara sahip?',
                a: 'Yeni özelliklere öncelikli erişim, ücretsiz premium hesap, 7/24 teknik destek ve ürün geliştirme sürecinde söz hakkı.'
              },
              {
                q: 'Beta sonrası hesabım ne olacak?',
                a: 'Beta sonrası hesabınız normal kullanıcı hesabına dönüşür. İsterseniz premium abonelik ile devam edebilirsiniz.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
              >
                <h4 className="font-bold text-base sm:text-lg mb-2">{faq.q}</h4>
                <p className="text-sm sm:text-base text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
    </>
  );
}

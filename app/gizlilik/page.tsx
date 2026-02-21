'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle, CheckCircle, Flag } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GizlilikPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#E30A17]" />
              <span className="text-xs sm:text-sm font-bold tracking-wider">GİZLİLİK POLİTİKASI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
              Gizliliğiniz <span className="text-[#E30A17]">Bizim İçin Önemli</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-3 sm:mb-4">
              TÜRK OTO AI olarak kişisel verilerinizin güvenliği ve gizliliği en önemli önceliğimizdir.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-400">
              Son Güncelleme: 11 Aralık 2025
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12"
          >
            {[
              { icon: Database, label: 'Veri Toplama', id: 'veri-toplama' },
              { icon: Lock, label: 'Güvenlik', id: 'guvenlik' },
              { icon: UserCheck, label: 'Haklarınız', id: 'haklariniz' },
              { icon: Eye, label: 'Çerezler', id: 'cerezler' },
            ].map((item, i) => (
              <a
                key={i}
                href={`#${item.id}`}
                className="p-3 sm:p-4 md:p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#E30A17]/50 transition-all text-center group min-h-[80px] sm:min-h-[100px] flex flex-col items-center justify-center"
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mx-auto mb-1 sm:mb-2 text-[#E30A17] group-hover:scale-110 transition-transform" />
                <div className="text-xs sm:text-sm font-semibold">{item.label}</div>
              </a>
            ))}
          </motion.div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              id="veri-toplama"
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-[#E30A17]/20">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#E30A17]" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">1. Toplanan Veriler</h2>
              </div>

              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">1.1. Kişisel Bilgiler</h3>
                  <p className="mb-2 sm:mb-3">TÜRK OTO AI platformunu kullanırken aşağıdaki kişisel verilerinizi toplarız:</p>
                  <ul className="space-y-2 sm:space-y-3 ml-3 sm:ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (opsiyonel)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Araç Bilgileri:</strong> Plaka, marka, model, yıl, VIN</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Ödeme Bilgileri:</strong> Kredi kartı bilgileri (şifrelenmiş)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">1.2. Otomatik Toplanan Veriler</h3>
                  <ul className="space-y-2 sm:space-y-3 ml-3 sm:ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span><strong>OBD-II Verileri:</strong> Motor devri, hız, yakıt tüketimi, arıza kodları</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Konum Bilgileri:</strong> GPS koordinatları (navigasyon için)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Kullanım Verileri:</strong> Uygulama kullanım istatistikleri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Cihaz Bilgileri:</strong> IP adresi, tarayıcı türü, işletim sistemi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              id="guvenlik"
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-blue-500/20">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">2. Veri Güvenliği</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>Verilerinizin güvenliği için endüstri standardı önlemler alıyoruz:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">🔐 SSL/TLS Şifreleme</div>
                    <p className="text-xs sm:text-sm">Tüm veri transferleri 256-bit SSL ile şifrelenir</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">🛡️ Firewall Koruması</div>
                    <p className="text-xs sm:text-sm">Gelişmiş firewall ve DDoS koruması</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">🔑 İki Faktörlü Doğrulama</div>
                    <p className="text-xs sm:text-sm">Hesap güvenliği için 2FA desteği</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">💾 Yedekleme</div>
                    <p className="text-xs sm:text-sm">Günlük otomatik şifrelenmiş yedekler</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              id="haklariniz"
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-purple-500/20">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">3. Kullanıcı Hakları (KVKK)</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında haklarınız:</p>
                <ul className="space-y-2 sm:space-y-3 ml-3 sm:ml-4 mt-3 sm:mt-4">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Bilgi Edinme:</strong> Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Erişim:</strong> İşlenmiş verilerinize erişim talep etme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Düzeltme:</strong> Yanlış veya eksik verilerin düzeltilmesini isteme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Silme:</strong> Verilerinizin silinmesini veya yok edilmesini talep etme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>İtiraz:</strong> Veri işleme faaliyetlerine itiraz etme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Taşınabilirlik:</strong> Verilerinizi başka bir platforma aktarma</span>
                  </li>
                </ul>
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <p className="text-xs sm:text-sm">
                    <strong>Başvuru için:</strong> <a href="mailto:kvkk@turkotoai.com" className="text-purple-400 hover:underline">kvkk@turkotoai.com</a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              id="cerezler"
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-orange-500/20">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">4. Çerez Politikası</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>Platformumuzda kullanılan çerez türleri:</p>
                <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">🍪 Zorunlu Çerezler</div>
                    <p className="text-xs sm:text-sm">Platformun temel işlevlerini sağlar (oturum yönetimi, güvenlik)</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">📊 Analitik Çerezler</div>
                    <p className="text-xs sm:text-sm">Kullanım istatistikleri ve performans analizleri</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">🎯 Pazarlama Çerezleri</div>
                    <p className="text-xs sm:text-sm">Kişiselleştirilmiş reklamlar (Onay ile)</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm mt-3 sm:mt-4">
                  Çerezleri tarayıcı ayarlarından yönetebilir veya reddedebilirsiniz.
                </p>
              </div>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">5. Veri Paylaşımı</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>Verilerinizi yalnızca aşağıdaki durumlarda paylaşırız:</p>
                <ul className="space-y-1 sm:space-y-2 ml-3 sm:ml-4">
                  <li>• Yasal yükümlülükler (mahkeme kararı, resmi talep)</li>
                  <li>• Hizmet sağlayıcılar (ödeme işlemcileri, bulut altyapısı)</li>
                  <li>• İş ortakları (açık rızanız ile)</li>
                  <li>• Acil durumlarda (güvenlik tehditleri)</li>
                </ul>
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-xs sm:text-sm text-red-400 font-semibold">
                    ⚠️ Verilerinizi asla üçüncü taraflara satmayız veya kiralamayız!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#E30A17]/20 to-transparent border border-[#E30A17]/30"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4">İletişim</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-4">
                Gizlilik politikamız hakkında sorularınız için:
              </p>
              <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <p>📧 <a href="mailto:gizlilik@turkotoai.com" className="text-[#E30A17] hover:underline">gizlilik@turkotoai.com</a></p>
                <p>📞 <a href="tel:+908501234567" className="text-[#E30A17] hover:underline">0850 123 45 67</a></p>
                <p>📍 Ailydian Teknoloji A.Ş., Maslak / İstanbul</p>
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

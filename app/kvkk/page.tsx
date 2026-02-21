'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Lock, UserCheck, FileText, AlertCircle, Info, Flag } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KVKKPage() {
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
              <span className="text-xs sm:text-sm font-bold tracking-wider">KVKK AYDINLATMA METNİ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
              Kişisel Verilerin
              <br />
              <span className="text-[#E30A17]">Korunması ve İşlenmesi</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-3 sm:mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-400">
              Son Güncelleme: 11 Aralık 2025
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Veri Sorumlusu</h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    <strong>Ailydian Teknoloji A.Ş.</strong><br />
                    Maslak Mahallesi, Büyükdere Caddesi No: 123, 34398 Sarıyer / İstanbul<br />
                    <a href="mailto:kvkk@turkotoai.com" className="text-blue-400 hover:underline">kvkk@turkotoai.com</a> |
                    <a href="tel:+908501234567" className="text-blue-400 hover:underline ml-2">0850 123 45 67</a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-[#E30A17]/20">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#E30A17]" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">1. İşlenen Kişisel Veriler</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-white">Veri Kategorisi</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-white">Veriler</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-white">İşleme Amacı</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-2 sm:py-4 px-2 sm:px-4 font-semibold text-white">Kimlik</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Ad, soyad, T.C. kimlik numarası</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Kimlik doğrulama, güvenlik</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 sm:py-4 px-2 sm:px-4 font-semibold text-white">İletişim</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">E-posta, telefon, adres</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">İletişim, bilgilendirme</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 sm:py-4 px-2 sm:px-4 font-semibold text-white">Araç</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Plaka, marka, model, VIN</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Hizmet sunumu, araç takibi</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 sm:py-4 px-2 sm:px-4 font-semibold text-white">Finansal</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Kredi kartı, banka bilgileri</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Ödeme işlemleri</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 sm:py-4 px-2 sm:px-4 font-semibold text-white">Lokasyon</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">GPS koordinatları, konum</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Navigasyon, harita hizmetleri</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 sm:py-4 px-2 sm:px-4 font-semibold text-white">Araç Performans</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">OBD-II verileri, sürüş alışkanlıkları</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Performans analizi, bakım tahmini</td>
                      </tr>
                      <tr>
                        <td className="py-2 sm:py-4 px-2 sm:px-4 font-semibold text-white">İşlem Güvenliği</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">IP adresi, log kayıtları</td>
                        <td className="py-2 sm:py-4 px-2 sm:px-4">Güvenlik, dolandırıcılık önleme</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-blue-500/20">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">2. Kişisel Verilerin İşlenme Amaçları</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">📋 Hizmet Sunumu</h3>
                    <p className="text-xs sm:text-sm">TÜRK OTO AI platformu hizmetlerinin sağlanması ve geliştirilmesi</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">🔐 Güvenlik</h3>
                    <p className="text-xs sm:text-sm">Kullanıcı hesaplarının güvenliğinin sağlanması ve dolandırıcılık önleme</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">📞 İletişim</h3>
                    <p className="text-xs sm:text-sm">Kullanıcılarla iletişim kurulması ve bilgilendirme</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">⚖️ Yasal Yükümlülükler</h3>
                    <p className="text-xs sm:text-sm">Mevzuattan kaynaklanan yükümlülüklerin yerine getirilmesi</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">📊 Analiz ve Geliştirme</h3>
                    <p className="text-xs sm:text-sm">Hizmet kalitesinin artırılması ve kişiselleştirme</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">💳 Ödeme İşlemleri</h3>
                    <p className="text-xs sm:text-sm">Abonelik ve ödeme işlemlerinin gerçekleştirilmesi</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-purple-500/20">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">3. Kişisel Verilerin Aktarımı</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>Kişisel verileriniz aşağıdaki durumlarda ve KVKK hükümlerine uygun olarak aktarılabilir:</p>

                <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">🏦 Ödeme Kuruluşları</h3>
                    <p className="text-xs sm:text-sm">İyzico, Stripe gibi güvenli ödeme sağlayıcıları (Kredi kartı işlemleri için)</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">☁️ Bulut Hizmet Sağlayıcıları</h3>
                    <p className="text-xs sm:text-sm">AWS, Google Cloud (Veri saklama ve işleme altyapısı için)</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">🗺️ Harita Servisleri</h3>
                    <p className="text-xs sm:text-sm">Google Maps, Yandex Maps (Navigasyon hizmetleri için)</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">⚖️ Kamu Kurum ve Kuruluşları</h3>
                    <p className="text-xs sm:text-sm">Yasal zorunluluk durumunda yetkili kamu kurumları</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-yellow-200">
                    <strong>Önemli:</strong> Verileriniz yurt dışına aktarılmadan önce Kişisel Verileri
                    Koruma Kurulu'nun yeterlilik kararı veya açık rızanız alınır.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-green-500/20">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">4. Kişisel Veri Sahibinin Hakları (KVKK m.11)</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>

                <div className="grid gap-2 sm:gap-3 mt-3 sm:mt-4">
                  {[
                    'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
                    'Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme',
                    'Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme',
                    'Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme',
                    'Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme',
                    'KVKK\'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme',
                    'Düzeltme, silme veya yok edilme taleplerinin aktarıldığı üçüncü kişilere bildirilmesini isteme',
                    'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
                    'Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
                  ].map((right, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-green-400">{i + 1}</span>
                      </div>
                      <p className="text-xs sm:text-sm">{right}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">5. Başvuru Yöntemi</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>Haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">📧 E-posta</h3>
                    <a href="mailto:kvkk@turkotoai.com" className="text-xs sm:text-sm text-blue-400 hover:underline break-all">
                      kvkk@turkotoai.com
                    </a>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">📬 KEP</h3>
                    <p className="text-xs sm:text-sm text-blue-400 break-all">
                      ailydian@hs01.kep.tr
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">✉️ Posta</h3>
                    <p className="text-xs sm:text-sm">
                      Maslak Mah. Büyükdere Cad. No:123<br />
                      34398 Sarıyer/İstanbul
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white mb-2 sm:mb-3 text-sm sm:text-base">📄 Başvuru Formu</h3>
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2">Başvurularınızda bulunması gereken bilgiler:</p>
                  <ul className="text-xs sm:text-sm space-y-0.5 sm:space-y-1 ml-3 sm:ml-4">
                    <li>• Adınız, soyadınız ve başvuru yazılı ise imzanız</li>
                    <li>• T.C. kimlik numaranız (yabancı iseniz pasaport numarası)</li>
                    <li>• Tebligata esas yerleşim yeri veya iş yeri adresi</li>
                    <li>• Varsa bildirime esas elektronik posta adresi, telefon ve faks numarası</li>
                    <li>• Talep konusu</li>
                  </ul>
                </div>

                <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <p className="text-xs sm:text-sm text-green-200">
                    ✅ <strong>Yanıt Süresi:</strong> Başvurularınız en geç 30 gün içinde
                    ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyeti gerektirmesi
                    hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki
                    ücret alınır.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#E30A17]/20 to-transparent border border-[#E30A17]/30"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4">İletişim</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-4">
                KVKK kapsamındaki sorularınız için:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Veri Sorumlusu</h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Ailydian Teknoloji A.Ş.<br />
                    Vergi Dairesi: Maslak<br />
                    Vergi No: 1234567890<br />
                    Ticaret Sicil No: 123456<br />
                    MERSİS No: 0123456789012345
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">İletişim Bilgileri</h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    📧 <a href="mailto:kvkk@turkotoai.com" className="text-[#E30A17] hover:underline break-all">kvkk@turkotoai.com</a><br />
                    📞 <a href="tel:+908501234567" className="text-[#E30A17] hover:underline">0850 123 45 67</a><br />
                    📬 ailydian@hs01.kep.tr<br />
                    🌐 <a href="https://turkotoai.com" className="text-[#E30A17] hover:underline">www.turkotoai.com</a>
                  </p>
                </div>
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

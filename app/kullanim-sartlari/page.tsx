'use client';

import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Flag } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KullanimSartlariPage() {
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
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#E30A17]" />
              <span className="text-xs sm:text-sm font-bold tracking-wider">KULLANIM ŞARTLARI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
              Hizmet <span className="text-[#E30A17]">Kullanım Koşulları</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-3 sm:mb-4">
              TÜRK OTO AI platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-400">
              Son Güncelleme: 11 Aralık 2025 | Yürürlük Tarihi: 1 Ocak 2025
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-[#E30A17]/20">
                  <Scale className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#E30A17]" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">1. Genel Hükümler</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>
                  <strong className="text-white">1.1. Sözleşme Tarafları:</strong> İşbu sözleşme, Ailydian Teknoloji A.Ş.
                  (bundan sonra "Platform" veya "Biz" olarak anılacaktır) ile TÜRK OTO AI platformunu kullanan
                  kullanıcılar (bundan sonra "Kullanıcı" veya "Siz" olarak anılacaktır) arasında akdedilmiştir.
                </p>
                <p>
                  <strong className="text-white">1.2. Kabul:</strong> Platform'a üye olarak veya hizmetlerimizi kullanarak,
                  bu Kullanım Şartları'nı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan ve taahhüt edersiniz.
                </p>
                <p>
                  <strong className="text-white">1.3. Değişiklikler:</strong> Platform, Kullanım Şartları'nı önceden
                  bildirimde bulunarak değiştirme hakkını saklı tutar. Değişiklikler yayınlandığı andan itibaren
                  yürürlüğe girer.
                </p>
              </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">2. Hizmet Tanımı</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>TÜRK OTO AI, kullanıcılara aşağıdaki hizmetleri sunar:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mb-1 sm:mb-2" />
                    <div className="font-bold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">OBD-II Araç Takibi</div>
                    <p className="text-xs sm:text-sm">Gerçek zamanlı araç performans izleme</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mb-1 sm:mb-2" />
                    <div className="font-bold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Yapay Zeka Asistanı</div>
                    <p className="text-xs sm:text-sm">Türkçe sesli komut ve sohbet desteği</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mb-1 sm:mb-2" />
                    <div className="font-bold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Navigasyon Hizmetleri</div>
                    <p className="text-xs sm:text-sm">Türkiye haritası ve rota planlama</p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mb-1 sm:mb-2" />
                    <div className="font-bold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Türkiye Özel Servisler</div>
                    <p className="text-xs sm:text-sm">HGS, MTV, trafik cezası sorgulama</p>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">3. Kullanıcı Yükümlülükleri</h2>
              <div className="space-y-4 sm:space-y-6 md:space-y-8 text-sm sm:text-base md:text-lg text-gray-300">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">3.1. Genel Yükümlülükler</h3>
                  <ul className="space-y-1 sm:space-y-2 ml-3 sm:ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>18 yaşından büyük ve medeni hakları kullanabilir durumda olmak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Kayıt sırasında doğru ve güncel bilgiler vermek</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Hesap güvenliğini sağlamak ve şifresini gizli tutmak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Platformu yalnızca yasal amaçlarla kullanmak</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">3.2. Yasaklanan Faaliyetler</h3>
                  <ul className="space-y-1 sm:space-y-2 ml-3 sm:ml-4">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Platform'un güvenliğini tehdit etmek veya hacklemek</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Başkalarının kişisel verilerini izinsiz toplamak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Virüs, zararlı yazılım veya zararlı kod yaymak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Telif hakkı ihlali veya fikri mülkiyet hakkı ihlali</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Spam, istenmeyen reklam veya tanıtım gönderimi</span>
                    </li>
                  </ul>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">4. Ücretlendirme ve Abonelik</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>
                  <strong className="text-white">4.1. Ücretsiz Paket:</strong> Temel özellikler ücretsizdir.
                  Sınırlı OBD veri geçmişi, temel navigasyon ve AI asistan özellikleri içerir.
                </p>
                <p>
                  <strong className="text-white">4.2. Premium Paket:</strong> Gelişmiş özellikler aylık
                  veya yıllık abonelik ile sunulur. Sınırsız veri geçmişi, gelişmiş AI, öncelikli destek.
                </p>
                <p>
                  <strong className="text-white">4.3. Ödeme:</strong> Ödemeler güvenli ödeme sağlayıcıları
                  üzerinden işlenir. Kredi kartı bilgileri şifrelenmiş olarak saklanır.
                </p>
                <p>
                  <strong className="text-white">4.4. İptal ve İade:</strong> Aboneliği istediğiniz zaman
                  iptal edebilirsiniz. İade talepleri 14 gün içinde değerlendirilir.
                </p>
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-yellow-200">
                    Fiyatlar önceden bildirimde bulunularak değiştirilebilir. Mevcut aboneler
                    için fiyat değişiklikleri bir sonraki yenileme döneminde geçerli olur.
                  </p>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">5. Fikri Mülkiyet Hakları</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>
                  <strong className="text-white">5.1. Platform İçeriği:</strong> Platform'daki tüm içerik,
                  yazılım, tasarım, logo, marka ve diğer fikri mülkiyet hakları Ailydian Teknoloji A.Ş.'ye aittir.
                </p>
                <p>
                  <strong className="text-white">5.2. Kullanım Lisansı:</strong> Size yalnızca kişisel,
                  ticari olmayan kullanım için sınırlı, devredilemez, iptal edilebilir bir lisans verilmiştir.
                </p>
                <p>
                  <strong className="text-white">5.3. Kullanıcı İçeriği:</strong> Platform'a yüklediğiniz
                  içeriğin (araç verileri, yorumlar vb.) telif haklarına sahip olduğunuzu veya gerekli
                  izinlere sahip olduğunuzu teyit edersiniz.
                </p>
              </div>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">6. Sorumluluk Sınırlaması</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <div className="p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-red-200 mb-1 sm:mb-2">
                    <strong>ÖNEMLİ UYARI:</strong> TÜRK OTO AI bir araç güvenlik sistemi değildir.
                    Platform yalnızca bilgilendirme amaçlıdır.
                  </p>
                </div>
                <ul className="space-y-1 sm:space-y-2 ml-3 sm:ml-4 mt-3 sm:mt-4">
                  <li>• Platform hizmetlerini "olduğu gibi" ve "mevcut olduğu şekilde" sunar</li>
                  <li>• OBD verilerinin %100 doğruluğunu garanti etmez</li>
                  <li>• Navigasyon hizmetleri 3. taraf kaynaklara dayanır</li>
                  <li>• Araç kullanımı sırasında sürücünün tüm sorumluluğu kendisindedir</li>
                  <li>• Platform kullanımından kaynaklanan dolaylı zararlardan sorumlu değildir</li>
                </ul>
                <p className="mt-3 sm:mt-4">
                  <strong className="text-white">6.1. Maksimum Sorumluluk:</strong> Platform'un sorumluluğu,
                  son 12 ayda ödediğiniz toplam abonelik ücreti ile sınırlıdır.
                </p>
              </div>
            </motion.div>

            {/* Section 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">7. Hesap Sonlandırma</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>
                  <strong className="text-white">7.1. Kullanıcı Tarafından:</strong> Hesabınızı istediğiniz
                  zaman kapatabilirsiniz. Hesap kapatma talebi 7 iş günü içinde işleme alınır.
                </p>
                <p>
                  <strong className="text-white">7.2. Platform Tarafından:</strong> Kullanım Şartları'nı
                  ihlal etmeniz durumunda hesabınız önceden bildirimde bulunmaksızın askıya alınabilir
                  veya sonlandırılabilir.
                </p>
                <p>
                  <strong className="text-white">7.3. Sonuçlar:</strong> Hesap sonlandırıldığında,
                  verileriniz KVKK kapsamında silinecektir. Ödenen ücretler iade edilmez.
                </p>
              </div>
            </motion.div>

            {/* Section 8 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">8. Uygulanacak Hukuk ve Uyuşmazlıklar</h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300">
                <p>
                  <strong className="text-white">8.1. Uygulanacak Hukuk:</strong> İşbu Kullanım Şartları
                  Türkiye Cumhuriyeti yasalarına tabidir ve bu yasalara göre yorumlanır.
                </p>
                <p>
                  <strong className="text-white">8.2. Yetkili Mahkeme:</strong> İşbu sözleşmeden doğabilecek
                  her türlü uyuşmazlığın çözümünde İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.
                </p>
                <p>
                  <strong className="text-white">8.3. Arabuluculuk:</strong> Uyuşmazlıklar öncelikle
                  müzakere ve arabuluculuk yoluyla çözümlenmeye çalışılacaktır.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#E30A17]/20 to-transparent border border-[#E30A17]/30"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4">İletişim ve Sorular</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-4">
                Kullanım Şartları hakkında sorularınız için:
              </p>
              <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <p>📧 <a href="mailto:hukuk@turkotoai.com" className="text-[#E30A17] hover:underline break-all">hukuk@turkotoai.com</a></p>
                <p>📞 <a href="tel:+908501234567" className="text-[#E30A17] hover:underline">0850 123 45 67</a></p>
                <p>📍 Ailydian Teknoloji A.Ş., Maslak Mahallesi, Büyükdere Caddesi No: 123, 34398 Sarıyer / İstanbul</p>
              </div>
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs sm:text-sm text-gray-400">
                  <strong className="text-white">Vergi Dairesi:</strong> Maslak Vergi Dairesi |
                  <strong className="text-white"> Vergi No:</strong> 1234567890 |
                  <strong className="text-white"> Ticaret Sicil No:</strong> 123456
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

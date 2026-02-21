import Link from 'next/link';
import {
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  Building2,
  DollarSign,
  Clock,
  Cloud,
  Smartphone,
  Activity,
  BarChart3,
  Stethoscope,
  Calendar,
  CreditCard,
  Phone,
  MessageSquare,
  Settings,
  ArrowRight,
  Sparkles,
  Heart,
  FileText,
  UserCheck,
  ShoppingCart,
  Package,
  Wifi,
  Lock
} from 'lucide-react';

export default function SmallClinics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-semibold">Küçük Klinikler İçin Özel Çözüm</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Uygun Fiyatlı, Güçlü
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                HBYS Çözümü
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-50 leading-relaxed max-w-3xl mx-auto">
              50 yatak altı klinikler için özel olarak tasarlandı. Sıfır IT personeli, hızlı kurulum,
              ekonomik fiyatlandırma. 2 haftada kullanıma hazır!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Ücretsiz Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/pricing"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Fiyatları Gör
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">₺15,000/ay</div>
                <div className="text-red-100 text-sm">Başlangıç Fiyatı</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">2 Hafta</div>
                <div className="text-red-100 text-sm">Kurulum Süresi</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">%0</div>
                <div className="text-red-100 text-sm">Altyapı Yatırımı</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-red-100 text-sm">Teknik Destek</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Small Clinics Choose Median */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Küçük Klinikler Neden Median Seçiyor?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Büyük hastane sistemlerinin karmaşıklığı olmadan, ihtiyacınız olan tüm özellikler
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Ekonomik Fiyatlandırma</h3>
                <p className="text-slate-700 mb-6">
                  Aylık ₺15,000'den başlayan fiyatlar. Kurulum ücreti yok, gizli maliyet yok.
                  Sadece kullandığınız modüller için ödeme yapın.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">İlk 3 ay %30 indirim</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Yıllık ödemeye %15 ekstra indirim</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Tüm güncellemeler dahil</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Hızlı Kurulum</h3>
                <p className="text-slate-700 mb-6">
                  Ortalama 2 hafta içinde sisteminiz hazır. Veri transferi, eğitim ve e-Nabız entegrasyonu
                  dahil. Hemen kullanmaya başlayın.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Online eğitim videoları</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Eski sistem veri aktarımı</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Canlı desteğimizle kurulum</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Cloud className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Sıfır IT Personeli</h3>
                <p className="text-slate-700 mb-6">
                  Sunucu, network, yedekleme sistemi gereksiz. %100 bulut tabanlı platform.
                  Sadece internet bağlantısı yeterli.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik güncellemeler</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Günlük otomatik yedekleme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">%99.9 uptime garantisi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Mobil Erişim</h3>
                <p className="text-slate-700 mb-6">
                  Doktorlarınız her yerden hasta kayıtlarına erişebilir. iOS ve Android native
                  uygulamaları ile tam özellikli mobil deneyim.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Hasta geçmişi görüntüleme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Reçete yazma ve e-Reçete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Lab sonuçları bildirimi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Esnek Modül Seçimi</h3>
                <p className="text-slate-700 mb-6">
                  İhtiyacınız olan modülleri seçin. Tek modül ile başlayıp zamanla
                  genişletebilirsiniz. Her şeyi almak zorunda değilsiniz.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Temel paket: Hasta kayıt + Randevu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">İsteğe bağlı: Lab, Eczane, Faturalandırma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Dilediğiniz zaman ekleme/çıkarma</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Tam SGK Uyumu</h3>
                <p className="text-slate-700 mb-6">
                  e-Nabız, Medula, e-Reçete, HES kod entegrasyonu standart. SGK faturalandırma
                  ve takip numarası yönetimi otomatik.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik provizyon sorgulama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">SUT kod kütüphanesi güncel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">XML fatura gönderimi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For / Use Cases */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Hangi Klinikler İçin İdeal?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Median küçük ve orta ölçekli her tür sağlık kuruluşuna uygun
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Aile Hekimliği / Genel Pratisyen</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Poliklinik randevu sistemi, e-Nabız bildirimi, e-Reçete, aşı takibi, kronik hastalık
                  performans sistemi (KHPS), Aile Hekimliği Bilgi Sistemi (AHBS) entegrasyonu.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl">
                  <div className="font-bold text-slate-900 mb-2">Örnek Özellik Paketi:</div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Hasta kayıt ve randevu yönetimi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>e-Nabız muayene bildirimi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>e-Reçete entegrasyonu</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Aşı kayıt sistemi (ASIS)</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <span className="text-2xl font-bold text-red-600">₺15,000/ay</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Fizik Tedavi ve Rehabilitasyon</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Seans takip sistemi, fizyoterapi protokolleri, cihaz kullanım planlaması, SGK seans
                  faturalandırması, hasta egzersiz programları ve ilerleme grafikleri.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl">
                  <div className="font-bold text-slate-900 mb-2">Örnek Özellik Paketi:</div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Fizik tedavi seans yönetimi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Terapi protokol kütüphanesi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Cihaz rezervasyon sistemi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Medula seans provizyon</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <span className="text-2xl font-bold text-red-600">₺18,000/ay</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Estetik ve Cilt Bakım Klinikleri</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Önce/sonra fotoğraf yönetimi, tedavi paket satışı, randevu hatırlatma SMS,
                  ürün/malzeme stok takibi, müşteri memnuniyet anketleri.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl">
                  <div className="font-bold text-slate-900 mb-2">Örnek Özellik Paketi:</div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Fotoğraf galeri yönetimi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Paket tedavi tanımları</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>SMS randevu hatırlatma</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Ürün stok ve satış modülü</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <span className="text-2xl font-bold text-red-600">₺20,000/ay</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Diyaliz Merkezleri</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Hasta diyaliz takvimi, seans parametreleri, hemodiyaliz protokolleri, makine bakım takibi,
                  SGK diyaliz faturalama, hasta transport yönetimi.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl">
                  <div className="font-bold text-slate-900 mb-2">Örnek Özellik Paketi:</div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Hasta diyaliz programı</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Seans parametre girişi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Lab entegrasyon (üre, kreatinin)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Makine bakım takvimi</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <span className="text-2xl font-bold text-red-600">₺22,000/ay</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Ağız ve Diş Sağlığı Polikliniği</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Dental chart (odontogram), tedavi planları, panoramik röntgen entegrasyonu, laboratuvar
                  iş takibi, implant/protez stok yönetimi.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl">
                  <div className="font-bold text-slate-900 mb-2">Örnek Özellik Paketi:</div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Dijital odontogram</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Tedavi plan ve fiyatlandırma</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Röntgen görüntü arşivi (PACS)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Lab iş takibi</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <span className="text-2xl font-bold text-red-600">₺17,000/ay</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Özel Poliklinikler (Çok Branşlı)</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Çoklu branş yönetimi, doktor performans raporları, merkezi randevu, hastane içi laboratuvar,
                  eczane modülü, kasa/vezne yönetimi.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl">
                  <div className="font-bold text-slate-900 mb-2">Örnek Özellik Paketi:</div>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Tam HBYS modülleri</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Lab + Eczane + Görüntüleme</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Finansal raporlama</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span>Performans dashboards</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <span className="text-2xl font-bold text-red-600">₺25,000/ay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Breakdown */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Şeffaf, Basit Fiyatlandırma
              </h2>
              <p className="text-xl text-slate-600">
                Gizli maliyet yok, kurulum ücreti yok. Sadece aylık abonelik
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-12 rounded-3xl shadow-2xl mb-8">
              <div className="text-center mb-8">
                <div className="text-red-100 mb-2">Başlangıç Paketi</div>
                <div className="text-6xl font-bold mb-4">₺15,000<span className="text-2xl text-red-100">/ay</span></div>
                <div className="text-red-100 text-lg">İlk 3 ay %30 indirimli = ₺10,500/ay</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold mb-6">Pakete Dahil:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Hasta kayıt ve randevu sistemi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>e-Nabız entegrasyonu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Medula provizyon</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>e-Reçete ve e-Rapor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Temel faturalandırma</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Mobil uygulama erişimi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>10 kullanıcı lisansı</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>24/7 teknik destek</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/tr/demo"
                  className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all shadow-xl hover:scale-105"
                >
                  Ücretsiz Demo Talep Et
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">İsteğe Bağlı Ek Modüller:</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-red-600" />
                    <span className="font-semibold text-slate-900">Laboratuvar Modülü</span>
                  </div>
                  <div className="text-xl font-bold text-red-600">+₺3,000/ay</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-red-600" />
                    <span className="font-semibold text-slate-900">Eczane Stok Yönetimi</span>
                  </div>
                  <div className="text-xl font-bold text-red-600">+₺2,500/ay</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-red-600" />
                    <span className="font-semibold text-slate-900">Gelişmiş Raporlama ve BI</span>
                  </div>
                  <div className="text-xl font-bold text-red-600">+₺2,000/ay</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-red-600" />
                    <span className="font-semibold text-slate-900">SMS Bildirim Paketi (1000 SMS/ay)</span>
                  </div>
                  <div className="text-xl font-bold text-red-600">+₺1,500/ay</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-red-600" />
                    <span className="font-semibold text-slate-900">Ek Kullanıcı Lisansı (10 kullanıcı)</span>
                  </div>
                  <div className="text-xl font-bold text-red-600">+₺1,000/ay</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Küçük Kliniklerden Başarı Hikayeleri
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    KF
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">Kadıköy Fizik Tedavi Merkezi</div>
                    <div className="text-slate-600 text-sm">15 Yatak - Fizik Tedavi</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "Daha önce Excel ile hasta takibi yapıyorduk. Median ile 2 haftada tam otomasyona geçtik.
                  SGK seans bildirimi artık otomatik, red oranımız %80 düştü. İlk 6 ayda sistem kendini amorti etti."
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">%80</div>
                      <div className="text-xs text-slate-600">Red azalma</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">6 ay</div>
                      <div className="text-xs text-slate-600">ROI süresi</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">4 saat/gün</div>
                      <div className="text-xs text-slate-600">Zaman tasarrufu</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Uzm. Fzt. Elif Yılmaz - Müdür</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    BE
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">Beşiktaş Estetik Kliniği</div>
                    <div className="text-slate-600 text-sm">8 Yatak - Estetik & Dermatoloji</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "Paket tedavi satışı ve önce/sonra fotoğraf yönetimi özelliği sayesinde hasta memnuniyetimiz
                  arttı. SMS hatırlatma ile randevu no-show oranımız %60 düştü. Mobil uygulamayı çok sevdik."
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">%60</div>
                      <div className="text-xs text-slate-600">No-show azalma</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">%35</div>
                      <div className="text-xs text-slate-600">Gelir artışı</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">4.9/5</div>
                      <div className="text-xs text-slate-600">Hasta puanı</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Dr. Ayşe Demir - Kurucu Ortak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                2 Haftada Kullanıma Hazır
              </h2>
              <p className="text-xl text-slate-600">
                Hızlı kurulum süreci ile minimum aksama
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Gün 1-3: Online Kayıt ve Konfigürasyon</h3>
                  <p className="text-slate-600">
                    Online form ile kurulum başlatılır. Kliniğiniz bilgileri, kullanıcılar ve roller tanımlanır.
                    e-Nabız/Medula entegrasyon başvuruları yapılır.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Gün 4-7: Veri Transferi (Opsiyonel)</h3>
                  <p className="text-slate-600">
                    Eski sisteminizden hasta kayıtları, randevu geçmişi ve finansal veriler aktarılır.
                    Manuel veri girişi ile başlayabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Gün 8-10: Online Eğitim</h3>
                  <p className="text-slate-600">
                    2 saatlik canlı online eğitim. Eğitim kayıtları ve PDF dökümanlar paylaşılır.
                    Ekibiniz istediği zaman tekrar izleyebilir.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Gün 11-14: Yayına Alma</h3>
                  <p className="text-slate-600">
                    Test hastaları ile deneme yapılır. e-Nabız/Medula entegrasyon testleri.
                    Onay sonrası canlı kullanıma geçiş.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Kuruluma Dahil Olanlar:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <span className="text-slate-700">Sistem konfigürasyonu</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <span className="text-slate-700">e-Nabız/Medula başvuru desteği</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <span className="text-slate-700">Veri transferi (opsiyonel)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <span className="text-slate-700">Online eğitim seti</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <span className="text-slate-700">Kullanıcı kılavuzları</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <span className="text-slate-700">İlk ay yoğun destek</span>
                </div>
              </div>
              <div className="text-center mt-8">
                <div className="text-3xl font-bold text-red-600">₺0</div>
                <div className="text-slate-600">Kurulum Ücreti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Küçük Kliniğiniz İçin Büyük Teknoloji
            </h2>
            <p className="text-xl mb-8 text-red-50">
              30 dakikalık ücretsiz demo ile Median'in küçük klinikler için özel özelliklerini keşfedin.
              İlk 3 ay %30 indirimli başlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Ücretsiz Demo Rezerve Edin
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/pricing"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Tüm Fiyatları Görün
              </Link>
            </div>
            <div className="text-red-100">
              <p>Sorularınız mı var? <Link href="/tr/contact" className="underline font-semibold">Bizimle iletişime geçin</Link> veya +90 (212) 555-0123 numaralı hattı arayın</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

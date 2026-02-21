'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Shield,
  Globe,
  Building,
  FileText,
  Cloud,
  Lock,
  CheckCircle,
  ArrowRight,
  Award,
  Smartphone,
  Users,
  Heart,
  TrendingUp,
  BarChart3,
  AlertCircle,
  DollarSign,
  Calendar,
  Star,
  MapPin,
  Phone,
  Mail,
  Zap,
  Activity,
  FileCheck,
} from 'lucide-react';

export default function TurkeyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-red-200">
                <span className="text-2xl">🇹🇷</span>
                <Award className="h-5 w-5 text-red-600" />
                <span className="text-sm font-bold text-gray-900">Türkiye'nin En Kapsamlı Hastane Sistemi</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Türk Hastaneleri için
                <span className="block mt-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Özel Çözüm
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                KVKK uyumlu, e-Nabız entegreli, Medula/SGK sistemi ile tam entegre, Türkiye sağlık sistemine özel
                tasarlanmış hastane yönetim platformu. Verileriniz Türkiye sınırları içinde güvende.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/trial"
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  30 Gün Ücretsiz Deneyin
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-red-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Demo Talep Edin
                  <Calendar className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">250+</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Türk Hastanesi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">100%</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">KVKK Uyumlu</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">99.9%</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Çalışma Süresi</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border-4 border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <Globe className="h-32 w-32 text-red-600 opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-gradient-to-br from-red-400 to-pink-400 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* KVKK & Turkish Compliance */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Türkiye Standartlarına Tam Uyum</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Tüm yasal gereksinimler ve entegrasyonlar hazır
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
              <div className="h-14 w-14 rounded-xl bg-red-600 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">KVKK Uyumluluğu</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                6698 sayılı Kişisel Verilerin Korunması Kanunu'na tam uyum. 72 saat ihlal bildirimi, veri envanteri,
                aydınlatma metinleri ve açık rıza yönetimi entegre.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Otomatik veri envanteri</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Aydınlatma metni yönetimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Açık rıza takibi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">72 saat ihlal bildirimi sistemi</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <div className="h-14 w-14 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                <Globe className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">e-Nabız Entegrasyonu</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Sağlık Bakanlığı e-Nabız sistemi ile tam otomatik entegrasyon. Hasta kayıtları, reçeteler,
                laboratuvar sonuçları ve görüntüleme raporları otomatik aktarım.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Otomatik veri gönderimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Real-time senkronizasyon</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">e-Nabız web servis v3.0</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Hasta geçmişi sorgulama</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="h-14 w-14 rounded-xl bg-green-600 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Medula & SGK Sistemi</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Sosyal Güvenlik Kurumu Medula sistemi ile tam entegrasyon. Otomatik provizyon alma,
                fatura gönderimi ve ödeme takibi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Online provizyon sorgulama</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Otomatik fatura gönderimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">SUT fiyat listesi güncellemeleri</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Red ve iade yönetimi</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="h-14 w-14 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                <Building className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">SBÜ Standartları</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Sağlık Bilimleri Üniversitesi standartlarına uygun hasta kayıt, raporlama ve dokümantasyon sistemi.
                Akademik hastane gereksinimleri karşılanır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">SBÜ raporlama formatları</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Klinik araştırma desteği</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Eğitim hastanesi modülleri</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border-2 border-cyan-200">
              <div className="h-14 w-14 rounded-xl bg-cyan-600 flex items-center justify-center mb-4">
                <Cloud className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Yerel Veri Merkezi</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Tüm hasta verileri Türkiye sınırları içindeki veri merkezlerinde saklanır. KVKK veri yerelleştirme
                gereksinimine tam uyum.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">İstanbul veri merkezi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Ankara yedekleme merkezi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">7/24 teknik destek (Türkçe)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200">
              <div className="h-14 w-14 rounded-xl bg-pink-600 flex items-center justify-center mb-4">
                <Lock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Gelişmiş Güvenlik</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                İki faktörlü kimlik doğrulama, SMS onayı, mobil uygulama token'ı, IP kısıtlama ve
                kapsamlı erişim logları.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">SMS ile iki faktörlü kimlik</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">AES-256 şifreleme</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Detaylı erişim logları</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Turkey-Specific Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Türkiye'ye Özel Özellikler</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Türk sağlık sisteminin ihtiyaçlarına göre tasarlanmış modüller
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <FileCheck className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">e-Reçete Entegrasyonu</h3>
              <p className="text-gray-700 font-medium mb-4">
                İlaç ve Eczacılık Genel Müdürlüğü (İEGM) e-Reçete sistemi ile tam entegrasyon.
                Elektronik reçete yazımı, ilaç sorgulaması ve takibi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">İEGM e-Reçete web servisi</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Otomatik ilaç etkileşim kontrolü</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Barkod ile ilaç takibi (ITS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Yeşil/kırmızı reçete yönetimi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Activity className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Acil Servis Modülü</h3>
              <p className="text-gray-700 font-medium mb-4">
                Türkiye acil servis protokollerine göre tasarlanmış triyaj, takip ve raporlama sistemi.
                Kırmızı-sarı-yeşil alan yönetimi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Türk triyaj skalası (TTS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Kırmızı-sarı-yeşil alan takibi</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">112 entegrasyonu</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Acil servis performans raporları</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <DollarSign className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Gelir Yönetimi</h3>
              <p className="text-gray-700 font-medium mb-4">
                SGK, özel sigorta ve hasta tahsilatı için entegre gelir yönetimi. SUT fiyat listesi
                otomatik güncellemeleri.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">SUT kodlama asistanı</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Özel sigorta provizyon sistemi</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Online tahsilat (kredi kartı, havale)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Taksit ve borç takip sistemi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Raporlama & Analitik</h3>
              <p className="text-gray-700 font-medium mb-4">
                Sağlık Bakanlığı, SGK ve ÖHSİS raporlama formatlarına uygun otomatik raporlar.
                Performans göstergeleri ve dashboard.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ÖHSİS raporları (günlük/aylık)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Sağlık Bakanlığı SKS raporları</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Yatak doluluk analizleri</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Finansal performans dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing for Turkish Market */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Türkiye Fiyatlandırması</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Her büyüklükteki hastane için uygun fiyatlandırma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Küçük Hastane</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">₺20,999</span>
                <span className="text-gray-600 font-semibold">/ay</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-gray-900">100 kullanıcıya kadar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span className="font-bold text-gray-900">15,000 aktif hasta</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Tam EHR & Hasta Portalı</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">e-Nabız Entegrasyonu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Medula/SGK Sistemi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">KVKK Uyumluluk Araçları</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">7/24 Telefon Desteği</span>
                </li>
              </ul>
              <Link
                href="/trial"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
              >
                Ücretsiz Deneyin
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-red-600 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-black rounded-full">
                  EN POPÜLER
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">Orta Boy Hastane</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">₺44,999</span>
                <span className="text-gray-600 font-semibold">/ay</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-gray-900">500 kullanıcıya kadar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span className="font-bold text-gray-900">Sınırsız hasta</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Küçük plandaki her şey</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Ameliyathane Yönetimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">PACS & Radyoloji</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Gelişmiş Analitik & BI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Özel Hesap Yöneticisi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Yerinde Eğitim</span>
                </li>
              </ul>
              <Link
                href="/trial"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Ücretsiz Deneyin
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Büyük Hastane</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">Özel</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-gray-900">1,000+ kullanıcı</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span className="font-bold text-gray-900">Multi-kampüs destek</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Orta plandaki her şey</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Çok hastaneli deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Özel entegrasyonlar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">SBÜ standartları modülü</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">%99.99 uptime SLA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Yerinde uygulama ekibi</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
              >
                Satış ile İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Hastanenizi Dönüştürmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-red-100 mb-12 font-medium">
            250+ Türk hastanesine katılın ve Median ile fark yaratın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="px-8 py-4 bg-white text-red-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              30 Gün Ücretsiz Deneyin
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-red-600 transition-all flex items-center justify-center gap-2"
            >
              Demo Talep Edin
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

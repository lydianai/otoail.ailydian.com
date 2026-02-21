import Link from 'next/link';
import {
  Building2,
  Cpu,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Target,
  Briefcase,
  Globe,
  Shield,
  Zap,
  DollarSign,
  GraduationCap,
  ChevronRight,
  Mail,
  Phone,
  ExternalLink,
  MapPin
} from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full font-semibold mb-6">
              <Users className="h-5 w-5" />
              Median Partner Programı
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Türkiye'nin Sağlık Dönüşümünde Stratejik Ortağımız Olun
            </h1>
            <p className="text-xl md:text-2xl text-rose-100 mb-8 leading-relaxed">
              Median ile ortaklık kurarak sağlık sektöründeki büyüyen pazardan pay alın.
              Teknoloji, implementasyon veya satış ortaklığı fırsatlarını keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#become-partner"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
              >
                Partner Başvurusu
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#current-partners"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-400 transition-all border-2 border-white/30"
              >
                Mevcut Partnerler
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">25+</div>
              <div className="text-gray-600">Aktif Partner</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">200+</div>
              <div className="text-gray-600">Ortak Proje</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">%35</div>
              <div className="text-gray-600">Partner Komisyon Oranı</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">24/7</div>
              <div className="text-gray-600">Partner Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Target className="h-5 w-5" />
              Partner Programı
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median Partner Ekosistemi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Üç farklı ortaklık modeliyle sağlık teknolojileri pazarında büyüme fırsatları sunuyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Technology Partners */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Teknoloji Partnerleri
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Tıbbi cihaz üreticileri, laboratuvar ekipman sağlayıcıları, PACS sistemleri ve
                diğer sağlık teknolojisi şirketleri için entegrasyon ortaklığı.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">API entegrasyon desteği</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ortak pazarlama materyalleri</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Teknik dokümantasyon</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sertifikasyon programı</span>
                </li>
              </ul>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Örnek Partnerler</div>
                <div className="text-sm font-semibold text-blue-900">
                  Roche, Philips, Siemens Healthineers
                </div>
              </div>
            </div>

            {/* Implementation Partners */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Implementasyon Partnerleri
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Median'i hastanelere kuran, yapılandıran ve eğitim veren sistem entegratörleri
                ve IT danışmanlık firmaları için.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sertifikalı eğitim programları</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Proje başına %20 komisyon</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Dedicated teknik destek</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Partner portal erişimi</span>
                </li>
              </ul>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Örnek Partnerler</div>
                <div className="text-sm font-semibold text-green-900">
                  Sağlık-Net Bilişim, MediTech Solutions
                </div>
              </div>
            </div>

            {/* Reseller Partners */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Reseller Partnerleri
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Bölgesel distribütörler ve satış partnerleri için. Median'i kendi bölgenizde
                pazarlayın, satışını yapın ve komisyon kazanın.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">%35'e varan komisyon oranı</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Bölge tahsisi ve koruma</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Marketing Development Fund</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Satış eğitimi ve materyalleri</span>
                </li>
              </ul>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Açık Bölgeler</div>
                <div className="text-sm font-semibold text-purple-900">
                  Adana, Antalya, Trabzon, Diyarbakır
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section id="current-partners" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Award className="h-5 w-5" />
              Mevcut Partnerlerimiz
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Türkiye ve Dünyanın Önde Gelen Firmaları ile İşbirliği
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Median ekosisteminde 25+ stratejik partner ile çalışıyoruz
            </p>
          </div>

          {/* Technology Partners Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="bg-blue-100 rounded-lg p-2">
                <Cpu className="h-6 w-6 text-blue-600" />
              </div>
              Teknoloji Partnerleri
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Roche */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Roche Diagnostics Türkiye</h4>
                    <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Award className="h-4 w-4" />
                      Gold Technology Partner
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Roche laboratuvar cihazları ile Median arasında gerçek zamanlı veri entegrasyonu.
                  Tahlil sonuçları otomatik olarak hasta dosyalarına işlenir, hata oranı %95 azalır.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Lab Integration</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">HL7 FHIR</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Auto-Results</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  50+ Hastanede Aktif Entegrasyon
                </div>
              </div>

              {/* Philips */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Philips Healthcare</h4>
                    <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Award className="h-4 w-4" />
                      Gold Technology Partner
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Philips tıbbi görüntüleme cihazları (MR, CT, Ultrason) ve Median radyoloji modülü
                  entegrasyonu. DICOM protokolü ile görüntüler otomatik arşivlenir.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">PACS Integration</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">DICOM</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Radiology</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  35+ Radyoloji Departmanı
                </div>
              </div>

              {/* AWS */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Amazon Web Services (AWS)</h4>
                    <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Zap className="h-4 w-4" />
                      Infrastructure Partner
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Median'in tüm bulut altyapısı AWS Türkiye veri merkezlerinde çalışır. %99.9 uptime
                  SLA, otomatik scaling ve KVKK uyumlu veri depolama garantisi.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">AWS Turkey</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Cloud Infrastructure</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">KVKK Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  İstanbul & Ankara Veri Merkezleri
                </div>
              </div>

              {/* TTB */}
              <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Türk Tabipleri Birliği (TTB)</h4>
                    <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Users className="h-4 w-4" />
                      Strategic Healthcare Partner
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  TTB ile işbirliği kapsamında Median'in klinik iş akışlarının Türk sağlık sistemine
                  uygunluğu ve hasta güvenliği standartlarına uyumu sağlanır.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Clinical Standards</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Patient Safety</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Training</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Ortak Eğitim ve Sertifikasyon Programları
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Partners Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="bg-green-100 rounded-lg p-2">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              Implementasyon Partnerleri
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sağlık-Net */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Sağlık-Net Bilişim Teknolojileri</h4>
                    <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Award className="h-4 w-4" />
                      Gold Implementation Partner
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  İstanbul ve Marmara Bölgesi'nde Median kurulumu konusunda uzmanlaşmış premier
                  partner. 15+ yıl sağlık IT deneyimi, 50+ başarılı proje.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">İstanbul (Levent)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">HIS Implementation</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Training</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  35 Hastane Kurulumu Tamamlandı
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <a href="mailto:info@saglik-net.com.tr" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700">
                      <Mail className="h-4 w-4" />
                      info@saglik-net.com.tr
                    </a>
                    <a href="tel:+902123456789" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700">
                      <Phone className="h-4 w-4" />
                      (0212) 345 67 89
                    </a>
                  </div>
                </div>
              </div>

              {/* MediTech */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">MediTech Solutions A.Ş.</h4>
                    <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Award className="h-4 w-4" />
                      Certified Implementation Partner
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Ankara ve İç Anadolu Bölgesi için özelleşmiş implementasyon partneri. Kamu
                  hastaneleri ve üniversite hastaneleri deneyimi.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Ankara (Çankaya)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Public Sector</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">University Hospitals</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Migration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  20 Hastane Kurulumu Tamamlandı
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <a href="mailto:contact@meditech.com.tr" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700">
                      <Mail className="h-4 w-4" />
                      contact@meditech.com.tr
                    </a>
                    <a href="tel:+903124567890" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700">
                      <Phone className="h-4 w-4" />
                      (0312) 456 78 90
                    </a>
                  </div>
                </div>
              </div>

              {/* TechHealth */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">TechHealth Bilişim Hizmetleri</h4>
                    <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Building2 className="h-4 w-4" />
                      Implementation Partner
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  İzmir ve Ege Bölgesi'nde Median implementasyonu. Özel hastaneler ve tıp merkezleri
                  konusunda uzmanlaşmış, hızlı kurulum garantisi.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">İzmir (Konak)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Private Hospitals</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Fast Setup</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  15 Hastane Kurulumu Tamamlandı
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <a href="mailto:info@techhealth.com.tr" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700">
                      <Mail className="h-4 w-4" />
                      info@techhealth.com.tr
                    </a>
                    <a href="tel:+902325678901" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700">
                      <Phone className="h-4 w-4" />
                      (0232) 567 89 01
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partner Olmanın Avantajları
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Median partnerleri için özel fırsatlar ve destekler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-rose-100 rounded-lg p-3 w-fit mb-4">
                <DollarSign className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Yüksek Komisyon Oranları</h3>
              <p className="text-gray-700 leading-relaxed">
                Reseller partnerler için %35'e varan komisyon, implementasyon partnerleri için
                proje başına sabit ücret modeli.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bölge Koruması</h3>
              <p className="text-gray-700 leading-relaxed">
                Reseller partnerlere tahsis edilen bölgelerde münhasırlık garantisi. Rekabet
                etmeden büyüme imkanı.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kapsamlı Eğitim</h3>
              <p className="text-gray-700 leading-relaxed">
                Teknik ve satış eğitimleri, sertifikasyon programları ve sürekli webinarlar.
                Ekibinizi Median uzmanı yapıyoruz.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Marketing Development Fund</h3>
              <p className="text-gray-700 leading-relaxed">
                Ortak pazarlama kampanyaları için %5 MDF desteği. Etkinlikler, web siteleri,
                sosyal medya için bütçe.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 rounded-lg p-3 w-fit mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Partner Manager</h3>
              <p className="text-gray-700 leading-relaxed">
                Her partnere özel account manager. Teklifler, sorular ve destek için tek
                temas noktası.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-red-100 rounded-lg p-3 w-fit mb-4">
                <Globe className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partner Portal Erişimi</h3>
              <p className="text-gray-700 leading-relaxed">
                Satış materyalleri, teknik dokümantasyon, demo ortamları ve komisyon takibi
                için özel portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner Form */}
      <section id="become-partner" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Users className="h-5 w-5" />
              Partner Başvurusu
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median Partneri Olun
            </h2>
            <p className="text-xl text-gray-600">
              Formu doldurun, partner ekibimiz 48 saat içinde sizinle iletişime geçsin
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-rose-500">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Şirket Adı *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                    placeholder="ABC Teknoloji A.Ş."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Partner Tipi *
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none text-gray-700">
                    <option>Seçiniz</option>
                    <option>Teknoloji Partneri</option>
                    <option>Implementasyon Partneri</option>
                    <option>Reseller Partneri</option>
                    <option>Henüz Emin Değilim</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Yetkili Adı Soyadı *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                    placeholder="Ahmet Yılmaz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ünvan
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                    placeholder="Genel Müdür"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                    placeholder="ahmet@abcteknoloji.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                    placeholder="+90 (5XX) XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Faaliyet Gösterdiğiniz Şehirler *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                  placeholder="İstanbul, Ankara, İzmir"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Şirket Hakkında ve Partnerlik Nedeni *
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                  placeholder="Şirketiniz hakkında kısa bilgi ve neden Median partneri olmak istediğinizi açıklayın..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sağlık Sektörü Deneyiminiz
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none text-gray-700">
                  <option>Seçiniz</option>
                  <option>1-3 Yıl</option>
                  <option>3-5 Yıl</option>
                  <option>5-10 Yıl</option>
                  <option>10+ Yıl</option>
                  <option>Sağlık Sektörü Deneyimim Yok</option>
                </select>
              </div>

              <div className="bg-rose-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Partner Başvuru Sürecimiz:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>1. Gün:</strong> Başvurunuz partner ekibimize ulaşır</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>2. Gün:</strong> Partner manager sizi arar, tanışma toplantısı ayarlar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>1. Hafta:</strong> Teknik ve ticari detayları görüşürüz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>2. Hafta:</strong> Partner sözleşmesi imzalanır, eğitimler başlar</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-5 w-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  <Link href="/tr/legal/partner-terms" className="text-rose-600 hover:text-rose-700 font-semibold">
                    Median Partner Program Şartlarını
                  </Link>{' '}
                  okudum ve kabul ediyorum.
                </label>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Başvuru Gönder
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <p className="mt-4 text-sm text-gray-600">
                  Sorularınız için:{' '}
                  <a href="mailto:partners@lydianmedi.com" className="text-rose-600 hover:text-rose-700 font-semibold">
                    partners@lydianmedi.com
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Partner Portal Login */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12 border-t-4 border-rose-500">
            <div className="bg-rose-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-rose-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mevcut Partner misiniz?
            </h2>
            <p className="text-gray-600 mb-8">
              Partner portalımıza giriş yaparak satış materyallerine, teknik dokümanlara ve
              komisyon raporlarınıza erişin.
            </p>
            <Link
              href="/tr/partners/portal"
              className="inline-flex items-center justify-center px-8 py-4 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl"
            >
              Partner Portal Girişi
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Birlikte Büyüyelim
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Median partner ekosistemi hızla büyüyor. Türkiye'nin sağlık dönüşümünde
            stratejik partnerimiz olun.
          </p>
          <a
            href="#become-partner"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
          >
            Hemen Başvurun
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <p className="mt-6 text-sm text-rose-200">
            Partner ekibimizle görüşmek için: partners@lydianmedi.com | +90 (212) XXX XX XX
          </p>
        </div>
      </section>
    </div>
  );
}

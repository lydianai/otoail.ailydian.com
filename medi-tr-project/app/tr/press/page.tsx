import Link from 'next/link';
import {
  Newspaper,
  Radio,
  Download,
  Calendar,
  ExternalLink,
  ArrowRight,
  Award,
  TrendingUp,
  Users,
  Rocket,
  Building2,
  Sparkles,
  Mail,
  FileText,
  Image as ImageIcon,
  Video,
  ChevronRight,
  Bell,
  Phone
} from 'lucide-react';

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full font-semibold mb-6">
              <Newspaper className="h-5 w-5" />
              Basın Odası
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Median Basın & Medya
            </h1>
            <p className="text-xl md:text-2xl text-rose-100 mb-8 leading-relaxed">
              Median hakkında son haberler, basın bültenleri, medya görünümleri ve
              basın kiti için iletişim bilgileri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#press-releases"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
              >
                Basın Bültenleri
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#media-kit"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-400 transition-all border-2 border-white/30"
              >
                Basın Kiti İndir
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Highlight */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-rose-600 to-red-700 text-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  <Calendar className="h-4 w-4" />
                  23 Aralık 2024 - SON HABER
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Median Türkiye Pazarına Resmi Olarak Giriş Yaptı
                </h2>
                <p className="text-lg text-rose-100 mb-6 leading-relaxed">
                  Lydian AI'ın sağlık teknolojileri kolu Median, Türkiye'de faaliyetlerine
                  başladı. 2025 sonuna kadar 200+ hastaneye hizmet hedefi ile yola çıkan şirket,
                  İstanbul ve Ankara ofislerini açtı.
                </p>
                <Link
                  href="/tr/press/vitalcare-turkiye-pazarina-girdi"
                  className="inline-flex items-center text-white hover:text-rose-100 font-semibold"
                >
                  Detaylı Haber
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section id="press-releases" className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <FileText className="h-5 w-5" />
              Basın Bültenleri
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median'den Haberler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En güncel kurumsal haberler ve duyurularımız
            </p>
          </div>

          <div className="space-y-6">
            {/* Press Release 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-rose-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      23 Aralık 2024
                    </div>
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Building2 className="h-4 w-4" />
                      Kurumsal
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Median Türkiye Pazarına Giriş Yaptı - 200+ Hastane Hedefi
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>İSTANBUL -</strong> Yapay zeka destekli hastane bilgi sistemleri alanında
                    faaliyet gösteren Median, Türkiye pazarına resmi olarak giriş yaptı. Lydian AI'ın
                    sağlık teknolojileri kolu olan şirket, 2025 yılı sonuna kadar Türkiye'de 200'den
                    fazla hastaneye hizmet vermeyi hedefliyor. İstanbul Maslak ve Ankara Çankaya'da
                    açılan ofislerde 85 kişilik ekip ile operasyonlarına başlayan Median, geleneksel
                    HIS sistemlerine modern, bulut-native bir alternatif sunuyor.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #Median
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #SağlıkTeknolojisi
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #HastaneBilgiSistemi
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Link
                    href="/tr/press/releases/vitalcare-turkiye-pazarina-girdi.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Press Release 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      1 Aralık 2024
                    </div>
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      Yatırım
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Median 15M€ Series A Yatırım Aldı - Büyüme Hızlanıyor
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>SAN FRANCISCO / İSTANBUL -</strong> Median, Accel Partners liderliğinde
                    gerçekleştirdiği Series A turunda 15 milyon Euro yatırım aldı. Tur'a 500 Startups,
                    Entrepreneur First ve Türkiye'den girişim sermayesi fonu Revo Capital da katıldı.
                    Şirket, yatırımı Türkiye ve MENA bölgesinde pazarını genişletmek, ürün geliştirme
                    ekibini güçlendirmek ve AI özelliklerini zenginleştirmek için kullanacak. Median
                    CEO'su, "Bu yatırım ile Türk sağlık sektörünü dijitalleştirme hedefimize büyük adım
                    attık" açıklamasında bulundu.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #SeriesA
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #VentureCapital
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #Startup
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Link
                    href="/tr/press/releases/vitalcare-series-a-yatirim.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Press Release 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      18 Kasım 2024
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Users className="h-4 w-4" />
                      Müşteri
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Ankara Şehir Hastanesi Median ile Dijitalleşti
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>ANKARA -</strong> Türkiye'nin en büyük sağlık kampüslerinden Ankara Şehir
                    Hastanesi, Median hastane bilgi sistemi ile dijital dönüşümünü tamamladı. 3.704
                    yataklı dev komplekste 2 haftalık kurulum süreci sonrası sistem canlıya geçti.
                    Hastane yönetimi, eski sistemden Median'e geçiş ile personel verimliliğinin %40
                    arttığını, hasta memnuniyetinin %25 yükseldiğini açıkladı. Proje kapsamında 5.000+
                    sağlık çalışanı eğitim aldı, tüm klinikler ve poliklinikler entegre edildi.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #AnkaraŞehirHastanesi
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #DijitalDönüşüm
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #CaseStudy
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Link
                    href="/tr/press/releases/ankara-sehir-hastanesi.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Press Release 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      5 Kasım 2024
                    </div>
                    <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Rocket className="h-4 w-4" />
                      Ürün Lansmanı
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    AI Destekli Radyoloji Modülü Yayınlandı
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>İSTANBUL -</strong> Median, yapay zeka destekli radyoloji modülünü
                    tüm müşterilerine açtı. Yeni modül, MR, CT ve röntgen görüntülerini otomatik analiz
                    ederek radyologlara karar destek sağlıyor. Akciğer nodülü tespiti, kemik kırığı
                    analizi ve beyin tümörü segmentasyonu gibi özellikler sunan sistem, %95 doğruluk
                    oranı ile çalışıyor. Pilot uygulamada rapor yazım süresinin %60 azaldığı, hata
                    oranının %40 düştüğü gözlemlendi. Modül, Sağlık Bakanlığı onaylı medikal yazılım
                    sertifikası aldı.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #AI
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #Radyoloji
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #YapayZeka
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Link
                    href="/tr/press/releases/ai-radyoloji-modulu.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Press Release 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      22 Ekim 2024
                    </div>
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Award className="h-4 w-4" />
                      Sertifikasyon
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    JCI Akreditasyon Desteği Median'e Eklendi
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>İSTANBUL -</strong> Median, JCI (Joint Commission International)
                    akreditasyon süreçlerini yöneten yeni modülünü duyurdu. Hastanelerin uluslararası
                    kalite standartlarına uyumunu kolaylaştıran modül, tüm JCI şartlarını otomatik
                    takip ediyor ve raporlama yapıyor. Hasta güvenliği göstergeleri, ilaç yönetimi,
                    enfeksiyon kontrolü ve kalite iyileştirme süreçleri için dashboard'lar sunuyor.
                    Modül ile birlikte hastaneler JCI hazırlık süresini 18 aydan 12 aya düşürebiliyor.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #JCI
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #Akreditasyon
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #KaliteStandartları
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Link
                    href="/tr/press/releases/jci-akreditasyon-modulu.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Press Release 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      10 Ekim 2024
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Users className="h-4 w-4" />
                      Ortaklık
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Median ve Roche Diagnostics Stratejik İşbirliği
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>İSTANBUL -</strong> Median ve Roche Diagnostics Türkiye arasında
                    stratejik ortaklık imzalandı. İşbirliği kapsamında Roche'un laboratuvar cihazları
                    Median sistemi ile sorunsuz entegre ediliyor. Tahlil sonuçları gerçek zamanlı
                    olarak hasta kayıtlarına aktarılıyor, manuel veri girişi ortadan kalkıyor. Pilot
                    proje 10 hastanede başarıyla tamamlandı, hata oranı %95 azaldı. 2025 yılında
                    entegrasyon 100+ hastaneye yaygınlaştırılacak.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #Roche
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #Ortaklık
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #LabEntegrasyonu
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Link
                    href="/tr/press/releases/roche-ortaklik.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Press Release 7 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      28 Eylül 2024
                    </div>
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Users className="h-4 w-4" />
                      Ekip
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Median Ekibi 85 Kişiye Ulaştı - Türkiye Ofisleri Açıldı
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>İSTANBUL -</strong> Hızlı büyüme sürecindeki Median, ekibini 85 kişiye
                    çıkardı ve İstanbul ile Ankara'da ofislerini açtı. Şirket, yazılım geliştirme,
                    müşteri başarısı, satış ve implementasyon pozisyonlarında 30+ yeni çalışan alımı
                    yaptı. İstanbul Maslak'taki 800m² merkez ofis ve Ankara Çankaya'daki 400m² bölge
                    ofisi faaliyete geçti. 2025 yılında ekibin 150 kişiye çıkarılması planlanıyor.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #İşeAlım
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #Büyüme
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #OfisAçılışı
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Link
                    href="/tr/press/releases/ofis-acilis-ekip-buyume.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Press Release 8 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      15 Eylül 2024
                    </div>
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Rocket className="h-4 w-4" />
                      Ürün
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Median Mobil Uygulaması iOS ve Android'de Yayında
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>İSTANBUL -</strong> Median'in mobil uygulamaları App Store ve Google
                    Play'de yayına girdi. Doktorlar ve hemşireler artık tablet ve telefonlarından hasta
                    kayıtlarına erişebiliyor, ilaç reçeteleri yazabiliyor ve konsültasyon isteyebiliyor.
                    Uygulama, offline modda da çalışabiliyor ve internet bağlantısı kurulduğunda otomatik
                    senkronize oluyor. İlk hafta içinde 2.000+ sağlık çalışanı uygulamayı indirdi, kullanıcı
                    puanı 4.8/5 olarak belirlendi.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #MobilApp
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #iOS
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #Android
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Link
                    href="/tr/press/releases/mobil-uygulama-lansman.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Radio className="h-5 w-5" />
              Medya Görünümleri
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median Medyada
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Teknoloji ve sağlık medyasında Median haberleri
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Media Item 1 */}
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-rose-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-rose-100 rounded-lg p-3">
                  <Newspaper className="h-6 w-6 text-rose-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">Webrazzi - 20 Aralık 2024</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Median, Türk Sağlık Sektöründe Yapay Zeka Devrimini Başlattı
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Lydian AI'ın sağlık teknolojileri kolu Median, AI-first yaklaşımı ile Türk
                    hastanelerine yeni nesil HIS sistemi sunuyor. Geleneksel yazılımların aksine
                    bulut-native mimarisi ve yapay zeka özellikleriyle dikkat çeken platform...
                  </p>
                  <a
                    href="https://webrazzi.com/2024/12/20/vitalcare-turkiye"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    Haberi Oku
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Media Item 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">Startup.info - 5 Aralık 2024</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Lydian AI'ın Sağlık Girişimi Median 15M€ Yatırım Aldı
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Accel Partners liderliğindeki Series A turunda 15 milyon Euro yatırım alan
                    Median, Türkiye'de hızla büyüyor. 500 Startups ve Revo Capital'in de
                    katıldığı tur ile global pazara açılma planları hızlanıyor...
                  </p>
                  <a
                    href="https://startup.info/vitalcare-funding-announcement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Haberi Oku
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Media Item 3 */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">TeknolojiOku - 25 Kasım 2024</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Hastaneler için AI Asistanı - Median Detaylı İncelemesi
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Median'i Ankara'da bir hastanede test ettik. Kullanıcı arayüzü gerçekten
                    etkileyici, AI asistanın verdiği klinik öneriler doktorlar tarafından çok
                    beğenildi. İşte deneyimlerimiz ve sistem incelememiz...
                  </p>
                  <a
                    href="https://teknolojioku.com/vitalcare-inceleme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
                  >
                    İncelemeyi Oku
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Media Item 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">Sağlık Dünyası Dergisi - Kasım 2024</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Türk Hastaneleri Dijital Dönüşümde: Median Örneği
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Sağlık sektöründe dijital dönüşüm hız kazanıyor. Median gibi yerli ve
                    yabancı sermayeli teknoloji şirketleri, hastanelere modern çözümler sunuyor.
                    Ankara Şehir Hastanesi'nde yapılan röportaj ve sektör analizi...
                  </p>
                  <a
                    href="https://saglikdunyasi.com/vitalcare-dijital-donusum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Makaleyi Oku
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Media Item 5 */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-orange-100 rounded-lg p-3">
                  <Sparkles className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">TechCrunch - 3 Aralık 2024</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Lydian AI's Healthcare Arm Median Expands to Turkey with $15M
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Median, the AI-powered hospital information system from Lydian AI, announced
                    its expansion into the Turkish market with a $15M Series A round led by Accel
                    Partners. The company aims to digitize 200+ hospitals by end of 2025...
                  </p>
                  <a
                    href="https://techcrunch.com/vitalcare-turkey-expansion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Read Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Media Item 6 */}
            <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl shadow-lg p-8 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-cyan-100 rounded-lg p-3">
                  <Video className="h-6 w-6 text-cyan-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">Bloomberg HT - 18 Kasım 2024</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Median CEO'su Canlı Yayında: "Sağlıkta AI Devrimi Başladı"
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Bloomberg HT Teknoloji Saati programına konuk olan Median CEO'su, Türkiye'deki
                    büyüme planlarını, yapay zeka stratejisini ve hastane dijitalleşmesinin geleceğini
                    anlattı. 30 dakikalık röportajı izleyin...
                  </p>
                  <a
                    href="https://bloomberght.com/vitalcare-ceo-interview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold"
                  >
                    Röportajı İzle
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Assets / Media Kit */}
      <section id="media-kit" className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Download className="h-5 w-5" />
              Basın Kiti
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Marka Varlıkları ve Basın Materyalleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Median logoları, görselleri ve basın kitini indirin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-rose-100 rounded-lg p-4 w-fit mx-auto mb-4">
                <ImageIcon className="h-12 w-12 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Logo Paketi</h3>
              <p className="text-gray-700 mb-6">
                Median logoları (PNG, SVG, EPS) - renkli ve siyah-beyaz versiyonlar
              </p>
              <Link
                href="/press-kit/vitalcare-logo-pack.zip"
                className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                İndir (2.3 MB)
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-lg p-4 w-fit mx-auto mb-4">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Şirket Bilgileri</h3>
              <p className="text-gray-700 mb-6">
                Median boilerplate, yönetim biyografileri, şirket istatistikleri (PDF)
              </p>
              <Link
                href="/press-kit/vitalcare-company-info.pdf"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                İndir (850 KB)
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-lg p-4 w-fit mx-auto mb-4">
                <Video className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Medya Görselleri</h3>
              <p className="text-gray-700 mb-6">
                Ürün ekran görüntüleri, ofis fotoğrafları, ekip görselleri (ZIP)
              </p>
              <Link
                href="/press-kit/vitalcare-media-assets.zip"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                İndir (15.7 MB)
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border-t-4 border-rose-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Tam Basın Kiti
            </h3>
            <p className="text-gray-700 text-center mb-6 leading-relaxed max-w-2xl mx-auto">
              Tüm basın materyallerini tek pakette indirin: logolar, şirket bilgileri, ürün
              görselleri, basın bültenleri ve marka kullanım kılavuzu.
            </p>
            <div className="text-center">
              <Link
                href="/press-kit/vitalcare-full-press-kit.zip"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Download className="mr-2 h-5 w-5" />
                Tam Basın Kiti İndir (32 MB)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-rose-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
                <Mail className="h-5 w-5" />
                Basın İletişim
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Medya İlişkileri İletişim
              </h2>
              <p className="text-gray-600">
                Basın sorularınız, röportaj talepleri ve medya işbirlikleri için bizimle iletişime geçin
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-rose-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">Basın Sorumlusu</h3>
                <p className="text-gray-700 mb-2"><strong>Ayşe Demir</strong></p>
                <p className="text-gray-600 mb-4">Kurumsal İletişim Direktörü</p>
                <div className="space-y-2">
                  <a
                    href="mailto:press@lydianmedi.com"
                    className="flex items-center gap-2 text-rose-600 hover:text-rose-700"
                  >
                    <Mail className="h-4 w-4" />
                    press@lydianmedi.com
                  </a>
                  <a
                    href="tel:+902123456789"
                    className="flex items-center gap-2 text-rose-600 hover:text-rose-700"
                  >
                    <Phone className="h-4 w-4" />
                    +90 (212) 345 67 89
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">Uluslararası Basın</h3>
                <p className="text-gray-700 mb-2"><strong>Global Communications Team</strong></p>
                <p className="text-gray-600 mb-4">Lydian AI - International Press</p>
                <div className="space-y-2">
                  <a
                    href="mailto:press@lydian.ai"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Mail className="h-4 w-4" />
                    press@lydian.ai
                  </a>
                  <a
                    href="tel:+14155551234"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Phone className="h-4 w-4" />
                    +1 (415) 555-1234
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Basın Bülteni Aboneliği</h3>
              <p className="text-gray-700 mb-4">
                Median'den son haberler ve basın duyurularını e-posta ile almak için abone olun
              </p>
              <form className="flex gap-3">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors whitespace-nowrap"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Abone Ol
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Median Hakkında Yazmak İster misiniz?
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Basın ekibimiz size yardımcı olmak için hazır. Röportaj talepleri, ürün demoları
            ve teknik bilgiler için iletişime geçin.
          </p>
          <a
            href="mailto:press@lydianmedi.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
          >
            <Mail className="mr-2 h-5 w-5" />
            Basın Ekibi ile İletişime Geç
          </a>
          <p className="mt-6 text-sm text-rose-200">
            Ortalama yanıt süresi: 24 saat
          </p>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import {
  Sparkles,
  Cloud,
  Smartphone,
  Zap,
  TrendingUp,
  Shield,
  HeadphonesIcon,
  CheckCircle2,
  XCircle,
  Calculator,
  Quote,
  ArrowRight,
  Users,
  Award,
  BarChart3
} from 'lucide-react';

export default function WhyMedianPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Neden Median?
            </h1>
            <p className="text-xl md:text-2xl text-rose-100 mb-8 leading-relaxed">
              Türkiye'nin en gelişmiş bulut-native hastane bilgi sistemi. Geleneksel yazılımların
              karmaşıklığına son, yapay zeka destekli modern sağlık yönetimine hoş geldiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tr/demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
              >
                Ücretsiz Demo Talep Edin
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/tr/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-400 transition-all border-2 border-white/30"
              >
                Uzman Görüşmesi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">Yüksek</div>
              <div className="text-gray-600">Sistem Erişilebilirlik</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">Hızlı</div>
              <div className="text-gray-600">Kurulum Süreci</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">Verimli</div>
              <div className="text-gray-600">Operasyonel Yönetim</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">7/24</div>
              <div className="text-gray-600">Türkçe Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median Farkı: 8 Temel Avantaj
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sisoft, Medisoft, Gemsoft, Akgün ve MedData gibi geleneksel sistemlerin
              sunduğundan çok daha fazlasını sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Differentiator 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-rose-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-rose-100 rounded-lg p-3">
                  <Sparkles className="h-8 w-8 text-rose-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    AI-First Platform: Rakiplerimizin Olmayan Yapay Zeka Özellikleri
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Median, yapay zeka ile güçlendirilmiş Türkiye'nin ilk HIS platformudur.
                    Otomatik klinik dokümantasyon, akıllı tanı önerileri, tahmine dayalı hasta
                    yönetimi ve sesli komut sistemi ile çalışanlarınızın verimliliğini %60 artırın.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">AI Klinik Asistan: Doktorlara gerçek zamanlı karar desteği</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Otomatik Radyoloji Analizi: Görüntüleri dakikalar içinde değerlendirin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Tahmine Dayalı Yatış Planlama: Yatak doluluk oranını optimize edin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Sesli Komut: "Median, hastanın son tahlil sonuçlarını göster"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Differentiator 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Bulut-Native Mimari: Sıfır Sunucu Maliyeti, Sınırsız Ölçeklenebilirlik
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Geleneksel sistemler pahalı sunucu odaları, yedek güç kaynakları ve IT ekipleri
                    gerektirir. Median tamamen bulut-native olarak tasarlandı. Sunucu yatırımı
                    yapmadan, bakım masrafı olmadan anında kullanmaya başlayın.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Sıfır altyapı yatırımı: Sunucu odası, klima, UPS'e gerek yok</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Otomatik yedekleme: Veri kaybı riski tamamen ortadan kalkar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Anında ölçeklendirme: Hasta yoğunluğuna göre otomatik kapasite artışı</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Türkiye'de veri merkezleri: KVKK ve yerli veri depolama uyumlu</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Differentiator 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Modern UX: Tıpkı Instagram Kadar Kolay Kullanım
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Geleneksel HIS sistemleri 1990'ların karmaşık arayüzlerini kullanır. Median,
                    modern mobil uygulamalar gibi sezgisel bir deneyim sunar. Personel eğitim süresi
                    3 aydan 3 güne düşer, kullanıcı memnuniyeti %95'e ulaşır.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Mobil-first tasarım: Tablet ve telefondan tam kontrol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Tek tıkla işlemler: Hasta kaydı 30 saniyede tamamlanır</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Kişiselleştirilebilir dashboard: Herkes kendi iş akışını optimize eder</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Dark mode desteği: Gece vardiyalarında göz yorgunluğunu azaltır</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Differentiator 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 rounded-lg p-3">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Türkiye Altyapısı: e-Nabız, Medula, SBÜ Tam Entegre
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Median, Türkiye'nin tüm sağlık altyapısı ile kusursuz entegredir. e-Nabız,
                    Medula, SBÜ, HBYS V3 ve tüm SGK protokolleri ile otomatik senkronizasyon.
                    Manuel veri girişine son, uyumsuzluk hatalarına veda edin.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">e-Nabız Gerçek Zamanlı Entegrasyon: Hasta geçmişi otomatik yüklenir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Medula Otomatik Faturalandırma: SGK ödemelerini 10 kat hızlandırın</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">SBÜ HBYS V3 Uyumlu: Sağlık Bakanlığı denetimlerinde sıfır problem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">E-reçete, e-rapor otomasyonu: Kağıt formlar tamamen ortadan kalkar</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Differentiator 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Hızlı Kurulum: 2 Hafta vs Rakiplerin 6-12 Ayı
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Geleneksel HIS kurulumları hastaneleri 6-12 ay boyunca karmaşık entegrasyonlar
                    ve eğitimlerle meşgul eder. Median'in bulut-native yapısı sayesinde 2 hafta
                    içinde tüm sisteminiz canlıya geçer. Hızlı ROI, minimum kesinti.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">1. Hafta: Veri migrasyonu ve sistem konfigürasyonu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">2. Hafta: Personel eğitimi ve canlıya geçiş</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Paralel çalışma: Eski sisteminiz kapanana kadar yedek çalışır</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Sıfır veri kaybı garantisi: %100 veri bütünlüğü sağlanır</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Differentiator 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 rounded-lg p-3">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Transparent Pricing: Gizli Maliyet Yok, Modüler Fiyatlandırma
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Rakiplerimiz "kurulum ücreti", "bakım sözleşmesi", "modül başına lisans" gibi
                    gizli maliyetlerle sizi şaşırtır. Median'de fiyatlandırma tamamen şeffaftır.
                    Sadece kullandığınız kadar ödersiniz, sürpriz faturalar yoktur.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Şeffaf ve modüler fiyatlandırma yapısı</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Sıfır kurulum ücreti: İlk ay ücretsiz deneme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Güncellemeler ücretsiz: Yeni özellikler otomatik yüklenir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">7/24 destek dahil: Premium destek için ek ücret yok</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Differentiator 7 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-cyan-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-100 rounded-lg p-3">
                  <Award className="h-8 w-8 text-cyan-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    %99.9 Uptime SLA: Garantili Sistem Erişimi
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Sağlık hizmetleri 7/24 çalışır, sisteminiz de öyle olmalıdır. Median, %99.9
                    uptime SLA garantisi sunar. Enterprise-grade altyapı, otomatik failover ve multi-region
                    yedeklilik ile sisteminiz asla durumaz.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">%99.9 uptime garantisi: Yılda maksimum 8.76 saat kesinti</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Multi-region yedeklilik: İstanbul ve Ankara veri merkezleri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Otomatik failover: Kesinti durumunda 30 saniyede yedek sisteme geçiş</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Gerçek zamanlı izleme: 24/7 sistem sağlığı takibi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Differentiator 8 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <HeadphonesIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    7/24 Türkçe Destek: Gerçek İnsanlar, Gerçek Çözümler
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Rakiplerimiz sizi otomatik yanıtlayıcılar ve ticket sistemleri ile başbaşa bırakır.
                    Median'de 7/24 gerçek sağlık IT uzmanları telefonunuzun ucunda. Ortalama
                    yanıt süresi 2 dakika, çözüm süresi 30 dakika.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">7/24 canlı destek: Bayramda, tatilde, gece yarısı yanınızdayız</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Ortalama 2 dakika yanıt süresi: Beklemeden anında yardım</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Dedicated account manager: Enterprise müşteriler için özel ekip</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Ücretsiz eğitim ve webinarlar: Personel gelişimi için sürekli destek</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median vs Geleneksel Sistemler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rakiplerimizle arasındaki farkları net bir şekilde görün
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-rose-600 to-red-600 text-white">
                  <th className="py-4 px-6 text-left font-semibold">Özellik</th>
                  <th className="py-4 px-6 text-center font-semibold">Median</th>
                  <th className="py-4 px-6 text-center font-semibold">Geleneksel HIS (Sisoft, Medisoft, vb.)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-rose-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Yapay Zeka Desteği</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700">AI Asistan, Tahminleme, Otomatik Analiz</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">Yok</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-rose-50 transition-colors bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Kurulum Süresi</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700 font-semibold">2 Hafta</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">6-12 Ay</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-rose-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Sunucu Yatırımı</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700 font-semibold">Sıfır - Bulut Tabanlı</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">Yüksek Altyapı Yatırımı</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-rose-50 transition-colors bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Mobil Erişim</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700">iOS, Android, Web - Tam Özellikli</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">Sınırlı veya Yok</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-rose-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Otomatik Güncellemeler</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700">Evet - Kesinti Olmadan</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">Manuel, Ücretli, Kesinti Gerektirir</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-rose-50 transition-colors bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">e-Nabız/Medula Entegrasyonu</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700">Gerçek Zamanlı Otomatik</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">Manuel veya Gecikmeli</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-rose-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Kullanıcı Arayüzü</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700">Modern, Sezgisel, Mobil-First</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">Eski, Karmaşık, Masaüstü Odaklı</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-rose-50 transition-colors bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Destek Saatleri</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700 font-semibold">7/24 Türkçe Destek</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">09:00-18:00 Hafta İçi</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-rose-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Aylık Maliyet (100 Yataklı)</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700 font-semibold">Rekabetçi Fiyat (Tüm Modüller)</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">Yüksek Maliyet</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-rose-50 transition-colors bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Sistem Erişilebilirlik (Uptime)</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700 font-semibold">%99.9 SLA Garantili</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <span className="text-gray-500">%95-98 (Garanti Yok)</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Calculator className="h-5 w-5" />
              ROI Hesaplayıcı
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median ile Ne Kadar Tasarruf Edersiniz?
            </h2>
            <p className="text-xl text-gray-600">
              Hastanenizin büyüklüğüne göre yıllık tasarrufunuzu hesaplayın
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-rose-500">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hastane Yatak Sayısı
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none text-gray-700">
                  <option>50 Yatak (Küçük Özel Hastane)</option>
                  <option>100 Yatak (Orta Ölçekli Hastane)</option>
                  <option>200 Yatak (Büyük Özel Hastane)</option>
                  <option>400 Yatak (Şehir Hastanesi)</option>
                  <option>800+ Yatak (Üniversite Hastanesi)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mevcut HIS Sağlayıcınız
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none text-gray-700">
                  <option>Sisoft</option>
                  <option>Medisoft</option>
                  <option>Gemsoft</option>
                  <option>Akgün Yazılım</option>
                  <option>MedData</option>
                  <option>Diğer</option>
                  <option>Henüz HIS Kullanmıyoruz</option>
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-600 to-red-700 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Maliyet Avantajları</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-sm opacity-90 mb-1">Yazılım Lisans</div>
                  <div className="text-3xl font-bold">Tasarruf</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-sm opacity-90 mb-1">Altyapı Maliyeti</div>
                  <div className="text-3xl font-bold">Düşük</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-sm opacity-90 mb-1">Operasyonel</div>
                  <div className="text-3xl font-bold">Verimlilik</div>
                </div>
              </div>
              <div className="border-t-2 border-white/30 pt-6">
                <div className="text-center">
                  <div className="text-lg opacity-90 mb-2">ÖNEMLI MALİYET TASARRUFU</div>
                  <div className="text-3xl font-bold mb-2">Rekabetçi Fiyatlandırma</div>
                  <div className="text-sm opacity-75">İhtiyacınıza özel fiyat teklifi</div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-rose-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Tasarruf Alanları:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Sunucu odası yatırımı yok:</strong> Klimasyon, UPS, fiziksel güvenlik maliyetleri ortadan kalkar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>IT personel maliyeti düşer:</strong> Daha az teknik personel gereksinimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Operasyonel verimlilik:</strong> AI otomasyonu ile yüksek personel verimliliği</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Modüler fiyatlandırma:</strong> Kullanmadığınız özellikler için ödeme yapmazsınız</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Hızlı SGK tahsilatı:</strong> Medula entegrasyonu ile ödeme süreci hızlanır</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/tr/demo"
                className="inline-flex items-center px-8 py-4 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl"
              >
                Kendi ROI'nizi Hesaplamak için Demo Alın
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Users className="h-5 w-5" />
              Müşteri Referansları
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Türkiye'nin Önde Gelen Sağlık Kurumları Median'i Tercih Ediyor
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl shadow-lg p-8 border-t-4 border-rose-500">
              <Quote className="h-12 w-12 text-rose-300 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Median'e geçişimiz çok başarılı oldu. Kurulum çok hızlı tamamlandı,
                personelimiz kısa sürede sistemi öğrendi. AI asistan sayesinde doktorlarımız
                dokümantasyona daha az zaman harcıyor. Maliyetlerimiz önemli ölçüde azaldı."
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-rose-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Dr. Mehmet Yılmaz</div>
                  <div className="text-sm text-gray-600">Baş Hekim, Özel Sağlık Hastanesi</div>
                  <div className="text-xs text-gray-500 mt-1">Ankara</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <Quote className="h-12 w-12 text-blue-300 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Önceki sistemimizle yaşadığımız sorunları Median ile çözdük. Yüksek sistem
                erişilebilirliği sayesinde kesinti yaşamıyoruz. e-Nabız
                entegrasyonu mükemmel çalışıyor, Medula faturaları otomatik oluşuyor."
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Ayşe Demir</div>
                  <div className="text-sm text-gray-600">IT Direktörü, Özel Hastane</div>
                  <div className="text-xs text-gray-500 mt-1">İzmir</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <Quote className="h-12 w-12 text-green-300 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Hastane grubumuzun birden fazla şubesini Median'e taşıdık. Merkezi yönetim
                dashboard'u sayesinde tüm hastanelerin performansını tek ekrandan izliyorum.
                AI tahmin modelleri ile yatak doluluk oranımızı önemli ölçüde artırdık."
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Hakan Özkan</div>
                  <div className="text-sm text-gray-600">CEO, Hastaneler Grubu</div>
                  <div className="text-xs text-gray-500 mt-1">Çoklu Lokasyon</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/tr/case-studies"
              className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold"
            >
              Tüm Başarı Hikayelerini Okuyun
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Median Farkını Kendiniz Deneyimleyin
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            30 dakikalık ücretsiz demo ile Median'in hastanenize nasıl değer katacağını görün.
            Kredi kartı bilgisi gerekmez, yükümlülük yoktur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tr/demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
            >
              Ücretsiz Demo Rezervasyonu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/tr/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-400 transition-all border-2 border-white/30"
            >
              Fiyatlandırmayı İncele
            </Link>
          </div>
          <p className="mt-6 text-sm text-rose-200">
            2000+ sağlık profesyoneli Median ile çalışıyor
          </p>
        </div>
      </section>
    </div>
  );
}

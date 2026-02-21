import Link from 'next/link';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Laptop,
  GraduationCap,
  Coffee,
  Plane,
  TrendingUp,
  Award,
  Building,
  Rocket,
  ArrowRight,
  Search,
  Filter,
  Upload,
  ChevronRight,
  CheckCircle2,
  Globe,
  Zap
} from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full font-semibold mb-6">
              <Briefcase className="h-5 w-5" />
              Median'de Kariyer
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Türk Sağlık Sistemini Dönüştüren Ekibe Katılın
            </h1>
            <p className="text-xl md:text-2xl text-rose-100 mb-8 leading-relaxed">
              Yapay zeka ile güçlendirilmiş sağlık teknolojileri geliştiriyoruz. Milyonlarca
              hastanın hayatına dokunacak ürünler inşa edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-positions"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
              >
                Açık Pozisyonlar
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#culture"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-400 transition-all border-2 border-white/30"
              >
                Kültürümüz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">85+</div>
              <div className="text-gray-600">Takım Üyesi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">15M€</div>
              <div className="text-gray-600">Series A Fonlama</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">300%</div>
              <div className="text-gray-600">Yıllık Büyüme</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">50+</div>
              <div className="text-gray-600">Hastane Müşteri</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Median & Lydian AI */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
                <Rocket className="h-5 w-5" />
                Hakkımızda
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Median, global yapay zeka şirketi <strong>Lydian AI</strong>'ın Türkiye sağlık
                teknolojileri koludur. 2023 yılında kurulan şirketimiz, İstanbul, Ankara ve
                San Francisco ofisleri ile dünya çapında faaliyet göstermektedir.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Misyonumuz, yapay zeka destekli sağlık teknolojileri ile Türk hastanelerini
                dünya standartlarına taşımak ve sağlık çalışanlarının hayatını kolaylaştırmaktır.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Geleneksel HIS sistemlerinin aksine, bulut-native ve AI-first yaklaşımımızla
                sektöre yeni bir soluk getiriyoruz. 2024 yılında 15M€ Series A yatırım aldık
                ve ekibimizi hızla büyütüyoruz.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/tr/about"
                  className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Hikayemizi Okuyun
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-rose-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Neden Median?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-rose-100 rounded-lg p-2 mt-0.5">
                    <Zap className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Etki Yaratın</div>
                    <div className="text-gray-600">Milyonlarca hastanın hayatına dokunun</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-lg p-2 mt-0.5">
                    <Rocket className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Hızlı Büyüme</div>
                    <div className="text-gray-600">Kariyerinizi hızlandırın, liderlik rollerine geçin</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-lg p-2 mt-0.5">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sürekli Öğrenme</div>
                    <div className="text-gray-600">En yeni AI ve cloud teknolojileri ile çalışın</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2 mt-0.5">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Global Ekip</div>
                    <div className="text-gray-600">Türkiye ve dünyadan yeteneklerle çalışın</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section id="culture" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Heart className="h-5 w-5" />
              Kültür & Değerlerimiz
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median'de Nasıl Çalışıyoruz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Açık iletişim, sürekli öğrenme ve müşteri odaklılık değerlerimizin temelini oluşturur
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl shadow-lg p-8 border-t-4 border-rose-500">
              <div className="bg-rose-100 rounded-lg p-3 w-fit mb-4">
                <Users className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">İnsan Odaklı</h3>
              <p className="text-gray-700 leading-relaxed">
                Ekip üyelerimizin refahına önem veririz. Esnek çalışma saatleri, remote çalışma
                imkanı ve iş-yaşam dengesi bizim için önceliktir. Herkesin sesi duyulur ve
                önerilere açığız.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Büyümeye Açık</h3>
              <p className="text-gray-700 leading-relaxed">
                Hata yapmaktan korkmayan, deneyip öğrenen bir ekibiz. Aylık hack day'ler,
                teknoloji konferansları ve eğitim bütçesi ile sürekli gelişiyoruz.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mükemmeliyetçi</h3>
              <p className="text-gray-700 leading-relaxed">
                Sağlık sektöründe çalıştığımızın farkındayız. Her satır kod, her tasarım kararı
                hasta güvenliğini etkiler. Kalite standartlarımız yüksek, kod review'lar titizdir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Median'de Çalışmanın Avantajları
            </h2>
            <p className="text-xl text-gray-600">
              Rekabetçi maaş paketimizin ötesinde sunduklarımız
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-rose-100 rounded-lg p-3 w-fit mb-4">
                <DollarSign className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Rekabetçi Maaş</h3>
              <p className="text-gray-600 text-sm">
                Piyasa ortalamasının %20-30 üzerinde maaş + yıllık performans bonusu
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Özel Sağlık Sigortası</h3>
              <p className="text-gray-600 text-sm">
                Siz ve aileniz için kapsamlı sağlık sigortası + diş tedavisi paketi
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                <Laptop className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Remote Çalışma</h3>
              <p className="text-gray-600 text-sm">
                Haftanın 3 günü remote çalışma veya tamamen remote pozisyonlar
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Eğitim Bütçesi</h3>
              <p className="text-gray-600 text-sm">
                Yıllık 5.000₺ kişisel gelişim bütçesi - kurslar, konferanslar, kitaplar
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 rounded-lg p-3 w-fit mb-4">
                <Coffee className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Ofis İmkanları</h3>
              <p className="text-gray-600 text-sm">
                Gourmet kahve, sınırsız atıştırmalık, oyun odası, yoga dersleri
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 rounded-lg p-3 w-fit mb-4">
                <Plane className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Yıllık İzin</h3>
              <p className="text-gray-600 text-sm">
                Yasal 14 günün üzerine ekstra 7 gün şirket izni (toplam 21 gün)
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-cyan-100 rounded-lg p-3 w-fit mb-4">
                <Rocket className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Hisse Senedi Opsiyonu</h3>
              <p className="text-gray-600 text-sm">
                Erken çalışanlar için equity paketi - şirketin başarısından pay alın
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-lg p-3 w-fit mb-4">
                <Building className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Ulaşım Desteği</h3>
              <p className="text-gray-600 text-sm">
                Ofise gelenlere aylık ulaşım kartı desteği veya otopark imkanı
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold mb-4">
              <Briefcase className="h-5 w-5" />
              Açık Pozisyonlar
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ekibimize Katılın
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Şu anda 8 farklı pozisyon için yeni ekip arkadaşları arıyoruz
            </p>
          </div>

          {/* Job Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors">
              <Filter className="h-4 w-4" />
              Tüm Pozisyonlar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Yazılım Geliştirme
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Sağlık & Klinik
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Satış & Pazarlama
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Remote
            </button>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {/* Job 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-rose-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Senior Full-Stack Developer (İstanbul)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Median'in core platform ekibinde React, TypeScript, Node.js ve PostgreSQL
                    teknolojileri ile hastane yönetim sistemlerinin kalbi olan modülleri
                    geliştireceksiniz. AI entegrasyonları ve real-time sistemler deneyimi artıdır.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-rose-500" />
                      İstanbul (Maslak)
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-rose-500" />
                      Tam Zamanlı
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4 text-rose-500" />
                      60.000₺ - 90.000₺/ay
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      React
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      PostgreSQL
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      5+ Yıl Deneyim
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/tr/careers/apply?position=senior-fullstack-developer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors whitespace-nowrap"
                  >
                    Başvur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Job 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Healthcare Solutions Consultant (Ankara)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Sağlık sektöründe en az 5 yıl deneyimi olan, HIS sistemlerine hakim
                    profesyoneller arıyoruz. Hastane müşterilerimize teknik danışmanlık,
                    iş akışı optimizasyonu ve değişim yönetimi konularında liderlik edeceksiniz.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      Ankara
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Tam Zamanlı
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4 text-blue-500" />
                      45.000₺ - 70.000₺/ay
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      HIS Deneyimi
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      Sağlık Sektörü
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      Müşteri Yönetimi
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      5+ Yıl Sağlık
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/tr/careers/apply?position=healthcare-solutions-consultant"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Başvur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Job 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    DevOps Engineer (Remote)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Kubernetes, AWS, Terraform ve CI/CD konularında uzman DevOps engineer
                    arıyoruz. %99.9 uptime garantisi olan sistemlerimizin altyapısını
                    yönetecek, monitoring ve otomasyon sistemlerini geliştireceksiniz.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-green-500" />
                      Remote (Türkiye)
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-green-500" />
                      Tam Zamanlı
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      55.000₺ - 85.000₺/ay
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      Kubernetes
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      AWS
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      Terraform
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      CI/CD
                    </span>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold">
                      100% Remote
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/tr/careers/apply?position=devops-engineer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    Başvur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Job 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    UX/UI Designer (İstanbul) - Healthcare Product Design
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Sağlık sektörü için ürün tasarımı yapacak, doktor ve hemşirelerin günlük
                    kullandığı arayüzleri optimize edecek UX/UI designer arıyoruz. Figma,
                    user research ve design system deneyimi bekliyoruz.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      İstanbul (Hybrid)
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      Tam Zamanlı
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4 text-purple-500" />
                      40.000₺ - 65.000₺/ay
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                      Figma
                    </span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                      User Research
                    </span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                      Design Systems
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      3+ Yıl Deneyim
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/tr/careers/apply?position=ux-ui-designer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap"
                  >
                    Başvur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Job 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Clinical Implementation Specialist (İzmir)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Hemşire veya doktor arka planına sahip, HIS sistemlerini tanıyan profesyoneller
                    arıyoruz. Hastanelerde Median kurulumu sırasında klinik iş akışlarını
                    optimize edecek, personel eğitimlerini vereceksiniz.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-red-500" />
                      İzmir
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-red-500" />
                      Tam Zamanlı
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4 text-red-500" />
                      35.000₺ - 55.000₺/ay
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      Hemşire/Doktor
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      Klinik Deneyim
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      Eğitim Yetkinliği
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      3+ Yıl Sağlık
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/tr/careers/apply?position=clinical-implementation-specialist"
                    className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    Başvur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>

            {/* Job 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Customer Success Manager (Bursa) - Enterprise Accounts
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Enterprise hastane müşterilerimizin başarısından sorumlu olacak Customer
                    Success Manager arıyoruz. Müşteri ilişkileri, teknik destek koordinasyonu
                    ve upsell fırsatlarını yöneteceksiniz.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-cyan-500" />
                      Bursa
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-cyan-500" />
                      Tam Zamanlı
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4 text-cyan-500" />
                      40.000₺ - 60.000₺/ay + komisyon
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                      B2B SaaS
                    </span>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                      Enterprise Satış
                    </span>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                      Müşteri İlişkileri
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      3+ Yıl Deneyim
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/tr/careers/apply?position=customer-success-manager"
                    className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors whitespace-nowrap"
                  >
                    Başvur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Aradığınız pozisyonu bulamadınız mı? Özgeçmişinizi yolLayın, size uygun
              fırsatlar çıktığında sizi bilgilendirelim.
            </p>
            <Link
              href="/tr/careers/apply?position=general"
              className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold"
            >
              Genel Başvuru Yapın
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Application Form CTA */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-rose-500">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Başvuru Sürecimiz
              </h2>
              <p className="text-gray-600">
                Basit, hızlı ve şeffaf bir süreç ile 2-3 hafta içinde karar veriyoruz
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-rose-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-rose-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Online Başvuru</h3>
                <p className="text-sm text-gray-600">CV ve motivasyon mektubunuzu gönderin</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">İlk Görüşme</h3>
                <p className="text-sm text-gray-600">HR ekibimizle 30 dakikalık tanışma</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Teknik Mülakat</h3>
                <p className="text-sm text-gray-600">Ekip lideri ile pozisyona özel görüşme</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Teklif</h3>
                <p className="text-sm text-gray-600">İki taraf da mutluysa başlıyoruz!</p>
              </div>
            </div>

            <div className="bg-rose-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Başvuru İçin Gerekli Bilgiler:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Güncel CV (PDF formatında)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Motivasyon mektubu (neden Median?)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Portfolio/GitHub linki (geliştirici pozisyonları için)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">LinkedIn profili (tercihen)</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                href="/tr/careers/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Upload className="mr-2 h-5 w-5" />
                Başvuru Formunu Doldur
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                Sorularınız için:{' '}
                <a href="mailto:careers@lydianmedi.com" className="text-rose-600 hover:text-rose-700 font-semibold">
                  careers@lydianmedi.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Geleceğin Sağlık Teknolojisini Birlikte İnşa Edelim
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Median ekibine katılın, Türkiye'nin sağlık altyapısını dönüştürmede
            rol oynayın.
          </p>
          <Link
            href="/tr/careers/apply"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl"
          >
            Açık Pozisyonları İnceleyin
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-6 text-sm text-rose-200">
            Median fırsat eşitliğine inanır. Tüm başvurular eşit şekilde değerlendirilir.
          </p>
        </div>
      </section>
    </div>
  );
}

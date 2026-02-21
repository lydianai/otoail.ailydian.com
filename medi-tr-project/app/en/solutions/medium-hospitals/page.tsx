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
  Activity,
  BarChart3,
  Stethoscope,
  LineChart,
  FileCheck,
  Database,
  Settings,
  ArrowRight,
  Sparkles,
  Target,
  Gauge,
  BookOpen,
  UserCog,
  Layers,
  GitBranch,
  Network,
  ClipboardCheck,
  TrendingDown,
  BadgeCheck
} from 'lucide-react';

export default function MediumHospitals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-semibold">50-200 Yatak Arası Hastaneler İçin</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Orta Boy Hastaneler İçin
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                Tam Entegre HBYS
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-50 leading-relaxed max-w-3xl mx-auto">
              Acil servis, ameliyathane, yoğun bakım ve tüm klinik departmanları tek platformda yönetin.
              Çoklu kampüs desteği, performans raporları ve akreditasyon hazırlığı dahil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Demo Talep Edin
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/contact"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Uzman Görüşmesi
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">18 Ay</div>
                <div className="text-red-100 text-sm">Ortalama ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">%35</div>
                <div className="text-red-100 text-sm">Operasyonel Maliyet Azalma</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">%99.9</div>
                <div className="text-red-100 text-sm">Uptime SLA</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-red-100 text-sm">Dedicated Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Modules */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Tam Entegre HBYS Modülleri
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Tüm departmanlarınız için eksiksiz dijital hastane deneyimi
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Acil Servis (ED)</h3>
                <p className="text-slate-700 mb-6">
                  Triyaj yönetimi, acil hasta takibi, yatak izleme, emergency care pathway,
                  ambulans koordinasyonu ve ED performans metrikleri.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Manchester Triyaj Sistemi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Gerçek zamanlı yatak durumu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">ED bekleme süre dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Ameliyathane (OR)</h3>
                <p className="text-slate-700 mb-6">
                  Ameliyat planlama, salon optimizasyonu, anestezi kayıtları, cerrahi safety checklist,
                  implant/consumable takibi, OR verimlilik analizi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik salon ataması</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">WHO Surgical Safety Checklist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Anestezi elektronik kayıt</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Yoğun Bakım (ICU)</h3>
                <p className="text-slate-700 mb-6">
                  Vital signs otomatik entegrasyonu, ventilatör parametreleri, APACHE/SOFA skorlama,
                  sepsis bundle takibi, ICU günlük raporları.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Cihaz entegrasyonu (monitör, ventilatör)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">APACHE II/IV skorlama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Saatlik vital signs grafiği</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Database className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Servis Yönetimi</h3>
                <p className="text-slate-700 mb-6">
                  Yatak yönetimi, hasta transfer, hemşirelik bakım planları, ilaç uygulama kayıtları,
                  vital signs takibi, hasta günlük raporları.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Gerçek zamanlı yatak haritası</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Hemşire iş listesi ve barcode</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Departman transfer workflow</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Laboratuvar (LIS)</h3>
                <p className="text-slate-700 mb-6">
                  Laboratuvar bilgi sistemi, cihaz entegrasyonu (HL7), test katalog yönetimi,
                  barcode etiketleme, quality control, delta check.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">40+ cihaz HL7 entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik kritik değer bildirimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">CAP/ISO 15189 akreditasyon desteği</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <FileCheck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Radyoloji (RIS/PACS)</h3>
                <p className="text-slate-700 mb-6">
                  Radyoloji bilgi sistemi, DICOM görüntü arşivi, raporlama workflow,
                  tetkik randevu yönetimi, film arşiv, tele-radyoloji.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">DICOM viewer entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Structured reporting templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Cihaz worklist (MR, CT, XRay)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Campus & Performance */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Çoklu Kampüs ve Performans Yönetimi
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Hastane zinciri veya çoklu kampüs işletmeler için merkezi yönetim
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <GitBranch className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Çoklu Kampüs Desteği</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Farklı lokasyonlarda birden fazla kampüsünüz varsa, tüm hastanelerinizi tek platformda
                  yönetin. Merkezi raporlama, kaynak paylaşımı ve standart prosedürler.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Kampüsler arası hasta transferi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Merkezi raporlama ve analitik</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Ortak hasta kayıt ve dosya</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Kampüs bazlı yetkilendirme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Stok ve malzeme paylaşımı</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Gauge className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Performans Yönetimi</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Departman bazlı KPI takibi, doktor performans metrikleri, finansal dashboard,
                  operasyonel verimlilik analizleri ve benchmark raporları.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Departman KPI dashboard'ları</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Doktor verimliliği raporları</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Yatak doluluk ve devir hızı</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Gelir analizi (departman/doktor)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Quality metrics (readmission, mortality)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <BadgeCheck className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Akreditasyon Desteği</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  JCI (Joint Commission International), ISO 15189, CAP akreditasyonlarına
                  hazırlık. Otomatik doküman yönetimi ve audit trail.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">JCI standartlarına uygun formlar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Quality & Safety indikator takibi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Olay raporlama sistemi (incident)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Policy & procedure repository</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Audit-ready raporlar</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <LineChart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">İş Zekası ve Raporlama</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Yönetici dashboard'ları, özelleştirilebilir raporlar, veri ambarı entegrasyonu,
                  predictive analytics ve trend analizleri.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Executive dashboard (C-level)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Ad-hoc rapor oluşturma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Tahmine dayalı hastane doluluk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Finansal forecasting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Power BI/Tableau entegrasyonu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Cost Savings */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Ölçülebilir Yatırım Getirisi
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Median kullanan orta boy hastanelerin ortalama tasarruf ve kazançları
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 text-center">
                <TrendingDown className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-slate-900 mb-2">%35</div>
                <div className="text-slate-700 font-semibold mb-2">Operasyonel Maliyet Azalma</div>
                <div className="text-sm text-slate-600">
                  Kağıt, arşiv, IT personel, yedekleme maliyetleri
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 text-center">
                <TrendingUp className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-slate-900 mb-2">%25</div>
                <div className="text-slate-700 font-semibold mb-2">Gelir Artışı</div>
                <div className="text-sm text-slate-600">
                  Daha fazla hasta kapasitesi, SGK red azalma
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 text-center">
                <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-slate-900 mb-2">40%</div>
                <div className="text-slate-700 font-semibold mb-2">Zaman Tasarrufu</div>
                <div className="text-sm text-slate-600">
                  Hasta kayıt, raporlama ve idari işlemler
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 text-center">
                <Target className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-slate-900 mb-2">18 Ay</div>
                <div className="text-slate-700 font-semibold mb-2">ROI Süresi</div>
                <div className="text-sm text-slate-600">
                  Ortalama yatırım geri dönüş süresi
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-12 rounded-3xl">
              <h3 className="text-3xl font-bold mb-8 text-center">Örnek Tasarruf Hesabı (120 Yataklı Hastane)</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-4">Yıllık Maliyet Azalması:</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>IT altyapı ve personel</span>
                      <span className="font-bold">₺850,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>Kağıt, baskı, arşiv</span>
                      <span className="font-bold">₺320,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>İdari personel verimliliği</span>
                      <span className="font-bold">₺480,000</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-xl">
                      <span className="font-bold">Toplam Tasarruf:</span>
                      <span className="font-bold">₺1,650,000/yıl</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-4">Yıllık Gelir Artışı:</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>SGK red oranı azalması</span>
                      <span className="font-bold">₺1,200,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>Yatak devir hızı artışı</span>
                      <span className="font-bold">₺980,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span>Kodlama iyileştirmesi</span>
                      <span className="font-bold">₺540,000</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-xl">
                      <span className="font-bold">Toplam Ek Gelir:</span>
                      <span className="font-bold">₺2,720,000/yıl</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-yellow-400 text-slate-900 p-6 rounded-xl text-center">
                <div className="text-sm font-semibold mb-2">Toplam Yıllık Fayda</div>
                <div className="text-5xl font-bold mb-2">₺4,370,000</div>
                <div className="text-sm">Median yıllık maliyet: ~₺720,000</div>
                <div className="text-xl font-bold mt-2">Net Kazanç: ₺3,650,000/yıl</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Orta Boy Hastanelerden Başarı Hikayeleri
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    AS
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">Antalya Şifa Hastanesi</div>
                    <div className="text-slate-600 text-sm">85 Yatak - Genel Hastane</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "10 yıllık eski HBYS sistemimizden Median'e 8 haftada geçiş yaptık. Acil servis bekleme
                  sürelerimiz %45 düştü. Ameliyathane verimliliği %30 arttı. İlk yıl ROI'miz %180 oldu."
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">%45</div>
                      <div className="text-xs text-slate-600">ED süre azalma</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">%30</div>
                      <div className="text-xs text-slate-600">OR verimlilik</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">8 hafta</div>
                      <div className="text-xs text-slate-600">Geçiş süresi</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Dr. Ahmet Kara - Başhekim</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    KÖ
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">Konya Özel Hastanesi</div>
                    <div className="text-slate-600 text-sm">140 Yatak - Özel Zincir (3 kampüs)</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "3 kampüsümüzü Median ile birleştirdik. Merkezi raporlama ve kampüsler arası hasta
                  transferi çok kolaylaştı. JCI akreditasyonunu ilk seferde aldık. Destek ekibi mükemmel."
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">3 Kampüs</div>
                      <div className="text-xs text-slate-600">Tek platform</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">JCI</div>
                      <div className="text-xs text-slate-600">İlk seferde</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">%50</div>
                      <div className="text-xs text-slate-600">Rapor hızı</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Fatma Yıldız - COO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Kurulum ve Destek Süreci
              </h2>
              <p className="text-xl text-slate-600">
                Ortalama 12 haftalık profesyonel kurulum ve özel başarı yöneticisi
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1-2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Hafta 1-2: Keşif ve Planlama</h3>
                  <p className="text-slate-600 mb-4">
                    Site ziyareti, mevcut sistem analizi, iş akışı haritalama, veri migrasyonu stratejisi,
                    proje ekibi ve zaman çizelgesi oluşturma.
                  </p>
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-2">Çıktılar:</div>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>Proje planı ve zaman çizelgesi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>Veri migrasyonu stratejisi</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3-6
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Hafta 3-6: Konfigürasyon ve Entegrasyon</h3>
                  <p className="text-slate-600 mb-4">
                    Sistem özelleştirmeleri, departman tanımları, kullanıcı rolleri, formlar/şablonlar,
                    cihaz entegrasyonları (lab, PACS, eczane), e-Nabız/Medula entegrasyon testleri.
                  </p>
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-2">Çıktılar:</div>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>Tüm modüller konfigüre edildi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>Cihaz entegrasyonları test edildi</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  7-9
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Hafta 7-9: Veri Migrasyonu ve Test</h3>
                  <p className="text-slate-600 mb-4">
                    Geçmiş hasta kayıtlarının transferi, veri doğrulama, UAT (kullanıcı kabul testleri),
                    performans testleri, güvenlik audit.
                  </p>
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-2">Çıktılar:</div>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>Tüm veriler transfer edildi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>UAT tamamlandı</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  10-11
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Hafta 10-11: Eğitim</h3>
                  <p className="text-slate-600 mb-4">
                    Rol bazlı eğitimler (doktor, hemşire, idari personel), süper kullanıcı sertifikasyonu,
                    hands-on workshop, eğitim materyalleri.
                  </p>
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-2">Çıktılar:</div>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>Tüm kullanıcılar eğitildi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>Süper kullanıcılar sertifikalandı</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  12
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Hafta 12: Go-Live ve Hypercare</h3>
                  <p className="text-slate-600 mb-4">
                    Canlı yayına geçiş, onsite destek ekibi, 7/24 yoğun destek (ilk 2 hafta),
                    günlük durum toplantıları, sorun giderme.
                  </p>
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg">
                    <div className="font-semibold text-slate-900 mb-2">Çıktılar:</div>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>Sistem canlı</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span>İlk hasta işlemleri başarılı</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Kurulum Sonrası Destek</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <UserCog className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Dedicated CSM</h4>
                  <p className="text-red-100 text-sm">
                    Size özel başarı yöneticisi. Üç aylık başarı değerlendirme toplantıları.
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">7/24 Teknik Destek</h4>
                  <p className="text-red-100 text-sm">
                    Telefon, email, chat ve uzaktan bağlantı. Ortalama 15 dakika yanıt süresi.
                  </p>
                </div>
                <div className="text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">Sürekli Eğitim</h4>
                  <p className="text-red-100 text-sm">
                    Aylık webinar, online kütüphane, kullanıcı topluluğu forumu.
                  </p>
                </div>
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
              Hastanenizi Dijital Dönüşüme Hazırlayın
            </h2>
            <p className="text-xl mb-8 text-red-50">
              Orta boy hastaneler için özel demo ile Median'in tam modül entegrasyonunu,
              performans yönetimini ve çoklu kampüs desteğini görün.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Ücretsiz Demo Talep Edin
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/contact"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Uzman Görüşmesi
              </Link>
            </div>
            <div className="text-red-100">
              <p>ROI hesaplaması mı istiyorsunuz? <Link href="/tr/contact" className="underline font-semibold">Finansal analiz ekibimizle görüşün</Link></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

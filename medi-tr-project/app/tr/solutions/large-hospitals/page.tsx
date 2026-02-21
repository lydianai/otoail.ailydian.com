import Link from 'next/link';
import {
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  Building2,
  Database,
  Cloud,
  Activity,
  BarChart3,
  LineChart,
  FileCheck,
  Settings,
  ArrowRight,
  Sparkles,
  Globe,
  Network,
  Layers,
  Code,
  Server,
  Lock,
  BookOpen,
  UserCog,
  Gauge,
  GitBranch,
  Binary,
  Workflow,
  ClipboardList,
  GraduationCap,
  Microscope
} from 'lucide-react';

export default function LargeHospitals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-semibold">200+ Yatak Enterprise Hastaneler İçin</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Enterprise Ölçek
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                Dijital Hastane Platformu
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-50 leading-relaxed max-w-3xl mx-auto">
              Üniversite hastaneleri, şehir hastaneleri ve kamu hastane zincirleri için enterprise düzey HBYS.
              HL7 FHIR API, veri ambarı, BI raporlar, araştırma veri yönetimi ve çoklu dil desteği.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Enterprise Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/contact"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Teknik Görüşme
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">%99.99</div>
                <div className="text-red-100 text-sm">Uptime SLA</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">10M+</div>
                <div className="text-red-100 text-sm">Hasta Kayıtları</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-red-100 text-sm">Concurrent Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">24/7/365</div>
                <div className="text-red-100 text-sm">Premium Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Enterprise Düzey Özellikler
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Büyük ölçekli sağlık kuruluşları için özel olarak tasarlanmış gelişmiş yetenekler
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">HL7 FHIR API</h3>
                <p className="text-slate-700 mb-6">
                  Modern HL7 FHIR R4 standardı ile tam interoperabilite. RESTful API, OAuth 2.0 güvenlik,
                  SMART on FHIR uyumlu, 300+ FHIR resource desteği.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">HL7 FHIR R4 standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">RESTful API documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">OAuth 2.0 + JWT authentication</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Database className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Veri Ambarı ve BI</h3>
                <p className="text-slate-700 mb-6">
                  Enterprise veri ambarı (EDW), ETL pipeline, OLAP cube, predictive analytics,
                  Power BI/Tableau entegrasyonu, real-time dashboards.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Petabyte ölçek veri depolama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Real-time ETL pipeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Machine learning modelleri</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Network className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Enterprise Entegrasyonlar</h3>
                <p className="text-slate-700 mb-6">
                  SAP, Oracle ERP, Microsoft Dynamics entegrasyonu. Legacy sistem migration,
                  custom API development, ESB (Enterprise Service Bus) desteği.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">SAP/Oracle ERP entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Legacy sistem migration toolkit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Custom ESB development</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Server className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Yüksek Kullanılabilirlik</h3>
                <p className="text-slate-700 mb-6">
                  Multi-region deployment, auto-scaling, load balancing, disaster recovery,
                  %99.99 uptime SLA, RTO &lt; 1 saat, RPO &lt; 15 dakika.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Multi-AZ deployment (AWS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Automatic failover &lt; 2 dakika</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">15 dakika backup interval</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Enterprise Güvenlik</h3>
                <p className="text-slate-700 mb-6">
                  SSO (SAML/LDAP), multi-factor authentication, role-based access control (RBAC),
                  data encryption at rest/transit, SOC 2 Type II certified.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">SSO (SAML 2.0, LDAP, AD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">MFA (SMS, Authenticator, FIDO2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">AES-256 encryption + TLS 1.3</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Çoklu Dil Desteği</h3>
                <p className="text-slate-700 mb-6">
                  Türkçe, İngilizce, Arapça, Rusça arayüz ve raporlar. Unicode desteği,
                  RTL (sağdan sola) layout, çoklu para birimi, timezone yönetimi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">10+ dil desteği</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">RTL layout (Arapça)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Çoklu para birimi faturalandırma</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic & Research */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Akademik ve Araştırma Hastaneleri İçin
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Eğitim ve araştırma faaliyetlerini destekleyen özel modüller
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Eğitim Hastanesi Modülü</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Asistan ve öğrenci yönetimi, rotasyon planlaması, ameliyat log takibi,
                  vaka sayısı raporları, değerlendirme sistemi, sertifika yönetimi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Asistan rotasyon ve görev planlaması</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Ameliyat/prosedür log book (ACGME uyumlu)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Öğrenci klinik performans değerlendirme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Eğitim programı akreditasyon raporları</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">OSCE sınav yönetimi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Microscope className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Araştırma Veri Yönetimi</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Klinik çalışma protokol takibi, hasta consent yönetimi, EDC (Electronic Data Capture),
                  randomizasyon, GCP uyumlu audit trail, FDA 21 CFR Part 11 compliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Klinik araştırma protokol repository</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Elektronik veri yakalama (EDC) formları</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Hasta randomizasyon ve blinding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">GCP compliant audit trail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">SPSS/R veri export</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <ClipboardList className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Etik Kurul Yönetimi</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Etik kurul başvuruları, değerlendirme workflow, toplantı planlaması,
                  karar takibi, protokol revizyonları, yıllık rapor yönetimi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Online etik kurul başvuru sistemi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Değerlendirici atama ve review workflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Toplantı gündem ve tutanak yönetimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Karar bildirimi ve tracking</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Akademik Performans</h3>
                </div>
                <p className="text-slate-700 mb-6">
                  Yayın takibi, atıf analizi, H-index hesaplama, proje yönetimi,
                  bütçe takibi, akademik teşvik puanları, CV oluşturma.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Yayın ve atıf database (PubMed sync)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Araştırma proje ve bütçe yönetimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Akademik teşvik puanı hesaplama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik CV/resume oluşturma</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Architecture */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Enterprise Mimari ve Ölçeklenebilirlik
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Büyük ölçekli hastaneler için performans ve güvenilirlik
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border-2 border-slate-200 text-center">
                <Layers className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Mikroservis Mimarisi</h3>
                <p className="text-slate-700 mb-4">
                  Bağımsız dağıtılabilir servisler. Kubernetes orchestration, Docker containers,
                  service mesh (Istio).
                </p>
                <div className="text-sm text-slate-600 space-y-2">
                  <div>• 50+ mikroservis</div>
                  <div>• Auto-scaling</div>
                  <div>• Zero-downtime deployment</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border-2 border-slate-200 text-center">
                <Database className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Distributed Database</h3>
                <p className="text-slate-700 mb-4">
                  PostgreSQL cluster, Redis cache, MongoDB document store,
                  Elasticsearch full-text search.
                </p>
                <div className="text-sm text-slate-600 space-y-2">
                  <div>• Sharding support</div>
                  <div>• Read replicas</div>
                  <div>• Multi-region sync</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border-2 border-slate-200 text-center">
                <Gauge className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Performans Optimizasyonu</h3>
                <p className="text-slate-700 mb-4">
                  CDN caching, query optimization, lazy loading,
                  asynchronous processing, message queue.
                </p>
                <div className="text-sm text-slate-600 space-y-2">
                  <div>• &lt; 200ms page load</div>
                  <div>• 10,000+ concurrent users</div>
                  <div>• Real-time updates</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-12 rounded-3xl">
              <h3 className="text-3xl font-bold mb-8 text-center">Teknik Özellikler</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Binary className="w-6 h-6" />
                    Teknoloji Stack
                  </h4>
                  <ul className="space-y-2 text-red-50">
                    <li>• Frontend: React 18 + TypeScript + Next.js</li>
                    <li>• Backend: Node.js + Python + Go</li>
                    <li>• Database: PostgreSQL 15 + Redis + MongoDB</li>
                    <li>• Search: Elasticsearch + OpenSearch</li>
                    <li>• Queue: RabbitMQ + Apache Kafka</li>
                    <li>• Cache: Redis Cluster + Memcached</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Cloud className="w-6 h-6" />
                    Altyapı ve DevOps
                  </h4>
                  <ul className="space-y-2 text-red-50">
                    <li>• Cloud: AWS (multi-region) / Azure / GCP</li>
                    <li>• Orchestration: Kubernetes + Helm</li>
                    <li>• CI/CD: GitLab CI + ArgoCD</li>
                    <li>• Monitoring: Prometheus + Grafana</li>
                    <li>• Logging: ELK Stack + Loki</li>
                    <li>• Security: Vault + Cert Manager</li>
                  </ul>
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
                Büyük Hastanelerden Başarı Hikayeleri
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    İÜ
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">İstanbul Üniversite Hastanesi</div>
                    <div className="text-slate-600 text-sm">420 Yatak - Eğitim Araştırma</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "20 yıllık on-premise sistemden bulut tabanlı Median'e geçiş yaptık. 5 farklı legacy
                  sistem yerine tek platform. HL7 FHIR API ile tüm bölümler entegre. Asistan log book
                  modülü ile akreditasyon sürecimiz kolaylaştı."
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">5→1</div>
                      <div className="text-xs text-slate-600">Sistem birleştirme</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">6 ay</div>
                      <div className="text-xs text-slate-600">Migration süresi</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">1200</div>
                      <div className="text-xs text-slate-600">Concurrent users</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Prof. Dr. Zeynep Öztürk - Hastane Müdürü</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    AŞ
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">Ankara Şehir Hastanesi</div>
                    <div className="text-slate-600 text-sm">2600 Yatak - Kamu Hastane Birliği</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "Türkiye'nin en büyük şehir hastanesinde Median kullanıyoruz. 8 farklı kampüs,
                  3500+ kullanıcı, günlük 15,000 hasta. Sistem hiç aksama yaşamadı. SAP ERP
                  entegrasyonu sorunsuz çalışıyor."
                </p>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">8 Kampüs</div>
                      <div className="text-xs text-slate-600">Tek platform</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">3500</div>
                      <div className="text-xs text-slate-600">Aktif kullanıcı</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">%99.99</div>
                      <div className="text-xs text-slate-600">Gerçek uptime</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Mehmet Aydın - CIO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Enterprise Destek ve SLA
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Premium destek paketi ve garantili hizmet seviyeleri
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <UserCog className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Dedicated Success Team</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>Customer Success Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>Technical Account Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>Solutions Architect</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>Üç aylık QBR toplantıları</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <Shield className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">SLA Garantileri</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>%99.99 uptime SLA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>&lt; 5 dk P1 issue yanıt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>&lt; 1 saat RTO (P1)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>&lt; 15 dk RPO</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <Activity className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Proaktif İzleme</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>24/7 sistem monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>Predictive alerting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>Performance optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>Aylık sağlık raporları</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-12 rounded-3xl">
              <h3 className="text-3xl font-bold mb-8 text-center">Enterprise Destek Seviyeleri</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-4 px-4">Priority</th>
                      <th className="text-left py-4 px-4">Description</th>
                      <th className="text-left py-4 px-4">Response Time</th>
                      <th className="text-left py-4 px-4">Resolution Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-700">
                      <td className="py-4 px-4 font-bold text-red-400">P1 - Critical</td>
                      <td className="py-4 px-4">Sistem tamamen down</td>
                      <td className="py-4 px-4">&lt; 5 dakika</td>
                      <td className="py-4 px-4">&lt; 1 saat</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-4 px-4 font-bold text-orange-400">P2 - High</td>
                      <td className="py-4 px-4">Major özellik çalışmıyor</td>
                      <td className="py-4 px-4">&lt; 15 dakika</td>
                      <td className="py-4 px-4">&lt; 4 saat</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-4 px-4 font-bold text-yellow-400">P3 - Medium</td>
                      <td className="py-4 px-4">Workaround mevcut</td>
                      <td className="py-4 px-4">&lt; 1 saat</td>
                      <td className="py-4 px-4">&lt; 1 iş günü</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-bold text-green-400">P4 - Low</td>
                      <td className="py-4 px-4">Genel sorular, iyileştirmeler</td>
                      <td className="py-4 px-4">&lt; 4 saat</td>
                      <td className="py-4 px-4">&lt; 3 iş günü</td>
                    </tr>
                  </tbody>
                </table>
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
              Enterprise Hastane Dijitalleşmenize Başlayın
            </h2>
            <p className="text-xl mb-8 text-red-50">
              Büyük hastaneler için özel enterprise demo ve teknik mimaride deep-dive.
              Solutions architect ekibimizle görüşerek özel ihtiyaçlarınızı değerlendirin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Enterprise Demo Talep Edin
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/contact"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Solutions Architect Görüşmesi
              </Link>
            </div>
            <div className="text-red-100">
              <p>Enterprise RFP desteği mi gerekiyor? <Link href="/tr/contact" className="underline font-semibold">Enterprise satış ekibimizle iletişime geçin</Link></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

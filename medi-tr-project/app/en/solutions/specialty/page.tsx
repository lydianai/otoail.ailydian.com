import Link from 'next/link';
import {
  CheckCircle,
  Heart,
  Eye,
  Bone,
  Brain,
  Activity,
  Pill,
  Stethoscope,
  Award,
  Building2,
  ArrowRight,
  Sparkles,
  FileCheck,
  Database,
  BarChart3,
  Calendar,
  Users,
  Shield,
  Zap,
  Target,
  BookOpen,
  Microscope,
  Radio,
  Scan,
  Syringe,
  TestTube,
  Dna,
  Scissors,
  ImagePlus
} from 'lucide-react';

export default function SpecialtyCenters() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-semibold">Branşa Özel Sağlık Merkezleri İçin</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Branşa Özel
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                HBYS Çözümleri
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-50 leading-relaxed max-w-3xl mx-auto">
              Onkoloji, kardiyoloji, ortopedi, göz, diş ve daha fazlası. Her uzmanlık alanı için özel
              modüller, protokoller ve iş akışları. 45+ branşa özel özellik seti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Branşınıza Özel Demo
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
                <div className="text-3xl font-bold">45+</div>
                <div className="text-red-100 text-sm">Branş Özel Modül</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-red-100 text-sm">Klinik Protokol</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-red-100 text-sm">Özel Merkez</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-red-100 text-sm">Branş Uzmanı Destek</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oncology */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <Activity className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Onkoloji Merkezleri</h2>
                <p className="text-xl text-slate-600">Kanser tedavi ve takip süreçleri için özel modüller</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Syringe className="w-7 h-7 text-red-600" />
                  Kemoterapi Yönetimi
                </h3>
                <p className="text-slate-700 mb-6">
                  Kemoterapi protokol kütüphanesi (NCCN guidelines), doz hesaplama, BSA calculator,
                  pre-medication, yan etki takibi, cycle scheduling.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">500+ kemoterapi protokolü (NCCN, ESMO)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik doz hesaplama (BSA, AUC, CrCl)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Chemotherapy order verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">CTCAE yan etki skorlama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Cycle takvimi ve hatırlatıcılar</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Radio className="w-7 h-7 text-red-600" />
                  Radyoterapi Planlama
                </h3>
                <p className="text-slate-700 mb-6">
                  Radyasyon onkolojisi modülü, tedavi planlama, doz fraksiyonlama,
                  simulasyon, günlük kontrol, OAR (organ at risk) takibi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">RT tedavi planlama (IMRT, VMAT, SRS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Fraksiyon şema yönetimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Linac cihaz entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Günlük QA ve treatment verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Doz volüm histogram analizi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Users className="w-7 h-7 text-red-600" />
                  Tümör Board (Multidisipliner Konsey)
                </h3>
                <p className="text-slate-700 mb-6">
                  MDT (Multidisciplinary Team) toplantı yönetimi, vaka sunumu,
                  karar kayıtları, attendance tracking, rapor oluşturma.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Dijital tümör board toplantı platformu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Vaka sunum şablonları</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Görüntüleme (patoloji, radyoloji) entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">MDT karar kayıtları ve takip</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-red-600" />
                  Kanser Kayıt Sistemi
                </h3>
                <p className="text-slate-700 mb-6">
                  Tumor registry, TNM staging, survival analysis, outcome tracking,
                  CanReg entegrasyonu, SEER raporlama.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik TNM staging (AJCC 8th edition)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">ICD-O-3 topografi ve morfoloji kodlama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Survival curve (Kaplan-Meier) analizi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">CanReg/SEER format export</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-8 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Onkoloji Merkezi Müşteri Örneği</h3>
                  <p className="text-red-100 mb-4">
                    "Median kemoterapi modülü sayesinde ilaç hataları %90 azaldı. Tümör board toplantılarımız
                    dijitalleşti, MDT kararları artık otomatik hasta dosyasına işleniyor." - Dr. Ali Yılmaz, Ankara Onkoloji Hastanesi
                  </p>
                </div>
                <Award className="w-16 h-16 text-yellow-300 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cardiology */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Kardiyoloji Merkezleri</h2>
                <p className="text-xl text-slate-600">Kalp ve damar hastalıkları için özel çözümler</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Activity className="w-7 h-7 text-red-600" />
                  Kateter Laboratuvarı
                </h3>
                <p className="text-slate-700 mb-6">
                  Cath lab yönetimi, anjiyografi raporlama, SYNTAX score hesaplama,
                  stent envanter, komplikasyon takibi, hemodynamic monitoring.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Structured coronary angiography reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">SYNTAX score calculator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Stent/balloon tracking ve inventory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">NCDR CathPCI registry uyumlu</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Activity className="w-7 h-7 text-red-600" />
                  EKG Entegrasyonu
                </h3>
                <p className="text-slate-700 mb-6">
                  12-lead EKG cihaz entegrasyonu, otomatik yorumlama, seriyal EKG karşılaştırma,
                  kritik bulgu alert, arşivleme (DICOM waveform).
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">30+ EKG cihaz marka entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">AI-powered EKG interpretation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">STEMI alert sistemi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">DICOM waveform storage</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Zap className="w-7 h-7 text-red-600" />
                  Pacemaker/ICD Takibi
                </h3>
                <p className="text-slate-700 mb-6">
                  Kalıcı pacemaker, ICD, CRT-D cihaz kayıt ve takibi. İmplant bilgileri,
                  kontrol randevuları, battery status, remote monitoring entegrasyonu.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Device registry (pacemaker, ICD, CRT)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik follow-up scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Remote monitoring entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Battery EOL uyarıları</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Scan className="w-7 h-7 text-red-600" />
                  Ekokardiyografi
                </h3>
                <p className="text-slate-700 mb-6">
                  Echo raporlama, EF hesaplama, valvular assessment, diastolic function,
                  strain analysis, structured reporting (ASE guidelines).
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">ASE guidelines structured templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik EF, volumes hesaplama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Valvular scoring (Wilkins, EOA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Echo cihaz (GE, Philips) DICOM entegre</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Orthopedics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <Bone className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Ortopedi Merkezleri</h2>
                <p className="text-xl text-slate-600">Ortopedi ve travmatoloji özel modülleri</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Scissors className="w-7 h-7 text-red-600" />
                  Cerrahi Planlama 3D
                </h3>
                <p className="text-slate-700 mb-6">
                  3D cerrahi planlama, templating (kalça, diz protezi),
                  preoperative simülasyon, implant seçimi.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">3D DICOM rendering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Digital templating tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Implant library</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Database className="w-7 h-7 text-red-600" />
                  Protez Envanter
                </h3>
                <p className="text-slate-700 mb-6">
                  İmplant ve protez stok yönetimi, lot/serial tracking,
                  expiry management, supplier integration.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Implant catalog (5000+ items)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Barcode tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">FDA/CE izlenebilirlik</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-red-600" />
                  Outcome Scoring
                </h3>
                <p className="text-slate-700 mb-6">
                  Harris Hip Score, Oxford Knee Score, WOMAC,
                  VAS pain score, ROM measurements.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">20+ ortopedi skorlama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Pre/post-op karşılaştırma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Registry reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ophthalmology */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Göz Hastaneleri</h2>
                <p className="text-xl text-slate-600">Oftalmoloji için özelleştirilmiş modüller</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <ImagePlus className="w-7 h-7 text-red-600" />
                  Görüntüleme Cihaz Entegrasyonu
                </h3>
                <p className="text-slate-700 mb-6">
                  OCT, fundus kamera, topografi, pachymeter, HRT, IOL master
                  cihazlarından DICOM görüntü entegrasyonu.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">50+ oftalmoloji cihaz entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">OCT/fundus DICOM viewer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Seriyal görüntü karşılaştırma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">AI-powered retinal disease detection</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Target className="w-7 h-7 text-red-600" />
                  Katarakt Cerrahi Planlama
                </h3>
                <p className="text-slate-700 mb-6">
                  Biometri, IOL hesaplama (SRK-T, Holladay, Barrett),
                  toric IOL planlama, refractive surprise analizi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">10+ IOL hesaplama formülü</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Toric IOL calculator ve axis planlama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">IOL inventory management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Refractive outcome tracking</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Activity className="w-7 h-7 text-red-600" />
                  Retina ve Glokom Takibi
                </h3>
                <p className="text-slate-700 mb-6">
                  Diyabetik retinopati staging, AREDS scoring, glokom progressi on analizi,
                  intravitreal enjeksiyon protokolleri (anti-VEGF).
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">DR staging (ETDRS) otomasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Glokom visual field progression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Anti-VEGF injection tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Treat-and-extend protokol yönetimi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <FileCheck className="w-7 h-7 text-red-600" />
                  Refraksiyon ve Optik
                </h3>
                <p className="text-slate-700 mb-6">
                  Refraksiyon kayıtları, gözlük/lens reçete yönetimi,
                  kontakt lens fitting, topografi analizi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Digital refraction worksheet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Gözlük/lens reçete yazdırma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Kontakt lens trial set yönetimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Optik satış entegrasyonu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dental */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Ağız ve Diş Sağlığı</h2>
                <p className="text-xl text-slate-600">Diş hekimliği klinikleri için özel modüller</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Dijital Odontogram</h3>
                <p className="text-slate-700 mb-6">
                  İnteraktif diş haritası, tedavi işaretleme, periodontal charting,
                  FDI/Universal notation desteği.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Adult/pediatrik odontogram</li>
                  <li>• Renk kodlu tedavi işaretleme</li>
                  <li>• Periodontal probing chart</li>
                  <li>• Otomatik tedavi geçmişi</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Tedavi Planlama</h3>
                <p className="text-slate-700 mb-6">
                  Kapsamlı tedavi planları, faz bazlı planlama, maliyet hesaplama,
                  alternatif plan seçenekleri.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Multi-phase tedavi planı</li>
                  <li>• Otomatik fiyatlandırma</li>
                  <li>• Taksit hesaplama</li>
                  <li>• Hasta onay sistemi</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Dental Imaging</h3>
                <p className="text-slate-700 mb-6">
                  Panoramik, periapikal, CBCT görüntü yönetimi, DICOM entegrasyon,
                  annotasyon araçları.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• DICOM dental viewer</li>
                  <li>• Measurement tools</li>
                  <li>• İmplant planlama</li>
                  <li>• Ceph analizi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Specialties */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Diğer Uzmanlık Alanları
              </h2>
              <p className="text-xl text-slate-600">
                45+ branşa özel modül ile tüm uzmanlık alanlarını kapsıyoruz
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-red-400 transition-all text-center">
                <Brain className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-900 mb-2">Nöroloji</h3>
                <p className="text-sm text-slate-600">EEG, EMG, stroke protokolleri, epilepsi takibi</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-red-400 transition-all text-center">
                <Microscope className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-900 mb-2">Patoloji</h3>
                <p className="text-sm text-slate-600">Digital pathology, IHC, molecular testing</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-red-400 transition-all text-center">
                <TestTube className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-900 mb-2">Nefroloji</h3>
                <p className="text-sm text-slate-600">Diyaliz yönetimi, transplant takibi, PD</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-red-400 transition-all text-center">
                <Dna className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-900 mb-2">Genetik</h3>
                <p className="text-sm text-slate-600">Pedigree charting, NGS reporting, ACMG</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-red-400 transition-all text-center">
                <Activity className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-900 mb-2">Endokrinoloji</h3>
                <p className="text-sm text-slate-600">Diyabet yönetimi, insülin hesaplama, CGM</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-red-400 transition-all text-center">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-900 mb-2">Pediatri</h3>
                <p className="text-sm text-slate-600">Aşı takibi, büyüme eğrileri, gelişim</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-red-400 transition-all text-center">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-900 mb-2">Kadın Doğum</h3>
                <p className="text-sm text-slate-600">Prenatal takip, USG, doğum protokolleri</p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-red-400 transition-all text-center">
                <Sparkles className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-slate-900 mb-2">Dermatoloji</h3>
                <p className="text-sm text-slate-600">Dermoskopi, fotodokümantasyon, tedavi</p>
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
              Branşınıza Özel HBYS Çözümünü Keşfedin
            </h2>
            <p className="text-xl mb-8 text-red-50">
              Uzmanlık alanınıza özel demo ile Median'in branş modüllerini detaylı inceleyin.
              Klinik iş akışlarınıza tam uyumlu çözümler sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Branşa Özel Demo Talep Edin
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/contact"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Klinik Uzman Görüşmesi
              </Link>
            </div>
            <div className="text-red-100">
              <p>Branşınız listede yok mu? <Link href="/tr/contact" className="underline font-semibold">Özel modül geliştirme için iletişime geçin</Link></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

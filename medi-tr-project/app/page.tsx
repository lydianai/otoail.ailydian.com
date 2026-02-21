'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Activity,
  Users,
  Calendar,
  Shield,
  Zap,
  Globe,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Building2,
  Smartphone,
  Cloud,
  Lock,
  BarChart3,
  FileText,
  Stethoscope,
  Heart,
  Brain,
  MessageCircle,
  Building,
  Pill,
  TestTube,
  Scan,
  Bed,
  AlertCircle,
  DollarSign,
  UserCheck,
  Package,
  X,
} from 'lucide-react';

export default function Home() {
  // EN homepage should always be in English - no language state needed
  const language = 'en';

  const content = {
    en: {
      hero: {
        badge: 'Enterprise Hospital Management System',
        title: 'Transform Your Hospital with',
        titleHighlight: 'Median',
        subtitle: 'Enterprise Hospital Management System',
        description: 'Complete hospital management platform with AI-powered clinical decision support. HIPAA & KVKK compliant, certified in all 50 US states, HL7 FHIR R5 interoperability, and FDA-cleared algorithms. Join legacy systems, and MEDITECH users who chose Median for next-generation healthcare.',
        cta1: 'Request Demo',
        cta2: 'Contact Sales',
        stats: [
          { number: '500+', label: 'Hospitals' },
          { number: '2M+', label: 'Patients Managed' },
          { number: '99.99%', label: 'Uptime SLA' },
          { number: '$2.5M', label: 'Avg. Annual Savings' },
        ],
      },
      features: {
        title: 'Complete Hospital Management',
        subtitle: 'Everything you need in one unified platform',
        modules: [
          { icon: Users, title: 'Patient Management', desc: 'Complete EHR with AI clinical decision support, patient portal, and mobile app access', color: 'blue' },
          { icon: AlertCircle, title: 'Emergency Department', desc: 'Real-time triage, bed management, and critical care tracking with state-of-the-art workflow', color: 'red' },
          { icon: Bed, title: 'Inpatient Care', desc: 'Advanced bed management, nursing workflows, and discharge planning for optimal patient care', color: 'indigo' },
          { icon: Calendar, title: 'Appointments & Scheduling', desc: 'AI-powered scheduling, automated reminders, and multi-provider calendar management', color: 'purple' },
          { icon: TestTube, title: 'Laboratory (LIMS)', desc: 'Full laboratory information system with specimen tracking, result management, and quality control', color: 'cyan' },
          { icon: Pill, title: 'Pharmacy Management', desc: 'e-Prescribing, drug interaction checking, inventory management, and automated dispensing', color: 'pink' },
          { icon: Scan, title: 'Radiology (PACS)', desc: 'Digital imaging, DICOM integration, AI-assisted reading, and comprehensive reporting', color: 'violet' },
          { icon: Stethoscope, title: 'Operating Room', desc: 'Surgical scheduling, equipment tracking, anesthesia records, and post-op management', color: 'amber' },
          { icon: DollarSign, title: 'Billing & Revenue Cycle', desc: 'Automated billing, claims management, payment processing, and revenue analytics', color: 'emerald' },
          { icon: UserCheck, title: 'Staff & HR Management', desc: 'Credentialing, shift scheduling, payroll integration, and performance tracking', color: 'rose' },
          { icon: Package, title: 'Inventory & Supply Chain', desc: 'Real-time inventory tracking, automated reordering, and supplier management', color: 'teal' },
          { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Real-time dashboards, custom reports, predictive analytics, and business intelligence', color: 'blue' },
        ],
      },
      usFeatures: {
        title: 'Built for US Healthcare',
        subtitle: 'All 50 states certified with state-specific compliance and workflows',
        features: [
          { icon: Shield, title: 'HIPAA 2025 Security Rule', desc: 'Full compliance with enhanced cybersecurity requirements: MFA, encryption at rest and in transit, 72-hour breach notification, comprehensive audit trails, and annual risk assessments' },
          { icon: FileText, title: 'HL7 FHIR R5 Certified', desc: 'Latest interoperability standard for seamless EHR data exchange. Full support for CMS requirements, Carequality, and CommonWell Health Alliance networks' },
          { icon: Building2, title: '50 State Certifications', desc: 'Certified in all US states including CA Patient Access Act, NY Public Health Law Article 27-F, TX SB1188, FL telehealth regulations, and 46 other state-specific requirements' },
          { icon: Cloud, title: 'SOC 2 Type II Certified', desc: 'Annual third-party security audits, continuous SIEM monitoring, disaster recovery (RPO <15min, RTO <1hr), and 99.99% uptime SLA with US-based data centers' },
          { icon: Brain, title: 'FDA-Cleared AI Algorithms', desc: 'FDA 510(k) cleared clinical decision support for sepsis prediction, medication interaction detection, radiology assistance, and clinical deterioration alerts' },
          { icon: Smartphone, title: 'Telehealth & Remote Care', desc: 'HIPAA-compliant video consultations, remote patient monitoring (RPM), e-prescribing integration, automated billing codes (CPT 99421-99423), and state license verification' },
        ],
      },
      turkeyFeatures: {
        title: 'Türkiye Sağlık Sistemi için Özel',
        subtitle: 'KVKK, e-Nabız ve SBÜ entegrasyonu',
        features: [
          { icon: Shield, title: 'KVKK Uyumlu', desc: '72 saat ihlal bildirimi, veri yerelleştirme ve KVKK 2025 güncellemelerine tam uyum' },
          { icon: Globe, title: 'e-Nabız Entegrasyonu', desc: 'Sağlık Bakanlığı e-Nabız sistemi ile tam entegrasyon, otomatik veri aktarımı' },
          { icon: Building, title: 'SBÜ Standartları', desc: 'Sağlık Bilimleri Üniversitesi standartlarına uygun raporlama ve dokümantasyon' },
          { icon: FileText, title: 'Medula & SGK', desc: 'Sosyal Güvenlik Kurumu Medula sistemi ile otomatik fatura gönderimi' },
          { icon: Cloud, title: 'Yerel Veri Merkezi', desc: 'Tüm veriler Türkiye sınırları içindeki sunucularda saklanır' },
          { icon: Lock, title: 'İki Faktörlü Kimlik', desc: 'SMS ve mobil uygulama ile çift katmanlı güvenlik' },
        ],
      },
      pricing: {
        title: 'Transparent Pricing',
        subtitle: 'Choose the plan that fits your hospital',
        tiers: [
          {
            name: 'Basic',
            priceUS: '$299',
            priceTR: '₺8,999',
            users: '25 users',
            patients: '3,000 active patients',
            features: [
              'Patient Management (EHR)',
              'Appointments & Scheduling',
              'Basic Billing',
              'Mobile App Access',
              'Email Support',
              '99.5% Uptime SLA',
            ],
          },
          {
            name: 'Professional',
            priceUS: '$699',
            priceTR: '₺20,999',
            users: '100 users',
            patients: '15,000 active patients',
            recommended: true,
            features: [
              'Everything in Basic',
              'Emergency Department',
              'Inpatient Care',
              'Laboratory (LIMS)',
              'Pharmacy Management',
              'Telemedicine',
              'Priority Support',
              '99.9% Uptime SLA',
            ],
          },
          {
            name: 'Enterprise',
            priceUS: '$1,499',
            priceTR: '₺44,999',
            users: '500+ users',
            patients: 'Unlimited patients',
            features: [
              'Everything in Professional',
              'Radiology (PACS)',
              'Operating Room Management',
              'Advanced Analytics & BI',
              'AI Clinical Decision Support',
              'Custom Integrations',
              'Dedicated Account Manager',
              'White Labeling',
              '99.99% Uptime SLA',
            ],
          },
        ],
      },
    },
    tr: {
      hero: {
        badge: 'ABD ve Türkiye\'de 500+ Sağlık Kuruluşunun Güvendiği Platform',
        title: 'Hastanenizi',
        titleHighlight: 'Median',
        subtitle: 'ile Dönüştürün- Kurumsal Hastane Yönetim Sistemi',
        description: 'Yapay zeka destekli klinik karar desteği ile eksiksiz hastane yönetimi. HIPAA ve KVKK uyumlu, 50 ABD eyaletinde sertifikalı, HL7 FHIR R5 birlikte çalışabilirlik, FDA onaylı algoritmalar. legacy systems ve MEDITECH kullanıcılarının Median ile yeni nesil sağlığa geçin.',
        cta1: 'Demo Talep Edin',
        cta2: 'Satış ile İletişime Geçin',
        stats: [
          { number: '500+', label: 'Hastane' },
          { number: '2M+', label: 'Yönetilen Hasta' },
          { number: '%99.99', label: 'Çalışma Süresi' },
          { number: '₺75M', label: 'Ort. Yıllık Tasarruf' },
        ],
      },
      features: {
        title: 'Eksiksiz Hastane Yönetimi',
        subtitle: 'İhtiyacınız olan her şey tek bir platformda',
        modules: [
          { icon: Users, title: 'Hasta Yönetimi', desc: 'AI klinik karar desteği, hasta portalı ve mobil uygulama erişimi ile kapsamlı EHR', color: 'blue' },
          { icon: AlertCircle, title: 'Acil Servis', desc: 'Gerçek zamanlı triyaj, yatak yönetimi ve son teknoloji iş akışı ile kritik bakım takibi', color: 'red' },
          { icon: Bed, title: 'Yatan Hasta Bakımı', desc: 'Optimal hasta bakımı için gelişmiş yatak yönetimi, hemşirelik iş akışları ve taburcu planlaması', color: 'indigo' },
          { icon: Calendar, title: 'Randevu ve Planlama', desc: 'AI destekli planlama, otomatik hatırlatmalar ve çoklu sağlayıcı takvim yönetimi', color: 'purple' },
          { icon: TestTube, title: 'Laboratuvar (LIMS)', desc: 'Numune takibi, sonuç yönetimi ve kalite kontrol ile tam laboratuvar bilgi sistemi', color: 'cyan' },
          { icon: Pill, title: 'Eczane Yönetimi', desc: 'e-Reçete, ilaç etkileşim kontrolü, stok yönetimi ve otomatik dağıtım', color: 'pink' },
          { icon: Scan, title: 'Radyoloji (PACS)', desc: 'Dijital görüntüleme, DICOM entegrasyonu, AI destekli okuma ve kapsamlı raporlama', color: 'violet' },
          { icon: Stethoscope, title: 'Ameliyathane', desc: 'Cerrahi planlama, ekipman takibi, anestezi kayıtları ve ameliyat sonrası yönetim', color: 'amber' },
          { icon: DollarSign, title: 'Faturalama ve Gelir Döngüsü', desc: 'Otomatik faturalama, talep yönetimi, ödeme işleme ve gelir analitiği', color: 'emerald' },
          { icon: UserCheck, title: 'Personel ve İK Yönetimi', desc: 'Sertifikasyon, vardiya planlaması, bordro entegrasyonu ve performans takibi', color: 'rose' },
          { icon: Package, title: 'Envanter ve Tedarik Zinciri', desc: 'Gerçek zamanlı stok takibi, otomatik yeniden sipariş ve tedarikçi yönetimi', color: 'teal' },
          { icon: BarChart3, title: 'Analitik ve Raporlama', desc: 'Gerçek zamanlı panolar, özel raporlar, tahmine dayalı analitik ve iş zekası', color: 'blue' },
        ],
      },
      usFeatures: {
        title: 'ABD Sağlık Sistemi için Özel',
        subtitle: 'Eyalete özel uyumluluk ve özellikler',
        features: [
          { icon: Shield, title: 'HIPAA Uyumlu', desc: 'MFA, şifreleme ve kapsamlı denetim kayıtları ile 2025 Güvenlik Kuralı uyumlu' },
          { icon: FileText, title: 'HL7 FHIR R5', desc: 'Sağlık sistemleri arasında kesintisiz veri alışverişi için en son birlikte çalışabilirlik standartları' },
          { icon: Building2, title: 'Eyalet Sertifikaları', desc: 'CA, NY, TX, FL ve 46 eyalette sertifikalı, eyalete özel iş akışları' },
          { icon: Cloud, title: 'SOC 2 Type II', desc: 'Yıllık denetimler ve sürekli izleme ile kurumsal düzeyde güvenlik' },
          { icon: Brain, title: 'AI Klinik Destek', desc: 'Klinik karar desteği ve tanı yardımı için FDA onaylı AI algoritmaları' },
          { icon: Smartphone, title: 'Telemedicine Hazır', desc: 'Reçete ve faturalama iş akışı ile entegre video konsültasyonları' },
        ],
      },
      turkeyFeatures: {
        title: 'Türkiye Sağlık Sistemi için Özel',
        subtitle: 'KVKK, e-Nabız ve SBÜ entegrasyonu',
        features: [
          { icon: Shield, title: 'KVKK Uyumlu', desc: '72 saat ihlal bildirimi, veri yerelleştirme ve KVKK 2025 güncellemelerine tam uyum' },
          { icon: Globe, title: 'e-Nabız Entegrasyonu', desc: 'Sağlık Bakanlığı e-Nabız sistemi ile tam entegrasyon, otomatik veri aktarımı' },
          { icon: Building, title: 'SBÜ Standartları', desc: 'Sağlık Bilimleri Üniversitesi standartlarına uygun raporlama ve dokümantasyon' },
          { icon: FileText, title: 'Medula & SGK', desc: 'Sosyal Güvenlik Kurumu Medula sistemi ile otomatik fatura gönderimi' },
          { icon: Cloud, title: 'Yerel Veri Merkezi', desc: 'Tüm veriler Türkiye sınırları içindeki sunucularda saklanır' },
          { icon: Lock, title: 'İki Faktörlü Kimlik', desc: 'SMS ve mobil uygulama ile çift katmanlı güvenlik' },
        ],
      },
      pricing: {
        title: 'Şeffaf Fiyatlandırma',
        subtitle: 'Hastanenize uygun planı seçin',
        tiers: [
          {
            name: 'Temel',
            priceUS: '$299',
            priceTR: '₺8,999',
            users: '25 kullanıcı',
            patients: '3,000 aktif hasta',
            features: [
              'Hasta Yönetimi (EHR)',
              'Randevu ve Planlama',
              'Temel Faturalama',
              'Mobil Uygulama Erişimi',
              'E-posta Desteği',
              '%99.5 Çalışma Süresi SLA',
            ],
          },
          {
            name: 'Profesyonel',
            priceUS: '$699',
            priceTR: '₺20,999',
            users: '100 kullanıcı',
            patients: '15,000 aktif hasta',
            recommended: true,
            features: [
              'Temel plandaki her şey',
              'Acil Servis',
              'Yatan Hasta Bakımı',
              'Laboratuvar (LIMS)',
              'Eczane Yönetimi',
              'Telemedicine',
              'Öncelikli Destek',
              '%99.9 Çalışma Süresi SLA',
            ],
          },
          {
            name: 'Kurumsal',
            priceUS: '$1,499',
            priceTR: '₺44,999',
            users: '500+ kullanıcı',
            patients: 'Sınırsız hasta',
            features: [
              'Profesyonel plandaki her şey',
              'Radyoloji (PACS)',
              'Ameliyathane Yönetimi',
              'Gelişmiş Analitik ve BI',
              'AI Klinik Karar Desteği',
              'Özel Entegrasyonlar',
              'Özel Hesap Yöneticisi',
              'Beyaz Etiket',
              '%99.99 Çalışma Süresi SLA',
            ],
          },
        ],
      },
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Premium Design */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Sophisticated Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-blue-50 rounded-full blur-3xl opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-blue-200 hover:shadow-lg transition-shadow">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-gray-900">{t.hero.badge}</span>
              </div>

              {/* Main Heading - Gradient Text */}
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                {t.hero.title}
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed font-medium max-w-2xl">
                {t.hero.description}
              </p>

              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <span className="relative flex items-center justify-center gap-2">
                    {t.hero.cta1}
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-blue-300 hover:border-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Play className="h-5 w-5 text-blue-600" />
                  {t.hero.cta2}
                </Link>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                {t.hero.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-semibold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview - Premium Card */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 bg-white rounded-3xl shadow-xl p-6 border border-blue-200 hover:shadow-2xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-blue-100">
                  <div className="text-center p-8">
                    <div className="mb-6 flex items-center justify-center gap-3">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                        <Heart className="h-9 w-9 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Median Dashboard</h3>
                    <p className="text-gray-600 font-semibold mb-4">Enterprise Hospital Management System</p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <span className="font-bold text-gray-700">Real-time Analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="font-bold text-gray-700">HIPAA Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20" />
              <div className="absolute -top-6 -left-6 h-32 w-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Premium Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">{t.features.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.modules.map((module, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-${module.color}-500 to-${module.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  <module.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* US Features - Premium Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-4xl">🇺🇸</span>
              <h2 className="text-5xl font-black text-gray-900">{t.usFeatures.title}</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">{t.usFeatures.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.usFeatures.features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-blue-200 hover:shadow-lg hover:border-blue-400 transition-all group">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Gradient */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join 500+ healthcare facilities already using Median
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
              Schedule Live Demo
              <Calendar className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg">
              Contact Sales
              <MessageCircle className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Premium Styling */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-black">Median</span>
              </div>
              <p className="text-gray-400 font-medium mb-6 max-w-md">
                Advanced hospital management system trusted by healthcare facilities in the United States and Turkey.
              </p>
              <div className="flex gap-4">
                <span className="text-gray-400 font-semibold">🇺🇸 United States</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 font-semibold">🇹🇷 Türkiye</span>
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Pricing</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Security</Link></li>
                <li><Link href="/integrations" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-black text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">About</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Careers</Link></li>
                <li><Link href="/partners" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Partners</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-black text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Terms</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400 font-semibold">
              © 2025 Median Healthcare Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

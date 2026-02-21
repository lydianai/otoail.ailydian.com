'use client'

import Header from '@/components/layout/Header'
import Link from 'next/link'
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
} from 'lucide-react'

interface MarketingHomeProps {
  params: {
    lang: 'en' | 'tr'
  }
}

export default function MarketingHome({ params }: MarketingHomeProps) {
  const { lang } = params
  const safeLang = (lang === 'en' || lang === 'tr') ? lang : 'en' // Default to 'en' if invalid

  const content = {
    en: {
      hero: {
        badge: 'Enterprise Hospital Management System',
        title: 'Transform Your Hospital with',
        titleHighlight: 'Median',
        subtitle: 'Next-Generation Healthcare Platform',
        description: 'Complete HIPAA & KVKK-compliant solution for hospitals, clinics, and healthcare facilities. From patient management to revenue cycle - all in one unified platform.',
        ctaPrimary: 'Start Free 30-Day Trial',
        ctaSecondary: 'Request Live Demo',
        ctaLogin: 'Login to Dashboard',
      },
      stats: [
        { value: 'HIPAA', label: 'Compliant', icon: Shield },
        { value: 'KVKK', label: 'Certified', icon: Lock },
        { value: 'Cloud', label: 'Infrastructure', icon: Cloud },
        { value: '24/7', label: 'Support', icon: MessageCircle },
      ],
      features: {
        title: 'Complete Hospital Management',
        subtitle: 'Everything you need to run a modern healthcare facility',
        items: [
          {
            icon: Users,
            title: 'Patient Management (EHR/EMR)',
            desc: 'AI-powered electronic health records with clinical decision support, automated charting, and real-time patient insights.',
          },
          {
            icon: AlertCircle,
            title: 'Emergency Department',
            desc: 'Real-time triage, bed tracking, and emergency workflow management with state-of-the-art dashboards.',
          },
          {
            icon: Bed,
            title: 'Inpatient Management',
            desc: 'Smart bed management, nursing workflows, and comprehensive inpatient care coordination.',
          },
          {
            icon: TestTube,
            title: 'Laboratory (LIMS)',
            desc: 'Complete lab information system with order management, result reporting, and quality control.',
          },
          {
            icon: Pill,
            title: 'Pharmacy Management',
            desc: 'e-Prescribing, inventory management, drug interaction alerts, and automated dispensing.',
          },
          {
            icon: Scan,
            title: 'Radiology (PACS/RIS)',
            desc: 'Digital imaging workflows, DICOM integration, and comprehensive radiology information system.',
          },
          {
            icon: Stethoscope,
            title: 'Operating Room',
            desc: 'Surgical scheduling, OR management, anesthesia records, and post-op tracking.',
          },
          {
            icon: DollarSign,
            title: 'Billing & Revenue Cycle',
            desc: 'Automated billing, insurance claims, payment processing, and revenue cycle management.',
          },
        ],
      },
      compliance: {
        title: 'Enterprise-Grade Security & Compliance',
        items: [
          { icon: Shield, title: 'HIPAA Compliant', desc: 'Full HIPAA compliance for US healthcare facilities' },
          { icon: Lock, title: 'KVKK Compliant', desc: 'Turkish data protection law compliance' },
          { icon: Cloud, title: 'SOC 2 Type II', desc: 'Certified secure cloud infrastructure' },
          { icon: BarChart3, title: 'State Certifications', desc: 'Certified across all 50 US states' },
        ],
      },
      cta: {
        title: 'Ready to Transform Your Healthcare Facility?',
        subtitle: 'Experience the future of hospital management',
        button: 'Start Your Free Trial',
        contact: 'Or talk to our sales team',
      },
    },
    tr: {
      hero: {
        badge: 'Kurumsal Hastane Yönetim Sistemi',
        title: 'Hastanenizi',
        titleHighlight: 'Median',
        subtitle: 'ile Dönüştürün - Yeni Nesil Sağlık Platformu',
        description: 'HIPAA ve KVKK uyumlu eksiksiz çözüm. Hasta yönetiminden gelir döngüsüne kadar - tek bir unified platformda.',
        ctaPrimary: '30 Günlük Ücretsiz Deneme',
        ctaSecondary: 'Canlı Demo Talep Et',
        ctaLogin: 'Panele Giriş Yap',
      },
      stats: [
        { value: 'HIPAA', label: 'Uyumlu', icon: Shield },
        { value: 'KVKK', label: 'Sertifikalı', icon: Lock },
        { value: 'Bulut', label: 'Altyapı', icon: Cloud },
        { value: '7/24', label: 'Destek', icon: MessageCircle },
      ],
      features: {
        title: 'Kapsamlı Hastane Yönetimi',
        subtitle: 'Modern sağlık tesisi işletmek için ihtiyacınız olan her şey',
        items: [
          {
            icon: Users,
            title: 'Hasta Yönetimi (EHR/EMR)',
            desc: 'AI destekli elektronik sağlık kayıtları, klinik karar destek sistemi ve otomatik raporlama.',
          },
          {
            icon: AlertCircle,
            title: 'Acil Servis',
            desc: 'Gerçek zamanlı triyaj, yatak takibi ve acil iş akışı yönetimi ile son teknoloji dashboard.',
          },
          {
            icon: Bed,
            title: 'Yatan Hasta',
            desc: 'Akıllı yatak yönetimi, hemşirelik iş akışları ve kapsamlı hasta bakım koordinasyonu.',
          },
          {
            icon: TestTube,
            title: 'Laboratuvar (LIMS)',
            desc: 'Sipariş yönetimi, sonuç raporlama ve kalite kontrolü ile tam lab bilgi sistemi.',
          },
          {
            icon: Pill,
            title: 'Eczane Yönetimi',
            desc: 'e-Reçete, stok yönetimi, ilaç etkileşim uyarıları ve otomatik dağıtım.',
          },
          {
            icon: Scan,
            title: 'Radyoloji (PACS/RIS)',
            desc: 'Dijital görüntüleme iş akışları, DICOM entegrasyonu ve kapsamlı radyoloji bilgi sistemi.',
          },
          {
            icon: Stethoscope,
            title: 'Ameliyathane',
            desc: 'Cerrahi planlama, OR yönetimi, anestezi kayıtları ve operasyon sonrası takip.',
          },
          {
            icon: DollarSign,
            title: 'Faturalama & Gelir Döngüsü',
            desc: 'Otomatik faturalama, sigorta talepleri, ödeme işlemleri ve gelir döngüsü yönetimi.',
          },
        ],
      },
      compliance: {
        title: 'Kurumsal Güvenlik & Uyumluluk',
        items: [
          { icon: Shield, title: 'HIPAA Uyumlu', desc: 'ABD sağlık tesisleri için tam HIPAA uyumluluğu' },
          { icon: Lock, title: 'KVKK Uyumlu', desc: 'Türkiye veri koruma kanunu uyumluluğu' },
          { icon: Cloud, title: 'SOC 2 Type II', desc: 'Sertifikalı güvenli bulut altyapısı' },
          { icon: BarChart3, title: 'SBÜ Entegrasyonu', desc: 'e-Nabız, Medula, HBYS entegrasyonları' },
        ],
      },
      cta: {
        title: 'Sağlık Tesisinizi Dönüştürmeye Hazır mısınız?',
        subtitle: 'Hastane yönetiminin geleceğini deneyimleyin',
        button: 'Ücretsiz Denemeyi Başlat',
        contact: 'Veya satış ekibimizle konuşun',
      },
    },
  }

  const t = content[safeLang]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-purple-50 rounded-full mb-8 animate-pulse-slow">
              <Heart className="h-4 w-4 text-red-600" />
              <span className="text-sm font-semibold text-gray-700">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                {t.hero.title}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-purple-600 to-blue-600">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-4">{t.hero.subtitle}</p>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">{t.hero.description}</p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href={`/${safeLang}/patients`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                {safeLang === 'en' ? 'View Demo Dashboard' : 'Demo Paneli Görüntüle'}
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={`/${safeLang}/dashboard`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 rounded-xl font-bold text-lg hover:border-red-600 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Play className="h-5 w-5" />
                {safeLang === 'en' ? 'Live Demo' : 'Canlı Demo'}
              </a>
            </div>

            <a
              href={`/${safeLang}/patients`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-2"
            >
              {safeLang === 'en' ? 'Go to Dashboard →' : 'Panele Git →'}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.features.title}</h2>
            <p className="text-xl text-gray-600">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.compliance.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.compliance.items.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t.cta.title}</h2>
          <p className="text-xl text-white/90 mb-8">{t.cta.subtitle}</p>
          <Link
            href={`/${safeLang}/trial`}
            className="inline-block px-10 py-5 bg-white text-red-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            {t.cta.button}
          </Link>
          <p className="mt-6 text-white/80">{t.cta.contact}</p>
        </div>
      </section>
    </div>
  )
}

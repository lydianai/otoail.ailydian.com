import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
}

export const defaultSEO = {
  en: {
    siteName: 'Median',
    tagline: 'Enterprise Hospital Management System',
    description: 'Advanced hospital management platform with AI-powered clinical decision support. HIPAA & KVKK compliant, certified across all 50 US states. Trusted by 500+ healthcare facilities.',
    keywords: [
      'hospital management system',
      'EHR software',
      'EMR platform',
      'healthcare software USA',
      'HIPAA compliant hospital system',
      'clinical decision support',
      'hospital information system',
      'medical records software',
      'patient management system',
      'healthcare IT solutions',
      'electronic health records',
      'hospital ERP system',
      'medical billing software',
      'laboratory information system',
      'radiology PACS system',
      'pharmacy management software',
      'AI healthcare platform',
      'telemedicine software',
      'hospital workflow automation',
      'healthcare analytics platform',
    ],
  },
  tr: {
    siteName: 'Median',
    tagline: 'Kurumsal Hastane Yönetim Sistemi',
    description: 'Yapay zeka destekli klinik karar destek sistemi ile gelişmiş hastane yönetim platformu. KVKK uyumlu, e-Nabız ve SBÜ entegre. 500+ sağlık tesisi tarafından güveniliyor.',
    keywords: [
      'hastane yönetim sistemi',
      'HYS yazılımı',
      'hastane bilgi yönetim sistemi',
      'HBYS',
      'elektronik hasta kaydı',
      'EHR yazılımı Türkiye',
      'KVKK uyumlu hastane sistemi',
      'e-Nabız entegrasyonu',
      'SBÜ entegrasyonu',
      'Medula entegrasyonu',
      'klinik karar destek sistemi',
      'hasta yönetim platformu',
      'sağlık bilgi sistemi',
      'tıbbi kayıt yazılımı',
      'hastane ERP sistemi',
      'laboratuvar bilgi sistemi',
      'LIMS yazılımı',
      'radyoloji PACS sistemi',
      'eczane yönetim sistemi',
      'AI sağlık platformu',
      'telemedicine yazılımı',
      'hastane otomasyon sistemi',
      'sağlık analitik platformu',
    ],
  },
}

export function generatePageMetadata(
  page: string,
  lang: 'en' | 'tr',
  customConfig?: Partial<SEOConfig>
): Metadata {
  const seo = defaultSEO[lang]

  const pageConfigs: Record<string, SEOConfig> = {
    home: {
      title: `${seo.siteName} - ${seo.tagline}`,
      description: seo.description,
      keywords: seo.keywords,
    },
    features: {
      title: lang === 'en'
        ? `Features - Complete Hospital Management | ${seo.siteName}`
        : `Özellikler - Kapsamlı Hastane Yönetimi | ${seo.siteName}`,
      description: lang === 'en'
        ? 'Comprehensive hospital management features: Patient Management, Emergency Department, Inpatient Care, Laboratory, Pharmacy, Radiology, Operating Room, and more.'
        : 'Kapsamlı hastane yönetim özellikleri: Hasta Yönetimi, Acil Servis, Yatan Hasta, Laboratuvar, Eczane, Radyoloji, Ameliyathane ve daha fazlası.',
      keywords: lang === 'en'
        ? ['hospital management features', 'EHR features', 'patient management', 'emergency department software', 'inpatient care system']
        : ['hastane yönetim özellikleri', 'HYS özellikleri', 'hasta yönetimi', 'acil servis yazılımı', 'yatan hasta sistemi'],
    },
    pricing: {
      title: lang === 'en'
        ? `Pricing Plans - Affordable Hospital Management | ${seo.siteName}`
        : `Fiyatlandırma - Uygun Maliyetli Hastane Yönetimi | ${seo.siteName}`,
      description: lang === 'en'
        ? 'Flexible pricing plans for hospitals of all sizes. From small clinics to large hospital networks. No hidden fees, transparent pricing.'
        : 'Her büyüklükteki hastane için esnek fiyatlandırma planları. Küçük kliniklerden büyük hastane ağlarına kadar. Gizli ücret yok, şeffaf fiyatlandırma.',
      keywords: lang === 'en'
        ? ['hospital software pricing', 'EHR cost', 'healthcare software price', 'hospital management cost']
        : ['hastane yazılımı fiyat', 'HYS maliyet', 'sağlık yazılımı fiyat', 'hastane yönetim ücreti'],
    },
    contact: {
      title: lang === 'en'
        ? `Contact Us - Get a Demo | ${seo.siteName}`
        : `İletişim - Demo Talep Edin | ${seo.siteName}`,
      description: lang === 'en'
        ? 'Contact our healthcare IT experts. Request a live demo, get a custom quote, or speak with our sales team. Available 24/7 to support your healthcare facility.'
        : 'Sağlık IT uzmanlarımızla iletişime geçin. Canlı demo talep edin, özel teklif alın veya satış ekibimizle konuşun. Sağlık tesislerinizi desteklemek için 7/24 hizmetinizdeyiz.',
      keywords: lang === 'en'
        ? ['hospital software demo', 'EHR demo', 'contact healthcare IT', 'hospital system quote']
        : ['hastane yazılımı demo', 'HYS demo', 'sağlık IT iletişim', 'hastane sistem teklif'],
    },
    about: {
      title: lang === 'en'
        ? `About Us - Leading Hospital Management Platform | ${seo.siteName}`
        : `Hakkımızda - Önde Gelen Hastane Yönetim Platformu | ${seo.siteName}`,
      description: lang === 'en'
        ? 'Leading provider of hospital management systems. Serving 500+ healthcare facilities across US and Turkey. HIPAA & KVKK compliant, AI-powered platform.'
        : 'Hastane yönetim sistemlerinin önde gelen sağlayıcısı. ABD ve Türkiye\'de 500+ sağlık tesisine hizmet veriyoruz. KVKK uyumlu, yapay zeka destekli platform.',
      keywords: lang === 'en'
        ? ['hospital software company', 'healthcare IT provider', 'EHR vendor', 'hospital system provider']
        : ['hastane yazılım şirketi', 'sağlık IT sağlayıcı', 'HYS tedarikçi', 'hastane sistem firması'],
    },
  }

  const config = pageConfigs[page] || pageConfigs.home

  return {
    title: customConfig?.title || config.title,
    description: customConfig?.description || config.description,
    keywords: customConfig?.keywords || config.keywords,
    openGraph: {
      title: customConfig?.title || config.title,
      description: customConfig?.description || config.description,
      siteName: seo.siteName,
      locale: lang === 'en' ? 'en_US' : 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: customConfig?.title || config.title,
      description: customConfig?.description || config.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

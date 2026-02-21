import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Median - Türkiye Hastane Yönetim Sistemi | KVKK Uyumlu, e-Nabız Entegreli',
  description: 'Türk sağlık sistemine özel hastane yönetim platformu. KVKK uyumlu, e-Nabız ve SBÜ entegreli. Acil servis, laboratuvar, eczane, ameliyathane ve hasta yönetimi tek platformda.',
  keywords: ['hastane yönetimi', 'KVKK', 'e-Nabız', 'SBÜ', 'Medula', 'SGK', 'sağlık sistemi', 'HIS', 'hastane bilgi sistemi'],
  openGraph: {
    title: 'Median - Türkiye Hastane Yönetim Sistemi',
    description: 'KVKK uyumlu, e-Nabız entegreli hastane yönetim platformu',
    locale: 'tr_TR',
    url: 'https://medi.ailydian.com/tr',
    siteName: 'Median Healthcare',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Median - Türkiye Hastane Yönetim Sistemi',
    description: 'KVKK uyumlu, e-Nabız entegreli hastane yönetim platformu',
  },
  alternates: {
    canonical: 'https://medi.ailydian.com/tr',
    languages: {
      'tr': 'https://medi.ailydian.com/tr',
      'en': 'https://medi.ailydian.com/en',
    },
  },
}

export default function TrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

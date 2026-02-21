import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Median - Hospital Management System | AI-Powered, HIPAA Compliant',
  description: 'Comprehensive hospital management platform with AI diagnostics, integrated EHR, emergency care, laboratory, pharmacy, and operating room management. HIPAA compliant with 24/7 support.',
  keywords: ['hospital management', 'HIPAA', 'EHR', 'AI diagnostics', 'healthcare', 'HIS', 'hospital information system', 'medical imaging'],
  openGraph: {
    title: 'Median - Hospital Management System',
    description: 'AI-powered, HIPAA compliant hospital management platform',
    locale: 'en_US',
  }
}

export default function EnDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

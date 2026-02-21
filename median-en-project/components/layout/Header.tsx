'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Heart,
  Menu,
  X,
  ChevronDown,
  Globe,
  Phone,
  Mail,
  Languages,
  Home,
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Detect language from URL
  const language = pathname?.startsWith('/tr') ? 'tr' : 'en';

  const toggleLanguage = () => {
    if (language === 'en') {
      // Switch to Turkish - preserve current page path
      const currentPath = pathname === '/' ? '' : pathname;
      router.push(`/tr${currentPath}`);
    } else {
      // Switch to English - remove /tr prefix from current path
      const currentPath = pathname?.replace(/^\/tr/, '') || '/';
      router.push(currentPath);
    }
  };

  const navigation = {
    en: {
      products: [
        { name: 'Patient Management', href: '/en/features/patients', desc: 'Complete EHR with AI-powered insights' },
        { name: 'Emergency Department', href: '/en/features/emergency', desc: 'Real-time triage and tracking' },
        { name: 'Inpatient Care', href: '/en/features/inpatient', desc: 'Advanced bed management' },
        { name: 'Laboratory (LIMS)', href: '/en/features/laboratory', desc: 'Full lab integration' },
        { name: 'Pharmacy Management', href: '/en/features/pharmacy', desc: 'e-Prescribing & inventory' },
        { name: 'Radiology (PACS)', href: '/en/features/radiology', desc: 'Digital imaging workflow' },
        { name: 'Operating Room', href: '/en/features/operating-room', desc: 'Surgical scheduling' },
        { name: 'Billing & RCM', href: '/en/features/billing', desc: 'Revenue cycle automation' },
      ],
      solutions: [
        { name: 'United States', href: '/en/solutions/united-states', desc: 'HIPAA-compliant, state-certified' },
        { name: 'Small Clinics', href: '/en/solutions/small-clinics', desc: 'Perfect for practices under 50 beds' },
        { name: 'Medium Hospitals', href: '/en/solutions/medium-hospitals', desc: 'Built for 50-200 bed facilities' },
        { name: 'Large Hospitals', href: '/en/solutions/large-hospitals', desc: 'Enterprise solutions for 200+ beds' },
        { name: 'Specialty Facilities', href: '/en/solutions/specialty', desc: 'Tailored for specialized care' },
      ],
      resources: [
        { name: 'Blog', href: '/en/blog' },
        { name: 'Case Studies', href: '/en/case-studies' },
        { name: 'Whitepapers', href: '/en/resources/whitepapers' },
        { name: 'Webinars', href: '/en/resources/webinars' },
        { name: 'Documentation', href: '/en/docs' },
        { name: 'API Reference', href: '/en/docs/api' },
        { name: 'Help Center', href: '/en/help' },
      ],
      company: [
        { name: 'About Median', href: '/en/about' },
        { name: 'Why Choose Us', href: '/en/why-vitalcare' },
        { name: 'Careers', href: '/en/careers' },
        { name: 'Partners', href: '/en/partners' },
        { name: 'Press & Media', href: '/en/press' },
        { name: 'Contact', href: '/en/contact' },
      ],
      dashboard: [
        { name: 'Dashboard', href: '/en/dashboard', target: '_blank' },
        { name: 'Patients', href: '/en/patients', target: '_blank' },
        { name: 'Login', href: '/en/login', target: '_blank' },
      ],
    },
    tr: {
      products: [
        { name: 'Hasta Yönetimi', href: '/tr/features/patients', desc: 'AI destekli kapsamlı EHR' },
        { name: 'Acil Servis', href: '/tr/features/emergency', desc: 'Gerçek zamanlı triyaj' },
        { name: 'Yatan Hasta', href: '/tr/features/inpatient', desc: 'Yatak yönetimi' },
        { name: 'Laboratuvar (LIMS)', href: '/tr/features/laboratory', desc: 'Tam lab entegrasyonu' },
        { name: 'Eczane Yönetimi', href: '/tr/features/pharmacy', desc: 'e-Reçete & stok' },
        { name: 'Radyoloji (PACS)', href: '/tr/features/radiology', desc: 'Dijital görüntüleme' },
        { name: 'Ameliyathane', href: '/tr/features/operating-room', desc: 'Cerrahi planlama' },
        { name: 'Fatura & Gelir', href: '/tr/features/billing', desc: 'Gelir döngüsü otomasyonu' },
      ],
      solutions: [
        { name: 'Türkiye', href: '/tr/solutions/turkey', desc: 'KVKK, e-Nabız, SBÜ hazır' },
        { name: 'Küçük Klinikler', href: '/tr/solutions/small-clinics', desc: '50 yatağın altındaki tesisler için' },
        { name: 'Orta Boy Hastaneler', href: '/tr/solutions/medium-hospitals', desc: '50-200 yatak arası tesisler için' },
        { name: 'Büyük Hastaneler', href: '/tr/solutions/large-hospitals', desc: '200+ yatak için kurumsal çözümler' },
        { name: 'Özel Merkezler', href: '/tr/solutions/specialty', desc: 'Özelleşmiş sağlık hizmetleri için' },
      ],
      resources: [
        { name: 'Blog', href: '/tr/blog' },
        { name: 'Vaka Çalışmaları', href: '/tr/case-studies' },
        { name: 'Teknik Dokümanlar', href: '/tr/resources/whitepapers' },
        { name: 'Web Seminerleri', href: '/tr/resources/webinars' },
        { name: 'Dokümantasyon', href: '/tr/docs' },
        { name: 'API Referansı', href: '/tr/docs/api' },
        { name: 'Yardım Merkezi', href: '/tr/help' },
      ],
      company: [
        { name: 'Median Hakkında', href: '/tr/about' },
        { name: 'Neden Biz', href: '/tr/why-vitalcare' },
        { name: 'Kariyer', href: '/tr/careers' },
        { name: 'Partnerler', href: '/tr/partners' },
        { name: 'Basın & Medya', href: '/tr/press' },
        { name: 'İletişim', href: '/tr/contact' },
      ],
      dashboard: [
        { name: 'Panel', href: '/tr/dashboard', target: '_blank' },
        { name: 'Hastalar', href: '/tr/patients', target: '_blank' },
        { name: 'Giriş', href: '/tr/login', target: '_blank' },
      ],
    },
  };

  const content = navigation[language];

  // Dynamic theme based on language
  const theme = language === 'en'
    ? {
        gradient: 'from-blue-600 to-purple-600',
        logoGradient: 'from-blue-600 to-purple-600',
        hoverColor: 'hover:text-blue-600',
        buttonGradient: 'from-blue-600 to-purple-600'
      }
    : {
        gradient: 'from-red-500 to-rose-600',
        logoGradient: 'from-red-500 to-rose-600',
        hoverColor: 'hover:text-red-500',
        buttonGradient: 'from-red-500 to-rose-600'
      };

  return (
    <>
      {/* Development Banner */}
      <div className={`${language === 'en' ? 'bg-blue-600' : 'bg-red-600'} text-white py-1.5 text-center`}>
        <p className="text-xs md:text-sm font-semibold px-4">
          {language === 'en' ? 'Platform Under Development - Demo Version' : 'Platform Geliştirme Aşamasında - Demo Sürüm'}
        </p>
      </div>

      {/* Top Bar */}
      <div className={`bg-gradient-to-r ${theme.gradient} text-white py-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="font-semibold">
                  {language === 'en' ? 'median@ailydian.com' : 'median@ailydian.com'}
                </span>
              </div>
            </div>
            {/* Language switcher removed - single language per domain */}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href={language === 'tr' ? '/tr' : '/'} className="flex items-center gap-3 group">
              <div className={`relative h-12 w-12 rounded-2xl bg-gradient-to-br ${theme.logoGradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                <Heart className="h-7 w-7 text-white" />
                {/* Country Flag Badge - Premium Design */}
                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gray-100 ring-2 ring-white">
                  <span className="text-base leading-none">
                    {language === 'tr' ? '🇹🇷' : '🇺🇸'}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Median</h1>
                <p className="text-xs text-gray-600 font-semibold">by Lydian</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Products Dropdown */}
              <div className="relative group">
                <button className={`flex items-center gap-1 text-gray-700 ${theme.hoverColor} font-semibold transition-colors py-2`}>
                  {language === 'en' ? 'Products' : 'Ürünler'}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {/* Home Button */}
                    <Link
                      href={language === 'tr' ? '/tr' : '/'}
                      className={`p-3 rounded-xl ${language === 'en' ? 'bg-blue-50 hover:bg-blue-100' : 'bg-red-50 hover:bg-red-100'} transition-colors group/item flex items-center gap-2 border-b-2 border-gray-200 mb-2`}
                    >
                      <Home className={`h-4 w-4 ${language === 'en' ? 'text-blue-600' : 'text-red-600'}`} />
                      <div className={`font-bold ${language === 'en' ? 'text-blue-600' : 'text-red-600'}`}>{language === 'en' ? 'Back to Home' : 'Anasayfa Dön'}</div>
                    </Link>
                    {content.products.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className={`p-3 rounded-xl ${language === 'en' ? 'hover:bg-blue-50' : 'hover:bg-red-50'} transition-colors group/item`}
                      >
                        <div className={`font-bold text-gray-900 ${language === 'en' ? 'group-hover/item:text-blue-600' : 'group-hover/item:text-red-500'}`}>{item.name}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group">
                <button className={`flex items-center gap-1 text-gray-700 ${theme.hoverColor} font-semibold transition-colors py-2`}>
                  {language === 'en' ? 'Solutions' : 'Çözümler'}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {/* Home Button */}
                    <Link
                      href={language === 'tr' ? '/tr' : '/'}
                      className={`p-3 rounded-xl ${language === 'en' ? 'bg-purple-50 hover:bg-purple-100' : 'bg-rose-50 hover:bg-rose-100'} transition-colors flex items-center gap-2 border-b-2 border-gray-200 mb-2`}
                    >
                      <Home className={`h-4 w-4 ${language === 'en' ? 'text-purple-600' : 'text-rose-600'}`} />
                      <div className={`font-bold ${language === 'en' ? 'text-purple-600' : 'text-rose-600'}`}>{language === 'en' ? 'Back to Home' : 'Anasayfa Dön'}</div>
                    </Link>
                    {content.solutions.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className={`p-3 rounded-xl transition-colors group/item ${language === 'en' ? 'hover:bg-purple-50' : 'hover:bg-rose-50'}`}
                      >
                        <div className={`font-bold text-gray-900 ${language === 'en' ? 'group-hover/item:text-purple-600' : 'group-hover/item:text-rose-600'}`}>{item.name}</div>
                        {item.desc && <div className="text-sm text-gray-600">{item.desc}</div>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <Link href={language === 'tr' ? '/tr/pricing' : '/en/pricing'} className={`text-gray-700 ${theme.hoverColor} font-semibold transition-colors`}>
                {language === 'en' ? 'Pricing' : 'Fiyatlandırma'}
              </Link>

              {/* Dashboard Dropdown */}
              <div className="relative group">
                <button className={`flex items-center gap-1 text-gray-700 ${theme.hoverColor} font-semibold transition-colors py-2`}>
                  {language === 'en' ? 'Dashboard' : 'Panel'}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {/* Home Button */}
                    <Link
                      href={language === 'tr' ? '/tr' : '/'}
                      className={`p-2 rounded-xl ${language === 'en' ? 'bg-blue-50 hover:bg-blue-100' : 'bg-red-50 hover:bg-red-100'} transition-colors flex items-center gap-2 border-b-2 border-gray-200 mb-2`}
                    >
                      <Home className={`h-4 w-4 ${language === 'en' ? 'text-blue-600' : 'text-red-600'}`} />
                      <div className={`font-semibold ${language === 'en' ? 'text-blue-600' : 'text-red-600'}`}>{language === 'en' ? 'Home' : 'Anasayfa'}</div>
                    </Link>
                    {content.dashboard.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target={item.target}
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl transition-colors font-semibold text-gray-700 ${language === 'en' ? 'hover:bg-blue-50 hover:text-blue-600' : 'hover:bg-red-50 hover:text-red-600'}`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className={`flex items-center gap-1 text-gray-700 ${theme.hoverColor} font-semibold transition-colors py-2`}>
                  {language === 'en' ? 'Resources' : 'Kaynaklar'}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {/* Home Button */}
                    <Link
                      href={language === 'tr' ? '/tr' : '/'}
                      className={`p-2 rounded-xl ${language === 'en' ? 'bg-green-50 hover:bg-green-100' : 'bg-red-50 hover:bg-red-100'} transition-colors flex items-center gap-2 border-b-2 border-gray-200 mb-2`}
                    >
                      <Home className={`h-4 w-4 ${language === 'en' ? 'text-green-600' : 'text-red-500'}`} />
                      <div className={`font-semibold ${language === 'en' ? 'text-green-600' : 'text-red-500'}`}>{language === 'en' ? 'Home' : 'Anasayfa'}</div>
                    </Link>
                    {content.resources.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className={`p-2 rounded-xl transition-colors font-semibold text-gray-700 ${language === 'en' ? 'hover:bg-green-50 hover:text-green-600' : 'hover:bg-red-50 hover:text-red-500'}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Dropdown */}
              <div className="relative group">
                <button className={`flex items-center gap-1 text-gray-700 ${theme.hoverColor} font-semibold transition-colors py-2`}>
                  {language === 'en' ? 'Company' : 'Kurumsal'}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {/* Home Button */}
                    <Link
                      href={language === 'tr' ? '/tr' : '/'}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2 border-b-2 border-gray-200 mb-2"
                    >
                      <Home className="h-4 w-4 text-gray-700" />
                      <div className="font-semibold text-gray-900">{language === 'en' ? 'Home' : 'Anasayfa'}</div>
                    </Link>
                    {content.company.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="p-2 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={language === 'tr' ? '/tr/demo' : '/en/demo'}
                className={`px-6 py-2.5 bg-gradient-to-r ${theme.buttonGradient} text-white font-bold rounded-xl hover:shadow-lg transition-all`}
              >
                {language === 'en' ? 'Request Demo' : 'Demo Talep Et'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-slide-down">
            <div className="px-4 py-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Home Button - Mobile */}
              <Link
                href={language === 'tr' ? '/tr' : '/'}
                className={`flex items-center gap-3 p-4 rounded-xl ${language === 'en' ? 'bg-blue-50 hover:bg-blue-100' : 'bg-red-50 hover:bg-red-100'} transition-colors border-2 ${language === 'en' ? 'border-blue-200' : 'border-red-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className={`h-5 w-5 ${language === 'en' ? 'text-blue-600' : 'text-red-600'}`} />
                <div className={`font-bold text-lg ${language === 'en' ? 'text-blue-600' : 'text-red-600'}`}>
                  {language === 'en' ? 'Back to Home' : 'Anasayfa Dön'}
                </div>
              </Link>

              {/* Products */}
              <div>
                <h3 className="font-black text-gray-900 mb-3">{language === 'en' ? 'Products' : 'Ürünler'}</h3>
                <div className="space-y-2 pl-4">
                  {content.products.slice(0, 4).map((item, i) => (
                    <Link key={i} href={item.href} className={`block py-2 text-gray-700 font-semibold ${language === 'en' ? 'hover:text-blue-600' : 'hover:text-red-500'}`}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="font-black text-gray-900 mb-3">{language === 'en' ? 'Solutions' : 'Çözümler'}</h3>
                <div className="space-y-2 pl-4">
                  {content.solutions.slice(0, 4).map((item, i) => (
                    <Link key={i} href={item.href} className={`block py-2 text-gray-700 font-semibold ${language === 'en' ? 'hover:text-purple-600' : 'hover:text-rose-600'}`}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href={language === 'tr' ? '/tr/pricing' : '/pricing'} className={`block py-2 font-black text-gray-900 ${theme.hoverColor}`}>
                {language === 'en' ? 'Pricing' : 'Fiyatlandırma'}
              </Link>

              <div className="pt-4 border-t border-gray-200">
                <Link
                  href={language === 'tr' ? '/tr/demo' : '/demo'}
                  className={`block w-full px-6 py-3 text-center bg-gradient-to-r ${theme.buttonGradient} text-white font-bold rounded-xl`}
                >
                  {language === 'en' ? 'Request Demo' : 'Demo Talep Et'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

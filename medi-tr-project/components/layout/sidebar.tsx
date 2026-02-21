'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  Users,
  Calendar,
  FileText,
  DollarSign,
  TestTube,
  Pill,
  Scan,
  Stethoscope,
  Ambulance,
  Bed,
  UserCheck,
  Package,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  ClipboardList,
  Building2,
  Shield,
  Briefcase,
  Heart,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface NavItem {
  title: { en: string; tr: string }
  href: string
  icon: React.ElementType
  badge?: string
  badgeVariant?: 'default' | 'destructive' | 'warning' | 'success'
  description?: { en: string; tr: string }
}

const navigationItems: NavItem[] = [
  {
    title: { en: 'Dashboard', tr: 'Ana Panel' },
    href: '/dashboard',
    icon: Home,
    description: { en: 'Command Center Overview', tr: 'Komuta Merkezi Genel Bakış' },
  },
  {
    title: { en: 'Patients', tr: 'Hastalar' },
    href: '/patients',
    icon: Users,
    badge: '247',
    badgeVariant: 'default',
    description: { en: 'Patient Management & EHR', tr: 'Hasta Yönetimi & EHR' },
  },
  {
    title: { en: 'Appointments', tr: 'Randevular' },
    href: '/appointments',
    icon: Calendar,
    badge: '24',
    badgeVariant: 'warning',
    description: { en: 'Scheduling & Calendar', tr: 'Planlama & Takvim' },
  },
  {
    title: { en: 'Emergency Dept', tr: 'Acil Servis' },
    href: '/emergency',
    icon: Ambulance,
    badge: '12',
    badgeVariant: 'destructive',
    description: { en: 'ED Tracking Board', tr: 'Acil Takip Panosu' },
  },
  {
    title: { en: 'Inpatient', tr: 'Yatan Hasta' },
    href: '/inpatient',
    icon: Bed,
    badge: '156',
    badgeVariant: 'default',
    description: { en: 'Bed Management & ADT', tr: 'Yatak Yönetimi & ADT' },
  },
  {
    title: { en: 'Laboratory', tr: 'Laboratuvar' },
    href: '/laboratory',
    icon: TestTube,
    badge: '38',
    badgeVariant: 'warning',
    description: { en: 'Lab Orders & Results', tr: 'Lab Siparişleri & Sonuçlar' },
  },
  {
    title: { en: 'Pharmacy', tr: 'Eczane' },
    href: '/pharmacy',
    icon: Pill,
    description: { en: 'E-Prescribing & Medication', tr: 'E-Reçete & İlaç Yönetimi' },
  },
  {
    title: { en: 'Radiology', tr: 'Radyoloji' },
    href: '/radiology',
    icon: Scan,
    badge: '15',
    badgeVariant: 'default',
    description: { en: 'Imaging & PACS', tr: 'Görüntüleme & PACS' },
  },
  {
    title: { en: 'Operating Room', tr: 'Ameliyathane' },
    href: '/operating-room',
    icon: Stethoscope,
    description: { en: 'OR Scheduling & Management', tr: 'OR Planlama & Yönetim' },
  },
  {
    title: { en: 'Billing & RCM', tr: 'Faturalama & GDY' },
    href: '/billing',
    icon: DollarSign,
    description: { en: 'Revenue Cycle Management', tr: 'Gelir Döngüsü Yönetimi' },
  },
  {
    title: { en: 'Staff & HR', tr: 'Personel & İK' },
    href: '/staff',
    icon: UserCheck,
    description: { en: 'Human Resources', tr: 'İnsan Kaynakları' },
  },
  {
    title: { en: 'Inventory', tr: 'Envanter' },
    href: '/inventory',
    icon: Package,
    description: { en: 'Supply Chain Management', tr: 'Tedarik Zinciri Yönetimi' },
  },
  {
    title: { en: 'Analytics', tr: 'Analitik' },
    href: '/analytics',
    icon: BarChart3,
    description: { en: 'Reports & Business Intelligence', tr: 'Raporlar & İş Zekası' },
  },
  {
    title: { en: 'Quality', tr: 'Kalite' },
    href: '/quality',
    icon: Shield,
    description: { en: 'Compliance & Quality Measures', tr: 'Uyumluluk & Kalite Ölçümleri' },
  },
  {
    title: { en: 'Administration', tr: 'Yönetim' },
    href: '/administration',
    icon: Building2,
    description: { en: 'System Administration', tr: 'Sistem Yönetimi' },
  },
  {
    title: { en: 'Settings', tr: 'Ayarlar' },
    href: '/settings',
    icon: Settings,
    description: { en: 'User Preferences & Configuration', tr: 'Kullanıcı Tercihleri & Yapılandırma' },
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Extract language from pathname (e.g., /en/dashboard -> en)
  const lang = pathname?.split('/')[1] || 'en'
  const currentPath = pathname?.replace(`/${lang}`, '') || '/'

  const toggleCollapsed = () => setCollapsed(!collapsed)
  const toggleMobile = () => setMobileOpen(!mobileOpen)

  // Update CSS variable for layout responsiveness
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      collapsed ? '80px' : '288px'
    )
  }, [collapsed])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        {mobileOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 flex flex-col',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          collapsed ? 'w-20' : 'w-72',
          className
        )}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-4 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-2">
                <Heart className="h-6 w-6 text-white" />
                {/* Country Flag Badge */}
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100">
                  <span className="text-xs leading-none">
                    {lang === 'tr' ? '🇹🇷' : '🇺🇸'}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">Median</h2>
                <p className="text-[10px] text-gray-600 font-semibold">by Lydian</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-2 mx-auto">
              <Heart className="h-6 w-6 text-white" />
              {/* Country Flag Badge - Collapsed */}
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100">
                <span className="text-[10px] leading-none">
                  {lang === 'tr' ? '🇹🇷' : '🇺🇸'}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={toggleCollapsed}
            className={cn(
              'hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors',
              collapsed && 'hidden'
            )}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href
            const fullHref = `/${lang}${item.href}`
            const currentLang = (lang === 'en' || lang === 'tr') ? lang : 'en'
            const title = item.title[currentLang]
            const description = item.description?.[currentLang]

            return (
              <Link
                key={item.href}
                href={fullHref}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-700 hover:bg-gray-100',
                  collapsed && 'justify-center'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 flex-shrink-0',
                    isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                  )}
                />
                {!collapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'text-sm font-semibold truncate',
                          isActive ? 'text-white' : 'text-gray-900'
                        )}
                      >
                        {title}
                      </p>
                      {description && (
                        <p
                          className={cn(
                            'text-xs truncate',
                            isActive ? 'text-blue-100' : 'text-gray-500'
                          )}
                        >
                          {description}
                        </p>
                      )}
                    </div>
                    {item.badge && (
                      <Badge
                        variant={isActive ? 'secondary' : item.badgeVariant}
                        className={cn(
                          'text-xs',
                          isActive && 'bg-white/20 text-white border-none hover:bg-white/30'
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    <div className="font-semibold">{title}</div>
                    {description && (
                      <div className="text-xs text-gray-300">{description}</div>
                    )}
                    {item.badge && (
                      <Badge variant={item.badgeVariant} className="text-xs mt-1">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Expand Button (when collapsed) */}
        {collapsed && (
          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={toggleCollapsed}
              className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                DS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Dr. Smith</p>
                <p className="text-xs text-gray-500 truncate">Physician</p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>HIPAA Compliant</span>
                <Shield className="h-3 w-3 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span>System Status</span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 font-semibold">Online</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

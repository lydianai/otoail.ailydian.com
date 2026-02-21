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
  Building2,
  Shield,
  Heart,
  Wifi,
  CreditCard,
  ClipboardList,
  FileCheck,
  Microscope,
  Syringe,
  Zap,
  TrendingUp,
  Baby,
  Briefcase,
  HelpCircle,
  MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: string
  badgeVariant?: 'default' | 'destructive' | 'warning' | 'success'
  description?: string
}

// Türkiye'ye özel navigasyon - e-Nabız, Medula, SGK entegrasyonu
const turkiyeNavigationItems: NavItem[] = [
  {
    title: 'Kontrol Paneli',
    href: '/tr/dashboard',
    icon: Home,
    description: 'Genel Bakış & Raporlar',
  },
  {
    title: 'Hastalar',
    href: '/tr/patients',
    icon: Users,
    badge: '2,847',
    badgeVariant: 'default',
    description: 'Hasta Kayıtları & e-Nabız',
  },
  {
    title: 'Randevular',
    href: '/tr/appointments',
    icon: Calendar,
    badge: '156',
    badgeVariant: 'warning',
    description: 'MHRS & Randevu Sistemi',
  },
  {
    title: 'e-Nabız Entegrasyon',
    href: '/tr/enabiz',
    icon: Wifi,
    badge: 'Senkron',
    badgeVariant: 'success',
    description: 'SBÜ e-Nabız Veri Aktarımı',
  },
  {
    title: 'Muayene & Vizite',
    href: '/tr/examination',
    icon: Stethoscope,
    description: 'Poliklinik & Konsültasyon',
  },
  {
    title: 'Acil Servis',
    href: '/tr/emergency',
    icon: Ambulance,
    badge: '23',
    badgeVariant: 'destructive',
    description: 'Acil Takip & Triyaj',
  },
  {
    title: 'Yatan Hasta',
    href: '/tr/inpatient',
    icon: Bed,
    badge: '342',
    badgeVariant: 'default',
    description: 'Yatak Yönetimi & Servisler',
  },
  {
    title: 'Laboratuvar',
    href: '/tr/laboratory',
    icon: TestTube,
    badge: '89',
    badgeVariant: 'warning',
    description: 'Tetkik İstemi & Sonuç',
  },
  {
    title: 'Radyoloji & Görüntüleme',
    href: '/tr/radiology',
    icon: Scan,
    badge: '34',
    badgeVariant: 'default',
    description: 'PACS & Radyoloji İstemi',
  },
  {
    title: 'Ameliyathane',
    href: '/tr/operating-room',
    icon: Activity,
    description: 'Cerrahi Planlama & Takip',
  },
  {
    title: 'Eczane & e-Reçete',
    href: '/tr/pharmacy',
    icon: Pill,
    badge: 'İTS',
    badgeVariant: 'success',
    description: 'İlaç Yönetimi & İTS Entegrasyonu',
  },
  {
    title: 'SGK & Medula',
    href: '/tr/medula',
    icon: CreditCard,
    badge: '247',
    badgeVariant: 'warning',
    description: 'Provizyon & Fatura Gönderimi',
  },
  {
    title: 'Faturalandırma & SUT',
    href: '/tr/billing',
    icon: DollarSign,
    description: 'Fatura Yönetimi & SUT Kodlama',
  },
  {
    title: 'Personel & Vardiya',
    href: '/tr/staff',
    icon: UserCheck,
    description: 'İnsan Kaynakları & Nöbet',
  },
  {
    title: 'Stok & Malzeme',
    href: '/tr/inventory',
    icon: Package,
    description: 'Depo & Stok Takibi',
  },
  {
    title: 'Kalite & KBYS',
    href: '/tr/quality',
    icon: Shield,
    description: 'Kalite Güvence & Akreditasyon',
  },
  {
    title: 'Raporlama & BI',
    href: '/tr/analytics',
    icon: BarChart3,
    description: 'İstatistik & Karar Destek',
  },
  {
    title: 'KVKK & Uyumluluk',
    href: '/tr/kvkk',
    icon: FileCheck,
    badge: '98/100',
    badgeVariant: 'success',
    description: 'Veri Koruma & Uyumluluk',
  },
  {
    title: 'Yönetim',
    href: '/tr/administration',
    icon: Building2,
    description: 'Sistem Yönetimi',
  },
  {
    title: 'Ayarlar',
    href: '/tr/settings',
    icon: Settings,
    description: 'Kullanıcı Tercihleri',
  },
]

interface TurkiyeSidebarProps {
  className?: string
}

export function TurkiyeSidebar({ className }: TurkiyeSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const toggleCollapsed = () => setCollapsed(!collapsed)

  // Update CSS variable for layout responsiveness
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      collapsed ? '80px' : '288px'
    )
  }, [collapsed])

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-red-200 bg-white transition-all duration-300 flex flex-col',
        collapsed ? 'w-20' : 'w-72',
        className
      )}
    >
      {/* Header - Kırmızı/Pembe Tema */}
      <div className="flex h-20 items-center justify-between border-b border-red-200 px-4 flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-2 shadow-lg shadow-red-500/30">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                <span className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Lydian
                </span>
                <span className="text-gray-900 font-extrabold ml-0.5">
                  Medi
                </span>
              </h2>
              <p className="text-xs text-gray-500 font-semibold"></p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-2 mx-auto shadow-lg shadow-red-500/30">
            <Heart className="h-6 w-6 text-white" />
          </div>
        )}
        <button
          onClick={toggleCollapsed}
          className={cn(
            'p-2 hover:bg-red-50 rounded-lg transition-colors',
            collapsed && 'hidden'
          )}
        >
          <ChevronLeft className="h-5 w-5 text-red-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        {turkiyeNavigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              scroll={false}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative',
                isActive
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                  : 'text-gray-700 hover:bg-red-50',
                collapsed && 'justify-center'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 flex-shrink-0',
                  isActive ? 'text-white' : 'text-red-600 group-hover:text-red-700'
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
                      {item.title}
                    </p>
                    {item.description && (
                      <p
                        className={cn(
                          'text-xs truncate',
                          isActive ? 'text-red-100' : 'text-gray-500'
                        )}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.badge && (
                    <Badge
                      variant={isActive ? 'secondary' : item.badgeVariant}
                      className={cn(
                        'text-xs',
                        isActive && 'bg-white/20 text-white border-none hover:bg-white/30',
                        !isActive && item.badgeVariant === 'success' && 'bg-green-100 text-green-700 border-green-300',
                        !isActive && item.badgeVariant === 'warning' && 'bg-amber-100 text-amber-700 border-amber-300',
                        !isActive && item.badgeVariant === 'destructive' && 'bg-red-100 text-red-700 border-red-300'
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                  <div className="font-semibold">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-gray-300">{item.description}</div>
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
        <div className="p-4 border-t border-red-200 flex-shrink-0">
          <button
            onClick={toggleCollapsed}
            className="w-full p-2 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5 text-red-600" />
          </button>
        </div>
      )}

      {/* Footer - Türkiye Uyumlu */}
      {!collapsed && (
        <div className="p-4 border-t border-red-200 bg-gradient-to-r from-red-50 to-rose-50 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-lg">
              DA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Dr. Ayşe Yılmaz</p>
              <p className="text-xs text-gray-500 truncate">Uzman Doktor</p>
            </div>
          </div>
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>KVKK Uyumlu</span>
              <Shield className="h-3 w-3 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span>e-Nabız Durum</span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 font-semibold">Senkron</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Medula Bağlantı</span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-green-600 font-semibold">Aktif</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

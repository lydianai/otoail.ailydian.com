'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  Calendar,
  FileText,
  Ambulance,
  Bed,
  TestTube,
  Pill,
  Scan,
  Stethoscope,
  DollarSign,
  UserCheck,
  Package,
  BarChart3,
  Shield,
  Building2,
  Settings,
  Heart,
  ChevronDown,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: string
  children?: { title: string; href: string; description?: string }[]
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Patients',
    href: '/patients',
    icon: Users,
    badge: '247',
    children: [
      { title: 'Patient List', href: '/patients', description: 'View all patients' },
      { title: 'New Patient', href: '/patients/new', description: 'Register new patient' },
      { title: 'Appointments', href: '/appointments', description: 'Manage appointments' },
    ],
  },
  {
    title: 'Clinical',
    href: '/clinical',
    icon: Stethoscope,
    children: [
      { title: 'Emergency Dept', href: '/emergency', description: 'ED tracking board' },
      { title: 'Inpatient', href: '/inpatient', description: 'Bed management' },
      { title: 'Clinical Notes', href: '/clinical', description: 'SOAP notes' },
    ],
  },
  {
    title: 'Diagnostics',
    href: '/laboratory',
    icon: TestTube,
    badge: '38',
    children: [
      { title: 'Laboratory', href: '/laboratory', description: 'Lab orders & results' },
      { title: 'Radiology', href: '/radiology', description: 'Imaging & PACS' },
      { title: 'Pharmacy', href: '/pharmacy', description: 'Medications' },
    ],
  },
  {
    title: 'Operations',
    href: '/operating-room',
    icon: Building2,
    children: [
      { title: 'Operating Room', href: '/operating-room', description: 'OR scheduling' },
      { title: 'Inventory', href: '/inventory', description: 'Supply chain' },
      { title: 'Staff', href: '/staff', description: 'HR management' },
    ],
  },
  {
    title: 'Finance',
    href: '/billing',
    icon: DollarSign,
    children: [
      { title: 'Billing', href: '/billing', description: 'Revenue cycle' },
      { title: 'Analytics', href: '/analytics', description: 'Financial reports' },
    ],
  },
]

interface HorizontalNavLayoutProps {
  children: React.ReactNode
}

export default function HorizontalNavLayout({ children }: HorizontalNavLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                    Lydian
                  </span>
                  <span className="text-gray-900 ml-0.5">Medi</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                const hasChildren = item.children && item.children.length > 0

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all relative',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                      {item.badge && (
                        <Badge
                          className={cn(
                            'ml-1 text-xs',
                            isActive
                              ? 'bg-white/20 text-white border-none'
                              : 'bg-blue-100 text-blue-700'
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {hasChildren && (
                        <ChevronDown
                          className={cn(
                            'h-3 w-3 transition-transform',
                            openDropdown === item.href && 'rotate-180'
                          )}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {hasChildren && openDropdown === item.href && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-gray-100 py-2 z-50">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                          >
                            <div className="font-semibold text-gray-900 text-sm">
                              {child.title}
                            </div>
                            {child.description && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <button className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => !item.children && setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-all',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          className={cn(
                            'text-xs',
                            isActive
                              ? 'bg-white/20 text-white border-none'
                              : 'bg-blue-100 text-blue-700'
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>

                    {/* Mobile Submenu */}
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}

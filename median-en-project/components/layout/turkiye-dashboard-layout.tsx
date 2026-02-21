'use client'

import { TurkiyeSidebar } from './turkiye-sidebar'

interface TurkiyeDashboardLayoutProps {
  children: React.ReactNode
}

export function TurkiyeDashboardLayout({ children }: TurkiyeDashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      <TurkiyeSidebar />
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: 'var(--sidebar-width, 288px)' }}
      >
        {children}
      </main>
    </div>
  )
}

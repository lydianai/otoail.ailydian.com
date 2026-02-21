'use client'

import { Sidebar } from './sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Sidebar />
      <main
        className="flex-1 transition-all duration-300 lg:ml-[var(--sidebar-width,288px)]"
      >
        {children}
      </main>
    </div>
  )
}

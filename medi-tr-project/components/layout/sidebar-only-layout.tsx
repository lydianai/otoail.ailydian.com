'use client'

import { Sidebar } from './sidebar'

interface SidebarOnlyLayoutProps {
  children: React.ReactNode
}

export default function SidebarOnlyLayout({ children }: SidebarOnlyLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Sidebar />

      {/* Main Content with left margin for sidebar */}
      <main className="lg:ml-72 min-h-screen">
        {children}
      </main>
    </div>
  )
}

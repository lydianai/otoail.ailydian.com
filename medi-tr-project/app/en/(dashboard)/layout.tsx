import { Sidebar } from '@/components/layout/sidebar'

export default function EnDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <Sidebar />
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: 'var(--sidebar-width, 288px)' }}
      >
        {children}
      </main>
    </div>
  )
}

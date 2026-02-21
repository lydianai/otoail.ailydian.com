import { TurkiyeSidebar } from '@/components/layout/turkiye-sidebar'
import { Toaster } from 'sonner'

export default function TrDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      <TurkiyeSidebar />
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: 'var(--sidebar-width, 288px)' }}
      >
        {children}
      </main>
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
        duration={4000}
      />
    </div>
  )
}

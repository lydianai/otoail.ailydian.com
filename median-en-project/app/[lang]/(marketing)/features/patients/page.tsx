import Link from 'next/link'
import { Users, Search, Filter, Eye, Edit3, FileText, Bell, Settings, BarChart, CheckCircle2, AlertTriangle, Database, Shield } from 'lucide-react'

export default function PatientsFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-600 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Users className="h-5 w-5" />
              <span className="text-sm font-semibold">Patient Management Module - Active Demo</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Patient Records and<br />Information Management System
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              Working demo with 100 patient records. Real-time search, filtering, and detailed patient view features.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/en/patients"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Try Live Demo
              </Link>
              <Link
                href="/en/contact"
                className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Development Status Banner */}
      <section className="py-6 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 text-white">
            <AlertTriangle className="h-6 w-6" />
            <p className="text-lg font-bold">
              Platform Under Development - Currently Only Patient Management Module Active
            </p>
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* Currently Active Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-bold">CURRENTLY ACTIVE FEATURES</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Real Working Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The following features are <strong>fully functional</strong> right now and you can test them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Patient List */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100 Patient Records</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                100 patient records with real data structure. Each patient has name, national ID, age, gender, e-Nabız and MEDULA integration status.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Complete demographic information
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  e-Nabız/MEDULA integration status
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Performance display with pagination
                </li>
              </ul>
            </div>

            {/* Feature 2: Search & Filter */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Search and Filtering</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Real-time search functionality. Filter by name, national ID number, age, and gender.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Name and ID-based search
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Age range filtering
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Gender filtering
                </li>
              </ul>
            </div>

            {/* Feature 3: Patient Modals */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Detailed View</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                3 different modals for each patient: detailed view, edit form, and add notes. Fully functional.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Patient detail modal
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Edit modal
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Add notes modal
                </li>
              </ul>
            </div>

            {/* Feature 4: Dashboard */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Statistics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Real-time statistics: total patients, today's visits, pending tasks, and bed occupancy rate.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Total patient count
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Daily visit count
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Pending tasks and bed occupancy
                </li>
              </ul>
            </div>

            {/* Feature 5: Notifications */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notification System</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Real-time notifications: critical patient alerts, AI predictions, system updates, bed status, and staff notifications.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  5 different notification types
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Priority-based color display
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Timestamped notifications
                </li>
              </ul>
            </div>

            {/* Feature 6: Settings */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Settings Module</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                User preferences: auto-refresh, sound notifications, dark mode, dashboard cards, and MEDULA/e-Nabız integration settings.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  General system settings
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Display preferences
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Integration management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HIPAA Compliance - Real Implementation */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-semibold">Data Security</span>
              </div>
              <h2 className="text-4xl font-black mb-6">
                HIPAA-Compliant Data Architecture
              </h2>
              <p className="text-red-50 text-lg leading-relaxed max-w-3xl mx-auto">
                Patient data is structured in accordance with HIPAA standards.
                Even at demo level, security standards are production-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-bold">COMING SOON</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Modules Under Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The following features are currently <strong>under development</strong> and not yet active.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
            <ComingSoonCard title="Laboratory Module" description="Test results, test requests, and reporting" />
            <ComingSoonCard title="Pharmacy Module" description="Drug inventory, e-prescription integration" />
            <ComingSoonCard title="Radiology Module" description="Imaging requests, PACS integration" />
            <ComingSoonCard title="Operating Room Module" description="Surgery planning and tracking" />
            <ComingSoonCard title="Emergency Department" description="Triage, emergency patient tracking" />
            <ComingSoonCard title="Billing Module" description="Insurance claims, patient invoices" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Try the Live Demo Now
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Test the real demo system with 100 patient records.
            No registration required - try it immediately.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/en/patients"
              className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Patient Management Demo
            </Link>
            <Link
              href="/en/dashboard"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Dashboard Demo
            </Link>
            <Link
              href="/en/contact"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all border-2 border-red-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ComingSoonCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 relative">
      <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
        SOON
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

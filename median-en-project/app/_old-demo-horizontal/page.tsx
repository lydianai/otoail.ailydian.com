'use client'

import HorizontalNavLayout from '@/components/layout/horizontal-nav-layout'
import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react'

export default function DemoHorizontalPage() {
  return (
    <HorizontalNavLayout>
      <div className="px-4 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎨 Horizontal Navigation Demo
          </h1>
          <p className="text-lg text-gray-600">
            Alternative header-based navigation system - Üst menü alternatifi
          </p>
        </div>

        {/* Comparison Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900">Mevcut Tasarım</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Sol Sidebar:</strong> Vertical navigation (tüm menüler yan tarafta)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Logo Alt:</strong> "" yazısı (kaldırıldı)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Mobile:</strong> Hamburger menü ile açılır sidebar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Desktop:</strong> Collapse özelliği (daraltma)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-green-200 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-900">Yeni Tasarım (Bu Sayfa)</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Üst Header:</strong> Horizontal navigation (menüler üst tarafta)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Dropdown:</strong> Hover ile açılan alt menüler</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Daha Fazla Alan:</strong> Yan menü yok, geniş çalışma alanı</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Modern UI:</strong> Grouped navigation (Clinical, Diagnostics, etc.)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            📊 Özellik Karşılaştırması
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-center mb-4">
                <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Ekran Alanı</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sidebar:</span>
                  <span className="font-bold">~72-288px kaybı</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Header:</span>
                  <span className="font-bold text-green-600">~64px (daha az)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-center mb-4">
                <div className="inline-block p-3 bg-purple-100 rounded-full mb-3">
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Erişilebilirlik</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sidebar:</span>
                  <span className="font-bold">Scroll gerekir</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Header:</span>
                  <span className="font-bold text-green-600">Tek bakışta</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-center mb-4">
                <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Kullanım</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sidebar:</span>
                  <span className="font-bold">Klasik</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Header:</span>
                  <span className="font-bold text-green-600">Modern SaaS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Box */}
        <div className="bg-white rounded-2xl border-4 border-yellow-400 p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
              <AlertCircle className="h-10 w-10 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🤔 Hangi Tasarımı Tercih Edersiniz?
            </h2>
            <p className="text-lg text-gray-600">
              Her iki sistem de tamamen fonksiyonel ve hazır!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <a
              href="/patients"
              className="block p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Mevcut Sidebar</h3>
                <Clock className="h-6 w-6" />
              </div>
              <p className="text-blue-100 mb-4">
                Klasik yan menü sistemi ile devam et. Tüm özellikler hazır ve çalışıyor.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>Patients sayfasına git</span>
                <span>→</span>
              </div>
            </a>

            <div className="p-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Yeni Header Nav</h3>
                <TrendingUp className="h-6 w-6" />
              </div>
              <p className="text-green-100 mb-4">
                Modern üst menü sistemi. Bu sayfadaki tasarımı kullanabilirsiniz.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>Şu an bu sayfadasınız ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">247</div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
            <div className="text-sm text-gray-600">Appointments Today</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Emergency Cases</div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-yellow-300 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$125K</div>
            <div className="text-sm text-gray-600">Monthly Revenue</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-3">📝 Test Talimatları:</h3>
          <ol className="space-y-2 text-gray-700">
            <li><strong>1.</strong> Bu sayfada horizontal navigation sistemi aktif</li>
            <li><strong>2.</strong> <code className="bg-blue-100 px-2 py-1 rounded">/patients</code> sayfasında eski sidebar sistemi aktif</li>
            <li><strong>3.</strong> Her iki sistem de tamamen çalışıyor ve responsive</li>
            <li><strong>4.</strong> Hangisini isterseniz kullanabilirsiniz</li>
            <li><strong>5.</strong> Geri dönüşümlü - kod değişikliği kolay</li>
          </ol>
        </div>
      </div>
    </HorizontalNavLayout>
  )
}

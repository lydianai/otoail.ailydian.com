'use client'

import { useState } from 'react'
import {
  BarChart3,
  Download,
  FileText,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Bed,
  Clock,
  DollarSign,
  Star,
  Activity,
  Mail,
  Grid3x3,
  ChevronDown,
  FileSpreadsheet,
  Plus,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function AnalyticsPage() {
  const [selectedReport, setSelectedReport] = useState('hasta-demografisi')
  const [dateRange, setDateRange] = useState('bu-ay')
  const [selectedDepartment, setSelectedDepartment] = useState('tümü')
  const [selectedPatientType, setSelectedPatientType] = useState('tümü')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([
    'admissions',
    'revenue',
    'diagnoses',
    'occupancy',
    'age',
    'gender'
  ])
  const [scheduledReports, setScheduledReports] = useState({
    enabled: false,
    frequency: 'weekly',
    emails: ''
  })

  // Pre-built report templates
  const reportTemplates = [
    { id: 'hasta-demografisi', name: 'Hasta Demografisi', icon: Users, category: 'Hasta' },
    { id: 'bolum-gelir', name: 'Bölüm Bazlı Gelir', icon: DollarSign, category: 'Finans' },
    { id: 'en-sik-tanilar', name: 'En Sık Tanılar', icon: FileText, category: 'Klinik' },
    { id: 'yatak-doluluk', name: 'Yatak Doluluk Oranı', icon: Bed, category: 'Operasyon' },
    { id: 'ameliyat-istatistik', name: 'Ameliyat İstatistikleri', icon: Activity, category: 'Klinik' },
    { id: 'acil-basvuru', name: 'Acil Başvuru Analizi', icon: Activity, category: 'Acil' },
    { id: 'lab-kullanim', name: 'Laboratuvar Kullanımı', icon: FileSpreadsheet, category: 'Destek' },
    { id: 'radyoloji-tarama', name: 'Radyoloji Tarama', icon: Activity, category: 'Destek' },
    { id: 'poliklinik-performans', name: 'Poliklinik Performansı', icon: TrendingUp, category: 'Hasta' },
    { id: 'yatan-hasta', name: 'Yatan Hasta Analizi', icon: Bed, category: 'Hasta' },
    { id: 'hasta-memnuniyet', name: 'Hasta Memnuniyeti', icon: Star, category: 'Kalite' },
    { id: 'personel-verimlilik', name: 'Personel Verimliliği', icon: Users, category: 'İK' },
    { id: 'sgk-tahsilat', name: 'SGK Tahsilat', icon: DollarSign, category: 'Finans' },
    { id: 'ilac-maliyet', name: 'İlaç Maliyet Analizi', icon: DollarSign, category: 'Finans' },
    { id: 'ortalama-kalma', name: 'Ortalama Kalış Süresi', icon: Clock, category: 'Operasyon' },
    { id: 'randevu-analiz', name: 'Randevu Analizi', icon: Calendar, category: 'Operasyon' },
    { id: 'red-orani', name: 'Red Oranı Analizi', icon: TrendingDown, category: 'Finans' },
    { id: 'sevk-analiz', name: 'Sevk Analizi', icon: Activity, category: 'Klinik' },
    { id: 'enfeksiyon-kontrol', name: 'Enfeksiyon Kontrol', icon: Activity, category: 'Kalite' },
    { id: 'yoğun-bakim', name: 'Yoğun Bakım İstatistikleri', icon: Activity, category: 'Klinik' },
    { id: 'hemodiyaliz', name: 'Hemodiyaliz Performansı', icon: Activity, category: 'Klinik' },
    { id: 'doktor-performans', name: 'Doktor Performansı', icon: Users, category: 'İK' },
    { id: 'cihaz-kullanim', name: 'Cihaz Kullanım Oranı', icon: Settings, category: 'Destek' },
    { id: 'stok-analiz', name: 'Stok Analizi', icon: Grid3x3, category: 'Operasyon' }
  ]

  // Realistic Turkish hospital statistics data
  const patientAdmissionsData = [
    { ay: 'Oca', ayaktan: 2840, yatan: 580, acil: 420 },
    { ay: 'Şub', ayaktan: 2650, yatan: 610, acil: 390 },
    { ay: 'Mar', ayaktan: 3120, yatan: 640, acil: 450 },
    { ay: 'Nis', ayaktan: 2980, yatan: 590, acil: 410 },
    { ay: 'May', ayaktan: 3350, yatan: 670, acil: 480 },
    { ay: 'Haz', ayaktan: 3180, yatan: 620, acil: 440 },
    { ay: 'Tem', ayaktan: 2890, yatan: 580, acil: 400 },
    { ay: 'Ağu', ayaktan: 2720, yatan: 550, acil: 380 },
    { ay: 'Eyl', ayaktan: 3240, yatan: 660, acil: 470 },
    { ay: 'Eki', ayaktan: 3420, yatan: 690, acil: 490 },
    { ay: 'Kas', ayaktan: 3180, yatan: 640, acil: 450 },
    { ay: 'Ara', ayaktan: 3090, yatan: 620, acil: 430 }
  ]

  const departmentRevenueData = [
    { name: 'Kardiyoloji', value: 1250000, percentage: 22 },
    { name: 'Ortopedi', value: 980000, percentage: 17 },
    { name: 'Dahiliye', value: 850000, percentage: 15 },
    { name: 'Genel Cerrahi', value: 720000, percentage: 13 },
    { name: 'Nöroloji', value: 650000, percentage: 11 },
    { name: 'Göz Hastalıkları', value: 480000, percentage: 8 },
    { name: 'KBB', value: 420000, percentage: 7 },
    { name: 'Diğer', value: 400000, percentage: 7 }
  ]

  const topDiagnosesData = [
    { tani: 'Hipertansiyon', sayi: 1240 },
    { tani: 'Diyabet Tip 2', sayi: 980 },
    { tani: 'Koroner Arter', sayi: 760 },
    { tani: 'KOAH', sayi: 650 },
    { tani: 'Gastrit', sayi: 580 },
    { tani: 'Lomber Disk', sayi: 520 },
    { tani: 'Migren', sayi: 480 },
    { tani: 'Astım', sayi: 420 },
    { tani: 'Anemı', sayi: 390 },
    { tani: 'Tiroid Hastalığı', sayi: 340 }
  ]

  const bedOccupancyData = [
    { hafta: 'Hf 1', dahiliye: 82, cerrahi: 76, yogun: 95, acil: 68 },
    { hafta: 'Hf 2', dahiliye: 78, cerrahi: 81, yogun: 92, acil: 71 },
    { hafta: 'Hf 3', dahiliye: 85, cerrahi: 78, yogun: 98, acil: 73 },
    { hafta: 'Hf 4', dahiliye: 80, cerrahi: 83, yogun: 94, acil: 69 }
  ]

  const ageDistributionData = [
    { yas: '0-18', erkek: 340, kadin: 320 },
    { yas: '19-30', erkek: 580, kadin: 620 },
    { yas: '31-45', erkek: 760, kadin: 840 },
    { yas: '46-60', erkek: 920, kadin: 980 },
    { yas: '61-75', erkek: 680, kadin: 720 },
    { yas: '75+', erkek: 420, kadin: 480 }
  ]

  const genderDistributionData = [
    { name: 'Erkek', value: 3700, percentage: 48 },
    { name: 'Kadın', value: 3960, percentage: 52 }
  ]

  const revenueTrendData = [
    { ay: 'Oca', gelir: 4200000, gider: 3100000, kar: 1100000 },
    { ay: 'Şub', gelir: 3950000, gider: 2980000, kar: 970000 },
    { ay: 'Mar', gelir: 4680000, gider: 3250000, kar: 1430000 },
    { ay: 'Nis', gelir: 4420000, gider: 3120000, kar: 1300000 },
    { ay: 'May', gelir: 5100000, gider: 3450000, kar: 1650000 },
    { ay: 'Haz', gelir: 4850000, gider: 3300000, kar: 1550000 }
  ]

  const appointmentTypesData = [
    { name: 'Poliklinik', value: 2840, percentage: 58 },
    { name: 'Kontrol', value: 1120, percentage: 23 },
    { name: 'Acil', value: 620, percentage: 13 },
    { name: 'Tetkik', value: 310, percentage: 6 }
  ]

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

  // Key metrics with trend analysis
  const keyMetrics = [
    {
      title: 'Toplam Hasta',
      value: '7,660',
      previousValue: '6,890',
      change: 11.2,
      icon: Users,
      color: 'blue',
      subtitle: 'Bu ay'
    },
    {
      title: 'Doluluk Oranı',
      value: '%82.3',
      previousValue: '%78.5',
      change: 4.8,
      icon: Bed,
      color: 'purple',
      subtitle: 'Ortalama'
    },
    {
      title: 'Ortalama Kalış',
      value: '4.2 gün',
      previousValue: '4.8 gün',
      change: -12.5,
      icon: Clock,
      color: 'green',
      subtitle: 'Yatan hasta'
    },
    {
      title: 'Toplam Gelir',
      value: '₺4.85M',
      previousValue: '₺4.42M',
      change: 9.7,
      icon: DollarSign,
      color: 'emerald',
      subtitle: 'Bu ay'
    },
    {
      title: 'Hasta Memnuniyeti',
      value: '4.6/5.0',
      previousValue: '4.4/5.0',
      change: 4.5,
      icon: Star,
      color: 'amber',
      subtitle: 'Anket skoru'
    }
  ]

  // Additional KPIs
  const additionalKPIs = [
    { label: 'Ameliyat Sayısı', value: '342', trend: '+8%' },
    { label: 'Acil Başvuru', value: '430', trend: '+5%' },
    { label: 'Lab Test', value: '12,450', trend: '+12%' },
    { label: 'Radyoloji', value: '2,840', trend: '+7%' },
    { label: 'SGK Tahsilat', value: '₺3.2M', trend: '+6%' },
    { label: 'Özel Sigorta', value: '₺1.1M', trend: '+15%' },
    { label: 'Nakit Tahsilat', value: '₺550K', trend: '+3%' },
    { label: 'Tahsilat Oranı', value: '%92.3', trend: '+2%' },
    { label: 'Red Oranı', value: '%4.7', trend: '-1%' },
    { label: 'Poliklinik', value: '2,840', trend: '+9%' },
    { label: 'Yatan Hasta', value: '620', trend: '+4%' },
    { label: 'Yoğun Bakım', value: '48', trend: '+2%' },
    { label: 'Ameliyathane Kullanım', value: '%76', trend: '+5%' },
    { label: 'Doktor Sayısı', value: '124', trend: '+3%' },
    { label: 'Hemşire Sayısı', value: '287', trend: '+2%' },
    { label: 'Ortalama Randevu', value: '142/gün', trend: '+11%' },
    { label: 'İptal Oranı', value: '%8.2', trend: '-3%' },
    { label: 'Yeniden Yatış', value: '%5.8', trend: '-2%' },
    { label: 'Enfeksiyon Oranı', value: '%2.1', trend: '-4%' },
    { label: 'Mortalite Oranı', value: '%1.3', trend: '-1%' },
    { label: 'Ortalama Bekleme', value: '18 dk', trend: '-8%' },
    { label: 'İlaç Maliyeti', value: '₺820K', trend: '+4%' },
    { label: 'Sarf Malzeme', value: '₺450K', trend: '+6%' },
    { label: 'Enerji Maliyeti', value: '₺180K', trend: '+2%' },
    { label: 'Personel Devir', value: '%12.5', trend: '-5%' },
    { label: 'Çalışan Memnuniyeti', value: '4.2/5', trend: '+3%' },
    { label: 'Eğitim Saati', value: '1,240', trend: '+18%' },
    { label: 'Şikayet Sayısı', value: '34', trend: '-12%' },
    { label: 'Çözüm Süresi', value: '2.4 gün', trend: '-15%' },
    { label: 'Evrak Hatası', value: '%3.2', trend: '-8%' },
    { label: 'Tetkik Tekrarı', value: '%6.8', trend: '-4%' },
    { label: 'Kan Bankası', value: '420 ünite', trend: '+5%' },
    { label: 'Oksijen Kullanımı', value: '2,840 m³', trend: '+3%' },
    { label: 'Çamaşırhane', value: '18 ton', trend: '+2%' },
    { label: 'Sterilizasyon', value: '3,240 set', trend: '+7%' },
    { label: 'Hasta Nakli', value: '156', trend: '+4%' },
    { label: 'Ambulans Çağrısı', value: '89', trend: '+6%' },
    { label: 'Eczane Reçete', value: '4,520', trend: '+8%' },
    { label: 'Fizik Tedavi', value: '680 seans', trend: '+11%' },
    { label: 'Diyaliz Seansı', value: '342', trend: '+3%' },
    { label: 'Anestezi Uygulama', value: '287', trend: '+5%' },
    { label: 'Endoskopi', value: '124', trend: '+9%' },
    { label: 'Patoloji Örnek', value: '890', trend: '+6%' },
    { label: 'Mikrobiyoloji', value: '1,560', trend: '+8%' },
    { label: 'Kan Testi', value: '8,420', trend: '+12%' },
    { label: 'Görüntüleme', value: '2,840', trend: '+7%' },
    { label: 'MR Çekimi', value: '245', trend: '+10%' },
    { label: 'BT Çekimi', value: '389', trend: '+8%' },
    { label: 'Röntgen', value: '1,680', trend: '+5%' },
    { label: 'USG', value: '892', trend: '+9%' }
  ]

  const departments = [
    'Tümü',
    'Kardiyoloji',
    'Ortopedi',
    'Dahiliye',
    'Genel Cerrahi',
    'Nöroloji',
    'Göz Hastalıkları',
    'KBB',
    'Üroloji',
    'Kadın Doğum'
  ]

  const patientTypes = ['Tümü', 'Ayaktan', 'Yatan', 'Acil']

  const dateRanges = [
    { value: 'bugün', label: 'Bugün' },
    { value: 'bu-hafta', label: 'Bu Hafta' },
    { value: 'bu-ay', label: 'Bu Ay' },
    { value: 'özel', label: 'Özel Tarih' }
  ]

  const widgetOptions = [
    { id: 'admissions', label: 'Hasta Kabulleri Trendi' },
    { id: 'revenue', label: 'Bölüm Gelir Dağılımı' },
    { id: 'diagnoses', label: 'En Sık 10 Tanı' },
    { id: 'occupancy', label: 'Yatak Doluluk Oranı' },
    { id: 'age', label: 'Yaş Dağılımı' },
    { id: 'gender', label: 'Cinsiyet Dağılımı' },
    { id: 'revenue-trend', label: 'Gelir Trendi' },
    { id: 'appointments', label: 'Randevu Türleri' }
  ]

  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev =>
      prev.includes(widgetId)
      ? prev.filter(id => id !== widgetId)
      : [...prev, widgetId]
    )
  }

  const exportToPDF = () => {
    alert('PDF raporu oluşturuluyor...')
  }

  const exportToExcel = () => {
    alert('Excel raporu oluşturuluyor...')
  }

  const exportToCSV = () => {
    alert('CSV dosyası oluşturuluyor...')
  }

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <BarChart3 className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Analitik & Raporlama
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    Detaylı İstatistikler & Performans Analizi
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-2"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtreler
              </Button>
              <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button onClick={exportToPDF} className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                <Download className="h-4 w-4 mr-2" />
                PDF İndir
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Date Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tarih Aralığı
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    {dateRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bölüm
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept.toLowerCase()}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Patient Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hasta Tipi
                  </label>
                  <select
                    value={selectedPatientType}
                    onChange={(e) => setSelectedPatientType(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    {patientTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doktor
                  </label>
                  <Input
                    placeholder="Doktor ara..."
                    className="border-2 border-gray-300 focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Key Metrics Cards with Trend Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon
            const isPositive = metric.change > 0
            const isNegative = metric.change < 0
            const trendColor = metric.title === 'Ortalama Kalış'
              ? (isNegative ? 'text-green-600' : 'text-red-600')
              : (isPositive ? 'text-green-600' : 'text-red-600')

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-sm border-2 border-${metric.color}-100 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 bg-${metric.color}-100 rounded-xl`}>
                    <Icon className={`h-5 w-5 text-${metric.color}-600`} />
                  </div>
                  <div className={`flex items-center gap-1 ${trendColor}`}>
                    {(metric.title === 'Ortalama Kalış' ? isNegative : isPositive) ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-bold">
                      {Math.abs(metric.change).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  {metric.title}
                </p>
                <p className={`text-3xl font-bold text-${metric.color}-700 mb-1`}>
                  {metric.value}
                </p>
                <p className="text-xs text-gray-500">
                  {metric.subtitle} • Önceki: {metric.previousValue}
                </p>
              </div>
            )
          })}
        </div>

        {/* Report Templates */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Hazır Rapor Şablonları
            </h2>
            <Badge className="bg-red-100 text-red-700 border-red-200">
              {reportTemplates.length} Rapor
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {reportTemplates.map((template) => {
              const Icon = template.icon
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedReport(template.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedReport === template.id
                      ? 'border-red-500 bg-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-2 ${
                    selectedReport === template.id ? 'text-red-600' : 'text-gray-600'
                  }`} />
                  <p className={`text-sm font-semibold ${
                    selectedReport === template.id ? 'text-red-900' : 'text-gray-900'
                  }`}>
                    {template.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{template.category}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dashboard Builder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Grid3x3 className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Dashboard Widget Seçici
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {widgetOptions.map((widget) => (
              <label
                key={widget.id}
                className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-red-300 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={selectedWidgets.includes(widget.id)}
                  onChange={() => toggleWidget(widget.id)}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {widget.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Patient Admissions Trend */}
          {selectedWidgets.includes('admissions') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Hasta Kabulleri Trendi
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientAdmissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="ay" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="ayaktan"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Ayaktan"
                    dot={{ fill: '#3b82f6' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="yatan"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Yatan"
                    dot={{ fill: '#10b981' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="acil"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Acil"
                    dot={{ fill: '#ef4444' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Department Revenue Breakdown */}
          {selectedWidgets.includes('revenue') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Bölüm Gelir Dağılımı
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentRevenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} %${percentage}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `₺${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top 10 Diagnoses */}
          {selectedWidgets.includes('diagnoses') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  En Sık 10 Tanı
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topDiagnosesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis
                    type="category"
                    dataKey="tani"
                    stroke="#666"
                    width={120}
                    style={{ fontSize: '11px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Bar dataKey="sayi" fill="#ef4444" name="Hasta Sayısı" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Bed Occupancy Rate */}
          {selectedWidgets.includes('occupancy') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Yatak Doluluk Oranı (%)
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={bedOccupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hafta" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="dahiliye"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    name="Dahiliye"
                  />
                  <Area
                    type="monotone"
                    dataKey="cerrahi"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    name="Cerrahi"
                  />
                  <Area
                    type="monotone"
                    dataKey="yogun"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    name="Yoğun Bakım"
                  />
                  <Area
                    type="monotone"
                    dataKey="acil"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    name="Acil"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Age Distribution */}
          {selectedWidgets.includes('age') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Yaş Dağılımı
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="yas" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="erkek" fill="#3b82f6" name="Erkek" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="kadin" fill="#ec4899" name="Kadın" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Gender Distribution */}
          {selectedWidgets.includes('gender') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Cinsiyet Dağılımı
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} %${percentage}`}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#ec4899" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Revenue Trend */}
          {selectedWidgets.includes('revenue-trend') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Gelir-Gider-Kar Trendi
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="ay" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    formatter={(value: number) => `₺${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="gelir"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Gelir"
                    dot={{ fill: '#10b981' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gider"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Gider"
                    dot={{ fill: '#ef4444' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="kar"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Kar"
                    dot={{ fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Appointment Types */}
          {selectedWidgets.includes('appointments') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Randevu Türleri
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={appointmentTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} %${percentage}`}
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {appointmentTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Additional KPIs Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Tüm Performans Göstergeleri (50+ KPI)
            </h2>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              {additionalKPIs.length} Gösterge
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {additionalKPIs.map((kpi, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  {kpi.label}
                </p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </p>
                <p className={`text-xs font-semibold ${
                  kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Zamanlanmış E-posta Raporları
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={scheduledReports.enabled}
                  onChange={(e) =>
                    setScheduledReports({ ...scheduledReports, enabled: e.target.checked })
                  }
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                />
                <span className="font-semibold text-gray-700">
                  Otomatik rapor gönderimini aktifleştir
                </span>
              </label>
            </div>

            {scheduledReports.enabled && (
              <div className="pl-9 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gönderim Sıklığı
                  </label>
                  <select
                    value={scheduledReports.frequency}
                    onChange={(e) =>
                      setScheduledReports({ ...scheduledReports, frequency: e.target.value })
                    }
                    className="w-full max-w-md px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    <option value="daily">Günlük</option>
                    <option value="weekly">Haftalık</option>
                    <option value="monthly">Aylık</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alıcı E-posta Adresleri (virgülle ayırın)
                  </label>
                  <Input
                    type="text"
                    value={scheduledReports.emails}
                    onChange={(e) =>
                      setScheduledReports({ ...scheduledReports, emails: e.target.value })
                    }
                    placeholder="ornek@hastane.com, yonetici@hastane.com"
                    className="w-full border-2 border-gray-300 focus:border-red-500"
                  />
                </div>

                <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Zamanlama Kaydet
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      </div>
    
  )
}

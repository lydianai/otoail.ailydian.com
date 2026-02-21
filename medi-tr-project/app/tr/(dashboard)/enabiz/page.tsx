'use client'

import { useState } from 'react'
import {
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Upload,
  Download,
  Database,
  Shield,
  Activity,
  FileText,
  Users,
  TrendingUp,
  Server,
  Zap,
  Link as LinkIcon,
  Settings,
  Bell,
  Play,
  Pause,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Loader2,
  Send,
  Eye,
  Heart,
  Brain,
  Watch,
  Droplet,
  Stethoscope,
  Award,
  TrendingDown,
  Lightbulb,
  Target,
  Smartphone,
  Wifi as WifiIcon,
  BellRing,
  Activity as ActivityIcon,
  Thermometer,
  Moon,
  Footprints,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  sampleOrganDonations,
  sampleSmartAssistantAnalyses,
  sampleWearableDevices,
  getOrganDonationById,
  getOrganDonationsByStatus,
  getSmartAssistantAnalysisById,
  getWearableDeviceById,
  getWearableDevicesByType,
  getLatestMetricsForDevice,
  type OrganDonation,
  type SmartAssistantAnalysis,
  type WearableDevice,
  type WearableMetrics,
  type DonationStatus,
  type RiskLevel,
} from '@/lib/data/enabiz-2025-data'

// Sync Status Types
type SyncStatus = 'success' | 'failed' | 'pending' | 'syncing'
type RecordType = 'patient' | 'examination' | 'laboratory' | 'radiology' | 'prescription' | 'discharge'
type Priority = 'acil' | 'yuksek' | 'normal' | 'dusuk'

interface SyncHistory {
  id: string
  tarih: string
  saat: string
  gonderilenKayit: number
  basarili: number
  basarisiz: number
  sure: string
  durum: SyncStatus
  recordType: RecordType
}

interface PatientQueue {
  id: string
  hastAdi: string
  tcKimlik: string
  priority: Priority
  recordType: RecordType
  kayitTarihi: string
  missingFields: string[]
}

interface ErrorLog {
  id: string
  tarih: string
  saat: string
  hastAdi: string
  recordType: RecordType
  errorMessage: string
  retryCount: number
}

interface DataMapping {
  id: string
  label: string
  enabled: boolean
  fieldCount: number
}

// Mock Data
const syncHistoryData: SyncHistory[] = [
  {
    id: '1',
    tarih: '23.12.2025',
    saat: '14:35',
    gonderilenKayit: 127,
    basarili: 127,
    basarisiz: 0,
    sure: '2.3 sn',
    durum: 'success',
    recordType: 'patient',
  },
  {
    id: '2',
    tarih: '23.12.2025',
    saat: '14:20',
    gonderilenKayit: 89,
    basarili: 87,
    basarisiz: 2,
    sure: '3.1 sn',
    durum: 'success',
    recordType: 'laboratory',
  },
  {
    id: '3',
    tarih: '23.12.2025',
    saat: '14:05',
    gonderilenKayit: 156,
    basarili: 156,
    basarisiz: 0,
    sure: '4.2 sn',
    durum: 'success',
    recordType: 'prescription',
  },
  {
    id: '4',
    tarih: '23.12.2025',
    saat: '13:50',
    gonderilenKayit: 34,
    basarili: 34,
    basarisiz: 0,
    sure: '1.8 sn',
    durum: 'success',
    recordType: 'examination',
  },
  {
    id: '5',
    tarih: '23.12.2025',
    saat: '13:30',
    gonderilenKayit: 12,
    basarili: 10,
    basarisiz: 2,
    sure: '2.1 sn',
    durum: 'failed',
    recordType: 'discharge',
  },
  {
    id: '6',
    tarih: '23.12.2025',
    saat: '13:15',
    gonderilenKayit: 45,
    basarili: 0,
    basarisiz: 45,
    sure: '0.5 sn',
    durum: 'failed',
    recordType: 'radiology',
  },
]

const patientQueueData: PatientQueue[] = [
  {
    id: '1',
    hastAdi: 'Mehmet Yılmaz',
    tcKimlik: '12345678901',
    priority: 'acil',
    recordType: 'examination',
    kayitTarihi: '23.12.2025 14:45',
    missingFields: [],
  },
  {
    id: '2',
    hastAdi: 'Ayşe Demir',
    tcKimlik: '98765432109',
    priority: 'yuksek',
    recordType: 'laboratory',
    kayitTarihi: '23.12.2025 14:30',
    missingFields: ['Doktor Onayı'],
  },
  {
    id: '3',
    hastAdi: 'Ahmet Şahin',
    tcKimlik: '11223344556',
    priority: 'normal',
    recordType: 'prescription',
    kayitTarihi: '23.12.2025 14:15',
    missingFields: [],
  },
  {
    id: '4',
    hastAdi: 'Fatma Kaya',
    tcKimlik: '55667788990',
    priority: 'normal',
    recordType: 'radiology',
    kayitTarihi: '23.12.2025 14:00',
    missingFields: ['Rapor Onayı'],
  },
  {
    id: '5',
    hastAdi: 'Zeynep Arslan',
    tcKimlik: '99887766554',
    priority: 'dusuk',
    recordType: 'discharge',
    kayitTarihi: '23.12.2025 13:45',
    missingFields: ['Epikriz', 'Taburcu İzni'],
  },
]

const errorLogData: ErrorLog[] = [
  {
    id: '1',
    tarih: '23.12.2025',
    saat: '13:15',
    hastAdi: 'Ali Öztürk',
    recordType: 'radiology',
    errorMessage: 'SBÜ API bağlantı hatası - Connection timeout (30s exceeded)',
    retryCount: 3,
  },
  {
    id: '2',
    tarih: '23.12.2025',
    saat: '13:30',
    hastAdi: 'Elif Çelik',
    recordType: 'discharge',
    errorMessage: 'Eksik alan: Taburcu özeti doktor imzası gerekli',
    retryCount: 1,
  },
  {
    id: '3',
    tarih: '23.12.2025',
    saat: '14:20',
    hastAdi: 'Can Özdemir',
    recordType: 'laboratory',
    errorMessage: 'Veri formatı uyumsuzluğu: Tahlil sonuç değeri standart dışı',
    retryCount: 2,
  },
]

const dataMappingData: DataMapping[] = [
  { id: '1', label: 'Muayene Kayıtları', enabled: true, fieldCount: 12 },
  { id: '2', label: 'Tahlil Sonuçları', enabled: true, fieldCount: 8 },
  { id: '3', label: 'Görüntüleme Raporları', enabled: true, fieldCount: 10 },
  { id: '4', label: 'Reçete Bilgileri', enabled: true, fieldCount: 6 },
  { id: '5', label: 'Ameliyat Raporları', enabled: false, fieldCount: 15 },
  { id: '6', label: 'Taburcu Özetleri', enabled: true, fieldCount: 18 },
  { id: '7', label: 'Aşı Kayıtları', enabled: true, fieldCount: 5 },
  { id: '8', label: 'Kronik Hastalık Takibi', enabled: false, fieldCount: 9 },
]

const recordTypeLabels: Record<RecordType, string> = {
  patient: 'Hasta Bilgileri',
  examination: 'Muayene Kayıtları',
  laboratory: 'Laboratuvar Sonuçları',
  radiology: 'Radyoloji Raporları',
  prescription: 'Reçeteler',
  discharge: 'Taburcu Özetleri',
}

const priorityLabels: Record<Priority, string> = {
  acil: 'Acil',
  yuksek: 'Yüksek',
  normal: 'Normal',
  dusuk: 'Düşük',
}

export default function ENabizPage() {
  const [baglanti, setBaglanti] = useState<'bagli' | 'baglaniyor' | 'hata'>('bagli')
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [otomatikSenkronizasyon, setOtomatikSenkronizasyon] = useState(true)
  const [senkronizasyonSikligi, setSenkronizasyonSikligi] = useState<'hourly' | 'every4hours' | 'daily'>('hourly')
  const [activeTab, setActiveTab] = useState<'dashboard' | 'queue' | 'history' | 'errors' | 'settings' | 'organ-donation' | 'smart-assistant' | 'wearable-devices'>('dashboard')
  const [selectedHistoryStatus, setSelectedHistoryStatus] = useState<'all' | SyncStatus>('all')
  const [selectedRecordType, setSelectedRecordType] = useState<'all' | RecordType>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today')

  // Statistics
  const stats = {
    bugun: syncHistoryData.filter(s => s.tarih === '23.12.2025').reduce((sum, s) => sum + s.basarili, 0),
    buHafta: 4892,
    buAy: 18547,
    toplam: 156234,
    basariOrani: 98.3,
    bekleyen: patientQueueData.length,
  }

  const todayStats = {
    toplamKayit: syncHistoryData.reduce((sum, s) => sum + s.gonderilenKayit, 0),
    basarili: syncHistoryData.reduce((sum, s) => sum + s.basarili, 0),
    basarisiz: syncHistoryData.reduce((sum, s) => sum + s.basarisiz, 0),
  }

  const baglantiDurumRenkleri = {
    bagli: 'bg-green-100 text-green-700 border-green-300',
    baglaniyor: 'bg-amber-100 text-amber-700 border-amber-300',
    hata: 'bg-red-100 text-red-700 border-red-300',
  }

  const baglantiDurumIconlari = {
    bagli: <Wifi className="h-5 w-5" />,
    baglaniyor: <RefreshCw className="h-5 w-5 animate-spin" />,
    hata: <WifiOff className="h-5 w-5" />,
  }

  const baglantiDurumMetinleri = {
    bagli: 'Bağlantı Başarılı',
    baglaniyor: 'Bağlantı Kuruluyor...',
    hata: 'Bağlantı Başarısız',
  }

  const durumRenkleri = {
    success: 'bg-green-100 text-green-700 border-green-300',
    failed: 'bg-red-100 text-red-700 border-red-300',
    pending: 'bg-amber-100 text-amber-700 border-amber-300',
    syncing: 'bg-blue-100 text-blue-700 border-blue-300',
  }

  const durumIconlari = {
    success: <CheckCircle2 className="h-4 w-4" />,
    failed: <XCircle className="h-4 w-4" />,
    pending: <Clock className="h-4 w-4" />,
    syncing: <Loader2 className="h-4 w-4 animate-spin" />,
  }

  const priorityRenkleri = {
    acil: 'bg-red-100 text-red-700 border-red-300',
    yuksek: 'bg-orange-100 text-orange-700 border-orange-300',
    normal: 'bg-blue-100 text-blue-700 border-blue-300',
    dusuk: 'bg-gray-100 text-gray-700 border-gray-300',
  }

  const recordTypeColors = {
    patient: 'bg-purple-100 text-purple-700',
    examination: 'bg-blue-100 text-blue-700',
    laboratory: 'bg-green-100 text-green-700',
    radiology: 'bg-cyan-100 text-cyan-700',
    prescription: 'bg-pink-100 text-pink-700',
    discharge: 'bg-amber-100 text-amber-700',
  }

  const handleManualSync = () => {
    setIsSyncing(true)
    setSyncProgress(0)

    const interval = setInterval(() => {
      setSyncProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval)
        setIsSyncing(false)
        return 100
      }
      return prev + 10
      })
    }, 300)
  }

  const handleConnectionTest = () => {
    setBaglanti('baglaniyor')
    setTimeout(() => {
      setBaglanti('bagli')
    }, 2000)
  }

  const filteredHistory = syncHistoryData.filter(item => {
    const statusMatch = selectedHistoryStatus === 'all' || item.durum === selectedHistoryStatus
    const typeMatch = selectedRecordType === 'all' || item.recordType === selectedRecordType
    return statusMatch && typeMatch
  })

  const complianceScore = ((stats.basarili / (stats.basarili + todayStats.basarisiz)) * 100).toFixed(1)

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Database className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    e-Nabız Entegrasyonu
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">Sağlık Bakanlığı Ulusal Sağlık Veri Sistemi</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={cn('text-base px-4 py-2 font-bold border-2', baglantiDurumRenkleri[baglanti])}>
                {baglantiDurumIconlari[baglanti]}
                <span className="ml-2">{baglantiDurumMetinleri[baglanti]}</span>
              </Badge>
              <Button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Senkronize Ediliyor...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Şimdi Senkronize Et
                  </>
                )}
              </Button>
              <Button variant="outline" className="border-2">
                <Settings className="h-4 w-4 mr-2" />
                Ayarlar
              </Button>
            </div>
          </div>

          {/* Sync Progress Bar */}
          {isSyncing && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Senkronizasyon İlerliyor...</span>
                <span className="text-sm font-bold text-red-600">{syncProgress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-300 ease-out"
                  style={{ width: `${syncProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bugün</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.bugun.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-gray-600 mt-1">kayıt senkronize</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bu Hafta</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.buHafta.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-gray-600 mt-1">kayıt senkronize</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bu Ay</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.buAy.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-gray-600 mt-1">kayıt senkronize</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Database className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Toplam</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.toplam.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-gray-600 mt-1">toplam kayıt</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg shadow-green-500/30 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Başarı Oranı</span>
            </div>
            <p className="text-3xl font-bold">%{stats.basariOrani}</p>
            <p className="text-xs text-green-100 mt-1">genel performans</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-6 shadow-lg shadow-red-500/30 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Bekleyen</span>
            </div>
            <p className="text-3xl font-bold">{stats.bekleyen}</p>
            <p className="text-xs text-red-100 mt-1">senkronize edilecek</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex border-b-2 border-gray-100 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={cn(
                'flex-1 px-6 py-4 font-bold text-base transition-all whitespace-nowrap',
                activeTab === 'dashboard'
                  ? 'text-red-600 border-b-4 border-red-600 bg-red-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Activity className="h-5 w-5" />
                Durum Paneli
              </div>
            </button>
            <button
              onClick={() => setActiveTab('queue')}
              className={cn(
                'flex-1 px-6 py-4 font-bold text-base transition-all whitespace-nowrap',
                activeTab === 'queue'
                  ? 'text-red-600 border-b-4 border-red-600 bg-red-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Senkronizasyon Kuyruğu ({stats.bekleyen})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                'flex-1 px-6 py-4 font-bold text-base transition-all whitespace-nowrap',
                activeTab === 'history'
                  ? 'text-red-600 border-b-4 border-red-600 bg-red-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                Senkronizasyon Geçmişi
              </div>
            </button>
            <button
              onClick={() => setActiveTab('errors')}
              className={cn(
                'flex-1 px-6 py-4 font-bold text-base transition-all whitespace-nowrap',
                activeTab === 'errors'
                  ? 'text-red-600 border-b-4 border-red-600 bg-red-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Hata Logları ({errorLogData.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={cn(
                'flex-1 px-6 py-4 font-bold text-base transition-all whitespace-nowrap',
                activeTab === 'settings'
                  ? 'text-red-600 border-b-4 border-red-600 bg-red-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Settings className="h-5 w-5" />
                Ayarlar ve Yapılandırma
              </div>
            </button>
            <button
              onClick={() => setActiveTab('organ-donation')}
              className={cn(
                'flex-1 px-6 py-4 font-bold text-base transition-all whitespace-nowrap',
                activeTab === 'organ-donation'
                  ? 'text-red-600 border-b-4 border-red-600 bg-red-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                Organ Bağışı ({sampleOrganDonations.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('smart-assistant')}
              className={cn(
                'flex-1 px-6 py-4 font-bold text-base transition-all whitespace-nowrap',
                activeTab === 'smart-assistant'
                  ? 'text-red-600 border-b-4 border-red-600 bg-red-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Brain className="h-5 w-5" />
                Akıllı Asistan ({sampleSmartAssistantAnalyses.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('wearable-devices')}
              className={cn(
                'flex-1 px-6 py-4 font-bold text-base transition-all whitespace-nowrap',
                activeTab === 'wearable-devices'
                  ? 'text-red-600 border-b-4 border-red-600 bg-red-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Watch className="h-5 w-5" />
                Giyilebilir Cihazlar ({sampleWearableDevices.length})
              </div>
            </button>
          </div>

          <div className="p-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Connection Status Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">SBÜ API Bağlantı Testi</h3>
                      <p className="text-sm text-gray-600">e-Nabız sistem bağlantı durumu</p>
                    </div>
                    <Button
                      onClick={handleConnectionTest}
                      variant="outline"
                      className="border-2"
                      disabled={baglanti === 'baglaniyor'}
                    >
                      {baglanti === 'baglaniyor' ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Test Ediliyor...
                        </>
                      ) : (
                        <>
                          <Server className="h-4 w-4 mr-2" />
                          Bağlantıyı Test Et
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <LinkIcon className={cn('h-5 w-5', baglanti === 'bagli' ? 'text-green-600' : 'text-red-600')} />
                        <span className="text-sm font-semibold text-gray-700">Bağlantı Durumu</span>
                      </div>
                      <Badge className={cn('text-base px-3 py-1 border-2', baglantiDurumRenkleri[baglanti])}>
                        {baglantiDurumMetinleri[baglanti]}
                      </Badge>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Server className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700">API Endpoint</span>
                      </div>
                      <p className="text-xs font-mono text-gray-900 break-all">https://enabiz.saglik.gov.tr/api/v2</p>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700">Son Senkronizasyon</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">5 dakika önce</p>
                    </div>
                  </div>
                </div>

                {/* Today's Sync Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Upload className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-gray-900">Bugün Gönderilen</h4>
                    </div>
                    <p className="text-4xl font-bold text-blue-600">{todayStats.toplamKayit}</p>
                    <p className="text-sm text-gray-600 mt-1">toplam kayıt gönderildi</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border-2 border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="font-bold text-gray-900">Başarılı</h4>
                    </div>
                    <p className="text-4xl font-bold text-green-600">{todayStats.basarili}</p>
                    <p className="text-sm text-gray-600 mt-1">kayıt başarıyla senkronize</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border-2 border-red-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <h4 className="font-bold text-gray-900">Başarısız</h4>
                    </div>
                    <p className="text-4xl font-bold text-red-600">{todayStats.basarisiz}</p>
                    <p className="text-sm text-gray-600 mt-1">kayıt senkronize edilemedi</p>
                  </div>
                </div>

                {/* Compliance Score */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">e-Nabız Uyumluluk Skoru</h3>
                      <p className="text-sm text-gray-600">Zorunlu verilerin başarılı senkronizasyon oranı</p>
                    </div>
                    <div className="text-right">
                      <p className="text-6xl font-bold text-purple-600">%{complianceScore}</p>
                      <Badge className="bg-purple-200 text-purple-800 border-purple-300 mt-2">
                        {parseFloat(complianceScore) >= 95 ? 'Mükemmel' : parseFloat(complianceScore) >= 85 ? 'İyi' : 'Geliştirilmeli'}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 h-4 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-700"
                      style={{ width: `${complianceScore}%` }}
                    />
                  </div>
                </div>

                {/* Sync Types Breakdown */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b-2 border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">Senkronizasyon Tipleri</h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">Veri türüne göre senkronizasyon durumu</p>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(recordTypeLabels).map(([type, label]) => (
                      <div key={type} className={cn('rounded-xl p-4 border-2', recordTypeColors[type as RecordType])}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold">{label}</h4>
                          <FileText className="h-5 w-5" />
                        </div>
                        <p className="text-2xl font-bold">
                          {syncHistoryData
                            .filter(s => s.recordType === type)
                            .reduce((sum, s) => sum + s.basarili, 0)
                            .toLocaleString('tr-TR')}
                        </p>
                        <p className="text-xs mt-1 opacity-75">kayıt senkronize</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Patient Queue Tab */}
            {activeTab === 'queue' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Hasta Senkronizasyon Kuyruğu</h3>
                    <p className="text-gray-600">Senkronize edilmeyi bekleyen hasta kayıtları ve öncelik seviyeleri</p>
                  </div>
                  <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                    <Send className="h-4 w-4 mr-2" />
                    Tümünü Senkronize Et
                  </Button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
                  <div className="divide-y-2 divide-gray-100">
                    {patientQueueData.map((item) => (
                      <div key={item.id} className="p-6 hover:bg-red-50/30 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-lg font-bold text-gray-900">{item.hastAdi}</h4>
                              <Badge className={cn('font-semibold border-2', priorityRenkleri[item.priority])}>
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {priorityLabels[item.priority]}
                              </Badge>
                              <Badge className={cn('font-semibold', recordTypeColors[item.recordType])}>
                                {recordTypeLabels[item.recordType]}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600 font-semibold">TC Kimlik:</span>
                                <p className="font-bold text-gray-900 font-mono">{item.tcKimlik}</p>
                              </div>
                              <div>
                                <span className="text-gray-600 font-semibold">Kayıt Tarihi:</span>
                                <p className="font-bold text-gray-900">{item.kayitTarihi}</p>
                              </div>
                              <div>
                                <span className="text-gray-600 font-semibold">Durum:</span>
                                <p className="font-bold text-amber-600">Kuyrukta Bekliyor</p>
                              </div>
                              <div>
                                <span className="text-gray-600 font-semibold">Kayıt Tipi:</span>
                                <p className="font-bold text-gray-900">{recordTypeLabels[item.recordType]}</p>
                              </div>
                            </div>

                            {item.missingFields.length > 0 && (
                              <div className="mt-4 p-3 bg-amber-50 border-2 border-amber-200 rounded-xl">
                                <div className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="text-xs font-semibold text-amber-700">Eksik Alanlar:</span>
                                    <p className="text-sm text-amber-900 mt-1">{item.missingFields.join(', ')}</p>
                                    <p className="text-xs text-amber-700 mt-1">Bu alanlar tamamlanmadan senkronizasyon yapılamaz</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Button size="sm" variant="outline" className="border-2">
                              <Eye className="h-4 w-4 mr-1" />
                              Detay
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700"
                              disabled={item.missingFields.length > 0}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Gönder
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sync History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Senkronizasyon Geçmişi</h3>
                    <p className="text-gray-600">Geçmiş senkronizasyon işlemlerinin detaylı kayıtları</p>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Tarih Aralığı</label>
                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value as any)}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="today">Bugün</option>
                        <option value="week">Bu Hafta</option>
                        <option value="month">Bu Ay</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Durum</label>
                      <select
                        value={selectedHistoryStatus}
                        onChange={(e) => setSelectedHistoryStatus(e.target.value as any)}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="all">Tümü</option>
                        <option value="success">Başarılı</option>
                        <option value="failed">Başarısız</option>
                        <option value="pending">Devam Ediyor</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Kayıt Türü</label>
                      <select
                        value={selectedRecordType}
                        onChange={(e) => setSelectedRecordType(e.target.value as any)}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="all">Tümü</option>
                        {Object.entries(recordTypeLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Arama</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Ara..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* History Table */}
                <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b-2 border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Tarih</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Saat</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Kayıt Türü</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Gönderilen</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Başarılı</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Başarısız</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Süre</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Durum</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-gray-100">
                        {filteredHistory.map((item) => (
                          <tr key={item.id} className="hover:bg-red-50/30 transition-colors">
                            <td className="px-6 py-4">
                              <span className="font-bold text-gray-900">{item.tarih}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-semibold text-gray-900">{item.saat}</span>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={cn('font-semibold', recordTypeColors[item.recordType])}>
                                {recordTypeLabels[item.recordType]}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="font-bold text-gray-900">{item.gonderilenKayit}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="font-bold text-green-600">{item.basarili}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="font-bold text-red-600">{item.basarisiz}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="font-semibold text-gray-900">{item.sure}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <Badge className={cn('font-semibold border-2', durumRenkleri[item.durum])}>
                                {durumIconlari[item.durum]}
                                <span className="ml-1">
                                  {item.durum === 'success' ? 'Başarılı' :
                                   item.durum === 'failed' ? 'Başarısız' :
                                   item.durum === 'pending' ? 'Bekliyor' : 'Devam Ediyor'}
                                </span>
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Error Logs Tab */}
            {activeTab === 'errors' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Hata Logları</h3>
                    <p className="text-gray-600">Başarısız senkronizasyon işlemleri ve hata detayları</p>
                  </div>
                  <Button variant="outline" className="border-2">
                    <Download className="h-4 w-4 mr-2" />
                    Logları İndir
                  </Button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
                  <div className="divide-y-2 divide-gray-100">
                    {errorLogData.map((error) => (
                      <div key={error.id} className="p-6 hover:bg-red-50/30 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-red-100 rounded-xl">
                            <XCircle className="h-6 w-6 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-bold text-gray-900">{error.hastAdi}</h4>
                              <Badge className={cn('font-semibold', recordTypeColors[error.recordType])}>
                                {recordTypeLabels[error.recordType]}
                              </Badge>
                              <Badge className="bg-red-100 text-red-700 border-red-300 font-semibold border-2">
                                {error.retryCount} Deneme
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                              <div>
                                <span className="text-gray-600 font-semibold">Tarih/Saat:</span>
                                <p className="font-bold text-gray-900">{error.tarih} {error.saat}</p>
                              </div>
                              <div>
                                <span className="text-gray-600 font-semibold">Kayıt Türü:</span>
                                <p className="font-bold text-gray-900">{recordTypeLabels[error.recordType]}</p>
                              </div>
                            </div>

                            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <span className="text-xs font-semibold text-red-700">Hata Mesajı:</span>
                                  <p className="text-sm text-red-900 mt-1">{error.errorMessage}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mt-4">
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Yeniden Dene
                              </Button>
                              <Button size="sm" variant="outline" className="border-2">
                                <Eye className="h-4 w-4 mr-1" />
                                Detayları Görüntüle
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ayarlar ve Yapılandırma</h3>
                  <p className="text-gray-600">e-Nabız senkronizasyon ayarları ve veri eşleme yapılandırması</p>
                </div>

                {/* Auto-sync Settings */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">Otomatik Senkronizasyon</h4>
                      <p className="text-sm text-gray-600">Belirlenen aralıklarla otomatik veri aktarımı</p>
                    </div>
                    <button
                      onClick={() => setOtomatikSenkronizasyon(!otomatikSenkronizasyon)}
                      className={cn(
                        'relative w-16 h-8 rounded-full transition-colors',
                        otomatikSenkronizasyon ? 'bg-green-500' : 'bg-gray-300'
                      )}
                    >
                      <div className={cn(
                        'absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform',
                        otomatikSenkronizasyon ? 'translate-x-8' : 'translate-x-0'
                      )} />
                    </button>
                  </div>

                  {otomatikSenkronizasyon && (
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">Senkronizasyon Sıklığı</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          onClick={() => setSenkronizasyonSikligi('hourly')}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all',
                            senkronizasyonSikligi === 'hourly'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          )}
                        >
                          <h5 className="font-bold text-gray-900 mb-1">Her Saat</h5>
                          <p className="text-sm text-gray-600">Saatte bir otomatik senkronizasyon</p>
                        </button>
                        <button
                          onClick={() => setSenkronizasyonSikligi('every4hours')}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all',
                            senkronizasyonSikligi === 'every4hours'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          )}
                        >
                          <h5 className="font-bold text-gray-900 mb-1">Her 4 Saat</h5>
                          <p className="text-sm text-gray-600">4 saatte bir otomatik senkronizasyon</p>
                        </button>
                        <button
                          onClick={() => setSenkronizasyonSikligi('daily')}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all',
                            senkronizasyonSikligi === 'daily'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          )}
                        >
                          <h5 className="font-bold text-gray-900 mb-1">Günde 1 Kez</h5>
                          <p className="text-sm text-gray-600">Günde bir kez otomatik senkronizasyon</p>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Data Mapping Configuration */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Veri Eşleme Yapılandırması</h4>
                    <p className="text-sm text-gray-600">e-Nabız'a hangi veri türlerinin senkronize edileceğini belirleyin</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dataMappingData.map((mapping) => (
                      <div
                        key={mapping.id}
                        className={cn(
                          'p-4 rounded-xl border-2 transition-all',
                          mapping.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h5 className="font-bold text-gray-900">{mapping.label}</h5>
                              <Badge className={cn(
                                'text-xs',
                                mapping.enabled ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'
                              )}>
                                {mapping.fieldCount} Alan
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {mapping.enabled ? 'Aktif olarak senkronize ediliyor' : 'Senkronizasyon devre dışı'}
                            </p>
                          </div>
                          <button
                            className={cn(
                              'relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4',
                              mapping.enabled ? 'bg-green-500' : 'bg-gray-300'
                            )}
                          >
                            <div className={cn(
                              'absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform',
                              mapping.enabled ? 'translate-x-6' : 'translate-x-0'
                            )} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Checker */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500 rounded-xl">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-amber-900 mb-2">Uyumluluk Kontrolü</h4>
                      <p className="text-sm text-amber-800 mb-4">
                        Senkronizasyon öncesi tüm zorunlu alanların dolu olup olmadığı otomatik olarak kontrol edilir.
                        Eksik alanlar tespit edilirse uyarı gösterilir ve kayıt senkronize edilmez.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-xs font-semibold text-gray-700">Kontrol Edilen</span>
                          </div>
                          <p className="text-xl font-bold text-gray-900">127</p>
                        </div>
                        <div className="bg-white rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <span className="text-xs font-semibold text-gray-700">Eksik Alan</span>
                          </div>
                          <p className="text-xl font-bold text-amber-600">3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KVKK & Security */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-500 rounded-xl">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-purple-900 mb-2">KVKK Uyumluluk</h4>
                        <p className="text-sm text-purple-800">
                          Tüm hasta verileri KVKK kapsamında şifrelenerek e-Nabız sistemine aktarılmaktadır.
                          Veri transferi SSL/TLS protokolü ile güvenli kanal üzerinden gerçekleştirilir.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-500 rounded-xl">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-blue-900 mb-2">SBÜ Sertifikası</h4>
                        <p className="text-sm text-blue-800 mb-2">
                          Sağlık Bakanlığı tarafından verilen e-Nabız entegrasyon sertifikası aktif durumda.
                        </p>
                        <Badge className="bg-green-100 text-green-700 border-green-300 border-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Sertifika Geçerli - 31.12.2026
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organ Donation Tab */}
            {activeTab === 'organ-donation' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Organ Bağışı Yönetimi</h3>
                    <p className="text-gray-600">Hasta organ bağış durumları ve e-Nabız senkronizasyon takibi</p>
                  </div>
                  <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                    <Heart className="h-4 w-4 mr-2" />
                    Yeni Bağış Kaydı
                  </Button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900">Bağışçı</h4>
                    </div>
                    <p className="text-4xl font-bold text-green-600">
                      {sampleOrganDonations.filter(d => d.bagisciDurumu === 'Bağışçı').length}
                    </p>
                    <p className="text-sm text-green-700 mt-1">aktif bağışçı</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-900">Potansiyel</h4>
                    </div>
                    <p className="text-4xl font-bold text-blue-600">
                      {sampleOrganDonations.filter(d => d.bagisciDurumu === 'Potansiyel Bağışçı').length}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">potansiyel bağışçı</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <Database className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900">Senkronize</h4>
                    </div>
                    <p className="text-4xl font-bold text-purple-600">
                      {sampleOrganDonations.filter(d => d.enabizSenkronizasyonDurumu === 'Synced').length}
                    </p>
                    <p className="text-sm text-purple-700 mt-1">e-Nabız'da güncel</p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-amber-500 rounded-lg">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-amber-900">Bekliyor</h4>
                    </div>
                    <p className="text-4xl font-bold text-amber-600">
                      {sampleOrganDonations.filter(d => d.enabizSenkronizasyonDurumu === 'Pending').length}
                    </p>
                    <p className="text-sm text-amber-700 mt-1">senkronize edilecek</p>
                  </div>
                </div>

                {/* Patient Cards */}
                <div className="space-y-4">
                  {sampleOrganDonations.map((donation) => (
                    <div key={donation.id} className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-xl font-bold text-gray-900">{donation.hastaAdi} {donation.hastaSoyadi}</h4>
                              <Badge className={cn(
                                'font-semibold border-2',
                                donation.bagisciDurumu === 'Bağışçı' ? 'bg-green-100 text-green-700 border-green-300' :
                                donation.bagisciDurumu === 'Potansiyel Bağışçı' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                                'bg-gray-100 text-gray-700 border-gray-300'
                              )}>
                                <Heart className="h-3 w-3 mr-1" />
                                {donation.bagisciDurumu}
                              </Badge>
                              <Badge className={cn(
                                'font-semibold border-2',
                                donation.enabizSenkronizasyonDurumu === 'Synced' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                                donation.enabizSenkronizasyonDurumu === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-300' :
                                'bg-red-100 text-red-700 border-red-300'
                              )}>
                                <Database className="h-3 w-3 mr-1" />
                                {donation.enabizSenkronizasyonDurumu === 'Synced' ? 'Senkronize' :
                                 donation.enabizSenkronizasyonDurumu === 'Pending' ? 'Bekliyor' : 'Hata'}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <span className="text-gray-600 font-semibold">TC Kimlik:</span>
                                <p className="font-bold text-gray-900 font-mono">{donation.tcKimlik}</p>
                              </div>
                              <div>
                                <span className="text-gray-600 font-semibold">Yaş:</span>
                                <p className="font-bold text-gray-900">{donation.yas} yaşında</p>
                              </div>
                              <div>
                                <span className="text-gray-600 font-semibold">Kan Grubu:</span>
                                <p className="font-bold text-gray-900">{donation.kanGrubu}</p>
                              </div>
                              <div>
                                <span className="text-gray-600 font-semibold">Kayıt Tarihi:</span>
                                <p className="font-bold text-gray-900">{new Date(donation.bagisKayitTarihi).toLocaleDateString('tr-TR')}</p>
                              </div>
                            </div>

                            {/* Organ Consents */}
                            <div className="mb-4">
                              <h5 className="text-sm font-semibold text-gray-700 mb-2">Onaylanan Organlar:</h5>
                              <div className="flex flex-wrap gap-2">
                                {donation.organOnaylari
                                  .filter(organ => organ.consent)
                                  .map((organ, idx) => (
                                    <Badge key={idx} className="bg-green-100 text-green-700 border-green-300 border-2">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      {organ.organ}
                                    </Badge>
                                  ))}
                                {donation.organOnaylari.filter(organ => organ.consent).length === 0 && (
                                  <span className="text-sm text-gray-500">Henüz organ onayı yok</span>
                                )}
                              </div>
                            </div>

                            {/* Legal Representative */}
                            {donation.yakinTemsilci && (
                              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                                <div className="flex items-start gap-2">
                                  <Users className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="text-xs font-semibold text-blue-700">Yakın Temsilci:</span>
                                    <p className="text-sm text-blue-900 mt-1">
                                      {donation.yakinTemsilci.adSoyad} ({donation.yakinTemsilci.yakinlik})
                                      {donation.yakinTemsilci.onayVerdi && (
                                        <Badge className="ml-2 bg-green-100 text-green-700 border-green-300">
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                          Onay Verdi
                                        </Badge>
                                      )}
                                    </p>
                                    <p className="text-xs text-blue-700 mt-1">Tel: {donation.yakinTemsilci.telefonNumarasi}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Button size="sm" variant="outline" className="border-2">
                              <Eye className="h-4 w-4 mr-1" />
                              Detay
                            </Button>
                            <Button
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700"
                              disabled={donation.enabizSenkronizasyonDurumu === 'Synced'}
                            >
                              <Database className="h-4 w-4 mr-1" />
                              e-Nabız'a Gönder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Smart Assistant Tab */}
            {activeTab === 'smart-assistant' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Lydian AI Sağlık Asistanı</h3>
                    <p className="text-gray-600">AI destekli sağlık risk analizi ve kişiselleştirilmiş öneriler</p>
                  </div>
                  <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                    <Brain className="h-4 w-4 mr-2" />
                    Yeni Analiz Başlat
                  </Button>
                </div>

                {/* Analysis Cards */}
                <div className="space-y-6">
                  {sampleSmartAssistantAnalyses.map((analysis) => (
                    <div key={analysis.id} className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-2xl font-bold mb-1">{analysis.hastaAdi} {analysis.hastaSoyadi}</h4>
                            <p className="text-purple-100">TC: {analysis.tcKimlik} • Analiz Tarihi: {new Date(analysis.analizTarihi).toLocaleDateString('tr-TR')}</p>
                          </div>
                          <div className="text-right">
                            <div className={cn(
                              'inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold border-2',
                              analysis.genelRiskDurumu === 'Düşük' ? 'bg-green-100 text-green-700 border-green-300' :
                              analysis.genelRiskDurumu === 'Orta' ? 'bg-amber-100 text-amber-700 border-amber-300' :
                              'bg-red-100 text-red-700 border-red-300'
                            )}>
                              {analysis.genelRiskDurumu === 'Düşük' ? <TrendingDown className="h-5 w-5" /> :
                               analysis.genelRiskDurumu === 'Orta' ? <Target className="h-5 w-5" /> :
                               <TrendingUp className="h-5 w-5" />}
                              {analysis.genelRiskDurumu} Risk
                            </div>
                            <p className="text-xs text-purple-100 mt-2">AI Güvenilirlik: %{(analysis.modelGuvenilirlik * 100).toFixed(0)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Risk Scores */}
                        <div className="mb-6">
                          <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-purple-600" />
                            Sağlık Risk Skorları
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(analysis.riskSkorlari).map(([key, value]) => (
                              <div key={key} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                                <div className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                                  {key === 'diyabet' ? 'Diyabet' :
                                   key === 'hipertansiyon' ? 'Hipertansiyon' :
                                   key === 'kardiyovaskuler' ? 'Kardiyovasküler' :
                                   key === 'obezite' ? 'Obezite' :
                                   key === 'kronikBobrekHastaligi' ? 'Böbrek' :
                                   key === 'kanser' ? 'Kanser' :
                                   key === 'solunum' ? 'Solunum' :
                                   'Mental Sağlık'}
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={cn(
                                      'h-full transition-all',
                                      value < 30 ? 'bg-green-500' :
                                      value < 60 ? 'bg-amber-500' :
                                      'bg-red-500'
                                    )}
                                    style={{ width: `${value}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div className="mb-6">
                          <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-amber-600" />
                            Kişiselleştirilmiş Öneriler ({analysis.oneriler.length})
                          </h5>
                          <div className="space-y-3">
                            {analysis.oneriler.map((oneri, idx) => (
                              <div key={idx} className={cn(
                                'p-4 rounded-xl border-2',
                                oneri.oncelik === 'Yüksek' ? 'bg-red-50 border-red-200' :
                                oneri.oncelik === 'Orta' ? 'bg-amber-50 border-amber-200' :
                                'bg-blue-50 border-blue-200'
                              )}>
                                <div className="flex items-start gap-3">
                                  <div className={cn(
                                    'p-2 rounded-lg',
                                    oneri.kategori === 'Diyet' ? 'bg-green-100' :
                                    oneri.kategori === 'Egzersiz' ? 'bg-blue-100' :
                                    oneri.kategori === 'İlaç Tedavisi' ? 'bg-purple-100' :
                                    oneri.kategori === 'Yaşam Tarzı' ? 'bg-amber-100' :
                                    oneri.kategori === 'Doktor Kontrolü' ? 'bg-red-100' :
                                    'bg-gray-100'
                                  )}>
                                    {oneri.kategori === 'Diyet' ? <Droplet className="h-5 w-5 text-green-600" /> :
                                     oneri.kategori === 'Egzersiz' ? <ActivityIcon className="h-5 w-5 text-blue-600" /> :
                                     oneri.kategori === 'İlaç Tedavisi' ? <Stethoscope className="h-5 w-5 text-purple-600" /> :
                                     oneri.kategori === 'Doktor Kontrolü' ? <AlertCircle className="h-5 w-5 text-red-600" /> :
                                     <Lightbulb className="h-5 w-5 text-amber-600" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h6 className="font-bold text-gray-900">{oneri.baslik}</h6>
                                      <Badge className={cn(
                                        'text-xs',
                                        oneri.oncelik === 'Yüksek' ? 'bg-red-100 text-red-700' :
                                        oneri.oncelik === 'Orta' ? 'bg-amber-100 text-amber-700' :
                                        'bg-blue-100 text-blue-700'
                                      )}>
                                        {oneri.oncelik} Öncelik
                                      </Badge>
                                      <Badge className="text-xs bg-purple-100 text-purple-700">
                                        {oneri.kategori}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">{oneri.aciklama}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                      <span>Beklenen Etki: {oneri.beklenenEtki}</span>
                                      <span>•</span>
                                      <span>Zaman Çerçevesi: {oneri.zamanCercevesi}</span>
                                      <span>•</span>
                                      <span className="flex items-center gap-1">
                                        <Award className="h-3 w-3" />
                                        %{(oneri.uygulanmaOlasirigi * 100).toFixed(0)} Uygulanabilirlik
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Data Sources & AI Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                            <h6 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              Veri Kaynakları ({analysis.veriKaynaklari.length})
                            </h6>
                            <div className="flex flex-wrap gap-2">
                              {analysis.veriKaynaklari.map((kaynak, idx) => (
                                <Badge key={idx} className="bg-blue-100 text-blue-700">
                                  {kaynak}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                            <h6 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                              <Brain className="h-4 w-4" />
                              AI Model Bilgisi
                            </h6>
                            <p className="text-sm text-purple-800 mb-1">Model: {analysis.kullanilianAIModel}</p>
                            <p className="text-sm text-purple-800">Versiyon: {analysis.modelVersionu} • Güvenilirlik: %{(analysis.modelGuvenilirlik * 100).toFixed(1)}</p>
                            <p className="text-xs text-purple-700 mt-2">Son Güncelleme: {new Date(analysis.sonGuncelleme).toLocaleDateString('tr-TR')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wearable Devices Tab */}
            {activeTab === 'wearable-devices' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Giyilebilir Cihaz Entegrasyonu</h3>
                    <p className="text-gray-600">Akıllı saat ve sağlık cihazları verilerinin gerçek zamanlı takibi</p>
                  </div>
                  <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                    <Watch className="h-4 w-4 mr-2" />
                    Yeni Cihaz Bağla
                  </Button>
                </div>

                {/* Device Cards */}
                <div className="space-y-6">
                  {sampleWearableDevices.map((device) => {
                    const latestMetrics = getLatestMetricsForDevice(device.cihazId)
                    return (
                      <div key={device.cihazId} className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
                        {/* Device Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-white/20 rounded-xl">
                                <Watch className="h-8 w-8 text-white" />
                              </div>
                              <div>
                                <h4 className="text-2xl font-bold mb-1">{device.cihazAdi}</h4>
                                <p className="text-blue-100">
                                  {device.hastaAdi} {device.hastaSoyadi} • {device.cihazTipi}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={cn(
                                'border-2 font-bold',
                                device.aktif ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-700 border-gray-300'
                              )}>
                                <WifiIcon className="h-3 w-3 mr-1" />
                                {device.aktif ? 'Aktif' : 'Pasif'}
                              </Badge>
                              <p className="text-xs text-blue-100 mt-2">Son Senkronizasyon: {new Date(device.sonSenkronizasyonZamani).toLocaleString('tr-TR')}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          {latestMetrics ? (
                            <>
                              {/* Today's Metrics Summary */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border-2 border-red-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Heart className="h-5 w-5 text-red-600" />
                                    <span className="text-xs font-semibold text-red-900">Kalp Atışı</span>
                                  </div>
                                  <p className="text-3xl font-bold text-red-600">{latestMetrics.kalpAtisi.ortalama}</p>
                                  <p className="text-xs text-red-700 mt-1">bpm (ortalama)</p>
                                  <p className="text-xs text-red-700">Min: {latestMetrics.kalpAtisi.min} | Max: {latestMetrics.kalpAtisi.max}</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Footprints className="h-5 w-5 text-purple-600" />
                                    <span className="text-xs font-semibold text-purple-900">Adım Sayısı</span>
                                  </div>
                                  <p className="text-3xl font-bold text-purple-600">{latestMetrics.adimSayisi.toLocaleString('tr-TR')}</p>
                                  <p className="text-xs text-purple-700 mt-1">adım</p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <ActivityIcon className="h-5 w-5 text-green-600" />
                                    <span className="text-xs font-semibold text-green-900">Kalori</span>
                                  </div>
                                  <p className="text-3xl font-bold text-green-600">{latestMetrics.yakilanKalori}</p>
                                  <p className="text-xs text-green-700 mt-1">kcal yakıldı</p>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <ActivityIcon className="h-5 w-5 text-blue-600" />
                                    <span className="text-xs font-semibold text-blue-900">Aktivite</span>
                                  </div>
                                  <p className="text-3xl font-bold text-blue-600">{latestMetrics.aktifDakikalar}</p>
                                  <p className="text-xs text-blue-700 mt-1">aktif dakika</p>
                                </div>
                              </div>

                              {/* Blood Pressure */}
                              {latestMetrics.tansiyon && latestMetrics.tansiyon.olcumler.length > 0 && (
                                <div className="mb-6">
                                  <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-red-600" />
                                    Tansiyon Ölçümleri
                                  </h5>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {latestMetrics.tansiyon.olcumler.slice(0, 3).map((olcum, idx) => (
                                      <div key={idx} className="bg-red-50 rounded-xl p-3 border-2 border-red-200">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-2xl font-bold text-red-600">{olcum.sistolik}/{olcum.diyastolik}</p>
                                            <p className="text-xs text-red-700">mmHg • Nabız: {olcum.nabiz} bpm</p>
                                          </div>
                                          <span className="text-xs text-gray-600">{new Date(olcum.zaman).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Blood Glucose */}
                              {latestMetrics.kanSekeri && latestMetrics.kanSekeri.olcumler.length > 0 && (
                                <div className="mb-6">
                                  <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Droplet className="h-5 w-5 text-blue-600" />
                                    Kan Şekeri Ölçümleri
                                  </h5>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {latestMetrics.kanSekeri.olcumler.slice(0, 3).map((olcum, idx) => (
                                      <div key={idx} className="bg-blue-50 rounded-xl p-3 border-2 border-blue-200">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-2xl font-bold text-blue-600">{olcum.deger}</p>
                                            <p className="text-xs text-blue-700">mg/dL • {olcum.durum}</p>
                                          </div>
                                          <span className="text-xs text-gray-600">{new Date(olcum.zaman).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Oxygen Saturation */}
                              {latestMetrics.oksijenSaturasyonu && latestMetrics.oksijenSaturasyonu.olcumler.length > 0 && (
                                <div className="mb-6">
                                  <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <ActivityIcon className="h-5 w-5 text-cyan-600" />
                                    Oksijen Saturasyonu
                                  </h5>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {latestMetrics.oksijenSaturasyonu.olcumler.slice(0, 3).map((olcum, idx) => (
                                      <div key={idx} className="bg-cyan-50 rounded-xl p-3 border-2 border-cyan-200">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-2xl font-bold text-cyan-600">%{olcum.deger}</p>
                                            <p className="text-xs text-cyan-700">SpO2</p>
                                          </div>
                                          <span className="text-xs text-gray-600">{new Date(olcum.zaman).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Sleep Data */}
                              {latestMetrics.uykuVerisi && (
                                <div className="mb-6">
                                  <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Moon className="h-5 w-5 text-indigo-600" />
                                    Uyku Analizi
                                  </h5>
                                  <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      <div>
                                        <span className="text-xs font-semibold text-indigo-700">Toplam Uyku</span>
                                        <p className="text-2xl font-bold text-indigo-600">{latestMetrics.uykuVerisi.toplamUykuSuresi}</p>
                                        <p className="text-xs text-indigo-700">saat</p>
                                      </div>
                                      <div>
                                        <span className="text-xs font-semibold text-indigo-700">Derin Uyku</span>
                                        <p className="text-2xl font-bold text-indigo-600">{latestMetrics.uykuVerisi.derinUykuSuresi}</p>
                                        <p className="text-xs text-indigo-700">saat</p>
                                      </div>
                                      <div>
                                        <span className="text-xs font-semibold text-indigo-700">REM</span>
                                        <p className="text-2xl font-bold text-indigo-600">{latestMetrics.uykuVerisi.remUykuSuresi}</p>
                                        <p className="text-xs text-indigo-700">saat</p>
                                      </div>
                                      <div>
                                        <span className="text-xs font-semibold text-indigo-700">Uyku Kalitesi</span>
                                        <p className="text-2xl font-bold text-indigo-600">{latestMetrics.uykuVerisi.uykuKalitesi}%</p>
                                        <p className="text-xs text-indigo-700">kalite skoru</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Anomalies */}
                              {latestMetrics.anomaliler.length > 0 && (
                                <div>
                                  <h5 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <BellRing className="h-5 w-5 text-orange-600" />
                                    Tespit Edilen Anomaliler ({latestMetrics.anomaliler.length})
                                  </h5>
                                  <div className="space-y-2">
                                    {latestMetrics.anomaliler.map((anomali, idx) => (
                                      <div key={idx} className={cn(
                                        'p-4 rounded-xl border-2',
                                        anomali.ciddiyet === 'Kritik' ? 'bg-red-50 border-red-200' :
                                        anomali.ciddiyet === 'Yüksek' ? 'bg-orange-50 border-orange-200' :
                                        anomali.ciddiyet === 'Orta' ? 'bg-amber-50 border-amber-200' :
                                        'bg-yellow-50 border-yellow-200'
                                      )}>
                                        <div className="flex items-start gap-3">
                                          <AlertTriangle className={cn(
                                            'h-5 w-5 mt-0.5',
                                            anomali.ciddiyet === 'Kritik' ? 'text-red-600' :
                                            anomali.ciddiyet === 'Yüksek' ? 'text-orange-600' :
                                            anomali.ciddiyet === 'Orta' ? 'text-amber-600' :
                                            'text-yellow-600'
                                          )} />
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                              <h6 className="font-bold text-gray-900">{anomali.tip}</h6>
                                              <Badge className={cn(
                                                anomali.ciddiyet === 'Kritik' ? 'bg-red-100 text-red-700' :
                                                anomali.ciddiyet === 'Yüksek' ? 'bg-orange-100 text-orange-700' :
                                                anomali.ciddiyet === 'Orta' ? 'bg-amber-100 text-amber-700' :
                                                'bg-yellow-100 text-yellow-700'
                                              )}>
                                                {anomali.ciddiyet}
                                              </Badge>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-1">{anomali.aciklama}</p>
                                            <p className="text-xs text-gray-600">
                                              {new Date(anomali.tesbitZamani).toLocaleString('tr-TR')} • {anomali.onerilenAksiyonlar.join(', ')}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <Watch className="h-12 w-12 mx-auto mb-3 opacity-50" />
                              <p>Bu cihaz için henüz veri yok</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      </div>

  )
}

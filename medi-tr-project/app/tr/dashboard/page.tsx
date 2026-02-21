'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Activity,
  Users,
  Bed,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Clock,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Heart,
  Stethoscope,
  Ambulance,
  Building2,
  UserCheck,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import DemoBanner from '@/components/DemoBanner'
import {
  generatePatientDataTR as generatePatientData,
  generateBedCapacityTR as generateBedCapacity,
  generateStaffingDataTR as generateStaffingData,
  getClinicalMetricsTR as getClinicalMetrics,
  getFinancialMetricsTR as getFinancialMetrics,
  generateAIInsightsTR as generateAIInsights,
  formatCurrencyTR as formatCurrency,
  formatPercentage,
  timeAgoTR as timeAgo,
  type PatientData,
  type BedCapacity,
  type StaffingData,
  type ClinicalMetrics,
  type FinancialMetrics,
  type AIInsight,
} from '@/lib/data/dashboard-data-tr'

interface User {
  id: string
  email: string
  name: string
  role: string
}

export default function EnterpriseDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Real-time data states
  const [patients, setPatients] = useState<PatientData[]>([])
  const [bedCapacity, setBedCapacity] = useState<BedCapacity[]>([])
  const [staffing, setStaffing] = useState<StaffingData[]>([])
  const [clinicalMetrics, setClinicalMetrics] = useState<ClinicalMetrics | null>(null)
  const [financialMetrics, setFinancialMetrics] = useState<FinancialMetrics | null>(null)
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('ghp_token')
    const userData = localStorage.getItem('ghp_user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))

    // Initialize data
    setPatients(generatePatientData())
    setBedCapacity(generateBedCapacity())
    setStaffing(generateStaffingData())
    setClinicalMetrics(getClinicalMetrics())
    setFinancialMetrics(getFinancialMetrics())
    setAiInsights(generateAIInsights())

    // Update time every second
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000)

    // Simulate real-time data updates every 5 seconds
    const dataInterval = setInterval(() => {
      setPatients(generatePatientData())
      setBedCapacity(generateBedCapacity())
      setClinicalMetrics(getClinicalMetrics())
    }, 5000)

    return () => {
      clearInterval(clockInterval)
      clearInterval(dataInterval)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('ghp_token')
    localStorage.removeItem('ghp_user')
    router.push('/login')
  }

  if (!user || !clinicalMetrics || !financialMetrics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Kurumsal Panel Yükleniyor...</p>
        </div>
      </div>
    )
  }

  const criticalPatients = patients.filter(p => p.severity === 'critical')
  const seriousPatients = patients.filter(p => p.severity === 'serious')
  const totalBeds = bedCapacity.reduce((sum, dept) => sum + dept.totalBeds, 0)
  const occupiedBeds = bedCapacity.reduce((sum, dept) => sum + dept.occupiedBeds, 0)
  const bedUtilization = (occupiedBeds / totalBeds) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Demo Banner */}
      <DemoBanner language="tr" />

      {/* Premium Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Activity className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Kontrol Merkezi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">Kurumsal Sağlık Operasyonları Panosu</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-4 mr-4">
                <div className="flex items-center gap-2 bg-gradient-to-br from-red-50 to-red-100 px-4 py-3 rounded-xl border-2 border-red-200">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span className="font-mono text-base font-bold text-gray-900">{currentTime.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-br from-green-50 to-green-100 px-4 py-3 rounded-xl border-2 border-green-200">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-gray-900">{patients.length} Hasta</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-br from-orange-50 to-orange-100 px-4 py-3 rounded-xl border-2 border-orange-200">
                  <Bed className="h-5 w-5 text-orange-600" />
                  <span className="font-bold text-gray-900">{formatPercentage(bedUtilization, 0)} Doluluk</span>
                </div>
              </div>
              <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-all border-2 border-gray-200">
                <Bell className="h-6 w-6 text-gray-700" />
                <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-xl transition-all border-2 border-gray-200">
                <Settings className="h-6 w-6 text-gray-700" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l-2 border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600 font-semibold">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-3 hover:bg-red-100 rounded-xl transition-all border-2 border-gray-200 hover:border-red-300"
                >
                  <LogOut className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights Banner - Critical Alerts */}
        {aiInsights.filter(i => i.type === 'critical').length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="bg-red-500 rounded-xl p-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-2">🚨 AI Kritik Uyarı</h3>
                {aiInsights.filter(i => i.type === 'critical').map(insight => (
                  <div key={insight.id} className="mb-3 last:mb-0">
                    <p className="font-semibold text-red-800">{insight.title}</p>
                    <p className="text-sm text-red-700">{insight.message}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="destructive">Güven: {formatPercentage(insight.confidence)}</Badge>
                      {insight.actionable && (
                        <Button size="sm" variant="destructive" className="h-8">
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Premium Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Active Patients */}
          <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-6 text-white shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users className="h-6 w-6" />
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold border border-white/20">Live</div>
            </div>
            <p className="text-sm font-medium text-red-100 mb-1">Aktif Hastalar</p>
            <p className="text-4xl font-bold tracking-tight">{clinicalMetrics.totalPatients}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-red-200">
              <ArrowUpRight className="h-4 w-4" />
              <span>+{clinicalMetrics.admissionsToday} bugün yatış</span>
            </div>
          </div>

          {/* Critical Patients */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold border border-white/20 animate-pulse">Alert</div>
            </div>
            <p className="text-sm font-medium text-red-100 mb-1">Kritik Durum</p>
            <p className="text-4xl font-bold tracking-tight">{criticalPatients.length}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-red-200">
              <Heart className="h-4 w-4 animate-pulse" />
              <span>{seriousPatients.length} ciddi vaka</span>
            </div>
          </div>

          {/* Bed Utilization */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Bed className="h-6 w-6" />
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold border border-white/20">
                {bedUtilization > 85 ? 'Yüksek' : bedUtilization < 60 ? 'Düşük' : 'Optimal'}
              </div>
            </div>
            <p className="text-sm font-medium text-orange-100 mb-1">Yatak Doluluk Oranı</p>
            <p className="text-4xl font-bold tracking-tight">{formatPercentage(bedUtilization, 0)}</p>
            <div className="mt-3">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${bedUtilization}%` }} />
              </div>
              <p className="text-xs text-orange-200 mt-2">{occupiedBeds}/{totalBeds} yatak dolu</p>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold border border-white/20">Aylık</div>
            </div>
            <p className="text-sm font-medium text-green-100 mb-1">Aylık Ciro</p>
            <p className="text-4xl font-bold tracking-tight">{formatCurrency(financialMetrics.revenue / 1000)}K</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-green-200">
              <TrendingUp className="h-4 w-4" />
              <span>{formatPercentage(financialMetrics.profitMargin)} kar marjı</span>
            </div>
          </div>
        </div>

        {/* Main Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bed Capacity Management */}
          <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b-2 border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Bed className="h-6 w-6 text-red-600" />
                    <h3 className="text-xl font-bold text-gray-900">Yatak Kapasite Kontrol Merkezi</h3>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Tüm bölümlerde anlık yatak durumu</p>
                </div>
                <button className="px-4 py-2 border-2 border-gray-200 bg-white rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center gap-2 font-semibold text-gray-700 text-sm">
                  Tüm Bölümleri Gör <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {bedCapacity.slice(0, 6).map(dept => {
                  const utilizationColor =
                    dept.utilizationRate > 90 ? 'bg-red-500' :
                    dept.utilizationRate > 75 ? 'bg-orange-500' :
                    dept.utilizationRate > 50 ? 'bg-red-500' :
                    'bg-green-500'

                  return (
                    <div key={dept.department} className="p-5 rounded-2xl border-2 border-gray-100 hover:border-red-300 hover:shadow-lg transition-all bg-gray-50/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Building2 className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{dept.department}</h4>
                            <p className="text-xs text-gray-600 font-medium mt-0.5">
                              {dept.availableBeds} yatak müsait • {dept.pendingAdmissions} bekleyen
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{dept.occupiedBeds}/{dept.totalBeds}</div>
                          <div className={cn(
                            "inline-block px-2 py-1 rounded-lg text-xs font-bold mt-1",
                            dept.utilizationRate > 90 ? 'bg-red-100 text-red-700 border border-red-200' :
                            dept.utilizationRate > 75 ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                            'bg-green-100 text-green-700 border border-green-200'
                          )}>
                            {formatPercentage(dept.utilizationRate, 0)}
                          </div>
                        </div>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", utilizationColor)} style={{ width: `${dept.utilizationRate}%` }} />
                      </div>
                      {dept.utilizationRate > 85 && (
                        <p className="text-xs text-orange-700 font-bold mt-3 flex items-center gap-1.5 bg-orange-50 px-2 py-1.5 rounded-lg border border-orange-200">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Yüksek doluluk - acil eylem protokolü değerlendirin
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl border-2 border-rose-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b-2 border-rose-200">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="h-6 w-6 text-rose-600" />
                <h3 className="text-xl font-bold text-gray-900">AI Öngörüler & Tahminler</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">Gerçek zamanlı öngörü analitiği</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {aiInsights.map(insight => {
                  const iconMap = {
                    critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
                    warning: <AlertTriangle className="h-5 w-5 text-orange-500" />,
                    info: <Zap className="h-5 w-5 text-red-500" />,
                    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                  }

                  const bgMap = {
                    critical: 'bg-red-50 border-red-200',
                    warning: 'bg-orange-50 border-orange-200',
                    info: 'bg-red-50 border-red-200',
                    success: 'bg-green-50 border-green-200',
                  }

                  return (
                    <div key={insight.id} className={`p-4 rounded-2xl border-2 ${bgMap[insight.type]} transition-all hover:shadow-md`}>
                      <div className="flex items-start gap-3">
                        {iconMap[insight.type]}
                        <div className="flex-1">
                          <h5 className="font-bold text-sm text-gray-900 mb-1">{insight.title}</h5>
                          <p className="text-xs text-gray-700 font-medium mb-2">{insight.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-semibold">{timeAgo(insight.timestamp)}</span>
                            <div className="px-2 py-1 bg-white/50 border border-gray-300 rounded-lg text-xs font-bold text-gray-700">
                              {formatPercentage(insight.confidence, 1)}
                            </div>
                          </div>
                          {insight.actionable && (
                            <button className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all text-xs font-bold">
                              {insight.action}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Critical Patients Monitor */}
        <div className="mb-8 bg-white rounded-2xl border-2 border-red-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-5 border-b-2 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-6 w-6 text-red-600 animate-pulse" />
                  <h3 className="text-xl font-bold text-red-900">Kritik Hasta İzleme</h3>
                </div>
                <p className="text-sm text-gray-700 font-medium">Yüksek riskli hastaların gerçek zamanlı takibi</p>
              </div>
              <div className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg">
                {criticalPatients.length} Kritik
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {criticalPatients.slice(0, 6).map(patient => (
                <div key={patient.id} className="p-5 rounded-2xl border-2 border-red-200 bg-red-50/50 hover:shadow-xl transition-all hover:border-red-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{patient.name}</h4>
                      <p className="text-xs text-gray-600 font-semibold mt-0.5">MRN: {patient.mrn}</p>
                    </div>
                    <div className="px-2 py-1 bg-red-600 text-white rounded-lg text-xs font-bold">
                      Risk: {patient.riskScore}
                    </div>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-semibold">Bölüm:</span>
                      <span className="font-bold text-gray-900">{patient.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-semibold">Yatak:</span>
                      <span className="font-bold text-gray-900">{patient.bedNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-semibold">HR:</span>
                      <span className={`font-bold ${patient.vitalSigns.heartRate > 100 || patient.vitalSigns.heartRate < 60 ? 'text-red-600' : 'text-green-600'}`}>
                        {patient.vitalSigns.heartRate} bpm
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-semibold">SpO2:</span>
                      <span className={`font-bold ${patient.vitalSigns.oxygenSaturation < 95 ? 'text-red-600' : 'text-green-600'}`}>
                        {patient.vitalSigns.oxygenSaturation}%
                      </span>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 font-bold text-sm">
                    <Stethoscope className="h-4 w-4" />
                    Detayları Görüntüle
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics - Clinical & Financial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clinical Metrics */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Klinik Performans</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">Temel klinik kalite göstergeleri</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                  <span className="text-sm font-bold text-gray-700">Ort. Kalış Süresi</span>
                  <span className="text-xl font-bold text-gray-900">{clinicalMetrics.avgLengthOfStay} gün</span>
                </div>
                <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">Hasta Memnuniyeti</span>
                    <span className="text-xl font-bold text-green-700">{formatPercentage(clinicalMetrics.patientSatisfaction)}</span>
                  </div>
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${clinicalMetrics.patientSatisfaction}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 border-2 border-orange-100">
                  <span className="text-sm font-bold text-gray-700">Tekrar Yatış Oranı</span>
                  <span className="text-xl font-bold text-orange-700">{formatPercentage(clinicalMetrics.readmissionRate)}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50 border-2 border-red-100">
                  <span className="text-sm font-bold text-gray-700">Mortalite Oranı</span>
                  <span className="text-xl font-bold text-rose-700">{formatPercentage(clinicalMetrics.mortalityRate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Mali Performans</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium">Gelir döngüsü yönetim metrikleri</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">Tahsilat Oranı</span>
                    <span className="text-xl font-bold text-green-700">{formatPercentage(financialMetrics.collectionRate)}</span>
                  </div>
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${financialMetrics.collectionRate}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50 border-2 border-red-100">
                  <span className="text-sm font-bold text-gray-700">Alacak Gün Sayısı</span>
                  <span className="text-xl font-bold text-rose-700">{financialMetrics.daysInAR} gün</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 border-2 border-orange-100">
                  <span className="text-sm font-bold text-gray-700">Red Oranı</span>
                  <span className="text-xl font-bold text-orange-700">{formatPercentage(financialMetrics.denialRate)}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                  <span className="text-sm font-bold text-gray-700">Ort. Geri Ödeme</span>
                  <span className="text-xl font-bold text-gray-900">{formatCurrency(financialMetrics.averageReimbursement)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

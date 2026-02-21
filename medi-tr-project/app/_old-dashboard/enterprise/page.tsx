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
import {
  generatePatientData,
  generateBedCapacity,
  generateStaffingData,
  getClinicalMetrics,
  getFinancialMetrics,
  generateAIInsights,
  formatCurrency,
  formatPercentage,
  timeAgo,
  type PatientData,
  type BedCapacity,
  type StaffingData,
  type ClinicalMetrics,
  type FinancialMetrics,
  type AIInsight,
} from '@/lib/data/dashboard-data'

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Loading Enterprise Dashboard...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header - Command Center Style */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white sticky top-0 z-50 shadow-2xl border-b-4 border-blue-400">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20">
                <Activity className="h-8 w-8 text-blue-300" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Command Center</h1>
                <p className="text-sm text-blue-200">Enterprise Healthcare Operations</p>
              </div>
            </div>

            {/* Center Stats */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/20">
                <Clock className="h-5 w-5 text-blue-300" />
                <span className="font-mono text-lg">{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/20">
                <Users className="h-5 w-5 text-green-300" />
                <span className="font-semibold">{patients.length} Patients</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/20">
                <Bed className="h-5 w-5 text-orange-300" />
                <span className="font-semibold">{formatPercentage(bedUtilization, 0)} Occupancy</span>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-3 hover:bg-white/10 rounded-xl transition-all">
                <Bell className="h-6 w-6 text-blue-200" />
                <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full border-2 border-blue-900 animate-pulse" />
              </button>
              <button className="p-3 hover:bg-white/10 rounded-xl transition-all">
                <Settings className="h-6 w-6 text-blue-200" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-blue-200">{user.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="hover:bg-white/10 text-white"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
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
                <h3 className="text-lg font-bold text-red-900 mb-2">🚨 AI Critical Alert</h3>
                {aiInsights.filter(i => i.type === 'critical').map(insight => (
                  <div key={insight.id} className="mb-3 last:mb-0">
                    <p className="font-semibold text-red-800">{insight.title}</p>
                    <p className="text-sm text-red-700">{insight.message}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="destructive">Confidence: {formatPercentage(insight.confidence)}</Badge>
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

        {/* Key Metrics Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Active Patients */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-none">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{clinicalMetrics.totalPatients}</div>
              <p className="text-blue-100 text-sm font-medium">Active Patients</p>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <ArrowUpRight className="h-4 w-4" />
                <span>+{clinicalMetrics.admissionsToday} admissions today</span>
              </div>
            </CardContent>
          </Card>

          {/* Critical Patients */}
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-none hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <AlertTriangle className="h-8 w-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-none animate-pulse">Alert</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{criticalPatients.length}</div>
              <p className="text-red-100 text-sm font-medium">Critical Condition</p>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <Heart className="h-4 w-4 animate-pulse" />
                <span>{seriousPatients.length} serious cases</span>
              </div>
            </CardContent>
          </Card>

          {/* Bed Utilization */}
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Bed className="h-8 w-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-none">
                  {bedUtilization > 85 ? 'High' : bedUtilization < 60 ? 'Low' : 'Optimal'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{formatPercentage(bedUtilization, 0)}</div>
              <p className="text-orange-100 text-sm font-medium">Bed Occupancy</p>
              <Progress
                value={bedUtilization}
                className="mt-3 h-2 bg-white/20"
                indicatorClassName="bg-white"
              />
              <p className="text-xs mt-2">{occupiedBeds}/{totalBeds} beds occupied</p>
            </CardContent>
          </Card>

          {/* Revenue */}
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <DollarSign className="h-8 w-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-none">MTD</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{formatCurrency(financialMetrics.revenue / 1000)}K</div>
              <p className="text-green-100 text-sm font-medium">Monthly Revenue</p>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <TrendingUp className="h-4 w-4" />
                <span>{formatPercentage(financialMetrics.profitMargin)} profit margin</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bed Capacity Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-6 w-6 text-blue-600" />
                    Bed Capacity Command Center
                  </CardTitle>
                  <CardDescription>Real-time bed availability across departments</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All Departments <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bedCapacity.slice(0, 6).map(dept => {
                  const utilizationColor =
                    dept.utilizationRate > 90 ? 'bg-red-500' :
                    dept.utilizationRate > 75 ? 'bg-orange-500' :
                    dept.utilizationRate > 50 ? 'bg-blue-500' :
                    'bg-green-500'

                  return (
                    <div key={dept.department} className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{dept.department}</h4>
                            <p className="text-xs text-gray-500">
                              {dept.availableBeds} beds available • {dept.pendingAdmissions} pending
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{dept.occupiedBeds}/{dept.totalBeds}</div>
                          <Badge
                            variant={dept.utilizationRate > 90 ? 'destructive' : dept.utilizationRate > 75 ? 'warning' : 'success'}
                            className="text-xs"
                          >
                            {formatPercentage(dept.utilizationRate, 0)}
                          </Badge>
                        </div>
                      </div>
                      <Progress
                        value={dept.utilizationRate}
                        className="h-3"
                        indicatorClassName={utilizationColor}
                      />
                      {dept.utilizationRate > 85 && (
                        <p className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          High capacity - consider surge protocol
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights Sidebar */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                AI Insights & Predictions
              </CardTitle>
              <CardDescription>Real-time predictive analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsights.map(insight => {
                  const iconMap = {
                    critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
                    warning: <AlertTriangle className="h-5 w-5 text-orange-500" />,
                    info: <Zap className="h-5 w-5 text-blue-500" />,
                    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                  }

                  const bgMap = {
                    critical: 'bg-red-50 border-red-200',
                    warning: 'bg-orange-50 border-orange-200',
                    info: 'bg-blue-50 border-blue-200',
                    success: 'bg-green-50 border-green-200',
                  }

                  return (
                    <div key={insight.id} className={`p-4 rounded-xl border-2 ${bgMap[insight.type]}`}>
                      <div className="flex items-start gap-3">
                        {iconMap[insight.type]}
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm text-gray-900 mb-1">{insight.title}</h5>
                          <p className="text-xs text-gray-700 mb-2">{insight.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{timeAgo(insight.timestamp)}</span>
                            <Badge variant="outline" className="text-xs">
                              {formatPercentage(insight.confidence, 1)}
                            </Badge>
                          </div>
                          {insight.actionable && (
                            <Button size="sm" className="w-full mt-2 h-7 text-xs">
                              {insight.action}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Patients Monitor */}
        <Card className="mb-8 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-red-900">
                  <Heart className="h-6 w-6 text-red-600 animate-pulse" />
                  Critical Patient Monitor
                </CardTitle>
                <CardDescription>Real-time monitoring of high-risk patients</CardDescription>
              </div>
              <Badge variant="destructive" className="text-sm">
                {criticalPatients.length} Critical
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {criticalPatients.slice(0, 6).map(patient => (
                <div key={patient.id} className="p-4 rounded-xl border-2 border-red-200 bg-red-50/50 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{patient.name}</h4>
                      <p className="text-xs text-gray-600">MRN: {patient.mrn}</p>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      Risk: {patient.riskScore}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Dept:</span>
                      <span className="font-semibold">{patient.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Bed:</span>
                      <span className="font-semibold">{patient.bedNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">HR:</span>
                      <span className={`font-semibold ${patient.vitalSigns.heartRate > 100 || patient.vitalSigns.heartRate < 60 ? 'text-red-600' : 'text-green-600'}`}>
                        {patient.vitalSigns.heartRate} bpm
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">SpO2:</span>
                      <span className={`font-semibold ${patient.vitalSigns.oxygenSaturation < 95 ? 'text-red-600' : 'text-green-600'}`}>
                        {patient.vitalSigns.oxygenSaturation}%
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive" className="w-full mt-3 h-8">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics - Clinical & Financial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clinical Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                Clinical Performance
              </CardTitle>
              <CardDescription>Key clinical quality indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">Avg Length of Stay</span>
                  <span className="text-lg font-bold text-gray-900">{clinicalMetrics.avgLengthOfStay} days</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Patient Satisfaction</span>
                  <div className="flex items-center gap-2">
                    <Progress value={clinicalMetrics.patientSatisfaction} className="w-24 h-2" indicatorClassName="bg-green-500" />
                    <span className="text-lg font-bold text-green-700">{formatPercentage(clinicalMetrics.patientSatisfaction)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                  <span className="text-sm font-medium text-gray-700">Readmission Rate</span>
                  <span className="text-lg font-bold text-orange-700">{formatPercentage(clinicalMetrics.readmissionRate)}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <span className="text-sm font-medium text-gray-700">Mortality Rate</span>
                  <span className="text-lg font-bold text-blue-700">{formatPercentage(clinicalMetrics.mortalityRate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                Financial Performance
              </CardTitle>
              <CardDescription>Revenue cycle management metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Collection Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={financialMetrics.collectionRate} className="w-24 h-2" indicatorClassName="bg-green-500" />
                    <span className="text-lg font-bold text-green-700">{formatPercentage(financialMetrics.collectionRate)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <span className="text-sm font-medium text-gray-700">Days in A/R</span>
                  <span className="text-lg font-bold text-blue-700">{financialMetrics.daysInAR} days</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                  <span className="text-sm font-medium text-gray-700">Denial Rate</span>
                  <span className="text-lg font-bold text-orange-700">{formatPercentage(financialMetrics.denialRate)}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">Avg Reimbursement</span>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(financialMetrics.averageReimbursement)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

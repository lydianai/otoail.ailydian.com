'use client'

import { useState } from 'react'
import {
  Bed,
  User,
  Calendar,
  Clock,
  Activity,
  Heart,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Building2,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  FileText,
  Pill,
  Stethoscope,
  UserPlus,
  Shield,
  BarChart3,
  ArrowRightLeft,
  ClipboardList,
  Thermometer,
  Droplets,
  Wind,
  X,
  Save,
  Send,
  AlertTriangle,
  BedDouble,
  Home,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Ward Names
const WARDS = [
  'Dahiliye',
  'Cerrahi',
  'Kardiyoloji',
  'Göğüs',
  'Nöroloji',
  'Ortopedi',
  'Kadın-Doğum',
  'Çocuk',
]

// Bed Status
type BedStatus = 'Dolu' | 'Boş' | 'Temizlik' | 'Rezerve'

interface Bed {
  id: string
  bedNumber: string
  ward: string
  status: BedStatus
  patient: Patient | null
}

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  admissionDate: string
  daysInHospital: number
  diagnosis: string
  attendingDoctor: string
  nurse: string
  vitalSigns: VitalSigns[]
  medications: Medication[]
  orders: DoctorOrder[]
  nursingNotes: NursingNote[]
  dischargeInfo: DischargeInfo | null
}

interface VitalSigns {
  time: string
  temperature: number
  systolic: number
  diastolic: number
  pulse: number
  respiration: number
  spo2: number
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  route: string
  timeSlots: string[]
  administered: { [key: string]: boolean }
}

interface DoctorOrder {
  id: string
  type: 'Lab' | 'Imaging' | 'Medication' | 'Consultation' | 'Diet'
  description: string
  orderDate: string
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
  orderedBy: string
}

interface NursingNote {
  id: string
  shift: 'Sabah 08:00-16:00' | 'Akşam 16:00-00:00' | 'Gece 00:00-08:00'
  date: string
  nurse: string
  note: string
}

interface DischargeInfo {
  estimatedDate: string
  summary: string
  instructions: string
  followUpDate: string
}

// Generate mock beds
function generateBeds(): Bed[] {
  const beds: Bed[] = []
  const bedsPerWard = 15

  WARDS.forEach((ward) => {
    for (let i = 1; i <= bedsPerWard; i++) {
      const bedNumber = `${ward.charAt(0)}${i.toString().padStart(2, '0')}`
      const random = Math.random()
      let status: BedStatus = 'Dolu'
      let patient: Patient | null = null

      if (random < 0.6) {
      // 60% occupied
      status = 'Dolu'
      patient = generatePatient(bedNumber, ward)
      } else if (random < 0.75) {
      // 15% available
      status = 'Boş'
      } else if (random < 0.85) {
      // 10% cleaning
      status = 'Temizlik'
      } else {
      // 10% reserved
      status = 'Rezerve'
      }

      beds.push({
      id: `${ward}-${i}`,
      bedNumber,
      ward,
      status,
      patient,
      })
    }
  })

  return beds
}

function generatePatient(bedNumber: string, ward: string): Patient {
  const names = [
    'Mehmet Yılmaz',
    'Ayşe Demir',
    'Ahmet Kaya',
    'Fatma Çelik',
    'Ali Arslan',
    'Zeynep Öztürk',
    'Mustafa Şahin',
    'Elif Aydın',
  ]
  const doctors = [
    'Dr. Ayşe Demir',
    'Dr. Mehmet Kaya',
    'Dr. Zeynep Arslan',
    'Dr. Ahmet Yılmaz',
    'Dr. Fatma Şahin',
  ]
  const nurses = [
    'Hemş. Selin Yurt',
    'Hemş. Can Demir',
    'Hemş. Elif Kaya',
    'Hemş. Merve Çelik',
  ]

  const daysInHospital = Math.floor(Math.random() * 10) + 1
  const admissionDate = new Date()
  admissionDate.setDate(admissionDate.getDate() - daysInHospital)

  // Generate vital signs for the last 24 hours (every 4 hours)
  const vitalSigns: VitalSigns[] = []
  for (let i = 0; i < 6; i++) {
    vitalSigns.push({
      time: `${String(i * 4).padStart(2, '0')}:00`,
      temperature: 36.5 + Math.random() * 1.5,
      systolic: 110 + Math.random() * 30,
      diastolic: 70 + Math.random() * 20,
      pulse: 60 + Math.random() * 40,
      respiration: 14 + Math.random() * 6,
      spo2: 95 + Math.random() * 5,
    })
  }

  const medications: Medication[] = [
    {
      id: '1',
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: '3x1',
      route: 'Oral',
      timeSlots: ['08:00', '14:00', '20:00'],
      administered: { '08:00': true, '14:00': true, '20:00': false },
    },
    {
      id: '2',
      name: 'Amoxicillin',
      dosage: '1g',
      frequency: '2x1',
      route: 'IV',
      timeSlots: ['08:00', '20:00'],
      administered: { '08:00': true, '20:00': false },
    },
  ]

  const orders: DoctorOrder[] = [
    {
      id: '1',
      type: 'Lab',
      description: 'Tam Kan Sayımı',
      orderDate: new Date().toISOString(),
      status: 'In Progress',
      orderedBy: doctors[Math.floor(Math.random() * doctors.length)],
    },
    {
      id: '2',
      type: 'Imaging',
      description: 'Göğüs Röntgeni',
      orderDate: new Date().toISOString(),
      status: 'Pending',
      orderedBy: doctors[Math.floor(Math.random() * doctors.length)],
    },
  ]

  const nursingNotes: NursingNote[] = [
    {
      id: '1',
      shift: 'Sabah 08:00-16:00',
      date: new Date().toLocaleDateString('tr-TR'),
      nurse: nurses[Math.floor(Math.random() * nurses.length)],
      note: 'Hasta stabil, vital bulgular normal sınırlarda. İştahı iyi.',
    },
  ]

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: names[Math.floor(Math.random() * names.length)],
    age: Math.floor(Math.random() * 60) + 20,
    gender: Math.random() > 0.5 ? 'Erkek' : 'Kadın',
    admissionDate: admissionDate.toLocaleDateString('tr-TR'),
    daysInHospital,
    diagnosis: 'Pnömoni',
    attendingDoctor: doctors[Math.floor(Math.random() * doctors.length)],
    nurse: nurses[Math.floor(Math.random() * nurses.length)],
    vitalSigns,
    medications,
    orders,
    nursingNotes,
    dischargeInfo: null,
  }
}

export default function InpatientPage() {
  const [beds, setBeds] = useState<Bed[]>(generateBeds())
  const [selectedWard, setSelectedWard] = useState<string>('Tümü')
  const [selectedStatus, setSelectedStatus] = useState<string>('Tümü')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null)
  const [showAdmitModal, setShowAdmitModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showNursingNoteModal, setShowNursingNoteModal] = useState(false)
  const [showDoctorOrderModal, setShowDoctorOrderModal] = useState(false)
  const [showDischargeModal, setShowDischargeModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview')

  // Filter beds
  const filteredBeds = beds.filter((bed) => {
    const wardMatch = selectedWard === 'Tümü' || bed.ward === selectedWard
    const statusMatch = selectedStatus === 'Tümü' || bed.status === selectedStatus
    const searchMatch =
      searchTerm === '' ||
      bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false

    return wardMatch && statusMatch && searchMatch
  })

  // Calculate statistics
  const totalBeds = beds.length
  const occupiedBeds = beds.filter((b) => b.status === 'Dolu').length
  const availableBeds = beds.filter((b) => b.status === 'Boş').length
  const cleaningBeds = beds.filter((b) => b.status === 'Temizlik').length
  const reservedBeds = beds.filter((b) => b.status === 'Rezerve').length
  const occupancyRate = ((occupiedBeds / totalBeds) * 100).toFixed(1)

  const patientsWithData = beds.filter((b) => b.patient).map((b) => b.patient!)
  const totalPatients = patientsWithData.length
  const newAdmissionsToday = patientsWithData.filter((p) => p.daysInHospital === 1).length
  const dischargesToday = 2 // Mock data
  const avgStayDays = (
    patientsWithData.reduce((sum, p) => sum + p.daysInHospital, 0) / totalPatients
  ).toFixed(1)

  // Bed status colors
  const statusColors: { [key in BedStatus]: string } = {
    Dolu: 'bg-red-500 hover:bg-red-600',
    Boş: 'bg-green-500 hover:bg-green-600',
    Temizlik: 'bg-yellow-500 hover:bg-yellow-600',
    Rezerve: 'bg-blue-500 hover:bg-blue-600',
  }

  const statusBadgeColors: { [key in BedStatus]: string } = {
    Dolu: 'bg-red-100 text-red-700 border-red-300',
    Boş: 'bg-green-100 text-green-700 border-green-300',
    Temizlik: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Rezerve: 'bg-blue-100 text-blue-700 border-blue-300',
  }

  // Order status colors
  const orderStatusColors = {
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-300',
    Completed: 'bg-green-100 text-green-700 border-green-300',
    Cancelled: 'bg-red-100 text-red-700 border-red-300',
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
                  <Bed className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Yatan Hasta Yönetimi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    Servis Bazlı Yatak & Hasta Takibi
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAdmitModal(true)}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Yatış
              </Button>
              <Button
                variant="outline"
                className="border-2"
                onClick={() => setShowTransferModal(true)}
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Yatak Transferi
              </Button>
              <Button variant="outline" className="border-2">
                <Download className="h-4 w-4 mr-2" />
                Rapor Al
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-red-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Toplam Hasta</p>
                  <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span>+{newAdmissionsToday} yeni</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="h-3 w-3 text-blue-600" />
                  <span>{dischargesToday} taburcu</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Doluluk Oranı</p>
                  <p className="text-3xl font-bold text-gray-900">%{occupancyRate}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {occupiedBeds} dolu / {totalBeds} toplam yatak
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Ort. Yatış Süresi</p>
                  <p className="text-3xl font-bold text-gray-900">{avgStayDays} gün</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">Tüm servislerde ortalama kalış süresi</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <BedDouble className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Boş Yatak</p>
                  <p className="text-3xl font-bold text-gray-900">{availableBeds}</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                  {cleaningBeds} temizlik
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                  {reservedBeds} rezerve
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Arama</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Yatak no, hasta adı..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Servis</label>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Tümü">Tüm Servisler</option>
                  {WARDS.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Durum</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Tümü">Tüm Durumlar</option>
                  <option value="Dolu">Dolu</option>
                  <option value="Boş">Boş</option>
                  <option value="Temizlik">Temizlik</option>
                  <option value="Rezerve">Rezerve</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full border-2"
                  onClick={() => {
                    setSelectedWard('Tümü')
                    setSelectedStatus('Tümü')
                    setSearchTerm('')
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sıfırla
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bed Overview Grid */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Yatak Durumu Haritası</CardTitle>
                <CardDescription>120 yatak - 8 servis genelinde görsel durum</CardDescription>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-red-500 rounded" />
                  <span className="text-sm font-medium">Dolu</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-green-500 rounded" />
                  <span className="text-sm font-medium">Boş</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-yellow-500 rounded" />
                  <span className="text-sm font-medium">Temizlik</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-blue-500 rounded" />
                  <span className="text-sm font-medium">Rezerve</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {WARDS.map((ward) => {
                const wardBeds = filteredBeds.filter((b) => b.ward === ward)
                if (wardBeds.length === 0) return null

                return (
                  <div key={ward} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-red-600" />
                        {ward}
                      </h3>
                      <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                        {wardBeds.filter((b) => b.status === 'Dolu').length} /{' '}
                        {wardBeds.length} dolu
                      </Badge>
                    </div>
                    <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-15 gap-2">
                      {wardBeds.map((bed) => (
                        <button
                          key={bed.id}
                          onClick={() => setSelectedBed(bed)}
                          className={cn(
                            'relative aspect-square rounded-lg flex flex-col items-center justify-center text-white font-bold text-xs transition-all transform hover:scale-110 shadow-md',
                            statusColors[bed.status]
                          )}
                          title={`${bed.bedNumber} - ${bed.status}${bed.patient ? ` - ${bed.patient.name}` : ''}`}
                        >
                          <Bed className="h-4 w-4 mb-1" />
                          <span>{bed.bedNumber}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Bed Details */}
        {selectedBed && selectedBed.patient && (
          <Card className="border-2 border-red-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    Yatak {selectedBed.bedNumber} - {selectedBed.patient.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {selectedBed.ward} Servisi • {selectedBed.patient.daysInHospital}. gün
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cn('text-base px-4 py-2', statusBadgeColors[selectedBed.status])}>
                    {selectedBed.status}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedBed(null)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={cn(
                    'px-4 py-2 font-semibold border-b-2 -mb-0.5 transition-colors',
                    activeTab === 'overview'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  )}
                >
                  Genel Bakış
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={cn(
                    'px-4 py-2 font-semibold border-b-2 -mb-0.5 transition-colors',
                    activeTab === 'details'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  )}
                >
                  Detaylı Bilgiler
                </button>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Patient Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Hasta Bilgileri</p>
                      <p className="font-bold text-gray-900">{selectedBed.patient.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedBed.patient.age} yaş • {selectedBed.patient.gender}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Yatış: {selectedBed.patient.admissionDate}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Tanı</p>
                      <p className="font-bold text-gray-900">{selectedBed.patient.diagnosis}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Ekip</p>
                      <p className="font-bold text-gray-900 flex items-center gap-1">
                        <Stethoscope className="h-4 w-4" />
                        {selectedBed.patient.attendingDoctor}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <User className="h-3 w-3" />
                        {selectedBed.patient.nurse}
                      </p>
                    </div>
                  </div>

                  {/* Vital Signs Chart */}
                  <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-red-600" />
                      Vital Bulgular Grafiği (Son 24 Saat)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Temperature Chart */}
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-3">Ateş (°C)</p>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={selectedBed.patient.vitalSigns}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[35, 40]} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="temperature"
                              stroke="#ef4444"
                              strokeWidth={2}
                              dot={{ fill: '#ef4444', r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Blood Pressure Chart */}
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-3">
                          Kan Basıncı (mmHg)
                        </p>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={selectedBed.patient.vitalSigns}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[50, 180]} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="systolic"
                              stroke="#f59e0b"
                              strokeWidth={2}
                              name="Sistolik"
                              dot={{ fill: '#f59e0b', r: 4 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="diastolic"
                              stroke="#10b981"
                              strokeWidth={2}
                              name="Diyastolik"
                              dot={{ fill: '#10b981', r: 4 }}
                            />
                            <Legend />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Pulse Chart */}
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-3">Nabız (atım/dk)</p>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={selectedBed.patient.vitalSigns}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[40, 140]} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="pulse"
                              stroke="#8b5cf6"
                              strokeWidth={2}
                              dot={{ fill: '#8b5cf6', r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* SpO2 Chart */}
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-3">SpO2 (%)</p>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={selectedBed.patient.vitalSigns}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[85, 100]} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="spo2"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              dot={{ fill: '#3b82f6', r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => setShowNursingNoteModal(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Hemşire Notu Ekle
                    </Button>
                    <Button
                      onClick={() => setShowDoctorOrderModal(true)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Doktor İstem
                    </Button>
                    <Button
                      onClick={() => setShowDischargeModal(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Taburcu Planla
                    </Button>
                    <Button variant="outline" className="border-2">
                      <Edit className="h-4 w-4 mr-2" />
                      Bilgileri Düzenle
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Medications */}
                  <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Pill className="h-5 w-5 text-red-600" />
                      İlaç Uygulama Çizelgesi (MAR)
                    </h3>
                    <div className="space-y-3">
                      {selectedBed.patient.medications.map((med) => (
                        <div key={med.id} className="bg-white p-4 rounded-lg border-2 border-gray-200">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-bold text-gray-900">{med.name}</p>
                              <p className="text-sm text-gray-600">
                                {med.dosage} • {med.frequency} • {med.route}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {med.timeSlots.map((time) => (
                              <div
                                key={time}
                                className={cn(
                                  'flex-1 p-2 rounded-lg border-2 text-center',
                                  med.administered[time]
                                    ? 'bg-green-100 border-green-300'
                                    : 'bg-gray-100 border-gray-300'
                                )}
                              >
                                <p className="text-xs font-semibold text-gray-600">{time}</p>
                                <div className="mt-1">
                                  {med.administered[time] ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                                  ) : (
                                    <div className="h-5 w-5 border-2 border-gray-400 rounded mx-auto" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Doctor Orders */}
                  <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-red-600" />
                        Doktor İstemleri
                      </h3>
                      <Button
                        size="sm"
                        onClick={() => setShowDoctorOrderModal(true)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni İstem
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {selectedBed.patient.orders.map((order) => (
                        <div key={order.id} className="bg-white p-4 rounded-lg border-2 border-gray-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                                  {order.type}
                                </Badge>
                                <Badge className={cn('border-2', orderStatusColors[order.status])}>
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="font-bold text-gray-900">{order.description}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                İstem: {order.orderedBy} •{' '}
                                {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nursing Notes */}
                  <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-red-600" />
                        Hemşire Gözlem Notları
                      </h3>
                      <Button
                        size="sm"
                        onClick={() => setShowNursingNoteModal(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Not
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {selectedBed.patient.nursingNotes.map((note) => (
                        <div key={note.id} className="bg-white p-4 rounded-lg border-2 border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                                {note.shift}
                              </Badge>
                              <p className="text-sm text-gray-600 mt-1">
                                {note.date} • {note.nurse}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-900">{note.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discharge Planning */}
                  {selectedBed.patient.dischargeInfo && (
                    <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                      <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                        <Home className="h-5 w-5 text-green-600" />
                        Taburcu Planlaması
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Tahmini Taburcu Tarihi
                          </p>
                          <p className="font-bold text-gray-900">
                            {selectedBed.patient.dischargeInfo.estimatedDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Taburcu Özeti</p>
                          <p className="text-gray-900">
                            {selectedBed.patient.dischargeInfo.summary}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Taburcu Sonrası Talimatlar
                          </p>
                          <p className="text-gray-900">
                            {selectedBed.patient.dischargeInfo.instructions}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Kontrol Tarihi</p>
                          <p className="font-bold text-gray-900">
                            {selectedBed.patient.dischargeInfo.followUpDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* KVKK Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">
                KVKK Uyumluluk - Yatan Hasta Sistemi
              </h3>
              <p className="text-sm text-purple-800">
                Tüm hasta kayıtları, vital bulgular, ilaç uygulamaları ve tıbbi notlar KVKK
                kapsamında korunmaktadır. Veriler şifrelenmiş olarak saklanır ve yalnızca yetkili
                personel tarafından erişilebilir. Sistem e-Nabız ile tam entegre çalışmaktadır.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals would go here - simplified for brevity */}
      {showAdmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Yeni Hasta Yatışı</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAdmitModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Hasta Seç
                </label>
                <Input placeholder="Hasta ara..." className="border-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Servis</label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  {WARDS.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Yatak</label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  <option>Boş yatak seçiniz...</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Yatış Tanısı
                </label>
                <Input placeholder="Tanı giriniz..." className="border-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Sorumlu Doktor
                </label>
                <Input placeholder="Doktor seçiniz..." className="border-2" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-red-600 hover:bg-red-700">
                  <Save className="h-4 w-4 mr-2" />
                  Yatış Kaydet
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowAdmitModal(false)}
                >
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Yatak Transferi</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowTransferModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Mevcut Hasta
                </label>
                <Input placeholder="Hasta seçiniz..." className="border-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Hedef Servis
                </label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  {WARDS.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Hedef Yatak
                </label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  <option>Boş yatak seçiniz...</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Transfer Nedeni
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[100px]"
                  placeholder="Transfer nedenini giriniz..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Transfer Et
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowTransferModal(false)}
                >
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNursingNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Hemşire Gözlem Notu</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowNursingNoteModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Vardiya</label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  <option>Sabah 08:00-16:00</option>
                  <option>Akşam 16:00-00:00</option>
                  <option>Gece 00:00-08:00</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Gözlem Notu
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[150px]"
                  placeholder="Hasta durumu, vital bulgular, yapılan işlemler..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Notu Kaydet
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowNursingNoteModal(false)}
                >
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDoctorOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Yeni Doktor İstemi</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowDoctorOrderModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">İstem Tipi</label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  <option>Lab</option>
                  <option>Imaging</option>
                  <option>Medication</option>
                  <option>Consultation</option>
                  <option>Diet</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Açıklama</label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[100px]"
                  placeholder="İstem detaylarını giriniz..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  İstem Gönder
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowDoctorOrderModal(false)}
                >
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDischargeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Taburcu Planlaması</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowDischargeModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Tahmini Taburcu Tarihi
                </label>
                <Input type="date" className="border-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Taburcu Özeti
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[100px]"
                  placeholder="Hastanın yatış süreci, yapılan tedaviler, mevcut durum..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Taburcu Sonrası Talimatlar
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[100px]"
                  placeholder="İlaç kullanımı, perhiz, aktivite kısıtlamaları..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Kontrol Randevu Tarihi
                </label>
                <Input type="date" className="border-2" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Taburcu Planını Kaydet
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowDischargeModal(false)}
                >
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    
  )
}

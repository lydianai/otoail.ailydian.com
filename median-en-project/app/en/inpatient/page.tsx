'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

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
  'Internal Medicine',
  'Surgical',
  'Cardiology',
  'Pulmonology',
  'Neurology',
  'Orthopedics',
  'Female-Obstetrics',
  'Pediatrics',
]

// Bed Status
type BedStatus = 'Occupied' | 'Available' | 'Cleaning' | 'Reserved'

interface Bed {
  id: string
  bedNumber: string
  ward: string
  status: BedStatus
  patient: Patient | null
}

interface Patient {
  id: string
  mrn: string
  name: string
  age: number
  gender: string
  admissionDate: string
  daysInHospital: number
  diagnosis: string
  attendingDoctor: string
  nurse: string
  insurance: {
    provider: string
    policyNumber: string
    groupNumber: string
  }
  acuityScore: number
  vitalSigns: VitalSigns[]
  medications: Medication[]
  orders: DoctorOrder[]
  nursingNotes: NursingNote[]
  dischargeInfo: DischargeInfo | null
  adtEvents: ADTEvent[]
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
  shift: 'Morning 08:00-16:00' | 'Evening 16:00-00:00' | 'Night 00:00-08:00'
  date: string
  nurse: string
  note: string
}

interface ADTEvent {
  id: string
  type: 'Admission' | 'Discharge' | 'Transfer'
  timestamp: string
  fromLocation?: string
  toLocation?: string
  reason?: string
  performedBy: string
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
      let status: BedStatus = 'Occupied'
      let patient: Patient | null = null

      if (random < 0.6) {
      // 60% occupied
      status = 'Occupied'
      patient = generatePatient(bedNumber, ward)
      } else if (random < 0.75) {
      // 15% available
      status = 'Available'
      } else if (random < 0.85) {
      // 10% cleaning
      status = 'Cleaning'
      } else {
      // 10% reserved
      status = 'Reserved'
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
    'Robert Wilson',
    'Mary Smith',
    'James Johnson',
    'Patricia Martinezez',
    'John Anderson',
    'Jennifer Lewis',
    'Michael Brown',
    'Sarah Garcia',
  ]
  const doctors = [
    'Dr. Mary Smith',
    'Dr. Robert Johnson',
    'Dr. Jennifer Anderson',
    'Dr. James Wilson',
    'Dr. Patricia Brown',
  ]
  const nurses = [
    'RN Jessica Thompson',
    'RN John Smith',
    'RN Sarah Johnson',
    'RN Susan Martinez',
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
      description: 'Complete Blood Count',
      orderDate: new Date().toISOString(),
      status: 'In Progress',
      orderedBy: doctors[Math.floor(Math.random() * doctors.length)],
    },
    {
      id: '2',
      type: 'Imaging',
      description: 'Chest X-Ray',
      orderDate: new Date().toISOString(),
      status: 'Pending',
      orderedBy: doctors[Math.floor(Math.random() * doctors.length)],
    },
  ]

  const nursingNotes: NursingNote[] = [
    {
      id: '1',
      shift: 'Morning 08:00-16:00',
      date: new Date().toLocaleDateString('en-US'),
      nurse: nurses[Math.floor(Math.random() * nurses.length)],
      note: 'Patient stable, vital signs within normal limits. Good appetite and fluid intake.',
    },
  ]

  const insuranceProviders = [
    'Blue Cross Blue Shield',
    'Aetna',
    'UnitedHealthcare',
    'Cigna',
    'Humana',
  ]

  const adtEvents: ADTEvent[] = [
    {
      id: '1',
      type: 'Admission',
      timestamp: admissionDate.toLocaleString('en-US'),
      toLocation: ward,
      reason: 'Emergency admission for respiratory distress',
      performedBy: doctors[Math.floor(Math.random() * doctors.length)],
    },
  ]

  return {
    id: Math.random().toString(36).substr(2, 9),
    mrn: `MRN-${Math.floor(Math.random() * 900000) + 100000}`,
    name: names[Math.floor(Math.random() * names.length)],
    age: Math.floor(Math.random() * 60) + 20,
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    admissionDate: admissionDate.toLocaleDateString('en-US'),
    daysInHospital,
    diagnosis: 'Pneumonia',
    attendingDoctor: doctors[Math.floor(Math.random() * doctors.length)],
    nurse: nurses[Math.floor(Math.random() * nurses.length)],
    insurance: {
      provider: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
      policyNumber: `POL-${Math.floor(Math.random() * 900000) + 100000}`,
      groupNumber: `GRP-${Math.floor(Math.random() * 9000) + 1000}`,
    },
    acuityScore: Math.floor(Math.random() * 5) + 1,
    vitalSigns,
    medications,
    orders,
    nursingNotes,
    dischargeInfo: null,
    adtEvents,
  }
}

export default function InpatientPage() {
  const [beds, setBeds] = useState<Bed[]>(generateBeds())
  const [selectedWard, setSelectedWard] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null)
  const [showAdmitModal, setShowAdmitModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showNorasingNoteModal, setShowNorasingNoteModal] = useState(false)
  const [showDoctorOrderModal, setShowDoctorOrderModal] = useState(false)
  const [showDischargeModal, setShowDischargeModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview')

  // Filter beds
  const filteredBeds = beds.filter((bed) => {
    const wardMatch = selectedWard === 'All' || bed.ward === selectedWard
    const statusMatch = selectedStatus === 'All' || bed.status === selectedStatus
    const searchMatch =
      searchTerm === '' ||
      bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false

    return wardMatch && statusMatch && searchMatch
  })

  // Calculate statistics
  const totalBeds = beds.length
  const occupiedBeds = beds.filter((b) => b.status === 'Occupied').length
  const availableBeds = beds.filter((b) => b.status === 'Available').length
  const cleaningBeds = beds.filter((b) => b.status === 'Cleaning').length
  const reservedBeds = beds.filter((b) => b.status === 'Reserved').length
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
    Occupied: 'bg-blue-500 hover:bg-blue-600',
    Available: 'bg-green-500 hover:bg-green-600',
    Cleaning: 'bg-yellow-500 hover:bg-yellow-600',
    Reserved: 'bg-purple-500 hover:bg-purple-600',
  }

  const statusBadgeColors: { [key in BedStatus]: string } = {
    Occupied: 'bg-blue-100 text-blue-700 border-blue-300',
    Available: 'bg-green-100 text-green-700 border-green-300',
    Cleaning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Reserved: 'bg-purple-100 text-purple-700 border-purple-300',
  }

  // Order status colors
  const orderStatusColors = {
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-300',
    Completed: 'bg-green-100 text-green-700 border-green-300',
    Cancelled: 'bg-red-100 text-red-700 border-red-300',
  }

  return (
    
      <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                  <Bed className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Inpatient Management
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    Real-Time Bed Availability & Patient Tracking
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAdmitModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Admission
              </Button>
              <Button
                variant="outline"
                className="border-2"
                onClick={() => setShowTransferModal(true)}
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Transfer Patient
              </Button>
              <Button variant="outline" className="border-2">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Total Patients</p>
                  <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span>+{newAdmissionsToday} new</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="h-3 w-3 text-blue-600" />
                  <span>{dischargesToday} discharged</span>
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
                  <p className="text-sm font-semibold text-gray-600">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{occupancyRate}%</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {occupiedBeds} occupied / {totalBeds} total beds
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
                  <p className="text-sm font-semibold text-gray-600">Avg. Length of Stay</p>
                  <p className="text-3xl font-bold text-gray-900">{avgStayDays} days</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">Average patient stay across all units</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <BedDouble className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Available Beds</p>
                  <p className="text-3xl font-bold text-gray-900">{availableBeds}</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                  {cleaningBeds} cleaning
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                  {reservedBeds} reserved
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
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Bed no, patient name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Ward</label>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Wards</option>
                  {WARDS.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Available">Available</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full border-2"
                  onClick={() => {
                    setSelectedWard('All')
                    setSelectedStatus('All')
                    setSearchTerm('')
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Filters
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
                <CardTitle>Bed Status Map</CardTitle>
                <CardDescription>Real-time bed availability across all units</CardDescription>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-blue-500 rounded" />
                  <span className="text-sm font-medium">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-green-500 rounded" />
                  <span className="text-sm font-medium">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-yellow-500 rounded" />
                  <span className="text-sm font-medium">Cleaning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-purple-500 rounded" />
                  <span className="text-sm font-medium">Reserved</span>
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
                        <Building2 className="h-5 w-5 text-blue-600" />
                        {ward}
                      </h3>
                      <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                        {wardBeds.filter((b) => b.status === 'Occupied').length} /{' '}
                        {wardBeds.length} occupied
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
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-purple-50 border-b-2 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    Bed {selectedBed.bedNumber} - {selectedBed.patient.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {selectedBed.ward} Unit • Day {selectedBed.patient.daysInHospital}
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
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  )}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={cn(
                    'px-4 py-2 font-semibold border-b-2 -mb-0.5 transition-colors',
                    activeTab === 'details'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  )}
                >
                  Detailed Information
                </button>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Patient Info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Patient Information</p>
                      <p className="font-bold text-gray-900">{selectedBed.patient.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedBed.patient.age} years • {selectedBed.patient.gender}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        MRN: {selectedBed.patient.mrn}
                      </p>
                      <p className="text-sm text-gray-600">
                        Admitted: {selectedBed.patient.admissionDate}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Diagnosis</p>
                      <p className="font-bold text-gray-900">{selectedBed.patient.diagnosis}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Acuity: Level {selectedBed.patient.acuityScore}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Care Team</p>
                      <p className="font-bold text-gray-900 flex items-center gap-1">
                        <Stethoscope className="h-4 w-4" />
                        {selectedBed.patient.attendingDoctor}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <User className="h-3 w-3" />
                        {selectedBed.patient.nurse}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Insurance</p>
                      <p className="font-bold text-gray-900">{selectedBed.patient.insurance.provider}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Policy: {selectedBed.patient.insurance.policyNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Group: {selectedBed.patient.insurance.groupNumber}
                      </p>
                    </div>
                  </div>

                  {/* Vital Signs Chart */}
                  <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Vital Signs Trends (Last 24 Hours)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Temperature Chart */}
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-3">Temperature (°F)</p>
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
                          Blood Pressure (mmHg)
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
                              name="Systolic"
                              dot={{ fill: '#f59e0b', r: 4 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="diastolic"
                              stroke="#10b981"
                              strokeWidth={2}
                              name="Diastolic"
                              dot={{ fill: '#10b981', r: 4 }}
                            />
                            <Legend />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Pulse Chart */}
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-3">Heart Rate (bpm)</p>
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
                      onClick={() => setShowNorasingNoteModal(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Add Nursing Note
                    </Button>
                    <Button
                      onClick={() => setShowDoctorOrderModal(true)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      New Order
                    </Button>
                    <Button
                      onClick={() => setShowDischargeModal(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Plan Discharge
                    </Button>
                    <Button variant="outline" className="border-2">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Information
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Medications */}
                  <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Pill className="h-5 w-5 text-blue-600" />
                      Medication Administration Schedule (MAR)
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
                        <FileText className="h-5 w-5 text-blue-600" />
                        Physician Orders
                      </h3>
                      <Button
                        size="sm"
                        onClick={() => setShowDoctorOrderModal(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Order
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
                                Ordered by: {order.orderedBy} •{' '}
                                {new Date(order.orderDate).toLocaleDateString('en-US')}
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
                        <ClipboardList className="h-5 w-5 text-blue-600" />
                        Nursing Assessment Notes
                      </h3>
                      <Button
                        size="sm"
                        onClick={() => setShowNorasingNoteModal(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Note
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
                        Discharge Planning
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Estimated Discharge Date
                          </p>
                          <p className="font-bold text-gray-900">
                            {selectedBed.patient.dischargeInfo.estimatedDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Discharge Summary</p>
                          <p className="text-gray-900">
                            {selectedBed.patient.dischargeInfo.summary}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Post-Discharge Instructions
                          </p>
                          <p className="text-gray-900">
                            {selectedBed.patient.dischargeInfo.instructions}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Follow-Up Appointment</p>
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

        {/* HIPAA Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">
                HIPAA Compliance - Inpatient Management System
              </h3>
              <p className="text-sm text-purple-800">
                All patient records, vital signs, medication administration, and medical notes are protected
                under HIPAA regulations. Data is encrypted at rest and in transit, accessible only by authorized
                personnel. The system is fully integrated with our EHR platform and follows Epic Cadence best practices
                for bed management and ADT workflows.
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
              <h2 className="text-2xl font-bold text-gray-900">New Patient Admission</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAdmitModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Select Patient
                </label>
                <Input placeholder="Search patient..." className="border-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Ward</label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  {WARDS.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Bed</label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  <option>Select available bed...</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Admission Diagnosis
                </label>
                <Input placeholder="Enter diagnosis..." className="border-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Attending Physician
                </label>
                <Input placeholder="Select physician..." className="border-2" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Admission
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowAdmitModal(false)}
                >
                  Cancel
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
              <h2 className="text-2xl font-bold text-gray-900">Patient Transfer</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowTransferModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Current Patient
                </label>
                <Input placeholder="Select patient..." className="border-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Target Ward
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
                  Target Bed
                </label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  <option>Select available bed...</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Transfer Reason
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[100px]"
                  placeholder="Enter transfer reason..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Complete Transfer
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowTransferModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNorasingNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nursing Assessment Note</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowNorasingNoteModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Shift</label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  <option>Morning 08:00-16:00</option>
                  <option>Evening 16:00-00:00</option>
                  <option>Night 00:00-08:00</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Assessment Note
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[150px]"
                  placeholder="Patient condition, vital signs, procedures performed..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowNorasingNoteModal(false)}
                >
                  Cancel
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
              <h2 className="text-2xl font-bold text-gray-900">New Physician Order</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowDoctorOrderModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Order Type</label>
                <select className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg">
                  <option>Lab</option>
                  <option>Imaging</option>
                  <option>Medication</option>
                  <option>Consultation</option>
                  <option>Diet</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Description</label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[100px]"
                  placeholder="Enter order details..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Order
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowDoctorOrderModal(false)}
                >
                  Cancel
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
              <h2 className="text-2xl font-bold text-gray-900">Discharge Planning</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowDischargeModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Estimated Discharge Date
                </label>
                <Input type="date" className="border-2" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Discharge Summary
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[100px]"
                  placeholder="Patient's hospital stay, treatments provided, current condition..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Post-Discharge Instructions
                </label>
                <textarea
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg min-h-[100px]"
                  placeholder="Medication usage, diet, activity restrictions..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Follow-Up Appointment Date
                </label>
                <Input type="date" className="border-2" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Discharge Plan
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setShowDischargeModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    
  </DashboardLayout>
  )
}

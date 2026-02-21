'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

import { useState, useMemo, useEffect } from 'react'
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Stethoscope,
  Building2,
  FileText,
  Edit,
  Trash2,
  Bell,
  Shield,
  X,
  ChevronLeft,
  ChevronRight,
  Printer,
  Users,
  CalendarDays,
  AlertTriangle,
  Send,
  Video,
  MapPin,
  CreditCard,
  Activity,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Interfaces
interface Appointment {
  id: string
  appointmentNo: string
  patientName: string
  patientSurname: string
  mrn: string // Medical Record Number
  phone: string
  email?: string
  doctor: string
  department: string
  date: string
  time: string
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'No-Show'
  type: 'In-Person' | 'Telehealth' | 'Urgent'
  insurance?: string
  copay?: number
  appointmentCode?: string
  notes?: string
}

// US Medical Departments
const departments = [
  'Internal Medicine',
  'Cardiology',
  'Pulmonology',
  'Orthopedics',
  'General Surgery',
  'Neurology',
  'Dermatology',
  'ENT (Otolaryngology)',
  'Ophthalmology',
  'Pediatrics',
  'Obstetrics & Gynecology',
  'Psychiatry',
  'Oncology',
  'Endocrinology',
  'Nephrology',
]

const doctors = [
  'Dr. James Wilson, MD',
  'Dr. Mary Johnson, DO',
  'Dr. Robert Smith, MD',
  'Dr. Patricia Brown, MD',
  'Dr. Michael Davis, MD',
  'Dr. Jennifer Martinez, DO',
  'Dr. William Garcia, MD',
  'Dr. Linda Rodriguez, MD',
  'Dr. David Anderson, MD',
  'Dr. Barbara Taylor, DO',
  'Dr. Richard Thomas, MD',
  'Dr. Susan Jackson, MD',
  'Dr. Joseph White, MD',
  'Dr. Karen Harris, DO',
  'Dr. Charles Martinez, MD',
  'Dr. Sarah Thompson, MD',
  'Dr. Thomas Moore, MD',
  'Dr. Nancy Clark, DO',
  'Dr. Christopher Lewis, MD',
  'Dr. Lisa Lee, MD',
]

const firstNames = [
  'James', 'Robert', 'Michael', 'John', 'David', 'Richard', 'Joseph', 'Thomas',
  'Christopher', 'Daniel', 'Mary', 'Patricia', 'Jennifer', 'Sarah', 'Barbara',
  'Susan', 'Karen', 'Jessica', 'Nancy', 'Lisa', 'Emily', 'Ashley', 'Matthew',
  'Andrew', 'Joshua', 'Amanda', 'Melissa', 'Michelle', 'Laura', 'Kevin',
]

const lastNames = [
  'Wilson', 'Johnson', 'Smith', 'Brown', 'Martinez', 'Davis', 'Garcia',
  'Rodriguez', 'Anderson', 'Taylor', 'Thomas', 'Jackson', 'White', 'Harris',
  'Thompson', 'Moore', 'Clark', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen',
  'Young', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams',
]

const insuranceProviders = [
  'Medicare',
  'Medicaid',
  'Blue Cross Blue Shield',
  'Aetna',
  'UnitedHealthcare',
  'Cigna',
  'Humana',
  'Kaiser Permanente',
  'Self-Pay',
]

const statuses: Array<'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'No-Show'> = [
  'Pending',
  'Confirmed',
  'Cancelled',
  'Completed',
  'No-Show',
]

const appointmentTypes: Array<'In-Person' | 'Telehealth' | 'Urgent'> = [
  'In-Person',
  'Telehealth',
  'Urgent',
]

const timeSlots = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM',
]

// Generate MRN (Medical Record Number)
const generateMRN = (): string => {
  return `MRN${Math.floor(100000 + Math.random() * 900000)}`
}

// Generate US phone numbers
const generatePhone = (): string => {
  const areaCode = Math.floor(200 + Math.random() * 800)
  const prefix = Math.floor(200 + Math.random() * 800)
  const lineNum = Math.floor(1000 + Math.random() * 9000)
  return `(${areaCode}) ${prefix}-${lineNum}`
}

// Generate dates for next 30 days (US format: MM/DD/YYYY)
const generateDate = (dayOffset: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + dayOffset)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

// Generate appointments with seed for consistency
const generateAppointments = (seed: number = 42): Appointment[] => {
  // Simple seeded random
  let rng = seed
  const seededRandom = () => {
    rng = (rng * 9301 + 49297) % 233280
    return rng / 233280
  }

  const appointments: Appointment[] = []

  for (let i = 0; i < 120; i++) {
    const firstName = firstNames[Math.floor(seededRandom() * firstNames.length)]
    const lastName = lastNames[Math.floor(seededRandom() * lastNames.length)]
    const doctor = doctors[Math.floor(seededRandom() * doctors.length)]
    const department = departments[Math.floor(seededRandom() * departments.length)]
    const dayOffset = Math.floor(seededRandom() * 30) - 5 // -5 to +25 days
    const time = timeSlots[Math.floor(seededRandom() * timeSlots.length)]
    const status = statuses[Math.floor(seededRandom() * statuses.length)]
    const type = appointmentTypes[Math.floor(seededRandom() * appointmentTypes.length)]
    const insurance = insuranceProviders[Math.floor(seededRandom() * insuranceProviders.length)]
    const copay = insurance === 'Self-Pay' ? 0 : [15, 20, 25, 30, 35, 40, 50][Math.floor(seededRandom() * 7)]

    appointments.push({
      id: `APT-${String(i + 1).padStart(4, '0')}`,
      appointmentNo: `APT-2024-${String(i + 1).padStart(5, '0')}`,
      patientName: firstName,
      patientSurname: lastName,
      mrn: generateMRN(),
      phone: generatePhone(),
      email: seededRandom() > 0.3 ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com` : undefined,
      doctor,
      department,
      date: generateDate(dayOffset),
      time,
      status,
      type,
      insurance,
      copay,
      appointmentCode: seededRandom() > 0.2 ? `EHR-${String(Math.floor(seededRandom() * 99999)).padStart(5, '0')}` : undefined,
      notes: seededRandom() > 0.7 ? 'Follow-up examination - previous treatment monitoring' : undefined,
    })
  }

  return appointments.sort((a, b) => {
    // Parse MM/DD/YYYY format
    const [monthA, dayA, yearA] = a.date.split('/')
    const [monthB, dayB, yearB] = b.date.split('/')
    const dateA = `${yearA}${monthA.padStart(2, '0')}${dayA.padStart(2, '0')}`
    const dateB = `${yearB}${monthB.padStart(2, '0')}${dayB.padStart(2, '0')}`
    if (dateA !== dateB) return dateA.localeCompare(dateB)
    return a.time.localeCompare(b.time)
  })
}

export default function AppointmentsPage() {
  // Use useEffect to generate appointments only on client-side to avoid hydration mismatch
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generate appointments once on mount
    setAppointments(generateAppointments())
    setIsLoading(false)
  }, [])

  const [view, setView] = useState<'day' | 'week' | 'month' | 'list'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDoctor, setFilterDoctor] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEHRModal, setShowEHRModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  // Create appointment form
  const [newAppointment, setNewAppointment] = useState({
    patientSearch: '',
    patientName: '',
    patientSurname: '',
    mrn: '',
    phone: '',
    email: '',
    doctor: '',
    department: '',
    date: '',
    time: '',
    type: 'In-Person' as 'In-Person' | 'Telehealth' | 'Urgent',
    insurance: '',
    copay: '0',
    smsReminder: true,
    emailReminder: true,
  })

  // EHR search
  const [ehrMRN, setEhrMRN] = useState('')

  // Reschedule
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState('')

  // Cancel
  const [cancelReason, setCancelReason] = useState('')

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesSearch =
        searchTerm === '' ||
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.patientSurname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.mrn.includes(searchTerm) ||
        apt.appointmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.appointmentCode?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDoctor = filterDoctor === '' || apt.doctor === filterDoctor
      const matchesDepartment = filterDepartment === '' || apt.department === filterDepartment
      const matchesStatus = filterStatus === '' || apt.status === filterStatus
      const matchesType = filterType === '' || apt.type === filterType

      return matchesSearch && matchesDoctor && matchesDepartment && matchesStatus && matchesType
    })
  }, [appointments, searchTerm, filterDoctor, filterDepartment, filterStatus, filterType])

  // Statistics
  const stats = useMemo(() => {
    return {
      total: filteredAppointments.length,
      pending: filteredAppointments.filter((a) => a.status === 'Pending').length,
      confirmed: filteredAppointments.filter((a) => a.status === 'Confirmed').length,
      cancelled: filteredAppointments.filter((a) => a.status === 'Cancelled').length,
      completed: filteredAppointments.filter((a) => a.status === 'Completed').length,
      noShow: filteredAppointments.filter((a) => a.status === 'No-Show').length,
      telehealth: filteredAppointments.filter((a) => a.type === 'Telehealth').length,
    }
  }, [filteredAppointments])

  // Status colors
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Confirmed: 'bg-green-100 text-green-700 border-green-300',
    Cancelled: 'bg-red-100 text-red-700 border-red-300',
    Completed: 'bg-blue-100 text-blue-700 border-blue-300',
    'No-Show': 'bg-gray-100 text-gray-700 border-gray-300',
  }

  // Type colors
  const typeColors = {
    'In-Person': 'bg-blue-100 text-blue-700 border-blue-300',
    Telehealth: 'bg-purple-100 text-purple-700 border-purple-300',
    Urgent: 'bg-red-100 text-red-700 border-red-300',
  }

  // Get unique doctors and departments
  const uniqueDoctors = Array.from(new Set(appointments.map((a) => a.doctor))).sort()
  const uniqueDepartments = Array.from(new Set(appointments.map((a) => a.department))).sort()

  // Create appointment
  const handleCreateAppointment = () => {
    if (
      !newAppointment.patientName ||
      !newAppointment.patientSurname ||
      !newAppointment.mrn ||
      !newAppointment.phone ||
      !newAppointment.doctor ||
      !newAppointment.department ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      alert('Please fill all required fields')
      return
    }

    // Check for overbooking
    const doctorAppointments = appointments.filter(
      (a) =>
        a.doctor === newAppointment.doctor &&
        a.date === newAppointment.date &&
        a.time === newAppointment.time &&
        a.status !== 'Cancelled'
    )

    if (doctorAppointments.length > 0) {
      if (
        !confirm(
          'WARNING: This doctor has another appointment at the selected date and time. Do you want to proceed with overbooking?'
        )
      ) {
        return
      }
    }

    const newApt: Appointment = {
      id: `APT-${String(appointments.length + 1).padStart(4, '0')}`,
      appointmentNo: `APT-2024-${String(appointments.length + 1).padStart(5, '0')}`,
      patientName: newAppointment.patientName,
      patientSurname: newAppointment.patientSurname,
      mrn: newAppointment.mrn,
      phone: newAppointment.phone,
      email: newAppointment.email || undefined,
      doctor: newAppointment.doctor,
      department: newAppointment.department,
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      insurance: newAppointment.insurance || undefined,
      copay: parseFloat(newAppointment.copay) || undefined,
      status: 'Pending',
      appointmentCode: undefined,
    }

    setAppointments([...appointments, newApt])
    setShowCreateModal(false)
    setNewAppointment({
      patientSearch: '',
      patientName: '',
      patientSurname: '',
      mrn: '',
      phone: '',
      email: '',
      doctor: '',
      department: '',
      date: '',
      time: '',
      type: 'In-Person',
      insurance: '',
      copay: '0',
      smsReminder: true,
      emailReminder: true,
    })

    const notifications = []
    if (newAppointment.smsReminder) notifications.push('SMS')
    if (newAppointment.emailReminder) notifications.push('Email')

    if (notifications.length > 0) {
      alert(`Appointment created successfully. ${notifications.join(' and ')} reminders will be sent to the patient.`)
    } else {
      alert('Appointment created successfully.')
    }
  }

  // Import from EHR
  const handleEHRImport = () => {
    if (!ehrMRN || ehrMRN.length < 6) {
      alert('Please enter a valid Medical Record Number (MRN)')
      return
    }

    // Simulate EHR import
    alert(
      `Importing from EHR System...\n\nMRN: ${ehrMRN}\n\nFound 2 scheduled appointments.\nImported successfully.`
    )
    setShowEHRModal(false)
    setEhrMRN('')
  }

  // Reschedule appointment
  const handleReschedule = () => {
    if (!selectedAppointment || !rescheduleDate || !rescheduleTime) {
      alert('Please select new date and time')
      return
    }

    const updated = appointments.map((a) =>
      a.id === selectedAppointment.id ? { ...a, date: rescheduleDate, time: rescheduleTime } : a
    )

    setAppointments(updated)
    setShowRescheduleModal(false)
    setRescheduleDate('')
    setRescheduleTime('')
    alert(
      'Appointment rescheduled successfully. SMS and email notifications have been sent to the patient.'
    )
  }

  // Cancel appointment
  const handleCancel = () => {
    if (!selectedAppointment) return

    if (!cancelReason.trim()) {
      alert('Please enter cancellation reason')
      return
    }

    const updated = appointments.map((a) =>
      a.id === selectedAppointment.id
        ? { ...a, status: 'Cancelled' as const, notes: `Cancellation Reason: ${cancelReason}` }
        : a
    )

    setAppointments(updated)
    setShowCancelModal(false)
    setCancelReason('')
    alert('Appointment cancelled. Notification sent to patient.')
  }

  // Export to Excel
  const handleExportExcel = () => {
    alert(
      `Appointment list downloading in Excel format...\n\nFile: appointments-${new Date().toISOString().split('T')[0]}.xlsx`
    )
  }

  // Print daily schedule
  const handlePrintSchedule = () => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const year = today.getFullYear()
    const todayStr = `${month}/${day}/${year}`
    const todayAppointments = filteredAppointments.filter((a) => a.date === todayStr)

    alert(`Printing Daily Appointment Schedule...\n\nDate: ${todayStr}\nTotal: ${todayAppointments.length} appointments`)

    // In real implementation, would open print dialog
    window.print()
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
          <div className="text-center">
            <div className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-600 font-medium">Loading Appointments...</p>
          </div>
        </div>
      </DashboardLayout>
    )
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
                    <Calendar className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Appointment Scheduling
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">
                      Epic-Inspired Scheduling System with EHR Integration
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
                <Button
                  onClick={() => setShowEHRModal(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  EHR Import
                </Button>
                <Button onClick={handleExportExcel} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={handlePrintSchedule}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Schedule
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Total</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-yellow-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Pending</span>
              </div>
              <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Confirmed</span>
              </div>
              <p className="text-3xl font-bold text-green-700">{stats.confirmed}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Completed</span>
              </div>
              <p className="text-3xl font-bold text-blue-700">{stats.completed}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Cancelled</span>
              </div>
              <p className="text-3xl font-bold text-red-700">{stats.cancelled}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">No-Show</span>
              </div>
              <p className="text-3xl font-bold text-gray-700">{stats.noShow}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Video className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Telehealth</span>
              </div>
              <p className="text-3xl font-bold text-purple-700">{stats.telehealth}</p>
            </div>
          </div>

          {/* Calendar View Tabs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setView('day')}
                  className={
                    view === 'day'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'
                  }
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Day
                </Button>
                <Button
                  onClick={() => setView('week')}
                  className={
                    view === 'week'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'
                  }
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Week
                </Button>
                <Button
                  onClick={() => setView('month')}
                  className={
                    view === 'month'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'
                  }
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Month
                </Button>
                <Button
                  onClick={() => setView('list')}
                  className={
                    view === 'list'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'
                  }
                >
                  <FileText className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-semibold px-4">December 2024</span>
                <Button size="sm" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Patient name, MRN, appointment no..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Doctor</label>
                <select
                  value={filterDoctor}
                  onChange={(e) => setFilterDoctor(e.target.value)}
                  className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Doctors</option>
                  {uniqueDoctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Department</label>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {uniqueDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                  <option value="No-Show">No-Show</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Telehealth">Telehealth</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b-2 border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Appointment Schedule</h3>
                  <p className="text-sm text-gray-600 font-medium mt-1">
                    Showing {filteredAppointments.length} appointments
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                  <Shield className="h-3 w-3 mr-1" />
                  EHR Integrated
                </Badge>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      MRN / Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Date / Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Type / Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Insurance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">
                              {appointment.patientName} {appointment.patientSurname}
                            </div>
                            <div className="text-xs text-gray-500">{appointment.appointmentNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">{appointment.mrn}</div>
                        <div className="text-xs text-gray-500">{appointment.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Stethoscope className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm font-semibold text-gray-900">{appointment.doctor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{appointment.department}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm font-semibold text-gray-900">{appointment.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm font-bold text-gray-900">{appointment.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={cn('border-2 font-semibold mb-1', typeColors[appointment.type])}>
                          {appointment.type === 'Telehealth' && <Video className="h-3 w-3 mr-1" />}
                          {appointment.type === 'Urgent' && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {appointment.type === 'In-Person' && <MapPin className="h-3 w-3 mr-1" />}
                          {appointment.type}
                        </Badge>
                        <Badge className={cn('border-2 font-semibold', statusColors[appointment.status])}>
                          {appointment.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.insurance || 'None'}</div>
                        {appointment.copay && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <CreditCard className="h-3 w-3" />
                            Copay: ${appointment.copay}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 bg-white"
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setShowRescheduleModal(true)
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            className="border-2 border-red-300 text-red-700 hover:bg-red-50 bg-white"
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setShowCancelModal(true)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            className="border-2 border-green-300 text-green-700 hover:bg-green-50 bg-white"
                            onClick={() =>
                              alert(
                                `Sending reminder to:\n${appointment.patientName} ${appointment.patientSurname}\n${appointment.phone}\n${appointment.email || 'No email'}`
                              )
                            }
                          >
                            <Bell className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* HIPAA Notice */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">HIPAA Compliance & Security</h3>
                <p className="text-sm text-purple-800">
                  All appointment records are securely stored in compliance with HIPAA (Health Insurance Portability
                  and Accountability Act). Patient information is encrypted and only accessible to authorized
                  healthcare staff. EHR integration is implemented in accordance with ONC and CMS interoperability
                  standards. This system supports HL7 FHIR standards for seamless data exchange.
                </p>
              </div>
            </div>
          </div>

          {/* Competitive Features Notice */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">
                  Enterprise Features - Epic & Cerner Inspired
                </h3>
                <p className="text-sm text-blue-800">
                  <strong>Smart Scheduling:</strong> AI-powered appointment optimization to reduce no-shows and maximize
                  provider utilization. <strong>Patient Engagement:</strong> Automated SMS and email reminders with
                  two-way communication. <strong>Telehealth Integration:</strong> Seamless virtual visit scheduling and
                  delivery. <strong>Revenue Cycle:</strong> Insurance verification and copay collection at time of
                  scheduling. <strong>Analytics:</strong> Real-time dashboards for appointment metrics, provider
                  productivity, and patient flow optimization.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Create Appointment Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b-2 border-gray-100 sticky top-0 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Create New Appointment</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Patient Search */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Search Patient (MRN or Name)
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search by MRN or patient name..."
                      value={newAppointment.patientSearch}
                      onChange={(e) => setNewAppointment({ ...newAppointment, patientSearch: e.target.value })}
                      className="pl-10 border-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">First Name *</label>
                    <Input
                      value={newAppointment.patientName}
                      onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Last Name *</label>
                    <Input
                      value={newAppointment.patientSurname}
                      onChange={(e) => setNewAppointment({ ...newAppointment, patientSurname: e.target.value })}
                      className="border-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">MRN *</label>
                    <Input
                      value={newAppointment.mrn}
                      onChange={(e) => setNewAppointment({ ...newAppointment, mrn: e.target.value })}
                      className="border-2"
                      placeholder="MRN######"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone *</label>
                    <Input
                      value={newAppointment.phone}
                      onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                      className="border-2"
                      placeholder="(###) ###-####"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
                    className="border-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Department *</label>
                    <select
                      value={newAppointment.department}
                      onChange={(e) => setNewAppointment({ ...newAppointment, department: e.target.value })}
                      className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      {uniqueDepartments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Provider *</label>
                    <select
                      value={newAppointment.doctor}
                      onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                      className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Provider</option>
                      {uniqueDoctors.map((doctor) => (
                        <option key={doctor} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Date *</label>
                    <Input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => {
                        const date = new Date(e.target.value)
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        const year = date.getFullYear()
                        const formatted = `${month}/${day}/${year}`
                        setNewAppointment({ ...newAppointment, date: formatted })
                      }}
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Time *</label>
                    <select
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Appointment Type *</label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => {
                        const value = e.target.value as 'In-Person' | 'Telehealth' | 'Urgent'
                        setNewAppointment({
                          ...newAppointment,
                          type: value,
                        })
                      }}
                      className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="In-Person">In-Person Visit</option>
                      <option value="Telehealth">Telehealth (Virtual)</option>
                      <option value="Urgent">Urgent Visit</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Insurance</label>
                    <select
                      value={newAppointment.insurance}
                      onChange={(e) => setNewAppointment({ ...newAppointment, insurance: e.target.value })}
                      className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Insurance</option>
                      {insuranceProviders.map((ins) => (
                        <option key={ins} value={ins}>
                          {ins}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Copay Amount ($)</label>
                  <Input
                    type="number"
                    value={newAppointment.copay}
                    onChange={(e) => setNewAppointment({ ...newAppointment, copay: e.target.value })}
                    className="border-2"
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <input
                      type="checkbox"
                      id="smsReminder"
                      checked={newAppointment.smsReminder}
                      onChange={(e) => setNewAppointment({ ...newAppointment, smsReminder: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="smsReminder" className="text-sm font-semibold text-gray-700">
                      Send SMS Reminder
                    </label>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <input
                      type="checkbox"
                      id="emailReminder"
                      checked={newAppointment.emailReminder}
                      onChange={(e) => setNewAppointment({ ...newAppointment, emailReminder: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="emailReminder" className="text-sm font-semibold text-gray-700">
                      Send Email Reminder
                    </label>
                  </div>
                </div>

                {/* Overbooking Warning */}
                {newAppointment.doctor && newAppointment.date && newAppointment.time && (
                  <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900">Overbooking Check</p>
                      <p className="text-xs text-amber-800 mt-1">
                        Checking for scheduling conflicts with selected provider...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t-2 border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <Button
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateAppointment}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Appointment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* EHR Integration Modal */}
        {showEHRModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
              <div className="p-6 border-b-2 border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">EHR System Import</h3>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowEHRModal(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Search by Medical Record Number
                  </label>
                  <Input
                    placeholder="Enter MRN (e.g., MRN123456)"
                    value={ehrMRN}
                    onChange={(e) => setEhrMRN(e.target.value)}
                    className="border-2"
                  />
                </div>

                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">EHR Connection Active</p>
                      <p className="text-xs text-green-800 mt-1">
                        Secure connection established with Electronic Health Record system. HL7 FHIR compliant data
                        exchange enabled.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t-2 border-gray-100 flex items-center justify-end gap-3">
                <Button
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
                  onClick={() => setShowEHRModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEHRImport}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Import Appointments
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
              <div className="p-6 border-b-2 border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Reschedule Appointment</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowRescheduleModal(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedAppointment.patientName} {selectedAppointment.patientSurname}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Current: {selectedAppointment.date} at {selectedAppointment.time}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedAppointment.doctor} - {selectedAppointment.department}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">New Date</label>
                    <Input
                      type="date"
                      value={rescheduleDate}
                      onChange={(e) => {
                        const date = new Date(e.target.value)
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate()).padStart(2, '0')
                        const year = date.getFullYear()
                        const formatted = `${month}/${day}/${year}`
                        setRescheduleDate(formatted)
                      }}
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">New Time</label>
                    <select
                      value={rescheduleTime}
                      onChange={(e) => setRescheduleTime(e.target.value)}
                      className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900">Automated Notifications</p>
                  <p className="text-xs text-blue-800 mt-1">
                    Patient will be notified of the rescheduled appointment via SMS and email.
                  </p>
                </div>
              </div>

              <div className="p-6 border-t-2 border-gray-100 flex items-center justify-end gap-3">
                <Button
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
                  onClick={() => setShowRescheduleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReschedule}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Reschedule
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Modal */}
        {showCancelModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
              <div className="p-6 border-b-2 border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Cancel Appointment</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowCancelModal(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedAppointment.patientName} {selectedAppointment.patientSurname}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedAppointment.date} at {selectedAppointment.time}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedAppointment.doctor} - {selectedAppointment.department}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Cancellation Reason *</label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Please provide reason for cancellation..."
                  />
                </div>

                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-900">Important Notice</p>
                      <p className="text-xs text-red-800 mt-1">
                        This appointment will be cancelled and the patient will be notified immediately via SMS and email.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t-2 border-gray-100 flex items-center justify-end gap-3">
                <Button
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Appointment
                </Button>
                <Button
                  onClick={handleCancel}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

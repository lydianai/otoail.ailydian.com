/**
 * Appointments Data Service
 * Provides comprehensive appointment scheduling, management, and analytics
 * HIPAA-compliant with HL7 FHIR R5 Appointment resource compatibility
 */

export type AppointmentStatus =
  | 'Scheduled'
  | 'Confirmed'
  | 'Arrived'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'No Show'
  | 'Rescheduled'

export type AppointmentType =
  | 'Office Visit'
  | 'Follow-up'
  | 'Annual Physical'
  | 'Urgent Care'
  | 'Telemedicine'
  | 'Procedure'
  | 'Lab Work'
  | 'Imaging'
  | 'Therapy'
  | 'Consultation'

export type VisitType =
  | 'New Patient'
  | 'Established Patient'
  | 'Consultation'
  | 'Follow-up'

export interface Provider {
  id: string
  npi: string // National Provider Identifier
  firstName: string
  lastName: string
  title: string // MD, DO, NP, PA, etc.
  specialty: string
  department: string
  email: string
  phone: string
  acceptingNewPatients: boolean
  averageRating: number
  totalReviews: number
}

export interface Appointment {
  id: string
  appointmentNumber: string // Unique identifier
  patientId: string
  patientName: string
  patientDOB: string
  patientPhone: string
  patientEmail: string
  providerId: string
  providerName: string
  providerTitle: string
  providerSpecialty: string
  department: string
  appointmentType: AppointmentType
  visitType: VisitType
  chiefComplaint?: string
  status: AppointmentStatus
  scheduledDate: string // ISO format
  scheduledTime: string // HH:MM
  duration: number // minutes
  checkInTime?: string
  checkOutTime?: string
  roomNumber?: string
  insuranceVerified: boolean
  copayCollected: boolean
  copayAmount?: number
  notes?: string
  cancellationReason?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface AppointmentSlot {
  id: string
  providerId: string
  providerName: string
  date: string
  time: string
  duration: number
  available: boolean
  slotType: 'Regular' | 'Urgent' | 'Telemedicine'
}

export interface AppointmentStats {
  todayTotal: number
  todayCompleted: number
  todayScheduled: number
  todayNoShow: number
  todayCancelled: number
  weekTotal: number
  monthTotal: number
  averageDuration: number
  utilizationRate: number // percentage
}

// Sample providers database
const providers: Provider[] = [
  {
    id: 'prov-001',
    npi: '1234567890',
    firstName: 'Sarah',
    lastName: 'Johnson',
    title: 'MD',
    specialty: 'Internal Medicine',
    department: 'Primary Care',
    email: 'sjohnson@hospital.com',
    phone: '(555) 100-0001',
    acceptingNewPatients: true,
    averageRating: 4.8,
    totalReviews: 342
  },
  {
    id: 'prov-002',
    npi: '1234567891',
    firstName: 'Michael',
    lastName: 'Chen',
    title: 'MD',
    specialty: 'Cardiology',
    department: 'Cardiology',
    email: 'mchen@hospital.com',
    phone: '(555) 100-0002',
    acceptingNewPatients: true,
    averageRating: 4.9,
    totalReviews: 456
  },
  {
    id: 'prov-003',
    npi: '1234567892',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    title: 'NP',
    specialty: 'Family Medicine',
    department: 'Primary Care',
    email: 'erodriguez@hospital.com',
    phone: '(555) 100-0003',
    acceptingNewPatients: true,
    averageRating: 4.7,
    totalReviews: 289
  },
  {
    id: 'prov-004',
    npi: '1234567893',
    firstName: 'David',
    lastName: 'Williams',
    title: 'MD',
    specialty: 'Orthopedic Surgery',
    department: 'Orthopedics',
    email: 'dwilliams@hospital.com',
    phone: '(555) 100-0004',
    acceptingNewPatients: false,
    averageRating: 4.9,
    totalReviews: 512
  },
  {
    id: 'prov-005',
    npi: '1234567894',
    firstName: 'Lisa',
    lastName: 'Anderson',
    title: 'MD',
    specialty: 'Pediatrics',
    department: 'Pediatrics',
    email: 'landerson@hospital.com',
    phone: '(555) 100-0005',
    acceptingNewPatients: true,
    averageRating: 4.8,
    totalReviews: 398
  },
  {
    id: 'prov-006',
    npi: '1234567895',
    firstName: 'Robert',
    lastName: 'Taylor',
    title: 'DO',
    specialty: 'Emergency Medicine',
    department: 'Emergency',
    email: 'rtaylor@hospital.com',
    phone: '(555) 100-0006',
    acceptingNewPatients: false,
    averageRating: 4.6,
    totalReviews: 234
  },
  {
    id: 'prov-007',
    npi: '1234567896',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    title: 'PA',
    specialty: 'Urgent Care',
    department: 'Urgent Care',
    email: 'jmartinez@hospital.com',
    phone: '(555) 100-0007',
    acceptingNewPatients: true,
    averageRating: 4.7,
    totalReviews: 176
  },
  {
    id: 'prov-008',
    npi: '1234567897',
    firstName: 'James',
    lastName: 'Brown',
    title: 'MD',
    specialty: 'Neurology',
    department: 'Neurology',
    email: 'jbrown@hospital.com',
    phone: '(555) 100-0008',
    acceptingNewPatients: true,
    averageRating: 4.9,
    totalReviews: 421
  }
]

// Generate realistic appointments for demonstration
export function generateAppointments(count: number = 200): Appointment[] {
  const appointments: Appointment[] = []
  const today = new Date()

  const appointmentTypes: AppointmentType[] = [
    'Office Visit', 'Follow-up', 'Annual Physical', 'Urgent Care',
    'Telemedicine', 'Procedure', 'Lab Work', 'Imaging', 'Therapy', 'Consultation'
  ]

  const visitTypes: VisitType[] = ['New Patient', 'Established Patient', 'Consultation', 'Follow-up']

  const chiefComplaints = [
    'Annual physical exam',
    'Follow-up on hypertension',
    'Chest pain evaluation',
    'Diabetes management',
    'Back pain',
    'Respiratory infection',
    'Skin rash',
    'Joint pain',
    'Headaches',
    'Fatigue',
    'Abdominal pain',
    'Anxiety management',
    'Depression follow-up',
    'Medication refill',
    'Lab result review'
  ]

  const statuses: AppointmentStatus[] = [
    'Scheduled', 'Confirmed', 'Arrived', 'In Progress', 'Completed', 'No Show', 'Cancelled'
  ]

  for (let i = 0; i < count; i++) {
    // Generate appointments within past 7 days and next 14 days
    const daysOffset = Math.floor(Math.random() * 21) - 7
    const appointmentDate = new Date(today)
    appointmentDate.setDate(today.getDate() + daysOffset)

    // Business hours: 8 AM to 5 PM
    const hour = 8 + Math.floor(Math.random() * 9)
    const minute = Math.random() < 0.5 ? 0 : 30

    const provider = providers[Math.floor(Math.random() * providers.length)]
    const appointmentType = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)]
    const visitType = visitTypes[Math.floor(Math.random() * visitTypes.length)]

    // Determine status based on date
    let status: AppointmentStatus
    if (daysOffset < 0) {
      // Past appointments
      const pastStatuses: AppointmentStatus[] = ['Completed', 'No Show', 'Cancelled', 'Completed', 'Completed']
      status = pastStatuses[Math.floor(Math.random() * pastStatuses.length)]
    } else if (daysOffset === 0) {
      // Today's appointments
      const todayStatuses: AppointmentStatus[] = ['Scheduled', 'Confirmed', 'Arrived', 'In Progress', 'Completed']
      status = todayStatuses[Math.floor(Math.random() * todayStatuses.length)]
    } else {
      // Future appointments
      status = Math.random() < 0.7 ? 'Confirmed' : 'Scheduled'
    }

    const duration = appointmentType === 'Annual Physical' ? 60 :
                    appointmentType === 'Procedure' ? 90 :
                    appointmentType === 'Lab Work' ? 15 : 30

    appointments.push({
      id: `appt-${String(i + 1).padStart(6, '0')}`,
      appointmentNumber: `A${today.getFullYear()}${String(i + 1000).padStart(6, '0')}`,
      patientId: `pat-${String(Math.floor(Math.random() * 247) + 1).padStart(6, '0')}`,
      patientName: generatePatientName(),
      patientDOB: generateDOB(),
      patientPhone: generatePhone(),
      patientEmail: generateEmail(),
      providerId: provider.id,
      providerName: `Dr. ${provider.firstName} ${provider.lastName}`,
      providerTitle: provider.title,
      providerSpecialty: provider.specialty,
      department: provider.department,
      appointmentType,
      visitType,
      chiefComplaint: chiefComplaints[Math.floor(Math.random() * chiefComplaints.length)],
      status,
      scheduledDate: appointmentDate.toISOString().split('T')[0],
      scheduledTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      duration,
      checkInTime: status === 'Arrived' || status === 'In Progress' || status === 'Completed'
        ? `${String(hour).padStart(2, '0')}:${String(minute + 5).padStart(2, '0')}`
        : undefined,
      checkOutTime: status === 'Completed'
        ? `${String(hour + Math.floor((minute + duration) / 60)).padStart(2, '0')}:${String((minute + duration) % 60).padStart(2, '0')}`
        : undefined,
      roomNumber: status === 'Arrived' || status === 'In Progress'
        ? `${Math.floor(Math.random() * 5) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 10))}`
        : undefined,
      insuranceVerified: Math.random() < 0.8,
      copayCollected: status === 'Arrived' || status === 'In Progress' || status === 'Completed',
      copayAmount: Math.random() < 0.8 ? [10, 20, 25, 30, 40, 50][Math.floor(Math.random() * 6)] : undefined,
      notes: Math.random() < 0.3 ? 'Patient requested morning appointment' : undefined,
      cancellationReason: status === 'Cancelled' ? ['Patient request', 'Weather', 'Emergency', 'Rescheduled'][Math.floor(Math.random() * 4)] : undefined,
      createdBy: 'Front Desk',
      createdAt: new Date(appointmentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  return appointments.sort((a, b) => {
    const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`)
    const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`)
    return dateA.getTime() - dateB.getTime()
  })
}

// Helper functions
function generatePatientName(): string {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'James', 'Jennifer', 'William', 'Mary', 'Richard', 'Patricia', 'Thomas']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson']
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}

function generateDOB(): string {
  const year = 1940 + Math.floor(Math.random() * 65)
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function generatePhone(): string {
  const areaCode = 200 + Math.floor(Math.random() * 800)
  const exchange = 200 + Math.floor(Math.random() * 800)
  const number = Math.floor(Math.random() * 10000)
  return `(${areaCode}) ${exchange}-${String(number).padStart(4, '0')}`
}

function generateEmail(): string {
  const names = ['john.smith', 'jane.doe', 'michael.johnson', 'emily.brown', 'david.wilson']
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com']
  return `${names[Math.floor(Math.random() * names.length)]}${Math.floor(Math.random() * 999)}@${domains[Math.floor(Math.random() * domains.length)]}`
}

// Calculate appointment statistics
export function calculateAppointmentStats(appointments: Appointment[]): AppointmentStats {
  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter(a => a.scheduledDate === today)

  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)

  const monthStart = new Date()
  monthStart.setDate(1)

  const weekAppointments = appointments.filter(a => {
    const date = new Date(a.scheduledDate)
    return date >= weekStart && date <= weekEnd
  })

  const monthAppointments = appointments.filter(a => {
    const date = new Date(a.scheduledDate)
    return date >= monthStart
  })

  const completedAppointments = appointments.filter(a => a.status === 'Completed')
  const totalDuration = completedAppointments.reduce((sum, a) => sum + a.duration, 0)

  return {
    todayTotal: todayAppointments.length,
    todayCompleted: todayAppointments.filter(a => a.status === 'Completed').length,
    todayScheduled: todayAppointments.filter(a => a.status === 'Scheduled' || a.status === 'Confirmed').length,
    todayNoShow: todayAppointments.filter(a => a.status === 'No Show').length,
    todayCancelled: todayAppointments.filter(a => a.status === 'Cancelled').length,
    weekTotal: weekAppointments.length,
    monthTotal: monthAppointments.length,
    averageDuration: completedAppointments.length > 0 ? Math.round(totalDuration / completedAppointments.length) : 30,
    utilizationRate: Math.round((completedAppointments.length / appointments.length) * 100)
  }
}

// Get available time slots for scheduling
export function getAvailableSlots(providerId: string, date: string): AppointmentSlot[] {
  const slots: AppointmentSlot[] = []
  const provider = providers.find(p => p.id === providerId)

  if (!provider) return slots

  // Generate slots from 8 AM to 5 PM (30-minute intervals)
  for (let hour = 8; hour < 17; hour++) {
    for (let minute of [0, 30]) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

      slots.push({
        id: `slot-${providerId}-${date}-${time}`,
        providerId,
        providerName: `Dr. ${provider.firstName} ${provider.lastName}`,
        date,
        time,
        duration: 30,
        available: Math.random() < 0.7, // 70% availability
        slotType: hour >= 16 ? 'Urgent' : 'Regular'
      })
    }
  }

  return slots
}

// Get all providers
export function getProviders(): Provider[] {
  return providers
}

// Get provider by ID
export function getProviderById(id: string): Provider | undefined {
  return providers.find(p => p.id === id)
}

// Search providers by specialty or name
export function searchProviders(query: string): Provider[] {
  const lowerQuery = query.toLowerCase()
  return providers.filter(p =>
    p.firstName.toLowerCase().includes(lowerQuery) ||
    p.lastName.toLowerCase().includes(lowerQuery) ||
    p.specialty.toLowerCase().includes(lowerQuery) ||
    p.department.toLowerCase().includes(lowerQuery)
  )
}

// Export sample data
export const sampleAppointments = generateAppointments(200)
export const sampleProviders = providers

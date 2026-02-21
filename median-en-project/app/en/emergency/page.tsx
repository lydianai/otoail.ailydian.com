'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

import { useState, useEffect } from 'react'
import {
  Ambulance,
  AlertTriangle,
  Heart,
  Activity,
  Clock,
  User,
  Phone,
  MapPin,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Stethoscope,
  Building2,
  FileText,
  Users,
  ArrowRight,
  Bell,
  Shield,
  CircleDot,
  Timer,
  TrendingUp,
  Siren,
  BedDouble,
  X,
  Check,
  AlertCircle,
  Thermometer,
  Droplet,
  Wind,
  Brain,
  UserPlus,
  Zap,
  Send,
  Home,
  Hospital,
  Skull,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Edit,
  Eye,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

// Types - US Emergency Standards (ESI + ACEP Guidelines)
type ESILevel = 1 | 2 | 3 | 4 | 5
type Gender = 'Male' | 'Female' | 'Other'
type ArrivalMethod = 'walk-in' | 'ems-911' | 'private-ambulance' | 'police' | 'transfer'
type PatientStatus = 'triage' | 'roomed' | 'provider-eval' | 'diagnostics' | 'treatment' | 'observation' | 'admitted' | 'discharged'
type BedStatus = 'available' | 'occupied' | 'cleaning' | 'blocked'
type TraumaLevel = 'level-1' | 'level-2' | 'level-3' | 'consult-only'

interface VitalSigns {
  heartRate: number
  bloodPressure: string
  temperature: number // Fahrenheit
  spo2: number
  respiratoryRate: number
  gcs: number
  systolic?: number
  diastolic?: number
  painScale?: number // 0-10
}

interface PatientInfo {
  firstName: string
  lastName: string
  mrn: string // Medical Record Number
  ssn?: string // Last 4 digits only
  age: number
  gender: Gender
  phone?: string
  address?: string
  insurance?: string
}

interface EmergencyPatient {
  id: string
  protocolNumber: string
  patientInfo: PatientInfo
  arrivalMethod: ArrivalMethod
  esiLevel: ESILevel
  priorityNumber: number
  chiefComplaint: string
  vitalSigns: VitalSigns
  arrivalTime: string
  arrivalDate: Date
  waitTimeMinutes: number
  doorToDoctorMinutes?: number // Key ED metric
  attendingProvider: string
  status: PatientStatus
  bedNumber?: string
  isRepeatVisit: boolean
  traumaLevel?: TraumaLevel
  stemiAlert?: boolean
  strokeAlert?: boolean
  sepsisConcern?: boolean
}

interface EmergencyBed {
  id: string
  bedNumber: string
  status: BedStatus
  patientId?: string
  patientName?: string
  esiLevel?: ESILevel
  startTime?: string
}

// US Patient Names
const usNames = {
  male: [
    { firstName: 'Robert', lastName: 'Wilson' },
    { firstName: 'John', lastName: 'Lewis' },
    { firstName: 'James', lastName: 'Johnson' },
    { firstName: 'Michael', lastName: 'Smith' },
    { firstName: 'David', lastName: 'Brown' },
    { firstName: 'Joseph', lastName: 'Martinez' },
    { firstName: 'Richard', lastName: 'Garcia' },
    { firstName: 'Thomas', lastName: 'Anderson' },
    { firstName: 'Christopher', lastName: 'Taylor' },
    { firstName: 'Daniel', lastName: 'Clark' },
    { firstName: 'Matthew', lastName: 'Jackson' },
    { firstName: 'Anthony', lastName: 'Davis' },
    { firstName: 'Steven', lastName: 'Thomas' },
    { firstName: 'Andrew', lastName: 'Walker' },
    { firstName: 'Joshua', lastName: 'White' },
  ],
  female: [
    { firstName: 'Patricia', lastName: 'Johnson' },
    { firstName: 'Mary', lastName: 'Smith' },
    { firstName: 'Emily', lastName: 'Wilson' },
    { firstName: 'Barbara', lastName: 'Brown' },
    { firstName: 'Jennifer', lastName: 'Martinez' },
    { firstName: 'Sarah', lastName: 'Anderson' },
    { firstName: 'Lisa', lastName: 'Garcia' },
    { firstName: 'Nancy', lastName: 'Lewis' },
    { firstName: 'Sharon', lastName: 'Taylor' },
    { firstName: 'Michelle', lastName: 'Clark' },
    { firstName: 'Amanda', lastName: 'Jackson' },
    { firstName: 'Rose', lastName: 'Davis' },
    { firstName: 'Diana', lastName: 'Thomas' },
    { firstName: 'Jessica', lastName: 'Walker' },
    { firstName: 'Ashley', lastName: 'White' },
  ],
}

const complaints = {
  1: [ // ESI Level 1 - Life-threatening
    'Chest pain with ST-elevation - STEMI ALERT',
    'Unresponsive - CPR in progress',
    'Severe respiratory distress - impending respiratory failure',
    'Major trauma - multi-system injuries',
    'Massive hemorrhage - Class IV shock',
    'Anaphylaxis with airway compromise',
    'Status epilepticus - continuous seizures',
    'Acute stroke with large vessel occlusion - CODE STROKE',
    'Cardiac arrest - post-ROSC',
    'Severe septic shock - hypotensive',
  ],
  2: [ // ESI Level 2 - High risk, confused/lethargic/disoriented
    'Chest pain - possible ACS, hemodynamically stable',
    'Severe abdominal pain - possible surgical emergency',
    'Acute stroke symptoms - within window for intervention',
    'High-risk trauma - possible internal injuries',
    'Severe asthma exacerbation - moderate distress',
    'Diabetic ketoacidosis - altered mental status',
    'GI bleed - hematemesis, stable vitals',
    'Sepsis - meeting SIRS criteria',
    'Hypertensive emergency - end-organ damage concern',
    'Acute renal colic - severe pain, possible obstruction',
  ],
  3: [ // ESI Level 3 - Stable, requires multiple resources
    'Moderate abdominal pain - requires imaging and labs',
    'Suspected fracture - requires X-ray and orthopedic consult',
    'Cellulitis - requires IV antibiotics',
    'Pneumonia - requires imaging, labs, admission consideration',
    'Urinary retention - requires catheterization',
    'Moderate asthma - requires nebulizer treatments',
    'Chest pain - low risk, requires cardiac workup',
    'Alcohol withdrawal - requires CIWA protocol',
    'Migraine - severe, requires multiple medications',
    'Syncope - requires cardiac monitoring and workup',
  ],
  4: [ // ESI Level 4 - Stable, one resource needed
    'Minor laceration - requires simple repair',
    'UTI symptoms - requires urinalysis only',
    'Ankle sprain - requires X-ray only',
    'Viral illness - requires one lab test',
    'Medication refill - requires prescription only',
    'Rash - requires dermatologic evaluation only',
    'Minor burn - requires wound care only',
    'Constipation - requires treatment only',
    'Earache - requires examination and prescription',
    'Back pain - chronic, requires medication adjustment',
  ],
  5: [ // ESI Level 5 - Non-urgent, no resources needed
    'Cold symptoms - viral URI',
    'Medication question - no acute issue',
    'Chronic issue - stable, scheduled follow-up',
    'Minor rash - no treatment needed',
    'Dental pain - non-emergent, referred to dentist',
    'Work/school note request',
    'Prescription renewal - stable chronic condition',
    'Suture removal',
    'Blood pressure check',
    'General health inquiry',
  ],
}

const usAddresses = [
  '4523 Elm Street, Brooklyn, NY 11201',
  '892 Oak Avenue, Los Angeles, CA 90012',
  '1567 Pine Road, Chicago, IL 60614',
  '3421 Maple Drive, Houston, TX 77002',
  '789 Cedar Lane, Phoenix, AZ 85004',
  '2145 Birch Street, Philadelphia, PA 19102',
  '6734 Walnut Court, San Antonio, TX 78205',
  '4298 Cherry Boulevard, San Diego, CA 92101',
  '1823 Spruce Way, Dallas, TX 75201',
  '5612 Ash Avenue, San Jose, CA 95113',
  '3456 Willow Street, Austin, TX 78701',
  '8901 Poplar Drive, Jacksonville, FL 32202',
  '2367 Hickory Lane, Fort Worth, TX 76102',
  '7234 Sycamore Road, Columbus, OH 43215',
  '4589 Dogwood Circle, Charlotte, NC 28202',
]

const providerNames = [
  'Dr. Mary Smith, MD',
  'Dr. James Brown, DO',
  'Dr. Jennifer Anderson, MD',
  'Dr. William Garcia, MD',
  'Dr. Sarah Thompson, PA-C',
  'Dr. Christopher White, MD',
  'Dr. Patricia Rodriguez, NP',
  'Dr. Robert Martinez, MD',
  'Dr. Linda Taylor, DO',
  'Dr. Michael Davis, MD',
]

const departments = [
  'Internal Medicine',
  'Cardiology',
  'Neurology',
  'General Surgery',
  'Orthopedic Surgery',
  'Pulmonology',
  'Gastroenterology',
  'Urology',
  'OB/GYN',
  'Pediatrics',
  'Critical Care (ICU)',
  'Telemetry',
]

const hospitals = [
  'Boston General Hospital',
  'Massachusetts General Hospital',
  'Johns Hopkins Hospital',
  'Mayo Clinic Hospital',
  'Cleveland Clinic',
  'UCLA Medical Center',
]

const insuranceProviders = [
  'Blue Cross Blue Shield',
  'Aetna',
  'UnitedHealthcare',
  'Cigna',
  'Humana',
  'Medicare',
  'Medicaid',
  'Kaiser Permanente',
  'Self-Pay',
  'Other',
]

// Generate random patient data - US Standards
function generateRandomPatient(id: number, esiLevel: ESILevel): EmergencyPatient {
  const gender: Gender = Math.random() > 0.5 ? 'Male' : 'Female'
  const names = gender === 'Male' ? usNames.male : usNames.female
  const randomName = names[Math.floor(Math.random() * names.length)]
  const complaint = complaints[esiLevel][Math.floor(Math.random() * complaints[esiLevel].length)]

  const now = new Date()
  const arrivalDate = new Date(now.getTime() - Math.random() * 6 * 60 * 60 * 1000) // Up to 6 hours ago
  const waitTimeMinutes = Math.floor((now.getTime() - arrivalDate.getTime()) / 1000 / 60)
  const doorToDoctorMinutes = esiLevel <= 2 ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 60) + 15

  const arrivalMethods: ArrivalMethod[] = ['walk-in', 'ems-911', 'private-ambulance', 'police', 'transfer']
  const arrivalMethod = esiLevel <= 2
    ? (Math.random() > 0.4 ? 'ems-911' : 'private-ambulance')
    : arrivalMethods[Math.floor(Math.random() * arrivalMethods.length)]

  const statuses: PatientStatus[] = ['triage', 'roomed', 'provider-eval', 'diagnostics', 'treatment', 'observation']
  const status = esiLevel <= 2
    ? (Math.random() > 0.5 ? 'treatment' : 'observation')
    : statuses[Math.floor(Math.random() * statuses.length)]

  // Vital signs based on ESI level
  let vitals: VitalSigns
  if (esiLevel === 1) {
    vitals = {
      heartRate: 110 + Math.floor(Math.random() * 50),
      bloodPressure: `${70 + Math.floor(Math.random() * 40)}/${40 + Math.floor(Math.random() * 30)}`,
      temperature: 95 + Math.random() * 8, // Fahrenheit
      spo2: 70 + Math.floor(Math.random() * 25),
      respiratoryRate: 24 + Math.floor(Math.random() * 16),
      gcs: 3 + Math.floor(Math.random() * 10),
      painScale: 8 + Math.floor(Math.random() * 3),
    }
  } else if (esiLevel === 2) {
    vitals = {
      heartRate: 85 + Math.floor(Math.random() * 35),
      bloodPressure: `${110 + Math.floor(Math.random() * 60)}/${65 + Math.floor(Math.random() * 35)}`,
      temperature: 97 + Math.random() * 5,
      spo2: 90 + Math.floor(Math.random() * 8),
      respiratoryRate: 18 + Math.floor(Math.random() * 10),
      gcs: 12 + Math.floor(Math.random() * 4),
      painScale: 6 + Math.floor(Math.random() * 4),
    }
  } else if (esiLevel === 3) {
    vitals = {
      heartRate: 70 + Math.floor(Math.random() * 30),
      bloodPressure: `${110 + Math.floor(Math.random() * 30)}/${70 + Math.floor(Math.random() * 20)}`,
      temperature: 97.5 + Math.random() * 3,
      spo2: 94 + Math.floor(Math.random() * 6),
      respiratoryRate: 14 + Math.floor(Math.random() * 8),
      gcs: 14 + Math.floor(Math.random() * 2),
      painScale: 4 + Math.floor(Math.random() * 5),
    }
  } else {
    vitals = {
      heartRate: 60 + Math.floor(Math.random() * 30),
      bloodPressure: `${110 + Math.floor(Math.random() * 25)}/${70 + Math.floor(Math.random() * 15)}`,
      temperature: 97.8 + Math.random() * 1.5,
      spo2: 96 + Math.floor(Math.random() * 4),
      respiratoryRate: 12 + Math.floor(Math.random() * 8),
      gcs: 15,
      painScale: Math.floor(Math.random() * 6),
    }
  }

  const priorityNumber = esiLevel === 1 ? Math.floor(Math.random() * 20) + 1
    : esiLevel === 2 ? Math.floor(Math.random() * 50) + 21
    : esiLevel === 3 ? Math.floor(Math.random() * 100) + 71
    : esiLevel === 4 ? Math.floor(Math.random() * 150) + 171
    : Math.floor(Math.random() * 200) + 321

  const mrn = `MRN${Math.floor(1000000 + Math.random() * 9000000)}`

  // Critical alerts
  const stemiAlert = complaint.includes('STEMI')
  const strokeAlert = complaint.includes('STROKE')
  const sepsisConcern = complaint.toLowerCase().includes('sepsis')

  let traumaLevel: TraumaLevel | undefined
  if (complaint.toLowerCase().includes('trauma')) {
    traumaLevel = esiLevel === 1 ? 'level-1' : esiLevel === 2 ? 'level-2' : 'consult-only'
  }

  return {
    id: id.toString(),
    protocolNumber: `ED-2025-${10000 + id}`,
    patientInfo: {
      firstName: randomName.firstName,
      lastName: randomName.lastName,
      mrn,
      ssn: `****${Math.floor(1000 + Math.random() * 9000)}`,
      age: Math.floor(Math.random() * 80) + 1,
      gender,
      phone: `(${Math.floor(200 + Math.random() * 800)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      address: usAddresses[Math.floor(Math.random() * usAddresses.length)],
      insurance: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
    },
    arrivalMethod,
    esiLevel,
    priorityNumber,
    chiefComplaint: complaint,
    vitalSigns: vitals,
    arrivalTime: arrivalDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    arrivalDate,
    waitTimeMinutes,
    doorToDoctorMinutes,
    attendingProvider: providerNames[Math.floor(Math.random() * providerNames.length)],
    status,
    isRepeatVisit: Math.random() > 0.92,
    traumaLevel,
    stemiAlert,
    strokeAlert,
    sepsisConcern,
  }
}

// Generate 60+ patients with ESI distribution
function generateInitialPatients(): EmergencyPatient[] {
  const patients: EmergencyPatient[] = []
  let id = 1

  // ESI Level 1 (6 patients - ~10%)
  for (let i = 0; i < 6; i++) {
    patients.push(generateRandomPatient(id++, 1))
  }

  // ESI Level 2 (12 patients - ~20%)
  for (let i = 0; i < 12; i++) {
    patients.push(generateRandomPatient(id++, 2))
  }

  // ESI Level 3 (22 patients - ~35%)
  for (let i = 0; i < 22; i++) {
    patients.push(generateRandomPatient(id++, 3))
  }

  // ESI Level 4 (15 patients - ~25%)
  for (let i = 0; i < 15; i++) {
    patients.push(generateRandomPatient(id++, 4))
  }

  // ESI Level 5 (10 patients - ~15%)
  for (let i = 0; i < 10; i++) {
    patients.push(generateRandomPatient(id++, 5))
  }

  return patients
}

// Generate emergency beds
function generateBeds(): EmergencyBed[] {
  const beds: EmergencyBed[] = []

  for (let i = 1; i <= 40; i++) {
    const random = Math.random()
    let status: BedStatus

    if (random < 0.65) {
      status = 'occupied'
    } else if (random < 0.82) {
      status = 'available'
    } else if (random < 0.95) {
      status = 'cleaning'
    } else {
      status = 'blocked'
    }

    const bedPrefix = i <= 20 ? 'ED' : 'OBS'
    const bedNum = i <= 20 ? i : i - 20

    beds.push({
      id: i.toString(),
      bedNumber: `${bedPrefix}-${bedNum.toString().padStart(2, '0')}`,
      status,
      ...(status === 'occupied' && {
        patientName: usNames.male[Math.floor(Math.random() * usNames.male.length)].firstName,
        esiLevel: [1, 2, 3, 4][Math.floor(Math.random() * 4)] as ESILevel,
        startTime: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000)
          .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      })
    })
  }

  return beds
}

export default function EmergencyDepartmentPage() {
  // State
  const [patients, setPatients] = useState<EmergencyPatient[]>([])
  const [beds, setBeds] = useState<EmergencyBed[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [esiFilter, setEsiFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<'priority' | 'wait-time' | 'esi'>('priority')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Modals
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showTriageModal, setShowTriageModal] = useState(false)
  const [showVitalsModal, setShowVitalsModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showDischargeModal, setShowDischargeModal] = useState(false)
  const [showBedAssignModal, setShowBedAssignModal] = useState(false)
  const [showTraumaConfirm, setShowTraumaConfirm] = useState(false)
  const [showStemiAlert, setShowStemiAlert] = useState(false)
  const [showStrokeAlert, setShowStrokeAlert] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<EmergencyPatient | null>(null)
  const [hipaaConsent, setHipaaConsent] = useState(false)

  // New registration form
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    mrn: '',
    ssn: '',
    age: '',
    gender: 'Male' as Gender,
    phone: '',
    address: '',
    insurance: '',
    chiefComplaint: '',
    arrivalMethod: 'walk-in' as ArrivalMethod,
  })

  // Triage form
  const [triageData, setTriageData] = useState({
    esiLevel: 3 as ESILevel,
    priorityNumber: '',
    traumaLevel: '' as TraumaLevel | '',
  })

  // Vitals form
  const [vitalsData, setVitalsData] = useState({
    heartRate: '',
    systolic: '',
    diastolic: '',
    temperature: '',
    spo2: '',
    respiratoryRate: '',
    gcs: '',
    painScale: '',
  })

  // Transfer form
  const [transferData, setTransferData] = useState({
    type: 'admission' as 'admission' | 'transfer',
    department: '',
    hospital: '',
    reason: '',
  })

  // Discharge form
  const [dischargeData, setDischargeData] = useState({
    type: 'home' as 'home' | 'admission' | 'transfer' | 'ama' | 'deceased',
    notes: '',
    department: '',
    hospital: '',
    followUpInstructions: '',
  })

  // Initialize data
  useEffect(() => {
    setPatients(generateInitialPatients())
    setBeds(generateBeds())
  }, [])

  // Update wait times every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => ({
        ...patient,
        waitTimeMinutes: Math.floor((new Date().getTime() - patient.arrivalDate.getTime()) / 1000 / 60)
      })))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Filtering and sorting
  const filteredPatients = patients
    .filter(patient => {
      const searchMatch =
        patient.patientInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientInfo.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.protocolNumber.toLowerCase().includes(searchTerm.toLowerCase())

      const esiMatch = esiFilter === 'all' || patient.esiLevel.toString() === esiFilter
      const statusMatch = statusFilter === 'all' || patient.status === statusFilter

      return searchMatch && esiMatch && statusMatch
    })
    .sort((a, b) => {
      let comparison = 0

      if (sortField === 'priority') {
        comparison = a.priorityNumber - b.priorityNumber
      } else if (sortField === 'wait-time') {
        comparison = a.waitTimeMinutes - b.waitTimeMinutes
      } else if (sortField === 'esi') {
        comparison = a.esiLevel - b.esiLevel
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

  // Statistics
  const stats = {
    totalPatients: patients.length,
    esi1: patients.filter(p => p.esiLevel === 1).length,
    esi2: patients.filter(p => p.esiLevel === 2).length,
    esi3: patients.filter(p => p.esiLevel === 3).length,
    esi4: patients.filter(p => p.esiLevel === 4).length,
    esi5: patients.filter(p => p.esiLevel === 5).length,
    avgWaitTime: patients.length > 0
      ? Math.round(patients.reduce((sum, p) => sum + p.waitTimeMinutes, 0) / patients.length)
      : 0,
    avgWaitESI1: patients.filter(p => p.esiLevel === 1).length > 0
      ? Math.round(patients.filter(p => p.esiLevel === 1).reduce((t, p) => t + p.waitTimeMinutes, 0) / patients.filter(p => p.esiLevel === 1).length)
      : 0,
    avgWaitESI2: patients.filter(p => p.esiLevel === 2).length > 0
      ? Math.round(patients.filter(p => p.esiLevel === 2).reduce((t, p) => t + p.waitTimeMinutes, 0) / patients.filter(p => p.esiLevel === 2).length)
      : 0,
    avgWaitESI3: patients.filter(p => p.esiLevel === 3).length > 0
      ? Math.round(patients.filter(p => p.esiLevel === 3).reduce((t, p) => t + p.waitTimeMinutes, 0) / patients.filter(p => p.esiLevel === 3).length)
      : 0,
    avgDoorToDoctor: patients.filter(p => p.doorToDoctorMinutes).length > 0
      ? Math.round(patients.filter(p => p.doorToDoctorMinutes).reduce((t, p) => t + (p.doorToDoctorMinutes || 0), 0) / patients.filter(p => p.doorToDoctorMinutes).length)
      : 0,
    emsArrivals: patients.filter(p => p.arrivalMethod.includes('ems') || p.arrivalMethod.includes('ambulance')).length,
    availableBeds: beds.filter(b => b.status === 'available').length,
    occupiedBeds: beds.filter(b => b.status === 'occupied').length,
    cleaningBeds: beds.filter(b => b.status === 'cleaning').length,
    stemiAlerts: patients.filter(p => p.stemiAlert).length,
    strokeAlerts: patients.filter(p => p.strokeAlert).length,
    traumaActivations: patients.filter(p => p.traumaLevel).length,
  }

  // Color utilities
  const esiColors = {
    1: 'bg-red-100 text-red-800 border-red-400',
    2: 'bg-orange-100 text-orange-800 border-orange-400',
    3: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    4: 'bg-green-100 text-green-800 border-green-400',
    5: 'bg-blue-100 text-blue-800 border-blue-400',
  }

  const esiLabels = {
    1: 'ESI 1 - Resuscitation',
    2: 'ESI 2 - Emergent',
    3: 'ESI 3 - Urgent',
    4: 'ESI 4 - Less Urgent',
    5: 'ESI 5 - Non-Urgent',
  }

  const statusLabels = {
    'triage': 'Triage',
    'roomed': 'Roomed',
    'provider-eval': 'Provider Evaluation',
    'diagnostics': 'Diagnostics',
    'treatment': 'Treatment',
    'observation': 'Observation',
    'admitted': 'Admitted',
    'discharged': 'Discharged',
  }

  // Handlers
  const handleNewRegistration = () => {
    if (!hipaaConsent) {
      alert('HIPAA consent is required!')
      return
    }

    const newId = (patients.length + 1).toString()
    const now = new Date()

    const patient: EmergencyPatient = {
      id: newId,
      protocolNumber: `ED-2025-${10000 + patients.length}`,
      patientInfo: {
        firstName: newPatient.firstName,
        lastName: newPatient.lastName,
        mrn: newPatient.mrn || `MRN${Math.floor(1000000 + Math.random() * 9000000)}`,
        ssn: newPatient.ssn,
        age: parseInt(newPatient.age),
        gender: newPatient.gender,
        phone: newPatient.phone,
        address: newPatient.address,
        insurance: newPatient.insurance,
      },
      arrivalMethod: newPatient.arrivalMethod,
      esiLevel: 3, // Default, will be assigned during triage
      priorityNumber: 999,
      chiefComplaint: newPatient.chiefComplaint,
      vitalSigns: {
        heartRate: 80,
        bloodPressure: '120/80',
        temperature: 98.6,
        spo2: 98,
        respiratoryRate: 16,
        gcs: 15,
        painScale: 0,
      },
      arrivalTime: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      arrivalDate: now,
      waitTimeMinutes: 0,
      attendingProvider: providerNames[Math.floor(Math.random() * providerNames.length)],
      status: 'triage',
      isRepeatVisit: false,
    }

    setPatients([...patients, patient])
    setShowRegistrationModal(false)
    setHipaaConsent(false)
    setNewPatient({
      firstName: '',
      lastName: '',
      mrn: '',
      ssn: '',
      age: '',
      gender: 'Male',
      phone: '',
      address: '',
      insurance: '',
      chiefComplaint: '',
      arrivalMethod: 'walk-in',
    })
  }

  const handleTriageAssign = () => {
    if (selectedPatient) {
      setPatients(patients.map(p =>
        p.id === selectedPatient.id
          ? {
              ...p,
              esiLevel: triageData.esiLevel,
              priorityNumber: parseInt(triageData.priorityNumber),
              traumaLevel: triageData.traumaLevel || undefined,
            }
          : p
      ))
      setShowTriageModal(false)
      setTriageData({ esiLevel: 3, priorityNumber: '', traumaLevel: '' })
    }
  }

  const handleVitalsUpdate = () => {
    if (selectedPatient) {
      setPatients(patients.map(p =>
        p.id === selectedPatient.id
          ? {
              ...p,
              vitalSigns: {
                heartRate: parseInt(vitalsData.heartRate),
                bloodPressure: `${vitalsData.systolic}/${vitalsData.diastolic}`,
                temperature: parseFloat(vitalsData.temperature),
                spo2: parseInt(vitalsData.spo2),
                respiratoryRate: parseInt(vitalsData.respiratoryRate),
                gcs: parseInt(vitalsData.gcs),
                painScale: parseInt(vitalsData.painScale),
              }
            }
          : p
      ))
      setShowVitalsModal(false)
      setVitalsData({ heartRate: '', systolic: '', diastolic: '', temperature: '', spo2: '', respiratoryRate: '', gcs: '', painScale: '' })
    }
  }

  const handleTransfer = () => {
    if (selectedPatient) {
      setPatients(patients.filter(p => p.id !== selectedPatient.id))
      setShowTransferModal(false)
      setTransferData({ type: 'admission', department: '', hospital: '', reason: '' })
    }
  }

  const handleDischarge = () => {
    if (selectedPatient) {
      setPatients(patients.filter(p => p.id !== selectedPatient.id))
      setShowDischargeModal(false)
      setDischargeData({ type: 'home', notes: '', department: '', hospital: '', followUpInstructions: '' })
    }
  }

  const handleFastTrack = (patient: EmergencyPatient) => {
    if (patient.esiLevel >= 4) {
      setPatients(patients.map(p =>
        p.id === patient.id ? { ...p, status: 'discharged' } : p
      ))
    }
  }

  const handleTraumaActivation = (level: TraumaLevel) => {
    setShowTraumaConfirm(false)
    alert(`Trauma Team Activated - ${level.toUpperCase()}!\n\nNotifying:\n• Emergency Medicine Attending\n• Trauma Surgeon\n• Anesthesiologist\n• OR Team\n• Radiology Tech\n• Lab Personnel\n• Respiratory Therapy`)
  }

  const handleStemiActivation = () => {
    setShowStemiAlert(false)
    alert('STEMI ALERT ACTIVATED!\n\nCath Lab Team Notified\nTarget Door-to-Balloon Time: 90 minutes\n\nNotifying:\n• Interventional Cardiologist\n• Cath Lab Team\n• Cardiology Attending\n• ICU')
  }

  const handleStrokeActivation = () => {
    setShowStrokeAlert(false)
    alert('CODE STROKE ACTIVATED!\n\nStroke Team Notified\nTarget Door-to-CT: 25 minutes\nTarget Door-to-Needle: 60 minutes\n\nNotifying:\n• Neurologist\n• CT Tech\n• Lab\n• Pharmacy\n• Neuro ICU')
  }

  const toggleSort = (field: 'priority' | 'wait-time' | 'esi') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
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
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Ambulance className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Emergency Department Dashboard
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    Real-Time ED Beacon - ESI Triage & Patient Tracking System
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowRegistrationModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Patient Registration
              </Button>
              <Button
                onClick={() => setShowStemiAlert(true)}
                variant="outline"
                className="border-2 border-red-500 text-red-600 hover:bg-red-50"
              >
                <Heart className="h-4 w-4 mr-2 animate-pulse" />
                STEMI Alert
              </Button>
              <Button
                onClick={() => setShowStrokeAlert(true)}
                variant="outline"
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
              >
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                Stroke Alert
              </Button>
              <Button
                onClick={() => setShowTraumaConfirm(true)}
                variant="outline"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <Siren className="h-4 w-4 mr-2 animate-pulse" />
                Activate Trauma Team
              </Button>
              <Button variant="outline" className="border-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
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
        {/* Critical Alerts Banner */}
        {(stats.stemiAlerts > 0 || stats.strokeAlerts > 0 || stats.traumaActivations > 0) && (
          <div className="bg-gradient-to-r from-red-100 via-orange-100 to-red-100 border-2 border-red-400 rounded-2xl p-6 mb-8 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="text-xl font-bold text-red-900">CRITICAL ALERTS ACTIVE</h3>
                  <p className="text-sm text-red-800 mt-1">
                    {stats.stemiAlerts > 0 && `${stats.stemiAlerts} STEMI Alert(s) • `}
                    {stats.strokeAlerts > 0 && `${stats.strokeAlerts} Stroke Alert(s) • `}
                    {stats.traumaActivations > 0 && `${stats.traumaActivations} Trauma Activation(s)`}
                  </p>
                </div>
              </div>
              <Badge className="bg-red-600 text-white text-lg px-4 py-2">
                URGENT
              </Badge>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-9 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Activity className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Total ED</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalPatients}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
              </div>
              <span className="text-sm font-semibold text-gray-600">ESI 1</span>
            </div>
            <p className="text-3xl font-bold text-red-700">{stats.esi1}</p>
            <p className="text-xs text-gray-500 mt-1">Avg: {stats.avgWaitESI1}m</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CircleDot className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">ESI 2</span>
            </div>
            <p className="text-3xl font-bold text-orange-700">{stats.esi2}</p>
            <p className="text-xs text-gray-500 mt-1">Avg: {stats.avgWaitESI2}m</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-yellow-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CircleDot className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">ESI 3</span>
            </div>
            <p className="text-3xl font-bold text-yellow-700">{stats.esi3}</p>
            <p className="text-xs text-gray-500 mt-1">Avg: {stats.avgWaitESI3}m</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CircleDot className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">ESI 4</span>
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.esi4}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CircleDot className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">ESI 5</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.esi5}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Timer className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Avg Wait</span>
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.avgWaitTime}m</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-cyan-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Clock className="h-5 w-5 text-cyan-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Door-to-Doc</span>
            </div>
            <p className="text-3xl font-bold text-cyan-700">{stats.avgDoorToDoctor}m</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-indigo-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BedDouble className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Beds Avail</span>
            </div>
            <p className="text-3xl font-bold text-indigo-700">{stats.availableBeds}/{beds.length}</p>
          </div>
        </div>

        {/* ESI Triage Board */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {[1, 2, 3, 4, 5].map(level => {
            const levelPatients = patients.filter(p => p.esiLevel === level)
            const colors = {
              1: { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-800', icon: 'bg-red-600' },
              2: { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-800', icon: 'bg-orange-600' },
              3: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-800', icon: 'bg-yellow-600' },
              4: { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-800', icon: 'bg-green-600' },
              5: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-800', icon: 'bg-blue-600' },
            }[level as 1 | 2 | 3 | 4 | 5]!

            const descriptions = {
              1: 'Resuscitation',
              2: 'Emergent',
              3: 'Urgent',
              4: 'Less Urgent',
              5: 'Non-Urgent',
            }[level as 1 | 2 | 3 | 4 | 5]!

            return (
              <div key={level} className={cn('rounded-2xl border-2 shadow-sm', colors.bg, colors.border)}>
                <div className="p-4 border-b-2 border-current">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('p-2 rounded-lg', colors.icon)}>
                        {level === 1 && <AlertTriangle className="h-5 w-5 text-white animate-pulse" />}
                        {level === 2 && <AlertCircle className="h-5 w-5 text-white" />}
                        {level >= 3 && <CircleDot className="h-5 w-5 text-white" />}
                      </div>
                      <div>
                        <h3 className={cn('font-bold text-lg', colors.text)}>
                          ESI {level}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {descriptions}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn('font-bold text-lg px-3 py-1', colors.text, colors.bg)}>
                      {levelPatients.length}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                  {levelPatients.slice(0, 5).map(patient => (
                    <div key={patient.id} className="bg-white rounded-lg p-3 border shadow-sm hover:shadow-md transition-all">
                      <p className="font-bold text-sm text-gray-900">
                        {patient.patientInfo.firstName} {patient.patientInfo.lastName}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Priority: #{patient.priorityNumber} • Wait: {patient.waitTimeMinutes}m
                      </p>
                      {patient.stemiAlert && (
                        <Badge className="mt-1 bg-red-600 text-white text-xs">STEMI</Badge>
                      )}
                      {patient.strokeAlert && (
                        <Badge className="mt-1 bg-purple-600 text-white text-xs">STROKE</Badge>
                      )}
                    </div>
                  ))}
                  {levelPatients.length > 5 && (
                    <p className="text-xs text-center text-gray-500 py-2">
                      +{levelPatients.length - 5} more patients
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bed Status Board */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">ED Bed Status Dashboard</h3>
              <p className="text-sm text-gray-600 mt-1">
                Available: {stats.availableBeds} • Occupied: {stats.occupiedBeds} • Cleaning: {stats.cleaningBeds}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm font-medium">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm font-medium">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm font-medium">Cleaning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span className="text-sm font-medium">Blocked</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {beds.map(bed => (
              <div
                key={bed.id}
                className={cn(
                  'rounded-lg p-3 border-2 text-center transition-all hover:scale-105 cursor-pointer',
                  bed.status === 'available' && 'bg-green-50 border-green-300 hover:bg-green-100',
                  bed.status === 'occupied' && 'bg-red-50 border-red-300 hover:bg-red-100',
                  bed.status === 'cleaning' && 'bg-orange-50 border-orange-300 hover:bg-orange-100',
                  bed.status === 'blocked' && 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                )}
              >
                <BedDouble className={cn(
                  'h-5 w-5 mx-auto mb-1',
                  bed.status === 'available' && 'text-green-600',
                  bed.status === 'occupied' && 'text-red-600',
                  bed.status === 'cleaning' && 'text-orange-600',
                  bed.status === 'blocked' && 'text-gray-600'
                )} />
                <p className="text-xs font-bold text-gray-900">{bed.bedNumber}</p>
                {bed.status === 'occupied' && bed.patientName && (
                  <p className="text-xs text-gray-600 mt-1 truncate">{bed.patientName}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Search Patients</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Patient name, MRN, protocol number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">ESI Level</label>
              <select
                value={esiFilter}
                onChange={(e) => setEsiFilter(e.target.value)}
                className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All ESI Levels</option>
                <option value="1">ESI 1 - Resuscitation</option>
                <option value="2">ESI 2 - Emergent</option>
                <option value="3">ESI 3 - Urgent</option>
                <option value="4">ESI 4 - Less Urgent</option>
                <option value="5">ESI 5 - Non-Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="triage">Triage</option>
                <option value="roomed">Roomed</option>
                <option value="provider-eval">Provider Evaluation</option>
                <option value="diagnostics">Diagnostics</option>
                <option value="treatment">Treatment</option>
                <option value="observation">Observation</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Sort By</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={sortField === 'priority' ? 'default' : 'outline'}
                  onClick={() => toggleSort('priority')}
                  className="flex-1"
                >
                  Priority {sortField === 'priority' && (sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />)}
                </Button>
                <Button
                  size="sm"
                  variant={sortField === 'wait-time' ? 'default' : 'outline'}
                  onClick={() => toggleSort('wait-time')}
                  className="flex-1"
                >
                  Wait {sortField === 'wait-time' && (sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />)}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Emergency Department Patient List</h3>
                <p className="text-sm text-gray-600 font-medium mt-1">
                  Showing {filteredPatients.length} patients
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-3 py-1">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                Live Tracking
              </Badge>
            </div>
          </div>

          <div className="divide-y-2 divide-gray-100">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={cn(
                  "p-6 hover:bg-blue-50/30 transition-all",
                  patient.esiLevel === 1 && 'bg-red-50/20 border-l-4 border-l-red-600',
                  patient.esiLevel === 2 && 'bg-orange-50/20 border-l-4 border-l-orange-500',
                  (patient.stemiAlert || patient.strokeAlert) && 'bg-red-100/30'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl",
                      patient.esiLevel === 1 && 'bg-red-100',
                      patient.esiLevel === 2 && 'bg-orange-100',
                      patient.esiLevel === 3 && 'bg-yellow-100',
                      patient.esiLevel === 4 && 'bg-green-100',
                      patient.esiLevel === 5 && 'bg-blue-100'
                    )}>
                      <User className={cn(
                        "h-6 w-6",
                        patient.esiLevel === 1 && 'text-red-600',
                        patient.esiLevel === 2 && 'text-orange-600',
                        patient.esiLevel === 3 && 'text-yellow-600',
                        patient.esiLevel === 4 && 'text-green-600',
                        patient.esiLevel === 5 && 'text-blue-600'
                      )} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {patient.patientInfo.firstName} {patient.patientInfo.lastName}
                      </h4>
                      <p className="text-sm text-gray-600 font-mono mt-1">
                        {patient.patientInfo.mrn} • {patient.protocolNumber} • {patient.patientInfo.age}y • {patient.patientInfo.gender}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        SSN: {patient.patientInfo.ssn} • Insurance: {patient.patientInfo.insurance}
                      </p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <Badge className={cn('font-semibold border-2', esiColors[patient.esiLevel as keyof typeof esiColors])}>
                          {patient.esiLevel === 1 && <AlertTriangle className="h-3 w-3 mr-1 animate-pulse" />}
                          {esiLabels[patient.esiLevel as keyof typeof esiLabels]}
                        </Badge>
                        <Badge variant="outline" className="font-semibold">
                          Priority #{patient.priorityNumber}
                        </Badge>
                        <Badge variant="outline" className="font-semibold">
                          {statusLabels[patient.status as keyof typeof statusLabels]}
                        </Badge>
                        {patient.arrivalMethod.includes('ems') && (
                          <Badge className="bg-red-100 text-red-700 border-red-300">
                            <Ambulance className="h-3 w-3 mr-1" />
                            EMS 911
                          </Badge>
                        )}
                        {patient.isRepeatVisit && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Repeat Visit
                          </Badge>
                        )}
                        {patient.stemiAlert && (
                          <Badge className="bg-red-600 text-white animate-pulse">
                            <Heart className="h-3 w-3 mr-1" />
                            STEMI ALERT
                          </Badge>
                        )}
                        {patient.strokeAlert && (
                          <Badge className="bg-purple-600 text-white animate-pulse">
                            <Brain className="h-3 w-3 mr-1" />
                            CODE STROKE
                          </Badge>
                        )}
                        {patient.traumaLevel && (
                          <Badge className="bg-orange-600 text-white">
                            <Siren className="h-3 w-3 mr-1" />
                            TRAUMA {patient.traumaLevel.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="font-bold text-gray-900">Arrival: {patient.arrivalTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Timer className={cn(
                        "h-4 w-4",
                        patient.waitTimeMinutes > 120 ? 'text-red-500' : patient.waitTimeMinutes > 60 ? 'text-orange-500' : 'text-green-500'
                      )} />
                      <span className={cn(
                        "font-bold",
                        patient.waitTimeMinutes > 120 ? 'text-red-700' : patient.waitTimeMinutes > 60 ? 'text-orange-700' : 'text-green-700'
                      )}>
                        Wait: {patient.waitTimeMinutes}m
                      </span>
                    </div>
                    {patient.doorToDoctorMinutes !== undefined && (
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-blue-500" />
                        <span className="font-bold text-blue-700">
                          Door-to-Doc: {patient.doorToDoctorMinutes}m
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold text-gray-600">Chief Complaint</span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{patient.chiefComplaint}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-red-600" />
                      <span className="text-xs font-semibold text-gray-600">Vital Signs</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">HR:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          patient.vitalSigns.heartRate > 100 || patient.vitalSigns.heartRate < 60
                            ? 'text-red-600'
                            : 'text-green-600'
                        )}>
                          {patient.vitalSigns.heartRate}
                          {(patient.vitalSigns.heartRate > 100 || patient.vitalSigns.heartRate < 60) && (
                            <AlertCircle className="inline h-3 w-3 ml-1" />
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">SpO2:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          patient.vitalSigns.spo2 < 95 ? 'text-red-600' : 'text-green-600'
                        )}>
                          {patient.vitalSigns.spo2}%
                          {patient.vitalSigns.spo2 < 95 && (
                            <AlertCircle className="inline h-3 w-3 ml-1" />
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">BP:</span>{' '}
                        <span className="font-bold text-gray-900">{patient.vitalSigns.bloodPressure}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Temp:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          patient.vitalSigns.temperature > 100.4 || patient.vitalSigns.temperature < 96.0 ? 'text-red-600' : 'text-green-600'
                        )}>
                          {patient.vitalSigns.temperature.toFixed(1)}°F
                          {(patient.vitalSigns.temperature > 100.4 || patient.vitalSigns.temperature < 96.0) && (
                            <AlertCircle className="inline h-3 w-3 ml-1" />
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">RR:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          patient.vitalSigns.respiratoryRate > 20 || patient.vitalSigns.respiratoryRate < 12
                            ? 'text-red-600'
                            : 'text-green-600'
                        )}>
                          {patient.vitalSigns.respiratoryRate}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">GCS:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          patient.vitalSigns.gcs < 13 ? 'text-red-600' : 'text-green-600'
                        )}>
                          {patient.vitalSigns.gcs}/15
                          {patient.vitalSigns.gcs < 13 && (
                            <AlertCircle className="inline h-3 w-3 ml-1" />
                          )}
                        </span>
                      </div>
                    </div>
                    {patient.vitalSigns.painScale !== undefined && (
                      <div className="mt-2 text-xs">
                        <span className="text-gray-600">Pain:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          patient.vitalSigns.painScale >= 7 ? 'text-red-600' :
                          patient.vitalSigns.painScale >= 4 ? 'text-orange-600' : 'text-green-600'
                        )}>
                          {patient.vitalSigns.painScale}/10
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Stethoscope className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold text-gray-600">Attending Provider</span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{patient.attendingProvider}</p>
                    {patient.patientInfo.phone && (
                      <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {patient.patientInfo.phone}
                      </p>
                    )}
                    {patient.bedNumber && (
                      <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                        <BedDouble className="h-3 w-3" />
                        Bed: {patient.bedNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedPatient(patient)
                      setShowVitalsModal(true)
                      setVitalsData({
                        heartRate: patient.vitalSigns.heartRate.toString(),
                        systolic: patient.vitalSigns.bloodPressure.split('/')[0],
                        diastolic: patient.vitalSigns.bloodPressure.split('/')[1],
                        temperature: patient.vitalSigns.temperature.toString(),
                        spo2: patient.vitalSigns.spo2.toString(),
                        respiratoryRate: patient.vitalSigns.respiratoryRate.toString(),
                        gcs: patient.vitalSigns.gcs.toString(),
                        painScale: patient.vitalSigns.painScale?.toString() || '0',
                      })
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Activity className="h-4 w-4 mr-1" />
                    Update Vitals
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2"
                    onClick={() => {
                      setSelectedPatient(patient)
                      setShowTriageModal(true)
                      setTriageData({
                        esiLevel: patient.esiLevel,
                        priorityNumber: patient.priorityNumber.toString(),
                        traumaLevel: patient.traumaLevel || '',
                      })
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Update Triage
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2"
                    onClick={() => {
                      setSelectedPatient(patient)
                      setShowBedAssignModal(true)
                    }}
                  >
                    <BedDouble className="h-4 w-4 mr-1" />
                    Assign Bed
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2"
                    onClick={() => {
                      setSelectedPatient(patient)
                      setShowTransferModal(true)
                    }}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Transfer/Admit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2"
                    onClick={() => {
                      setSelectedPatient(patient)
                      setShowDischargeModal(true)
                    }}
                  >
                    <Home className="h-4 w-4 mr-1" />
                    Discharge
                  </Button>
                  {patient.esiLevel >= 4 && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-2 border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => handleFastTrack(patient)}
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      Fast Track
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HIPAA Notice */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">HIPAA Compliance - Emergency Department</h3>
              <p className="text-sm text-blue-800">
                All emergency department patient records are protected under the Health Insurance Portability and Accountability Act (HIPAA).
                All vital signs, medical information, and patient records are stored with end-to-end encryption and secure access controls.
                The ESI triage system complies with ACEP (American College of Emergency Physicians) guidelines and EMTALA regulations.
                Patient privacy and data security are maintained at the highest standards with comprehensive audit trails and access logging.
                Door-to-doctor times, STEMI alerts, stroke protocols, and trauma activations follow national benchmarks and best practices.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}

      {/* New Registration Modal */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              New Patient Registration
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input
                  value={newPatient.firstName}
                  onChange={(e) => setNewPatient({...newPatient, firstName: e.target.value})}
                  placeholder="Patient first name"
                />
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input
                  value={newPatient.lastName}
                  onChange={(e) => setNewPatient({...newPatient, lastName: e.target.value})}
                  placeholder="Patient last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>MRN</Label>
                <Input
                  value={newPatient.mrn}
                  onChange={(e) => setNewPatient({...newPatient, mrn: e.target.value})}
                  placeholder="Auto-generated if empty"
                />
              </div>
              <div>
                <Label>SSN (Last 4)</Label>
                <Input
                  value={newPatient.ssn}
                  onChange={(e) => setNewPatient({...newPatient, ssn: e.target.value})}
                  placeholder="****1234"
                  maxLength={9}
                />
              </div>
              <div>
                <Label>Age *</Label>
                <Input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  placeholder="Age"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Gender *</Label>
                <RadioGroup value={newPatient.gender} onValueChange={(v) => setNewPatient({...newPatient, gender: v as Gender})}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <Label>Insurance Provider</Label>
              <Select value={newPatient.insurance} onValueChange={(v) => setNewPatient({...newPatient, insurance: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceProviders.map(ins => (
                    <SelectItem key={ins} value={ins}>{ins}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Arrival Method *</Label>
              <Select value={newPatient.arrivalMethod} onValueChange={(v) => setNewPatient({...newPatient, arrivalMethod: v as ArrivalMethod})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk-in">Walk-In</SelectItem>
                  <SelectItem value="ems-911">EMS 911</SelectItem>
                  <SelectItem value="private-ambulance">Private Ambulance</SelectItem>
                  <SelectItem value="police">Police Transport</SelectItem>
                  <SelectItem value="transfer">Transfer from Another Facility</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Address</Label>
              <Textarea
                value={newPatient.address}
                onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                placeholder="Patient address"
                rows={2}
              />
            </div>

            <div>
              <Label>Chief Complaint *</Label>
              <Textarea
                value={newPatient.chiefComplaint}
                onChange={(e) => setNewPatient({...newPatient, chiefComplaint: e.target.value})}
                placeholder="Reason for ED visit / chief complaint"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <Checkbox
                id="hipaa"
                checked={hipaaConsent}
                onChange={(e) => setHipaaConsent(e.target.checked)}
              />
              <label
                htmlFor="hipaa"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read the HIPAA Notice of Privacy Practices and consent to the processing of patient health information *
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegistrationModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleNewRegistration}
              disabled={!newPatient.firstName || !newPatient.lastName || !newPatient.age || !newPatient.chiefComplaint || !hipaaConsent}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Register Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Triage Assignment Modal */}
      <Dialog open={showTriageModal} onOpenChange={setShowTriageModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              ESI Triage Assignment
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900">
                  {selectedPatient.patientInfo.firstName} {selectedPatient.patientInfo.lastName}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient.protocolNumber}</p>
              </div>

              <div>
                <Label>ESI Level (Emergency Severity Index) *</Label>
                <RadioGroup value={triageData.esiLevel.toString()} onValueChange={(v) => setTriageData({...triageData, esiLevel: parseInt(v) as ESILevel})}>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2 p-3 border-2 border-red-300 rounded-lg bg-red-50">
                      <RadioGroupItem value="1" id="esi-1" />
                      <Label htmlFor="esi-1" className="flex-1 cursor-pointer">
                        <span className="font-bold text-red-700">ESI 1</span>
                        <span className="text-sm text-gray-600 ml-2">- Resuscitation (Life-threatening, Priority 1-20)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border-2 border-orange-300 rounded-lg bg-orange-50">
                      <RadioGroupItem value="2" id="esi-2" />
                      <Label htmlFor="esi-2" className="flex-1 cursor-pointer">
                        <span className="font-bold text-orange-700">ESI 2</span>
                        <span className="text-sm text-gray-600 ml-2">- Emergent (High Risk, Priority 21-70)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                      <RadioGroupItem value="3" id="esi-3" />
                      <Label htmlFor="esi-3" className="flex-1 cursor-pointer">
                        <span className="font-bold text-yellow-700">ESI 3</span>
                        <span className="text-sm text-gray-600 ml-2">- Urgent (Multiple resources, Priority 71-170)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border-2 border-green-300 rounded-lg bg-green-50">
                      <RadioGroupItem value="4" id="esi-4" />
                      <Label htmlFor="esi-4" className="flex-1 cursor-pointer">
                        <span className="font-bold text-green-700">ESI 4</span>
                        <span className="text-sm text-gray-600 ml-2">- Less Urgent (One resource, Priority 171-320)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border-2 border-blue-300 rounded-lg bg-blue-50">
                      <RadioGroupItem value="5" id="esi-5" />
                      <Label htmlFor="esi-5" className="flex-1 cursor-pointer">
                        <span className="font-bold text-blue-700">ESI 5</span>
                        <span className="text-sm text-gray-600 ml-2">- Non-Urgent (No resources, Priority 321+)</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Priority Number (1-999) *</Label>
                <Input
                  type="number"
                  min="1"
                  max="999"
                  value={triageData.priorityNumber}
                  onChange={(e) => setTriageData({...triageData, priorityNumber: e.target.value})}
                  placeholder="Priority number (lower = higher priority)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower number = Higher priority
                </p>
              </div>

              <div>
                <Label>Trauma Level (Optional)</Label>
                <Select value={triageData.traumaLevel} onValueChange={(v) => setTriageData({...triageData, traumaLevel: v as TraumaLevel})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select if trauma activation needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No Trauma Activation</SelectItem>
                    <SelectItem value="level-1">Level 1 - Full Activation</SelectItem>
                    <SelectItem value="level-2">Level 2 - Modified Activation</SelectItem>
                    <SelectItem value="level-3">Level 3 - Limited Activation</SelectItem>
                    <SelectItem value="consult-only">Consult Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTriageModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleTriageAssign}
              disabled={!triageData.priorityNumber}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Assign Triage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vitals Update Modal */}
      <Dialog open={showVitalsModal} onOpenChange={setShowVitalsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-600" />
              Update Vital Signs
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900">
                  {selectedPatient.patientInfo.firstName} {selectedPatient.patientInfo.lastName}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient.protocolNumber}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Heart Rate (bpm)
                  </Label>
                  <Input
                    type="number"
                    value={vitalsData.heartRate}
                    onChange={(e) => setVitalsData({...vitalsData, heartRate: e.target.value})}
                    placeholder="80"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    SpO2 (%)
                  </Label>
                  <Input
                    type="number"
                    value={vitalsData.spo2}
                    onChange={(e) => setVitalsData({...vitalsData, spo2: e.target.value})}
                    placeholder="98"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Systolic BP (mmHg)</Label>
                  <Input
                    type="number"
                    value={vitalsData.systolic}
                    onChange={(e) => setVitalsData({...vitalsData, systolic: e.target.value})}
                    placeholder="120"
                  />
                </div>

                <div>
                  <Label>Diastolic BP (mmHg)</Label>
                  <Input
                    type="number"
                    value={vitalsData.diastolic}
                    onChange={(e) => setVitalsData({...vitalsData, diastolic: e.target.value})}
                    placeholder="80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    Temperature (°F)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={vitalsData.temperature}
                    onChange={(e) => setVitalsData({...vitalsData, temperature: e.target.value})}
                    placeholder="98.6"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-cyan-500" />
                    Respiratory Rate (/min)
                  </Label>
                  <Input
                    type="number"
                    value={vitalsData.respiratoryRate}
                    onChange={(e) => setVitalsData({...vitalsData, respiratoryRate: e.target.value})}
                    placeholder="16"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-500" />
                    Glasgow Coma Scale (3-15)
                  </Label>
                  <Input
                    type="number"
                    min="3"
                    max="15"
                    value={vitalsData.gcs}
                    onChange={(e) => setVitalsData({...vitalsData, gcs: e.target.value})}
                    placeholder="15"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    Pain Scale (0-10)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={vitalsData.painScale}
                    onChange={(e) => setVitalsData({...vitalsData, painScale: e.target.value})}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVitalsModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleVitalsUpdate}
              disabled={!vitalsData.heartRate || !vitalsData.spo2 || !vitalsData.systolic || !vitalsData.diastolic || !vitalsData.temperature || !vitalsData.respiratoryRate || !vitalsData.gcs}
              className="bg-red-600 hover:bg-red-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Update Vitals
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Modal */}
      <Dialog open={showTransferModal} onOpenChange={setShowTransferModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-600" />
              Patient Transfer / Admission
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900">
                  {selectedPatient.patientInfo.firstName} {selectedPatient.patientInfo.lastName}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient.protocolNumber}</p>
              </div>

              <div>
                <Label>Transfer Type *</Label>
                <RadioGroup value={transferData.type} onValueChange={(v) => setTransferData({...transferData, type: v as 'admission' | 'transfer'})}>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admission" id="admission" />
                      <Label htmlFor="admission">Inpatient Admission (To Department)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer">Transfer to Another Hospital</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {transferData.type === 'admission' && (
                <div>
                  <Label>Admitting Department *</Label>
                  <Select value={transferData.department} onValueChange={(v) => setTransferData({...transferData, department: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {transferData.type === 'transfer' && (
                <div>
                  <Label>Transfer Destination *</Label>
                  <Select value={transferData.hospital} onValueChange={(v) => setTransferData({...transferData, hospital: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hospital" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitals.map(hosp => (
                        <SelectItem key={hosp} value={hosp}>{hosp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Transfer/Admission Reason</Label>
                <Textarea
                  value={transferData.reason}
                  onChange={(e) => setTransferData({...transferData, reason: e.target.value})}
                  placeholder="Reason for transfer or admission..."
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={transferData.type === 'admission' ? !transferData.department : !transferData.hospital}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Discharge Modal */}
      <Dialog open={showDischargeModal} onOpenChange={setShowDischargeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-green-600" />
              Patient Discharge
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900">
                  {selectedPatient.patientInfo.firstName} {selectedPatient.patientInfo.lastName}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient.protocolNumber}</p>
              </div>

              <div>
                <Label>Discharge Type *</Label>
                <RadioGroup value={dischargeData.type} onValueChange={(v) => setDischargeData({...dischargeData, type: v as any})}>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2 p-2 border rounded-lg">
                      <RadioGroupItem value="home" id="d-home" />
                      <Label htmlFor="d-home" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Home className="h-4 w-4 text-green-600" />
                        Discharged to Home
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-lg">
                      <RadioGroupItem value="admission" id="d-admission" />
                      <Label htmlFor="d-admission" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        Admitted to Inpatient Unit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-lg">
                      <RadioGroupItem value="transfer" id="d-transfer" />
                      <Label htmlFor="d-transfer" className="flex-1 cursor-pointer flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-orange-600" />
                        Transfer to Another Facility
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-lg">
                      <RadioGroupItem value="ama" id="d-ama" />
                      <Label htmlFor="d-ama" className="flex-1 cursor-pointer flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-yellow-600" />
                        Left Against Medical Advice (AMA)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-lg bg-red-50">
                      <RadioGroupItem value="deceased" id="d-deceased" />
                      <Label htmlFor="d-deceased" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Skull className="h-4 w-4 text-red-600" />
                        Deceased
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {dischargeData.type === 'admission' && (
                <div>
                  <Label>Admitting Department *</Label>
                  <Select value={dischargeData.department} onValueChange={(v) => setDischargeData({...dischargeData, department: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {dischargeData.type === 'transfer' && (
                <div>
                  <Label>Transfer Destination *</Label>
                  <Select value={dischargeData.hospital} onValueChange={(v) => setDischargeData({...dischargeData, hospital: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hospital" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitals.map(hosp => (
                        <SelectItem key={hosp} value={hosp}>{hosp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Discharge Notes</Label>
                <Textarea
                  value={dischargeData.notes}
                  onChange={(e) => setDischargeData({...dischargeData, notes: e.target.value})}
                  placeholder="Discharge summary, medications, follow-up instructions..."
                  rows={4}
                />
              </div>

              {dischargeData.type === 'home' && (
                <div>
                  <Label>Follow-Up Instructions</Label>
                  <Textarea
                    value={dischargeData.followUpInstructions}
                    onChange={(e) => setDischargeData({...dischargeData, followUpInstructions: e.target.value})}
                    placeholder="Follow up with primary care in 3-5 days, return to ED if symptoms worsen..."
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDischargeModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDischarge}
              disabled={
                (dischargeData.type === 'admission' && !dischargeData.department) ||
                (dischargeData.type === 'transfer' && !dischargeData.hospital)
              }
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Discharge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Trauma Team Confirmation */}
      <Dialog open={showTraumaConfirm} onOpenChange={setShowTraumaConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-orange-600 animate-pulse" />
              Trauma Team Activation
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-lg mb-4">
              <p className="text-sm font-medium text-orange-900 mb-3">
                Select trauma activation level. The appropriate team will be notified via overhead page, SMS, and pager:
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => handleTraumaActivation('level-1')}
                  className="w-full justify-start bg-red-600 hover:bg-red-700"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Level 1 - Full Trauma Activation
                </Button>
                <Button
                  onClick={() => handleTraumaActivation('level-2')}
                  className="w-full justify-start bg-orange-600 hover:bg-orange-700"
                >
                  <CircleDot className="h-4 w-4 mr-2" />
                  Level 2 - Modified Activation
                </Button>
                <Button
                  onClick={() => handleTraumaActivation('level-3')}
                  className="w-full justify-start bg-yellow-600 hover:bg-yellow-700"
                >
                  <CircleDot className="h-4 w-4 mr-2" />
                  Level 3 - Limited Activation
                </Button>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-orange-800">
                <li>• Trauma Surgeon</li>
                <li>• Emergency Medicine Attending</li>
                <li>• Anesthesiologist</li>
                <li>• OR Team</li>
                <li>• Radiology Tech</li>
                <li>• Lab Personnel</li>
                <li>• Respiratory Therapy</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTraumaConfirm(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* STEMI Alert Modal */}
      <Dialog open={showStemiAlert} onOpenChange={setShowStemiAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600 animate-pulse" />
              STEMI ALERT ACTIVATION
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg mb-4">
              <p className="text-sm font-medium text-red-900">
                Activate STEMI protocol? This will:
              </p>
              <ul className="mt-3 space-y-1 text-sm text-red-800">
                <li>• Alert Cath Lab Team</li>
                <li>• Notify Interventional Cardiologist</li>
                <li>• Start Door-to-Balloon Timer (Goal: &lt;90 min)</li>
                <li>• Prepare CCU Bed</li>
                <li>• Page Cardiology Attending</li>
                <li>• Activate Emergency Cath Lab</li>
              </ul>
            </div>

            <p className="text-sm font-bold text-red-900">
              Confirm STEMI Protocol Activation?
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStemiAlert(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleStemiActivation}
              className="bg-red-600 hover:bg-red-700 animate-pulse"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              ACTIVATE STEMI ALERT
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stroke Alert Modal */}
      <Dialog open={showStrokeAlert} onOpenChange={setShowStrokeAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600 animate-pulse" />
              CODE STROKE ACTIVATION
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg mb-4">
              <p className="text-sm font-medium text-purple-900">
                Activate Stroke protocol? This will:
              </p>
              <ul className="mt-3 space-y-1 text-sm text-purple-800">
                <li>• Alert Stroke Team</li>
                <li>• Notify Neurologist</li>
                <li>• Start Door-to-CT Timer (Goal: &lt;25 min)</li>
                <li>• Start Door-to-Needle Timer (Goal: &lt;60 min)</li>
                <li>• Alert CT Tech</li>
                <li>• Prepare tPA/Thrombectomy</li>
                <li>• Notify Neuro ICU</li>
              </ul>
            </div>

            <p className="text-sm font-bold text-purple-900">
              Confirm Stroke Protocol Activation?
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStrokeAlert(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleStrokeActivation}
              className="bg-purple-600 hover:bg-purple-700 animate-pulse"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              ACTIVATE CODE STROKE
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </DashboardLayout>
  )
}

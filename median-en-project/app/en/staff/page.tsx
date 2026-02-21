'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

import { useState } from 'react'
import {
  Users, Search, Download, Plus, UserCheck, Calendar, Clock, Shield, Activity,
  AlertCircle, Edit2, Trash2, Phone, Mail, ChevronDown, ChevronUp, Filter,
  RefreshCw, TrendingUp, Star, CheckCircle2, XCircle, ArrowLeftRight,
  ClipboardCheck, UserPlus, Award, CalendarClock, Timer, FileCheck, GraduationCap,
  Building2, Stethoscope, Clipboard, BadgeCheck, AlertTriangle, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// US Healthcare Staff Types
type StaffTitle = 'MD' | 'DO' | 'RN' | 'BSN' | 'MSN' | 'NP' | 'PA' | 'PharmD' | 'RT' | 'PT' | 'OT' |
  'CRNA' | 'CNS' | 'Medical Assistant' | 'Unit Clerk' | 'Health Information Manager' |
  'EVS Technician' | 'Security Officer' | 'Department Director' | 'VP Clinical Operations'

type Department = 'Emergency Medicine' | 'Cardiology' | 'Neurology' | 'Orthopedics' | 'Pediatrics' |
  'Obstetrics & Gynecology' | 'Ophthalmology' | 'Otolaryngology' | 'Dermatology' | 'Psychiatry' |
  'Urology' | 'General Surgery' | 'Internal Medicine' | 'Anesthesiology' | 'Radiology' |
  'Clinical Laboratory' | 'Pharmacy Services' | 'Hospital Administration' | 'Facility Services' |
  'Security Services' | 'Intensive Care' | 'Medical-Surgical Unit' | 'Outpatient Services'

type ShiftType = 'Day Shift' | 'Evening Shift' | 'Night Shift' | 'Weekend' | 'On Call' | 'PTO' | 'FMLA Leave'

type LeaveType = 'Paid Time Off' | 'Sick Leave' | 'FMLA' | 'Bereavement' | 'Jury Duty' |
  'Military Leave' | 'Maternity Leave' | 'Paternity Leave'

type StaffCategory = 'Active Medical Staff' | 'Courtesy Staff' | 'Consulting Staff' | 'Allied Health' |
  'House Staff' | 'Administrative'

type CredentialStatus = 'Active' | 'Pending Renewal' | 'Expired' | 'Under Review'

type BoardCertification = 'ABIM' | 'ABFM' | 'ABEM' | 'ABP' | 'ACOG' | 'ABS' | 'ABR' | 'ABA' |
  'ABPsych' | 'ABU' | 'None'

interface StaffCredentials {
  npi?: string // National Provider Identifier
  deaNumber?: string // DEA registration
  stateLicense: string
  licenseState: string
  licenseExpiration: string
  boardCertification?: BoardCertification
  certificationExpiration?: string
  malpracticeInsurer?: string
  malpracticeExpiration?: string
  cmeCredits: number // Continuing Medical Education
  privilegingStatus: CredentialStatus
  lastCredentialingDate: string
  nextCredentialingDue: string
}

interface ComplianceTracking {
  tbScreening: string // Last TB test date
  hepatitisB: boolean
  influenzaVaccine: string
  covidVaccine: boolean
  annualHealthScreening: string
  n95FitTest?: string
  blsExpiration?: string
  aclsExpiration?: string
  palsExpiration?: string
}

interface Staff {
  id: number
  name: string
  title: StaffTitle
  department: Department
  staffCategory: StaffCategory
  phone: string
  email: string
  shift: ShiftType
  onDuty: boolean
  performance: number // 1-5 rating
  overtimeHours: number
  ptoBalance: number
  sickLeaveBalance: number
  lastReview: string
  clockIn?: string
  clockOut?: string
  lateArrival: boolean
  credentials?: StaffCredentials
  compliance?: ComplianceTracking
  hireDate: string
  yearsOfService: number
}

interface ShiftSchedule {
  staffId: number
  staffName: string
  day: string
  shift: ShiftType
}

interface LeaveRequest {
  id: number
  staffId: number
  staffName: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  days: number
  reason: string
  status: 'Pending' | 'Approved' | 'Denied'
  requestDate: string
}

interface ShiftSwapRequest {
  id: number
  fromStaffId: number
  fromStaffName: string
  toStaffId: number
  toStaffName: string
  date: string
  currentShift: ShiftType
  requestedShift: ShiftType
  reason: string
  status: 'Pending' | 'Approved' | 'Denied'
}

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'directory' | 'schedule' | 'attendance' | 'leave' | 'performance' | 'swaps' | 'credentials'>('directory')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [filterTitle, setFilterTitle] = useState<string>('all')
  const [currentWeek, setCurrentWeek] = useState(0)

  // Generate 100+ realistic US healthcare staff members
  const generateStaff = (): Staff[] => {
    const firstNames = {
      male: ['Michael', 'David', 'James', 'Robert', 'John', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
        'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Andrew', 'Kenneth', 'Joshua', 'Kevin'],
      female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
        'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle']
    }
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
      'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson',
      'Martin', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen']

    const mdTitles: StaffTitle[] = ['MD', 'DO']
    const nurseTitles: StaffTitle[] = ['RN', 'BSN', 'MSN', 'NP', 'CRNA', 'CNS']
    const alliedTitles: StaffTitle[] = ['PA', 'PharmD', 'RT', 'PT', 'OT', 'Medical Assistant']
    const supportTitles: StaffTitle[] = ['Unit Clerk', 'Health Information Manager', 'EVS Technician', 'Security Officer']
    const adminTitles: StaffTitle[] = ['Department Director', 'VP Clinical Operations']

    const medicalDepartments: Department[] = [
      'Emergency Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Obstetrics & Gynecology',
      'Ophthalmology', 'Otolaryngology', 'Dermatology', 'Psychiatry', 'Urology', 'General Surgery',
      'Internal Medicine', 'Anesthesiology', 'Intensive Care', 'Medical-Surgical Unit', 'Outpatient Services'
    ]

    const boardCerts: BoardCertification[] = ['ABIM', 'ABFM', 'ABEM', 'ABP', 'ACOG', 'ABS', 'ABR', 'ABA', 'ABPsych', 'ABU']

    const staff: Staff[] = []
    let id = 1

    // Generate NPI number
    const generateNPI = () => {
      return `1${Math.floor(Math.random() * 900000000 + 100000000)}`
    }

    // Generate DEA number (2 letters + 7 digits)
    const generateDEA = (lastName: string) => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const firstLetter = letters[Math.floor(Math.random() * letters.length)]
      const secondLetter = lastName[0].toUpperCase()
      const numbers = Math.floor(Math.random() * 9000000 + 1000000)
      return `${firstLetter}${secondLetter}${numbers}`
    }

    // Generate state license
    const generateLicense = (state: string) => {
      return `${state}${Math.floor(Math.random() * 900000 + 100000)}`
    }

    const states = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI']

    // Generate 35 Physicians (MD/DO)
    for (let i = 0; i < 35; i++) {
      const gender = Math.random() > 0.6 ? 'male' : 'female'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const title = mdTitles[Math.floor(Math.random() * mdTitles.length)]
      const dept = medicalDepartments[Math.floor(Math.random() * medicalDepartments.length)]
      const state = states[Math.floor(Math.random() * states.length)]
      const yearsOfService = Math.floor(Math.random() * 20) + 1

      staff.push({
        id: id++,
        name: `${firstName} ${lastName}, ${title}`,
        title,
        department: dept,
        staffCategory: 'Active Medical Staff',
        phone: `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hospitalsystem.org`,
        shift: (['Day Shift', 'Evening Shift', 'On Call'] as ShiftType[])[Math.floor(Math.random() * 3)],
        onDuty: Math.random() > 0.5,
        performance: Math.floor(3.5 + Math.random() * 1.5), // 3.5-5 stars
        overtimeHours: Math.floor(Math.random() * 30),
        ptoBalance: Math.floor(80 + Math.random() * 80), // 80-160 hours
        sickLeaveBalance: Math.floor(40 + Math.random() * 40),
        lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
        clockIn: Math.random() > 0.3 ? `0${Math.floor(6 + Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        clockOut: Math.random() > 0.5 ? `1${Math.floor(5 + Math.random() * 4)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        lateArrival: Math.random() > 0.9,
        credentials: {
          npi: generateNPI(),
          deaNumber: generateDEA(lastName),
          stateLicense: generateLicense(state),
          licenseState: state,
          licenseExpiration: `202${Math.floor(5 + Math.random() * 3)}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-28`,
          boardCertification: boardCerts[Math.floor(Math.random() * boardCerts.length)],
          certificationExpiration: `202${Math.floor(5 + Math.random() * 3)}-12-31`,
          malpracticeInsurer: ['The Doctors Company', 'ProAssurance', 'Coverys', 'MagMutual'][Math.floor(Math.random() * 4)],
          malpracticeExpiration: `2025-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-01`,
          cmeCredits: Math.floor(20 + Math.random() * 30),
          privilegingStatus: (['Active', 'Pending Renewal'] as CredentialStatus[])[Math.floor(Math.random() * 2)],
          lastCredentialingDate: '2023-06-15',
          nextCredentialingDue: '2025-06-15'
        },
        compliance: {
          tbScreening: '2024-11-01',
          hepatitisB: true,
          influenzaVaccine: '2024-10-15',
          covidVaccine: true,
          annualHealthScreening: '2024-08-20',
          blsExpiration: '2025-09-01',
          aclsExpiration: '2025-07-15'
        },
        hireDate: `20${String(24 - yearsOfService).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-01`,
        yearsOfService
      })
    }

    // Generate 55 Nurses (RN, BSN, MSN, NP, CRNA, CNS)
    for (let i = 0; i < 55; i++) {
      const gender = Math.random() > 0.2 ? 'female' : 'male'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const title = nurseTitles[Math.floor(Math.random() * nurseTitles.length)]
      const dept = medicalDepartments[Math.floor(Math.random() * medicalDepartments.length)]
      const state = states[Math.floor(Math.random() * states.length)]
      const yearsOfService = Math.floor(Math.random() * 15) + 1

      staff.push({
        id: id++,
        name: `${firstName} ${lastName}, ${title}`,
        title,
        department: dept,
        staffCategory: title === 'NP' || title === 'CRNA' ? 'Active Medical Staff' : 'Allied Health',
        phone: `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hospitalsystem.org`,
        shift: (['Day Shift', 'Evening Shift', 'Night Shift'] as ShiftType[])[Math.floor(Math.random() * 3)],
        onDuty: Math.random() > 0.5,
        performance: Math.floor(3 + Math.random() * 3),
        overtimeHours: Math.floor(Math.random() * 35),
        ptoBalance: Math.floor(80 + Math.random() * 60),
        sickLeaveBalance: Math.floor(40 + Math.random() * 40),
        lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
        clockIn: Math.random() > 0.2 ? `0${Math.floor(6 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        clockOut: Math.random() > 0.6 ? `1${Math.floor(4 + Math.random() * 4)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        lateArrival: Math.random() > 0.92,
        credentials: {
          stateLicense: generateLicense(state),
          licenseState: state,
          licenseExpiration: `202${Math.floor(5 + Math.random() * 2)}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-28`,
          cmeCredits: Math.floor(10 + Math.random() * 20),
          privilegingStatus: 'Active',
          lastCredentialingDate: '2023-09-01',
          nextCredentialingDue: '2025-09-01'
        },
        compliance: {
          tbScreening: '2024-10-15',
          hepatitisB: true,
          influenzaVaccine: '2024-10-01',
          covidVaccine: true,
          annualHealthScreening: '2024-07-10',
          blsExpiration: '2025-08-01',
          aclsExpiration: title === 'CRNA' || title === 'NP' ? '2025-06-01' : undefined
        },
        hireDate: `20${String(24 - yearsOfService).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-15`,
        yearsOfService
      })
    }

    // Generate 20 Allied Health (PA, PharmD, RT, PT, OT, etc.)
    for (let i = 0; i < 20; i++) {
      const gender = Math.random() > 0.5 ? 'male' : 'female'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const title = alliedTitles[Math.floor(Math.random() * alliedTitles.length)]
      let dept: Department

      if (title === 'PharmD') dept = 'Pharmacy Services'
      else if (title === 'RT') dept = 'Radiology'
      else if (title === 'PT' || title === 'OT') dept = 'Outpatient Services'
      else dept = medicalDepartments[Math.floor(Math.random() * medicalDepartments.length)]

      const state = states[Math.floor(Math.random() * states.length)]
      const yearsOfService = Math.floor(Math.random() * 12) + 1

      staff.push({
        id: id++,
        name: `${firstName} ${lastName}, ${title}`,
        title,
        department: dept,
        staffCategory: 'Allied Health',
        phone: `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hospitalsystem.org`,
        shift: (['Day Shift', 'Evening Shift'] as ShiftType[])[Math.floor(Math.random() * 2)],
        onDuty: Math.random() > 0.5,
        performance: Math.floor(3 + Math.random() * 3),
        overtimeHours: Math.floor(Math.random() * 25),
        ptoBalance: Math.floor(80 + Math.random() * 60),
        sickLeaveBalance: Math.floor(40 + Math.random() * 40),
        lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
        clockIn: Math.random() > 0.3 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        clockOut: Math.random() > 0.5 ? `1${Math.floor(5 + Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        lateArrival: Math.random() > 0.9,
        credentials: title === 'PharmD' || title === 'PA' ? {
          npi: title === 'PA' ? generateNPI() : undefined,
          deaNumber: title === 'PharmD' ? generateDEA(lastName) : undefined,
          stateLicense: generateLicense(state),
          licenseState: state,
          licenseExpiration: `202${Math.floor(5 + Math.random() * 2)}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-28`,
          cmeCredits: Math.floor(15 + Math.random() * 25),
          privilegingStatus: 'Active',
          lastCredentialingDate: '2023-08-01',
          nextCredentialingDue: '2025-08-01'
        } : {
          stateLicense: generateLicense(state),
          licenseState: state,
          licenseExpiration: `202${Math.floor(5 + Math.random() * 2)}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-28`,
          cmeCredits: Math.floor(10 + Math.random() * 15),
          privilegingStatus: 'Active',
          lastCredentialingDate: '2023-07-01',
          nextCredentialingDue: '2025-07-01'
        },
        compliance: {
          tbScreening: '2024-09-20',
          hepatitisB: true,
          influenzaVaccine: '2024-10-05',
          covidVaccine: true,
          annualHealthScreening: '2024-06-15',
          blsExpiration: '2025-07-01'
        },
        hireDate: `20${String(24 - yearsOfService).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-01`,
        yearsOfService
      })
    }

    // Generate 15 Support Staff
    for (let i = 0; i < 15; i++) {
      const gender = Math.random() > 0.5 ? 'male' : 'female'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const title = supportTitles[Math.floor(Math.random() * supportTitles.length)]
      let dept: Department

      if (title === 'EVS Technician') dept = 'Facility Services'
      else if (title === 'Security Officer') dept = 'Security Services'
      else dept = 'Hospital Administration'

      const yearsOfService = Math.floor(Math.random() * 10) + 1

      staff.push({
        id: id++,
        name: `${firstName} ${lastName}`,
        title,
        department: dept,
        staffCategory: 'Administrative',
        phone: `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hospitalsystem.org`,
        shift: title === 'Security Officer' ? (['Day Shift', 'Evening Shift', 'Night Shift'] as ShiftType[])[Math.floor(Math.random() * 3)] : 'Day Shift',
        onDuty: Math.random() > 0.5,
        performance: Math.floor(3 + Math.random() * 3),
        overtimeHours: Math.floor(Math.random() * 20),
        ptoBalance: Math.floor(80 + Math.random() * 40),
        sickLeaveBalance: Math.floor(40 + Math.random() * 40),
        lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
        clockIn: Math.random() > 0.2 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        clockOut: Math.random() > 0.5 ? `1${Math.floor(5 + Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        lateArrival: Math.random() > 0.88,
        compliance: {
          tbScreening: '2024-08-10',
          hepatitisB: false,
          influenzaVaccine: '2024-09-25',
          covidVaccine: true,
          annualHealthScreening: '2024-05-20'
        },
        hireDate: `20${String(24 - yearsOfService).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-01`,
        yearsOfService
      })
    }

    // Generate 8 Department Directors and VPs
    for (let i = 0; i < 8; i++) {
      const gender = Math.random() > 0.5 ? 'male' : 'female'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const title = adminTitles[Math.floor(Math.random() * adminTitles.length)]
      const yearsOfService = Math.floor(Math.random() * 15) + 5

      staff.push({
        id: id++,
        name: `${firstName} ${lastName}`,
        title,
        department: 'Hospital Administration',
        staffCategory: 'Administrative',
        phone: `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hospitalsystem.org`,
        shift: 'Day Shift',
        onDuty: Math.random() > 0.5,
        performance: Math.floor(4 + Math.random() * 2), // 4-5 stars
        overtimeHours: Math.floor(Math.random() * 40),
        ptoBalance: Math.floor(120 + Math.random() * 80), // Higher PTO for senior staff
        sickLeaveBalance: Math.floor(60 + Math.random() * 40),
        lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
        clockIn: Math.random() > 0.3 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        clockOut: Math.random() > 0.3 ? `1${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
        lateArrival: Math.random() > 0.95,
        compliance: {
          tbScreening: '2024-07-01',
          hepatitisB: false,
          influenzaVaccine: '2024-09-15',
          covidVaccine: true,
          annualHealthScreening: '2024-04-10'
        },
        hireDate: `20${String(24 - yearsOfService).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-01`,
        yearsOfService
      })
    }

    return staff
  }

  const [staff] = useState<Staff[]>(generateStaff())

  // Generate shift schedule for the week
  const generateWeekSchedule = (): ShiftSchedule[] => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const schedule: ShiftSchedule[] = []

    staff.slice(0, 40).forEach(s => {
      days.forEach(day => {
        const shifts: ShiftType[] = ['Day Shift', 'Evening Shift', 'Night Shift', 'Weekend', 'On Call']
        schedule.push({
          staffId: s.id,
          staffName: s.name,
          day,
          shift: shifts[Math.floor(Math.random() * shifts.length)]
        })
      })
    })

    return schedule
  }

  const [weekSchedule] = useState<ShiftSchedule[]>(generateWeekSchedule())

  // Generate leave requests
  const generateLeaveRequests = (): LeaveRequest[] => {
    const leaveTypes: LeaveType[] = ['Paid Time Off', 'Sick Leave', 'FMLA', 'Bereavement', 'Maternity Leave', 'Paternity Leave']
    const statuses: Array<'Pending' | 'Approved' | 'Denied'> = ['Pending', 'Approved', 'Denied']
    const reasons = [
      'Family vacation',
      'Medical appointment',
      'Personal matter',
      'Illness recovery',
      'Maternity care',
      'Family wedding',
      'Professional development',
      'Childcare emergency',
      'Family medical emergency'
    ]

    return staff.slice(0, 25).map((s, i) => ({
      id: i + 1,
      staffId: s.id,
      staffName: s.name,
      leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      startDate: `2024-12-${String(15 + Math.floor(Math.random() * 15)).padStart(2, '0')}`,
      endDate: `2024-12-${String(20 + Math.floor(Math.random() * 10)).padStart(2, '0')}`,
      days: Math.floor(1 + Math.random() * 10),
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      requestDate: `2024-12-${String(1 + Math.floor(Math.random() * 14)).padStart(2, '0')}`
    }))
  }

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(generateLeaveRequests())

  // Generate shift swap requests
  const generateSwapRequests = (): ShiftSwapRequest[] => {
    const shifts: ShiftType[] = ['Day Shift', 'Evening Shift', 'Night Shift']
    const statuses: Array<'Pending' | 'Approved' | 'Denied'> = ['Pending', 'Approved', 'Denied']
    const reasons = [
      'Personal appointment',
      'Family emergency',
      'Medical appointment',
      'Professional development',
      'Childcare conflict'
    ]

    return Array.from({ length: 15 }, (_, i) => {
      const fromStaff = staff[Math.floor(Math.random() * 60)]
      const toStaff = staff[Math.floor(Math.random() * 60)]

      return {
        id: i + 1,
        fromStaffId: fromStaff.id,
        fromStaffName: fromStaff.name,
        toStaffId: toStaff.id,
        toStaffName: toStaff.name,
        date: `2024-12-${String(20 + Math.floor(Math.random() * 10)).padStart(2, '0')}`,
        currentShift: shifts[Math.floor(Math.random() * 3)],
        requestedShift: shifts[Math.floor(Math.random() * 3)],
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)]
      }
    })
  }

  const [swapRequests, setSwapRequests] = useState<ShiftSwapRequest[]>(generateSwapRequests())

  // Filtered staff
  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.phone.includes(searchTerm)
    const matchesDept = filterDepartment === 'all' || s.department === filterDepartment
    const matchesTitle = filterTitle === 'all' || s.title === filterTitle
    return matchesSearch && matchesDept && matchesTitle
  })

  // Statistics
  const totalStaff = staff.length
  const onDutyNow = staff.filter(s => s.onDuty).length
  const onLeave = staff.filter(s => s.shift === 'PTO' || s.shift === 'FMLA Leave').length
  const totalOvertimeThisMonth = staff.reduce((sum, s) => sum + s.overtimeHours, 0)
  const lateArrivals = staff.filter(s => s.lateArrival).length
  const credentialsExpiring = staff.filter(s =>
    s.credentials?.privilegingStatus === 'Pending Renewal'
  ).length

  // Shift color mapping
  const getShiftColor = (shift: ShiftType) => {
    switch (shift) {
      case 'Day Shift': return 'bg-green-100 text-green-800 border-green-200'
      case 'Evening Shift': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Night Shift': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Weekend': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'On Call': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'PTO': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'FMLA Leave': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getShiftTime = (shift: ShiftType) => {
    switch (shift) {
      case 'Day Shift': return '07:00-15:00'
      case 'Evening Shift': return '15:00-23:00'
      case 'Night Shift': return '23:00-07:00'
      case 'Weekend': return 'Weekend'
      case 'On Call': return 'On Call'
      case 'PTO': return 'PTO'
      case 'FMLA Leave': return 'FMLA'
      default: return ''
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
          <div className="max-w-[1920px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Users className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Medical Staff Management
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">Credentialing • Scheduling • Performance • Compliance Tracking</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => window.print()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Staff Member
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Statistics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Total Staff</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalStaff}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">On Duty</span>
              </div>
              <p className="text-3xl font-bold text-green-700">{onDutyNow}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-yellow-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">On Leave</span>
              </div>
              <p className="text-3xl font-bold text-yellow-700">{onLeave}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Overtime (MTD)</span>
              </div>
              <p className="text-3xl font-bold text-purple-700">{totalOvertimeThisMonth}h</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Late Arrivals</span>
              </div>
              <p className="text-3xl font-bold text-red-700">{lateArrivals}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BadgeCheck className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Expiring Soon</span>
              </div>
              <p className="text-3xl font-bold text-orange-700">{credentialsExpiring}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 mb-6">
            <div className="flex items-center gap-2 p-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('directory')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'directory'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Staff Directory
                </div>
              </button>
              <button
                onClick={() => setActiveTab('credentials')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'credentials'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  Credentialing
                </div>
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'schedule'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Call Schedule
                </div>
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'attendance'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time & Attendance
                </div>
              </button>
              <button
                onClick={() => setActiveTab('leave')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'leave'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" />
                  Leave Management
                </div>
              </button>
              <button
                onClick={() => setActiveTab('swaps')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'swaps'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="h-4 w-4" />
                  Shift Swaps
                </div>
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'performance'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  OPPE/FPPE
                </div>
              </button>
            </div>
          </div>

          {/* Staff Directory Tab */}
          {activeTab === 'directory' && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search staff (name, email, phone)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg font-medium hover:border-blue-300 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="all">All Departments</option>
                      <option value="Emergency Medicine">Emergency Medicine</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                      <option value="Clinical Laboratory">Clinical Laboratory</option>
                      <option value="Radiology">Radiology</option>
                    </select>
                    <select
                      value={filterTitle}
                      onChange={(e) => setFilterTitle(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg font-medium hover:border-blue-300 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="all">All Credentials</option>
                      <option value="MD">MD</option>
                      <option value="DO">DO</option>
                      <option value="RN">RN</option>
                      <option value="BSN">BSN</option>
                      <option value="MSN">MSN</option>
                      <option value="NP">NP</option>
                      <option value="PA">PA</option>
                      <option value="PharmD">PharmD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Provider</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Credentials</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Shift</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStaff.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          #{s.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {s.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{s.name}</div>
                              <div className="text-xs text-gray-500">{s.staffCategory}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            {s.title}
                          </Badge>
                          {s.credentials?.npi && (
                            <div className="text-xs text-gray-500 mt-1">NPI: {s.credentials.npi}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                          {s.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {s.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {s.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getShiftColor(s.shift)} border`}>
                            {s.shift} {getShiftTime(s.shift) && `(${getShiftTime(s.shift)})`}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {s.onDuty ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              On Duty
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              Off Duty
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-2 hover:border-blue-500 hover:bg-blue-50"
                              onClick={() => {
                                setSelectedStaff(s)
                                setShowEditModal(true)
                              }}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-2 hover:border-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-medium">
                    Showing <span className="font-bold text-gray-900">{filteredStaff.length}</span> staff members
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Credentialing Tab */}
          {activeTab === 'credentials' && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Staff Credentialing</h2>
                <p className="text-gray-600">License tracking, privileging status, and credential expiration management</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Provider</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">NPI/DEA</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">State License</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Board Cert</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Malpractice</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">CME Credits</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Privileging</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Next Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {staff.filter(s => s.credentials).slice(0, 50).map((s) => {
                      const cred = s.credentials!
                      const isExpiring = cred.privilegingStatus === 'Pending Renewal'

                      return (
                        <tr key={s.id} className={`hover:bg-gray-50 transition-colors ${isExpiring ? 'bg-yellow-50' : ''}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-gray-900">{s.name}</div>
                            <div className="text-xs text-gray-600">{s.department}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cred.npi && <div className="text-sm font-mono text-gray-700">NPI: {cred.npi}</div>}
                            {cred.deaNumber && <div className="text-xs font-mono text-gray-600">DEA: {cred.deaNumber}</div>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">{cred.licenseState} {cred.stateLicense}</div>
                            <div className="text-xs text-gray-600">Exp: {cred.licenseExpiration}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cred.boardCertification && cred.boardCertification !== 'None' ? (
                              <>
                                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                  {cred.boardCertification}
                                </Badge>
                                <div className="text-xs text-gray-600 mt-1">Exp: {cred.certificationExpiration}</div>
                              </>
                            ) : (
                              <span className="text-sm text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cred.malpracticeInsurer ? (
                              <>
                                <div className="text-sm font-medium text-gray-900">{cred.malpracticeInsurer}</div>
                                <div className="text-xs text-gray-600">Exp: {cred.malpracticeExpiration}</div>
                              </>
                            ) : (
                              <span className="text-sm text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`font-bold ${cred.cmeCredits < 15 ? 'text-red-600' : 'text-green-600'}`}>
                              {cred.cmeCredits} hrs
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cred.privilegingStatus === 'Active' && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                            {cred.privilegingStatus === 'Pending Renewal' && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {cred.nextCredentialingDue}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-1">Active Credentials</div>
                    <div className="text-2xl font-bold text-green-700">
                      {staff.filter(s => s.credentials?.privilegingStatus === 'Active').length}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-yellow-200">
                    <div className="text-sm text-gray-600 mb-1">Pending Renewal</div>
                    <div className="text-2xl font-bold text-yellow-700">
                      {credentialsExpiring}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-purple-200">
                    <div className="text-sm text-gray-600 mb-1">Board Certified</div>
                    <div className="text-2xl font-bold text-purple-700">
                      {staff.filter(s => s.credentials?.boardCertification && s.credentials.boardCertification !== 'None').length}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">NPI Registered</div>
                    <div className="text-2xl font-bold text-blue-700">
                      {staff.filter(s => s.credentials?.npi).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Weekly Call Schedule</h2>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
                      <ChevronDown className="h-4 w-4 rotate-90" />
                      Previous Week
                    </Button>
                    <span className="text-sm font-bold text-gray-700 px-4">
                      {currentWeek === 0 ? 'Current Week' : `${currentWeek > 0 ? '+' : ''}${currentWeek} Week`}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
                      Next Week
                      <ChevronUp className="h-4 w-4 rotate-90" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-700">Day (07:00-15:00)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-700">Evening (15:00-23:00)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-purple-500"></div>
                    <span className="text-sm font-medium text-gray-700">Night (23:00-07:00)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-yellow-500"></div>
                    <span className="text-sm font-medium text-gray-700">On Call</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50">
                        Provider
                      </th>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <th key={day} className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {staff.slice(0, 40).map((s) => {
                      const staffSchedule = weekSchedule.filter(ws => ws.staffId === s.id)
                      return (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                            <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                            <div className="text-xs text-gray-600">{s.title}</div>
                          </td>
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                            const daySchedule = staffSchedule.find(ws => ws.day === day)
                            const shift = daySchedule?.shift || 'Day Shift'
                            return (
                              <td key={day} className="px-4 py-4 text-center">
                                <button
                                  className={`w-full px-3 py-2 rounded-lg font-semibold text-xs transition-all hover:scale-105 ${getShiftColor(shift)} border`}
                                  onClick={() => {
                                    alert(`Assign shift: ${s.name} - ${day} - ${shift}`)
                                  }}
                                >
                                  {shift === 'Day Shift' ? 'Day' : shift === 'Evening Shift' ? 'Eve' : shift === 'Night Shift' ? 'Night' : shift === 'On Call' ? 'Call' : shift}
                                </button>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-gray-200">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Auto-Generate Schedule
                </Button>
              </div>
            </div>
          )}

          {/* Time & Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Time & Attendance Tracking</h2>
                <p className="text-gray-600">Clock in/out times, late arrivals, and early departures</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Staff Member</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Shift</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Clock In</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Clock Out</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hours Worked</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {staff.filter(s => s.clockIn).slice(0, 50).map((s) => {
                      const clockInTime = s.clockIn ? parseInt(s.clockIn.split(':')[0]) * 60 + parseInt(s.clockIn.split(':')[1]) : 0
                      const expectedTime = s.shift === 'Day Shift' ? 7 * 60 : s.shift === 'Evening Shift' ? 15 * 60 : 23 * 60
                      const isLate = clockInTime - expectedTime > 15

                      return (
                        <tr key={s.id} className={`hover:bg-gray-50 transition-colors ${isLate ? 'bg-red-50' : ''}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-gray-900">{s.name}</div>
                            <div className="text-xs text-gray-600">{s.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {s.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={`${getShiftColor(s.shift)} border`}>
                              {s.shift}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className={`font-bold font-mono ${isLate ? 'text-red-600' : 'text-green-600'}`}>
                                {s.clockIn || '--:--'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="font-bold font-mono text-gray-700">
                                {s.clockOut || '--:--'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {s.clockIn && s.clockOut ? (
                              <span className="font-bold text-gray-900">
                                {Math.floor(Math.random() * 3) + 7}h {Math.floor(Math.random() * 60)}m
                              </span>
                            ) : (
                              <span className="text-gray-400">--</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isLate ? (
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Late (+{Math.floor((clockInTime - expectedTime) / 60)}m)
                              </Badge>
                            ) : s.clockIn ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                On Time
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                                Not Clocked In
                              </Badge>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white rounded-xl border-2 border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Clocked In Today</div>
                    <div className="text-2xl font-bold text-gray-900">{staff.filter(s => s.clockIn).length}</div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-1">On Time</div>
                    <div className="text-2xl font-bold text-green-700">{staff.filter(s => s.clockIn && !s.lateArrival).length}</div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-red-200">
                    <div className="text-sm text-gray-600 mb-1">Late Arrival</div>
                    <div className="text-2xl font-bold text-red-700">{lateArrivals}</div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-yellow-200">
                    <div className="text-sm text-gray-600 mb-1">Absent</div>
                    <div className="text-2xl font-bold text-yellow-700">{staff.filter(s => !s.clockIn && s.onDuty).length}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leave Management Tab */}
          {activeTab === 'leave' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Leave Requests</h2>
                      <p className="text-gray-600">PTO, FMLA, and other leave request management</p>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      onClick={() => setShowLeaveModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Leave Request
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Request #</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Leave Type</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">End Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Days</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Reason</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {leaveRequests.map((lr) => (
                        <tr key={lr.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                            #{lr.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-gray-900">{lr.staffName}</div>
                            <div className="text-xs text-gray-600">Filed: {lr.requestDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={`${
                              lr.leaveType === 'Paid Time Off' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              lr.leaveType === 'Sick Leave' ? 'bg-red-100 text-red-800 border-red-200' :
                              lr.leaveType === 'FMLA' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                              lr.leaveType === 'Maternity Leave' ? 'bg-pink-100 text-pink-800 border-pink-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            } border`}>
                              {lr.leaveType}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                            {lr.startDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                            {lr.endDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-bold text-gray-900">{lr.days} days</span>
                          </td>
                          <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-600">
                            {lr.reason}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {lr.status === 'Pending' && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                <Timer className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                            {lr.status === 'Approved' && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Approved
                              </Badge>
                            )}
                            {lr.status === 'Denied' && (
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                <XCircle className="h-3 w-3 mr-1" />
                                Denied
                              </Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {lr.status === 'Pending' && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={() => {
                                    setLeaveRequests(leaveRequests.map(l =>
                                      l.id === lr.id ? { ...l, status: 'Approved' } : l
                                    ))
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-500 text-red-600 hover:bg-red-50"
                                  onClick={() => {
                                    setLeaveRequests(leaveRequests.map(l =>
                                      l.id === lr.id ? { ...l, status: 'Denied' } : l
                                    ))
                                  }}
                                >
                                  Deny
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
                  <div className="text-sm text-gray-600 mb-2">PTO Requests</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {leaveRequests.filter(lr => lr.leaveType === 'Paid Time Off').length}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
                  <div className="text-sm text-gray-600 mb-2">Sick Leave</div>
                  <div className="text-2xl font-bold text-red-700">
                    {leaveRequests.filter(lr => lr.leaveType === 'Sick Leave').length}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-yellow-100">
                  <div className="text-sm text-gray-600 mb-2">Pending Review</div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {leaveRequests.filter(lr => lr.status === 'Pending').length}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
                  <div className="text-sm text-gray-600 mb-2">Approved</div>
                  <div className="text-2xl font-bold text-green-700">
                    {leaveRequests.filter(lr => lr.status === 'Approved').length}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
                  <div className="text-sm text-gray-600 mb-2">FMLA</div>
                  <div className="text-2xl font-bold text-purple-700">
                    {leaveRequests.filter(lr => lr.leaveType === 'FMLA').length}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shift Swap Requests Tab */}
          {activeTab === 'swaps' && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Shift Swap Requests</h2>
                    <p className="text-gray-600">Staff shift exchange requests and approval workflow</p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={() => setShowSwapModal(true)}
                  >
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    New Swap Request
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Request #</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requesting</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Swapping With</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Current</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requested</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {swapRequests.map((sr) => (
                      <tr key={sr.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                          #{sr.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-900">{sr.fromStaffName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-900">{sr.toStaffName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                          {sr.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getShiftColor(sr.currentShift)} border`}>
                            {sr.currentShift}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getShiftColor(sr.requestedShift)} border`}>
                            {sr.requestedShift}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-600">
                          {sr.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sr.status === 'Pending' && (
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              <Timer className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                          {sr.status === 'Approved' && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                          )}
                          {sr.status === 'Denied' && (
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              Denied
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sr.status === 'Pending' && (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => {
                                  setSwapRequests(swapRequests.map(s =>
                                    s.id === sr.id ? { ...s, status: 'Approved' } : s
                                  ))
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setSwapRequests(swapRequests.map(s =>
                                    s.id === sr.id ? { ...s, status: 'Denied' } : s
                                  ))
                                }}
                              >
                                Deny
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-xl border-2 border-yellow-200">
                    <div className="text-sm text-gray-600 mb-1">Pending Review</div>
                    <div className="text-2xl font-bold text-yellow-700">
                      {swapRequests.filter(sr => sr.status === 'Pending').length}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-1">Approved</div>
                    <div className="text-2xl font-bold text-green-700">
                      {swapRequests.filter(sr => sr.status === 'Approved').length}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-red-200">
                    <div className="text-sm text-gray-600 mb-1">Denied</div>
                    <div className="text-2xl font-bold text-red-700">
                      {swapRequests.filter(sr => sr.status === 'Denied').length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OPPE/FPPE Performance Tab */}
          {activeTab === 'performance' && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">OPPE/FPPE - Professional Practice Evaluation</h2>
                <p className="text-gray-600">Ongoing and Focused Professional Practice Evaluation for quality assurance</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Provider</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Credentials</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Overtime</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Absences</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Last Review</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {staff.slice(0, 50).map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-900">{s.name}</div>
                          <div className="text-xs text-gray-600">{s.yearsOfService} years</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            {s.title}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {s.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {renderStars(s.performance)}
                            <span className="text-sm font-bold text-gray-700">({s.performance}/5)</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`font-bold ${s.overtimeHours > 20 ? 'text-orange-600' : 'text-gray-700'}`}>
                            {s.overtimeHours}h
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`font-bold ${s.sickLeaveBalance < 20 ? 'text-red-600' : 'text-gray-700'}`}>
                            {s.sickLeaveBalance}h used
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {s.lastReview}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 hover:border-blue-500 hover:bg-blue-50"
                          >
                            <Award className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-white rounded-xl border-2 border-yellow-200">
                    <div className="text-sm text-gray-600 mb-1">5 Stars</div>
                    <div className="text-2xl font-bold text-yellow-700">
                      {staff.filter(s => s.performance === 5).length}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-1">4 Stars</div>
                    <div className="text-2xl font-bold text-green-700">
                      {staff.filter(s => s.performance === 4).length}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">3 Stars</div>
                    <div className="text-2xl font-bold text-blue-700">
                      {staff.filter(s => s.performance === 3).length}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-orange-200">
                    <div className="text-sm text-gray-600 mb-1">Avg Overtime</div>
                    <div className="text-2xl font-bold text-orange-700">
                      {Math.round(totalOvertimeThisMonth / staff.length)}h
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-purple-200">
                    <div className="text-sm text-gray-600 mb-1">Reviews Due</div>
                    <div className="text-2xl font-bold text-purple-700">
                      {Math.floor(staff.length * 0.15)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Staff Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900">Add New Staff Member</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <Input placeholder="e.g., Michael Johnson" className="border-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Credentials</label>
                      <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg">
                        <option>MD</option>
                        <option>DO</option>
                        <option>RN</option>
                        <option>BSN</option>
                        <option>MSN</option>
                        <option>NP</option>
                        <option>PA</option>
                        <option>PharmD</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg">
                      <option>Emergency Medicine</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Orthopedics</option>
                      <option>Pediatrics</option>
                      <option>Obstetrics & Gynecology</option>
                      <option>Clinical Laboratory</option>
                      <option>Radiology</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                      <Input placeholder="+1 555-123-4567" className="border-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <Input placeholder="name@hospitalsystem.org" className="border-2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Shift Assignment</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg">
                      <option>Day Shift (07:00-15:00)</option>
                      <option>Evening Shift (15:00-23:00)</option>
                      <option>Night Shift (23:00-07:00)</option>
                    </select>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Staff Member
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* HIPAA & Compliance Notice */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">HIPAA Compliance & Data Security</h3>
                <p className="text-sm text-blue-800">
                  All staff information is protected under HIPAA regulations and stored with AES-256 encryption.
                  Credentialing data, performance evaluations, and personnel records are managed in compliance with
                  Joint Commission standards, CMS regulations, and medical staff bylaws. Access is restricted to
                  authorized personnel only. All data handling follows NPDB query protocols and primary source verification requirements.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}

// Enterprise Healthcare Dashboard - Real Data Simulation
// Simulates real-time data from Epic/Cerner-level systems

export interface PatientData {
  id: string
  mrn: string // Medical Record Number
  name: string
  age: number
  gender: 'M' | 'F' | 'O'
  admissionDate: Date
  department: string
  condition: string
  severity: 'critical' | 'serious' | 'moderate' | 'stable'
  assignedDoctor: string
  bedNumber: string
  estimatedDischarge: Date
  riskScore: number // AI-predicted risk (0-100)
  vitalSigns: {
    heartRate: number
    bloodPressure: string
    temperature: number
    oxygenSaturation: number
    respiratoryRate: number
  }
}

export interface BedCapacity {
  department: string
  totalBeds: number
  occupiedBeds: number
  availableBeds: number
  pendingAdmissions: number
  pendingDischarges: number
  utilizationRate: number
  trend: 'increasing' | 'decreasing' | 'stable'
}

export interface StaffingData {
  shift: 'morning' | 'evening' | 'night'
  department: string
  required: number
  scheduled: number
  present: number
  shortage: number
  efficiency: number
}

export interface ClinicalMetrics {
  totalPatients: number
  criticalPatients: number
  admissionsToday: number
  dischargesToday: number
  avgLengthOfStay: number
  readmissionRate: number
  patientSatisfaction: number
  mortalityRate: number
}

export interface FinancialMetrics {
  revenue: number
  expenses: number
  profitMargin: number
  averageReimbursement: number
  denialRate: number
  daysInAR: number // Accounts Receivable
  collectionRate: number
}

export interface AIInsight {
  id: string
  type: 'warning' | 'critical' | 'info' | 'success'
  title: string
  message: string
  confidence: number
  timestamp: Date
  actionable: boolean
  action?: string
}

// Real-time data generators
export function generatePatientData(): PatientData[] {
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  const departments = ['Emergency', 'ICU', 'Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics']
  const conditions = ['Cardiac Arrest', 'Stroke', 'Pneumonia', 'Fracture', 'Cancer Treatment', 'COVID-19', 'Sepsis']
  const doctors = ['Dr. Anderson', 'Dr. Chen', 'Dr. Patel', 'Dr. Kim', 'Dr. Thompson', 'Dr. Garcia', 'Dr. Lee']

  return Array.from({ length: 45 }, (_, i) => {
    const admissionDate = new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000)
    const severity: ('critical' | 'serious' | 'moderate' | 'stable')[] = ['critical', 'serious', 'moderate', 'stable']
    const selectedSeverity = severity[Math.floor(Math.random() * severity.length)]

    return {
      id: `PAT-${String(i + 1).padStart(5, '0')}`,
      mrn: `MRN-${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      age: Math.floor(Math.random() * 70) + 18,
      gender: Math.random() > 0.5 ? 'M' : 'F',
      admissionDate,
      department: departments[Math.floor(Math.random() * departments.length)],
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      severity: selectedSeverity,
      assignedDoctor: doctors[Math.floor(Math.random() * doctors.length)],
      bedNumber: `${Math.floor(Math.random() * 5) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 8))}-${Math.floor(Math.random() * 20) + 1}`,
      estimatedDischarge: new Date(admissionDate.getTime() + (Math.random() * 10 + 2) * 24 * 60 * 60 * 1000),
      riskScore: selectedSeverity === 'critical' ? Math.floor(Math.random() * 20) + 80 :
                 selectedSeverity === 'serious' ? Math.floor(Math.random() * 30) + 50 :
                 selectedSeverity === 'moderate' ? Math.floor(Math.random() * 30) + 20 :
                 Math.floor(Math.random() * 20),
      vitalSigns: {
        heartRate: Math.floor(Math.random() * 40) + 60,
        bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 30) + 60}`,
        temperature: +(Math.random() * 3 + 36.5).toFixed(1),
        oxygenSaturation: Math.floor(Math.random() * 10) + 90,
        respiratoryRate: Math.floor(Math.random() * 8) + 12,
      }
    }
  })
}

export function generateBedCapacity(): BedCapacity[] {
  const departments = [
    { name: 'Emergency', total: 30 },
    { name: 'ICU', total: 25 },
    { name: 'Cardiology', total: 40 },
    { name: 'Neurology', total: 35 },
    { name: 'Orthopedics', total: 45 },
    { name: 'Oncology', total: 30 },
    { name: 'Pediatrics', total: 50 },
    { name: 'General', total: 80 },
  ]

  return departments.map(dept => {
    const occupied = Math.floor(Math.random() * dept.total * 0.4) + Math.floor(dept.total * 0.5)
    const available = dept.total - occupied
    const pendingAdmissions = Math.floor(Math.random() * 5)
    const pendingDischarges = Math.floor(Math.random() * 8)
    const utilizationRate = +(occupied / dept.total * 100).toFixed(1)

    return {
      department: dept.name,
      totalBeds: dept.total,
      occupiedBeds: occupied,
      availableBeds: available,
      pendingAdmissions,
      pendingDischarges,
      utilizationRate,
      trend: utilizationRate > 85 ? 'increasing' : utilizationRate < 60 ? 'decreasing' : 'stable'
    }
  })
}

export function generateStaffingData(): StaffingData[] {
  const departments = ['Emergency', 'ICU', 'Cardiology', 'Neurology', 'Orthopedics']
  const shifts: ('morning' | 'evening' | 'night')[] = ['morning', 'evening', 'night']

  return departments.flatMap(dept =>
    shifts.map(shift => {
      const required = Math.floor(Math.random() * 10) + 15
      const scheduled = required + Math.floor(Math.random() * 3) - 1
      const present = scheduled - Math.floor(Math.random() * 2)

      return {
        shift,
        department: dept,
        required,
        scheduled,
        present,
        shortage: Math.max(required - present, 0),
        efficiency: +(present / required * 100).toFixed(1)
      }
    })
  )
}

export function getClinicalMetrics(): ClinicalMetrics {
  return {
    totalPatients: 247,
    criticalPatients: 18,
    admissionsToday: 32,
    dischargesToday: 28,
    avgLengthOfStay: 4.7,
    readmissionRate: 8.3,
    patientSatisfaction: 92.5,
    mortalityRate: 1.8,
  }
}

export function getFinancialMetrics(): FinancialMetrics {
  return {
    revenue: 12547000,
    expenses: 9834000,
    profitMargin: 21.6,
    averageReimbursement: 8750,
    denialRate: 4.2,
    daysInAR: 42,
    collectionRate: 94.8,
  }
}

export function generateAIInsights(): AIInsight[] {
  return [
    {
      id: 'AI-001',
      type: 'critical',
      title: 'ICU Capacity Alert',
      message: 'ICU capacity projected to reach 95% in next 4 hours. Recommend activating surge protocol.',
      confidence: 94.5,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      actionable: true,
      action: 'Activate surge protocol'
    },
    {
      id: 'AI-002',
      type: 'warning',
      title: 'Staffing Shortage Predicted',
      message: 'Evening shift in Emergency dept predicted to have 3-person shortage based on admission trends.',
      confidence: 87.2,
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      actionable: true,
      action: 'Schedule additional staff'
    },
    {
      id: 'AI-003',
      type: 'info',
      title: 'Readmission Risk Identified',
      message: '5 patients flagged with high readmission risk (>75%). Care coordination recommended.',
      confidence: 91.8,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionable: true,
      action: 'Review discharge plans'
    },
    {
      id: 'AI-004',
      type: 'success',
      title: 'Efficiency Improvement',
      message: 'Average ED wait time reduced by 18% this week vs. last week. Current: 22 min.',
      confidence: 99.1,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      actionable: false,
    },
    {
      id: 'AI-005',
      type: 'warning',
      title: 'Supply Chain Alert',
      message: 'N95 mask inventory projected to deplete in 72 hours at current usage rate.',
      confidence: 96.3,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      actionable: true,
      action: 'Order emergency supply'
    },
  ]
}

// Real-time data update simulator
export function simulateRealTimeUpdate<T>(data: T[], updateProbability = 0.1): T[] {
  return data.map(item => {
    if (Math.random() < updateProbability) {
      // Simulate data change
      return { ...item, _updated: Date.now() }
    }
    return item
  })
}

// Calculate trends
export function calculateTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
  const change = ((current - previous) / previous) * 100
  if (Math.abs(change) < 2) return 'stable'
  return change > 0 ? 'up' : 'down'
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format percentage
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

// Time ago formatter
export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds} seconds ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  return `${Math.floor(seconds / 86400)} days ago`
}

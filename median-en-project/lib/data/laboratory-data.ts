/**
 * Laboratory Data Service
 * Provides lab orders, results, and LOINC-coded test management
 * HIPAA-compliant with CLIA and CAP standards
 */

export type LabStatus =
  | 'Pending'
  | 'In Progress'
  | 'Sample Collected'
  | 'In Lab'
  | 'Preliminary'
  | 'Final'
  | 'Amended'
  | 'Cancelled'

export type LabPriority =
  | 'Routine'
  | 'ASAP'
  | 'STAT'
  | 'Timed'

export type SpecimenType =
  | 'Blood - Whole'
  | 'Blood - Serum'
  | 'Blood - Plasma'
  | 'Urine'
  | 'CSF'
  | 'Sputum'
  | 'Tissue'
  | 'Swab'

export interface LabTest {
  loincCode: string
  testName: string
  category: string
  specimenType: SpecimenType
  normalRange?: string
  units?: string
  turnaroundTime: number // minutes
}

export interface LabResult {
  testCode: string
  testName: string
  value: string | number
  units: string
  normalRange: string
  flag?: 'High' | 'Low' | 'Critical High' | 'Critical Low' | 'Abnormal' | 'Normal'
  notes?: string
}

export interface LabOrder {
  id: string
  orderNumber: string
  patientId: string
  patientName: string
  patientMRN: string
  patientDOB: string
  patientAge: number
  patientGender: string

  // Order Information
  orderedBy: string
  orderedByNPI: string
  orderDate: string
  orderTime: string
  priority: LabPriority
  status: LabStatus

  // Tests
  tests: LabTest[]

  // Collection
  specimenCollectedAt?: string
  collectedBy?: string
  specimenId?: string

  // Results
  results?: LabResult[]
  resultedAt?: string
  resultedBy?: string
  verifiedAt?: string
  verifiedBy?: string

  // Clinical Info
  clinicalIndication?: string
  diagnoses?: string[]

  // Location
  orderingLocation: string

  updatedAt: string
}

export interface LabStats {
  totalOrders: number
  pendingOrders: number
  inProgressOrders: number
  completedToday: number
  statOrders: number
  averageTurnaroundTime: number
  criticalResults: number
  ordersLast24Hours: number
}

// LOINC-coded lab tests database
export const commonLabTests: LabTest[] = [
  // Complete Blood Count (CBC)
  {
    loincCode: '6690-2',
    testName: 'WBC Count',
    category: 'Hematology',
    specimenType: 'Blood - Whole',
    normalRange: '4.5-11.0',
    units: 'K/uL',
    turnaroundTime: 60
  },
  {
    loincCode: '718-7',
    testName: 'Hemoglobin',
    category: 'Hematology',
    specimenType: 'Blood - Whole',
    normalRange: '13.5-17.5 (M), 12.0-15.5 (F)',
    units: 'g/dL',
    turnaroundTime: 60
  },
  {
    loincCode: '4544-3',
    testName: 'Hematocrit',
    category: 'Hematology',
    specimenType: 'Blood - Whole',
    normalRange: '38-50 (M), 36-44 (F)',
    units: '%',
    turnaroundTime: 60
  },
  {
    loincCode: '777-3',
    testName: 'Platelet Count',
    category: 'Hematology',
    specimenType: 'Blood - Whole',
    normalRange: '150-400',
    units: 'K/uL',
    turnaroundTime: 60
  },

  // Basic Metabolic Panel (BMP)
  {
    loincCode: '2951-2',
    testName: 'Sodium',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '136-145',
    units: 'mmol/L',
    turnaroundTime: 90
  },
  {
    loincCode: '2823-3',
    testName: 'Potassium',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '3.5-5.0',
    units: 'mmol/L',
    turnaroundTime: 90
  },
  {
    loincCode: '2075-0',
    testName: 'Chloride',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '98-107',
    units: 'mmol/L',
    turnaroundTime: 90
  },
  {
    loincCode: '2028-9',
    testName: 'Carbon Dioxide',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '23-29',
    units: 'mmol/L',
    turnaroundTime: 90
  },
  {
    loincCode: '3094-0',
    testName: 'BUN (Blood Urea Nitrogen)',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '7-20',
    units: 'mg/dL',
    turnaroundTime: 90
  },
  {
    loincCode: '2160-0',
    testName: 'Creatinine',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '0.6-1.2',
    units: 'mg/dL',
    turnaroundTime: 90
  },
  {
    loincCode: '2345-7',
    testName: 'Glucose',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '70-100',
    units: 'mg/dL',
    turnaroundTime: 90
  },

  // Liver Function Tests
  {
    loincCode: '1742-6',
    testName: 'ALT (Alanine Aminotransferase)',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '7-56',
    units: 'U/L',
    turnaroundTime: 120
  },
  {
    loincCode: '1920-8',
    testName: 'AST (Aspartate Aminotransferase)',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '10-40',
    units: 'U/L',
    turnaroundTime: 120
  },
  {
    loincCode: '1975-2',
    testName: 'Total Bilirubin',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '0.3-1.2',
    units: 'mg/dL',
    turnaroundTime: 120
  },
  {
    loincCode: '6768-6',
    testName: 'Alkaline Phosphatase',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '44-147',
    units: 'U/L',
    turnaroundTime: 120
  },

  // Cardiac Markers
  {
    loincCode: '10839-9',
    testName: 'Troponin I',
    category: 'Chemistry',
    specimenType: 'Blood - Serum',
    normalRange: '<0.04',
    units: 'ng/mL',
    turnaroundTime: 45
  },
  {
    loincCode: '33762-6',
    testName: 'BNP (B-type Natriuretic Peptide)',
    category: 'Chemistry',
    specimenType: 'Blood - Plasma',
    normalRange: '<100',
    units: 'pg/mL',
    turnaroundTime: 60
  },

  // Coagulation
  {
    loincCode: '5902-2',
    testName: 'PT (Prothrombin Time)',
    category: 'Coagulation',
    specimenType: 'Blood - Plasma',
    normalRange: '11-13.5',
    units: 'seconds',
    turnaroundTime: 90
  },
  {
    loincCode: '6301-6',
    testName: 'INR',
    category: 'Coagulation',
    specimenType: 'Blood - Plasma',
    normalRange: '0.8-1.1',
    units: 'ratio',
    turnaroundTime: 90
  },
  {
    loincCode: '3173-2',
    testName: 'aPTT',
    category: 'Coagulation',
    specimenType: 'Blood - Plasma',
    normalRange: '25-35',
    units: 'seconds',
    turnaroundTime: 90
  },

  // Urinalysis
  {
    loincCode: '5767-9',
    testName: 'Urinalysis Complete',
    category: 'Urinalysis',
    specimenType: 'Urine',
    turnaroundTime: 60
  },

  // Microbiology
  {
    loincCode: '600-7',
    testName: 'Blood Culture',
    category: 'Microbiology',
    specimenType: 'Blood - Whole',
    turnaroundTime: 2880 // 48 hours
  },
  {
    loincCode: '630-4',
    testName: 'Urine Culture',
    category: 'Microbiology',
    specimenType: 'Urine',
    turnaroundTime: 2880
  }
]

// Generate realistic lab orders
export function generateLabOrders(count: number = 150): LabOrder[] {
  const orders: LabOrder[] = []

  const providers = [
    { name: 'Dr. Sarah Johnson', npi: '1234567890' },
    { name: 'Dr. Michael Chen', npi: '1234567891' },
    { name: 'Dr. Emily Rodriguez', npi: '1234567892' },
    { name: 'Dr. David Williams', npi: '1234567893' }
  ]

  const locations = [
    'Emergency Department',
    'Internal Medicine Clinic',
    'Cardiology Clinic',
    'Primary Care',
    'Inpatient Floor 3',
    'ICU',
    'Surgery Department'
  ]

  const priorities: LabPriority[] = ['Routine', 'ASAP', 'STAT', 'Timed']
  const statuses: LabStatus[] = ['Pending', 'In Progress', 'Sample Collected', 'In Lab', 'Final']

  for (let i = 0; i < count; i++) {
    const hoursAgo = Math.random() * 48
    const orderDate = new Date(Date.now() - hoursAgo * 3600000)
    const provider = providers[Math.floor(Math.random() * providers.length)]
    const priority = priorities[Math.floor(Math.random() * priorities.length)]

    // STAT orders are more likely to be completed
    let status: LabStatus
    if (priority === 'STAT') {
      status = hoursAgo > 2 ? 'Final' : ['In Lab', 'Sample Collected', 'In Progress'][Math.floor(Math.random() * 3)] as LabStatus
    } else if (hoursAgo < 1) {
      status = 'Pending'
    } else if (hoursAgo < 6) {
      status = ['Sample Collected', 'In Progress', 'In Lab'][Math.floor(Math.random() * 3)] as LabStatus
    } else {
      status = Math.random() < 0.7 ? 'Final' : 'In Lab'
    }

    // Select random tests (1-4 tests per order)
    const numTests = Math.floor(Math.random() * 4) + 1
    const selectedTests: LabTest[] = []
    const testIndices = new Set<number>()

    while (selectedTests.length < numTests) {
      const idx = Math.floor(Math.random() * commonLabTests.length)
      if (!testIndices.has(idx)) {
        testIndices.add(idx)
        selectedTests.push(commonLabTests[idx])
      }
    }

    const order: LabOrder = {
      id: `lab-${String(i + 1).padStart(6, '0')}`,
      orderNumber: `LAB${orderDate.getFullYear()}${String(i + 10000).padStart(6, '0')}`,
      patientId: `pat-${String(Math.floor(Math.random() * 247) + 1).padStart(6, '0')}`,
      patientName: generatePatientName(),
      patientMRN: `MRN${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
      patientDOB: generateDOB(),
      patientAge: 18 + Math.floor(Math.random() * 70),
      patientGender: Math.random() < 0.5 ? 'Male' : 'Female',

      orderedBy: provider.name,
      orderedByNPI: provider.npi,
      orderDate: orderDate.toISOString().split('T')[0],
      orderTime: `${String(orderDate.getHours()).padStart(2, '0')}:${String(orderDate.getMinutes()).padStart(2, '0')}`,
      priority,
      status,

      tests: selectedTests,

      specimenCollectedAt: status !== 'Pending' ? new Date(orderDate.getTime() + 30 * 60000).toISOString() : undefined,
      collectedBy: status !== 'Pending' ? 'Phlebotomy Team' : undefined,
      specimenId: status !== 'Pending' ? `SPEC${String(i + 1000).padStart(8, '0')}` : undefined,

      results: status === 'Final' ? generateResults(selectedTests) : undefined,
      resultedAt: status === 'Final' ? new Date(orderDate.getTime() + selectedTests[0].turnaroundTime * 60000).toISOString() : undefined,
      resultedBy: status === 'Final' ? 'Lab Technician' : undefined,
      verifiedAt: status === 'Final' ? new Date(orderDate.getTime() + selectedTests[0].turnaroundTime * 60000 + 15 * 60000).toISOString() : undefined,
      verifiedBy: status === 'Final' ? 'Dr. James Wilson, MD' : undefined,

      clinicalIndication: ['Annual physical', 'Chest pain evaluation', 'Diabetes management', 'Pre-operative clearance', 'Medication monitoring'][Math.floor(Math.random() * 5)],
      diagnoses: [['I10 - Essential hypertension', 'E11.9 - Type 2 diabetes'][Math.floor(Math.random() * 2)]],

      orderingLocation: locations[Math.floor(Math.random() * locations.length)],

      updatedAt: new Date().toISOString()
    }

    orders.push(order)
  }

  return orders.sort((a, b) => new Date(b.orderDate + 'T' + b.orderTime).getTime() - new Date(a.orderDate + 'T' + a.orderTime).getTime())
}

function generateResults(tests: LabTest[]): LabResult[] {
  return tests.map(test => {
    let value: string | number
    let flag: LabResult['flag'] = 'Normal'

    // Generate realistic values based on test type
    if (test.loincCode === '6690-2') { // WBC
      value = (4 + Math.random() * 8).toFixed(1)
      if (parseFloat(value) < 4.5) flag = 'Low'
      if (parseFloat(value) > 11) flag = 'High'
    } else if (test.loincCode === '718-7') { // Hemoglobin
      value = (12 + Math.random() * 5).toFixed(1)
      if (parseFloat(value) < 12) flag = 'Low'
      if (parseFloat(value) > 17.5) flag = 'High'
    } else if (test.loincCode === '2951-2') { // Sodium
      value = (135 + Math.random() * 10).toFixed(0)
      if (parseFloat(value) < 136) flag = 'Low'
      if (parseFloat(value) > 145) flag = 'High'
    } else if (test.loincCode === '2345-7') { // Glucose
      value = (70 + Math.random() * 100).toFixed(0)
      if (parseFloat(value) < 70) flag = 'Low'
      if (parseFloat(value) > 100 && parseFloat(value) < 125) flag = 'High'
      if (parseFloat(value) >= 125) flag = 'Critical High'
    } else if (test.loincCode === '10839-9') { // Troponin
      value = (Math.random() * 0.1).toFixed(3)
      if (parseFloat(value) > 0.04) flag = 'Critical High'
    } else {
      value = (Math.random() * 100).toFixed(1)
    }

    return {
      testCode: test.loincCode,
      testName: test.testName,
      value,
      units: test.units || '',
      normalRange: test.normalRange || '',
      flag
    }
  })
}

function generatePatientName(): string {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}

function generateDOB(): string {
  const year = 1940 + Math.floor(Math.random() * 65)
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function calculateLabStats(orders: LabOrder[]): LabStats {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 24 * 3600000).toISOString().split('T')[0]

  const completedToday = orders.filter(o => o.status === 'Final' && o.resultedAt && o.resultedAt.split('T')[0] === today)
  const last24Hours = orders.filter(o => new Date(o.orderDate).getTime() >= Date.now() - 24 * 3600000)

  const finalized = orders.filter(o => o.status === 'Final' && o.orderDate && o.resultedAt)
  let totalTurnaround = 0
  finalized.forEach(o => {
    const orderTime = new Date(o.orderDate + 'T' + o.orderTime).getTime()
    const resultTime = new Date(o.resultedAt!).getTime()
    totalTurnaround += (resultTime - orderTime) / 60000 // minutes
  })

  const criticalResults = orders.filter(o =>
    o.results?.some(r => r.flag === 'Critical High' || r.flag === 'Critical Low')
  ).length

  return {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    inProgressOrders: orders.filter(o => ['In Progress', 'Sample Collected', 'In Lab'].includes(o.status)).length,
    completedToday: completedToday.length,
    statOrders: orders.filter(o => o.priority === 'STAT' && o.status !== 'Final' && o.status !== 'Cancelled').length,
    averageTurnaroundTime: finalized.length > 0 ? Math.round(totalTurnaround / finalized.length) : 0,
    criticalResults,
    ordersLast24Hours: last24Hours.length
  }
}

export const sampleLabOrders = generateLabOrders(150)

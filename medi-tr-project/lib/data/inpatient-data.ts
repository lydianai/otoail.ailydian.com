/**
 * Inpatient & Bed Management Data Service
 * Comprehensive ADT (Admission, Discharge, Transfer) tracking
 * Bed census, capacity planning, and patient flow management for US hospitals
 */

export type BedStatus = 'Occupied' | 'Available' | 'Cleaning' | 'Maintenance' | 'Reserved'

export type AdmissionType =
  | 'Emergency'
  | 'Elective'
  | 'Urgent'
  | 'Observation'
  | 'Transfer'
  | 'Newborn'

export type DischargeDisposition =
  | 'Home'
  | 'Home Health'
  | 'SNF'
  | 'Rehab'
  | 'LTAC'
  | 'AMA'
  | 'Expired'
  | 'Transfer'
  | 'Hospice'

export type PatientStatus =
  | 'Active'
  | 'Pending Admission'
  | 'Pending Discharge'
  | 'Pending Transfer'
  | 'Discharged'

export type UnitType =
  | 'Medical/Surgical'
  | 'ICU'
  | 'Cardiac Care'
  | 'Step-Down'
  | 'Telemetry'
  | 'Maternity'
  | 'NICU'
  | 'Pediatrics'
  | 'Oncology'
  | 'Behavioral Health'
  | 'Orthopedics'
  | 'Neurology'

export interface Bed {
  id: string
  bedNumber: string
  unit: UnitType
  room: string
  wing: string
  floor: number
  status: BedStatus
  features: string[]
  isolationRequired?: boolean
  currentPatient?: InpatientEncounter
  lastCleaned?: string
  maintenanceNotes?: string
}

export interface InpatientEncounter {
  id: string
  patientId: string
  patientName: string
  patientMRN: string
  patientDOB: string
  patientGender: 'M' | 'F' | 'O'
  admissionDate: string
  admissionType: AdmissionType
  admissionDiagnosis: string
  admissionSource: string
  attendingPhysician: string
  attendingNPI: string
  consultingPhysicians?: string[]
  bedAssignment: {
    bedId: string
    unit: UnitType
    room: string
    bedNumber: string
    assignedDate: string
  }
  status: PatientStatus
  lengthOfStay: number
  expectedDischarge?: string
  dischargeDate?: string
  dischargeDisposition?: DischargeDisposition
  isolationPrecautions?: string[]
  codeStatus: 'Full Code' | 'DNR' | 'DNI' | 'DNR/DNI' | 'AND'
  allergies: string[]
  activeOrders: number
  criticalLabs?: number
  pendingConsults?: number
  insurancePlan: string
  estimatedDRG?: string
  estimatedCost?: number
  transferHistory?: Transfer[]
  alerts?: string[]
}

export interface Transfer {
  id: string
  patientId: string
  patientName: string
  fromUnit: UnitType
  fromBed: string
  toUnit: UnitType
  toBed: string
  reason: string
  requestedBy: string
  requestedAt: string
  completedAt?: string
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
}

export interface UnitCensus {
  unit: UnitType
  totalBeds: number
  occupied: number
  available: number
  cleaning: number
  maintenance: number
  reserved: number
  occupancyRate: number
  averageLOS: number
  pendingAdmissions: number
  pendingDischarges: number
  pendingTransfers: number
}

export interface BedManagementStats {
  totalBeds: number
  occupiedBeds: number
  availableBeds: number
  overallOccupancyRate: number
  activePatients: number
  pendingAdmissions: number
  expectedDischarges: number
  pendingTransfers: number
  averageLOS: number
  isolationBeds: number
}

// US Hospital Units Configuration
export const hospitalUnits: { name: UnitType; capacity: number; features: string[] }[] = [
  {
    name: 'ICU',
    capacity: 24,
    features: ['Ventilator', 'Telemetry', 'Central Line', 'Arterial Line'],
  },
  {
    name: 'Medical/Surgical',
    capacity: 48,
    features: ['Telemetry', 'Lift', 'Private Bath'],
  },
  {
    name: 'Cardiac Care',
    capacity: 16,
    features: ['Telemetry', 'Cardiac Monitor', 'Crash Cart'],
  },
  {
    name: 'Step-Down',
    capacity: 20,
    features: ['Telemetry', 'Oxygen', 'Monitoring'],
  },
  {
    name: 'Telemetry',
    capacity: 32,
    features: ['Cardiac Monitor', 'Telemetry', 'Private Bath'],
  },
  {
    name: 'Maternity',
    capacity: 16,
    features: ['Infant Warmer', 'Birthing Bed', 'Private Bath'],
  },
  {
    name: 'NICU',
    capacity: 12,
    features: ['Incubator', 'Ventilator', 'Phototherapy', 'Monitoring'],
  },
  {
    name: 'Pediatrics',
    capacity: 20,
    features: ['Pediatric Bed', 'Oxygen', 'Play Area'],
  },
  {
    name: 'Oncology',
    capacity: 24,
    features: ['Isolation Capable', 'Chemotherapy Safe', 'Private Bath'],
  },
  {
    name: 'Behavioral Health',
    capacity: 16,
    features: ['Secure', 'No Sharps', 'Observation Window'],
  },
  {
    name: 'Orthopedics',
    capacity: 20,
    features: ['Trapeze', 'Lift', 'PT Equipment'],
  },
  {
    name: 'Neurology',
    capacity: 16,
    features: ['Neuro Monitoring', 'Telemetry', 'Fall Prevention'],
  },
]

// Generate bed inventory
export function generateBeds(): Bed[] {
  const beds: Bed[] = []
  const wings = ['A', 'B', 'C', 'D']
  const statuses: BedStatus[] = ['Occupied', 'Available', 'Cleaning', 'Maintenance']

  let bedCounter = 1

  hospitalUnits.forEach((unit) => {
    const bedsPerFloor = Math.ceil(unit.capacity / 3)
    for (let floor = 2; floor <= 4; floor++) {
      const wing = wings[Math.floor(Math.random() * wings.length)]
      const bedsOnThisFloor = Math.min(bedsPerFloor, unit.capacity - beds.filter(b => b.unit === unit.name).length)

      for (let i = 0; i < bedsOnThisFloor; i++) {
        const room = String(floor) + String(10 + Math.floor(i / 2)).padStart(2, '0')
        const bedLetter = i % 2 === 0 ? 'A' : 'B'
        const bedNumber = `${room}${bedLetter}`

        // Realistic status distribution
        const rand = Math.random()
        let status: BedStatus
        if (rand < 0.70) status = 'Occupied' // 70% occupied
        else if (rand < 0.85) status = 'Available' // 15% available
        else if (rand < 0.95) status = 'Cleaning' // 10% cleaning
        else status = 'Maintenance' // 5% maintenance

        beds.push({
          id: `BED-${String(bedCounter).padStart(4, '0')}`,
          bedNumber,
          unit: unit.name,
          room,
          wing,
          floor,
          status,
          features: unit.features,
          isolationRequired: Math.random() > 0.92,
          lastCleaned:
            status === 'Available'
              ? new Date(Date.now() - Math.random() * 3600000).toISOString()
              : undefined,
        })
        bedCounter++
      }
    }
  })

  return beds
}

// Generate inpatient encounters
export function generateInpatientEncounters(beds: Bed[]): InpatientEncounter[] {
  const encounters: InpatientEncounter[] = []
  const occupiedBeds = beds.filter((b) => b.status === 'Occupied')

  const firstNames = [
    'John',
    'Mary',
    'James',
    'Patricia',
    'Robert',
    'Jennifer',
    'Michael',
    'Linda',
    'William',
    'Elizabeth',
    'David',
    'Barbara',
    'Richard',
    'Susan',
  ]
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
  ]

  const physicians = [
    { name: 'Dr. Sarah Johnson', npi: '1234567890' },
    { name: 'Dr. Michael Chen', npi: '2345678901' },
    { name: 'Dr. Emily Williams', npi: '3456789012' },
    { name: 'Dr. David Martinez', npi: '4567890123' },
    { name: 'Dr. Lisa Anderson', npi: '5678901234' },
  ]

  const admissionDiagnoses: Record<UnitType, string[]> = {
    ICU: [
      'Septic Shock',
      'ARDS',
      'Cardiogenic Shock',
      'Multi-organ Failure',
      'Post-op Cardiac Surgery',
    ],
    'Medical/Surgical': [
      'Pneumonia',
      'CHF Exacerbation',
      'COPD Exacerbation',
      'Cellulitis',
      'UTI',
    ],
    'Cardiac Care': ['STEMI', 'NSTEMI', 'Unstable Angina', 'CHF', 'Arrhythmia'],
    'Step-Down': [
      'Post-ICU Care',
      'Respiratory Failure',
      'DKA',
      'Pancreatitis',
      'GI Bleed',
    ],
    Telemetry: [
      'Chest Pain',
      'Syncope',
      'Atrial Fibrillation',
      'Hypertensive Emergency',
    ],
    Maternity: ['Labor & Delivery', 'Post-partum', 'C-Section', 'High-risk Pregnancy'],
    NICU: [
      'Prematurity',
      'Respiratory Distress',
      'Neonatal Sepsis',
      'Hyperbilirubinemia',
    ],
    Pediatrics: [
      'Asthma Exacerbation',
      'Viral Pneumonia',
      'Gastroenteritis',
      'Appendicitis',
    ],
    Oncology: [
      'Chemotherapy',
      'Neutropenic Fever',
      'Tumor Lysis Syndrome',
      'Pain Management',
    ],
    'Behavioral Health': [
      'Major Depression',
      'Bipolar Disorder',
      'Schizophrenia',
      'Suicidal Ideation',
    ],
    Orthopedics: [
      'Hip Fracture',
      'Total Knee Replacement',
      'Spinal Fusion',
      'Trauma',
    ],
    Neurology: [
      'Ischemic Stroke',
      'Hemorrhagic Stroke',
      'Seizure Disorder',
      'Meningitis',
    ],
  }

  const insurancePlans = [
    'Medicare',
    'Medicaid',
    'Blue Cross Blue Shield',
    'United Healthcare',
    'Aetna',
    'Cigna',
    'Humana',
  ]

  occupiedBeds.forEach((bed, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const physician = physicians[Math.floor(Math.random() * physicians.length)]
    const diagnoses = admissionDiagnoses[bed.unit]
    const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)]

    const admissionDate = new Date()
    const losMinutes = Math.random() * 14 * 24 * 60 // 0-14 days in minutes
    admissionDate.setMinutes(admissionDate.getMinutes() - losMinutes)
    const los = Math.floor(losMinutes / (24 * 60))

    const expectedDischarge = new Date(admissionDate)
    expectedDischarge.setDate(
      expectedDischarge.getDate() + Math.floor(Math.random() * 7) + 1
    )

    const admissionTypes: AdmissionType[] = ['Emergency', 'Elective', 'Urgent', 'Transfer']
    const codeStatuses: InpatientEncounter['codeStatus'][] = [
      'Full Code',
      'DNR',
      'DNI',
      'DNR/DNI',
    ]

    const encounter: InpatientEncounter = {
      id: `ENC-${String(index + 1).padStart(6, '0')}`,
      patientId: `PT-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
      patientName: `${firstName} ${lastName}`,
      patientMRN: `MRN${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`,
      patientDOB: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/${1940 + Math.floor(Math.random() * 60)}`,
      patientGender: Math.random() > 0.5 ? 'M' : 'F',
      admissionDate: admissionDate.toISOString(),
      admissionType: admissionTypes[Math.floor(Math.random() * admissionTypes.length)],
      admissionDiagnosis: diagnosis,
      admissionSource: 'Emergency Department',
      attendingPhysician: physician.name,
      attendingNPI: physician.npi,
      bedAssignment: {
        bedId: bed.id,
        unit: bed.unit,
        room: bed.room,
        bedNumber: bed.bedNumber,
        assignedDate: admissionDate.toISOString(),
      },
      status: 'Active',
      lengthOfStay: los,
      expectedDischarge: expectedDischarge.toISOString(),
      codeStatus: codeStatuses[Math.floor(Math.random() * codeStatuses.length)],
      allergies:
        Math.random() > 0.7
          ? ['Penicillin', 'Sulfa drugs'][Math.floor(Math.random() * 2)]
              .split()
          : [],
      activeOrders: Math.floor(Math.random() * 15) + 5,
      criticalLabs: Math.random() > 0.85 ? Math.floor(Math.random() * 3) + 1 : 0,
      pendingConsults: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
      insurancePlan:
        insurancePlans[Math.floor(Math.random() * insurancePlans.length)],
      isolationPrecautions: bed.isolationRequired
        ? ['Contact Precautions', 'Droplet Precautions'][
            Math.floor(Math.random() * 2)
          ]
            .split()
        : undefined,
      alerts:
        Math.random() > 0.8
          ? ['Fall Risk', 'Elopement Risk', 'Aspiration Risk'].slice(
              0,
              Math.floor(Math.random() * 2) + 1
            )
          : undefined,
    }

    bed.currentPatient = encounter
    encounters.push(encounter)
  })

  return encounters
}

// Calculate census for each unit
export function calculateUnitCensus(beds: Bed[]): UnitCensus[] {
  const census: UnitCensus[] = []

  hospitalUnits.forEach((unit) => {
    const unitBeds = beds.filter((b) => b.unit === unit.name)
    const occupied = unitBeds.filter((b) => b.status === 'Occupied').length
    const available = unitBeds.filter((b) => b.status === 'Available').length
    const cleaning = unitBeds.filter((b) => b.status === 'Cleaning').length
    const maintenance = unitBeds.filter((b) => b.status === 'Maintenance').length
    const reserved = unitBeds.filter((b) => b.status === 'Reserved').length

    const occupiedWithPatients = unitBeds.filter(
      (b) => b.status === 'Occupied' && b.currentPatient
    )
    const avgLOS =
      occupiedWithPatients.length > 0
        ? occupiedWithPatients.reduce(
            (sum, b) => sum + (b.currentPatient?.lengthOfStay || 0),
            0
          ) / occupiedWithPatients.length
        : 0

    census.push({
      unit: unit.name,
      totalBeds: unitBeds.length,
      occupied,
      available,
      cleaning,
      maintenance,
      reserved,
      occupancyRate: (occupied / unitBeds.length) * 100,
      averageLOS: avgLOS,
      pendingAdmissions: Math.floor(Math.random() * 5),
      pendingDischarges: Math.floor(Math.random() * 8),
      pendingTransfers: Math.floor(Math.random() * 3),
    })
  })

  return census
}

// Calculate overall stats
export function calculateBedManagementStats(
  beds: Bed[],
  encounters: InpatientEncounter[]
): BedManagementStats {
  const occupiedBeds = beds.filter((b) => b.status === 'Occupied').length
  const availableBeds = beds.filter((b) => b.status === 'Available').length
  const isolationBeds = beds.filter((b) => b.isolationRequired).length

  const activeEncounters = encounters.filter((e) => e.status === 'Active')
  const avgLOS =
    activeEncounters.length > 0
      ? activeEncounters.reduce((sum, e) => sum + e.lengthOfStay, 0) /
        activeEncounters.length
      : 0

  return {
    totalBeds: beds.length,
    occupiedBeds,
    availableBeds,
    overallOccupancyRate: (occupiedBeds / beds.length) * 100,
    activePatients: activeEncounters.length,
    pendingAdmissions: Math.floor(Math.random() * 15) + 5,
    expectedDischarges: Math.floor(Math.random() * 20) + 10,
    pendingTransfers: Math.floor(Math.random() * 8) + 2,
    averageLOS: avgLOS,
    isolationBeds,
  }
}

// Sample data
export const sampleBeds = generateBeds()
export const sampleEncounters = generateInpatientEncounters(sampleBeds)
export const sampleUnitCensus = calculateUnitCensus(sampleBeds)

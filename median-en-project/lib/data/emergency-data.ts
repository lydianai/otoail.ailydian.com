/**
 * Emergency Department Data Service
 * Provides ED patient tracking, ESI triage, and real-time emergency care management
 * HIPAA-compliant with Emergency Department standards and protocols
 */

export type ESILevel = '1' | '2' | '3' | '4' | '5'

export type EDStatus =
  | 'Waiting'
  | 'Triage'
  | 'In Room'
  | 'Being Treated'
  | 'Waiting for Results'
  | 'Ready for Discharge'
  | 'Admitted'
  | 'Discharged'
  | 'Left Without Being Seen'
  | 'Left Against Medical Advice'

export type ArrivalMode =
  | 'Walk-in'
  | 'Ambulance - EMS'
  | 'Ambulance - Private'
  | 'Police'
  | 'Helicopter'
  | 'Transfer from Another Facility'

export interface EmergencyPatient {
  id: string
  visitId: string
  patientName: string
  patientMRN: string
  dateOfBirth: string
  age: number
  gender: string

  // Arrival Information
  arrivalTime: string
  arrivalMode: ArrivalMode
  chiefComplaint: string

  // Triage
  esiLevel: ESILevel
  triageTime?: string
  triageNurse?: string
  vitalSigns?: {
    temperature: string
    bloodPressure: string
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    painLevel: number // 0-10
    glasgowComaScale?: number // 3-15
  }

  // Treatment
  status: EDStatus
  roomNumber?: string
  assignedProvider?: string
  assignedNurse?: string
  roomAssignedTime?: string
  providerSeenTime?: string

  // Clinical
  allergies?: string[]
  currentMedications?: string[]
  medicalHistory?: string[]

  // Orders and Tests
  labsOrdered: boolean
  imagingOrdered: boolean
  consultsCalled: boolean

  // Timing Metrics
  waitTimeMinutes: number
  doorToTriageMinutes?: number
  doorToProviderMinutes?: number
  lengthOfStayMinutes?: number

  // Disposition
  disposition?: 'Discharge' | 'Admit to Floor' | 'Admit to ICU' | 'Transfer' | 'Observation' | 'Deceased'
  dispositionTime?: string
  admittingService?: string

  // Isolation
  isolationPrecautions?: string[]

  updatedAt: string
}

export interface EDStats {
  currentPatients: number
  waitingToBeSeenCount: number
  inTreatmentCount: number
  awaitingAdmissionCount: number
  averageWaitTime: number
  averageLengthOfStay: number
  esiLevel1Count: number
  esiLevel2Count: number
  esiLevel3Count: number
  bedOccupancyRate: number
  patientsLast24Hours: number
  admissionRate: number
}

export interface EDRoom {
  id: string
  roomNumber: string
  roomType: 'Trauma Bay' | 'Resuscitation' | 'Treatment Room' | 'Fast Track' | 'Behavioral Health'
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Blocked'
  patient?: EmergencyPatient
}

// Sample data generation
function generateEDPatient(id: number, hoursAgo: number = 0): EmergencyPatient {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'James', 'Jennifer', 'William', 'Mary', 'Richard', 'Patricia', 'Thomas']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']

  const arrivalModes: ArrivalMode[] = ['Walk-in', 'Ambulance - EMS', 'Ambulance - Private', 'Police', 'Transfer from Another Facility']

  const chiefComplaints = [
    'Chest pain',
    'Shortness of breath',
    'Abdominal pain',
    'Headache',
    'Motor vehicle accident',
    'Fall with injury',
    'Laceration requiring sutures',
    'Fever',
    'Altered mental status',
    'Seizure',
    'Syncope',
    'Back pain',
    'Overdose',
    'Assault',
    'Psychiatric emergency',
    'Difficulty breathing',
    'Stroke symptoms',
    'Diabetic emergency',
    'Allergic reaction',
    'Pregnancy complications'
  ]

  const statuses: EDStatus[] = ['Waiting', 'Triage', 'In Room', 'Being Treated', 'Waiting for Results', 'Ready for Discharge', 'Admitted', 'Discharged']

  const complaint = chiefComplaints[Math.floor(Math.random() * chiefComplaints.length)]
  const esiLevel = determineESILevel(complaint)
  const arrivalMode = arrivalModes[Math.floor(Math.random() * arrivalModes.length)]

  const arrivalTime = new Date(Date.now() - hoursAgo * 3600000)
  const triageDelay = Math.floor(Math.random() * 20) + 5 // 5-25 minutes
  const providerDelay = triageDelay + Math.floor(Math.random() * 60) + 15 // 15-75 minutes after triage

  let status: EDStatus
  if (hoursAgo < 1) {
    status = ['Waiting', 'Triage', 'In Room'][Math.floor(Math.random() * 3)] as EDStatus
  } else if (hoursAgo < 3) {
    status = ['In Room', 'Being Treated', 'Waiting for Results'][Math.floor(Math.random() * 3)] as EDStatus
  } else {
    status = ['Being Treated', 'Waiting for Results', 'Ready for Discharge', 'Discharged'][Math.floor(Math.random() * 4)] as EDStatus
  }

  const age = 18 + Math.floor(Math.random() * 65)

  return {
    id: `ed-${String(id).padStart(6, '0')}`,
    visitId: `ED${String(Date.now() + id).slice(-8)}`,
    patientName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    patientMRN: `MRN${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
    dateOfBirth: new Date(Date.now() - age * 365 * 24 * 3600000).toISOString().split('T')[0],
    age,
    gender: Math.random() < 0.5 ? 'Male' : 'Female',

    arrivalTime: arrivalTime.toISOString(),
    arrivalMode,
    chiefComplaint: complaint,

    esiLevel,
    triageTime: status !== 'Waiting' ? new Date(arrivalTime.getTime() + triageDelay * 60000).toISOString() : undefined,
    triageNurse: status !== 'Waiting' ? ['RN Sarah Miller', 'RN John Davis', 'RN Emily Chen'][Math.floor(Math.random() * 3)] : undefined,
    vitalSigns: status !== 'Waiting' ? {
      temperature: `${(97 + Math.random() * 3).toFixed(1)}°F`,
      bloodPressure: `${100 + Math.floor(Math.random() * 50)}/${60 + Math.floor(Math.random() * 30)}`,
      heartRate: 60 + Math.floor(Math.random() * 60),
      respiratoryRate: 12 + Math.floor(Math.random() * 10),
      oxygenSaturation: 90 + Math.floor(Math.random() * 10),
      painLevel: Math.floor(Math.random() * 11),
      glasgowComaScale: esiLevel === '1' || esiLevel === '2' ? 10 + Math.floor(Math.random() * 5) : 15
    } : undefined,

    status,
    roomNumber: ['In Room', 'Being Treated', 'Waiting for Results', 'Ready for Discharge'].includes(status)
      ? `${Math.floor(Math.random() * 20) + 1}${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`
      : undefined,
    assignedProvider: ['In Room', 'Being Treated', 'Waiting for Results', 'Ready for Discharge'].includes(status)
      ? ['Dr. Michael Chen', 'Dr. Sarah Johnson', 'Dr. David Williams', 'Dr. Emily Rodriguez'][Math.floor(Math.random() * 4)]
      : undefined,
    assignedNurse: ['In Room', 'Being Treated', 'Waiting for Results', 'Ready for Discharge'].includes(status)
      ? ['RN Jennifer Lee', 'RN Robert Brown', 'RN Lisa Anderson'][Math.floor(Math.random() * 3)]
      : undefined,
    roomAssignedTime: ['In Room', 'Being Treated', 'Waiting for Results', 'Ready for Discharge'].includes(status)
      ? new Date(arrivalTime.getTime() + providerDelay * 60000).toISOString()
      : undefined,
    providerSeenTime: ['Being Treated', 'Waiting for Results', 'Ready for Discharge'].includes(status)
      ? new Date(arrivalTime.getTime() + providerDelay * 60000 + 15 * 60000).toISOString()
      : undefined,

    allergies: Math.random() < 0.3 ? ['Penicillin', 'Latex'][Math.floor(Math.random() * 2)] ? [['Penicillin', 'Latex'][Math.floor(Math.random() * 2)]] : undefined : undefined,
    currentMedications: Math.random() < 0.5 ? ['Lisinopril', 'Metformin', 'Aspirin'].slice(0, Math.floor(Math.random() * 3) + 1) : undefined,
    medicalHistory: Math.random() < 0.5 ? ['Hypertension', 'Diabetes', 'Asthma'].slice(0, Math.floor(Math.random() * 3) + 1) : undefined,

    labsOrdered: Math.random() < 0.6,
    imagingOrdered: Math.random() < 0.4,
    consultsCalled: Math.random() < 0.2,

    waitTimeMinutes: Math.floor((Date.now() - arrivalTime.getTime()) / 60000),
    doorToTriageMinutes: status !== 'Waiting' ? triageDelay : undefined,
    doorToProviderMinutes: ['Being Treated', 'Waiting for Results', 'Ready for Discharge'].includes(status) ? providerDelay : undefined,
    lengthOfStayMinutes: status === 'Discharged' ? Math.floor(Math.random() * 240) + 120 : Math.floor((Date.now() - arrivalTime.getTime()) / 60000),

    disposition: status === 'Discharged' || status === 'Admitted' ? ['Discharge', 'Admit to Floor', 'Admit to ICU'][Math.floor(Math.random() * 3)] as any : undefined,
    dispositionTime: status === 'Discharged' || status === 'Admitted' ? new Date(arrivalTime.getTime() + (Math.floor(Math.random() * 240) + 120) * 60000).toISOString() : undefined,
    admittingService: status === 'Admitted' ? ['Internal Medicine', 'Surgery', 'Cardiology', 'ICU'][Math.floor(Math.random() * 4)] : undefined,

    isolationPrecautions: Math.random() < 0.1 ? [['Contact', 'Droplet', 'Airborne'][Math.floor(Math.random() * 3)]] : undefined,

    updatedAt: new Date().toISOString()
  }
}

function determineESILevel(complaint: string): ESILevel {
  const level1Complaints = ['cardiac arrest', 'respiratory arrest', 'unresponsive']
  const level2Complaints = ['chest pain', 'stroke symptoms', 'severe trauma', 'altered mental status', 'overdose']
  const level3Complaints = ['shortness of breath', 'abdominal pain', 'seizure', 'moderate trauma']
  const level4Complaints = ['minor laceration', 'simple fracture', 'sprain']

  const lowerComplaint = complaint.toLowerCase()

  if (level1Complaints.some(c => lowerComplaint.includes(c))) return '1'
  if (level2Complaints.some(c => lowerComplaint.includes(c))) return '2'
  if (level3Complaints.some(c => lowerComplaint.includes(c))) return '3'
  if (level4Complaints.some(c => lowerComplaint.includes(c))) return '4'
  return '5'
}

export function generateEDPatients(): EmergencyPatient[] {
  const patients: EmergencyPatient[] = []

  // Current patients in ED (30-40 patients)
  const currentCount = 30 + Math.floor(Math.random() * 10)

  for (let i = 0; i < currentCount; i++) {
    // Distribute arrival times over last 8 hours
    const hoursAgo = Math.random() * 8
    patients.push(generateEDPatient(i + 1, hoursAgo))
  }

  // Sort by arrival time (newest first)
  return patients.sort((a, b) => new Date(b.arrivalTime).getTime() - new Date(a.arrivalTime).getTime())
}

export function calculateEDStats(patients: EmergencyPatient[]): EDStats {
  const activePatients = patients.filter(p =>
    p.status !== 'Discharged' &&
    p.status !== 'Left Without Being Seen' &&
    p.status !== 'Left Against Medical Advice'
  )

  const waitingPatients = activePatients.filter(p => p.status === 'Waiting' || p.status === 'Triage')
  const inTreatment = activePatients.filter(p => ['In Room', 'Being Treated', 'Waiting for Results'].includes(p.status))
  const awaitingAdmission = activePatients.filter(p => p.status === 'Admitted' || p.disposition === 'Admit to Floor' || p.disposition === 'Admit to ICU')

  const totalWaitTime = activePatients.reduce((sum, p) => sum + p.waitTimeMinutes, 0)
  const totalLOS = activePatients.reduce((sum, p) => sum + (p.lengthOfStayMinutes || 0), 0)

  const last24Hours = patients.filter(p => {
    const arrivalTime = new Date(p.arrivalTime).getTime()
    const dayAgo = Date.now() - 24 * 3600000
    return arrivalTime >= dayAgo
  })

  const admitted = last24Hours.filter(p => p.disposition === 'Admit to Floor' || p.disposition === 'Admit to ICU')

  return {
    currentPatients: activePatients.length,
    waitingToBeSeenCount: waitingPatients.length,
    inTreatmentCount: inTreatment.length,
    awaitingAdmissionCount: awaitingAdmission.length,
    averageWaitTime: activePatients.length > 0 ? Math.round(totalWaitTime / activePatients.length) : 0,
    averageLengthOfStay: activePatients.length > 0 ? Math.round(totalLOS / activePatients.length) : 0,
    esiLevel1Count: activePatients.filter(p => p.esiLevel === '1').length,
    esiLevel2Count: activePatients.filter(p => p.esiLevel === '2').length,
    esiLevel3Count: activePatients.filter(p => p.esiLevel === '3').length,
    bedOccupancyRate: Math.round((activePatients.length / 40) * 100), // Assuming 40 ED beds
    patientsLast24Hours: last24Hours.length,
    admissionRate: last24Hours.length > 0 ? Math.round((admitted.length / last24Hours.length) * 100) : 0
  }
}

export function getESIColor(esiLevel: ESILevel): string {
  switch (esiLevel) {
    case '1':
      return 'red'
    case '2':
      return 'orange'
    case '3':
      return 'yellow'
    case '4':
      return 'green'
    case '5':
      return 'blue'
  }
}

export function getESIDescription(esiLevel: ESILevel): string {
  switch (esiLevel) {
    case '1':
      return 'Immediate life-saving intervention required'
    case '2':
      return 'High risk situation - should not wait'
    case '3':
      return 'Many resources needed'
    case '4':
      return 'One resource needed'
    case '5':
      return 'No resources needed'
  }
}

export const sampleEDPatients = generateEDPatients()

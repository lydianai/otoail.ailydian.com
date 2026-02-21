/**
 * Operating Room Management Data Service
 * Surgical scheduling, case management, OR utilization for US hospitals
 */

export type ORType =
  | 'General Surgery'
  | 'Cardiac'
  | 'Neurosurgery'
  | 'Orthopedic'
  | 'Vascular'
  | 'Pediatric'
  | 'Trauma'
  | 'Ophthalmology'
  | 'ENT'
  | 'GYN'
  | 'Urology'
  | 'Plastic Surgery'

export type CaseStatus =
  | 'Scheduled'
  | 'Pre-Op'
  | 'In Progress'
  | 'Closing'
  | 'Recovery'
  | 'Completed'
  | 'Cancelled'
  | 'Delayed'

export type CasePriority = 'Elective' | 'Urgent' | 'Emergent' | 'STAT'

export type AnesthesiaType =
  | 'General'
  | 'Spinal'
  | 'Epidural'
  | 'Regional'
  | 'MAC'
  | 'Local'

export type ASAClass = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI'

export interface SurgicalStaff {
  role: 'Surgeon' | 'Anesthesiologist' | 'CRNA' | 'RN' | 'Scrub Tech'
  name: string
  npi?: string
  credentials?: string
}

export interface SurgicalCase {
  id: string
  caseNumber: string
  patientName: string
  patientMRN: string
  patientDOB: string
  patientAge: number
  patientGender: 'M' | 'F' | 'O'
  orRoom: string
  orType: ORType
  procedure: string
  procedureCPTCodes: string[]
  surgeon: string
  surgeonNPI: string
  priority: CasePriority
  status: CaseStatus
  scheduledDate: string
  scheduledStartTime: string
  scheduledDuration: number // minutes
  actualStartTime?: string
  actualEndTime?: string
  actualDuration?: number
  anesthesiaType: AnesthesiaType
  anesthesiologist?: string
  asaClass: ASAClass
  diagnosis: string
  diagnosisICD10?: string[]
  laterality?: 'Left' | 'Right' | 'Bilateral' | 'N/A'
  staff: SurgicalStaff[]
  estimatedBloodLoss?: number // mL
  complications?: string[]
  antibioticProphylaxis?: boolean
  vteProphylaxis?: boolean
  implants?: string[]
  specimens?: string[]
  notes?: string
}

export interface OperatingRoom {
  roomNumber: string
  roomType: ORType
  status: 'Available' | 'In Use' | 'Turnover' | 'Closed'
  currentCase?: string
  floor: number
  equipment: string[]
  specialFeatures?: string[]
}

export interface ORStats {
  totalORs: number
  availableORs: number
  inUseORs: number
  scheduledCases: number
  completedCases: number
  emergentCases: number
  averageUtilization: number
  averageTurnoverTime: number
  casesByType: Record<ORType, number>
}

// Common surgical procedures by OR type
export const surgicalProcedures: Record<ORType, Array<{ name: string; cptCode: string }>> = {
  'General Surgery': [
    { name: 'Laparoscopic Cholecystectomy', cptCode: '47562' },
    { name: 'Laparoscopic Appendectomy', cptCode: '44970' },
    { name: 'Hernia Repair (Inguinal)', cptCode: '49505' },
    { name: 'Laparoscopic Hernia Repair', cptCode: '49650' },
    { name: 'Colectomy', cptCode: '44140' },
    { name: 'Gastric Bypass', cptCode: '43644' },
    { name: 'Thyroidectomy', cptCode: '60240' },
    { name: 'Mastectomy', cptCode: '19303' },
  ],
  Cardiac: [
    { name: 'CABG x3', cptCode: '33533' },
    { name: 'CABG x4', cptCode: '33534' },
    { name: 'Mitral Valve Replacement', cptCode: '33430' },
    { name: 'Aortic Valve Replacement', cptCode: '33405' },
    { name: 'ASD Repair', cptCode: '33641' },
    { name: 'Pacemaker Insertion', cptCode: '33206' },
    { name: 'ICD Placement', cptCode: '33249' },
  ],
  Neurosurgery: [
    { name: 'Craniotomy for Tumor', cptCode: '61510' },
    { name: 'Lumbar Laminectomy', cptCode: '63030' },
    { name: 'Cervical Diskectomy', cptCode: '63075' },
    { name: 'VP Shunt Placement', cptCode: '62223' },
    { name: 'Burr Holes for SDH', cptCode: '61154' },
    { name: 'Spinal Fusion', cptCode: '22612' },
  ],
  Orthopedic: [
    { name: 'Total Hip Arthroplasty', cptCode: '27130' },
    { name: 'Total Knee Arthroplasty', cptCode: '27447' },
    { name: 'ORIF Femur', cptCode: '27506' },
    { name: 'ORIF Ankle', cptCode: '27814' },
    { name: 'ACL Reconstruction', cptCode: '29888' },
    { name: 'Rotator Cuff Repair', cptCode: '29827' },
    { name: 'Carpal Tunnel Release', cptCode: '64721' },
  ],
  Vascular: [
    { name: 'Carotid Endarterectomy', cptCode: '35301' },
    { name: 'AAA Repair', cptCode: '35082' },
    { name: 'Fem-Pop Bypass', cptCode: '35556' },
    { name: 'AV Fistula Creation', cptCode: '36821' },
    { name: 'Varicose Vein Stripping', cptCode: '37722' },
  ],
  Pediatric: [
    { name: 'Pediatric Hernia Repair', cptCode: '49585' },
    { name: 'Tonsillectomy', cptCode: '42820' },
    { name: 'Circumcision', cptCode: '54150' },
    { name: 'Pyloromyotomy', cptCode: '43520' },
  ],
  Trauma: [
    { name: 'Exploratory Laparotomy', cptCode: '49000' },
    { name: 'Splenectomy (Trauma)', cptCode: '38100' },
    { name: 'Liver Repair', cptCode: '47350' },
    { name: 'Thoracotomy', cptCode: '32100' },
  ],
  Ophthalmology: [
    { name: 'Cataract Extraction with IOL', cptCode: '66984' },
    { name: 'Retinal Detachment Repair', cptCode: '67108' },
    { name: 'Vitrectomy', cptCode: '67036' },
    { name: 'Glaucoma Surgery', cptCode: '66170' },
  ],
  ENT: [
    { name: 'Tonsillectomy & Adenoidectomy', cptCode: '42821' },
    { name: 'Septoplasty', cptCode: '30520' },
    { name: 'Functional Endoscopic Sinus Surgery', cptCode: '31255' },
    { name: 'Thyroidectomy', cptCode: '60240' },
    { name: 'Parotidectomy', cptCode: '42415' },
  ],
  GYN: [
    { name: 'Hysterectomy', cptCode: '58150' },
    { name: 'Laparoscopic Hysterectomy', cptCode: '58570' },
    { name: 'Myomectomy', cptCode: '58140' },
    { name: 'D&C', cptCode: '58120' },
    { name: 'Cesarean Section', cptCode: '59510' },
    { name: 'Tubal Ligation', cptCode: '58670' },
  ],
  Urology: [
    { name: 'TURP', cptCode: '52601' },
    { name: 'Radical Prostatectomy', cptCode: '55840' },
    { name: 'Nephrectomy', cptCode: '50220' },
    { name: 'Cystoscopy with Biopsy', cptCode: '52204' },
    { name: 'Ureteroscopy with Lithotripsy', cptCode: '52353' },
  ],
  'Plastic Surgery': [
    { name: 'Breast Reconstruction', cptCode: '19357' },
    { name: 'Reduction Mammoplasty', cptCode: '19318' },
    { name: 'Abdominoplasty', cptCode: '15830' },
    { name: 'Rhinoplasty', cptCode: '30400' },
    { name: 'Face Lift', cptCode: '15824' },
  ],
}

// Operating room inventory
export const operatingRooms: OperatingRoom[] = [
  {
    roomNumber: 'OR-1',
    roomType: 'General Surgery',
    status: 'Available',
    floor: 2,
    equipment: ['Laparoscopic Tower', 'C-Arm', 'Electrocautery', 'Suction'],
  },
  {
    roomNumber: 'OR-2',
    roomType: 'General Surgery',
    status: 'Available',
    floor: 2,
    equipment: ['Laparoscopic Tower', 'Electrocautery', 'Suction'],
  },
  {
    roomNumber: 'OR-3',
    roomType: 'Cardiac',
    status: 'Available',
    floor: 2,
    equipment: ['Heart-Lung Machine', 'TEE', 'IABP', 'Defibrillator', 'Cell Saver'],
    specialFeatures: ['Laminar Flow', 'Backup Generator'],
  },
  {
    roomNumber: 'OR-4',
    roomType: 'Neurosurgery',
    status: 'Available',
    floor: 2,
    equipment: ['Microscope', 'Neuronavigation', 'Ultrasonic Aspirator', 'IOM'],
    specialFeatures: ['Radiolucent Table'],
  },
  {
    roomNumber: 'OR-5',
    roomType: 'Orthopedic',
    status: 'Available',
    floor: 3,
    equipment: ['C-Arm', 'Power Tools', 'Arthroscopy Tower', 'Traction Table'],
    specialFeatures: ['HEPA Filtration', 'Laminar Flow'],
  },
  {
    roomNumber: 'OR-6',
    roomType: 'Orthopedic',
    status: 'Available',
    floor: 3,
    equipment: ['C-Arm', 'Power Tools', 'Arthroscopy Tower'],
    specialFeatures: ['HEPA Filtration'],
  },
  {
    roomNumber: 'OR-7',
    roomType: 'Vascular',
    status: 'Available',
    floor: 3,
    equipment: ['C-Arm', 'Doppler', 'Cell Saver', 'Hybrid Suite'],
    specialFeatures: ['Hybrid OR', 'Fixed Imaging'],
  },
  {
    roomNumber: 'OR-8',
    roomType: 'Pediatric',
    status: 'Available',
    floor: 3,
    equipment: ['Pediatric Anesthesia', 'Warming Blanket', 'Pediatric Instruments'],
    specialFeatures: ['Smaller Table', 'Specialized Equipment'],
  },
  {
    roomNumber: 'OR-9',
    roomType: 'Trauma',
    status: 'Available',
    floor: 1,
    equipment: ['C-Arm', 'Rapid Infuser', 'Cell Saver', 'Massive Transfusion Protocol'],
    specialFeatures: ['24/7 Available', 'Direct ER Access'],
  },
  {
    roomNumber: 'OR-10',
    roomType: 'Ophthalmology',
    status: 'Available',
    floor: 4,
    equipment: ['Phaco Machine', 'Microscope', 'Laser'],
  },
  {
    roomNumber: 'OR-11',
    roomType: 'ENT',
    status: 'Available',
    floor: 4,
    equipment: ['Microscope', 'Endoscopy Tower', 'Navigation System'],
  },
  {
    roomNumber: 'OR-12',
    roomType: 'GYN',
    status: 'Available',
    floor: 4,
    equipment: ['Laparoscopic Tower', 'Hysteroscopy', 'Ultrasound'],
  },
]

// Generate sample surgical cases
export function generateSurgicalCases(count: number = 100): SurgicalCase[] {
  const cases: SurgicalCase[] = []

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

  const surgeons = [
    { name: 'Dr. James Anderson', npi: '1234567890' },
    { name: 'Dr. Sarah Mitchell', npi: '2345678901' },
    { name: 'Dr. Robert Chen', npi: '3456789012' },
    { name: 'Dr. Emily Thompson', npi: '4567890123' },
    { name: 'Dr. Michael Rodriguez', npi: '5678901234' },
    { name: 'Dr. Lisa Williams', npi: '6789012345' },
  ]

  const anesthesiologists = [
    'Dr. David Park',
    'Dr. Jennifer Lee',
    'Dr. Thomas Garcia',
    'Dr. Maria Santos',
  ]

  const statuses: CaseStatus[] = [
    'Scheduled',
    'Pre-Op',
    'In Progress',
    'Closing',
    'Recovery',
    'Completed',
  ]
  const priorities: CasePriority[] = ['Elective', 'Urgent', 'Emergent', 'STAT']
  const orTypes = Object.keys(surgicalProcedures) as ORType[]
  const anesthesiaTypes: AnesthesiaType[] = [
    'General',
    'Spinal',
    'Epidural',
    'Regional',
    'MAC',
    'Local',
  ]
  const asaClasses: ASAClass[] = ['I', 'II', 'III', 'IV']

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const surgeon = surgeons[Math.floor(Math.random() * surgeons.length)]
    const orType = orTypes[Math.floor(Math.random() * orTypes.length)]
    const procedures = surgicalProcedures[orType]
    const procedure = procedures[Math.floor(Math.random() * procedures.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const priority = priorities[Math.floor(Math.random() * priorities.length)]
    const anesthesiaType =
      anesthesiaTypes[Math.floor(Math.random() * anesthesiaTypes.length)]
    const asaClass = asaClasses[Math.floor(Math.random() * asaClasses.length)]

    const scheduledDate = new Date()
    const dayOffset = Math.floor(Math.random() * 14) - 7 // ±7 days
    scheduledDate.setDate(scheduledDate.getDate() + dayOffset)

    const hourOffset = Math.floor(Math.random() * 12) + 7 // 7 AM to 7 PM
    scheduledDate.setHours(hourOffset, 0, 0, 0)

    const scheduledDuration = Math.floor(Math.random() * 180) + 60 // 60-240 minutes
    const age = Math.floor(Math.random() * 70) + 18

    const orRooms = operatingRooms.filter((or) => or.roomType === orType)
    const orRoom =
      orRooms.length > 0
        ? orRooms[Math.floor(Math.random() * orRooms.length)].roomNumber
        : 'OR-1'

    const surgicalCase: SurgicalCase = {
      id: `CASE-${String(i + 1).padStart(6, '0')}`,
      caseNumber: `SX${Math.floor(Math.random() * 900000) + 100000}`,
      patientName: `${firstName} ${lastName}`,
      patientMRN: `MRN${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`,
      patientDOB: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/${2024 - age}`,
      patientAge: age,
      patientGender: Math.random() > 0.5 ? 'M' : 'F',
      orRoom,
      orType,
      procedure: procedure.name,
      procedureCPTCodes: [procedure.cptCode],
      surgeon: surgeon.name,
      surgeonNPI: surgeon.npi,
      priority,
      status,
      scheduledDate: scheduledDate.toISOString(),
      scheduledStartTime: `${String(hourOffset).padStart(2, '0')}:00`,
      scheduledDuration,
      anesthesiaType,
      anesthesiologist:
        anesthesiologists[Math.floor(Math.random() * anesthesiologists.length)],
      asaClass,
      diagnosis: getDiagnosisForProcedure(procedure.name),
      laterality: getLaterality(procedure.name),
      staff: generateStaff(surgeon.name),
      antibioticProphylaxis: true,
      vteProphylaxis: true,
    }

    if (
      status === 'In Progress' ||
      status === 'Closing' ||
      status === 'Recovery' ||
      status === 'Completed'
    ) {
      const actualStart = new Date(scheduledDate)
      actualStart.setMinutes(actualStart.getMinutes() + Math.floor(Math.random() * 30) - 15)
      surgicalCase.actualStartTime = actualStart.toISOString()

      if (status === 'Closing' || status === 'Recovery' || status === 'Completed') {
        const actualDuration = scheduledDuration + Math.floor(Math.random() * 60) - 30
        surgicalCase.actualDuration = actualDuration
        const actualEnd = new Date(actualStart)
        actualEnd.setMinutes(actualEnd.getMinutes() + actualDuration)
        surgicalCase.actualEndTime = actualEnd.toISOString()
        surgicalCase.estimatedBloodLoss = Math.floor(Math.random() * 500) + 50

        if (Math.random() > 0.95) {
          surgicalCase.complications = [
            'Minor bleeding controlled with cautery',
            'Extended operative time',
          ]
        }
      }
    }

    cases.push(surgicalCase)
  }

  return cases.sort(
    (a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
  )
}

function getDiagnosisForProcedure(procedureName: string): string {
  const diagnosisMap: Record<string, string> = {
    'Laparoscopic Cholecystectomy': 'Cholelithiasis',
    'Laparoscopic Appendectomy': 'Acute Appendicitis',
    'Total Hip Arthroplasty': 'Osteoarthritis of Hip',
    'Total Knee Arthroplasty': 'Osteoarthritis of Knee',
    'CABG x3': 'Coronary Artery Disease',
    'Craniotomy for Tumor': 'Brain Tumor',
    'Cataract Extraction with IOL': 'Cataract',
    Hysterectomy: 'Uterine Fibroids',
    'Cesarean Section': 'Pregnancy',
  }
  return diagnosisMap[procedureName] || 'See Chart'
}

function getLaterality(procedureName: string): 'Left' | 'Right' | 'Bilateral' | 'N/A' {
  if (
    procedureName.includes('Hip') ||
    procedureName.includes('Knee') ||
    procedureName.includes('Shoulder') ||
    procedureName.includes('Ankle')
  ) {
    return Math.random() > 0.5 ? 'Left' : 'Right'
  }
  if (procedureName.includes('Bilateral')) {
    return 'Bilateral'
  }
  return 'N/A'
}

function generateStaff(surgeonName: string): SurgicalStaff[] {
  return [
    { role: 'Surgeon', name: surgeonName },
    { role: 'RN', name: `RN-${Math.floor(Math.random() * 50) + 1}` },
    { role: 'Scrub Tech', name: `ST-${Math.floor(Math.random() * 30) + 1}` },
  ]
}

export function calculateORStats(cases: SurgicalCase[]): ORStats {
  const casesByType: Record<ORType, number> = {
    'General Surgery': 0,
    Cardiac: 0,
    Neurosurgery: 0,
    Orthopedic: 0,
    Vascular: 0,
    Pediatric: 0,
    Trauma: 0,
    Ophthalmology: 0,
    ENT: 0,
    GYN: 0,
    Urology: 0,
    'Plastic Surgery': 0,
  }

  cases.forEach((c) => {
    casesByType[c.orType]++
  })

  return {
    totalORs: operatingRooms.length,
    availableORs: operatingRooms.filter((or) => or.status === 'Available').length,
    inUseORs: operatingRooms.filter((or) => or.status === 'In Use').length,
    scheduledCases: cases.filter((c) => c.status === 'Scheduled').length,
    completedCases: cases.filter((c) => c.status === 'Completed').length,
    emergentCases: cases.filter((c) => c.priority === 'Emergent' || c.priority === 'STAT')
      .length,
    averageUtilization: 78.5,
    averageTurnoverTime: 32,
    casesByType,
  }
}

export const sampleSurgicalCases = generateSurgicalCases(100)

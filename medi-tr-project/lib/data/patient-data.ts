// Comprehensive Patient Data Service - Production Grade
// HIPAA-compliant simulated data for US Private Hospitals

export interface PatientDemographics {
  id: string
  mrn: string // Medical Record Number
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: Date
  age: number
  gender: 'Male' | 'Female' | 'Other' | 'Unknown'
  ssn: string // Encrypted/hashed in production
  race: string // OMB categories
  ethnicity: string
  preferredLanguage: string
  maritalStatus: string

  // Contact Information
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  phone: {
    home?: string
    mobile?: string
    work?: string
  }
  email?: string

  // Emergency Contact
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }

  // Insurance
  insurance: {
    primary: {
      provider: string
      policyNumber: string
      groupNumber: string
      subscriberId: string
      effectiveDate: Date
      expirationDate: Date
    }
    secondary?: {
      provider: string
      policyNumber: string
    }
  }

  // Clinical Information
  primaryCareProvider?: string
  assignedDoctor?: string
  assignedNurse?: string

  // Status
  status: 'Active' | 'Inactive' | 'Deceased' | 'Merged'
  registrationDate: Date
  lastVisitDate?: Date
}

export interface MedicalHistory {
  patientId: string

  // Problem List (Active Diagnoses)
  problems: {
    id: string
    code: string // ICD-10
    description: string
    onsetDate: Date
    status: 'Active' | 'Resolved' | 'Chronic'
    severity: 'Mild' | 'Moderate' | 'Severe'
    notes?: string
  }[]

  // Allergies
  allergies: {
    id: string
    allergen: string
    type: 'Drug' | 'Food' | 'Environmental' | 'Other'
    reaction: string
    severity: 'Mild' | 'Moderate' | 'Severe' | 'Life-threatening'
    onsetDate?: Date
    notes?: string
  }[]

  // Medications (Current)
  medications: {
    id: string
    name: string
    genericName?: string
    dosage: string
    route: string // PO, IV, IM, etc.
    frequency: string
    startDate: Date
    prescribedBy: string
    indication: string
    status: 'Active' | 'Discontinued' | 'On Hold'
  }[]

  // Immunizations
  immunizations: {
    id: string
    vaccine: string
    cvxCode: string // CDC vaccine code
    date: Date
    administeredBy: string
    lotNumber?: string
    site?: string
    route?: string
  }[]

  // Past Medical History
  pastMedicalHistory: {
    conditions: string[]
    surgeries: {
      procedure: string
      date: Date
      surgeon?: string
      hospital?: string
    }[]
    hospitalizations: {
      reason: string
      admissionDate: Date
      dischargeDate: Date
      facility?: string
    }[]
  }

  // Family History
  familyHistory: {
    relation: string
    condition: string
    ageOfOnset?: number
    deceased?: boolean
    causeOfDeath?: string
  }[]

  // Social History
  socialHistory: {
    smokingStatus: 'Never' | 'Former' | 'Current' | 'Unknown'
    packsPerDay?: number
    yearsSmoked?: number
    alcoholUse: 'None' | 'Occasional' | 'Moderate' | 'Heavy'
    drinksPerWeek?: number
    drugUse: 'None' | 'Former' | 'Current'
    drugs?: string[]
    occupation?: string
    maritalStatus: string
    livingArrangement?: string
    exerciseFrequency?: string
  }

  // Advance Directives
  advanceDirectives: {
    hasDNR: boolean
    hasPOLST: boolean
    hasLivingWill: boolean
    hasPowerOfAttorney: boolean
    powerOfAttorneyName?: string
    notes?: string
  }
}

export interface VitalSigns {
  patientId: string
  recordedAt: Date
  recordedBy: string

  // Vital Signs
  bloodPressure: {
    systolic: number
    diastolic: number
  }
  heartRate: number // bpm
  respiratoryRate: number // breaths/min
  temperature: number // Fahrenheit
  oxygenSaturation: number // %
  weight: number // lbs
  height: number // inches
  bmi: number

  // Pain Assessment
  painScore?: number // 0-10 scale
  painLocation?: string

  // Additional
  glucoseLevel?: number // mg/dL
  notes?: string
}

export interface ClinicalNote {
  id: string
  patientId: string
  type: 'Progress Note' | 'SOAP' | 'Consultation' | 'Discharge Summary' | 'H&P' | 'Operative Note'
  date: Date
  provider: string

  // SOAP Format
  subjective?: string
  objective?: string
  assessment?: string
  plan?: string

  // Additional sections
  chiefComplaint?: string
  historyOfPresentIllness?: string
  reviewOfSystems?: string
  physicalExam?: string
  diagnosticResults?: string
  impression?: string
  recommendations?: string

  // Metadata
  signedBy?: string
  signedAt?: Date
  status: 'Draft' | 'Signed' | 'Amended'
  amendments?: {
    date: Date
    by: string
    reason: string
    changes: string
  }[]
}

export interface LabResult {
  id: string
  patientId: string
  orderDate: Date
  collectionDate: Date
  resultDate?: Date
  orderedBy: string

  // Lab Information
  labName: string
  panelName: string
  tests: {
    name: string
    loincCode: string
    value: string | number
    unit: string
    referenceRange: string
    flag: 'Normal' | 'High' | 'Low' | 'Critical' | 'Abnormal'
    notes?: string
  }[]

  status: 'Ordered' | 'Collected' | 'In Process' | 'Completed' | 'Cancelled'
  critical: boolean
  reviewedBy?: string
  reviewedAt?: Date
}

// Data Generation Functions

const firstNames = {
  en: {
    male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'],
    female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'],
  },
  tr: {
    male: ['Mehmet', 'Ahmet', 'Mustafa', 'Ali', 'Hüseyin', 'Hasan', 'İbrahim', 'Ömer', 'Yusuf', 'Emre'],
    female: ['Ayşe', 'Fatma', 'Zeynep', 'Elif', 'Merve', 'Esra', 'Şeyma', 'Büşra', 'Hatice', 'Selin'],
  }
}

const lastNames = {
  en: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
       'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'],
  tr: ['Yılmaz', 'Demir', 'Çelik', 'Kaya', 'Aydın', 'Öztürk', 'Arslan', 'Koç', 'Şahin', 'Özdemir',
       'Yıldız', 'Karaca', 'Kurt', 'Erdoğan', 'Polat', 'Güneş', 'Aksoy', 'Taş', 'Bulut', 'Kaplan']
}

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'GA', 'NC']

const insuranceProviders = [
  'Blue Cross Blue Shield',
  'UnitedHealthcare',
  'Aetna',
  'Cigna',
  'Humana',
  'Kaiser Permanente',
  'Anthem',
  'Medicare',
  'Medicaid',
]

const commonConditions = [
  { code: 'I10', description: 'Essential (primary) hypertension' },
  { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
  { code: 'E78.5', description: 'Hyperlipidemia, unspecified' },
  { code: 'M79.3', description: 'Chronic pain syndrome' },
  { code: 'F41.1', description: 'Generalized anxiety disorder' },
  { code: 'J44.9', description: 'Chronic obstructive pulmonary disease, unspecified' },
  { code: 'I25.10', description: 'Atherosclerotic heart disease' },
  { code: 'N18.3', description: 'Chronic kidney disease, stage 3' },
]

const commonMedications = [
  { name: 'Lisinopril 10mg', indication: 'Hypertension', route: 'PO', frequency: 'Daily' },
  { name: 'Metformin 500mg', indication: 'Type 2 Diabetes', route: 'PO', frequency: 'Twice daily' },
  { name: 'Atorvastatin 20mg', indication: 'Hyperlipidemia', route: 'PO', frequency: 'Daily at bedtime' },
  { name: 'Aspirin 81mg', indication: 'Cardiovascular prevention', route: 'PO', frequency: 'Daily' },
  { name: 'Levothyroxine 50mcg', indication: 'Hypothyroidism', route: 'PO', frequency: 'Daily before breakfast' },
]

export function generateComprehensivePatients(count: number = 100, lang: 'en' | 'tr' = 'en'): PatientDemographics[] {
  return Array.from({ length: count }, (_, i) => {
    const gender: 'Male' | 'Female' = Math.random() > 0.5 ? 'Male' : 'Female'
    const firstName = gender === 'Male'
      ? firstNames[lang].male[Math.floor(Math.random() * firstNames[lang].male.length)]
      : firstNames[lang].female[Math.floor(Math.random() * firstNames[lang].female.length)]
    const lastName = lastNames[lang][Math.floor(Math.random() * lastNames[lang].length)]
    const dob = new Date(
      1940 + Math.floor(Math.random() * 60), // 1940-2000
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    )
    const age = new Date().getFullYear() - dob.getFullYear()
    const city = cities[Math.floor(Math.random() * cities.length)]
    const state = states[Math.floor(Math.random() * states.length)]

    return {
      id: `PAT-${String(i + 1).padStart(6, '0')}`,
      mrn: `MRN-${String(Math.floor(Math.random() * 10000000)).padStart(8, '0')}`,
      firstName,
      lastName,
      dateOfBirth: dob,
      age,
      gender,
      ssn: `***-**-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`, // Partially masked
      race: ['White', 'Black or African American', 'Asian', 'Native Hawaiian', 'American Indian'][Math.floor(Math.random() * 5)],
      ethnicity: Math.random() > 0.8 ? 'Hispanic or Latino' : 'Not Hispanic or Latino',
      preferredLanguage: Math.random() > 0.9 ? 'Spanish' : 'English',
      maritalStatus: ['Single', 'Married', 'Divorced', 'Widowed'][Math.floor(Math.random() * 4)],
      address: {
        street: `${Math.floor(Math.random() * 9999)} ${['Main', 'Oak', 'Maple', 'Cedar', 'Elm'][Math.floor(Math.random() * 5)]} St`,
        city,
        state,
        zip: String(Math.floor(Math.random() * 90000) + 10000),
        country: 'USA',
      },
      phone: {
        mobile: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        home: Math.random() > 0.5 ? `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined,
      },
      email: Math.random() > 0.3 ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com` : undefined,
      emergencyContact: {
        name: `${firstNames[lang][gender === 'Male' ? 'female' : 'male'][0]} ${lastName}`,
        relationship: ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend'][Math.floor(Math.random() * 5)],
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      },
      insurance: {
        primary: {
          provider: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
          policyNumber: `POL-${Math.floor(Math.random() * 1000000000)}`,
          groupNumber: `GRP-${Math.floor(Math.random() * 100000)}`,
          subscriberId: `SUB-${Math.floor(Math.random() * 1000000000)}`,
          effectiveDate: new Date(2020, 0, 1),
          expirationDate: new Date(2025, 11, 31),
        },
      },
      primaryCareProvider: ['Dr. Anderson', 'Dr. Chen', 'Dr. Patel', 'Dr. Kim'][Math.floor(Math.random() * 4)],
      status: 'Active',
      registrationDate: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), 1),
      lastVisitDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Last 90 days
    }
  })
}

export function generateMedicalHistory(patientId: string): MedicalHistory {
  const numProblems = Math.floor(Math.random() * 5) + 1
  const numAllergies = Math.floor(Math.random() * 3)
  const numMedications = Math.floor(Math.random() * 6) + 1

  return {
    patientId,
    problems: Array.from({ length: numProblems }, (_, i) => {
      const condition = commonConditions[Math.floor(Math.random() * commonConditions.length)]
      return {
        id: `PROB-${i + 1}`,
        code: condition.code,
        description: condition.description,
        onsetDate: new Date(Date.now() - Math.random() * 365 * 5 * 24 * 60 * 60 * 1000), // Last 5 years
        status: Math.random() > 0.3 ? 'Active' : 'Chronic',
        severity: ['Mild', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)] as any,
      }
    }),
    allergies: Array.from({ length: numAllergies }, (_, i) => ({
      id: `ALLERGY-${i + 1}`,
      allergen: ['Penicillin', 'Sulfa drugs', 'Peanuts', 'Shellfish', 'Latex', 'Morphine'][Math.floor(Math.random() * 6)],
      type: ['Drug', 'Food', 'Environmental'][Math.floor(Math.random() * 3)] as any,
      reaction: ['Rash', 'Hives', 'Anaphylaxis', 'Nausea', 'Swelling'][Math.floor(Math.random() * 5)],
      severity: ['Mild', 'Moderate', 'Severe', 'Life-threatening'][Math.floor(Math.random() * 4)] as any,
    })),
    medications: Array.from({ length: numMedications }, (_, i) => {
      const med = commonMedications[Math.floor(Math.random() * commonMedications.length)]
      return {
        id: `MED-${i + 1}`,
        name: med.name,
        dosage: med.name.split(' ')[1] || '10mg',
        route: med.route,
        frequency: med.frequency,
        startDate: new Date(Date.now() - Math.random() * 365 * 2 * 24 * 60 * 60 * 1000),
        prescribedBy: ['Dr. Anderson', 'Dr. Chen', 'Dr. Patel'][Math.floor(Math.random() * 3)],
        indication: med.indication,
        status: 'Active',
      }
    }),
    immunizations: [
      { id: 'IMM-1', vaccine: 'Influenza', cvxCode: '141', date: new Date(2024, 9, 15), administeredBy: 'RN Johnson' },
      { id: 'IMM-2', vaccine: 'COVID-19 (mRNA)', cvxCode: '208', date: new Date(2024, 4, 1), administeredBy: 'RN Martinez' },
      { id: 'IMM-3', vaccine: 'Pneumococcal', cvxCode: '33', date: new Date(2023, 2, 10), administeredBy: 'RN Lee' },
    ],
    pastMedicalHistory: {
      conditions: ['Hypertension', 'Type 2 Diabetes', 'Hyperlipidemia'].slice(0, Math.floor(Math.random() * 3) + 1),
      surgeries: [],
      hospitalizations: [],
    },
    familyHistory: [
      { relation: 'Father', condition: 'Coronary Artery Disease', ageOfOnset: 65, deceased: true, causeOfDeath: 'Myocardial Infarction' },
      { relation: 'Mother', condition: 'Type 2 Diabetes', ageOfOnset: 58 },
    ],
    socialHistory: {
      smokingStatus: ['Never', 'Former', 'Current'][Math.floor(Math.random() * 3)] as any,
      alcoholUse: ['None', 'Occasional', 'Moderate'][Math.floor(Math.random() * 3)] as any,
      drugUse: 'None',
      maritalStatus: 'Married',
      occupation: 'Software Engineer',
    },
    advanceDirectives: {
      hasDNR: false,
      hasPOLST: false,
      hasLivingWill: Math.random() > 0.5,
      hasPowerOfAttorney: Math.random() > 0.5,
    },
  }
}

export function generateVitalSigns(patientId: string): VitalSigns {
  const systolic = Math.floor(Math.random() * 40) + 100
  const diastolic = Math.floor(Math.random() * 30) + 60
  const weight = Math.floor(Math.random() * 100) + 120
  const height = Math.floor(Math.random() * 12) + 60
  const bmi = +((weight / (height * height)) * 703).toFixed(1)

  return {
    patientId,
    recordedAt: new Date(),
    recordedBy: 'RN Smith',
    bloodPressure: { systolic, diastolic },
    heartRate: Math.floor(Math.random() * 40) + 60,
    respiratoryRate: Math.floor(Math.random() * 8) + 12,
    temperature: +(Math.random() * 3 + 97).toFixed(1),
    oxygenSaturation: Math.floor(Math.random() * 8) + 93,
    weight,
    height,
    bmi,
    painScore: Math.floor(Math.random() * 6),
  }
}

// Utility Functions
export function calculateAge(dob: Date): number {
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

export function formatMRN(mrn: string): string {
  return mrn.replace(/(.{3})/g, '$1-').slice(0, -1)
}

export function formatSSN(ssn: string): string {
  return ssn.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}

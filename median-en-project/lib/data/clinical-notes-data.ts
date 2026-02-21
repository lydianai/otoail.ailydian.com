/**
 * Clinical Notes Data Service
 * Provides SOAP note documentation, clinical encounters, and medical records
 * HIPAA-compliant with structured clinical documentation standards
 */

export type NoteType =
  | 'Progress Note'
  | 'SOAP Note'
  | 'Consultation Note'
  | 'Discharge Summary'
  | 'Operative Report'
  | 'History & Physical'
  | 'Procedure Note'
  | 'Emergency Department Note'

export type NoteStatus =
  | 'Draft'
  | 'In Progress'
  | 'Pending Review'
  | 'Signed'
  | 'Amended'
  | 'Addended'

export interface SOAPNote {
  id: string
  patientId: string
  patientName: string
  patientMRN: string
  encounterId: string
  noteType: NoteType
  status: NoteStatus
  dateOfService: string
  timeOfService: string
  providerId: string
  providerName: string
  providerCredentials: string
  specialty: string
  location: string

  // SOAP Components
  subjective: {
    chiefComplaint: string
    historyOfPresentIllness: string
    reviewOfSystems?: string
    socialHistory?: string
    familyHistory?: string
  }

  objective: {
    vitalSigns: {
      temperature: string
      bloodPressure: string
      heartRate: number
      respiratoryRate: number
      oxygenSaturation: number
      weight?: string
      height?: string
      bmi?: number
    }
    physicalExam: string
    labResults?: string
    imagingResults?: string
  }

  assessment: {
    diagnoses: Array<{
      code: string // ICD-10
      description: string
      type: 'Primary' | 'Secondary' | 'Differential'
    }>
    clinicalImpression: string
  }

  plan: {
    medications?: Array<{
      name: string
      dosage: string
      route: string
      frequency: string
      duration?: string
    }>
    procedures?: string[]
    labOrders?: string[]
    imagingOrders?: string[]
    referrals?: string[]
    patientInstructions: string
    followUp: string
  }

  // Metadata
  signedBy?: string
  signedAt?: string
  cosignedBy?: string
  cosignedAt?: string
  amendmentReason?: string
  createdAt: string
  updatedAt: string
}

export interface ClinicalEncounter {
  id: string
  patientId: string
  patientName: string
  encounterId: string
  encounterType: string
  dateOfService: string
  providerId: string
  providerName: string
  department: string
  chiefComplaint: string
  status: 'Active' | 'Completed' | 'Cancelled'
  notes: SOAPNote[]
  duration?: number
}

// Sample clinical notes
export function generateClinicalNotes(count: number = 100): SOAPNote[] {
  const notes: SOAPNote[] = []

  const noteTypes: NoteType[] = [
    'Progress Note',
    'SOAP Note',
    'Consultation Note',
    'History & Physical',
    'Procedure Note'
  ]

  const providers = [
    { id: 'prov-001', name: 'Dr. Sarah Johnson', credentials: 'MD', specialty: 'Internal Medicine' },
    { id: 'prov-002', name: 'Dr. Michael Chen', credentials: 'MD', specialty: 'Cardiology' },
    { id: 'prov-003', name: 'Dr. Emily Rodriguez', credentials: 'NP', specialty: 'Family Medicine' },
    { id: 'prov-004', name: 'Dr. David Williams', credentials: 'MD', specialty: 'Orthopedics' },
    { id: 'prov-005', name: 'Dr. Lisa Anderson', credentials: 'MD', specialty: 'Pediatrics' }
  ]

  const chiefComplaints = [
    'Chest pain',
    'Shortness of breath',
    'Abdominal pain',
    'Back pain',
    'Headache',
    'Fever',
    'Cough',
    'Fatigue',
    'Joint pain',
    'Skin rash'
  ]

  const diagnoses = [
    { code: 'I10', description: 'Essential (primary) hypertension' },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
    { code: 'J44.9', description: 'Chronic obstructive pulmonary disease, unspecified' },
    { code: 'M54.5', description: 'Low back pain' },
    { code: 'J06.9', description: 'Acute upper respiratory infection, unspecified' },
    { code: 'R51', description: 'Headache' },
    { code: 'K21.9', description: 'Gastro-esophageal reflux disease without esophagitis' },
    { code: 'F41.9', description: 'Anxiety disorder, unspecified' },
    { code: 'M25.511', description: 'Pain in right shoulder' },
    { code: 'L30.9', description: 'Dermatitis, unspecified' }
  ]

  for (let i = 0; i < count; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)]
    const noteType = noteTypes[Math.floor(Math.random() * noteTypes.length)]
    const complaint = chiefComplaints[Math.floor(Math.random() * chiefComplaints.length)]
    const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)]

    const daysAgo = Math.floor(Math.random() * 30)
    const dateOfService = new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0]

    const status: NoteStatus = daysAgo > 1 ? 'Signed' : ['Draft', 'In Progress', 'Pending Review'][Math.floor(Math.random() * 3)] as NoteStatus

    notes.push({
      id: `note-${String(i + 1).padStart(6, '0')}`,
      patientId: `pat-${String(Math.floor(Math.random() * 247) + 1).padStart(6, '0')}`,
      patientName: generatePatientName(),
      patientMRN: `MRN${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
      encounterId: `enc-${String(i + 1000).padStart(8, '0')}`,
      noteType,
      status,
      dateOfService,
      timeOfService: `${String(8 + Math.floor(Math.random() * 9)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      providerId: provider.id,
      providerName: provider.name,
      providerCredentials: provider.credentials,
      specialty: provider.specialty,
      location: ['Clinic Room 1A', 'Clinic Room 2B', 'Clinic Room 3C', 'ED Bay 4', 'Consultation Room 5'][Math.floor(Math.random() * 5)],

      subjective: {
        chiefComplaint: complaint,
        historyOfPresentIllness: generateHPI(complaint),
        reviewOfSystems: 'Constitutional: Denies fever, chills, night sweats. Cardiovascular: Denies chest pain, palpitations. Respiratory: Denies cough, shortness of breath. GI: Denies nausea, vomiting, diarrhea.',
        socialHistory: 'Non-smoker, occasional alcohol use, exercises regularly',
        familyHistory: 'Father with hypertension, mother with diabetes'
      },

      objective: {
        vitalSigns: {
          temperature: `${(97 + Math.random() * 2.5).toFixed(1)}°F`,
          bloodPressure: `${110 + Math.floor(Math.random() * 30)}/${70 + Math.floor(Math.random() * 20)}`,
          heartRate: 60 + Math.floor(Math.random() * 40),
          respiratoryRate: 12 + Math.floor(Math.random() * 8),
          oxygenSaturation: 95 + Math.floor(Math.random() * 5),
          weight: `${150 + Math.floor(Math.random() * 100)} lbs`,
          height: `${Math.floor(5 + Math.random() * 1)}' ${Math.floor(Math.random() * 12)}"`,
          bmi: 20 + Math.floor(Math.random() * 15)
        },
        physicalExam: generatePhysicalExam(complaint),
        labResults: Math.random() < 0.3 ? 'CBC: WBC 7.2, Hgb 14.5, Plt 250. BMP: Na 140, K 4.0, Cr 0.9, Glucose 95' : undefined,
        imagingResults: Math.random() < 0.2 ? 'Chest X-ray: No acute cardiopulmonary process' : undefined
      },

      assessment: {
        diagnoses: [
          {
            code: diagnosis.code,
            description: diagnosis.description,
            type: 'Primary'
          }
        ],
        clinicalImpression: generateClinicalImpression(diagnosis.description)
      },

      plan: {
        medications: generateMedications(diagnosis.code),
        procedures: Math.random() < 0.2 ? ['Physical therapy referral'] : undefined,
        labOrders: Math.random() < 0.3 ? ['Complete Blood Count', 'Basic Metabolic Panel'] : undefined,
        imagingOrders: Math.random() < 0.2 ? ['Chest X-ray'] : undefined,
        referrals: Math.random() < 0.15 ? ['Cardiology consultation'] : undefined,
        patientInstructions: 'Rest, stay hydrated, monitor symptoms. Return to ED if symptoms worsen or new symptoms develop.',
        followUp: 'Follow up in 2 weeks or sooner if symptoms worsen'
      },

      signedBy: status === 'Signed' ? provider.name : undefined,
      signedAt: status === 'Signed' ? new Date(new Date(dateOfService).getTime() + 3600000).toISOString() : undefined,
      createdAt: new Date(dateOfService).toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  return notes.sort((a, b) => new Date(b.dateOfService).getTime() - new Date(a.dateOfService).getTime())
}

// Helper functions
function generatePatientName(): string {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'James', 'Jennifer']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}

function generateHPI(complaint: string): string {
  const hpiTemplates: Record<string, string> = {
    'Chest pain': 'Patient presents with substernal chest pain that started 2 hours ago. Pain is described as pressure-like, 7/10 severity, radiating to left arm. Associated with shortness of breath and diaphoresis. No relief with rest. No previous similar episodes.',
    'Shortness of breath': 'Patient reports progressive shortness of breath over past 3 days. Worse with exertion, improved with rest. Associated with productive cough with yellow sputum. Denies fever, chest pain, or leg swelling.',
    'Abdominal pain': 'Patient presents with right upper quadrant abdominal pain for 6 hours. Pain is sharp, 8/10 severity, worse after eating fatty foods. Associated with nausea. Denies vomiting, diarrhea, or fever.',
    'Back pain': 'Patient reports lower back pain for 1 week following lifting heavy object. Pain is achy, 6/10 severity, radiating down right leg. Worse with bending and prolonged sitting. Improved with rest and ibuprofen.',
    'Headache': 'Patient presents with frontal headache for 2 days. Pain is throbbing, 7/10 severity, associated with photophobia and nausea. Denies visual changes, neck stiffness, or fever. Previous similar episodes.',
    'Fever': 'Patient reports fever up to 101.5°F for 2 days. Associated with chills, body aches, and fatigue. Denies cough, shortness of breath, urinary symptoms, or abdominal pain.',
    'Cough': 'Patient presents with productive cough for 5 days. Cough is worse at night, producing yellow sputum. Associated with low-grade fever and fatigue. Denies chest pain or shortness of breath.',
    'Fatigue': 'Patient reports progressive fatigue for 3 weeks. Feels tired even after adequate sleep. Associated with decreased appetite and mild weight loss. Denies fever, night sweats, or other symptoms.',
    'Joint pain': 'Patient presents with bilateral knee pain for 2 months. Pain is worse with activity and weight-bearing. Associated with morning stiffness lasting 30 minutes. Improved with rest and NSAIDs.',
    'Skin rash': 'Patient reports pruritic rash on trunk and extremities for 1 week. Rash is erythematous with small vesicles. No known exposures or new medications. Denies fever or systemic symptoms.'
  }

  return hpiTemplates[complaint] || 'Patient presents with chief complaint as noted above. Symptoms started recently with gradual onset. No significant aggravating or relieving factors noted.'
}

function generatePhysicalExam(complaint: string): string {
  return `General: Alert and oriented, in no acute distress
HEENT: Normocephalic, atraumatic. PERRLA. Oropharynx clear.
Neck: Supple, no JVD, no lymphadenopathy
Cardiovascular: Regular rate and rhythm, no murmurs
Pulmonary: Clear to auscultation bilaterally, no wheezes or crackles
Abdomen: Soft, non-tender, non-distended, bowel sounds present
Extremities: No edema, pulses intact
Neurological: Cranial nerves II-XII intact, motor strength 5/5 all extremities
Skin: Warm and dry, no rashes`
}

function generateClinicalImpression(diagnosis: string): string {
  return `Patient presents with symptoms consistent with ${diagnosis.toLowerCase()}. Based on history, physical examination, and available test results, diagnosis appears most likely. Will initiate appropriate treatment and arrange follow-up.`
}

function generateMedications(icd10: string): Array<{ name: string; dosage: string; route: string; frequency: string; duration?: string }> {
  const medicationMap: Record<string, Array<{ name: string; dosage: string; route: string; frequency: string; duration?: string }>> = {
    'I10': [{ name: 'Lisinopril', dosage: '10mg', route: 'PO', frequency: 'Daily' }],
    'E11.9': [{ name: 'Metformin', dosage: '500mg', route: 'PO', frequency: 'Twice daily with meals' }],
    'J44.9': [{ name: 'Albuterol', dosage: '90mcg', route: 'Inhaler', frequency: 'Every 4-6 hours as needed' }],
    'M54.5': [{ name: 'Ibuprofen', dosage: '600mg', route: 'PO', frequency: 'Every 8 hours with food', duration: '7 days' }],
    'J06.9': [{ name: 'Acetaminophen', dosage: '650mg', route: 'PO', frequency: 'Every 6 hours as needed', duration: '5 days' }],
    'R51': [{ name: 'Sumatriptan', dosage: '50mg', route: 'PO', frequency: 'At onset of headache, may repeat once after 2 hours' }],
    'K21.9': [{ name: 'Omeprazole', dosage: '20mg', route: 'PO', frequency: 'Daily before breakfast' }],
    'F41.9': [{ name: 'Sertraline', dosage: '50mg', route: 'PO', frequency: 'Daily' }]
  }

  return medicationMap[icd10] || [{ name: 'Supportive care', dosage: 'N/A', route: 'N/A', frequency: 'As directed' }]
}

export function getClinicalNotesByPatient(patientId: string, notes: SOAPNote[]): SOAPNote[] {
  return notes.filter(note => note.patientId === patientId)
}

export function getClinicalNotesByProvider(providerId: string, notes: SOAPNote[]): SOAPNote[] {
  return notes.filter(note => note.providerId === providerId)
}

export function getClinicalNotesByStatus(status: NoteStatus, notes: SOAPNote[]): SOAPNote[] {
  return notes.filter(note => note.status === status)
}

export function getClinicalNotesByDateRange(startDate: string, endDate: string, notes: SOAPNote[]): SOAPNote[] {
  return notes.filter(note => {
    const noteDate = new Date(note.dateOfService)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return noteDate >= start && noteDate <= end
  })
}

export interface ClinicalNoteStats {
  totalNotes: number
  signedNotes: number
  pendingNotes: number
  draftNotes: number
  notesThisWeek: number
  notesThisMonth: number
  averageNotesPerDay: number
}

export function calculateClinicalStats(notes: SOAPNote[]): ClinicalNoteStats {
  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 86400000)
  const monthAgo = new Date(today.getTime() - 30 * 86400000)

  const notesThisWeek = notes.filter(n => new Date(n.dateOfService) >= weekAgo)
  const notesThisMonth = notes.filter(n => new Date(n.dateOfService) >= monthAgo)

  return {
    totalNotes: notes.length,
    signedNotes: notes.filter(n => n.status === 'Signed').length,
    pendingNotes: notes.filter(n => n.status === 'Pending Review').length,
    draftNotes: notes.filter(n => n.status === 'Draft' || n.status === 'In Progress').length,
    notesThisWeek: notesThisWeek.length,
    notesThisMonth: notesThisMonth.length,
    averageNotesPerDay: Math.round(notesThisMonth.length / 30)
  }
}

export const sampleClinicalNotes = generateClinicalNotes(100)

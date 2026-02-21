/**
 * Pharmacy Data Service
 * Comprehensive e-prescribing, formulary management, and medication tracking
 * Includes NDC codes, DEA schedules, clinical decision support
 */

export type MedicationClass =
  | 'Antibiotic'
  | 'Analgesic'
  | 'Antihypertensive'
  | 'Antidiabetic'
  | 'Anticoagulant'
  | 'Antidepressant'
  | 'Antipsychotic'
  | 'Bronchodilator'
  | 'Corticosteroid'
  | 'Diuretic'
  | 'Lipid-Lowering'
  | 'Anticonvulsant'
  | 'Immunosuppressant'
  | 'Chemotherapy'

export type DEASchedule = 'I' | 'II' | 'III' | 'IV' | 'V' | 'Non-Controlled'

export type PrescriptionStatus =
  | 'Pending'
  | 'Verified'
  | 'Dispensed'
  | 'Completed'
  | 'Cancelled'
  | 'Hold'
  | 'Discontinued'

export type Route =
  | 'Oral'
  | 'IV'
  | 'IM'
  | 'SC'
  | 'Topical'
  | 'Inhalation'
  | 'Ophthalmic'
  | 'Otic'
  | 'Rectal'
  | 'Transdermal'
  | 'Sublingual'
  | 'Nasal'

export interface Medication {
  ndcCode: string
  genericName: string
  brandName: string
  strength: string
  dosageForm: string
  route: Route
  class: MedicationClass
  deaSchedule: DEASchedule
  formularyStatus: 'Preferred' | 'Non-Preferred' | 'Restricted' | 'Non-Formulary'
  awpPrice: number // Average Wholesale Price
  blackBoxWarning?: string
  contraindications?: string[]
  commonSideEffects?: string[]
  clinicalPearls?: string
}

export interface Prescription {
  id: string
  rxNumber: string
  patientId: string
  patientName: string
  patientMRN: string
  patientDOB: string
  medication: Medication
  prescribedBy: string
  prescriberNPI: string
  prescriberDEA?: string
  indication: string
  directions: string
  quantity: number
  refills: number
  daysSupply: number
  status: PrescriptionStatus
  writtenDate: string
  fillDate?: string
  nextRefillDate?: string
  pharmacist?: string
  pharmacistNPI?: string
  notes?: string
  priorAuthRequired?: boolean
  priorAuthStatus?: 'Pending' | 'Approved' | 'Denied'
  interactions?: DrugInteraction[]
  allergies?: string[]
}

export interface DrugInteraction {
  severity: 'Critical' | 'Major' | 'Moderate' | 'Minor'
  interactingDrug: string
  description: string
  recommendation: string
}

export interface PharmacyStats {
  totalPrescriptions: number
  pendingVerification: number
  readyToDispense: number
  awaitingRefill: number
  priorAuthNeeded: number
  controlledSubstances: number
  averageProcessingTime: number
}

// Comprehensive Formulary - Top 50+ medications with NDC codes
export const formulary: Medication[] = [
  // Antibiotics
  {
    ndcCode: '00003-0293-50',
    genericName: 'Amoxicillin',
    brandName: 'Amoxil',
    strength: '500mg',
    dosageForm: 'Capsule',
    route: 'Oral',
    class: 'Antibiotic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 12.5,
    commonSideEffects: ['Nausea', 'Diarrhea', 'Rash'],
    clinicalPearls: 'Take with or without food. Complete full course.',
  },
  {
    ndcCode: '00093-0147-01',
    genericName: 'Azithromycin',
    brandName: 'Zithromax',
    strength: '250mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Antibiotic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 28.75,
    commonSideEffects: ['GI upset', 'Headache'],
    clinicalPearls: 'Z-Pack: 2 tabs day 1, then 1 tab daily x4 days',
  },
  {
    ndcCode: '00777-3105-02',
    genericName: 'Doxycycline',
    brandName: 'Vibramycin',
    strength: '100mg',
    dosageForm: 'Capsule',
    route: 'Oral',
    class: 'Antibiotic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 18.5,
    commonSideEffects: ['Photosensitivity', 'GI upset', 'Esophagitis'],
    clinicalPearls: 'Take with full glass of water. Avoid sun exposure.',
  },
  {
    ndcCode: '50090-3106-0',
    genericName: 'Cephalexin',
    brandName: 'Keflex',
    strength: '500mg',
    dosageForm: 'Capsule',
    route: 'Oral',
    class: 'Antibiotic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 22.0,
    commonSideEffects: ['Diarrhea', 'Nausea'],
    clinicalPearls: 'First-generation cephalosporin. Good skin coverage.',
  },

  // Analgesics
  {
    ndcCode: '00406-0505-01',
    genericName: 'Acetaminophen',
    brandName: 'Tylenol',
    strength: '500mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Analgesic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 8.5,
    commonSideEffects: ['Hepatotoxicity (overdose)'],
    clinicalPearls: 'Max 4g/day. Caution in liver disease.',
  },
  {
    ndcCode: '00378-4019-01',
    genericName: 'Ibuprofen',
    brandName: 'Motrin',
    strength: '600mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Analgesic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 10.0,
    commonSideEffects: ['GI bleeding', 'Renal impairment'],
    clinicalPearls: 'Take with food. Caution in renal disease.',
  },
  {
    ndcCode: '00228-2063-11',
    genericName: 'Oxycodone',
    brandName: 'OxyContin',
    strength: '5mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Analgesic',
    deaSchedule: 'II',
    formularyStatus: 'Restricted',
    awpPrice: 45.0,
    blackBoxWarning:
      'Risk of addiction, abuse, and misuse. Respiratory depression.',
    commonSideEffects: ['Constipation', 'Drowsiness', 'Nausea'],
    clinicalPearls: 'Requires DEA license. Prescribe bowel regimen.',
  },
  {
    ndcCode: '00406-8530-01',
    genericName: 'Tramadol',
    brandName: 'Ultram',
    strength: '50mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Analgesic',
    deaSchedule: 'IV',
    formularyStatus: 'Non-Preferred',
    awpPrice: 18.5,
    commonSideEffects: ['Dizziness', 'Nausea', 'Constipation'],
    clinicalPearls: 'Lower abuse potential than opioids. Seizure risk.',
  },

  // Antihypertensives
  {
    ndcCode: '00071-0222-23',
    genericName: 'Lisinopril',
    brandName: 'Prinivil',
    strength: '10mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Antihypertensive',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 12.0,
    commonSideEffects: ['Dry cough', 'Hyperkalemia', 'Angioedema'],
    contraindications: ['Pregnancy', 'Bilateral renal artery stenosis'],
    clinicalPearls: 'ACE inhibitor. Monitor K+ and creatinine.',
  },
  {
    ndcCode: '00378-0016-93',
    genericName: 'Amlodipine',
    brandName: 'Norvasc',
    strength: '5mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Antihypertensive',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 14.5,
    commonSideEffects: ['Peripheral edema', 'Flushing'],
    clinicalPearls: 'Long-acting calcium channel blocker. Once daily.',
  },
  {
    ndcCode: '00093-7369-56',
    genericName: 'Metoprolol Succinate',
    brandName: 'Toprol-XL',
    strength: '50mg',
    dosageForm: 'Extended-Release Tablet',
    route: 'Oral',
    class: 'Antihypertensive',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 24.0,
    commonSideEffects: ['Bradycardia', 'Fatigue', 'Cold extremities'],
    clinicalPearls: 'Beta-blocker. Do not abruptly discontinue.',
  },
  {
    ndcCode: '00378-0116-93',
    genericName: 'Losartan',
    brandName: 'Cozaar',
    strength: '50mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Antihypertensive',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 18.0,
    commonSideEffects: ['Hyperkalemia', 'Dizziness'],
    contraindications: ['Pregnancy'],
    clinicalPearls: 'ARB. Alternative to ACE inhibitors (no cough).',
  },

  // Antidiabetics
  {
    ndcCode: '00093-7214-01',
    genericName: 'Metformin',
    brandName: 'Glucophage',
    strength: '500mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Antidiabetic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 10.0,
    commonSideEffects: ['Diarrhea', 'Nausea', 'Lactic acidosis (rare)'],
    contraindications: ['eGFR <30', 'Severe liver disease'],
    clinicalPearls: 'First-line for T2DM. Take with meals. Monitor renal function.',
  },
  {
    ndcCode: '00002-8475-01',
    genericName: 'Insulin Glargine',
    brandName: 'Lantus',
    strength: '100 units/mL',
    dosageForm: 'Solution',
    route: 'SC',
    class: 'Antidiabetic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 285.0,
    commonSideEffects: ['Hypoglycemia', 'Weight gain', 'Injection site reaction'],
    clinicalPearls: 'Long-acting basal insulin. Once daily dosing.',
  },
  {
    ndcCode: '00310-6850-39',
    genericName: 'Empagliflozin',
    brandName: 'Jardiance',
    strength: '10mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Antidiabetic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Non-Preferred',
    awpPrice: 485.0,
    commonSideEffects: ['UTIs', 'Genital yeast infections'],
    clinicalPearls: 'SGLT2 inhibitor. Cardiovascular and renal benefits.',
  },

  // Lipid-Lowering
  {
    ndcCode: '00378-1805-93',
    genericName: 'Atorvastatin',
    brandName: 'Lipitor',
    strength: '20mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Lipid-Lowering',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 16.0,
    commonSideEffects: ['Myalgia', 'Elevated LFTs', 'Rhabdomyolysis (rare)'],
    clinicalPearls: 'High-intensity statin. Monitor LFTs and CK.',
  },
  {
    ndcCode: '00378-4815-93',
    genericName: 'Rosuvastatin',
    brandName: 'Crestor',
    strength: '10mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Lipid-Lowering',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 22.0,
    commonSideEffects: ['Myalgia', 'Headache'],
    clinicalPearls: 'Most potent statin. Dose adjust in renal impairment.',
  },

  // Antidepressants
  {
    ndcCode: '00093-7198-56',
    genericName: 'Sertraline',
    brandName: 'Zoloft',
    strength: '50mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Antidepressant',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 14.5,
    blackBoxWarning: 'Increased suicidal thinking in children/adolescents.',
    commonSideEffects: ['Nausea', 'Sexual dysfunction', 'Insomnia'],
    clinicalPearls: 'SSRI. Allow 4-6 weeks for full effect.',
  },
  {
    ndcCode: '00378-1852-93',
    genericName: 'Escitalopram',
    brandName: 'Lexapro',
    strength: '10mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Antidepressant',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 16.0,
    blackBoxWarning: 'Increased suicidal thinking in children/adolescents.',
    commonSideEffects: ['Nausea', 'Fatigue', 'Sexual dysfunction'],
    clinicalPearls: 'SSRI. Well-tolerated. QTc prolongation risk.',
  },
  {
    ndcCode: '00378-1134-93',
    genericName: 'Bupropion XL',
    brandName: 'Wellbutrin XL',
    strength: '150mg',
    dosageForm: 'Extended-Release Tablet',
    route: 'Oral',
    class: 'Antidepressant',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 28.0,
    contraindications: ['Seizure disorder', 'Eating disorders'],
    commonSideEffects: ['Insomnia', 'Agitation', 'Dry mouth'],
    clinicalPearls: 'NDRI. Less sexual dysfunction. Smoking cessation aid.',
  },

  // Anticoagulants
  {
    ndcCode: '00093-0877-01',
    genericName: 'Warfarin',
    brandName: 'Coumadin',
    strength: '5mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Anticoagulant',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 12.0,
    blackBoxWarning: 'Risk of major or fatal bleeding.',
    commonSideEffects: ['Bleeding', 'Skin necrosis (rare)'],
    clinicalPearls: 'Monitor INR. Target INR 2-3. Vitamin K reversal.',
  },
  {
    ndcCode: '50419-0488-01',
    genericName: 'Apixaban',
    brandName: 'Eliquis',
    strength: '5mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Anticoagulant',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Non-Preferred',
    awpPrice: 485.0,
    blackBoxWarning: 'Risk of thrombotic events if discontinued.',
    commonSideEffects: ['Bleeding'],
    clinicalPearls: 'DOAC. No monitoring needed. Dose adjust CrCl <15.',
  },
  {
    ndcCode: '00069-0676-30',
    genericName: 'Rivaroxaban',
    brandName: 'Xarelto',
    strength: '20mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Anticoagulant',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Non-Preferred',
    awpPrice: 495.0,
    blackBoxWarning: 'Risk of thrombotic events if discontinued.',
    commonSideEffects: ['Bleeding'],
    clinicalPearls: 'DOAC. Take with evening meal. Renal dosing.',
  },

  // Bronchodilators
  {
    ndcCode: '00173-0682-00',
    genericName: 'Albuterol',
    brandName: 'ProAir HFA',
    strength: '90mcg',
    dosageForm: 'Aerosol',
    route: 'Inhalation',
    class: 'Bronchodilator',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 55.0,
    commonSideEffects: ['Tremor', 'Tachycardia', 'Nervousness'],
    clinicalPearls: 'Rescue inhaler. 2 puffs q4-6h PRN.',
  },
  {
    ndcCode: '00597-0075-41',
    genericName: 'Tiotropium',
    brandName: 'Spiriva',
    strength: '18mcg',
    dosageForm: 'Inhalation Powder',
    route: 'Inhalation',
    class: 'Bronchodilator',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Non-Preferred',
    awpPrice: 385.0,
    commonSideEffects: ['Dry mouth', 'Constipation'],
    clinicalPearls: 'Long-acting anticholinergic. COPD maintenance.',
  },

  // Corticosteroids
  {
    ndcCode: '00054-4117-25',
    genericName: 'Prednisone',
    brandName: 'Deltasone',
    strength: '20mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Corticosteroid',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 14.0,
    commonSideEffects: [
      'Hyperglycemia',
      'Osteoporosis',
      'Immunosuppression',
      'Weight gain',
    ],
    clinicalPearls: 'Taper if used >2 weeks. Monitor glucose.',
  },
  {
    ndcCode: '00173-0715-00',
    genericName: 'Fluticasone/Salmeterol',
    brandName: 'Advair Diskus',
    strength: '250/50mcg',
    dosageForm: 'Inhalation Powder',
    route: 'Inhalation',
    class: 'Corticosteroid',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Non-Preferred',
    awpPrice: 285.0,
    blackBoxWarning: 'Increased risk of asthma-related death.',
    commonSideEffects: ['Oral thrush', 'Hoarseness'],
    clinicalPearls: 'ICS/LABA combination. Rinse mouth after use.',
  },

  // Diuretics
  {
    ndcCode: '00378-0030-01',
    genericName: 'Furosemide',
    brandName: 'Lasix',
    strength: '40mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Diuretic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 8.5,
    commonSideEffects: ['Hypokalemia', 'Ototoxicity', 'Dehydration'],
    clinicalPearls: 'Loop diuretic. Monitor electrolytes. Take in AM.',
  },
  {
    ndcCode: '00378-6125-77',
    genericName: 'Hydrochlorothiazide',
    brandName: 'Microzide',
    strength: '25mg',
    dosageForm: 'Capsule',
    route: 'Oral',
    class: 'Diuretic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 10.0,
    commonSideEffects: ['Hypokalemia', 'Hyperglycemia', 'Photosensitivity'],
    clinicalPearls: 'Thiazide diuretic. First-line HTN. Monitor K+.',
  },
  {
    ndcCode: '00093-7271-56',
    genericName: 'Spironolactone',
    brandName: 'Aldactone',
    strength: '25mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Diuretic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 18.0,
    commonSideEffects: ['Hyperkalemia', 'Gynecomastia'],
    clinicalPearls: 'Potassium-sparing. Monitor K+. HFrEF benefit.',
  },

  // Anticonvulsants
  {
    ndcCode: '00093-5059-01',
    genericName: 'Levetiracetam',
    brandName: 'Keppra',
    strength: '500mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Anticonvulsant',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 32.0,
    commonSideEffects: ['Somnolence', 'Irritability', 'Dizziness'],
    clinicalPearls: 'Broad-spectrum AED. Minimal drug interactions.',
  },
  {
    ndcCode: '00071-0537-24',
    genericName: 'Gabapentin',
    brandName: 'Neurontin',
    strength: '300mg',
    dosageForm: 'Capsule',
    route: 'Oral',
    class: 'Anticonvulsant',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 18.0,
    commonSideEffects: ['Dizziness', 'Somnolence', 'Peripheral edema'],
    clinicalPearls: 'Neuropathic pain and seizures. Renal dosing.',
  },

  // PPIs
  {
    ndcCode: '00093-7347-56',
    genericName: 'Omeprazole',
    brandName: 'Prilosec',
    strength: '20mg',
    dosageForm: 'Delayed-Release Capsule',
    route: 'Oral',
    class: 'Analgesic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 12.0,
    commonSideEffects: ['Headache', 'Diarrhea', 'C. diff risk'],
    clinicalPearls: 'PPI. Take 30 min before breakfast. Long-term risks.',
  },
  {
    ndcCode: '00093-7347-98',
    genericName: 'Pantoprazole',
    brandName: 'Protonix',
    strength: '40mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    class: 'Analgesic',
    deaSchedule: 'Non-Controlled',
    formularyStatus: 'Preferred',
    awpPrice: 14.0,
    commonSideEffects: ['Headache', 'Diarrhea'],
    clinicalPearls: 'PPI. Fewer drug interactions than omeprazole.',
  },
]

// Generate sample prescriptions
export function generatePrescriptions(count: number = 100): Prescription[] {
  const prescriptions: Prescription[] = []
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
    'Joseph',
    'Jessica',
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
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
  ]
  const prescribers = [
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Emily Williams',
    'Dr. David Martinez',
    'Dr. Lisa Anderson',
    'Dr. James Thompson',
  ]
  const indications = {
    Antibiotic: ['UTI', 'Pneumonia', 'Sinusitis', 'Skin infection', 'Bronchitis'],
    Analgesic: ['Pain', 'Headache', 'Arthritis', 'Post-op pain', 'Chronic pain'],
    Antihypertensive: ['Hypertension', 'Heart failure', 'Post-MI'],
    Antidiabetic: ['Type 2 Diabetes', 'Type 1 Diabetes'],
    'Lipid-Lowering': ['Hyperlipidemia', 'CAD prevention', 'Post-MI'],
    Antidepressant: ['Major depression', 'Anxiety', 'PTSD'],
    Anticoagulant: ['Atrial fibrillation', 'DVT prophylaxis', 'PE'],
    Bronchodilator: ['Asthma', 'COPD'],
    Corticosteroid: [
      'Asthma exacerbation',
      'Allergic reaction',
      'Inflammatory condition',
    ],
    Diuretic: ['Heart failure', 'Edema', 'Hypertension'],
    Anticonvulsant: ['Epilepsy', 'Neuropathic pain', 'Migraine prophylaxis'],
  }

  const statuses: PrescriptionStatus[] = [
    'Pending',
    'Verified',
    'Dispensed',
    'Completed',
  ]

  for (let i = 0; i < count; i++) {
    const medication = formulary[Math.floor(Math.random() * formulary.length)]
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const prescriber = prescribers[Math.floor(Math.random() * prescribers.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    const writtenDate = new Date()
    writtenDate.setDate(writtenDate.getDate() - Math.floor(Math.random() * 30))

    const indicationList =
      indications[medication.class as keyof typeof indications] || ['General']
    const indication =
      indicationList[Math.floor(Math.random() * indicationList.length)]

    const daysSupply = [7, 14, 30, 60, 90][Math.floor(Math.random() * 5)]
    const refills = medication.deaSchedule === 'II' ? 0 : Math.floor(Math.random() * 6)

    const directions = generateDirections(medication)
    const quantity = calculateQuantity(medication, directions, daysSupply)

    const prescription: Prescription = {
      id: `RX-${String(i + 1).padStart(6, '0')}`,
      rxNumber: `RX${Math.floor(Math.random() * 9000000) + 1000000}`,
      patientId: `PT-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
      patientName: `${firstName} ${lastName}`,
      patientMRN: `MRN${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`,
      patientDOB: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/${1940 + Math.floor(Math.random() * 60)}`,
      medication,
      prescribedBy: prescriber,
      prescriberNPI: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      prescriberDEA:
        medication.deaSchedule !== 'Non-Controlled'
          ? `A${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000000) + 1000000}`
          : undefined,
      indication,
      directions,
      quantity,
      refills,
      daysSupply,
      status,
      writtenDate: writtenDate.toISOString(),
      fillDate:
        status !== 'Pending' && status !== 'Cancelled'
          ? new Date(writtenDate.getTime() + Math.random() * 86400000).toISOString()
          : undefined,
      priorAuthRequired: medication.formularyStatus === 'Non-Preferred',
      priorAuthStatus:
        medication.formularyStatus === 'Non-Preferred'
          ? Math.random() > 0.5
            ? 'Approved'
            : 'Pending'
          : undefined,
    }

    prescriptions.push(prescription)
  }

  return prescriptions.sort(
    (a, b) => new Date(b.writtenDate).getTime() - new Date(a.writtenDate).getTime()
  )
}

function generateDirections(medication: Medication): string {
  const templates = {
    Oral: [
      'Take 1 tablet by mouth twice daily',
      'Take 1 tablet by mouth three times daily',
      'Take 1 tablet by mouth once daily',
      'Take 2 tablets by mouth twice daily',
      'Take 1 tablet by mouth at bedtime',
      'Take 1 tablet by mouth every 12 hours',
    ],
    IV: ['Infuse 500mg IV every 8 hours', 'Infuse 1g IV every 12 hours'],
    IM: ['Inject 50mg IM once weekly', 'Inject 100mg IM every 4 weeks'],
    SC: [
      'Inject 10 units SC once daily',
      'Inject 0.5mL SC twice daily',
      'Inject SC once daily at bedtime',
    ],
    Inhalation: [
      'Inhale 2 puffs twice daily',
      'Inhale 1 puff as needed every 4-6 hours',
      'Inhale 1 capsule once daily',
    ],
    Topical: [
      'Apply thin layer to affected area twice daily',
      'Apply to affected area three times daily',
    ],
  }

  const routeTemplates =
    templates[medication.route as keyof typeof templates] || templates.Oral
  return routeTemplates[Math.floor(Math.random() * routeTemplates.length)]
}

function calculateQuantity(
  medication: Medication,
  directions: string,
  daysSupply: number
): number {
  // Extract frequency from directions
  let dailyDoses = 1
  if (directions.includes('twice daily')) dailyDoses = 2
  else if (directions.includes('three times daily')) dailyDoses = 3
  else if (directions.includes('four times daily')) dailyDoses = 4
  else if (directions.includes('every 12 hours')) dailyDoses = 2
  else if (directions.includes('every 8 hours')) dailyDoses = 3
  else if (directions.includes('every 6 hours')) dailyDoses = 4

  // Extract quantity per dose
  let perDose = 1
  if (directions.includes('2 tablets') || directions.includes('2 puffs')) perDose = 2
  else if (directions.includes('3 tablets')) perDose = 3

  return dailyDoses * perDose * daysSupply
}

export function calculatePharmacyStats(prescriptions: Prescription[]): PharmacyStats {
  const now = new Date()

  return {
    totalPrescriptions: prescriptions.length,
    pendingVerification: prescriptions.filter((p) => p.status === 'Pending').length,
    readyToDispense: prescriptions.filter((p) => p.status === 'Verified').length,
    awaitingRefill: prescriptions.filter((p) => {
      if (!p.nextRefillDate || p.refills === 0) return false
      return new Date(p.nextRefillDate) <= now
    }).length,
    priorAuthNeeded: prescriptions.filter(
      (p) => p.priorAuthRequired && p.priorAuthStatus === 'Pending'
    ).length,
    controlledSubstances: prescriptions.filter(
      (p) => p.medication.deaSchedule !== 'Non-Controlled'
    ).length,
    averageProcessingTime: 18, // minutes
  }
}

// Sample data for UI
export const samplePrescriptions = generatePrescriptions(150)

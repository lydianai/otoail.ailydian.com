/**
 * Radiology & PACS Data Service
 * Picture Archiving and Communication System
 * Imaging orders, DICOM integration, radiology reports for US hospitals
 */

export type ImagingModality =
  | 'X-Ray'
  | 'CT'
  | 'MRI'
  | 'Ultrasound'
  | 'Mammography'
  | 'PET'
  | 'Nuclear Medicine'
  | 'Fluoroscopy'
  | 'Bone Density'

export type StudyStatus =
  | 'Scheduled'
  | 'In Progress'
  | 'Completed'
  | 'Preliminary Read'
  | 'Final Read'
  | 'Cancelled'
  | 'Critical'

export type StudyPriority = 'STAT' | 'Urgent' | 'Routine'

export type BodyPart =
  | 'Chest'
  | 'Abdomen'
  | 'Head'
  | 'Spine'
  | 'Pelvis'
  | 'Extremities'
  | 'Breast'
  | 'Heart'
  | 'Neck'
  | 'Full Body'

export interface ImagingStudy {
  id: string
  accessionNumber: string
  patientId: string
  patientName: string
  patientMRN: string
  patientDOB: string
  patientGender: 'M' | 'F' | 'O'
  modality: ImagingModality
  bodyPart: BodyPart
  studyDescription: string
  orderingPhysician: string
  orderingNPI: string
  priority: StudyPriority
  status: StudyStatus
  scheduledDate: string
  studyDate?: string
  completedDate?: string
  readDate?: string
  radiologist?: string
  radiologistNPI?: string
  technologist?: string
  indication: string
  clinicalHistory?: string
  contrast?: boolean
  contrastType?: string
  numberOfImages?: number
  findings?: string
  impression?: string
  criticalFindings?: string[]
  recommendations?: string[]
  comparisonStudies?: string[]
  dicomInstanceUID?: string
  pacsLocation?: string
}

export interface RadiologyStats {
  totalStudies: number
  scheduled: number
  inProgress: number
  pendingRead: number
  completed: number
  criticalFindings: number
  averageTAT: number // Turnaround time in hours
  studiesByModality: Record<ImagingModality, number>
}

// Common imaging protocols by modality
export const imagingProtocols: Record<ImagingModality, string[]> = {
  'X-Ray': [
    'Chest PA & Lateral',
    'Abdomen 2 Views',
    'Spine Complete',
    'Hand 3 Views',
    'Foot 3 Views',
    'Pelvis AP',
    'Shoulder 2 Views',
    'Knee 3 Views',
  ],
  CT: [
    'CT Head without Contrast',
    'CT Head with Contrast',
    'CT Chest with Contrast',
    'CT Abdomen/Pelvis with Contrast',
    'CT Angiography Chest',
    'CT Spine Cervical',
    'CT Spine Lumbar',
    'CT Pulmonary Embolism Protocol',
  ],
  MRI: [
    'MRI Brain without Contrast',
    'MRI Brain with & without Contrast',
    'MRI Spine Cervical',
    'MRI Spine Lumbar',
    'MRI Knee without Contrast',
    'MRI Shoulder without Contrast',
    'MRI Abdomen with Contrast',
    'MRI Pelvis with Contrast',
  ],
  Ultrasound: [
    'Ultrasound Abdomen Complete',
    'Ultrasound Pelvis',
    'Ultrasound OB',
    'Ultrasound Carotid Doppler',
    'Ultrasound Venous Doppler Lower Extremity',
    'Ultrasound Thyroid',
    'Ultrasound Renal',
    'Echocardiogram Complete',
  ],
  Mammography: [
    'Screening Mammogram',
    'Diagnostic Mammogram',
    'Mammogram with Ultrasound',
    'Tomosynthesis',
  ],
  PET: [
    'PET/CT Whole Body',
    'PET/CT Brain',
    'PET/CT Cardiac',
  ],
  'Nuclear Medicine': [
    'Bone Scan Whole Body',
    'Thyroid Scan',
    'Cardiac Stress Test',
    'Renal Scan',
    'Lung Ventilation/Perfusion',
  ],
  Fluoroscopy: [
    'Upper GI Series',
    'Barium Swallow',
    'Small Bowel Follow Through',
    'Barium Enema',
  ],
  'Bone Density': ['DEXA Scan Spine & Hip', 'DEXA Scan Forearm'],
}

// Generate sample radiology studies
export function generateRadiologyStudies(count: number = 150): ImagingStudy[] {
  const studies: ImagingStudy[] = []

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
  ]

  const physicians = [
    { name: 'Dr. Sarah Johnson', npi: '1234567890' },
    { name: 'Dr. Michael Chen', npi: '2345678901' },
    { name: 'Dr. Emily Williams', npi: '3456789012' },
    { name: 'Dr. David Martinez', npi: '4567890123' },
  ]

  const radiologists = [
    { name: 'Dr. Robert Anderson', npi: '5678901234' },
    { name: 'Dr. Lisa Thompson', npi: '6789012345' },
    { name: 'Dr. James Wilson', npi: '7890123456' },
  ]

  const indications: Record<ImagingModality, string[]> = {
    'X-Ray': ['Rule out fracture', 'Chest pain', 'Cough', 'Post-op check'],
    CT: ['Headache', 'Abdominal pain', 'Trauma', 'Pulmonary embolism', 'Stroke'],
    MRI: [
      'Back pain',
      'Knee pain',
      'Headache',
      'Neurological symptoms',
      'Tumor evaluation',
    ],
    Ultrasound: [
      'Abdominal pain',
      'Pregnancy',
      'DVT evaluation',
      'Thyroid nodule',
    ],
    Mammography: ['Screening', 'Breast lump', 'Follow-up'],
    PET: ['Cancer staging', 'Recurrence evaluation'],
    'Nuclear Medicine': ['Bone pain', 'Thyroid disorder', 'Cardiac evaluation'],
    Fluoroscopy: ['Dysphagia', 'GI symptoms'],
    'Bone Density': ['Osteoporosis screening'],
  }

  const statuses: StudyStatus[] = [
    'Scheduled',
    'In Progress',
    'Completed',
    'Preliminary Read',
    'Final Read',
  ]
  const priorities: StudyPriority[] = ['STAT', 'Urgent', 'Routine']
  const modalities = Object.keys(imagingProtocols) as ImagingModality[]

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const physician = physicians[Math.floor(Math.random() * physicians.length)]
    const modality = modalities[Math.floor(Math.random() * modalities.length)]
    const protocols = imagingProtocols[modality]
    const studyDescription = protocols[Math.floor(Math.random() * protocols.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const priority = priorities[Math.floor(Math.random() * priorities.length)]

    const scheduledDate = new Date()
    scheduledDate.setDate(scheduledDate.getDate() - Math.floor(Math.random() * 14))

    const study: ImagingStudy = {
      id: `RAD-${String(i + 1).padStart(6, '0')}`,
      accessionNumber: `ACC${Math.floor(Math.random() * 9000000) + 1000000}`,
      patientId: `PT-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
      patientName: `${firstName} ${lastName}`,
      patientMRN: `MRN${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`,
      patientDOB: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/${1940 + Math.floor(Math.random() * 60)}`,
      patientGender: Math.random() > 0.5 ? 'M' : 'F',
      modality,
      bodyPart: getBodyPartForStudy(studyDescription),
      studyDescription,
      orderingPhysician: physician.name,
      orderingNPI: physician.npi,
      priority,
      status,
      scheduledDate: scheduledDate.toISOString(),
      indication: indications[modality][
        Math.floor(Math.random() * indications[modality].length)
      ],
      contrast: modality === 'CT' || modality === 'MRI' ? Math.random() > 0.5 : false,
    }

    if (study.contrast) {
      study.contrastType = modality === 'CT' ? 'Iodinated' : 'Gadolinium'
    }

    if (
      status === 'Completed' ||
      status === 'Preliminary Read' ||
      status === 'Final Read'
    ) {
      const studyDate = new Date(scheduledDate)
      studyDate.setHours(studyDate.getHours() + Math.floor(Math.random() * 4))
      study.studyDate = studyDate.toISOString()
      study.completedDate = new Date(
        studyDate.getTime() + Math.random() * 3600000
      ).toISOString()
      study.numberOfImages = Math.floor(Math.random() * 500) + 50
      study.technologist = `Tech-${Math.floor(Math.random() * 20) + 1}`
      study.dicomInstanceUID = `1.2.840.${Math.floor(Math.random() * 900000) + 100000}`
      study.pacsLocation = `PACS-${Math.floor(Math.random() * 5) + 1}`
    }

    if (status === 'Preliminary Read' || status === 'Final Read') {
      const radiologist =
        radiologists[Math.floor(Math.random() * radiologists.length)]
      study.radiologist = radiologist.name
      study.radiologistNPI = radiologist.npi
      study.readDate = new Date(
        new Date(study.completedDate!).getTime() + Math.random() * 7200000
      ).toISOString()
      study.findings = generateFindings(modality, study.bodyPart)
      study.impression = generateImpression(modality)

      if (Math.random() > 0.92) {
        study.status = 'Critical'
        study.criticalFindings = [generateCriticalFinding(modality)]
      }

      if (Math.random() > 0.7) {
        study.recommendations = [generateRecommendation(modality)]
      }
    }

    studies.push(study)
  }

  return studies.sort(
    (a, b) =>
      new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
  )
}

function getBodyPartForStudy(description: string): BodyPart {
  if (description.includes('Chest') || description.includes('Lung'))
    return 'Chest'
  if (description.includes('Abdomen')) return 'Abdomen'
  if (description.includes('Head') || description.includes('Brain')) return 'Head'
  if (description.includes('Spine')) return 'Spine'
  if (description.includes('Pelvis')) return 'Pelvis'
  if (description.includes('Breast') || description.includes('Mammo'))
    return 'Breast'
  if (
    description.includes('Extremity') ||
    description.includes('Knee') ||
    description.includes('Shoulder')
  )
    return 'Extremities'
  if (description.includes('Heart') || description.includes('Cardiac'))
    return 'Heart'
  if (description.includes('Neck')) return 'Neck'
  return 'Chest'
}

function generateFindings(modality: ImagingModality, bodyPart: BodyPart): string {
  const findings: Record<string, string[]> = {
    'X-Ray Chest': [
      'Clear lungs bilaterally. No acute cardiopulmonary disease.',
      'Mild cardiomegaly. No acute infiltrate.',
      'Small right pleural effusion. Otherwise unremarkable.',
    ],
    'CT Head': [
      'No acute intracranial abnormality.',
      'Age-appropriate cerebral atrophy. No hemorrhage or mass.',
      'Chronic microvascular ischemic changes.',
    ],
    'MRI Spine': [
      'Mild degenerative changes at L4-L5 and L5-S1.',
      'No significant spinal stenosis or neural foraminal narrowing.',
      'Multilevel disc desiccation without significant herniation.',
    ],
  }

  const key = `${modality} ${bodyPart}`
  const options = findings[key] || [
    'Study within normal limits for age.',
    'No acute abnormality identified.',
  ]
  return options[Math.floor(Math.random() * options.length)]
}

function generateImpression(modality: ImagingModality): string {
  const impressions: Record<ImagingModality, string[]> = {
    'X-Ray': [
      'No acute cardiopulmonary disease.',
      'Mild degenerative changes.',
      'No fracture identified.',
    ],
    CT: [
      'No acute intracranial abnormality.',
      'No evidence of pulmonary embolism.',
      'Unremarkable CT examination.',
    ],
    MRI: [
      'Degenerative disc disease without significant stenosis.',
      'No acute abnormality.',
      'Findings consistent with age-related changes.',
    ],
    Ultrasound: [
      'Normal study.',
      'No significant abnormality detected.',
      'Findings as described above.',
    ],
    Mammography: [
      'BIRADS 1: Negative.',
      'BIRADS 2: Benign findings.',
      'BIRADS 0: Additional imaging recommended.',
    ],
    PET: [
      'No evidence of FDG-avid disease.',
      'Findings consistent with known malignancy.',
    ],
    'Nuclear Medicine': ['Normal study.', 'Findings as described.'],
    Fluoroscopy: ['Normal study.', 'No obstruction identified.'],
    'Bone Density': ['Normal bone density.', 'Osteopenia.'],
  }

  const options = impressions[modality] || ['Unremarkable examination.']
  return options[Math.floor(Math.random() * options.length)]
}

function generateCriticalFinding(modality: ImagingModality): string {
  const critical: Record<ImagingModality, string[]> = {
    'X-Ray': ['Pneumothorax', 'Free air under diaphragm'],
    CT: [
      'Acute intracranial hemorrhage',
      'Pulmonary embolism',
      'Aortic dissection',
      'Bowel perforation',
    ],
    MRI: ['Acute stroke', 'Spinal cord compression'],
    Ultrasound: ['Ruptured AAA', 'Ectopic pregnancy'],
    Mammography: ['Highly suspicious mass'],
    PET: ['Widespread metastatic disease'],
    'Nuclear Medicine': ['Myocardial infarction'],
    Fluoroscopy: ['Complete obstruction'],
    'Bone Density': [],
  }

  const options = critical[modality] || ['Significant abnormality']
  return options[Math.floor(Math.random() * options.length)]
}

function generateRecommendation(modality: ImagingModality): string {
  const recommendations = [
    'Clinical correlation recommended',
    'Follow-up imaging in 3-6 months',
    'Recommend MRI for further evaluation',
    'Suggest comparison with prior studies',
    'Consider CT with contrast',
  ]
  return recommendations[Math.floor(Math.random() * recommendations.length)]
}

export function calculateRadiologyStats(studies: ImagingStudy[]): RadiologyStats {
  const studiesByModality: Record<ImagingModality, number> = {
    'X-Ray': 0,
    CT: 0,
    MRI: 0,
    Ultrasound: 0,
    Mammography: 0,
    PET: 0,
    'Nuclear Medicine': 0,
    Fluoroscopy: 0,
    'Bone Density': 0,
  }

  studies.forEach((study) => {
    studiesByModality[study.modality]++
  })

  return {
    totalStudies: studies.length,
    scheduled: studies.filter((s) => s.status === 'Scheduled').length,
    inProgress: studies.filter((s) => s.status === 'In Progress').length,
    pendingRead: studies.filter((s) => s.status === 'Completed').length,
    completed: studies.filter(
      (s) => s.status === 'Final Read' || s.status === 'Preliminary Read'
    ).length,
    criticalFindings: studies.filter((s) => s.status === 'Critical').length,
    averageTAT: 4.5,
    studiesByModality,
  }
}

export const sampleRadiologyStudies = generateRadiologyStudies(150)

'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

import { useState } from 'react'
import {
  Scan, Search, Plus, User, Calendar, FileText, Shield, Image,
  Clock, Activity, CheckCircle2, AlertCircle, Eye, Download,
  Send, Filter, ChevronDown, PlayCircle, X, Zap, TrendingUp,
  Printer, Copy, CheckSquare, Square, ZoomIn, ZoomOut,
  RotateCw, Maximize2, Move, Contrast, Mic, Brain, Stethoscope
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// US Radiology Imaging Studies with CPT Codes
const IMAGING_STUDIES = {
  'X-RAY': [
    'Chest X-Ray PA (CPT 71045)',
    'Chest X-Ray PA & Lateral (CPT 71046)',
    'Chest X-Ray 3 Views (CPT 71047)',
    'Cervical Spine X-Ray (CPT 72040)',
    'Thoracic Spine X-Ray (CPT 72070)',
    'Lumbar Spine X-Ray (CPT 72100)',
    'Hand X-Ray (CPT 73130)',
    'Wrist X-Ray (CPT 73100)',
    'Knee X-Ray (CPT 73560)',
    'Hip X-Ray (CPT 73520)',
    'Shoulder X-Ray (CPT 73030)',
    'Elbow X-Ray (CPT 73080)',
    'Ankle X-Ray (CPT 73600)',
    'Abdomen X-Ray Supine (CPT 74018)',
    'Abdomen X-Ray Upright (CPT 74019)',
    'Pelvis X-Ray (CPT 72170)',
    'Skull X-Ray (CPT 70250)',
    'Sinus X-Ray (CPT 70220)',
    'Soft Tissue Neck (CPT 70360)',
    'Rib Cage X-Ray (CPT 71100)',
  ],
  'CT': [
    'CT Head without Contrast (CPT 70450)',
    'CT Head with Contrast (CPT 70460)',
    'CT Angiography Brain (CPT 70496)',
    'CT Sinuses (CPT 70486)',
    'CT Neck with Contrast (CPT 70491)',
    'CT Chest without Contrast (CPT 71250)',
    'CT Chest with Contrast (CPT 71260)',
    'CT Abdomen without Contrast (CPT 74150)',
    'CT Abdomen with Contrast (CPT 74160)',
    'CT Pelvis with Contrast (CPT 72193)',
    'CT Abdomen/Pelvis with Contrast (CPT 74177)',
    'CT Angiography Coronary (CPT 75574)',
    'CT Pulmonary Angiography (CPT 71275)',
    'CT Colonography (CPT 74263)',
    'CT Lumbar Spine (CPT 72132)',
    'CT Cervical Spine (CPT 72125)',
  ],
  'MRI': [
    'MRI Brain without Contrast (CPT 70551)',
    'MRI Brain with & without Contrast (CPT 70553)',
    'MR Angiography Brain (CPT 70544)',
    'MRI Pituitary (CPT 70551)',
    'MRI Cervical Spine (CPT 72141)',
    'MRI Thoracic Spine (CPT 72146)',
    'MRI Lumbar Spine (CPT 72148)',
    'MRI Shoulder (CPT 73221)',
    'MRI Knee (CPT 73721)',
    'MRI Hip (CPT 73721)',
    'MRI Foot & Ankle (CPT 73721)',
    'MRI Abdomen (CPT 74181)',
    'MRI Pelvis (CPT 72195)',
    'MRI Prostate Multiparametric (CPT 72197)',
    'MRI Cardiac (CPT 75557)',
    'MRI Breast Bilateral (CPT 77059)',
  ],
  'ULTRASOUND': [
    'US Abdomen Complete (CPT 76700)',
    'US Abdomen Limited (CPT 76705)',
    'US Pelvis Transvaginal (CPT 76830)',
    'US Thyroid (CPT 76536)',
    'US Soft Tissue Neck (CPT 76536)',
    'US Breast Unilateral (CPT 76641)',
    'US Scrotal (CPT 76870)',
    'US Obstetric Complete (CPT 76805)',
    'US Doppler Arterial (CPT 93880)',
    'US Doppler Venous (CPT 93970)',
    'US Renal (CPT 76770)',
    'US Carotid Duplex (CPT 93880)',
  ],
  'NUCLEAR MEDICINE': [
    'PET/CT Whole Body (CPT 78815)',
    'Bone Scan (CPT 78306)',
    'Cardiac Stress Test (CPT 78452)',
    'Thyroid Uptake & Scan (CPT 78006)',
    'Liver/Spleen Scan (CPT 78215)',
    'Lung Ventilation/Perfusion (CPT 78580)',
    'Renal Scan (CPT 78700)',
  ],
  'INTERVENTIONAL': [
    'Mammography Screening (CPT 77067)',
    'Mammography Diagnostic (CPT 77066)',
    'DEXA Bone Density (CPT 77080)',
    'Fluoroscopy (CPT 76000)',
    'Arteriography (CPT 75630)',
    'Myelography (CPT 72240)',
    'Breast Biopsy Stereotactic (CPT 19081)',
  ]
}

// US Radiology Report Templates with RadLex Terminology
const REPORT_TEMPLATES = [
  {
    id: 'normal-chest',
    name: 'Normal Chest X-Ray',
    cptCode: 'CPT 71046',
    findings: 'The lungs are clear bilaterally without focal consolidation, pleural effusion, or pneumothorax. The cardiac silhouette is normal in size and configuration. The cardiothoracic ratio is within normal limits. The pulmonary vasculature appears normal. No acute osseous abnormality is identified. The visualized soft tissues are unremarkable.',
    impression: 'No acute cardiopulmonary process.',
    recommendations: 'Clinical correlation recommended. No further imaging indicated at this time.'
  },
  {
    id: 'normal-brain-ct',
    name: 'Normal CT Head',
    cptCode: 'CPT 70450',
    findings: 'There is no evidence of acute intracranial hemorrhage, mass effect, or midline shift. The ventricles and sulci are normal in size and configuration for patient age. Gray-white matter differentiation is preserved. No acute territorial infarction is identified. The visualized paranasal sinuses and mastoid air cells are well-aerated.',
    impression: 'No acute intracranial abnormality.',
    recommendations: 'Clinical correlation recommended.'
  },
  {
    id: 'normal-brain-mri',
    name: 'Normal MRI Brain',
    cptCode: 'CPT 70551',
    findings: 'No evidence of acute or chronic ischemic changes. No areas of restricted diffusion to suggest acute infarction. The ventricles and extra-axial CSF spaces are age-appropriate. No abnormal parenchymal or leptomeningeal enhancement. The major intracranial vascular flow voids are preserved. No mass lesion or abnormal signal intensity identified.',
    impression: 'Normal MRI brain examination.',
    recommendations: 'Clinical follow-up as indicated.'
  },
  {
    id: 'pneumonia',
    name: 'Community-Acquired Pneumonia',
    cptCode: 'CPT 71046',
    findings: 'There is a focal consolidation in the right lower lobe with air bronchograms, consistent with pneumonia. The left lung is clear. No pleural effusion or pneumothorax is identified. The cardiac silhouette is normal in size.',
    impression: 'Right lower lobe pneumonia. CRITICAL FINDING - Notified Dr. [Ordering Physician] at [Time] via secure messaging.',
    recommendations: 'Antibiotic therapy recommended. Follow-up chest radiograph in 6-8 weeks to document resolution and exclude underlying mass lesion.'
  },
  {
    id: 'pleural-effusion',
    name: 'Pleural Effusion',
    cptCode: 'CPT 71046',
    findings: 'Moderate right-sided pleural effusion with blunting of the costophrenic angle. The left hemithorax is clear. The cardiac silhouette appears normal in size. No pneumothorax identified.',
    impression: 'Moderate right pleural effusion.',
    recommendations: 'Clinical correlation recommended. Consider thoracentesis for diagnostic and/or therapeutic purposes if clinically indicated. Recommend CT chest if etiology unclear or if malignancy is a concern.'
  },
  {
    id: 'subdural-hematoma',
    name: 'Acute Subdural Hematoma',
    cptCode: 'CPT 70450',
    findings: 'Acute left frontoparietal subdural hematoma measuring approximately 8 mm in maximal thickness with associated 4 mm rightward midline shift. Mass effect on the left lateral ventricle is noted. No additional intracranial hemorrhage identified.',
    impression: 'Acute left subdural hematoma with mass effect and midline shift. CRITICAL FINDING - Stat notification to Dr. [Ordering Physician] at [Time] via phone call.',
    recommendations: 'STAT neurosurgical consultation recommended for possible surgical intervention.'
  },
  {
    id: 'brain-infarct',
    name: 'Acute Ischemic Stroke',
    cptCode: 'CPT 70551',
    findings: 'Area of restricted diffusion in the left MCA territory consistent with acute ischemic infarction. Corresponding low signal on ADC map confirms acute stroke. ASPECTS score 8. No hemorrhagic transformation identified. MRA demonstrates left M1 occlusion.',
    impression: 'Acute left MCA territory infarction with vessel occlusion. CRITICAL FINDING - Stat notification to Stroke Team at [Time].',
    recommendations: 'STAT neurology consultation. Consider thrombectomy if within treatment window. Time is brain - urgent intervention recommended.'
  },
  {
    id: 'herniated-disc',
    name: 'Lumbar Disc Herniation',
    cptCode: 'CPT 72148',
    findings: 'At L4-L5, there is a moderate-sized left posterolateral disc herniation with compression of the left L5 nerve root within the lateral recess. There is moderate central canal stenosis. The remaining disc levels show age-appropriate degenerative changes without significant stenosis.',
    impression: 'L4-L5 left posterolateral disc herniation with left L5 nerve root impingement.',
    recommendations: 'Orthopedic spine or neurosurgical consultation recommended. Consider epidural steroid injection or surgical evaluation based on clinical symptoms.'
  },
  {
    id: 'cholecystitis',
    name: 'Acute Cholecystitis',
    cptCode: 'CPT 76705',
    findings: 'Gallbladder wall thickening measuring 5 mm with pericholecystic fluid. Multiple shadowing gallstones present within the gallbladder lumen. Positive sonographic Murphy sign. No intra- or extrahepatic biliary ductal dilatation. The common bile duct measures 4 mm.',
    impression: 'Findings consistent with acute cholecystitis.',
    recommendations: 'Surgical consultation recommended. Consider HIDA scan if diagnosis uncertain.'
  },
  {
    id: 'renal-calculus',
    name: 'Nephrolithiasis',
    cptCode: 'CPT 74177',
    findings: 'A 6 mm calculus in the right lower pole calyx with mild hydronephrosis. The left kidney is unremarkable. No perinephric stranding or fluid collection to suggest pyelonephritis.',
    impression: 'Right renal calculus with mild hydronephrosis.',
    recommendations: 'Urology consultation recommended. Medical expulsive therapy may be considered for stones <10mm. Adequate hydration and pain control. Follow-up imaging to confirm passage.'
  },
  {
    id: 'appendicitis',
    name: 'Acute Appendicitis',
    cptCode: 'CPT 74177',
    findings: 'Dilated appendix measuring 10 mm in diameter with wall thickening and periappendiceal inflammatory changes. Appendicolith identified. No evidence of perforation or abscess formation.',
    impression: 'Acute appendicitis. CRITICAL FINDING - Notified surgical service at [Time].',
    recommendations: 'STAT surgical consultation for appendectomy.'
  },
  {
    id: 'fracture',
    name: 'Distal Radius Fracture',
    cptCode: 'CPT 73100',
    findings: 'Oblique fracture through the distal radial metaphysis (Colles-type fracture) with minimal dorsal angulation. No significant displacement. The articular surface appears intact. The distal ulna is unremarkable.',
    impression: 'Minimally displaced distal radius fracture (Colles type).',
    recommendations: 'Orthopedic consultation for immobilization vs. reduction. Follow-up radiographs in 7-10 days to assess alignment.'
  },
  {
    id: 'normal-usg-abdomen',
    name: 'Normal Abdomen Ultrasound',
    cptCode: 'CPT 76700',
    findings: 'The liver is normal in size and echogenicity with homogeneous parenchyma. No focal hepatic lesion. Intrahepatic bile ducts are not dilated. Portal vein is patent with normal flow. Gallbladder is normal without stones or wall thickening. Pancreas and spleen are unremarkable. Both kidneys are normal in size and echogenicity.',
    impression: 'Normal upper abdominal ultrasound.',
    recommendations: 'No further imaging indicated.'
  },
  {
    id: 'hepatomegaly',
    name: 'Hepatomegaly with Steatosis',
    cptCode: 'CPT 76700',
    findings: 'Hepatomegaly with craniocaudal dimension of 18 cm. Increased hepatic echogenicity consistent with hepatic steatosis (fatty liver). No focal mass lesion. Portal vein is mildly dilated at 14 mm but demonstrates normal hepatopetal flow. No ascites.',
    impression: 'Hepatomegaly with findings consistent with hepatic steatosis.',
    recommendations: 'Clinical correlation with liver function tests recommended. Consider hepatitis panel. Lifestyle modifications (weight loss, dietary changes) recommended. Follow-up ultrasound in 6-12 months.'
  },
  {
    id: 'pulmonary-embolism',
    name: 'Pulmonary Embolism',
    cptCode: 'CPT 71275',
    findings: 'Large filling defects within the right main pulmonary artery extending into segmental branches, consistent with acute pulmonary embolism. Right ventricular dilation with RV/LV ratio of 1.2, suggesting right heart strain. No evidence of pulmonary infarction.',
    impression: 'Acute pulmonary embolism with evidence of right heart strain. CRITICAL FINDING - STAT notification to Dr. [Ordering Physician] at [Time] via phone.',
    recommendations: 'IMMEDIATE anticoagulation therapy recommended. Cardiology/pulmonology consultation. Consider ICU admission for monitoring. Assess for DVT with lower extremity venous duplex.'
  },
  {
    id: 'mammography-birads2',
    name: 'Benign Mammography Finding',
    cptCode: 'CPT 77067',
    findings: 'Scattered fibroglandular densities (ACR Breast Density Category B). Bilateral benign-appearing calcifications. No suspicious mass, architectural distortion, or asymmetry identified.',
    impression: 'BI-RADS 2: Benign finding. Recommend routine annual screening mammography.',
    recommendations: 'Return for routine annual screening in 12 months.'
  }
]

// US Radiologist and Physician Names
const SAMPLE_PATIENTS = [
  { id: 'MRN001', name: 'Robert Wilson', ssn: '***-**-6789', age: 45, gender: 'M', insurance: 'Blue Cross Blue Shield' },
  { id: 'MRN002', name: 'Mary Smith', ssn: '***-**-4321', age: 32, gender: 'F', insurance: 'Aetna PPO' },
  { id: 'MRN003', name: 'Patricia Johnson', ssn: '***-**-8901', age: 67, gender: 'F', insurance: 'Medicare' },
  { id: 'MRN004', name: 'John Lewis', ssn: '***-**-2345', age: 28, gender: 'M', insurance: 'UnitedHealthcare' },
  { id: 'MRN005', name: 'Jennifer Anderson', ssn: '***-**-6789', age: 54, gender: 'F', insurance: 'Cigna' },
  { id: 'MRN006', name: 'Michael Martinez', ssn: '***-**-4567', age: 71, gender: 'M', insurance: 'Medicare Advantage' },
  { id: 'MRN007', name: 'Sarah Brown', ssn: '***-**-7890', age: 39, gender: 'F', insurance: 'Humana' },
  { id: 'MRN008', name: 'James Clark', ssn: '***-**-3456', age: 62, gender: 'M', insurance: 'Kaiser Permanente' },
]

const SAMPLE_DOCTORS = [
  'Dr. Daniel Rodriguez, MD (Cardiology)',
  'Dr. Emily Garcia, MD (Pulmonology)',
  'Dr. Jonathan Miller, MD (Neurology)',
  'Dr. Nancy Thomas, DO (Orthopedic Surgery)',
  'Dr. Rachel Martinez, MD (Internal Medicine)',
  'Dr. Brian White, MD (Emergency Medicine)',
  'Dr. Jessica Young, MD (General Surgery)',
  'Dr. Mark Davis, MD (Urology)',
  'Dr. Lisa Chen, MD (Oncology)',
  'Dr. Robert Taylor, MD (Family Medicine)',
]

const RADIOLOGISTS = [
  'Dr. Elizabeth Harrington, MD (Neuroradiology)',
  'Dr. William Anderson, MD (Musculoskeletal Radiology)',
  'Dr. Sarah Mitchell, MD (Body Imaging)',
  'Dr. David Thompson, MD (Interventional Radiology)',
  'Dr. Jennifer Roberts, MD (Breast Imaging)',
  'Dr. Michael Chang, MD (Cardiothoracic Imaging)',
]

type StudyStatus = 'Scheduled' | 'In Progress' | 'Pending Report' | 'Final'

interface Study {
  id: string
  accessionNumber: string
  patientName: string
  patientId: string
  studyType: string
  bodyRegion: string
  indication: string
  status: StudyStatus
  priority: 'Routine' | 'STAT'
  orderingPhysician: string
  scheduledTime: string
  completedTime?: string
  previousStudies?: number
  radiologist?: string
  contrastUsed?: boolean
  radiationDose?: string
}

// Sample PACS Worklist Data
const SAMPLE_STUDIES: Study[] = [
  {
    id: 'STU001',
    accessionNumber: 'ACC-2025-001234',
    patientName: 'Robert Wilson',
    patientId: 'MRN001',
    studyType: 'CT Head without Contrast (CPT 70450)',
    bodyRegion: 'Head',
    indication: 'Severe headache, nausea, rule out intracranial hemorrhage',
    status: 'Final',
    priority: 'Routine',
    orderingPhysician: 'Dr. Jonathan Miller, MD (Neurology)',
    scheduledTime: '2025-12-23 08:30',
    completedTime: '2025-12-23 09:15',
    previousStudies: 2,
    radiologist: 'Dr. Elizabeth Harrington, MD',
    contrastUsed: false,
    radiationDose: '52 mGy'
  },
  {
    id: 'STU002',
    accessionNumber: 'ACC-2025-001235',
    patientName: 'Mary Smith',
    patientId: 'MRN002',
    studyType: 'Chest X-Ray PA & Lateral (CPT 71046)',
    bodyRegion: 'Chest',
    indication: 'Cough, fever, shortness of breath - r/o pneumonia',
    status: 'Pending Report',
    priority: 'STAT',
    orderingPhysician: 'Dr. Brian White, MD (Emergency Medicine)',
    scheduledTime: '2025-12-23 09:00',
    completedTime: '2025-12-23 09:20',
    previousStudies: 0,
    radiologist: 'Dr. Michael Chang, MD',
    contrastUsed: false,
    radiationDose: '0.02 mSv'
  },
  {
    id: 'STU003',
    accessionNumber: 'ACC-2025-001236',
    patientName: 'Patricia Johnson',
    patientId: 'MRN003',
    studyType: 'MRI Lumbar Spine (CPT 72148)',
    bodyRegion: 'Lumbar Spine',
    indication: 'Chronic lower back pain with radiculopathy to left leg',
    status: 'In Progress',
    priority: 'Routine',
    orderingPhysician: 'Dr. Nancy Thomas, DO (Orthopedic Surgery)',
    scheduledTime: '2025-12-23 10:00',
    previousStudies: 3,
    radiologist: 'Dr. William Anderson, MD',
    contrastUsed: false
  },
  {
    id: 'STU004',
    accessionNumber: 'ACC-2025-001237',
    patientName: 'John Lewis',
    patientId: 'MRN004',
    studyType: 'US Abdomen Complete (CPT 76700)',
    bodyRegion: 'Abdomen',
    indication: 'Right upper quadrant pain, elevated liver enzymes',
    status: 'Scheduled',
    priority: 'Routine',
    orderingPhysician: 'Dr. Rachel Martinez, MD (Internal Medicine)',
    scheduledTime: '2025-12-23 11:00',
    previousStudies: 1,
    contrastUsed: false
  },
  {
    id: 'STU005',
    accessionNumber: 'ACC-2025-001238',
    patientName: 'Jennifer Anderson',
    patientId: 'MRN005',
    studyType: 'Mammography Screening (CPT 77067)',
    bodyRegion: 'Breast',
    indication: 'Annual screening mammography',
    status: 'Scheduled',
    priority: 'Routine',
    orderingPhysician: 'Dr. Jessica Young, MD (General Surgery)',
    scheduledTime: '2025-12-23 11:30',
    previousStudies: 2,
    radiologist: 'Dr. Jennifer Roberts, MD',
    contrastUsed: false
  },
  {
    id: 'STU006',
    accessionNumber: 'ACC-2025-001239',
    patientName: 'Michael Martinez',
    patientId: 'MRN006',
    studyType: 'CT Chest with Contrast (CPT 71260)',
    bodyRegion: 'Chest',
    indication: 'Lung mass on chest X-ray, staging for suspected malignancy',
    status: 'Pending Report',
    priority: 'STAT',
    orderingPhysician: 'Dr. Emily Garcia, MD (Pulmonology)',
    scheduledTime: '2025-12-23 09:30',
    completedTime: '2025-12-23 10:45',
    previousStudies: 5,
    radiologist: 'Dr. Michael Chang, MD',
    contrastUsed: true,
    radiationDose: '8.5 mSv'
  },
  {
    id: 'STU007',
    accessionNumber: 'ACC-2025-001240',
    patientName: 'Sarah Brown',
    patientId: 'MRN007',
    studyType: 'MRI Knee (CPT 73721)',
    bodyRegion: 'Knee',
    indication: 'Suspected meniscal tear, knee pain after sports injury',
    status: 'Final',
    priority: 'Routine',
    orderingPhysician: 'Dr. Nancy Thomas, DO (Orthopedic Surgery)',
    scheduledTime: '2025-12-23 08:00',
    completedTime: '2025-12-23 08:45',
    previousStudies: 0,
    radiologist: 'Dr. William Anderson, MD',
    contrastUsed: false
  },
  {
    id: 'STU008',
    accessionNumber: 'ACC-2025-001241',
    patientName: 'James Clark',
    patientId: 'MRN008',
    studyType: 'CT Angiography Coronary (CPT 75574)',
    bodyRegion: 'Heart',
    indication: 'Chest pain, rule out coronary artery disease',
    status: 'In Progress',
    priority: 'STAT',
    orderingPhysician: 'Dr. Daniel Rodriguez, MD (Cardiology)',
    scheduledTime: '2025-12-23 10:30',
    previousStudies: 1,
    radiologist: 'Dr. Michael Chang, MD',
    contrastUsed: true
  },
]

export default function RadiologyPage() {
  const [activeTab, setActiveTab] = useState<'worklist' | 'newOrder' | 'viewer' | 'reporting'>('worklist')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<typeof SAMPLE_PATIENTS[0] | null>(null)
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null)
  const [selectedStudyCategory, setSelectedStudyCategory] = useState<string>('')
  const [selectedStudyType, setSelectedStudyType] = useState<string>('')
  const [bodyRegion, setBodyRegion] = useState('')
  const [clinicalIndication, setClinicalIndication] = useState('')
  const [selectedPhysician, setSelectedPhysician] = useState('')
  const [isPriority, setIsPriority] = useState(false)
  const [notifyPhysician, setNotifyPhysician] = useState(true)
  const [findings, setFindings] = useState('')
  const [impression, setImpression] = useState('')
  const [recommendations, setRecommendations] = useState('')
  const [filterStatus, setFilterStatus] = useState<StudyStatus | 'All'>('All')
  const [filterStudyType, setFilterStudyType] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [contrastAllergy, setContrastAllergy] = useState(false)
  const [selectedRadiologist, setSelectedRadiologist] = useState('')
  const [voiceDictation, setVoiceDictation] = useState(false)

  const stats = {
    totalToday: SAMPLE_STUDIES.length,
    pending: SAMPLE_STUDIES.filter(s => s.status === 'Scheduled' || s.status === 'In Progress').length,
    completed: SAMPLE_STUDIES.filter(s => s.status === 'Final').length,
    stat: SAMPLE_STUDIES.filter(s => s.priority === 'STAT').length,
    avgTurnaround: '28 min',
    reporting: SAMPLE_STUDIES.filter(s => s.status === 'Pending Report').length,
  }

  const filteredPatients = SAMPLE_PATIENTS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.ssn.includes(searchTerm) ||
    p.id.includes(searchTerm)
  )

  const filteredStudies = SAMPLE_STUDIES.filter(s => {
    if (filterStatus !== 'All' && s.status !== filterStatus) return false
    if (filterStudyType && s.studyType !== filterStudyType) return false
    return true
  })

  const handlePatientSelect = (patient: typeof SAMPLE_PATIENTS[0]) => {
    setSelectedPatient(patient)
    setSearchTerm('')
  }

  const handleCreateOrder = () => {
    if (!selectedPatient || !selectedStudyType || !bodyRegion || !clinicalIndication || !selectedPhysician) {
      alert('Please complete all required fields')
      return
    }

    // Check for contrast allergy protocols
    if (selectedStudyType.includes('Contrast') && contrastAllergy) {
      alert('⚠️ CONTRAST ALLERGY ALERT - Patient flagged for contrast allergy. Ensure premedication protocol (prednisone 50mg PO x 3 doses + diphenhydramine 50mg) has been completed.')
    }

    alert('✓ Imaging order created successfully! Order sent to PACS worklist via HL7 interface.')
    // Reset form
    setSelectedPatient(null)
    setSelectedStudyCategory('')
    setSelectedStudyType('')
    setBodyRegion('')
    setClinicalIndication('')
    setSelectedPhysician('')
    setIsPriority(false)
    setContrastAllergy(false)
    setActiveTab('worklist')
  }

  const handleApplyTemplate = (template: typeof REPORT_TEMPLATES[0]) => {
    setFindings(template.findings)
    setImpression(template.impression)
    setRecommendations(template.recommendations)
    setShowTemplates(false)
  }

  const handleSubmitReport = () => {
    if (!findings || !impression) {
      alert('Please complete Findings and Impression sections before submitting report')
      return
    }

    // Check if critical finding
    if (impression.toLowerCase().includes('critical') || impression.toLowerCase().includes('stat')) {
      alert('🔴 CRITICAL FINDING DETECTED - Report requires immediate physician notification within 30 minutes per ACR guidelines. HL7 message sent to ordering physician.')
    }

    alert(`✓ Radiology report finalized and signed by ${selectedRadiologist || 'attending radiologist'}. ${notifyPhysician ? 'Ordering physician notified via secure messaging.' : ''} Report available in EHR.`)
    setActiveTab('worklist')
  }

  const handleViewStudy = (study: Study) => {
    setSelectedStudy(study)
    setActiveTab('viewer')
  }

  const handleStartReporting = (study: Study) => {
    setSelectedStudy(study)
    setFindings('')
    setImpression('')
    setRecommendations('')
    setSelectedRadiologist(study.radiologist || '')
    setActiveTab('reporting')
  }

  const getStatusBadge = (status: StudyStatus) => {
    const variants = {
      'Scheduled': 'bg-blue-100 text-blue-700 border-blue-200',
      'In Progress': 'bg-purple-100 text-purple-700 border-purple-200',
      'Pending Report': 'bg-orange-100 text-orange-700 border-orange-200',
      'Final': 'bg-green-100 text-green-700 border-green-200',
    }
    return variants[status]
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
                  <Scan className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Radiology Management
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">PACS Integration • DICOM Viewer • HL7 Interface • Epic Radiant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setActiveTab('worklist')}
                className={cn(activeTab === 'worklist' && 'bg-blue-50 border-blue-300')}
              >
                <Activity className="h-4 w-4 mr-2" />
                Worklist
              </Button>
              <Button
                onClick={() => setActiveTab('newOrder')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards - Radiologist Productivity Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Today Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalToday}</p>
            <p className="text-xs text-gray-500 mt-1">Studies ordered</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Pending</span>
            </div>
            <p className="text-3xl font-bold text-orange-700">{stats.pending}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting acquisition</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Pending Report</span>
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.reporting}</p>
            <p className="text-xs text-gray-500 mt-1">Needs interpretation</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Finalized</span>
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.completed}</p>
            <p className="text-xs text-gray-500 mt-1">Reports signed</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Zap className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">STAT</span>
            </div>
            <p className="text-3xl font-bold text-red-700">{stats.stat}</p>
            <p className="text-xs text-gray-500 mt-1">Urgent priority</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Avg TAT</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.avgTurnaround}</p>
            <p className="text-xs text-gray-500 mt-1">Turnaround time</p>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'worklist' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">PACS Worklist</h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export HL7
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending Report">Pending Report</option>
                      <option value="Final">Final</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Modality</label>
                    <select
                      value={filterStudyType}
                      onChange={(e) => setFilterStudyType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Modalities</option>
                      {Object.values(IMAGING_STUDIES).flat().map(study => (
                        <option key={study} value={study}>{study}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ordering Physician</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">All Physicians</option>
                      {SAMPLE_DOCTORS.map(doc => (
                        <option key={doc} value={doc}>{doc}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Patient</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Study Type</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Region</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Indication</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Ordering MD</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Time</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudies.map((study) => (
                    <tr key={study.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {study.priority === 'STAT' && (
                            <Badge className="bg-red-100 text-red-700 border-red-200 font-bold">
                              STAT
                            </Badge>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{study.patientName}</p>
                            <p className="text-sm text-gray-500">{study.patientId} • {study.accessionNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{study.studyType}</span>
                        {study.radiationDose && (
                          <p className="text-xs text-gray-500">Dose: {study.radiationDose}</p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-700">{study.bodyRegion}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{study.indication}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={cn('border', getStatusBadge(study.status))}>
                          {study.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-700">{study.orderingPhysician}</span>
                        {study.radiologist && (
                          <p className="text-xs text-gray-500">Read by: {study.radiologist}</p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm text-gray-900">{study.scheduledTime}</p>
                          {study.completedTime && (
                            <p className="text-xs text-green-600">✓ {study.completedTime}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {(study.status === 'Final' || study.status === 'Pending Report') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewStudy(study)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          )}
                          {study.status === 'Pending Report' && (
                            <Button
                              size="sm"
                              onClick={() => handleStartReporting(study)}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Read
                            </Button>
                          )}
                          {study.status === 'Final' && (
                            <Button
                              size="sm"
                              variant="outline"
                            >
                              <Printer className="h-4 w-4 mr-1" />
                              Print
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'newOrder' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">New Imaging Order - HL7 Interface</h2>

            <div className="space-y-6">
              {/* Patient Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Patient Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by patient name, MRN, or SSN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {searchTerm && filteredPatients.length > 0 && (
                  <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => handlePatientSelect(patient)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <p className="font-semibold text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-600">
                          MRN: {patient.id} | SSN: {patient.ssn} | {patient.age} years old | {patient.gender === 'M' ? 'Male' : 'Female'} | {patient.insurance}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {selectedPatient && (
                  <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-900">{selectedPatient.name}</p>
                    <p className="text-sm text-green-700">
                      MRN: {selectedPatient.id} | SSN: {selectedPatient.ssn} | {selectedPatient.age} years old | {selectedPatient.gender === 'M' ? 'Male' : 'Female'}
                    </p>
                    <p className="text-sm text-green-700 mt-1">Insurance: {selectedPatient.insurance}</p>
                  </div>
                )}
              </div>

              {/* Study Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Image className="h-4 w-4 inline mr-2" />
                    Modality
                  </label>
                  <select
                    value={selectedStudyCategory}
                    onChange={(e) => {
                      setSelectedStudyCategory(e.target.value)
                      setSelectedStudyType('')
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select modality...</option>
                    {Object.keys(IMAGING_STUDIES).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Study Type (CPT Code)
                  </label>
                  <select
                    value={selectedStudyType}
                    onChange={(e) => setSelectedStudyType(e.target.value)}
                    disabled={!selectedStudyCategory}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Select study...</option>
                    {selectedStudyCategory && IMAGING_STUDIES[selectedStudyCategory as keyof typeof IMAGING_STUDIES].map((study) => (
                      <option key={study} value={study}>{study}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Body Region and Ordering Physician */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Body Region (RadLex)
                  </label>
                  <Input
                    placeholder="e.g., Right knee, Left lung, Brain..."
                    value={bodyRegion}
                    onChange={(e) => setBodyRegion(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ordering Physician
                  </label>
                  <select
                    value={selectedPhysician}
                    onChange={(e) => setSelectedPhysician(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select physician...</option>
                    {SAMPLE_DOCTORS.map((doc) => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clinical Indication */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-2" />
                  Clinical Indication
                </label>
                <textarea
                  placeholder="Enter clinical history, symptoms, and reason for imaging study..."
                  value={clinicalIndication}
                  onChange={(e) => setClinicalIndication(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                />
              </div>

              {/* Priority and Contrast Allergy Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="priority"
                    checked={isPriority}
                    onChange={(e) => setIsPriority(e.target.checked)}
                    className="h-5 w-5 text-red-600 rounded"
                  />
                  <label htmlFor="priority" className="flex items-center gap-2 font-semibold text-red-900 cursor-pointer">
                    <Zap className="h-5 w-5" />
                    STAT - Urgent Priority (Critical Findings Protocol)
                  </label>
                </div>

                {selectedStudyType.includes('Contrast') && (
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <input
                      type="checkbox"
                      id="contrast"
                      checked={contrastAllergy}
                      onChange={(e) => setContrastAllergy(e.target.checked)}
                      className="h-5 w-5 text-yellow-600 rounded"
                    />
                    <label htmlFor="contrast" className="flex items-center gap-2 font-semibold text-yellow-900 cursor-pointer">
                      <AlertCircle className="h-5 w-5" />
                      Contrast Allergy Alert - Premedication Required
                    </label>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveTab('worklist')
                    setSelectedPatient(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateOrder}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Create Order
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'viewer' && selectedStudy && (
          <div className="space-y-6">
            {/* Study Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStudy.studyType}</h2>
                  <p className="text-gray-600">{selectedStudy.patientName} - {selectedStudy.patientId}</p>
                  <p className="text-sm text-gray-500">Accession: {selectedStudy.accessionNumber}</p>
                </div>
                <Button variant="outline" onClick={() => setActiveTab('worklist')}>
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Body Region</p>
                  <p className="font-semibold">{selectedStudy.bodyRegion}</p>
                </div>
                <div>
                  <p className="text-gray-600">Indication</p>
                  <p className="font-semibold">{selectedStudy.indication}</p>
                </div>
                <div>
                  <p className="text-gray-600">Study Time</p>
                  <p className="font-semibold">{selectedStudy.completedTime || selectedStudy.scheduledTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Ordering Physician</p>
                  <p className="font-semibold">{selectedStudy.orderingPhysician}</p>
                </div>
              </div>
              {selectedStudy.radiationDose && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900">
                    ☢️ Radiation Dose: {selectedStudy.radiationDose} (ALARA Protocol - As Low As Reasonably Achievable)
                  </p>
                </div>
              )}
            </div>

            {/* DICOM Viewer */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">DICOM Viewer - PACS Integration</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Contrast className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Move className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Brain className="h-4 w-4" />
                    <span className="ml-2 text-xs">AI-CAD</span>
                  </Button>
                </div>
              </div>

              {/* Simulated DICOM Viewer */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl overflow-hidden" style={{ height: '600px' }}>
                {/* Grid overlay for medical imaging look */}
                <div className="absolute inset-0 opacity-10">
                  <div className="h-full w-full" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                {/* Viewer Info Overlay */}
                <div className="absolute top-4 left-4 text-green-400 font-mono text-xs space-y-1">
                  <p>Patient: {selectedStudy.patientName}</p>
                  <p>MRN: {selectedStudy.patientId}</p>
                  <p>Study: {selectedStudy.studyType}</p>
                  <p>Accession: {selectedStudy.accessionNumber}</p>
                  <p>Date: {selectedStudy.completedTime || selectedStudy.scheduledTime}</p>
                  <p>Series: 1/1</p>
                  <p>Image: 1/24</p>
                  {selectedStudy.contrastUsed && <p className="text-yellow-400">⚠️ CONTRAST ENHANCED</p>}
                </div>

                <div className="absolute top-4 right-4 text-green-400 font-mono text-xs space-y-1 text-right">
                  <p>WW: 400</p>
                  <p>WL: 40</p>
                  <p>Zoom: 100%</p>
                  <p>Slice: 12/24</p>
                  <p>Thickness: 5mm</p>
                  {selectedStudy.radiationDose && <p className="text-yellow-400">Dose: {selectedStudy.radiationDose}</p>}
                </div>

                {/* Simulated Medical Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative inline-block">
                      {/* Simulate different imaging modalities with colors */}
                      {selectedStudy.studyType.includes('CT') && (
                        <div className="w-96 h-96 rounded-full bg-gradient-radial from-gray-400 via-gray-600 to-gray-800 shadow-2xl shadow-blue-500/50 relative">
                          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                          <div className="absolute inset-24 rounded-full bg-gray-800 opacity-80"></div>
                        </div>
                      )}
                      {selectedStudy.studyType.includes('MRI') && (
                        <div className="w-96 h-96 rounded-full bg-gradient-radial from-gray-300 via-gray-500 to-gray-700 shadow-2xl shadow-purple-500/50 relative">
                          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800"></div>
                          <div className="absolute inset-24 rounded-full bg-gray-700 opacity-70"></div>
                        </div>
                      )}
                      {selectedStudy.studyType.includes('X-Ray') && (
                        <div className="w-80 h-96 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 shadow-2xl shadow-green-500/30 relative rounded-lg">
                          <div className="absolute inset-8 bg-gradient-to-br from-gray-400 to-gray-700 opacity-60 rounded"></div>
                        </div>
                      )}
                      {selectedStudy.studyType.includes('US') && (
                        <div className="w-96 h-80 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 shadow-2xl shadow-yellow-500/30 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-gray-900/40"></div>
                        </div>
                      )}
                    </div>
                    <p className="mt-6 text-green-400 font-mono text-sm">
                      [DICOM VIEWER - PACS Integration - Epic Radiant Compatible]
                    </p>
                    <p className="text-green-400 font-mono text-xs mt-2">
                      AI-Assisted Reading (CAD) Available • Structured Reporting Enabled
                    </p>
                  </div>
                </div>

                {/* Bottom measurement tools */}
                <div className="absolute bottom-4 left-4 text-green-400 font-mono text-xs">
                  <p>Distance: -</p>
                  <p>Angle: -</p>
                  <p>ROI: -</p>
                  <p>HU: -</p>
                </div>
              </div>
            </div>

            {/* Previous Studies */}
            {selectedStudy.previousStudies && selectedStudy.previousStudies > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Prior Studies ({selectedStudy.previousStudies})</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(selectedStudy.previousStudies)].map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Image className="h-5 w-5 text-gray-600" />
                        <span className="font-semibold text-gray-900">{selectedStudy.studyType}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(Date.now() - (i + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US')}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => handleStartReporting(selectedStudy)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Start Interpretation
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'reporting' && selectedStudy && (
          <div className="space-y-6">
            {/* Study Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStudy.studyType} - Radiology Interpretation</h2>
                  <p className="text-gray-600">{selectedStudy.patientName} - {selectedStudy.patientId}</p>
                  <p className="text-sm text-gray-500">Accession: {selectedStudy.accessionNumber}</p>
                </div>
                <Button variant="outline" onClick={() => setActiveTab('worklist')}>
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>

            {/* Radiologist Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reading Radiologist</label>
                  <select
                    value={selectedRadiologist}
                    onChange={(e) => setSelectedRadiologist(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select radiologist...</option>
                    {RADIOLOGISTS.map((rad) => (
                      <option key={rad} value={rad}>{rad}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => setVoiceDictation(!voiceDictation)}
                    className={cn(voiceDictation && 'bg-red-50 border-red-300')}
                  >
                    <Mic className={cn("h-4 w-4 mr-2", voiceDictation && "text-red-600 animate-pulse")} />
                    {voiceDictation ? 'Stop Dictation' : 'Voice Dictation'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Structured Report Templates</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTemplates(!showTemplates)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {showTemplates ? 'Hide Templates' : 'Show Templates'}
                </Button>
              </div>

              {showTemplates && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                  {REPORT_TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleApplyTemplate(template)}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all"
                    >
                      <p className="font-semibold text-gray-900 text-sm">{template.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{template.cptCode}</p>
                      <p className="text-xs text-blue-600 mt-1">Click to apply template</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Report Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Findings
                  </label>
                  <textarea
                    value={findings}
                    onChange={(e) => setFindings(e.target.value)}
                    placeholder="Document detailed imaging findings using RadLex terminology..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Impression
                  </label>
                  <textarea
                    value={impression}
                    onChange={(e) => setImpression(e.target.value)}
                    placeholder="Concise diagnostic impression and conclusions..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recommendations
                  </label>
                  <textarea
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    placeholder="Clinical recommendations and follow-up imaging suggestions..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]"
                  />
                </div>

                {/* Notify Physician */}
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="notify"
                    checked={notifyPhysician}
                    onChange={(e) => setNotifyPhysician(e.target.checked)}
                    className="h-5 w-5 text-green-600 rounded"
                  />
                  <label htmlFor="notify" className="flex items-center gap-2 font-semibold text-green-900 cursor-pointer">
                    <Send className="h-5 w-5" />
                    Send STAT notification to ordering physician via HL7 interface (Critical Findings Protocol - ACR Guidelines)
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setActiveTab('worklist')}>
                    Cancel
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={handleSubmitReport}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Sign & Finalize Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HIPAA & Standards Compliance */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">HIPAA Compliance & Radiology Standards</h3>
              <p className="text-sm text-purple-800">
                All radiology images stored in PACS with AES-256 encryption. Fully compliant with DICOM standards.
                HL7 v2.5 integration for seamless EHR communication. All image access is audit-logged per HIPAA requirements.
                Radiation dose tracking follows ALARA principles. Critical findings notification within 30 minutes per ACR guidelines.
                Peer review and quality assurance programs active. RadLex terminology standardization implemented.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>

  </DashboardLayout>
  )
}

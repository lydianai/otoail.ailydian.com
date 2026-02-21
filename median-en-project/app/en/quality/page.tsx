'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  Users,
  Shield,
  Activity,
  BarChart3,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Eye,
  XCircle,
  Target,
  ClipboardCheck,
  BookOpen,
  Settings,
  Award,
  Archive,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Document Types
type DocumentType = 'Policy' | 'Procedure' | 'Protocol' | 'Form' | 'Guideline' | 'Work Instruction' | 'Checklist'
type DocumentCategory =
  | 'Clinical'
  | 'Administrative'
  | 'Quality & Safety'
  | 'Regulatory Compliance'
  | 'Infection Prevention'
  | 'Medication Management'
  | 'Emergency Preparedness'
type DocumentStatus = 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Archived'

interface Document {
  id: string
  title: string
  code: string
  type: DocumentType
  category: DocumentCategory
  version: string
  approvalDate: string
  reviewDate: string
  responsiblePerson: string
  status: DocumentStatus
  department: string
}

// Incident Types - US Patient Safety Standards
type IncidentSeverity = 'Near Miss' | 'No Harm' | 'Minor Harm' | 'Moderate Harm' | 'Major Harm' | 'Death'
type IncidentType =
  | 'Patient Fall'
  | 'Medication Error'
  | 'Surgical/Procedural'
  | 'HAI - CAUTI'
  | 'HAI - CLABSI'
  | 'HAI - SSI'
  | 'HAI - VAP'
  | 'Pressure Injury'
  | 'Restraint Injury'
  | 'Treatment/Diagnosis Delay'
  | 'Equipment Failure'
  | 'Specimen/Lab Error'
  | 'Patient Identification Error'
  | 'Communication Failure'
  | 'Elopement/AMA'
  | 'Other'

interface Incident {
  id: string
  date: string
  time: string
  location: string
  type: IncidentType
  description: string
  severity: IncidentSeverity
  reportedBy: string
  status: 'Open' | 'Under Investigation' | 'RCA in Progress' | 'CAPA Initiated' | 'Closed'
  rootCauseAnalysis?: string
  nqfSerious?: boolean
  sentinelEvent?: boolean
}

// Joint Commission Standards
interface JointCommissionStandard {
  id: string
  code: string
  title: string
  chapter: 'Patient-Centered Standards' | 'Healthcare Organization Standards' | 'Core Measures'
  compliance: number
  gaps: number
  evidence: string[]
  lastSurveyDate: string
}

// CMS Core Measures
interface CMSCoreMeasure {
  id: string
  measureId: string
  measureName: string
  category: 'AMI' | 'HF' | 'PN' | 'SCIP' | 'STK' | 'VTE' | 'SEP' | 'PC'
  performanceRate: number
  nationalBenchmark: number
  target: number
  numerator: number
  denominator: number
}

// NDNQI Metrics
interface NDNQIMetric {
  id: string
  metric: string
  category: 'Falls' | 'Pressure Injuries' | 'CAUTI' | 'CLABSI' | 'VAP' | 'Restraints' | 'Staffing'
  currentRate: number
  targetRate: number
  nationalMean: number
  percentile: number
  unit: string
}

// Audit
type AuditStatus = 'Scheduled' | 'In Progress' | 'Report Pending' | 'Completed'

interface Audit {
  id: string
  type: string
  auditor: string
  department: string
  date: string
  status: AuditStatus
  findings: number
  score: number
  accreditor?: string
}

// CAPA - Corrective and Preventive Action
type CAPAStatus = 'Open' | 'In Progress' | 'Verification Pending' | 'Closed'

interface CAPA {
  id: string
  issue: string
  source: string
  actionPlan: string
  responsiblePerson: string
  dueDate: string
  status: CAPAStatus
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  effectiveness?: string
}

// Generate sample documents - US Healthcare Standards
function generateDocuments(): Document[] {
  const titles = [
    'Patient Admission and Registration Procedure',
    'Infection Prevention and Control Policy',
    'Emergency Response Protocol',
    'Medication Preparation and Administration Guidelines',
    'Patient Rights and Responsibilities',
    'Ventilator-Associated Pneumonia Prevention Bundle',
    'Catheter-Associated Urinary Tract Infection Prevention',
    'Surgical Site Infection Prevention Protocol',
    'Blood Product Transfusion Safety Protocol',
    'Cardiopulmonary Resuscitation - Code Blue',
    'Pain Assessment and Management Guidelines',
    'Fall Prevention Program',
    'National Patient Safety Goals Implementation',
    'Biomedical Equipment Maintenance and Calibration',
    'High-Level Disinfection and Sterilization',
    'Regulated Medical Waste Management',
    'Radiation Safety and ALARA Protocol',
    'Hazardous Materials and Chemical Safety',
    'Emergency Preparedness and Disaster Plan',
    'Patient Identification - Two Identifier Policy',
    'Surgical Safety Checklist and Time-Out',
    'ICU Daily Goals and Rounding Protocol',
    'Nursing Care Plan Documentation',
    'Comprehensive Patient Assessment',
    'Enteral Nutrition Support Protocol',
    'Pressure Injury Prevention and Staging',
    'Central Venous Catheter Insertion and Maintenance',
    'Tracheostomy Care Protocol',
    'Transmission-Based Precautions',
    'Hand Hygiene Compliance Monitoring',
    'Employee Health and Immunization Program',
    'Occupational Safety and Needlestick Prevention',
    'Electronic Health Records Documentation Standards',
    'Informed Consent Process',
    'HIPAA Privacy and Security Compliance',
    'Quality Indicator Dashboard and Reporting',
    'Performance Improvement and PDSA Methodology',
    'Competency Assessment and Annual Skills Fair',
    'Vendor Credentialing and Supply Chain Management',
    'Pharmacy Formulary and Purchasing',
    'Care Coordination and Transitions of Care',
    'Discharge Planning and Follow-up',
    'Ambulatory Care and Clinic Services',
    'Laboratory Safety and Quality Control',
    'Blood Bank Standard Operating Procedures',
    'Diagnostic Imaging Safety Protocols',
    'Operating Room Turnover and Cleaning',
    'Anesthesia Pre-operative Evaluation',
    'Post-Anesthesia Care Unit (PACU) Standards',
    'Organ and Tissue Donation Protocol',
    'Palliative Care and Hospice Services',
    'Behavioral Health Patient Safety',
    'Pediatric Patient Care Standards',
    'Geriatric Patient Assessment and Management',
    'Diabetes Patient Education Program',
    'Asthma and COPD Management',
    'Hypertension Treatment Protocol',
    'Heart Failure Disease Management',
    'Stroke Alert Protocol and Rehabilitation',
    'Sepsis Screening and Treatment Bundle',
    'Acute Coronary Syndrome - STEMI Protocol',
    'Trauma Patient Management',
    'Toxicology and Overdose Protocol',
    'Burn Patient Treatment Guidelines',
    'Hemodialysis Patient Safety',
    'Bone Marrow Transplant Protocol',
    'Chemotherapy Administration Safety',
    'Radiation Therapy Safety Procedures',
    'Institutional Review Board (IRB) Oversight',
    'Clinical Research Protocol Compliance',
    'Medical Device Adverse Event Reporting',
    'Pharmacovigilance and Medication Safety',
    'Antimicrobial Stewardship Program',
    'Controlled Substance Management',
    'Medication Cold Chain Management',
    'Drug Recall and Medication Withdrawal',
    'Patient and Family Complaints Resolution',
    'Safety Event Reporting System',
    'Sentinel Event Management',
    'Failure Mode and Effects Analysis (FMEA)',
    'Internal Audit Program',
    'Joint Commission Survey Readiness',
    'Document Control and Master Document List',
    'Records Retention and Destruction',
    'Crisis Communication and Media Relations',
    'Patient Satisfaction - HCAHPS Survey',
    'Employee Engagement Survey',
    'Lean Six Sigma Process Improvement',
    'Rapid Cycle Improvement Projects',
    '5S Workplace Organization',
    'Root Cause Analysis (RCA) Methodology',
    'Just Culture and Safety Reporting',
    'Plan-Do-Study-Act (PDSA) Cycles',
    'Safety Culture Survey (AHRQ)',
    'Quality Improvement Teams and Huddles',
    'Clinical Pathways Development',
    'Evidence-Based Practice Integration',
    'Clinical Decision Support Systems',
    'Cybersecurity and Information Security',
    'Breach Notification and Response',
  ]

  const types: DocumentType[] = ['Policy', 'Procedure', 'Protocol', 'Form', 'Guideline', 'Work Instruction', 'Checklist']
  const categories: DocumentCategory[] = [
    'Clinical',
    'Administrative',
    'Quality & Safety',
    'Regulatory Compliance',
    'Infection Prevention',
    'Medication Management',
    'Emergency Preparedness'
  ]
  const statuses: DocumentStatus[] = ['Draft', 'Under Review', 'Approved', 'Active', 'Archived']
  const departments = [
    'Quality & Patient Safety',
    'Infection Prevention',
    'Patient Safety Officer',
    'Medical Staff Services',
    'Nursing Administration',
    'Pharmacy & Therapeutics',
    'Emergency Department'
  ]
  const responsibles = [
    'Dr. Sarah Martinez, CMO',
    'Dr. Michael Chen, Medical Director',
    'Jennifer Williams, RN, CNO',
    'Robert Johnson, PharmD',
    'Dr. Emily Rodriguez, Quality Director',
    'Laura Thompson, RN, Patient Safety'
  ]

  return titles.map((title, i) => {
    const type = types[i % types.length]
    const category = categories[i % categories.length]
    const status = i < 10 ? statuses[i % 2] : 'Active'

    return {
      id: `DOC-${String(i + 1).padStart(4, '0')}`,
      title,
      code: `${type.substring(0, 3).toUpperCase()}-${category.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      type,
      category,
      version: `v${Math.floor(i / 20) + 1}.${(i % 20) % 5}`,
      approvalDate: new Date(2023, Math.floor(i / 10), (i % 28) + 1).toISOString().split('T')[0],
      reviewDate: new Date(2024, Math.floor(i / 10) + 6, (i % 28) + 1).toISOString().split('T')[0],
      responsiblePerson: responsibles[i % responsibles.length],
      status,
      department: departments[i % departments.length],
    }
  })
}

// Generate incidents - US Patient Safety Events
function generateIncidents(): Incident[] {
  const types: IncidentType[] = [
    'Patient Fall',
    'Medication Error',
    'Surgical/Procedural',
    'HAI - CAUTI',
    'HAI - CLABSI',
    'HAI - SSI',
    'Pressure Injury',
    'Treatment/Diagnosis Delay',
    'Equipment Failure',
    'Communication Failure'
  ]
  const severities: IncidentSeverity[] = ['Near Miss', 'No Harm', 'Minor Harm', 'Moderate Harm', 'Major Harm']
  const locations = [
    '3 West Medical-Surgical',
    'ICU - Medical',
    'OR Suite 2',
    'Emergency Department',
    '5 East Telemetry',
    'Interventional Radiology',
    'Clinical Laboratory'
  ]
  const reporters = [
    'Dr. Sarah Martinez',
    'Jennifer Williams, RN',
    'Dr. Michael Chen',
    'Robert Johnson, PharmD',
    'Dr. Emily Rodriguez'
  ]

  const descriptions = [
    'Patient experienced fall while ambulating to bathroom without assistance. Fall mat in place, no injury sustained.',
    'Medication administered 2 hours late due to pharmacy delay. Patient notified, physician informed.',
    'Surgical count discrepancy identified during closing. X-ray performed, foreign object ruled out.',
    'CAUTI identified on day 5 of catheterization. Catheter removed, cultures sent, antibiotics initiated.',
    'Central line infection detected. Line removed, tip cultured, new line placed different site.',
    'Superficial surgical site infection noted at 7-day follow-up. Wound cultures obtained, antibiotics started.',
    'Stage 2 pressure injury identified on sacrum during skin assessment. Wound care consult initiated.',
    'Delay in diagnosis due to radiology report not reviewed timely. Corrective action implemented.',
    'IV pump malfunction detected during medication infusion. Pump removed from service, biomedical notified.',
    'Handoff communication incomplete during shift change. Patient condition change not reported.'
  ]

  return Array.from({ length: 28 }, (_, i) => ({
    id: `PSR-2024-${String(i + 1).padStart(4, '0')}`,
    date: new Date(2024, 11, Math.max(1, 23 - i)).toISOString().split('T')[0],
    time: `${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}`,
    location: locations[i % locations.length],
    type: types[i % types.length],
    description: descriptions[i % descriptions.length],
    severity: severities[Math.min(i % 5, 4)],
    reportedBy: reporters[i % reporters.length],
    status: i < 5 ? 'Under Investigation' : i < 10 ? 'RCA in Progress' : 'Closed',
    rootCauseAnalysis: i >= 10 ? 'Root cause analysis completed using fishbone diagram and 5 Whys. Process improvement implemented.' : undefined,
    nqfSerious: i % 7 === 0,
    sentinelEvent: i % 15 === 0,
  }))
}

// Generate Joint Commission Standards
function generateJointCommissionStandards(): JointCommissionStandard[] {
  const standards = [
    {
      code: 'NPSG.01.01.01',
      title: 'Use at least two patient identifiers',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.02.03.01',
      title: 'Report critical results of tests and diagnostic procedures on a timely basis',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.03.04.01',
      title: 'Label all medications, medication containers, and other solutions',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.03.05.01',
      title: 'Reduce the likelihood of patient harm from anticoagulation therapy',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.03.06.01',
      title: 'Maintain and communicate accurate patient medication information',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.06.01.01',
      title: 'Reduce risk of healthcare-associated infections by compliance with hand hygiene',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.07.01.01',
      title: 'Comply with current CDC hand hygiene guidelines',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.07.03.01',
      title: 'Implement evidence-based practices to prevent HAIs due to multidrug-resistant organisms',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.07.04.01',
      title: 'Implement evidence-based practices for preventing central line-associated bloodstream infections',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.07.05.01',
      title: 'Implement evidence-based practices for preventing surgical site infections',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'NPSG.15.01.01',
      title: 'Identify patients at risk for suicide',
      chapter: 'Patient-Centered Standards' as const
    },
    {
      code: 'PI.01.01.01',
      title: 'Collect data to monitor conditions in the organization',
      chapter: 'Healthcare Organization Standards' as const
    },
    {
      code: 'PI.02.01.01',
      title: 'Compile and analyze data',
      chapter: 'Healthcare Organization Standards' as const
    },
    {
      code: 'PI.03.01.01',
      title: 'Improve performance based on analysis of data',
      chapter: 'Healthcare Organization Standards' as const
    },
    {
      code: 'LD.03.01.01',
      title: 'Leaders create and maintain a culture of safety and quality',
      chapter: 'Healthcare Organization Standards' as const
    },
    {
      code: 'LD.04.01.01',
      title: 'The hospital complies with law and regulation',
      chapter: 'Healthcare Organization Standards' as const
    },
  ]

  return standards.map((std, i) => ({
    id: `JC-${i + 1}`,
    code: std.code,
    title: std.title,
    chapter: std.chapter,
    compliance: 80 + Math.floor(Math.random() * 18),
    gaps: Math.floor(Math.random() * 5),
    evidence: ['Policy Documentation', 'Staff Competency Records', 'Audit Results', 'Meeting Minutes'],
    lastSurveyDate: new Date(2024, 8, 15).toISOString().split('T')[0],
  }))
}

// Generate CMS Core Measures
function generateCMSCoreMeasures(): CMSCoreMeasure[] {
  const measures = [
    { id: 'AMI-7a', name: 'Fibrinolytic therapy received within 30 minutes', category: 'AMI' as const, target: 90 },
    { id: 'AMI-8a', name: 'Primary PCI received within 90 minutes', category: 'AMI' as const, target: 90 },
    { id: 'HF-2', name: 'Discharge instructions for heart failure patients', category: 'HF' as const, target: 95 },
    { id: 'HF-3', name: 'ACEI or ARB for LVSD', category: 'HF' as const, target: 95 },
    { id: 'PN-3b', name: 'Blood cultures before antibiotics', category: 'PN' as const, target: 98 },
    { id: 'PN-6', name: 'Initial antibiotic within 6 hours', category: 'PN' as const, target: 95 },
    { id: 'SCIP-INF-1', name: 'Prophylactic antibiotic within 1 hour', category: 'SCIP' as const, target: 99 },
    { id: 'SCIP-INF-2', name: 'Prophylactic antibiotic selection', category: 'SCIP' as const, target: 99 },
    { id: 'SCIP-INF-3', name: 'Prophylactic antibiotics discontinued', category: 'SCIP' as const, target: 98 },
    { id: 'SCIP-CARD-2', name: 'Beta-blocker during perioperative period', category: 'SCIP' as const, target: 98 },
    { id: 'STK-4', name: 'Thrombolytic therapy', category: 'STK' as const, target: 90 },
    { id: 'STK-6', name: 'Discharged on statin medication', category: 'STK' as const, target: 95 },
    { id: 'VTE-5', name: 'Warfarin therapy discharge instructions', category: 'VTE' as const, target: 95 },
    { id: 'VTE-6', name: 'Hospital-acquired VTE', category: 'VTE' as const, target: 95 },
    { id: 'SEP-1', name: 'Severe sepsis and septic shock management bundle', category: 'SEP' as const, target: 90 },
    { id: 'PC-01', name: 'Elective delivery prior to 39 weeks (lower is better)', category: 'PC' as const, target: 5 },
  ]

  return measures.map((measure, i) => {
    const denominator = 50 + Math.floor(Math.random() * 150)
    const performanceRate = measure.target - 5 + Math.floor(Math.random() * 8)
    const numerator = Math.floor((performanceRate / 100) * denominator)
    const nationalBenchmark = measure.target - 2

    return {
      id: `CMS-${i + 1}`,
      measureId: measure.id,
      measureName: measure.name,
      category: measure.category,
      performanceRate,
      nationalBenchmark,
      target: measure.target,
      numerator,
      denominator,
    }
  })
}

// Generate NDNQI Metrics
function generateNDNQIMetrics(): NDNQIMetric[] {
  const metrics = [
    { metric: 'Total Falls per 1,000 patient days', category: 'Falls' as const, target: 3.5, national: 3.8, unit: 'Rate' },
    { metric: 'Falls with Injury per 1,000 patient days', category: 'Falls' as const, target: 1.2, national: 1.5, unit: 'Rate' },
    { metric: 'Hospital-Acquired Pressure Injuries (HAPI) - All Stages', category: 'Pressure Injuries' as const, target: 4.5, national: 5.2, unit: 'Rate' },
    { metric: 'HAPI - Stage 3 & 4', category: 'Pressure Injuries' as const, target: 0.5, national: 0.8, unit: 'Rate' },
    { metric: 'CAUTI Rate per 1,000 catheter days', category: 'CAUTI' as const, target: 1.2, national: 1.8, unit: 'Rate' },
    { metric: 'CLABSI Rate per 1,000 line days', category: 'CLABSI' as const, target: 0.8, national: 1.2, unit: 'Rate' },
    { metric: 'VAP Rate per 1,000 ventilator days', category: 'VAP' as const, target: 0.9, national: 1.5, unit: 'Rate' },
    { metric: 'Physical Restraint Prevalence', category: 'Restraints' as const, target: 1.5, national: 2.3, unit: 'Percent' },
    { metric: 'RN Satisfaction Score', category: 'Staffing' as const, target: 85, national: 78, unit: 'Score' },
    { metric: 'Skill Mix - RN Hours', category: 'Staffing' as const, target: 65, national: 58, unit: 'Percent' },
  ]

  return metrics.map((m, i) => {
    const variance = (Math.random() - 0.3) * 0.5
    const currentRate = parseFloat((m.target * (1 + variance)).toFixed(2))
    const percentile = currentRate <= m.target ? 75 + Math.floor(Math.random() * 20) : 25 + Math.floor(Math.random() * 40)

    return {
      id: `NDNQI-${i + 1}`,
      metric: m.metric,
      category: m.category,
      currentRate,
      targetRate: m.target,
      nationalMean: m.national,
      percentile,
      unit: m.unit === 'ICU' ? 'Medical ICU' : m.unit === 'Medical-Surgical' ? '3 West Med-Surg' : '5 East Telemetry',
    }
  })
}

// Generate audits
function generateAudits(): Audit[] {
  const types = [
    'Internal Quality Audit',
    'Process Validation Audit',
    'Departmental Compliance Audit',
    'Joint Commission Mock Survey',
    'CMS Certification Audit',
    'DNV Healthcare Survey',
    'CIHQ Accreditation Survey'
  ]
  const auditors = [
    'Dr. Robert Williams, Quality Director',
    'Internal Audit Team',
    'External Surveyor',
    'Dr. Mary Johnson, Medical Director',
    'Quality Assurance Department'
  ]
  const departments = [
    'Emergency Department',
    'Operating Room',
    'Medical ICU',
    'Clinical Laboratory',
    'Diagnostic Imaging',
    'Pharmacy Services',
    'Central Sterile Processing'
  ]
  const statuses: AuditStatus[] = ['Scheduled', 'In Progress', 'Report Pending', 'Completed']
  const accreditors = ['Joint Commission', 'CMS', 'DNV Healthcare', 'CIHQ', 'State Department of Health']

  return Array.from({ length: 24 }, (_, i) => ({
    id: `AUD-2024-${String(i + 1).padStart(3, '0')}`,
    type: types[i % types.length],
    auditor: auditors[i % auditors.length],
    department: departments[i % departments.length],
    date: new Date(2024, i % 12, ((i * 7) % 28) + 1).toISOString().split('T')[0],
    status: statuses[Math.min(i % 4, 3)],
    findings: i < 5 ? 0 : Math.floor(Math.random() * 8),
    score: 75 + Math.floor(Math.random() * 23),
    accreditor: i % 3 === 0 ? accreditors[i % accreditors.length] : undefined,
  }))
}

// Generate CAPAs
function generateCAPAs(): CAPA[] {
  const issues = [
    'Hand hygiene compliance below 90% target in ICU',
    'Medication storage temperature out of range in pharmacy satellite',
    'Patient identification verification not performed before procedure',
    'Sterilization load documentation incomplete',
    'Emergency cart missing required equipment',
    'Regulated medical waste segregation error observed',
    'Surgical safety checklist time-out documentation incomplete',
    'Fall risk assessment not completed within 24 hours of admission',
    'Ventilator maintenance overdue in respiratory therapy',
    'Radiation dosimetry badge not worn during fluoroscopy',
    'Blood product labeling missing ABO verification',
    'Informed consent form missing physician signature',
    'Staff competency assessment overdue for high-risk procedures',
    'Biomedical equipment past calibration due date',
    'Healthcare-associated infection surveillance data incomplete',
    'Medication reconciliation not performed at discharge',
    'CLABSI bundle compliance below target',
    'Delay in critical lab value reporting to physician',
    'Patient elopement risk assessment not documented',
    'Fire drill participation below required 95% compliance',
  ]

  const sources = [
    'Internal Audit',
    'Patient Safety Report',
    'Patient Complaint',
    'Joint Commission Survey',
    'Process Analysis',
    'Quality Dashboard',
    'Infection Prevention Surveillance',
    'Medication Safety Committee',
    'Peer Review',
    'External Regulatory Inspection'
  ]
  const priorities: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['Low', 'Medium', 'High', 'Critical']
  const responsibles = [
    'Nursing Administration',
    'Pharmacy Services',
    'Quality & Patient Safety',
    'Infection Prevention',
    'Medical Staff Services',
    'Facilities & Engineering',
    'Laboratory Services',
    'Respiratory Therapy'
  ]
  const statuses: CAPAStatus[] = ['Open', 'In Progress', 'Verification Pending', 'Closed']

  return Array.from({ length: 20 }, (_, i) => ({
    id: `CAPA-2024-${String(i + 1).padStart(4, '0')}`,
    issue: issues[i % issues.length],
    source: sources[i % sources.length],
    actionPlan: `Corrective action plan developed: Root cause identified, staff education scheduled, process revised, monitoring plan established. Target completion: ${new Date(2025, 0, ((i * 5) % 28) + 1).toISOString().split('T')[0]}.`,
    responsiblePerson: responsibles[i % responsibles.length],
    dueDate: new Date(2025, 0, ((i * 5) % 28) + 1).toISOString().split('T')[0],
    status: statuses[Math.min(i % 5, 3)],
    priority: priorities[Math.min(i % 5, 3)],
    effectiveness: i >= 15 ? 'Effectiveness verified through post-implementation audit and ongoing monitoring.' : undefined,
  }))
}

export default function QualityPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [jcStandards, setJcStandards] = useState<JointCommissionStandard[]>([])
  const [cmsCoreMeasures, setCmsCoreMeasures] = useState<CMSCoreMeasure[]>([])
  const [ndnqiMetrics, setNdnqiMetrics] = useState<NDNQIMetric[]>([])
  const [audits, setAudits] = useState<Audit[]>([])
  const [capas, setCapas] = useState<CAPA[]>([])
  const [activeTab, setActiveTab] = useState<'documents' | 'incidents' | 'compliance' | 'audits' | 'capa'>('documents')
  const [documentFilter, setDocumentFilter] = useState<DocumentType | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('ghp_token')
    if (!token) {
      router.push('/en/login')
      return
    }

    setDocuments(generateDocuments())
    setIncidents(generateIncidents())
    setJcStandards(generateJointCommissionStandards())
    setCmsCoreMeasures(generateCMSCoreMeasures())
    setNdnqiMetrics(generateNDNQIMetrics())
    setAudits(generateAudits())
    setCapas(generateCAPAs())
  }, [router])

  // Statistics calculations
  const totalDocuments = documents.length
  const incidentsThisMonth = incidents.filter(inc => {
    const incDate = new Date(inc.date)
    const now = new Date()
    return incDate.getMonth() === now.getMonth() && incDate.getFullYear() === now.getFullYear()
  }).length

  const jcCompliance = jcStandards.length > 0
    ? jcStandards.reduce((sum, s) => sum + s.compliance, 0) / jcStandards.length
    : 0

  const cmsPerformance = cmsCoreMeasures.length > 0
    ? cmsCoreMeasures.reduce((sum, m) => sum + m.performanceRate, 0) / cmsCoreMeasures.length
    : 0

  const openCAPAs = capas.filter(c => c.status === 'Open' || c.status === 'In Progress').length

  const sentinelEvents = incidents.filter(i => i.sentinelEvent).length

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesType = documentFilter === 'All' || doc.type === documentFilter
    const matchesSearch = searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200'
      case 'Approved': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Under Review': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'Archived': return 'bg-purple-100 text-purple-700 border-purple-200'
    }
  }

  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'Near Miss': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'No Harm': return 'bg-green-100 text-green-700 border-green-200'
      case 'Minor Harm': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Moderate Harm': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Major Harm': return 'bg-red-100 text-red-700 border-red-200'
      case 'Death': return 'bg-red-600 text-white border-red-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200'
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-50">
          <div className="max-w-[1920px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Shield className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Quality & Patient Safety
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">Joint Commission & CMS Compliance Management System</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm font-medium text-blue-100 mb-1">Total Documents</p>
              <p className="text-4xl font-bold tracking-tight">{totalDocuments}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm font-medium text-orange-100 mb-1">Safety Events (This Month)</p>
              <p className="text-4xl font-bold tracking-tight">{incidentsThisMonth}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl shadow-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm font-medium text-green-100 mb-1">Joint Commission Compliance</p>
              <p className="text-4xl font-bold tracking-tight">{jcCompliance.toFixed(1)}%</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm font-medium text-purple-100 mb-1">CMS Core Measures</p>
              <p className="text-4xl font-bold tracking-tight">{cmsPerformance.toFixed(1)}%</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl shadow-red-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Target className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm font-medium text-red-100 mb-1">Open CAPAs</p>
              <p className="text-4xl font-bold tracking-tight">{openCAPAs}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm mb-8 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('documents')}
                className={cn(
                  'flex-1 px-6 py-4 font-semibold transition-all',
                  activeTab === 'documents'
                    ? 'bg-blue-50 text-blue-700 border-b-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Document Repository</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('incidents')}
                className={cn(
                  'flex-1 px-6 py-4 font-semibold transition-all',
                  activeTab === 'incidents'
                    ? 'bg-orange-50 text-orange-700 border-b-4 border-orange-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Safety Event Reporting</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('compliance')}
                className={cn(
                  'flex-1 px-6 py-4 font-semibold transition-all',
                  activeTab === 'compliance'
                    ? 'bg-green-50 text-green-700 border-b-4 border-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Joint Commission & CMS</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('audits')}
                className={cn(
                  'flex-1 px-6 py-4 font-semibold transition-all',
                  activeTab === 'audits'
                    ? 'bg-purple-50 text-purple-700 border-b-4 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <ClipboardCheck className="h-5 w-5" />
                  <span>Audit Calendar</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('capa')}
                className={cn(
                  'flex-1 px-6 py-4 font-semibold transition-all',
                  activeTab === 'capa'
                    ? 'bg-red-50 text-red-700 border-b-4 border-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-5 w-5" />
                  <span>CAPA Management</span>
                </div>
              </button>
            </div>

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <select
                      value={documentFilter}
                      onChange={(e) => setDocumentFilter(e.target.value as DocumentType | 'All')}
                      className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-semibold"
                    >
                      <option value="All">All Types</option>
                      <option value="Policy">Policy</option>
                      <option value="Procedure">Procedure</option>
                      <option value="Protocol">Protocol</option>
                      <option value="Form">Form</option>
                      <option value="Guideline">Guideline</option>
                      <option value="Work Instruction">Work Instruction</option>
                      <option value="Checklist">Checklist</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      New Document
                    </Button>
                    <Button variant="outline" className="border-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Code</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Title</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Category</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Version</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Approval Date</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Next Review</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Owner</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.slice(0, 20).map((doc) => (
                        <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm font-semibold">{doc.code}</td>
                          <td className="py-3 px-4 font-semibold">{doc.title}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="font-semibold">{doc.type}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="font-semibold">{doc.category}</Badge>
                          </td>
                          <td className="py-3 px-4 font-mono text-sm">{doc.version}</td>
                          <td className="py-3 px-4 text-sm">{doc.approvalDate}</td>
                          <td className="py-3 px-4 text-sm">{doc.reviewDate}</td>
                          <td className="py-3 px-4 text-sm">{doc.responsiblePerson}</td>
                          <td className="py-3 px-4">
                            <Badge className={cn('font-semibold border', getStatusColor(doc.status))}>
                              {doc.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-blue-100 rounded">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </button>
                              <button className="p-1 hover:bg-orange-100 rounded">
                                <Edit className="h-4 w-4 text-orange-600" />
                              </button>
                              <button className="p-1 hover:bg-green-100 rounded">
                                <Download className="h-4 w-4 text-green-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-600 font-semibold">
                  Showing: {Math.min(20, filteredDocuments.length)} / {filteredDocuments.length} documents
                </div>
              </div>
            )}

            {/* Incidents Tab */}
            {activeTab === 'incidents' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Patient Safety Event Reports</h3>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New Safety Report
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {incidents.slice(0, 10).map((incident) => (
                    <div key={incident.id} className="border-2 border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-bold text-gray-900 mb-1">{incident.id}</div>
                          <div className="text-sm text-gray-600">{incident.date} - {incident.time}</div>
                          {incident.sentinelEvent && (
                            <Badge className="bg-red-100 text-red-700 border-red-200 font-semibold border mt-2">
                              Sentinel Event
                            </Badge>
                          )}
                        </div>
                        <Badge className={cn('font-semibold border', getSeverityColor(incident.severity))}>
                          {incident.severity}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Location</div>
                          <div className="font-semibold text-gray-900">{incident.location}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Event Type</div>
                          <Badge variant="outline" className="font-semibold">{incident.type}</Badge>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Description</div>
                          <div className="text-sm text-gray-700">{incident.description}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Reported By</div>
                          <div className="text-sm font-semibold text-gray-900">{incident.reportedBy}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</div>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-semibold border">
                            {incident.status}
                          </Badge>
                        </div>
                        {incident.rootCauseAnalysis && (
                          <div className="mt-4 p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                            <div className="text-xs font-semibold text-green-700 uppercase mb-1">Root Cause Analysis</div>
                            <div className="text-sm text-green-900">{incident.rootCauseAnalysis}</div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance Tab */}
            {activeTab === 'compliance' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Joint Commission Compliance */}
                  <div className="border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <Shield className="h-6 w-6 text-green-600" />
                          Joint Commission Standards
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">National Patient Safety Goals</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{jcCompliance.toFixed(1)}%</div>
                        <div className="text-xs text-gray-500 font-semibold">Compliance</div>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {jcStandards.slice(0, 20).map((standard) => (
                        <div key={standard.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-green-300 transition-all">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-mono text-xs font-bold text-gray-500 mb-1">{standard.code}</div>
                              <div className="font-semibold text-gray-900 mb-2">{standard.title}</div>
                              <div className="text-xs text-gray-600">
                                <span className="font-semibold">Evidence:</span> {standard.evidence.join(', ')}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Last survey: {standard.lastSurveyDate}
                              </div>
                            </div>
                            <div className="ml-4">
                              {standard.compliance >= 90 ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                              ) : (
                                <XCircle className="h-6 w-6 text-orange-600" />
                              )}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-600 rounded-full transition-all"
                                style={{ width: `${standard.compliance}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CMS Core Measures */}
                  <div className="border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <Award className="h-6 w-6 text-purple-600" />
                          CMS Core Measures
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Hospital Quality Initiative</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{cmsPerformance.toFixed(1)}%</div>
                        <div className="text-xs text-gray-500 font-semibold">Performance</div>
                      </div>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {cmsCoreMeasures.map((measure) => (
                        <div key={measure.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-purple-300 transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-mono text-xs font-bold text-purple-600 mb-1">{measure.measureId}</div>
                              <div className="font-semibold text-gray-900">{measure.measureName}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                <Badge variant="outline" className="text-xs">{measure.category}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-600">{measure.performanceRate}%</div>
                              <div className="text-xs text-gray-500">Target: {measure.target}%</div>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all',
                                measure.performanceRate >= measure.target ? 'bg-green-600' : 'bg-orange-500'
                              )}
                              style={{ width: `${Math.min(100, (measure.performanceRate / measure.target) * 100)}%` }}
                            />
                          </div>
                          <div className="mt-2 text-xs text-gray-600">
                            <span className="font-semibold">National Benchmark:</span> {measure.nationalBenchmark}% |
                            <span className="font-semibold ml-2">N/D:</span> {measure.numerator}/{measure.denominator}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* NDNQI Metrics */}
                <div className="border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Activity className="h-6 w-6 text-blue-600" />
                        NDNQI Nursing Quality Indicators
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">National Database of Nursing Quality Indicators</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {ndnqiMetrics.map((metric) => (
                      <div key={metric.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-blue-300 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">{metric.metric}</div>
                            <Badge variant="outline" className="text-xs">{metric.category}</Badge>
                          </div>
                          <div className="text-right ml-4">
                            <div className={cn(
                              'text-xl font-bold',
                              metric.currentRate <= metric.targetRate ? 'text-green-600' : 'text-orange-600'
                            )}>
                              {metric.currentRate}
                            </div>
                            <div className="text-xs text-gray-500">Target: {metric.targetRate}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">National Mean:</span>
                            <span className="font-semibold">{metric.nationalMean}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Percentile Rank:</span>
                            <Badge className={cn(
                              'font-semibold',
                              metric.percentile >= 75 ? 'bg-green-100 text-green-700' :
                              metric.percentile >= 50 ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                            )}>
                              {metric.percentile}th
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Unit:</span>
                            <span className="font-semibold">{metric.unit}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Audits Tab */}
            {activeTab === 'audits' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Quality Audit Schedule</h3>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Audit
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-bold text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Audit Type</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Auditor</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Department</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Findings</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Score</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {audits.map((audit) => (
                        <tr key={audit.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm font-semibold">{audit.id}</td>
                          <td className="py-3 px-4 font-semibold">
                            {audit.type}
                            {audit.accreditor && (
                              <div className="text-xs text-purple-600 font-semibold">{audit.accreditor}</div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm">{audit.auditor}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="font-semibold">{audit.department}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{audit.date}</td>
                          <td className="py-3 px-4">
                            <Badge className={cn(
                              'font-semibold border',
                              audit.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' :
                              audit.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                              audit.status === 'Report Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                              'bg-gray-100 text-gray-700 border-gray-200'
                            )}>
                              {audit.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            {audit.findings > 0 ? (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-semibold border">
                                {audit.findings} findings
                              </Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold border">
                                No findings
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={cn(
                              'font-bold',
                              audit.score >= 90 ? 'text-green-600' :
                              audit.score >= 80 ? 'text-blue-600' :
                              audit.score >= 70 ? 'text-yellow-600' :
                              'text-orange-600'
                            )}>
                              {audit.score}/100
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="p-1 hover:bg-blue-100 rounded">
                              <Eye className="h-4 w-4 text-blue-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CAPA Tab */}
            {activeTab === 'capa' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Corrective and Preventive Actions</h3>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New CAPA
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {capas.map((capa) => (
                    <div key={capa.id} className="border-2 border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-bold text-gray-900 mb-1">{capa.id}</div>
                          <Badge className={cn('font-semibold border', getPriorityColor(capa.priority))}>
                            {capa.priority} Priority
                          </Badge>
                        </div>
                        <Badge className={cn(
                          'font-semibold border',
                          capa.status === 'Closed' ? 'bg-green-100 text-green-700 border-green-200' :
                          capa.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          capa.status === 'Verification Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          'bg-orange-100 text-orange-700 border-orange-200'
                        )}>
                          {capa.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Issue</div>
                          <div className="font-semibold text-gray-900">{capa.issue}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Source</div>
                          <Badge variant="outline" className="font-semibold">{capa.source}</Badge>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Action Plan</div>
                          <div className="text-sm text-gray-700">{capa.actionPlan}</div>
                        </div>
                        {capa.effectiveness && (
                          <div className="p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                            <div className="text-xs font-semibold text-green-700 uppercase mb-1">Effectiveness Check</div>
                            <div className="text-sm text-green-900">{capa.effectiveness}</div>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Owner</div>
                            <div className="text-sm font-semibold text-gray-900">{capa.responsiblePerson}</div>
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Due Date</div>
                            <div className="text-sm font-semibold text-gray-900">{capa.dueDate}</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}

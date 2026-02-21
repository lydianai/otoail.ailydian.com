/**
 * US HEALTHCARE SYSTEM - PATIENT MANAGEMENT TYPE DEFINITIONS
 * HIPAA, FHIR R4, HL7 Compliant
 * Production-Ready - Real Hospital Integration
 */

// ============================================
// CORE PATIENT INFORMATION (HIPAA Protected)
// ============================================

export interface PatientEN {
  // System ID (UUID v4)
  id: string

  // Medical Record Number (MRN) - Unique per facility
  mrn: string // Hospital-specific MRN

  // Demographics
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: Date
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'UNKNOWN'
  race?: string // OMB race categories
  ethnicity?: string // Hispanic or Latino / Not Hispanic or Latino

  // Social Security Number (PHI - encrypted storage)
  ssn?: string // XXX-XX-XXXX format (encrypted)
  ssnHash?: string // SHA-256 for indexing

  // Contact Information
  phoneHome?: string
  phoneMobile?: string
  phoneWork?: string
  email?: string
  preferredContact: 'PHONE' | 'EMAIL' | 'SMS' | 'MAIL'

  // Address Information (USPS format)
  address: {
    line1: string
    line2?: string
    city: string
    state: string // 2-letter state code
    zipCode: string // XXXXX or XXXXX-XXXX
    county?: string
    country: string // ISO 3166-1 alpha-2
  }

  // Emergency Contact
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
    email?: string
  }

  // Insurance Information
  insurance: {
    primary?: InsuranceCoverage
    secondary?: InsuranceCoverage
    tertiary?: InsuranceCoverage
  }

  // Clinical Information
  bloodType?: 'A_POSITIVE' | 'A_NEGATIVE' | 'B_POSITIVE' | 'B_NEGATIVE' |
               'AB_POSITIVE' | 'AB_NEGATIVE' | 'O_POSITIVE' | 'O_NEGATIVE'
  organDonor?: boolean
  advanceDirective?: boolean
  advanceDirectiveOnFile?: boolean

  // FHIR Integration
  fhir: {
    active: boolean
    lastSync?: Date
    patientResourceId?: string // FHIR Patient resource ID
    encounterIds?: string[] // FHIR Encounter IDs
  }

  // Patient Portal
  portalAccess: boolean
  portalUsername?: string
  portalLastLogin?: Date

  // Patient Status
  status: 'ACTIVE' | 'INACTIVE' | 'DECEASED' | 'TRANSFERRED'
  patientType: 'OUTPATIENT' | 'INPATIENT' | 'EMERGENCY' | 'OBSERVATION'

  // Metadata
  createdAt: Date
  updatedAt: Date
  createdByUserId: string
  facilityId: string // Which facility/hospital

  // HIPAA Consent Management
  hipaaConsent: {
    treatmentConsent: boolean
    treatmentConsentDate?: Date
    privacyNoticeReceived: boolean
    privacyNoticeDate?: Date
    researchParticipation: boolean
    marketingCommunications: boolean
    immunizationRegistry: boolean
  }

  // Audit Trail
  lastAccessedAt?: Date
  lastAccessedByUserId?: string
}

export interface InsuranceCoverage {
  id: string
  type: 'MEDICARE' | 'MEDICAID' | 'COMMERCIAL' | 'SELF_PAY' | 'WORKERS_COMP' | 'OTHER'

  // Payer Information
  payerId: string // EDI payer ID
  payerName: string
  planName: string
  planType: 'HMO' | 'PPO' | 'EPO' | 'POS' | 'HDHP' | 'OTHER'

  // Policy Information
  memberId: string
  groupNumber?: string
  policyNumber?: string

  // Coverage Dates
  effectiveDate: Date
  terminationDate?: Date

  // Subscriber Information (if different from patient)
  subscriberName?: string
  subscriberRelationship?: 'SELF' | 'SPOUSE' | 'CHILD' | 'OTHER'
  subscriberDOB?: Date
  subscriberSSN?: string

  // Copay/Deductible
  copay?: number
  deductible?: number
  deductibleMet?: number
  outOfPocketMax?: number
  outOfPocketMet?: number

  // Eligibility Verification
  lastVerified?: Date
  verificationStatus?: 'VERIFIED' | 'PENDING' | 'FAILED' | 'NOT_VERIFIED'
  verificationDetails?: string

  // Authorization
  requiresAuthorization: boolean
  authorizationNumber?: string
}

// ============================================
// FHIR R4 INTEGRATION
// ============================================

export interface FHIREncounter {
  id: string
  patientId: string

  // FHIR Resource
  fhirResourceId: string
  fhirResourceVersion?: number

  // Encounter Details
  encounterNumber: string // Unique encounter/visit ID
  class: 'AMB' | 'EMER' | 'IMP' | 'OBSENC' | 'PRENC' | 'VR' // FHIR encounter class
  type: string[] // SNOMED CT codes
  status: 'PLANNED' | 'ARRIVED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED'

  // Period
  startTime: Date
  endTime?: Date

  // Location
  locationId: string
  locationName: string
  departmentId: string
  departmentName: string

  // Participants
  attendingProviderId: string
  attendingProviderNPI: string
  attendingProviderName: string
  consultingProviders?: string[]

  // Reason for Visit
  reasonCode?: string[] // SNOMED CT codes
  reasonText?: string

  // Diagnosis
  diagnoses?: Diagnosis[]

  // Service Type
  serviceType?: string // SNOMED CT code
  priority?: 'ROUTINE' | 'URGENT' | 'EMERGENCY'

  // Insurance/Financial
  insuranceId?: string
  authorizationRequired: boolean
  authorizationNumber?: string

  // FHIR Sync
  fhirLastSynced?: Date
  fhirSyncStatus: 'SYNCED' | 'PENDING' | 'FAILED'
  fhirSyncError?: string
}

export interface Diagnosis {
  code: string // ICD-10-CM code
  display: string
  type: 'ADMITTING' | 'FINAL' | 'WORKING' | 'DIFFERENTIAL'
  rank?: number // 1 = primary, 2+ = secondary
  onsetDate?: Date
  resolvedDate?: Date
  providerId: string
  providerNPI: string
}

// ============================================
// INSURANCE ELIGIBILITY VERIFICATION
// ============================================

export interface EligibilityVerification {
  id: string
  patientId: string
  insuranceId: string

  // EDI 270/271 Transaction
  edi270RequestId: string
  edi271ResponseId?: string
  verificationDate: Date

  // Status
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ERROR'
  responseCode?: string
  responseMessage?: string

  // Coverage Details
  coverageActive: boolean
  coverageEffectiveDate?: Date
  coverageTerminationDate?: Date

  // Benefits
  copay?: number
  coinsurance?: number
  deductible?: number
  deductibleRemaining?: number
  outOfPocketMax?: number
  outOfPocketRemaining?: number

  // Service-Specific Benefits
  serviceCoverage?: {
    serviceType: string // CPT/HCPCS code
    covered: boolean
    requiresAuth: boolean
    copay?: number
    coinsurance?: number
  }[]

  // Raw Response
  rawEDI271?: string
  parsedResponse?: Record<string, any>

  // Metadata
  verifiedByUserId: string
  verifiedByUserName: string
  createdAt: Date
}

// ============================================
// CLINICAL DOCUMENTATION
// ============================================

export interface ClinicalNote {
  id: string
  patientId: string
  encounterId: string

  // Note Type
  noteType: 'PROGRESS' | 'CONSULTATION' | 'H&P' | 'DISCHARGE' | 'OPERATIVE' | 'PROCEDURE' | 'NURSING'

  // LOINC Code for note type
  loincCode?: string
  loincDisplay?: string

  // Content (Encrypted - HIPAA)
  contentEncrypted: string // AES-256 encrypted
  contentHash: string // SHA-256 for integrity

  // Author
  authorId: string
  authorNPI: string
  authorName: string
  authorRole: string

  // Digital Signature
  digitalSignature?: string
  signedAt?: Date
  signatureStatus: 'UNSIGNED' | 'SIGNED' | 'AMENDED' | 'CORRECTED'

  // Amendments
  amendedFromId?: string
  amendmentReason?: string

  // FHIR Integration
  fhirDocumentReferenceId?: string
  fhirLastSynced?: Date

  // Metadata
  createdAt: Date
  updatedAt: Date
}

// ============================================
// MEDICATION ADMINISTRATION RECORD (MAR)
// ============================================

export interface Medication {
  id: string
  patientId: string
  encounterId?: string

  // Drug Information
  rxNormCode: string // RxNorm Concept Unique Identifier (RXCUI)
  drugName: string
  genericName: string
  brandName?: string

  // Prescription Details
  prescriptionNumber?: string
  sig: string // Dosing instructions
  dose: string
  route: 'ORAL' | 'IV' | 'IM' | 'SC' | 'TOPICAL' | 'INHALATION' | 'OTHER'
  frequency: string

  // Dates
  startDate: Date
  endDate?: Date
  discontinuedDate?: Date
  discontinuedReason?: string

  // Prescriber
  prescriberId: string
  prescriberNPI: string
  prescriberName: string

  // DEA Schedule (if controlled substance)
  deaSchedule?: '2' | '3' | '4' | '5'

  // Pharmacy
  pharmacyNCPDP?: string // Pharmacy ID
  pharmacyName?: string

  // Status
  status: 'ACTIVE' | 'COMPLETED' | 'DISCONTINUED' | 'ON_HOLD'

  // E-Prescribing
  ePrescribingSent: boolean
  ePrescribingDate?: Date
  ePrescribingStatus?: 'SENT' | 'RECEIVED' | 'ERROR'

  // FHIR Integration
  fhirMedicationRequestId?: string
  fhirLastSynced?: Date
}

// ============================================
// VITAL SIGNS (LOINC Coded)
// ============================================

export interface VitalSigns {
  id: string
  patientId: string
  encounterId?: string

  // Measurement Time
  measuredAt: Date

  // Vital Signs (LOINC coded)
  bloodPressureSystolic?: number // LOINC: 8480-6 (mmHg)
  bloodPressureDiastolic?: number // LOINC: 8462-4 (mmHg)
  heartRate?: number // LOINC: 8867-4 (bpm)
  temperature?: number // LOINC: 8310-5 (°F or °C)
  temperatureUnit: 'FAHRENHEIT' | 'CELSIUS'
  respiratoryRate?: number // LOINC: 9279-1 (breaths/min)
  oxygenSaturation?: number // LOINC: 2708-6 (%)
  weight?: number // LOINC: 29463-7
  weightUnit: 'LBS' | 'KG'
  height?: number // LOINC: 8302-2
  heightUnit: 'INCHES' | 'CM'
  bmi?: number // LOINC: 39156-5
  painScore?: number // LOINC: 72514-3 (0-10)

  // Measured By
  measuredByUserId: string
  measuredByUserName: string
  measuredByRole: string

  // Device Information
  deviceId?: string
  deviceType: 'MANUAL' | 'WEARABLE' | 'BEDSIDE_MONITOR' | 'REMOTE_MONITORING'

  // FHIR Integration
  fhirObservationIds?: string[] // Multiple observations
  fhirLastSynced?: Date
}

// ============================================
// LAB RESULTS (LOINC Coded)
// ============================================

export interface LabResult {
  id: string
  patientId: string
  encounterId?: string

  // Order Information
  orderNumber: string
  orderedAt: Date
  orderedById: string
  orderedByNPI: string

  // Panel Information
  panelCode: string // LOINC code for panel
  panelName: string

  // Individual Results
  results: {
    loincCode: string
    testName: string
    value: string
    unit: string
    referenceRange?: string
    abnormalFlag?: 'L' | 'H' | 'LL' | 'HH' | 'N' | 'A' // Low, High, Critical Low, Critical High, Normal, Abnormal
    status: 'PRELIMINARY' | 'FINAL' | 'CORRECTED' | 'CANCELLED'
  }[]

  // Collection Details
  collectedAt?: Date
  collectedByUserId?: string
  specimenType?: string

  // Resulted Information
  resultedAt?: Date
  resultedById?: string
  reviewedById?: string
  reviewedByNPI?: string
  reviewedAt?: Date

  // Status
  overallStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

  // FHIR Integration
  fhirDiagnosticReportId?: string
  fhirObservationIds?: string[]
  fhirLastSynced?: Date
}

// ============================================
// INPATIENT ADMISSION
// ============================================

export interface InpatientAdmission {
  id: string
  patientId: string
  encounterId: string

  // Admission Details
  admissionDate: Date
  anticipatedDischargeDate?: Date
  actualDischargeDate?: Date

  admissionType: 'ELECTIVE' | 'URGENT' | 'EMERGENCY' | 'NEWBORN' | 'TRAUMA'
  admissionSource: 'PHYSICIAN_REFERRAL' | 'ER' | 'TRANSFER' | 'BIRTH' | 'OTHER'

  // Bed Assignment
  unit: string
  room: string
  bed: string
  bedType: 'GENERAL' | 'ICU' | 'STEP_DOWN' | 'TELEMETRY' | 'ISOLATION'

  // Clinical Team
  attendingPhysicianId: string
  attendingPhysicianNPI: string
  consultingPhysicians?: string[]
  assignedNurseId?: string

  // Diagnosis
  admittingDiagnosis: string // ICD-10-CM
  principalDiagnosis?: string // Final diagnosis
  secondaryDiagnoses?: string[]

  // Procedures
  procedures?: {
    code: string // ICD-10-PCS or CPT
    description: string
    performedAt: Date
    performedBy: string
    performedByNPI: string
  }[]

  // Discharge
  dischargeStatus?: 'HOME' | 'SNF' | 'REHAB' | 'AMA' | 'HOSPICE' | 'DECEASED' | 'TRANSFER'
  dischargeDisposition?: string
  dischargeSummaryId?: string

  // Financial
  expectedPayer?: string
  authorizationNumber?: string
  estimatedCost?: number

  // DRG (Diagnosis Related Group)
  drgCode?: string
  drgDescription?: string

  // Status
  status: 'ADMITTED' | 'DISCHARGED' | 'TRANSFERRED' | 'CANCELLED'

  // Metadata
  createdAt: Date
  updatedAt: Date
}

// ============================================
// REAL-TIME COLLABORATION
// ============================================

export interface UserPresence {
  userId: string
  userName: string
  patientId: string
  action: 'VIEWING' | 'EDITING' | 'IDLE'
  lastActivity: Date
  socketId: string
}

export interface ActivityLog {
  id: string
  patientId: string
  userId: string
  userName: string
  userRole: string
  action: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  details?: Record<string, any>
}

// ============================================
// HIPAA AUDIT LOG
// ============================================

export interface HIPAAAuditLog {
  id: string
  patientId: string

  // Access Information
  accessDate: Date
  accessType: 'READ' | 'CREATE' | 'UPDATE' | 'DELETE' | 'PRINT' | 'EXPORT' | 'DOWNLOAD'

  // User Information
  userId: string
  userName: string
  userRole: string
  userNPI?: string
  department: string

  // Technical Information
  ipAddress: string
  userAgent: string
  sessionId: string

  // Accessed Data
  dataFields: string[] // Which PHI fields were accessed
  dataDetails?: Record<string, any>

  // Legal Basis (HIPAA)
  legalBasis: 'TREATMENT' | 'PAYMENT' | 'OPERATIONS' | 'PATIENT_REQUEST' | 'LEGAL_REQUIREMENT' | 'PUBLIC_HEALTH' | 'RESEARCH'

  // Break-the-Glass (Emergency Access)
  emergencyAccess: boolean
  emergencyReason?: string
  emergencyApprovedBy?: string

  // Disclosure Tracking (for external sharing)
  disclosedTo?: string
  disclosureReason?: string
  disclosureDate?: Date
}

// ============================================
// REMOTE PATIENT MONITORING (RPM)
// ============================================

export interface RemoteMonitoringDevice {
  id: string
  patientId: string

  // Device Information
  deviceType: 'BLOOD_PRESSURE' | 'GLUCOSE' | 'WEIGHT_SCALE' | 'PULSE_OX' | 'ECG' | 'ACTIVITY_TRACKER' | 'SLEEP_MONITOR'
  manufacturer: string
  model: string
  serialNumber: string

  // Integration
  integrationMethod: 'APPLE_HEALTH' | 'GOOGLE_FIT' | 'FITBIT' | 'API' | 'MANUAL'
  apiEndpoint?: string
  lastSyncDate?: Date

  // Status
  active: boolean
  assignedDate: Date
  removedDate?: Date

  // CPT Billing Codes (for RPM reimbursement)
  billingCode?: '99453' | '99454' | '99457' | '99458' // RPM CPT codes

  // Data
  readings: RemoteMonitoringReading[]
}

export interface RemoteMonitoringReading {
  id: string
  deviceId: string
  patientId: string

  // Reading Details
  readingType: string // LOINC code
  value: number
  unit: string
  measuredAt: Date

  // Flags
  abnormalFlag?: 'L' | 'H' | 'LL' | 'HH'
  alertTriggered: boolean
  alertReviewedBy?: string
  alertReviewedAt?: Date

  // Transmission
  transmittedAt: Date
  transmissionMethod: 'CELLULAR' | 'BLUETOOTH' | 'WIFI' | 'MANUAL'

  // FHIR Integration
  fhirObservationId?: string
}

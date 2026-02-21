// FDA AI/ML-Enabled Device Compliance Data Service
// Production-grade implementation for FDA January 2025 Draft Guidance
// Compliance with 21 CFR Part 11, PCCP requirements, and device lifecycle management

export interface AIModelRegistration {
  id: string
  modelName: string
  modelVersion: string
  intendedUse: string
  deviceClassification: 'Class I' | 'Class II' | 'Class III'
  regulatoryPathway: '510(k)' | 'PMA' | 'De Novo' | 'Exempt'
  fdaStatus: 'Not Submitted' | 'In Review' | 'Approved' | 'Rejected' | 'Withdrawn'
  submissionDate: Date | null
  approvalDate: Date | null
  rejectionReason?: string

  // Model Details
  modelType: 'Supervised Learning' | 'Unsupervised Learning' | 'Reinforcement Learning' | 'Deep Learning' | 'Ensemble'
  trainingDataset: {
    name: string
    size: number // number of samples
    demographics: string
    sourceInstitutions: string[]
    dateRange: { start: Date; end: Date }
    biasAssessment: string
  }

  // Deployment Information
  deploymentDate: Date | null
  deploymentEnvironment: 'Production' | 'Staging' | 'Testing' | 'Retired'
  clinicalSetting: string[]
  targetUserRole: string[]

  // PCCP (Predetermined Change Control Plan)
  pccp: PCCPlan | null

  // Performance Metrics
  performanceMetrics: PerformanceMetric[]

  // Labeling Information
  labelingInfo: AILabeling

  // Risk Management
  riskClass: 'Low' | 'Moderate' | 'High'
  riskMitigationStrategies: string[]

  // Version Control
  previousVersions: string[]
  changeLog: ChangeLogEntry[]

  // Compliance
  lastAuditDate: Date | null
  nextAuditDue: Date | null
  complianceScore: number // 0-100
  outstandingIssues: ComplianceIssue[]
  auditLogs: AuditLog[]
}

export interface PCCPlan {
  id: string
  modelId: string
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Active'
  submissionDate: Date | null
  approvalDate: Date | null

  // Modification Types Allowed
  allowedModifications: {
    type: 'Performance Improvements' | 'Algorithm Updates' | 'Training Data Updates' | 'Feature Engineering' | 'Bug Fixes'
    description: string
    impactLevel: 'Low' | 'Moderate' | 'Significant'
    requiresFDANotification: boolean
  }[]

  // Protocols and Procedures
  protocols: {
    id: string
    name: string
    description: string
    procedure: string
    responsibleParty: string
    frequency: string
  }[]

  // Impact Assessments
  impactAssessments: {
    modificationType: string
    safetyImpact: string
    effectivenessImpact: string
    validationRequired: boolean
    testingProtocol: string
  }[]

  // Performance Boundaries
  performanceBoundaries: {
    metric: string
    minimumThreshold: number
    maximumThreshold: number
    currentValue: number
    triggerAction: string
  }[]
}

export interface PerformanceMetric {
  id: string
  modelId: string
  recordedDate: Date
  environment: 'Production' | 'Staging' | 'Testing'

  // Core Performance Metrics
  accuracy: number
  precision: number
  recall: number
  sensitivity: number
  specificity: number
  f1Score: number
  auc: number // Area Under Curve

  // Clinical Metrics
  truePositiveRate: number
  falsePositiveRate: number
  trueNegativeRate: number
  falseNegativeRate: number

  // Model Drift Detection
  driftScore: number // 0-1, higher = more drift
  driftStatus: 'Normal' | 'Warning' | 'Critical'
  driftType: 'None' | 'Covariate Shift' | 'Concept Drift' | 'Label Shift' | 'Multiple'

  // Input/Output Distribution Tracking
  inputDistribution: {
    feature: string
    mean: number
    standardDeviation: number
    skewness: number
    kurtosis: number
    distributionType: string
  }[]

  outputDistribution: {
    class: string
    frequency: number
    percentage: number
    trend: 'Increasing' | 'Decreasing' | 'Stable'
  }[]

  // Sample Size
  totalSamples: number
  demographicBreakdown: {
    category: string
    subcategory: string
    count: number
    performanceMetric: number
  }[]

  // Alerts
  alerts: {
    type: 'Performance Degradation' | 'Distribution Shift' | 'Threshold Breach' | 'Safety Concern'
    severity: 'Low' | 'Medium' | 'High' | 'Critical'
    description: string
    triggeredDate: Date
    resolved: boolean
    resolutionDate?: Date
  }[]
}

export interface AILabeling {
  id: string
  modelId: string
  version: string
  lastUpdated: Date
  fdaCompliant: boolean
  complianceCheckDate: Date

  // Plain Language Description (FDA Requirement)
  plainLanguageDescription: string

  // Patient-Facing Disclosure
  patientDisclosure: {
    enabled: boolean
    title: string
    content: string
    acknowledgmentRequired: boolean
    languagesAvailable: string[]
  }

  // Clinician Guidance
  clinicianGuidance: {
    intendedUse: string
    clinicalContext: string
    interpretation: string
    actionableInsights: string
    limitations: string[]
    warnings: string[]
    contraindications: string[]
  }

  // Limitations and Warnings
  limitations: {
    category: 'Technical' | 'Clinical' | 'Population' | 'Environmental'
    description: string
    severity: 'Minor' | 'Moderate' | 'Significant'
  }[]

  // Training Data Description
  trainingDataDescription: string

  // Performance Specifications
  performanceSpecs: {
    metric: string
    value: string
    conditions: string
  }[]

  // Indications for Use
  indicationsForUse: string[]

  // User Qualifications
  requiredUserQualifications: string[]
}

export interface ChangeLogEntry {
  id: string
  modelId: string
  version: string
  changeDate: Date
  changeType: 'Major Update' | 'Minor Update' | 'Patch' | 'Hotfix' | 'Rollback'

  // Change Details
  description: string
  rationale: string
  affectedComponents: string[]

  // PCCP Compliance
  pccpCovered: boolean
  pccpModificationType?: string
  fdaNotificationRequired: boolean
  fdaNotificationDate?: Date

  // Validation
  validationPerformed: boolean
  validationResults: string
  validationDate?: Date

  // Approval
  approvedBy: string
  approvalDate: Date

  // Impact Assessment
  impactAssessment: {
    safety: 'No Impact' | 'Low Impact' | 'Moderate Impact' | 'High Impact'
    effectiveness: 'Improved' | 'Unchanged' | 'Degraded'
    usability: 'Improved' | 'Unchanged' | 'Degraded'
  }
}

export interface ComplianceIssue {
  id: string
  modelId: string
  issueType: 'Performance' | 'Labeling' | 'PCCP' | 'Documentation' | 'Reporting' | 'Safety'
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Open' | 'In Progress' | 'Resolved' | 'Escalated'

  // Issue Details
  title: string
  description: string
  identifiedDate: Date
  identifiedBy: string

  // Resolution
  assignedTo?: string
  targetResolutionDate: Date
  actualResolutionDate?: Date
  resolutionNotes?: string

  // FDA Reporting
  requiresFDAReport: boolean
  fdaReportSubmitted: boolean
  fdaReportDate?: Date
  fdaReportNumber?: string
}

export interface AuditTrailEntry {
  id: string
  modelId: string
  timestamp: Date
  eventType: 'Model Prediction' | 'Performance Review' | 'Configuration Change' | 'PCCP Modification' | 'FDA Submission' | 'Labeling Update' | 'Audit' | 'Alert'

  // Event Details
  description: string
  userId: string
  userName: string
  userRole: string

  // Context
  sessionId?: string
  patientId?: string // Encrypted/de-identified
  clinicalContext?: string

  // Data
  inputData?: Record<string, any>
  outputData?: Record<string, any>
  predictionConfidence?: number

  // System Information
  systemVersion: string
  modelVersion: string
  environmentId: string

  // Compliance
  regulatoryRelevant: boolean
  retentionPeriod: number // days
}

export interface AuditLog {
  id: string
  modelId: string
  timestamp: Date
  action: string
  performedBy: string
  performedByRole: string
  performedById: string
  details: string
  category: 'Configuration' | 'Performance' | 'FDA Submission' | 'PCCP Update' | 'Deployment' | 'Model Training' | 'Compliance Review' | 'Risk Assessment' | 'Data Update' | 'Security'
  severity: 'Info' | 'Warning' | 'Critical'
  status: 'Completed' | 'In Progress' | 'Failed' | 'Pending Review'
  ipAddress: string
  location: string
  affectedComponents: string[]
  beforeState?: Record<string, any>
  afterState?: Record<string, any>
  changesApplied?: Record<string, any>
  approvalRequired: boolean
  approvedBy?: string
  approvalDate?: Date
  complianceRelevant: boolean
  regulatoryImpact: 'None' | 'Low' | 'Medium' | 'High'
  attachments?: { name: string; url: string; type: string }[]
}

export interface FDASubmission {
  id: string
  modelId: string
  submissionType: '510(k)' | 'PMA' | 'De Novo' | 'Annual Report' | 'Adverse Event' | 'PCCP Update' | 'Recall'
  submissionDate: Date
  status: 'Preparing' | 'Submitted' | 'Under Review' | 'Additional Info Requested' | 'Approved' | 'Rejected'

  // Submission Details
  fdaSubmissionNumber?: string
  leadReviewer?: string
  reviewDivision?: string

  // Documents
  documents: {
    type: string
    name: string
    version: string
    uploadDate: Date
    fileSize: number
    status: 'Draft' | 'Final' | 'Submitted'
  }[]

  // Communication History
  communications: {
    date: Date
    type: 'Submission' | 'FDA Question' | 'Response' | 'Meeting Request' | 'Decision Letter'
    subject: string
    summary: string
    actionRequired: boolean
    dueDate?: Date
  }[]

  // Milestones
  milestones: {
    name: string
    targetDate: Date
    actualDate?: Date
    status: 'Pending' | 'Completed' | 'Delayed' | 'Blocked'
  }[]
}

// ============================================
// PRODUCTION-READY SAMPLE DATA
// ============================================

export const sampleAIModels: AIModelRegistration[] = [
  {
    id: 'ai-model-001',
    modelName: 'Pneumonia Detection AI',
    modelVersion: '2.1.0',
    intendedUse: 'Computer-aided detection of pneumonia in chest X-rays to assist radiologists in diagnosis',
    deviceClassification: 'Class II',
    regulatoryPathway: '510(k)',
    fdaStatus: 'Approved',
    submissionDate: new Date('2024-03-15'),
    approvalDate: new Date('2024-09-20'),
    modelType: 'Deep Learning',
    trainingDataset: {
      name: 'Multi-Center Chest X-Ray Dataset',
      size: 112120,
      demographics: 'Adults 18-85 years, 52% Female, 48% Male, diverse racial/ethnic representation',
      sourceInstitutions: ['Mass General Hospital', 'Johns Hopkins', 'Mayo Clinic', 'Cleveland Clinic'],
      dateRange: { start: new Date('2020-01-01'), end: new Date('2023-12-31') },
      biasAssessment: 'Comprehensive bias analysis performed. No significant disparities across demographic groups.'
    },
    deploymentDate: new Date('2024-10-01'),
    deploymentEnvironment: 'Production',
    clinicalSetting: ['Hospital Radiology', 'Emergency Department', 'Urgent Care'],
    targetUserRole: ['Radiologist', 'Emergency Physician', 'Pulmonologist'],
    pccp: {
      id: 'pccp-001',
      modelId: 'ai-model-001',
      status: 'Active',
      submissionDate: new Date('2024-03-15'),
      approvalDate: new Date('2024-09-20'),
      allowedModifications: [
        {
          type: 'Performance Improvements',
          description: 'Incremental improvements to sensitivity/specificity through hyperparameter tuning',
          impactLevel: 'Low',
          requiresFDANotification: false
        },
        {
          type: 'Training Data Updates',
          description: 'Addition of new validated training data from approved institutions',
          impactLevel: 'Moderate',
          requiresFDANotification: true
        }
      ],
      protocols: [
        {
          id: 'protocol-001',
          name: 'Model Retraining Protocol',
          description: 'Quarterly model retraining with new validated data',
          procedure: 'Data validation → Retraining → Internal validation → External validation → Deployment',
          responsibleParty: 'AI Engineering Team',
          frequency: 'Quarterly'
        }
      ],
      impactAssessments: [
        {
          modificationType: 'Training Data Updates',
          safetyImpact: 'Low - Improves generalization, maintains safety profile',
          effectivenessImpact: 'Positive - Expected 2-5% improvement in sensitivity',
          validationRequired: true,
          testingProtocol: 'External validation on 5000+ holdout cases from 3+ institutions'
        }
      ],
      performanceBoundaries: [
        {
          metric: 'Sensitivity',
          minimumThreshold: 0.92,
          maximumThreshold: 1.0,
          currentValue: 0.947,
          triggerAction: 'Immediate model freeze and investigation if falls below 0.92'
        },
        {
          metric: 'Specificity',
          minimumThreshold: 0.88,
          maximumThreshold: 1.0,
          currentValue: 0.912,
          triggerAction: 'Performance review if falls below 0.88'
        }
      ]
    },
    performanceMetrics: [
      {
        id: 'perf-001-2024-12',
        modelId: 'ai-model-001',
        recordedDate: new Date('2024-12-20'),
        environment: 'Production',
        accuracy: 0.934,
        precision: 0.921,
        recall: 0.947,
        sensitivity: 0.947,
        specificity: 0.912,
        f1Score: 0.934,
        auc: 0.973,
        truePositiveRate: 0.947,
        falsePositiveRate: 0.088,
        trueNegativeRate: 0.912,
        falseNegativeRate: 0.053,
        driftScore: 0.12,
        driftStatus: 'Normal',
        driftType: 'None',
        inputDistribution: [
          {
            feature: 'Image Quality Score',
            mean: 8.7,
            standardDeviation: 1.2,
            skewness: -0.3,
            kurtosis: 2.1,
            distributionType: 'Normal'
          }
        ],
        outputDistribution: [
          {
            class: 'Pneumonia Detected',
            frequency: 2847,
            percentage: 18.3,
            trend: 'Stable'
          },
          {
            class: 'No Pneumonia',
            frequency: 12718,
            percentage: 81.7,
            trend: 'Stable'
          }
        ],
        totalSamples: 15565,
        demographicBreakdown: [
          {
            category: 'Age',
            subcategory: '18-40',
            count: 4669,
            performanceMetric: 0.941
          },
          {
            category: 'Age',
            subcategory: '41-65',
            count: 6782,
            performanceMetric: 0.938
          },
          {
            category: 'Age',
            subcategory: '65+',
            count: 4114,
            performanceMetric: 0.943
          }
        ],
        alerts: []
      }
    ],
    labelingInfo: {
      id: 'label-001',
      modelId: 'ai-model-001',
      version: '2.1.0',
      lastUpdated: new Date('2024-10-01'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-12-15'),
      plainLanguageDescription: 'This AI software analyzes your chest X-ray images to help doctors detect signs of pneumonia. It works as a second set of eyes to assist your doctor in making a diagnosis, but the final decision is always made by your healthcare provider.',
      patientDisclosure: {
        enabled: true,
        title: 'AI-Assisted Imaging Analysis',
        content: 'Your X-ray will be analyzed by artificial intelligence software in addition to being reviewed by a radiologist. This AI tool helps identify potential pneumonia, but your doctor will make the final diagnosis and treatment decisions.',
        acknowledgmentRequired: true,
        languagesAvailable: ['English', 'Spanish', 'Mandarin', 'Arabic']
      },
      clinicianGuidance: {
        intendedUse: 'Computer-aided detection of pneumonia in adult chest X-rays (PA and lateral views)',
        clinicalContext: 'Use as a concurrent read tool during radiologist interpretation of chest X-rays',
        interpretation: 'AI provides probability score (0-100%) for pneumonia presence. Scores >75% indicate high confidence. Review all flagged cases with clinical context.',
        actionableInsights: 'Flagged cases should undergo careful radiologist review. Consider correlation with clinical symptoms, labs, and patient history.',
        limitations: [
          'Not validated for pediatric patients under 18',
          'Performance may degrade with poor image quality',
          'Not intended as standalone diagnostic tool'
        ],
        warnings: [
          'Do not use as sole basis for diagnosis',
          'Clinical correlation required for all findings'
        ],
        contraindications: [
          'Not for use in patients under 18 years',
          'Not for use with portable/bedside X-rays without quality verification'
        ]
      },
      limitations: [
        {
          category: 'Population',
          description: 'Not validated for pediatric patients',
          severity: 'Significant'
        },
        {
          category: 'Technical',
          description: 'Requires high-quality digital X-ray images (minimum 2048x2048 resolution)',
          severity: 'Moderate'
        }
      ],
      trainingDataDescription: 'Model trained on 112,120 chest X-rays from 4 major academic medical centers spanning 2020-2023, with diverse patient demographics.',
      performanceSpecs: [
        {
          metric: 'Sensitivity',
          value: '94.7%',
          conditions: 'Multi-center validation dataset (n=15,565)'
        },
        {
          metric: 'Specificity',
          value: '91.2%',
          conditions: 'Multi-center validation dataset (n=15,565)'
        }
      ],
      indicationsForUse: [
        'Adult patients 18 years and older',
        'Chest X-ray interpretation (PA and lateral views)',
        'Suspected community-acquired pneumonia'
      ],
      requiredUserQualifications: [
        'Board-certified radiologist',
        'Emergency medicine physician with radiology training',
        'Completed AI tool orientation training'
      ]
    },
    riskClass: 'Moderate',
    riskMitigationStrategies: [
      'Mandatory radiologist override capability',
      'Continuous performance monitoring',
      'Regular model drift detection',
      'User training requirements'
    ],
    previousVersions: ['1.0.0', '1.5.0', '2.0.0'],
    changeLog: [
      {
        id: 'change-001',
        modelId: 'ai-model-001',
        version: '2.1.0',
        changeDate: new Date('2024-10-01'),
        changeType: 'Minor Update',
        description: 'Improved sensitivity through additional training data from diverse patient populations',
        rationale: 'Address minor performance gaps in patients over 75 years',
        affectedComponents: ['Training Dataset', 'Model Weights'],
        pccpCovered: true,
        pccpModificationType: 'Training Data Updates',
        fdaNotificationRequired: true,
        fdaNotificationDate: new Date('2024-09-25'),
        validationPerformed: true,
        validationResults: 'Sensitivity improved from 93.1% to 94.7% with no decrease in specificity',
        validationDate: new Date('2024-09-15'),
        approvedBy: 'Dr. Sarah Chen, Medical Director',
        approvalDate: new Date('2024-09-28'),
        impactAssessment: {
          safety: 'No Impact',
          effectiveness: 'Improved',
          usability: 'Unchanged'
        }
      }
    ],
    lastAuditDate: new Date('2024-12-15'),
    nextAuditDue: new Date('2025-03-15'),
    complianceScore: 98,
    outstandingIssues: [],
    auditLogs: [
      {
        id: 'audit-001-001',
        modelId: 'ai-model-001',
        timestamp: new Date('2024-12-20T14:30:00'),
        action: 'Model Performance Review',
        performedBy: 'Dr. Sarah Chen',
        performedByRole: 'AI Safety Officer',
        performedById: 'user-12345',
        details: 'Quarterly performance review completed. All metrics within acceptable thresholds.',
        category: 'Performance',
        severity: 'Info',
        status: 'Completed',
        ipAddress: '192.168.1.100',
        location: 'Boston, MA',
        affectedComponents: ['Performance Monitoring', 'Drift Detection'],
        approvalRequired: false,
        complianceRelevant: true,
        regulatoryImpact: 'Low',
      },
      {
        id: 'audit-001-002',
        modelId: 'ai-model-001',
        timestamp: new Date('2024-12-15T09:15:00'),
        action: 'FDA Compliance Audit',
        performedBy: 'Regulatory Team',
        performedByRole: 'Compliance Auditor',
        performedById: 'user-audit-01',
        details: 'Annual FDA compliance audit completed. No major findings. Minor documentation updates required.',
        category: 'Compliance Review',
        severity: 'Info',
        status: 'Completed',
        ipAddress: '192.168.1.105',
        location: 'Boston, MA',
        affectedComponents: ['FDA Submissions', 'Documentation', 'PCCP'],
        approvalRequired: true,
        approvedBy: 'Dr. Michael Roberts',
        approvalDate: new Date('2024-12-16T10:00:00'),
        complianceRelevant: true,
        regulatoryImpact: 'Medium',
      },
      {
        id: 'audit-001-003',
        modelId: 'ai-model-001',
        timestamp: new Date('2024-12-10T16:45:00'),
        action: 'PCCP Update Submission',
        performedBy: 'AI Engineering Team',
        performedByRole: 'ML Engineer',
        performedById: 'user-eng-03',
        details: 'Updated PCCP to include new training data sources. FDA notification required.',
        category: 'PCCP Update',
        severity: 'Warning',
        status: 'Pending Review',
        ipAddress: '192.168.1.110',
        location: 'Boston, MA',
        affectedComponents: ['PCCP', 'Training Data', 'FDA Submissions'],
        approvalRequired: true,
        complianceRelevant: true,
        regulatoryImpact: 'High',
      },
      {
        id: 'audit-001-004',
        modelId: 'ai-model-001',
        timestamp: new Date('2024-12-05T11:20:00'),
        action: 'Model Deployment to Production',
        performedBy: 'DevOps Team',
        performedByRole: 'DevOps Engineer',
        performedById: 'user-ops-02',
        details: 'Successfully deployed model version 2.1.0 to production environment.',
        category: 'Deployment',
        severity: 'Info',
        status: 'Completed',
        ipAddress: '192.168.1.115',
        location: 'Boston, MA',
        affectedComponents: ['Production Environment', 'Model Version Control'],
        approvalRequired: true,
        approvedBy: 'Dr. Sarah Chen',
        approvalDate: new Date('2024-12-05T10:00:00'),
        complianceRelevant: true,
        regulatoryImpact: 'Medium',
      },
      {
        id: 'audit-001-005',
        modelId: 'ai-model-001',
        timestamp: new Date('2024-11-28T08:30:00'),
        action: 'Security Vulnerability Patch',
        performedBy: 'Security Team',
        performedByRole: 'Security Engineer',
        performedById: 'user-sec-01',
        details: 'Applied critical security patch to model inference pipeline. No impact on model performance.',
        category: 'Security',
        severity: 'Critical',
        status: 'Completed',
        ipAddress: '192.168.1.120',
        location: 'Boston, MA',
        affectedComponents: ['Inference Pipeline', 'Security Layer'],
        approvalRequired: true,
        approvedBy: 'CISO',
        approvalDate: new Date('2024-11-28T07:00:00'),
        complianceRelevant: true,
        regulatoryImpact: 'Low',
      }
    ]
  },
  {
    id: 'ai-model-002',
    modelName: 'Diabetic Retinopathy Screening',
    modelVersion: '1.3.2',
    intendedUse: 'Automated screening of fundus photographs for diabetic retinopathy to enable early detection in primary care settings',
    deviceClassification: 'Class II',
    regulatoryPathway: '510(k)',
    fdaStatus: 'Approved',
    submissionDate: new Date('2023-11-10'),
    approvalDate: new Date('2024-06-18'),
    modelType: 'Deep Learning',
    trainingDataset: {
      name: 'International Diabetic Retinopathy Dataset',
      size: 88436,
      demographics: 'Diabetic patients 25-80 years, 48% Female, 52% Male, multiple ethnicities',
      sourceInstitutions: ['UCSF', 'Stanford', 'Duke', 'International Partners'],
      dateRange: { start: new Date('2019-01-01'), end: new Date('2023-06-30') },
      biasAssessment: 'Validated across diverse skin tones and ethnic backgrounds. No significant bias detected.'
    },
    deploymentDate: new Date('2024-07-01'),
    deploymentEnvironment: 'Production',
    clinicalSetting: ['Primary Care', 'Endocrinology', 'Ophthalmology', 'Retail Clinic'],
    targetUserRole: ['Primary Care Physician', 'Endocrinologist', 'Ophthalmologist', 'Optometrist'],
    pccp: null,
    performanceMetrics: [],
    labelingInfo: {
      id: 'label-002',
      modelId: 'ai-model-002',
      version: '1.3.2',
      lastUpdated: new Date('2024-07-01'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-12-10'),
      plainLanguageDescription: 'This AI analyzes photographs of your eyes to check for signs of diabetic retinopathy, a complication of diabetes that can affect vision. Early detection allows for timely treatment.',
      patientDisclosure: {
        enabled: true,
        title: 'AI Eye Screening',
        content: 'Photos of your eyes will be analyzed by AI software to screen for diabetic retinopathy. If concerning findings are detected, you will be referred to an eye specialist.',
        acknowledgmentRequired: false,
        languagesAvailable: ['English', 'Spanish']
      },
      clinicianGuidance: {
        intendedUse: 'Automated screening for diabetic retinopathy in diabetic patients',
        clinicalContext: 'Point-of-care screening tool for primary care and endocrinology settings',
        interpretation: 'Binary output: Refer to ophthalmology or No retinopathy detected',
        actionableInsights: 'Positive screens require ophthalmology referral within 1 month',
        limitations: ['Requires adequate image quality', 'Not for treatment monitoring'],
        warnings: ['Not a substitute for comprehensive eye examination'],
        contraindications: ['Poor image quality', 'Known advanced retinopathy']
      },
      limitations: [
        {
          category: 'Technical',
          description: 'Requires fundus camera with minimum quality standards',
          severity: 'Moderate'
        }
      ],
      trainingDataDescription: 'Trained on 88,436 fundus images from international sources',
      performanceSpecs: [
        {
          metric: 'Sensitivity',
          value: '91.3%',
          conditions: 'Validation dataset (n=10,000)'
        }
      ],
      indicationsForUse: ['Diabetic patients requiring retinopathy screening'],
      requiredUserQualifications: ['Licensed healthcare provider', 'Fundus camera operation training']
    },
    riskClass: 'Moderate',
    riskMitigationStrategies: ['Automatic quality check', 'Referral pathway for positive findings'],
    previousVersions: ['1.0.0', '1.2.0', '1.3.0'],
    changeLog: [],
    lastAuditDate: new Date('2024-11-30'),
    nextAuditDue: new Date('2025-02-28'),
    complianceScore: 95,
    outstandingIssues: [
      {
        id: 'issue-001',
        modelId: 'ai-model-002',
        issueType: 'Documentation',
        severity: 'Low',
        status: 'In Progress',
        title: 'User manual update required',
        description: 'User manual needs minor updates to reflect latest workflow changes',
        identifiedDate: new Date('2024-12-01'),
        identifiedBy: 'Quality Assurance Team',
        assignedTo: 'Technical Writing Team',
        targetResolutionDate: new Date('2025-01-15'),
        requiresFDAReport: false,
        fdaReportSubmitted: false
      }
    ],
    auditLogs: []
  },
  {
    id: 'ai-model-003',
    modelName: 'Sepsis Early Warning System',
    modelVersion: '3.0.1',
    intendedUse: 'Real-time monitoring and early prediction of sepsis risk in hospitalized patients using continuous vital signs and laboratory data',
    deviceClassification: 'Class III',
    regulatoryPathway: 'PMA',
    fdaStatus: 'In Review',
    submissionDate: new Date('2024-08-01'),
    approvalDate: null,
    modelType: 'Ensemble',
    trainingDataset: {
      name: 'Multi-Hospital ICU Dataset',
      size: 247891,
      demographics: 'ICU patients 18+, all demographics, 45% Female, 55% Male',
      sourceInstitutions: ['Partners Healthcare', 'University of Michigan', 'UPMC', 'Cedars-Sinai'],
      dateRange: { start: new Date('2018-01-01'), end: new Date('2024-03-31') },
      biasAssessment: 'Extensive fairness analysis conducted across age, sex, race, and socioeconomic factors'
    },
    deploymentDate: null,
    deploymentEnvironment: 'Testing',
    clinicalSetting: ['Intensive Care Unit', 'Emergency Department', 'Medical-Surgical Units'],
    targetUserRole: ['Intensivist', 'Hospitalist', 'Emergency Physician', 'Critical Care Nurse'],
    pccp: null,
    performanceMetrics: [],
    labelingInfo: {
      id: 'label-003',
      modelId: 'ai-model-003',
      version: '3.0.1',
      lastUpdated: new Date('2024-08-01'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-07-28'),
      plainLanguageDescription: 'This AI system continuously monitors your vital signs and laboratory results to detect early warning signs of sepsis, a serious blood infection. Early detection enables faster treatment.',
      patientDisclosure: {
        enabled: false,
        title: 'Continuous Sepsis Monitoring',
        content: 'Your medical team is using AI to help monitor for early signs of sepsis.',
        acknowledgmentRequired: false,
        languagesAvailable: ['English']
      },
      clinicianGuidance: {
        intendedUse: 'Early prediction of sepsis risk in hospitalized patients',
        clinicalContext: 'Continuous monitoring system integrated with EHR',
        interpretation: 'Risk score 0-100. Scores >70 trigger clinical review protocol',
        actionableInsights: 'High-risk alerts should prompt immediate clinical assessment and consideration of sepsis bundle',
        limitations: ['Not for use in patients under 18', 'Requires complete vital signs data'],
        warnings: ['Clinical judgment required', 'Not a substitute for clinical assessment'],
        contraindications: ['Pediatric patients', 'Incomplete monitoring data']
      },
      limitations: [
        {
          category: 'Clinical',
          description: 'Performance depends on complete and timely data inputs',
          severity: 'Significant'
        }
      ],
      trainingDataDescription: 'Trained on 247,891 ICU patient encounters from 4 major academic health systems',
      performanceSpecs: [
        {
          metric: 'Sensitivity',
          value: '88.5%',
          conditions: '4-hour prediction window, validation cohort (n=50,000)'
        },
        {
          metric: 'Specificity',
          value: '89.7%',
          conditions: '4-hour prediction window, validation cohort (n=50,000)'
        }
      ],
      indicationsForUse: ['Hospitalized adult patients at risk for sepsis'],
      requiredUserQualifications: ['ICU or hospital medicine physician', 'Critical care nurse', 'System training completed']
    },
    riskClass: 'High',
    riskMitigationStrategies: [
      'Dual clinician review for high-risk alerts',
      'Integration with rapid response teams',
      'Continuous performance monitoring',
      'Regular clinical validation studies'
    ],
    previousVersions: ['1.0.0', '2.0.0', '2.5.0'],
    changeLog: [],
    lastAuditDate: new Date('2024-12-01'),
    nextAuditDue: new Date('2025-01-01'),
    complianceScore: 92,
    outstandingIssues: [
      {
        id: 'issue-002',
        modelId: 'ai-model-003',
        issueType: 'Performance',
        severity: 'Medium',
        status: 'In Progress',
        title: 'Performance validation in community hospitals',
        description: 'Additional validation needed in non-academic hospital settings',
        identifiedDate: new Date('2024-11-15'),
        identifiedBy: 'FDA Reviewer',
        assignedTo: 'Clinical Validation Team',
        targetResolutionDate: new Date('2025-02-28'),
        requiresFDAReport: true,
        fdaReportSubmitted: false
      }
    ],
    auditLogs: []
  },
  {
    id: 'ai-model-004',
    modelName: 'Stroke Detection CT Analysis',
    modelVersion: '1.8.5',
    intendedUse: 'Automated detection and quantification of acute ischemic stroke and hemorrhage in non-contrast CT brain scans to expedite time-critical treatment decisions',
    deviceClassification: 'Class II',
    regulatoryPathway: '510(k)',
    fdaStatus: 'Approved',
    submissionDate: new Date('2024-01-20'),
    approvalDate: new Date('2024-07-15'),
    modelType: 'Deep Learning',
    trainingDataset: {
      name: 'Global Stroke Imaging Consortium',
      size: 156783,
      demographics: 'Adults 25-95 years, 51% Female, 49% Male, global multi-ethnic dataset',
      sourceInstitutions: ['Massachusetts General', 'UCLA Medical Center', 'Toronto General', 'Karolinska Institute'],
      dateRange: { start: new Date('2017-01-01'), end: new Date('2023-12-31') },
      biasAssessment: 'Comprehensive validation across age, sex, race, and stroke subtypes. No significant algorithmic bias identified.'
    },
    deploymentDate: new Date('2024-08-01'),
    deploymentEnvironment: 'Production',
    clinicalSetting: ['Emergency Department', 'Stroke Center', 'Neurology ICU', 'Comprehensive Stroke Center'],
    targetUserRole: ['Emergency Physician', 'Neurologist', 'Neuroradiologist', 'Stroke Team'],
    pccp: {
      id: 'pccp-004',
      modelId: 'ai-model-004',
      status: 'Active',
      submissionDate: new Date('2024-01-20'),
      approvalDate: new Date('2024-07-15'),
      allowedModifications: [
        {
          type: 'Performance Improvements',
          description: 'Optimization of hemorrhage detection sensitivity through hyperparameter refinement',
          impactLevel: 'Low',
          requiresFDANotification: false
        },
        {
          type: 'Algorithm Updates',
          description: 'Integration of advanced segmentation techniques for improved lesion quantification',
          impactLevel: 'Moderate',
          requiresFDANotification: true
        },
        {
          type: 'Training Data Updates',
          description: 'Incorporation of additional validated cases from international stroke registries',
          impactLevel: 'Moderate',
          requiresFDANotification: true
        }
      ],
      protocols: [
        {
          id: 'protocol-004',
          name: 'Emergency Model Validation Protocol',
          description: 'Real-time performance monitoring in emergency department settings',
          procedure: 'Continuous monitoring → Weekly performance review → Monthly validation report → Quarterly external audit',
          responsibleParty: 'Stroke AI Clinical Team',
          frequency: 'Weekly'
        }
      ],
      impactAssessments: [
        {
          modificationType: 'Algorithm Updates',
          safetyImpact: 'Minimal - Maintains current safety profile while improving accuracy',
          effectivenessImpact: 'Positive - Expected 3-7% improvement in small lesion detection',
          validationRequired: true,
          testingProtocol: 'Prospective validation on 3000+ consecutive cases from 5+ stroke centers'
        }
      ],
      performanceBoundaries: [
        {
          metric: 'Hemorrhage Detection Sensitivity',
          minimumThreshold: 0.96,
          maximumThreshold: 1.0,
          currentValue: 0.982,
          triggerAction: 'Immediate clinical hold and investigation if falls below 0.96'
        },
        {
          metric: 'Ischemic Stroke Sensitivity',
          minimumThreshold: 0.89,
          maximumThreshold: 1.0,
          currentValue: 0.934,
          triggerAction: 'Enhanced monitoring if falls below 0.89'
        }
      ]
    },
    performanceMetrics: [
      {
        id: 'perf-004-2024-12',
        modelId: 'ai-model-004',
        recordedDate: new Date('2024-12-22'),
        environment: 'Production',
        accuracy: 0.941,
        precision: 0.938,
        recall: 0.934,
        sensitivity: 0.934,
        specificity: 0.947,
        f1Score: 0.936,
        auc: 0.988,
        truePositiveRate: 0.934,
        falsePositiveRate: 0.053,
        trueNegativeRate: 0.947,
        falseNegativeRate: 0.066,
        driftScore: 0.08,
        driftStatus: 'Normal',
        driftType: 'None',
        inputDistribution: [
          {
            feature: 'Scan Quality Score',
            mean: 9.1,
            standardDeviation: 0.9,
            skewness: -0.5,
            kurtosis: 2.8,
            distributionType: 'Normal'
          }
        ],
        outputDistribution: [
          {
            class: 'Acute Stroke Detected',
            frequency: 1247,
            percentage: 14.2,
            trend: 'Stable'
          },
          {
            class: 'Hemorrhage Detected',
            frequency: 456,
            percentage: 5.2,
            trend: 'Stable'
          },
          {
            class: 'No Acute Findings',
            frequency: 7089,
            percentage: 80.6,
            trend: 'Stable'
          }
        ],
        totalSamples: 8792,
        demographicBreakdown: [
          {
            category: 'Age',
            subcategory: '25-50',
            count: 1318,
            performanceMetric: 0.929
          },
          {
            category: 'Age',
            subcategory: '51-75',
            count: 4835,
            performanceMetric: 0.941
          },
          {
            category: 'Age',
            subcategory: '76+',
            count: 2639,
            performanceMetric: 0.938
          }
        ],
        alerts: []
      }
    ],
    labelingInfo: {
      id: 'label-004',
      modelId: 'ai-model-004',
      version: '1.8.5',
      lastUpdated: new Date('2024-08-01'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-12-18'),
      plainLanguageDescription: 'This AI rapidly analyzes your brain CT scan to detect signs of stroke or bleeding. Quick detection helps your medical team start life-saving treatment faster.',
      patientDisclosure: {
        enabled: false,
        title: 'AI Stroke Detection',
        content: 'AI analysis is being used to help quickly identify stroke on your brain scan.',
        acknowledgmentRequired: false,
        languagesAvailable: ['English', 'Spanish']
      },
      clinicianGuidance: {
        intendedUse: 'Rapid triage and detection of acute ischemic stroke and intracranial hemorrhage on non-contrast CT',
        clinicalContext: 'Emergency stroke evaluation tool integrated with PACS workflow',
        interpretation: 'Binary detection with lesion volume quantification. Positive findings trigger automatic notifications to stroke team.',
        actionableInsights: 'Positive findings should be verified by radiologist. Integration with stroke protocols for tPA/thrombectomy decision-making.',
        limitations: [
          'Not validated for chronic stroke or small vessel disease',
          'May miss very small lesions (<5mm)',
          'Performance varies with image quality'
        ],
        warnings: [
          'Time-critical findings require immediate radiologist verification',
          'Not a substitute for clinical neurological examination'
        ],
        contraindications: [
          'Not for use with contrast-enhanced CT',
          'Not validated for pediatric patients'
        ]
      },
      limitations: [
        {
          category: 'Clinical',
          description: 'Not designed for posterior fossa lesions smaller than 5mm',
          severity: 'Moderate'
        },
        {
          category: 'Technical',
          description: 'Requires thin-slice (≤5mm) non-contrast CT',
          severity: 'Significant'
        }
      ],
      trainingDataDescription: 'Trained on 156,783 brain CT scans from global stroke centers, validated across diverse patient populations and scanner types.',
      performanceSpecs: [
        {
          metric: 'Hemorrhage Sensitivity',
          value: '98.2%',
          conditions: 'Multi-center validation (n=8,792)'
        },
        {
          metric: 'Ischemic Stroke Sensitivity',
          value: '93.4%',
          conditions: 'Multi-center validation (n=8,792)'
        },
        {
          metric: 'Time to Detection',
          value: '<60 seconds',
          conditions: 'Average processing time from scan completion'
        }
      ],
      indicationsForUse: [
        'Adult patients (18+) with suspected acute stroke',
        'Non-contrast brain CT evaluation',
        'Emergency department triage'
      ],
      requiredUserQualifications: [
        'Board-certified neurologist, neuroradiologist, or emergency physician',
        'Stroke imaging interpretation training',
        'AI tool certification completed'
      ]
    },
    riskClass: 'High',
    riskMitigationStrategies: [
      'Mandatory radiologist verification for all positive findings',
      'Integration with stroke team activation protocols',
      'Real-time performance monitoring',
      'Quarterly clinical validation studies',
      'False negative tracking and root cause analysis'
    ],
    previousVersions: ['1.0.0', '1.5.0', '1.7.0', '1.8.0'],
    changeLog: [
      {
        id: 'change-004',
        modelId: 'ai-model-004',
        version: '1.8.5',
        changeDate: new Date('2024-08-01'),
        changeType: 'Minor Update',
        description: 'Enhanced small lesion detection through improved segmentation algorithm',
        rationale: 'Address feedback from stroke neurologists regarding small posterior circulation strokes',
        affectedComponents: ['Segmentation Module', 'Detection Algorithm'],
        pccpCovered: true,
        pccpModificationType: 'Algorithm Updates',
        fdaNotificationRequired: true,
        fdaNotificationDate: new Date('2024-07-20'),
        validationPerformed: true,
        validationResults: 'Sensitivity for lesions 5-10mm improved from 87.3% to 93.4% with no change in specificity',
        validationDate: new Date('2024-07-25'),
        approvedBy: 'Dr. Michael Zhang, Chief of Neurology',
        approvalDate: new Date('2024-07-30'),
        impactAssessment: {
          safety: 'No Impact',
          effectiveness: 'Improved',
          usability: 'Unchanged'
        }
      }
    ],
    lastAuditDate: new Date('2024-12-10'),
    nextAuditDue: new Date('2025-02-10'),
    complianceScore: 97,
    outstandingIssues: [],
    auditLogs: []
  },
  {
    id: 'ai-model-005',
    modelName: 'Breast Cancer Mammography Assistant',
    modelVersion: '2.3.1',
    intendedUse: 'AI-assisted detection and characterization of breast lesions in digital mammography and tomosynthesis to improve early cancer detection rates',
    deviceClassification: 'Class II',
    regulatoryPathway: '510(k)',
    fdaStatus: 'Approved',
    submissionDate: new Date('2023-09-12'),
    approvalDate: new Date('2024-04-08'),
    modelType: 'Deep Learning',
    trainingDataset: {
      name: 'International Breast Screening Consortium Dataset',
      size: 428956,
      demographics: 'Women 40-75 years, diverse ethnic backgrounds, international screening populations',
      sourceInstitutions: ['Memorial Sloan Kettering', 'MD Anderson', 'Royal Marsden Hospital', 'Karolinska University Hospital'],
      dateRange: { start: new Date('2015-01-01'), end: new Date('2023-06-30') },
      biasAssessment: 'Validated across breast density categories and ethnic groups. Performance parity demonstrated across all demographic subgroups.'
    },
    deploymentDate: new Date('2024-05-01'),
    deploymentEnvironment: 'Production',
    clinicalSetting: ['Breast Imaging Center', 'Radiology Department', 'Screening Mammography', 'Diagnostic Mammography'],
    targetUserRole: ['Breast Radiologist', 'Radiologist', 'Breast Imaging Specialist'],
    pccp: {
      id: 'pccp-005',
      modelId: 'ai-model-005',
      status: 'Active',
      submissionDate: new Date('2023-09-12'),
      approvalDate: new Date('2024-04-08'),
      allowedModifications: [
        {
          type: 'Performance Improvements',
          description: 'Refinement of dense breast tissue detection algorithms',
          impactLevel: 'Low',
          requiresFDANotification: false
        },
        {
          type: 'Training Data Updates',
          description: 'Addition of tomosynthesis cases and diverse breast density samples',
          impactLevel: 'Moderate',
          requiresFDANotification: true
        }
      ],
      protocols: [
        {
          id: 'protocol-005',
          name: 'Screening Performance Monitoring',
          description: 'Continuous tracking of cancer detection rate and recall rate',
          procedure: 'Monthly performance metrics → Quarterly radiologist concordance study → Annual external validation',
          responsibleParty: 'Breast Imaging AI Team',
          frequency: 'Monthly'
        }
      ],
      impactAssessments: [
        {
          modificationType: 'Training Data Updates',
          safetyImpact: 'Positive - Improved detection across all breast density categories',
          effectivenessImpact: 'Positive - Expected 4-8% improvement in cancer detection rate',
          validationRequired: true,
          testingProtocol: 'Prospective reader study with 10+ board-certified breast radiologists on 2000+ cases'
        }
      ],
      performanceBoundaries: [
        {
          metric: 'Cancer Detection Sensitivity',
          minimumThreshold: 0.94,
          maximumThreshold: 1.0,
          currentValue: 0.967,
          triggerAction: 'Clinical review and potential model hold if falls below 0.94'
        },
        {
          metric: 'Specificity',
          minimumThreshold: 0.88,
          maximumThreshold: 1.0,
          currentValue: 0.923,
          triggerAction: 'Performance review if falls below 0.88'
        }
      ]
    },
    performanceMetrics: [
      {
        id: 'perf-005-2024-12',
        modelId: 'ai-model-005',
        recordedDate: new Date('2024-12-20'),
        environment: 'Production',
        accuracy: 0.938,
        precision: 0.931,
        recall: 0.967,
        sensitivity: 0.967,
        specificity: 0.923,
        f1Score: 0.948,
        auc: 0.981,
        truePositiveRate: 0.967,
        falsePositiveRate: 0.077,
        trueNegativeRate: 0.923,
        falseNegativeRate: 0.033,
        driftScore: 0.09,
        driftStatus: 'Normal',
        driftType: 'None',
        inputDistribution: [
          {
            feature: 'Breast Density Score',
            mean: 2.4,
            standardDeviation: 0.8,
            skewness: 0.2,
            kurtosis: 1.9,
            distributionType: 'Normal'
          }
        ],
        outputDistribution: [
          {
            class: 'Suspicious Finding - High Probability',
            frequency: 782,
            percentage: 3.8,
            trend: 'Stable'
          },
          {
            class: 'Suspicious Finding - Low Probability',
            frequency: 1456,
            percentage: 7.1,
            trend: 'Stable'
          },
          {
            class: 'No Significant Findings',
            frequency: 18247,
            percentage: 89.1,
            trend: 'Stable'
          }
        ],
        totalSamples: 20485,
        demographicBreakdown: [
          {
            category: 'Breast Density',
            subcategory: 'Almost Entirely Fatty (BI-RADS A)',
            count: 2458,
            performanceMetric: 0.973
          },
          {
            category: 'Breast Density',
            subcategory: 'Scattered Fibroglandular (BI-RADS B)',
            count: 9821,
            performanceMetric: 0.969
          },
          {
            category: 'Breast Density',
            subcategory: 'Heterogeneously Dense (BI-RADS C)',
            count: 6547,
            performanceMetric: 0.964
          },
          {
            category: 'Breast Density',
            subcategory: 'Extremely Dense (BI-RADS D)',
            count: 1659,
            performanceMetric: 0.958
          }
        ],
        alerts: []
      }
    ],
    labelingInfo: {
      id: 'label-005',
      modelId: 'ai-model-005',
      version: '2.3.1',
      lastUpdated: new Date('2024-05-01'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-12-15'),
      plainLanguageDescription: 'This AI assists radiologists in reviewing your mammogram by highlighting areas that may need closer examination. It helps ensure potential breast abnormalities are not missed.',
      patientDisclosure: {
        enabled: true,
        title: 'AI-Assisted Mammography Review',
        content: 'Your mammogram images will be analyzed by AI software in addition to review by a radiologist. This double-check helps improve cancer detection.',
        acknowledgmentRequired: false,
        languagesAvailable: ['English', 'Spanish', 'Mandarin']
      },
      clinicianGuidance: {
        intendedUse: 'Concurrent AI analysis of screening and diagnostic mammography to improve lesion detection',
        clinicalContext: 'Second reader tool for radiologist interpretation workflow',
        interpretation: 'AI provides lesion probability scores and highlights regions of interest. Scores >80% warrant careful review.',
        actionableInsights: 'Consider AI-flagged regions in conjunction with clinical history and prior imaging. AI may detect subtle findings missed on initial read.',
        limitations: [
          'Performance may vary with breast density',
          'Not validated for post-surgical or augmented breasts',
          'Requires standard mammographic technique and quality'
        ],
        warnings: [
          'Not a replacement for radiologist interpretation',
          'Clinical and imaging correlation required',
          'All positive findings require radiologist verification'
        ],
        contraindications: [
          'Male breast imaging',
          'Images with significant artifacts or poor positioning',
          'Breast implants without dedicated implant views'
        ]
      },
      limitations: [
        {
          category: 'Population',
          description: 'Not validated for women under 40 or men',
          severity: 'Significant'
        },
        {
          category: 'Technical',
          description: 'Requires FFDM or DBT images meeting ACR accreditation standards',
          severity: 'Moderate'
        },
        {
          category: 'Clinical',
          description: 'Not designed for evaluation of palpable masses in diagnostic context',
          severity: 'Moderate'
        }
      ],
      trainingDataDescription: 'Trained on 428,956 mammography exams from international screening programs, including all breast density categories and diverse patient populations.',
      performanceSpecs: [
        {
          metric: 'Cancer Detection Rate',
          value: '96.7%',
          conditions: 'Screening population, multi-center validation (n=20,485 exams)'
        },
        {
          metric: 'Reduction in False Negatives',
          value: '32%',
          conditions: 'Compared to single radiologist read'
        },
        {
          metric: 'Specificity',
          value: '92.3%',
          conditions: 'Maintaining acceptable recall rates'
        }
      ],
      indicationsForUse: [
        'Screening mammography in women 40+ years',
        'Diagnostic mammography workup',
        'Digital mammography (FFDM) and digital breast tomosynthesis (DBT)'
      ],
      requiredUserQualifications: [
        'Board-certified radiologist with MQSA qualification',
        'Breast imaging fellowship or equivalent experience preferred',
        'AI tool training certification'
      ]
    },
    riskClass: 'Moderate',
    riskMitigationStrategies: [
      'Radiologist always makes final diagnostic decision',
      'Continuous performance monitoring stratified by breast density',
      'Regular reader concordance studies',
      'Patient outcome tracking (cancer detection, interval cancers)',
      'False negative case review process'
    ],
    previousVersions: ['1.0.0', '2.0.0', '2.2.0'],
    changeLog: [],
    lastAuditDate: new Date('2024-11-20'),
    nextAuditDue: new Date('2025-02-20'),
    complianceScore: 96,
    outstandingIssues: [],
    auditLogs: []
  },
  {
    id: 'ai-model-006',
    modelName: 'Cardiac Arrhythmia Detection ECG',
    modelVersion: '1.5.8',
    intendedUse: 'Automated detection and classification of cardiac arrhythmias from 12-lead ECG including atrial fibrillation, ventricular tachycardia, and heart blocks',
    deviceClassification: 'Class II',
    regulatoryPathway: '510(k)',
    fdaStatus: 'Approved',
    submissionDate: new Date('2024-02-28'),
    approvalDate: new Date('2024-08-22'),
    modelType: 'Deep Learning',
    trainingDataset: {
      name: 'Global Cardiac Rhythm Database',
      size: 892341,
      demographics: 'Adults 18+, 47% Female, 53% Male, global multi-ethnic cohort',
      sourceInstitutions: ['Mayo Clinic', 'Cleveland Clinic', 'Brigham and Women\'s', 'Duke University Hospital'],
      dateRange: { start: new Date('2016-01-01'), end: new Date('2024-01-31') },
      biasAssessment: 'Comprehensive fairness analysis across age, sex, race, and comorbidity status. No significant bias detected.'
    },
    deploymentDate: new Date('2024-09-01'),
    deploymentEnvironment: 'Production',
    clinicalSetting: ['Emergency Department', 'Cardiology Clinic', 'Primary Care', 'Hospital Telemetry', 'Urgent Care'],
    targetUserRole: ['Cardiologist', 'Emergency Physician', 'Primary Care Physician', 'Physician Assistant', 'Nurse Practitioner'],
    pccp: null,
    performanceMetrics: [
      {
        id: 'perf-006-2024-12',
        modelId: 'ai-model-006',
        recordedDate: new Date('2024-12-23'),
        environment: 'Production',
        accuracy: 0.956,
        precision: 0.943,
        recall: 0.951,
        sensitivity: 0.951,
        specificity: 0.961,
        f1Score: 0.947,
        auc: 0.987,
        truePositiveRate: 0.951,
        falsePositiveRate: 0.039,
        trueNegativeRate: 0.961,
        falseNegativeRate: 0.049,
        driftScore: 0.11,
        driftStatus: 'Normal',
        driftType: 'None',
        inputDistribution: [
          {
            feature: 'Signal Quality Index',
            mean: 8.9,
            standardDeviation: 1.1,
            skewness: -0.4,
            kurtosis: 2.3,
            distributionType: 'Normal'
          }
        ],
        outputDistribution: [
          {
            class: 'Atrial Fibrillation',
            frequency: 3247,
            percentage: 11.8,
            trend: 'Stable'
          },
          {
            class: 'Ventricular Tachycardia',
            frequency: 456,
            percentage: 1.7,
            trend: 'Stable'
          },
          {
            class: 'AV Block',
            frequency: 782,
            percentage: 2.8,
            trend: 'Stable'
          },
          {
            class: 'Normal Sinus Rhythm',
            frequency: 22998,
            percentage: 83.7,
            trend: 'Stable'
          }
        ],
        totalSamples: 27483,
        demographicBreakdown: [
          {
            category: 'Age',
            subcategory: '18-40',
            count: 5497,
            performanceMetric: 0.963
          },
          {
            category: 'Age',
            subcategory: '41-65',
            count: 13741,
            performanceMetric: 0.956
          },
          {
            category: 'Age',
            subcategory: '65+',
            count: 8245,
            performanceMetric: 0.948
          }
        ],
        alerts: []
      }
    ],
    labelingInfo: {
      id: 'label-006',
      modelId: 'ai-model-006',
      version: '1.5.8',
      lastUpdated: new Date('2024-09-01'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-12-19'),
      plainLanguageDescription: 'This AI analyzes your electrocardiogram (ECG/EKG) to detect irregular heart rhythms and other electrical abnormalities. It helps your doctor identify heart rhythm problems quickly.',
      patientDisclosure: {
        enabled: false,
        title: 'AI ECG Analysis',
        content: 'Your heart tracing will be analyzed by AI to help detect rhythm abnormalities.',
        acknowledgmentRequired: false,
        languagesAvailable: ['English', 'Spanish']
      },
      clinicianGuidance: {
        intendedUse: 'Automated detection and classification of cardiac arrhythmias from 12-lead ECG',
        clinicalContext: 'Point-of-care decision support tool for ECG interpretation',
        interpretation: 'AI provides primary rhythm interpretation and flags secondary findings. All critical arrhythmias (VT, AV block) trigger automatic alerts.',
        actionableInsights: 'High-risk arrhythmias require immediate clinical correlation. Consider patient symptoms, hemodynamic status, and medication history.',
        limitations: [
          'Not designed for paced rhythm interpretation',
          'May be affected by significant artifact or lead placement errors',
          'Not validated for pediatric ECGs'
        ],
        warnings: [
          'Clinical correlation required for all interpretations',
          'Not a substitute for cardiologist consultation in complex cases',
          'Verify lead placement and signal quality before relying on interpretation'
        ],
        contraindications: [
          'Paced rhythms',
          'Pediatric patients (<18 years)',
          'Poor signal quality ECGs'
        ]
      },
      limitations: [
        {
          category: 'Population',
          description: 'Not validated for pediatric patients or paced rhythms',
          severity: 'Significant'
        },
        {
          category: 'Technical',
          description: 'Requires standard 12-lead ECG with adequate signal quality',
          severity: 'Moderate'
        }
      ],
      trainingDataDescription: 'Trained on 892,341 12-lead ECGs from major academic medical centers representing diverse patient populations and arrhythmia types.',
      performanceSpecs: [
        {
          metric: 'Atrial Fibrillation Detection',
          value: '97.8%',
          conditions: 'Sensitivity, validation cohort (n=27,483)'
        },
        {
          metric: 'Ventricular Tachycardia Detection',
          value: '94.2%',
          conditions: 'Sensitivity, validation cohort'
        },
        {
          metric: 'Overall Accuracy',
          value: '95.6%',
          conditions: 'Multi-class classification across 15 rhythm categories'
        }
      ],
      indicationsForUse: [
        'Adult patients (18+) undergoing 12-lead ECG',
        'Detection of common cardiac arrhythmias',
        'Emergency and outpatient settings'
      ],
      requiredUserQualifications: [
        'Licensed physician or advanced practice provider',
        'ECG interpretation training',
        'Basic arrhythmia recognition skills'
      ]
    },
    riskClass: 'Moderate',
    riskMitigationStrategies: [
      'Physician verification required for all critical findings',
      'Automatic signal quality check',
      'Integration with clinical decision support protocols',
      'Continuous performance monitoring'
    ],
    previousVersions: ['1.0.0', '1.3.0', '1.5.0'],
    changeLog: [],
    lastAuditDate: new Date('2024-12-05'),
    nextAuditDue: new Date('2025-03-05'),
    complianceScore: 94,
    outstandingIssues: [
      {
        id: 'issue-003',
        modelId: 'ai-model-006',
        issueType: 'Documentation',
        severity: 'Low',
        status: 'In Progress',
        title: 'Clinical validation report update',
        description: 'Post-market surveillance data needs to be incorporated into clinical validation documentation',
        identifiedDate: new Date('2024-12-05'),
        identifiedBy: 'Regulatory Affairs',
        assignedTo: 'Clinical Team',
        targetResolutionDate: new Date('2025-01-31'),
        requiresFDAReport: false,
        fdaReportSubmitted: false
      }
    ],
    auditLogs: []
  },
  {
    id: 'ai-model-007',
    modelName: 'Lung Nodule Growth Analysis',
    modelVersion: '2.0.3',
    intendedUse: 'Automated detection, measurement, and longitudinal tracking of pulmonary nodules on chest CT to assist in lung cancer screening and surveillance',
    deviceClassification: 'Class II',
    regulatoryPathway: '510(k)',
    fdaStatus: 'Approved',
    submissionDate: new Date('2023-12-15'),
    approvalDate: new Date('2024-07-30'),
    modelType: 'Deep Learning',
    trainingDataset: {
      name: 'National Lung Screening Trial + Multi-Center Database',
      size: 324567,
      demographics: 'Adults 50-80 years, current/former smokers, 44% Female, 56% Male',
      sourceInstitutions: ['NLST Consortium', 'Vanderbilt', 'Northwestern', 'University of Pennsylvania'],
      dateRange: { start: new Date('2011-01-01'), end: new Date('2023-09-30') },
      biasAssessment: 'Validated across smoking history, nodule types, and scanner manufacturers. Consistent performance demonstrated.'
    },
    deploymentDate: new Date('2024-08-15'),
    deploymentEnvironment: 'Production',
    clinicalSetting: ['Radiology Department', 'Lung Cancer Screening Center', 'Pulmonology Clinic'],
    targetUserRole: ['Thoracic Radiologist', 'Radiologist', 'Pulmonologist'],
    pccp: null,
    performanceMetrics: [],
    labelingInfo: {
      id: 'label-007',
      modelId: 'ai-model-007',
      version: '2.0.3',
      lastUpdated: new Date('2024-08-15'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-12-12'),
      plainLanguageDescription: 'This AI software detects and measures lung nodules (small spots) on your chest CT scan and tracks changes over time. This helps your doctor monitor for early signs of lung cancer.',
      patientDisclosure: {
        enabled: true,
        title: 'AI Lung Nodule Tracking',
        content: 'AI will analyze your CT scan to find and measure lung nodules, and compare with prior scans to detect changes.',
        acknowledgmentRequired: false,
        languagesAvailable: ['English', 'Spanish']
      },
      clinicianGuidance: {
        intendedUse: 'Computer-aided detection and volumetric analysis of pulmonary nodules',
        clinicalContext: 'Lung cancer screening and surveillance workflow integration',
        interpretation: 'AI provides nodule detection, 3D volumetric measurement, and growth assessment. Lung-RADS category suggested based on nodule characteristics.',
        actionableInsights: 'Review all detected nodules. AI growth analysis aids in determining interval change. Correlation with clinical risk factors recommended.',
        limitations: [
          'Performance may decrease with poor image quality or respiratory motion',
          'Not designed for detection of non-nodular lung pathology',
          'Requires thin-slice CT protocol'
        ],
        warnings: [
          'Radiologist must verify all detections',
          'Small nodules (<4mm) may be missed',
          'Growth assessment requires consistent imaging protocol'
        ],
        contraindications: [
          'Thick-slice CT (>3mm)',
          'Significant respiratory motion artifact',
          'Diffuse parenchymal lung disease obscuring nodules'
        ]
      },
      limitations: [
        {
          category: 'Technical',
          description: 'Requires thin-slice (≤1.5mm) chest CT protocol',
          severity: 'Significant'
        },
        {
          category: 'Clinical',
          description: 'Performance not validated for ground-glass nodules <4mm',
          severity: 'Moderate'
        }
      ],
      trainingDataDescription: 'Trained on 324,567 chest CT exams including 47,892 confirmed nodules from lung cancer screening programs.',
      performanceSpecs: [
        {
          metric: 'Nodule Detection Sensitivity',
          value: '96.4%',
          conditions: 'Nodules ≥4mm, validation cohort'
        },
        {
          metric: 'Volume Measurement Accuracy',
          value: '±8.2%',
          conditions: 'Compared to manual segmentation reference standard'
        }
      ],
      indicationsForUse: [
        'Lung cancer screening in high-risk patients',
        'Surveillance of known pulmonary nodules',
        'Thin-slice chest CT imaging'
      ],
      requiredUserQualifications: [
        'Board-certified radiologist',
        'Thoracic imaging training preferred',
        'Lung-RADS proficiency'
      ]
    },
    riskClass: 'Moderate',
    riskMitigationStrategies: [
      'Radiologist verification of all detections',
      'Automated quality check for CT protocol compliance',
      'Comparison with prior imaging encouraged',
      'Integration with Lung-RADS guidelines'
    ],
    previousVersions: ['1.0.0', '1.5.0', '2.0.0'],
    changeLog: [],
    lastAuditDate: new Date('2024-11-15'),
    nextAuditDue: new Date('2025-02-15'),
    complianceScore: 93,
    outstandingIssues: [],
    auditLogs: []
  },
  {
    id: 'ai-model-008',
    modelName: 'Fracture Detection X-Ray AI',
    modelVersion: '1.2.4',
    intendedUse: 'Automated detection of fractures on extremity and torso X-rays to improve diagnostic accuracy and reduce turnaround time in emergency settings',
    deviceClassification: 'Class II',
    regulatoryPathway: '510(k)',
    fdaStatus: 'Approved',
    submissionDate: new Date('2024-04-10'),
    approvalDate: new Date('2024-10-05'),
    modelType: 'Deep Learning',
    trainingDataset: {
      name: 'Global Musculoskeletal X-Ray Dataset',
      size: 567892,
      demographics: 'All ages, 49% Female, 51% Male, trauma and non-trauma presentations',
      sourceInstitutions: ['Hospital for Special Surgery', 'Rush University', 'UC San Diego', 'Toronto General'],
      dateRange: { start: new Date('2018-01-01'), end: new Date('2024-03-31') },
      biasAssessment: 'Validated across age groups, fracture types, and anatomical locations. No significant demographic bias.'
    },
    deploymentDate: new Date('2024-10-15'),
    deploymentEnvironment: 'Production',
    clinicalSetting: ['Emergency Department', 'Urgent Care', 'Orthopedic Clinic', 'Sports Medicine'],
    targetUserRole: ['Emergency Physician', 'Orthopedic Surgeon', 'Radiologist', 'Urgent Care Provider'],
    pccp: null,
    performanceMetrics: [],
    labelingInfo: {
      id: 'label-008',
      modelId: 'ai-model-008',
      version: '1.2.4',
      lastUpdated: new Date('2024-10-15'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-12-14'),
      plainLanguageDescription: 'This AI examines your X-ray images to detect bone fractures. It helps ensure fractures are identified quickly and accurately, especially in emergency situations.',
      patientDisclosure: {
        enabled: false,
        title: 'AI Fracture Detection',
        content: 'AI is being used to help detect fractures on your X-ray.',
        acknowledgmentRequired: false,
        languagesAvailable: ['English', 'Spanish']
      },
      clinicianGuidance: {
        intendedUse: 'Computer-aided detection of fractures on plain radiographs of extremities and torso',
        clinicalContext: 'Emergency department and urgent care point-of-care decision support',
        interpretation: 'AI highlights suspected fracture locations with confidence scores. High confidence (>85%) findings should be carefully reviewed.',
        actionableInsights: 'AI may detect subtle fractures missed on initial review. Clinical correlation with mechanism of injury and physical exam essential.',
        limitations: [
          'Performance may decrease with poor positioning or technique',
          'Not designed for stress fractures or very subtle injuries',
          'Not validated for pathological fractures'
        ],
        warnings: [
          'Clinical correlation required',
          'Physician must verify all findings',
          'Not a substitute for comprehensive radiologist interpretation'
        ],
        contraindications: [
          'Poor quality images with significant artifacts',
          'Incomplete anatomical coverage',
          'Known bone tumors or metabolic bone disease'
        ]
      },
      limitations: [
        {
          category: 'Technical',
          description: 'Requires standard radiographic technique and positioning',
          severity: 'Moderate'
        },
        {
          category: 'Clinical',
          description: 'Not optimized for rib or vertebral fractures',
          severity: 'Moderate'
        }
      ],
      trainingDataDescription: 'Trained on 567,892 X-ray images encompassing all major extremity and torso fracture types.',
      performanceSpecs: [
        {
          metric: 'Fracture Detection Sensitivity',
          value: '92.7%',
          conditions: 'Multi-center validation (n=12,450 X-rays)'
        },
        {
          metric: 'Specificity',
          value: '88.3%',
          conditions: 'Multi-center validation'
        }
      ],
      indicationsForUse: [
        'Traumatic injury evaluation',
        'Extremity and torso plain radiographs',
        'Emergency and urgent care settings'
      ],
      requiredUserQualifications: [
        'Licensed physician',
        'Basic X-ray interpretation skills',
        'Musculoskeletal anatomy knowledge'
      ]
    },
    riskClass: 'Moderate',
    riskMitigationStrategies: [
      'Physician verification required',
      'Integration with radiology workflow for formal reads',
      'Clinical correlation emphasized',
      'Continuous performance monitoring'
    ],
    previousVersions: ['1.0.0', '1.1.0', '1.2.0'],
    changeLog: [],
    lastAuditDate: new Date('2024-12-08'),
    nextAuditDue: new Date('2025-03-08'),
    complianceScore: 91,
    outstandingIssues: [],
    auditLogs: []
  },
  {
    id: 'ai-model-009',
    modelName: 'Skin Lesion Classification Dermoscopy',
    modelVersion: '3.1.0',
    intendedUse: 'AI-assisted classification of skin lesions from dermoscopic images to aid in early melanoma detection and differentiation of benign from malignant lesions',
    deviceClassification: 'Class II',
    regulatoryPathway: '510(k)',
    fdaStatus: 'Approved',
    submissionDate: new Date('2023-07-22'),
    approvalDate: new Date('2024-02-14'),
    modelType: 'Deep Learning',
    trainingDataset: {
      name: 'International Skin Imaging Collaboration (ISIC) + Multi-Institutional Dataset',
      size: 178934,
      demographics: 'All ages, all skin types (Fitzpatrick I-VI), diverse geographic locations',
      sourceInstitutions: ['Memorial Sloan Kettering', 'University of Queensland', 'Medical University of Vienna', 'Stanford'],
      dateRange: { start: new Date('2014-01-01'), end: new Date('2023-05-31') },
      biasAssessment: 'Extensively validated across all Fitzpatrick skin types. Equal performance demonstrated across diverse populations.'
    },
    deploymentDate: new Date('2024-03-01'),
    deploymentEnvironment: 'Production',
    clinicalSetting: ['Dermatology Clinic', 'Primary Care', 'Teledermatology', 'Skin Cancer Screening'],
    targetUserRole: ['Dermatologist', 'Primary Care Physician', 'Physician Assistant', 'Nurse Practitioner'],
    pccp: null,
    performanceMetrics: [],
    labelingInfo: {
      id: 'label-009',
      modelId: 'ai-model-009',
      version: '3.1.0',
      lastUpdated: new Date('2024-03-01'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-12-11'),
      plainLanguageDescription: 'This AI analyzes close-up images of skin lesions to help determine if a mole or spot might be cancerous. It assists your doctor in deciding if a biopsy is needed.',
      patientDisclosure: {
        enabled: true,
        title: 'AI Skin Lesion Analysis',
        content: 'Images of your skin lesion will be analyzed by AI to assess the risk of skin cancer. Your doctor will make the final decision about any necessary treatment.',
        acknowledgmentRequired: true,
        languagesAvailable: ['English', 'Spanish', 'Portuguese']
      },
      clinicianGuidance: {
        intendedUse: 'Classification of dermoscopic images into benign and malignant categories to assist in clinical decision-making',
        clinicalContext: 'Adjunct to clinical examination for skin lesion evaluation',
        interpretation: 'AI provides probability scores for melanoma, basal cell carcinoma, squamous cell carcinoma, and benign lesions. Scores >70% for malignancy warrant consideration for biopsy.',
        actionableInsights: 'High-risk lesions should be biopsied regardless of AI score. Low-risk lesions may be monitored with serial photography. Clinical features and patient history should always be considered.',
        limitations: [
          'Requires quality dermoscopic images',
          'Performance not validated for acral or mucosal lesions',
          'Not designed for inflammatory dermatoses'
        ],
        warnings: [
          'Not a substitute for clinical judgment',
          'Biopsy recommended for any clinically suspicious lesion',
          'Image quality critical for accurate analysis'
        ],
        contraindications: [
          'Poor quality images',
          'Acral (palms/soles) or mucosal lesions',
          'Ulcerated or bleeding lesions without proper imaging'
        ]
      },
      limitations: [
        {
          category: 'Population',
          description: 'Requires validation on specific Fitzpatrick skin type',
          severity: 'Moderate'
        },
        {
          category: 'Technical',
          description: 'Requires dermoscopic imaging (not standard photography)',
          severity: 'Significant'
        }
      ],
      trainingDataDescription: 'Trained on 178,934 dermoscopic images including 12,847 melanomas, validated across all skin types.',
      performanceSpecs: [
        {
          metric: 'Melanoma Detection Sensitivity',
          value: '94.3%',
          conditions: 'Validation cohort (n=8,912)'
        },
        {
          metric: 'Specificity',
          value: '86.7%',
          conditions: 'Validation cohort'
        },
        {
          metric: 'NPV for Melanoma',
          value: '98.9%',
          conditions: 'At prevalence of 5%'
        }
      ],
      indicationsForUse: [
        'Dermoscopic evaluation of pigmented skin lesions',
        'Melanoma risk assessment',
        'Clinical decision support for biopsy decisions'
      ],
      requiredUserQualifications: [
        'Licensed dermatologist or physician',
        'Dermoscopy training',
        'Skin cancer diagnosis experience'
      ]
    },
    riskClass: 'Moderate',
    riskMitigationStrategies: [
      'Clinician must make final biopsy decision',
      'Image quality automated checks',
      'Regular calibration with pathology correlation',
      'Patient education on self-skin exams'
    ],
    previousVersions: ['1.0.0', '2.0.0', '3.0.0'],
    changeLog: [],
    lastAuditDate: new Date('2024-10-30'),
    nextAuditDue: new Date('2025-01-30'),
    complianceScore: 95,
    outstandingIssues: [],
    auditLogs: []
  },
  {
    id: 'ai-model-010',
    modelName: 'Chronic Kidney Disease Progression Predictor',
    modelVersion: '1.0.2',
    intendedUse: 'Machine learning-based prediction of chronic kidney disease progression risk using longitudinal laboratory data and clinical variables to guide nephrology referral and treatment intensification',
    deviceClassification: 'Class II',
    regulatoryPathway: 'De Novo',
    fdaStatus: 'In Review',
    submissionDate: new Date('2024-10-15'),
    approvalDate: null,
    modelType: 'Ensemble',
    trainingDataset: {
      name: 'National CKD Cohort Study',
      size: 423678,
      demographics: 'Adults 18+, diverse racial/ethnic groups, CKD stages 1-5 (non-dialysis)',
      sourceInstitutions: ['Johns Hopkins', 'University of Washington', 'Kaiser Permanente', 'Geisinger Health'],
      dateRange: { start: new Date('2010-01-01'), end: new Date('2024-06-30') },
      biasAssessment: 'Extensive fairness evaluation across race, ethnicity, socioeconomic status, and diabetes status. Model recalibrated to eliminate disparities.'
    },
    deploymentDate: null,
    deploymentEnvironment: 'Testing',
    clinicalSetting: ['Primary Care', 'Nephrology', 'Endocrinology', 'Cardiology'],
    targetUserRole: ['Primary Care Physician', 'Nephrologist', 'Endocrinologist', 'Internist'],
    pccp: null,
    performanceMetrics: [],
    labelingInfo: {
      id: 'label-010',
      modelId: 'ai-model-010',
      version: '1.0.2',
      lastUpdated: new Date('2024-10-15'),
      fdaCompliant: true,
      complianceCheckDate: new Date('2024-10-10'),
      plainLanguageDescription: 'This AI tool uses your kidney function tests and medical history to predict your risk of kidney disease getting worse. This helps your doctor plan the best treatment and monitoring schedule for you.',
      patientDisclosure: {
        enabled: true,
        title: 'AI Kidney Disease Risk Assessment',
        content: 'Your doctor is using AI to analyze your kidney function trends and predict your risk of kidney disease progression. This helps guide treatment decisions.',
        acknowledgmentRequired: false,
        languagesAvailable: ['English', 'Spanish']
      },
      clinicianGuidance: {
        intendedUse: 'Prediction of 2-year risk of CKD progression (≥30% eGFR decline or progression to ESKD)',
        clinicalContext: 'Clinical decision support for nephrology referral, treatment intensification, and patient education',
        interpretation: 'Risk score 0-100%. High risk (>40%) suggests nephrology referral. Moderate risk (20-40%) warrants treatment optimization and close monitoring.',
        actionableInsights: 'Risk assessment should guide ACEi/ARB optimization, SGLT2i consideration, dietary counseling, and monitoring frequency. Always consider patient preferences and comorbidities.',
        limitations: [
          'Requires minimum 2 eGFR measurements 3+ months apart',
          'Not designed for acute kidney injury',
          'Performance not validated in transplant recipients'
        ],
        warnings: [
          'Clinical judgment required for referral decisions',
          'Model predictions are probabilities, not certainties',
          'Regular monitoring and reassessment essential'
        ],
        contraindications: [
          'Acute kidney injury',
          'Kidney transplant recipients',
          'Patients on dialysis'
        ]
      },
      limitations: [
        {
          category: 'Clinical',
          description: 'Not validated in acute kidney injury or post-transplant populations',
          severity: 'Significant'
        },
        {
          category: 'Technical',
          description: 'Requires longitudinal eGFR and clinical data',
          severity: 'Moderate'
        }
      ],
      trainingDataDescription: 'Trained on 423,678 CKD patients with longitudinal follow-up, capturing diverse progression patterns.',
      performanceSpecs: [
        {
          metric: 'AUROC for 2-Year Progression',
          value: '0.847',
          conditions: 'Validation cohort (n=85,000)'
        },
        {
          metric: 'Sensitivity at 40% Risk Threshold',
          value: '76.3%',
          conditions: 'For detecting progressors'
        },
        {
          metric: 'Specificity at 40% Risk Threshold',
          value: '81.2%',
          conditions: 'For identifying non-progressors'
        }
      ],
      indicationsForUse: [
        'Adults with CKD stages 1-5 (non-dialysis)',
        'Risk stratification for nephrology referral',
        'Treatment intensification guidance'
      ],
      requiredUserQualifications: [
        'Licensed physician',
        'Familiarity with CKD management guidelines',
        'Understanding of risk prediction tools'
      ]
    },
    riskClass: 'Moderate',
    riskMitigationStrategies: [
      'Physician makes final referral and treatment decisions',
      'Regular model recalibration with real-world data',
      'Transparent communication of prediction uncertainty',
      'Integration with CKD clinical pathways'
    ],
    previousVersions: ['1.0.0', '1.0.1'],
    changeLog: [],
    lastAuditDate: new Date('2024-11-25'),
    nextAuditDue: new Date('2025-01-25'),
    complianceScore: 89,
    outstandingIssues: [
      {
        id: 'issue-004',
        modelId: 'ai-model-010',
        issueType: 'PCCP',
        severity: 'Medium',
        status: 'In Progress',
        title: 'PCCP development required for FDA submission',
        description: 'Predetermined Change Control Plan must be developed and submitted as part of De Novo request',
        identifiedDate: new Date('2024-11-25'),
        identifiedBy: 'Regulatory Affairs Team',
        assignedTo: 'AI Engineering Lead',
        targetResolutionDate: new Date('2025-01-15'),
        requiresFDAReport: true,
        fdaReportSubmitted: false
      }
    ],
    auditLogs: []
  }
]

export const sampleAuditTrail: AuditTrailEntry[] = [
  {
    id: 'audit-001',
    modelId: 'ai-model-001',
    timestamp: new Date('2024-12-24T14:23:17Z'),
    eventType: 'Model Prediction',
    description: 'Pneumonia detection performed on chest X-ray study',
    userId: 'user-rad-047',
    userName: 'Dr. Emily Rodriguez',
    userRole: 'Radiologist',
    sessionId: 'session-2024-12-24-rad-047',
    patientId: 'encrypted-patient-id-8473',
    clinicalContext: 'Emergency Department - suspected CAP',
    inputData: {
      studyId: 'XR-2024-12-24-0847',
      imageQuality: 9.2,
      patientAge: 62,
      clinicalIndication: 'Cough, fever, SOB'
    },
    outputData: {
      prediction: 'Pneumonia Detected',
      confidence: 0.89,
      affectedRegion: 'Right lower lobe'
    },
    predictionConfidence: 0.89,
    systemVersion: '2.1.0',
    modelVersion: '2.1.0',
    environmentId: 'prod-us-east-1',
    regulatoryRelevant: true,
    retentionPeriod: 2555
  },
  {
    id: 'audit-002',
    modelId: 'ai-model-004',
    timestamp: new Date('2024-12-25T02:47:32Z'),
    eventType: 'Model Prediction',
    description: 'Stroke detection analysis on non-contrast brain CT',
    userId: 'user-neuro-123',
    userName: 'Dr. Sarah Thompson',
    userRole: 'Emergency Physician',
    sessionId: 'session-2024-12-25-neuro-123',
    patientId: 'encrypted-patient-id-9821',
    clinicalContext: 'Emergency Department - Code Stroke activation',
    inputData: {
      studyId: 'CT-2024-12-25-0247',
      scanQuality: 9.4,
      patientAge: 68,
      clinicalIndication: 'Sudden onset aphasia and right-sided weakness',
      symptomOnset: '45 minutes ago'
    },
    outputData: {
      prediction: 'Acute Stroke Detected',
      confidence: 0.94,
      affectedRegion: 'Left MCA territory',
      volumeEstimate: '42 mL',
      nihssEstimate: 12
    },
    predictionConfidence: 0.94,
    systemVersion: '1.8.5',
    modelVersion: '1.8.5',
    environmentId: 'prod-us-east-1',
    regulatoryRelevant: true,
    retentionPeriod: 2555
  },
  {
    id: 'audit-003',
    modelId: 'ai-model-005',
    timestamp: new Date('2024-12-24T09:15:44Z'),
    eventType: 'Model Prediction',
    description: 'Breast mammography analysis for screening',
    userId: 'user-breast-089',
    userName: 'Dr. Jennifer Kim',
    userRole: 'Breast Radiologist',
    sessionId: 'session-2024-12-24-breast-089',
    patientId: 'encrypted-patient-id-7654',
    clinicalContext: 'Screening Mammography - Annual',
    inputData: {
      studyId: 'MMG-2024-12-24-0915',
      imageQuality: 8.8,
      patientAge: 52,
      breastDensity: 'BI-RADS C',
      priorMammogram: 'MMG-2023-12-15-1205'
    },
    outputData: {
      prediction: 'Suspicious Finding - High Probability',
      confidence: 0.87,
      location: 'Right breast, upper outer quadrant',
      biRadsCategory: 4,
      suggestedAction: 'Recommend biopsy'
    },
    predictionConfidence: 0.87,
    systemVersion: '2.3.1',
    modelVersion: '2.3.1',
    environmentId: 'prod-us-east-1',
    regulatoryRelevant: true,
    retentionPeriod: 2555
  },
  {
    id: 'audit-004',
    modelId: 'ai-model-006',
    timestamp: new Date('2024-12-25T11:32:18Z'),
    eventType: 'Model Prediction',
    description: 'ECG arrhythmia detection - atrial fibrillation identified',
    userId: 'user-cardio-234',
    userName: 'Dr. Michael Chen',
    userRole: 'Cardiologist',
    sessionId: 'session-2024-12-25-cardio-234',
    patientId: 'encrypted-patient-id-5432',
    clinicalContext: 'Cardiology Clinic - Palpitations workup',
    inputData: {
      studyId: 'ECG-2024-12-25-1132',
      signalQuality: 9.1,
      patientAge: 74,
      clinicalIndication: 'Palpitations, dizziness',
      medications: 'Metoprolol, Apixaban'
    },
    outputData: {
      prediction: 'Atrial Fibrillation',
      confidence: 0.96,
      ventricularRate: 112,
      rhythm: 'Irregularly irregular',
      suggestedAction: 'Rate control assessment'
    },
    predictionConfidence: 0.96,
    systemVersion: '1.5.8',
    modelVersion: '1.5.8',
    environmentId: 'prod-us-east-1',
    regulatoryRelevant: true,
    retentionPeriod: 2555
  },
  {
    id: 'audit-005',
    modelId: 'ai-model-001',
    timestamp: new Date('2024-12-20T18:45:09Z'),
    eventType: 'Performance Review',
    description: 'Quarterly performance validation completed',
    userId: 'user-qa-005',
    userName: 'Quality Assurance Team',
    userRole: 'QA Specialist',
    systemVersion: '2.1.0',
    modelVersion: '2.1.0',
    environmentId: 'prod-us-east-1',
    regulatoryRelevant: true,
    retentionPeriod: 3650
  },
  {
    id: 'audit-006',
    modelId: 'ai-model-004',
    timestamp: new Date('2024-12-10T14:00:00Z'),
    eventType: 'Audit',
    description: 'Scheduled compliance audit completed successfully',
    userId: 'user-audit-012',
    userName: 'Regulatory Affairs Team',
    userRole: 'Compliance Auditor',
    systemVersion: '1.8.5',
    modelVersion: '1.8.5',
    environmentId: 'prod-us-east-1',
    regulatoryRelevant: true,
    retentionPeriod: 3650
  },
  {
    id: 'audit-007',
    modelId: 'ai-model-001',
    timestamp: new Date('2024-10-01T00:00:00Z'),
    eventType: 'Configuration Change',
    description: 'Model updated to version 2.1.0 - Enhanced sensitivity',
    userId: 'user-eng-045',
    userName: 'AI Engineering Team',
    userRole: 'ML Engineer',
    inputData: {
      previousVersion: '2.0.0',
      newVersion: '2.1.0',
      changeType: 'Minor Update',
      pccpCovered: true
    },
    systemVersion: '2.1.0',
    modelVersion: '2.1.0',
    environmentId: 'prod-us-east-1',
    regulatoryRelevant: true,
    retentionPeriod: 3650
  },
  {
    id: 'audit-008',
    modelId: 'ai-model-005',
    timestamp: new Date('2024-12-15T10:23:45Z'),
    eventType: 'Labeling Update',
    description: 'Patient disclosure language updated for clarity',
    userId: 'user-reg-078',
    userName: 'Regulatory Affairs',
    userRole: 'Regulatory Specialist',
    inputData: {
      updateType: 'Plain Language Refinement',
      fdaNotificationRequired: false
    },
    systemVersion: '2.3.1',
    modelVersion: '2.3.1',
    environmentId: 'prod-us-east-1',
    regulatoryRelevant: true,
    retentionPeriod: 3650
  }
]

export const sampleFDASubmissions: FDASubmission[] = [
  {
    id: 'submission-001',
    modelId: 'ai-model-001',
    submissionType: '510(k)',
    submissionDate: new Date('2024-03-15'),
    status: 'Approved',
    fdaSubmissionNumber: 'K243789',
    leadReviewer: 'Dr. James Park',
    reviewDivision: 'Division of Radiological Health',
    documents: [
      {
        type: '510(k) Summary',
        name: 'Pneumonia_AI_510k_Summary_v3.pdf',
        version: '3.0',
        uploadDate: new Date('2024-03-15'),
        fileSize: 2457600,
        status: 'Submitted'
      },
      {
        type: 'Clinical Validation',
        name: 'Clinical_Validation_Report_Final.pdf',
        version: '1.0',
        uploadDate: new Date('2024-03-15'),
        fileSize: 5242880,
        status: 'Submitted'
      }
    ],
    communications: [
      {
        date: new Date('2024-03-15'),
        type: 'Submission',
        subject: '510(k) Submission - Pneumonia Detection AI',
        summary: 'Initial submission of 510(k) application',
        actionRequired: false
      },
      {
        date: new Date('2024-05-22'),
        type: 'FDA Question',
        subject: 'Additional Information Request',
        summary: 'Request for additional performance data in elderly populations',
        actionRequired: true,
        dueDate: new Date('2024-06-22')
      },
      {
        date: new Date('2024-06-15'),
        type: 'Response',
        subject: 'Response to AIR - Elderly Population Data',
        summary: 'Submitted supplemental validation data for patients 75+',
        actionRequired: false
      },
      {
        date: new Date('2024-09-20'),
        type: 'Decision Letter',
        subject: 'Substantially Equivalent Determination',
        summary: 'Device determined to be substantially equivalent. 510(k) cleared.',
        actionRequired: false
      }
    ],
    milestones: [
      {
        name: 'Submission Acceptance',
        targetDate: new Date('2024-03-20'),
        actualDate: new Date('2024-03-18'),
        status: 'Completed'
      },
      {
        name: 'Substantive Review',
        targetDate: new Date('2024-06-15'),
        actualDate: new Date('2024-07-10'),
        status: 'Completed'
      },
      {
        name: 'Final Decision',
        targetDate: new Date('2024-09-15'),
        actualDate: new Date('2024-09-20'),
        status: 'Completed'
      }
    ]
  },
  {
    id: 'submission-002',
    modelId: 'ai-model-004',
    submissionType: '510(k)',
    submissionDate: new Date('2024-01-20'),
    status: 'Approved',
    fdaSubmissionNumber: 'K247234',
    leadReviewer: 'Dr. Patricia Martinez',
    reviewDivision: 'Division of Neurological and Physical Medicine Devices',
    documents: [
      {
        type: '510(k) Summary',
        name: 'Stroke_AI_510k_Summary_v2.pdf',
        version: '2.0',
        uploadDate: new Date('2024-01-20'),
        fileSize: 3145728,
        status: 'Submitted'
      },
      {
        type: 'Clinical Performance Data',
        name: 'Multi_Center_Validation_Study.pdf',
        version: '1.0',
        uploadDate: new Date('2024-01-20'),
        fileSize: 8388608,
        status: 'Submitted'
      },
      {
        type: 'PCCP Document',
        name: 'Predetermined_Change_Control_Plan.pdf',
        version: '1.0',
        uploadDate: new Date('2024-01-20'),
        fileSize: 2097152,
        status: 'Submitted'
      }
    ],
    communications: [
      {
        date: new Date('2024-01-20'),
        type: 'Submission',
        subject: '510(k) Submission - Stroke Detection CT Analysis AI',
        summary: 'Initial submission of 510(k) application with PCCP',
        actionRequired: false
      },
      {
        date: new Date('2024-04-10'),
        type: 'FDA Question',
        subject: 'Request for Additional Performance Data',
        summary: 'Request for sensitivity data in posterior circulation strokes',
        actionRequired: true,
        dueDate: new Date('2024-05-10')
      },
      {
        date: new Date('2024-05-03'),
        type: 'Response',
        subject: 'Response to AIR - Posterior Circulation Data',
        summary: 'Submitted additional validation data for posterior circulation',
        actionRequired: false
      },
      {
        date: new Date('2024-07-15'),
        type: 'Decision Letter',
        subject: 'Substantially Equivalent Determination with PCCP Approval',
        summary: 'Device cleared with approved Predetermined Change Control Plan',
        actionRequired: false
      }
    ],
    milestones: [
      {
        name: 'Submission Acceptance',
        targetDate: new Date('2024-01-25'),
        actualDate: new Date('2024-01-23'),
        status: 'Completed'
      },
      {
        name: 'Initial Review',
        targetDate: new Date('2024-04-01'),
        actualDate: new Date('2024-04-10'),
        status: 'Completed'
      },
      {
        name: 'Final Decision',
        targetDate: new Date('2024-07-20'),
        actualDate: new Date('2024-07-15'),
        status: 'Completed'
      }
    ]
  },
  {
    id: 'submission-003',
    modelId: 'ai-model-010',
    submissionType: 'De Novo',
    submissionDate: new Date('2024-10-15'),
    status: 'Under Review',
    fdaSubmissionNumber: 'DEN240089',
    leadReviewer: 'Dr. Robert Chang',
    reviewDivision: 'Division of Chemistry and Toxicology Devices',
    documents: [
      {
        type: 'De Novo Request',
        name: 'CKD_Predictor_De_Novo_Request.pdf',
        version: '1.0',
        uploadDate: new Date('2024-10-15'),
        fileSize: 4194304,
        status: 'Submitted'
      },
      {
        type: 'Clinical Validation',
        name: 'National_CKD_Cohort_Validation.pdf',
        version: '1.0',
        uploadDate: new Date('2024-10-15'),
        fileSize: 10485760,
        status: 'Submitted'
      },
      {
        type: 'Risk Analysis',
        name: 'Comprehensive_Risk_Analysis.pdf',
        version: '1.0',
        uploadDate: new Date('2024-10-15'),
        fileSize: 3145728,
        status: 'Submitted'
      },
      {
        type: 'Proposed Special Controls',
        name: 'Proposed_Special_Controls.pdf',
        version: '1.0',
        uploadDate: new Date('2024-10-15'),
        fileSize: 1048576,
        status: 'Submitted'
      }
    ],
    communications: [
      {
        date: new Date('2024-10-15'),
        type: 'Submission',
        subject: 'De Novo Request - CKD Progression Predictor',
        summary: 'Initial De Novo submission for novel CKD risk prediction device',
        actionRequired: false
      },
      {
        date: new Date('2024-11-20'),
        type: 'FDA Question',
        subject: 'PCCP Development Required',
        summary: 'Request to develop and submit Predetermined Change Control Plan',
        actionRequired: true,
        dueDate: new Date('2025-01-15')
      },
      {
        date: new Date('2024-12-05'),
        type: 'Meeting Request',
        subject: 'Pre-Decision Meeting Scheduled',
        summary: 'Meeting scheduled for January 20, 2025 to discuss PCCP requirements',
        actionRequired: false
      }
    ],
    milestones: [
      {
        name: 'Submission Acceptance',
        targetDate: new Date('2024-10-22'),
        actualDate: new Date('2024-10-18'),
        status: 'Completed'
      },
      {
        name: 'Initial Review Complete',
        targetDate: new Date('2024-12-15'),
        actualDate: new Date('2024-12-10'),
        status: 'Completed'
      },
      {
        name: 'PCCP Submission',
        targetDate: new Date('2025-01-15'),
        status: 'Pending'
      },
      {
        name: 'Final Decision',
        targetDate: new Date('2025-04-15'),
        status: 'Pending'
      }
    ]
  }
]

// ============================================
// ENHANCED HELPER FUNCTIONS
// ============================================

// Basic Model Retrieval
export function getAIModelById(id: string): AIModelRegistration | undefined {
  return sampleAIModels.find(model => model.id === id)
}

export function getAllAIModels(): AIModelRegistration[] {
  return sampleAIModels
}

// Filtering Functions
export function getAIModelsByStatus(status: AIModelRegistration['fdaStatus']): AIModelRegistration[] {
  return sampleAIModels.filter(model => model.fdaStatus === status)
}

export function getAIModelsByRiskClass(riskClass: AIModelRegistration['riskClass']): AIModelRegistration[] {
  return sampleAIModels.filter(model => model.riskClass === riskClass)
}

export function getAIModelsByDeviceClass(deviceClass: AIModelRegistration['deviceClassification']): AIModelRegistration[] {
  return sampleAIModels.filter(model => model.deviceClassification === deviceClass)
}

export function getAIModelsByEnvironment(environment: 'Production' | 'Staging' | 'Testing' | 'Retired'): AIModelRegistration[] {
  return sampleAIModels.filter(model => model.deploymentEnvironment === environment)
}

export function getActiveProductionModels(): AIModelRegistration[] {
  return sampleAIModels.filter(model =>
    model.deploymentEnvironment === 'Production' &&
    (model.fdaStatus === 'Approved' || model.fdaStatus === 'In Review')
  )
}

// Compliance and Issues
export function getOutstandingIssues(): ComplianceIssue[] {
  return sampleAIModels.flatMap(model =>
    model.outstandingIssues.filter(issue => issue.status !== 'Resolved')
  )
}

export function getCriticalIssues(): ComplianceIssue[] {
  return sampleAIModels.flatMap(model =>
    model.outstandingIssues.filter(issue =>
      issue.status !== 'Resolved' && issue.severity === 'Critical'
    )
  )
}

export function getIssuesByModel(modelId: string): ComplianceIssue[] {
  const model = getAIModelById(modelId)
  return model ? model.outstandingIssues : []
}

export function getOverdueIssues(): ComplianceIssue[] {
  const today = new Date()
  return sampleAIModels.flatMap(model =>
    model.outstandingIssues.filter(issue =>
      issue.status !== 'Resolved' &&
      issue.targetResolutionDate < today
    )
  )
}

// Audit and Monitoring
export function getModelsRequiringAudit(daysAhead: number = 0): AIModelRegistration[] {
  const checkDate = new Date()
  checkDate.setDate(checkDate.getDate() + daysAhead)

  return sampleAIModels.filter(model =>
    model.nextAuditDue && model.nextAuditDue <= checkDate
  )
}

export function getAuditTrailByModel(modelId: string, limit?: number): AuditTrailEntry[] {
  let entries = sampleAuditTrail.filter(entry => entry.modelId === modelId)
  entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  return limit ? entries.slice(0, limit) : entries
}

export function getRecentAuditTrail(days: number = 7, limit?: number): AuditTrailEntry[] {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  let entries = sampleAuditTrail.filter(entry => entry.timestamp >= cutoffDate)
  entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  return limit ? entries.slice(0, limit) : entries
}

// FDA Submissions
export function getActiveSubmissions(): FDASubmission[] {
  return sampleFDASubmissions.filter(sub =>
    sub.status === 'Submitted' ||
    sub.status === 'Under Review' ||
    sub.status === 'Additional Info Requested'
  )
}

export function getSubmissionsByModel(modelId: string): FDASubmission[] {
  return sampleFDASubmissions.filter(sub => sub.modelId === modelId)
}

export function getSubmissionsRequiringAction(): FDASubmission[] {
  return sampleFDASubmissions.filter(sub =>
    sub.communications.some(comm => comm.actionRequired)
  )
}

// Performance Metrics
export function getLatestPerformanceMetric(modelId: string): PerformanceMetric | undefined {
  const model = getAIModelById(modelId)
  if (!model || model.performanceMetrics.length === 0) return undefined

  return model.performanceMetrics.reduce((latest, current) =>
    current.recordedDate > latest.recordedDate ? current : latest
  )
}

export function getModelsDriftWarning(): AIModelRegistration[] {
  return sampleAIModels.filter(model => {
    if (model.performanceMetrics.length === 0) return false
    const latest = model.performanceMetrics[model.performanceMetrics.length - 1]
    return latest.driftStatus === 'Warning' || latest.driftStatus === 'Critical'
  })
}

export function getModelsWithAlerts(): AIModelRegistration[] {
  return sampleAIModels.filter(model => {
    if (model.performanceMetrics.length === 0) return false
    const latest = model.performanceMetrics[model.performanceMetrics.length - 1]
    return latest.alerts.length > 0
  })
}

// PCCP Functions
export function getModelsWithActivePCCP(): AIModelRegistration[] {
  return sampleAIModels.filter(model =>
    model.pccp && model.pccp.status === 'Active'
  )
}

export function getModelsRequiringPCCP(): AIModelRegistration[] {
  return sampleAIModels.filter(model =>
    !model.pccp &&
    (model.fdaStatus === 'Approved' || model.fdaStatus === 'In Review')
  )
}

// Compliance Scoring
export function calculateOverallComplianceScore(): number {
  if (sampleAIModels.length === 0) return 100
  const totalScore = sampleAIModels.reduce((sum, model) => sum + model.complianceScore, 0)
  return Math.round(totalScore / sampleAIModels.length)
}

export function getComplianceScoreByRiskClass(riskClass: AIModelRegistration['riskClass']): number {
  const models = getAIModelsByRiskClass(riskClass)
  if (models.length === 0) return 100
  const totalScore = models.reduce((sum, model) => sum + model.complianceScore, 0)
  return Math.round(totalScore / models.length)
}

export function getLowComplianceModels(threshold: number = 90): AIModelRegistration[] {
  return sampleAIModels.filter(model => model.complianceScore < threshold)
}

// Statistics and Analytics
export function getModelStatistics() {
  const total = sampleAIModels.length
  const approved = getAIModelsByStatus('Approved').length
  const inReview = getAIModelsByStatus('In Review').length
  const production = getActiveProductionModels().length
  const withPCCP = getModelsWithActivePCCP().length
  const avgCompliance = calculateOverallComplianceScore()
  const criticalIssues = getCriticalIssues().length
  const overdueIssues = getOverdueIssues().length

  return {
    totalModels: total,
    fdaApproved: approved,
    inReview: inReview,
    productionDeployed: production,
    withActivePCCP: withPCCP,
    averageComplianceScore: avgCompliance,
    criticalIssues: criticalIssues,
    overdueIssues: overdueIssues,
    modelsRequiringAudit: getModelsRequiringAudit().length,
    modelsWithDriftWarning: getModelsDriftWarning().length
  }
}

export function getRiskClassDistribution() {
  return {
    low: getAIModelsByRiskClass('Low').length,
    moderate: getAIModelsByRiskClass('Moderate').length,
    high: getAIModelsByRiskClass('High').length
  }
}

export function getDeviceClassDistribution() {
  return {
    classI: getAIModelsByDeviceClass('Class I').length,
    classII: getAIModelsByDeviceClass('Class II').length,
    classIII: getAIModelsByDeviceClass('Class III').length
  }
}

// Search and Filter
export function searchModels(query: string): AIModelRegistration[] {
  const lowercaseQuery = query.toLowerCase()
  return sampleAIModels.filter(model =>
    model.modelName.toLowerCase().includes(lowercaseQuery) ||
    model.intendedUse.toLowerCase().includes(lowercaseQuery) ||
    model.clinicalSetting.some(setting => setting.toLowerCase().includes(lowercaseQuery))
  )
}

// Export Functions for Reports
export function generateComplianceSummary() {
  const stats = getModelStatistics()
  const overdueIssues = getOverdueIssues()
  const criticalIssues = getCriticalIssues()
  const modelsRequiringAudit = getModelsRequiringAudit()
  const lowCompliance = getLowComplianceModels()

  return {
    overview: stats,
    alerts: {
      overdueIssues: overdueIssues.length,
      criticalIssues: criticalIssues.length,
      modelsRequiringAudit: modelsRequiringAudit.length,
      lowComplianceModels: lowCompliance.length
    },
    details: {
      overdueIssues,
      criticalIssues,
      modelsRequiringAudit,
      lowComplianceModels: lowCompliance
    }
  }
}

import {
  Users,
  BarChart3,
  Ambulance,
  TestTube,
  Pill,
  Scan,
  Activity,
  Calendar,
  DollarSign,
  Settings,
  Building2,
  UserCheck,
  Package,
  Stethoscope,
  FileText,
  Scissors,
  Shield,
  Heart
} from 'lucide-react'
import type { SearchItem } from '@/components/GlobalSearch'

export const enSearchIndex: SearchItem[] = [
  // Dashboard
  {
    id: 'en/dashboard',
    title: 'Dashboard',
    description: 'System overview and analytics',
    category: 'Main',
    path: '/en/dashboard',
    icon: <BarChart3 className="h-4 w-4" />,
    keywords: ['dashboard', 'overview', 'home', 'analytics', 'main', 'start']
  },

  // Patients
  {
    id: 'en/patients',
    title: 'Patients',
    description: 'Patient management and records',
    category: 'Clinical',
    path: '/en/patients',
    icon: <Users className="h-4 w-4" />,
    keywords: ['patients', 'records', 'demographics', 'registration', 'admit', 'discharge', 'MRN', 'chart']
  },

  // Emergency / ED
  {
    id: 'en/emergency',
    title: 'Emergency Department',
    description: 'Emergency care and triage',
    category: 'Clinical',
    path: '/en/emergency',
    icon: <Ambulance className="h-4 w-4" />,
    keywords: ['emergency', 'ED', 'ER', 'urgent care', 'triage', 'trauma', 'ambulance', '911']
  },

  // Inpatient
  {
    id: 'en/inpatient',
    title: 'Inpatient Care',
    description: 'Inpatient services and bed management',
    category: 'Clinical',
    path: '/en/inpatient',
    icon: <Activity className="h-4 w-4" />,
    keywords: ['inpatient', 'beds', 'wards', 'admission', 'hospital', 'floor', 'census']
  },

  // Examination
  {
    id: 'en/examination',
    title: 'Examination',
    description: 'Patient examination and consultation',
    category: 'Clinical',
    path: '/en/examination',
    icon: <Stethoscope className="h-4 w-4" />,
    keywords: ['examination', 'exam', 'consultation', 'visit', 'checkup', 'physical', 'clinic']
  },

  // Laboratory
  {
    id: 'en/laboratory',
    title: 'Laboratory',
    description: 'Lab tests and diagnostic results',
    category: 'Diagnostic',
    path: '/en/laboratory',
    icon: <TestTube className="h-4 w-4" />,
    keywords: ['laboratory', 'lab', 'tests', 'results', 'pathology', 'blood work', 'diagnostic', 'specimen']
  },

  // Radiology
  {
    id: 'en/radiology',
    title: 'Radiology',
    description: 'Medical imaging and diagnostic services',
    category: 'Diagnostic',
    path: '/en/radiology',
    icon: <Scan className="h-4 w-4" />,
    keywords: ['radiology', 'imaging', 'xray', 'x-ray', 'ct', 'cat scan', 'mri', 'ultrasound', 'mammogram', 'PACS']
  },

  // Pharmacy
  {
    id: 'en/pharmacy',
    title: 'Pharmacy',
    description: 'Medication management and dispensing',
    category: 'Clinical',
    path: '/en/pharmacy',
    icon: <Pill className="h-4 w-4" />,
    keywords: ['pharmacy', 'medication', 'drugs', 'prescription', 'rx', 'medications', 'formulary', 'dispense']
  },

  // Operating Room
  {
    id: 'en/operating-room',
    title: 'Operating Room',
    description: 'Surgery scheduling and management',
    category: 'Clinical',
    path: '/en/operating-room',
    icon: <Scissors className="h-4 w-4" />,
    keywords: ['surgery', 'operating room', 'OR', 'procedure', 'surgical', 'operation', 'theatre']
  },

  // Appointments
  {
    id: 'en/appointments',
    title: 'Appointments',
    description: 'Patient appointment scheduling',
    category: 'Administrative',
    path: '/en/appointments',
    icon: <Calendar className="h-4 w-4" />,
    keywords: ['appointments', 'scheduling', 'calendar', 'booking', 'schedule', 'visit', 'reservation']
  },

  // Billing
  {
    id: 'en/billing',
    title: 'Billing',
    description: 'Billing and revenue cycle management',
    category: 'Financial',
    path: '/en/billing',
    icon: <DollarSign className="h-4 w-4" />,
    keywords: ['billing', 'invoices', 'payments', 'revenue', 'claims', 'insurance', 'charges', 'collections', 'RCM']
  },

  // Analytics
  {
    id: 'en/analytics',
    title: 'Analytics & Reports',
    description: 'Business intelligence and reporting',
    category: 'Management',
    path: '/en/analytics',
    icon: <BarChart3 className="h-4 w-4" />,
    keywords: ['analytics', 'reports', 'statistics', 'insights', 'metrics', 'KPI', 'dashboard', 'BI']
  },

  // Quality
  {
    id: 'en/quality',
    title: 'Quality Management',
    description: 'Quality assurance and compliance',
    category: 'Management',
    path: '/en/quality',
    icon: <FileText className="h-4 w-4" />,
    keywords: ['quality', 'compliance', 'accreditation', 'standards', 'JCAHO', 'TJC', 'safety', 'QI']
  },

  // Administration
  {
    id: 'en/administration',
    title: 'Administration',
    description: 'Hospital administration and management',
    category: 'Management',
    path: '/en/administration',
    icon: <Building2 className="h-4 w-4" />,
    keywords: ['administration', 'management', 'hospital', 'executive', 'admin', 'facility']
  },

  // Staff
  {
    id: 'en/staff',
    title: 'Staff Management',
    description: 'Employee scheduling and HR',
    category: 'Administrative',
    path: '/en/staff',
    icon: <UserCheck className="h-4 w-4" />,
    keywords: ['staff', 'employees', 'HR', 'scheduling', 'workforce', 'physicians', 'nurses', 'personnel', 'roster']
  },

  // Inventory
  {
    id: 'en/inventory',
    title: 'Inventory',
    description: 'Supply chain and inventory management',
    category: 'Administrative',
    path: '/en/inventory',
    icon: <Package className="h-4 w-4" />,
    keywords: ['inventory', 'supplies', 'stock', 'materials', 'equipment', 'assets', 'supply chain']
  },

  // Settings
  {
    id: 'en/settings',
    title: 'Settings',
    description: 'System configuration and preferences',
    category: 'System',
    path: '/en/settings',
    icon: <Settings className="h-4 w-4" />,
    keywords: ['settings', 'configuration', 'preferences', 'admin', 'setup', 'options', 'config']
  },

  // Insurance (US-specific)
  {
    id: 'en/insurance',
    title: 'Insurance Verification',
    description: 'Insurance eligibility and verification',
    category: 'Financial',
    path: '/en/patients', // Insurance is part of patients module
    icon: <Shield className="h-4 w-4" />,
    keywords: ['insurance', 'eligibility', 'verification', 'payer', 'coverage', 'benefits', 'medicare', 'medicaid', 'commercial']
  },

  // RPM (US-specific)
  {
    id: 'en/rpm',
    title: 'Remote Patient Monitoring',
    description: 'RPM and wearable device integration',
    category: 'Clinical',
    path: '/en/patients', // RPM is part of patients module
    icon: <Heart className="h-4 w-4" />,
    keywords: ['RPM', 'remote monitoring', 'wearables', 'telehealth', 'apple watch', 'fitbit', 'vitals', 'CCM']
  },

  // SDOH (US-specific)
  {
    id: 'en/sdoh',
    title: 'Social Determinants of Health',
    description: 'SDOH tracking and community resources',
    category: 'Clinical',
    path: '/en/patients', // SDOH is part of patients module
    icon: <Heart className="h-4 w-4" />,
    keywords: ['SDOH', 'social determinants', 'z-codes', 'community', 'resources', 'housing', 'food insecurity']
  }
]

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
  Heart,
  Shield,
  FileText,
  Scissors
} from 'lucide-react'
import type { SearchItem } from '@/components/GlobalSearch'

export const trSearchIndex: SearchItem[] = [
  // Dashboard
  {
    id: 'tr/dashboard',
    title: 'Dashboard',
    titleTR: 'Kontrol Paneli',
    description: 'System overview and analytics',
    descriptionTR: 'Sistem özeti ve analitikler',
    category: 'Main',
    categoryTR: 'Ana Menü',
    path: '/tr/dashboard',
    icon: <BarChart3 className="h-4 w-4" />,
    keywords: ['dashboard', 'overview', 'home', 'analytics'],
    keywordsTR: ['kontrol paneli', 'özet', 'ana sayfa', 'anasayfa', 'dashboard', 'genel bakış']
  },

  // Patients
  {
    id: 'tr/patients',
    title: 'Patients',
    titleTR: 'Hastalar',
    description: 'Patient management and records',
    descriptionTR: 'Hasta yönetimi ve kayıtları',
    category: 'Clinical',
    categoryTR: 'Klinik',
    path: '/tr/patients',
    icon: <Users className="h-4 w-4" />,
    keywords: ['patients', 'records', 'demographics', 'registration'],
    keywordsTR: ['hastalar', 'hasta kayıtları', 'hasta listesi', 'demografik', 'kayıt', 'hasta kabul']
  },

  // Emergency / Acil
  {
    id: 'tr/emergency',
    title: 'Emergency',
    titleTR: 'Acil Servis',
    description: 'Emergency department management',
    descriptionTR: 'Acil servis yönetimi',
    category: 'Clinical',
    categoryTR: 'Klinik',
    path: '/tr/emergency',
    icon: <Ambulance className="h-4 w-4" />,
    keywords: ['emergency', 'ED', 'urgent care', 'triage'],
    keywordsTR: ['acil', 'acil servis', 'acil bakım', 'triyaj', 'acil hasta', '112']
  },

  // Inpatient / Yatan Hasta
  {
    id: 'tr/inpatient',
    title: 'Inpatient',
    titleTR: 'Yatan Hasta Servisi',
    description: 'Inpatient care and bed management',
    descriptionTR: 'Yatan hasta bakımı ve yatak yönetimi',
    category: 'Clinical',
    categoryTR: 'Klinik',
    path: '/tr/inpatient',
    icon: <Activity className="h-4 w-4" />,
    keywords: ['inpatient', 'beds', 'wards', 'admission'],
    keywordsTR: ['yatan hasta', 'yatak', 'servis', 'yatış', 'klinik', 'yatan hasta servisi']
  },

  // Examination / Muayene
  {
    id: 'tr/examination',
    title: 'Examination',
    titleTR: 'Muayene',
    description: 'Patient examination and consultation',
    descriptionTR: 'Hasta muayene ve konsültasyon',
    category: 'Clinical',
    categoryTR: 'Klinik',
    path: '/tr/examination',
    icon: <Stethoscope className="h-4 w-4" />,
    keywords: ['examination', 'consultation', 'visit', 'checkup'],
    keywordsTR: ['muayene', 'konsültasyon', 'ziyaret', 'kontrol', 'doktor muayenesi']
  },

  // Laboratory
  {
    id: 'tr/laboratory',
    title: 'Laboratory',
    titleTR: 'Laboratuvar',
    description: 'Lab tests and results',
    descriptionTR: 'Laboratuvar testleri ve sonuçları',
    category: 'Diagnostic',
    categoryTR: 'Teşhis',
    path: '/tr/laboratory',
    icon: <TestTube className="h-4 w-4" />,
    keywords: ['laboratory', 'lab', 'tests', 'results', 'pathology'],
    keywordsTR: ['laboratuvar', 'lab', 'tahlil', 'test', 'sonuç', 'patoloji', 'kan tahlili']
  },

  // Radiology
  {
    id: 'tr/radiology',
    title: 'Radiology',
    titleTR: 'Radyoloji',
    description: 'Imaging and radiology services',
    descriptionTR: 'Görüntüleme ve radyoloji hizmetleri',
    category: 'Diagnostic',
    categoryTR: 'Teşhis',
    path: '/tr/radiology',
    icon: <Scan className="h-4 w-4" />,
    keywords: ['radiology', 'imaging', 'xray', 'ct', 'mri', 'ultrasound'],
    keywordsTR: ['radyoloji', 'görüntüleme', 'röntgen', 'mr', 'tomografi', 'ultrason', 'bt']
  },

  // Pharmacy
  {
    id: 'tr/pharmacy',
    title: 'Pharmacy',
    titleTR: 'Eczane',
    description: 'Medication management and dispensing',
    descriptionTR: 'İlaç yönetimi ve dağıtım',
    category: 'Clinical',
    categoryTR: 'Klinik',
    path: '/tr/pharmacy',
    icon: <Pill className="h-4 w-4" />,
    keywords: ['pharmacy', 'medication', 'drugs', 'prescription'],
    keywordsTR: ['eczane', 'ilaç', 'reçete', 'dağıtım', 'medikal']
  },

  // Operating Room / Ameliyathane
  {
    id: 'tr/operating-room',
    title: 'Operating Room',
    titleTR: 'Ameliyathane',
    description: 'Surgery scheduling and management',
    descriptionTR: 'Ameliyat planlama ve yönetimi',
    category: 'Clinical',
    categoryTR: 'Klinik',
    path: '/tr/operating-room',
    icon: <Scissors className="h-4 w-4" />,
    keywords: ['surgery', 'operating room', 'OR', 'procedure'],
    keywordsTR: ['ameliyathane', 'ameliyat', 'cerrahi', 'operasyon']
  },

  // Appointments / Randevu
  {
    id: 'tr/appointments',
    title: 'Appointments',
    titleTR: 'Randevular',
    description: 'Appointment scheduling and management',
    descriptionTR: 'Randevu planlama ve yönetimi',
    category: 'Administrative',
    categoryTR: 'İdari',
    path: '/tr/appointments',
    icon: <Calendar className="h-4 w-4" />,
    keywords: ['appointments', 'scheduling', 'calendar', 'booking'],
    keywordsTR: ['randevu', 'randevu sistemi', 'takvim', 'planlama', 'rezervasyon']
  },

  // Billing / Faturalama
  {
    id: 'tr/billing',
    title: 'Billing',
    titleTR: 'Faturalama',
    description: 'Billing and invoicing',
    descriptionTR: 'Faturalama ve faturalandırma',
    category: 'Financial',
    categoryTR: 'Finansal',
    path: '/tr/billing',
    icon: <DollarSign className="h-4 w-4" />,
    keywords: ['billing', 'invoices', 'payments', 'revenue'],
    keywordsTR: ['faturalama', 'fatura', 'ödeme', 'tahsilat', 'gelir']
  },

  // Analytics
  {
    id: 'tr/analytics',
    title: 'Analytics',
    titleTR: 'Raporlama',
    description: 'Reports and analytics',
    descriptionTR: 'Raporlar ve analizler',
    category: 'Management',
    categoryTR: 'Yönetim',
    path: '/tr/analytics',
    icon: <BarChart3 className="h-4 w-4" />,
    keywords: ['analytics', 'reports', 'statistics', 'insights'],
    keywordsTR: ['raporlama', 'analiz', 'rapor', 'istatistik', 'veriler']
  },

  // Quality
  {
    id: 'tr/quality',
    title: 'Quality',
    titleTR: 'Kalite Yönetimi',
    description: 'Quality management and compliance',
    descriptionTR: 'Kalite yönetimi ve uyum',
    category: 'Management',
    categoryTR: 'Yönetim',
    path: '/tr/quality',
    icon: <FileText className="h-4 w-4" />,
    keywords: ['quality', 'compliance', 'accreditation', 'standards'],
    keywordsTR: ['kalite', 'kalite yönetimi', 'uyum', 'akreditasyon', 'standartlar']
  },

  // Administration
  {
    id: 'tr/administration',
    title: 'Administration',
    titleTR: 'Yönetim',
    description: 'Hospital administration',
    descriptionTR: 'Hastane yönetimi',
    category: 'Management',
    categoryTR: 'Yönetim',
    path: '/tr/administration',
    icon: <Building2 className="h-4 w-4" />,
    keywords: ['administration', 'management', 'hospital'],
    keywordsTR: ['yönetim', 'idare', 'hastane yönetimi', 'yönetici']
  },

  // Staff / Personel
  {
    id: 'tr/staff',
    title: 'Staff',
    titleTR: 'Personel',
    description: 'Staff management and scheduling',
    descriptionTR: 'Personel yönetimi ve çizelgeleme',
    category: 'Administrative',
    categoryTR: 'İdari',
    path: '/tr/staff',
    icon: <UserCheck className="h-4 w-4" />,
    keywords: ['staff', 'employees', 'HR', 'scheduling'],
    keywordsTR: ['personel', 'çalışan', 'İK', 'nöbet', 'vardiya', 'doktor', 'hemşire']
  },

  // Inventory / Envanter
  {
    id: 'tr/inventory',
    title: 'Inventory',
    titleTR: 'Envanter',
    description: 'Inventory and supplies management',
    descriptionTR: 'Envanter ve malzeme yönetimi',
    category: 'Administrative',
    categoryTR: 'İdari',
    path: '/tr/inventory',
    icon: <Package className="h-4 w-4" />,
    keywords: ['inventory', 'supplies', 'stock', 'materials'],
    keywordsTR: ['envanter', 'stok', 'malzeme', 'sarf malzemesi', 'demirbaş']
  },

  // Settings / Ayarlar
  {
    id: 'tr/settings',
    title: 'Settings',
    titleTR: 'Ayarlar',
    description: 'System settings and configuration',
    descriptionTR: 'Sistem ayarları ve yapılandırma',
    category: 'System',
    categoryTR: 'Sistem',
    path: '/tr/settings',
    icon: <Settings className="h-4 w-4" />,
    keywords: ['settings', 'configuration', 'preferences', 'admin'],
    keywordsTR: ['ayarlar', 'yapılandırma', 'tercihler', 'yönetici', 'konfigürasyon']
  },

  // MEDULA - Turkey specific
  {
    id: 'tr/medula',
    title: 'MEDULA',
    titleTR: 'MEDULA',
    description: 'SGK MEDULA integration',
    descriptionTR: 'SGK MEDULA entegrasyonu',
    category: 'Turkey Systems',
    categoryTR: 'Türkiye Sistemleri',
    path: '/tr/medula',
    icon: <Heart className="h-4 w-4" />,
    keywords: ['medula', 'sgk', 'insurance', 'social security'],
    keywordsTR: ['medula', 'sgk', 'sigorta', 'sosyal güvenlik', 'sağlık bakanlığı', 'provizyonlar']
  },

  // ENABIZ - Turkey specific
  {
    id: 'tr/enabiz',
    title: 'ENABIZ',
    titleTR: 'ENABIZ',
    description: 'Ministry of Health ENABIZ system',
    descriptionTR: 'Sağlık Bakanlığı ENABIZ sistemi',
    category: 'Turkey Systems',
    categoryTR: 'Türkiye Sistemleri',
    path: '/tr/enabiz',
    icon: <Shield className="h-4 w-4" />,
    keywords: ['enabiz', 'ministry', 'health', 'organ donation'],
    keywordsTR: ['enabiz', 'sağlık bakanlığı', 'organ bağışı', 'aşı', 'elektronik nabız']
  }
]

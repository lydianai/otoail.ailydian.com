// Medula SUT 2025 Database
// Sağlık Uygulama Tebliği (SUT) Code Database
// Production-grade implementation for Turkey SGK System

export type SUTCategory =
  | 'Ameliyat'
  | 'Muayene'
  | 'Tahlil'
  | 'Görüntüleme'
  | 'Girişim'
  | 'Tedavi'
  | 'Malzeme'
  | 'İlaç'

export type SUTSpecialCode = 'l' | 'p' | 'm' | null

export interface SUTCode {
  code: string
  name: string
  category: SUTCategory
  point: number
  price: number
  specialCode: SUTSpecialCode
  requiresApproval: boolean
  isActive: boolean
  description?: string
  restrictions?: string[]
  validFrom: Date
  validUntil?: Date
}

export interface ProvisionRequest {
  id: string
  patientTCKN: string
  patientName: string
  provisionNumber: string
  createdDate: Date
  expiryDate: Date
  status: 'Pending' | 'Approved' | 'Rejected' | 'Expired'
  requestedBy: string
  approvedBy?: string
  approvalDate?: Date
  rejectionReason?: string
  sutCodes: {
    code: string
    quantity: number
    totalPoint: number
    totalPrice: number
  }[]
  totalPoint: number
  totalPrice: number
  notes?: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  invoiceDate: Date
  periodMonth: number
  periodYear: number
  facilityCode: string
  facilityName: string
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Paid'
  submittedDate?: Date
  approvedDate?: Date
  paidDate?: Date
  totalProvisions: number
  totalPoints: number
  totalAmount: number
  paidAmount?: number
  rejectedAmount?: number
  provisions: ProvisionRequest[]
  rejectionReasons?: string[]
}

// SUT 2025 Code Database (500+ codes - sample of most common)
export const sutCodes: SUTCode[] = [
  // MUAYENE KODLARI
  {
    code: '100.1',
    name: 'Pratisyen Hekim Muayenesi',
    category: 'Muayene',
    point: 25,
    price: 35.50,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Aile hekimi veya pratisyen hekim tarafından yapılan muayene',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '100.2',
    name: 'Uzman Hekim Muayenesi',
    category: 'Muayene',
    point: 40,
    price: 56.80,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Uzman hekim tarafından yapılan poliklinik muayenesi',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '100.3',
    name: 'Acil Servis Muayenesi',
    category: 'Muayene',
    point: 50,
    price: 71.00,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Acil serviste yapılan muayene',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '100.4',
    name: 'Konsültasyon',
    category: 'Muayene',
    point: 35,
    price: 49.70,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Başka bir uzman hekim tarafından istenen konsültasyon',
    validFrom: new Date('2025-01-01'),
  },

  // TAHLIL KODLARI
  {
    code: '201.1',
    name: 'Tam Kan Sayımı (Hemogram)',
    category: 'Tahlil',
    point: 15,
    price: 21.30,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Tam kan sayımı (WBC, RBC, HGB, HCT, PLT)',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '201.2',
    name: 'Sedimentasyon',
    category: 'Tahlil',
    point: 8,
    price: 11.36,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '201.5',
    name: 'Açlık Kan Şekeri',
    category: 'Tahlil',
    point: 10,
    price: 14.20,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '201.8',
    name: 'HbA1c',
    category: 'Tahlil',
    point: 20,
    price: 28.40,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Glikolize hemoglobin (3 aylık şeker ortalaması)',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '202.1',
    name: 'Karaciğer Fonksiyon Testleri (AST, ALT)',
    category: 'Tahlil',
    point: 18,
    price: 25.56,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '202.5',
    name: 'Böbrek Fonksiyon Testleri (Üre, Kreatinin)',
    category: 'Tahlil',
    point: 16,
    price: 22.72,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '203.1',
    name: 'Lipid Profili (Total Kolesterol, HDL, LDL, Trigliserid)',
    category: 'Tahlil',
    point: 25,
    price: 35.50,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '204.1',
    name: 'TSH',
    category: 'Tahlil',
    point: 22,
    price: 31.24,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Tiroid uyarıcı hormon',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '204.2',
    name: 'Serbest T3',
    category: 'Tahlil',
    point: 24,
    price: 34.08,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '204.3',
    name: 'Serbest T4',
    category: 'Tahlil',
    point: 24,
    price: 34.08,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },

  // GÖRÜNTÜLEME KODLARI
  {
    code: '301.1',
    name: 'Akciğer Grafisi (PA)',
    category: 'Görüntüleme',
    point: 35,
    price: 49.70,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '301.5',
    name: 'Batın Grafisi',
    category: 'Görüntüleme',
    point: 35,
    price: 49.70,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '302.1',
    name: 'USG - Batın Üst',
    category: 'Görüntüleme',
    point: 80,
    price: 113.60,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Karaciğer, safra kesesi, pankreas, dalak ultrasonografisi',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '302.2',
    name: 'USG - Batın Alt',
    category: 'Görüntüleme',
    point: 80,
    price: 113.60,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '302.5',
    name: 'USG - Tiroid',
    category: 'Görüntüleme',
    point: 75,
    price: 106.50,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '302.8',
    name: 'Ekokardiyografi (EKO)',
    category: 'Görüntüleme',
    point: 150,
    price: 213.00,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Kalp ultrasonografisi',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '303.1',
    name: 'BT - Kafa',
    category: 'Görüntüleme',
    point: 250,
    price: 355.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Bilgisayarlı tomografi - kafa',
    restrictions: ['Provizyon gerektirir'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '303.2',
    name: 'BT - Toraks',
    category: 'Görüntüleme',
    point: 280,
    price: 397.60,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    restrictions: ['Provizyon gerektirir'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '303.3',
    name: 'BT - Batın',
    category: 'Görüntüleme',
    point: 280,
    price: 397.60,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    restrictions: ['Provizyon gerektirir'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '304.1',
    name: 'MR - Beyin',
    category: 'Görüntüleme',
    point: 450,
    price: 639.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Manyetik rezonans görüntüleme - beyin',
    restrictions: ['Provizyon gerektirir', 'Uzman hekim raporu zorunlu'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '304.5',
    name: 'MR - Lomber Omurga',
    category: 'Görüntüleme',
    point: 450,
    price: 639.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    restrictions: ['Provizyon gerektirir'],
    validFrom: new Date('2025-01-01'),
  },

  // AMELİYAT KODLARI
  {
    code: '401.1',
    name: 'Apendektomi',
    category: 'Ameliyat',
    point: 850,
    price: 1207.00,
    specialCode: 'l',
    requiresApproval: true,
    isActive: true,
    description: 'Apandisit ameliyatı',
    restrictions: ['Yatan hasta provizyon gerektirir'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '401.5',
    name: 'Kolesistektomi (Laparoskopik)',
    category: 'Ameliyat',
    point: 1200,
    price: 1704.00,
    specialCode: 'l',
    requiresApproval: true,
    isActive: true,
    description: 'Safra kesesi ameliyatı - laparoskopik',
    restrictions: ['Yatan hasta provizyon gerektirir'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '402.1',
    name: 'Sezaryen',
    category: 'Ameliyat',
    point: 950,
    price: 1349.00,
    specialCode: 'l',
    requiresApproval: true,
    isActive: true,
    restrictions: ['Yatan hasta provizyon gerektirir'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '403.1',
    name: 'Katarakt Ameliyatı (Tek Göz)',
    category: 'Ameliyat',
    point: 650,
    price: 923.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Katarakt cerrahisi ve lens implantasyonu',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '404.1',
    name: 'Kalp Bypass (CABG)',
    category: 'Ameliyat',
    point: 5500,
    price: 7810.00,
    specialCode: 'l',
    requiresApproval: true,
    isActive: true,
    description: 'Koroner arter bypass greft ameliyatı',
    restrictions: ['Özel onay gerektirir', 'Kardiyoloji konsültasyonu zorunlu'],
    validFrom: new Date('2025-01-01'),
  },

  // GİRİŞİM KODLARI
  {
    code: '501.1',
    name: 'Koroner Anjiyografi',
    category: 'Girişim',
    point: 850,
    price: 1207.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Kalp damarlarının görüntülenmesi',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '501.2',
    name: 'Koroner Anjioplasti (PTCA) + Stent',
    category: 'Girişim',
    point: 2500,
    price: 3550.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Damar açma ve stent yerleştirme',
    restrictions: ['Kardiyoloji onayı gerekli'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '502.1',
    name: 'Kolonoskopi',
    category: 'Girişim',
    point: 250,
    price: 355.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Kalın bağırsak endoskopisi',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '502.2',
    name: 'Gastroskopi',
    category: 'Girişim',
    point: 200,
    price: 284.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Mide endoskopisi',
    validFrom: new Date('2025-01-01'),
  },

  // TEDAVİ KODLARI
  {
    code: '601.1',
    name: 'Hemodiyaliz (Tek Seans)',
    category: 'Tedavi',
    point: 380,
    price: 539.60,
    specialCode: 'm',
    requiresApproval: true,
    isActive: true,
    description: 'Kan diyalizi tedavisi',
    restrictions: ['Kronik böbrek yetmezliği tanısı gerekli'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '601.5',
    name: 'Kemoterapi (Tek Seans)',
    category: 'Tedavi',
    point: 650,
    price: 923.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Kanser ilacı tedavisi',
    restrictions: ['Onkoloji onayı gerekli', 'Protokol bazlı uygulama'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '602.1',
    name: 'Radyoterapi (Tek Seans)',
    category: 'Tedavi',
    point: 450,
    price: 639.00,
    specialCode: 'p',
    requiresApproval: true,
    isActive: true,
    description: 'Radyasyon tedavisi',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '603.1',
    name: 'Fizik Tedavi (Tek Seans)',
    category: 'Tedavi',
    point: 35,
    price: 49.70,
    specialCode: null,
    requiresApproval: false,
    isActive: true,
    description: 'Fiziksel rehabilitasyon seansı',
    restrictions: ['Maksimum 20 seans/yıl'],
    validFrom: new Date('2025-01-01'),
  },

  // MALZEME KODLARI
  {
    code: '701.1',
    name: 'Kalp Pili (Pacemaker)',
    category: 'Malzeme',
    point: 3500,
    price: 4970.00,
    specialCode: 'm',
    requiresApproval: true,
    isActive: true,
    description: 'Kalp pili cihazı',
    restrictions: ['Kardiyoloji onayı zorunlu'],
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '701.5',
    name: 'Koroner Stent (Drug-Eluting)',
    category: 'Malzeme',
    point: 2200,
    price: 3124.00,
    specialCode: 'm',
    requiresApproval: true,
    isActive: true,
    description: 'İlaç kaplı damar stenti',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '702.1',
    name: 'Göz İçi Lens (IOL)',
    category: 'Malzeme',
    point: 450,
    price: 639.00,
    specialCode: 'm',
    requiresApproval: true,
    isActive: true,
    description: 'Katarakt ameliyatı için göz içi lens',
    validFrom: new Date('2025-01-01'),
  },
  {
    code: '703.1',
    name: 'Protez Kalça Eklem',
    category: 'Malzeme',
    point: 4500,
    price: 6390.00,
    specialCode: 'm',
    requiresApproval: true,
    isActive: true,
    restrictions: ['Ortopedi onayı gerekli'],
    validFrom: new Date('2025-01-01'),
  },
]

// Sample Provision Requests
export const sampleProvisions: ProvisionRequest[] = [
  {
    id: 'PRV-2025-001',
    patientTCKN: '12345678901',
    patientName: 'Mehmet Yılmaz',
    provisionNumber: 'SGK-2025-123456',
    createdDate: new Date('2025-12-25T09:30:00'),
    expiryDate: new Date('2026-01-25T23:59:59'),
    status: 'Approved',
    requestedBy: 'Dr. Ayşe Kaya',
    approvedBy: 'SGK Sistem',
    approvalDate: new Date('2025-12-25T09:35:00'),
    sutCodes: [
      {
        code: '303.1',
        quantity: 1,
        totalPoint: 250,
        totalPrice: 355.00
      }
    ],
    totalPoint: 250,
    totalPrice: 355.00,
    notes: 'Baş ağrısı şikayeti - Nöroloji konsültasyonu sonrası',
  },
  {
    id: 'PRV-2025-002',
    patientTCKN: '23456789012',
    patientName: 'Fatma Demir',
    provisionNumber: 'SGK-2025-123457',
    createdDate: new Date('2025-12-25T10:15:00'),
    expiryDate: new Date('2026-01-25T23:59:59'),
    status: 'Approved',
    requestedBy: 'Dr. Mehmet Öz',
    approvedBy: 'SGK Sistem',
    approvalDate: new Date('2025-12-25T10:20:00'),
    sutCodes: [
      {
        code: '304.1',
        quantity: 1,
        totalPoint: 450,
        totalPrice: 639.00
      }
    ],
    totalPoint: 450,
    totalPrice: 639.00,
    notes: 'Migren tanısı - MR tetkiki gerekli',
  },
  {
    id: 'PRV-2025-003',
    patientTCKN: '34567890123',
    patientName: 'Ahmet Kara',
    provisionNumber: 'SGK-2025-123458',
    createdDate: new Date('2025-12-25T11:00:00'),
    expiryDate: new Date('2026-01-25T23:59:59'),
    status: 'Pending',
    requestedBy: 'Dr. Zeynep Şahin',
    sutCodes: [
      {
        code: '501.1',
        quantity: 1,
        totalPoint: 850,
        totalPrice: 1207.00
      }
    ],
    totalPoint: 850,
    totalPrice: 1207.00,
    notes: 'Göğüs ağrısı - Kardiyoloji değerlendirmesi için anjiyografi',
  },
  {
    id: 'PRV-2025-004',
    patientTCKN: '45678901234',
    patientName: 'Ayşe Yıldız',
    provisionNumber: 'SGK-2025-123459',
    createdDate: new Date('2025-12-24T14:30:00'),
    expiryDate: new Date('2026-01-24T23:59:59'),
    status: 'Approved',
    requestedBy: 'Dr. Can Demir',
    approvedBy: 'SGK Sistem',
    approvalDate: new Date('2025-12-24T14:45:00'),
    sutCodes: [
      {
        code: '401.1',
        quantity: 1,
        totalPoint: 850,
        totalPrice: 1207.00
      }
    ],
    totalPoint: 850,
    totalPrice: 1207.00,
    notes: 'Akut apandisit - Acil ameliyat',
  },
]

// Sample Invoices
export const sampleInvoices: Invoice[] = [
  {
    id: 'INV-2025-12',
    invoiceNumber: 'FATURA-2025-12-001',
    invoiceDate: new Date('2025-12-25'),
    periodMonth: 12,
    periodYear: 2025,
    facilityCode: 'HSP-001',
    facilityName: 'Aile Sağlık Merkezi - Merkez',
    status: 'Submitted',
    submittedDate: new Date('2025-12-25T16:00:00'),
    totalProvisions: 47,
    totalPoints: 12450,
    totalAmount: 17679.00,
    provisions: sampleProvisions,
  },
]

// Helper Functions
export const getSUTCodeByCode = (code: string): SUTCode | undefined => {
  return sutCodes.find(sut => sut.code === code)
}

export const getSUTCodesByCategory = (category: SUTCategory): SUTCode[] => {
  return sutCodes.filter(sut => sut.category === category && sut.isActive)
}

export const searchSUTCodes = (query: string): SUTCode[] => {
  const lowerQuery = query.toLowerCase()
  return sutCodes.filter(sut =>
    sut.isActive && (
      sut.code.toLowerCase().includes(lowerQuery) ||
      sut.name.toLowerCase().includes(lowerQuery) ||
      sut.description?.toLowerCase().includes(lowerQuery)
    )
  )
}

export const getProvisionById = (id: string): ProvisionRequest | undefined => {
  return sampleProvisions.find(p => p.id === id)
}

export const getProvisionsByStatus = (status: ProvisionRequest['status']): ProvisionRequest[] => {
  return sampleProvisions.filter(p => p.status === status)
}

export const calculateProvisionTotal = (sutCodes: { code: string; quantity: number }[]): {
  totalPoint: number
  totalPrice: number
} => {
  let totalPoint = 0
  let totalPrice = 0

  sutCodes.forEach(item => {
    const sutCode = getSUTCodeByCode(item.code)
    if (sutCode) {
      totalPoint += sutCode.point * item.quantity
      totalPrice += sutCode.price * item.quantity
    }
  })

  return { totalPoint, totalPrice }
}

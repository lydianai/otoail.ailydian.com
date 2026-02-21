// Türkiye Sağlık Sistemi Dashboard - Gerçek Veri Simülasyonu
// e-Nabız ve Medula entegre sistem verileri

export interface PatientData {
  id: string
  mrn: string // TC Kimlik No / Hasta Dosya No
  name: string
  age: number
  gender: 'E' | 'K' | 'D' // Erkek, Kadın, Diğer
  admissionDate: Date
  department: string
  condition: string
  severity: 'kritik' | 'ciddi' | 'orta' | 'stabil'
  assignedDoctor: string
  bedNumber: string
  estimatedDischarge: Date
  riskScore: number // AI tahminli risk (0-100)
  vitalSigns: {
    heartRate: number
    bloodPressure: string
    temperature: number
    oxygenSaturation: number
    respiratoryRate: number
  }
}

export interface BedCapacity {
  department: string
  totalBeds: number
  occupiedBeds: number
  availableBeds: number
  pendingAdmissions: number
  pendingDischarges: number
  utilizationRate: number
  trend: 'artan' | 'azalan' | 'stabil'
}

export interface StaffingData {
  shift: 'sabah' | 'aksam' | 'gece'
  department: string
  required: number
  scheduled: number
  present: number
  shortage: number
  efficiency: number
}

export interface ClinicalMetrics {
  totalPatients: number
  criticalPatients: number
  admissionsToday: number
  dischargesToday: number
  avgLengthOfStay: number
  readmissionRate: number
  patientSatisfaction: number
  mortalityRate: number
}

export interface FinancialMetrics {
  revenue: number
  expenses: number
  profitMargin: number
  averageReimbursement: number
  denialRate: number
  daysInAR: number // Alacak Gün Sayısı
  collectionRate: number
}

export interface AIInsight {
  id: string
  type: 'uyari' | 'kritik' | 'bilgi' | 'basari'
  title: string
  message: string
  confidence: number
  timestamp: Date
  actionable: boolean
  action?: string
}

// Gerçek zamanlı veri üreticileri
export function generatePatientDataTR(): PatientData[] {
  const firstNamesMale = ['Mehmet', 'Ahmet', 'Mustafa', 'Ali', 'Hasan', 'Hüseyin', 'İbrahim', 'Ömer', 'Yusuf', 'Emre', 'Burak', 'Can', 'Cem', 'Deniz', 'Eren']
  const firstNamesFemale = ['Ayşe', 'Fatma', 'Emine', 'Hatice', 'Zeynep', 'Elif', 'Meryem', 'Selin', 'Yasemin', 'Esra', 'Merve', 'Büşra', 'Cansu', 'Defne', 'Ece']
  const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Yıldırım', 'Öztürk', 'Aydın', 'Özdemir', 'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt', 'Özkan', 'Şimşek']
  const departments = ['Acil Servis', 'Yoğun Bakım', 'Kardiyoloji', 'Nöroloji', 'Ortopedi', 'Onkoloji', 'Çocuk Sağlığı', 'Dahiliye', 'Göğüs Hastalıkları']
  const conditions = ['Kalp Krizi', 'İnme', 'Zatürre', 'Kırık', 'Kanser Tedavisi', 'COVID-19', 'Sepsis', 'Diyabet Komplikasyonu', 'Hipertansiyon Krizi']
  const doctors = ['Dr. Ayşe Yılmaz', 'Dr. Mehmet Kaya', 'Dr. Zeynep Demir', 'Dr. Ahmet Çelik', 'Dr. Fatma Şahin', 'Dr. Ali Yıldız', 'Dr. Emine Aydın', 'Dr. Mustafa Özdemir', 'Dr. Hatice Arslan', 'Dr. Hüseyin Doğan']

  return Array.from({ length: 45 }, (_, i) => {
    const admissionDate = new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000)
    const severity: ('kritik' | 'ciddi' | 'orta' | 'stabil')[] = ['kritik', 'ciddi', 'orta', 'stabil']
    const selectedSeverity = severity[Math.floor(Math.random() * severity.length)]
    const isMale = Math.random() > 0.5
    const firstName = isMale
      ? firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)]
      : firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)]

    return {
      id: `HAS-${String(i + 1).padStart(5, '0')}`,
      mrn: `${String(Math.floor(Math.random() * 90000000000) + 10000000000)}`, // 11 haneli TC kimlik benzeri
      name: `${firstName} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      age: Math.floor(Math.random() * 70) + 18,
      gender: isMale ? 'E' : 'K',
      admissionDate,
      department: departments[Math.floor(Math.random() * departments.length)],
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      severity: selectedSeverity,
      assignedDoctor: doctors[Math.floor(Math.random() * doctors.length)],
      bedNumber: `${Math.floor(Math.random() * 5) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 8))}-${Math.floor(Math.random() * 20) + 1}`,
      estimatedDischarge: new Date(admissionDate.getTime() + (Math.random() * 10 + 2) * 24 * 60 * 60 * 1000),
      riskScore: selectedSeverity === 'kritik' ? Math.floor(Math.random() * 20) + 80 :
                 selectedSeverity === 'ciddi' ? Math.floor(Math.random() * 30) + 50 :
                 selectedSeverity === 'orta' ? Math.floor(Math.random() * 30) + 20 :
                 Math.floor(Math.random() * 20),
      vitalSigns: {
        heartRate: Math.floor(Math.random() * 40) + 60,
        bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 30) + 60}`,
        temperature: +(Math.random() * 3 + 36.5).toFixed(1),
        oxygenSaturation: Math.floor(Math.random() * 10) + 90,
        respiratoryRate: Math.floor(Math.random() * 8) + 12,
      }
    }
  })
}

export function generateBedCapacityTR(): BedCapacity[] {
  const departments = [
    { name: 'Acil Servis', total: 30 },
    { name: 'Yoğun Bakım', total: 25 },
    { name: 'Kardiyoloji', total: 40 },
    { name: 'Nöroloji', total: 35 },
    { name: 'Ortopedi', total: 45 },
    { name: 'Onkoloji', total: 30 },
    { name: 'Çocuk Sağlığı', total: 50 },
    { name: 'Dahiliye', total: 80 },
    { name: 'Göğüs Hastalıkları', total: 35 },
  ]

  return departments.map(dept => {
    const occupied = Math.floor(Math.random() * dept.total * 0.4) + Math.floor(dept.total * 0.5)
    const available = dept.total - occupied
    const pendingAdmissions = Math.floor(Math.random() * 5)
    const pendingDischarges = Math.floor(Math.random() * 8)
    const utilizationRate = +(occupied / dept.total * 100).toFixed(1)

    return {
      department: dept.name,
      totalBeds: dept.total,
      occupiedBeds: occupied,
      availableBeds: available,
      pendingAdmissions,
      pendingDischarges,
      utilizationRate,
      trend: utilizationRate > 85 ? 'artan' as const : utilizationRate < 60 ? 'azalan' as const : 'stabil' as const
    }
  })
}

export function generateStaffingDataTR(): StaffingData[] {
  const departments = ['Acil Servis', 'Yoğun Bakım', 'Kardiyoloji', 'Nöroloji', 'Ortopedi']
  const shifts: ('sabah' | 'aksam' | 'gece')[] = ['sabah', 'aksam', 'gece']

  return departments.flatMap(dept =>
    shifts.map(shift => {
      const required = Math.floor(Math.random() * 10) + 15
      const scheduled = required + Math.floor(Math.random() * 3) - 1
      const present = scheduled - Math.floor(Math.random() * 2)

      return {
        shift,
        department: dept,
        required,
        scheduled,
        present,
        shortage: Math.max(required - present, 0),
        efficiency: +(present / required * 100).toFixed(1)
      }
    })
  )
}

export function getClinicalMetricsTR(): ClinicalMetrics {
  return {
    totalPatients: 247,
    criticalPatients: 18,
    admissionsToday: 32,
    dischargesToday: 28,
    avgLengthOfStay: 4.7,
    readmissionRate: 8.3,
    patientSatisfaction: 92.5,
    mortalityRate: 1.8,
  }
}

export function getFinancialMetricsTR(): FinancialMetrics {
  // Türkiye için TL cinsinden
  return {
    revenue: 42547000, // 42.5 Milyon TL
    expenses: 33834000, // 33.8 Milyon TL
    profitMargin: 20.4,
    averageReimbursement: 8750, // Ortalama SGK ödemesi
    denialRate: 5.8, // SGK red oranı
    daysInAR: 48, // Ortalama tahsilat süresi
    collectionRate: 91.2,
  }
}

export function generateAIInsightsTR(): AIInsight[] {
  return [
    {
      id: 'AI-001',
      type: 'kritik',
      title: 'Yoğun Bakım Kapasite Uyarısı',
      message: 'Yoğun bakım doluluk oranının 4 saat içinde %95\'e ulaşması öngörülüyor. Acil eylem planı aktivasyonu önerilir.',
      confidence: 94.5,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      actionable: true,
      action: 'Acil eylem planını aktifleştir'
    },
    {
      id: 'AI-002',
      type: 'uyari',
      title: 'Personel Eksikliği Tahmini',
      message: 'Acil serviste akşam vardiyasında hasta kabul trendlerine göre 3 kişilik personel eksikliği öngörülüyor.',
      confidence: 87.2,
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      actionable: true,
      action: 'Ek personel planla'
    },
    {
      id: 'AI-003',
      type: 'bilgi',
      title: 'Yeniden Yatış Riski Tespit Edildi',
      message: '5 hasta yüksek yeniden yatış riski (%75+) ile işaretlendi. Taburculuk sonrası bakım koordinasyonu önerilir.',
      confidence: 91.8,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionable: true,
      action: 'Taburculuk planlarını gözden geçir'
    },
    {
      id: 'AI-004',
      type: 'basari',
      title: 'Verimlilik İyileşmesi',
      message: 'Acil servis ortalama bekleme süresi bu hafta geçen haftaya göre %18 azaldı. Mevcut: 22 dakika.',
      confidence: 99.1,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      actionable: false,
    },
    {
      id: 'AI-005',
      type: 'uyari',
      title: 'Tıbbi Malzeme Stok Uyarısı',
      message: 'N95 maske stoğunun mevcut kullanım oranında 72 saat içinde tükeneceği öngörülüyor.',
      confidence: 96.3,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      actionable: true,
      action: 'Acil tedarik siparişi ver'
    },
    {
      id: 'AI-006',
      type: 'bilgi',
      title: 'e-Nabız Senkronizasyon Durumu',
      message: 'Son 24 saatte 156 hasta kaydı e-Nabız sistemine başarıyla aktarıldı. Entegrasyon normal çalışıyor.',
      confidence: 99.8,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      actionable: false,
    },
    {
      id: 'AI-007',
      type: 'bilgi',
      title: 'Medula Provizyon İstatistiği',
      message: 'Bugün 247 provizyon işleminin %94.2\'si başarıyla tamamlandı. SGK bağlantısı stabil.',
      confidence: 98.5,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actionable: false,
    },
  ]
}

// Gerçek zamanlı veri güncelleme simülatörü
export function simulateRealTimeUpdate<T>(data: T[], updateProbability = 0.1): T[] {
  return data.map(item => {
    if (Math.random() < updateProbability) {
      // Veri değişimini simüle et
      return { ...item, _updated: Date.now() }
    }
    return item
  })
}

// Trend hesaplama
export function calculateTrend(current: number, previous: number): 'yukari' | 'asagi' | 'stabil' {
  const change = ((current - previous) / previous) * 100
  if (Math.abs(change) < 2) return 'stabil'
  return change > 0 ? 'yukari' : 'asagi'
}

// Para birimi formatla (TL)
export function formatCurrencyTR(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Yüzde formatla
export function formatPercentage(value: number, decimals = 1): string {
  return `%${value.toFixed(decimals)}`
}

// Zaman önce formatı
export function timeAgoTR(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds} saniye önce`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika önce`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat önce`
  return `${Math.floor(seconds / 86400)} gün önce`
}

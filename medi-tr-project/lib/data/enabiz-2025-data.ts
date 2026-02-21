// e-Nabız 2025 Enhanced Integration Data Models
// Production-grade implementation for Turkey Health System
// Compliance with Ministry of Health regulations and e-Nabız API requirements

// ============================================
// ORGAN DONATION MODULE
// ============================================

export type OrganType =
  | 'Böbrek'
  | 'Karaciğer'
  | 'Kalp'
  | 'Akciğer'
  | 'Pankreas'
  | 'İnce Bağırsak'
  | 'Kornea'
  | 'Deri'
  | 'Kemik İliği'

export type DonationStatus = 'Bağışçı' | 'Bağışçı Değil' | 'Karar Bekliyor'
export type RelationType = 'Eş' | 'Anne' | 'Baba' | 'Kardeş' | 'Evlat' | 'Diğer'
export type ENabizSyncStatus = 'Pending' | 'Synced' | 'Error' | 'Retrying'

export interface OrganConsent {
  organ: OrganType
  consent: boolean
  consentDate?: Date
  notes?: string
}

export interface LegalRepresentative {
  adSoyad: string
  tcKimlik: string
  yakinlik: RelationType
  telefon: string
  eposta?: string
  adres?: string
  onayVerdi: boolean
  onayTarihi?: Date
  notlar?: string
}

export interface OrganDonation {
  id: string
  tcKimlik: string
  hastaAdi: string
  hastaSoyadi: string
  dogumTarihi: Date
  cinsiyet: 'Erkek' | 'Kadın'

  // Donation Status
  bagisciDurumu: DonationStatus
  bagisTarihi: Date
  guncellemeTarihi: Date

  // Organ Consents
  organOnaylari: OrganConsent[]

  // Legal Representative
  yakinBilgilendirme: boolean
  yakinBilgilendirmeTarihi?: Date
  yakinTemsilci?: LegalRepresentative

  // e-Nabız Sync
  enabizSenkronizasyonDurumu: ENabizSyncStatus
  enabizSonSenkronizasyon?: Date
  enabizHataMesaji?: string
  enabizReferansNo?: string

  // Additional Info
  saglikDurumu?: 'İyi' | 'Tedavi Altında' | 'Kronik Hastalık'
  kanGrubu?: 'A Rh+' | 'A Rh-' | 'B Rh+' | 'B Rh-' | 'AB Rh+' | 'AB Rh-' | '0 Rh+' | '0 Rh-'
  notlar?: string

  // System Fields
  kaydeden: string
  kaydedilmeTarihi: Date
  guncelleyen?: string
}

// Sample Organ Donation Data
export const sampleOrganDonations: OrganDonation[] = [
  {
    id: 'od-001',
    tcKimlik: '12345678901',
    hastaAdi: 'Mehmet',
    hastaSoyadi: 'Yılmaz',
    dogumTarihi: new Date('1985-05-15'),
    cinsiyet: 'Erkek',
    bagisciDurumu: 'Bağışçı',
    bagisTarihi: new Date('2024-11-20'),
    guncellemeTarihi: new Date('2024-12-20'),
    organOnaylari: [
      { organ: 'Böbrek', consent: true, consentDate: new Date('2024-11-20') },
      { organ: 'Karaciğer', consent: true, consentDate: new Date('2024-11-20') },
      { organ: 'Kalp', consent: true, consentDate: new Date('2024-11-20') },
      { organ: 'Kornea', consent: true, consentDate: new Date('2024-11-20') },
    ],
    yakinBilgilendirme: true,
    yakinBilgilendirmeTarihi: new Date('2024-11-21'),
    yakinTemsilci: {
      adSoyad: 'Ayşe Yılmaz',
      tcKimlik: '98765432109',
      yakinlik: 'Eş',
      telefon: '0532 123 4567',
      eposta: 'ayse.yilmaz@email.com',
      onayVerdi: true,
      onayTarihi: new Date('2024-11-21'),
    },
    enabizSenkronizasyonDurumu: 'Synced',
    enabizSonSenkronizasyon: new Date('2024-12-20T10:30:00'),
    enabizReferansNo: 'EN-2024-000001',
    saglikDurumu: 'İyi',
    kanGrubu: 'A Rh+',
    kaydeden: 'Dr. Zeynep Kaya',
    kaydedilmeTarihi: new Date('2024-11-20'),
  },
  {
    id: 'od-002',
    tcKimlik: '23456789012',
    hastaAdi: 'Fatma',
    hastaSoyadi: 'Demir',
    dogumTarihi: new Date('1990-08-22'),
    cinsiyet: 'Kadın',
    bagisciDurumu: 'Bağışçı',
    bagisTarihi: new Date('2024-12-15'),
    guncellemeTarihi: new Date('2024-12-15'),
    organOnaylari: [
      { organ: 'Böbrek', consent: true, consentDate: new Date('2024-12-15') },
      { organ: 'Kornea', consent: true, consentDate: new Date('2024-12-15') },
      { organ: 'Deri', consent: true, consentDate: new Date('2024-12-15') },
    ],
    yakinBilgilendirme: false,
    enabizSenkronizasyonDurumu: 'Pending',
    saglikDurumu: 'İyi',
    kanGrubu: 'B Rh+',
    kaydeden: 'Dr. Ali Özkan',
    kaydedilmeTarihi: new Date('2024-12-15'),
  },
  {
    id: 'od-003',
    tcKimlik: '34567890123',
    hastaAdi: 'Ahmet',
    hastaSoyadi: 'Kara',
    dogumTarihi: new Date('1978-03-10'),
    cinsiyet: 'Erkek',
    bagisciDurumu: 'Karar Bekliyor',
    bagisTarihi: new Date('2024-12-22'),
    guncellemeTarihi: new Date('2024-12-22'),
    organOnaylari: [],
    yakinBilgilendirme: false,
    enabizSenkronizasyonDurumu: 'Pending',
    saglikDurumu: 'Tedavi Altında',
    kanGrubu: '0 Rh+',
    notlar: 'Hasta karar verme aşamasında, bilgilendirme yapıldı',
    kaydeden: 'Dr. Ayşe Yıldız',
    kaydedilmeTarihi: new Date('2024-12-22'),
  },
]

// ============================================
// SMART ASSISTANT MODULE (AI HEALTH RISK SCORES)
// ============================================

export type RiskLevel = 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik'
export type RecommendationCategory = 'Diyet' | 'Egzersiz' | 'İlaç' | 'Kontrol' | 'Uzman Sevk' | 'Acil Müdahale'
export type RecommendationPriority = 'Yüksek' | 'Orta' | 'Düşük'
export type DataSource = 'e-Nabız Geçmiş' | 'Giyilebilir Cihaz' | 'Laboratuvar Sonucu' | 'Reçete Geçmişi' | 'Görüntüleme'

export interface HealthRiskScores {
  diyabet: number // 0-100
  hipertansiyon: number
  kardiyovaskuler: number
  obezite: number
  kronikBobrekHastaligi: number
  kanser: number
  solunum: number
  mentalSaglik: number
}

export interface HealthRecommendation {
  id: string
  kategori: RecommendationCategory
  oncelik: RecommendationPriority
  baslik: string
  aciklama: string
  detay?: string
  hedefTarih: Date
  tamamlandi: boolean
  tamamlanmaTarihi?: Date
  doktorOnayiGerekli: boolean
  doktorOnayDurumu?: 'Bekliyor' | 'Onaylandı' | 'Reddedildi'
  onaylayan?: string
  onayTarihi?: Date
}

export interface SmartAssistantAnalysis {
  id: string
  hastaId: string
  tcKimlik: string
  hastaAdi: string
  hastaSoyadi: string

  // Analysis Details
  analizTarihi: Date
  analizSuresi: string // e.g., "2.3 saniye"

  // Risk Scores
  riskSkorlari: HealthRiskScores
  genelRiskDurumu: RiskLevel

  // Recommendations
  oneriler: HealthRecommendation[]
  acilOneri: boolean
  acilOneriMesaji?: string

  // Data Sources
  veriKaynaklari: DataSource[]
  kullanilianAIModel: string
  modelGuvenilirlik: number // 0-100

  // Trends
  riskTrendi: 'Artıyor' | 'Azalıyor' | 'Stabil'
  oncekiAnalizTarihi?: Date
  oncekiGenelRisk?: RiskLevel

  // System
  kaydeden: string
  guncellemeTarihi: Date
}

// Sample Smart Assistant Data
export const sampleSmartAssistantAnalyses: SmartAssistantAnalysis[] = [
  {
    id: 'sa-001',
    hastaId: 'p-001',
    tcKimlik: '12345678901',
    hastaAdi: 'Mehmet',
    hastaSoyadi: 'Yılmaz',
    analizTarihi: new Date('2024-12-25T09:30:00'),
    analizSuresi: '1.8 saniye',
    riskSkorlari: {
      diyabet: 72,
      hipertansiyon: 65,
      kardiyovaskuler: 58,
      obezite: 45,
      kronikBobrekHastaligi: 28,
      kanser: 15,
      solunum: 22,
      mentalSaglik: 35,
    },
    genelRiskDurumu: 'Yüksek',
    oneriler: [
      {
        id: 'rec-001',
        kategori: 'Kontrol',
        oncelik: 'Yüksek',
        baslik: 'Açlık Kan Şekeri Kontrolü',
        aciklama: '3 ay içinde HbA1c testi önerilir',
        detay: 'Son 6 aydır kan şekeri değerleriniz yüksek seyretmekte. Diyabet riski yüksek.',
        hedefTarih: new Date('2025-03-25'),
        tamamlandi: false,
        doktorOnayiGerekli: true,
        doktorOnayDurumu: 'Bekliyor',
      },
      {
        id: 'rec-002',
        kategori: 'Diyet',
        oncelik: 'Yüksek',
        baslik: 'Karbonhidrat Kısıtlaması',
        aciklama: 'Günlük karbonhidrat alımını azaltın',
        detay: 'Beyaz ekmek, şeker, patates gibi yüksek glisemik indeksli gıdalardan kaçının.',
        hedefTarih: new Date('2025-01-25'),
        tamamlandi: false,
        doktorOnayiGerekli: false,
      },
      {
        id: 'rec-003',
        kategori: 'Egzersiz',
        oncelik: 'Orta',
        baslik: 'Günlük 30 Dakika Yürüyüş',
        aciklama: 'Haftada 5 gün 30 dakika tempolu yürüyüş',
        detay: 'Kardiyovasküler sağlık için düzenli egzersiz önemlidir.',
        hedefTarih: new Date('2025-01-10'),
        tamamlandi: false,
        doktorOnayiGerekli: false,
      },
    ],
    acilOneri: false,
    veriKaynaklari: ['e-Nabız Geçmiş', 'Laboratuvar Sonucu', 'Giyilebilir Cihaz'],
    kullanilianAIModel: 'HealthRisk AI v2.3',
    modelGuvenilirlik: 87,
    riskTrendi: 'Artıyor',
    oncekiAnalizTarihi: new Date('2024-11-25'),
    oncekiGenelRisk: 'Orta',
    kaydeden: 'Sistem (Otomatik)',
    guncellemeTarihi: new Date('2024-12-25T09:30:00'),
  },
  {
    id: 'sa-002',
    hastaId: 'p-002',
    tcKimlik: '23456789012',
    hastaAdi: 'Fatma',
    hastaSoyadi: 'Demir',
    analizTarihi: new Date('2024-12-24T15:20:00'),
    analizSuresi: '2.1 saniye',
    riskSkorlari: {
      diyabet: 25,
      hipertansiyon: 88,
      kardiyovaskuler: 75,
      obezite: 65,
      kronikBobrekHastaligi: 42,
      kanser: 18,
      solunum: 15,
      mentalSaglik: 28,
    },
    genelRiskDurumu: 'Yüksek',
    oneriler: [
      {
        id: 'rec-004',
        kategori: 'Uzman Sevk',
        oncelik: 'Yüksek',
        baslik: 'Kardiyoloji Konsültasyonu',
        aciklama: 'Hipertansiyon ve kardiyovasküler risk değerlendirmesi',
        detay: 'Kan basıncınız sürekli yüksek seyretmekte. Kardiyolog görüşü önerilir.',
        hedefTarih: new Date('2025-01-15'),
        tamamlandi: false,
        doktorOnayiGerekli: true,
        doktorOnayDurumu: 'Onaylandı',
        onaylayan: 'Dr. Zeynep Kaya',
        onayTarihi: new Date('2024-12-24'),
      },
      {
        id: 'rec-005',
        kategori: 'Diyet',
        oncelik: 'Yüksek',
        baslik: 'Tuz Kısıtlaması',
        aciklama: 'Günlük tuz alımını 5 gramın altına düşürün',
        detay: 'DASH diyeti önerilir. İşlenmiş gıdalardan kaçının.',
        hedefTarih: new Date('2025-01-01'),
        tamamlandi: false,
        doktorOnayiGerekli: false,
      },
    ],
    acilOneri: true,
    acilOneriMesaji: 'Kan basıncınız kritik seviyede. En kısa sürede doktorunuza başvurun.',
    veriKaynaklari: ['e-Nabız Geçmiş', 'Giyilebilir Cihaz'],
    kullanilianAIModel: 'HealthRisk AI v2.3',
    modelGuvenilirlik: 91,
    riskTrendi: 'Stabil',
    oncekiAnalizTarihi: new Date('2024-11-24'),
    oncekiGenelRisk: 'Yüksek',
    kaydeden: 'Sistem (Otomatik)',
    guncellemeTarihi: new Date('2024-12-24T15:20:00'),
  },
]

// ============================================
// WEARABLE DEVICE MODULE
// ============================================

export type DeviceType =
  | 'Apple Watch'
  | 'Fitbit'
  | 'Samsung Health'
  | 'Google Fit'
  | 'Garmin'
  | 'Mi Band'
  | 'Huawei Watch'
  | 'Amazfit'

export type SyncFrequency = 'Gerçek Zamanlı' | 'Saatlik' | 'Günlük'
export type AnomalyType =
  | 'Yüksek Kalp Atışı'
  | 'Düşük Kalp Atışı'
  | 'Düzensiz Ritim'
  | 'Yüksek Tansiyon'
  | 'Düşük Tansiyon'
  | 'Düşük Oksijen'
  | 'Anormal Uyku'
export type AnomalySeverity = 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik'

export interface WearableDevice {
  id: string
  hastaId: string
  tcKimlik: string
  hastaAdi: string

  // Device Info
  cihazTipi: DeviceType
  cihazModeli: string
  cihazSeriNo?: string

  // Connection
  eslesmeTarihi: Date
  sonSenkronizasyon: Date
  senkronizasyonSikligi: SyncFrequency
  aktif: boolean

  // Battery & Status
  bataryaDurumu?: number // 0-100
  baglantiDurumu: 'Bağlı' | 'Bağlantı Kesildi' | 'Eşleşme Bekleniyor'
}

export interface HeartRateMeasurement {
  zaman: Date
  deger: number // bpm
  aktivite?: 'Dinlenme' | 'Yürüyüş' | 'Koşu' | 'Egzersiz' | 'Uyku'
}

export interface BloodPressureMeasurement {
  zaman: Date
  sistolik: number
  diyastolik: number
  nabiz: number
}

export interface BloodGlucoseMeasurement {
  zaman: Date
  deger: number // mg/dL
  olcumKontext: 'Açlık' | 'Yemek Öncesi' | 'Yemek Sonrası' | 'Gece'
}

export interface OxygenSaturationMeasurement {
  zaman: Date
  deger: number // SpO2 percentage
  yukseklik?: number // metre (altitude can affect SpO2)
}

export interface SleepData {
  toplamUykuSuresi: number // saat
  derinUykuSuresi: number // saat
  hafifUykuSuresi: number // saat
  remUykuSuresi: number // saat
  uyanikSure: number // saat
  uykuKalitesi: number // 0-100
  uyuyaKalmaSuresi?: number // dakika
  uyanmaSayisi?: number
  uykuBaslangic: Date
}

export interface WearableMetrics {
  id: string
  cihazId: string
  hastaId: string
  kayitTarihi: Date

  // Activity Metrics
  adimSayisi: number
  mesafe: number // km
  yakiianKalori: number
  aktifDakika: number
  katiSayisi?: number

  // Heart Rate
  kalpAtisi: {
    min: number
    max: number
    ortalama: number
    dinlenmeNabzi: number
    olcumler: HeartRateMeasurement[]
  }

  // Blood Pressure (if available)
  tansiyon?: {
    olcumler: BloodPressureMeasurement[]
  }

  // Blood Glucose (if available)
  kanSekeri?: {
    olcumler: BloodGlucoseMeasurement[]
  }

  // Oxygen Saturation (if available)
  oksijenSaturasyonu?: {
    olcumler: OxygenSaturationMeasurement[]
  }

  // Sleep Data
  uykuVerisi?: SleepData

  // Weight & Body Metrics
  kilo?: number // kg
  vki?: number // BMI
  vucutYagOrani?: number // percentage
  kasKutlesi?: number // kg

  // e-Nabız Sync
  enabizSenkronizasyonDurumu: ENabizSyncStatus
  enabizSenkronizasyonTarihi?: Date

  // Anomalies
  anomaliTespitEdildi: boolean
  anomaliler: {
    tip: AnomalyType
    siddet: AnomalySeverity
    deger: number
    zaman: Date
    uyariGonderildi: boolean
    doktorBilgilendirildi: boolean
    aciklama?: string
  }[]
}

// Sample Wearable Devices
export const sampleWearableDevices: WearableDevice[] = [
  {
    id: 'wd-001',
    hastaId: 'p-001',
    tcKimlik: '12345678901',
    hastaAdi: 'Mehmet Yılmaz',
    cihazTipi: 'Apple Watch',
    cihazModeli: 'Apple Watch Series 9',
    cihazSeriNo: 'AW9-2024-123456',
    eslesmeTarihi: new Date('2024-11-01'),
    sonSenkronizasyon: new Date('2024-12-25T10:30:00'),
    senkronizasyonSikligi: 'Gerçek Zamanlı',
    aktif: true,
    bataryaDurumu: 78,
    baglantiDurumu: 'Bağlı',
  },
  {
    id: 'wd-002',
    hastaId: 'p-002',
    tcKimlik: '23456789012',
    hastaAdi: 'Fatma Demir',
    cihazTipi: 'Samsung Health',
    cihazModeli: 'Galaxy Watch 6',
    eslesmeTarihi: new Date('2024-12-10'),
    sonSenkronizasyon: new Date('2024-12-25T09:15:00'),
    senkronizasyonSikligi: 'Saatlik',
    aktif: true,
    bataryaDurumu: 92,
    baglantiDurumu: 'Bağlı',
  },
]

// Sample Wearable Metrics
export const sampleWearableMetrics: WearableMetrics[] = [
  {
    id: 'wm-001',
    cihazId: 'wd-001',
    hastaId: 'p-001',
    kayitTarihi: new Date('2024-12-25'),
    adimSayisi: 8547,
    mesafe: 6.2,
    yakiianKalori: 342,
    aktifDakika: 87,
    katiSayisi: 12,
    kalpAtisi: {
      min: 58,
      max: 142,
      ortalama: 74,
      dinlenmeNabzi: 62,
      olcumler: [
        { zaman: new Date('2024-12-25T07:00:00'), deger: 62, aktivite: 'Dinlenme' },
        { zaman: new Date('2024-12-25T09:30:00'), deger: 95, aktivite: 'Yürüyüş' },
        { zaman: new Date('2024-12-25T12:00:00'), deger: 68, aktivite: 'Dinlenme' },
        { zaman: new Date('2024-12-25T15:45:00'), deger: 142, aktivite: 'Egzersiz' },
        { zaman: new Date('2024-12-25T18:00:00'), deger: 71, aktivite: 'Dinlenme' },
      ],
    },
    tansiyon: {
      olcumler: [
        { zaman: new Date('2024-12-25T08:00:00'), sistolik: 125, diyastolik: 82, nabiz: 68 },
        { zaman: new Date('2024-12-25T20:00:00'), sistolik: 132, diyastolik: 85, nabiz: 72 },
      ],
    },
    kanSekeri: {
      olcumler: [
        { zaman: new Date('2024-12-25T07:30:00'), deger: 112, olcumKontext: 'Açlık' },
        { zaman: new Date('2024-12-25T13:30:00'), deger: 156, olcumKontext: 'Yemek Sonrası' },
        { zaman: new Date('2024-12-25T19:00:00'), deger: 98, olcumKontext: 'Yemek Öncesi' },
      ],
    },
    oksijenSaturasyonu: {
      olcumler: [
        { zaman: new Date('2024-12-25T08:00:00'), deger: 98 },
        { zaman: new Date('2024-12-25T14:00:00'), deger: 97 },
        { zaman: new Date('2024-12-25T22:00:00'), deger: 96 },
      ],
    },
    uykuVerisi: {
      toplamUykuSuresi: 6.9,
      derinUykuSuresi: 1.6,
      hafifUykuSuresi: 4.1,
      remUykuSuresi: 1.2,
      uyanikSure: 0.5,
      uykuKalitesi: 82,
      uyuyaKalmaSuresi: 12,
      uyanmaSayisi: 3,
      uykuBaslangic: new Date('2024-12-24T23:00:00'),
    },
    kilo: 82.5,
    vki: 26.8,
    vucutYagOrani: 22.3,
    enabizSenkronizasyonDurumu: 'Synced',
    enabizSenkronizasyonTarihi: new Date('2024-12-25T10:30:00'),
    anomaliTespitEdildi: true,
    anomaliler: [
      {
        tip: 'Yüksek Tansiyon',
        siddet: 'Orta',
        deger: 132,
        zaman: new Date('2024-12-25T20:00:00'),
        uyariGonderildi: true,
        doktorBilgilendirildi: false,
        aciklama: 'Sistolik tansiyon 130 üzerinde tespit edildi',
      },
    ],
  },
  {
    id: 'wm-002',
    cihazId: 'wd-002',
    hastaId: 'p-002',
    kayitTarihi: new Date('2024-12-25'),
    adimSayisi: 5234,
    mesafe: 3.8,
    yakiianKalori: 198,
    aktifDakika: 45,
    kalpAtisi: {
      min: 72,
      max: 165,
      ortalama: 88,
      dinlenmeNabzi: 76,
      olcumler: [
        { zaman: new Date('2024-12-25T07:30:00'), deger: 76, aktivite: 'Dinlenme' },
        { zaman: new Date('2024-12-25T10:00:00'), deger: 102, aktivite: 'Yürüyüş' },
        { zaman: new Date('2024-12-25T14:30:00'), deger: 165, aktivite: 'Egzersiz' },
        { zaman: new Date('2024-12-25T19:00:00'), deger: 82, aktivite: 'Dinlenme' },
      ],
    },
    tansiyon: {
      olcumler: [
        { zaman: new Date('2024-12-25T08:30:00'), sistolik: 148, diyastolik: 92, nabiz: 78 },
        { zaman: new Date('2024-12-25T21:00:00'), sistolik: 152, diyastolik: 95, nabiz: 81 },
      ],
    },
    uykuVerisi: {
      toplamUykuSuresi: 6.1,
      derinUykuSuresi: 1.2,
      hafifUykuSuresi: 3.9,
      remUykuSuresi: 1.0,
      uyanikSure: 0.8,
      uykuKalitesi: 68,
      uyuyaKalmaSuresi: 28,
      uyanmaSayisi: 5,
      uykuBaslangic: new Date('2024-12-24T23:30:00'),
    },
    kilo: 78.2,
    vki: 29.4,
    vucutYagOrani: 32.1,
    enabizSenkronizasyonDurumu: 'Synced',
    enabizSenkronizasyonTarihi: new Date('2024-12-25T09:15:00'),
    anomaliTespitEdildi: true,
    anomaliler: [
      {
        tip: 'Yüksek Tansiyon',
        siddet: 'Yüksek',
        deger: 152,
        zaman: new Date('2024-12-25T21:00:00'),
        uyariGonderildi: true,
        doktorBilgilendirildi: true,
        aciklama: 'Sistolik tansiyon 150 üzerinde - Kardiyoloji konsültasyonu önerilir',
      },
      {
        tip: 'Yüksek Kalp Atışı',
        siddet: 'Orta',
        deger: 165,
        zaman: new Date('2024-12-25T14:30:00'),
        uyariGonderildi: true,
        doktorBilgilendirildi: false,
        aciklama: 'Egzersiz sırasında maksimum kalp atışı hedefin üzerinde',
      },
    ],
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Organ Donation Functions
export function getOrganDonationByTC(tcKimlik: string): OrganDonation | undefined {
  return sampleOrganDonations.find(d => d.tcKimlik === tcKimlik)
}

export function getOrganDonationsByStatus(status: DonationStatus): OrganDonation[] {
  return sampleOrganDonations.filter(d => d.bagisciDurumu === status)
}

export function getPendingENabizSync(): OrganDonation[] {
  return sampleOrganDonations.filter(d => d.enabizSenkronizasyonDurumu === 'Pending')
}

// Smart Assistant Functions
export function getSmartAssistantByTC(tcKimlik: string): SmartAssistantAnalysis | undefined {
  return sampleSmartAssistantAnalyses.find(a => a.tcKimlik === tcKimlik)
}

export function getHighRiskPatients(): SmartAssistantAnalysis[] {
  return sampleSmartAssistantAnalyses.filter(a =>
    a.genelRiskDurumu === 'Yüksek' || a.genelRiskDurumu === 'Kritik'
  )
}

export function getPendingRecommendations(): HealthRecommendation[] {
  return sampleSmartAssistantAnalyses.flatMap(a =>
    a.oneriler.filter(r => !r.tamamlandi)
  )
}

export function getUrgentRecommendations(): HealthRecommendation[] {
  return sampleSmartAssistantAnalyses.flatMap(a =>
    a.oneriler.filter(r => !r.tamamlandi && r.oncelik === 'Yüksek')
  )
}

// Wearable Device Functions
export function getWearableDeviceByTC(tcKimlik: string): WearableDevice | undefined {
  return sampleWearableDevices.find(d => d.tcKimlik === tcKimlik)
}

export function getActiveWearableDevices(): WearableDevice[] {
  return sampleWearableDevices.filter(d => d.aktif)
}

export function getLatestMetrics(hastaId: string): WearableMetrics | undefined {
  return sampleWearableMetrics
    .filter(m => m.hastaId === hastaId)
    .sort((a, b) => b.kayitTarihi.getTime() - a.kayitTarihi.getTime())[0]
}

export function getAnomalies(): WearableMetrics[] {
  return sampleWearableMetrics.filter(m => m.anomaliTespitEdildi)
}

export function getCriticalAnomalies(): WearableMetrics[] {
  return sampleWearableMetrics.filter(m =>
    m.anomaliler.some(a => a.siddet === 'Kritik' || a.siddet === 'Yüksek')
  )
}

// Statistics
export function getOrganDonationStats() {
  return {
    toplam: sampleOrganDonations.length,
    bagisci: getOrganDonationsByStatus('Bağışçı').length,
    bekleyen: getOrganDonationsByStatus('Karar Bekliyor').length,
    senkronizeEdilmis: sampleOrganDonations.filter(d => d.enabizSenkronizasyonDurumu === 'Synced').length,
  }
}

export function getSmartAssistantStats() {
  return {
    toplamAnaliz: sampleSmartAssistantAnalyses.length,
    yuksekRisk: getHighRiskPatients().length,
    acilOneri: sampleSmartAssistantAnalyses.filter(a => a.acilOneri).length,
    bekleyenOneri: getPendingRecommendations().length,
  }
}

export function getWearableDeviceStats() {
  return {
    toplamCihaz: sampleWearableDevices.length,
    aktifCihaz: getActiveWearableDevices().length,
    anomaliTespiti: getAnomalies().length,
    kritikAnomali: getCriticalAnomalies().length,
    bugunSenkronize: sampleWearableDevices.filter(d => {
      const today = new Date().toDateString()
      return d.sonSenkronizasyon.toDateString() === today
    }).length,
  }
}

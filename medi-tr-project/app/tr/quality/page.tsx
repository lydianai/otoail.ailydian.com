'use client'

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
  FileCheck,
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
type DocumentType = 'Politika' | 'Prosedür' | 'Protokol' | 'Form' | 'Kılavuz' | 'Talimat' | 'Liste'
type DocumentCategory = 'Klinik' | 'İdari' | 'Kalite' | 'Güvenlik' | 'Enfeksiyon Kontrolü' | 'İlaç Yönetimi' | 'Acil Durum'
type DocumentStatus = 'Taslak' | 'Onay Bekliyor' | 'Onaylandı' | 'Yürürlükte' | 'Arşivlendi'

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

// Incident Types
type IncidentSeverity = 'Minor' | 'Moderate' | 'Major' | 'Catastrophic'
type IncidentType = 'Hasta Düşmesi' | 'İlaç Hatası' | 'Cerrahi Komplikasyon' | 'Enfeksiyon' | 'Tanı Gecikmesi' | 'Ekipman Arızası' | 'Diğer'

interface Incident {
  id: string
  date: string
  time: string
  location: string
  type: IncidentType
  description: string
  severity: IncidentSeverity
  reportedBy: string
  status: 'Açık' | 'İnceleniyor' | 'CAPA Açıldı' | 'Kapatıldı'
  rootCauseAnalysis?: string
}

// KBYS Compliance
interface KBYSStandard {
  id: string
  code: string
  title: string
  chapter: string
  compliant: boolean
  evidence: string
  lastAuditDate: string
}

// JCI Standards
interface JCIStandard {
  id: string
  code: string
  title: string
  chapter: 'Patient-Centered' | 'Healthcare Organization' | 'Academic Medical Center'
  compliance: number
  gaps: number
  evidence: string[]
}

// Audit
type AuditStatus = 'Planlandı' | 'Tamamlandı' | 'Rapor Hazırlanıyor' | 'Kapatıldı'

interface Audit {
  id: string
  type: string
  auditor: string
  department: string
  date: string
  status: AuditStatus
  findings: number
  score: number
}

// CAPA
type CAPAStatus = 'Açık' | 'Devam Ediyor' | 'Beklemede' | 'Kapatıldı'

interface CAPA {
  id: string
  issue: string
  source: string
  actionPlan: string
  responsiblePerson: string
  dueDate: string
  status: CAPAStatus
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik'
}

// Generate sample documents
function generateDocuments(): Document[] {
  const titles = [
    'Hasta Kabul ve Kayıt Prosedürü',
    'Enfeksiyon Kontrol Politikası',
    'Acil Müdahale Protokolü',
    'İlaç Hazırlama ve Uygulama Kılavuzu',
    'Hasta Hakları Talimatı',
    'Ventilatör İlişkili Pnömoni Önleme',
    'Kateter İlişkili Enfeksiyon Kontrolü',
    'Cerrahi Alan Enfeksiyonu Önleme',
    'Kan Ürünleri Transfüzyon Protokolü',
    'Kardiyopulmoner Resüsitasyon Talimatı',
    'Ağrı Yönetimi Kılavuzu',
    'Düşme Önleme Programı',
    'Hasta Güvenlik Hedefleri',
    'Tıbbi Cihaz Bakım ve Kalibrasyon',
    'Sterilizasyon ve Dezenfeksiyon',
    'Biyolojik Atık Yönetimi',
    'Radyasyon Güvenliği Protokolü',
    'Kimyasal Madde Güvenliği',
    'Yangın ve Afet Planı',
    'Hasta Kimlik Doğrulama',
    'Ameliyathane Güvenlik Kontrol Listesi',
    'Yoğun Bakım Hasta Takip Formu',
    'Hemşirelik Bakım Planı',
    'Hasta Değerlendirme Formu',
    'Beslenme Destek Protokolü',
    'Basınç Yarası Önleme ve Tedavi',
    'Santral Venöz Kateter Bakımı',
    'Trakeostomi Bakım Protokolü',
    'İzolasyon Önlemleri Kılavuzu',
    'El Hijyeni Politikası',
    'Personel Sağlığı ve Aşılama',
    'İş Sağlığı ve Güvenliği',
    'Tıbbi Kayıt Yönetimi',
    'Hasta Bilgilendirme ve Onam',
    'Veri Güvenliği ve KVKK',
    'Kalite Göstergeleri İzleme',
    'Performans Değerlendirme Sistemi',
    'Eğitim ve Yeterlilik Değerlendirme',
    'Tedarikçi Değerlendirme ve Seçim',
    'Satın Alma ve Stok Yönetimi',
    'Bakım Sürekliliği Protokolü',
    'Yatan Hasta Değerlendirme',
    'Ayaktan Hasta Hizmetleri',
    'Laboratuvar Güvenlik Kılavuzu',
    'Kan Bankası İşletme Prosedürü',
    'Radyoloji Hizmetleri Protokolü',
    'Ameliyathane İşletme Prosedürü',
    'Anestezi ve Sedasyon Protokolü',
    'Postoperatif Bakım Kılavuzu',
    'Organ ve Doku Bağışı Protokolü',
    'Palyatif Bakım Hizmetleri',
    'Psikiyatri Hasta Güvenliği',
    'Pediatrik Hasta Bakımı',
    'Geriatrik Hasta Yönetimi',
    'Diyabet Hasta Eğitimi',
    'Astım ve KOAH Yönetimi',
    'Hipertansiyon Tedavi Protokolü',
    'Kalp Yetmezliği Takip Programı',
    'İnme Protokolü ve Rehabilitasyon',
    'Sepsis Tanı ve Tedavi Algoritması',
    'Akut Koroner Sendrom Yönetimi',
    'Travma Hastaları Yaklaşımı',
    'Zehirlenme Vakaları Protokolü',
    'Yanık Hastaları Tedavi Kılavuzu',
    'Diyaliz Hasta Yönetimi',
    'Kemik İliği Nakli Protokolü',
    'Kemoterapi Uygulama Kılavuzu',
    'Radyoterapi Güvenlik Prosedürü',
    'Klinik Araştırmalar Etik Kurul',
    'İlaç Araştırmaları Protokolü',
    'Tıbbi Cihaz Vigilans',
    'Farmakovijilans Sistemi',
    'Antimikrobiyal Yönetim Programı',
    'Narkotik İlaç Yönetimi',
    'Soğuk Zincir Yönetimi',
    'İlaç Geri Çağırma Prosedürü',
    'Hasta ve Çalışan Şikayetleri',
    'Olay Raporlama Sistemi',
    'Sentinel Olay Yönetimi',
    'Risk Değerlendirme ve Yönetim',
    'İç Denetim Programı',
    'Dış Denetim Hazırlık',
    'Doküman Kontrol Prosedürü',
    'Kayıt Saklama ve İmha',
    'Acil Durum ve Kriz Yönetimi',
    'İletişim ve Bilgilendirme',
    'Medya İlişkileri Yönetimi',
    'Hasta Memnuniyeti Ölçümü',
    'Çalışan Memnuniyeti Anket',
    'Süreç İyileştirme Projeleri',
    'Kaizen ve Lean Uygulamaları',
    '5S Uygulama Kılavuzu',
    'Hata Modu Etki Analizi (FMEA)',
    'Kök Neden Analizi Metodolojisi',
    'PDCA Döngüsü Uygulaması',
    'Hasta Güvenlik Kültürü Anket',
    'Kalite İyileştirme Takımları',
    'Klinik Yollar Geliştirme',
    'Kanıta Dayalı Tıp Uygulamaları',
    'Klinik Karar Destek Sistemleri',
    'Bilgi Güvenliği Yönetimi',
    'Siber Güvenlik Protokolü',
  ]

  const types: DocumentType[] = ['Politika', 'Prosedür', 'Protokol', 'Form', 'Kılavuz', 'Talimat', 'Liste']
  const categories: DocumentCategory[] = ['Klinik', 'İdari', 'Kalite', 'Güvenlik', 'Enfeksiyon Kontrolü', 'İlaç Yönetimi', 'Acil Durum']
  const statuses: DocumentStatus[] = ['Taslak', 'Onay Bekliyor', 'Onaylandı', 'Yürürlükte', 'Arşivlendi']
  const departments = ['Kalite Yönetimi', 'Enfeksiyon Kontrol', 'Hasta Güvenliği', 'Tıbbi Hizmetler', 'Hemşirelik', 'İlaç Komisyonu', 'Acil Servis']
  const responsibles = ['Dr. Ayşe Yılmaz', 'Dr. Mehmet Demir', 'Hem. Fatma Kaya', 'Eczacı Ali Şahin', 'Dr. Zeynep Arslan', 'Hem. Ahmet Öztürk']

  return titles.map((title, i) => {
    const type = types[i % types.length]
    const category = categories[i % categories.length]
    const status = i < 10 ? statuses[Math.floor(Math.random() * 2)] : 'Yürürlükte'

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

// Generate incidents
function generateIncidents(): Incident[] {
  const types: IncidentType[] = ['Hasta Düşmesi', 'İlaç Hatası', 'Cerrahi Komplikasyon', 'Enfeksiyon', 'Tanı Gecikmesi', 'Ekipman Arızası', 'Diğer']
  const severities: IncidentSeverity[] = ['Minor', 'Moderate', 'Major', 'Catastrophic']
  const locations = ['3A Servisi', 'Yoğun Bakım', 'Ameliyathane 2', 'Acil Servis', '5B Servisi', 'Radyoloji', 'Laboratuvar']
  const reporters = ['Dr. Ayşe Yılmaz', 'Hem. Mehmet Demir', 'Dr. Fatma Kaya', 'Hem. Ali Şahin', 'Dr. Zeynep Arslan']

  return Array.from({ length: 28 }, (_, i) => ({
    id: `INC-2024-${String(i + 1).padStart(4, '0')}`,
    date: new Date(2024, 11, Math.max(1, 23 - i)).toISOString().split('T')[0],
    time: `${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}`,
    location: locations[i % locations.length],
    type: types[i % types.length],
    description: `${types[i % types.length]} olayı meydana geldi. Detaylı inceleme başlatıldı.`,
    severity: severities[Math.min(i % 5, 3)],
    reportedBy: reporters[i % reporters.length],
    status: i < 5 ? 'İnceleniyor' : i < 10 ? 'CAPA Açıldı' : 'Kapatıldı',
    rootCauseAnalysis: i >= 10 ? '5 Whys analizi tamamlandı. Prosedür güncellemesi yapıldı.' : undefined,
  }))
}

// Generate KBYS standards
function generateKBYSStandards(): KBYSStandard[] {
  const chapters = ['Hasta ve Hasta Hakları', 'Hasta Bakım Hizmetleri', 'Destek Hizmetler', 'Tesis Yönetimi', 'İnsan Kaynakları', 'Enfeksiyon Kontrol']

  return Array.from({ length: 52 }, (_, i) => ({
    id: `KBYS-${String(i + 1).padStart(3, '0')}`,
    code: `KBYS.${Math.floor(i / 10) + 1}.${(i % 10) + 1}`,
    title: `${chapters[i % chapters.length]} Standardı ${i + 1}`,
    chapter: chapters[i % chapters.length],
    compliant: i >= 5 ? Math.random() > 0.15 : Math.random() > 0.3,
    evidence: 'Doküman, gözlem, görüşme',
    lastAuditDate: new Date(2024, 10, 15).toISOString().split('T')[0],
  }))
}

// Generate JCI standards
function generateJCIStandards(): JCIStandard[] {
  const standards = [
    { code: 'ACC', title: 'Hasta Kabul ve Devam Eden Bakım', chapter: 'Patient-Centered' as const },
    { code: 'PFR', title: 'Hasta ve Aile Hakları', chapter: 'Patient-Centered' as const },
    { code: 'AOP', title: 'Hasta Değerlendirmesi', chapter: 'Patient-Centered' as const },
    { code: 'COP', title: 'Hasta Bakımı', chapter: 'Patient-Centered' as const },
    { code: 'MMU', title: 'İlaç Yönetimi ve Kullanımı', chapter: 'Patient-Centered' as const },
    { code: 'ASC', title: 'Anestezi ve Cerrahi Bakım', chapter: 'Patient-Centered' as const },
    { code: 'PCI', title: 'Kalite İyileştirme ve Hasta Güvenliği', chapter: 'Healthcare Organization' as const },
    { code: 'PFE', title: 'Enfeksiyon Önleme ve Kontrol', chapter: 'Healthcare Organization' as const },
    { code: 'GLD', title: 'Yönetim ve Liderlik', chapter: 'Healthcare Organization' as const },
    { code: 'FMS', title: 'Tesis Yönetimi ve Güvenlik', chapter: 'Healthcare Organization' as const },
    { code: 'SQE', title: 'Personel Nitelikleri ve Eğitim', chapter: 'Healthcare Organization' as const },
    { code: 'MOI', title: 'Bilgi Yönetimi', chapter: 'Healthcare Organization' as const },
  ]

  return standards.map((std, i) => ({
    id: `JCI-${i + 1}`,
    code: std.code,
    title: std.title,
    chapter: std.chapter,
    compliance: 75 + Math.floor(Math.random() * 20),
    gaps: Math.floor(Math.random() * 8),
    evidence: ['Politika', 'Prosedür', 'Kayıt', 'Gözlem'],
  }))
}

// Generate audits
function generateAudits(): Audit[] {
  const types = ['İç Denetim', 'Süreç Denetimi', 'Departman Denetimi', 'Belgelendirme Denetimi', 'Satıcı Denetimi']
  const auditors = ['Dr. Mehmet Yılmaz', 'Kalite Ekibi', 'Dış Denetçi', 'Dr. Ayşe Demir', 'İç Denetim Ekibi']
  const departments = ['Acil Servis', 'Ameliyathane', 'Yoğun Bakım', 'Laboratuvar', 'Radyoloji', 'Eczane', 'Sterilizasyon']
  const statuses: AuditStatus[] = ['Planlandı', 'Tamamlandı', 'Rapor Hazırlanıyor', 'Kapatıldı']

  return Array.from({ length: 24 }, (_, i) => ({
    id: `AUD-2024-${String(i + 1).padStart(3, '0')}`,
    type: types[i % types.length],
    auditor: auditors[i % auditors.length],
    department: departments[i % departments.length],
    date: new Date(2024, i % 12, ((i * 7) % 28) + 1).toISOString().split('T')[0],
    status: statuses[Math.min(i % 4, 3)],
    findings: i < 5 ? 0 : Math.floor(Math.random() * 12),
    score: 70 + Math.floor(Math.random() * 25),
  }))
}

// Generate CAPAs
function generateCAPAs(): CAPA[] {
  const issues = [
    'El hijyeni uyum oranı düşük',
    'İlaç saklama koşulları uygunsuz',
    'Hasta kimlik doğrulama eksikliği',
    'Sterilizasyon kayıt tutarsızlığı',
    'Acil araç ekipman eksikliği',
    'Tıbbi atık ayrıştırma hatası',
    'Ameliyathane güvenlik kontrol eksikliği',
    'Hasta düşme risk değerlendirmesi yapılmamış',
    'Solunum cihazı bakım gecikmesi',
    'Radyasyon dozimetri kayıt hatası',
    'Kan ürünü etiketleme hatası',
    'Hasta bilgilendirme formu eksik',
    'Personel eğitim kaydı güncel değil',
    'Kalibrasyon süresi geçmiş cihaz',
    'Enfeksiyon sürveyans verisi eksik',
  ]

  const sources = ['İç Denetim', 'Olay Raporu', 'Hasta Şikayeti', 'Dış Denetim', 'Süreç Analizi', 'Performans İncelemesi']
  const priorities: ('Düşük' | 'Orta' | 'Yüksek' | 'Kritik')[] = ['Düşük', 'Orta', 'Yüksek', 'Kritik']
  const responsibles = ['Hemşirelik Hizmetleri', 'Eczane', 'Kalite Yönetimi', 'Enfeksiyon Kontrol', 'Tıbbi Hizmetler', 'Teknik Hizmetler']
  const statuses: CAPAStatus[] = ['Açık', 'Devam Ediyor', 'Beklemede', 'Kapatıldı']

  return Array.from({ length: 18 }, (_, i) => ({
    id: `CAPA-2024-${String(i + 1).padStart(4, '0')}`,
    issue: issues[i % issues.length],
    source: sources[i % sources.length],
    actionPlan: `${issues[i % issues.length]} için düzeltici faaliyet planı oluşturuldu. Eğitim ve prosedür güncellemesi yapılacak.`,
    responsiblePerson: responsibles[i % responsibles.length],
    dueDate: new Date(2025, 0, ((i * 5) % 28) + 1).toISOString().split('T')[0],
    status: statuses[Math.min(i % 5, 3)],
    priority: priorities[Math.min(i % 5, 3)],
  }))
}

export default function QualityPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [kbysStandards, setKbysStandards] = useState<KBYSStandard[]>([])
  const [jciStandards, setJciStandards] = useState<JCIStandard[]>([])
  const [audits, setAudits] = useState<Audit[]>([])
  const [capas, setCapas] = useState<CAPA[]>([])
  const [activeTab, setActiveTab] = useState<'documents' | 'incidents' | 'compliance' | 'audits' | 'capa'>('documents')
  const [documentFilter, setDocumentFilter] = useState<DocumentType | 'Tümü'>('Tümü')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('ghp_token_tr')
    if (!token) {
      router.push('/tr/login')
      return
    }

    setDocuments(generateDocuments())
    setIncidents(generateIncidents())
    setKbysStandards(generateKBYSStandards())
    setJciStandards(generateJCIStandards())
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

  const kbysCompliance = kbysStandards.length > 0
    ? (kbysStandards.filter(s => s.compliant).length / kbysStandards.length) * 100
    : 0

  const jciCompliance = jciStandards.length > 0
    ? jciStandards.reduce((sum, s) => sum + s.compliance, 0) / jciStandards.length
    : 0

  const openCAPAs = capas.filter(c => c.status === 'Açık' || c.status === 'Devam Ediyor').length

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesType = documentFilter === 'Tümü' || doc.type === documentFilter
    const matchesSearch = searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'Yürürlükte': return 'bg-green-100 text-green-700 border-green-200'
      case 'Onaylandı': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Onay Bekliyor': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Taslak': return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'Arşivlendi': return 'bg-purple-100 text-purple-700 border-purple-200'
    }
  }

  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'Minor': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Major': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Catastrophic': return 'bg-red-100 text-red-700 border-red-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Düşük': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Orta': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Yüksek': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Kritik': return 'bg-red-100 text-red-700 border-red-200'
    }
  }

  return (
    
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
                    Kalite ve Hasta Güvenliği
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">KBYS ve JCI Akreditasyon Yönetim Sistemi</p>
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
            <p className="text-sm font-medium text-blue-100 mb-1">Toplam Doküman</p>
            <p className="text-4xl font-bold tracking-tight">{totalDocuments}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-orange-100 mb-1">Olaylar (Bu Ay)</p>
            <p className="text-4xl font-bold tracking-tight">{incidentsThisMonth}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl shadow-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-green-100 mb-1">KBYS Uyum</p>
            <p className="text-4xl font-bold tracking-tight">{kbysCompliance.toFixed(1)}%</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Award className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-purple-100 mb-1">JCI Uyum</p>
            <p className="text-4xl font-bold tracking-tight">{jciCompliance.toFixed(1)}%</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl shadow-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Target className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-red-100 mb-1">Açık CAPA</p>
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
                <span>Doküman Deposu</span>
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
                <span>Olay Raporlama</span>
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
                <span>KBYS & JCI</span>
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
                <span>Denetim Takvimi</span>
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
                <span>CAPA Yönetimi</span>
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
                      placeholder="Doküman ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <select
                    value={documentFilter}
                    onChange={(e) => setDocumentFilter(e.target.value as DocumentType | 'Tümü')}
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-semibold"
                  >
                    <option value="Tümü">Tüm Tipler</option>
                    <option value="Politika">Politika</option>
                    <option value="Prosedür">Prosedür</option>
                    <option value="Protokol">Protokol</option>
                    <option value="Form">Form</option>
                    <option value="Kılavuz">Kılavuz</option>
                    <option value="Talimat">Talimat</option>
                    <option value="Liste">Liste</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Doküman
                  </Button>
                  <Button variant="outline" className="border-2">
                    <Upload className="h-4 w-4 mr-2" />
                    İçe Aktar
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Kod</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Başlık</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Tip</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Kategori</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Versiyon</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Onay Tarihi</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Gözden Geçirme</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Sorumlu</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Durum</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">İşlem</th>
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
                Gösterilen: {Math.min(20, filteredDocuments.length)} / {filteredDocuments.length} doküman
              </div>
            </div>
          )}

          {/* Incidents Tab */}
          {activeTab === 'incidents' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Hasta Güvenliği Olayları</h3>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Olay Raporu
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {incidents.slice(0, 10).map((incident) => (
                  <div key={incident.id} className="border-2 border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">{incident.id}</div>
                        <div className="text-sm text-gray-600">{incident.date} - {incident.time}</div>
                      </div>
                      <Badge className={cn('font-semibold border', getSeverityColor(incident.severity))}>
                        {incident.severity}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Lokasyon</div>
                        <div className="font-semibold text-gray-900">{incident.location}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Olay Tipi</div>
                        <Badge variant="outline" className="font-semibold">{incident.type}</Badge>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Açıklama</div>
                        <div className="text-sm text-gray-700">{incident.description}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Raporlayan</div>
                        <div className="text-sm font-semibold text-gray-900">{incident.reportedBy}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Durum</div>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-semibold border">
                          {incident.status}
                        </Badge>
                      </div>
                      {incident.rootCauseAnalysis && (
                        <div className="mt-4 p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                          <div className="text-xs font-semibold text-green-700 uppercase mb-1">Kök Neden Analizi</div>
                          <div className="text-sm text-green-900">{incident.rootCauseAnalysis}</div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Detay
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Düzenle
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* KBYS Compliance */}
                <div className="border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="h-6 w-6 text-green-600" />
                        KBYS Uyumluluk
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Sağlıkta Kalite Standartları</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{kbysCompliance.toFixed(1)}%</div>
                      <div className="text-xs text-gray-500 font-semibold">Uyum Oranı</div>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {kbysStandards.slice(0, 20).map((standard) => (
                      <div key={standard.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-green-300 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-mono text-xs font-bold text-gray-500 mb-1">{standard.code}</div>
                            <div className="font-semibold text-gray-900 mb-2">{standard.title}</div>
                            <div className="text-xs text-gray-600">
                              <span className="font-semibold">Kanıt:</span> {standard.evidence}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Son denetim: {standard.lastAuditDate}
                            </div>
                          </div>
                          <div className="ml-4">
                            {standard.compliant ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* JCI Accreditation */}
                <div className="border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Award className="h-6 w-6 text-purple-600" />
                        JCI Akreditasyon
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Joint Commission International</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{jciCompliance.toFixed(1)}%</div>
                      <div className="text-xs text-gray-500 font-semibold">Uyum Oranı</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {jciStandards.map((standard) => (
                      <div key={standard.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-purple-300 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-mono text-xs font-bold text-purple-600 mb-1">{standard.code}</div>
                            <div className="font-semibold text-gray-900">{standard.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{standard.chapter}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">{standard.compliance}%</div>
                            {standard.gaps > 0 && (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-semibold border mt-1">
                                {standard.gaps} Gap
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-600 rounded-full transition-all"
                            style={{ width: `${standard.compliance}%` }}
                          />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {standard.evidence.map((ev, i) => (
                            <Badge key={i} variant="outline" className="text-xs font-semibold">
                              {ev}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audits Tab */}
          {activeTab === 'audits' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">İç Denetim Takvimi</h3>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Denetim Planla
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-700">ID</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Denetim Tipi</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Denetçi</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Departman</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Tarih</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Durum</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Bulgular</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Skor</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audits.map((audit) => (
                      <tr key={audit.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm font-semibold">{audit.id}</td>
                        <td className="py-3 px-4 font-semibold">{audit.type}</td>
                        <td className="py-3 px-4 text-sm">{audit.auditor}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="font-semibold">{audit.department}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{audit.date}</td>
                        <td className="py-3 px-4">
                          <Badge className={cn(
                            'font-semibold border',
                            audit.status === 'Kapatıldı' ? 'bg-green-100 text-green-700 border-green-200' :
                            audit.status === 'Tamamlandı' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            audit.status === 'Rapor Hazırlanıyor' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                            'bg-gray-100 text-gray-700 border-gray-200'
                          )}>
                            {audit.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {audit.findings > 0 ? (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-semibold border">
                              {audit.findings} bulgu
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold border">
                              Temiz
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            'font-bold',
                            audit.score >= 90 ? 'text-green-600' :
                            audit.score >= 75 ? 'text-blue-600' :
                            audit.score >= 60 ? 'text-yellow-600' :
                            'text-red-600'
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
                <h3 className="text-xl font-bold text-gray-900">Düzeltici ve Önleyici Faaliyetler</h3>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni CAPA
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {capas.map((capa) => (
                  <div key={capa.id} className="border-2 border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">{capa.id}</div>
                        <Badge className={cn('font-semibold border', getPriorityColor(capa.priority))}>
                          {capa.priority}
                        </Badge>
                      </div>
                      <Badge className={cn(
                        'font-semibold border',
                        capa.status === 'Kapatıldı' ? 'bg-green-100 text-green-700 border-green-200' :
                        capa.status === 'Devam Ediyor' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        capa.status === 'Beklemede' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-red-100 text-red-700 border-red-200'
                      )}>
                        {capa.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Sorun</div>
                        <div className="font-semibold text-gray-900">{capa.issue}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Kaynak</div>
                        <Badge variant="outline" className="font-semibold">{capa.source}</Badge>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Aksiyon Planı</div>
                        <div className="text-sm text-gray-700">{capa.actionPlan}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Sorumlu</div>
                          <div className="text-sm font-semibold text-gray-900">{capa.responsiblePerson}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Termin</div>
                          <div className="text-sm font-semibold text-gray-900">{capa.dueDate}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Detay
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Güncelle
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
    
  )
}

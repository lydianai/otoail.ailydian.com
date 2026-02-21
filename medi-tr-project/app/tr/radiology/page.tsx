'use client'

import { useState } from 'react'
import {
  Scan, Search, Plus, User, Calendar, FileText, Shield, Image,
  Clock, Activity, CheckCircle2, AlertCircle, Eye, Download,
  Send, Filter, ChevronDown, PlayCircle, X, Zap, TrendingUp,
  Printer, Copy, CheckSquare, Square, ZoomIn, ZoomOut,
  RotateCw, Maximize2, Move, Contrast
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 60+ Turkish imaging study types
const IMAGING_STUDIES = {
  'X-RAY': [
    'Akciğer Grafisi (PA)',
    'Akciğer Grafisi (Lateral)',
    'Akciğer Grafisi (Dekübitus)',
    'Omurga Grafisi (Servikal)',
    'Omurga Grafisi (Torakal)',
    'Omurga Grafisi (Lomber)',
    'El Grafisi',
    'Ayak Grafisi',
    'Diz Grafisi',
    'Kalça Grafisi',
    'Omuz Grafisi',
    'Dirsek Grafisi',
    'Bilek Grafisi',
    'Karın Grafisi (Ayakta)',
    'Karın Grafisi (Supin)',
    'Pelvis Grafisi',
    'Kafatası Grafisi',
    'Sinüs Grafisi',
    'Boyun Yumuşak Doku',
    'Göğüs Kafesi Grafisi',
  ],
  'BT': [
    'BT Beyin',
    'BT Beyin + Kontrast',
    'BT Anjiyo Beyin',
    'BT Sinüs',
    'BT Boyun',
    'BT Toraks',
    'BT Toraks + Kontrast',
    'BT Abdomen',
    'BT Abdomen + Kontrast',
    'BT Pelvis',
    'BT Tüm Batın',
    'BT Anjiyo Koroner',
    'BT Anjiyo Pulmoner',
    'BT Kolonografi',
    'BT Lomber Omurga',
  ],
  'MRI': [
    'MR Beyin',
    'MR Beyin + Kontrast',
    'MR Anjiyo Beyin',
    'MR Hipofiz',
    'MR Servikal Omurga',
    'MR Torakal Omurga',
    'MR Lomber Omurga',
    'MR Omuz',
    'MR Diz',
    'MR Kalça',
    'MR Ayak Bileği',
    'MR Karın (Abdomen)',
    'MR Pelvis',
    'MR Prostat (Multiparametrik)',
    'MR Kardiyak',
  ],
  'ULTRASON': [
    'USG Üst Batın',
    'USG Alt Batın',
    'USG Tüm Batın',
    'USG Tiroid',
    'USG Boyun Yumuşak Doku',
    'USG Meme',
    'USG Testis',
    'USG Transvajinal',
    'Obstetrik USG',
    'Doppler USG',
  ],
  'DİĞER': [
    'Mamografi',
    'DEXA (Kemik Dansitometrisi)',
    'Floroskopi',
    'Anjiyografi',
    'İntravenöz Pyelografi (IVP)',
  ]
}

// Template reports for quick reporting
const REPORT_TEMPLATES = [
  {
    id: 'normal-chest',
    name: 'Normal Akciğer Grafisi',
    findings: 'Her iki akciğer alanları doğal havalanmaktadır. Kalp gölgesi kardiyotorasik indeks normal sınırlardadır. Hiler vasküler yapılar normal görünümdedir. Plevral efüzyon izlenmemiştir. Hemidiyafragmalar düzgün konturludur.',
    impression: 'PA akciğer grafisi normal sınırlardadır.',
    recommendations: 'Klinik takip önerilir.'
  },
  {
    id: 'normal-brain-ct',
    name: 'Normal BT Beyin',
    findings: 'Supratentoryal ve infratentoryal beyin parankiminde akut iskemik/hemorajik lezyon saptanmamıştır. Gri-beyaz cevher ayrımı doğaldır. Ventrikül ve subaraknoid mesafeler yaşla uyumlu genişliktedir. Orta hat yapıları santraldir.',
    impression: 'BT beyin tetkiki normal sınırlardadır.',
    recommendations: 'Klinik korelasyon önerilir.'
  },
  {
    id: 'normal-brain-mri',
    name: 'Normal MR Beyin',
    findings: 'Beyin parankiminde akut/kronik iskemik odak izlenmemiştir. Diffüzyon kısıtlaması göstermeyen alan saptanmamıştır. Ventriküler sistem yaşla uyumlu genişliktedir. Sinyal değişikliği izlenmemiştir.',
    impression: 'MR beyin tetkiki normal sınırlardadır.',
    recommendations: 'Klinik takip önerilir.'
  },
  {
    id: 'pneumonia',
    name: 'Pnömoni',
    findings: 'Sağ akciğer alt lobta konsolidasyon alanı izlenmektedir. İlgili alanda hava bronkogramı mevcuttur. Sol akciğer doğal havalanmaktadır. Plevral efüzyon saptanmamıştır.',
    impression: 'Sağ akciğer alt lob pnömonisi ile uyumlu radyolojik bulgular.',
    recommendations: 'Antibiyoterapi ve kontrol grafisi önerilir.'
  },
  {
    id: 'pleural-effusion',
    name: 'Plevral Efüzyon',
    findings: 'Sağ hemitoraksta plevral efüzyon mevcuttur, kostofreniko-diyafragmatik sinüs künt görünümdedir. Sol akciğer doğal havalanmaktadır. Kalp gölgesi normal boyuttadır.',
    impression: 'Sağ plevral efüzyon.',
    recommendations: 'Etyoloji açısından klinik değerlendirme ve gerekirse torasentez önerilir.'
  },
  {
    id: 'subdural-hematoma',
    name: 'Subdural Hematom',
    findings: 'Sol frontopariyetal bölgede subdural mesafede hiperdans koleksiyon izlenmektedir, maksimum kalınlık 8 mm. Orta hat yapılarında 4 mm sağa kayma mevcuttur.',
    impression: 'Sol subdural hematom, kitle etkisi ile orta hat kayması.',
    recommendations: 'Acil nöroşirürji konsültasyonu önerilir.'
  },
  {
    id: 'brain-infarct',
    name: 'Akut İskemik İnme',
    findings: 'Sol MCA sulama alanında diffüzyon kısıtlaması gösteren akut iskemik alan mevcuttur. ADC haritada sinyal azalması izlenmektedir. Hemoraji komponenti saptanmamıştır.',
    impression: 'Sol MCA enfarktı (akut dönem).',
    recommendations: 'Acil nöroloji konsültasyonu ve uygun tedavi önerilir.'
  },
  {
    id: 'herniated-disc',
    name: 'Disk Hernisi',
    findings: 'L4-L5 seviyesinde posterior disk protrüzyonu mevcuttur, spinal kanal ve nöral foramenlerde daralmaya neden olmaktadır. L5 sinir kökünde bası izlenmektedir.',
    impression: 'L4-L5 posterior disk hernisi.',
    recommendations: 'Ortopedi/nöroşirürji konsültasyonu önerilir.'
  },
  {
    id: 'cholecystitis',
    name: 'Akut Kolesistit',
    findings: 'Safra kesesi duvarında kalınlaşma (5 mm) mevcuttur. Perikoleistik sıvı izlenmektedir. Lümende çok sayıda kalkül saptanmaktadır. Murphy bulgusu pozitiftir.',
    impression: 'Akut kolesistit bulguları.',
    recommendations: 'Cerrahi konsültasyon önerilir.'
  },
  {
    id: 'renal-calculus',
    name: 'Böbrek Taşı',
    findings: 'Sağ böbrek alt kaliks düzeyinde yaklaşık 6 mm çaplı hiperdens kalkül izlenmektedir. Hafif hidronefroz mevcuttur. Sol böbrek normal görünümdedir.',
    impression: 'Sağ renal kalkül, hafif hidronefroz.',
    recommendations: 'Üroloji konsültasyonu önerilir.'
  },
  {
    id: 'appendicitis',
    name: 'Akut Apandisit',
    findings: 'Sağ alt kadranda dilate apendiks (çap 10 mm) izlenmektedir. Duvar kalınlaşması ve periapendiseal inflamasyon mevcuttur. Appendikolit saptanmıştır.',
    impression: 'Akut apandisit ile uyumlu bulgular.',
    recommendations: 'Acil cerrahi konsültasyon önerilir.'
  },
  {
    id: 'fracture',
    name: 'Kırık',
    findings: 'Distal radius metafiz bölgesinde oblik fraktür hattı izlenmektedir. Belirgin deplasman veya angülasyon saptanmamıştır. Eklem yüzü intakttır.',
    impression: 'Distal radius fraktürü (Colles tipi).',
    recommendations: 'Ortopedi konsültasyonu ve immobilizasyon önerilir.'
  },
  {
    id: 'normal-usg-abdomen',
    name: 'Normal USG Üst Batın',
    findings: 'Karaciğer normal boyut ve ekojenitede, parankim homojendir. İntrahepatik safra yolları normal kalibredir. Portal ven çapı normal. Safra kesesi normal, taş izlenmedi. Pankreas ve dalak normal görünümde.',
    impression: 'Normal üst batın USG.',
    recommendations: 'Klinik takip önerilir.'
  },
  {
    id: 'hepatomegaly',
    name: 'Hepatomegali',
    findings: 'Karaciğer belirgin büyümüş (kraniokaudal çap 18 cm), ekojenite artmış, steatoz ile uyumlu. İntrahepatik safra yolları normal. Portal ven çapı hafif genişlemiş (14 mm).',
    impression: 'Hepatomegali, hepatosteatoz bulguları.',
    recommendations: 'Karaciğer fonksiyon testleri ve viral hepatit serolojisi önerilir.'
  },
  {
    id: 'pulmonary-embolism',
    name: 'Pulmoner Emboli',
    findings: 'Sağ pulmoner arter ana dal ve segmental dallarda parsiyel dolum defekti izlenmektedir. Akciğer parankiminde konsolidasyon/infarkt alanı saptanmamıştır.',
    impression: 'Sağ pulmoner arter ana dal ve segmental dallarda akut pulmoner emboli.',
    recommendations: 'Acil antikoagülan tedavi başlanması önerilir. Kardiyoloji/göğüs hastalıkları konsültasyonu.'
  }
]

// Sample patient and doctor data
const SAMPLE_PATIENTS = [
  { id: 'P001', name: 'Mehmet Yılmaz', tc: '12345678901', age: 45, gender: 'E' },
  { id: 'P002', name: 'Ayşe Demir', tc: '98765432109', age: 32, gender: 'K' },
  { id: 'P003', name: 'Fatma Kaya', tc: '11223344556', age: 67, gender: 'K' },
  { id: 'P004', name: 'Ali Öztürk', tc: '66778899001', age: 28, gender: 'E' },
  { id: 'P005', name: 'Zeynep Arslan', tc: '55443322110', age: 54, gender: 'K' },
  { id: 'P006', name: 'Mustafa Çelik', tc: '22334455667', age: 71, gender: 'E' },
  { id: 'P007', name: 'Elif Şahin', tc: '99887766554', age: 39, gender: 'K' },
  { id: 'P008', name: 'Ahmet Kurt', tc: '44556677889', age: 62, gender: 'E' },
]

const SAMPLE_DOCTORS = [
  'Dr. Kemal Özkan (Kardiyoloji)',
  'Dr. Leyla Aydın (Göğüs Hastalıkları)',
  'Dr. Can Yıldırım (Nöroloji)',
  'Dr. Deniz Aksoy (Ortopedi)',
  'Dr. Ece Polat (Dahiliye)',
  'Dr. Bora Kılıç (Acil Tıp)',
  'Dr. Selin Acar (Genel Cerrahi)',
  'Dr. Murat Tekin (Üroloji)',
]

type StudyStatus = 'Planlandı' | 'Görüntüleme' | 'Raporlanıyor' | 'Tamamlandı'

interface Study {
  id: string
  patientName: string
  patientId: string
  studyType: string
  bodyPart: string
  indication: string
  status: StudyStatus
  priority: 'Normal' | 'STAT'
  orderingPhysician: string
  scheduledTime: string
  completedTime?: string
  previousStudies?: number
}

// Sample PACS worklist data
const SAMPLE_STUDIES: Study[] = [
  {
    id: 'ST001',
    patientName: 'Mehmet Yılmaz',
    patientId: 'P001',
    studyType: 'BT Beyin',
    bodyPart: 'Beyin',
    indication: 'Baş ağrısı, bulantı, kusma',
    status: 'Tamamlandı',
    priority: 'Normal',
    orderingPhysician: 'Dr. Can Yıldırım (Nöroloji)',
    scheduledTime: '2025-12-23 08:30',
    completedTime: '2025-12-23 09:15',
    previousStudies: 2
  },
  {
    id: 'ST002',
    patientName: 'Ayşe Demir',
    patientId: 'P002',
    studyType: 'Akciğer Grafisi (PA)',
    bodyPart: 'Toraks',
    indication: 'Öksürük, ateş, nefes darlığı',
    status: 'Raporlanıyor',
    priority: 'STAT',
    orderingPhysician: 'Dr. Bora Kılıç (Acil Tıp)',
    scheduledTime: '2025-12-23 09:00',
    completedTime: '2025-12-23 09:20',
    previousStudies: 0
  },
  {
    id: 'ST003',
    patientName: 'Fatma Kaya',
    patientId: 'P003',
    studyType: 'MR Lomber Omurga',
    bodyPart: 'Lomber Omurga',
    indication: 'Kronik bel ağrısı, bacağa vuran ağrı',
    status: 'Görüntüleme',
    priority: 'Normal',
    orderingPhysician: 'Dr. Deniz Aksoy (Ortopedi)',
    scheduledTime: '2025-12-23 10:00',
    previousStudies: 3
  },
  {
    id: 'ST004',
    patientName: 'Ali Öztürk',
    patientId: 'P004',
    studyType: 'USG Üst Batın',
    bodyPart: 'Abdomen',
    indication: 'Sağ üst kadran ağrısı',
    status: 'Planlandı',
    priority: 'Normal',
    orderingPhysician: 'Dr. Ece Polat (Dahiliye)',
    scheduledTime: '2025-12-23 11:00',
    previousStudies: 1
  },
  {
    id: 'ST005',
    patientName: 'Zeynep Arslan',
    patientId: 'P005',
    studyType: 'Mamografi',
    bodyPart: 'Meme',
    indication: 'Rutin tarama',
    status: 'Planlandı',
    priority: 'Normal',
    orderingPhysician: 'Dr. Selin Acar (Genel Cerrahi)',
    scheduledTime: '2025-12-23 11:30',
    previousStudies: 2
  },
  {
    id: 'ST006',
    patientName: 'Mustafa Çelik',
    patientId: 'P006',
    studyType: 'BT Toraks + Kontrast',
    bodyPart: 'Toraks',
    indication: 'Akciğerde kitle, metastaz araştırma',
    status: 'Raporlanıyor',
    priority: 'STAT',
    orderingPhysician: 'Dr. Leyla Aydın (Göğüs Hastalıkları)',
    scheduledTime: '2025-12-23 09:30',
    completedTime: '2025-12-23 10:45',
    previousStudies: 5
  },
  {
    id: 'ST007',
    patientName: 'Elif Şahin',
    patientId: 'P007',
    studyType: 'MR Diz',
    bodyPart: 'Diz',
    indication: 'Menisküs yırtığı şüphesi',
    status: 'Tamamlandı',
    priority: 'Normal',
    orderingPhysician: 'Dr. Deniz Aksoy (Ortopedi)',
    scheduledTime: '2025-12-23 08:00',
    completedTime: '2025-12-23 08:45',
    previousStudies: 0
  },
  {
    id: 'ST008',
    patientName: 'Ahmet Kurt',
    patientId: 'P008',
    studyType: 'BT Anjiyo Koroner',
    bodyPart: 'Kalp',
    indication: 'Göğüs ağrısı, koroner arter hastalığı araştırma',
    status: 'Görüntüleme',
    priority: 'STAT',
    orderingPhysician: 'Dr. Kemal Özkan (Kardiyoloji)',
    scheduledTime: '2025-12-23 10:30',
    previousStudies: 1
  },
]

export default function RadyolojiPage() {
  const [activeTab, setActiveTab] = useState<'worklist' | 'newOrder' | 'viewer' | 'reporting'>('worklist')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<typeof SAMPLE_PATIENTS[0] | null>(null)
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null)
  const [selectedStudyCategory, setSelectedStudyCategory] = useState<string>('')
  const [selectedStudyType, setSelectedStudyType] = useState<string>('')
  const [bodyPart, setBodyPart] = useState('')
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

  const stats = {
    totalToday: SAMPLE_STUDIES.length,
    pending: SAMPLE_STUDIES.filter(s => s.status === 'Planlandı' || s.status === 'Görüntüleme').length,
    completed: SAMPLE_STUDIES.filter(s => s.status === 'Tamamlandı').length,
    stat: SAMPLE_STUDIES.filter(s => s.priority === 'STAT').length,
    avgTurnaround: '42 dk',
    reporting: SAMPLE_STUDIES.filter(s => s.status === 'Raporlanıyor').length,
  }

  const filteredPatients = SAMPLE_PATIENTS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tc.includes(searchTerm)
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
    if (!selectedPatient || !selectedStudyType || !bodyPart || !clinicalIndication || !selectedPhysician) {
      alert('Lütfen tüm zorunlu alanları doldurun')
      return
    }
    alert('Görüntüleme isteği oluşturuldu!')
    // Reset form
    setSelectedPatient(null)
    setSelectedStudyCategory('')
    setSelectedStudyType('')
    setBodyPart('')
    setClinicalIndication('')
    setSelectedPhysician('')
    setIsPriority(false)
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
      alert('Lütfen en az bulgular ve değerlendirme alanlarını doldurun')
      return
    }
    alert(`Rapor kaydedildi! ${notifyPhysician ? 'İstem yapan doktora bildirim gönderildi.' : ''}`)
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
    setActiveTab('reporting')
  }

  const getStatusBadge = (status: StudyStatus) => {
    const variants = {
      'Planlandı': 'bg-blue-100 text-blue-700 border-blue-200',
      'Görüntüleme': 'bg-purple-100 text-purple-700 border-purple-200',
      'Raporlanıyor': 'bg-orange-100 text-orange-700 border-orange-200',
      'Tamamlandı': 'bg-green-100 text-green-700 border-green-200',
    }
    return variants[status]
  }

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Scan className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Radyoloji Yönetimi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">Görüntüleme İstem & PACS Entegrasyonu</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setActiveTab('worklist')}
                className={cn(activeTab === 'worklist' && 'bg-red-50 border-red-300')}
              >
                <Activity className="h-4 w-4 mr-2" />
                Worklist
              </Button>
              <Button
                onClick={() => setActiveTab('newOrder')}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni İstem
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bugün Toplam</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalToday}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bekleyen</span>
            </div>
            <p className="text-3xl font-bold text-orange-700">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Raporlanıyor</span>
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.reporting}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Tamamlandı</span>
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.completed}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Zap className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">STAT</span>
            </div>
            <p className="text-3xl font-bold text-red-700">{stats.stat}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Ort. TAT</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.avgTurnaround}</p>
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
                  Filtrele
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Dışa Aktar
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="All">Tümü</option>
                      <option value="Planlandı">Planlandı</option>
                      <option value="Görüntüleme">Görüntüleme</option>
                      <option value="Raporlanıyor">Raporlanıyor</option>
                      <option value="Tamamlandı">Tamamlandı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tetkik Türü</label>
                    <select
                      value={filterStudyType}
                      onChange={(e) => setFilterStudyType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Tümü</option>
                      {Object.values(IMAGING_STUDIES).flat().map(study => (
                        <option key={study} value={study}>{study}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tarih Aralığı</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">İstem Yapan Doktor</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option value="">Tümü</option>
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
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Hasta</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Tetkik</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Bölge</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Endikasyon</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Durum</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">İstem Yapan</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Saat</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">İşlemler</th>
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
                            <p className="text-sm text-gray-500">{study.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{study.studyType}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-700">{study.bodyPart}</span>
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
                          {(study.status === 'Tamamlandı' || study.status === 'Raporlanıyor') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewStudy(study)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Görüntüle
                            </Button>
                          )}
                          {study.status === 'Raporlanıyor' && (
                            <Button
                              size="sm"
                              onClick={() => handleStartReporting(study)}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Raporla
                            </Button>
                          )}
                          {study.status === 'Tamamlandı' && (
                            <Button
                              size="sm"
                              variant="outline"
                            >
                              <Printer className="h-4 w-4 mr-1" />
                              Yazdır
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Yeni Görüntüleme İsteği</h2>

            <div className="space-y-6">
              {/* Patient Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Hasta Ara
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Hasta adı veya TC kimlik no ile arayın..."
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
                          TC: {patient.tc} | {patient.age} yaş | {patient.gender === 'E' ? 'Erkek' : 'Kadın'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {selectedPatient && (
                  <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-900">{selectedPatient.name}</p>
                    <p className="text-sm text-green-700">
                      TC: {selectedPatient.tc} | {selectedPatient.age} yaş | {selectedPatient.gender === 'E' ? 'Erkek' : 'Kadın'}
                    </p>
                  </div>
                )}
              </div>

              {/* Study Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Image className="h-4 w-4 inline mr-2" />
                    Tetkik Kategorisi
                  </label>
                  <select
                    value={selectedStudyCategory}
                    onChange={(e) => {
                      setSelectedStudyCategory(e.target.value)
                      setSelectedStudyType('')
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Kategori seçin...</option>
                    {Object.keys(IMAGING_STUDIES).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tetkik Türü
                  </label>
                  <select
                    value={selectedStudyType}
                    onChange={(e) => setSelectedStudyType(e.target.value)}
                    disabled={!selectedStudyCategory}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Tetkik seçin...</option>
                    {selectedStudyCategory && IMAGING_STUDIES[selectedStudyCategory as keyof typeof IMAGING_STUDIES].map((study) => (
                      <option key={study} value={study}>{study}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Body Part and Indication */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vücut Bölgesi
                  </label>
                  <Input
                    placeholder="Örn: Sağ diz, sol akciğer..."
                    value={bodyPart}
                    onChange={(e) => setBodyPart(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    İstem Yapan Doktor
                  </label>
                  <select
                    value={selectedPhysician}
                    onChange={(e) => setSelectedPhysician(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Doktor seçin...</option>
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
                  Klinik Endikasyon
                </label>
                <textarea
                  placeholder="Hasta şikayetleri ve klinik bulgular..."
                  value={clinicalIndication}
                  onChange={(e) => setClinicalIndication(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[100px]"
                />
              </div>

              {/* Priority Checkbox */}
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
                  STAT - Acil Görüntüleme
                </label>
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
                  İptal
                </Button>
                <Button
                  onClick={handleCreateOrder}
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  İstem Oluştur
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
                </div>
                <Button variant="outline" onClick={() => setActiveTab('worklist')}>
                  <X className="h-4 w-4 mr-2" />
                  Kapat
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Vücut Bölgesi</p>
                  <p className="font-semibold">{selectedStudy.bodyPart}</p>
                </div>
                <div>
                  <p className="text-gray-600">Endikasyon</p>
                  <p className="font-semibold">{selectedStudy.indication}</p>
                </div>
                <div>
                  <p className="text-gray-600">Çekim Saati</p>
                  <p className="font-semibold">{selectedStudy.completedTime || selectedStudy.scheduledTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">İstem Yapan</p>
                  <p className="font-semibold">{selectedStudy.orderingPhysician}</p>
                </div>
              </div>
            </div>

            {/* DICOM Viewer Placeholder */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">DICOM Görüntü Görüntüleyici</h3>
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
                  <p>Study: {selectedStudy.studyType}</p>
                  <p>Date: {selectedStudy.completedTime || selectedStudy.scheduledTime}</p>
                  <p>Series: 1/1</p>
                  <p>Image: 1/1</p>
                </div>

                <div className="absolute top-4 right-4 text-green-400 font-mono text-xs space-y-1 text-right">
                  <p>WW: 400</p>
                  <p>WL: 40</p>
                  <p>Zoom: 100%</p>
                  <p>Slice: -/-</p>
                </div>

                {/* Simulated Medical Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative inline-block">
                      {/* Simulate different imaging modalities with colors */}
                      {selectedStudy.studyType.includes('BT') && (
                        <div className="w-96 h-96 rounded-full bg-gradient-radial from-gray-400 via-gray-600 to-gray-800 shadow-2xl shadow-blue-500/50 relative">
                          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                          <div className="absolute inset-24 rounded-full bg-gray-800 opacity-80"></div>
                        </div>
                      )}
                      {selectedStudy.studyType.includes('MR') && (
                        <div className="w-96 h-96 rounded-full bg-gradient-radial from-gray-300 via-gray-500 to-gray-700 shadow-2xl shadow-purple-500/50 relative">
                          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800"></div>
                          <div className="absolute inset-24 rounded-full bg-gray-700 opacity-70"></div>
                        </div>
                      )}
                      {selectedStudy.studyType.includes('Grafisi') && (
                        <div className="w-80 h-96 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 shadow-2xl shadow-green-500/30 relative rounded-lg">
                          <div className="absolute inset-8 bg-gradient-to-br from-gray-400 to-gray-700 opacity-60 rounded"></div>
                        </div>
                      )}
                      {selectedStudy.studyType.includes('USG') && (
                        <div className="w-96 h-80 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 shadow-2xl shadow-yellow-500/30 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-gray-900/40"></div>
                        </div>
                      )}
                    </div>
                    <p className="mt-6 text-green-400 font-mono text-sm">
                      [SIMULATED DICOM VIEWER - PACS Integration]
                    </p>
                  </div>
                </div>

                {/* Bottom measurement tools */}
                <div className="absolute bottom-4 left-4 text-green-400 font-mono text-xs">
                  <p>Distance: -</p>
                  <p>Angle: -</p>
                  <p>ROI: -</p>
                </div>
              </div>
            </div>

            {/* Previous Studies */}
            {selectedStudy.previousStudies && selectedStudy.previousStudies > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Önceki Görüntülemeler ({selectedStudy.previousStudies})</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(selectedStudy.previousStudies)].map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Image className="h-5 w-5 text-gray-600" />
                        <span className="font-semibold text-gray-900">{selectedStudy.studyType}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(Date.now() - (i + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR')}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Raporu Görüntüle
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
                Raporlamaya Başla
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
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStudy.studyType} - Raporlama</h2>
                  <p className="text-gray-600">{selectedStudy.patientName} - {selectedStudy.patientId}</p>
                </div>
                <Button variant="outline" onClick={() => setActiveTab('worklist')}>
                  <X className="h-4 w-4 mr-2" />
                  Kapat
                </Button>
              </div>
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Hızlı Rapor Şablonları</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTemplates(!showTemplates)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {showTemplates ? 'Gizle' : 'Şablonları Göster'}
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
                      <p className="text-xs text-gray-500 mt-1">Tıklayarak uygula</p>
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
                    Bulgular
                  </label>
                  <textarea
                    value={findings}
                    onChange={(e) => setFindings(e.target.value)}
                    placeholder="Görüntüleme bulgularını detaylı olarak yazın..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[150px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Değerlendirme (İmpression)
                  </label>
                  <textarea
                    value={impression}
                    onChange={(e) => setImpression(e.target.value)}
                    placeholder="Sonuç ve tanısal değerlendirme..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Öneriler
                  </label>
                  <textarea
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    placeholder="Klinik öneriler ve takip planı..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[80px]"
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
                    Rapor hazır olduğunda istem yapan doktora bildirim gönder
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setActiveTab('worklist')}>
                    İptal
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Taslak Kaydet
                  </Button>
                  <Button
                    onClick={handleSubmitReport}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Raporu Onayla ve Gönder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KVKK Compliance */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">KVKK Uyumluluk & PACS Güvenliği</h3>
              <p className="text-sm text-purple-800">
                Radyolojik görüntüler PACS sisteminde AES-256 şifreleme ile saklanır.
                DICOM standardına tam uyumlu, HL7 entegrasyonu mevcuttur.
                Tüm görüntü erişimleri audit loglanır ve KVKK uyumludur.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
    
  )
}

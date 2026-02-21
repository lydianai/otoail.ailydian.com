'use client'

import { useState, useEffect } from 'react'
import {
  Ambulance,
  AlertTriangle,
  Heart,
  Activity,
  Clock,
  User,
  Phone,
  MapPin,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Stethoscope,
  Building2,
  FileText,
  Users,
  ArrowRight,
  Bell,
  Shield,
  CircleDot,
  Timer,
  TrendingUp,
  Siren,
  BedDouble,
  X,
  Check,
  AlertCircle,
  Thermometer,
  Droplet,
  Wind,
  Brain,
  UserPlus,
  Zap,
  Send,
  Home,
  Hospital,
  Skull,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Edit,
  Eye,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

// Types
type TriyajSeviye = 'kirmizi' | 'sari' | 'yesil' | 'beyaz'
type Cinsiyet = 'Erkek' | 'Kadın'
type GelisSekli = 'ayaktan' | 'ambulans-112' | 'ambulans-ozel' | 'polis' | 'nakil'
type PatientStatus = 'triage' | 'muayene' | 'tetkik' | 'tedavi' | 'gozlem' | 'yatis' | 'taburcu'
type BedStatus = 'bos' | 'dolu' | 'temizlik'

interface VitalBelirtiler {
  nabiz: number
  tansiyon: string
  ates: number
  spo2: number
  solunum: number
  gks: number
  sistolik?: number
  diastolik?: number
}

interface HastaBilgi {
  ad: string
  soyad: string
  tcKimlik: string
  yas: number
  cinsiyet: Cinsiyet
  telefon?: string
  adres?: string
}

interface AcilHasta {
  id: string
  protokolNo: string
  hastaBilgi: HastaBilgi
  gelisSekli: GelisSekli
  triyajSeviye: TriyajSeviye
  oncelikNo: number
  sikayet: string
  vitalBelirtiler: VitalBelirtiler
  gelisSaati: string
  gelisZamani: Date
  beklemedk: number
  mudahaleEden: string
  durum: PatientStatus
  yatakNo?: string
  mukerrer: boolean
}

interface EmergencyBed {
  id: string
  yatakNo: string
  durum: BedStatus
  hastaId?: string
  hastaAd?: string
  triyajSeviye?: TriyajSeviye
  baslangicSaati?: string
}

// Turkish patient names and complaints
const turkishNames = {
  erkek: [
    { ad: 'Mehmet', soyad: 'Yılmaz' },
    { ad: 'Ali', soyad: 'Öztürk' },
    { ad: 'Ahmet', soyad: 'Kaya' },
    { ad: 'Mustafa', soyad: 'Demir' },
    { ad: 'Hasan', soyad: 'Şahin' },
    { ad: 'İbrahim', soyad: 'Çelik' },
    { ad: 'Hüseyin', soyad: 'Aydın' },
    { ad: 'Osman', soyad: 'Arslan' },
    { ad: 'İsmail', soyad: 'Koç' },
    { ad: 'Murat', soyad: 'Kurt' },
    { ad: 'Emre', soyad: 'Özdemir' },
    { ad: 'Kemal', soyad: 'Erdoğan' },
    { ad: 'Serkan', soyad: 'Yıldız' },
    { ad: 'Fatih', soyad: 'Aksoy' },
    { ad: 'Burak', soyad: 'Çetin' },
  ],
  kadin: [
    { ad: 'Fatma', soyad: 'Kaya' },
    { ad: 'Ayşe', soyad: 'Demir' },
    { ad: 'Emine', soyad: 'Yılmaz' },
    { ad: 'Hatice', soyad: 'Şahin' },
    { ad: 'Zeynep', soyad: 'Çelik' },
    { ad: 'Elif', soyad: 'Arslan' },
    { ad: 'Meryem', soyad: 'Aydın' },
    { ad: 'Hacer', soyad: 'Öztürk' },
    { ad: 'Şerife', soyad: 'Koç' },
    { ad: 'Fadime', soyad: 'Kurt' },
    { ad: 'Sevgi', soyad: 'Özdemir' },
    { ad: 'Gül', soyad: 'Erdoğan' },
    { ad: 'Derya', soyad: 'Yıldız' },
    { ad: 'Selin', soyad: 'Aksoy' },
    { ad: 'Canan', soyad: 'Çetin' },
  ],
}

const complaints = {
  kirmizi: [
    'Göğüs ağrısı, nefes darlığı - miyokard enfarktüsü şüphesi',
    'Şiddetli baş ağrısı, kusma - intrakraniyal kanama şüphesi',
    'Travma, bilinç kapalı - çoklu travma',
    'Solunum durması, kardiyopulmoner resüsitasyon',
    'Şiddetli kanamalı yaralanma - hemorajik şok',
    'Anfilaktik şok - anjiyoödem',
    'Konvülziyon, status epileptikus',
    'Akut solunum sıkıntısı - pulmoner emboli şüphesi',
    'Akut koroner sendrom - göğüs ağrısı',
    'İnme belirtileri - hemipleji, konuşma bozukluğu',
  ],
  sari: [
    'Karın ağrısı, bulantı - akut apandisit şüphesi',
    'Yüksek ateş, şiddetli baş ağrısı - menenjit?',
    'Kırık şüphesi - düşme sonrası şiddetli ağrı',
    'Astım atağı - nefes darlığı',
    'Böbrek taşı krizi - kolik ağrı',
    'Dehidratasyon - şiddetli kusma, ishal',
    'Hipertansif kriz - baş ağrısı, tansiyon yüksekliği',
    'Gebelikte kanama - 2. trimester',
    'Akut pankreatit - üst karın ağrısı',
    'Diyabetik ketoasidoz - bilinç bulanıklığı',
  ],
  yesil: [
    'Grip belirtileri, hafif ateş',
    'Boğaz ağrısı, öksürük',
    'Baş ağrısı, halsizlik',
    'Mide bulantısı, iştahsızlık',
    'Sırt ağrısı - kronik',
    'Hafif travma - burkulma',
    'Kulak ağrısı',
    'Alerjik reaksiyon - hafif kaşıntı',
    'İdrar yolu enfeksiyonu belirtileri',
    'Eklem ağrısı - artrit',
  ],
  beyaz: [
    'Hafif soğuk algınlığı',
    'Çocukta hafif öksürük',
    'Nezle, hapşırık',
    'Hafif kabızlık',
    'Cilt döküntüsü - kaşıntısız',
    'Reçete yenileme talebi',
    'Aşı sertifikası kontrolü',
    'Hafif baş dönmesi',
    'Uyku problemi',
    'Kronik hastalık kontrol muayenesi',
  ],
}

const turkishAddresses = [
  'Atatürk Mahallesi, Cumhuriyet Caddesi No:45/3, Kadıköy/İstanbul',
  'Fatih Mahallesi, İnönü Sokak No:12/7, Çankaya/Ankara',
  'Karşıyaka Mahallesi, Gazi Bulvarı No:78/2, Karşıyaka/İzmir',
  'Yenimahalle, Kızılay Caddesi No:23/5, Nilüfer/Bursa',
  'Bahçelievler Mahallesi, Eski Londra Asfaltı No:156/4, Kartal/İstanbul',
  'Çamlıca Mahallesi, Özgürlük Caddesi No:89/12, Keçiören/Ankara',
  'Bornova Mahallesi, Mustafa Kemal Bulvarı No:234/6, Bornova/İzmir',
  'Mevlana Mahallesi, Selçuklu Caddesi No:67/8, Selçuklu/Konya',
  'Barbaros Mahallesi, Beşiktaş Caddesi No:45/3, Beşiktaş/İstanbul',
  'Kızılay Mahallesi, Atatürk Bulvarı No:123/15, Çankaya/Ankara',
]

const doctorNames = [
  'Dr. Ayşe Demir',
  'Dr. Ahmet Şahin',
  'Dr. Zeynep Arslan',
  'Dr. Mustafa Aydın',
  'Dr. Selin Yurt',
  'Dr. Emre Kılıç',
  'Dr. Fatma Özkan',
  'Dr. Mehmet Çelik',
  'Dr. Elif Koç',
  'Dr. Burak Yıldırım',
]

const departments = [
  'Dahiliye',
  'Kardiyoloji',
  'Nöroloji',
  'Genel Cerrahi',
  'Ortopedi',
  'Göğüs Hastalıkları',
  'Gastroenteroloji',
  'Üroloji',
  'Kadın Hastalıkları ve Doğum',
  'Çocuk Sağlığı ve Hastalıkları',
]

const hospitals = [
  'Ankara Şehir Hastanesi',
  'İstanbul Medeniyet Üniversitesi Göztepe Eğitim ve Araştırma Hastanesi',
  'Ege Üniversitesi Tıp Fakültesi Hastanesi',
  'Hacettepe Üniversitesi Hastaneleri',
  'Akdeniz Üniversitesi Hastanesi',
  'Gazi Üniversitesi Tıp Fakültesi Hastanesi',
]

// Generate random patient data
function generateRandomPatient(id: number, triyajSeviye: TriyajSeviye): AcilHasta {
  const cinsiyet: Cinsiyet = Math.random() > 0.5 ? 'Erkek' : 'Kadın'
  const names = cinsiyet === 'Erkek' ? turkishNames.erkek : turkishNames.kadin
  const randomName = names[Math.floor(Math.random() * names.length)]
  const complaint = complaints[triyajSeviye][Math.floor(Math.random() * complaints[triyajSeviye].length)]

  const now = new Date()
  const gelisZamani = new Date(now.getTime() - Math.random() * 6 * 60 * 60 * 1000) // Up to 6 hours ago
  const beklemedk = Math.floor((now.getTime() - gelisZamani.getTime()) / 1000 / 60)

  const gelisSekilleri: GelisSekli[] = ['ayaktan', 'ambulans-112', 'ambulans-ozel', 'polis', 'nakil']
  const gelisSekli = triyajSeviye === 'kirmizi'
    ? (Math.random() > 0.3 ? 'ambulans-112' : 'ambulans-ozel')
    : gelisSekilleri[Math.floor(Math.random() * gelisSekilleri.length)]

  const durumlar: PatientStatus[] = ['triage', 'muayene', 'tetkik', 'tedavi', 'gozlem']
  const durum = triyajSeviye === 'kirmizi'
    ? (Math.random() > 0.5 ? 'tedavi' : 'gozlem')
    : durumlar[Math.floor(Math.random() * durumlar.length)]

  // Vital signs based on triage level
  let vitals: VitalBelirtiler
  if (triyajSeviye === 'kirmizi') {
    vitals = {
      nabiz: 110 + Math.floor(Math.random() * 40),
      tansiyon: `${90 + Math.floor(Math.random() * 80)}/${60 + Math.floor(Math.random() * 40)}`,
      ates: 36 + Math.random() * 3,
      spo2: 75 + Math.floor(Math.random() * 20),
      solunum: 24 + Math.floor(Math.random() * 12),
      gks: 8 + Math.floor(Math.random() * 7),
    }
  } else if (triyajSeviye === 'sari') {
    vitals = {
      nabiz: 85 + Math.floor(Math.random() * 30),
      tansiyon: `${110 + Math.floor(Math.random() * 50)}/${70 + Math.floor(Math.random() * 30)}`,
      ates: 37 + Math.random() * 2,
      spo2: 92 + Math.floor(Math.random() * 7),
      solunum: 18 + Math.floor(Math.random() * 8),
      gks: 13 + Math.floor(Math.random() * 3),
    }
  } else {
    vitals = {
      nabiz: 60 + Math.floor(Math.random() * 30),
      tansiyon: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 15)}`,
      ates: 36.5 + Math.random() * 1.5,
      spo2: 96 + Math.floor(Math.random() * 4),
      solunum: 14 + Math.floor(Math.random() * 6),
      gks: 15,
    }
  }

  const oncelikNo = triyajSeviye === 'kirmizi' ? Math.floor(Math.random() * 50) + 1
    : triyajSeviye === 'sari' ? Math.floor(Math.random() * 100) + 51
    : triyajSeviye === 'yesil' ? Math.floor(Math.random() * 300) + 151
    : Math.floor(Math.random() * 500) + 451

  return {
    id: id.toString(),
    protokolNo: `ACL-2025-${12345 + id}`,
    hastaBilgi: {
      ad: randomName.ad,
      soyad: randomName.soyad,
      tcKimlik: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
      yas: Math.floor(Math.random() * 80) + 1,
      cinsiyet,
      telefon: `0${Math.floor(500000000 + Math.random() * 100000000)}`,
      adres: turkishAddresses[Math.floor(Math.random() * turkishAddresses.length)],
    },
    gelisSekli,
    triyajSeviye,
    oncelikNo,
    sikayet: complaint,
    vitalBelirtiler: vitals,
    gelisSaati: gelisZamani.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    gelisZamani,
    beklemedk,
    mudahaleEden: doctorNames[Math.floor(Math.random() * doctorNames.length)],
    durum,
    mukerrer: Math.random() > 0.9,
  }
}

// Generate 60+ patients
function generateInitialPatients(): AcilHasta[] {
  const patients: AcilHasta[] = []
  let id = 1

  // 8 kirmizi (critical)
  for (let i = 0; i < 8; i++) {
    patients.push(generateRandomPatient(id++, 'kirmizi'))
  }

  // 15 sari (urgent)
  for (let i = 0; i < 15; i++) {
    patients.push(generateRandomPatient(id++, 'sari'))
  }

  // 25 yesil (non-urgent)
  for (let i = 0; i < 25; i++) {
    patients.push(generateRandomPatient(id++, 'yesil'))
  }

  // 17 beyaz (minor)
  for (let i = 0; i < 17; i++) {
    patients.push(generateRandomPatient(id++, 'beyaz'))
  }

  return patients
}

// Generate emergency beds
function generateBeds(): EmergencyBed[] {
  const beds: EmergencyBed[] = []

  for (let i = 1; i <= 40; i++) {
    const random = Math.random()
    let durum: BedStatus

    if (random < 0.65) {
      durum = 'dolu'
    } else if (random < 0.85) {
      durum = 'bos'
    } else {
      durum = 'temizlik'
    }

    beds.push({
      id: i.toString(),
      yatakNo: `ACL-${i.toString().padStart(2, '0')}`,
      durum,
      ...(durum === 'dolu' && {
      hastaAd: turkishNames.erkek[Math.floor(Math.random() * turkishNames.erkek.length)].ad,
      triyajSeviye: ['kirmizi', 'sari', 'yesil'][Math.floor(Math.random() * 3)] as TriyajSeviye,
      baslangicSaati: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000)
        .toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      })
    })
  }

  return beds
}

export default function AcilServisPage() {
  // State
  const [hastalar, setHastalar] = useState<AcilHasta[]>([])
  const [yataklar, setYataklar] = useState<EmergencyBed[]>([])
  const [aramaTerimi, setAramaTerimi] = useState('')
  const [triyajFiltre, setTriyajFiltre] = useState<string>('tumu')
  const [durumFiltre, setDurumFiltre] = useState<string>('tumu')
  const [sortField, setSortField] = useState<'oncelik' | 'sure' | 'triyaj'>('oncelik')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Modals
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showTriageModal, setShowTriageModal] = useState(false)
  const [showVitalsModal, setShowVitalsModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showDischargeModal, setShowDischargeModal] = useState(false)
  const [showBedAssignModal, setShowBedAssignModal] = useState(false)
  const [showTraumaConfirm, setShowTraumaConfirm] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<AcilHasta | null>(null)
  const [kvkkConsent, setKvkkConsent] = useState(false)

  // New registration form
  const [newPatient, setNewPatient] = useState({
    ad: '',
    soyad: '',
    tcKimlik: '',
    yas: '',
    cinsiyet: 'Erkek' as Cinsiyet,
    telefon: '',
    adres: '',
    sikayet: '',
    gelisSekli: 'ayaktan' as GelisSekli,
  })

  // Triage form
  const [triageData, setTriageData] = useState({
    triyajSeviye: 'yesil' as TriyajSeviye,
    oncelikNo: '',
  })

  // Vitals form
  const [vitalsData, setVitalsData] = useState({
    nabiz: '',
    sistolik: '',
    diastolik: '',
    ates: '',
    spo2: '',
    solunum: '',
    gks: '',
  })

  // Transfer form
  const [transferData, setTransferData] = useState({
    type: 'inpatient' as 'inpatient' | 'hospital',
    department: '',
    hospital: '',
    reason: '',
  })

  // Discharge form
  const [dischargeData, setDischargeData] = useState({
    type: 'taburcu' as 'taburcu' | 'yatan' | 'sevk' | 'exitus',
    notes: '',
    department: '',
    hospital: '',
  })

  // Initialize data
  useEffect(() => {
    setHastalar(generateInitialPatients())
    setYataklar(generateBeds())
  }, [])

  // Update wait times every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setHastalar(prev => prev.map(hasta => ({
      ...hasta,
      beklemedk: Math.floor((new Date().getTime() - hasta.gelisZamani.getTime()) / 1000 / 60)
      })))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Filtering and sorting
  const filtrelenmisHastalar = hastalar
    .filter(hasta => {
      const aramaEslesiyor =
      hasta.hastaBilgi.ad.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
      hasta.hastaBilgi.soyad.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
      hasta.hastaBilgi.tcKimlik.includes(aramaTerimi) ||
      hasta.protokolNo.toLowerCase().includes(aramaTerimi.toLowerCase())

      const triyajEslesiyor = triyajFiltre === 'tumu' || hasta.triyajSeviye === triyajFiltre
      const durumEslesiyor = durumFiltre === 'tumu' || hasta.durum === durumFiltre

      return aramaEslesiyor && triyajEslesiyor && durumEslesiyor
    })
    .sort((a, b) => {
      let comparison = 0

      if (sortField === 'oncelik') {
      comparison = a.oncelikNo - b.oncelikNo
      } else if (sortField === 'sure') {
      comparison = a.beklemedk - b.beklemedk
      } else if (sortField === 'triyaj') {
      const triyajOrder = { kirmizi: 0, sari: 1, yesil: 2, beyaz: 3 }
      comparison = triyajOrder[a.triyajSeviye] - triyajOrder[b.triyajSeviye]
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

  // Statistics
  const istatistikler = {
    toplamHasta: hastalar.length,
    kirmizi: hastalar.filter(h => h.triyajSeviye === 'kirmizi').length,
    sari: hastalar.filter(h => h.triyajSeviye === 'sari').length,
    yesil: hastalar.filter(h => h.triyajSeviye === 'yesil').length,
    beyaz: hastalar.filter(h => h.triyajSeviye === 'beyaz').length,
    ortalamaBekleme: hastalar.length > 0
      ? Math.round(hastalar.reduce((toplam, h) => toplam + h.beklemedk, 0) / hastalar.length)
      : 0,
    ortalamaBeklemeKirmizi: hastalar.filter(h => h.triyajSeviye === 'kirmizi').length > 0
      ? Math.round(hastalar.filter(h => h.triyajSeviye === 'kirmizi').reduce((t, h) => t + h.beklemedk, 0) / hastalar.filter(h => h.triyajSeviye === 'kirmizi').length)
      : 0,
    ortalamaBeklemeSari: hastalar.filter(h => h.triyajSeviye === 'sari').length > 0
      ? Math.round(hastalar.filter(h => h.triyajSeviye === 'sari').reduce((t, h) => t + h.beklemedk, 0) / hastalar.filter(h => h.triyajSeviye === 'sari').length)
      : 0,
    ortalamaBeklemeYesil: hastalar.filter(h => h.triyajSeviye === 'yesil').length > 0
      ? Math.round(hastalar.filter(h => h.triyajSeviye === 'yesil').reduce((t, h) => t + h.beklemedk, 0) / hastalar.filter(h => h.triyajSeviye === 'yesil').length)
      : 0,
    ortalamaBeklemeBeyaz: hastalar.filter(h => h.triyajSeviye === 'beyaz').length > 0
      ? Math.round(hastalar.filter(h => h.triyajSeviye === 'beyaz').reduce((t, h) => t + h.beklemedk, 0) / hastalar.filter(h => h.triyajSeviye === 'beyaz').length)
      : 0,
    ambulans: hastalar.filter(h => h.gelisSekli.includes('ambulans')).length,
    bosYatak: yataklar.filter(y => y.durum === 'bos').length,
    doluYatak: yataklar.filter(y => y.durum === 'dolu').length,
    temizlikYatak: yataklar.filter(y => y.durum === 'temizlik').length,
  }

  // Color utilities
  const triyajRenkleri = {
    kirmizi: 'bg-red-100 text-red-700 border-red-300',
    sari: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    yesil: 'bg-green-100 text-green-700 border-green-300',
    beyaz: 'bg-gray-100 text-gray-700 border-gray-300',
  }

  const triyajMetinleri = {
    kirmizi: 'KIRMIZI - Kritik',
    sari: 'SARI - Acil',
    yesil: 'YEŞİL - Acil Değil',
    beyaz: 'BEYAZ - Minör',
  }

  const durumMetinleri = {
    triage: 'Triyaj',
    muayene: 'Muayene',
    tetkik: 'Tetkik',
    tedavi: 'Tedavi',
    gozlem: 'Gözlem',
    yatis: 'Yatış',
    taburcu: 'Taburcu',
  }

  // Handlers
  const handleNewRegistration = () => {
    if (!kvkkConsent) {
      alert('KVKK onayı gereklidir!')
      return
    }

    const newId = (hastalar.length + 1).toString()
    const now = new Date()

    const hasta: AcilHasta = {
      id: newId,
      protokolNo: `ACL-2025-${12345 + hastalar.length}`,
      hastaBilgi: {
      ad: newPatient.ad,
      soyad: newPatient.soyad,
      tcKimlik: newPatient.tcKimlik,
      yas: parseInt(newPatient.yas),
      cinsiyet: newPatient.cinsiyet,
      telefon: newPatient.telefon,
      adres: newPatient.adres,
      },
      gelisSekli: newPatient.gelisSekli,
      triyajSeviye: 'yesil',
      oncelikNo: 999,
      sikayet: newPatient.sikayet,
      vitalBelirtiler: {
      nabiz: 80,
      tansiyon: '120/80',
      ates: 36.5,
      spo2: 98,
      solunum: 16,
      gks: 15,
      },
      gelisSaati: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      gelisZamani: now,
      beklemedk: 0,
      mudahaleEden: doctorNames[Math.floor(Math.random() * doctorNames.length)],
      durum: 'triage',
      mukerrer: false,
    }

    setHastalar([...hastalar, hasta])
    setShowRegistrationModal(false)
    setKvkkConsent(false)
    setNewPatient({
      ad: '',
      soyad: '',
      tcKimlik: '',
      yas: '',
      cinsiyet: 'Erkek',
      telefon: '',
      adres: '',
      sikayet: '',
      gelisSekli: 'ayaktan',
    })
  }

  const handleTriageAssign = () => {
    if (selectedPatient) {
      setHastalar(hastalar.map(h =>
      h.id === selectedPatient.id
        ? { ...h, triyajSeviye: triageData.triyajSeviye, oncelikNo: parseInt(triageData.oncelikNo) }
        : h
      ))
      setShowTriageModal(false)
      setTriageData({ triyajSeviye: 'yesil', oncelikNo: '' })
    }
  }

  const handleVitalsUpdate = () => {
    if (selectedPatient) {
      setHastalar(hastalar.map(h =>
      h.id === selectedPatient.id
        ? {
            ...h,
            vitalBelirtiler: {
              nabiz: parseInt(vitalsData.nabiz),
              tansiyon: `${vitalsData.sistolik}/${vitalsData.diastolik}`,
              ates: parseFloat(vitalsData.ates),
              spo2: parseInt(vitalsData.spo2),
              solunum: parseInt(vitalsData.solunum),
              gks: parseInt(vitalsData.gks),
            }
          }
        : h
      ))
      setShowVitalsModal(false)
      setVitalsData({ nabiz: '', sistolik: '', diastolik: '', ates: '', spo2: '', solunum: '', gks: '' })
    }
  }

  const handleTransfer = () => {
    if (selectedPatient) {
      setHastalar(hastalar.filter(h => h.id !== selectedPatient.id))
      setShowTransferModal(false)
      setTransferData({ type: 'inpatient', department: '', hospital: '', reason: '' })
    }
  }

  const handleDischarge = () => {
    if (selectedPatient) {
      setHastalar(hastalar.filter(h => h.id !== selectedPatient.id))
      setShowDischargeModal(false)
      setDischargeData({ type: 'taburcu', notes: '', department: '', hospital: '' })
    }
  }

  const handleFastTrack = (hasta: AcilHasta) => {
    if (hasta.triyajSeviye === 'yesil' || hasta.triyajSeviye === 'beyaz') {
      setHastalar(hastalar.map(h =>
      h.id === hasta.id ? { ...h, durum: 'taburcu' } : h
      ))
    }
  }

  const handleTraumaActivation = () => {
    setShowTraumaConfirm(false)
    // In real app, this would trigger trauma team notification
    alert('Travma ekibi aktive edildi! Tüm ekip üyeleri bilgilendirildi.')
  }

  const toggleSort = (field: 'oncelik' | 'sure' | 'triyaj') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Ambulance className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Acil Servis Yönetim Sistemi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    Triyaj Panosu & Gerçek Zamanlı Hasta Takibi
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowRegistrationModal(true)}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Hasta Kabul
              </Button>
              <Button
                onClick={() => setShowTraumaConfirm(true)}
                variant="outline"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <Siren className="h-4 w-4 mr-2 animate-pulse" />
                Travma Ekibi Aktive Et
              </Button>
              <Button variant="outline" className="border-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Yenile
              </Button>
              <Button variant="outline" className="border-2">
                <Download className="h-4 w-4 mr-2" />
                Rapor Al
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Activity className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Toplam</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{istatistikler.toplamHasta}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Kırmızı</span>
            </div>
            <p className="text-3xl font-bold text-red-700">{istatistikler.kirmizi}</p>
            <p className="text-xs text-gray-500 mt-1">Ort: {istatistikler.ortalamaBeklemeKirmizi}dk</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-yellow-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CircleDot className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Sarı</span>
            </div>
            <p className="text-3xl font-bold text-yellow-700">{istatistikler.sari}</p>
            <p className="text-xs text-gray-500 mt-1">Ort: {istatistikler.ortalamaBeklemeSari}dk</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CircleDot className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Yeşil</span>
            </div>
            <p className="text-3xl font-bold text-green-700">{istatistikler.yesil}</p>
            <p className="text-xs text-gray-500 mt-1">Ort: {istatistikler.ortalamaBeklemeYesil}dk</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CircleDot className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Beyaz</span>
            </div>
            <p className="text-3xl font-bold text-gray-700">{istatistikler.beyaz}</p>
            <p className="text-xs text-gray-500 mt-1">Ort: {istatistikler.ortalamaBeklemeBeyaz}dk</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Timer className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Ort. Bekleme</span>
            </div>
            <p className="text-3xl font-bold text-orange-700">{istatistikler.ortalamaBekleme}dk</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Ambulance className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">112 Gelişi</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">{istatistikler.ambulans}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BedDouble className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Boş Yatak</span>
            </div>
            <p className="text-3xl font-bold text-purple-700">{istatistikler.bosYatak}/{yataklar.length}</p>
          </div>
        </div>

        {/* Triage Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {(['kirmizi', 'sari', 'yesil', 'beyaz'] as TriyajSeviye[]).map(seviye => {
            const seviyeHastalar = hastalar.filter(h => h.triyajSeviye === seviye)
            const colors = {
              kirmizi: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', icon: 'bg-red-500' },
              sari: { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', icon: 'bg-yellow-500' },
              yesil: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', icon: 'bg-green-500' },
              beyaz: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', icon: 'bg-gray-500' },
            }

            return (
              <div key={seviye} className={cn('rounded-2xl border-2 shadow-sm', colors[seviye].bg, colors[seviye].border)}>
                <div className="p-4 border-b-2 border-current">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('p-2 rounded-lg', colors[seviye].icon)}>
                        {seviye === 'kirmizi' && <AlertTriangle className="h-5 w-5 text-white" />}
                        {seviye === 'sari' && <CircleDot className="h-5 w-5 text-white" />}
                        {seviye === 'yesil' && <CircleDot className="h-5 w-5 text-white" />}
                        {seviye === 'beyaz' && <CircleDot className="h-5 w-5 text-white" />}
                      </div>
                      <div>
                        <h3 className={cn('font-bold text-lg', colors[seviye].text)}>
                          {seviye.charAt(0).toUpperCase() + seviye.slice(1)}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {seviye === 'kirmizi' && 'Kritik - Acil'}
                          {seviye === 'sari' && 'Acil - Öncelikli'}
                          {seviye === 'yesil' && 'Acil Değil'}
                          {seviye === 'beyaz' && 'Minör'}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn('font-bold', colors[seviye].text, colors[seviye].bg)}>
                      {seviyeHastalar.length}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                  {seviyeHastalar.slice(0, 5).map(hasta => (
                    <div key={hasta.id} className="bg-white rounded-lg p-3 border shadow-sm hover:shadow-md transition-all">
                      <p className="font-bold text-sm text-gray-900">
                        {hasta.hastaBilgi.ad} {hasta.hastaBilgi.soyad}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Öncelik: #{hasta.oncelikNo} • Bekleme: {hasta.beklemedk}dk
                      </p>
                    </div>
                  ))}
                  {seviyeHastalar.length > 5 && (
                    <p className="text-xs text-center text-gray-500 py-2">
                      +{seviyeHastalar.length - 5} hasta daha
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bed Status Board */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Yatak Durumu Panosu</h3>
              <p className="text-sm text-gray-600 mt-1">
                Boş: {istatistikler.bosYatak} • Dolu: {istatistikler.doluYatak} • Temizlik: {istatistikler.temizlikYatak}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm font-medium">Boş</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm font-medium">Dolu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm font-medium">Temizlik</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {yataklar.map(yatak => (
              <div
                key={yatak.id}
                className={cn(
                  'rounded-lg p-3 border-2 text-center transition-all hover:scale-105 cursor-pointer',
                  yatak.durum === 'bos' && 'bg-green-50 border-green-300 hover:bg-green-100',
                  yatak.durum === 'dolu' && 'bg-red-50 border-red-300 hover:bg-red-100',
                  yatak.durum === 'temizlik' && 'bg-orange-50 border-orange-300 hover:bg-orange-100'
                )}
              >
                <BedDouble className={cn(
                  'h-5 w-5 mx-auto mb-1',
                  yatak.durum === 'bos' && 'text-green-600',
                  yatak.durum === 'dolu' && 'text-red-600',
                  yatak.durum === 'temizlik' && 'text-orange-600'
                )} />
                <p className="text-xs font-bold text-gray-900">{yatak.yatakNo}</p>
                {yatak.durum === 'dolu' && yatak.hastaAd && (
                  <p className="text-xs text-gray-600 mt-1 truncate">{yatak.hastaAd}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Hasta adı, TC, protokol no..."
                  value={aramaTerimi}
                  onChange={(e) => setAramaTerimi(e.target.value)}
                  className="pl-10 border-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Triyaj Seviye</label>
              <select
                value={triyajFiltre}
                onChange={(e) => setTriyajFiltre(e.target.value)}
                className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="tumu">Tümü</option>
                <option value="kirmizi">Kırmızı</option>
                <option value="sari">Sarı</option>
                <option value="yesil">Yeşil</option>
                <option value="beyaz">Beyaz</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Durum</label>
              <select
                value={durumFiltre}
                onChange={(e) => setDurumFiltre(e.target.value)}
                className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="tumu">Tümü</option>
                <option value="triage">Triyaj</option>
                <option value="muayene">Muayene</option>
                <option value="tetkik">Tetkik</option>
                <option value="tedavi">Tedavi</option>
                <option value="gozlem">Gözlem</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Sıralama</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={sortField === 'oncelik' ? 'default' : 'outline'}
                  onClick={() => toggleSort('oncelik')}
                  className="flex-1"
                >
                  Öncelik {sortField === 'oncelik' && (sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />)}
                </Button>
                <Button
                  size="sm"
                  variant={sortField === 'sure' ? 'default' : 'outline'}
                  onClick={() => toggleSort('sure')}
                  className="flex-1"
                >
                  Süre {sortField === 'sure' && (sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />)}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Acil Servis Hasta Listesi</h3>
                <p className="text-sm text-gray-600 font-medium mt-1">
                  {filtrelenmisHastalar.length} hasta gösteriliyor
                </p>
              </div>
              <Badge className="bg-red-100 text-red-700 border-red-300 px-3 py-1">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                Canlı Takip
              </Badge>
            </div>
          </div>

          <div className="divide-y-2 divide-gray-100">
            {filtrelenmisHastalar.map((hasta) => (
              <div
                key={hasta.id}
                className={cn(
                  "p-6 hover:bg-red-50/30 transition-all",
                  hasta.triyajSeviye === 'kirmizi' && 'bg-red-50/20 border-l-4 border-l-red-500'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl",
                      hasta.triyajSeviye === 'kirmizi' && 'bg-red-100',
                      hasta.triyajSeviye === 'sari' && 'bg-yellow-100',
                      hasta.triyajSeviye === 'yesil' && 'bg-green-100',
                      hasta.triyajSeviye === 'beyaz' && 'bg-gray-100'
                    )}>
                      <User className={cn(
                        "h-6 w-6",
                        hasta.triyajSeviye === 'kirmizi' && 'text-red-600',
                        hasta.triyajSeviye === 'sari' && 'text-yellow-600',
                        hasta.triyajSeviye === 'yesil' && 'text-green-600',
                        hasta.triyajSeviye === 'beyaz' && 'text-gray-600'
                      )} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {hasta.hastaBilgi.ad} {hasta.hastaBilgi.soyad}
                      </h4>
                      <p className="text-sm text-gray-600 font-mono mt-1">
                        {hasta.protokolNo} • {hasta.hastaBilgi.yas} yaş • {hasta.hastaBilgi.cinsiyet}
                      </p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <Badge className={cn('font-semibold border-2', triyajRenkleri[hasta.triyajSeviye])}>
                          {hasta.triyajSeviye === 'kirmizi' && <AlertTriangle className="h-3 w-3 mr-1 animate-pulse" />}
                          {triyajMetinleri[hasta.triyajSeviye]}
                        </Badge>
                        <Badge variant="outline" className="font-semibold">
                          Öncelik #{hasta.oncelikNo}
                        </Badge>
                        <Badge variant="outline" className="font-semibold">
                          {durumMetinleri[hasta.durum]}
                        </Badge>
                        {hasta.gelisSekli.includes('ambulans') && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                            <Ambulance className="h-3 w-3 mr-1" />
                            112
                          </Badge>
                        )}
                        {hasta.mukerrer && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Mükerrer
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="font-bold text-gray-900">Geliş: {hasta.gelisSaati}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className={cn(
                        "h-4 w-4",
                        hasta.beklemedk > 120 ? 'text-red-500' : hasta.beklemedk > 60 ? 'text-orange-500' : 'text-green-500'
                      )} />
                      <span className={cn(
                        "font-bold",
                        hasta.beklemedk > 120 ? 'text-red-700' : hasta.beklemedk > 60 ? 'text-orange-700' : 'text-green-700'
                      )}>
                        Bekleme: {hasta.beklemedk} dk
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-red-600" />
                      <span className="text-xs font-semibold text-gray-600">Şikayet</span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{hasta.sikayet}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-red-600" />
                      <span className="text-xs font-semibold text-gray-600">Vital Belirtiler</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Nabız:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          hasta.vitalBelirtiler.nabiz > 100 || hasta.vitalBelirtiler.nabiz < 60
                            ? 'text-red-600'
                            : 'text-green-600'
                        )}>
                          {hasta.vitalBelirtiler.nabiz}
                          {(hasta.vitalBelirtiler.nabiz > 100 || hasta.vitalBelirtiler.nabiz < 60) && (
                            <AlertCircle className="inline h-3 w-3 ml-1" />
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">SpO2:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          hasta.vitalBelirtiler.spo2 < 95 ? 'text-red-600' : 'text-green-600'
                        )}>
                          {hasta.vitalBelirtiler.spo2}%
                          {hasta.vitalBelirtiler.spo2 < 95 && (
                            <AlertCircle className="inline h-3 w-3 ml-1" />
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Tansiyon:</span>{' '}
                        <span className="font-bold text-gray-900">{hasta.vitalBelirtiler.tansiyon}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ateş:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          hasta.vitalBelirtiler.ates > 37.5 ? 'text-red-600' : 'text-green-600'
                        )}>
                          {hasta.vitalBelirtiler.ates.toFixed(1)}°C
                          {hasta.vitalBelirtiler.ates > 37.5 && (
                            <AlertCircle className="inline h-3 w-3 ml-1" />
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Solunum:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          hasta.vitalBelirtiler.solunum > 20 || hasta.vitalBelirtiler.solunum < 12
                            ? 'text-red-600'
                            : 'text-green-600'
                        )}>
                          {hasta.vitalBelirtiler.solunum}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">GKS:</span>{' '}
                        <span className={cn(
                          "font-bold",
                          hasta.vitalBelirtiler.gks < 13 ? 'text-red-600' : 'text-green-600'
                        )}>
                          {hasta.vitalBelirtiler.gks}/15
                          {hasta.vitalBelirtiler.gks < 13 && (
                            <AlertCircle className="inline h-3 w-3 ml-1" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Stethoscope className="h-4 w-4 text-red-600" />
                      <span className="text-xs font-semibold text-gray-600">Müdahale Eden</span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{hasta.mudahaleEden}</p>
                    {hasta.hastaBilgi.telefon && (
                      <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {hasta.hastaBilgi.telefon}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedPatient(hasta)
                      setShowVitalsModal(true)
                      setVitalsData({
                        nabiz: hasta.vitalBelirtiler.nabiz.toString(),
                        sistolik: hasta.vitalBelirtiler.tansiyon.split('/')[0],
                        diastolik: hasta.vitalBelirtiler.tansiyon.split('/')[1],
                        ates: hasta.vitalBelirtiler.ates.toString(),
                        spo2: hasta.vitalBelirtiler.spo2.toString(),
                        solunum: hasta.vitalBelirtiler.solunum.toString(),
                        gks: hasta.vitalBelirtiler.gks.toString(),
                      })
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Activity className="h-4 w-4 mr-1" />
                    Vital Güncelle
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2"
                    onClick={() => {
                      setSelectedPatient(hasta)
                      setShowTriageModal(true)
                      setTriageData({
                        triyajSeviye: hasta.triyajSeviye,
                        oncelikNo: hasta.oncelikNo.toString(),
                      })
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Triyaj Düzenle
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2"
                    onClick={() => {
                      setSelectedPatient(hasta)
                      setShowBedAssignModal(true)
                    }}
                  >
                    <BedDouble className="h-4 w-4 mr-1" />
                    Yatak Ata
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2"
                    onClick={() => {
                      setSelectedPatient(hasta)
                      setShowTransferModal(true)
                    }}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Nakil/Yatış
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2"
                    onClick={() => {
                      setSelectedPatient(hasta)
                      setShowDischargeModal(true)
                    }}
                  >
                    <Home className="h-4 w-4 mr-1" />
                    Taburcu
                  </Button>
                  {(hasta.triyajSeviye === 'yesil' || hasta.triyajSeviye === 'beyaz') && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-2 border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => handleFastTrack(hasta)}
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      Hızlı İşlem
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KVKK Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">KVKK Uyumluluk - Acil Servis</h3>
              <p className="text-sm text-purple-800">
                Acil servis hasta kayıtları 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında korunmaktadır.
                Tüm vital belirtiler, tıbbi bilgiler ve hasta kayıtları şifrelenmiş olarak saklanır. Triyaj sistemi Sağlık
                Bakanlığı Acil Sağlık Hizmetleri Yönetmeliği standartlarına uygun olarak tasarlanmıştır. Hasta mahremiyeti
                ve veri güvenliği en üst düzeyde sağlanmaktadır.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}

      {/* New Registration Modal */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-red-600" />
              Yeni Hasta Kayıt
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ad *</Label>
                <Input
                  value={newPatient.ad}
                  onChange={(e) => setNewPatient({...newPatient, ad: e.target.value})}
                  placeholder="Hasta adı"
                />
              </div>
              <div>
                <Label>Soyad *</Label>
                <Input
                  value={newPatient.soyad}
                  onChange={(e) => setNewPatient({...newPatient, soyad: e.target.value})}
                  placeholder="Hasta soyadı"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>TC Kimlik No *</Label>
                <Input
                  value={newPatient.tcKimlik}
                  onChange={(e) => setNewPatient({...newPatient, tcKimlik: e.target.value})}
                  placeholder="11 haneli TC"
                  maxLength={11}
                />
              </div>
              <div>
                <Label>Yaş *</Label>
                <Input
                  type="number"
                  value={newPatient.yas}
                  onChange={(e) => setNewPatient({...newPatient, yas: e.target.value})}
                  placeholder="Yaş"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Cinsiyet *</Label>
                <RadioGroup value={newPatient.cinsiyet} onValueChange={(v) => setNewPatient({...newPatient, cinsiyet: v as Cinsiyet})}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Erkek" id="erkek" />
                      <Label htmlFor="erkek">Erkek</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Kadın" id="kadin" />
                      <Label htmlFor="kadin">Kadın</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Telefon</Label>
                <Input
                  value={newPatient.telefon}
                  onChange={(e) => setNewPatient({...newPatient, telefon: e.target.value})}
                  placeholder="0555 123 45 67"
                />
              </div>
            </div>

            <div>
              <Label>Geliş Şekli *</Label>
              <Select value={newPatient.gelisSekli} onValueChange={(v) => setNewPatient({...newPatient, gelisSekli: v as GelisSekli})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ayaktan">Ayaktan</SelectItem>
                  <SelectItem value="ambulans-112">112 Ambulans</SelectItem>
                  <SelectItem value="ambulans-ozel">Özel Ambulans</SelectItem>
                  <SelectItem value="polis">Polis</SelectItem>
                  <SelectItem value="nakil">Nakil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Adres</Label>
              <Textarea
                value={newPatient.adres}
                onChange={(e) => setNewPatient({...newPatient, adres: e.target.value})}
                placeholder="Hasta adresi"
                rows={2}
              />
            </div>

            <div>
              <Label>Şikayet *</Label>
              <Textarea
                value={newPatient.sikayet}
                onChange={(e) => setNewPatient({...newPatient, sikayet: e.target.value})}
                placeholder="Başvuru sebebi / şikayet"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <Checkbox
                id="kvkk"
                checked={kvkkConsent}
                onCheckedChange={(checked) => setKvkkConsent(checked as boolean)}
              />
              <label
                htmlFor="kvkk"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                KVKK Aydınlatma Metni'ni okudum, hasta verilerinin işlenmesini onaylıyorum *
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegistrationModal(false)}>
              İptal
            </Button>
            <Button
              onClick={handleNewRegistration}
              disabled={!newPatient.ad || !newPatient.soyad || !newPatient.tcKimlik || !newPatient.yas || !newPatient.sikayet || !kvkkConsent}
              className="bg-red-600 hover:bg-red-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Triage Assignment Modal */}
      <Dialog open={showTriageModal} onOpenChange={setShowTriageModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Triyaj Seviyesi Belirleme
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900">
                  {selectedPatient.hastaBilgi.ad} {selectedPatient.hastaBilgi.soyad}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient.protokolNo}</p>
              </div>

              <div>
                <Label>Triyaj Renk Kodu *</Label>
                <RadioGroup value={triageData.triyajSeviye} onValueChange={(v) => setTriageData({...triageData, triyajSeviye: v as TriyajSeviye})}>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2 p-3 border-2 border-red-300 rounded-lg bg-red-50">
                      <RadioGroupItem value="kirmizi" id="t-kirmizi" />
                      <Label htmlFor="t-kirmizi" className="flex-1 cursor-pointer">
                        <span className="font-bold text-red-700">KIRMIZI</span>
                        <span className="text-sm text-gray-600 ml-2">- Kritik, Acil (Öncelik 1-50)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                      <RadioGroupItem value="sari" id="t-sari" />
                      <Label htmlFor="t-sari" className="flex-1 cursor-pointer">
                        <span className="font-bold text-yellow-700">SARI</span>
                        <span className="text-sm text-gray-600 ml-2">- Acil, Öncelikli (Öncelik 51-150)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border-2 border-green-300 rounded-lg bg-green-50">
                      <RadioGroupItem value="yesil" id="t-yesil" />
                      <Label htmlFor="t-yesil" className="flex-1 cursor-pointer">
                        <span className="font-bold text-green-700">YEŞİL</span>
                        <span className="text-sm text-gray-600 ml-2">- Acil Değil (Öncelik 151-450)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border-2 border-gray-300 rounded-lg bg-gray-50">
                      <RadioGroupItem value="beyaz" id="t-beyaz" />
                      <Label htmlFor="t-beyaz" className="flex-1 cursor-pointer">
                        <span className="font-bold text-gray-700">BEYAZ</span>
                        <span className="text-sm text-gray-600 ml-2">- Minör (Öncelik 451-999)</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Öncelik Numarası (1-999) *</Label>
                <Input
                  type="number"
                  min="1"
                  max="999"
                  value={triageData.oncelikNo}
                  onChange={(e) => setTriageData({...triageData, oncelikNo: e.target.value})}
                  placeholder="Öncelik numarası"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Düşük numara = Yüksek öncelik
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTriageModal(false)}>
              İptal
            </Button>
            <Button
              onClick={handleTriageAssign}
              disabled={!triageData.oncelikNo}
              className="bg-red-600 hover:bg-red-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Triyaj Ata
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vitals Update Modal */}
      <Dialog open={showVitalsModal} onOpenChange={setShowVitalsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-600" />
              Vital Belirtiler Güncelleme
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900">
                  {selectedPatient.hastaBilgi.ad} {selectedPatient.hastaBilgi.soyad}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient.protokolNo}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Nabız (atım/dk)
                  </Label>
                  <Input
                    type="number"
                    value={vitalsData.nabiz}
                    onChange={(e) => setVitalsData({...vitalsData, nabiz: e.target.value})}
                    placeholder="80"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    SpO2 (%)
                  </Label>
                  <Input
                    type="number"
                    value={vitalsData.spo2}
                    onChange={(e) => setVitalsData({...vitalsData, spo2: e.target.value})}
                    placeholder="98"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Sistolik (mmHg)</Label>
                  <Input
                    type="number"
                    value={vitalsData.sistolik}
                    onChange={(e) => setVitalsData({...vitalsData, sistolik: e.target.value})}
                    placeholder="120"
                  />
                </div>

                <div>
                  <Label>Diastolik (mmHg)</Label>
                  <Input
                    type="number"
                    value={vitalsData.diastolik}
                    onChange={(e) => setVitalsData({...vitalsData, diastolik: e.target.value})}
                    placeholder="80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    Ateş (°C)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={vitalsData.ates}
                    onChange={(e) => setVitalsData({...vitalsData, ates: e.target.value})}
                    placeholder="36.5"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-cyan-500" />
                    Solunum (/dk)
                  </Label>
                  <Input
                    type="number"
                    value={vitalsData.solunum}
                    onChange={(e) => setVitalsData({...vitalsData, solunum: e.target.value})}
                    placeholder="16"
                  />
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  Glasgow Koma Skalası (3-15)
                </Label>
                <Input
                  type="number"
                  min="3"
                  max="15"
                  value={vitalsData.gks}
                  onChange={(e) => setVitalsData({...vitalsData, gks: e.target.value})}
                  placeholder="15"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVitalsModal(false)}>
              İptal
            </Button>
            <Button
              onClick={handleVitalsUpdate}
              disabled={!vitalsData.nabiz || !vitalsData.spo2 || !vitalsData.sistolik || !vitalsData.diastolik || !vitalsData.ates || !vitalsData.solunum || !vitalsData.gks}
              className="bg-red-600 hover:bg-red-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Modal */}
      <Dialog open={showTransferModal} onOpenChange={setShowTransferModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-600" />
              Hasta Nakil / Yatış İşlemi
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900">
                  {selectedPatient.hastaBilgi.ad} {selectedPatient.hastaBilgi.soyad}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient.protokolNo}</p>
              </div>

              <div>
                <Label>Nakil Türü *</Label>
                <RadioGroup value={transferData.type} onValueChange={(v) => setTransferData({...transferData, type: v as 'inpatient' | 'hospital'})}>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inpatient" id="inpatient" />
                      <Label htmlFor="inpatient">Yatan Hasta Servisi (Klinik)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hospital" id="hospital" />
                      <Label htmlFor="hospital">Başka Hastaneye Sevk</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {transferData.type === 'inpatient' && (
                <div>
                  <Label>Servis/Klinik Seçin *</Label>
                  <Select value={transferData.department} onValueChange={(v) => setTransferData({...transferData, department: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Servis seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {transferData.type === 'hospital' && (
                <div>
                  <Label>Hastane Seçin *</Label>
                  <Select value={transferData.hospital} onValueChange={(v) => setTransferData({...transferData, hospital: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hastane seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitals.map(hosp => (
                        <SelectItem key={hosp} value={hosp}>{hosp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Nakil Nedeni</Label>
                <Textarea
                  value={transferData.reason}
                  onChange={(e) => setTransferData({...transferData, reason: e.target.value})}
                  placeholder="Nakil/yatış nedeni..."
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferModal(false)}>
              İptal
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={transferData.type === 'inpatient' ? !transferData.department : !transferData.hospital}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Naklet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Discharge Modal */}
      <Dialog open={showDischargeModal} onOpenChange={setShowDischargeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-green-600" />
              Hasta Taburcu İşlemi
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900">
                  {selectedPatient.hastaBilgi.ad} {selectedPatient.hastaBilgi.soyad}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient.protokolNo}</p>
              </div>

              <div>
                <Label>Taburcu Türü *</Label>
                <RadioGroup value={dischargeData.type} onValueChange={(v) => setDischargeData({...dischargeData, type: v as any})}>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2 p-2 border rounded-lg">
                      <RadioGroupItem value="taburcu" id="d-taburcu" />
                      <Label htmlFor="d-taburcu" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Home className="h-4 w-4 text-green-600" />
                        Taburcu (Eve)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-lg">
                      <RadioGroupItem value="yatan" id="d-yatan" />
                      <Label htmlFor="d-yatan" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        Yatan Hasta (Servise Kabul)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-lg">
                      <RadioGroupItem value="sevk" id="d-sevk" />
                      <Label htmlFor="d-sevk" className="flex-1 cursor-pointer flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-orange-600" />
                        Sevk (Başka Hastane)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-lg bg-red-50">
                      <RadioGroupItem value="exitus" id="d-exitus" />
                      <Label htmlFor="d-exitus" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Skull className="h-4 w-4 text-red-600" />
                        Exitus
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {dischargeData.type === 'yatan' && (
                <div>
                  <Label>Servis/Klinik *</Label>
                  <Select value={dischargeData.department} onValueChange={(v) => setDischargeData({...dischargeData, department: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Servis seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {dischargeData.type === 'sevk' && (
                <div>
                  <Label>Sevk Edilecek Hastane *</Label>
                  <Select value={dischargeData.hospital} onValueChange={(v) => setDischargeData({...dischargeData, hospital: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hastane seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitals.map(hosp => (
                        <SelectItem key={hosp} value={hosp}>{hosp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Notlar</Label>
                <Textarea
                  value={dischargeData.notes}
                  onChange={(e) => setDischargeData({...dischargeData, notes: e.target.value})}
                  placeholder="Taburcu notları, öneriler, ilaç reçetesi vb..."
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDischargeModal(false)}>
              İptal
            </Button>
            <Button
              onClick={handleDischarge}
              disabled={
                (dischargeData.type === 'yatan' && !dischargeData.department) ||
                (dischargeData.type === 'sevk' && !dischargeData.hospital)
              }
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Onayla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Trauma Team Confirmation */}
      <Dialog open={showTraumaConfirm} onOpenChange={setShowTraumaConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-orange-600 animate-pulse" />
              Travma Ekibi Aktivasyonu
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-lg mb-4">
              <p className="text-sm font-medium text-orange-900">
                Travma ekibi aktive edilecek. Tüm ekip üyeleri SMS ve bildirim ile uyarılacaktır:
              </p>
              <ul className="mt-3 space-y-1 text-sm text-orange-800">
                <li>• Acil Tıp Uzmanı</li>
                <li>• Genel Cerrahi Uzmanı</li>
                <li>• Anestezi Uzmanı</li>
                <li>• Ortopedi Uzmanı</li>
                <li>• Radyoloji Teknisyeni</li>
                <li>• Hemşire Ekibi</li>
              </ul>
            </div>

            <p className="text-sm text-gray-700">
              Travma ekibi aktivasyonunu onaylıyor musunuz?
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTraumaConfirm(false)}>
              İptal
            </Button>
            <Button
              onClick={handleTraumaActivation}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Travma Ekibini Aktive Et
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

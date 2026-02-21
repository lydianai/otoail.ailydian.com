'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Shield,
  Settings,
  Database,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  Key,
  Building2,
  UserCog,
  Lock,
  Unlock,
  FileText,
  Calendar,
  TrendingUp,
  Server,
  HardDrive,
  Cpu,
  Wifi,
  WifiOff,
  Eye,
  EyeOff,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  LogIn,
  LogOut as LogOutIcon,
  UserPlus,
  UserMinus,
  Mail,
  Phone,
  MapPin,
  FileCode,
  Zap,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// Types
interface Kullanici {
  id: string
  ad: string
  soyad: string
  email: string
  telefon: string
  rol: string
  departman: string
  durum: 'aktif' | 'pasif' | 'askida'
  sonGiris: Date | null
  olusturmaTarihi: Date
  yetkiler: string[]
}

interface Departman {
  id: string
  ad: string
  kod: string
  mudur: string
  personelSayisi: number
  aktif: boolean
}

interface DenetimKaydi {
  id: string
  kullanici: string
  islem: string
  detay: string
  ipAdresi: string
  tarih: Date
  durum: 'basarili' | 'basarisiz' | 'uyari'
}

interface APIAnahtar {
  id: string
  ad: string
  durum: 'bagli' | 'baglaniyor' | 'hata'
  sonSenkronizasyon: Date | null
  anahtarDegeri: string
  gizle: boolean
}

interface HastaneAyarlari {
  ad: string
  adres: string
  telefon: string
  email: string
  vergiNo: string
  logo: string
  yatakKapasitesi: number
  ameliyatOdalari: number
  calismaSaatleri: string
  acilTelefon: string
}

interface SistemSagligi {
  cpu: number
  bellek: number
  disk: number
  calismaZamani: number
}

// Rol ve yetki tanımları
const ROLLER = ['Admin', 'Doktor', 'Hemşire', 'Sekreter', 'Eczacı', 'Teknisyen', 'Yönetici', 'Muhasebe']

const YETKI_KATEGORILERI = {
  Hasta: ['Görüntüle', 'Oluştur', 'Düzenle', 'Sil', 'Dışa Aktar'],
  Randevu: ['Görüntüle', 'Oluştur', 'Düzenle', 'Sil', 'İptal Et'],
  Muayene: ['Görüntüle', 'Oluştur', 'Düzenle', 'Sil', 'Onayla'],
  Lab: ['Görüntüle', 'Oluştur', 'Düzenle', 'Sil', 'Sonuç Gir', 'Onayla'],
  Radyoloji: ['Görüntüle', 'Oluştur', 'Düzenle', 'Sil', 'Rapor Yaz'],
  Ameliyat: ['Görüntüle', 'Planla', 'Düzenle', 'İptal Et', 'Onayla'],
  Fatura: ['Görüntüle', 'Oluştur', 'Düzenle', 'Sil', 'Onayla', 'Gönder'],
  İlaç: ['Görüntüle', 'Reçete Yaz', 'Düzenle', 'İptal Et'],
  Stok: ['Görüntüle', 'Ekle', 'Düzenle', 'Sil', 'Transfer'],
  Raporlar: ['Görüntüle', 'Oluştur', 'Dışa Aktar', 'Yazdır'],
  Ayarlar: ['Görüntüle', 'Düzenle', 'Sistem Ayarları', 'Kullanıcı Yönetimi'],
}

// Mock data generators
function kullaniciVerisiUret(): Kullanici[] {
  const turkIsimler = [
    { ad: 'Mehmet', soyad: 'Yılmaz' },
    { ad: 'Ayşe', soyad: 'Demir' },
    { ad: 'Ahmet', soyad: 'Şahin' },
    { ad: 'Fatma', soyad: 'Kaya' },
    { ad: 'Mustafa', soyad: 'Çelik' },
    { ad: 'Zeynep', soyad: 'Arslan' },
    { ad: 'Ali', soyad: 'Öztürk' },
    { ad: 'Elif', soyad: 'Aydın' },
    { ad: 'Hasan', soyad: 'Yıldız' },
    { ad: 'Emine', soyad: 'Aksoy' },
    { ad: 'Hüseyin', soyad: 'Kara' },
    { ad: 'Hatice', soyad: 'Kurt' },
    { ad: 'İbrahim', soyad: 'Özdemir' },
    { ad: 'Merve', soyad: 'Erdoğan' },
    { ad: 'Osman', soyad: 'Güneş' },
    { ad: 'Şeyma', soyad: 'Polat' },
    { ad: 'Yunus', soyad: 'Çakır' },
    { ad: 'Büşra', soyad: 'Acar' },
    { ad: 'Kemal', soyad: 'Koç' },
    { ad: 'Seda', soyad: 'Şimşek' },
  ]

  const departmanlar = [
    'Acil Servis',
    'Kardiyoloji',
    'Nöroloji',
    'Ortopedi',
    'Genel Cerrahi',
    'Dahiliye',
    'Pediatri',
    'Kadın Doğum',
    'Göz Hastalıkları',
    'KBB',
    'Radyoloji',
    'Laboratuvar',
    'Eczane',
    'İdari İşler',
    'Muhasebe',
  ]

  return Array.from({ length: 58 }, (_, i) => {
    const kisi = turkIsimler[i % turkIsimler.length]
    const rol = ROLLER[Math.floor(Math.random() * ROLLER.length)]
    const durum: 'aktif' | 'pasif' | 'askida' =
      i % 15 === 0 ? 'pasif' : i % 20 === 0 ? 'askida' : 'aktif'

    return {
      id: `USR-${10000 + i}`,
      ad: kisi.ad,
      soyad: kisi.soyad,
      email: `${kisi.ad.toLowerCase()}.${kisi.soyad.toLowerCase()}@hastane.gov.tr`,
      telefon: `0${Math.floor(500 + Math.random() * 99)} ${Math.floor(100 + Math.random() * 899)} ${Math.floor(10 + Math.random() * 89)} ${Math.floor(10 + Math.random() * 89)}`,
      rol,
      departman: departmanlar[Math.floor(Math.random() * departmanlar.length)],
      durum,
      sonGiris: durum === 'aktif' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
      olusturmaTarihi: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      yetkiler: [],
    }
  })
}

function departmanVerisiUret(): Departman[] {
  const departmanlar = [
    { ad: 'Acil Servis', kod: 'ACL', mudur: 'Dr. Mehmet Yılmaz' },
    { ad: 'Kardiyoloji', kod: 'KRD', mudur: 'Dr. Ayşe Demir' },
    { ad: 'Nöroloji', kod: 'NRL', mudur: 'Dr. Ahmet Şahin' },
    { ad: 'Ortopedi', kod: 'ORT', mudur: 'Dr. Fatma Kaya' },
    { ad: 'Genel Cerrahi', kod: 'GCR', mudur: 'Dr. Mustafa Çelik' },
    { ad: 'Dahiliye', kod: 'DAH', mudur: 'Dr. Zeynep Arslan' },
    { ad: 'Pediatri', kod: 'PED', mudur: 'Dr. Ali Öztürk' },
    { ad: 'Kadın Doğum', kod: 'KDN', mudur: 'Dr. Elif Aydın' },
    { ad: 'Göz Hastalıkları', kod: 'GOZ', mudur: 'Dr. Hasan Yıldız' },
    { ad: 'KBB', kod: 'KBB', mudur: 'Dr. Emine Aksoy' },
    { ad: 'Radyoloji', kod: 'RAD', mudur: 'Dr. Hüseyin Kara' },
    { ad: 'Laboratuvar', kod: 'LAB', mudur: 'Hatice Kurt' },
    { ad: 'Anestezi', kod: 'ANS', mudur: 'Dr. İbrahim Özdemir' },
    { ad: 'Yoğun Bakım', kod: 'YBU', mudur: 'Dr. Merve Erdoğan' },
    { ad: 'Fizik Tedavi', kod: 'FTR', mudur: 'Dr. Osman Güneş' },
    { ad: 'Psikiyatri', kod: 'PSK', mudur: 'Dr. Şeyma Polat' },
    { ad: 'Üroloji', kod: 'URO', mudur: 'Dr. Yunus Çakır' },
    { ad: 'Dermatoloji', kod: 'DRM', mudur: 'Dr. Büşra Acar' },
    { ad: 'Eczane', kod: 'ECZ', mudur: 'Ecz. Kemal Koç' },
    { ad: 'İdari İşler', kod: 'IDR', mudur: 'Seda Şimşek' },
    { ad: 'Muhasebe', kod: 'MHS', mudur: 'Ali Yılmaz' },
    { ad: 'Bilgi İşlem', kod: 'BIL', mudur: 'Mehmet Demir' },
  ]

  return departmanlar.map((dept, i) => ({
    id: `DEPT-${1000 + i}`,
    ad: dept.ad,
    kod: dept.kod,
    mudur: dept.mudur,
    personelSayisi: Math.floor(5 + Math.random() * 45),
    aktif: i % 15 !== 0,
  }))
}

function denetimKaydiUret(): DenetimKaydi[] {
  const kullanicilar = [
    'Dr. Mehmet Yılmaz',
    'Hemş. Ayşe Demir',
    'Admin Ahmet Şahin',
    'Dr. Fatma Kaya',
    'Sekreter Zeynep Arslan',
  ]

  const islemler = [
    'Giriş Yap',
    'Çıkış Yap',
    'Hasta Oluştur',
    'Hasta Güncelle',
    'Hasta Sil',
    'Randevu Oluştur',
    'Randevu İptal',
    'Fatura Oluştur',
    'Fatura Onayla',
    'Rapor İndir',
    'Ayar Değiştir',
    'Kullanıcı Oluştur',
    'Kullanıcı Güncelle',
    'Yetki Değiştir',
    'Yedek Al',
  ]

  return Array.from({ length: 1250 }, (_, i) => {
    const islem = islemler[Math.floor(Math.random() * islemler.length)]
    const durum: 'basarili' | 'basarisiz' | 'uyari' =
      i % 50 === 0 ? 'basarisiz' : i % 30 === 0 ? 'uyari' : 'basarili'

    return {
      id: `AUD-${100000 + i}`,
      kullanici: kullanicilar[Math.floor(Math.random() * kullanicilar.length)],
      islem,
      detay: `${islem} işlemi ${durum === 'basarili' ? 'başarıyla tamamlandı' : durum === 'uyari' ? 'uyarı ile tamamlandı' : 'başarısız oldu'}`,
      ipAdresi: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      tarih: new Date(Date.now() - i * 5 * 60 * 1000),
      durum,
    }
  })
}

const formatTarih = (tarih: Date | null) => {
  if (!tarih) return 'Hiçbir zaman'
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(tarih)
}

const formatTarihKisa = (tarih: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(tarih)
}

const zamanOnce = (tarih: Date | null) => {
  if (!tarih) return 'Hiçbir zaman'
  const dakika = Math.floor((Date.now() - tarih.getTime()) / 60000)
  if (dakika < 1) return 'Şimdi'
  if (dakika < 60) return `${dakika} dk önce`
  const saat = Math.floor(dakika / 60)
  if (saat < 24) return `${saat} saat önce`
  const gun = Math.floor(saat / 24)
  if (gun < 30) return `${gun} gün önce`
  const ay = Math.floor(gun / 30)
  return `${ay} ay önce`
}

export default function AdministrationPage() {
  const router = useRouter()
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([])
  const [departmanlar, setDepartmanlar] = useState<Departman[]>([])
  const [denetimKayitlari, setDenetimKayitlari] = useState<DenetimKaydi[]>([])

  const [searchTerm, setSearchTerm] = useState('')
  const [rolFilter, setRolFilter] = useState('tumu')
  const [durumFilter, setDurumFilter] = useState('tumu')
  const [selectedTab, setSelectedTab] = useState('kullanicilar')

  // Modals
  const [createUserModal, setCreateUserModal] = useState(false)
  const [editUserModal, setEditUserModal] = useState(false)
  const [deleteUserModal, setDeleteUserModal] = useState(false)
  const [permissionsModal, setPermissionsModal] = useState(false)
  const [createDeptModal, setCreateDeptModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)

  const [selectedUser, setSelectedUser] = useState<Kullanici | null>(null)
  const [selectedDept, setSelectedDept] = useState<Departman | null>(null)

  // Form states
  const [newUser, setNewUser] = useState({
    ad: '',
    soyad: '',
    email: '',
    telefon: '',
    rol: 'Sekreter',
    departman: '',
    sifre: '',
    yetkiler: [] as string[],
  })

  const [newDept, setNewDept] = useState({
    ad: '',
    kod: '',
    mudur: '',
  })

  const [hastaneAyarlari, setHastaneAyarlari] = useState<HastaneAyarlari>({
    ad: 'Ankara Şehir Hastanesi',
    adres: 'Üniversiteler Mahallesi, Bilkent Blv. No:1, 06800 Çankaya/Ankara',
    telefon: '0312 552 60 00',
    email: 'bilgi@ankarashehir.saglik.gov.tr',
    vergiNo: '1234567890',
    logo: '',
    yatakKapasitesi: 3704,
    ameliyatOdalari: 142,
    calismaSaatleri: '7/24',
    acilTelefon: '112',
  })

  const [apiAnahtarlari, setApiAnahtarlari] = useState<APIAnahtar[]>([
    {
      id: 'api-1',
      ad: 'e-Nabız API',
      durum: 'bagli',
      sonSenkronizasyon: new Date(Date.now() - 5 * 60000),
      anahtarDegeri: 'enb_9d8f7a6s5d4f3a2s1d0f9a8s7d6f5a4s',
      gizle: true,
    },
    {
      id: 'api-2',
      ad: 'Medula API',
      durum: 'bagli',
      sonSenkronizasyon: new Date(Date.now() - 12 * 60000),
      anahtarDegeri: 'med_3s2d1f0a9s8d7f6a5s4d3f2a1s0d9f8a',
      gizle: true,
    },
    {
      id: 'api-3',
      ad: 'İTS API',
      durum: 'bagli',
      sonSenkronizasyon: new Date(Date.now() - 45 * 60000),
      anahtarDegeri: 'its_7f6a5s4d3f2a1s0d9f8a7s6d5f4a3s2d',
      gizle: true,
    },
    {
      id: 'api-4',
      ad: 'MHRS API',
      durum: 'hata',
      sonSenkronizasyon: new Date(Date.now() - 120 * 60000),
      anahtarDegeri: 'mhrs_1a0s9d8f7a6s5d4f3a2s1d0f9a8s7d6f',
      gizle: true,
    },
  ])

  const [sistemSagligi, setSistemSagligi] = useState<SistemSagligi>({
    cpu: 42,
    bellek: 68,
    disk: 54,
    calismaZamani: 127,
  })

  const [yedeklemeler, setYedeklemeler] = useState([
    {
      id: 'backup-1',
      tarih: new Date(Date.now() - 6 * 60 * 60 * 1000),
      tip: 'Tam Yedekleme',
      boyut: '2.4 GB',
      durum: 'Başarılı',
    },
    {
      id: 'backup-2',
      tarih: new Date(Date.now() - 30 * 60 * 60 * 1000),
      tip: 'Artımlı Yedekleme',
      boyut: '450 MB',
      durum: 'Başarılı',
    },
    {
      id: 'backup-3',
      tarih: new Date(Date.now() - 54 * 60 * 60 * 1000),
      tip: 'Diferansiyel Yedekleme',
      boyut: '1.2 GB',
      durum: 'Başarılı',
    },
  ])

  useEffect(() => {
    const token = localStorage.getItem('ghp_token_tr')
    if (!token) {
      router.push('/tr/login')
      return
    }

    setKullanicilar(kullaniciVerisiUret())
    setDepartmanlar(departmanVerisiUret())
    setDenetimKayitlari(denetimKaydiUret())

    // Simulate system health updates
    const interval = setInterval(() => {
      setSistemSagligi({
      cpu: 30 + Math.random() * 40,
      bellek: 50 + Math.random() * 30,
      disk: 50 + Math.random() * 20,
      calismaZamani: 127,
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [router])

  const filteredKullanicilar = kullanicilar.filter(k => {
    const matchesSearch =
      k.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.soyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.departman.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRol = rolFilter === 'tumu' || k.rol === rolFilter
    const matchesDurum = durumFilter === 'tumu' || k.durum === durumFilter

    return matchesSearch && matchesRol && matchesDurum
  })

  const handleCreateUser = () => {
    const yeniKullanici: Kullanici = {
      id: `USR-${10000 + kullanicilar.length}`,
      ad: newUser.ad,
      soyad: newUser.soyad,
      email: newUser.email,
      telefon: newUser.telefon,
      rol: newUser.rol,
      departman: newUser.departman,
      durum: 'aktif',
      sonGiris: null,
      olusturmaTarihi: new Date(),
      yetkiler: newUser.yetkiler,
    }
    setKullanicilar([...kullanicilar, yeniKullanici])
    setCreateUserModal(false)
    setNewUser({
      ad: '',
      soyad: '',
      email: '',
      telefon: '',
      rol: 'Sekreter',
      departman: '',
      sifre: '',
      yetkiler: [],
    })
  }

  const handleUpdateUser = () => {
    if (!selectedUser) return
    setKullanicilar(kullanicilar.map(k => k.id === selectedUser.id ? selectedUser : k))
    setEditUserModal(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    setKullanicilar(kullanicilar.filter(k => k.id !== selectedUser.id))
    setDeleteUserModal(false)
    setSelectedUser(null)
  }

  const handleToggleUserStatus = (user: Kullanici) => {
    const newDurum = user.durum === 'aktif' ? 'pasif' : 'aktif'
    setKullanicilar(kullanicilar.map(k =>
      k.id === user.id ? { ...k, durum: newDurum } : k
    ))
  }

  const handleCreateDept = () => {
    const yeniDept: Departman = {
      id: `DEPT-${1000 + departmanlar.length}`,
      ad: newDept.ad,
      kod: newDept.kod,
      mudur: newDept.mudur,
      personelSayisi: 0,
      aktif: true,
    }
    setDepartmanlar([...departmanlar, yeniDept])
    setCreateDeptModal(false)
    setNewDept({ ad: '', kod: '', mudur: '' })
  }

  const handleBackup = (tip: string) => {
    const yeniYedek = {
      id: `backup-${Date.now()}`,
      tarih: new Date(),
      tip,
      boyut: `${(Math.random() * 3).toFixed(1)} GB`,
      durum: 'Başarılı',
    }
    setYedeklemeler([yeniYedek, ...yedeklemeler])
  }

  const handleTestAPI = (apiId: string) => {
    setApiAnahtarlari(apiAnahtarlari.map(api =>
      api.id === apiId ? { ...api, durum: 'baglaniyor' as const } : api
    ))

    setTimeout(() => {
      setApiAnahtarlari(apiAnahtarlari.map(api =>
      api.id === apiId ? {
        ...api,
        durum: 'bagli' as const,
        sonSenkronizasyon: new Date()
      } : api
      ))
    }, 2000)
  }

  const toggleAPIKeyVisibility = (apiId: string) => {
    setApiAnahtarlari(apiAnahtarlari.map(api =>
      api.id === apiId ? { ...api, gizle: !api.gizle } : api
    ))
  }

  const aktifKullanicilar = kullanicilar.filter(k => k.durum === 'aktif').length
  const sonYedek = yedeklemeler[0]

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Settings className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Sistem Yönetimi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    Kullanıcı, Rol, Yetki ve Sistem Ayarları Merkezi
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setCreateUserModal(true)}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-500/30"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Yeni Kullanıcı
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">Toplam</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{kullanicilar.length}</div>
              <p className="text-sm text-gray-600 font-medium mt-1">Kayıtlı Kullanıcı</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">Aktif</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{aktifKullanicilar}</div>
              <p className="text-sm text-gray-600 font-medium mt-1">Aktif Kullanıcı</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">Birimler</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{departmanlar.length}</div>
              <p className="text-sm text-gray-600 font-medium mt-1">Departman</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Database className="h-6 w-6 text-orange-600" />
                </div>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">Yedek</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{zamanOnce(sonYedek.tarih)}</div>
              <p className="text-sm text-gray-600 font-medium mt-1">Son Yedekleme</p>
            </CardContent>
          </Card>
        </div>

        {/* System Health Monitoring */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Sistem Sağlığı</CardTitle>
                <CardDescription>Gerçek zamanlı sistem performans izleme</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-gray-700">CPU Kullanımı</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {sistemSagligi.cpu.toFixed(1)}%
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      sistemSagligi.cpu > 80 ? "bg-red-500" :
                      sistemSagligi.cpu > 60 ? "bg-orange-500" : "bg-green-500"
                    )}
                    style={{ width: `${sistemSagligi.cpu}%` }}
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-purple-600" />
                    <span className="font-bold text-gray-700">Bellek Kullanımı</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {sistemSagligi.bellek.toFixed(1)}%
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      sistemSagligi.bellek > 80 ? "bg-red-500" :
                      sistemSagligi.bellek > 60 ? "bg-orange-500" : "bg-green-500"
                    )}
                    style={{ width: `${sistemSagligi.bellek}%` }}
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-orange-600" />
                    <span className="font-bold text-gray-700">Disk Kullanımı</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {sistemSagligi.disk.toFixed(1)}%
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      sistemSagligi.disk > 80 ? "bg-red-500" :
                      sistemSagligi.disk > 60 ? "bg-orange-500" : "bg-green-500"
                    )}
                    style={{ width: `${sistemSagligi.disk}%` }}
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-gray-700">Çalışma Süresi</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {sistemSagligi.calismaZamani}
                </div>
                <p className="text-sm text-gray-600 font-medium">Gün</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid h-auto bg-white border-2 border-gray-200 p-1 rounded-xl shadow-sm">
            <TabsTrigger value="kullanicilar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white py-3">
              <Users className="h-4 w-4 mr-2" />
              Kullanıcılar
            </TabsTrigger>
            <TabsTrigger value="yetkiler" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white py-3">
              <Shield className="h-4 w-4 mr-2" />
              Yetkiler
            </TabsTrigger>
            <TabsTrigger value="departmanlar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white py-3">
              <Building2 className="h-4 w-4 mr-2" />
              Departmanlar
            </TabsTrigger>
            <TabsTrigger value="ayarlar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white py-3">
              <Settings className="h-4 w-4 mr-2" />
              Sistem Ayarları
            </TabsTrigger>
            <TabsTrigger value="denetim" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white py-3">
              <FileText className="h-4 w-4 mr-2" />
              Denetim Logları
            </TabsTrigger>
            <TabsTrigger value="yedekleme" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white py-3">
              <Database className="h-4 w-4 mr-2" />
              Yedekleme
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="kullanicilar" className="space-y-6">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">Kullanıcı Yönetimi</CardTitle>
                    <CardDescription>Sistem kullanıcılarını görüntüle ve yönet</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 sm:w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Kullanıcı ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-2"
                      />
                    </div>
                    <Select value={rolFilter} onValueChange={setRolFilter}>
                      <SelectTrigger className="w-full sm:w-40 border-2">
                        <SelectValue placeholder="Rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tumu">Tüm Roller</SelectItem>
                        {ROLLER.map(rol => (
                          <SelectItem key={rol} value={rol}>{rol}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={durumFilter} onValueChange={setDurumFilter}>
                      <SelectTrigger className="w-full sm:w-40 border-2">
                        <SelectValue placeholder="Durum" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tumu">Tüm Durumlar</SelectItem>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="pasif">Pasif</SelectItem>
                        <SelectItem value="askida">Askıda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 font-bold text-gray-700">Ad Soyad</th>
                        <th className="text-left py-4 px-4 font-bold text-gray-700">Email</th>
                        <th className="text-left py-4 px-4 font-bold text-gray-700">Rol</th>
                        <th className="text-left py-4 px-4 font-bold text-gray-700">Departman</th>
                        <th className="text-left py-4 px-4 font-bold text-gray-700">Durum</th>
                        <th className="text-left py-4 px-4 font-bold text-gray-700">Son Giriş</th>
                        <th className="text-right py-4 px-4 font-bold text-gray-700">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKullanicilar.slice(0, 20).map(kullanici => (
                        <tr key={kullanici.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-bold text-gray-900">{kullanici.ad} {kullanici.soyad}</div>
                              <div className="text-xs text-gray-500 font-mono">{kullanici.id}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-700">{kullanici.email}</div>
                            <div className="text-xs text-gray-500">{kullanici.telefon}</div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              {kullanici.rol}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm font-medium text-gray-700">{kullanici.departman}</span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={cn(
                              kullanici.durum === 'aktif' ? 'bg-green-100 text-green-700 border-green-200' :
                              kullanici.durum === 'pasif' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                              'bg-orange-100 text-orange-700 border-orange-200'
                            )}>
                              {kullanici.durum === 'aktif' ? 'Aktif' : kullanici.durum === 'pasif' ? 'Pasif' : 'Askıda'}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-700">{zamanOnce(kullanici.sonGiris)}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedUser(kullanici)
                                  setEditUserModal(true)
                                }}
                                className="border-2"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleToggleUserStatus(kullanici)}
                                className="border-2"
                              >
                                {kullanici.durum === 'aktif' ? (
                                  <Lock className="h-4 w-4 text-orange-600" />
                                ) : (
                                  <Unlock className="h-4 w-4 text-green-600" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedUser(kullanici)
                                  setDeleteUserModal(true)
                                }}
                                className="border-2 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredKullanicilar.length > 20 && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 font-medium">
                      {filteredKullanicilar.length - 20} kullanıcı daha gösteriliyor...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="yetkiler" className="space-y-6">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Rol Bazlı Yetki Matrisi</CardTitle>
                <CardDescription>Her rol için yetkileri görüntüle ve düzenle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(YETKI_KATEGORILERI).map(([kategori, yetkiler]) => (
                    <div key={kategori} className="p-6 border-2 border-gray-100 rounded-xl bg-gray-50/30">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="h-5 w-5 text-red-600" />
                        <h3 className="text-lg font-bold text-gray-900">{kategori}</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b-2 border-gray-200">
                              <th className="text-left py-3 px-3 font-bold text-gray-700 min-w-[120px]">Yetki</th>
                              {ROLLER.map(rol => (
                                <th key={rol} className="text-center py-3 px-3 font-bold text-gray-700 min-w-[100px]">
                                  {rol}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {yetkiler.map(yetki => (
                              <tr key={yetki} className="border-b border-gray-100">
                                <td className="py-3 px-3 font-medium text-gray-700">{yetki}</td>
                                {ROLLER.map(rol => {
                                  // Mock permission logic
                                  const hasPermission =
                                    (rol === 'Admin') ||
                                    (rol === 'Yönetici' && !yetki.includes('Sil')) ||
                                    (rol === 'Doktor' && (kategori === 'Hasta' || kategori === 'Muayene' || kategori === 'Lab' || kategori === 'Radyoloji')) ||
                                    (rol === 'Hemşire' && (kategori === 'Hasta' || kategori === 'Muayene') && yetki !== 'Sil') ||
                                    (rol === 'Eczacı' && kategori === 'İlaç') ||
                                    (rol === 'Teknisyen' && (kategori === 'Lab' || kategori === 'Radyoloji')) ||
                                    (rol === 'Sekreter' && (kategori === 'Hasta' || kategori === 'Randevu') && yetki !== 'Sil') ||
                                    (rol === 'Muhasebe' && kategori === 'Fatura')

                                  return (
                                    <td key={rol} className="py-3 px-3 text-center">
                                      <div className="flex justify-center">
                                        <Checkbox
                                          checked={hasPermission}
                                          className="border-2"
                                        />
                                      </div>
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departmanlar" className="space-y-6">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Departman Yönetimi</CardTitle>
                    <CardDescription>Hastane departmanlarını yönet</CardDescription>
                  </div>
                  <Button
                    onClick={() => setCreateDeptModal(true)}
                    className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Yeni Departman
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departmanlar.map(dept => (
                    <div
                      key={dept.id}
                      className={cn(
                        "p-5 rounded-xl border-2 transition-all hover:shadow-lg",
                        dept.aktif ? "border-gray-100 bg-white" : "border-gray-200 bg-gray-50 opacity-60"
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{dept.ad}</h3>
                            <Badge variant="outline" className="text-xs">
                              {dept.kod}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 font-medium">{dept.mudur}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="border-2">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCog className="h-4 w-4 mr-2" />
                              Personel
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span className="font-medium">{dept.personelSayisi} Personel</span>
                        </div>
                        <Badge className={cn(
                          dept.aktif ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"
                        )}>
                          {dept.aktif ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="ayarlar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hospital Settings */}
              <Card className="border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Hastane Ayarları</CardTitle>
                  <CardDescription>Genel hastane bilgileri ve yapılandırma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Hastane Adı</Label>
                    <Input
                      value={hastaneAyarlari.ad}
                      onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, ad: e.target.value })}
                      className="border-2"
                    />
                  </div>
                  <div>
                    <Label>Adres</Label>
                    <Textarea
                      value={hastaneAyarlari.adres}
                      onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, adres: e.target.value })}
                      className="border-2"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Telefon</Label>
                      <Input
                        value={hastaneAyarlari.telefon}
                        onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, telefon: e.target.value })}
                        className="border-2"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={hastaneAyarlari.email}
                        onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, email: e.target.value })}
                        className="border-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Vergi No</Label>
                    <Input
                      value={hastaneAyarlari.vergiNo}
                      onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, vergiNo: e.target.value })}
                      className="border-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Yatak Kapasitesi</Label>
                      <Input
                        type="number"
                        value={hastaneAyarlari.yatakKapasitesi}
                        onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, yatakKapasitesi: parseInt(e.target.value) })}
                        className="border-2"
                      />
                    </div>
                    <div>
                      <Label>Ameliyat Odası</Label>
                      <Input
                        type="number"
                        value={hastaneAyarlari.ameliyatOdalari}
                        onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, ameliyatOdalari: parseInt(e.target.value) })}
                        className="border-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Çalışma Saatleri</Label>
                      <Input
                        value={hastaneAyarlari.calismaSaatleri}
                        onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, calismaSaatleri: e.target.value })}
                        className="border-2"
                      />
                    </div>
                    <div>
                      <Label>Acil Telefon</Label>
                      <Input
                        value={hastaneAyarlari.acilTelefon}
                        onChange={(e) => setHastaneAyarlari({ ...hastaneAyarlari, acilTelefon: e.target.value })}
                        className="border-2"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Ayarları Kaydet
                  </Button>
                </CardContent>
              </Card>

              {/* API Keys Management */}
              <Card className="border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">API Anahtar Yönetimi</CardTitle>
                  <CardDescription>Entegrasyon API anahtarları ve bağlantı durumu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {apiAnahtarlari.map(api => (
                    <div key={api.id} className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/30">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            api.durum === 'bagli' ? "bg-green-100" :
                            api.durum === 'baglaniyor' ? "bg-orange-100" : "bg-red-100"
                          )}>
                            {api.durum === 'bagli' ? (
                              <Wifi className="h-5 w-5 text-green-600" />
                            ) : api.durum === 'baglaniyor' ? (
                              <RefreshCw className="h-5 w-5 text-orange-600 animate-spin" />
                            ) : (
                              <WifiOff className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{api.ad}</h4>
                            <p className="text-xs text-gray-600">
                              Son senkronizasyon: {zamanOnce(api.sonSenkronizasyon)}
                            </p>
                          </div>
                        </div>
                        <Badge className={cn(
                          api.durum === 'bagli' ? "bg-green-100 text-green-700 border-green-200" :
                          api.durum === 'baglaniyor' ? "bg-orange-100 text-orange-700 border-orange-200" :
                          "bg-red-100 text-red-700 border-red-200"
                        )}>
                          {api.durum === 'bagli' ? 'Bağlı' : api.durum === 'baglaniyor' ? 'Bağlanıyor' : 'Hata'}
                        </Badge>
                      </div>
                      <div className="mb-3">
                        <Label className="text-xs">API Anahtarı</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type={api.gizle ? "password" : "text"}
                            value={api.anahtarDegeri}
                            readOnly
                            className="font-mono text-xs border-2"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleAPIKeyVisibility(api.id)}
                            className="border-2"
                          >
                            {api.gizle ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTestAPI(api.id)}
                          disabled={api.durum === 'baglaniyor'}
                          className="flex-1 border-2"
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Bağlantıyı Test Et
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="denetim" className="space-y-6">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Sistem Denetim Logları</CardTitle>
                    <CardDescription>Tüm sistem aktivitelerinin detaylı kaydı</CardDescription>
                  </div>
                  <Button variant="outline" className="border-2">
                    <Download className="h-4 w-4 mr-2" />
                    Dışa Aktar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-3 font-bold text-gray-700">Tarih/Saat</th>
                        <th className="text-left py-3 px-3 font-bold text-gray-700">Kullanıcı</th>
                        <th className="text-left py-3 px-3 font-bold text-gray-700">İşlem</th>
                        <th className="text-left py-3 px-3 font-bold text-gray-700">Detay</th>
                        <th className="text-left py-3 px-3 font-bold text-gray-700">IP Adresi</th>
                        <th className="text-left py-3 px-3 font-bold text-gray-700">Durum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {denetimKayitlari.slice(0, 50).map(kayit => (
                        <tr key={kayit.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-3">
                            <div className="text-sm font-medium text-gray-900">
                              {formatTarih(kayit.tarih)}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-sm font-medium text-gray-700">{kayit.kullanici}</span>
                          </td>
                          <td className="py-3 px-3">
                            <Badge variant="outline" className="text-xs">
                              {kayit.islem}
                            </Badge>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-sm text-gray-600">{kayit.detay}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-sm font-mono text-gray-600">{kayit.ipAdresi}</span>
                          </td>
                          <td className="py-3 px-3">
                            <Badge className={cn(
                              kayit.durum === 'basarili' ? 'bg-green-100 text-green-700 border-green-200' :
                              kayit.durum === 'uyari' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                              'bg-red-100 text-red-700 border-red-200'
                            )}>
                              {kayit.durum === 'basarili' ? 'Başarılı' : kayit.durum === 'uyari' ? 'Uyarı' : 'Başarısız'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 font-medium">
                    Toplam {denetimKayitlari.length.toLocaleString('tr-TR')} kayıt bulundu (İlk 50 gösteriliyor)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Tab */}
          <TabsContent value="yedekleme" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleBackup('Tam Yedekleme')}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-blue-100 rounded-2xl mb-4">
                      <Database className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Tam Yedekleme</h3>
                    <p className="text-sm text-gray-600 mb-4">Tüm veritabanını yedekle</p>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Başlat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleBackup('Artımlı Yedekleme')}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-green-100 rounded-2xl mb-4">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Artımlı Yedekleme</h3>
                    <p className="text-sm text-gray-600 mb-4">Sadece değişiklikleri yedekle</p>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Başlat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleBackup('Diferansiyel Yedekleme')}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-purple-100 rounded-2xl mb-4">
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Diferansiyel Yedekleme</h3>
                    <p className="text-sm text-gray-600 mb-4">Son tam yedekten beri değişenler</p>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Başlat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Yedekleme Geçmişi</CardTitle>
                    <CardDescription>Son yapılan yedeklemeler</CardDescription>
                  </div>
                  <Button variant="outline" className="border-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Geri Yükle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {yedeklemeler.map(yedek => (
                    <div key={yedek.id} className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/30 hover:border-gray-200 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 rounded-xl">
                            <Database className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{yedek.tip}</h4>
                            <p className="text-sm text-gray-600">{formatTarih(yedek.tarih)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-gray-900">{yedek.boyut}</div>
                            <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">
                              {yedek.durum}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="border-2">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Upload className="h-4 w-4 mr-2" />
                                Geri Yükle
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                İndir
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Sil
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create User Modal */}
      <Dialog open={createUserModal} onOpenChange={setCreateUserModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Yeni Kullanıcı Oluştur</DialogTitle>
            <DialogDescription>
              Sisteme yeni kullanıcı ekle ve yetkilerini tanımla
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ad</Label>
                <Input
                  value={newUser.ad}
                  onChange={(e) => setNewUser({ ...newUser, ad: e.target.value })}
                  placeholder="Mehmet"
                  className="border-2"
                />
              </div>
              <div>
                <Label>Soyad</Label>
                <Input
                  value={newUser.soyad}
                  onChange={(e) => setNewUser({ ...newUser, soyad: e.target.value })}
                  placeholder="Yılmaz"
                  className="border-2"
                />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="mehmet.yilmaz@hastane.gov.tr"
                className="border-2"
              />
            </div>
            <div>
              <Label>Telefon</Label>
              <Input
                value={newUser.telefon}
                onChange={(e) => setNewUser({ ...newUser, telefon: e.target.value })}
                placeholder="0555 123 45 67"
                className="border-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Rol</Label>
                <Select value={newUser.rol} onValueChange={(value) => setNewUser({ ...newUser, rol: value })}>
                  <SelectTrigger className="border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLLER.map(rol => (
                      <SelectItem key={rol} value={rol}>{rol}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Departman</Label>
                <Select value={newUser.departman} onValueChange={(value) => setNewUser({ ...newUser, departman: value })}>
                  <SelectTrigger className="border-2">
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmanlar.filter(d => d.aktif).map(dept => (
                      <SelectItem key={dept.id} value={dept.ad}>{dept.ad}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Şifre</Label>
              <Input
                type="password"
                value={newUser.sifre}
                onChange={(e) => setNewUser({ ...newUser, sifre: e.target.value })}
                placeholder="••••••••"
                className="border-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateUserModal(false)} className="border-2">
              İptal
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={!newUser.ad || !newUser.soyad || !newUser.email || !newUser.departman}
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Kullanıcı Oluştur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={editUserModal} onOpenChange={setEditUserModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Kullanıcı Düzenle</DialogTitle>
            <DialogDescription>
              Kullanıcı bilgilerini ve yetkilerini güncelle
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ad</Label>
                  <Input
                    value={selectedUser.ad}
                    onChange={(e) => setSelectedUser({ ...selectedUser, ad: e.target.value })}
                    className="border-2"
                  />
                </div>
                <div>
                  <Label>Soyad</Label>
                  <Input
                    value={selectedUser.soyad}
                    onChange={(e) => setSelectedUser({ ...selectedUser, soyad: e.target.value })}
                    className="border-2"
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="border-2"
                />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input
                  value={selectedUser.telefon}
                  onChange={(e) => setSelectedUser({ ...selectedUser, telefon: e.target.value })}
                  className="border-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rol</Label>
                  <Select value={selectedUser.rol} onValueChange={(value) => setSelectedUser({ ...selectedUser, rol: value })}>
                    <SelectTrigger className="border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLLER.map(rol => (
                        <SelectItem key={rol} value={rol}>{rol}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Durum</Label>
                  <Select value={selectedUser.durum} onValueChange={(value: any) => setSelectedUser({ ...selectedUser, durum: value })}>
                    <SelectTrigger className="border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aktif">Aktif</SelectItem>
                      <SelectItem value="pasif">Pasif</SelectItem>
                      <SelectItem value="askida">Askıda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserModal(false)} className="border-2">
              İptal
            </Button>
            <Button
              onClick={handleUpdateUser}
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={deleteUserModal} onOpenChange={setDeleteUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl text-red-600">Kullanıcıyı Sil</DialogTitle>
            <DialogDescription>
              Bu işlem geri alınamaz. Kullanıcı kalıcı olarak silinecek.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-sm text-gray-700 mb-2">
                  <strong className="text-gray-900">{selectedUser.ad} {selectedUser.soyad}</strong> kullanıcısını silmek üzeresiniz.
                </p>
                <p className="text-sm text-gray-600">
                  Email: {selectedUser.email}<br />
                  Rol: {selectedUser.rol}<br />
                  Departman: {selectedUser.departman}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUserModal(false)} className="border-2">
              İptal
            </Button>
            <Button
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Evet, Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Department Modal */}
      <Dialog open={createDeptModal} onOpenChange={setCreateDeptModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Yeni Departman Oluştur</DialogTitle>
            <DialogDescription>
              Hastaneye yeni departman ekle
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Departman Adı</Label>
              <Input
                value={newDept.ad}
                onChange={(e) => setNewDept({ ...newDept, ad: e.target.value })}
                placeholder="Kardiyoloji"
                className="border-2"
              />
            </div>
            <div>
              <Label>Departman Kodu</Label>
              <Input
                value={newDept.kod}
                onChange={(e) => setNewDept({ ...newDept, kod: e.target.value.toUpperCase() })}
                placeholder="KRD"
                className="border-2"
                maxLength={3}
              />
            </div>
            <div>
              <Label>Müdür</Label>
              <Input
                value={newDept.mudur}
                onChange={(e) => setNewDept({ ...newDept, mudur: e.target.value })}
                placeholder="Dr. Mehmet Yılmaz"
                className="border-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDeptModal(false)} className="border-2">
              İptal
            </Button>
            <Button
              onClick={handleCreateDept}
              disabled={!newDept.ad || !newDept.kod || !newDept.mudur}
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Departman Oluştur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    
  )
}

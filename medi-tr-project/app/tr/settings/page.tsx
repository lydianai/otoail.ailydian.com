'use client'

import { useState, useRef } from 'react'
import {
  Settings,
  User,
  Bell,
  Lock,
  Globe,
  Eye,
  Palette,
  Save,
  Shield,
  Mail,
  Phone,
  Upload,
  Camera,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Monitor,
  Sun,
  Moon,
  Smartphone,
  Laptop,
  MapPin,
  Clock,
  Calendar,
  Hash,
  LogOut,
  Keyboard,
  FileSignature,
  Activity,
  Users as UsersIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PasswordStrength {
  score: number
  label: string
  color: string
  criteria: {
    minLength: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
}

interface ActiveSession {
  id: string
  device: string
  browser: string
  ip: string
  location: string
  lastActive: Date
  current: boolean
}

export default function AyarlarPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'appearance' | 'privacy' | 'advanced'>('profile')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const signatureInputRef = useRef<HTMLInputElement>(null)

  // User data - Real Turkish doctor profile
  const [kullanici, setKullanici] = useState({
    ad: 'Mehmet Can',
    soyad: 'Yılmaz',
    email: 'mehmet.yilmaz@hastane.gov.tr',
    telefon: '+90 532 456 7890',
    departman: 'Kardiyoloji',
    pozisyon: 'Başhekim Yardımcısı',
    sicilNo: 'DR-2018-1453',
    diplomaNo: 'TR-115234',
    avatarUrl: '',
  })

  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  // Password strength calculation
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    const criteria = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(criteria).filter(Boolean).length
    let label = 'Çok Zayıf'
    let color = 'bg-red-500'

    if (score === 5) {
      label = 'Çok Güçlü'
      color = 'bg-green-500'
    } else if (score === 4) {
      label = 'Güçlü'
      color = 'bg-blue-500'
    } else if (score === 3) {
      label = 'Orta'
      color = 'bg-yellow-500'
    } else if (score === 2) {
      label = 'Zayıf'
      color = 'bg-orange-500'
    }

    return { score, label, color, criteria }
  }

  const passwordStrength = calculatePasswordStrength(passwords.new)

  // Theme settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')
  const [language, setLanguage] = useState<'tr' | 'en'>('tr')

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: {
      randevuHatirlat: true,
      acilDurum: true,
      sistemBildirim: true,
      labSonuc: true,
      raporHazir: true,
      gorevAtama: true,
    },
    sms: {
      randevuHatirlat: true,
      acilDurum: true,
      sistemBildirim: false,
      labSonuc: true,
      raporHazir: false,
      gorevAtama: true,
    },
    push: {
      randevuHatirlat: true,
      acilDurum: true,
      sistemBildirim: true,
      labSonuc: true,
      raporHazir: true,
      gorevAtama: true,
    },
    inApp: {
      randevuHatirlat: true,
      acilDurum: true,
      sistemBildirim: true,
      labSonuc: true,
      raporHazir: true,
      gorevAtama: true,
    },
    emailFrequency: 'instant' as 'instant' | 'daily' | 'weekly',
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'department' as 'public' | 'department' | 'private',
    contactInfoVisibility: 'department' as 'public' | 'department' | 'private',
    activityStatus: true,
  })

  // 2FA settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const backupCodes = ['1234-5678', '9012-3456', '7890-1234', '4567-8901', '2345-6789']

  // Active sessions
  const [sessions] = useState<ActiveSession[]>([
    {
      id: '1',
      device: 'Windows PC',
      browser: 'Chrome 120',
      ip: '192.168.1.105',
      location: 'İstanbul, Türkiye',
      lastActive: new Date(),
      current: true,
    },
    {
      id: '2',
      device: 'iPhone 15 Pro',
      browser: 'Safari Mobile',
      ip: '192.168.1.247',
      location: 'İstanbul, Türkiye',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      current: false,
    },
    {
      id: '3',
      device: 'iPad Air',
      browser: 'Safari',
      ip: '192.168.1.158',
      location: 'İstanbul, Türkiye',
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      current: false,
    },
  ])

  // Regional settings
  const [regional, setRegional] = useState({
    timezone: 'Europe/Istanbul',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: '24h' as '24h' | '12h',
    numberFormat: 'tr' as 'tr' | 'en',
  })

  // Keyboard shortcuts
  const [shortcuts, setShortcuts] = useState([
    { action: 'Yeni Hasta', current: 'Ctrl+N', editing: false },
    { action: 'Arama', current: 'Ctrl+F', editing: false },
    { action: 'Kaydet', current: 'Ctrl+S', editing: false },
    { action: 'Yazdır', current: 'Ctrl+P', editing: false },
  ])

  // Account statistics
  const accountStats = {
    created: new Date('2018-03-15'),
    lastLogin: new Date(Date.now() - 30 * 60 * 1000),
    totalSessions: 1247,
    passwordLastChanged: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  }

  const handleSaveProfile = () => {
    setSuccessMessage('Profil bilgileriniz başarıyla güncellendi!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('Yeni şifreler eşleşmiyor!')
      return
    }
    if (passwordStrength.score < 5) {
      alert('Lütfen tüm şifre gereksinimlerini karşılayan güçlü bir şifre kullanın!')
      return
    }
    setSuccessMessage('Şifreniz başarıyla değiştirildi!')
    setShowSuccessAlert(true)
    setPasswords({ current: '', new: '', confirm: '' })
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSaveNotifications = () => {
    setSuccessMessage('Bildirim tercihleri kaydedildi!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSaveAppearance = () => {
    setSuccessMessage('Görünüm ayarları kaydedildi!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSavePrivacy = () => {
    setSuccessMessage('Gizlilik ayarları güncellendi!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSaveAdvanced = () => {
    setSuccessMessage('Gelişmiş ayarlar kaydedildi!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
      setKullanici({ ...kullanici, avatarUrl: reader.result as string })
      setSuccessMessage('Profil fotoğrafı yüklendi!')
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 3000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSuccessMessage('Dijital imza yüklendi!')
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 3000)
    }
  }

  const handleLogoutSession = (sessionId: string) => {
    setSuccessMessage(`Oturum sonlandırıldı!`)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 1) return 'Şimdi'
    if (minutes < 60) return `${minutes} dk önce`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} saat önce`
    const days = Math.floor(hours / 24)
    return `${days} gün önce`
  }

  return (
    
      <div className="min-h-screen">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border-2 border-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-bold">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Settings className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Ayarlar
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">Kullanıcı Profili & Sistem Tercihleri</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
              {/* Profile Card */}
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {kullanici.avatarUrl ? (
                    <img
                      src={kullanici.avatarUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-red-200 shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-red-200">
                      {kullanici.ad[0]}{kullanici.soyad[0]}
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-gray-200 hover:border-red-300 transition-all"
                  >
                    <Camera className="h-4 w-4 text-gray-700" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{kullanici.ad} {kullanici.soyad}</h3>
                <p className="text-sm text-gray-600 mt-1">{kullanici.pozisyon}</p>
                <p className="text-xs text-gray-500 mt-0.5">{kullanici.departman}</p>
                <Badge className="mt-2 bg-green-100 text-green-700 border-green-300">Aktif</Badge>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'profile'
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <User className="h-5 w-5" />
                  Profil Bilgileri
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'security'
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Lock className="h-5 w-5" />
                  Güvenlik
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'notifications'
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Bell className="h-5 w-5" />
                  Bildirimler
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'appearance'
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Palette className="h-5 w-5" />
                  Görünüm
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'privacy'
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Eye className="h-5 w-5" />
                  Gizlilik
                </button>
                <button
                  onClick={() => setActiveTab('advanced')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'advanced'
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Settings className="h-5 w-5" />
                  Gelişmiş
                </button>
              </div>

              {/* Account Stats */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Hesap İstatistikleri</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kayıt Tarihi:</span>
                    <span className="font-semibold text-gray-900">{formatDate(accountStats.created)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Son Giriş:</span>
                    <span className="font-semibold text-gray-900">{getTimeAgo(accountStats.lastLogin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toplam Oturum:</span>
                    <span className="font-semibold text-gray-900">{accountStats.totalSessions.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Şifre Değişimi:</span>
                    <span className="font-semibold text-gray-900">{getTimeAgo(accountStats.passwordLastChanged)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-red-600" />
                      Kişisel Bilgiler
                    </CardTitle>
                    <CardDescription>
                      Adınız, iletişim bilgileriniz ve pozisyon detayları
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Ad</label>
                          <Input
                            value={kullanici.ad}
                            onChange={(e) => setKullanici({ ...kullanici, ad: e.target.value })}
                            className="border-2"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Soyad</label>
                          <Input
                            value={kullanici.soyad}
                            onChange={(e) => setKullanici({ ...kullanici, soyad: e.target.value })}
                            className="border-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          E-posta Adresi
                        </label>
                        <Input
                          type="email"
                          value={kullanici.email}
                          onChange={(e) => setKullanici({ ...kullanici, email: e.target.value })}
                          className="border-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Telefon Numarası
                        </label>
                        <Input
                          type="tel"
                          value={kullanici.telefon}
                          onChange={(e) => setKullanici({ ...kullanici, telefon: e.target.value })}
                          className="border-2"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Departman</label>
                          <select
                            value={kullanici.departman}
                            onChange={(e) => setKullanici({ ...kullanici, departman: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                          >
                            <option>Kardiyoloji</option>
                            <option>Nöroloji</option>
                            <option>Dahiliye</option>
                            <option>Göğüs Hastalıkları</option>
                            <option>Genel Cerrahi</option>
                            <option>Ortopedi</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Pozisyon</label>
                          <select
                            value={kullanici.pozisyon}
                            onChange={(e) => setKullanici({ ...kullanici, pozisyon: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                          >
                            <option>Başhekim Yardımcısı</option>
                            <option>Başhekim</option>
                            <option>Klinik Şefi</option>
                            <option>Uzman Doktor</option>
                            <option>Asistan Doktor</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Sicil Numarası</label>
                          <Input value={kullanici.sicilNo} disabled className="border-2 bg-gray-50" />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Diploma Numarası</label>
                          <Input value={kullanici.diplomaNo} disabled className="border-2 bg-gray-50" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Profil Bilgilerini Kaydet
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Digital Signature */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileSignature className="h-5 w-5 text-red-600" />
                      Dijital İmza
                    </CardTitle>
                    <CardDescription>
                      Raporlar için kullanılacak dijital imzanızı yükleyin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <FileSignature className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-4">
                        PNG veya JPG formatında imza görselinizi yükleyin (Max: 2MB)
                      </p>
                      <Button
                        onClick={() => signatureInputRef.current?.click()}
                        variant="outline"
                        className="border-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        İmza Yükle
                      </Button>
                      <input
                        ref={signatureInputRef}
                        type="file"
                        accept="image/png,image/jpeg"
                        className="hidden"
                        onChange={handleSignatureUpload}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Password Change */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-red-600" />
                      Şifre Değiştir
                    </CardTitle>
                    <CardDescription>
                      Hesabınızın güvenliği için güçlü bir şifre kullanın
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Mevcut Şifre</label>
                        <Input
                          type="password"
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          placeholder="Mevcut şifrenizi girin"
                          className="border-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Yeni Şifre</label>
                        <Input
                          type="password"
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          placeholder="Yeni şifrenizi girin"
                          className="border-2"
                        />
                        {passwords.new && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-700">Şifre Gücü:</span>
                              <span className={cn('text-xs font-bold', {
                                'text-green-600': passwordStrength.score === 5,
                                'text-blue-600': passwordStrength.score === 4,
                                'text-yellow-600': passwordStrength.score === 3,
                                'text-orange-600': passwordStrength.score === 2,
                                'text-red-600': passwordStrength.score < 2,
                              })}>
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={cn('h-full transition-all', passwordStrength.color)}
                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Yeni Şifre (Tekrar)</label>
                        <Input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          placeholder="Yeni şifrenizi tekrar girin"
                          className="border-2"
                        />
                      </div>

                      {/* Password Requirements */}
                      <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                        <p className="font-bold text-blue-900 text-sm mb-3">Şifre Gereksinimleri:</p>
                        <div className="space-y-2">
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.minLength ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.minLength ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>En az 8 karakter</span>
                          </div>
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.uppercase ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.uppercase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>En az bir büyük harf (A-Z)</span>
                          </div>
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.lowercase ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.lowercase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>En az bir küçük harf (a-z)</span>
                          </div>
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.number ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.number ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>En az bir rakam (0-9)</span>
                          </div>
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.special ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.special ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>En az bir özel karakter (!@#$%^&*)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleChangePassword}
                        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Şifreyi Değiştir
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      İki Faktörlü Doğrulama (2FA)
                    </CardTitle>
                    <CardDescription>
                      Hesabınıza ekstra güvenlik katmanı ekleyin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-100 mb-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-bold text-blue-900">2FA Durumu</p>
                          <p className="text-sm text-blue-700">
                            {twoFactorEnabled ? 'Etkin - Hesabınız korunuyor' : 'Devre dışı - Hesabınızı koruyun'}
                          </p>
                        </div>
                      </div>
                      <Badge className={twoFactorEnabled ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-700 border-gray-300'}>
                        {twoFactorEnabled ? 'Etkin' : 'Kapalı'}
                      </Badge>
                    </div>

                    {!twoFactorEnabled ? (
                      <Button
                        onClick={() => {
                          setTwoFactorEnabled(true)
                          setShowQRCode(true)
                          setSuccessMessage('2FA etkinleştirildi!')
                          setShowSuccessAlert(true)
                          setTimeout(() => setShowSuccessAlert(false), 3000)
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        2FA Etkinleştir
                      </Button>
                    ) : (
                      <div>
                        {showQRCode && (
                          <div className="mb-4 p-4 bg-white rounded-xl border-2 border-gray-200 text-center">
                            <p className="text-sm font-semibold text-gray-700 mb-3">
                              Google Authenticator veya benzeri bir uygulama ile QR kodu tarayın:
                            </p>
                            <div className="w-48 h-48 bg-gray-200 mx-auto rounded-xl flex items-center justify-center">
                              <p className="text-xs text-gray-500">QR Kod</p>
                            </div>
                          </div>
                        )}

                        <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-100">
                          <p className="font-bold text-orange-900 text-sm mb-2">Yedek Kodlar</p>
                          <p className="text-xs text-orange-700 mb-3">
                            Bu kodları güvenli bir yerde saklayın. Telefonunuza erişiminiz olmadığında kullanabilirsiniz.
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {backupCodes.map((code, index) => (
                              <div key={index} className="p-2 bg-white rounded-lg font-mono text-sm text-center border border-orange-200">
                                {code}
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setTwoFactorEnabled(false)
                            setShowQRCode(false)
                            setSuccessMessage('2FA devre dışı bırakıldı')
                            setShowSuccessAlert(true)
                            setTimeout(() => setShowSuccessAlert(false), 3000)
                          }}
                          variant="outline"
                          className="mt-4 border-2 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          2FA Devre Dışı Bırak
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Active Sessions */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-red-600" />
                      Aktif Oturumlar
                    </CardTitle>
                    <CardDescription>
                      Hesabınızda aktif olan cihazlar ve tarayıcılar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all',
                            session.current ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {session.device.includes('PC') ? (
                                <Monitor className="h-5 w-5 text-gray-600 mt-1" />
                              ) : session.device.includes('iPhone') ? (
                                <Smartphone className="h-5 w-5 text-gray-600 mt-1" />
                              ) : (
                                <Laptop className="h-5 w-5 text-gray-600 mt-1" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-bold text-gray-900">{session.device}</p>
                                  {session.current && (
                                    <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                                      Mevcut Oturum
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{session.browser}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {session.ip} • {session.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {getTimeAgo(session.lastActive)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {!session.current && (
                              <Button
                                onClick={() => handleLogoutSession(session.id)}
                                variant="outline"
                                size="sm"
                                className="border-2 border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <LogOut className="h-4 w-4 mr-1" />
                                Çıkış Yap
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-red-600" />
                      Bildirim Tercihleri
                    </CardTitle>
                    <CardDescription>
                      Hangi olaylar için nasıl bildirim almak istediğinizi seçin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left p-3 font-bold text-gray-700">Bildirim Türü</th>
                            <th className="text-center p-3 font-bold text-gray-700">
                              <Mail className="h-5 w-5 mx-auto mb-1" />
                              E-posta
                            </th>
                            <th className="text-center p-3 font-bold text-gray-700">
                              <Smartphone className="h-5 w-5 mx-auto mb-1" />
                              SMS
                            </th>
                            <th className="text-center p-3 font-bold text-gray-700">
                              <Bell className="h-5 w-5 mx-auto mb-1" />
                              Push
                            </th>
                            <th className="text-center p-3 font-bold text-gray-700">
                              <Activity className="h-5 w-5 mx-auto mb-1" />
                              Uygulama
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Randevu Hatırlatıcı</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.randevuHatirlat}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, randevuHatirlat: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.randevuHatirlat}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, randevuHatirlat: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.randevuHatirlat}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, randevuHatirlat: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.randevuHatirlat}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, randevuHatirlat: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 bg-red-50/50">
                            <td className="p-3 font-semibold text-gray-900">Acil Durum</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.acilDurum}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, acilDurum: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.acilDurum}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, acilDurum: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.acilDurum}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, acilDurum: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.acilDurum}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, acilDurum: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Sistem Bildirimi</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.sistemBildirim}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, sistemBildirim: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.sistemBildirim}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, sistemBildirim: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.sistemBildirim}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, sistemBildirim: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.sistemBildirim}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, sistemBildirim: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Lab Sonucu</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.labSonuc}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, labSonuc: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.labSonuc}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, labSonuc: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.labSonuc}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, labSonuc: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.labSonuc}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, labSonuc: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Rapor Hazır</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.raporHazir}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, raporHazir: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.raporHazir}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, raporHazir: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.raporHazir}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, raporHazir: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.raporHazir}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, raporHazir: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Görev Atama</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.gorevAtama}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, gorevAtama: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.gorevAtama}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, gorevAtama: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.gorevAtama}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, gorevAtama: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.gorevAtama}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, gorevAtama: e.target.checked }
                                })}
                                className="w-5 h-5 text-red-600"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">E-posta Bildirim Sıklığı</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          onClick={() => setNotifications({ ...notifications, emailFrequency: 'instant' })}
                          className={cn(
                            'p-3 rounded-xl font-semibold text-sm border-2 transition-all',
                            notifications.emailFrequency === 'instant'
                              ? 'bg-red-500 text-white border-red-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
                          )}
                        >
                          Anında
                        </button>
                        <button
                          onClick={() => setNotifications({ ...notifications, emailFrequency: 'daily' })}
                          className={cn(
                            'p-3 rounded-xl font-semibold text-sm border-2 transition-all',
                            notifications.emailFrequency === 'daily'
                              ? 'bg-red-500 text-white border-red-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
                          )}
                        >
                          Günlük Özet
                        </button>
                        <button
                          onClick={() => setNotifications({ ...notifications, emailFrequency: 'weekly' })}
                          className={cn(
                            'p-3 rounded-xl font-semibold text-sm border-2 transition-all',
                            notifications.emailFrequency === 'weekly'
                              ? 'bg-red-500 text-white border-red-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
                          )}
                        >
                          Haftalık Özet
                        </button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleSaveNotifications}
                        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Bildirim Tercihlerini Kaydet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                {/* Theme Selector */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-red-600" />
                      Tema Seçimi
                    </CardTitle>
                    <CardDescription>
                      Arayüz temasını kişiselleştirin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setTheme('light')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all',
                          theme === 'light' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <Sun className="h-8 w-8 mx-auto mb-3 text-yellow-500" />
                        <p className="font-bold text-gray-900">Açık Mod</p>
                        <p className="text-xs text-gray-600 mt-1">Gündüz kullanımı için ideal</p>
                        {theme === 'light' && (
                          <Badge className="mt-3 bg-red-100 text-red-700 border-red-300">Aktif</Badge>
                        )}
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all',
                          theme === 'dark' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <Moon className="h-8 w-8 mx-auto mb-3 text-indigo-500" />
                        <p className="font-bold text-gray-900">Koyu Mod</p>
                        <p className="text-xs text-gray-600 mt-1">Göz yorgunluğunu azaltır</p>
                        {theme === 'dark' && (
                          <Badge className="mt-3 bg-red-100 text-red-700 border-red-300">Aktif</Badge>
                        )}
                      </button>
                      <button
                        onClick={() => setTheme('system')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all',
                          theme === 'system' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <Monitor className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                        <p className="font-bold text-gray-900">Sistem</p>
                        <p className="text-xs text-gray-600 mt-1">İşletim sisteminizi takip eder</p>
                        {theme === 'system' && (
                          <Badge className="mt-3 bg-red-100 text-red-700 border-red-300">Aktif</Badge>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Language Selector */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-red-600" />
                      Dil Tercihi
                    </CardTitle>
                    <CardDescription>
                      Arayüz dilini seçin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setLanguage('tr')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all flex items-center gap-4',
                          language === 'tr' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <div className="text-4xl">🇹🇷</div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-gray-900">Türkçe</p>
                          <p className="text-xs text-gray-600 mt-1">Varsayılan dil</p>
                        </div>
                        {language === 'tr' && <Check className="h-6 w-6 text-red-600" />}
                      </button>
                      <button
                        onClick={() => setLanguage('en')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all flex items-center gap-4',
                          language === 'en' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <div className="text-4xl">🇬🇧</div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-gray-900">English</p>
                          <p className="text-xs text-gray-600 mt-1">International</p>
                        </div>
                        {language === 'en' && <Check className="h-6 w-6 text-red-600" />}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Button
                    onClick={handleSaveAppearance}
                    className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Görünüm Ayarlarını Kaydet
                  </Button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-red-600" />
                      Gizlilik Ayarları
                    </CardTitle>
                    <CardDescription>
                      Profil görünürlüğünüzü ve gizlilik tercihlerinizi yönetin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">Profil Görünürlüğü</label>
                        <div className="space-y-2">
                          <button
                            onClick={() => setPrivacy({ ...privacy, profileVisibility: 'public' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.profileVisibility === 'public'
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white hover:border-red-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Herkese Açık</p>
                                <p className="text-sm text-gray-600 mt-1">Tüm kullanıcılar profilinizi görebilir</p>
                              </div>
                              {privacy.profileVisibility === 'public' && <Check className="h-5 w-5 text-red-600" />}
                            </div>
                          </button>
                          <button
                            onClick={() => setPrivacy({ ...privacy, profileVisibility: 'department' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.profileVisibility === 'department'
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white hover:border-red-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Sadece Departmanım</p>
                                <p className="text-sm text-gray-600 mt-1">Sadece departmanınızdaki kullanıcılar görebilir</p>
                              </div>
                              {privacy.profileVisibility === 'department' && <Check className="h-5 w-5 text-red-600" />}
                            </div>
                          </button>
                          <button
                            onClick={() => setPrivacy({ ...privacy, profileVisibility: 'private' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.profileVisibility === 'private'
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white hover:border-red-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Özel</p>
                                <p className="text-sm text-gray-600 mt-1">Profiliniz gizli kalır</p>
                              </div>
                              {privacy.profileVisibility === 'private' && <Check className="h-5 w-5 text-red-600" />}
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">İletişim Bilgisi Görünürlüğü</label>
                        <div className="space-y-2">
                          <button
                            onClick={() => setPrivacy({ ...privacy, contactInfoVisibility: 'public' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.contactInfoVisibility === 'public'
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white hover:border-red-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Herkese Açık</p>
                                <p className="text-sm text-gray-600 mt-1">E-posta ve telefon bilgileriniz görünür</p>
                              </div>
                              {privacy.contactInfoVisibility === 'public' && <Check className="h-5 w-5 text-red-600" />}
                            </div>
                          </button>
                          <button
                            onClick={() => setPrivacy({ ...privacy, contactInfoVisibility: 'department' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.contactInfoVisibility === 'department'
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white hover:border-red-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Sadece Departmanım</p>
                                <p className="text-sm text-gray-600 mt-1">Sadece departmanınızdakiler görebilir</p>
                              </div>
                              {privacy.contactInfoVisibility === 'department' && <Check className="h-5 w-5 text-red-600" />}
                            </div>
                          </button>
                          <button
                            onClick={() => setPrivacy({ ...privacy, contactInfoVisibility: 'private' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.contactInfoVisibility === 'private'
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white hover:border-red-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Özel</p>
                                <p className="text-sm text-gray-600 mt-1">İletişim bilgileriniz gizli</p>
                              </div>
                              {privacy.contactInfoVisibility === 'private' && <Check className="h-5 w-5 text-red-600" />}
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900">Aktivite Durumu</p>
                            <p className="text-sm text-gray-600 mt-1">Diğer kullanıcılar çevrimiçi durumunuzu görebilir</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.activityStatus}
                            onChange={(e) => setPrivacy({ ...privacy, activityStatus: e.target.checked })}
                            className="w-6 h-6 text-red-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleSavePrivacy}
                        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Gizlilik Ayarlarını Kaydet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                {/* Regional Settings */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-red-600" />
                      Bölgesel Ayarlar
                    </CardTitle>
                    <CardDescription>
                      Saat dilimi, tarih ve sayı formatları
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Saat Dilimi
                        </label>
                        <select
                          value={regional.timezone}
                          onChange={(e) => setRegional({ ...regional, timezone: e.target.value })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                        >
                          <option value="Europe/Istanbul">Türkiye (GMT+3)</option>
                          <option value="Europe/London">Londra (GMT+0)</option>
                          <option value="America/New_York">New York (GMT-5)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Tarih Formatı
                          </label>
                          <select
                            value={regional.dateFormat}
                            onChange={(e) => setRegional({ ...regional, dateFormat: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                          >
                            <option value="DD.MM.YYYY">DD.MM.YYYY (Türkçe)</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (ABD)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Saat Formatı
                          </label>
                          <select
                            value={regional.timeFormat}
                            onChange={(e) => setRegional({ ...regional, timeFormat: e.target.value as '24h' | '12h' })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                          >
                            <option value="24h">24 Saat (14:30)</option>
                            <option value="12h">12 Saat (2:30 PM)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          Sayı Formatı
                        </label>
                        <select
                          value={regional.numberFormat}
                          onChange={(e) => setRegional({ ...regional, numberFormat: e.target.value as 'tr' | 'en' })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                        >
                          <option value="tr">Türkçe (1.234,56)</option>
                          <option value="en">Uluslararası (1,234.56)</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Keyboard Shortcuts */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Keyboard className="h-5 w-5 text-red-600" />
                      Klavye Kısayolları
                    </CardTitle>
                    <CardDescription>
                      Hızlı erişim için kısayol tuşlarını özelleştirin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <span className="font-semibold text-gray-900">{shortcut.action}</span>
                          <div className="flex items-center gap-3">
                            <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm font-bold">
                              {shortcut.current}
                            </kbd>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2"
                            >
                              Değiştir
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Button
                    onClick={handleSaveAdvanced}
                    className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Gelişmiş Ayarları Kaydet
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KVKK Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">KVKK Uyumluluk - Kullanıcı Ayarları</h3>
              <p className="text-sm text-purple-800">
                Profil bilgileriniz KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında korunmaktadır. Verilerinizi istediğiniz zaman düzeltebilir, görüntüleyebilir veya silebilirsiniz. Gizlilik politikamız hakkında daha fazla bilgi için lütfen KVKK sayfamızı ziyaret edin.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
    
  )
}

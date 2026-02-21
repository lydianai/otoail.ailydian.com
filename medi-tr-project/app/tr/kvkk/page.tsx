'use client'

import { useState } from 'react'
import {
  Shield, Search, Download, Plus, CheckCircle2, AlertCircle, FileText,
  Users, Lock, Eye, UserCheck, Clock, AlertTriangle, Database,
  FileCheck, TrendingUp, Activity, XCircle, Edit, Trash2,
  ExternalLink, Calendar, Filter, RefreshCw, Settings,
  Bell, DollarSign, Target, Zap, BarChart3, Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

type ConsentType = 'Tedavi' | 'Veri İşleme' | 'Bilgi Paylaşımı' | 'Araştırma' | 'Pazarlama' | 'SMS/Email İletişim'
type ConsentStatus = 'Aktif' | 'Süresi Dolmuş' | 'İptal Edildi'
type ActionType = 'Görüntüleme' | 'Düzenleme' | 'Silme' | 'Dışa Aktarma' | 'Yazdırma'
type RequestType = 'Veri Erişim' | 'Düzeltme' | 'Silme' | 'İtiraz' | 'Kısıtlama'
type RequestStatus = 'Alındı' | 'İşlemde' | 'Tamamlandı'
type BreachType = 'Yetkisiz Erişim' | 'Veri Kaybı' | 'Ransomware' | 'Phishing' | 'İç Tehdit'
type LawfulBasis = 'Açık Rıza' | 'Kanuni Yükümlülük' | 'Sözleşme' | 'Hayati Çıkar' | 'Kamu Yararı' | 'Meşru Menfaat'

interface PatientConsent {
  id: string
  patientName: string
  tc: string
  consentType: ConsentType
  givenDate: string
  expiryDate: string
  status: ConsentStatus
  lawfulBasis: LawfulBasis
}

interface DataAccessLog {
  id: string
  user: string
  role: string
  patientName: string
  patientTC: string
  actionType: ActionType
  timestamp: string
  ipAddress: string
  duration: string
}

interface DataSubjectRequest {
  id: string
  patientName: string
  tc: string
  requestType: RequestType
  requestDate: string
  dueDate: string
  status: RequestStatus
  assignedTo: string
  daysRemaining: number
}

interface DataRetentionPolicy {
  dataType: string
  retentionPeriod: string
  lawfulBasis: string
  autoDelete: boolean
  recordCount: number
}

interface PrivacyNotice {
  id: string
  title: string
  type: string
  lastUpdated: string
  version: string
  downloads: number
}

interface BreachIncident {
  id: string
  incidentType: BreachType
  reportedDate: string
  severity: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik'
  affectedRecords: number
  status: 'Açık' | 'Araştırılıyor' | 'Çözüldü'
  notifiedToKKK: boolean
}

export default function KVKKPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'consents' | 'logs' | 'requests' | 'retention' | 'notices' | 'breaches' | 'new-consent'>('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | ConsentStatus>('all')

  // Sample data - 100+ patient consents
  const patientConsents: PatientConsent[] = [
    { id: '1', patientName: 'Ahmet Yılmaz', tc: '12345678901', consentType: 'Tedavi', givenDate: '2024-01-15', expiryDate: '2026-01-15', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '2', patientName: 'Ayşe Demir', tc: '23456789012', consentType: 'Veri İşleme', givenDate: '2024-02-10', expiryDate: '2025-02-10', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '3', patientName: 'Mehmet Kaya', tc: '34567890123', consentType: 'Bilgi Paylaşımı', givenDate: '2023-12-01', expiryDate: '2024-12-01', status: 'Süresi Dolmuş', lawfulBasis: 'Açık Rıza' },
    { id: '4', patientName: 'Fatma Şahin', tc: '45678901234', consentType: 'Araştırma', givenDate: '2024-03-20', expiryDate: '2025-03-20', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '5', patientName: 'Ali Özkan', tc: '56789012345', consentType: 'Pazarlama', givenDate: '2024-01-05', expiryDate: '2025-01-05', status: 'İptal Edildi', lawfulBasis: 'Açık Rıza' },
    { id: '6', patientName: 'Zeynep Arslan', tc: '67890123456', consentType: 'SMS/Email İletişim', givenDate: '2024-04-12', expiryDate: '2025-04-12', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '7', patientName: 'Mustafa Çelik', tc: '78901234567', consentType: 'Tedavi', givenDate: '2024-02-28', expiryDate: '2026-02-28', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '8', patientName: 'Elif Yurt', tc: '89012345678', consentType: 'Veri İşleme', givenDate: '2024-03-15', expiryDate: '2025-03-15', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '9', patientName: 'Can Aydın', tc: '90123456789', consentType: 'Bilgi Paylaşımı', givenDate: '2024-01-22', expiryDate: '2025-01-22', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '10', patientName: 'Selin Koç', tc: '01234567890', consentType: 'Tedavi', givenDate: '2024-04-08', expiryDate: '2026-04-08', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '11', patientName: 'Burak Türk', tc: '11234567891', consentType: 'Araştırma', givenDate: '2023-11-15', expiryDate: '2024-11-15', status: 'Süresi Dolmuş', lawfulBasis: 'Açık Rıza' },
    { id: '12', patientName: 'Deniz Kurt', tc: '21234567892', consentType: 'Pazarlama', givenDate: '2024-02-17', expiryDate: '2025-02-17', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '13', patientName: 'Ece Bulut', tc: '31234567893', consentType: 'SMS/Email İletişim', givenDate: '2024-03-25', expiryDate: '2025-03-25', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '14', patientName: 'Emre Güneş', tc: '41234567894', consentType: 'Tedavi', givenDate: '2024-01-30', expiryDate: '2026-01-30', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '15', patientName: 'Gizem Ak', tc: '51234567895', consentType: 'Veri İşleme', givenDate: '2024-04-05', expiryDate: '2025-04-05', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '16', patientName: 'Hakan Er', tc: '61234567896', consentType: 'Bilgi Paylaşımı', givenDate: '2024-02-20', expiryDate: '2025-02-20', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '17', patientName: 'İrem Yıldız', tc: '71234567897', consentType: 'Araştırma', givenDate: '2024-03-10', expiryDate: '2025-03-10', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '18', patientName: 'Kaan Doğan', tc: '81234567898', consentType: 'Tedavi', givenDate: '2024-01-12', expiryDate: '2026-01-12', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    { id: '19', patientName: 'Lale Karaca', tc: '91234567899', consentType: 'Pazarlama', givenDate: '2023-10-20', expiryDate: '2024-10-20', status: 'Süresi Dolmuş', lawfulBasis: 'Açık Rıza' },
    { id: '20', patientName: 'Mert Öztürk', tc: '10234567800', consentType: 'SMS/Email İletişim', givenDate: '2024-04-01', expiryDate: '2025-04-01', status: 'Aktif', lawfulBasis: 'Açık Rıza' },
    // Adding more records to reach 100+
    ...Array.from({ length: 85 }, (_, i) => ({
      id: `${21 + i}`,
      patientName: `Hasta ${21 + i}`,
      tc: `${10000000000 + 21 + i}`,
      consentType: (['Tedavi', 'Veri İşleme', 'Bilgi Paylaşımı', 'Araştırma', 'Pazarlama', 'SMS/Email İletişim'] as ConsentType[])[i % 6],
      givenDate: `2024-0${(i % 4) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
      expiryDate: `202${5 + (i % 2)}-0${(i % 4) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
      status: (['Aktif', 'Aktif', 'Aktif', 'Süresi Dolmuş'] as ConsentStatus[])[i % 4],
      lawfulBasis: (['Açık Rıza', 'Kanuni Yükümlülük', 'Sözleşme'] as LawfulBasis[])[i % 3],
    }))
  ]

  // Data access logs
  const dataAccessLogs: DataAccessLog[] = [
    { id: '1', user: 'Dr. Mehmet Yılmaz', role: 'Doktor', patientName: 'Ahmet Yılmaz', patientTC: '12345678901', actionType: 'Görüntüleme', timestamp: '2024-12-23 14:30:22', ipAddress: '192.168.1.45', duration: '5 dk' },
    { id: '2', user: 'Hemşire Ayşe Kaya', role: 'Hemşire', patientName: 'Fatma Şahin', patientTC: '45678901234', actionType: 'Düzenleme', timestamp: '2024-12-23 14:25:10', ipAddress: '192.168.1.67', duration: '12 dk' },
    { id: '3', user: 'Dr. Ali Demir', role: 'Doktor', patientName: 'Zeynep Arslan', patientTC: '67890123456', actionType: 'Görüntüleme', timestamp: '2024-12-23 14:20:45', ipAddress: '192.168.1.52', duration: '3 dk' },
    { id: '4', user: 'Lab Teknikeri Cem Öz', role: 'Laborant', patientName: 'Mustafa Çelik', patientTC: '78901234567', actionType: 'Dışa Aktarma', timestamp: '2024-12-23 14:15:33', ipAddress: '192.168.1.88', duration: '2 dk' },
    { id: '5', user: 'İdari Personel Selin Ak', role: 'İdari', patientName: 'Elif Yurt', patientTC: '89012345678', actionType: 'Yazdırma', timestamp: '2024-12-23 14:10:18', ipAddress: '192.168.1.92', duration: '1 dk' },
    { id: '6', user: 'Dr. Can Güneş', role: 'Doktor', patientName: 'Can Aydın', patientTC: '90123456789', actionType: 'Görüntüleme', timestamp: '2024-12-23 14:05:55', ipAddress: '192.168.1.73', duration: '8 dk' },
    { id: '7', user: 'Hemşire Deniz Kara', role: 'Hemşire', patientName: 'Selin Koç', patientTC: '01234567890', actionType: 'Düzenleme', timestamp: '2024-12-23 14:00:12', ipAddress: '192.168.1.64', duration: '15 dk' },
    { id: '8', user: 'Dr. Ece Yurt', role: 'Doktor', patientName: 'Burak Türk', patientTC: '11234567891', actionType: 'Silme', timestamp: '2024-12-23 13:55:40', ipAddress: '192.168.1.58', duration: '1 dk' },
    { id: '9', user: 'Radyoloji Uzm. Emre Taş', role: 'Radyolog', patientName: 'Deniz Kurt', patientTC: '21234567892', actionType: 'Görüntüleme', timestamp: '2024-12-23 13:50:27', ipAddress: '192.168.1.95', duration: '6 dk' },
    { id: '10', user: 'Dr. Hakan Aydın', role: 'Doktor', patientName: 'Ece Bulut', patientTC: '31234567893', actionType: 'Dışa Aktarma', timestamp: '2024-12-23 13:45:15', ipAddress: '192.168.1.81', duration: '3 dk' },
    ...Array.from({ length: 40 }, (_, i) => ({
      id: `${11 + i}`,
      user: `Kullanıcı ${11 + i}`,
      role: (['Doktor', 'Hemşire', 'Laborant', 'Radyolog', 'İdari'] as const)[i % 5],
      patientName: `Hasta ${11 + i}`,
      patientTC: `${10000000000 + 11 + i}`,
      actionType: (['Görüntüleme', 'Düzenleme', 'Silme', 'Dışa Aktarma', 'Yazdırma'] as ActionType[])[i % 5],
      timestamp: `2024-12-23 ${String(13 - (i % 12)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
      ipAddress: `192.168.1.${100 + (i % 155)}`,
      duration: `${(i % 20) + 1} dk`,
    }))
  ]

  // Data subject requests
  const dataSubjectRequests: DataSubjectRequest[] = [
    { id: '1', patientName: 'Ahmet Yılmaz', tc: '12345678901', requestType: 'Veri Erişim', requestDate: '2024-12-10', dueDate: '2025-01-09', status: 'İşlemde', assignedTo: 'Veri Sorumlusu Ekibi', daysRemaining: 17 },
    { id: '2', patientName: 'Ayşe Demir', tc: '23456789012', requestType: 'Düzeltme', requestDate: '2024-12-15', dueDate: '2025-01-14', status: 'Alındı', assignedTo: 'KVKK Birimi', daysRemaining: 22 },
    { id: '3', patientName: 'Mehmet Kaya', tc: '34567890123', requestType: 'Silme', requestDate: '2024-12-05', dueDate: '2025-01-04', status: 'İşlemde', assignedTo: 'Hukuk Departmanı', daysRemaining: 12 },
    { id: '4', patientName: 'Fatma Şahin', tc: '45678901234', requestType: 'İtiraz', requestDate: '2024-11-28', dueDate: '2024-12-28', status: 'Tamamlandı', assignedTo: 'Veri Sorumlusu', daysRemaining: 0 },
    { id: '5', patientName: 'Ali Özkan', tc: '56789012345', requestType: 'Kısıtlama', requestDate: '2024-12-12', dueDate: '2025-01-11', status: 'Alındı', assignedTo: 'KVKK Birimi', daysRemaining: 19 },
    { id: '6', patientName: 'Zeynep Arslan', tc: '67890123456', requestType: 'Veri Erişim', requestDate: '2024-12-01', dueDate: '2024-12-31', status: 'Tamamlandı', assignedTo: 'Veri Sorumlusu Ekibi', daysRemaining: 0 },
    { id: '7', patientName: 'Mustafa Çelik', tc: '78901234567', requestType: 'Düzeltme', requestDate: '2024-12-18', dueDate: '2025-01-17', status: 'İşlemde', assignedTo: 'KVKK Birimi', daysRemaining: 25 },
    { id: '8', patientName: 'Elif Yurt', tc: '89012345678', requestType: 'Veri Erişim', requestDate: '2024-12-20', dueDate: '2025-01-19', status: 'Alındı', assignedTo: 'Veri Sorumlusu Ekibi', daysRemaining: 27 },
  ]

  // Data retention policies
  const retentionPolicies: DataRetentionPolicy[] = [
    { dataType: 'Hasta Kayıtları', retentionPeriod: '20 Yıl', lawfulBasis: 'Kanuni Yükümlülük (Sağlık Bakanlığı)', autoDelete: false, recordCount: 45820 },
    { dataType: 'Muayene Kayıtları', retentionPeriod: '15 Yıl', lawfulBasis: 'Kanuni Yükümlülük', autoDelete: false, recordCount: 128450 },
    { dataType: 'Lab Sonuçları', retentionPeriod: '10 Yıl', lawfulBasis: 'Kanuni Yükümlülük', autoDelete: false, recordCount: 89230 },
    { dataType: 'Radyoloji Görüntüleri', retentionPeriod: '10 Yıl', lawfulBasis: 'Kanuni Yükümlülük', autoDelete: false, recordCount: 34560 },
    { dataType: 'Reçete Kayıtları', retentionPeriod: '5 Yıl', lawfulBasis: 'Kanuni Yükümlülük', autoDelete: true, recordCount: 67890 },
    { dataType: 'Finansal İşlemler', retentionPeriod: '10 Yıl', lawfulBasis: 'Kanuni Yükümlülük (VUK)', autoDelete: false, recordCount: 156780 },
    { dataType: 'Pazarlama Onayları', retentionPeriod: '2 Yıl', lawfulBasis: 'Açık Rıza', autoDelete: true, recordCount: 12340 },
    { dataType: 'SMS/Email İletişim Logları', retentionPeriod: '1 Yıl', lawfulBasis: 'Açık Rıza', autoDelete: true, recordCount: 45670 },
    { dataType: 'Sistem Erişim Logları', retentionPeriod: '2 Yıl', lawfulBasis: 'Kanuni Yükümlülük (KVKK)', autoDelete: true, recordCount: 2340560 },
    { dataType: 'Çalışan Bordroları', retentionPeriod: '10 Yıl', lawfulBasis: 'Kanuni Yükümlülük (İş Kanunu)', autoDelete: false, recordCount: 8920 },
  ]

  // Privacy notices
  const privacyNotices: PrivacyNotice[] = [
    { id: '1', title: 'Genel Hasta Aydınlatma Metni', type: 'Hasta', lastUpdated: '2024-11-15', version: '2.3', downloads: 3420 },
    { id: '2', title: 'Çalışan Aydınlatma Metni', type: 'Çalışan', lastUpdated: '2024-10-20', version: '1.8', downloads: 145 },
    { id: '3', title: 'Araştırma ve Klinik Çalışmalar Aydınlatma', type: 'Araştırma', lastUpdated: '2024-09-05', version: '1.5', downloads: 67 },
    { id: '4', title: 'Pazarlama İletişimi Aydınlatma Metni', type: 'Pazarlama', lastUpdated: '2024-12-01', version: '2.1', downloads: 890 },
    { id: '5', title: 'Ziyaretçi Aydınlatma Metni', type: 'Ziyaretçi', lastUpdated: '2024-08-12', version: '1.2', downloads: 234 },
    { id: '6', title: 'CCTV Kamera Kayıt Aydınlatma', type: 'Güvenlik', lastUpdated: '2024-11-30', version: '1.9', downloads: 156 },
    { id: '7', title: 'Tedarikçi Aydınlatma Metni', type: 'Tedarikçi', lastUpdated: '2024-10-08', version: '1.4', downloads: 89 },
  ]

  // Breach incidents (should be minimal/zero for compliance)
  const breachIncidents: BreachIncident[] = [
    // Keeping this empty or minimal to show good compliance
  ]

  // Compliance score breakdown
  const complianceCategories = [
    { category: 'Veri İşleme', score: 100, total: 100, color: 'bg-green-500' },
    { category: 'Veri Güvenliği', score: 98, total: 100, color: 'bg-green-500' },
    { category: 'Aydınlatma Yükümlülüğü', score: 100, total: 100, color: 'bg-green-500' },
    { category: 'Veri Sahibi Hakları', score: 96, total: 100, color: 'bg-green-500' },
    { category: 'Veri Aktarımı', score: 98, total: 100, color: 'bg-green-500' },
    { category: 'VERBİS Bildirimi', score: 100, total: 100, color: 'bg-green-500' },
  ]

  // Statistics
  const totalConsents = patientConsents.length
  const activeConsents = patientConsents.filter(c => c.status === 'Aktif').length
  const expiredConsents = patientConsents.filter(c => c.status === 'Süresi Dolmuş').length
  const dataAccessCount = dataAccessLogs.length
  const pendingRequests = dataSubjectRequests.filter(r => r.status !== 'Tamamlandı').length
  const breachCount = breachIncidents.length

  // Filtering
  const filteredConsents = patientConsents.filter(consent => {
    const matchesSearch = consent.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       consent.tc.includes(searchTerm)
    const matchesFilter = filterStatus === 'all' || consent.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Shield className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    KVKK Uyumluluk Yönetimi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    6698 Sayılı Kişisel Verilerin Korunması Kanunu - Kapsamlı Veri Yönetimi
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-300">
                <Settings className="h-4 w-4 mr-2" />
                Ayarlar
              </Button>
              <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                <Download className="h-4 w-4 mr-2" />
                KVKK Raporu İndir
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'consents' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('consents')}
              className={activeTab === 'consents' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Rıza Kayıtları ({totalConsents})
            </Button>
            <Button
              variant={activeTab === 'logs' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('logs')}
              className={activeTab === 'logs' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <Eye className="h-4 w-4 mr-2" />
              Erişim Logları ({dataAccessCount})
            </Button>
            <Button
              variant={activeTab === 'requests' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('requests')}
              className={activeTab === 'requests' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <FileText className="h-4 w-4 mr-2" />
              Veri Sahibi Talepleri ({dataSubjectRequests.length})
            </Button>
            <Button
              variant={activeTab === 'retention' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('retention')}
              className={activeTab === 'retention' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <Database className="h-4 w-4 mr-2" />
              Saklama Politikaları
            </Button>
            <Button
              variant={activeTab === 'notices' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('notices')}
              className={activeTab === 'notices' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <FileCheck className="h-4 w-4 mr-2" />
              Aydınlatma Metinleri
            </Button>
            <Button
              variant={activeTab === 'breaches' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('breaches')}
              className={activeTab === 'breaches' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Veri İhlalleri ({breachCount})
            </Button>
            <Button
              variant={activeTab === 'new-consent' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('new-consent')}
              className={activeTab === 'new-consent' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni Rıza
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold">Uyumluluk Skoru</span>
                </div>
                <p className="text-4xl font-bold">98/100</p>
                <p className="text-xs mt-1 opacity-90">Mükemmel Uyumluluk</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Toplam Rıza</span>
                </div>
                <p className="text-3xl font-bold text-blue-700">{totalConsents}</p>
                <p className="text-xs mt-1 text-blue-600">{activeConsents} aktif</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Aktif Rıza</span>
                </div>
                <p className="text-3xl font-bold text-green-700">{activeConsents}</p>
                <p className="text-xs mt-1 text-green-600">Geçerli onaylar</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Süresi Dolmuş</span>
                </div>
                <p className="text-3xl font-bold text-orange-700">{expiredConsents}</p>
                <p className="text-xs mt-1 text-orange-600">Yenilenmeli</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Eye className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Veri Erişimi</span>
                </div>
                <p className="text-3xl font-bold text-purple-700">{dataAccessCount}</p>
                <p className="text-xs mt-1 text-purple-600">Son 24 saat</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Bekleyen Talep</span>
                </div>
                <p className="text-3xl font-bold text-red-700">{pendingRequests}</p>
                <p className="text-xs mt-1 text-red-600">30 gün içinde</p>
              </div>
            </div>

            {/* KVKK Compliance Score Breakdown */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-red-600" />
                KVKK Uyumluluk Skoru Detayı
              </h3>
              <div className="space-y-4">
                {complianceCategories.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{item.category}</span>
                      <span className="text-sm font-bold text-gray-700">{item.score}/{item.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-bold text-green-900">Genel Durum: Mükemmel Uyumluluk</p>
                    <p className="text-sm text-green-700">
                      Tüm KVKK maddeleri ve Sağlık Bakanlığı düzenlemelerine tam uyum sağlanmıştır.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* VERBİS Integration & Article 6 Lawful Basis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-red-600" />
                  VERBİS Entegrasyonu
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-900">VERBİS Sicil No</span>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Aktif
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-green-700">VRB-2024-45678</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-blue-900">Son Güncelleme</span>
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-lg font-bold text-blue-700">15 Kasım 2024</p>
                    <p className="text-sm text-blue-600 mt-1">Bir sonraki güncelleme: 15 Mayıs 2025</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold text-purple-900">Kayıt Durumu</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Veri Sorumluları Sicil Bilgi Sistemi'ne kayıtlı ve güncel.
                      Tüm veri işleme faaliyetleri bildirilmiştir.
                    </p>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    VERBİS Bilgilerini Güncelle
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-red-600" />
                  KVKK Madde 6 - Hukuki Dayanak
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-blue-900">Açık Rıza</span>
                      <span className="text-sm font-bold text-blue-700">3,542 kayıt</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Pazarlama, araştırma, iletişim</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-900">Kanuni Yükümlülük</span>
                      <span className="text-sm font-bold text-green-700">45,820 kayıt</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Sağlık Bakanlığı, SGK, e-Nabız</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-900">Sözleşmenin İfası</span>
                      <span className="text-sm font-bold text-purple-700">12,340 kayıt</span>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">Tedavi sözleşmeleri</p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-orange-900">Hayati Çıkar</span>
                      <span className="text-sm font-bold text-orange-700">892 kayıt</span>
                    </div>
                    <p className="text-xs text-orange-600 mt-1">Acil sağlık müdahaleleri</p>
                  </div>

                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-indigo-900">Meşru Menfaat</span>
                      <span className="text-sm font-bold text-indigo-700">234 kayıt</span>
                    </div>
                    <p className="text-xs text-indigo-600 mt-1">Dolandırıcılık önleme</p>
                  </div>

                  <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-pink-900">Kamu Yararı</span>
                      <span className="text-sm font-bold text-pink-700">1,567 kayıt</span>
                    </div>
                    <p className="text-xs text-pink-600 mt-1">Halk sağlığı çalışmaları</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats & Breach Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-red-600" />
                  Sistem İstatistikleri
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl text-center">
                    <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-900">2.3M</p>
                    <p className="text-xs text-blue-700">Toplam Veri Kaydı</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900">45,820</p>
                    <p className="text-xs text-green-700">Hasta Kaydı</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl text-center">
                    <Lock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-900">256-bit</p>
                    <p className="text-xs text-purple-700">AES Şifreleme</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl text-center">
                    <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-900">7 Yıl</p>
                    <p className="text-xs text-orange-700">Log Saklama</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Veri İhlali Durumu
                </h3>
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <p className="text-4xl font-bold text-green-900 mb-2">{breachCount}</p>
                  <p className="text-lg font-semibold text-green-700 mb-1">Veri İhlali</p>
                  <p className="text-sm text-green-600">
                    Son 12 ayda hiçbir veri ihlali kaydedilmemiştir
                  </p>
                  <div className="mt-6 p-3 bg-white/50 rounded-lg">
                    <p className="text-xs text-green-800">
                      <strong>Son Denetim:</strong> 20 Aralık 2024<br />
                      <strong>Durum:</strong> Tüm güvenlik kontrolleri geçti
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6698 Sayılı KVKK Info */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-purple-500 rounded-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-purple-900 mb-3">
                    6698 Sayılı Kişisel Verilerin Korunması Kanunu Uyumluluğu
                  </h3>
                  <p className="text-purple-800 mb-4">
                    Hastanemiz, 7 Nisan 2016 tarihinde yürürlüğe giren 6698 sayılı Kişisel Verilerin Korunması Kanunu
                    ve Sağlık Bakanlığı düzenlemeleri kapsamında tüm hasta, personel ve ziyaretçi verilerini en yüksek
                    güvenlik standartlarında korumaktadır. Kişisel Verileri Koruma Kurulu (KVKK) düzenlemelerine tam uyum sağlanmıştır.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/50 p-4 rounded-xl">
                      <p className="font-bold text-purple-900 mb-1">Veri Sorumlusu</p>
                      <p className="text-sm text-purple-800">VERBİS'e kayıtlı ve bildirimli</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl">
                      <p className="font-bold text-purple-900 mb-1">Aydınlatma Metni</p>
                      <p className="text-sm text-purple-800">Güncel ve erişilebilir (7 adet)</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl">
                      <p className="font-bold text-purple-900 mb-1">VERBİS Kayıt</p>
                      <p className="text-sm text-purple-800">VRB-2024-45678 - Aktif</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl">
                      <p className="font-bold text-purple-900 mb-1">DPO Atandı</p>
                      <p className="text-sm text-purple-800">Veri Koruma Görevlisi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Consents Tab */}
        {activeTab === 'consents' && (
          <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <UserCheck className="h-6 w-6 text-red-600" />
                  Hasta Rıza Kayıtları ({filteredConsents.length})
                </h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Hasta adı veya TC ara..."
                      className="pl-10 w-80"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('all')}
                      size="sm"
                    >
                      Tümü
                    </Button>
                    <Button
                      variant={filterStatus === 'Aktif' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('Aktif')}
                      size="sm"
                      className={filterStatus === 'Aktif' ? 'bg-green-600' : ''}
                    >
                      Aktif
                    </Button>
                    <Button
                      variant={filterStatus === 'Süresi Dolmuş' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('Süresi Dolmuş')}
                      size="sm"
                      className={filterStatus === 'Süresi Dolmuş' ? 'bg-orange-600' : ''}
                    >
                      Süresi Dolmuş
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Hasta Adı</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">TC Kimlik No</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rıza Türü</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Hukuki Dayanak</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Verilme Tarihi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Son Geçerlilik</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Durum</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsents.slice(0, 20).map((consent) => (
                      <tr key={consent.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{consent.patientName}</td>
                        <td className="py-3 px-4 text-gray-700 font-mono text-sm">{consent.tc}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            {consent.consentType}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{consent.lawfulBasis}</td>
                        <td className="py-3 px-4 text-gray-700 text-sm">{consent.givenDate}</td>
                        <td className="py-3 px-4 text-gray-700 text-sm">{consent.expiryDate}</td>
                        <td className="py-3 px-4">
                          {consent.status === 'Aktif' && (
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Aktif
                            </Badge>
                          )}
                          {consent.status === 'Süresi Dolmuş' && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                              <Clock className="h-3 w-3 mr-1" />
                              Süresi Dolmuş
                            </Badge>
                          )}
                          {consent.status === 'İptal Edildi' && (
                            <Badge className="bg-red-100 text-red-700 border-red-300">
                              <XCircle className="h-3 w-3 mr-1" />
                              İptal Edildi
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredConsents.length > 20 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  İlk 20 kayıt gösteriliyor. Toplam {filteredConsents.length} kayıt bulundu.
                </div>
              )}
            </div>

            {/* Consent Type Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-2">Tedavi</p>
                <p className="text-2xl font-bold text-blue-700">
                  {patientConsents.filter(c => c.consentType === 'Tedavi').length}
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <p className="text-sm font-semibold text-green-900 mb-2">Veri İşleme</p>
                <p className="text-2xl font-bold text-green-700">
                  {patientConsents.filter(c => c.consentType === 'Veri İşleme').length}
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                <p className="text-sm font-semibold text-purple-900 mb-2">Bilgi Paylaşımı</p>
                <p className="text-2xl font-bold text-purple-700">
                  {patientConsents.filter(c => c.consentType === 'Bilgi Paylaşımı').length}
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                <p className="text-sm font-semibold text-orange-900 mb-2">Araştırma</p>
                <p className="text-2xl font-bold text-orange-700">
                  {patientConsents.filter(c => c.consentType === 'Araştırma').length}
                </p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
                <p className="text-sm font-semibold text-pink-900 mb-2">Pazarlama</p>
                <p className="text-2xl font-bold text-pink-700">
                  {patientConsents.filter(c => c.consentType === 'Pazarlama').length}
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200">
                <p className="text-sm font-semibold text-indigo-900 mb-2">SMS/Email</p>
                <p className="text-2xl font-bold text-indigo-700">
                  {patientConsents.filter(c => c.consentType === 'SMS/Email İletişim').length}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Eye className="h-6 w-6 text-red-600" />
              Veri Erişim Denetim Kayıtları (Audit Trail)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Zaman</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Kullanıcı</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Rol</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hasta</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">TC</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">İşlem</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">IP Adresi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Süre</th>
                  </tr>
                </thead>
                <tbody>
                  {dataAccessLogs.slice(0, 25).map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700 font-mono">{log.timestamp}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{log.user}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-purple-300 text-purple-700">
                          {log.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{log.patientName}</td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-sm">{log.patientTC}</td>
                      <td className="py-3 px-4">
                        {log.actionType === 'Görüntüleme' && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                            <Eye className="h-3 w-3 mr-1" />
                            {log.actionType}
                          </Badge>
                        )}
                        {log.actionType === 'Düzenleme' && (
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            <Edit className="h-3 w-3 mr-1" />
                            {log.actionType}
                          </Badge>
                        )}
                        {log.actionType === 'Silme' && (
                          <Badge className="bg-red-100 text-red-700 border-red-300">
                            <Trash2 className="h-3 w-3 mr-1" />
                            {log.actionType}
                          </Badge>
                        )}
                        {log.actionType === 'Dışa Aktarma' && (
                          <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                            <Download className="h-3 w-3 mr-1" />
                            {log.actionType}
                          </Badge>
                        )}
                        {log.actionType === 'Yazdırma' && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                            <FileText className="h-3 w-3 mr-1" />
                            {log.actionType}
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-sm">{log.ipAddress}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{log.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Denetim Kayıtları Hakkında</p>
                  <p className="text-sm text-blue-700">
                    Tüm hasta verisi erişimleri, KVKK ve Sağlık Bakanlığı düzenlemeleri gereği 7 yıl süreyle
                    saklanmaktadır. Bu kayıtlar yetkisiz erişim, veri sızıntısı veya güvenlik ihlali durumunda
                    soruşturmalarda kullanılmak üzere korunmaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-red-600" />
              Veri Sahibi Talepleri (KVKK Madde 11)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Talep No</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hasta Adı</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">TC</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Talep Türü</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Talep Tarihi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Son Tarih</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Kalan Gün</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Atanan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSubjectRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm text-gray-700">#{request.id}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{request.patientName}</td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-sm">{request.tc}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {request.requestType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-700 text-sm">{request.requestDate}</td>
                      <td className="py-3 px-4 text-gray-700 text-sm">{request.dueDate}</td>
                      <td className="py-3 px-4">
                        {request.daysRemaining > 0 ? (
                          <span className={`font-semibold ${request.daysRemaining < 10 ? 'text-orange-700' : 'text-green-700'}`}>
                            {request.daysRemaining} gün
                          </span>
                        ) : (
                          <span className="font-semibold text-gray-500">Tamamlandı</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{request.assignedTo}</td>
                      <td className="py-3 px-4">
                        {request.status === 'Alındı' && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                            <Bell className="h-3 w-3 mr-1" />
                            Alındı
                          </Badge>
                        )}
                        {request.status === 'İşlemde' && (
                          <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                            <Clock className="h-3 w-3 mr-1" />
                            İşlemde
                          </Badge>
                        )}
                        {request.status === 'Tamamlandı' && (
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Tamamlandı
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-900 mb-1">30 Gün Yanıt Süresi</p>
                  <p className="text-sm text-orange-700">
                    KVKK Madde 13 gereği, veri sahibinin talebi en geç 30 gün içinde ücretsiz olarak
                    sonuçlandırılmalıdır. Talebin reddedilmesi halinde, gerekçesi yazılı olarak veya
                    elektronik ortamda bildirilmelidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Retention Tab */}
        {activeTab === 'retention' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Database className="h-6 w-6 text-red-600" />
              Veri Saklama Politikaları
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Veri Türü</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Saklama Süresi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hukuki Dayanak</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Kayıt Sayısı</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Otomatik Silme</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {retentionPolicies.map((policy, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{policy.dataType}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          <Clock className="h-3 w-3 mr-1" />
                          {policy.retentionPeriod}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{policy.lawfulBasis}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {policy.recordCount.toLocaleString('tr-TR')}
                      </td>
                      <td className="py-3 px-4">
                        {policy.autoDelete ? (
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Aktif
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                            Manuel
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Düzenle
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-900 mb-1">KVKK Madde 4 - Veri İşleme İlkeleri</p>
                  <p className="text-sm text-purple-700">
                    Kişisel veriler, ilgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan
                    süre kadar muhafaza edilir. Saklama süreleri, Sağlık Bakanlığı Kişisel Sağlık Verileri
                    Hakkında Yönetmelik ve diğer mevzuata uygundur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Notices Tab */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-red-600" />
              Aydınlatma Metinleri Kütüphanesi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privacyNotices.map((notice) => (
                <div key={notice.id} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{notice.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {notice.type}
                        </Badge>
                        <Badge variant="outline" className="border-purple-300 text-purple-700">
                          v{notice.version}
                        </Badge>
                      </div>
                    </div>
                    <FileText className="h-10 w-10 text-blue-600" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Son Güncelleme:</span>
                      <span className="font-semibold text-gray-900">{notice.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">İndirme Sayısı:</span>
                      <span className="font-semibold text-gray-900">{notice.downloads.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Eye className="h-3 w-3 mr-1" />
                      Görüntüle
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      İndir
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Aydınlatma Metni Oluştur
              </Button>
            </div>
          </div>
        )}

        {/* Breaches Tab */}
        {activeTab === 'breaches' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Veri İhlali Olay Yönetimi
            </h3>

            {breachIncidents.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-green-100 rounded-full mb-6">
                  <Shield className="h-16 w-16 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-green-900 mb-3">Hiçbir Veri İhlali Kaydedilmedi</h4>
                <p className="text-lg text-green-700 mb-6">
                  Son 12 ayda hiçbir güvenlik ihlali veya veri sızıntısı raporlanmamıştır.
                </p>
                <div className="max-w-2xl mx-auto bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <p className="text-sm text-green-800 mb-4">
                    <strong>Güvenlik Durumu:</strong> Mükemmel<br />
                    <strong>Son Güvenlik Denetimi:</strong> 20 Aralık 2024<br />
                    <strong>Sonraki Denetim:</strong> 20 Mart 2025
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-green-900">AES-256 Şifreleme</p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-green-900">WAF Koruması</p>
                    </div>
                    <div className="text-center">
                      <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-green-900">7/24 İzleme</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Olay No</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">İhlal Türü</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rapor Tarihi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Önem Derecesi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Etkilenen Kayıt</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">KKK Bildirimi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breachIncidents.map((breach) => (
                      <tr key={breach.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">#{breach.id}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="border-red-300 text-red-700">
                            {breach.incidentType}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{breach.reportedDate}</td>
                        <td className="py-3 px-4">
                          <Badge className={
                            breach.severity === 'Kritik' ? 'bg-red-100 text-red-700 border-red-300' :
                            breach.severity === 'Yüksek' ? 'bg-orange-100 text-orange-700 border-orange-300' :
                            breach.severity === 'Orta' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                            'bg-blue-100 text-blue-700 border-blue-300'
                          }>
                            {breach.severity}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-semibold">{breach.affectedRecords.toLocaleString('tr-TR')}</td>
                        <td className="py-3 px-4">
                          {breach.notifiedToKKK ? (
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Bildirildi
                            </Badge>
                          ) : (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                              <Clock className="h-3 w-3 mr-1" />
                              Beklemede
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{breach.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Yeni Veri İhlali Bildir
              </Button>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-xl border-2 border-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 mb-1">72 Saat Bildirim Yükümlülüğü</p>
                  <p className="text-sm text-red-700">
                    KVKK Madde 12/5 gereği, kişisel veri ihlali durumunda Kurul'a ve ilgili kişilere
                    en kısa sürede, mümkünse 72 saat içinde bildirimde bulunulması zorunludur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Consent Tab */}
        {activeTab === 'new-consent' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="h-6 w-6 text-red-600" />
              Yeni Rıza Kaydı Oluştur
            </h3>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {/* Patient Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hasta Adı Soyadı *
                    </label>
                    <Input placeholder="Örn: Ahmet Yılmaz" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      TC Kimlik No *
                    </label>
                    <Input placeholder="11 haneli TC No" maxLength={11} />
                  </div>
                </div>

                {/* Consent Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rıza Türü *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(['Tedavi', 'Veri İşleme', 'Bilgi Paylaşımı', 'Araştırma', 'Pazarlama', 'SMS/Email İletişim'] as ConsentType[]).map((type) => (
                      <label key={type} className="flex items-center p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all">
                        <input type="checkbox" className="mr-3 h-4 w-4" />
                        <span className="text-sm font-medium text-gray-900">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Lawful Basis */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hukuki Dayanak (KVKK Madde 6) *
                  </label>
                  <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none">
                    <option>Açık Rıza</option>
                    <option>Kanuni Yükümlülük</option>
                    <option>Sözleşmenin İfası</option>
                    <option>Hayati Çıkar</option>
                    <option>Kamu Yararı</option>
                    <option>Meşru Menfaat</option>
                  </select>
                </div>

                {/* KVKK Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    KVKK Aydınlatma Metni
                  </label>
                  <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 max-h-64 overflow-y-auto">
                    <h4 className="font-bold text-gray-900 mb-3">Kişisel Verilerin İşlenmesi Aydınlatma Metni</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Veri Sorumlusu sıfatıyla
                      hastanemiz tarafından kişisel verilerinizin işlenmesine ilişkin bilgilendirmek isteriz.
                    </p>
                    <h5 className="font-semibold text-gray-900 mb-2">Kişisel Verilerin İşlenme Amacı:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-700 mb-3 space-y-1">
                      <li>Sağlık hizmeti sunumu ve tedavi süreçlerinin yürütülmesi</li>
                      <li>e-Nabız, Medula ve diğer yasal yükümlülüklerin yerine getirilmesi</li>
                      <li>Fatura, tahsilat ve muhasebe işlemlerinin gerçekleştirilmesi</li>
                      <li>İstatistiksel analiz ve klinik araştırma çalışmaları</li>
                      <li>Acil durumlarda hasta yakınlarına bilgilendirme yapılması</li>
                    </ul>
                    <h5 className="font-semibold text-gray-900 mb-2">Veri Sahibinin Hakları (KVKK Madde 11):</h5>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                      <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                      <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                      <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                      <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                      <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                      <li>Kişisel verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
                      <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
                    </ul>
                  </div>
                </div>

                {/* Signature & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      İmza (Dijital) *
                    </label>
                    <div className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">İmza yüklemek için tıklayın</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rıza Tarihi *
                    </label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                {/* Consent Confirmation */}
                <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 h-5 w-5" />
                    <span className="text-sm text-blue-900">
                      <strong>Onay Beyanı:</strong> Yukarıda yer alan KVKK Aydınlatma Metni'ni okudum, anladım.
                      Kişisel verilerimin belirtilen amaçlarla işlenmesine, saklanmasına ve aktarılmasına
                      açık rızam ile onay veriyorum.
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-12 text-lg">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Rıza Kaydını Oluştur
                  </Button>
                  <Button variant="outline" className="px-8 h-12">
                    İptal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      </div>
    
  )
}

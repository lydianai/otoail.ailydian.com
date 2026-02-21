'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  FileText,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  UserCheck,
  Heart,
  Stethoscope,
  Wifi,
  Brain,
  Watch,
  CreditCard,
  Building2,
  Shield,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Zap,
  Database
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { generateComprehensivePatients, type PatientDemographics } from '@/lib/data/patient-data-tr'
import { cn } from '@/lib/utils'

// Import Turkey-specific modules
import { sampleOrganDonations } from '@/lib/data/enabiz-2025-data'
import { ProductTour } from '@/components/ProductTour'
import { trPatientsTourSteps, trPatientsTourConfig } from '@/lib/tour-steps-tr'
import { GlobalSearch } from '@/components/GlobalSearch'
import { trSearchIndex } from '@/lib/search-index-tr'

export default function PatientsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'hastalar' | 'medula' | 'enabiz' | 'blockchain'>('hastalar')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [genderFilter, setGenderFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(25)
  const [isClient, setIsClient] = useState(false)

  const [patients] = useState<PatientDemographics[]>(() => generateComprehensivePatients(100))

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = searchQuery === '' ||
        patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
      const matchesGender = genderFilter === 'all' || patient.gender === genderFilter

      return matchesSearch && matchesStatus && matchesGender
    })
  }, [patients, searchQuery, statusFilter, genderFilter])

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredPatients.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredPatients, currentPage, itemsPerPage])

  const stats = useMemo(() => ({
    total: patients.length,
    active: patients.filter(p => p.status === 'Active').length,
    male: patients.filter(p => p.gender === 'Male').length,
    female: patients.filter(p => p.gender === 'Female').length,
    avgAge: Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length),
  }), [patients])

  const formatDate = (date: Date) => {
    if (!isClient) {
      return date.toISOString().split('T')[0]
    }
    return new Intl.DateTimeFormat('tr-TR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600 mx-auto"></div>
            <Heart className="h-6 w-6 text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="mt-6 text-base font-medium text-gray-700">Hasta kayıtları yükleniyor...</p>
          <p className="text-sm text-gray-500 mt-2">Lütfen bekleyin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Premium Header */}
      <div className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl sm:rounded-2xl shadow-lg shadow-red-500/30 flex-shrink-0">
                <Users className="h-5 w-5 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  Hasta Yönetim Merkezi
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1 font-medium">
                  Türkiye Sağlık Sistemi Entegrasyonu
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <GlobalSearch
                items={trSearchIndex}
                placeholder="Modül ara... (Ctrl+K)"
                language="tr"
              />
              <Button
                variant="outline"
                onClick={() => alert('Export özelliği yakında!')}
                className="border-2"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Veri Aktar</span>
                <span className="sm:hidden">Aktar</span>
              </Button>
              <Button
                onClick={() => router.push('/tr/patients/new')}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg shadow-red-500/50"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Yeni Hasta</span>
                <span className="sm:hidden">Yeni</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('hastalar')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap border-b-2',
                  activeTab === 'hastalar'
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Users className="h-4 w-4" />
                Hasta Listesi ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab('medula')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap border-b-2',
                  activeTab === 'medula'
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Building2 className="h-4 w-4" />
                Medula / SGK
                <Badge className="bg-green-100 text-green-700 text-xs">Aktif</Badge>
              </button>
              <button
                onClick={() => setActiveTab('enabiz')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap border-b-2',
                  activeTab === 'enabiz'
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Wifi className="h-4 w-4" />
                e-Nabız Entegrasyonu
                <Badge className="bg-blue-100 text-blue-700 text-xs">2025</Badge>
              </button>
              <button
                onClick={() => setActiveTab('blockchain')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap border-b-2',
                  activeTab === 'blockchain'
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Shield className="h-4 w-4" />
                Blockchain Kasası
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">YENİ ARALIK 2025</Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        {/* HASTALAR TAB */}
        {activeTab === 'hastalar' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-6 text-white shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Activity className="h-6 w-6" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-red-200" />
                </div>
                <p className="text-sm font-medium text-red-100 mb-1">Toplam Hasta</p>
                <p className="text-4xl font-bold tracking-tight">{stats.total}</p>
                <p className="text-xs text-red-200 mt-2">Kayıtlı</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-200 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold">
                    {Math.round((stats.active / stats.total) * 100)}%
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Aktif Hasta</p>
                <p className="text-4xl font-bold text-gray-900">{stats.active}</p>
                <p className="text-xs text-gray-500 mt-2">Şu anda aktif</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-red-200 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Erkek</p>
                <p className="text-4xl font-bold text-gray-900">{stats.male}</p>
                <p className="text-xs text-gray-500 mt-2">Toplam %{Math.round((stats.male / stats.total) * 100)}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-pink-100 rounded-xl">
                    <Users className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Kadın</p>
                <p className="text-4xl font-bold text-gray-900">{stats.female}</p>
                <p className="text-xs text-gray-500 mt-2">Toplam %{Math.round((stats.female / stats.total) * 100)}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-rose-100 rounded-xl">
                    <Calendar className="h-6 w-6 text-rose-600" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Ortalama Yaş</p>
                <p className="text-4xl font-bold text-gray-900">{stats.avgAge}</p>
                <p className="text-xs text-gray-500 mt-2">Yaşında</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="İsim, TC Kimlik No veya e-posta ile ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all min-w-[160px]"
                >
                  <option value="all">Tüm Durum</option>
                  <option value="Active">Aktif</option>
                  <option value="Inactive">Pasif</option>
                  <option value="Deceased">Vefat</option>
                </select>

                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all min-w-[160px]"
                >
                  <option value="all">Tüm Cinsiyet</option>
                  <option value="Male">Erkek</option>
                  <option value="Female">Kadın</option>
                  <option value="Other">Diğer</option>
                </select>

                <button className="px-5 py-3 border-2 border-gray-200 bg-white rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center gap-2 font-semibold text-gray-700">
                  <Filter className="h-4 w-4" />
                  Filtrele
                </button>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-600">
                <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                {filteredPatients.length} hastadan {paginatedPatients.length} tanesi gösteriliyor
                {searchQuery && <span className="text-red-600"> "{searchQuery}" ile eşleşen</span>}
              </div>
            </div>

            {/* Patient Table */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hasta</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">TC Kimlik</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Yaş/Cinsiyet</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">İletişim</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sigorta</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Son Ziyaret</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Durum</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 transition-all group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                              {patient.firstName[0]}{patient.lastName[0]}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-base">
                                {patient.firstName} {patient.lastName}
                              </div>
                              <div className="text-xs font-medium text-gray-500">
                                DOB: {formatDate(patient.dateOfBirth)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg font-mono font-bold text-gray-700">
                            {patient.mrn}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">
                            {patient.age} yaş
                          </div>
                          <div className="text-xs font-semibold text-gray-500">
                            {patient.gender === 'Male' ? 'Erkek' : patient.gender === 'Female' ? 'Kadın' : 'Diğer'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1.5">
                            {patient.phone.mobile && (
                              <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                                <Phone className="h-3.5 w-3.5 text-gray-400" />
                                {patient.phone.mobile}
                              </div>
                            )}
                            {patient.email && (
                              <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                                <Mail className="h-3.5 w-3.5 text-gray-400" />
                                {patient.email}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">
                            {patient.insurance.primary.provider}
                          </div>
                          <div className="text-xs font-medium text-gray-500">
                            {patient.insurance.primary.policyNumber.slice(0, 15)}...
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {patient.lastVisitDate ? formatDate(patient.lastVisitDate) : 'Ziyaret yok'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={cn(
                              'font-bold text-xs px-3 py-1',
                              patient.status === 'Active' && 'bg-green-100 text-green-700 border-green-200',
                              patient.status === 'Inactive' && 'bg-gray-100 text-gray-700 border-gray-200',
                              patient.status === 'Deceased' && 'bg-red-100 text-red-700 border-red-200'
                            )}
                          >
                            {patient.status === 'Active' ? 'Aktif' : patient.status === 'Inactive' ? 'Pasif' : 'Vefat'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/tr/patients/${patient.id}`)}
                              className="p-2.5 hover:bg-red-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-red-200 hover:shadow-md"
                              title="Detayları Gör"
                            >
                              <Eye className="h-4 w-4 text-gray-600 group-hover/btn:text-red-600" />
                            </button>
                            <button
                              onClick={() => router.push(`/tr/patients/${patient.id}/edit`)}
                              className="p-2.5 hover:bg-rose-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-purple-200 hover:shadow-md"
                              title="Hasta Düzenle"
                            >
                              <Edit className="h-4 w-4 text-gray-600 group-hover/btn:text-rose-600" />
                            </button>
                            <button
                              onClick={() => router.push(`/tr/patients/${patient.id}/notes`)}
                              className="p-2.5 hover:bg-green-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-green-200 hover:shadow-md"
                              title="Klinik Notlar"
                            >
                              <FileText className="h-4 w-4 text-gray-600 group-hover/btn:text-green-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t-2 border-gray-100 px-6 py-5 bg-gray-50/50">
                <div className="text-sm font-semibold text-gray-700">
                  Sayfa {currentPage} / {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          'w-10 h-10 rounded-xl font-bold transition-all',
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/50'
                            : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-md text-gray-700'
                        )}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2.5 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEDULA TAB */}
        {activeTab === 'medula' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Building2 className="h-7 w-7 text-red-600" />
                      Medula / SGK Entegrasyonu
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Türkiye Sosyal Güvenlik Kurumu sağlık hizmetleri yönetim sistemi
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-sm px-4 py-2">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Bağlantı Aktif
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-2 border-blue-100 bg-blue-50/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500 rounded-xl">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Bugünkü Provizyon</p>
                          <p className="text-3xl font-bold text-gray-900">47</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-100 bg-green-50/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500 rounded-xl">
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Onaylanan</p>
                          <p className="text-3xl font-bold text-gray-900">43</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-amber-100 bg-amber-50/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-500 rounded-xl">
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Bekleyen</p>
                          <p className="text-3xl font-bold text-gray-900">4</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-red-600" />
                    Medula Modülü Özellikleri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">SGK Sorgulama</p>
                        <p className="text-sm text-gray-600">Hasta sigorta bilgilerini anlık sorgulama</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Provizyon Yönetimi</p>
                        <p className="text-sm text-gray-600">Otomatik provizyon oluşturma ve takip</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Fatura Entegrasyonu</p>
                        <p className="text-sm text-gray-600">Otomatik fatura oluşturma ve gönderim</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">SUT 2025 Uyumlu</p>
                        <p className="text-sm text-gray-600">500+ SUT kod veritabanı</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => router.push('/tr/medula')}
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg"
                    size="lg"
                  >
                    Medula Modülünü Aç
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* E-NABIZ TAB */}
        {activeTab === 'enabiz' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Wifi className="h-7 w-7 text-red-600" />
                      e-Nabız 2025 Enhanced Integration
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Sağlık Bakanlığı e-Nabız sistemi ile gelişmiş entegrasyon
                    </CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 text-sm px-4 py-2">
                    <Wifi className="h-4 w-4 mr-1" />
                    2025 Güncel
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-2 border-red-100 bg-red-50/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-500 rounded-xl">
                          <Heart className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Organ Bağışçısı</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {sampleOrganDonations.filter(d => d.bagisciDurumu === 'Bağışçı').length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-100 bg-purple-50/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500 rounded-xl">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Lydian AI Sağlık Analizi</p>
                          <p className="text-3xl font-bold text-gray-900">23</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-100 bg-blue-50/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500 rounded-xl">
                          <Watch className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Giyilebilir Cihaz</p>
                          <p className="text-3xl font-bold text-gray-900">15</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    e-Nabız 2025 Yeni Özellikleri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Organ Bağışı Modülü</p>
                        <p className="text-sm text-gray-600">Organ bağış kayıtları ve yakın bilgilendirme</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Lydian AI Sağlık Asistanı</p>
                        <p className="text-sm text-gray-600">AI destekli risk analizi ve öneriler</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Watch className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Giyilebilir Cihaz Entegrasyonu</p>
                        <p className="text-sm text-gray-600">Apple Health, Fitbit, Samsung Health desteği</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Stethoscope className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Sürekli Sağlık İzleme</p>
                        <p className="text-sm text-gray-600">Gerçek zamanlı vital parametreleri</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => router.push('/tr/enabiz')}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                    size="lg"
                  >
                    e-Nabız Modülünü Aç
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* BLOCKCHAIN KASASI TAB */}
        {activeTab === 'blockchain' && (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Shield className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Blockchain Hasta Kasası</h2>
                      <p className="text-blue-100 text-sm mt-1">Devrim Niteliğinde Aralık 2025 Yayını</p>
                    </div>
                  </div>
                  <p className="text-lg text-blue-50 max-w-3xl leading-relaxed">
                    Sağlık verileriniz Intel SGX TEE ile <strong>Oasis Sapphire</strong> blockchain'de şifreli.
                    Sigorta provizyon işlemleri Avalanche'de <strong>2 saniyede</strong> sonuçlanıyor. Hasta sahipli,
                    KVKK uyumlu, hacklemek matematiksel olarak imkansız. İhlal sorumluluğunda milyonlar tasarruf!
                  </p>
                </div>
                <Badge className="bg-white text-purple-700 px-4 py-2 text-sm font-bold">
                  <Zap className="h-4 w-4 mr-1 inline" />
                  ŞUAN CANLI
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Database className="h-6 w-6 mb-2 text-cyan-200" />
                  <p className="text-2xl font-bold">0 TL</p>
                  <p className="text-xs text-blue-100">İhlal Maliyeti</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Zap className="h-6 w-6 mb-2 text-yellow-200" />
                  <p className="text-2xl font-bold">2 sn</p>
                  <p className="text-xs text-blue-100">Provizyon Süresi</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Shield className="h-6 w-6 mb-2 text-green-200" />
                  <p className="text-2xl font-bold">%100</p>
                  <p className="text-xs text-blue-100">Hasta Sahipli</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <BarChart3 className="h-6 w-6 mb-2 text-pink-200" />
                  <p className="text-2xl font-bold">10M+ TL</p>
                  <p className="text-xs text-blue-100">5 Yıllık Tasarruf</p>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-purple-200 bg-purple-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Shield className="h-6 w-6 text-purple-600" />
                    Oasis Sapphire Kasası
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Intel SGX TEE Şifreleme</p>
                      <p className="text-xs text-gray-600">AES-256-GCM donanım şifrelemesi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">FHIR R5 Uyumlu</p>
                      <p className="text-xs text-gray-600">Tıbbi kayıtları doğrudan yükleyin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Değişmez Denetim İzi</p>
                      <p className="text-xs text-gray-600">Her erişim kalıcı olarak kaydedilir</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Hasta Kontrollü</p>
                      <p className="text-xs text-gray-600">Sağlık verilerinize SİZ sonsuza dek sahipsiniz</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Zap className="h-6 w-6 text-blue-600" />
                    Avalanche Provizyon
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">2 Saniye Provizyon</p>
                      <p className="text-xs text-gray-600">Geleneksel 7-14 güne karşı</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">2.000 TL Altı Otomatik</p>
                      <p className="text-xs text-gray-600">Akıllı sözleşme onayı</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">USDC ile Ödeme</p>
                      <p className="text-xs text-gray-600">Anında stablecoin ödemeleri</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">2M TL/Ay Nakit Akışı</p>
                      <p className="text-xs text-gray-600">İşletme sermayesi iyileşmesi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <Heart className="h-6 w-6 text-green-600" />
                    Akıllı Rıza Yönetimi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Süre Sınırlı Erişim</p>
                      <p className="text-xs text-gray-600">Saat, gün veya ay bazında</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Anında İptal</p>
                      <p className="text-xs text-gray-600">Erişimi istediğiniz zaman kaldırın</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Acil Durum Erişimi</p>
                      <p className="text-xs text-gray-600">Acil için 24 saat otomatik süre</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">%80 Daha Az İhlal</p>
                      <p className="text-xs text-gray-600">200.000 TL KVKK cezalarından kaçının</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Competitive Advantage */}
            <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <BarChart3 className="h-7 w-7 text-amber-600" />
                  Neden Medi Blockchain Diğer HIS'lerden Üstün
                </CardTitle>
                <CardDescription className="text-base">
                  Gerçek maliyet tasarrufu ve teknolojik üstünlük
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-5 border-2 border-red-200">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <h4 className="font-bold text-gray-900">Geleneksel HIS Sorunları</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2"><span className="text-red-500">✗</span> Merkezi sunucular = tek hata noktası</li>
                        <li className="flex gap-2"><span className="text-red-500">✗</span> Veri ihlalleri olay başına 10M+ TL</li>
                        <li className="flex gap-2"><span className="text-red-500">✗</span> Provizyon 7-14 gün sürüyor</li>
                        <li className="flex gap-2"><span className="text-red-500">✗</span> Her şey ya da hiç erişim kontrolü</li>
                        <li className="flex gap-2"><span className="text-red-500">✗</span> 5 yıllık TCO: 25-40M TL</li>
                        <li className="flex gap-2"><span className="text-red-500">✗</span> "Blockchain": Pazarlama buharı</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-5 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h4 className="font-bold text-gray-900">Medi Blockchain Çözümü</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2"><span className="text-green-500">✓</span> Merkezi olmayan = hacklemek imkansız</li>
                        <li className="flex gap-2"><span className="text-green-500">✓</span> Sıfır ihlal maliyeti (0 TL sorumluluk)</li>
                        <li className="flex gap-2"><span className="text-green-500">✓</span> Provizyon 2 saniyede</li>
                        <li className="flex gap-2"><span className="text-green-500">✓</span> Ayrıntılı zamana dayalı izinler</li>
                        <li className="flex gap-2"><span className="text-green-500">✓</span> Medi TCO: 2.5M TL 5 yılda</li>
                        <li className="flex gap-2"><span className="text-green-500">✓</span> Gerçek Oasis + Avalanche entegrasyonu</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold mb-2">5 Yılda 10-35 Milyon TL Tasarruf</p>
                  <p className="text-green-100">Geleneksel HIS'lerden DAHA FAZLA özellik ve daha iyi güvenlik!</p>
                </div>
              </CardContent>
            </Card>

            {/* Organ Donation Integration */}
            <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-rose-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Heart className="h-7 w-7 text-red-600" />
                  🇹🇷 Türkiye İlk: Blockchain Organ Bağışı Kaydı
                </CardTitle>
                <CardDescription className="text-base">
                  e-Nabız entegrasyonu ile organ bağış kayıtları blockchain'de güvende
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Değiştirilemez Kayıtlar</p>
                        <p className="text-sm text-gray-600">Organ bağış kararınız blockchain'de kalıcı olarak korunur, hiç kimse değiştiremez veya silemez</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">e-Nabız Senkronizasyonu</p>
                        <p className="text-sm text-gray-600">Sağlık Bakanlığı e-Nabız sistemi ile otomatik senkronizasyon</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Aile Onayı Kaydı</p>
                        <p className="text-sm text-gray-600">Yakın akraba onayları da blockchain'de güvenle saklanır</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Acil Durum Erişimi</p>
                        <p className="text-sm text-gray-600">Kritik anlarda bağış durumu anında sorgulanabilir</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">%100 Yönetmelik Uyumu</p>
                        <p className="text-sm text-gray-600">Sağlık Bakanlığı organ nakli yönetmeliklerine tam uyum</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Hayat Kurtaran Teknoloji</p>
                        <p className="text-sm text-gray-600">Her yıl 1000+ kişinin hayatını kurtarma potansiyeli</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold mb-1">Türkiye'de Blockchain ile İlk Organ Bağış Sistemi</p>
                      <p className="text-red-100">Medi: Hayat kurtaran blockchain teknolojisi</p>
                    </div>
                    <Badge className="bg-white text-red-700 px-4 py-2 text-lg font-bold">
                      🇹🇷 İLK
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Notice */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
                    <Database className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">İnteraktif Blockchain Özellikleri</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Tam blockchain cüzdan bağlantısı, kayıt yükleme, rıza yönetimi ve acil erişim özellikleri
                    şu anda geliştirilmektedir. Üretim dağıtımına erken erişim için satış ekibiyle iletişime geçin.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={() => alert('İletişim: satis@medi.ailydian.com')}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Demo İsteyin
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/tr/compliance/blockchain-security')}
                    >
                      Daha Fazla Bilgi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Product Tour */}
      <ProductTour
        steps={trPatientsTourSteps}
        storageKey={trPatientsTourConfig.storageKey}
        title={trPatientsTourConfig.title}
        subtitle={trPatientsTourConfig.subtitle}
        completionMessage={trPatientsTourConfig.completionMessage}
      />
    </div>
  )
}

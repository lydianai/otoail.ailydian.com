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
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { generateComprehensivePatients, type PatientDemographics } from '@/lib/data/patient-data'
import { cn } from '@/lib/utils'

interface PatientsPageProps {
  params: {
    lang: 'en' | 'tr'
  }
}

export default function PatientsPage({ params }: PatientsPageProps) {
  const router = useRouter()
  const { lang } = params
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [genderFilter, setGenderFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(25)
  const [isClient, setIsClient] = useState(false)

  const [patients] = useState<PatientDemographics[]>(() => generateComprehensivePatients(100, lang))

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
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  if (!isClient) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
              <Heart className="h-6 w-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="mt-6 text-base font-medium text-gray-700">Loading patient records...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const t = {
    en: {
      patientManagement: 'Patient Management',
      ehrSystem: 'Electronic Health Records System',
      exportData: 'Export Data',
      export: 'Export',
      newPatient: 'New Patient',
      new: 'New',
      totalPatients: 'Total Patients',
      allRegistered: 'All registered',
      activePatients: 'Active Patients',
      currentlyActive: 'Currently active',
      male: 'Male',
      female: 'Female',
      ofTotal: 'of total',
      averageAge: 'Average Age',
      yearsOld: 'Years old',
      searchPlaceholder: 'Search by name, MRN, or email...',
      allStatus: 'All Status',
      active: 'Active',
      inactive: 'Inactive',
      deceased: 'Deceased',
      allGenders: 'All Genders',
      other: 'Other',
      moreFilters: 'More Filters',
      showing: 'Showing',
      of: 'of',
      patients: 'patients',
      patient: 'PATIENT',
      mrn: 'MRN',
      ageGender: 'AGE/GENDER',
      contact: 'CONTACT',
      insurance: 'INSURANCE',
      lastVisit: 'LAST VISIT',
      status: 'STATUS',
      actions: 'ACTIONS',
      years: 'years',
      viewDetails: 'View Details',
      editPatient: 'Edit Patient',
      clinicalNotes: 'Clinical Notes',
      page: 'Page',
      lastVisitLabel: 'Last visit',
      noVisits: 'No visits',
      matching: 'matching',
    },
    tr: {
      patientManagement: 'Hasta Yönetimi',
      ehrSystem: 'Elektronik Sağlık Kayıtları Sistemi',
      exportData: 'Dışa Aktar',
      export: 'Dışa Aktar',
      newPatient: 'Yeni Hasta',
      new: 'Yeni',
      totalPatients: 'Toplam Hasta',
      allRegistered: 'Tümü kayıtlı',
      activePatients: 'Aktif Hastalar',
      currentlyActive: 'Şu anda aktif',
      male: 'Erkek',
      female: 'Kadın',
      ofTotal: 'toplam',
      averageAge: 'Ortalama Yaş',
      yearsOld: 'yaşında',
      searchPlaceholder: 'İsim, MRN veya e-posta ile ara...',
      allStatus: 'Tüm Durumlar',
      active: 'Aktif',
      inactive: 'İnaktif',
      deceased: 'Vefat',
      allGenders: 'Tüm Cinsiyetler',
      other: 'Diğer',
      moreFilters: 'Daha Fazla Filtre',
      showing: 'Gösterilen',
      of: '/',
      patients: 'hasta',
      patient: 'HASTA',
      mrn: 'MRN',
      ageGender: 'YAŞ/CİNSİYET',
      contact: 'İLETİŞİM',
      insurance: 'SİGORTA',
      lastVisit: 'SON ZİYARET',
      status: 'DURUM',
      actions: 'İŞLEMLER',
      years: 'yaş',
      viewDetails: 'Detayları Gör',
      editPatient: 'Hastayı Düzenle',
      clinicalNotes: 'Klinik Notlar',
      page: 'Sayfa',
      lastVisitLabel: 'Son ziyaret',
      noVisits: 'Ziyaret yok',
      matching: 'eşleşen',
    },
  }

  const content = t[lang] || t.en

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Premium Header - Responsive */}
        <div className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/30 flex-shrink-0">
                  <Users className="h-5 w-5 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    {content.patientManagement}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1 font-medium">{content.ehrSystem}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    // Export functionality
                    alert('Export feature - Coming soon!')
                  }}
                  className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center justify-center gap-2 font-semibold text-gray-700 hover:text-gray-900"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">{content.exportData}</span>
                  <span className="sm:hidden">{content.export}</span>
                </button>
                <button
                  onClick={() => {
                    router.push(`/${lang}/patients/new`)
                  }}
                  className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 font-semibold whitespace-nowrap"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">{content.newPatient}</span>
                  <span className="sm:hidden">{content.new}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Premium Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Activity className="h-6 w-6" />
                </div>
                <TrendingUp className="h-5 w-5 text-blue-200" />
              </div>
              <p className="text-sm font-medium text-blue-100 mb-1">{content.totalPatients}</p>
              <p className="text-4xl font-bold tracking-tight">{stats.total}</p>
              <p className="text-xs text-blue-200 mt-2">{content.allRegistered}</p>
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
              <p className="text-sm font-semibold text-gray-600 mb-1">{content.activePatients}</p>
              <p className="text-4xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-xs text-gray-500 mt-2">{content.currentlyActive}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">{content.male}</p>
              <p className="text-4xl font-bold text-gray-900">{stats.male}</p>
              <p className="text-xs text-gray-500 mt-2">{Math.round((stats.male / stats.total) * 100)}% {content.ofTotal}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">{content.female}</p>
              <p className="text-4xl font-bold text-gray-900">{stats.female}</p>
              <p className="text-xs text-gray-500 mt-2">{Math.round((stats.female / stats.total) * 100)}% {content.ofTotal}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">{content.averageAge}</p>
              <p className="text-4xl font-bold text-gray-900">{stats.avgAge}</p>
              <p className="text-xs text-gray-500 mt-2">{content.yearsOld}</p>
            </div>
          </div>

          {/* Premium Search and Filters - Fully Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Search Bar - Full width on mobile */}
              <div className="relative w-full">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={content.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm sm:text-base text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Filters - Stack on mobile, row on desktop */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white font-semibold text-sm sm:text-base text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                >
                  <option value="all">{content.allStatus}</option>
                  <option value="Active">{content.active}</option>
                  <option value="Inactive">{content.inactive}</option>
                  <option value="Deceased">{content.deceased}</option>
                </select>

                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white font-semibold text-sm sm:text-base text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                >
                  <option value="all">{content.allGenders}</option>
                  <option value="Male">{content.male}</option>
                  <option value="Female">{content.female}</option>
                  <option value="Other">{content.other}</option>
                </select>

                <button className="sm:flex-shrink-0 px-4 sm:px-5 py-3 border-2 border-gray-200 bg-white rounded-lg sm:rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center justify-center gap-2 font-semibold text-sm sm:text-base text-gray-700">
                  <Filter className="h-4 w-4" />
                  <span>{content.moreFilters}</span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-600">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              {content.showing} {paginatedPatients.length} {content.of} {filteredPatients.length} {content.patients}
              {searchQuery && <span className="text-blue-600"> {content.matching} "{searchQuery}"</span>}
            </div>
          </div>

          {/* Premium Patient Table - Desktop Only */}
          <div className="hidden lg:block bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{content.patient}</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{content.mrn}</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{content.ageGender}</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{content.contact}</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{content.insurance}</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{content.lastVisit}</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{content.status}</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">{content.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
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
                          {patient.age} {content.years}
                        </div>
                        <div className="text-xs font-semibold text-gray-500">{patient.gender}</div>
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
                          {patient.lastVisitDate ? formatDate(patient.lastVisitDate) : content.noVisits}
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
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => router.push(`/${lang}/patients/${patient.id}`)}
                            className="p-2.5 hover:bg-blue-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-blue-200 hover:shadow-md"
                            title={content.viewDetails}
                          >
                            <Eye className="h-4 w-4 text-gray-600 group-hover/btn:text-blue-600" />
                          </button>
                          <button
                            onClick={() => router.push(`/${lang}/patients/${patient.id}`)}
                            className="p-2.5 hover:bg-purple-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-purple-200 hover:shadow-md"
                            title={content.editPatient}
                          >
                            <Edit className="h-4 w-4 text-gray-600 group-hover/btn:text-purple-600" />
                          </button>
                          <button
                            onClick={() => router.push(`/${lang}/patients/${patient.id}`)}
                            className="p-2.5 hover:bg-green-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-green-200 hover:shadow-md"
                            title={content.clinicalNotes}
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

            {/* Premium Pagination */}
            <div className="flex items-center justify-between border-t-2 border-gray-100 px-6 py-5 bg-gray-50/50">
              <div className="text-sm font-semibold text-gray-700">
                {content.page} {currentPage} {content.of} {totalPages}
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
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
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

          {/* Mobile Card Layout - Show only on mobile/tablet */}
          <div className="lg:hidden space-y-4">
            {paginatedPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-xl border-2 border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                {/* Patient Header */}
                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                    {patient.firstName[0]}{patient.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-base truncate">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      DOB: {formatDate(patient.dateOfBirth)}
                    </div>
                    <div className="mt-2">
                      <Badge
                        className={cn(
                          'text-xs font-semibold',
                          patient.status === 'Active' && 'bg-emerald-100 text-emerald-700 border-emerald-300',
                          patient.status === 'Inactive' && 'bg-gray-100 text-gray-700 border-gray-300',
                          patient.status === 'Deceased' && 'bg-red-100 text-red-700 border-red-300'
                        )}
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Patient Details Grid */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-gray-500 w-20 flex-shrink-0">{content.mrn}:</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono font-bold text-gray-700">
                      {patient.mrn}
                    </code>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-gray-500 w-20 flex-shrink-0">{content.ageGender}:</span>
                    <span className="text-sm font-bold text-gray-900">
                      {patient.age} {content.years} • {patient.gender}
                    </span>
                  </div>

                  {patient.phone.mobile && (
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <a href={`tel:${patient.phone.mobile}`} className="text-sm font-medium text-blue-600 hover:underline">
                        {patient.phone.mobile}
                      </a>
                    </div>
                  )}

                  {patient.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <a href={`mailto:${patient.email}`} className="text-sm font-medium text-blue-600 hover:underline truncate">
                        {patient.email}
                      </a>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-gray-500 w-20 flex-shrink-0">{content.insurance}:</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900">
                        {patient.insurance.primary.provider}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {patient.insurance.primary.policyNumber}
                      </div>
                    </div>
                  </div>

                  {patient.lastVisitDate && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700">
                        {content.lastVisitLabel}: {formatDate(patient.lastVisitDate)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => router.push(`/${lang}/patients/${patient.id}`)}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span>{content.viewDetails}</span>
                  </button>
                  <button
                    onClick={() => router.push(`/${lang}/patients/${patient.id}/edit`)}
                    className="px-4 py-2.5 border-2 border-gray-200 bg-white rounded-lg hover:border-gray-300 hover:shadow-md transition-all flex items-center justify-center gap-2 font-semibold text-gray-700 text-sm"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Mobile Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border-2 border-gray-100 p-4">
              <div className="text-sm font-semibold text-gray-700 text-center sm:text-left">
                {content.page} {currentPage} {content.of} {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-700" />
                </button>
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        'w-9 h-9 rounded-lg font-bold transition-all text-sm',
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'border-2 border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      )}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                >
                  <ChevronRight className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

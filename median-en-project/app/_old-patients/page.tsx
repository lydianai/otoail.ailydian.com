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

export default function PatientsPage() {
  const router = useRouter()
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

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Premium Header - Responsive */}
        <div className="bg-white border-b border-gray-200/80 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/30 flex-shrink-0">
                  <Users className="h-5 w-5 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Patient Management
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1 font-medium">Electronic Health Records System</p>
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
                  <span className="hidden sm:inline">Export Data</span>
                  <span className="sm:hidden">Export</span>
                </button>
                <button
                  onClick={() => {
                    router.push('/patients/new')
                  }}
                  className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 font-semibold whitespace-nowrap"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">New Patient</span>
                  <span className="sm:hidden">New</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Premium Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Activity className="h-6 w-6" />
                </div>
                <TrendingUp className="h-5 w-5 text-blue-200" />
              </div>
              <p className="text-sm font-medium text-blue-100 mb-1">Total Patients</p>
              <p className="text-4xl font-bold tracking-tight">{stats.total}</p>
              <p className="text-xs text-blue-200 mt-2">All registered</p>
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
              <p className="text-sm font-semibold text-gray-600 mb-1">Active Patients</p>
              <p className="text-4xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-xs text-gray-500 mt-2">Currently active</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Male</p>
              <p className="text-4xl font-bold text-gray-900">{stats.male}</p>
              <p className="text-xs text-gray-500 mt-2">{Math.round((stats.male / stats.total) * 100)}% of total</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Female</p>
              <p className="text-4xl font-bold text-gray-900">{stats.female}</p>
              <p className="text-xs text-gray-500 mt-2">{Math.round((stats.female / stats.total) * 100)}% of total</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Average Age</p>
              <p className="text-4xl font-bold text-gray-900">{stats.avgAge}</p>
              <p className="text-xs text-gray-500 mt-2">Years old</p>
            </div>
          </div>

          {/* Premium Search and Filters */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, MRN, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all min-w-[160px]"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Deceased">Deceased</option>
              </select>

              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all min-w-[160px]"
              >
                <option value="all">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <button className="px-5 py-3 border-2 border-gray-200 bg-white rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center gap-2 font-semibold text-gray-700">
                <Filter className="h-4 w-4" />
                More
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-600">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              Showing {paginatedPatients.length} of {filteredPatients.length} patients
              {searchQuery && <span className="text-blue-600"> matching "{searchQuery}"</span>}
            </div>
          </div>

          {/* Premium Patient Table */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">MRN</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Age/Gender</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Insurance</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Last Visit</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
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
                          {patient.age} years
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
                          {patient.lastVisitDate ? formatDate(patient.lastVisitDate) : 'No visits'}
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
                            onClick={() => router.push(`/patients/${patient.id}`)}
                            className="p-2.5 hover:bg-blue-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-blue-200 hover:shadow-md"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 text-gray-600 group-hover/btn:text-blue-600" />
                          </button>
                          <button
                            onClick={() => router.push(`/patients/${patient.id}`)}
                            className="p-2.5 hover:bg-purple-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-purple-200 hover:shadow-md"
                            title="Edit Patient"
                          >
                            <Edit className="h-4 w-4 text-gray-600 group-hover/btn:text-purple-600" />
                          </button>
                          <button
                            onClick={() => router.push(`/patients/${patient.id}`)}
                            className="p-2.5 hover:bg-green-100 rounded-xl transition-all group/btn border-2 border-transparent hover:border-green-200 hover:shadow-md"
                            title="Clinical Notes"
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
                Page {currentPage} of {totalPages}
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
        </div>
      </div>
    </DashboardLayout>
  )
}

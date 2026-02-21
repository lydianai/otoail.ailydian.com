'use client'

import { useState, useMemo, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  sampleRadiologyStudies,
  calculateRadiologyStats,
  type ImagingStudy,
  type ImagingModality,
  type StudyStatus,
  type StudyPriority,
  type BodyPart,
} from '@/lib/data/radiology-data'
import {
  Search,
  Filter,
  Calendar,
  AlertCircle,
  Activity,
  Image as ImageIcon,
  FileText,
  UserCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  Eye,
  Download,
  Send,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RadiologyPage() {
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedModality, setSelectedModality] = useState<ImagingModality | 'All'>('All')
  const [selectedStatus, setSelectedStatus] = useState<StudyStatus | 'All'>('All')
  const [selectedPriority, setSelectedPriority] = useState<StudyPriority | 'All'>('All')
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | 'All'>('All')
  const [selectedStudy, setSelectedStudy] = useState<ImagingStudy | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    setIsClient(true)
  }, [])

  const stats = useMemo(() => calculateRadiologyStats(sampleRadiologyStudies), [])

  const filteredStudies = useMemo(() => {
    return sampleRadiologyStudies.filter((study) => {
      const matchesSearch =
        searchQuery === '' ||
        study.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.patientMRN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.accessionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.studyDescription.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesModality = selectedModality === 'All' || study.modality === selectedModality
      const matchesStatus = selectedStatus === 'All' || study.status === selectedStatus
      const matchesPriority = selectedPriority === 'All' || study.priority === selectedPriority
      const matchesBodyPart = selectedBodyPart === 'All' || study.bodyPart === selectedBodyPart

      return (
        matchesSearch && matchesModality && matchesStatus && matchesPriority && matchesBodyPart
      )
    })
  }, [searchQuery, selectedModality, selectedStatus, selectedPriority, selectedBodyPart])

  const paginatedStudies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredStudies.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredStudies, currentPage])

  const totalPages = Math.ceil(filteredStudies.length / itemsPerPage)

  const formatDateTime = (dateString: string) => {
    if (!isClient) {
      return new Date(dateString).toISOString().split('T')[0]
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(dateString))
  }

  const formatDate = (dateString: string) => {
    if (!isClient) {
      return new Date(dateString).toISOString().split('T')[0]
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString))
  }

  const getStatusIcon = (status: StudyStatus) => {
    switch (status) {
      case 'Scheduled':
        return <Clock className="h-4 w-4" />
      case 'In Progress':
        return <Activity className="h-4 w-4" />
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />
      case 'Preliminary Read':
        return <FileText className="h-4 w-4" />
      case 'Final Read':
        return <CheckCircle className="h-4 w-4" />
      case 'Cancelled':
        return <XCircle className="h-4 w-4" />
      case 'Critical':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: StudyStatus) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Preliminary Read':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Final Read':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Critical':
        return 'bg-red-600 text-white border-red-700'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: StudyPriority) => {
    switch (priority) {
      case 'STAT':
        return 'bg-red-600 text-white border-red-700'
      case 'Urgent':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Routine':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getModalityIcon = (modality: ImagingModality) => {
    return <ImageIcon className="h-4 w-4" />
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-8">
        {/* Premium Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <ImageIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Radiology & PACS
              </h1>
              <p className="text-base font-semibold text-gray-600 mt-1">
                Picture Archiving and Communication System
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <ImageIcon className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.totalStudies}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Total Studies</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <Clock className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.scheduled}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Scheduled</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <FileText className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.pendingRead}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Pending Read</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.criticalFindings}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Critical Findings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Search Studies</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Patient, MRN, Accession..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Modality Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Modality</label>
              <select
                value={selectedModality}
                onChange={(e) => {
                  setSelectedModality(e.target.value as ImagingModality | 'All')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Modalities</option>
                <option value="X-Ray">X-Ray</option>
                <option value="CT">CT</option>
                <option value="MRI">MRI</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Mammography">Mammography</option>
                <option value="PET">PET</option>
                <option value="Nuclear Medicine">Nuclear Medicine</option>
                <option value="Fluoroscopy">Fluoroscopy</option>
                <option value="Bone Density">Bone Density</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value as StudyStatus | 'All')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Preliminary Read">Preliminary Read</option>
                <option value="Final Read">Final Read</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => {
                  setSelectedPriority(e.target.value as StudyPriority | 'All')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Priorities</option>
                <option value="STAT">STAT</option>
                <option value="Urgent">Urgent</option>
                <option value="Routine">Routine</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center justify-between">
            <div className="text-sm font-bold text-gray-600">
              Showing {paginatedStudies.length} of {filteredStudies.length} studies
            </div>
            {(searchQuery || selectedModality !== 'All' || selectedStatus !== 'All' || selectedPriority !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedModality('All')
                  setSelectedStatus('All')
                  setSelectedPriority('All')
                  setSelectedBodyPart('All')
                  setCurrentPage(1)
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Studies Table */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Accession / Patient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Study Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Physician / Radiologist
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Date / Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Status / Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedStudies.map((study) => (
                  <tr
                    key={study.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all group cursor-pointer"
                    onClick={() => setSelectedStudy(study)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                          {study.patientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{study.patientName}</div>
                          <div className="text-xs font-semibold text-gray-500">
                            ACC: {study.accessionNumber}
                          </div>
                          <div className="text-xs font-semibold text-gray-500">
                            MRN: {study.patientMRN}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {getModalityIcon(study.modality)}
                          <span className="text-sm font-bold text-gray-900">{study.modality}</span>
                        </div>
                        <div className="text-xs font-semibold text-gray-700">
                          {study.studyDescription}
                        </div>
                        <div className="text-xs font-semibold text-gray-500">
                          {study.bodyPart}
                          {study.contrast && (
                            <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 rounded-lg font-bold">
                              {study.contrastType}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-gray-900">
                          Ordering: {study.orderingPhysician}
                        </div>
                        {study.radiologist && (
                          <div className="text-xs font-semibold text-gray-700">
                            Reading: {study.radiologist}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-gray-900">
                          Scheduled: {formatDate(study.scheduledDate)}
                        </div>
                        {study.studyDate && (
                          <div className="text-xs font-semibold text-gray-600">
                            Performed: {formatDate(study.studyDate)}
                          </div>
                        )}
                        {study.readDate && (
                          <div className="text-xs font-semibold text-green-600">
                            Read: {formatDate(study.readDate)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <span
                          className={cn(
                            'inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2',
                            getStatusColor(study.status)
                          )}
                        >
                          {getStatusIcon(study.status)}
                          <span>{study.status}</span>
                        </span>
                        <div>
                          <span
                            className={cn(
                              'inline-flex px-3 py-1 rounded-xl text-xs font-bold border-2',
                              getPriorityColor(study.priority)
                            )}
                          >
                            {study.priority}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedStudy(study)
                          }}
                          className="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
                          title="View Study"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {study.pacsLocation && (
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all"
                            title="Open PACS"
                          >
                            <ImageIcon className="h-4 w-4" />
                          </button>
                        )}
                        {study.findings && (
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl bg-green-100 hover:bg-green-200 text-green-700 transition-all"
                            title="Download Report"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={cn(
                      'px-4 py-2 rounded-xl font-bold transition-all',
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md text-gray-700'
                    )}
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
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
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={cn(
                      'px-4 py-2 rounded-xl font-bold transition-all',
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md text-gray-700'
                    )}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Study Detail Modal */}
        {selectedStudy && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStudy(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-black mb-2">Imaging Study Details</h2>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold opacity-90">
                        Accession: {selectedStudy.accessionNumber}
                      </span>
                      <span className="text-sm font-bold opacity-90">•</span>
                      <span className="text-sm font-bold opacity-90">ID: {selectedStudy.id}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudy(null)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Patient Information */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                    <UserCircle className="h-5 w-5 text-blue-600" />
                    <span>Patient Information</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Patient Name</div>
                      <div className="text-sm font-bold text-gray-900">{selectedStudy.patientName}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">MRN</div>
                      <div className="text-sm font-bold text-gray-900">{selectedStudy.patientMRN}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Date of Birth</div>
                      <div className="text-sm font-bold text-gray-900">{selectedStudy.patientDOB}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Gender</div>
                      <div className="text-sm font-bold text-gray-900">
                        {selectedStudy.patientGender === 'M' ? 'Male' : selectedStudy.patientGender === 'F' ? 'Female' : 'Other'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Information */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5 text-purple-600" />
                    <span>Study Information</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Modality</div>
                      <div className="text-sm font-bold text-gray-900">{selectedStudy.modality}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Body Part</div>
                      <div className="text-sm font-bold text-gray-900">{selectedStudy.bodyPart}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs font-bold text-gray-600 mb-1">Study Description</div>
                      <div className="text-sm font-bold text-gray-900">{selectedStudy.studyDescription}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs font-bold text-gray-600 mb-1">Clinical Indication</div>
                      <div className="text-sm font-bold text-gray-900">{selectedStudy.indication}</div>
                    </div>
                    {selectedStudy.contrast && (
                      <div className="col-span-2">
                        <div className="text-xs font-bold text-gray-600 mb-1">Contrast Agent</div>
                        <div className="text-sm font-bold text-purple-600">{selectedStudy.contrastType}</div>
                      </div>
                    )}
                    {selectedStudy.numberOfImages && (
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Number of Images</div>
                        <div className="text-sm font-bold text-gray-900">{selectedStudy.numberOfImages}</div>
                      </div>
                    )}
                    {selectedStudy.dicomInstanceUID && (
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">DICOM UID</div>
                        <div className="text-xs font-mono text-gray-700">{selectedStudy.dicomInstanceUID}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Physicians */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-100">
                    <div className="text-xs font-bold text-gray-600 mb-1">Ordering Physician</div>
                    <div className="text-sm font-bold text-gray-900">{selectedStudy.orderingPhysician}</div>
                    <div className="text-xs font-semibold text-gray-500 mt-1">NPI: {selectedStudy.orderingNPI}</div>
                  </div>
                  {selectedStudy.radiologist && (
                    <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-100">
                      <div className="text-xs font-bold text-gray-600 mb-1">Radiologist</div>
                      <div className="text-sm font-bold text-gray-900">{selectedStudy.radiologist}</div>
                      <div className="text-xs font-semibold text-gray-500 mt-1">NPI: {selectedStudy.radiologistNPI}</div>
                    </div>
                  )}
                </div>

                {/* Findings & Impression */}
                {selectedStudy.findings && (
                  <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-100">
                    <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      <span>Findings</span>
                    </h3>
                    <p className="text-sm font-semibold text-gray-800 leading-relaxed">{selectedStudy.findings}</p>
                  </div>
                )}

                {selectedStudy.impression && (
                  <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100">
                    <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Impression</span>
                    </h3>
                    <p className="text-sm font-semibold text-gray-800 leading-relaxed">{selectedStudy.impression}</p>
                  </div>
                )}

                {/* Critical Findings */}
                {selectedStudy.criticalFindings && selectedStudy.criticalFindings.length > 0 && (
                  <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                    <h3 className="text-lg font-black text-red-800 mb-3 flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>CRITICAL FINDINGS</span>
                    </h3>
                    <ul className="space-y-2">
                      {selectedStudy.criticalFindings.map((finding, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-bold text-red-800">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {selectedStudy.recommendations && selectedStudy.recommendations.length > 0 && (
                  <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-100">
                    <h3 className="text-lg font-black text-gray-900 mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {selectedStudy.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ChevronRight className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-semibold text-gray-800">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-4">
                  {selectedStudy.pacsLocation && (
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                      <ImageIcon className="h-5 w-5" />
                      <span>Open in PACS Viewer</span>
                    </button>
                  )}
                  {selectedStudy.findings && (
                    <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:border-gray-400 hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                      <Download className="h-5 w-5" />
                      <span>Download Report</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

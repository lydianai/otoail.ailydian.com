'use client'

import { useState, useMemo, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  sampleSurgicalCases,
  calculateORStats,
  operatingRooms,
  type SurgicalCase,
  type ORType,
  type CaseStatus,
  type CasePriority,
} from '@/lib/data/operating-room-data'
import {
  Search,
  Calendar,
  AlertCircle,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Scissors,
  Heart,
  Brain,
  Bone,
  Eye,
  UserCircle,
  Users,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  Download,
  Syringe,
  Shield,
  MapPin,
  Timer,
  PlayCircle,
  PauseCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function OperatingRoomPage() {
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedORType, setSelectedORType] = useState<ORType | 'All'>('All')
  const [selectedStatus, setSelectedStatus] = useState<CaseStatus | 'All'>('All')
  const [selectedPriority, setSelectedPriority] = useState<CasePriority | 'All'>('All')
  const [selectedDate, setSelectedDate] = useState<string>('all')
  const [selectedCase, setSelectedCase] = useState<SurgicalCase | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'schedule' | 'live' | 'rooms'>('schedule')
  const itemsPerPage = 20

  useEffect(() => {
    setIsClient(true)
  }, [])

  const stats = useMemo(() => calculateORStats(sampleSurgicalCases), [])

  const filteredCases = useMemo(() => {
    return sampleSurgicalCases.filter((case_) => {
      const matchesSearch =
        searchQuery === '' ||
        case_.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.patientMRN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.procedure.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.surgeon.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesORType = selectedORType === 'All' || case_.orType === selectedORType
      const matchesStatus = selectedStatus === 'All' || case_.status === selectedStatus
      const matchesPriority = selectedPriority === 'All' || case_.priority === selectedPriority

      let matchesDate = true
      if (selectedDate !== 'all') {
        const caseDate = new Date(case_.scheduledDate).toISOString().split('T')[0]
        matchesDate = caseDate === selectedDate
      }

      return matchesSearch && matchesORType && matchesStatus && matchesPriority && matchesDate
    })
  }, [searchQuery, selectedORType, selectedStatus, selectedPriority, selectedDate])

  const paginatedCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredCases.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredCases, currentPage])

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage)

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

  const formatTime = (timeString: string) => {
    if (!isClient) return timeString
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getStatusIcon = (status: CaseStatus) => {
    switch (status) {
      case 'Scheduled':
        return <Calendar className="h-4 w-4" />
      case 'Pre-Op':
        return <ClipboardList className="h-4 w-4" />
      case 'In Progress':
        return <PlayCircle className="h-4 w-4" />
      case 'Closing':
        return <PauseCircle className="h-4 w-4" />
      case 'Recovery':
        return <Heart className="h-4 w-4" />
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />
      case 'Cancelled':
        return <XCircle className="h-4 w-4" />
      case 'Delayed':
        return <Clock className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Pre-Op':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'In Progress':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Closing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Recovery':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Delayed':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: CasePriority) => {
    switch (priority) {
      case 'STAT':
        return 'bg-red-600 text-white border-red-700'
      case 'Emergent':
        return 'bg-red-500 text-white border-red-600'
      case 'Urgent':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Elective':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getORTypeIcon = (orType: ORType) => {
    switch (orType) {
      case 'Cardiac':
        return <Heart className="h-4 w-4" />
      case 'Neurosurgery':
        return <Brain className="h-4 w-4" />
      case 'Orthopedic':
        return <Bone className="h-4 w-4" />
      case 'Ophthalmology':
        return <Eye className="h-4 w-4" />
      default:
        return <Scissors className="h-4 w-4" />
    }
  }

  const getASAColor = (asaClass: string) => {
    switch (asaClass) {
      case 'I':
        return 'bg-green-100 text-green-800'
      case 'II':
        return 'bg-blue-100 text-blue-800'
      case 'III':
        return 'bg-yellow-100 text-yellow-800'
      case 'IV':
        return 'bg-orange-100 text-orange-800'
      case 'V':
      case 'VI':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-8">
        {/* Premium Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <Scissors className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Operating Room Management
              </h1>
              <p className="text-base font-semibold text-gray-600 mt-1">
                Surgical Scheduling, Case Tracking & OR Utilization
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="mb-6 flex items-center space-x-3">
          <button
            onClick={() => setViewMode('schedule')}
            className={cn(
              'px-6 py-3 rounded-xl font-bold transition-all',
              viewMode === 'schedule'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
            )}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Schedule View</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('live')}
            className={cn(
              'px-6 py-3 rounded-xl font-bold transition-all',
              viewMode === 'live'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
            )}
          >
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Live Board</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('rooms')}
            className={cn(
              'px-6 py-3 rounded-xl font-bold transition-all',
              viewMode === 'rooms'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
            )}
          >
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>OR Status</span>
            </div>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <MapPin className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.totalORs}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Total ORs</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.availableORs}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Available</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <Activity className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.inUseORs}</div>
                <div className="text-sm font-bold opacity-90 mt-1">In Use</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.scheduledCases}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Scheduled</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.emergentCases}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Emergent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Utilization Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">OR Utilization</h3>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-end space-x-3">
              <div className="text-5xl font-black text-gray-900">{stats.averageUtilization}%</div>
              <div className="text-sm font-bold text-green-600 mb-2">+3.2% vs last week</div>
            </div>
            <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                style={{ width: `${stats.averageUtilization}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">Avg Turnover Time</h3>
              <Timer className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-end space-x-3">
              <div className="text-5xl font-black text-gray-900">{stats.averageTurnoverTime}</div>
              <div className="text-sm font-bold text-gray-600 mb-2">minutes</div>
            </div>
            <div className="mt-4 text-sm font-semibold text-gray-600">
              Target: &lt;30 min | Status:{' '}
              <span className={cn(
                'font-bold',
                stats.averageTurnoverTime <= 30 ? 'text-green-600' : 'text-orange-600'
              )}>
                {stats.averageTurnoverTime <= 30 ? 'On Target' : 'Above Target'}
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Search Cases</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Patient, MRN, Case #, Procedure, Surgeon..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* OR Type Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">OR Type</label>
              <select
                value={selectedORType}
                onChange={(e) => {
                  setSelectedORType(e.target.value as ORType | 'All')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Types</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Cardiac">Cardiac</option>
                <option value="Neurosurgery">Neurosurgery</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Vascular">Vascular</option>
                <option value="Pediatric">Pediatric</option>
                <option value="Trauma">Trauma</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="ENT">ENT</option>
                <option value="GYN">GYN</option>
                <option value="Urology">Urology</option>
                <option value="Plastic Surgery">Plastic Surgery</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value as CaseStatus | 'All')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Pre-Op">Pre-Op</option>
                <option value="In Progress">In Progress</option>
                <option value="Closing">Closing</option>
                <option value="Recovery">Recovery</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => {
                  setSelectedPriority(e.target.value as CasePriority | 'All')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Priorities</option>
                <option value="Elective">Elective</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergent">Emergent</option>
                <option value="STAT">STAT</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center justify-between">
            <div className="text-sm font-bold text-gray-600">
              Showing {paginatedCases.length} of {filteredCases.length} cases
            </div>
            {(searchQuery || selectedORType !== 'All' || selectedStatus !== 'All' || selectedPriority !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedORType('All')
                  setSelectedStatus('All')
                  setSelectedPriority('All')
                  setCurrentPage(1)
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Case / Patient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Procedure / Surgeon
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    OR Room / Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Schedule / Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Status / Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    ASA / Anesthesia
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedCases.map((case_) => (
                  <tr
                    key={case_.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all group cursor-pointer"
                    onClick={() => setSelectedCase(case_)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                          {case_.patientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{case_.patientName}</div>
                          <div className="text-xs font-semibold text-gray-500">
                            Case: {case_.caseNumber}
                          </div>
                          <div className="text-xs font-semibold text-gray-500">
                            MRN: {case_.patientMRN}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-gray-900">{case_.procedure}</div>
                        <div className="text-xs font-semibold text-gray-600">
                          CPT: {case_.procedureCPTCodes.join(', ')}
                        </div>
                        <div className="text-xs font-semibold text-gray-700">
                          {case_.surgeon}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-gray-900">{case_.orRoom}</div>
                        <div className="flex items-center space-x-1 text-xs font-semibold text-gray-600">
                          {getORTypeIcon(case_.orType)}
                          <span>{case_.orType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-gray-900">
                          {formatDate(case_.scheduledDate)}
                        </div>
                        <div className="text-xs font-semibold text-gray-600">
                          {formatTime(case_.scheduledStartTime)}
                        </div>
                        <div className="text-xs font-semibold text-gray-500">
                          {case_.scheduledDuration} min
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <span
                          className={cn(
                            'inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2',
                            getStatusColor(case_.status)
                          )}
                        >
                          {getStatusIcon(case_.status)}
                          <span>{case_.status}</span>
                        </span>
                        <div>
                          <span
                            className={cn(
                              'inline-flex px-3 py-1 rounded-xl text-xs font-bold border-2',
                              getPriorityColor(case_.priority)
                            )}
                          >
                            {case_.priority}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <span
                          className={cn(
                            'inline-flex px-3 py-1.5 rounded-xl text-xs font-bold',
                            getASAColor(case_.asaClass)
                          )}
                        >
                          ASA {case_.asaClass}
                        </span>
                        <div className="text-xs font-semibold text-gray-600">
                          {case_.anesthesiaType}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCase(case_)
                          }}
                          className="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
                          title="View Case"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-green-100 hover:bg-green-200 text-green-700 transition-all"
                          title="Start Case"
                        >
                          <PlayCircle className="h-4 w-4" />
                        </button>
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

        {/* Case Detail Modal */}
        {selectedCase && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCase(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-black mb-2">Surgical Case Details</h2>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold opacity-90">
                        Case: {selectedCase.caseNumber}
                      </span>
                      <span className="text-sm font-bold opacity-90">•</span>
                      <span className="text-sm font-bold opacity-90">ID: {selectedCase.id}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCase(null)}
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Patient Name</div>
                      <div className="text-sm font-bold text-gray-900">{selectedCase.patientName}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">MRN</div>
                      <div className="text-sm font-bold text-gray-900">{selectedCase.patientMRN}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Age / Gender</div>
                      <div className="text-sm font-bold text-gray-900">
                        {selectedCase.patientAge} / {selectedCase.patientGender === 'M' ? 'Male' : 'Female'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">DOB</div>
                      <div className="text-sm font-bold text-gray-900">{selectedCase.patientDOB}</div>
                    </div>
                  </div>
                </div>

                {/* Procedure Information */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                    <Scissors className="h-5 w-5 text-purple-600" />
                    <span>Procedure Information</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div className="text-xs font-bold text-gray-600 mb-1">Procedure</div>
                      <div className="text-sm font-bold text-gray-900">{selectedCase.procedure}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">CPT Code(s)</div>
                      <div className="text-sm font-bold text-gray-900">
                        {selectedCase.procedureCPTCodes.join(', ')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Laterality</div>
                      <div className="text-sm font-bold text-gray-900">{selectedCase.laterality}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs font-bold text-gray-600 mb-1">Diagnosis</div>
                      <div className="text-sm font-bold text-gray-900">{selectedCase.diagnosis}</div>
                    </div>
                  </div>
                </div>

                {/* OR & Scheduling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100">
                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>OR Assignment</span>
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">OR Room</div>
                        <div className="text-sm font-bold text-gray-900">{selectedCase.orRoom}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">OR Type</div>
                        <div className="flex items-center space-x-2">
                          {getORTypeIcon(selectedCase.orType)}
                          <span className="text-sm font-bold text-gray-900">{selectedCase.orType}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-100">
                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span>Schedule</span>
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Date & Time</div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatDate(selectedCase.scheduledDate)} at {formatTime(selectedCase.scheduledStartTime)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Duration</div>
                        <div className="text-sm font-bold text-gray-900">
                          {selectedCase.scheduledDuration} minutes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Surgical Team */}
                <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span>Surgical Team</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Surgeon</div>
                      <div className="text-sm font-bold text-gray-900">{selectedCase.surgeon}</div>
                      <div className="text-xs font-semibold text-gray-500 mt-1">
                        NPI: {selectedCase.surgeonNPI}
                      </div>
                    </div>
                    {selectedCase.anesthesiologist && (
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Anesthesiologist</div>
                        <div className="text-sm font-bold text-gray-900">{selectedCase.anesthesiologist}</div>
                      </div>
                    )}
                    {selectedCase.staff.map((staff, idx) => (
                      <div key={idx}>
                        <div className="text-xs font-bold text-gray-600 mb-1">{staff.role}</div>
                        <div className="text-sm font-bold text-gray-900">{staff.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Anesthesia Information */}
                <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-100">
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                    <Syringe className="h-5 w-5 text-yellow-600" />
                    <span>Anesthesia & Risk</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Type</div>
                      <div className="text-sm font-bold text-gray-900">{selectedCase.anesthesiaType}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">ASA Class</div>
                      <span
                        className={cn(
                          'inline-flex px-3 py-1.5 rounded-xl text-xs font-bold',
                          getASAColor(selectedCase.asaClass)
                        )}
                      >
                        ASA {selectedCase.asaClass}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Priority</div>
                      <span
                        className={cn(
                          'inline-flex px-3 py-1 rounded-xl text-xs font-bold border-2',
                          getPriorityColor(selectedCase.priority)
                        )}
                      >
                        {selectedCase.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Safety Checklist */}
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-100">
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Safety Checklist</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-bold text-gray-900">
                        Antibiotic Prophylaxis: {selectedCase.antibioticProphylaxis ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-bold text-gray-900">
                        VTE Prophylaxis: {selectedCase.vteProphylaxis ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actual Times (if case started) */}
                {selectedCase.actualStartTime && (
                  <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-100">
                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-indigo-600" />
                      <span>Case Progress</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Actual Start</div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatDateTime(selectedCase.actualStartTime)}
                        </div>
                      </div>
                      {selectedCase.actualEndTime && (
                        <>
                          <div>
                            <div className="text-xs font-bold text-gray-600 mb-1">Actual End</div>
                            <div className="text-sm font-bold text-gray-900">
                              {formatDateTime(selectedCase.actualEndTime)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-600 mb-1">Actual Duration</div>
                            <div className="text-sm font-bold text-gray-900">
                              {selectedCase.actualDuration} min
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-600 mb-1">EBL</div>
                            <div className="text-sm font-bold text-gray-900">
                              {selectedCase.estimatedBloodLoss} mL
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Complications */}
                {selectedCase.complications && selectedCase.complications.length > 0 && (
                  <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                    <h3 className="text-lg font-black text-red-800 mb-3 flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>Complications / Notes</span>
                    </h3>
                    <ul className="space-y-2">
                      {selectedCase.complications.map((complication, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-bold text-red-800">{complication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                    <PlayCircle className="h-5 w-5" />
                    <span>Start Case</span>
                  </button>
                  <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:border-gray-400 hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Print OR Card</span>
                  </button>
                  <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:border-gray-400 hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                    <ClipboardList className="h-5 w-5" />
                    <span>View Chart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

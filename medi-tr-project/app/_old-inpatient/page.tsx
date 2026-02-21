'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  sampleBeds,
  sampleEncounters,
  sampleUnitCensus,
  calculateBedManagementStats,
  type Bed,
  type InpatientEncounter,
  type UnitType,
} from '@/lib/data/inpatient-data'
import {
  Bed as BedIcon,
  Users,
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  UserPlus,
  UserMinus,
  ArrowRightLeft,
  ChevronRight,
  Calendar,
  Stethoscope,
  Shield,
  FileText,
  Package,
  Map,
  BarChart3,
  Info,
  X,
  User,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function InpatientPage() {
  const [beds, setBeds] = useState(sampleBeds)
  const [encounters, setEncounters] = useState(sampleEncounters)
  const [searchQuery, setSearchQuery] = useState('')
  const [unitFilter, setUnitFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedView, setSelectedView] = useState<'census' | 'patients' | 'beds'>(
    'census'
  )
  const [selectedEncounter, setSelectedEncounter] =
    useState<InpatientEncounter | null>(null)

  const stats = useMemo(
    () => calculateBedManagementStats(beds, encounters),
    [beds, encounters]
  )

  const filteredEncounters = useMemo(() => {
    return encounters.filter((enc) => {
      const matchesSearch =
        searchQuery === '' ||
        enc.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enc.patientMRN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enc.bedAssignment.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enc.admissionDiagnosis.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesUnit =
        unitFilter === 'all' || enc.bedAssignment.unit === unitFilter

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && enc.status === 'Active') ||
        (statusFilter === 'critical' && (enc.criticalLabs || 0) > 0) ||
        (statusFilter === 'isolation' && enc.isolationPrecautions) ||
        (statusFilter === 'discharge' && enc.expectedDischarge)

      return matchesSearch && matchesUnit && matchesStatus
    })
  }, [encounters, searchQuery, unitFilter, statusFilter])

  const getBedStatusColor = (status: string) => {
    const colors = {
      Occupied: 'text-red-700 bg-red-100 border-red-200',
      Available: 'text-green-700 bg-green-100 border-green-200',
      Cleaning: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      Maintenance: 'text-orange-700 bg-orange-100 border-orange-200',
      Reserved: 'text-blue-700 bg-blue-100 border-blue-200',
    }
    return colors[status as keyof typeof colors] || colors.Available
  }

  const getAdmissionTypeColor = (type: string) => {
    const colors = {
      Emergency: 'text-red-700 bg-red-100 border-red-200',
      Elective: 'text-blue-700 bg-blue-100 border-blue-200',
      Urgent: 'text-orange-700 bg-orange-100 border-orange-200',
      Observation: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      Transfer: 'text-purple-700 bg-purple-100 border-purple-200',
    }
    return colors[type as keyof typeof colors] || colors.Elective
  }

  // Detailed Patient View
  if (selectedEncounter) {
    const enc = selectedEncounter
    const bed = beds.find((b) => b.id === enc.bedAssignment.bedId)

    return (
      <DashboardLayout>
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedEncounter(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {enc.patientName}
                </h1>
                <p className="text-gray-600 mt-1">
                  MRN: {enc.patientMRN} • Bed {enc.bedAssignment.bedNumber}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4" />
                Transfer
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                <UserMinus className="h-4 w-4" />
                Discharge
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Patient Demographics */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Patient Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold text-gray-900">{enc.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">MRN</p>
                    <p className="font-semibold text-gray-900">{enc.patientMRN}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-semibold text-gray-900">{enc.patientDOB}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-semibold text-gray-900">
                      {enc.patientGender === 'M'
                        ? 'Male'
                        : enc.patientGender === 'F'
                          ? 'Female'
                          : 'Other'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Insurance</p>
                    <p className="font-semibold text-gray-900">{enc.insurancePlan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Code Status</p>
                    <Badge
                      className={
                        enc.codeStatus.includes('DNR')
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : 'bg-green-100 text-green-700 border-green-200'
                      }
                    >
                      {enc.codeStatus}
                    </Badge>
                  </div>
                </div>

                {enc.allergies && enc.allergies.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-semibold text-red-900 mb-1">
                      Allergies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {enc.allergies.map((allergy, idx) => (
                        <Badge
                          key={idx}
                          className="bg-red-100 text-red-700 border-red-200"
                        >
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {enc.alerts && enc.alerts.length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-900 mb-1">
                      Patient Alerts
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {enc.alerts.map((alert, idx) => (
                        <Badge
                          key={idx}
                          className="bg-yellow-100 text-yellow-700 border-yellow-200"
                        >
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Admission Details */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Admission Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Admission Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(enc.admissionDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Length of Stay</p>
                    <p className="font-semibold text-gray-900">
                      {enc.lengthOfStay} days
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Admission Type</p>
                    <Badge className={getAdmissionTypeColor(enc.admissionType)}>
                      {enc.admissionType}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Admission Source</p>
                    <p className="font-semibold text-gray-900">
                      {enc.admissionSource}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Admission Diagnosis</p>
                    <p className="font-semibold text-gray-900">
                      {enc.admissionDiagnosis}
                    </p>
                  </div>
                  {enc.expectedDischarge && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Expected Discharge</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(enc.expectedDischarge).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Care Team */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Care Team</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Attending Physician</p>
                      <p className="font-semibold text-gray-900">
                        {enc.attendingPhysician}
                      </p>
                      <p className="text-xs text-gray-500">NPI: {enc.attendingNPI}</p>
                    </div>
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                  </div>
                  {enc.consultingPhysicians &&
                    enc.consultingPhysicians.length > 0 && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-2">
                          Consulting Physicians
                        </p>
                        <div className="space-y-1">
                          {enc.consultingPhysicians.map((physician, idx) => (
                            <p key={idx} className="text-sm font-semibold text-gray-900">
                              {physician}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Clinical Status */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Clinical Status
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Active Orders</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {enc.activeOrders}
                    </p>
                  </div>
                  {enc.criticalLabs && enc.criticalLabs > 0 && (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Critical Labs</p>
                      <p className="text-2xl font-bold text-red-600">
                        {enc.criticalLabs}
                      </p>
                    </div>
                  )}
                  {enc.pendingConsults && enc.pendingConsults > 0 && (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Pending Consults</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {enc.pendingConsults}
                      </p>
                    </div>
                  )}
                </div>

                {enc.isolationPrecautions && (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-orange-900 mb-1">
                          Isolation Precautions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {enc.isolationPrecautions.map((precaution, idx) => (
                            <Badge
                              key={idx}
                              className="bg-orange-100 text-orange-700 border-orange-200"
                            >
                              {precaution}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Bed Assignment */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Bed Assignment
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Unit</p>
                    <p className="font-semibold text-gray-900">
                      {enc.bedAssignment.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room</p>
                    <p className="font-semibold text-gray-900">
                      {enc.bedAssignment.room}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bed</p>
                    <p className="font-semibold text-gray-900">
                      {enc.bedAssignment.bedNumber}
                    </p>
                  </div>
                  {bed && bed.features && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Bed Features</p>
                      <div className="flex flex-wrap gap-2">
                        {bed.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    View Chart
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <ArrowRightLeft className="h-4 w-4" />
                    Request Transfer
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <UserMinus className="h-4 w-4" />
                    Plan Discharge
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Procedure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Main List View
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Inpatient & Bed Management
            </h1>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
              <UserPlus className="h-5 w-5" />
              New Admission
            </button>
          </div>
          <p className="text-gray-600 text-lg">
            ADT Tracking, Bed Census & Capacity Management
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BedIcon className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Beds</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBeds}</p>
            <p className="text-xs text-gray-500 mt-2">Hospital capacity</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <Badge className="bg-red-100 text-red-700 border-red-200">
                {stats.overallOccupancyRate.toFixed(0)}%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Occupied</p>
            <p className="text-3xl font-bold text-gray-900">{stats.occupiedBeds}</p>
            <p className="text-xs text-gray-500 mt-2">Active patients</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {stats.availableBeds}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Available</p>
            <p className="text-3xl font-bold text-gray-900">{stats.availableBeds}</p>
            <p className="text-xs text-gray-500 mt-2">Ready for admission</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                {stats.averageLOS.toFixed(1)}d
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Expected D/C</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.expectedDischarges}
            </p>
            <p className="text-xs text-gray-500 mt-2">Today & tomorrow</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <ArrowRightLeft className="h-6 w-6 text-purple-600" />
              </div>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                {stats.pendingTransfers}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Pending Admits</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.pendingAdmissions}
            </p>
            <p className="text-xs text-gray-500 mt-2">Awaiting bed</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-2xl border border-gray-200 p-2 mb-6 inline-flex">
          <button
            onClick={() => setSelectedView('census')}
            className={cn(
              'px-6 py-2 rounded-lg transition-all font-semibold',
              selectedView === 'census'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Unit Census
          </button>
          <button
            onClick={() => setSelectedView('patients')}
            className={cn(
              'px-6 py-2 rounded-lg transition-all font-semibold',
              selectedView === 'patients'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Active Patients
          </button>
          <button
            onClick={() => setSelectedView('beds')}
            className={cn(
              'px-6 py-2 rounded-lg transition-all font-semibold',
              selectedView === 'beds'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Bed Board
          </button>
        </div>

        {/* Search and Filters */}
        {selectedView !== 'census' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by patient name, MRN, bed, or diagnosis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={unitFilter}
                onChange={(e) => setUnitFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
              >
                <option value="all">All Units</option>
                {Array.from(new Set(beds.map((b) => b.unit))).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="critical">Critical Labs</option>
                <option value="isolation">Isolation</option>
                <option value="discharge">Pending Discharge</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>
                Showing {filteredEncounters.length} of {encounters.length} patients
              </span>
            </div>
          </div>
        )}

        {/* Content Based on Selected View */}
        {selectedView === 'census' && (
          <div className="grid grid-cols-3 gap-6">
            {sampleUnitCensus.map((census) => (
              <div
                key={census.unit}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{census.unit}</h3>
                  <Badge
                    className={
                      census.occupancyRate > 90
                        ? 'bg-red-100 text-red-700 border-red-200'
                        : census.occupancyRate > 75
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          : 'bg-green-100 text-green-700 border-green-200'
                    }
                  >
                    {census.occupancyRate.toFixed(0)}%
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Occupied</span>
                    <span className="font-semibold text-gray-900">
                      {census.occupied} / {census.totalBeds}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Available</span>
                    <span className="font-semibold text-green-600">
                      {census.available}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Average LOS</span>
                    <span className="font-semibold text-gray-900">
                      {census.averageLOS.toFixed(1)} days
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Pending Admits</span>
                      <Badge variant="secondary" className="text-xs">
                        {census.pendingAdmissions}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'patients' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Bed
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Diagnosis
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Attending
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      LOS
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEncounters.slice(0, 50).map((enc) => (
                    <tr
                      key={enc.id}
                      onClick={() => setSelectedEncounter(enc)}
                      className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {enc.patientName}
                          </p>
                          <p className="text-sm text-gray-500">
                            MRN: {enc.patientMRN}
                          </p>
                          {enc.isolationPrecautions && (
                            <Badge className="mt-1 text-xs bg-orange-100 text-orange-700 border-orange-200">
                              Isolation
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {enc.bedAssignment.bedNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            {enc.bedAssignment.unit}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {enc.admissionDiagnosis}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {enc.attendingPhysician}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {enc.lengthOfStay} days
                          </p>
                          {enc.expectedDischarge && (
                            <p className="text-xs text-gray-500">
                              D/C:{' '}
                              {new Date(enc.expectedDischarge).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {enc.criticalLabs && enc.criticalLabs > 0 && (
                            <Badge className="text-xs bg-red-100 text-red-700 border-red-200">
                              {enc.criticalLabs} Critical Labs
                            </Badge>
                          )}
                          {enc.alerts && enc.alerts.length > 0 && (
                            <Badge className="text-xs bg-yellow-100 text-yellow-700 border-yellow-200">
                              {enc.alerts.length} Alerts
                            </Badge>
                          )}
                          {!enc.criticalLabs && !enc.alerts && (
                            <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                              Stable
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ChevronRight className="h-5 w-5 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEncounters.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No patients found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        )}

        {selectedView === 'beds' && (
          <div className="grid grid-cols-4 gap-4">
            {beds.slice(0, 100).map((bed) => (
              <div
                key={bed.id}
                className={cn(
                  'bg-white rounded-xl border-2 p-4 transition-all cursor-pointer',
                  bed.status === 'Occupied'
                    ? 'border-red-200 hover:border-red-300'
                    : bed.status === 'Available'
                      ? 'border-green-200 hover:border-green-300'
                      : bed.status === 'Cleaning'
                        ? 'border-yellow-200 hover:border-yellow-300'
                        : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BedIcon className="h-4 w-4 text-gray-600" />
                    <p className="font-bold text-gray-900">{bed.bedNumber}</p>
                  </div>
                  <Badge className={cn('text-xs', getBedStatusColor(bed.status))}>
                    {bed.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mb-2">{bed.unit}</p>
                {bed.currentPatient && (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-900">
                      {bed.currentPatient.patientName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {bed.currentPatient.admissionDiagnosis}
                    </p>
                  </div>
                )}
                {bed.isolationRequired && (
                  <Badge className="mt-2 text-xs bg-orange-100 text-orange-700 border-orange-200">
                    Isolation
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

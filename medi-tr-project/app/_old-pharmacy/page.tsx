'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  samplePrescriptions,
  calculatePharmacyStats,
  formulary,
  type Prescription,
  type Medication,
} from '@/lib/data/pharmacy-data'
import {
  Search,
  Filter,
  Pill,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Shield,
  FileText,
  User,
  Calendar,
  Printer,
  Send,
  X,
  ChevronRight,
  AlertCircle,
  Plus,
  Activity,
  TrendingUp,
  Users,
  Package,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function PharmacyPage() {
  const [prescriptions, setPrescriptions] = useState(samplePrescriptions)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('active')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(
    null
  )
  const [showNewRxModal, setShowNewRxModal] = useState(false)

  const stats = useMemo(() => calculatePharmacyStats(prescriptions), [prescriptions])

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((rx) => {
      const matchesSearch =
        searchQuery === '' ||
        rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.rxNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.medication.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.medication.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.patientMRN.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' &&
          (rx.status === 'Pending' || rx.status === 'Verified')) ||
        (statusFilter === 'dispensed' && rx.status === 'Dispensed') ||
        (statusFilter === 'completed' && rx.status === 'Completed') ||
        (statusFilter === 'controlled' && rx.medication.deaSchedule !== 'Non-Controlled')

      const matchesClass =
        classFilter === 'all' || rx.medication.class === classFilter

      return matchesSearch && matchesStatus && matchesClass
    })
  }, [prescriptions, searchQuery, statusFilter, classFilter])

  const getStatusColor = (status: string) => {
    const colors = {
      Pending: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      Verified: 'text-blue-700 bg-blue-100 border-blue-200',
      Dispensed: 'text-green-700 bg-green-100 border-green-200',
      Completed: 'text-gray-700 bg-gray-100 border-gray-200',
      Cancelled: 'text-red-700 bg-red-100 border-red-200',
      Hold: 'text-orange-700 bg-orange-100 border-orange-200',
      Discontinued: 'text-purple-700 bg-purple-100 border-purple-200',
    }
    return colors[status as keyof typeof colors] || colors.Pending
  }

  const getDEAScheduleColor = (schedule: string) => {
    if (schedule === 'Non-Controlled')
      return 'text-gray-600 bg-gray-100 border-gray-200'
    if (schedule === 'II') return 'text-red-700 bg-red-100 border-red-200'
    if (schedule === 'III' || schedule === 'IV')
      return 'text-orange-700 bg-orange-100 border-orange-200'
    return 'text-yellow-700 bg-yellow-100 border-yellow-200'
  }

  const getFormularyColor = (status: string) => {
    const colors = {
      Preferred: 'text-green-700 bg-green-50 border-green-200',
      'Non-Preferred': 'text-orange-700 bg-orange-50 border-orange-200',
      Restricted: 'text-red-700 bg-red-50 border-red-200',
      'Non-Formulary': 'text-gray-700 bg-gray-50 border-gray-200',
    }
    return colors[status as keyof typeof colors] || colors['Non-Formulary']
  }

  // Detailed Prescription View
  if (selectedPrescription) {
    const rx = selectedPrescription
    const med = rx.medication

    return (
      <DashboardLayout>
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedPrescription(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Prescription Details
                </h1>
                <p className="text-gray-600 mt-1">Rx# {rx.rxNumber}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print Label
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send to Patient
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Patient Information */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Patient Information
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Patient Name</p>
                    <p className="font-semibold text-gray-900">{rx.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">MRN</p>
                    <p className="font-semibold text-gray-900">{rx.patientMRN}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-semibold text-gray-900">{rx.patientDOB}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient ID</p>
                    <p className="font-semibold text-gray-900">{rx.patientId}</p>
                  </div>
                </div>
              </div>

              {/* Medication Details */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Pill className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Medication Details
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {med.brandName}
                      </p>
                      <p className="text-lg text-gray-600 mt-1">
                        {med.genericName} {med.strength}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {med.dosageForm} • {med.route}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getDEAScheduleColor(med.deaSchedule)}>
                        Schedule {med.deaSchedule}
                      </Badge>
                      <Badge className={getFormularyColor(med.formularyStatus)}>
                        {med.formularyStatus}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      NDC Code
                    </p>
                    <p className="text-gray-900 font-mono">{med.ndcCode}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Classification
                    </p>
                    <p className="text-gray-900">{med.class}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Quantity
                      </p>
                      <p className="text-gray-900">{rx.quantity} {med.dosageForm}s</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Days Supply
                      </p>
                      <p className="text-gray-900">{rx.daysSupply} days</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Refills
                      </p>
                      <p className="text-gray-900">{rx.refills} remaining</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">AWP</p>
                      <p className="text-gray-900">${med.awpPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Directions (SIG)
                    </p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {rx.directions}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Indication
                    </p>
                    <p className="text-gray-900">{rx.indication}</p>
                  </div>
                </div>
              </div>

              {/* Prescriber Information */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Prescriber Information
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Prescriber</p>
                    <p className="font-semibold text-gray-900">{rx.prescribedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">NPI</p>
                    <p className="font-semibold text-gray-900">{rx.prescriberNPI}</p>
                  </div>
                  {rx.prescriberDEA && (
                    <div>
                      <p className="text-sm text-gray-500">DEA Number</p>
                      <p className="font-semibold text-gray-900">{rx.prescriberDEA}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Date Written</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(rx.writtenDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Clinical Information */}
              {(med.blackBoxWarning ||
                (med.commonSideEffects && med.commonSideEffects.length > 0) ||
                (med.contraindications && med.contraindications.length > 0)) && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Clinical Information
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {med.blackBoxWarning && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-red-900 mb-1">
                              BLACK BOX WARNING
                            </p>
                            <p className="text-sm text-red-700">
                              {med.blackBoxWarning}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {med.contraindications && med.contraindications.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Contraindications
                        </p>
                        <ul className="space-y-1">
                          {med.contraindications.map((ci, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                              <span className="text-gray-700">{ci}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {med.commonSideEffects && med.commonSideEffects.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Common Side Effects
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {med.commonSideEffects.map((se, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {se}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {med.clinicalPearls && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Clinical Pearls
                        </p>
                        <p className="text-sm text-blue-700">{med.clinicalPearls}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Status</p>
                    <Badge className={cn('text-sm', getStatusColor(rx.status))}>
                      {rx.status}
                    </Badge>
                  </div>
                  {rx.fillDate && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Fill Date</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(rx.fillDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  )}
                  {rx.pharmacist && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pharmacist</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {rx.pharmacist}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Prior Authorization */}
              {rx.priorAuthRequired && (
                <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-orange-900">
                      Prior Authorization
                    </h3>
                  </div>
                  <p className="text-sm text-orange-700 mb-3">
                    This medication requires prior authorization from the insurance
                    provider.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-700">Status:</span>
                    <Badge
                      className={
                        rx.priorAuthStatus === 'Approved'
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                      }
                    >
                      {rx.priorAuthStatus}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Verify Prescription
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Request Refill
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    View History
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <X className="h-4 w-4" />
                    Discontinue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // List View
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pharmacy & E-Prescribing
            </h1>
            <button
              onClick={() => setShowNewRxModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
            >
              <Plus className="h-5 w-5" />
              New Prescription
            </button>
          </div>
          <p className="text-gray-600 text-lg">
            E-Prescribing, Formulary Management & Medication Tracking
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Prescriptions</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalPrescriptions}
            </p>
            <p className="text-xs text-gray-500 mt-2">Active & completed</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                {stats.pendingVerification}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Pending Verification</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.pendingVerification}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Avg. {stats.averageProcessingTime} min
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {stats.readyToDispense}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Ready to Dispense</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.readyToDispense}
            </p>
            <p className="text-xs text-gray-500 mt-2">Verified prescriptions</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <Badge className="bg-red-100 text-red-700 border-red-200">
                {stats.controlledSubstances}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Controlled Substances</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.controlledSubstances}
            </p>
            <p className="text-xs text-gray-500 mt-2">DEA Schedule II-V</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient, Rx#, medication, or MRN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="dispensed">Dispensed</option>
              <option value="completed">Completed</option>
              <option value="controlled">Controlled Substances</option>
            </select>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
            >
              <option value="all">All Classes</option>
              <option value="Antibiotic">Antibiotics</option>
              <option value="Analgesic">Analgesics</option>
              <option value="Antihypertensive">Antihypertensives</option>
              <option value="Antidiabetic">Antidiabetics</option>
              <option value="Anticoagulant">Anticoagulants</option>
              <option value="Antidepressant">Antidepressants</option>
              <option value="Lipid-Lowering">Lipid-Lowering</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>
              Showing {filteredPrescriptions.length} of {prescriptions.length}{' '}
              prescriptions
            </span>
          </div>
        </div>

        {/* Prescriptions Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rx #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Medication
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Prescriber
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrescriptions.slice(0, 50).map((rx) => (
                  <tr
                    key={rx.id}
                    onClick={() => setSelectedPrescription(rx)}
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-mono text-sm font-semibold text-gray-900">
                          {rx.rxNumber}
                        </p>
                        <p className="text-xs text-gray-500">{rx.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{rx.patientName}</p>
                        <p className="text-sm text-gray-500">MRN: {rx.patientMRN}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {rx.medication.brandName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {rx.medication.genericName} {rx.medication.strength}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className={cn(
                              'text-xs',
                              getFormularyColor(rx.medication.formularyStatus)
                            )}
                          >
                            {rx.medication.formularyStatus}
                          </Badge>
                          {rx.priorAuthRequired && (
                            <Badge className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                              PA
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{rx.prescribedBy}</p>
                      <p className="text-xs text-gray-500">NPI: {rx.prescriberNPI}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={cn('text-xs', getStatusColor(rx.status))}>
                        {rx.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={cn(
                          'text-xs font-mono',
                          getDEAScheduleColor(rx.medication.deaSchedule)
                        )}
                      >
                        {rx.medication.deaSchedule === 'Non-Controlled'
                          ? 'N/C'
                          : rx.medication.deaSchedule}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">
                        {new Date(rx.writtenDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      {rx.fillDate && (
                        <p className="text-xs text-gray-500">
                          Filled:{' '}
                          {new Date(rx.fillDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      )}
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

          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No prescriptions found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

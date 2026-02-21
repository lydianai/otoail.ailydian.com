'use client'

import { useState, useMemo, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  sampleClaims,
  samplePayments,
  calculateBillingStats,
  insurancePayers,
  type Claim,
  type Payment,
  type ClaimStatus,
  type PayerType,
} from '@/lib/data/billing-data'
import {
  Search,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  CreditCard,
  Target,
  BarChart3,
  PieChart,
  Download,
  Send,
  Eye,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BillingPage() {
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<ClaimStatus | 'All'>('All')
  const [selectedPayerType, setSelectedPayerType] = useState<PayerType | 'All'>('All')
  const [selectedPriority, setSelectedPriority] = useState<'All' | 'Normal' | 'High' | 'Urgent'>('All')
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'claims' | 'payments' | 'denials'>('claims')
  const itemsPerPage = 20

  useEffect(() => {
    setIsClient(true)
  }, [])

  const stats = useMemo(() => calculateBillingStats(sampleClaims), [])

  const filteredClaims = useMemo(() => {
    return sampleClaims.filter((claim) => {
      const matchesSearch =
        searchQuery === '' ||
        claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.patientMRN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.payer.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = selectedStatus === 'All' || claim.status === selectedStatus
      const matchesPayerType = selectedPayerType === 'All' || claim.payerType === selectedPayerType
      const matchesPriority = selectedPriority === 'All' || claim.priority === selectedPriority

      return matchesSearch && matchesStatus && matchesPayerType && matchesPriority
    })
  }, [searchQuery, selectedStatus, selectedPayerType, selectedPriority])

  const paginatedClaims = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredClaims.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredClaims, currentPage])

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
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

  const getStatusIcon = (status: ClaimStatus) => {
    switch (status) {
      case 'Draft':
        return <FileText className="h-4 w-4" />
      case 'Submitted':
        return <Send className="h-4 w-4" />
      case 'In Review':
        return <Clock className="h-4 w-4" />
      case 'Accepted':
        return <CheckCircle className="h-4 w-4" />
      case 'Partially Paid':
        return <DollarSign className="h-4 w-4" />
      case 'Paid':
        return <CheckCircle className="h-4 w-4" />
      case 'Denied':
        return <XCircle className="h-4 w-4" />
      case 'Appealed':
        return <RefreshCw className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Accepted':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Partially Paid':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Denied':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Appealed':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-600 text-white border-red-700'
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Normal':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPayerTypeColor = (payerType: PayerType) => {
    switch (payerType) {
      case 'Medicare':
        return 'bg-blue-100 text-blue-800'
      case 'Medicaid':
        return 'bg-green-100 text-green-800'
      case 'Commercial':
        return 'bg-purple-100 text-purple-800'
      case 'Self-Pay':
        return 'bg-gray-100 text-gray-800'
      case 'Workers Comp':
        return 'bg-orange-100 text-orange-800'
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
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/30">
              <DollarSign className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Billing & Revenue Cycle Management
              </h1>
              <p className="text-base font-semibold text-gray-600 mt-1">
                Claims Processing, Payments & AR Analytics
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="mb-6 flex items-center space-x-3">
          <button
            onClick={() => setViewMode('claims')}
            className={cn(
              'px-6 py-3 rounded-xl font-bold transition-all',
              viewMode === 'claims'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
            )}
          >
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Claims</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('payments')}
            className={cn(
              'px-6 py-3 rounded-xl font-bold transition-all',
              viewMode === 'payments'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
            )}
          >
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('denials')}
            className={cn(
              'px-6 py-3 rounded-xl font-bold transition-all',
              viewMode === 'denials'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
            )}
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Denials</span>
            </div>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <FileText className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.totalClaims}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Total Claims</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.paidClaims}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Paid Claims</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <XCircle className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{stats.deniedClaims}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Denied</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-3xl font-black">{formatCurrency(stats.totalAR)}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Total A/R</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <Clock className="h-10 w-10 opacity-90" />
              <div className="text-right">
                <div className="text-4xl font-black">{Math.round(stats.averageDaysToPay)}</div>
                <div className="text-sm font-bold opacity-90 mt-1">Avg Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">Collection Rate</h3>
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-end space-x-3">
              <div className="text-5xl font-black text-gray-900">{stats.collectionRate.toFixed(1)}%</div>
              <div className="flex items-center space-x-1 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">+2.3%</span>
              </div>
            </div>
            <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
                style={{ width: `${stats.collectionRate}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">Denial Rate</h3>
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex items-end space-x-3">
              <div className="text-5xl font-black text-gray-900">{stats.denialRate.toFixed(1)}%</div>
              <div className="flex items-center space-x-1 mb-2">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">-1.2%</span>
              </div>
            </div>
            <div className="mt-4 text-sm font-semibold text-gray-600">
              Industry Avg: 15% | Target: &lt;10%
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">&gt;90 Days A/R</h3>
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex items-end space-x-3">
              <div className="text-4xl font-black text-gray-900">{formatCurrency(stats.over90DaysAR)}</div>
            </div>
            <div className="mt-4 text-sm font-semibold text-gray-600">
              {((stats.over90DaysAR / stats.totalAR) * 100).toFixed(1)}% of Total A/R
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Search Claims</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Patient, MRN, Claim #, Payer..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-semibold text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value as ClaimStatus | 'All')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="In Review">In Review</option>
                <option value="Accepted">Accepted</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Paid">Paid</option>
                <option value="Denied">Denied</option>
                <option value="Appealed">Appealed</option>
              </select>
            </div>

            {/* Payer Type Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Payer Type</label>
              <select
                value={selectedPayerType}
                onChange={(e) => {
                  setSelectedPayerType(e.target.value as PayerType | 'All')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Payers</option>
                <option value="Medicare">Medicare</option>
                <option value="Medicaid">Medicaid</option>
                <option value="Commercial">Commercial</option>
                <option value="Self-Pay">Self-Pay</option>
                <option value="Workers Comp">Workers Comp</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => {
                  setSelectedPriority(e.target.value as 'All' | 'Normal' | 'High' | 'Urgent')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-semibold text-gray-900 transition-all"
              >
                <option value="All">All Priorities</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center justify-between">
            <div className="text-sm font-bold text-gray-600">
              Showing {paginatedClaims.length} of {filteredClaims.length} claims
            </div>
            {(searchQuery || selectedStatus !== 'All' || selectedPayerType !== 'All' || selectedPriority !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedStatus('All')
                  setSelectedPayerType('All')
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

        {/* Claims Table */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-green-50/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Claim / Patient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Payer / Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    DOS / Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Amounts
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Status / Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Days in A/R
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 transition-all group cursor-pointer"
                    onClick={() => setSelectedClaim(claim)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                          {claim.patientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{claim.patientName}</div>
                          <div className="text-xs font-semibold text-gray-500">
                            Claim: {claim.claimNumber}
                          </div>
                          <div className="text-xs font-semibold text-gray-500">
                            MRN: {claim.patientMRN}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-gray-900">{claim.payer}</div>
                        <span
                          className={cn(
                            'inline-flex px-2 py-1 rounded-lg text-xs font-bold',
                            getPayerTypeColor(claim.payerType)
                          )}
                        >
                          {claim.payerType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-gray-900">
                          DOS: {formatDate(claim.dateOfService)}
                        </div>
                        {claim.submittedDate && (
                          <div className="text-xs font-semibold text-gray-600">
                            Sub: {formatDate(claim.submittedDate)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-gray-900">
                          Billed: {formatCurrency(claim.billedAmount)}
                        </div>
                        {claim.allowedAmount && (
                          <div className="text-xs font-semibold text-gray-600">
                            Allowed: {formatCurrency(claim.allowedAmount)}
                          </div>
                        )}
                        {claim.paidAmount && (
                          <div className="text-xs font-bold text-green-600">
                            Paid: {formatCurrency(claim.paidAmount)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <span
                          className={cn(
                            'inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2',
                            getStatusColor(claim.status)
                          )}
                        >
                          {getStatusIcon(claim.status)}
                          <span>{claim.status}</span>
                        </span>
                        <div>
                          <span
                            className={cn(
                              'inline-flex px-3 py-1 rounded-xl text-xs font-bold border-2',
                              getPriorityColor(claim.priority)
                            )}
                          >
                            {claim.priority}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={cn(
                        'text-sm font-bold',
                        claim.daysInAR > 90 ? 'text-red-600' :
                        claim.daysInAR > 60 ? 'text-orange-600' :
                        claim.daysInAR > 30 ? 'text-yellow-600' : 'text-gray-900'
                      )}>
                        {claim.daysInAR} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedClaim(claim)
                          }}
                          className="p-2 rounded-xl bg-green-100 hover:bg-green-200 text-green-700 transition-all"
                          title="View Claim"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {claim.status === 'Denied' && (
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
                            title="Appeal"
                          >
                            <RefreshCw className="h-4 w-4" />
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
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-green-50/30 border-t-2 border-gray-200">
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
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50'
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

        {/* Claim Detail Modal */}
        {selectedClaim && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClaim(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-black mb-2">Claim Details</h2>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold opacity-90">
                        Claim: {selectedClaim.claimNumber}
                      </span>
                      <span className="text-sm font-bold opacity-90">•</span>
                      <span className="text-sm font-bold opacity-90">ID: {selectedClaim.id}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedClaim(null)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Patient & Claim Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100">
                    <h3 className="text-lg font-black text-gray-900 mb-4">Patient Information</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Name</div>
                        <div className="text-sm font-bold text-gray-900">{selectedClaim.patientName}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">MRN</div>
                        <div className="text-sm font-bold text-gray-900">{selectedClaim.patientMRN}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Account Number</div>
                        <div className="text-sm font-bold text-gray-900">{selectedClaim.patientAccountNumber}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-100">
                    <h3 className="text-lg font-black text-gray-900 mb-4">Payer Information</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Payer Name</div>
                        <div className="text-sm font-bold text-gray-900">{selectedClaim.payer}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Payer ID</div>
                        <div className="text-sm font-bold text-gray-900">{selectedClaim.payerID}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Type</div>
                        <span className={cn(
                          'inline-flex px-3 py-1 rounded-lg text-xs font-bold',
                          getPayerTypeColor(selectedClaim.payerType)
                        )}>
                          {selectedClaim.payerType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <h3 className="text-lg font-black text-gray-900 mb-4">Financial Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs font-bold text-gray-600 mb-1">Billed Amount</div>
                      <div className="text-lg font-black text-gray-900">{formatCurrency(selectedClaim.billedAmount)}</div>
                    </div>
                    {selectedClaim.allowedAmount && (
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Allowed Amount</div>
                        <div className="text-lg font-black text-gray-900">{formatCurrency(selectedClaim.allowedAmount)}</div>
                      </div>
                    )}
                    {selectedClaim.paidAmount && (
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Paid Amount</div>
                        <div className="text-lg font-black text-green-600">{formatCurrency(selectedClaim.paidAmount)}</div>
                      </div>
                    )}
                    {selectedClaim.patientResponsibility && (
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Patient Responsibility</div>
                        <div className="text-lg font-black text-orange-600">{formatCurrency(selectedClaim.patientResponsibility)}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CPT Codes */}
                <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                  <h3 className="text-lg font-black text-gray-900 mb-4">Procedure Codes (CPT)</h3>
                  <div className="space-y-3">
                    {selectedClaim.cptCodes.map((cpt, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white rounded-xl p-3 border border-purple-200">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{cpt.code} - {cpt.description}</div>
                          <div className="text-xs font-semibold text-gray-600">Units: {cpt.units}</div>
                        </div>
                        <div className="text-sm font-black text-gray-900">{formatCurrency(cpt.charge)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagnosis Codes */}
                <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-100">
                  <h3 className="text-lg font-black text-gray-900 mb-4">Diagnosis Codes (ICD-10)</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedClaim.icd10Codes.map((code, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-gray-900 border-2 border-yellow-200">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Provider & Service Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-100">
                    <h3 className="text-lg font-black text-gray-900 mb-4">Provider</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Rendering Provider</div>
                        <div className="text-sm font-bold text-gray-900">{selectedClaim.renderingProvider}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">NPI</div>
                        <div className="text-sm font-bold text-gray-900">{selectedClaim.renderingNPI}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Place of Service</div>
                        <div className="text-sm font-bold text-gray-900">{selectedClaim.placeOfService}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-pink-50 rounded-2xl p-6 border-2 border-pink-100">
                    <h3 className="text-lg font-black text-gray-900 mb-4">Dates & AR</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Date of Service</div>
                        <div className="text-sm font-bold text-gray-900">{formatDate(selectedClaim.dateOfService)}</div>
                      </div>
                      {selectedClaim.submittedDate && (
                        <div>
                          <div className="text-xs font-bold text-gray-600 mb-1">Submitted Date</div>
                          <div className="text-sm font-bold text-gray-900">{formatDate(selectedClaim.submittedDate)}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Days in A/R</div>
                        <div className={cn(
                          'text-lg font-black',
                          selectedClaim.daysInAR > 90 ? 'text-red-600' :
                          selectedClaim.daysInAR > 60 ? 'text-orange-600' :
                          selectedClaim.daysInAR > 30 ? 'text-yellow-600' : 'text-gray-900'
                        )}>
                          {selectedClaim.daysInAR} days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Denial Information */}
                {selectedClaim.denialReason && (
                  <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                    <h3 className="text-lg font-black text-red-800 mb-3 flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>Denial Information</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-bold text-gray-600 mb-1">Denial Reason</div>
                        <div className="text-sm font-bold text-red-800">{selectedClaim.denialReason}</div>
                      </div>
                      {selectedClaim.denialDate && (
                        <div>
                          <div className="text-xs font-bold text-gray-600 mb-1">Denial Date</div>
                          <div className="text-sm font-bold text-gray-900">{formatDate(selectedClaim.denialDate)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download CMS-1500</span>
                  </button>
                  {selectedClaim.status === 'Denied' && (
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                      <RefreshCw className="h-5 w-5" />
                      <span>File Appeal</span>
                    </button>
                  )}
                  {selectedClaim.status === 'Draft' && (
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>Submit Claim</span>
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

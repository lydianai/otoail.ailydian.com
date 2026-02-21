'use client'
import { useState, useMemo } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  TestTube,
  Plus,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  FlaskConical,
  AlertTriangle
} from 'lucide-react'
import {
  sampleLabOrders,
  calculateLabStats,
  type LabOrder,
  type LabStatus,
  type LabPriority
} from '@/lib/data/laboratory-data'

export default function LaboratoryPage() {
  const [orders, setOrders] = useState(sampleLabOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('active')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<LabOrder | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const stats = useMemo(() => calculateLabStats(orders), [orders])

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = searchQuery === '' ||
        order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.patientMRN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.tests.some(t => t.testName.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && !['Final', 'Cancelled'].includes(order.status)) ||
        (statusFilter === 'pending' && order.status === 'Pending') ||
        (statusFilter === 'complete' && order.status === 'Final')

      const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [orders, searchQuery, statusFilter, priorityFilter])

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredOrders, currentPage])

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  const getStatusColor = (status: LabStatus) => {
    switch (status) {
      case 'Final':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'In Progress':
      case 'Sample Collected':
      case 'In Lab':
        return 'info'
      case 'Cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getPriorityColor = (priority: LabPriority) => {
    switch (priority) {
      case 'STAT':
        return 'bg-red-600 text-white'
      case 'ASAP':
        return 'bg-orange-500 text-white'
      case 'Timed':
        return 'bg-purple-600 text-white'
      default:
        return 'bg-blue-600 text-white'
    }
  }

  const getResultFlag = (flag?: string) => {
    switch (flag) {
      case 'Critical High':
      case 'Critical Low':
        return 'destructive'
      case 'High':
      case 'Low':
        return 'warning'
      case 'Abnormal':
        return 'secondary'
      default:
        return 'success'
    }
  }

  if (selectedOrder) {
    return (
      <DashboardLayout>
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              ← Back to Lab Orders
            </Button>
            <div className="flex gap-2">
              <Badge className={getPriorityColor(selectedOrder.priority)}>
                {selectedOrder.priority}
              </Badge>
              <Badge variant={getStatusColor(selectedOrder.status)}>
                {selectedOrder.status}
              </Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <TestTube className="h-6 w-6 text-green-600" />
                Lab Order #{selectedOrder.orderNumber}
              </CardTitle>
              <CardDescription>
                {selectedOrder.patientName} (MRN: {selectedOrder.patientMRN}) • Age: {selectedOrder.patientAge} • Gender: {selectedOrder.patientGender}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Information */}
              <div>
                <h3 className="text-lg font-bold text-blue-600 mb-3">ORDER INFORMATION</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Ordered By</div>
                    <div className="font-semibold">{selectedOrder.orderedBy}</div>
                    <div className="text-xs text-gray-500">NPI: {selectedOrder.orderedByNPI}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Order Date/Time</div>
                    <div className="font-semibold">{new Date(selectedOrder.orderDate).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">{selectedOrder.orderTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-semibold">{selectedOrder.orderingLocation}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Clinical Indication</div>
                    <div className="font-semibold text-sm">{selectedOrder.clinicalIndication}</div>
                  </div>
                </div>
              </div>

              {/* Tests Ordered */}
              <div>
                <h3 className="text-lg font-bold text-green-600 mb-3">TESTS ORDERED ({selectedOrder.tests.length})</h3>
                <div className="space-y-2">
                  {selectedOrder.tests.map((test, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-lg">{test.testName}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            LOINC: {test.loincCode} • Category: {test.category}
                          </div>
                          <div className="text-sm text-gray-600">
                            Specimen: {test.specimenType}
                            {test.normalRange && ` • Normal Range: ${test.normalRange} ${test.units || ''}`}
                          </div>
                        </div>
                        <Badge variant="outline">
                          TAT: {test.turnaroundTime} min
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specimen Information */}
              {selectedOrder.specimenCollectedAt && (
                <div>
                  <h3 className="text-lg font-bold text-purple-600 mb-3">SPECIMEN INFORMATION</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Specimen ID</div>
                      <div className="font-semibold font-mono">{selectedOrder.specimenId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Collected At</div>
                      <div className="font-semibold">{new Date(selectedOrder.specimenCollectedAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Collected By</div>
                      <div className="font-semibold">{selectedOrder.collectedBy}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {selectedOrder.results && selectedOrder.results.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-orange-600 mb-3">RESULTS</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold">Test</TableHead>
                          <TableHead className="font-semibold">Result</TableHead>
                          <TableHead className="font-semibold">Normal Range</TableHead>
                          <TableHead className="font-semibold">Flag</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.results.map((result, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div className="font-medium">{result.testName}</div>
                              <div className="text-xs text-gray-500">LOINC: {result.testCode}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-bold text-lg">
                                {result.value} {result.units}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{result.normalRange} {result.units}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getResultFlag(result.flag)}>
                                {result.flag || 'Normal'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Result Verification */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Resulted At</div>
                        <div className="font-semibold">{selectedOrder.resultedAt && new Date(selectedOrder.resultedAt).toLocaleString()}</div>
                        <div className="text-xs text-gray-500">By: {selectedOrder.resultedBy}</div>
                      </div>
                      {selectedOrder.verifiedAt && (
                        <div>
                          <div className="text-sm text-gray-600">Verified At</div>
                          <div className="font-semibold">{new Date(selectedOrder.verifiedAt).toLocaleString()}</div>
                          <div className="text-xs text-gray-500">By: {selectedOrder.verifiedBy}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <TestTube className="h-8 w-8 text-green-600" />
              Laboratory
            </h1>
            <p className="text-gray-600 mt-1">
              Lab orders, results, and LOINC-coded test management
            </p>
          </div>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4" />
            New Lab Order
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
            <CardHeader className="pb-3">
              <FlaskConical className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalOrders}</div>
              <div className="text-sm opacity-90">Total Orders</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.pendingOrders} pending orders
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
            <CardHeader className="pb-3">
              <Clock className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.inProgressOrders}</div>
              <div className="text-sm opacity-90">In Progress</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.statOrders} STAT orders
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
            <CardHeader className="pb-3">
              <CheckCircle className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.completedToday}</div>
              <div className="text-sm opacity-90">Completed Today</div>
              <div className="mt-2 text-xs opacity-75">
                Avg TAT: {stats.averageTurnaroundTime} min
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-none">
            <CardHeader className="pb-3">
              <AlertTriangle className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.criticalResults}</div>
              <div className="text-sm opacity-90">Critical Results</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.ordersLast24Hours} orders in 24h
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Lab Order Management</CardTitle>
            <CardDescription>
              Search, filter, and manage laboratory orders and results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by patient, MRN, order #, or test name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="active">Active Orders</option>
                  <option value="pending">Pending</option>
                  <option value="complete">Completed</option>
                  <option value="all">All Status</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="STAT">STAT</option>
                  <option value="ASAP">ASAP</option>
                  <option value="Timed">Timed</option>
                  <option value="Routine">Routine</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              Showing {paginatedOrders.length} of {filteredOrders.length} orders
            </div>

            {/* Orders Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Order #</TableHead>
                    <TableHead className="font-semibold">Patient</TableHead>
                    <TableHead className="font-semibold">Tests</TableHead>
                    <TableHead className="font-semibold">Ordered</TableHead>
                    <TableHead className="font-semibold">Priority</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-mono text-sm font-semibold">{order.orderNumber}</div>
                        <div className="text-xs text-gray-500">{order.orderingLocation}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.patientName}</div>
                        <div className="text-sm text-gray-500">MRN: {order.patientMRN}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{order.tests.length} test(s)</div>
                        <div className="text-xs text-gray-500">
                          {order.tests.slice(0, 2).map(t => t.testName).join(', ')}
                          {order.tests.length > 2 && '...'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{new Date(order.orderDate).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">{order.orderTime}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        {order.results?.some(r => r.flag === 'Critical High' || r.flag === 'Critical Low') && (
                          <div className="mt-1">
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Critical
                            </Badge>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

'use client'
import { useState, useMemo } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Clock,
  Users,
  Video,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  CalendarDays,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import {
  sampleAppointments,
  sampleProviders,
  calculateAppointmentStats,
  type Appointment,
  type AppointmentStatus
} from '@/lib/data/appointments-data'

export default function AppointmentsPage() {
  const [appointments] = useState(sampleAppointments)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('today')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 25

  const stats = useMemo(() => calculateAppointmentStats(appointments), [appointments])

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.appointmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.providerName.toLowerCase().includes(searchQuery.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter

      // Date filter
      let matchesDate = true
      if (dateFilter === 'today') {
        matchesDate = appointment.scheduledDate === today
      } else if (dateFilter === 'tomorrow') {
        matchesDate = appointment.scheduledDate === tomorrow
      } else if (dateFilter === 'week') {
        const weekFromNow = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
        matchesDate = appointment.scheduledDate >= today && appointment.scheduledDate <= weekFromNow
      }

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [appointments, searchQuery, statusFilter, dateFilter, today, tomorrow])

  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAppointments.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAppointments, currentPage])

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'success'
      case 'Scheduled':
        return 'info'
      case 'Arrived':
        return 'warning'
      case 'In Progress':
        return 'default'
      case 'Completed':
        return 'success'
      case 'Cancelled':
        return 'destructive'
      case 'No Show':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const todayAppointments = appointments.filter(a => a.scheduledDate === today)

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              Appointment Scheduling
            </h1>
            <p className="text-gray-600 mt-1">
              Manage patient appointments, scheduling, and provider calendars
            </p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
            <CardHeader className="pb-3">
              <Clock className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.todayTotal}</div>
              <div className="text-sm opacity-90">Today's Appointments</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.todayCompleted} completed • {stats.todayScheduled} pending
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
            <CardHeader className="pb-3">
              <CalendarDays className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.weekTotal}</div>
              <div className="text-sm opacity-90">This Week</div>
              <div className="mt-2 text-xs opacity-75">
                {Math.round(stats.weekTotal / 7)} avg per day
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
            <CardHeader className="pb-3">
              <CheckCircle className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.utilizationRate}%</div>
              <div className="text-sm opacity-90">Utilization Rate</div>
              <div className="mt-2 text-xs opacity-75">
                Avg duration: {stats.averageDuration} min
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
            <CardHeader className="pb-3">
              <AlertCircle className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.todayNoShow}</div>
              <div className="text-sm opacity-90">No-Shows Today</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.todayCancelled} cancelled
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Management</CardTitle>
            <CardDescription>
              Search, filter, and manage all patient appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by patient name, appointment #, or provider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">This Week</option>
                  <option value="all">All Dates</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Arrived">Arrived</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="No Show">No Show</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              Showing {paginatedAppointments.length} of {filteredAppointments.length} appointments
            </div>

            {/* Appointments Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Date & Time</TableHead>
                    <TableHead className="font-semibold">Patient</TableHead>
                    <TableHead className="font-semibold">Provider</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Chief Complaint</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Insurance</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium">{new Date(appointment.scheduledDate).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{appointment.scheduledTime}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-gray-500">{appointment.patientPhone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{appointment.providerName}</div>
                        <div className="text-sm text-gray-500">{appointment.providerSpecialty}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{appointment.appointmentType}</div>
                        <div className="text-xs text-gray-500">{appointment.visitType}</div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {appointment.chiefComplaint || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {appointment.insuranceVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
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

        {/* Today's Schedule Quick View */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule - {new Date(today).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
            <CardDescription>Quick view of today's appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.slice(0, 10).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-900 font-bold px-4 py-2 rounded-lg min-w-[80px] text-center">
                      {appointment.scheduledTime}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{appointment.patientName}</div>
                      <div className="text-sm text-gray-600">
                        {appointment.appointmentType} • {appointment.providerName}
                      </div>
                      {appointment.chiefComplaint && (
                        <div className="text-xs text-gray-500 mt-1">
                          {appointment.chiefComplaint}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    {appointment.roomNumber && (
                      <Badge variant="outline">Room {appointment.roomNumber}</Badge>
                    )}
                    <Button variant="default" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

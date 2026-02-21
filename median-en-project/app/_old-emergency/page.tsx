'use client'
import { useState, useMemo, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Ambulance,
  AlertCircle,
  Clock,
  Users,
  Activity,
  TrendingUp,
  Search,
  RefreshCw,
  Heart,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Plus
} from 'lucide-react'
import {
  sampleEDPatients,
  calculateEDStats,
  getESIColor,
  getESIDescription,
  type EmergencyPatient,
  type ESILevel
} from '@/lib/data/emergency-data'

export default function EmergencyPage() {
  const [patients, setPatients] = useState(sampleEDPatients)
  const [searchQuery, setSearchQuery] = useState('')
  const [esiFilter, setEsiFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('active')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState<EmergencyPatient | null>(null)

  const stats = useMemo(() => calculateEDStats(patients), [patients])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      // In production, this would fetch fresh data from API
      setPatients(prev => [...prev])
    }, 30000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = searchQuery === '' ||
        patient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.patientMRN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.visitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesESI = esiFilter === 'all' || patient.esiLevel === esiFilter

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && !['Discharged', 'Left Without Being Seen', 'Left Against Medical Advice'].includes(patient.status)) ||
        (statusFilter === 'waiting' && ['Waiting', 'Triage'].includes(patient.status)) ||
        (statusFilter === 'treatment' && ['In Room', 'Being Treated', 'Waiting for Results'].includes(patient.status))

      return matchesSearch && matchesESI && matchesStatus
    })
  }, [patients, searchQuery, esiFilter, statusFilter])

  const getESIBadgeColor = (esiLevel: ESILevel) => {
    switch (esiLevel) {
      case '1':
        return 'bg-red-600 text-white hover:bg-red-700'
      case '2':
        return 'bg-orange-500 text-white hover:bg-orange-600'
      case '3':
        return 'bg-yellow-500 text-white hover:bg-yellow-600'
      case '4':
        return 'bg-green-600 text-white hover:bg-green-700'
      case '5':
        return 'bg-blue-600 text-white hover:bg-blue-700'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Waiting':
        return 'warning'
      case 'Triage':
        return 'info'
      case 'In Room':
      case 'Being Treated':
        return 'default'
      case 'Waiting for Results':
        return 'secondary'
      case 'Ready for Discharge':
      case 'Discharged':
        return 'success'
      case 'Admitted':
        return 'success'
      default:
        return 'destructive'
    }
  }

  const formatWaitTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  if (selectedPatient) {
    return (
      <DashboardLayout>
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedPatient(null)}>
              ← Back to Tracking Board
            </Button>
            <div className="flex gap-2">
              <Badge className={getESIBadgeColor(selectedPatient.esiLevel)}>
                ESI Level {selectedPatient.esiLevel}
              </Badge>
              <Badge variant={getStatusBadgeColor(selectedPatient.status)}>
                {selectedPatient.status}
              </Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Ambulance className="h-6 w-6 text-red-600" />
                {selectedPatient.patientName}
              </CardTitle>
              <CardDescription>
                MRN: {selectedPatient.patientMRN} • Visit ID: {selectedPatient.visitId} • Age: {selectedPatient.age} • Gender: {selectedPatient.gender}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Arrival Info */}
              <div>
                <h3 className="text-lg font-bold text-red-600 mb-3">ARRIVAL INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Arrival Time</div>
                    <div className="font-semibold">{new Date(selectedPatient.arrivalTime).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Arrival Mode</div>
                    <div className="font-semibold">{selectedPatient.arrivalMode}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-600">Chief Complaint</div>
                    <div className="font-semibold text-lg">{selectedPatient.chiefComplaint}</div>
                  </div>
                  {selectedPatient.roomNumber && (
                    <div>
                      <div className="text-sm text-gray-600">Room</div>
                      <div className="font-semibold">{selectedPatient.roomNumber}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vital Signs */}
              {selectedPatient.vitalSigns && (
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-3">VITAL SIGNS</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-100">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Thermometer className="h-4 w-4" />
                        <div className="text-xs font-semibold">Temperature</div>
                      </div>
                      <div className="text-2xl font-bold">{selectedPatient.vitalSigns.temperature}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-red-100">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <Activity className="h-4 w-4" />
                        <div className="text-xs font-semibold">Blood Pressure</div>
                      </div>
                      <div className="text-2xl font-bold">{selectedPatient.vitalSigns.bloodPressure}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-100">
                      <div className="flex items-center gap-2 text-orange-600 mb-2">
                        <Heart className="h-4 w-4" />
                        <div className="text-xs font-semibold">Heart Rate</div>
                      </div>
                      <div className="text-2xl font-bold">{selectedPatient.vitalSigns.heartRate} bpm</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-green-100">
                      <div className="flex items-center gap-2 text-green-600 mb-2">
                        <Wind className="h-4 w-4" />
                        <div className="text-xs font-semibold">Resp Rate</div>
                      </div>
                      <div className="text-2xl font-bold">{selectedPatient.vitalSigns.respiratoryRate} /min</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-purple-100">
                      <div className="flex items-center gap-2 text-purple-600 mb-2">
                        <Droplets className="h-4 w-4" />
                        <div className="text-xs font-semibold">O2 Saturation</div>
                      </div>
                      <div className="text-2xl font-bold">{selectedPatient.vitalSigns.oxygenSaturation}%</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-100">
                      <div className="text-xs font-semibold text-gray-600 mb-2">Pain Level</div>
                      <div className="text-2xl font-bold">{selectedPatient.vitalSigns.painLevel}/10</div>
                    </div>
                    {selectedPatient.vitalSigns.glasgowComaScale && (
                      <div className="bg-white p-4 rounded-lg border-2 border-gray-100">
                        <div className="text-xs font-semibold text-gray-600 mb-2">GCS</div>
                        <div className="text-2xl font-bold">{selectedPatient.vitalSigns.glasgowComaScale}/15</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Care Team */}
              <div>
                <h3 className="text-lg font-bold text-purple-600 mb-3">CARE TEAM</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {selectedPatient.assignedProvider && (
                    <div>
                      <div className="text-sm text-gray-600">Attending Provider</div>
                      <div className="font-semibold">{selectedPatient.assignedProvider}</div>
                    </div>
                  )}
                  {selectedPatient.assignedNurse && (
                    <div>
                      <div className="text-sm text-gray-600">Assigned Nurse</div>
                      <div className="font-semibold">{selectedPatient.assignedNurse}</div>
                    </div>
                  )}
                  {selectedPatient.triageNurse && (
                    <div>
                      <div className="text-sm text-gray-600">Triage Nurse</div>
                      <div className="font-semibold">{selectedPatient.triageNurse}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Clinical Info */}
              <div>
                <h3 className="text-lg font-bold text-orange-600 mb-3">CLINICAL INFORMATION</h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-red-600">⚠️ ALLERGIES</div>
                      <div className="mt-1">
                        {selectedPatient.allergies.map((allergy, i) => (
                          <Badge key={i} variant="destructive" className="mr-2">{allergy}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedPatient.currentMedications && selectedPatient.currentMedications.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600">Current Medications</div>
                      <div className="mt-1">{selectedPatient.currentMedications.join(', ')}</div>
                    </div>
                  )}
                  {selectedPatient.medicalHistory && selectedPatient.medicalHistory.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600">Medical History</div>
                      <div className="mt-1">{selectedPatient.medicalHistory.join(', ')}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timing Metrics */}
              <div>
                <h3 className="text-lg font-bold text-green-600 mb-3">TIMING METRICS</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-xs text-blue-600 font-semibold">Wait Time</div>
                    <div className="text-2xl font-bold text-blue-900">{formatWaitTime(selectedPatient.waitTimeMinutes)}</div>
                  </div>
                  {selectedPatient.doorToTriageMinutes && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-xs text-green-600 font-semibold">Door to Triage</div>
                      <div className="text-2xl font-bold text-green-900">{selectedPatient.doorToTriageMinutes}m</div>
                    </div>
                  )}
                  {selectedPatient.doorToProviderMinutes && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-xs text-orange-600 font-semibold">Door to Provider</div>
                      <div className="text-2xl font-bold text-orange-900">{selectedPatient.doorToProviderMinutes}m</div>
                    </div>
                  )}
                  {selectedPatient.lengthOfStayMinutes && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-xs text-purple-600 font-semibold">Length of Stay</div>
                      <div className="text-2xl font-bold text-purple-900">{formatWaitTime(selectedPatient.lengthOfStayMinutes)}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Orders */}
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-3">ORDERS & TESTS</h3>
                <div className="flex gap-4">
                  <Badge variant={selectedPatient.labsOrdered ? 'default' : 'outline'}>
                    {selectedPatient.labsOrdered ? '✓' : '○'} Labs Ordered
                  </Badge>
                  <Badge variant={selectedPatient.imagingOrdered ? 'default' : 'outline'}>
                    {selectedPatient.imagingOrdered ? '✓' : '○'} Imaging Ordered
                  </Badge>
                  <Badge variant={selectedPatient.consultsCalled ? 'default' : 'outline'}>
                    {selectedPatient.consultsCalled ? '✓' : '○'} Consults Called
                  </Badge>
                </div>
              </div>
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
              <Ambulance className="h-8 w-8 text-red-600" />
              Emergency Department
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time ED tracking board, triage, and patient flow management
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'border-green-500 text-green-600' : ''}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
            </Button>
            <Button className="gap-2 bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4" />
              New Patient
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-none">
            <CardHeader className="pb-3">
              <Users className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.currentPatients}</div>
              <div className="text-sm opacity-90">Current Patients</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.waitingToBeSeenCount} waiting • {stats.inTreatmentCount} in treatment
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
            <CardHeader className="pb-3">
              <Clock className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.averageWaitTime}m</div>
              <div className="text-sm opacity-90">Avg Wait Time</div>
              <div className="mt-2 text-xs opacity-75">
                LOS: {stats.averageLengthOfStay}m avg
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
            <CardHeader className="pb-3">
              <Activity className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.bedOccupancyRate}%</div>
              <div className="text-sm opacity-90">Bed Occupancy</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.awaitingAdmissionCount} awaiting admission
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
            <CardHeader className="pb-3">
              <TrendingUp className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.patientsLast24Hours}</div>
              <div className="text-sm opacity-90">Last 24 Hours</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.admissionRate}% admission rate
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ESI Level Summary */}
        <Card>
          <CardHeader>
            <CardTitle>ESI Triage Levels</CardTitle>
            <CardDescription>Emergency Severity Index distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <div className="text-red-600 font-bold">Level 1</div>
                <div className="text-2xl font-bold text-red-900">{stats.esiLevel1Count}</div>
                <div className="text-xs text-red-600 mt-1">Critical</div>
              </div>
              <div className="flex-1 bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <div className="text-orange-600 font-bold">Level 2</div>
                <div className="text-2xl font-bold text-orange-900">{stats.esiLevel2Count}</div>
                <div className="text-xs text-orange-600 mt-1">Emergent</div>
              </div>
              <div className="flex-1 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                <div className="text-yellow-700 font-bold">Level 3</div>
                <div className="text-2xl font-bold text-yellow-900">{stats.esiLevel3Count}</div>
                <div className="text-xs text-yellow-700 mt-1">Urgent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>ED Tracking Board</CardTitle>
            <CardDescription>Real-time patient tracking and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by patient name, MRN, visit ID, or chief complaint..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="active">Active Patients</option>
                  <option value="waiting">Waiting</option>
                  <option value="treatment">In Treatment</option>
                  <option value="all">All Statuses</option>
                </select>

                <select
                  value={esiFilter}
                  onChange={(e) => setEsiFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All ESI Levels</option>
                  <option value="1">ESI 1 - Critical</option>
                  <option value="2">ESI 2 - Emergent</option>
                  <option value="3">ESI 3 - Urgent</option>
                  <option value="4">ESI 4 - Less Urgent</option>
                  <option value="5">ESI 5 - Non-Urgent</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              Showing {filteredPatients.length} patients • Last updated: {new Date().toLocaleTimeString()}
            </div>

            {/* Patient Cards */}
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center gap-4 p-4 rounded-lg border-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <Badge className={`${getESIBadgeColor(patient.esiLevel)} text-xl font-bold px-3 py-2`}>
                    {patient.esiLevel}
                  </Badge>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-lg">{patient.patientName}</div>
                      <div className="text-sm text-gray-500">
                        {patient.age}y • {patient.gender}
                      </div>
                      {patient.roomNumber && (
                        <Badge variant="outline">Room {patient.roomNumber}</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {patient.chiefComplaint}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      MRN: {patient.patientMRN} • Arrival: {new Date(patient.arrivalTime).toLocaleTimeString()} • Wait: {formatWaitTime(patient.waitTimeMinutes)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={getStatusBadgeColor(patient.status)}>
                      {patient.status}
                    </Badge>
                    {patient.assignedProvider && (
                      <div className="text-xs text-gray-600">{patient.assignedProvider}</div>
                    )}
                    {patient.vitalSigns && (
                      <div className="flex gap-2 text-xs">
                        <span className="text-red-600">BP: {patient.vitalSigns.bloodPressure}</span>
                        <span className="text-orange-600">HR: {patient.vitalSigns.heartRate}</span>
                        <span className="text-blue-600">O2: {patient.vitalSigns.oxygenSaturation}%</span>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

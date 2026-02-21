'use client'
import { useState, useMemo } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  FileText,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileEdit,
  Activity,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react'
import {
  sampleClinicalNotes,
  calculateClinicalStats,
  type SOAPNote,
  type NoteStatus
} from '@/lib/data/clinical-notes-data'

export default function ClinicalPage() {
  const [notes] = useState(sampleClinicalNotes)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [selectedNote, setSelectedNote] = useState<SOAPNote | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const stats = useMemo(() => calculateClinicalStats(notes), [notes])

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = searchQuery === '' ||
        note.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.patientMRN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subjective.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || note.status === statusFilter
      const matchesType = typeFilter === 'all' || note.noteType === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [notes, searchQuery, statusFilter, typeFilter])

  const paginatedNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredNotes.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredNotes, currentPage])

  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage)

  const getStatusColor = (status: NoteStatus) => {
    switch (status) {
      case 'Signed':
        return 'success'
      case 'Pending Review':
        return 'warning'
      case 'Draft':
      case 'In Progress':
        return 'info'
      default:
        return 'secondary'
    }
  }

  if (selectedNote) {
    return (
      <DashboardLayout>
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedNote(null)}>
              ← Back to Notes
            </Button>
            <div className="flex gap-2">
              <Badge variant={getStatusColor(selectedNote.status)}>
                {selectedNote.status}
              </Badge>
              <Button variant="outline" size="sm">Edit</Button>
              <Button size="sm">Sign Note</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{selectedNote.noteType}</CardTitle>
                  <CardDescription className="mt-2">
                    {selectedNote.patientName} (MRN: {selectedNote.patientMRN}) • {new Date(selectedNote.dateOfService).toLocaleDateString()} at {selectedNote.timeOfService}
                  </CardDescription>
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold">{selectedNote.providerName}, {selectedNote.providerCredentials}</div>
                  <div className="text-gray-500">{selectedNote.specialty}</div>
                  <div className="text-gray-500">{selectedNote.location}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subjective */}
              <div>
                <h3 className="text-lg font-bold text-blue-600 mb-3">SUBJECTIVE</h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <div className="font-semibold text-sm text-gray-600">Chief Complaint:</div>
                    <div className="mt-1">{selectedNote.subjective.chiefComplaint}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-600">History of Present Illness:</div>
                    <div className="mt-1">{selectedNote.subjective.historyOfPresentIllness}</div>
                  </div>
                  {selectedNote.subjective.reviewOfSystems && (
                    <div>
                      <div className="font-semibold text-sm text-gray-600">Review of Systems:</div>
                      <div className="mt-1">{selectedNote.subjective.reviewOfSystems}</div>
                    </div>
                  )}
                  {selectedNote.subjective.socialHistory && (
                    <div>
                      <div className="font-semibold text-sm text-gray-600">Social History:</div>
                      <div className="mt-1">{selectedNote.subjective.socialHistory}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Objective */}
              <div>
                <h3 className="text-lg font-bold text-green-600 mb-3">OBJECTIVE</h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <div className="font-semibold text-sm text-gray-600 mb-2">Vital Signs:</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white p-3 rounded border">
                        <div className="text-xs text-gray-500">Temperature</div>
                        <div className="font-semibold">{selectedNote.objective.vitalSigns.temperature}</div>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <div className="text-xs text-gray-500">Blood Pressure</div>
                        <div className="font-semibold">{selectedNote.objective.vitalSigns.bloodPressure}</div>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <div className="text-xs text-gray-500">Heart Rate</div>
                        <div className="font-semibold">{selectedNote.objective.vitalSigns.heartRate} bpm</div>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <div className="text-xs text-gray-500">Resp Rate</div>
                        <div className="font-semibold">{selectedNote.objective.vitalSigns.respiratoryRate} /min</div>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <div className="text-xs text-gray-500">O2 Saturation</div>
                        <div className="font-semibold">{selectedNote.objective.vitalSigns.oxygenSaturation}%</div>
                      </div>
                      {selectedNote.objective.vitalSigns.weight && (
                        <div className="bg-white p-3 rounded border">
                          <div className="text-xs text-gray-500">Weight</div>
                          <div className="font-semibold">{selectedNote.objective.vitalSigns.weight}</div>
                        </div>
                      )}
                      {selectedNote.objective.vitalSigns.bmi && (
                        <div className="bg-white p-3 rounded border">
                          <div className="text-xs text-gray-500">BMI</div>
                          <div className="font-semibold">{selectedNote.objective.vitalSigns.bmi}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-600">Physical Examination:</div>
                    <div className="mt-1 whitespace-pre-line">{selectedNote.objective.physicalExam}</div>
                  </div>
                  {selectedNote.objective.labResults && (
                    <div>
                      <div className="font-semibold text-sm text-gray-600">Laboratory Results:</div>
                      <div className="mt-1">{selectedNote.objective.labResults}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Assessment */}
              <div>
                <h3 className="text-lg font-bold text-orange-600 mb-3">ASSESSMENT</h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <div className="font-semibold text-sm text-gray-600 mb-2">Diagnoses:</div>
                    <div className="space-y-2">
                      {selectedNote.assessment.diagnoses.map((dx, i) => (
                        <div key={i} className="bg-white p-3 rounded border">
                          <div className="flex items-center gap-2">
                            <Badge variant={dx.type === 'Primary' ? 'default' : 'secondary'}>
                              {dx.type}
                            </Badge>
                            <span className="font-mono text-sm">{dx.code}</span>
                          </div>
                          <div className="mt-1">{dx.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-600">Clinical Impression:</div>
                    <div className="mt-1">{selectedNote.assessment.clinicalImpression}</div>
                  </div>
                </div>
              </div>

              {/* Plan */}
              <div>
                <h3 className="text-lg font-bold text-purple-600 mb-3">PLAN</h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  {selectedNote.plan.medications && selectedNote.plan.medications.length > 0 && (
                    <div>
                      <div className="font-semibold text-sm text-gray-600 mb-2">Medications:</div>
                      <div className="space-y-2">
                        {selectedNote.plan.medications.map((med, i) => (
                          <div key={i} className="bg-white p-3 rounded border">
                            <div className="font-semibold">{med.name}</div>
                            <div className="text-sm text-gray-600">
                              {med.dosage} {med.route} - {med.frequency}
                              {med.duration && ` for ${med.duration}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedNote.plan.labOrders && selectedNote.plan.labOrders.length > 0 && (
                    <div>
                      <div className="font-semibold text-sm text-gray-600">Laboratory Orders:</div>
                      <ul className="mt-1 list-disc list-inside">
                        {selectedNote.plan.labOrders.map((lab, i) => <li key={i}>{lab}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-sm text-gray-600">Patient Instructions:</div>
                    <div className="mt-1">{selectedNote.plan.patientInstructions}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-600">Follow-up:</div>
                    <div className="mt-1">{selectedNote.plan.followUp}</div>
                  </div>
                </div>
              </div>

              {/* Signature */}
              {selectedNote.signedBy && (
                <div className="border-t pt-4">
                  <div className="text-sm">
                    <div className="font-semibold">Electronically signed by:</div>
                    <div>{selectedNote.signedBy}</div>
                    <div className="text-gray-500">
                      {selectedNote.signedAt && new Date(selectedNote.signedAt).toLocaleString()}
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
              <FileText className="h-8 w-8 text-blue-600" />
              Clinical Documentation
            </h1>
            <p className="text-gray-600 mt-1">
              SOAP notes, progress notes, and clinical encounters
            </p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New SOAP Note
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
            <CardHeader className="pb-3">
              <FileText className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalNotes}</div>
              <div className="text-sm opacity-90">Total Notes</div>
              <div className="mt-2 text-xs opacity-75">
                All clinical documentation
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
            <CardHeader className="pb-3">
              <CheckCircle className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.signedNotes}</div>
              <div className="text-sm opacity-90">Signed Notes</div>
              <div className="mt-2 text-xs opacity-75">
                Completed documentation
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
            <CardHeader className="pb-3">
              <Clock className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingNotes}</div>
              <div className="text-sm opacity-90">Pending Review</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.draftNotes} drafts in progress
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
            <CardHeader className="pb-3">
              <Activity className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.averageNotesPerDay}</div>
              <div className="text-sm opacity-90">Avg per Day</div>
              <div className="mt-2 text-xs opacity-75">
                {stats.notesThisWeek} notes this week
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Clinical Notes Management</CardTitle>
            <CardDescription>
              Search, filter, and review clinical documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by patient, MRN, provider, or chief complaint..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="Progress Note">Progress Note</option>
                  <option value="SOAP Note">SOAP Note</option>
                  <option value="Consultation Note">Consultation</option>
                  <option value="History & Physical">H&P</option>
                  <option value="Procedure Note">Procedure</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Signed">Signed</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              Showing {paginatedNotes.length} of {filteredNotes.length} notes
            </div>

            {/* Notes Table */}
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
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedNotes.map((note) => (
                    <TableRow key={note.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium">{new Date(note.dateOfService).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{note.timeOfService}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{note.patientName}</div>
                        <div className="text-sm text-gray-500">MRN: {note.patientMRN}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{note.providerName}</div>
                        <div className="text-sm text-gray-500">{note.specialty}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{note.noteType}</div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {note.subjective.chiefComplaint}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(note.status)}>
                          {note.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedNote(note)}
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

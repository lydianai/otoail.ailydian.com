'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useState } from 'react'
import {
  Activity, Search, Download, Plus, Calendar, Clock, CheckCircle2,
  Shield, Users, Scissors, AlertCircle, TrendingUp, ClipboardCheck,
  Syringe, Heart, FileText, Timer, UserCheck, Package, Zap,
  BarChart3, Settings, Bell, Filter, ChevronRight, PlayCircle,
  PauseCircle, XCircle, Stethoscope, Clipboard, AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// US Surgical Procedure Types with CPT Code Ranges
type SurgicalProcedure = {
  id: string
  patientName: string
  mrn: string
  surgeon: string
  anesthesiologist: string
  procedureName: string
  cptCode: string
  specialty: string
  orRoom: string
  scheduledStart: string
  estimatedDuration: number
  actualStart?: string
  status: 'scheduled' | 'pre-op' | 'in-progress' | 'pacu' | 'completed' | 'cancelled' | 'delayed'
  asaClass: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'E'
  anesthesiaType: 'General' | 'Regional' | 'MAC' | 'Local'
  urgency: 'Elective' | 'Urgent' | 'Emergent'
  safetyChecklistComplete: boolean
  timeoutComplete: boolean
  antibioticProphylaxis: boolean
  vte_prophylaxis: boolean
  siteMarked: boolean
  scrubTech: string
  circulatingRN: string
  equipmentReady: boolean
}

// US OR Performance Metrics
type ORMetrics = {
  fcots: number // First Case On-Time Starts percentage
  averageTurnoverTime: number // minutes
  orUtilization: number // percentage
  caseCancellationRate: number // percentage
  onTimeStarts: number // percentage
  averageCaseDuration: number // minutes
  addOnCases: number
  emergencyCases: number
}

export default function OperatingRoomPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('2024-12-24')
  const [selectedOR, setSelectedOR] = useState('all')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  // Comprehensive US Surgical Schedule Data
  const surgicalCases: SurgicalProcedure[] = [
    {
      id: 'OR-2024-001',
      patientName: 'Johnson, Michael R.',
      mrn: 'MRN-847293',
      surgeon: 'Dr. Sarah Mitchell, MD',
      anesthesiologist: 'Dr. James Thompson, MD',
      procedureName: 'Total Knee Arthroplasty, Right',
      cptCode: '27447',
      specialty: 'Orthopedic Surgery',
      orRoom: 'OR-1',
      scheduledStart: '07:00 AM',
      estimatedDuration: 120,
      actualStart: '07:02 AM',
      status: 'in-progress',
      asaClass: 'II',
      anesthesiaType: 'General',
      urgency: 'Elective',
      safetyChecklistComplete: true,
      timeoutComplete: true,
      antibioticProphylaxis: true,
      vte_prophylaxis: true,
      siteMarked: true,
      scrubTech: 'Robert Chen, CST',
      circulatingRN: 'Amanda Rodriguez, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-002',
      patientName: 'Davis, Patricia L.',
      mrn: 'MRN-592847',
      surgeon: 'Dr. Robert Chen, MD, FACS',
      anesthesiologist: 'Dr. Emily Parker, MD',
      procedureName: 'Laparoscopic Cholecystectomy',
      cptCode: '47562',
      specialty: 'General Surgery',
      orRoom: 'OR-3',
      scheduledStart: '07:30 AM',
      estimatedDuration: 90,
      actualStart: '07:28 AM',
      status: 'in-progress',
      asaClass: 'III',
      anesthesiaType: 'General',
      urgency: 'Elective',
      safetyChecklistComplete: true,
      timeoutComplete: true,
      antibioticProphylaxis: true,
      vte_prophylaxis: true,
      siteMarked: false,
      scrubTech: 'Lisa Martinez, CST',
      circulatingRN: 'Kevin Brown, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-003',
      patientName: 'Williams, Robert T.',
      mrn: 'MRN-738492',
      surgeon: 'Dr. Amanda Foster, MD',
      anesthesiologist: 'Dr. Michael Lee, MD',
      procedureName: 'Coronary Artery Bypass Graft (CABG) x3',
      cptCode: '33533',
      specialty: 'Cardiothoracic Surgery',
      orRoom: 'OR-5',
      scheduledStart: '08:00 AM',
      estimatedDuration: 300,
      actualStart: '08:05 AM',
      status: 'in-progress',
      asaClass: 'IV',
      anesthesiaType: 'General',
      urgency: 'Urgent',
      safetyChecklistComplete: true,
      timeoutComplete: true,
      antibioticProphylaxis: true,
      vte_prophylaxis: true,
      siteMarked: true,
      scrubTech: 'David Kim, CST',
      circulatingRN: 'Jennifer White, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-004',
      patientName: 'Martinez, Elena S.',
      mrn: 'MRN-483920',
      surgeon: 'Dr. Christopher Johnson, MD',
      anesthesiologist: 'Dr. Rachel Adams, MD',
      procedureName: 'Lumbar Spinal Fusion L4-L5',
      cptCode: '22630',
      specialty: 'Neurosurgery',
      orRoom: 'OR-2',
      scheduledStart: '09:00 AM',
      estimatedDuration: 240,
      status: 'pre-op',
      asaClass: 'III',
      anesthesiaType: 'General',
      urgency: 'Elective',
      safetyChecklistComplete: true,
      timeoutComplete: false,
      antibioticProphylaxis: true,
      vte_prophylaxis: true,
      siteMarked: true,
      scrubTech: 'Maria Garcia, CST',
      circulatingRN: 'Thomas Anderson, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-005',
      patientName: 'Anderson, James P.',
      mrn: 'MRN-291847',
      surgeon: 'Dr. Lisa Thompson, MD',
      anesthesiologist: 'Dr. David Wilson, MD',
      procedureName: 'Total Hip Arthroplasty, Left',
      cptCode: '27130',
      specialty: 'Orthopedic Surgery',
      orRoom: 'OR-4',
      scheduledStart: '10:00 AM',
      estimatedDuration: 150,
      status: 'scheduled',
      asaClass: 'II',
      anesthesiaType: 'General',
      urgency: 'Elective',
      safetyChecklistComplete: false,
      timeoutComplete: false,
      antibioticProphylaxis: false,
      vte_prophylaxis: false,
      siteMarked: true,
      scrubTech: 'Carlos Rodriguez, CST',
      circulatingRN: 'Sarah Johnson, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-006',
      patientName: 'Thompson, Mary K.',
      mrn: 'MRN-847392',
      surgeon: 'Dr. Kevin Martinez, MD',
      anesthesiologist: 'Dr. Laura Bennett, MD',
      procedureName: 'Robotic-Assisted Hysterectomy',
      cptCode: '58570',
      specialty: 'Gynecologic Surgery',
      orRoom: 'OR-6',
      scheduledStart: '11:00 AM',
      estimatedDuration: 180,
      status: 'scheduled',
      asaClass: 'II',
      anesthesiaType: 'General',
      urgency: 'Elective',
      safetyChecklistComplete: false,
      timeoutComplete: false,
      antibioticProphylaxis: false,
      vte_prophylaxis: false,
      siteMarked: false,
      scrubTech: 'Emily Davis, CST',
      circulatingRN: 'Michael Chen, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-007',
      patientName: 'Brown, Charles W.',
      mrn: 'MRN-592038',
      surgeon: 'Dr. Mark Stevens, MD, FACS',
      anesthesiologist: 'Dr. Jennifer Clark, MD',
      procedureName: 'Appendectomy, Laparoscopic',
      cptCode: '44970',
      specialty: 'General Surgery',
      orRoom: 'OR-7',
      scheduledStart: '01:00 PM',
      estimatedDuration: 60,
      status: 'scheduled',
      asaClass: 'III',
      anesthesiaType: 'General',
      urgency: 'Emergent',
      safetyChecklistComplete: false,
      timeoutComplete: false,
      antibioticProphylaxis: false,
      vte_prophylaxis: false,
      siteMarked: false,
      scrubTech: 'Rebecca Wilson, CST',
      circulatingRN: 'Daniel Martinez, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-008',
      patientName: 'Garcia, Sofia R.',
      mrn: 'MRN-738291',
      surgeon: 'Dr. Patricia Anderson, MD',
      anesthesiologist: 'Dr. Robert Garcia, MD',
      procedureName: 'Cataract Extraction with IOL Implant',
      cptCode: '66984',
      specialty: 'Ophthalmology',
      orRoom: 'OR-8',
      scheduledStart: '02:00 PM',
      estimatedDuration: 45,
      status: 'scheduled',
      asaClass: 'I',
      anesthesiaType: 'MAC',
      urgency: 'Elective',
      safetyChecklistComplete: false,
      timeoutComplete: false,
      antibioticProphylaxis: false,
      vte_prophylaxis: false,
      siteMarked: true,
      scrubTech: 'Andrew Taylor, CST',
      circulatingRN: 'Michelle Lee, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-009',
      patientName: 'Wilson, David M.',
      mrn: 'MRN-482937',
      surgeon: 'Dr. Jennifer Moore, MD',
      anesthesiologist: 'Dr. Christopher Hall, MD',
      procedureName: 'Anterior Cervical Discectomy & Fusion',
      cptCode: '22551',
      specialty: 'Neurosurgery',
      orRoom: 'OR-2',
      scheduledStart: '02:30 PM',
      estimatedDuration: 210,
      status: 'scheduled',
      asaClass: 'III',
      anesthesiaType: 'General',
      urgency: 'Elective',
      safetyChecklistComplete: false,
      timeoutComplete: false,
      antibioticProphylaxis: false,
      vte_prophylaxis: false,
      siteMarked: true,
      scrubTech: 'Brandon Moore, CST',
      circulatingRN: 'Jessica Thompson, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-010',
      patientName: 'Lee, Jennifer H.',
      mrn: 'MRN-593847',
      surgeon: 'Dr. Thomas Wright, MD',
      anesthesiologist: 'Dr. Sarah Mitchell, MD',
      procedureName: 'Rotator Cuff Repair, Arthroscopic',
      cptCode: '29827',
      specialty: 'Orthopedic Surgery',
      orRoom: 'OR-1',
      scheduledStart: '03:00 PM',
      estimatedDuration: 120,
      status: 'scheduled',
      asaClass: 'II',
      anesthesiaType: 'Regional',
      urgency: 'Elective',
      safetyChecklistComplete: false,
      timeoutComplete: false,
      antibioticProphylaxis: false,
      vte_prophylaxis: false,
      siteMarked: true,
      scrubTech: 'Nicole Anderson, CST',
      circulatingRN: 'Christopher Davis, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-011',
      patientName: 'Taylor, Christopher N.',
      mrn: 'MRN-738492',
      surgeon: 'Dr. Michelle Roberts, MD, FACS',
      anesthesiologist: 'Dr. Andrew Brown, MD',
      procedureName: 'Inguinal Hernia Repair, Laparoscopic',
      cptCode: '49650',
      specialty: 'General Surgery',
      orRoom: 'OR-3',
      scheduledStart: '03:30 PM',
      estimatedDuration: 75,
      status: 'scheduled',
      asaClass: 'II',
      anesthesiaType: 'General',
      urgency: 'Elective',
      safetyChecklistComplete: false,
      timeoutComplete: false,
      antibioticProphylaxis: false,
      vte_prophylaxis: false,
      siteMarked: true,
      scrubTech: 'Timothy Wilson, CST',
      circulatingRN: 'Lauren Martinez, RN',
      equipmentReady: true
    },
    {
      id: 'OR-2024-012',
      patientName: 'Moore, Rebecca S.',
      mrn: 'MRN-482910',
      surgeon: 'Dr. Daniel Foster, MD',
      anesthesiologist: 'Dr. Elizabeth Turner, MD',
      procedureName: 'Mastectomy with Sentinel Node Biopsy',
      cptCode: '19307',
      specialty: 'Surgical Oncology',
      orRoom: 'OR-4',
      scheduledStart: '04:00 PM',
      estimatedDuration: 180,
      status: 'delayed',
      asaClass: 'III',
      anesthesiaType: 'General',
      urgency: 'Urgent',
      safetyChecklistComplete: false,
      timeoutComplete: false,
      antibioticProphylaxis: false,
      vte_prophylaxis: false,
      siteMarked: true,
      scrubTech: 'Victoria Garcia, CST',
      circulatingRN: 'Matthew Johnson, RN',
      equipmentReady: false
    }
  ]

  // US OR Performance Metrics
  const orMetrics: ORMetrics = {
    fcots: 91.7, // First Case On-Time Starts
    averageTurnoverTime: 28, // minutes
    orUtilization: 87.3, // percentage
    caseCancellationRate: 2.1, // percentage
    onTimeStarts: 88.9, // percentage
    averageCaseDuration: 142, // minutes
    addOnCases: 3,
    emergencyCases: 1
  }

  // Filter cases based on search
  const filteredCases = surgicalCases.filter(c => {
    const matchesSearch = searchTerm === '' ||
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.surgeon.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.procedureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cptCode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOR = selectedOR === 'all' || c.orRoom === selectedOR
    const matchesSpecialty = selectedSpecialty === 'all' || c.specialty === selectedSpecialty

    return matchesSearch && matchesOR && matchesSpecialty
  })

  // Calculate today's statistics
  const todayScheduled = surgicalCases.length
  const completedCases = surgicalCases.filter(c => c.status === 'completed').length
  const inProgressCases = surgicalCases.filter(c => c.status === 'in-progress').length
  const delayedCases = surgicalCases.filter(c => c.status === 'delayed').length

  const getStatusColor = (status: SurgicalProcedure['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-gray-100 text-gray-700 border-gray-300'
      case 'pre-op': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'in-progress': return 'bg-green-100 text-green-700 border-green-300'
      case 'pacu': return 'bg-purple-100 text-purple-700 border-purple-300'
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-300'
      case 'delayed': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300'
    }
  }

  const getStatusIcon = (status: SurgicalProcedure['status']) => {
    switch (status) {
      case 'scheduled': return <Calendar className="h-4 w-4" />
      case 'pre-op': return <UserCheck className="h-4 w-4" />
      case 'in-progress': return <PlayCircle className="h-4 w-4" />
      case 'pacu': return <Heart className="h-4 w-4" />
      case 'completed': return <CheckCircle2 className="h-4 w-4" />
      case 'delayed': return <Clock className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Elective': return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Elective</Badge>
      case 'Urgent': return <Badge className="bg-orange-100 text-orange-700 border-orange-300">Urgent</Badge>
      case 'Emergent': return <Badge className="bg-red-100 text-red-700 border-red-300">Emergent</Badge>
    }
  }

  const getASAClassColor = (asaClass: string) => {
    if (asaClass.includes('I') && asaClass.length === 1) return 'text-green-600'
    if (asaClass.includes('II')) return 'text-blue-600'
    if (asaClass.includes('III')) return 'text-yellow-600'
    if (asaClass.includes('IV') || asaClass.includes('V') || asaClass.includes('VI')) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Header */}
        <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
          <div className="max-w-[1920px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Scissors className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Operating Room Management
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">Surgical Scheduling & OR Optimization</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export Schedule
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Surgery
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1920px] mx-auto px-8 py-8">
          {/* OR Performance Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Today's Cases</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{todayScheduled}</p>
              <p className="text-xs text-gray-500">Scheduled procedures</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">In Progress</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-700 mb-1">{inProgressCases}</p>
              <p className="text-xs text-gray-500">Active procedures</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">FCOTS Rate</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-purple-700 mb-1">{orMetrics.fcots}%</p>
              <p className="text-xs text-gray-500">First case on-time starts</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Turnover Time</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-orange-700 mb-1">{orMetrics.averageTurnoverTime}</p>
              <p className="text-xs text-gray-500">Average minutes</p>
            </div>
          </div>

          {/* Additional Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">OR Utilization</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{orMetrics.orUtilization}%</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-green-900">On-Time Starts</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{orMetrics.onTimeStarts}%</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-semibold text-red-900">Cancellation Rate</span>
              </div>
              <p className="text-2xl font-bold text-red-900">{orMetrics.caseCancellationRate}%</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-900">Add-On Cases</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{orMetrics.addOnCases} today</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by patient, MRN, surgeon, procedure, CPT code..."
                  className="pl-10 border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedOR}
                onChange={(e) => setSelectedOR(e.target.value)}
              >
                <option value="all">All OR Rooms</option>
                <option value="OR-1">OR-1</option>
                <option value="OR-2">OR-2</option>
                <option value="OR-3">OR-3</option>
                <option value="OR-4">OR-4</option>
                <option value="OR-5">OR-5 (Cardiac)</option>
                <option value="OR-6">OR-6 (Robotics)</option>
                <option value="OR-7">OR-7</option>
                <option value="OR-8">OR-8 (Ophthalmology)</option>
              </select>
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="all">All Specialties</option>
                <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Cardiothoracic Surgery">Cardiothoracic Surgery</option>
                <option value="Neurosurgery">Neurosurgery</option>
                <option value="Gynecologic Surgery">Gynecologic Surgery</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Surgical Oncology">Surgical Oncology</option>
              </select>
            </div>
          </div>

          {/* Surgical Cases Table */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Today's Surgical Schedule - December 24, 2024</h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                    {filteredCases.length} Cases
                  </Badge>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">OR/Time</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Procedure</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Surgeon</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Anesthesia</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Safety Checks</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCases.map((case_item) => (
                    <tr key={case_item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-blue-600">{case_item.orRoom}</span>
                          <span className="text-sm text-gray-600">{case_item.scheduledStart}</span>
                          <span className="text-xs text-gray-500">{case_item.estimatedDuration} min</span>
                          {case_item.actualStart && (
                            <span className="text-xs text-green-600">Started: {case_item.actualStart}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{case_item.patientName}</span>
                          <span className="text-sm text-gray-600">{case_item.mrn}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${getASAClassColor(case_item.asaClass)}`}>
                              ASA {case_item.asaClass}
                            </Badge>
                            {getUrgencyBadge(case_item.urgency)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col max-w-xs">
                          <span className="font-semibold text-gray-900 text-sm">{case_item.procedureName}</span>
                          <span className="text-sm text-blue-600">CPT: {case_item.cptCode}</span>
                          <span className="text-xs text-gray-500">{case_item.specialty}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{case_item.surgeon}</span>
                          <div className="text-xs text-gray-600 mt-1">
                            <div>Scrub: {case_item.scrubTech}</div>
                            <div>Circulating: {case_item.circulatingRN}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{case_item.anesthesiologist}</span>
                          <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-300 mt-1 w-fit">
                            {case_item.anesthesiaType}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            {case_item.safetyChecklistComplete ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-gray-600">Safety Checklist</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {case_item.timeoutComplete ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-gray-600">Time-Out</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {case_item.antibioticProphylaxis ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-gray-600">Antibiotics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {case_item.siteMarked ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-gray-600">Site Marked</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`${getStatusColor(case_item.status)} border flex items-center gap-2 w-fit`}>
                          {getStatusIcon(case_item.status)}
                          {case_item.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* US Surgical Safety & Compliance Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Surgical Safety Checklist */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500 rounded-xl">
                  <ClipboardCheck className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-900 mb-2">WHO Surgical Safety Checklist</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Sign In (Before Anesthesia Induction)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Time Out (Before Skin Incision)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Sign Out (Before Patient Leaves OR)</span>
                    </div>
                  </div>
                  <p className="text-xs text-green-700 mt-3">
                    All procedures follow Joint Commission Universal Protocol and WHO safety standards
                  </p>
                </div>
              </div>
            </div>

            {/* HIPAA Compliance */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-purple-900 mb-2">HIPAA Compliance - OR Records</h3>
                  <p className="text-sm text-purple-800 mb-3">
                    All surgical records, anesthesia documentation, and patient information are protected under HIPAA regulations with end-to-end encryption.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-purple-800">
                      <Shield className="h-4 w-4" />
                      <span>Encrypted surgical records storage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-800">
                      <Shield className="h-4 w-4" />
                      <span>Role-based access control (RBAC)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-800">
                      <Shield className="h-4 w-4" />
                      <span>Audit trail for all OR activities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OR Management Features */}
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced OR Management Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-blue-900">Block Time Management</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• OR block scheduling by surgeon</li>
                  <li>• Release time tracking</li>
                  <li>• Block utilization reporting</li>
                </ul>
              </div>

              <div className="p-5 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-green-900">Preference Cards</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• Surgeon preference card library</li>
                  <li>• Equipment & instrument tracking</li>
                  <li>• Automated pick list generation</li>
                </ul>
              </div>

              <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-purple-600" />
                  <h3 className="font-bold text-purple-900">PACU Integration</h3>
                </div>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li>• Real-time PACU bed availability</li>
                  <li>• Post-op recovery tracking</li>
                  <li>• Discharge readiness scoring</li>
                </ul>
              </div>

              <div className="p-5 bg-orange-50 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <Syringe className="h-6 w-6 text-orange-600" />
                  <h3 className="font-bold text-orange-900">Anesthesia Pre-Op</h3>
                </div>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li>• Pre-operative evaluation</li>
                  <li>• ASA classification assignment</li>
                  <li>• Anesthesia plan documentation</li>
                </ul>
              </div>

              <div className="p-5 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-red-900">Emergency Case Priority</h3>
                </div>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>• Add-on case management</li>
                  <li>• Emergency case bumping protocol</li>
                  <li>• Real-time OR availability</li>
                </ul>
              </div>

              <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                  <h3 className="font-bold text-indigo-900">Analytics & Reporting</h3>
                </div>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li>• Case duration variance analysis</li>
                  <li>• Surgeon efficiency metrics</li>
                  <li>• OR utilization dashboards</li>
                </ul>
              </div>
            </div>
          </div>

          {/* US Perioperative Standards */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-3">US Perioperative Standards Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span><strong>CPT Surgical Codes:</strong> 10000-69999 coding system</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span><strong>ASA Classification:</strong> I-VI physical status system</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span><strong>Antibiotic Prophylaxis:</strong> Within 60 min of incision</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span><strong>VTE Prophylaxis:</strong> Deep vein thrombosis prevention</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span><strong>Surgical Site Infection:</strong> SSI prevention bundle</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span><strong>Specimen Management:</strong> Chain of custody tracking</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span><strong>Implant Tracking:</strong> FDA-compliant device logging</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span><strong>Joint Commission:</strong> Universal Protocol compliance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Notice */}
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-700 rounded-xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Epic OpTime & Cerner SurgiNet Integration</h3>
                <p className="text-sm text-gray-700">
                  This OR management system integrates with leading surgical information systems including Epic OpTime, Cerner SurgiNet, and supports HL7 FHIR standards for interoperability with anesthesia information management systems (AIMS) and electronic health records (EHR).
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}

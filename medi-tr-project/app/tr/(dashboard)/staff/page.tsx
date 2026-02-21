'use client'

import { useState } from 'react'
import {
  Users, Search, Download, Plus, UserCheck, Calendar, Clock, Shield, Activity,
  AlertCircle, Edit2, Trash2, Phone, Mail, ChevronDown, ChevronUp, Filter,
  RefreshCw, TrendingUp, Star, CheckCircle2, XCircle, ArrowLeftRight,
  ClipboardCheck, UserPlus, Award, CalendarClock, Timer
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// Types
type StaffTitle = 'Doktor' | 'Hemşire' | 'Teknisyen' | 'Eczacı' | 'Sekreter' | 'Temizlik' | 'Güvenlik' | 'Yönetici'
type Department = 'Acil Tıp' | 'Kardiyoloji' | 'Nöroloji' | 'Ortopedi' | 'Pediatri' | 'Kadın Doğum' |
  'Göz Hastalıkları' | 'KBB' | 'Dermatoloji' | 'Psikiyatri' | 'Üroloji' | 'Genel Cerrahi' |
  'Dahiliye' | 'Anestezi' | 'Radyoloji' | 'Laboratuvar' | 'Eczane' | 'Yönetim' | 'Güvenlik' | 'Temizlik'
type ShiftType = 'Sabah' | 'Öğle' | 'Gece' | 'Tatil' | 'İzinli'
type LeaveType = 'Yıllık İzin' | 'Hastalık İzni' | 'Mazeret İzni' | 'Ücretsiz İzin' | 'Doğum İzni'

interface Staff {
  id: number
  name: string
  title: StaffTitle
  department: Department
  phone: string
  email: string
  shift: ShiftType
  onDuty: boolean
  performance: number // 1-5 stars
  overtimeHours: number
  annualLeave: number
  sickLeave: number
  lastReview: string
  clockIn?: string
  clockOut?: string
  lateArrival: boolean
}

interface ShiftSchedule {
  staffId: number
  staffName: string
  day: string
  shift: ShiftType
}

interface LeaveRequest {
  id: number
  staffId: number
  staffName: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  days: number
  reason: string
  status: 'Beklemede' | 'Onaylandı' | 'Reddedildi'
  requestDate: string
}

interface ShiftSwapRequest {
  id: number
  fromStaffId: number
  fromStaffName: string
  toStaffId: number
  toStaffName: string
  date: string
  currentShift: ShiftType
  requestedShift: ShiftType
  reason: string
  status: 'Beklemede' | 'Onaylandı' | 'Reddedildi'
}

export default function PersonelPage() {
  const [aramaTerimi, setAramaTerimi] = useState('')
  const [activeTab, setActiveTab] = useState<'directory' | 'schedule' | 'attendance' | 'leave' | 'performance' | 'swaps'>('directory')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [filterTitle, setFilterTitle] = useState<string>('all')
  const [currentWeek, setCurrentWeek] = useState(0)

  // Generate 100+ realistic Turkish staff members
  const generateStaff = (): Staff[] => {
    const firstNames = {
      male: ['Mehmet', 'Ahmet', 'Mustafa', 'Ali', 'Hüseyin', 'İbrahim', 'Ömer', 'Hasan', 'Yusuf', 'Emre',
      'Burak', 'Kemal', 'Cem', 'Deniz', 'Can', 'Enes', 'Oğuz', 'Murat', 'Serkan', 'Fatih'],
      female: ['Ayşe', 'Fatma', 'Zeynep', 'Elif', 'Emine', 'Hatice', 'Merve', 'Selin', 'Betül', 'Esra',
      'Büşra', 'Şeyma', 'Yasemin', 'Özge', 'Sevgi', 'Gül', 'Nur', 'Melek', 'Derya', 'Seda']
    }
    const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Öztürk', 'Aydın', 'Özdemir',
      'Arslan', 'Doğan', 'Koç', 'Aslan', 'Kara', 'Çetin', 'Polat', 'Aksoy', 'Erdoğan', 'Güneş', 'Özkan',
      'Kurt', 'Özgür', 'Acar', 'Taş', 'Şimşek', 'Özer', 'Avcı', 'Kaplan', 'Tunç', 'Güler']

    const titles: StaffTitle[] = ['Doktor', 'Hemşire', 'Teknisyen', 'Eczacı', 'Sekreter', 'Temizlik', 'Güvenlik', 'Yönetici']
    const departments: Department[] = [
      'Acil Tıp', 'Kardiyoloji', 'Nöroloji', 'Ortopedi', 'Pediatri', 'Kadın Doğum',
      'Göz Hastalıkları', 'KBB', 'Dermatoloji', 'Psikiyatri', 'Üroloji', 'Genel Cerrahi',
      'Dahiliye', 'Anestezi', 'Radyoloji', 'Laboratuvar', 'Eczane', 'Yönetim', 'Güvenlik', 'Temizlik'
    ]

    const staff: Staff[] = []
    let id = 1

    // Generate 30 doctors
    for (let i = 0; i < 30; i++) {
      const gender = Math.random() > 0.6 ? 'male' : 'female'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const dept = departments[Math.floor(Math.random() * 17)] // Medical departments only

      staff.push({
      id: id++,
      name: `Dr. ${firstName} ${lastName}`,
      title: 'Doktor',
      department: dept,
      phone: `+90 ${Math.floor(500 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hastane.gov.tr`,
      shift: (['Sabah', 'Öğle', 'Gece'] as ShiftType[])[Math.floor(Math.random() * 3)],
      onDuty: Math.random() > 0.5,
      performance: Math.floor(3 + Math.random() * 3), // 3-5 stars
      overtimeHours: Math.floor(Math.random() * 25),
      annualLeave: Math.floor(10 + Math.random() * 15),
      sickLeave: Math.floor(Math.random() * 8),
      lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
      clockIn: Math.random() > 0.3 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      clockOut: Math.random() > 0.5 ? `1${Math.floor(6 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      lateArrival: Math.random() > 0.85
      })
    }

    // Generate 50 nurses
    for (let i = 0; i < 50; i++) {
      const gender = Math.random() > 0.3 ? 'female' : 'male'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const dept = departments[Math.floor(Math.random() * 17)]

      staff.push({
      id: id++,
      name: `Hemşire ${firstName} ${lastName}`,
      title: 'Hemşire',
      department: dept,
      phone: `+90 ${Math.floor(500 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hastane.gov.tr`,
      shift: (['Sabah', 'Öğle', 'Gece'] as ShiftType[])[Math.floor(Math.random() * 3)],
      onDuty: Math.random() > 0.5,
      performance: Math.floor(3 + Math.random() * 3),
      overtimeHours: Math.floor(Math.random() * 30),
      annualLeave: Math.floor(10 + Math.random() * 15),
      sickLeave: Math.floor(Math.random() * 8),
      lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
      clockIn: Math.random() > 0.2 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      clockOut: Math.random() > 0.6 ? `1${Math.floor(6 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      lateArrival: Math.random() > 0.9
      })
    }

    // Generate 15 technicians
    for (let i = 0; i < 15; i++) {
      const gender = Math.random() > 0.5 ? 'male' : 'female'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

      staff.push({
      id: id++,
      name: `${firstName} ${lastName}`,
      title: 'Teknisyen',
      department: ['Radyoloji', 'Laboratuvar', 'Anestezi'][Math.floor(Math.random() * 3)] as Department,
      phone: `+90 ${Math.floor(500 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hastane.gov.tr`,
      shift: (['Sabah', 'Öğle'] as ShiftType[])[Math.floor(Math.random() * 2)],
      onDuty: Math.random() > 0.5,
      performance: Math.floor(3 + Math.random() * 3),
      overtimeHours: Math.floor(Math.random() * 20),
      annualLeave: Math.floor(10 + Math.random() * 15),
      sickLeave: Math.floor(Math.random() * 6),
      lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
      clockIn: Math.random() > 0.3 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      clockOut: Math.random() > 0.5 ? `1${Math.floor(6 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      lateArrival: Math.random() > 0.9
      })
    }

    // Generate 8 pharmacists
    for (let i = 0; i < 8; i++) {
      const gender = Math.random() > 0.5 ? 'male' : 'female'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

      staff.push({
      id: id++,
      name: `Eczacı ${firstName} ${lastName}`,
      title: 'Eczacı',
      department: 'Eczane',
      phone: `+90 ${Math.floor(500 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hastane.gov.tr`,
      shift: (['Sabah', 'Öğle'] as ShiftType[])[Math.floor(Math.random() * 2)],
      onDuty: Math.random() > 0.5,
      performance: Math.floor(3 + Math.random() * 3),
      overtimeHours: Math.floor(Math.random() * 15),
      annualLeave: Math.floor(10 + Math.random() * 15),
      sickLeave: Math.floor(Math.random() * 5),
      lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
      clockIn: Math.random() > 0.3 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      clockOut: Math.random() > 0.5 ? `1${Math.floor(6 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      lateArrival: Math.random() > 0.95
      })
    }

    // Generate 12 secretaries
    for (let i = 0; i < 12; i++) {
      const gender = Math.random() > 0.3 ? 'female' : 'male'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

      staff.push({
      id: id++,
      name: `${firstName} ${lastName}`,
      title: 'Sekreter',
      department: 'Yönetim',
      phone: `+90 ${Math.floor(500 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hastane.gov.tr`,
      shift: 'Sabah',
      onDuty: Math.random() > 0.5,
      performance: Math.floor(3 + Math.random() * 3),
      overtimeHours: Math.floor(Math.random() * 10),
      annualLeave: Math.floor(10 + Math.random() * 15),
      sickLeave: Math.floor(Math.random() * 5),
      lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
      clockIn: Math.random() > 0.2 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      clockOut: Math.random() > 0.5 ? `1${Math.floor(6 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      lateArrival: Math.random() > 0.92
      })
    }

    // Generate 8 security
    for (let i = 0; i < 8; i++) {
      const gender = 'male'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

      staff.push({
      id: id++,
      name: `${firstName} ${lastName}`,
      title: 'Güvenlik',
      department: 'Güvenlik',
      phone: `+90 ${Math.floor(500 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hastane.gov.tr`,
      shift: (['Sabah', 'Öğle', 'Gece'] as ShiftType[])[Math.floor(Math.random() * 3)],
      onDuty: Math.random() > 0.4,
      performance: Math.floor(3 + Math.random() * 3),
      overtimeHours: Math.floor(Math.random() * 20),
      annualLeave: Math.floor(10 + Math.random() * 15),
      sickLeave: Math.floor(Math.random() * 6),
      lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
      clockIn: Math.random() > 0.1 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      clockOut: Math.random() > 0.6 ? `1${Math.floor(6 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      lateArrival: Math.random() > 0.93
      })
    }

    // Generate 10 cleaning staff
    for (let i = 0; i < 10; i++) {
      const gender = Math.random() > 0.3 ? 'female' : 'male'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

      staff.push({
      id: id++,
      name: `${firstName} ${lastName}`,
      title: 'Temizlik',
      department: 'Temizlik',
      phone: `+90 ${Math.floor(500 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hastane.gov.tr`,
      shift: (['Sabah', 'Öğle', 'Gece'] as ShiftType[])[Math.floor(Math.random() * 3)],
      onDuty: Math.random() > 0.5,
      performance: Math.floor(3 + Math.random() * 3),
      overtimeHours: Math.floor(Math.random() * 15),
      annualLeave: Math.floor(10 + Math.random() * 15),
      sickLeave: Math.floor(Math.random() * 8),
      lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
      clockIn: Math.random() > 0.2 ? `0${Math.floor(6 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      clockOut: Math.random() > 0.5 ? `1${Math.floor(4 + Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      lateArrival: Math.random() > 0.88
      })
    }

    // Generate 5 managers
    for (let i = 0; i < 5; i++) {
      const gender = Math.random() > 0.5 ? 'male' : 'female'
      const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

      staff.push({
      id: id++,
      name: `${firstName} ${lastName}`,
      title: 'Yönetici',
      department: 'Yönetim',
      phone: `+90 ${Math.floor(500 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hastane.gov.tr`,
      shift: 'Sabah',
      onDuty: Math.random() > 0.5,
      performance: Math.floor(4 + Math.random() * 2), // 4-5 stars
      overtimeHours: Math.floor(Math.random() * 30),
      annualLeave: Math.floor(15 + Math.random() * 10),
      sickLeave: Math.floor(Math.random() * 4),
      lastReview: `2024-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
      clockIn: Math.random() > 0.3 ? `0${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      clockOut: Math.random() > 0.3 ? `1${Math.floor(7 + Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      lateArrival: Math.random() > 0.95
      })
    }

    return staff
  }

  const [staff] = useState<Staff[]>(generateStaff())

  // Generate shift schedule for the week
  const generateWeekSchedule = (): ShiftSchedule[] => {
    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']
    const schedule: ShiftSchedule[] = []

    staff.slice(0, 30).forEach(s => {
      days.forEach(day => {
      const shifts: ShiftType[] = ['Sabah', 'Öğle', 'Gece', 'Tatil']
      schedule.push({
        staffId: s.id,
        staffName: s.name,
        day,
        shift: shifts[Math.floor(Math.random() * shifts.length)]
      })
      })
    })

    return schedule
  }

  const [weekSchedule] = useState<ShiftSchedule[]>(generateWeekSchedule())

  // Generate leave requests
  const generateLeaveRequests = (): LeaveRequest[] => {
    const leaveTypes: LeaveType[] = ['Yıllık İzin', 'Hastalık İzni', 'Mazeret İzni', 'Ücretsiz İzin', 'Doğum İzni']
    const statuses: Array<'Beklemede' | 'Onaylandı' | 'Reddedildi'> = ['Beklemede', 'Onaylandı', 'Reddedildi']
    const reasons = [
      'Aile ziyareti',
      'Sağlık kontrolü',
      'Kişisel işler',
      'Grip nedeniyle',
      'Doğum öncesi izin',
      'Düğün töreni',
      'Eğitim semineri',
      'Çocuk bakımı'
    ]

    return staff.slice(0, 20).map((s, i) => ({
      id: i + 1,
      staffId: s.id,
      staffName: s.name,
      leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      startDate: `2024-12-${String(15 + Math.floor(Math.random() * 15)).padStart(2, '0')}`,
      endDate: `2024-12-${String(20 + Math.floor(Math.random() * 10)).padStart(2, '0')}`,
      days: Math.floor(1 + Math.random() * 10),
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      requestDate: `2024-12-${String(1 + Math.floor(Math.random() * 14)).padStart(2, '0')}`
    }))
  }

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(generateLeaveRequests())

  // Generate shift swap requests
  const generateSwapRequests = (): ShiftSwapRequest[] => {
    const shifts: ShiftType[] = ['Sabah', 'Öğle', 'Gece']
    const statuses: Array<'Beklemede' | 'Onaylandı' | 'Reddedildi'> = ['Beklemede', 'Onaylandı', 'Reddedildi']
    const reasons = [
      'Kişisel randevu',
      'Aile acil durumu',
      'Sağlık sounu',
      'Eğitim programı',
      'Çocuk bakımı'
    ]

    return Array.from({ length: 12 }, (_, i) => {
      const fromStaff = staff[Math.floor(Math.random() * 50)]
      const toStaff = staff[Math.floor(Math.random() * 50)]

      return {
      id: i + 1,
      fromStaffId: fromStaff.id,
      fromStaffName: fromStaff.name,
      toStaffId: toStaff.id,
      toStaffName: toStaff.name,
      date: `2024-12-${String(20 + Math.floor(Math.random() * 10)).padStart(2, '0')}`,
      currentShift: shifts[Math.floor(Math.random() * 3)],
      requestedShift: shifts[Math.floor(Math.random() * 3)],
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)]
      }
    })
  }

  const [swapRequests, setSwapRequests] = useState<ShiftSwapRequest[]>(generateSwapRequests())

  // Filtered staff
  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
                       s.email.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
                       s.phone.includes(aramaTerimi)
    const matchesDept = filterDepartment === 'all' || s.department === filterDepartment
    const matchesTitle = filterTitle === 'all' || s.title === filterTitle
    return matchesSearch && matchesDept && matchesTitle
  })

  // Statistics
  const totalStaff = staff.length
  const onDutyNow = staff.filter(s => s.onDuty).length
  const onLeave = staff.filter(s => s.shift === 'İzinli').length
  const totalOvertimeThisMonth = staff.reduce((sum, s) => sum + s.overtimeHours, 0)
  const lateArrivals = staff.filter(s => s.lateArrival).length

  // Shift color mapping
  const getShiftColor = (shift: ShiftType) => {
    switch (shift) {
      case 'Sabah': return 'bg-green-100 text-green-800 border-green-200'
      case 'Öğle': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Gece': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Tatil': return 'bg-red-100 text-red-800 border-red-200'
      case 'İzinli': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getShiftTime = (shift: ShiftType) => {
    switch (shift) {
      case 'Sabah': return '08:00-16:00'
      case 'Öğle': return '16:00-00:00'
      case 'Gece': return '00:00-08:00'
      case 'Tatil': return 'Tatil'
      case 'İzinli': return 'İzinli'
      default: return ''
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      </div>
    )
  }

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Users className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Personel Yönetimi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">Vardiya & Nöbet Çizelgesi - İzin Takibi - Performans Değerlendirme</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4 mr-2" />
                Rapor İndir
              </Button>
              <Button
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Personel Ekle
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Users className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Toplam Personel</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalStaff}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Görevde</span>
            </div>
            <p className="text-3xl font-bold text-green-700">{onDutyNow}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-yellow-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">İzinli</span>
            </div>
            <p className="text-3xl font-bold text-yellow-700">{onLeave}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Fazla Mesai (Ay)</span>
            </div>
            <p className="text-3xl font-bold text-purple-700">{totalOvertimeThisMonth}sa</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Geç Gelenler</span>
            </div>
            <p className="text-3xl font-bold text-red-700">{lateArrivals}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Ortalama Performans</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">4.2</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 mb-6">
          <div className="flex items-center gap-2 p-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === 'directory'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Personel Listesi
              </div>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Vardiya Çizelgesi
              </div>
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === 'attendance'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Puantaj Takibi
              </div>
            </button>
            <button
              onClick={() => setActiveTab('leave')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === 'leave'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                İzin Yönetimi
              </div>
            </button>
            <button
              onClick={() => setActiveTab('swaps')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === 'swaps'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                Vardiya Değişim
              </div>
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === 'performance'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Performans
              </div>
            </button>
          </div>
        </div>

        {/* Staff Directory Tab */}
        {activeTab === 'directory' && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Personel ara (isim, email, telefon)..."
                    value={aramaTerimi}
                    onChange={(e) => setAramaTerimi(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-red-500"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg font-medium hover:border-red-300 focus:border-red-500 focus:outline-none"
                  >
                    <option value="all">Tüm Departmanlar</option>
                    <option value="Acil Tıp">Acil Tıp</option>
                    <option value="Kardiyoloji">Kardiyoloji</option>
                    <option value="Nöroloji">Nöroloji</option>
                    <option value="Ortopedi">Ortopedi</option>
                    <option value="Pediatri">Pediatri</option>
                    <option value="Kadın Doğum">Kadın Doğum</option>
                    <option value="Laboratuvar">Laboratuvar</option>
                    <option value="Radyoloji">Radyoloji</option>
                  </select>
                  <select
                    value={filterTitle}
                    onChange={(e) => setFilterTitle(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg font-medium hover:border-red-300 focus:border-red-500 focus:outline-none"
                  >
                    <option value="all">Tüm Ünvanlar</option>
                    <option value="Doktor">Doktor</option>
                    <option value="Hemşire">Hemşire</option>
                    <option value="Teknisyen">Teknisyen</option>
                    <option value="Eczacı">Eczacı</option>
                    <option value="Sekreter">Sekreter</option>
                    <option value="Güvenlik">Güvenlik</option>
                    <option value="Temizlik">Temizlik</option>
                    <option value="Yönetici">Yönetici</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Personel</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ünvan</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Departman</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Telefon</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Vardiya</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Durum</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStaff.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        #{s.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold">
                            {s.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{s.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {s.title}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {s.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {s.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {s.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getShiftColor(s.shift)} border`}>
                          {s.shift} {getShiftTime(s.shift) && `(${getShiftTime(s.shift)})`}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {s.onDuty ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Görevde
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            Görev Dışı
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 hover:border-blue-500 hover:bg-blue-50"
                            onClick={() => {
                              setSelectedStaff(s)
                              setShowEditModal(true)
                            }}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 hover:border-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 font-medium">
                  Toplam <span className="font-bold text-gray-900">{filteredStaff.length}</span> personel gösteriliyor
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Shift Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Haftalık Vardiya Çizelgesi</h2>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                    Önceki Hafta
                  </Button>
                  <span className="text-sm font-bold text-gray-700 px-4">
                    {currentWeek === 0 ? 'Bu Hafta' : `${currentWeek > 0 ? '+' : ''}${currentWeek} Hafta`}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
                    Sonraki Hafta
                    <ChevronUp className="h-4 w-4 rotate-90" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">Sabah (08:00-16:00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700">Öğle (16:00-00:00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-purple-500"></div>
                  <span className="text-sm font-medium text-gray-700">Gece (00:00-08:00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-500"></div>
                  <span className="text-sm font-medium text-gray-700">Tatil</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50">
                      Personel
                    </th>
                    {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map(day => (
                      <th key={day} className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staff.slice(0, 30).map((s) => {
                    const staffSchedule = weekSchedule.filter(ws => ws.staffId === s.id)
                    return (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                          <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                          <div className="text-xs text-gray-600">{s.title}</div>
                        </td>
                        {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map(day => {
                          const daySchedule = staffSchedule.find(ws => ws.day === day)
                          const shift = daySchedule?.shift || 'Sabah'
                          return (
                            <td key={day} className="px-4 py-4 text-center">
                              <button
                                className={`w-full px-3 py-2 rounded-lg font-semibold text-xs transition-all hover:scale-105 ${getShiftColor(shift)} border`}
                                onClick={() => {
                                  alert(`Vardiya atama: ${s.name} - ${day} - ${shift}`)
                                }}
                              >
                                {shift}
                              </button>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-gray-200">
              <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Otomatik Vardiya Planla
              </Button>
            </div>
          </div>
        )}

        {/* Attendance Tracking Tab */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Puantaj Takibi</h2>
              <p className="text-gray-600">Giriş-çıkış saatleri, geç gelenler ve erken çıkanlar</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Personel</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Departman</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Vardiya</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Giriş Saati</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Çıkış Saati</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Çalışma Süresi</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staff.filter(s => s.clockIn).slice(0, 50).map((s) => {
                    const clockInTime = s.clockIn ? parseInt(s.clockIn.split(':')[0]) * 60 + parseInt(s.clockIn.split(':')[1]) : 0
                    const expectedTime = s.shift === 'Sabah' ? 8 * 60 : s.shift === 'Öğle' ? 16 * 60 : 0
                    const isLate = clockInTime - expectedTime > 15

                    return (
                      <tr key={s.id} className={`hover:bg-gray-50 transition-colors ${isLate ? 'bg-red-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-900">{s.name}</div>
                          <div className="text-xs text-gray-600">{s.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {s.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getShiftColor(s.shift)} border`}>
                            {s.shift}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className={`font-bold font-mono ${isLate ? 'text-red-600' : 'text-green-600'}`}>
                              {s.clockIn || '--:--'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-bold font-mono text-gray-700">
                              {s.clockOut || '--:--'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {s.clockIn && s.clockOut ? (
                            <span className="font-bold text-gray-900">
                              {Math.floor(Math.random() * 3) + 7}sa {Math.floor(Math.random() * 60)}dk
                            </span>
                          ) : (
                            <span className="text-gray-400">--</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isLate ? (
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Geç Geldi (+{Math.floor((clockInTime - expectedTime) / 60)}dk)
                            </Badge>
                          ) : s.clockIn ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Zamanında
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                              Giriş Yok
                            </Badge>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-xl border-2 border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Bugün Giriş Yapan</div>
                  <div className="text-2xl font-bold text-gray-900">{staff.filter(s => s.clockIn).length}</div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                  <div className="text-sm text-gray-600 mb-1">Zamanında Gelen</div>
                  <div className="text-2xl font-bold text-green-700">{staff.filter(s => s.clockIn && !s.lateArrival).length}</div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-red-200">
                  <div className="text-sm text-gray-600 mb-1">Geç Gelen</div>
                  <div className="text-2xl font-bold text-red-700">{lateArrivals}</div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-yellow-200">
                  <div className="text-sm text-gray-600 mb-1">Devamsız</div>
                  <div className="text-2xl font-bold text-yellow-700">{staff.filter(s => !s.clockIn && s.onDuty).length}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leave Management Tab */}
        {activeTab === 'leave' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">İzin Talepleri</h2>
                    <p className="text-gray-600">Personel izin talepleri ve onay durumu</p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                    onClick={() => setShowLeaveModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    İzin Talebi Oluştur
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Talep #</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Personel</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">İzin Türü</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Başlangıç</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bitiş</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Gün</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sebep</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Durum</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaveRequests.map((lr) => (
                      <tr key={lr.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                          #{lr.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-900">{lr.staffName}</div>
                          <div className="text-xs text-gray-600">Talep: {lr.requestDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${
                            lr.leaveType === 'Yıllık İzin' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            lr.leaveType === 'Hastalık İzni' ? 'bg-red-100 text-red-800 border-red-200' :
                            lr.leaveType === 'Doğum İzni' ? 'bg-pink-100 text-pink-800 border-pink-200' :
                            'bg-gray-100 text-gray-800 border-gray-200'
                          } border`}>
                            {lr.leaveType}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                          {lr.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                          {lr.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-bold text-gray-900">{lr.days} gün</span>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-600">
                          {lr.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lr.status === 'Beklemede' && (
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              <Timer className="h-3 w-3 mr-1" />
                              Beklemede
                            </Badge>
                          )}
                          {lr.status === 'Onaylandı' && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Onaylandı
                            </Badge>
                          )}
                          {lr.status === 'Reddedildi' && (
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              Reddedildi
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lr.status === 'Beklemede' && (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => {
                                  setLeaveRequests(leaveRequests.map(l =>
                                    l.id === lr.id ? { ...l, status: 'Onaylandı' } : l
                                  ))
                                }}
                              >
                                Onayla
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setLeaveRequests(leaveRequests.map(l =>
                                    l.id === lr.id ? { ...l, status: 'Reddedildi' } : l
                                  ))
                                }}
                              >
                                Reddet
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
                <div className="text-sm text-gray-600 mb-2">Yıllık İzin</div>
                <div className="text-2xl font-bold text-blue-700">
                  {leaveRequests.filter(lr => lr.leaveType === 'Yıllık İzin').length}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
                <div className="text-sm text-gray-600 mb-2">Hastalık İzni</div>
                <div className="text-2xl font-bold text-red-700">
                  {leaveRequests.filter(lr => lr.leaveType === 'Hastalık İzni').length}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-yellow-100">
                <div className="text-sm text-gray-600 mb-2">Bekleyen Talepler</div>
                <div className="text-2xl font-bold text-yellow-700">
                  {leaveRequests.filter(lr => lr.status === 'Beklemede').length}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
                <div className="text-sm text-gray-600 mb-2">Onaylanan</div>
                <div className="text-2xl font-bold text-green-700">
                  {leaveRequests.filter(lr => lr.status === 'Onaylandı').length}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-pink-100">
                <div className="text-sm text-gray-600 mb-2">Doğum İzni</div>
                <div className="text-2xl font-bold text-pink-700">
                  {leaveRequests.filter(lr => lr.leaveType === 'Doğum İzni').length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shift Swap Requests Tab */}
        {activeTab === 'swaps' && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Vardiya Değişim Talepleri</h2>
                  <p className="text-gray-600">Personel vardiya değişim talepleri ve onay süreci</p>
                </div>
                <Button
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                  onClick={() => setShowSwapModal(true)}
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Değişim Talebi Oluştur
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Talep #</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Talep Eden</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Değişim Yapılacak</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tarih</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Mevcut</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">İstenen</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sebep</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Durum</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {swapRequests.map((sr) => (
                    <tr key={sr.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                        #{sr.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900">{sr.fromStaffName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900">{sr.toStaffName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {sr.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getShiftColor(sr.currentShift)} border`}>
                          {sr.currentShift}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getShiftColor(sr.requestedShift)} border`}>
                          {sr.requestedShift}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-600">
                        {sr.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sr.status === 'Beklemede' && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            <Timer className="h-3 w-3 mr-1" />
                            Beklemede
                          </Badge>
                        )}
                        {sr.status === 'Onaylandı' && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Onaylandı
                          </Badge>
                        )}
                        {sr.status === 'Reddedildi' && (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            Reddedildi
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sr.status === 'Beklemede' && (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => {
                                setSwapRequests(swapRequests.map(s =>
                                  s.id === sr.id ? { ...s, status: 'Onaylandı' } : s
                                ))
                              }}
                            >
                              Onayla
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-600 hover:bg-red-50"
                              onClick={() => {
                                setSwapRequests(swapRequests.map(s =>
                                  s.id === sr.id ? { ...s, status: 'Reddedildi' } : s
                                ))
                              }}
                            >
                              Reddet
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl border-2 border-yellow-200">
                  <div className="text-sm text-gray-600 mb-1">Bekleyen Talepler</div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {swapRequests.filter(sr => sr.status === 'Beklemede').length}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                  <div className="text-sm text-gray-600 mb-1">Onaylanan</div>
                  <div className="text-2xl font-bold text-green-700">
                    {swapRequests.filter(sr => sr.status === 'Onaylandı').length}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-red-200">
                  <div className="text-sm text-gray-600 mb-1">Reddedilen</div>
                  <div className="text-2xl font-bold text-red-700">
                    {swapRequests.filter(sr => sr.status === 'Reddedildi').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Reviews Tab */}
        {activeTab === 'performance' && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Performans Değerlendirme</h2>
              <p className="text-gray-600">Personel performans puanları ve değerlendirme notları</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Personel</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ünvan</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Departman</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Performans</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fazla Mesai</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Devamsızlık</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Son Değerlendirme</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staff.slice(0, 50).map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900">{s.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {s.title}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {s.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {renderStars(s.performance)}
                          <span className="text-sm font-bold text-gray-700">({s.performance}/5)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-bold ${s.overtimeHours > 20 ? 'text-orange-600' : 'text-gray-700'}`}>
                          {s.overtimeHours} saat
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-bold ${s.sickLeave > 5 ? 'text-red-600' : 'text-gray-700'}`}>
                          {s.sickLeave} gün
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {s.lastReview}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 hover:border-blue-500 hover:bg-blue-50"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Değerlendir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="p-4 bg-white rounded-xl border-2 border-yellow-200">
                  <div className="text-sm text-gray-600 mb-1">5 Yıldız</div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {staff.filter(s => s.performance === 5).length}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                  <div className="text-sm text-gray-600 mb-1">4 Yıldız</div>
                  <div className="text-2xl font-bold text-green-700">
                    {staff.filter(s => s.performance === 4).length}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">3 Yıldız</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {staff.filter(s => s.performance === 3).length}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-orange-200">
                  <div className="text-sm text-gray-600 mb-1">Ortalama Fazla Mesai</div>
                  <div className="text-2xl font-bold text-orange-700">
                    {Math.round(totalOvertimeThisMonth / staff.length)} sa
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">Toplam Değerlendirme</div>
                  <div className="text-2xl font-bold text-purple-700">
                    {staff.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Staff Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                <h3 className="text-2xl font-bold text-gray-900">Yeni Personel Ekle</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ad Soyad</label>
                    <Input placeholder="Örn: Ahmet Yılmaz" className="border-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ünvan</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg">
                      <option>Doktor</option>
                      <option>Hemşire</option>
                      <option>Teknisyen</option>
                      <option>Eczacı</option>
                      <option>Sekreter</option>
                      <option>Temizlik</option>
                      <option>Güvenlik</option>
                      <option>Yönetici</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Departman</label>
                  <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg">
                    <option>Acil Tıp</option>
                    <option>Kardiyoloji</option>
                    <option>Nöroloji</option>
                    <option>Ortopedi</option>
                    <option>Pediatri</option>
                    <option>Kadın Doğum</option>
                    <option>Laboratuvar</option>
                    <option>Radyoloji</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Telefon</label>
                    <Input placeholder="+90 5XX XXX XX XX" className="border-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <Input placeholder="ornek@hastane.gov.tr" className="border-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Vardiya</label>
                  <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg">
                    <option>Sabah (08:00-16:00)</option>
                    <option>Öğle (16:00-00:00)</option>
                    <option>Gece (00:00-08:00)</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  İptal
                </Button>
                <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Personel Ekle
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* KVKK Compliance Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">KVKK Uyumluluk - Personel Verileri</h3>
              <p className="text-sm text-purple-800">
                Personel bilgileri KVKK ve İş Kanunu kapsamında korunur. Şifreleme ile güvenli saklanır.
                Vardiya ve performans verileri ilgili mevzuata uygun şekilde işlenir.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
    
  )
}

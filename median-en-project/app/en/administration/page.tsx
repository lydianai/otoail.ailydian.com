'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Shield,
  Settings,
  Database,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  Key,
  Building2,
  UserCog,
  Lock,
  Unlock,
  FileText,
  Calendar,
  TrendingUp,
  Server,
  HardDrive,
  Cpu,
  Wifi,
  WifiOff,
  Eye,
  EyeOff,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  LogIn,
  LogOut as LogOutIcon,
  UserPlus,
  UserMinus,
  Mail,
  Phone,
  MapPin,
  Zap,
  BarChart3,
  DollarSign,
  Percent,
  LineChart,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// Executive Dashboard Types - US Hospital Administration Standards
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  department: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: Date | null
  createdDate: Date
  permissions: string[]
  jobTitle: string
}

interface Department {
  id: string
  name: string
  code: string
  director: string
  staffCount: number
  active: boolean
  budgetUtilization: number
  fteCount: number
}

interface AuditLog {
  id: string
  user: string
  action: string
  details: string
  ipAddress: string
  timestamp: Date
  status: 'success' | 'failure' | 'warning'
  module: string
}

interface APIKey {
  id: string
  name: string
  status: 'connected' | 'connecting' | 'error'
  lastSync: Date | null
  keyValue: string
  hidden: boolean
  vendor: string
}

interface HospitalSettings {
  name: string
  address: string
  phone: string
  email: string
  taxId: string
  logo: string
  licensedBeds: number
  operatingRooms: number
  hoursOfOperation: string
  emergencyContact: string
  npiNumber: string
  medicareId: string
  medicaidId: string
}

interface SystemHealth {
  cpu: number
  memory: number
  disk: number
  uptime: number
  networkLatency: number
}

interface FinancialMetric {
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
  target: string
}

interface QualityMetric {
  label: string
  score: number
  benchmark: number
  trend: 'improving' | 'declining' | 'stable'
}

// US C-Suite Roles and Positions
const EXECUTIVE_ROLES = [
  'CEO - Chief Executive Officer',
  'COO - Chief Operating Officer',
  'CFO - Chief Financial Officer',
  'CNO - Chief Nursing Officer',
  'CMO - Chief Medical Officer',
  'CIO - Chief Information Officer',
  'CMIO - Chief Medical Information Officer',
  'CCO - Chief Compliance Officer',
  'VP Patient Experience',
  'VP Quality & Patient Safety',
  'VP Medical Affairs',
  'VP Finance',
  'VP Operations',
  'Director',
  'Manager',
  'Physician',
  'Advanced Practice Provider',
  'Registered Nurse',
  'Licensed Practical Nurse',
  'Pharmacist',
  'Laboratory Technician',
  'Radiology Technician',
  'Medical Secretary',
  'Administrative Staff',
  'Finance Staff',
  'IT Staff',
  'Compliance Officer',
  'Quality Specialist',
]

// Permission matrix for US hospital operations
const PERMISSION_CATEGORIES = {
  'Patient Management': ['View', 'Create', 'Edit', 'Delete', 'Export', 'Merge Records'],
  'Clinical Documentation': ['View', 'Create', 'Edit', 'Sign', 'Addendum', 'Cosign'],
  'Scheduling': ['View', 'Create', 'Edit', 'Cancel', 'Reschedule', 'Block Time'],
  'Orders & Prescriptions': ['View', 'Create', 'Edit', 'Cancel', 'Verify', 'Dispense'],
  'Lab Results': ['View', 'Create', 'Edit', 'Verify', 'Release', 'Critical Value Callback'],
  'Radiology': ['View', 'Order', 'Edit', 'Dictate', 'Sign Report', 'Amend'],
  'Surgical Services': ['View', 'Schedule', 'Edit', 'Cancel', 'Complete', 'Post-op Documentation'],
  'Billing & Revenue': ['View', 'Create', 'Edit', 'Submit', 'Void', 'Write-off', 'Adjustment'],
  'Pharmacy': ['View', 'Prescribe', 'Dispense', 'Override', 'Controlled Substance'],
  'Inventory': ['View', 'Add', 'Edit', 'Transfer', 'Adjust', 'Order'],
  'Reports & Analytics': ['View', 'Create', 'Export', 'Print', 'Schedule', 'Dashboard Access'],
  'Administration': ['View', 'Edit', 'System Settings', 'User Management', 'Audit Logs', 'Security'],
  'Quality & Compliance': ['View', 'Create', 'Edit', 'Approve', 'Report Incidents', 'Peer Review'],
  'Financial Management': ['View Budget', 'Edit Budget', 'Approve Expenses', 'Financial Reports', 'Payroll Access'],
}

// Mock data generators - US Hospital standards
function generateUserData(): User[] {
  const americanNames = [
    { firstName: 'Robert', lastName: 'Wilson', jobTitle: 'Chief Executive Officer' },
    { firstName: 'Mary', lastName: 'Smith', jobTitle: 'Chief Financial Officer' },
    { firstName: 'James', lastName: 'Brown', jobTitle: 'Chief Medical Officer' },
    { firstName: 'Patricia', lastName: 'Johnson', jobTitle: 'Chief Nursing Officer' },
    { firstName: 'Michael', lastName: 'Martinez', jobTitle: 'Chief Operating Officer' },
    { firstName: 'Jennifer', lastName: 'Anderson', jobTitle: 'VP Patient Experience' },
    { firstName: 'John', lastName: 'Lewis', jobTitle: 'VP Quality & Patient Safety' },
    { firstName: 'Sarah', lastName: 'Garcia', jobTitle: 'Medical Director - Emergency Medicine' },
    { firstName: 'David', lastName: 'Davis', jobTitle: 'Director of Pharmacy' },
    { firstName: 'Emily', lastName: 'Thomas', jobTitle: 'Director of Laboratory Services' },
    { firstName: 'Richard', lastName: 'Robinson', jobTitle: 'Director of Radiology' },
    { firstName: 'Barbara', lastName: 'Clark', jobTitle: 'Nurse Manager - ICU' },
    { firstName: 'Joseph', lastName: 'Martinez', jobTitle: 'Attending Physician - Internal Medicine' },
    { firstName: 'Susan', lastName: 'Jackson', jobTitle: 'Director of Case Management' },
    { firstName: 'Thomas', lastName: 'Lee', jobTitle: 'Director of Surgical Services' },
    { firstName: 'Jessica', lastName: 'Taylor', jobTitle: 'Compliance Officer' },
    { firstName: 'Christopher', lastName: 'Moore', jobTitle: 'Director of Information Technology' },
    { firstName: 'Nancy', lastName: 'White', jobTitle: 'Patient Access Manager' },
    { firstName: 'Daniel', lastName: 'Harris', jobTitle: 'Revenue Cycle Director' },
    { firstName: 'Sandra', lastName: 'Martin', jobTitle: 'Human Resources Director' },
  ]

  const departments = [
    'Emergency Department',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'General Surgery',
    'Internal Medicine',
    'Pediatrics',
    'Obstetrics & Gynecology',
    'Ophthalmology',
    'Otolaryngology (ENT)',
    'Radiology & Imaging',
    'Laboratory Services',
    'Pharmacy',
    'Administration',
    'Finance',
    'Information Technology',
    'Case Management',
    'Quality & Patient Safety',
    'Compliance',
    'Human Resources',
  ]

  return Array.from({ length: 58 }, (_, i) => {
    const person = americanNames[i % americanNames.length]
    const role = EXECUTIVE_ROLES[Math.floor(Math.random() * EXECUTIVE_ROLES.length)]
    const status: 'active' | 'inactive' | 'suspended' =
      i % 15 === 0 ? 'inactive' : i % 20 === 0 ? 'suspended' : 'active'

    return {
      id: `USR-${10000 + i}`,
      firstName: person.firstName,
      lastName: person.lastName,
      email: `${person.firstName.toLowerCase()}.${person.lastName.toLowerCase()}@stmaryshospital.org`,
      phone: `+1 (${200 + Math.floor(Math.random() * 799)}) ${100 + Math.floor(Math.random() * 899)}-${1000 + Math.floor(Math.random() * 8999)}`,
      role,
      department: departments[Math.floor(Math.random() * departments.length)],
      status,
      lastLogin: status === 'active' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
      createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      permissions: [],
      jobTitle: person.jobTitle,
    }
  })
}

function generateDepartmentData(): Department[] {
  const departments = [
    { name: 'Emergency Department', code: 'ED', director: 'Dr. Sarah Garcia, MD', fteCount: 45.2 },
    { name: 'Cardiology', code: 'CARD', director: 'Dr. Mary Smith, MD, FACC', fteCount: 32.5 },
    { name: 'Neurology', code: 'NEUR', director: 'Dr. James Brown, MD, PhD', fteCount: 28.0 },
    { name: 'Orthopedics', code: 'ORTH', director: 'Dr. Patricia Johnson, MD', fteCount: 35.8 },
    { name: 'General Surgery', code: 'SURG', director: 'Dr. Michael Martinez, MD, FACS', fteCount: 42.3 },
    { name: 'Internal Medicine', code: 'IM', director: 'Dr. Joseph Martinez, MD', fteCount: 38.6 },
    { name: 'Pediatrics', code: 'PEDS', director: 'Dr. Jennifer Anderson, MD', fteCount: 31.4 },
    { name: 'Obstetrics & Gynecology', code: 'OBGYN', director: 'Dr. Emily Thomas, MD', fteCount: 29.7 },
    { name: 'Ophthalmology', code: 'OPHTH', director: 'Dr. David Davis, MD', fteCount: 18.2 },
    { name: 'Otolaryngology (ENT)', code: 'ENT', director: 'Dr. Richard Robinson, MD', fteCount: 15.5 },
    { name: 'Radiology & Imaging', code: 'RAD', director: 'Dr. Susan Jackson, MD', fteCount: 26.8 },
    { name: 'Laboratory Services', code: 'LAB', director: 'Barbara Clark, MT(ASCP)', fteCount: 34.2 },
    { name: 'Anesthesiology', code: 'ANES', director: 'Dr. Thomas Lee, MD', fteCount: 28.5 },
    { name: 'Critical Care', code: 'ICU', director: 'Dr. Jessica Taylor, MD', fteCount: 52.7 },
    { name: 'Physical Therapy', code: 'PT', director: 'Nancy White, PT, DPT', fteCount: 22.3 },
    { name: 'Psychiatry', code: 'PSYCH', director: 'Dr. Christopher Moore, MD', fteCount: 19.8 },
    { name: 'Urology', code: 'URO', director: 'Dr. Daniel Harris, MD', fteCount: 16.4 },
    { name: 'Dermatology', code: 'DERM', director: 'Dr. Sandra Martin, MD', fteCount: 14.7 },
    { name: 'Pharmacy', code: 'PHAR', director: 'Robert Wilson, PharmD', fteCount: 28.9 },
    { name: 'Administration', code: 'ADMIN', director: 'Mary Smith, MBA', fteCount: 42.5 },
    { name: 'Finance', code: 'FIN', director: 'James Brown, CPA', fteCount: 31.2 },
    { name: 'Information Technology', code: 'IT', director: 'John Lewis, MS', fteCount: 24.6 },
  ]

  return departments.map((dept, i) => ({
    id: `DEPT-${1000 + i}`,
    name: dept.name,
    code: dept.code,
    director: dept.director,
    staffCount: Math.floor(dept.fteCount * 1.2), // Total staff including part-time
    fteCount: dept.fteCount,
    budgetUtilization: 85 + Math.random() * 20, // 85-105%
    active: i % 15 !== 0,
  }))
}

function generateAuditLogData(): AuditLog[] {
  const users = [
    'Dr. Robert Wilson (CEO)',
    'Mary Smith, RN (CNO)',
    'Admin - James Brown',
    'Dr. Patricia Johnson (CMO)',
    'Jennifer Anderson (Secretary)',
  ]

  const actions = [
    'User Login',
    'User Logout',
    'Patient Record Created',
    'Patient Record Updated',
    'Patient Record Deleted',
    'Appointment Scheduled',
    'Appointment Cancelled',
    'Order Placed',
    'Order Cancelled',
    'Medication Prescribed',
    'Lab Result Released',
    'Radiology Report Signed',
    'Billing Claim Submitted',
    'Report Generated',
    'Settings Modified',
    'User Created',
    'User Modified',
    'Permission Changed',
    'System Backup Initiated',
    'Database Query Executed',
  ]

  const modules = [
    'Authentication',
    'Patient Management',
    'Scheduling',
    'Clinical Documentation',
    'Laboratory',
    'Radiology',
    'Pharmacy',
    'Billing',
    'Administration',
    'Reports',
  ]

  return Array.from({ length: 1250 }, (_, i) => {
    const action = actions[Math.floor(Math.random() * actions.length)]
    const status: 'success' | 'failure' | 'warning' =
      i % 50 === 0 ? 'failure' : i % 30 === 0 ? 'warning' : 'success'

    return {
      id: `AUD-${100000 + i}`,
      user: users[Math.floor(Math.random() * users.length)],
      action,
      details: `${action} - ${status === 'success' ? 'completed successfully' : status === 'warning' ? 'completed with warnings' : 'operation failed'}`,
      ipAddress: `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      timestamp: new Date(Date.now() - i * 5 * 60 * 1000),
      status,
      module: modules[Math.floor(Math.random() * modules.length)],
    }
  })
}

const formatDateTime = (date: Date | null) => {
  if (!date) return 'Never'
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

const formatDateShort = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

const timeAgo = (date: Date | null) => {
  if (!date) return 'Never'
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`
  const months = Math.floor(days / 30)
  return `${months} month${months > 1 ? 's' : ''} ago`
}

export default function AdministrationPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])

  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTab, setSelectedTab] = useState('dashboard')

  // Modals
  const [createUserModal, setCreateUserModal] = useState(false)
  const [editUserModal, setEditUserModal] = useState(false)
  const [deleteUserModal, setDeleteUserModal] = useState(false)
  const [permissionsModal, setPermissionsModal] = useState(false)
  const [createDeptModal, setCreateDeptModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedDept, setSelectedDept] = useState<Department | null>(null)

  // Form states
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Administrative Staff',
    department: '',
    password: '',
    permissions: [] as string[],
    jobTitle: '',
  })

  const [newDept, setNewDept] = useState({
    name: '',
    code: '',
    director: '',
  })

  const [hospitalSettings, setHospitalSettings] = useState<HospitalSettings>({
    name: 'St. Mary\'s Medical Center',
    address: '450 Medical Center Drive, Suite 100, Washington, DC 20001',
    phone: '+1 (202) 555-1000',
    email: 'info@stmaryshospital.org',
    taxId: '52-1234567',
    logo: '',
    licensedBeds: 450,
    operatingRooms: 24,
    hoursOfOperation: '24/7 Emergency & Inpatient | Outpatient: Mon-Fri 7AM-7PM',
    emergencyContact: '911 or +1 (202) 555-9111',
    npiNumber: '1234567890',
    medicareId: '520001',
    medicaidId: 'DC-520001',
  })

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: 'api-1',
      name: 'Epic EHR Integration',
      vendor: 'Epic Systems',
      status: 'connected',
      lastSync: new Date(Date.now() - 5 * 60000),
      keyValue: 'epic_sk_live_51K8x9z2eZvKYlo2C3H4J5N6',
      hidden: true,
    },
    {
      id: 'api-2',
      name: 'Availity Clearinghouse',
      vendor: 'Availity',
      status: 'connected',
      lastSync: new Date(Date.now() - 12 * 60000),
      keyValue: 'avl_prod_7Gm3Qn9Rp2Tk5Yz8Wv1Sx4Lh6',
      hidden: true,
    },
    {
      id: 'api-3',
      name: 'Press Ganey Experience',
      vendor: 'Press Ganey',
      status: 'connected',
      lastSync: new Date(Date.now() - 45 * 60000),
      keyValue: 'pg_api_2Bn7Dx5Fk9Mw3Qc6Rt8Vh1Zj4',
      hidden: true,
    },
    {
      id: 'api-4',
      name: 'Vizient Analytics',
      vendor: 'Vizient',
      status: 'error',
      lastSync: new Date(Date.now() - 120 * 60000),
      keyValue: 'vzt_key_4Hp9Nf7Ks2Yq6Tw1Cr5Lg3Mv8',
      hidden: true,
    },
  ])

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 42,
    memory: 68,
    disk: 54,
    uptime: 127,
    networkLatency: 12,
  })

  const [backupHistory, setBackupHistory] = useState([
    {
      id: 'backup-1',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: 'Full Database Backup',
      size: '2.4 GB',
      status: 'Completed',
    },
    {
      id: 'backup-2',
      timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000),
      type: 'Incremental Backup',
      size: '450 MB',
      status: 'Completed',
    },
    {
      id: 'backup-3',
      timestamp: new Date(Date.now() - 54 * 60 * 60 * 1000),
      type: 'Differential Backup',
      size: '1.2 GB',
      status: 'Completed',
    },
  ])

  // Executive Dashboard Financial Metrics
  const [financialMetrics] = useState<FinancialMetric[]>([
    { label: 'Operating Margin', value: '4.8%', change: 0.3, trend: 'up', target: '5.0%' },
    { label: 'Days Cash on Hand', value: '156', change: 12, trend: 'up', target: '150' },
    { label: 'Revenue per Adj. Patient Day', value: '$2,847', change: 85, trend: 'up', target: '$2,800' },
    { label: 'Cost per Adj. Discharge', value: '$9,234', change: -127, trend: 'down', target: '$9,500' },
  ])

  // Quality Metrics (HCAHPS, Core Measures)
  const [qualityMetrics] = useState<QualityMetric[]>([
    { label: 'HCAHPS Overall Rating', score: 4.2, benchmark: 4.0, trend: 'improving' },
    { label: 'Readmission Rate', score: 14.2, benchmark: 15.5, trend: 'improving' },
    { label: 'Patient Safety Indicator (PSI-90)', score: 0.89, benchmark: 1.00, trend: 'improving' },
    { label: 'Core Measures Compliance', score: 96.7, benchmark: 95.0, trend: 'stable' },
  ])

  useEffect(() => {
    const token = localStorage.getItem('ghp_token')
    if (!token) {
      router.push('/en/login')
      return
    }

    setUsers(generateUserData())
    setDepartments(generateDepartmentData())
    setAuditLogs(generateAuditLogData())

    // Simulate system health monitoring
    const interval = setInterval(() => {
      setSystemHealth({
        cpu: 30 + Math.random() * 40,
        memory: 50 + Math.random() * 30,
        disk: 50 + Math.random() * 20,
        uptime: 127,
        networkLatency: 8 + Math.random() * 10,
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [router])

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleCreateUser = () => {
    const newUserData: User = {
      id: `USR-${10000 + users.length}`,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      department: newUser.department,
      jobTitle: newUser.jobTitle,
      status: 'active',
      lastLogin: null,
      createdDate: new Date(),
      permissions: newUser.permissions,
    }
    setUsers([...users, newUserData])
    setCreateUserModal(false)
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'Administrative Staff',
      department: '',
      password: '',
      permissions: [],
      jobTitle: '',
    })
  }

  const handleUpdateUser = () => {
    if (!selectedUser) return
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u))
    setEditUserModal(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    setUsers(users.filter(u => u.id !== selectedUser.id))
    setDeleteUserModal(false)
    setSelectedUser(null)
  }

  const handleToggleUserStatus = (user: User) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    setUsers(users.map(u =>
      u.id === user.id ? { ...u, status: newStatus } : u
    ))
  }

  const handleCreateDept = () => {
    const newDeptData: Department = {
      id: `DEPT-${1000 + departments.length}`,
      name: newDept.name,
      code: newDept.code,
      director: newDept.director,
      staffCount: 0,
      fteCount: 0,
      budgetUtilization: 0,
      active: true,
    }
    setDepartments([...departments, newDeptData])
    setCreateDeptModal(false)
    setNewDept({ name: '', code: '', director: '' })
  }

  const handleBackup = (type: string) => {
    const newBackup = {
      id: `backup-${Date.now()}`,
      timestamp: new Date(),
      type,
      size: `${(Math.random() * 3).toFixed(1)} GB`,
      status: 'Completed',
    }
    setBackupHistory([newBackup, ...backupHistory])
  }

  const handleTestAPI = (apiId: string) => {
    setApiKeys(apiKeys.map(api =>
      api.id === apiId ? { ...api, status: 'connecting' as const } : api
    ))

    setTimeout(() => {
      setApiKeys(apiKeys.map(api =>
        api.id === apiId ? {
          ...api,
          status: 'connected' as const,
          lastSync: new Date()
        } : api
      ))
    }, 2000)
  }

  const toggleAPIKeyVisibility = (apiId: string) => {
    setApiKeys(apiKeys.map(api =>
      api.id === apiId ? { ...api, hidden: !api.hidden } : api
    ))
  }

  const activeUsers = users.filter(u => u.status === 'active').length
  const lastBackup = backupHistory[0]

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
          <div className="max-w-[1920px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Settings className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Executive Administration
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">
                      User Management, Roles, Permissions & System Configuration
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setCreateUserModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  New User
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Main Tabs */}
          <Tabs defaultValue="dashboard" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid h-auto bg-white border-2 border-gray-200 p-1 rounded-xl shadow-sm">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white py-3">
                <BarChart3 className="h-4 w-4 mr-2" />
                Executive Dashboard
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white py-3">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="permissions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white py-3">
                <Shield className="h-4 w-4 mr-2" />
                Permissions
              </TabsTrigger>
              <TabsTrigger value="departments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white py-3">
                <Building2 className="h-4 w-4 mr-2" />
                Departments
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white py-3">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="audit" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white py-3">
                <FileText className="h-4 w-4 mr-2" />
                Audit Logs
              </TabsTrigger>
              <TabsTrigger value="backup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white py-3">
                <Database className="h-4 w-4 mr-2" />
                Backup
              </TabsTrigger>
            </TabsList>

            {/* Executive Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Key Financial Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {financialMetrics.map((metric, idx) => (
                  <Card key={idx} className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <Badge className={cn(
                          metric.trend === 'up' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                        )}>
                          {metric.trend === 'up' ? '+' : ''}{metric.change > 0 ? metric.change : metric.change}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                      <p className="text-sm text-gray-600 font-medium mt-1">{metric.label}</p>
                      <p className="text-xs text-gray-500 mt-2">Target: {metric.target}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quality & Patient Safety Scorecard */}
              <Card className="border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Quality & Patient Safety Scorecard</CardTitle>
                      <CardDescription>HCAHPS, Core Measures, and Patient Safety Indicators</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {qualityMetrics.map((metric, idx) => (
                      <div key={idx} className="p-5 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-gray-700">{metric.label}</span>
                          <Badge className={cn(
                            metric.trend === 'improving' ? 'bg-green-100 text-green-700' :
                            metric.trend === 'declining' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          )}>
                            {metric.trend}
                          </Badge>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {metric.score}
                        </div>
                        <p className="text-sm text-gray-600">Benchmark: {metric.benchmark}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Health & Workforce Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Health */}
                <Card className="border-2 border-gray-100 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                        <Activity className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">System Health & Performance</CardTitle>
                        <CardDescription>Real-time infrastructure monitoring</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-blue-600" />
                            <span className="font-bold text-gray-700">CPU Usage</span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            {systemHealth.cpu.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              systemHealth.cpu > 80 ? "bg-red-500" :
                              systemHealth.cpu > 60 ? "bg-orange-500" : "bg-green-500"
                            )}
                            style={{ width: `${systemHealth.cpu}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Server className="h-5 w-5 text-purple-600" />
                            <span className="font-bold text-gray-700">Memory Usage</span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            {systemHealth.memory.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              systemHealth.memory > 80 ? "bg-red-500" :
                              systemHealth.memory > 60 ? "bg-orange-500" : "bg-green-500"
                            )}
                            style={{ width: `${systemHealth.memory}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                          <div className="flex items-center gap-2 mb-2">
                            <HardDrive className="h-5 w-5 text-orange-600" />
                            <span className="font-bold text-gray-700">Disk</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            {systemHealth.disk.toFixed(1)}%
                          </div>
                        </div>
                        <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-green-600" />
                            <span className="font-bold text-gray-700">Uptime</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            {systemHealth.uptime}d
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Workforce Analytics */}
                <Card className="border-2 border-gray-100 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Workforce Analytics</CardTitle>
                        <CardDescription>Staffing metrics and productivity</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-700">Total Active Staff</span>
                          <span className="text-2xl font-bold text-gray-900">{activeUsers}</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-700">Total FTEs</span>
                          <span className="text-2xl font-bold text-gray-900">
                            {departments.reduce((sum, dept) => sum + dept.fteCount, 0).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-700">Active Departments</span>
                          <span className="text-2xl font-bold text-gray-900">
                            {departments.filter(d => d.active).length}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-700">Avg Budget Utilization</span>
                          <span className="text-2xl font-bold text-gray-900">
                            {(departments.reduce((sum, d) => sum + d.budgetUtilization, 0) / departments.length).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">User Management</CardTitle>
                      <CardDescription>View and manage system users and access</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1 sm:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-2"
                        />
                      </div>
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-full sm:w-40 border-2">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          {EXECUTIVE_ROLES.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-40 border-2">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-4 font-bold text-gray-700">Name</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-700">Email</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-700">Role</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-700">Department</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-700">Status</th>
                          <th className="text-left py-4 px-4 font-bold text-gray-700">Last Login</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.slice(0, 20).map(user => (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div>
                                <div className="font-bold text-gray-900">{user.firstName} {user.lastName}</div>
                                <div className="text-xs text-gray-500 font-mono">{user.id}</div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm text-gray-700">{user.email}</div>
                              <div className="text-xs text-gray-500">{user.phone}</div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                {user.role}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm font-medium text-gray-700">{user.department}</span>
                            </td>
                            <td className="py-4 px-4">
                              <Badge className={cn(
                                user.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' :
                                user.status === 'inactive' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                'bg-orange-100 text-orange-700 border-orange-200'
                              )}>
                                {user.status === 'active' ? 'Active' : user.status === 'inactive' ? 'Inactive' : 'Suspended'}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm text-gray-700">{timeAgo(user.lastLogin)}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setEditUserModal(true)
                                  }}
                                  className="border-2"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleToggleUserStatus(user)}
                                  className="border-2"
                                >
                                  {user.status === 'active' ? (
                                    <Lock className="h-4 w-4 text-orange-600" />
                                  ) : (
                                    <Unlock className="h-4 w-4 text-green-600" />
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setDeleteUserModal(true)
                                  }}
                                  className="border-2 border-red-200 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredUsers.length > 20 && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600 font-medium">
                        Showing 20 of {filteredUsers.length} users
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Permissions Tab */}
            <TabsContent value="permissions" className="space-y-6">
              <Card className="border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Role-Based Access Control (RBAC) Matrix</CardTitle>
                  <CardDescription>View and configure permissions for each role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                      <div key={category} className="p-6 border-2 border-gray-100 rounded-xl bg-gray-50/30">
                        <div className="flex items-center gap-3 mb-4">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-bold text-gray-900">{category}</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b-2 border-gray-200">
                                <th className="text-left py-3 px-3 font-bold text-gray-700 min-w-[180px]">Permission</th>
                                <th className="text-center py-3 px-3 font-bold text-gray-700 min-w-[80px]">CEO</th>
                                <th className="text-center py-3 px-3 font-bold text-gray-700 min-w-[80px]">CFO</th>
                                <th className="text-center py-3 px-3 font-bold text-gray-700 min-w-[80px]">CMO</th>
                                <th className="text-center py-3 px-3 font-bold text-gray-700 min-w-[80px]">CNO</th>
                                <th className="text-center py-3 px-3 font-bold text-gray-700 min-w-[80px]">Physician</th>
                                <th className="text-center py-3 px-3 font-bold text-gray-700 min-w-[80px]">RN</th>
                                <th className="text-center py-3 px-3 font-bold text-gray-700 min-w-[80px]">Staff</th>
                              </tr>
                            </thead>
                            <tbody>
                              {permissions.map(permission => (
                                <tr key={permission} className="border-b border-gray-100">
                                  <td className="py-3 px-3 font-medium text-gray-700">{permission}</td>
                                  {['CEO', 'CFO', 'CMO', 'CNO', 'Physician', 'RN', 'Staff'].map(role => {
                                    // Mock permission logic based on US hospital standards
                                    const hasPermission =
                                      (role === 'CEO') ||
                                      (role === 'CFO' && (category === 'Financial Management' || category === 'Billing & Revenue')) ||
                                      (role === 'CMO' && (category === 'Clinical Documentation' || category === 'Quality & Compliance')) ||
                                      (role === 'CNO' && (category === 'Patient Management' || category === 'Clinical Documentation')) ||
                                      (role === 'Physician' && (category === 'Patient Management' || category === 'Clinical Documentation' || category === 'Orders & Prescriptions' || category === 'Lab Results' || category === 'Radiology')) ||
                                      (role === 'RN' && (category === 'Patient Management' || category === 'Clinical Documentation') && permission !== 'Delete') ||
                                      (role === 'Staff' && category === 'Patient Management' && permission === 'View')

                                    return (
                                      <td key={role} className="py-3 px-3 text-center">
                                        <div className="flex justify-center">
                                          <Checkbox
                                            checked={hasPermission}
                                            className="border-2"
                                          />
                                        </div>
                                      </td>
                                    )
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Departments Tab */}
            <TabsContent value="departments" className="space-y-6">
              <Card className="border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Department Management</CardTitle>
                      <CardDescription>Manage hospital departments and service lines</CardDescription>
                    </div>
                    <Button
                      onClick={() => setCreateDeptModal(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      New Department
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map(dept => (
                      <div
                        key={dept.id}
                        className={cn(
                          "p-5 rounded-xl border-2 transition-all hover:shadow-lg",
                          dept.active ? "border-gray-100 bg-white" : "border-gray-200 bg-gray-50 opacity-60"
                        )}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900">{dept.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {dept.code}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">{dept.director}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="border-2">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserCog className="h-4 w-4 mr-2" />
                                Manage Staff
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Staff Count:</span>
                            <span className="font-bold text-gray-900">{dept.staffCount}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">FTE:</span>
                            <span className="font-bold text-gray-900">{dept.fteCount.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Budget Util:</span>
                            <span className="font-bold text-gray-900">{dept.budgetUtilization.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <Badge className={cn(
                            dept.active ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"
                          )}>
                            {dept.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hospital Settings */}
                <Card className="border-2 border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Hospital Settings</CardTitle>
                    <CardDescription>General facility information and configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Hospital Name</Label>
                      <Input
                        value={hospitalSettings.name}
                        onChange={(e) => setHospitalSettings({ ...hospitalSettings, name: e.target.value })}
                        className="border-2"
                      />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Textarea
                        value={hospitalSettings.address}
                        onChange={(e) => setHospitalSettings({ ...hospitalSettings, address: e.target.value })}
                        className="border-2"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={hospitalSettings.phone}
                          onChange={(e) => setHospitalSettings({ ...hospitalSettings, phone: e.target.value })}
                          className="border-2"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={hospitalSettings.email}
                          onChange={(e) => setHospitalSettings({ ...hospitalSettings, email: e.target.value })}
                          className="border-2"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>NPI Number</Label>
                        <Input
                          value={hospitalSettings.npiNumber}
                          onChange={(e) => setHospitalSettings({ ...hospitalSettings, npiNumber: e.target.value })}
                          className="border-2"
                        />
                      </div>
                      <div>
                        <Label>Tax ID (EIN)</Label>
                        <Input
                          value={hospitalSettings.taxId}
                          onChange={(e) => setHospitalSettings({ ...hospitalSettings, taxId: e.target.value })}
                          className="border-2"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Medicare Provider ID</Label>
                        <Input
                          value={hospitalSettings.medicareId}
                          onChange={(e) => setHospitalSettings({ ...hospitalSettings, medicareId: e.target.value })}
                          className="border-2"
                        />
                      </div>
                      <div>
                        <Label>Medicaid Provider ID</Label>
                        <Input
                          value={hospitalSettings.medicaidId}
                          onChange={(e) => setHospitalSettings({ ...hospitalSettings, medicaidId: e.target.value })}
                          className="border-2"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Licensed Beds</Label>
                        <Input
                          type="number"
                          value={hospitalSettings.licensedBeds}
                          onChange={(e) => setHospitalSettings({ ...hospitalSettings, licensedBeds: parseInt(e.target.value) })}
                          className="border-2"
                        />
                      </div>
                      <div>
                        <Label>Operating Rooms</Label>
                        <Input
                          type="number"
                          value={hospitalSettings.operatingRooms}
                          onChange={(e) => setHospitalSettings({ ...hospitalSettings, operatingRooms: parseInt(e.target.value) })}
                          className="border-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Hours of Operation</Label>
                      <Input
                        value={hospitalSettings.hoursOfOperation}
                        onChange={(e) => setHospitalSettings({ ...hospitalSettings, hoursOfOperation: e.target.value })}
                        className="border-2"
                      />
                    </div>
                    <div>
                      <Label>Emergency Contact</Label>
                      <Input
                        value={hospitalSettings.emergencyContact}
                        onChange={(e) => setHospitalSettings({ ...hospitalSettings, emergencyContact: e.target.value })}
                        className="border-2"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </CardContent>
                </Card>

                {/* API Keys Management */}
                <Card className="border-2 border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">API Integration Management</CardTitle>
                    <CardDescription>EHR, billing, and analytics platform connections</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {apiKeys.map(api => (
                      <div key={api.id} className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/30">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              api.status === 'connected' ? "bg-green-100" :
                              api.status === 'connecting' ? "bg-orange-100" : "bg-red-100"
                            )}>
                              {api.status === 'connected' ? (
                                <Wifi className="h-5 w-5 text-green-600" />
                              ) : api.status === 'connecting' ? (
                                <RefreshCw className="h-5 w-5 text-orange-600 animate-spin" />
                              ) : (
                                <WifiOff className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{api.name}</h4>
                              <p className="text-xs text-gray-600">
                                {api.vendor} • Last sync: {timeAgo(api.lastSync)}
                              </p>
                            </div>
                          </div>
                          <Badge className={cn(
                            api.status === 'connected' ? "bg-green-100 text-green-700 border-green-200" :
                            api.status === 'connecting' ? "bg-orange-100 text-orange-700 border-orange-200" :
                            "bg-red-100 text-red-700 border-red-200"
                          )}>
                            {api.status === 'connected' ? 'Connected' : api.status === 'connecting' ? 'Connecting' : 'Error'}
                          </Badge>
                        </div>
                        <div className="mb-3">
                          <Label className="text-xs">API Key</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type={api.hidden ? "password" : "text"}
                              value={api.keyValue}
                              readOnly
                              className="font-mono text-xs border-2"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleAPIKeyVisibility(api.id)}
                              className="border-2"
                            >
                              {api.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTestAPI(api.id)}
                            disabled={api.status === 'connecting'}
                            className="flex-1 border-2"
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            Test Connection
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Audit Logs Tab */}
            <TabsContent value="audit" className="space-y-6">
              <Card className="border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">System Audit Logs</CardTitle>
                      <CardDescription>Complete activity log for compliance and security monitoring</CardDescription>
                    </div>
                    <Button variant="outline" className="border-2">
                      <Download className="h-4 w-4 mr-2" />
                      Export Logs
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-3 font-bold text-gray-700">Timestamp</th>
                          <th className="text-left py-3 px-3 font-bold text-gray-700">User</th>
                          <th className="text-left py-3 px-3 font-bold text-gray-700">Action</th>
                          <th className="text-left py-3 px-3 font-bold text-gray-700">Module</th>
                          <th className="text-left py-3 px-3 font-bold text-gray-700">Details</th>
                          <th className="text-left py-3 px-3 font-bold text-gray-700">IP Address</th>
                          <th className="text-left py-3 px-3 font-bold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditLogs.slice(0, 50).map(log => (
                          <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-3">
                              <div className="text-sm font-medium text-gray-900">
                                {formatDateTime(log.timestamp)}
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-sm font-medium text-gray-700">{log.user}</span>
                            </td>
                            <td className="py-3 px-3">
                              <Badge variant="outline" className="text-xs">
                                {log.action}
                              </Badge>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-sm text-gray-600">{log.module}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-sm text-gray-600">{log.details}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-sm font-mono text-gray-600">{log.ipAddress}</span>
                            </td>
                            <td className="py-3 px-3">
                              <Badge className={cn(
                                log.status === 'success' ? 'bg-green-100 text-green-700 border-green-200' :
                                log.status === 'warning' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                'bg-red-100 text-red-700 border-red-200'
                              )}>
                                {log.status === 'success' ? 'Success' : log.status === 'warning' ? 'Warning' : 'Failed'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 font-medium">
                      Total {auditLogs.length.toLocaleString('en-US')} records found (Showing first 50)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Backup Tab */}
            <TabsContent value="backup" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleBackup('Full Database Backup')}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 bg-blue-100 rounded-2xl mb-4">
                        <Database className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Full Database Backup</h3>
                      <p className="text-sm text-gray-600 mb-4">Complete system backup with all data</p>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Start Backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleBackup('Incremental Backup')}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 bg-green-100 rounded-2xl mb-4">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Incremental Backup</h3>
                      <p className="text-sm text-gray-600 mb-4">Backup only changes since last backup</p>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Start Backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleBackup('Differential Backup')}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 bg-purple-100 rounded-2xl mb-4">
                        <BarChart3 className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Differential Backup</h3>
                      <p className="text-sm text-gray-600 mb-4">Changes since last full backup</p>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Start Backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Backup History</CardTitle>
                      <CardDescription>Recent backup operations and restore points</CardDescription>
                    </div>
                    <Button variant="outline" className="border-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Restore Backup
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {backupHistory.map(backup => (
                      <div key={backup.id} className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/30 hover:border-gray-200 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                              <Database className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{backup.type}</h4>
                              <p className="text-sm text-gray-600">{formatDateTime(backup.timestamp)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-bold text-gray-900">{backup.size}</div>
                              <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">
                                {backup.status}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="border-2">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Restore Backup
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        {/* Create User Modal */}
        <Dialog open={createUserModal} onOpenChange={setCreateUserModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system and assign permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="Robert"
                    className="border-2"
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    placeholder="Wilson"
                    className="border-2"
                  />
                </div>
              </div>
              <div>
                <Label>Job Title</Label>
                <Input
                  value={newUser.jobTitle}
                  onChange={(e) => setNewUser({ ...newUser, jobTitle: e.target.value })}
                  placeholder="Chief Medical Officer"
                  className="border-2"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="robert.wilson@stmaryshospital.org"
                  className="border-2"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="+1 (202) 555-1234"
                  className="border-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger className="border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EXECUTIVE_ROLES.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select value={newUser.department} onValueChange={(value) => setNewUser({ ...newUser, department: value })}>
                    <SelectTrigger className="border-2">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.filter(d => d.active).map(dept => (
                        <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="••••••••"
                  className="border-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateUserModal(false)} className="border-2">
                Cancel
              </Button>
              <Button
                onClick={handleCreateUser}
                disabled={!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.department}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        <Dialog open={editUserModal} onOpenChange={setEditUserModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit User</DialogTitle>
              <DialogDescription>
                Update user information and permissions
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      value={selectedUser.firstName}
                      onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
                      className="border-2"
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      value={selectedUser.lastName}
                      onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                      className="border-2"
                    />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="border-2"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={selectedUser.phone}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    className="border-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Role</Label>
                    <Select value={selectedUser.role} onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}>
                      <SelectTrigger className="border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {EXECUTIVE_ROLES.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={selectedUser.status} onValueChange={(value: any) => setSelectedUser({ ...selectedUser, status: value })}>
                      <SelectTrigger className="border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditUserModal(false)} className="border-2">
                Cancel
              </Button>
              <Button
                onClick={handleUpdateUser}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Modal */}
        <Dialog open={deleteUserModal} onOpenChange={setDeleteUserModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl text-red-600">Delete User</DialogTitle>
              <DialogDescription>
                This action cannot be undone. The user will be permanently deleted.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="py-4">
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <p className="text-sm text-gray-700 mb-2">
                    You are about to delete <strong className="text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</strong>.
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {selectedUser.email}<br />
                    Role: {selectedUser.role}<br />
                    Department: {selectedUser.department}
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteUserModal(false)} className="border-2">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteUser}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Yes, Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Department Modal */}
        <Dialog open={createDeptModal} onOpenChange={setCreateDeptModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New Department</DialogTitle>
              <DialogDescription>
                Add a new department or service line to the hospital
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Department Name</Label>
                <Input
                  value={newDept.name}
                  onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  placeholder="Cardiology"
                  className="border-2"
                />
              </div>
              <div>
                <Label>Department Code</Label>
                <Input
                  value={newDept.code}
                  onChange={(e) => setNewDept({ ...newDept, code: e.target.value.toUpperCase() })}
                  placeholder="CARD"
                  className="border-2"
                  maxLength={5}
                />
              </div>
              <div>
                <Label>Department Director</Label>
                <Input
                  value={newDept.director}
                  onChange={(e) => setNewDept({ ...newDept, director: e.target.value })}
                  placeholder="Dr. Robert Wilson, MD, FACC"
                  className="border-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDeptModal(false)} className="border-2">
                Cancel
              </Button>
              <Button
                onClick={handleCreateDept}
                disabled={!newDept.name || !newDept.code || !newDept.director}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Create Department
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

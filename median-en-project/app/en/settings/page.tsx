'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

import { useState, useRef } from 'react'
import {
  Settings,
  User,
  Bell,
  Lock,
  Globe,
  Eye,
  Palette,
  Save,
  Shield,
  Mail,
  Phone,
  Upload,
  Camera,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Monitor,
  Sun,
  Moon,
  Smartphone,
  Laptop,
  MapPin,
  Clock,
  Calendar,
  Hash,
  LogOut,
  Keyboard,
  FileSignature,
  Activity,
  Users as UsersIcon,
  Database,
  Server,
  Network,
  HardDrive,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PasswordStrength {
  score: number
  label: string
  color: string
  criteria: {
    minLength: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
}

interface ActiveSession {
  id: string
  device: string
  browser: string
  ip: string
  location: string
  lastActive: Date
  current: boolean
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'appearance' | 'privacy' | 'advanced' | 'integration'>('profile')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const signatureInputRef = useRef<HTMLInputElement>(null)

  // User data - US Healthcare Professional Profile
  const [user, setUser] = useState({
    firstName: 'Robert John',
    lastName: 'Wilson',
    email: 'robert.wilson@healthcare.gov',
    phone: '+1 532 456 7890',
    department: 'Cardiology',
    position: 'Assistant Chief Physician',
    registrationNo: 'DR-2018-1453',
    licenseNo: 'US-115234',
    npiNumber: 'NPI-1234567890',
    deaNumber: 'DEA-RW1234567',
    avatarUrl: '',
  })

  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  // Password strength calculation
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    const criteria = {
      minLength: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(criteria).filter(Boolean).length
    let label = 'Very Weak'
    let color = 'bg-red-500'

    if (score === 5) {
      label = 'Very Strong'
      color = 'bg-green-500'
    } else if (score === 4) {
      label = 'Strong'
      color = 'bg-blue-500'
    } else if (score === 3) {
      label = 'Medium'
      color = 'bg-yellow-500'
    } else if (score === 2) {
      label = 'Weak'
      color = 'bg-orange-500'
    }

    return { score, label, color, criteria }
  }

  const passwordStrength = calculatePasswordStrength(passwords.new)

  // Theme settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')
  const [language, setLanguage] = useState<'en' | 'es'>('en')

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: {
      appointmentReminders: true,
      emergencyAlerts: true,
      systemNotification: true,
      labResults: true,
      reportReady: true,
      taskAssignment: true,
      hl7Messages: true,
      admitDischargeTransfer: true,
    },
    sms: {
      appointmentReminders: true,
      emergencyAlerts: true,
      systemNotification: false,
      labResults: true,
      reportReady: false,
      taskAssignment: true,
      hl7Messages: false,
      admitDischargeTransfer: true,
    },
    push: {
      appointmentReminders: true,
      emergencyAlerts: true,
      systemNotification: true,
      labResults: true,
      reportReady: true,
      taskAssignment: true,
      hl7Messages: true,
      admitDischargeTransfer: true,
    },
    inApp: {
      appointmentReminders: true,
      emergencyAlerts: true,
      systemNotification: true,
      labResults: true,
      reportReady: true,
      taskAssignment: true,
      hl7Messages: true,
      admitDischargeTransfer: true,
    },
    emailFrequency: 'instant' as 'instant' | 'daily' | 'weekly',
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'department' as 'public' | 'department' | 'private',
    contactInfoVisibility: 'department' as 'public' | 'department' | 'private',
    activityStatus: true,
    hipaaAuditLog: true,
  })

  // 2FA settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const backupCodes = ['1234-5678', '9012-3456', '7890-1234', '4567-8901', '2345-6789']

  // Active sessions
  const [sessions] = useState<ActiveSession[]>([
    {
      id: '1',
      device: 'Windows PC',
      browser: 'Chrome 120',
      ip: '192.168.1.105',
      location: 'New York, NY',
      lastActive: new Date(),
      current: true,
    },
    {
      id: '2',
      device: 'iPhone 15 Pro',
      browser: 'Safari Mobile',
      ip: '192.168.1.247',
      location: 'New York, NY',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      current: false,
    },
    {
      id: '3',
      device: 'iPad Air',
      browser: 'Safari',
      ip: '192.168.1.158',
      location: 'New York, NY',
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      current: false,
    },
  ])

  // Regional settings
  const [regional, setRegional] = useState({
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h' as '24h' | '12h',
    numberFormat: 'en' as 'en' | 'es',
  })

  // EHR Integration settings
  const [ehrIntegration, setEhrIntegration] = useState({
    ehrSystem: 'epic' as 'epic' | 'cerner' | 'allscripts' | 'meditech',
    hl7Version: 'HL7 v2.5' as 'HL7 v2.5' | 'HL7 v2.7' | 'FHIR R4',
    pacsIntegration: true,
    lisIntegration: true,
    pharmacyInterface: true,
    ssoEnabled: true,
    ldapEnabled: true,
    sessionTimeout: 15,
    auditLogRetention: 90,
  })

  // Keyboard shortcuts
  const [shortcuts, setShortcuts] = useState([
    { action: 'New Patient', current: 'Ctrl+N', editing: false },
    { action: 'Search', current: 'Ctrl+F', editing: false },
    { action: 'Save', current: 'Ctrl+S', editing: false },
    { action: 'Print', current: 'Ctrl+P', editing: false },
    { action: 'Quick Order', current: 'Ctrl+O', editing: false },
    { action: 'View Labs', current: 'Ctrl+L', editing: false },
  ])

  // Account statistics
  const accountStats = {
    created: new Date('2018-03-15'),
    lastLogin: new Date(Date.now() - 30 * 60 * 1000),
    totalSessions: 1247,
    passwordLastChanged: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  }

  const handleSaveProfile = () => {
    setSuccessMessage('Profile information successfully updated!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!')
      return
    }
    if (passwordStrength.score < 5) {
      alert('Please use a strong password that meets all HIPAA requirements!')
      return
    }
    setSuccessMessage('Your password successfully changed!')
    setShowSuccessAlert(true)
    setPasswords({ current: '', new: '', confirm: '' })
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSaveNotifications = () => {
    setSuccessMessage('Notification preferences saved!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSaveAppearance = () => {
    setSuccessMessage('Appearance settings saved!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSavePrivacy = () => {
    setSuccessMessage('Privacy settings updated!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSaveAdvanced = () => {
    setSuccessMessage('Advanced settings saved!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleSaveIntegration = () => {
    setSuccessMessage('Integration settings saved successfully!')
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
      setUser({ ...user, avatarUrl: reader.result as string })
      setSuccessMessage('Profile photo uploaded!')
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 3000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSuccessMessage('Digital signature uploaded!')
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 3000)
    }
  }

  const handleLogoutSession = (sessionId: string) => {
    setSuccessMessage(`Session terminated successfully!`)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 1) return 'Now'
    if (minutes < 60) return `${minutes} minutes ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hours ago`
    const days = Math.floor(hours / 24)
    return `${days} days ago`
  }

  return (

      <DashboardLayout>
    <div className="min-h-screen">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border-2 border-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-bold">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                  <Settings className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Settings
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">User Profile & System Preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
              {/* Profile Card */}
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-blue-200 shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-blue-200">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-all"
                  >
                    <Camera className="h-4 w-4 text-gray-700" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-600 mt-1">{user.position}</p>
                <p className="text-xs text-gray-500 mt-0.5">{user.department}</p>
                <Badge className="mt-2 bg-green-100 text-green-700 border-green-300">Active</Badge>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <User className="h-5 w-5" />
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'security'
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Lock className="h-5 w-5" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'notifications'
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('integration')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'integration'
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Network className="h-5 w-5" />
                  EHR Integration
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'appearance'
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Palette className="h-5 w-5" />
                  Appearance
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'privacy'
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Eye className="h-5 w-5" />
                  Privacy
                </button>
                <button
                  onClick={() => setActiveTab('advanced')}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all',
                    activeTab === 'advanced'
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                  )}
                >
                  <Settings className="h-5 w-5" />
                  Advanced
                </button>
              </div>

              {/* Account Stats */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-3">Account Statistics</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registration Date:</span>
                    <span className="font-semibold text-gray-900">{formatDate(accountStats.created)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Login:</span>
                    <span className="font-semibold text-gray-900">{getTimeAgo(accountStats.lastLogin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sessions:</span>
                    <span className="font-semibold text-gray-900">{accountStats.totalSessions.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Password Changed:</span>
                    <span className="font-semibold text-gray-900">{getTimeAgo(accountStats.passwordLastChanged)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Your name, contact information, and position details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">First Name</label>
                          <Input
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            className="border-2"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Last Name</label>
                          <Input
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            className="border-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          className="border-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={user.phone}
                          onChange={(e) => setUser({ ...user, phone: e.target.value })}
                          className="border-2"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Department</label>
                          <select
                            value={user.department}
                            onChange={(e) => setUser({ ...user, department: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                          >
                            <option>Cardiology</option>
                            <option>Neurology</option>
                            <option>Internal Medicine</option>
                            <option>Pulmonology</option>
                            <option>General Surgery</option>
                            <option>Orthopedics</option>
                            <option>Emergency Medicine</option>
                            <option>Radiology</option>
                            <option>Oncology</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Position</label>
                          <select
                            value={user.position}
                            onChange={(e) => setUser({ ...user, position: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                          >
                            <option>Assistant Chief Physician</option>
                            <option>Chief Physician</option>
                            <option>Department Head</option>
                            <option>Attending Physician</option>
                            <option>Resident Doctor</option>
                            <option>Fellow</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Registration Number</label>
                          <Input value={user.registrationNo} disabled className="border-2 bg-gray-50" />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">License Number</label>
                          <Input value={user.licenseNo} disabled className="border-2 bg-gray-50" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">NPI Number</label>
                          <Input value={user.npiNumber} disabled className="border-2 bg-gray-50" />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">DEA Number</label>
                          <Input value={user.deaNumber} disabled className="border-2 bg-gray-50" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Profile Information
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Digital Signature */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileSignature className="h-5 w-5 text-blue-600" />
                      Digital Signature
                    </CardTitle>
                    <CardDescription>
                      Upload your digital signature for medical reports and prescriptions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <FileSignature className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-4">
                        Upload your signature image in PNG or JPG format (Max: 2MB)
                      </p>
                      <Button
                        onClick={() => signatureInputRef.current?.click()}
                        variant="outline"
                        className="border-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Signature
                      </Button>
                      <input
                        ref={signatureInputRef}
                        type="file"
                        accept="image/png,image/jpeg"
                        className="hidden"
                        onChange={handleSignatureUpload}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Password Change */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-blue-600" />
                      Change Password
                    </CardTitle>
                    <CardDescription>
                      Use a strong password to secure your account (HIPAA compliant)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Current Password</label>
                        <Input
                          type="password"
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          placeholder="Enter your current password"
                          className="border-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">New Password</label>
                        <Input
                          type="password"
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          placeholder="Enter your new password"
                          className="border-2"
                        />
                        {passwords.new && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-700">Password Strength:</span>
                              <span className={cn('text-xs font-bold', {
                                'text-green-600': passwordStrength.score === 5,
                                'text-blue-600': passwordStrength.score === 4,
                                'text-yellow-600': passwordStrength.score === 3,
                                'text-orange-600': passwordStrength.score === 2,
                                'text-red-600': passwordStrength.score < 2,
                              })}>
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={cn('h-full transition-all', passwordStrength.color)}
                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Confirm New Password</label>
                        <Input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          placeholder="Confirm your new password"
                          className="border-2"
                        />
                      </div>

                      {/* Password Requirements */}
                      <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                        <p className="font-bold text-blue-900 text-sm mb-3">HIPAA Password Requirements:</p>
                        <div className="space-y-2">
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.minLength ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.minLength ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>At least 12 characters</span>
                          </div>
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.uppercase ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.uppercase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>At least one uppercase letter (A-Z)</span>
                          </div>
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.lowercase ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.lowercase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>At least one lowercase letter (a-z)</span>
                          </div>
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.number ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.number ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>At least one number (0-9)</span>
                          </div>
                          <div className={cn('flex items-center gap-2 text-sm', passwordStrength.criteria.special ? 'text-green-600' : 'text-gray-600')}>
                            {passwordStrength.criteria.special ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            <span>At least one special character (!@#$%^&*)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleChangePassword}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Two-Factor Authentication (2FA)
                    </CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-100 mb-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-bold text-blue-900">2FA Status</p>
                          <p className="text-sm text-blue-700">
                            {twoFactorEnabled ? 'Enabled - Your account is protected' : 'Disabled - Enable to protect your account'}
                          </p>
                        </div>
                      </div>
                      <Badge className={twoFactorEnabled ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-700 border-gray-300'}>
                        {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>

                    {!twoFactorEnabled ? (
                      <Button
                        onClick={() => {
                          setTwoFactorEnabled(true)
                          setShowQRCode(true)
                          setSuccessMessage('2FA enabled successfully!')
                          setShowSuccessAlert(true)
                          setTimeout(() => setShowSuccessAlert(false), 3000)
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Enable 2FA
                      </Button>
                    ) : (
                      <div>
                        {showQRCode && (
                          <div className="mb-4 p-4 bg-white rounded-xl border-2 border-gray-200 text-center">
                            <p className="text-sm font-semibold text-gray-700 mb-3">
                              Scan this QR code with Google Authenticator or similar app:
                            </p>
                            <div className="w-48 h-48 bg-gray-200 mx-auto rounded-xl flex items-center justify-center">
                              <p className="text-xs text-gray-500">QR Code</p>
                            </div>
                          </div>
                        )}

                        <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-100">
                          <p className="font-bold text-orange-900 text-sm mb-2">Backup Codes</p>
                          <p className="text-xs text-orange-700 mb-3">
                            Store these codes securely. Use them if you lose access to your phone.
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {backupCodes.map((code, index) => (
                              <div key={index} className="p-2 bg-white rounded-lg font-mono text-sm text-center border border-orange-200">
                                {code}
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setTwoFactorEnabled(false)
                            setShowQRCode(false)
                            setSuccessMessage('2FA disabled')
                            setShowSuccessAlert(true)
                            setTimeout(() => setShowSuccessAlert(false), 3000)
                          }}
                          variant="outline"
                          className="mt-4 border-2 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Disable 2FA
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Active Sessions */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Active Sessions
                    </CardTitle>
                    <CardDescription>
                      Active devices and browsers connected to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all',
                            session.current ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {session.device.includes('PC') ? (
                                <Monitor className="h-5 w-5 text-gray-600 mt-1" />
                              ) : session.device.includes('iPhone') ? (
                                <Smartphone className="h-5 w-5 text-gray-600 mt-1" />
                              ) : (
                                <Laptop className="h-5 w-5 text-gray-600 mt-1" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-bold text-gray-900">{session.device}</p>
                                  {session.current && (
                                    <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                                      Current Session
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{session.browser}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {session.ip} • {session.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {getTimeAgo(session.lastActive)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {!session.current && (
                              <Button
                                onClick={() => handleLogoutSession(session.id)}
                                variant="outline"
                                size="sm"
                                className="border-2 border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <LogOut className="h-4 w-4 mr-1" />
                                Terminate
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-600" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to receive notifications for different events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left p-3 font-bold text-gray-700">Notification Type</th>
                            <th className="text-center p-3 font-bold text-gray-700">
                              <Mail className="h-5 w-5 mx-auto mb-1" />
                              Email
                            </th>
                            <th className="text-center p-3 font-bold text-gray-700">
                              <Smartphone className="h-5 w-5 mx-auto mb-1" />
                              SMS
                            </th>
                            <th className="text-center p-3 font-bold text-gray-700">
                              <Bell className="h-5 w-5 mx-auto mb-1" />
                              Push
                            </th>
                            <th className="text-center p-3 font-bold text-gray-700">
                              <Activity className="h-5 w-5 mx-auto mb-1" />
                              In-App
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Appointment Reminders</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.appointmentReminders}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, appointmentReminders: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.appointmentReminders}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, appointmentReminders: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.appointmentReminders}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, appointmentReminders: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.appointmentReminders}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, appointmentReminders: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 bg-red-50/50">
                            <td className="p-3 font-semibold text-gray-900">Emergency Alerts</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.emergencyAlerts}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, emergencyAlerts: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.emergencyAlerts}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, emergencyAlerts: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.emergencyAlerts}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, emergencyAlerts: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.emergencyAlerts}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, emergencyAlerts: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">System Notifications</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.systemNotification}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, systemNotification: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.systemNotification}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, systemNotification: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.systemNotification}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, systemNotification: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.systemNotification}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, systemNotification: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Lab Results</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.labResults}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, labResults: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.labResults}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, labResults: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.labResults}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, labResults: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.labResults}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, labResults: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Report Ready</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.reportReady}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, reportReady: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.reportReady}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, reportReady: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.reportReady}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, reportReady: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.reportReady}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, reportReady: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-3 font-semibold text-gray-900">Task Assignment</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.taskAssignment}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, taskAssignment: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.taskAssignment}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, taskAssignment: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.taskAssignment}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, taskAssignment: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.taskAssignment}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, taskAssignment: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 bg-blue-50/50">
                            <td className="p-3 font-semibold text-gray-900">HL7 Messages</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.hl7Messages}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, hl7Messages: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.hl7Messages}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, hl7Messages: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.hl7Messages}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, hl7Messages: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.hl7Messages}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, hl7Messages: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 bg-purple-50/50">
                            <td className="p-3 font-semibold text-gray-900">ADT Feed (Admit/Discharge/Transfer)</td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.email.admitDischargeTransfer}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  email: { ...notifications.email, admitDischargeTransfer: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.sms.admitDischargeTransfer}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  sms: { ...notifications.sms, admitDischargeTransfer: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.push.admitDischargeTransfer}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  push: { ...notifications.push, admitDischargeTransfer: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={notifications.inApp.admitDischargeTransfer}
                                onChange={(e) => setNotifications({
                                  ...notifications,
                                  inApp: { ...notifications.inApp, admitDischargeTransfer: e.target.checked }
                                })}
                                className="w-5 h-5 text-blue-600"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">Email Notification Frequency</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          onClick={() => setNotifications({ ...notifications, emailFrequency: 'instant' })}
                          className={cn(
                            'p-3 rounded-xl font-semibold text-sm border-2 transition-all',
                            notifications.emailFrequency === 'instant'
                              ? 'bg-blue-500 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                          )}
                        >
                          Instant
                        </button>
                        <button
                          onClick={() => setNotifications({ ...notifications, emailFrequency: 'daily' })}
                          className={cn(
                            'p-3 rounded-xl font-semibold text-sm border-2 transition-all',
                            notifications.emailFrequency === 'daily'
                              ? 'bg-blue-500 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                          )}
                        >
                          Daily Summary
                        </button>
                        <button
                          onClick={() => setNotifications({ ...notifications, emailFrequency: 'weekly' })}
                          className={cn(
                            'p-3 rounded-xl font-semibold text-sm border-2 transition-all',
                            notifications.emailFrequency === 'weekly'
                              ? 'bg-blue-500 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                          )}
                        >
                          Weekly Summary
                        </button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleSaveNotifications}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Notification Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* EHR Integration Tab */}
            {activeTab === 'integration' && (
              <div className="space-y-6">
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      EHR System Integration
                    </CardTitle>
                    <CardDescription>
                      Configure your Electronic Health Record system connections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Primary EHR System</label>
                        <select
                          value={ehrIntegration.ehrSystem}
                          onChange={(e) => setEhrIntegration({ ...ehrIntegration, ehrSystem: e.target.value as any })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                        >
                          <option value="epic">Epic Systems</option>
                          <option value="cerner">Cerner (Oracle Health)</option>
                          <option value="allscripts">Allscripts</option>
                          <option value="meditech">MEDITECH</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">HL7 / FHIR Version</label>
                        <select
                          value={ehrIntegration.hl7Version}
                          onChange={(e) => setEhrIntegration({ ...ehrIntegration, hl7Version: e.target.value as any })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                        >
                          <option value="HL7 v2.5">HL7 v2.5</option>
                          <option value="HL7 v2.7">HL7 v2.7</option>
                          <option value="FHIR R4">FHIR R4 (Fast Healthcare Interoperability Resources)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-gray-900">PACS Integration</p>
                              <p className="text-sm text-gray-600 mt-1">Picture Archiving Communication System</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={ehrIntegration.pacsIntegration}
                              onChange={(e) => setEhrIntegration({ ...ehrIntegration, pacsIntegration: e.target.checked })}
                              className="w-6 h-6 text-blue-600"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-gray-900">LIS Integration</p>
                              <p className="text-sm text-gray-600 mt-1">Laboratory Information System</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={ehrIntegration.lisIntegration}
                              onChange={(e) => setEhrIntegration({ ...ehrIntegration, lisIntegration: e.target.checked })}
                              className="w-6 h-6 text-blue-600"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-gray-900">Pharmacy Interface</p>
                              <p className="text-sm text-gray-600 mt-1">E-Prescribing & Drug Database</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={ehrIntegration.pharmacyInterface}
                              onChange={(e) => setEhrIntegration({ ...ehrIntegration, pharmacyInterface: e.target.checked })}
                              className="w-6 h-6 text-blue-600"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-gray-900">SSO Enabled</p>
                              <p className="text-sm text-gray-600 mt-1">Single Sign-On (SAML 2.0)</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={ehrIntegration.ssoEnabled}
                              onChange={(e) => setEhrIntegration({ ...ehrIntegration, ssoEnabled: e.target.checked })}
                              className="w-6 h-6 text-blue-600"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-gray-900">LDAP / Active Directory</p>
                              <p className="text-sm text-gray-600 mt-1">Enterprise Directory Integration</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={ehrIntegration.ldapEnabled}
                              onChange={(e) => setEhrIntegration({ ...ehrIntegration, ldapEnabled: e.target.checked })}
                              className="w-6 h-6 text-blue-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Security & Compliance Settings
                    </CardTitle>
                    <CardDescription>
                      HIPAA-compliant security configurations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Session Timeout (minutes)
                        </label>
                        <select
                          value={ehrIntegration.sessionTimeout}
                          onChange={(e) => setEhrIntegration({ ...ehrIntegration, sessionTimeout: parseInt(e.target.value) })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                        >
                          <option value="5">5 minutes</option>
                          <option value="10">10 minutes</option>
                          <option value="15">15 minutes (Recommended)</option>
                          <option value="30">30 minutes</option>
                          <option value="60">60 minutes</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Audit Log Retention (days)
                        </label>
                        <select
                          value={ehrIntegration.auditLogRetention}
                          onChange={(e) => setEhrIntegration({ ...ehrIntegration, auditLogRetention: parseInt(e.target.value) })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                        >
                          <option value="30">30 days</option>
                          <option value="60">60 days</option>
                          <option value="90">90 days (HIPAA Minimum)</option>
                          <option value="180">180 days</option>
                          <option value="365">365 days (1 year)</option>
                          <option value="2555">7 years (Legal Requirement)</option>
                        </select>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-purple-600 mt-1" />
                          <div>
                            <p className="font-bold text-purple-900 text-sm">HIPAA Compliance</p>
                            <p className="text-xs text-purple-700 mt-1">
                              All settings are configured to meet HIPAA Security Rule requirements. Audit logs track all access to Protected Health Information (PHI).
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleSaveIntegration}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Integration Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                {/* Theme Selector */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-blue-600" />
                      Theme Selection
                    </CardTitle>
                    <CardDescription>
                      Customize the interface theme
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setTheme('light')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all',
                          theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <Sun className="h-8 w-8 mx-auto mb-3 text-yellow-500" />
                        <p className="font-bold text-gray-900">Light Mode</p>
                        <p className="text-xs text-gray-600 mt-1">Ideal for daytime use</p>
                        {theme === 'light' && (
                          <Badge className="mt-3 bg-blue-100 text-blue-700 border-blue-300">Active</Badge>
                        )}
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all',
                          theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <Moon className="h-8 w-8 mx-auto mb-3 text-indigo-500" />
                        <p className="font-bold text-gray-900">Dark Mode</p>
                        <p className="text-xs text-gray-600 mt-1">Reduces eye strain</p>
                        {theme === 'dark' && (
                          <Badge className="mt-3 bg-blue-100 text-blue-700 border-blue-300">Active</Badge>
                        )}
                      </button>
                      <button
                        onClick={() => setTheme('system')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all',
                          theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <Monitor className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                        <p className="font-bold text-gray-900">System</p>
                        <p className="text-xs text-gray-600 mt-1">Follow OS settings</p>
                        {theme === 'system' && (
                          <Badge className="mt-3 bg-blue-100 text-blue-700 border-blue-300">Active</Badge>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Language Selector */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      Language Preference
                    </CardTitle>
                    <CardDescription>
                      Select interface language
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setLanguage('en')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all flex items-center gap-4',
                          language === 'en' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <div className="text-4xl">🇺🇸</div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-gray-900">English</p>
                          <p className="text-xs text-gray-600 mt-1">Default language</p>
                        </div>
                        {language === 'en' && <Check className="h-6 w-6 text-blue-600" />}
                      </button>
                      <button
                        onClick={() => setLanguage('es')}
                        className={cn(
                          'p-6 rounded-xl border-4 transition-all flex items-center gap-4',
                          language === 'es' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                        )}
                      >
                        <div className="text-4xl">🇪🇸</div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-gray-900">Spanish</p>
                          <p className="text-xs text-gray-600 mt-1">Español</p>
                        </div>
                        {language === 'es' && <Check className="h-6 w-6 text-blue-600" />}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Button
                    onClick={handleSaveAppearance}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your profile visibility and privacy preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">Profile Visibility</label>
                        <div className="space-y-2">
                          <button
                            onClick={() => setPrivacy({ ...privacy, profileVisibility: 'public' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.profileVisibility === 'public'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Public</p>
                                <p className="text-sm text-gray-600 mt-1">All users can view your profile</p>
                              </div>
                              {privacy.profileVisibility === 'public' && <Check className="h-5 w-5 text-blue-600" />}
                            </div>
                          </button>
                          <button
                            onClick={() => setPrivacy({ ...privacy, profileVisibility: 'department' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.profileVisibility === 'department'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Department Only</p>
                                <p className="text-sm text-gray-600 mt-1">Only users in your department can view</p>
                              </div>
                              {privacy.profileVisibility === 'department' && <Check className="h-5 w-5 text-blue-600" />}
                            </div>
                          </button>
                          <button
                            onClick={() => setPrivacy({ ...privacy, profileVisibility: 'private' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.profileVisibility === 'private'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Private</p>
                                <p className="text-sm text-gray-600 mt-1">Your profile remains hidden</p>
                              </div>
                              {privacy.profileVisibility === 'private' && <Check className="h-5 w-5 text-blue-600" />}
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">Contact Information Visibility</label>
                        <div className="space-y-2">
                          <button
                            onClick={() => setPrivacy({ ...privacy, contactInfoVisibility: 'public' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.contactInfoVisibility === 'public'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Public</p>
                                <p className="text-sm text-gray-600 mt-1">Email and phone information visible</p>
                              </div>
                              {privacy.contactInfoVisibility === 'public' && <Check className="h-5 w-5 text-blue-600" />}
                            </div>
                          </button>
                          <button
                            onClick={() => setPrivacy({ ...privacy, contactInfoVisibility: 'department' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.contactInfoVisibility === 'department'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Department Only</p>
                                <p className="text-sm text-gray-600 mt-1">Only department members can view</p>
                              </div>
                              {privacy.contactInfoVisibility === 'department' && <Check className="h-5 w-5 text-blue-600" />}
                            </div>
                          </button>
                          <button
                            onClick={() => setPrivacy({ ...privacy, contactInfoVisibility: 'private' })}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 text-left transition-all',
                              privacy.contactInfoVisibility === 'private'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-gray-900">Private</p>
                                <p className="text-sm text-gray-600 mt-1">Contact information hidden</p>
                              </div>
                              {privacy.contactInfoVisibility === 'private' && <Check className="h-5 w-5 text-blue-600" />}
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900">Activity Status</p>
                            <p className="text-sm text-gray-600 mt-1">Other users can see your online status</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.activityStatus}
                            onChange={(e) => setPrivacy({ ...privacy, activityStatus: e.target.checked })}
                            className="w-6 h-6 text-blue-600"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900">HIPAA Audit Log</p>
                            <p className="text-sm text-gray-600 mt-1">Track all access to your data</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacy.hipaaAuditLog}
                            onChange={(e) => setPrivacy({ ...privacy, hipaaAuditLog: e.target.checked })}
                            className="w-6 h-6 text-blue-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleSavePrivacy}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Privacy Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                {/* Regional Settings */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      Regional Settings
                    </CardTitle>
                    <CardDescription>
                      Time zone, date and number formats
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Time Zone
                        </label>
                        <select
                          value={regional.timezone}
                          onChange={(e) => setRegional({ ...regional, timezone: e.target.value })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                        >
                          <option value="America/New_York">Eastern Time (GMT-5)</option>
                          <option value="America/Chicago">Central Time (GMT-6)</option>
                          <option value="America/Denver">Mountain Time (GMT-7)</option>
                          <option value="America/Los_Angeles">Pacific Time (GMT-8)</option>
                          <option value="America/Anchorage">Alaska Time (GMT-9)</option>
                          <option value="Pacific/Honolulu">Hawaii Time (GMT-10)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date Format
                          </label>
                          <select
                            value={regional.dateFormat}
                            onChange={(e) => setRegional({ ...regional, dateFormat: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                          >
                            <option value="MM/DD/YYYY">MM/DD/YYYY (US Standard)</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Time Format
                          </label>
                          <select
                            value={regional.timeFormat}
                            onChange={(e) => setRegional({ ...regional, timeFormat: e.target.value as '24h' | '12h' })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                          >
                            <option value="12h">12 Hour (2:30 PM)</option>
                            <option value="24h">24 Hour (14:30)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          Number Format
                        </label>
                        <select
                          value={regional.numberFormat}
                          onChange={(e) => setRegional({ ...regional, numberFormat: e.target.value as 'en' | 'es' })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl font-semibold"
                        >
                          <option value="en">US Format (1,234.56)</option>
                          <option value="es">International (1.234,56)</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Keyboard Shortcuts */}
                <Card className="border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Keyboard className="h-5 w-5 text-blue-600" />
                      Keyboard Shortcuts
                    </CardTitle>
                    <CardDescription>
                      Customize keyboard shortcuts for quick access
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <span className="font-semibold text-gray-900">{shortcut.action}</span>
                          <div className="flex items-center gap-3">
                            <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm font-bold">
                              {shortcut.current}
                            </kbd>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2"
                            >
                              Change
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Button
                    onClick={handleSaveAdvanced}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Advanced Settings
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* HIPAA Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">HIPAA Compliance - User Settings</h3>
              <p className="text-sm text-purple-800">
                Your profile information is protected under HIPAA (Health Insurance Portability and Accountability Act). You can update, view, or delete your data at any time. For more information about our privacy policies, please visit our HIPAA compliance page. All access to Protected Health Information (PHI) is logged and audited according to federal regulations.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>

  </DashboardLayout>
  )
}

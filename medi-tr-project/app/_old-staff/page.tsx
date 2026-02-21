'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  UserCheck,
  Search,
  Filter,
  Download,
  Plus,
  Users,
  Calendar,
  Award,
  AlertTriangle,
  TrendingUp,
  Clock,
  Heart,
  Mail,
  Phone,
  Badge as BadgeIcon,
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import {
  generateStaffMembers,
  calculateStaffStats,
  type StaffMember,
} from '@/lib/data/staff-data'
import { cn } from '@/lib/utils'

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isClient, setIsClient] = useState(false)

  const [staff] = useState<StaffMember[]>(() => generateStaffMembers(150))

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const matchesSearch =
        searchQuery === '' ||
        member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = roleFilter === 'all' || member.role === roleFilter
      const matchesDepartment =
        departmentFilter === 'all' || member.department === departmentFilter
      const matchesStatus =
        statusFilter === 'all' || member.employmentStatus === statusFilter

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus
    })
  }, [staff, searchQuery, roleFilter, departmentFilter, statusFilter])

  const stats = useMemo(() => calculateStaffStats(staff), [staff])

  const formatDate = (date: Date) => {
    if (!isClient) {
      return date.toISOString().split('T')[0]
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  const getCredentialStatus = (member: StaffMember) => {
    const now = new Date()
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)

    const hasExpired = member.credentials.some((cred) => cred.expirationDate < now)
    const expiringSoon = member.credentials.some(
      (cred) => cred.expirationDate > now && cred.expirationDate <= threeMonthsFromNow
    )

    if (hasExpired) return { text: 'Expired', variant: 'destructive' as const }
    if (expiringSoon) return { text: 'Expiring Soon', variant: 'warning' as const }
    return { text: 'Valid', variant: 'success' as const }
  }

  if (!isClient) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
              <Heart className="h-6 w-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="mt-6 text-base font-medium text-gray-700">
              Loading staff directory...
            </p>
            <p className="text-sm text-gray-500 mt-2">Please wait</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Premium Header */}
        <div className="bg-white border-b border-gray-200/80 shadow-sm">
          <div className="px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <UserCheck className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Staff & Human Resources
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">
                      Employee Management, Credentialing & Scheduling
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900">
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 font-semibold">
                  <Plus className="h-5 w-5" />
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="h-6 w-6" />
                </div>
                <TrendingUp className="h-5 w-5 text-blue-200" />
              </div>
              <p className="text-sm font-medium text-blue-100 mb-1">Total Staff</p>
              <p className="text-4xl font-bold tracking-tight">{stats.totalStaff}</p>
              <p className="text-xs text-blue-200 mt-2">All employees</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold">
                  {Math.round((stats.activeStaff / stats.totalStaff) * 100)}%
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Active Staff</p>
              <p className="text-4xl font-bold text-gray-900">{stats.activeStaff}</p>
              <p className="text-xs text-gray-500 mt-2">Currently working</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">
                Avg Experience
              </p>
              <p className="text-4xl font-bold text-gray-900">
                {stats.avgYearsExperience}
              </p>
              <p className="text-xs text-gray-500 mt-2">Years of service</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                {stats.credentialsExpiringSoon > 0 && (
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-semibold">
                    Action Required
                  </Badge>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">
                Credentials Expiring
              </p>
              <p className="text-4xl font-bold text-gray-900">
                {stats.credentialsExpiringSoon}
              </p>
              <p className="text-xs text-gray-500 mt-2">Within 3 months</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, employee ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all min-w-[160px]"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all min-w-[180px]"
              >
                <option value="all">All Departments</option>
                <option value="Emergency Medicine">Emergency</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Surgery">Surgery</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Nursing">Nursing</option>
              </select>

              <button className="px-5 py-3 border-2 border-gray-200 bg-white rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center gap-2 font-semibold text-gray-700">
                <Filter className="h-4 w-4" />
                More
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-600">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              Showing {filteredStaff.length} staff members
              {searchQuery && (
                <span className="text-blue-600"> matching "{searchQuery}"</span>
              )}
            </div>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => {
              const credStatus = getCredentialStatus(member)

              return (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl hover:border-blue-200 transition-all group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-all">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">
                          {member.firstName} {member.lastName}
                        </h3>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">
                          {member.employeeId}
                        </code>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        'font-semibold text-xs',
                        member.employmentStatus === 'Active' &&
                          'bg-green-100 text-green-700 border-green-200',
                        member.employmentStatus === 'On Leave' &&
                          'bg-yellow-100 text-yellow-700 border-yellow-200',
                        member.employmentStatus === 'Inactive' &&
                          'bg-gray-100 text-gray-700 border-gray-200'
                      )}
                    >
                      {member.employmentStatus}
                    </Badge>
                  </div>

                  {/* Role & Department */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <BadgeIcon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">
                        {member.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {member.department}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {member.employmentType} • {member.weeklyHours}h/week
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                  </div>

                  {/* Experience & Credentials */}
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">
                        Experience
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {member.yearsOfExperience} years
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">
                        Credentials
                      </span>
                      <Badge
                        variant={credStatus.variant}
                        className="text-xs font-semibold"
                      >
                        {credStatus.text}
                      </Badge>
                    </div>
                    {member.npi && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-600">
                          NPI
                        </span>
                        <code className="text-xs font-mono font-medium text-gray-700">
                          {member.npi}
                        </code>
                      </div>
                    )}
                  </div>

                  {/* Hire Date */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        Hired: {formatDate(member.hireDate)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

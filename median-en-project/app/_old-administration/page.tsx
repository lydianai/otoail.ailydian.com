'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Building2, Users, Settings, Database, Shield, Activity, Server, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AdministrationPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="bg-white border-b border-gray-200/80 shadow-sm">
          <div className="px-8 py-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-lg shadow-gray-500/30">
                <Building2 className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  System Administration
                </h1>
                <p className="text-base text-gray-600 mt-1 font-medium">
                  System Configuration & Management
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Users</p>
              <p className="text-4xl font-bold text-gray-900">247</p>
              <p className="text-xs text-gray-500 mt-2">System accounts</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Server className="h-6 w-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Online
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">System Status</p>
              <p className="text-4xl font-bold text-gray-900">99.9%</p>
              <p className="text-xs text-gray-500 mt-2">Uptime</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Database Size</p>
              <p className="text-4xl font-bold text-gray-900">2.4TB</p>
              <p className="text-xs text-gray-500 mt-2">Active records</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Secured
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Security Status</p>
              <p className="text-4xl font-bold text-gray-900">A+</p>
              <p className="text-xs text-gray-500 mt-2">HIPAA compliant</p>
            </div>
          </div>

          {/* Administration Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">System Modules</h3>
              <div className="space-y-3">
                {[
                  { name: 'Electronic Health Records (EHR)', status: 'Active', users: 178 },
                  { name: 'Revenue Cycle Management', status: 'Active', users: 42 },
                  { name: 'Laboratory Information System', status: 'Active', users: 28 },
                  { name: 'Radiology PACS', status: 'Active', users: 15 },
                  { name: 'Pharmacy Management', status: 'Active', users: 12 },
                ].map((module, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900">{module.name}</p>
                      <p className="text-xs text-gray-500">{module.users} active users</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {module.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'User account created', user: 'Dr. Sarah Johnson', time: '5 min ago' },
                  { action: 'System backup completed', user: 'System', time: '1 hour ago' },
                  { action: 'Security patch applied', user: 'Admin', time: '3 hours ago' },
                  { action: 'Database optimization', user: 'System', time: '6 hours ago' },
                  { action: 'Password reset request', user: 'RN-47', time: '8 hours ago' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

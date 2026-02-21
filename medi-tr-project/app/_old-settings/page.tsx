'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Settings, User, Bell, Lock, Globe, Palette, Monitor } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="bg-white border-b border-gray-200/80 shadow-sm">
          <div className="px-8 py-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl shadow-lg shadow-gray-500/30">
                <Settings className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  Settings
                </h1>
                <p className="text-base text-gray-600 mt-1 font-medium">
                  User Preferences & System Configuration
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Profile Settings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" defaultValue="Dr. Smith" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" defaultValue="dr.smith@lydianmedi.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <input type="text" defaultValue="Physician" disabled className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Bell className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', description: 'Receive email updates', enabled: true },
                  { label: 'Patient Alerts', description: 'Critical patient status changes', enabled: true },
                  { label: 'Lab Results', description: 'New laboratory results available', enabled: true },
                  { label: 'System Updates', description: 'System maintenance notifications', enabled: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <Badge className={item.enabled ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}>
                      {item.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Display Settings */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <Monitor className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Display Preferences</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Theme</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                    <option>Light Mode</option>
                    <option>Dark Mode</option>
                    <option>Auto (System)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                    <option>English</option>
                    <option>Turkish</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-xl">
                  <Lock className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Security Settings</h3>
              </div>
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-left">
                  Change Password
                </button>
                <button className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all font-semibold text-left">
                  Enable Two-Factor Authentication
                </button>
                <button className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all font-semibold text-left">
                  View Login History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

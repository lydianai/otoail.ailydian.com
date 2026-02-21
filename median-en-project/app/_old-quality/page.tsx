'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Shield, CheckCircle, AlertTriangle, FileText, TrendingUp, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function QualityPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="bg-white border-b border-gray-200/80 shadow-sm">
          <div className="px-8 py-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30">
                <Shield className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  Quality & Compliance
                </h1>
                <p className="text-base text-gray-600 mt-1 font-medium">
                  Core Measures, Patient Safety & Regulatory Reporting
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Quality Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Excellent
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">HCAHPS Score</p>
              <p className="text-4xl font-bold text-gray-900">87%</p>
              <p className="text-xs text-gray-500 mt-2">Above national avg</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  2.1%
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">30-Day Readmission</p>
              <p className="text-4xl font-bold text-gray-900">12.4%</p>
              <p className="text-xs text-gray-500 mt-2">Below CMS benchmark</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  On Track
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Quality Measures</p>
              <p className="text-4xl font-bold text-gray-900">23/25</p>
              <p className="text-xs text-gray-500 mt-2">Meeting benchmarks</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Low
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Safety Events</p>
              <p className="text-4xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>
          </div>

          {/* Core Measures & Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Core Quality Measures</h3>
              <div className="space-y-4">
                {[
                  { measure: 'Heart Attack Care', score: 98, target: 95, status: 'excellent' },
                  { measure: 'Pneumonia Care', score: 94, target: 90, status: 'excellent' },
                  { measure: 'Surgical Care', score: 97, target: 95, status: 'excellent' },
                  { measure: 'Sepsis Bundle Compliance', score: 88, target: 90, status: 'warning' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{item.measure}</p>
                      <Badge
                        className={
                          item.status === 'excellent'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }
                      >
                        {item.score}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === 'excellent' ? 'bg-green-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Target: {item.target}%</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regulatory Compliance</h3>
              <div className="space-y-4">
                {[
                  { item: 'HIPAA Compliance', status: 'Compliant', date: '2025-01-15' },
                  { item: 'Joint Commission Accreditation', status: 'Accredited', date: '2024-06-20' },
                  { item: 'CMS Quality Reporting', status: 'Current', date: '2025-01-10' },
                  { item: 'State Licensing', status: 'Active', date: '2024-12-01' },
                  { item: 'DEA Registration', status: 'Valid', date: '2024-11-15' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">{item.item}</p>
                      <p className="text-xs text-gray-500">Last verified: {item.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {item.status}
                    </Badge>
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

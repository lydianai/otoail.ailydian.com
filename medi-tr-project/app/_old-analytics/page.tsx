'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { BarChart3, TrendingUp, TrendingDown, Activity, Users, DollarSign, AlertCircle, Heart, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="bg-white border-b border-gray-200/80 shadow-sm">
          <div className="px-8 py-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30">
                <BarChart3 className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  Analytics & Reporting
                </h1>
                <p className="text-base text-gray-600 mt-1 font-medium">
                  Business Intelligence & Data Insights
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Key Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12.5%
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Patient Volume</p>
              <p className="text-4xl font-bold text-gray-900">2,847</p>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  8.3%
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Revenue</p>
              <p className="text-4xl font-bold text-gray-900">$3.2M</p>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  92%
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Bed Occupancy</p>
              <p className="text-4xl font-bold text-gray-900">156</p>
              <p className="text-xs text-gray-500 mt-2">Of 170 beds</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Heart className="h-6 w-6 text-yellow-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Excellent
                </Badge>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Patient Satisfaction</p>
              <p className="text-4xl font-bold text-gray-900">4.7</p>
              <p className="text-xs text-gray-500 mt-2">Out of 5.0</p>
            </div>
          </div>

          {/* Analytics Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Department Performance</h3>
              <div className="space-y-4">
                {[
                  { dept: 'Emergency Department', visits: 1247, change: 15.3 },
                  { dept: 'Surgical Services', visits: 428, change: 8.7 },
                  { dept: 'Inpatient Care', visits: 892, change: -3.2 },
                  { dept: 'Outpatient Clinics', visits: 280, change: 22.1 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">{item.dept}</p>
                      <p className="text-sm text-gray-500">{item.visits} visits</p>
                    </div>
                    <Badge
                      className={
                        item.change > 0
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-red-100 text-red-700 border-red-200'
                      }
                    >
                      {item.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {Math.abs(item.change)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Financial Summary</h3>
              <div className="space-y-4">
                {[
                  { label: 'Gross Revenue', amount: '$3,245,890', status: 'positive' },
                  { label: 'Net Collections', amount: '$2,876,450', status: 'positive' },
                  { label: 'Operating Expenses', amount: '$1,982,330', status: 'neutral' },
                  { label: 'Net Operating Income', amount: '$894,120', status: 'positive' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-lg font-bold text-gray-900">{item.amount}</p>
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

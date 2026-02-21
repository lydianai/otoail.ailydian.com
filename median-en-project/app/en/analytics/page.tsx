'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

import { useState } from 'react'
import {
  BarChart3,
  Download,
  FileText,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Bed,
  Clock,
  DollarSign,
  Star,
  Activity,
  Mail,
  Grid3x3,
  ChevronDown,
  FileSpreadsheet,
  Plus,
  Settings,
  Heart,
  AlertTriangle,
  CheckCircle,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

export default function AnalyticsPage() {
  const [selectedReport, setSelectedReport] = useState('patient-satisfaction')
  const [dateRange, setDateRange] = useState('this-month')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedPatientType, setSelectedPatientType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([
    'admissions',
    'hcahps',
    'readmissions',
    'los',
    'revenue',
    'payer-mix'
  ])
  const [scheduledReports, setScheduledReports] = useState({
    enabled: false,
    frequency: 'weekly',
    emails: ''
  })

  // Pre-built report templates - US Healthcare Focus
  const reportTemplates = [
    { id: 'patient-satisfaction', name: 'HCAHPS Scores', icon: Star, category: 'Quality' },
    { id: 'quality-metrics', name: 'CMS Quality Measures', icon: Award, category: 'Quality' },
    { id: 'readmission-rates', name: 'Readmission Analytics', icon: AlertTriangle, category: 'Quality' },
    { id: 'revenue-cycle', name: 'Revenue Cycle Metrics', icon: DollarSign, category: 'Financial' },
    { id: 'payer-mix', name: 'Payer Mix Analysis', icon: DollarSign, category: 'Financial' },
    { id: 'length-of-stay', name: 'Length of Stay (LOS)', icon: Clock, category: 'Operational' },
    { id: 'bed-utilization', name: 'Bed Utilization', icon: Bed, category: 'Operational' },
    { id: 'er-metrics', name: 'ED Performance', icon: Activity, category: 'Emergency' },
    { id: 'core-measures', name: 'Joint Commission Core Measures', icon: CheckCircle, category: 'Quality' },
    { id: 'patient-flow', name: 'Patient Flow Analytics', icon: Users, category: 'Operational' },
    { id: 'mortality-rates', name: 'Mortality & Morbidity', icon: Heart, category: 'Clinical' },
    { id: 'surgical-outcomes', name: 'Surgical Outcomes', icon: Activity, category: 'Clinical' },
    { id: 'infection-control', name: 'HAI Surveillance', icon: Activity, category: 'Quality' },
    { id: 'icu-performance', name: 'ICU Metrics', icon: Activity, category: 'Clinical' },
    { id: 'dnfb-analysis', name: 'DNFB Analysis', icon: DollarSign, category: 'Financial' },
    { id: 'physician-productivity', name: 'Physician Productivity', icon: Users, category: 'Provider' },
    { id: 'press-ganey', name: 'Press Ganey Scores', icon: Star, category: 'Quality' },
    { id: 'case-mix-index', name: 'Case Mix Index (CMI)', icon: FileText, category: 'Clinical' },
    { id: 'denials-management', name: 'Denials & Appeals', icon: TrendingDown, category: 'Financial' },
    { id: 'hedis-measures', name: 'HEDIS Metrics', icon: CheckCircle, category: 'Quality' },
    { id: 'patient-demographics', name: 'Patient Demographics', icon: Users, category: 'Population' },
    { id: 'charge-capture', name: 'Charge Capture Analysis', icon: DollarSign, category: 'Financial' },
    { id: 'staffing-ratios', name: 'Nurse Staffing Ratios', icon: Users, category: 'Workforce' },
    { id: 'patient-safety', name: 'Patient Safety Indicators', icon: AlertTriangle, category: 'Quality' }
  ]

  // US Healthcare data - Monthly admissions
  const patientAdmissionsData = [
    { month: 'Jan', outpatient: 3240, inpatient: 680, ed: 520 },
    { month: 'Feb', outpatient: 2950, inpatient: 710, ed: 490 },
    { month: 'Mar', outpatient: 3520, inpatient: 740, ed: 550 },
    { month: 'Apr', outpatient: 3380, inpatient: 690, ed: 510 },
    { month: 'May', outpatient: 3750, inpatient: 770, ed: 580 },
    { month: 'Jun', outpatient: 3580, inpatient: 720, ed: 540 },
    { month: 'Jul', outpatient: 3290, inpatient: 680, ed: 500 },
    { month: 'Aug', outpatient: 3120, inpatient: 650, ed: 480 },
    { month: 'Sep', outpatient: 3640, inpatient: 760, ed: 570 },
    { month: 'Oct', outpatient: 3820, inpatient: 790, ed: 590 },
    { month: 'Nov', outpatient: 3580, inpatient: 740, ed: 550 },
    { month: 'Dec', outpatient: 3490, inpatient: 720, ed: 530 }
  ]

  // Department revenue - US healthcare specialties
  const departmentRevenueData = [
    { name: 'Cardiology', value: 2850000, percentage: 24 },
    { name: 'Orthopedics', value: 2180000, percentage: 18 },
    { name: 'Neurology', value: 1650000, percentage: 14 },
    { name: 'General Surgery', value: 1420000, percentage: 12 },
    { name: 'Emergency Dept', value: 1180000, percentage: 10 },
    { name: 'Internal Medicine', value: 950000, percentage: 8 },
    { name: 'Oncology', value: 850000, percentage: 7 },
    { name: 'Other Specialties', value: 820000, percentage: 7 }
  ]

  // Common diagnoses - US ICD-10 codes
  const topDiagnosesData = [
    { diagnosis: 'Hypertension (I10)', count: 1580 },
    { diagnosis: 'Type 2 Diabetes (E11)', count: 1240 },
    { diagnosis: 'Coronary Artery Disease (I25)', count: 980 },
    { diagnosis: 'Heart Failure (I50)', count: 820 },
    { diagnosis: 'COPD (J44)', count: 750 },
    { diagnosis: 'Pneumonia (J18)', count: 680 },
    { diagnosis: 'Chronic Kidney Disease (N18)', count: 620 },
    { diagnosis: 'Depression (F33)', count: 580 },
    { diagnosis: 'Osteoarthritis (M19)', count: 540 },
    { diagnosis: 'Sepsis (A41)', count: 490 }
  ]

  // Bed occupancy by unit
  const bedOccupancyData = [
    { week: 'Week 1', medical: 85, surgical: 78, icu: 92, ed: 72 },
    { week: 'Week 2', medical: 82, surgical: 83, icu: 88, ed: 75 },
    { week: 'Week 3', medical: 88, surgical: 80, icu: 95, ed: 78 },
    { week: 'Week 4', medical: 84, surgical: 86, icu: 90, ed: 74 }
  ]

  // Age distribution
  const ageDistributionData = [
    { age: '0-17', male: 280, female: 260 },
    { age: '18-34', male: 520, female: 580 },
    { age: '35-49', male: 680, female: 740 },
    { age: '50-64', male: 920, female: 980 },
    { age: '65-79', male: 1120, female: 1180 },
    { age: '80+', male: 680, female: 820 }
  ]

  // Gender distribution
  const genderDistributionData = [
    { name: 'Male', value: 4200, percentage: 46 },
    { name: 'Female', value: 4560, percentage: 50 },
    { name: 'Other/Unknown', value: 340, percentage: 4 }
  ]

  // Revenue trend with operating margin
  const revenueTrendData = [
    { month: 'Jan', revenue: 11500000, expenses: 9200000, margin: 2300000 },
    { month: 'Feb', revenue: 10800000, expenses: 8900000, margin: 1900000 },
    { month: 'Mar', revenue: 12400000, expenses: 9800000, margin: 2600000 },
    { month: 'Apr', revenue: 11900000, expenses: 9500000, margin: 2400000 },
    { month: 'May', revenue: 13200000, expenses: 10200000, margin: 3000000 },
    { month: 'Jun', revenue: 12600000, expenses: 9900000, margin: 2700000 }
  ]

  // Payer mix - US insurance types
  const payerMixData = [
    { name: 'Medicare', value: 3240, percentage: 36 },
    { name: 'Medicaid', value: 1980, percentage: 22 },
    { name: 'Commercial Insurance', value: 2520, percentage: 28 },
    { name: 'Self-Pay', value: 720, percentage: 8 },
    { name: 'Other', value: 540, percentage: 6 }
  ]

  // HCAHPS Scores (Hospital Consumer Assessment)
  const hcahpsData = [
    { category: 'Nurse Communication', score: 82, target: 85 },
    { category: 'Doctor Communication', score: 85, target: 85 },
    { category: 'Staff Responsiveness', score: 78, target: 80 },
    { category: 'Pain Management', score: 80, target: 82 },
    { category: 'Medication Communication', score: 83, target: 85 },
    { category: 'Discharge Information', score: 81, target: 83 },
    { category: 'Care Transition', score: 79, target: 80 },
    { category: 'Hospital Cleanliness', score: 86, target: 85 },
    { category: 'Hospital Quietness', score: 74, target: 78 }
  ]

  // Readmission rates by condition
  const readmissionData = [
    { condition: 'Heart Failure', rate: 18.5, benchmark: 21.9 },
    { condition: 'Pneumonia', rate: 15.2, benchmark: 17.8 },
    { condition: 'COPD', rate: 17.8, benchmark: 20.1 },
    { condition: 'Hip/Knee Replacement', rate: 4.2, benchmark: 5.3 },
    { condition: 'AMI', rate: 14.6, benchmark: 16.8 }
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

  // Key metrics - US Healthcare KPIs
  const keyMetrics = [
    {
      title: 'Total Encounters',
      value: '9,000',
      previousValue: '8,240',
      change: 9.2,
      icon: Users,
      color: 'blue',
      subtitle: 'This month'
    },
    {
      title: 'Bed Occupancy Rate',
      value: '84.2%',
      previousValue: '81.5%',
      change: 3.3,
      icon: Bed,
      color: 'purple',
      subtitle: 'Average'
    },
    {
      title: 'Average Length of Stay',
      value: '4.8 days',
      previousValue: '5.3 days',
      change: -9.4,
      icon: Clock,
      color: 'green',
      subtitle: 'Inpatient ALOS'
    },
    {
      title: 'Net Patient Revenue',
      value: '$12.6M',
      previousValue: '$11.9M',
      change: 5.9,
      icon: DollarSign,
      color: 'emerald',
      subtitle: 'This month'
    },
    {
      title: 'HCAHPS Overall Rating',
      value: '8.6/10',
      previousValue: '8.3/10',
      change: 3.6,
      icon: Star,
      color: 'amber',
      subtitle: 'Top-box score'
    }
  ]

  // Comprehensive US Healthcare KPIs
  const additionalKPIs = [
    { label: 'Total Surgical Cases', value: '428', trend: '+6%' },
    { label: 'ED Visits', value: '530', trend: '+4%' },
    { label: 'ED Left Without Being Seen', value: '2.8%', trend: '-1%' },
    { label: 'ED Average Wait Time', value: '22 min', trend: '-12%' },
    { label: 'ED Door-to-Provider Time', value: '18 min', trend: '-8%' },
    { label: 'Lab Turnaround Time', value: '42 min', trend: '-5%' },
    { label: 'Imaging Studies', value: '3,240', trend: '+8%' },
    { label: 'MRI Volume', value: '285', trend: '+11%' },
    { label: 'CT Scan Volume', value: '445', trend: '+9%' },
    { label: 'Medicare Revenue', value: '$4.5M', trend: '+4%' },
    { label: 'Medicaid Revenue', value: '$2.8M', trend: '+7%' },
    { label: 'Commercial Revenue', value: '$4.2M', trend: '+8%' },
    { label: 'Net Collection Rate', value: '94.8%', trend: '+2%' },
    { label: 'Days in A/R', value: '42 days', trend: '-5%' },
    { label: 'Denial Rate', value: '6.2%', trend: '-1%' },
    { label: 'Case Mix Index (CMI)', value: '1.42', trend: '+3%' },
    { label: 'Operating Margin', value: '21.4%', trend: '+2%' },
    { label: 'Revenue per Adjusted Discharge', value: '$12,450', trend: '+5%' },
    { label: 'Cost per Adjusted Discharge', value: '$9,780', trend: '+1%' },
    { label: '30-Day Readmission Rate', value: '14.2%', trend: '-2%' },
    { label: 'Hospital-Acquired Infections', value: '0.8/1000', trend: '-15%' },
    { label: 'Central Line Infections', value: '0.4/1000', trend: '-20%' },
    { label: 'Catheter-Associated UTI', value: '0.6/1000', trend: '-12%' },
    { label: 'C. diff Infection Rate', value: '0.5/1000', trend: '-18%' },
    { label: 'Surgical Site Infections', value: '1.2%', trend: '-8%' },
    { label: 'Mortality Rate (O/E)', value: '0.92', trend: '-5%' },
    { label: 'Patient Falls with Injury', value: '0.12/1000', trend: '-25%' },
    { label: 'Pressure Ulcer Rate', value: '0.8%', trend: '-10%' },
    { label: 'Medication Error Rate', value: '0.3%', trend: '-15%' },
    { label: 'Hand Hygiene Compliance', value: '96.2%', trend: '+4%' },
    { label: 'OR Utilization Rate', value: '78.5%', trend: '+6%' },
    { label: 'OR On-Time Starts', value: '84.2%', trend: '+8%' },
    { label: 'OR Turnover Time', value: '32 min', trend: '-6%' },
    { label: 'Active Physicians', value: '142', trend: '+4%' },
    { label: 'RN FTEs', value: '324', trend: '+3%' },
    { label: 'Nurse-to-Patient Ratio (Med/Surg)', value: '1:5.2', trend: 'Target' },
    { label: 'Nurse-to-Patient Ratio (ICU)', value: '1:2.1', trend: 'Target' },
    { label: 'RN Turnover Rate', value: '11.8%', trend: '-4%' },
    { label: 'RN Vacancy Rate', value: '8.2%', trend: '-2%' },
    { label: 'Employee Engagement Score', value: '4.3/5', trend: '+5%' },
    { label: 'Core Measures Compliance', value: '97.4%', trend: '+2%' },
    { label: 'Sepsis Bundle Compliance', value: '94.8%', trend: '+8%' },
    { label: 'VTE Prophylaxis', value: '98.2%', trend: '+1%' },
    { label: 'Stroke Care Measures', value: '96.5%', trend: '+3%' },
    { label: 'AMI Core Measures', value: '97.8%', trend: '+2%' },
    { label: 'Heart Failure Measures', value: '95.2%', trend: '+4%' },
    { label: 'Pneumonia Measures', value: '96.8%', trend: '+3%' },
    { label: 'Surgical Care Improvement', value: '98.5%', trend: '+2%' },
    { label: 'Same-Day Cancellations', value: '1.8%', trend: '-6%' },
    { label: 'Discharge Before Noon', value: '38.2%', trend: '+12%' }
  ]

  const departments = [
    'All',
    'Cardiology',
    'Emergency Department',
    'Internal Medicine',
    'Neurology',
    'Oncology',
    'Orthopedics',
    'Pediatrics',
    'Surgery',
    'Women\'s Health'
  ]

  const patientTypes = ['All', 'Outpatient', 'Inpatient', 'Emergency', 'Observation']

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Date Range' }
  ]

  const widgetOptions = [
    { id: 'admissions', label: 'Patient Admissions Trend' },
    { id: 'hcahps', label: 'HCAHPS Scores' },
    { id: 'readmissions', label: '30-Day Readmission Rates' },
    { id: 'los', label: 'Length of Stay Analysis' },
    { id: 'revenue', label: 'Department Revenue Mix' },
    { id: 'payer-mix', label: 'Payer Mix Distribution' },
    { id: 'diagnoses', label: 'Top 10 Diagnoses' },
    { id: 'occupancy', label: 'Bed Occupancy by Unit' },
    { id: 'age', label: 'Age Distribution' },
    { id: 'gender', label: 'Gender Distribution' },
    { id: 'revenue-trend', label: 'Revenue & Margin Trend' },
    { id: 'quality', label: 'Quality Metrics Dashboard' }
  ]

  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev =>
      prev.includes(widgetId)
      ? prev.filter(id => id !== widgetId)
      : [...prev, widgetId]
    )
  }

  const exportToPDF = () => {
    alert('Generating PDF report...')
  }

  const exportToExcel = () => {
    alert('Generating Excel report...')
  }

  const exportToCSV = () => {
    alert('Generating CSV file...')
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
                  <BarChart3 className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Analytics & Reporting
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    Comprehensive Healthcare Performance Analytics
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-2"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button onClick={exportToPDF} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Date Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    {dateRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept.toLowerCase()}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Patient Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Patient Type
                  </label>
                  <select
                    value={selectedPatientType}
                    onChange={(e) => setSelectedPatientType(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    {patientTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Provider Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Provider
                  </label>
                  <Input
                    placeholder="Search providers..."
                    className="border-2 border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Key Metrics Cards with Trend Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon
            const isPositive = metric.change > 0
            const isNegative = metric.change < 0
            const trendColor = metric.title === 'Average Length of Stay'
              ? (isNegative ? 'text-green-600' : 'text-red-600')
              : (isPositive ? 'text-green-600' : 'text-red-600')

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-sm border-2 border-${metric.color}-100 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 bg-${metric.color}-100 rounded-xl`}>
                    <Icon className={`h-5 w-5 text-${metric.color}-600`} />
                  </div>
                  <div className={`flex items-center gap-1 ${trendColor}`}>
                    {(metric.title === 'Average Length of Stay' ? isNegative : isPositive) ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-bold">
                      {Math.abs(metric.change).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  {metric.title}
                </p>
                <p className={`text-3xl font-bold text-${metric.color}-700 mb-1`}>
                  {metric.value}
                </p>
                <p className="text-xs text-gray-500">
                  {metric.subtitle} • Previous: {metric.previousValue}
                </p>
              </div>
            )
          })}
        </div>

        {/* Report Templates */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Standard Report Templates
            </h2>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              {reportTemplates.length} Reports
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {reportTemplates.map((template) => {
              const Icon = template.icon
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedReport(template.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedReport === template.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-2 ${
                    selectedReport === template.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <p className={`text-sm font-semibold ${
                    selectedReport === template.id ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {template.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{template.category}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dashboard Builder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Grid3x3 className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Dashboard Widget Selector
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {widgetOptions.map((widget) => (
              <label
                key={widget.id}
                className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={selectedWidgets.includes(widget.id)}
                  onChange={() => toggleWidget(widget.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {widget.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Patient Admissions Trend */}
          {selectedWidgets.includes('admissions') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Patient Admissions Trend
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientAdmissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="outpatient"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Outpatient"
                    dot={{ fill: '#3b82f6' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inpatient"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Inpatient"
                    dot={{ fill: '#10b981' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ed"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Emergency"
                    dot={{ fill: '#ef4444' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* HCAHPS Scores */}
          {selectedWidgets.includes('hcahps') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    HCAHPS Patient Satisfaction Scores
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">CMS Hospital Consumer Assessment</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hcahpsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[0, 100]} stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis
                    type="category"
                    dataKey="category"
                    stroke="#666"
                    width={140}
                    style={{ fontSize: '11px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="score" fill="#10b981" name="Current Score" radius={[0, 8, 8, 0]} />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* 30-Day Readmission Rates */}
          {selectedWidgets.includes('readmissions') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    30-Day Readmission Rates
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">CMS Quality Measure vs National Benchmark</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={readmissionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="condition" stroke="#666" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="rate" fill="#3b82f6" name="Hospital Rate" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="benchmark" fill="#f59e0b" name="National Benchmark" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Length of Stay Analysis */}
          {selectedWidgets.includes('los') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Average Length of Stay (ALOS)
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">By service line - Lower is better</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { service: 'Medical/Surgical', current: 4.8, target: 5.2, color: 'green' },
                  { service: 'Cardiology', current: 3.9, target: 4.5, color: 'green' },
                  { service: 'Orthopedics', current: 3.2, target: 3.8, color: 'green' },
                  { service: 'Neurology', current: 5.4, target: 5.0, color: 'amber' },
                  { service: 'ICU', current: 6.8, target: 7.2, color: 'green' },
                  { service: 'Oncology', current: 5.1, target: 5.5, color: 'green' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">{item.service}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Current: <strong>{item.current} days</strong></span>
                        <span className="text-sm text-gray-500">Target: {item.target} days</span>
                        {item.current <= item.target && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${item.color}-500 rounded-full transition-all`}
                        style={{ width: `${(item.current / item.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Department Revenue Breakdown */}
          {selectedWidgets.includes('revenue') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Department Revenue Mix
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentRevenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Payer Mix Distribution */}
          {selectedWidgets.includes('payer-mix') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Payer Mix Distribution
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Insurance coverage breakdown</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={payerMixData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {payerMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top 10 Diagnoses */}
          {selectedWidgets.includes('diagnoses') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Top 10 Diagnoses (ICD-10)
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topDiagnosesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis
                    type="category"
                    dataKey="diagnosis"
                    stroke="#666"
                    width={160}
                    style={{ fontSize: '11px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" name="Patient Count" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Bed Occupancy Rate */}
          {selectedWidgets.includes('occupancy') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Bed Occupancy by Unit (%)
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={bedOccupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="medical"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    name="Medical"
                  />
                  <Area
                    type="monotone"
                    dataKey="surgical"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    name="Surgical"
                  />
                  <Area
                    type="monotone"
                    dataKey="icu"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    name="ICU"
                  />
                  <Area
                    type="monotone"
                    dataKey="ed"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    name="Emergency"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Age Distribution */}
          {selectedWidgets.includes('age') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Patient Age Distribution
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="age" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="male" fill="#3b82f6" name="Male" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="female" fill="#ec4899" name="Female" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Gender Distribution */}
          {selectedWidgets.includes('gender') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Gender Distribution
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#ec4899" />
                    <Cell fill="#94a3b8" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Revenue Trend */}
          {selectedWidgets.includes('revenue-trend') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Revenue & Operating Margin Trend
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Financial performance overview</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToCSV}>
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={exportToExcel}>
                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Revenue"
                    dot={{ fill: '#10b981' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Expenses"
                    dot={{ fill: '#ef4444' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="margin"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Operating Margin"
                    dot={{ fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Quality Metrics Dashboard */}
          {selectedWidgets.includes('quality') && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    CMS Quality Metrics Dashboard
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Core Measures & Patient Safety Indicators</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportToPDF}>
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { metric: 'Sepsis Bundle Compliance', value: '94.8%', target: '90%', status: 'good' },
                  { metric: 'VTE Prophylaxis', value: '98.2%', target: '95%', status: 'good' },
                  { metric: 'AMI Core Measures', value: '97.8%', target: '95%', status: 'good' },
                  { metric: 'Heart Failure Measures', value: '95.2%', target: '93%', status: 'good' },
                  { metric: 'Central Line Infections', value: '0.4/1000', target: '<1.0', status: 'good' },
                  { metric: 'CAUTI Rate', value: '0.6/1000', target: '<1.2', status: 'good' },
                  { metric: 'C. diff Infections', value: '0.5/1000', target: '<0.8', status: 'good' },
                  { metric: 'Surgical Site Infections', value: '1.2%', target: '<2.0%', status: 'good' },
                  { metric: 'Hand Hygiene Compliance', value: '96.2%', target: '>95%', status: 'good' },
                  { metric: 'Mortality O/E Ratio', value: '0.92', target: '<1.0', status: 'good' },
                  { metric: 'Patient Falls with Injury', value: '0.12/1000', target: '<0.3', status: 'good' },
                  { metric: 'Pressure Ulcer Rate', value: '0.8%', target: '<1.5%', status: 'good' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-600">
                        {item.metric}
                      </p>
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-1">
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-500">
                      Target: {item.target}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Additional KPIs Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Comprehensive Performance Indicators (50+ KPIs)
            </h2>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              {additionalKPIs.length} Metrics
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {additionalKPIs.map((kpi, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  {kpi.label}
                </p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </p>
                <p className={`text-xs font-semibold ${
                  kpi.trend.startsWith('+') ? 'text-green-600' :
                  kpi.trend.startsWith('-') ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {kpi.trend}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Scheduled Email Reports
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={scheduledReports.enabled}
                  onChange={(e) =>
                    setScheduledReports({ ...scheduledReports, enabled: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="font-semibold text-gray-700">
                  Enable automated report delivery
                </span>
              </label>
            </div>

            {scheduledReports.enabled && (
              <div className="pl-9 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Frequency
                  </label>
                  <select
                    value={scheduledReports.frequency}
                    onChange={(e) =>
                      setScheduledReports({ ...scheduledReports, frequency: e.target.value })
                    }
                    className="w-full max-w-md px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipient Email Addresses (comma-separated)
                  </label>
                  <Input
                    type="text"
                    value={scheduledReports.emails}
                    onChange={(e) =>
                      setScheduledReports({ ...scheduledReports, emails: e.target.value })
                    }
                    placeholder="quality@hospital.com, cmo@hospital.com, cfo@hospital.com"
                    className="w-full border-2 border-gray-300 focus:border-blue-500"
                  />
                </div>

                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Save Schedule
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      </div>

  </DashboardLayout>
  )
}

'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useState } from 'react'
import {
  Pill,
  Search,
  Download,
  Plus,
  Package,
  AlertCircle,
  CheckCircle2,
  Shield,
  TrendingDown,
  Clock,
  Users,
  DollarSign,
  Activity,
  FileText,
  BarChart3,
  ShieldAlert,
  Zap,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// US Pharmacy Standards - NDC (National Drug Code) Format: 5-4-2
interface Medication {
  id: string
  ndcCode: string // 5-4-2 format (e.g., 00378-6205-01)
  genericName: string
  brandName: string
  manufacturer: string
  dosageForm: string
  strength: string
  quantity: number
  formularyTier: 1 | 2 | 3 | 4
  therapeuticClass: string
  dea_schedule?: string // For controlled substances
  rems: boolean // Risk Evaluation and Mitigation Strategy
  refrigerated: boolean
  expirationDate: string
  lotNumber: string
  unitCost: number
  reorderPoint: number
  automatedDispensingCabinet: 'Pyxis' | 'Omnicell' | 'None'
  barcodeVerified: boolean
}

// US Insurance Formulary Tiers
type FormularyTier = {
  tier: 1 | 2 | 3 | 4
  name: string
  copay: string
  priorAuthRequired: boolean
  stepTherapyRequired: boolean
}

const US_FORMULARY_TIERS: FormularyTier[] = [
  { tier: 1, name: 'Preferred Generic', copay: '$10', priorAuthRequired: false, stepTherapyRequired: false },
  { tier: 2, name: 'Generic', copay: '$25', priorAuthRequired: false, stepTherapyRequired: false },
  { tier: 3, name: 'Preferred Brand', copay: '$50', priorAuthRequired: true, stepTherapyRequired: false },
  { tier: 4, name: 'Non-Preferred/Specialty', copay: '$100+', priorAuthRequired: true, stepTherapyRequired: true }
]

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'expiring' | 'rems' | 'controlled'>('all')

  // Sample US Medications with NDC Codes
  const sampleMedications: Medication[] = [
    {
      id: 'MED-001',
      ndcCode: '00378-6205-01',
      genericName: 'Atorvastatin Calcium',
      brandName: 'Lipitor',
      manufacturer: 'Pfizer',
      dosageForm: 'Tablet',
      strength: '40mg',
      quantity: 850,
      formularyTier: 1,
      therapeuticClass: 'HMG-CoA Reductase Inhibitor',
      rems: false,
      refrigerated: false,
      expirationDate: '2025-08-15',
      lotNumber: 'LOT-2024-ATV-8852',
      unitCost: 0.12,
      reorderPoint: 500,
      automatedDispensingCabinet: 'Pyxis',
      barcodeVerified: true
    },
    {
      id: 'MED-002',
      ndcCode: '00069-5420-66',
      genericName: 'Lisinopril',
      brandName: 'Zestril',
      manufacturer: 'Pfizer',
      dosageForm: 'Tablet',
      strength: '10mg',
      quantity: 1200,
      formularyTier: 1,
      therapeuticClass: 'ACE Inhibitor',
      rems: false,
      refrigerated: false,
      expirationDate: '2025-11-30',
      lotNumber: 'LOT-2024-LIS-9201',
      unitCost: 0.08,
      reorderPoint: 600,
      automatedDispensingCabinet: 'Pyxis',
      barcodeVerified: true
    },
    {
      id: 'MED-003',
      ndcCode: '00093-0058-01',
      genericName: 'Metformin Hydrochloride',
      brandName: 'Glucophage',
      manufacturer: 'Teva Pharmaceuticals',
      dosageForm: 'Tablet Extended Release',
      strength: '500mg',
      quantity: 950,
      formularyTier: 1,
      therapeuticClass: 'Antidiabetic Agent - Biguanide',
      rems: false,
      refrigerated: false,
      expirationDate: '2025-09-22',
      lotNumber: 'LOT-2024-MET-7845',
      unitCost: 0.15,
      reorderPoint: 500,
      automatedDispensingCabinet: 'Omnicell',
      barcodeVerified: true
    },
    {
      id: 'MED-004',
      ndcCode: '00006-0749-31',
      genericName: 'Apixaban',
      brandName: 'Eliquis',
      manufacturer: 'Bristol-Myers Squibb',
      dosageForm: 'Tablet',
      strength: '5mg',
      quantity: 180,
      formularyTier: 3,
      therapeuticClass: 'Anticoagulant - Factor Xa Inhibitor',
      rems: false,
      refrigerated: false,
      expirationDate: '2025-03-10',
      lotNumber: 'LOT-2024-API-3321',
      unitCost: 8.75,
      reorderPoint: 200,
      automatedDispensingCabinet: 'Pyxis',
      barcodeVerified: true
    },
    {
      id: 'MED-005',
      ndcCode: '59676-0580-15',
      genericName: 'Insulin Glargine',
      brandName: 'Lantus Solostar',
      manufacturer: 'Sanofi-Aventis',
      dosageForm: 'Subcutaneous Injection',
      strength: '100 units/mL (3mL pen)',
      quantity: 95,
      formularyTier: 2,
      therapeuticClass: 'Insulin - Long Acting',
      rems: false,
      refrigerated: true,
      expirationDate: '2025-06-18',
      lotNumber: 'LOT-2024-INS-6612',
      unitCost: 125.00,
      reorderPoint: 100,
      automatedDispensingCabinet: 'None',
      barcodeVerified: true
    },
    {
      id: 'MED-006',
      ndcCode: '00406-8530-03',
      genericName: 'Hydrocodone/Acetaminophen',
      brandName: 'Norco',
      manufacturer: 'Allergan',
      dosageForm: 'Tablet',
      strength: '10mg/325mg',
      quantity: 420,
      formularyTier: 2,
      therapeuticClass: 'Opioid Analgesic',
      dea_schedule: 'Schedule II',
      rems: true,
      refrigerated: false,
      expirationDate: '2025-07-25',
      lotNumber: 'LOT-2024-HYD-5523',
      unitCost: 0.95,
      reorderPoint: 300,
      automatedDispensingCabinet: 'Pyxis',
      barcodeVerified: true
    },
    {
      id: 'MED-007',
      ndcCode: '00054-0222-25',
      genericName: 'Enoxaparin Sodium',
      brandName: 'Lovenox',
      manufacturer: 'Sanofi-Aventis',
      dosageForm: 'Subcutaneous Injection',
      strength: '40mg/0.4mL',
      quantity: 240,
      formularyTier: 2,
      therapeuticClass: 'Anticoagulant - Low Molecular Weight Heparin',
      rems: false,
      refrigerated: false,
      expirationDate: '2025-04-12',
      lotNumber: 'LOT-2024-ENO-4401',
      unitCost: 12.50,
      reorderPoint: 200,
      automatedDispensingCabinet: 'Omnicell',
      barcodeVerified: true
    },
    {
      id: 'MED-008',
      ndcCode: '00002-7510-01',
      genericName: 'Tadalafil',
      brandName: 'Cialis',
      manufacturer: 'Eli Lilly',
      dosageForm: 'Tablet',
      strength: '5mg',
      quantity: 320,
      formularyTier: 3,
      therapeuticClass: 'PDE5 Inhibitor',
      rems: false,
      refrigerated: false,
      expirationDate: '2026-01-30',
      lotNumber: 'LOT-2024-TAD-8891',
      unitCost: 4.25,
      reorderPoint: 150,
      automatedDispensingCabinet: 'Pyxis',
      barcodeVerified: true
    }
  ]

  // Calculate real-time metrics
  const totalMedications = sampleMedications.length + 1237 // Simulated total
  const criticalInventory = sampleMedications.filter(med => med.quantity < med.reorderPoint).length + 20
  const expiringWithin90Days = sampleMedications.filter(med => {
    const expirationDate = new Date(med.expirationDate)
    const today = new Date()
    const daysUntilExpiration = Math.floor((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiration <= 90 && daysUntilExpiration > 0
  }).length + 12
  const remsMedications = sampleMedications.filter(med => med.rems).length + 8
  const controlledSubstances = sampleMedications.filter(med => med.dea_schedule).length + 45

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
          <div className="max-w-[1920px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Pill className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Hospital Pharmacy Management
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">
                      Formulary Management • Medication Reconciliation • BCMA • ADE Reporting • Clinical Interventions
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="shadow-sm border-2">
                  <Download className="h-4 w-4 mr-2" />
                  Export Formulary
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mt-6 flex items-center gap-4">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by NDC code, generic name, brand name, or therapeutic class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('all')}
                  className="border-2"
                >
                  All Medications
                </Button>
                <Button
                  variant={selectedFilter === 'critical' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('critical')}
                  className="border-2"
                >
                  Critical Stock
                </Button>
                <Button
                  variant={selectedFilter === 'expiring' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('expiring')}
                  className="border-2"
                >
                  Expiring Soon
                </Button>
                <Button
                  variant={selectedFilter === 'rems' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('rems')}
                  className="border-2"
                >
                  REMS
                </Button>
                <Button
                  variant={selectedFilter === 'controlled' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('controlled')}
                  className="border-2"
                >
                  Controlled Substances
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Total Medications</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalMedications.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">Active formulary items</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Critical Inventory</span>
              </div>
              <p className="text-3xl font-bold text-orange-700">{criticalInventory}</p>
              <p className="text-xs text-orange-600 mt-2">Below reorder point</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Expiring (90 Days)</span>
              </div>
              <p className="text-3xl font-bold text-amber-700">{expiringWithin90Days}</p>
              <p className="text-xs text-amber-600 mt-2">Requires rotation</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ShieldAlert className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">REMS Programs</span>
              </div>
              <p className="text-3xl font-bold text-red-700">{remsMedications}</p>
              <p className="text-xs text-red-600 mt-2">Special monitoring required</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Controlled Substances</span>
              </div>
              <p className="text-3xl font-bold text-purple-700">{controlledSubstances}</p>
              <p className="text-xs text-purple-600 mt-2">DEA Schedule II-V</p>
            </div>
          </div>

          {/* Clinical Decision Support Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-900">Clinical Interventions</h3>
                  <p className="text-sm text-green-700">Pharmacist-led safety reviews</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-800">Drug Interactions Prevented</span>
                  <Badge className="bg-green-600 text-white">127 this month</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-800">Dose Adjustments (Renal/Hepatic)</span>
                  <Badge className="bg-green-600 text-white">83 this month</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-800">Therapeutic Substitutions</span>
                  <Badge className="bg-green-600 text-white">56 this month</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900">Medication Reconciliation</h3>
                  <p className="text-sm text-blue-700">Admission/Transfer/Discharge</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Completed Today</span>
                  <Badge className="bg-blue-600 text-white">47 patients</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Discrepancies Resolved</span>
                  <Badge className="bg-blue-600 text-white">12 today</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Compliance Rate</span>
                  <Badge className="bg-blue-600 text-white">98.5%</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900">Adverse Drug Events</h3>
                  <p className="text-sm text-amber-700">ADE reporting & monitoring</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-800">ADEs Reported This Month</span>
                  <Badge className="bg-amber-600 text-white">8 events</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-800">Allergy Alerts Prevented</span>
                  <Badge className="bg-amber-600 text-white">34 alerts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-800">Near-Miss Events</span>
                  <Badge className="bg-amber-600 text-white">3 avoided</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Automated Dispensing Cabinets Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Zap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Pyxis MedStation Status</h3>
                    <p className="text-sm text-gray-600">Automated Dispensing Cabinets</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">All Systems Operational</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">ICU Unit - Pyxis #1</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">Online</Badge>
                    <span className="text-xs text-gray-500">98% stocked</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Emergency Dept - Pyxis #2</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">Online</Badge>
                    <span className="text-xs text-gray-500">95% stocked</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Med/Surg 3N - Pyxis #3</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">Online</Badge>
                    <span className="text-xs text-gray-500">92% stocked</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Target className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Omnicell System Status</h3>
                    <p className="text-sm text-gray-600">Medication Management Platform</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">All Systems Operational</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">OR Suite - Omnicell #1</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">Online</Badge>
                    <span className="text-xs text-gray-500">97% stocked</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Cardiology - Omnicell #2</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">Online</Badge>
                    <span className="text-xs text-gray-500">94% stocked</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Oncology Unit - Omnicell #3</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">Online</Badge>
                    <span className="text-xs text-gray-500">96% stocked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medication Formulary Table */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Current Formulary</h2>
                <p className="text-sm text-gray-600 mt-1">NDC-coded medications with real-time inventory tracking</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-2">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="border-2">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">NDC Code</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Medication</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Therapeutic Class</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Strength</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Formulary Tier</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expiration</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sampleMedications.map((med) => {
                    const tierInfo = US_FORMULARY_TIERS.find(t => t.tier === med.formularyTier)
                    const isCritical = med.quantity < med.reorderPoint
                    const expirationDate = new Date(med.expirationDate)
                    const today = new Date()
                    const daysUntilExpiration = Math.floor((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                    const isExpiringSoon = daysUntilExpiration <= 90 && daysUntilExpiration > 0

                    return (
                      <tr key={med.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{med.ndcCode}</code>
                            {med.barcodeVerified && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{med.genericName}</p>
                            <p className="text-sm text-gray-500">{med.brandName} - {med.manufacturer}</p>
                            {med.dea_schedule && (
                              <Badge variant="outline" className="mt-1 text-red-600 border-red-300 text-xs">
                                {med.dea_schedule}
                              </Badge>
                            )}
                            {med.rems && (
                              <Badge variant="outline" className="mt-1 ml-1 text-purple-600 border-purple-300 text-xs">
                                REMS
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-700">{med.therapeuticClass}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{med.strength}</p>
                            <p className="text-xs text-gray-500">{med.dosageForm}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className={`text-lg font-bold ${isCritical ? 'text-orange-600' : 'text-gray-900'}`}>
                              {med.quantity.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">Reorder: {med.reorderPoint}</p>
                            {med.automatedDispensingCabinet !== 'None' && (
                              <Badge variant="outline" className="mt-1 text-indigo-600 border-indigo-300 text-xs">
                                {med.automatedDispensingCabinet}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <Badge
                              className={
                                med.formularyTier === 1 ? 'bg-green-100 text-green-800 border-green-300' :
                                med.formularyTier === 2 ? 'bg-blue-100 text-blue-800 border-blue-300' :
                                med.formularyTier === 3 ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                'bg-red-100 text-red-800 border-red-300'
                              }
                              variant="outline"
                            >
                              Tier {med.formularyTier}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{tierInfo?.name}</p>
                            <p className="text-xs text-gray-500">{tierInfo?.copay}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className={`text-sm font-medium ${isExpiringSoon ? 'text-amber-600' : 'text-gray-900'}`}>
                              {med.expirationDate}
                            </p>
                            <p className="text-xs text-gray-500">
                              {daysUntilExpiration > 0 ? `${daysUntilExpiration} days` : 'Expired'}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">LOT: {med.lotNumber}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            {isCritical && (
                              <Badge className="bg-orange-100 text-orange-800 border-orange-300" variant="outline">
                                Low Stock
                              </Badge>
                            )}
                            {isExpiringSoon && (
                              <Badge className="bg-amber-100 text-amber-800 border-amber-300" variant="outline">
                                Expiring Soon
                              </Badge>
                            )}
                            {med.refrigerated && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-300" variant="outline">
                                Refrigerated
                              </Badge>
                            )}
                            {!isCritical && !isExpiringSoon && (
                              <Badge className="bg-green-100 text-green-800 border-green-300" variant="outline">
                                In Stock
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing 8 of {totalMedications.toLocaleString()} medications
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-2">Previous</Button>
                <Button variant="outline" size="sm" className="border-2">Next</Button>
              </div>
            </div>
          </div>

          {/* Compliance and Integration Status */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">HIPAA & DEA Compliance</h3>
                  <p className="text-sm text-purple-800 mb-4">
                    All controlled substance transactions are logged per DEA CFR 1304 requirements.
                    Patient medication records are HIPAA-compliant with end-to-end encryption.
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-purple-600 text-white">DEA Compliant</Badge>
                    <Badge className="bg-purple-600 text-white">HIPAA Certified</Badge>
                    <Badge className="bg-purple-600 text-white">21 CFR Part 11</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">EHR Integration Status</h3>
                  <p className="text-sm text-blue-800 mb-4">
                    Real-time bidirectional integration with Epic Willow Pharmacy and Cerner PharmNet.
                    Automated order verification and barcode medication administration (BCMA) enabled.
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-600 text-white">Epic Connected</Badge>
                    <Badge className="bg-blue-600 text-white">Cerner Active</Badge>
                    <Badge className="bg-blue-600 text-white">BCMA Enabled</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* US Pharmacy Features Overview */}
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Pharmacy Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Drug Interaction Screening</h3>
                </div>
                <p className="text-sm text-blue-800">Real-time screening for drug-drug, drug-allergy, and drug-food interactions using First Databank</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">Renal/Hepatic Dosing</h3>
                </div>
                <p className="text-sm text-green-800">Automated dose adjustments based on creatinine clearance and liver function tests</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">Therapeutic Substitution</h3>
                </div>
                <p className="text-sm text-purple-800">Protocol-driven substitution recommendations for cost-effective therapeutic alternatives</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold text-amber-900">Prior Authorization</h3>
                </div>
                <p className="text-sm text-amber-800">Streamlined PA workflow for Tier 3/4 medications with payer-specific requirements</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold text-red-900">Duplicate Therapy Detection</h3>
                </div>
                <p className="text-sm text-red-800">Identifies medications from the same therapeutic class to prevent duplication</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-indigo-900">MTM Services</h3>
                </div>
                <p className="text-sm text-indigo-800">Medication Therapy Management for chronic disease states and polypharmacy patients</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}

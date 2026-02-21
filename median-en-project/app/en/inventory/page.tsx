'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useState } from 'react'
import {
  Package,
  Search,
  Download,
  Plus,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Boxes,
  BarChart3,
  Building2,
  ClipboardList,
  FileWarning,
  DollarSign,
  Timer,
  Award,
  Truck,
  Archive,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface InventoryItem {
  id: string
  productName: string
  udi: string
  gtin: string
  manufacturer: string
  vendor: string
  category: string
  fdaClass: 'I' | 'II' | 'III'
  currentStock: number
  parLevel: number
  reorderPoint: number
  unitCost: number
  lotNumber: string
  expirationDate: string
  location: string
  status: 'adequate' | 'low' | 'critical' | 'expiring'
  gpo: string
  contractPrice: number
  lastOrderDate: string
}

interface VendorPerformance {
  vendorName: string
  onTimeDelivery: number
  fillRate: number
  qualityScore: number
  totalContracts: number
  activeContracts: number
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedVendor, setSelectedVendor] = useState('all')

  // US Medical Supply Vendors - Major Distributors
  const topVendors: VendorPerformance[] = [
    {
      vendorName: 'Cardinal Health',
      onTimeDelivery: 98.5,
      fillRate: 97.2,
      qualityScore: 99.1,
      totalContracts: 45,
      activeContracts: 42
    },
    {
      vendorName: 'McKesson Medical-Surgical',
      onTimeDelivery: 97.8,
      fillRate: 96.8,
      qualityScore: 98.7,
      totalContracts: 38,
      activeContracts: 36
    },
    {
      vendorName: 'Medline Industries',
      onTimeDelivery: 99.2,
      fillRate: 98.5,
      qualityScore: 99.5,
      totalContracts: 52,
      activeContracts: 50
    },
    {
      vendorName: 'Owens & Minor',
      onTimeDelivery: 96.5,
      fillRate: 95.8,
      qualityScore: 97.9,
      totalContracts: 28,
      activeContracts: 26
    }
  ]

  // Sample inventory items with US healthcare standards
  const inventoryItems: InventoryItem[] = [
    {
      id: 'INV-2024-001',
      productName: 'Sterile Surgical Gloves - Size 7.5',
      udi: '(01)10885785000125(17)250630(10)LOT12345',
      gtin: '10885785000125',
      manufacturer: 'Cardinal Health',
      vendor: 'Cardinal Health',
      category: 'Personal Protective Equipment',
      fdaClass: 'I',
      currentStock: 2400,
      parLevel: 5000,
      reorderPoint: 1500,
      unitCost: 12.50,
      lotNumber: 'LOT12345',
      expirationDate: '2025-06-30',
      location: 'OR Supply Room A',
      status: 'low',
      gpo: 'Premier Inc.',
      contractPrice: 11.75,
      lastOrderDate: '2024-12-15'
    },
    {
      id: 'INV-2024-002',
      productName: 'Implantable Pacemaker - Dual Chamber',
      udi: '(01)00643169007222(17)251231(21)SN987654321',
      gtin: '00643169007222',
      manufacturer: 'Medtronic',
      vendor: 'Medtronic Direct',
      category: 'Implantable Devices',
      fdaClass: 'III',
      currentStock: 8,
      parLevel: 15,
      reorderPoint: 5,
      unitCost: 8450.00,
      lotNumber: 'MDT-2024-Q4',
      expirationDate: '2027-12-31',
      location: 'Cath Lab - Secured Cabinet',
      status: 'adequate',
      gpo: 'Vizient',
      contractPrice: 7950.00,
      lastOrderDate: '2024-12-10'
    },
    {
      id: 'INV-2024-003',
      productName: 'Sterile Suture 3-0 Vicryl - 36"',
      udi: '(01)50383780000125(17)250315(10)BATCH789',
      gtin: '50383780000125',
      manufacturer: 'Johnson & Johnson (Ethicon)',
      vendor: 'McKesson Medical-Surgical',
      category: 'Surgical Supplies',
      fdaClass: 'II',
      currentStock: 450,
      parLevel: 800,
      reorderPoint: 300,
      unitCost: 4.75,
      lotNumber: 'BATCH789',
      expirationDate: '2025-03-15',
      location: 'OR Central Supply',
      status: 'expiring',
      gpo: 'HealthTrust',
      contractPrice: 4.35,
      lastOrderDate: '2024-11-20'
    },
    {
      id: 'INV-2024-004',
      productName: 'IV Catheter 20G x 1.16" - BD Insyte',
      udi: '(01)30382903816729(17)250930(10)LOT-IV-2024',
      gtin: '30382903816729',
      manufacturer: 'BD (Becton Dickinson)',
      vendor: 'Medline Industries',
      category: 'IV Therapy',
      fdaClass: 'II',
      currentStock: 8500,
      parLevel: 10000,
      reorderPoint: 3000,
      unitCost: 1.85,
      lotNumber: 'LOT-IV-2024',
      expirationDate: '2025-09-30',
      location: 'ED Supply Room',
      status: 'adequate',
      gpo: 'Premier Inc.',
      contractPrice: 1.72,
      lastOrderDate: '2024-12-18'
    },
    {
      id: 'INV-2024-005',
      productName: 'N95 Respirator Mask - 3M 1860',
      udi: '(01)00707387382773(17)250430(10)RESP-2024',
      gtin: '00707387382773',
      manufacturer: '3M Healthcare',
      vendor: 'Cardinal Health',
      category: 'Personal Protective Equipment',
      fdaClass: 'II',
      currentStock: 950,
      parLevel: 5000,
      reorderPoint: 2000,
      unitCost: 2.35,
      lotNumber: 'RESP-2024',
      expirationDate: '2025-04-30',
      location: 'Central PPE Storage',
      status: 'critical',
      gpo: 'Vizient',
      contractPrice: 2.15,
      lastOrderDate: '2024-12-01'
    },
    {
      id: 'INV-2024-006',
      productName: 'Hip Implant - Titanium Femoral Stem',
      udi: '(01)00816065005557(17)261031(21)IMPL-HIP-8765',
      gtin: '00816065005557',
      manufacturer: 'Stryker Orthopedics',
      vendor: 'Stryker Direct',
      category: 'Implantable Devices',
      fdaClass: 'III',
      currentStock: 12,
      parLevel: 20,
      reorderPoint: 8,
      unitCost: 12750.00,
      lotNumber: 'STRYK-2024-HIP',
      expirationDate: '2029-10-31',
      location: 'OR - Orthopedic Vault',
      status: 'adequate',
      gpo: 'Premier Inc.',
      contractPrice: 11950.00,
      lastOrderDate: '2024-12-05'
    },
    {
      id: 'INV-2024-007',
      productName: 'Surgical Stapler - Linear Cutter 60mm',
      udi: '(01)50383780056429(17)250215(10)STAPL-2024',
      gtin: '50383780056429',
      manufacturer: 'Johnson & Johnson (Ethicon)',
      vendor: 'Owens & Minor',
      category: 'Surgical Instruments',
      fdaClass: 'II',
      currentStock: 185,
      parLevel: 400,
      reorderPoint: 150,
      unitCost: 275.00,
      lotNumber: 'STAPL-2024',
      expirationDate: '2025-02-15',
      location: 'OR General Supply',
      status: 'expiring',
      gpo: 'HealthTrust',
      contractPrice: 258.50,
      lastOrderDate: '2024-11-28'
    },
    {
      id: 'INV-2024-008',
      productName: 'Dialysis Filter - Fresenius Optiflux F160NR',
      udi: '(01)04056851055772(17)251130(10)DIAL-2024-Q4',
      gtin: '04056851055772',
      manufacturer: 'Fresenius Medical Care',
      vendor: 'McKesson Medical-Surgical',
      category: 'Dialysis Supplies',
      fdaClass: 'II',
      currentStock: 340,
      parLevel: 500,
      reorderPoint: 200,
      unitCost: 45.80,
      lotNumber: 'DIAL-2024-Q4',
      expirationDate: '2025-11-30',
      location: 'Dialysis Center',
      status: 'adequate',
      gpo: 'Vizient',
      contractPrice: 42.50,
      lastOrderDate: '2024-12-12'
    }
  ]

  // Calculate metrics
  const totalProducts = inventoryItems.length * 442 // Simulating larger inventory
  const lowStockItems = inventoryItems.filter(item => item.status === 'low' || item.status === 'critical').length * 18
  const expiringItems = inventoryItems.filter(item => item.status === 'expiring').length * 22
  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0) * 145
  const contractCompliance = 94.7
  const averageFillRate = topVendors.reduce((sum, v) => sum + v.fillRate, 0) / topVendors.length

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
          <div className="max-w-[1920px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Package className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Supply Chain Management
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">Medical Device Inventory & Distribution</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="shadow-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Inventory Item
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Boxes className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Total SKUs</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalProducts.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Across all categories</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Below Par Level</span>
              </div>
              <p className="text-3xl font-bold text-orange-700">{lowStockItems}</p>
              <p className="text-xs text-gray-500 mt-1">Require immediate reorder</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Expiring Soon</span>
              </div>
              <p className="text-3xl font-bold text-red-700">{expiringItems}</p>
              <p className="text-xs text-gray-500 mt-1">Within 90 days</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Inventory Value</span>
              </div>
              <p className="text-2xl font-bold text-green-700">${(totalInventoryValue / 1000000).toFixed(2)}M</p>
              <p className="text-xs text-gray-500 mt-1">At cost basis</p>
            </div>
          </div>

          {/* Secondary KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Contract Compliance</span>
              </div>
              <p className="text-3xl font-bold text-purple-700">{contractCompliance}%</p>
              <p className="text-xs text-gray-500 mt-1">GPO contract utilization</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-indigo-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Truck className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Avg Fill Rate</span>
              </div>
              <p className="text-3xl font-bold text-indigo-700">{averageFillRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">Vendor performance metric</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-cyan-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Timer className="h-5 w-5 text-cyan-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Avg Lead Time</span>
              </div>
              <p className="text-3xl font-bold text-cyan-700">2.3 days</p>
              <p className="text-xs text-gray-500 mt-1">From order to delivery</p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by product name, UDI, GTIN, lot number, or manufacturer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button variant="outline" className="h-12">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* Vendor Performance Scorecard */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Vendor Performance Scorecard</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topVendors.map((vendor, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-4">{vendor.vendorName}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">On-Time Delivery</span>
                        <span className="font-semibold text-gray-900">{vendor.onTimeDelivery}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${vendor.onTimeDelivery}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Fill Rate</span>
                        <span className="font-semibold text-gray-900">{vendor.fillRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${vendor.fillRate}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Quality Score</span>
                        <span className="font-semibold text-gray-900">{vendor.qualityScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${vendor.qualityScore}%` }}
                        />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-blue-200">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Active Contracts</span>
                        <span className="font-bold text-blue-700">{vendor.activeContracts}/{vendor.totalContracts}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Items Table */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Current Inventory Items</h2>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-sm">FDA Compliant</Badge>
                <Badge variant="outline" className="text-sm">UDI Tracked</Badge>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Product</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">UDI / GTIN</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Manufacturer</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">FDA Class</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-700 text-sm">Stock Level</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-700 text-sm">Par Level</th>
                    <th className="text-right py-4 px-4 font-bold text-gray-700 text-sm">Unit Cost</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">GPO</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-500 mt-1">Lot: {item.lotNumber}</p>
                          <p className="text-xs text-gray-500">Exp: {item.expirationDate}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-xs font-mono">
                          <p className="text-gray-900 font-semibold">{item.gtin}</p>
                          <p className="text-gray-500 mt-1 truncate max-w-[200px]" title={item.udi}>
                            {item.udi.substring(0, 30)}...
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.manufacturer}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.vendor}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={item.fdaClass === 'III' ? 'destructive' : item.fdaClass === 'II' ? 'default' : 'secondary'}
                          className="text-xs font-bold"
                        >
                          Class {item.fdaClass}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <p className="font-bold text-gray-900 text-sm">{item.currentStock.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <p className="text-sm text-gray-600">{item.parLevel.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">${item.unitCost.toFixed(2)}</p>
                          <p className="text-xs text-green-600">GPO: ${item.contractPrice.toFixed(2)}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs text-gray-600">{item.gpo}</span>
                      </td>
                      <td className="py-4 px-4">
                        {item.status === 'adequate' && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Adequate
                          </Badge>
                        )}
                        {item.status === 'low' && (
                          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            Low Stock
                          </Badge>
                        )}
                        {item.status === 'critical' && (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Critical
                          </Badge>
                        )}
                        {item.status === 'expiring' && (
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                            <FileWarning className="h-3 w-3 mr-1" />
                            Expiring
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Supply Chain Features */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Advanced Supply Chain Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Timer className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-blue-900">Automated Reordering</h3>
                </div>
                <p className="text-sm text-blue-800">Just-In-Time (JIT) delivery based on par levels and consumption patterns</p>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-xs text-blue-700"><strong>87</strong> items pending auto-reorder</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Archive className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-purple-900">ABC Inventory Analysis</h3>
                </div>
                <p className="text-sm text-purple-800">Categorize inventory by value and usage frequency for optimal management</p>
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded font-semibold">A: 15%</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded font-semibold">B: 35%</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">C: 50%</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-green-900">Price Variance Analysis</h3>
                </div>
                <p className="text-sm text-green-800">Track contract vs. actual pricing to ensure GPO compliance and savings</p>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-xs text-green-700"><strong>$127K</strong> saved YTD via contract pricing</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-orange-900">Recall Management</h3>
                </div>
                <p className="text-sm text-orange-800">FDA recall tracking with automated lot number identification and quarantine</p>
                <div className="mt-4 pt-4 border-t border-orange-200">
                  <p className="text-xs text-orange-700"><strong>3</strong> active recalls being managed</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border-2 border-indigo-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <ClipboardList className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-indigo-900">Physician Preference Cards</h3>
                </div>
                <p className="text-sm text-indigo-800">Surgeon-specific supply preference management for OR efficiency</p>
                <div className="mt-4 pt-4 border-t border-indigo-200">
                  <p className="text-xs text-indigo-700"><strong>142</strong> preference cards configured</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl border-2 border-cyan-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-cyan-500 rounded-lg">
                    <FileWarning className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-cyan-900">Implant Log & Tracking</h3>
                </div>
                <p className="text-sm text-cyan-800">FDA-required Class III device tracking with patient-level traceability</p>
                <div className="mt-4 pt-4 border-t border-cyan-200">
                  <p className="text-xs text-cyan-700"><strong>2,847</strong> implants tracked YTD</p>
                </div>
              </div>
            </div>
          </div>

          {/* GPO Information */}
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Group Purchasing Organization (GPO) Partnerships</h3>
                <p className="text-sm text-blue-800 mb-4">
                  Leveraging Premier, Vizient, and HealthTrust contracts for optimal pricing and vendor terms.
                  Contract compliance monitoring ensures maximum cost savings and standardized quality.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Premier Inc.</p>
                    <p className="text-2xl font-bold text-blue-700">47%</p>
                    <p className="text-xs text-gray-500">contract utilization</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1">Vizient</p>
                    <p className="text-2xl font-bold text-purple-700">32%</p>
                    <p className="text-xs text-gray-500">contract utilization</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-pink-200">
                    <p className="text-xs text-gray-600 mb-1">HealthTrust</p>
                    <p className="text-2xl font-bold text-pink-700">21%</p>
                    <p className="text-xs text-gray-500">contract utilization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance and Security */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">FDA & HIPAA Compliance</h3>
                <p className="text-sm text-purple-800 mb-3">
                  All inventory transactions comply with FDA UDI requirements (21 CFR Part 801) and HIPAA security standards.
                  Unique Device Identifiers (UDI) are tracked for all Class II and Class III medical devices.
                  Vendor information and supply chain data are encrypted and audit-logged per HIPAA administrative safeguards.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    UDI Compliant
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    FDA 21 CFR 801
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    HIPAA Secure
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    SOC 2 Type II
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    GS1 Standards
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}

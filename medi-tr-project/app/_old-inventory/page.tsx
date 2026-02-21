'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Package,
  Search,
  Filter,
  Download,
  Plus,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Heart,
  Box,
  Archive,
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import {
  generateInventoryItems,
  calculateInventoryStats,
  type InventoryItem,
} from '@/lib/data/inventory-data'
import { cn } from '@/lib/utils'

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isClient, setIsClient] = useState(false)

  const [inventory] = useState<InventoryItem[]>(() => generateInventoryItems(200))

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [inventory, searchQuery, categoryFilter, statusFilter])

  const stats = useMemo(() => calculateInventoryStats(inventory), [inventory])

  const formatCurrency = (amount: number) => {
    if (!isClient) return `$${amount.toFixed(2)}`
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

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

  const getExpirationStatus = (expirationDate?: Date) => {
    if (!expirationDate) return null

    const now = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    if (expirationDate < now) {
      return { text: 'Expired', variant: 'destructive' as const }
    } else if (expirationDate <= thirtyDaysFromNow) {
      return { text: 'Expiring Soon', variant: 'warning' as const }
    }
    return null
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
              Loading inventory...
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
                  <div className="p-3 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl shadow-lg shadow-orange-500/30">
                    <Package className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Inventory Management
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">
                      Supply Chain & Stock Management
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900">
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center gap-2 font-semibold">
                  <Plus className="h-5 w-5" />
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Box className="h-6 w-6" />
                </div>
                <TrendingUp className="h-5 w-5 text-orange-200" />
              </div>
              <p className="text-sm font-medium text-orange-100 mb-1">Total Items</p>
              <p className="text-4xl font-bold tracking-tight">{stats.totalItems}</p>
              <p className="text-xs text-orange-200 mt-2">In inventory</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Value</p>
              <p className="text-4xl font-bold text-gray-900">
                {formatCurrency(stats.totalValue)}
              </p>
              <p className="text-xs text-gray-500 mt-2">Current stock value</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-red-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                {stats.lowStockItems > 0 && (
                  <Badge className="bg-red-100 text-red-700 border-red-200 font-semibold">
                    Alert
                  </Badge>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Low Stock</p>
              <p className="text-4xl font-bold text-gray-900">{stats.lowStockItems}</p>
              <p className="text-xs text-gray-500 mt-2">Items need reorder</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-yellow-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <ShoppingCart className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">On Order</p>
              <p className="text-4xl font-bold text-gray-900">{stats.onOrderItems}</p>
              <p className="text-xs text-gray-500 mt-2">Items in transit</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by item name, code, or supplier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all min-w-[160px]"
              >
                <option value="all">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="On Order">On Order</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all min-w-[180px]"
              >
                <option value="all">All Categories</option>
                <option value="Medical Supplies">Medical Supplies</option>
                <option value="Surgical Instruments">Surgical Instruments</option>
                <option value="PPE">PPE</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Patient Care">Patient Care</option>
              </select>

              <button className="px-5 py-3 border-2 border-gray-200 bg-white rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center gap-2 font-semibold text-gray-700">
                <Filter className="h-4 w-4" />
                More
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-600">
              <div className="h-2 w-2 bg-orange-600 rounded-full"></div>
              Showing {filteredInventory.length} items
              {searchQuery && (
                <span className="text-orange-600"> matching "{searchQuery}"</span>
              )}
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      On Hand
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Reorder Level
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Unit Cost
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Total Value
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInventory.slice(0, 50).map((item) => {
                    const expirationStatus = getExpirationStatus(item.expirationDate)

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition-all"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-bold text-gray-900 text-sm">
                              {item.itemName}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-600">
                                {item.itemCode}
                              </code>
                              {item.sterile && (
                                <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                                  Sterile
                                </Badge>
                              )}
                              {expirationStatus && (
                                <Badge
                                  variant={expirationStatus.variant}
                                  className="text-xs"
                                >
                                  {expirationStatus.text}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-700">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-700">
                            {item.supplier}
                          </div>
                          {item.manufacturer && (
                            <div className="text-xs text-gray-500">
                              Mfg: {item.manufacturer}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={cn(
                              'text-sm font-bold',
                              item.quantityOnHand === 0 && 'text-red-600',
                              item.quantityOnHand <= item.reorderLevel &&
                                item.quantityOnHand > 0 &&
                                'text-yellow-600',
                              item.quantityOnHand > item.reorderLevel && 'text-gray-900'
                            )}
                          >
                            {item.quantityOnHand}
                          </span>
                          <div className="text-xs text-gray-500">{item.unitOfMeasure}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-gray-700">
                            {item.reorderLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-bold text-gray-900">
                            {formatCurrency(item.unitCost)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-bold text-green-700">
                            {formatCurrency(item.totalValue)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={cn(
                              'font-bold text-xs',
                              item.status === 'In Stock' &&
                                'bg-green-100 text-green-700 border-green-200',
                              item.status === 'Low Stock' &&
                                'bg-yellow-100 text-yellow-700 border-yellow-200',
                              item.status === 'Out of Stock' &&
                                'bg-red-100 text-red-700 border-red-200',
                              item.status === 'On Order' &&
                                'bg-blue-100 text-blue-700 border-blue-200'
                            )}
                          >
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

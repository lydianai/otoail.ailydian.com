'use client'

import { useState } from 'react'
import { Package, Search, Download, Plus, TrendingDown, AlertTriangle, CheckCircle2, Shield, Boxes } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function StokPage() {
  const [aramaTerimi, setAramaTerimi] = useState('')

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Package className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Stok Yönetimi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">Tıbbi Malzeme & Depo Yönetimi</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                <Plus className="h-4 w-4 mr-2" />
                Malzeme Ekle
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Boxes className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Toplam Ürün</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">3,542</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Düşük Stok</span>
            </div>
            <p className="text-3xl font-bold text-orange-700">127</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">SKT Yaklaşan</span>
            </div>
            <p className="text-3xl font-bold text-red-700">43</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Stok Değeri</span>
            </div>
            <p className="text-2xl font-bold text-green-700">2.4M ₺</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stok Yönetimi Modülü</h2>
            <p className="text-gray-600">Tıbbi malzeme, ilaç dışı ürün ve depo yönetimi</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold text-blue-900">Stok Kartları</h3>
                <p className="text-sm text-blue-700 mt-1">Detaylı ürün takibi</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <h3 className="font-bold text-orange-900">SKT Uyarıları</h3>
                <p className="text-sm text-orange-700 mt-1">Son kullanma tarihi kontrolü</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-bold text-green-900">Tedarikçi Yönetimi</h3>
                <p className="text-sm text-green-700 mt-1">Otomatik sipariş sistemi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">KVKK Uyumluluk - Stok</h3>
              <p className="text-sm text-purple-800">
                Stok hareketleri ve tedarikçi bilgileri güvenli şekilde saklanır.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
    
  )
}

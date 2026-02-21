'use client'

import { useState } from 'react'
import { Pill, Search, Download, Plus, Package, AlertCircle, CheckCircle2, Shield, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function EczanePage() {
  const [aramaTerimi, setAramaTerimi] = useState('')

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Pill className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Eczane Yönetimi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">İlaç Stok & e-Reçete - İTS Entegrasyonu</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                <Plus className="h-4 w-4 mr-2" />
                İlaç Ekle
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
                <Package className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Toplam İlaç</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">1,245</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Kritik Stok</span>
            </div>
            <p className="text-3xl font-bold text-orange-700">28</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">SKT Yaklaşan</span>
            </div>
            <p className="text-3xl font-bold text-red-700">15</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">İTS Senkron</span>
            </div>
            <p className="text-3xl font-bold text-green-700">%98</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
          <div className="text-center py-12">
            <Pill className="h-24 w-24 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Eczane Modülü</h2>
            <p className="text-gray-600">e-Reçete, İTS entegrasyonu ve ilaç stok yönetimi</p>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">KVKK & İTS Uyumluluk</h3>
              <p className="text-sm text-purple-800">
                İlaç kayıtları İTS (İlaç Takip Sistemi) ile entegre ve KVKK uyumludur.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
    
  )
}

'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Activity,
  CreditCard,
  FileText,
  AlertCircle,
  BarChart3,
  Users,
  Calendar,
  ArrowRight,
  Shield,
  Database,
  Zap
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

// Import Medula data
import {
  sampleProvisions,
  sampleInvoices,
  sutCodes,
  getSUTCodesByCategory,
  searchSUTCodes,
  type ProvisionRequest,
  type Invoice,
  type SUTCategory
} from '@/lib/data/medula-sut-2025'

export default function MedulaPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'provisions' | 'invoices' | 'sut-codes'>('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<SUTCategory | 'all'>('all')

  // Statistics
  const stats = useMemo(() => ({
    totalProvisions: sampleProvisions.length,
    approvedProvisions: sampleProvisions.filter(p => p.status === 'Approved').length,
    pendingProvisions: sampleProvisions.filter(p => p.status === 'Pending').length,
    rejectedProvisions: sampleProvisions.filter(p => p.status === 'Rejected').length,
    totalInvoices: sampleInvoices.length,
    totalAmount: sampleInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
    totalSUTCodes: sutCodes.filter(s => s.isActive).length,
  }), [])

  const filteredProvisions = useMemo(() => {
    return sampleProvisions.filter(provision => {
      const matchesSearch = searchQuery === '' ||
        provision.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provision.provisionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provision.patientTCKN.includes(searchQuery)

      const matchesStatus = statusFilter === 'all' || provision.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const filteredSUTCodes = useMemo(() => {
    if (searchQuery) {
      return searchSUTCodes(searchQuery)
    }
    if (selectedCategory === 'all') {
      return sutCodes.filter(s => s.isActive)
    }
    return getSUTCodesByCategory(selectedCategory)
  }, [searchQuery, selectedCategory])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusBadge = (status: ProvisionRequest['status']) => {
    const variants = {
      'Approved': { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
      'Pending': { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
      'Rejected': { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
      'Expired': { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: AlertCircle }
    }

    const config = variants[status]
    const Icon = config.icon

    return (
      <Badge className={cn('font-semibold', config.color)}>
        <Icon className="h-3 w-3 mr-1" />
        {status === 'Approved' ? 'Onaylandı' :
         status === 'Pending' ? 'Bekliyor' :
         status === 'Rejected' ? 'Reddedildi' : 'Süresi Doldu'}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl shadow-lg shadow-red-500/30 flex-shrink-0">
                <Building2 className="h-5 w-5 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  Medula / SGK Yönetimi
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1 font-medium">
                  Sosyal Güvenlik Kurumu Sağlık Hizmetleri
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => alert('Rapor özelliği yakında!')}
                className="border-2"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Rapor İndir</span>
                <span className="sm:hidden">Rapor</span>
              </Button>
              <Button
                onClick={() => alert('Yeni provizyon özelliği yakında!')}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg shadow-red-500/50"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Yeni Provizyon</span>
                <span className="sm:hidden">Yeni</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap border-b-2',
                  activeTab === 'dashboard'
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Activity className="h-4 w-4" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('provisions')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap border-b-2',
                  activeTab === 'provisions'
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <CreditCard className="h-4 w-4" />
                Provizyon İşlemleri ({stats.totalProvisions})
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap border-b-2',
                  activeTab === 'invoices'
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <FileText className="h-4 w-4" />
                Fatura Yönetimi ({stats.totalInvoices})
              </button>
              <button
                onClick={() => setActiveTab('sut-codes')}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap border-b-2',
                  activeTab === 'sut-codes'
                    ? 'text-red-600 border-red-600 bg-red-50/50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Database className="h-4 w-4" />
                SUT Kod Veritabanı
                <Badge className="bg-green-100 text-green-700 text-xs">{stats.totalSUTCodes}</Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Bugünkü Provizyon</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.totalProvisions}</p>
                  <p className="text-xs text-gray-600 mt-2">Toplam işlem</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-green-100/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Onaylanan</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.approvedProvisions}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    %{Math.round((stats.approvedProvisions / stats.totalProvisions) * 100)} onay oranı
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-amber-100/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Bekleyen</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.pendingProvisions}</p>
                  <p className="text-xs text-gray-600 mt-2">İşlem bekliyor</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Toplam Tutar</p>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
                  <p className="text-xs text-gray-600 mt-2">Bu ay faturalanan</p>
                </CardContent>
              </Card>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    SGK Entegrasyonu
                  </CardTitle>
                  <CardDescription>
                    Anlık sorgulama ve provizyon yönetimi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Hasta Sigorta Sorgulama</p>
                      <p className="text-sm text-gray-600">TC kimlik no ile anlık SGK sorgulama</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Otomatik Provizyon</p>
                      <p className="text-sm text-gray-600">Sistem üzerinden hızlı provizyon alma</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Gerçek Zamanlı Takip</p>
                      <p className="text-sm text-gray-600">Provizyon durumu anlık izleme</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    SUT 2025 Veritabanı
                  </CardTitle>
                  <CardDescription>
                    {stats.totalSUTCodes} aktif SUT kodu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Güncel Fiyat Listesi</p>
                      <p className="text-sm text-gray-600">2025 yılı güncel SUT kodları ve fiyatları</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Özel Kod Yönetimi</p>
                      <p className="text-sm text-gray-600">l, p, m kodları otomatik tanımlama</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Hızlı Arama</p>
                      <p className="text-sm text-gray-600">Kod numarası ve isim ile arama</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Provisions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Son Provizyon İşlemleri</CardTitle>
                    <CardDescription>Bugün yapılan son işlemler</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('provisions')}
                  >
                    Tümünü Gör
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleProvisions.slice(0, 5).map((provision) => (
                    <div
                      key={provision.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <CreditCard className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{provision.patientName}</p>
                          <p className="text-sm text-gray-600">{provision.provisionNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(provision.status)}
                        <p className="text-sm text-gray-600 mt-1">{formatCurrency(provision.totalPrice)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PROVISIONS TAB */}
        {activeTab === 'provisions' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Hasta adı, provizyon no veya TC kimlik ile ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 min-w-[160px]"
                  >
                    <option value="all">Tüm Durum</option>
                    <option value="Approved">Onaylandı</option>
                    <option value="Pending">Bekliyor</option>
                    <option value="Rejected">Reddedildi</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Provisions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Provizyon Listesi</CardTitle>
                <CardDescription>
                  {filteredProvisions.length} provizyon işlemi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provizyon No</TableHead>
                      <TableHead>Hasta Bilgisi</TableHead>
                      <TableHead>Oluşturulma</TableHead>
                      <TableHead>Son Tarih</TableHead>
                      <TableHead>Tutar</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProvisions.map((provision) => (
                      <TableRow key={provision.id}>
                        <TableCell className="font-mono text-sm">{provision.provisionNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{provision.patientName}</p>
                            <p className="text-sm text-gray-600">{provision.patientTCKN}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{formatDate(provision.createdDate)}</TableCell>
                        <TableCell className="text-sm">{formatDate(provision.expiryDate)}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(provision.totalPrice)}</TableCell>
                        <TableCell>{getStatusBadge(provision.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => alert('Provizyon detayı yakında!')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* INVOICES TAB */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fatura Listesi</CardTitle>
                <CardDescription>Aylık fatura dökümleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleInvoices.map((invoice) => (
                    <Card key={invoice.id} className="border-2">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{invoice.invoiceNumber}</p>
                            <p className="text-sm text-gray-600">
                              {invoice.periodMonth}/{invoice.periodYear} Dönemi
                            </p>
                          </div>
                          <Badge className={cn(
                            invoice.status === 'Submitted' ? 'bg-blue-100 text-blue-700' :
                            invoice.status === 'Approved' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          )}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Toplam Provizyon</p>
                            <p className="text-xl font-bold text-gray-900">{invoice.totalProvisions}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Toplam Puan</p>
                            <p className="text-xl font-bold text-gray-900">{invoice.totalPoints.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Toplam Tutar</p>
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SUT CODES TAB */}
        {activeTab === 'sut-codes' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="SUT kodu veya isim ile ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="h-[54px] px-4 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 min-w-[200px]"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    <option value="Muayene">Muayene</option>
                    <option value="Tahlil">Tahlil</option>
                    <option value="Görüntüleme">Görüntüleme</option>
                    <option value="Ameliyat">Ameliyat</option>
                    <option value="Girişim">Girişim</option>
                    <option value="Tedavi">Tedavi</option>
                    <option value="Malzeme">Malzeme</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SUT Kod Listesi</CardTitle>
                <CardDescription>
                  {filteredSUTCodes.length} SUT kodu bulundu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kod</TableHead>
                      <TableHead>İşlem Adı</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Puan</TableHead>
                      <TableHead>Fiyat</TableHead>
                      <TableHead>Özel Kod</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSUTCodes.slice(0, 50).map((sut) => (
                      <TableRow key={sut.code}>
                        <TableCell className="font-mono font-bold">{sut.code}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{sut.name}</p>
                            {sut.description && (
                              <p className="text-xs text-gray-600">{sut.description}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{sut.category}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{sut.point}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(sut.price)}</TableCell>
                        <TableCell>
                          {sut.specialCode && (
                            <Badge className={cn(
                              sut.specialCode === 'l' ? 'bg-blue-100 text-blue-700' :
                              sut.specialCode === 'p' ? 'bg-purple-100 text-purple-700' :
                              'bg-green-100 text-green-700'
                            )}>
                              {sut.specialCode.toUpperCase()}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

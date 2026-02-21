'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Shield,
  Brain,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Settings,
  FileText,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DemoBanner from '@/components/DemoBanner'
import {
  sampleAIModels,
  searchModels,
  getAIModelsByStatus,
  getAIModelsByRiskClass,
  getAIModelsByDeviceClass,
  getAIModelsByEnvironment,
  type AIModelRegistration
} from '@/lib/data/fda-ai-compliance'

type SortField = 'modelName' | 'fdaStatus' | 'riskClass' | 'complianceScore' | 'deploymentDate'
type SortDirection = 'asc' | 'desc'

export default function AIModelRegistryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const modelIdFromQuery = searchParams.get('model')

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [riskFilter, setRiskFilter] = useState<string>('all')
  const [deviceClassFilter, setDeviceClassFilter] = useState<string>('all')
  const [environmentFilter, setEnvironmentFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('modelName')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedModel, setSelectedModel] = useState<AIModelRegistration | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Open modal if model ID in query
  useState(() => {
    if (modelIdFromQuery) {
      const model = sampleAIModels.find(m => m.id === modelIdFromQuery)
      if (model) {
        setSelectedModel(model)
        setIsDetailModalOpen(true)
      }
    }
  })

  // Filtered and sorted models
  const filteredModels = useMemo(() => {
    let models = searchQuery ? searchModels(searchQuery) : [...sampleAIModels]

    // Apply filters
    if (statusFilter !== 'all') {
      models = models.filter(m => m.fdaStatus === statusFilter)
    }
    if (riskFilter !== 'all') {
      models = models.filter(m => m.riskClass === riskFilter)
    }
    if (deviceClassFilter !== 'all') {
      models = models.filter(m => m.deviceClassification === deviceClassFilter)
    }
    if (environmentFilter !== 'all') {
      models = models.filter(m => m.deploymentEnvironment === environmentFilter)
    }

    // Sort
    models.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'deploymentDate') {
        aValue = a.deploymentDate?.getTime() || 0
        bValue = b.deploymentDate?.getTime() || 0
      }

      if (typeof aValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    })

    return models
  }, [searchQuery, statusFilter, riskFilter, deviceClassFilter, environmentFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleViewDetails = (model: AIModelRegistration) => {
    setSelectedModel(model)
    setIsDetailModalOpen(true)
  }

  const handleExportCSV = () => {
    const headers = ['Model Name', 'FDA Status', 'Device Class', 'Risk Class', 'Compliance Score', 'Deployment Date']
    const rows = filteredModels.map(m => [
      m.modelName,
      m.fdaStatus,
      m.deviceClassification,
      m.riskClass,
      m.complianceScore.toString(),
      m.deploymentDate?.toLocaleDateString() || 'N/A'
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-model-registry-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const getFDAStatusBadge = (status: AIModelRegistration['fdaStatus']) => {
    const variants: Record<typeof status, { variant: any; icon: any; color: string }> = {
      'Approved': { variant: 'default', icon: CheckCircle2, color: 'text-green-600 bg-green-100' },
      'In Review': { variant: 'secondary', icon: Clock, color: 'text-blue-600 bg-blue-100' },
      'Not Submitted': { variant: 'outline', icon: AlertTriangle, color: 'text-gray-600 bg-gray-100' },
      'Rejected': { variant: 'destructive', icon: XCircle, color: 'text-red-600 bg-red-100' },
      'Withdrawn': { variant: 'outline', icon: XCircle, color: 'text-gray-600 bg-gray-100' }
    }

    const config = variants[status]
    const Icon = config.icon

    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const getRiskBadge = (risk: AIModelRegistration['riskClass']) => {
    const colors = {
      'Low': 'bg-green-100 text-green-700',
      'Moderate': 'bg-amber-100 text-amber-700',
      'High': 'bg-red-100 text-red-700'
    }

    return (
      <Badge className={colors[risk]}>
        {risk}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <DemoBanner />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/en/compliance/ai-devices')}
              >
                <ChevronDown className="h-5 w-5 rotate-90" />
              </Button>
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Model Registry
                </h1>
                <p className="text-sm text-gray-600">
                  {filteredModels.length} of {sampleAIModels.length} models displayed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleExportCSV}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Register New Model
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filters & Search */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Search
                </CardTitle>
                <CardDescription>
                  Refine your model search with advanced filters
                </CardDescription>
              </div>
              {(searchQuery || statusFilter !== 'all' || riskFilter !== 'all' || deviceClassFilter !== 'all' || environmentFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setStatusFilter('all')
                    setRiskFilter('all')
                    setDeviceClassFilter('all')
                    setEnvironmentFilter('all')
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by model name, intended use, or clinical setting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  FDA Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Not Submitted">Not Submitted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Risk Class
                </label>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risks</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Device Class
                </label>
                <Select value={deviceClassFilter} onValueChange={setDeviceClassFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="Class I">Class I</SelectItem>
                    <SelectItem value="Class II">Class II</SelectItem>
                    <SelectItem value="Class III">Class III</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Environment
                </label>
                <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Environments</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Staging">Staging</SelectItem>
                    <SelectItem value="Testing">Testing</SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Models Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registered AI Models</CardTitle>
            <CardDescription>
              Complete registry of FDA-regulated AI/ML medical devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[300px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 font-semibold"
                        onClick={() => handleSort('modelName')}
                      >
                        Model Name
                        {sortField === 'modelName' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                        )}
                        {sortField !== 'modelName' && <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 font-semibold"
                        onClick={() => handleSort('fdaStatus')}
                      >
                        FDA Status
                        {sortField === 'fdaStatus' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>Device Class</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 font-semibold"
                        onClick={() => handleSort('riskClass')}
                      >
                        Risk
                        {sortField === 'riskClass' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 font-semibold"
                        onClick={() => handleSort('complianceScore')}
                      >
                        Compliance
                        {sortField === 'complianceScore' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>PCCP</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                        No models found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredModels.map((model) => (
                      <TableRow key={model.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold text-gray-900">{model.modelName}</div>
                            <div className="text-xs text-gray-600">v{model.modelVersion}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getFDAStatusBadge(model.fdaStatus)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{model.deviceClassification}</Badge>
                        </TableCell>
                        <TableCell>
                          {getRiskBadge(model.riskClass)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`text-sm font-semibold ${
                              model.complianceScore >= 95 ? 'text-green-600' :
                              model.complianceScore >= 85 ? 'text-blue-600' :
                              model.complianceScore >= 75 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {model.complianceScore}%
                            </div>
                            <Progress
                              value={model.complianceScore}
                              className="w-16 h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={model.deploymentEnvironment === 'Production' ? 'default' : 'secondary'}>
                            {model.deploymentEnvironment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {model.pccp ? (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-500">
                              None
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewDetails(model)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/en/compliance/ai-devices/labeling?model=${model.id}`)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/en/compliance/ai-devices/monitoring?model=${model.id}`)}
                            >
                              <Activity className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedModel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <Brain className="h-6 w-6 text-blue-600" />
                  {selectedModel.modelName}
                </DialogTitle>
                <DialogDescription>
                  Version {selectedModel.modelVersion} • {selectedModel.deviceClassification} • {selectedModel.regulatoryPathway}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="clinical">Clinical</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="pccp">PCCP</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">FDA Status</h4>
                      {getFDAStatusBadge(selectedModel.fdaStatus)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Risk Classification</h4>
                      {getRiskBadge(selectedModel.riskClass)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Deployment Status</h4>
                      <Badge variant={selectedModel.deploymentEnvironment === 'Production' ? 'default' : 'secondary'}>
                        {selectedModel.deploymentEnvironment}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Compliance Score</h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${
                          selectedModel.complianceScore >= 95 ? 'text-green-600' :
                          selectedModel.complianceScore >= 85 ? 'text-blue-600' :
                          'text-amber-600'
                        }`}>
                          {selectedModel.complianceScore}%
                        </span>
                        <Progress value={selectedModel.complianceScore} className="flex-1" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Intended Use</h4>
                    <p className="text-sm text-gray-700">{selectedModel.intendedUse}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Model Type</h4>
                    <Badge variant="outline">{selectedModel.modelType}</Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Clinical Settings</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.clinicalSetting.map((setting, idx) => (
                        <Badge key={idx} variant="secondary">{setting}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Target Users</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.targetUserRole.map((role, idx) => (
                        <Badge key={idx} variant="outline">{role}</Badge>
                      ))}
                    </div>
                  </div>

                  {selectedModel.deploymentDate && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Deployment Date</h4>
                      <p className="text-sm text-gray-700">{new Date(selectedModel.deploymentDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="clinical" className="space-y-4 mt-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Training Dataset</h4>
                    <Card>
                      <CardContent className="pt-4 space-y-2 text-sm">
                        <div><strong>Name:</strong> {selectedModel.trainingDataset.name}</div>
                        <div><strong>Size:</strong> {selectedModel.trainingDataset.size.toLocaleString()} samples</div>
                        <div><strong>Demographics:</strong> {selectedModel.trainingDataset.demographics}</div>
                        <div><strong>Source Institutions:</strong> {selectedModel.trainingDataset.sourceInstitutions.join(', ')}</div>
                        <div><strong>Date Range:</strong> {new Date(selectedModel.trainingDataset.dateRange.start).toLocaleDateString()} - {new Date(selectedModel.trainingDataset.dateRange.end).toLocaleDateString()}</div>
                        <div><strong>Bias Assessment:</strong> {selectedModel.trainingDataset.biasAssessment}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Risk Mitigation Strategies</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {selectedModel.riskMitigationStrategies.map((strategy, idx) => (
                        <li key={idx}>{strategy}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="mt-6">
                  {selectedModel.performanceMetrics.length > 0 ? (
                    <div className="space-y-4">
                      {selectedModel.performanceMetrics.map((metric, idx) => (
                        <Card key={idx}>
                          <CardHeader>
                            <CardTitle className="text-sm">
                              {new Date(metric.recordedDate).toLocaleDateString()} • {metric.environment}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">Accuracy</div>
                                <div className="text-lg font-semibold">{(metric.accuracy * 100).toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Sensitivity</div>
                                <div className="text-lg font-semibold">{(metric.sensitivity * 100).toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Specificity</div>
                                <div className="text-lg font-semibold">{(metric.specificity * 100).toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-600">AUC</div>
                                <div className="text-lg font-semibold">{(metric.auc * 100).toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Drift Score</div>
                                <div className="text-lg font-semibold">{(metric.driftScore * 100).toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Drift Status</div>
                                <Badge variant={metric.driftStatus === 'Normal' ? 'default' : 'destructive'}>
                                  {metric.driftStatus}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No performance metrics available</p>
                  )}
                </TabsContent>

                <TabsContent value="pccp" className="mt-6">
                  {selectedModel.pccp ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">Status</h4>
                        <Badge className="bg-green-100 text-green-700">{selectedModel.pccp.status}</Badge>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">Allowed Modifications</h4>
                        {selectedModel.pccp.allowedModifications.map((mod, idx) => (
                          <Card key={idx} className="mb-2">
                            <CardContent className="pt-4 text-sm">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">{mod.type}</div>
                                  <p className="text-gray-700 mt-1">{mod.description}</p>
                                  <div className="flex items-center gap-4 mt-2 text-xs">
                                    <Badge variant="outline">Impact: {mod.impactLevel}</Badge>
                                    {mod.requiresFDANotification && (
                                      <Badge variant="secondary">FDA Notification Required</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">Performance Boundaries</h4>
                        {selectedModel.pccp.performanceBoundaries.map((boundary, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2 text-sm">
                            <div>
                              <div className="font-semibold">{boundary.metric}</div>
                              <div className="text-xs text-gray-600">{boundary.triggerAction}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-blue-600">{boundary.currentValue}</div>
                              <div className="text-xs text-gray-600">Min: {boundary.minimumThreshold}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No PCCP defined for this model</p>
                  )}
                </TabsContent>

                <TabsContent value="compliance" className="space-y-4 mt-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Audit Status</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Last Audit</p>
                        <p className="font-semibold">{selectedModel.lastAuditDate ? new Date(selectedModel.lastAuditDate).toLocaleDateString() : 'Never'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Next Audit Due</p>
                        <p className="font-semibold">{selectedModel.nextAuditDue ? new Date(selectedModel.nextAuditDue).toLocaleDateString() : 'Not scheduled'}</p>
                      </div>
                    </div>
                  </div>

                  {selectedModel.outstandingIssues.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Outstanding Issues</h4>
                      {selectedModel.outstandingIssues.map((issue) => (
                        <Card key={issue.id} className="mb-2">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant={issue.severity === 'Critical' ? 'destructive' : 'secondary'}>
                                    {issue.severity}
                                  </Badge>
                                  <Badge variant="outline">{issue.issueType}</Badge>
                                  <Badge variant="outline">{issue.status}</Badge>
                                </div>
                                <h5 className="font-semibold text-gray-900">{issue.title}</h5>
                                <p className="text-sm text-gray-700 mt-1">{issue.description}</p>
                                <div className="text-xs text-gray-600 mt-2">
                                  Target Resolution: {new Date(issue.targetResolutionDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/en/compliance/ai-devices/labeling?model=${selectedModel.id}`)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Labeling
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/en/compliance/ai-devices/monitoring?model=${selectedModel.id}`)}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  View Performance
                </Button>
                <Button onClick={() => setIsDetailModalOpen(false)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

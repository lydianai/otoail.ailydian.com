'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Brain,
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Download,
  FileText,
  Calendar,
  Search,
  Filter,
  Eye,
  History,
  CheckSquare,
  Users,
  FileCheck,
  AlertCircle,
  TrendingUp
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DemoBanner from '@/components/DemoBanner'
import { sampleAIModels, type AIModelRegistration, type AuditLog } from '@/lib/data/fda-ai-compliance'

export default function AIModelAuditPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const modelIdFromQuery = searchParams.get('model')

  const [selectedModelId, setSelectedModelId] = useState<string>(
    modelIdFromQuery || sampleAIModels[0]?.id || ''
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [actionFilter, setActionFilter] = useState<string>('all')
  const [selectedAuditLog, setSelectedAuditLog] = useState<AuditLog | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const selectedModel = useMemo(
    () => sampleAIModels.find(m => m.id === selectedModelId),
    [selectedModelId]
  )

  const filteredAuditLogs = useMemo(() => {
    if (!selectedModel) return []

    let logs = [...selectedModel.auditLogs]

    if (searchQuery) {
      logs = logs.filter(log =>
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.performedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (actionFilter !== 'all') {
      logs = logs.filter(log => log.action === actionFilter)
    }

    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [selectedModel, searchQuery, actionFilter])

  const complianceChecklist = [
    {
      category: 'FDA Submission',
      items: [
        { name: '510(k) submission completed', status: selectedModel?.fdaStatus === 'Approved' },
        { name: 'Device classification documented', status: true },
        { name: 'Regulatory pathway approved', status: selectedModel?.fdaStatus === 'Approved' },
      ]
    },
    {
      category: 'PCCP Requirements',
      items: [
        { name: 'PCCP plan submitted', status: selectedModel?.pccp !== null },
        { name: 'Allowed modifications defined', status: (selectedModel?.pccp?.allowedModifications?.length ?? 0) > 0 },
        { name: 'Performance boundaries set', status: (selectedModel?.pccp?.performanceBoundaries?.length ?? 0) > 0 },
      ]
    },
    {
      category: 'Labeling & Transparency',
      items: [
        { name: 'Plain language description', status: selectedModel?.labelingInfo.fdaCompliant },
        { name: 'Patient disclosure enabled', status: selectedModel?.labelingInfo.patientDisclosure.enabled },
        { name: 'Clinician guidance documented', status: true },
      ]
    },
    {
      category: 'Performance Monitoring',
      items: [
        { name: 'Real-time monitoring active', status: (selectedModel?.performanceMetrics?.length ?? 0) > 0 },
        { name: 'Drift detection enabled', status: true },
        { name: 'Alert thresholds configured', status: true },
      ]
    },
    {
      category: 'Documentation',
      items: [
        { name: 'Training data documented', status: true },
        { name: 'Bias assessment completed', status: true },
        { name: 'Risk mitigation strategies', status: (selectedModel?.riskMitigationStrategies?.length ?? 0) > 0 },
      ]
    }
  ]

  const overallComplianceScore = useMemo(() => {
    const totalItems = complianceChecklist.reduce((sum, cat) => sum + cat.items.length, 0)
    const completedItems = complianceChecklist.reduce(
      (sum, cat) => sum + cat.items.filter(item => item.status).length,
      0
    )
    return Math.round((completedItems / totalItems) * 100)
  }, [complianceChecklist])

  const getActionBadge = (action: string) => {
    const variants: Record<string, { color: string; icon: any }> = {
      'Model Registered': { color: 'bg-blue-100 text-blue-700', icon: FileText },
      'Version Updated': { color: 'bg-purple-100 text-purple-700', icon: TrendingUp },
      'Performance Evaluated': { color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
      'PCCP Modified': { color: 'bg-amber-100 text-amber-700', icon: AlertTriangle },
      'FDA Submission': { color: 'bg-indigo-100 text-indigo-700', icon: FileCheck },
      'Audit Performed': { color: 'bg-gray-100 text-gray-700', icon: Shield },
      'Issue Identified': { color: 'bg-red-100 text-red-700', icon: AlertCircle },
      'Issue Resolved': { color: 'bg-green-100 text-green-700', icon: CheckSquare },
    }

    const config = variants[action] || { color: 'bg-gray-100 text-gray-700', icon: FileText }
    const Icon = config.icon

    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {action}
      </Badge>
    )
  }

  const handleViewAuditDetails = (log: AuditLog) => {
    setSelectedAuditLog(log)
    setIsDetailModalOpen(true)
  }

  const handleGenerateFDAReport = () => {
    // Generate FDA compliance report
    const report = {
      modelName: selectedModel?.modelName,
      generatedDate: new Date().toISOString(),
      complianceScore: selectedModel?.complianceScore,
      fdaStatus: selectedModel?.fdaStatus,
      auditLogsCount: selectedModel?.auditLogs.length,
      checklist: complianceChecklist
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fda-compliance-report-${selectedModel?.id}-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  if (!selectedModel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No model found</p>
      </div>
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
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Compliance Audit & Reporting
                </h1>
                <p className="text-sm text-gray-600">
                  FDA compliance tracking and audit trail management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleGenerateFDAReport}>
                <Download className="h-4 w-4 mr-2" />
                Generate FDA Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Model Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Select AI Model
            </CardTitle>
            <CardDescription>
              Choose a model to view its compliance audit trail
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedModelId} onValueChange={setSelectedModelId}>
              <SelectTrigger className="w-full h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sampleAIModels.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{model.modelName}</span>
                      <span className="text-xs text-gray-500 ml-4">v{model.modelVersion}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Compliance Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Overall Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-4xl font-bold ${
                    selectedModel.complianceScore >= 95 ? 'text-green-600' :
                    selectedModel.complianceScore >= 85 ? 'text-blue-600' :
                    selectedModel.complianceScore >= 75 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {selectedModel.complianceScore}%
                  </div>
                  <Progress value={selectedModel.complianceScore} className="mt-2" />
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Last Audit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedModel.lastAuditDate
                      ? new Date(selectedModel.lastAuditDate).toLocaleDateString()
                      : 'Never'
                    }
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedModel.lastAuditDate
                      ? `${Math.floor((Date.now() - new Date(selectedModel.lastAuditDate).getTime()) / (1000 * 60 * 60 * 24))} days ago`
                      : 'No audit performed'
                    }
                  </p>
                </div>
                <div className="p-4 bg-blue-100 rounded-xl">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Next Audit Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedModel.nextAuditDue
                      ? new Date(selectedModel.nextAuditDue).toLocaleDateString()
                      : 'Not scheduled'
                    }
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedModel.nextAuditDue
                      ? `${Math.floor((new Date(selectedModel.nextAuditDue).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining`
                      : 'Schedule required'
                    }
                  </p>
                </div>
                <div className="p-4 bg-amber-100 rounded-xl">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="audit-trail" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
            <TabsTrigger value="compliance-checklist">Compliance Checklist</TabsTrigger>
            <TabsTrigger value="outstanding-issues">Outstanding Issues</TabsTrigger>
          </TabsList>

          {/* Audit Trail Tab */}
          <TabsContent value="audit-trail">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Audit Trail
                    </CardTitle>
                    <CardDescription>
                      Complete history of model changes and compliance activities
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {filteredAuditLogs.length} events
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search audit logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="Model Registered">Model Registered</SelectItem>
                      <SelectItem value="Version Updated">Version Updated</SelectItem>
                      <SelectItem value="Performance Evaluated">Performance Evaluated</SelectItem>
                      <SelectItem value="PCCP Modified">PCCP Modified</SelectItem>
                      <SelectItem value="FDA Submission">FDA Submission</SelectItem>
                      <SelectItem value="Audit Performed">Audit Performed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Audit Logs Table */}
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Performed By</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAuditLogs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                            No audit logs found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAuditLogs.map((log) => (
                          <TableRow key={log.id} className="hover:bg-gray-50 transition-colors">
                            <TableCell className="font-mono text-sm">
                              {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {getActionBadge(log.action)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{log.performedBy}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs text-gray-600">
                              {log.ipAddress}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewAuditDetails(log)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Checklist Tab */}
          <TabsContent value="compliance-checklist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5" />
                  FDA Compliance Checklist
                </CardTitle>
                <CardDescription>
                  Verify all regulatory requirements are met
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {complianceChecklist.map((category, catIdx) => (
                  <div key={catIdx}>
                    <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
                    <div className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-700">{item.name}</span>
                          {item.status ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Overall Completion</span>
                    <span className={`text-2xl font-bold ${
                      overallComplianceScore >= 95 ? 'text-green-600' :
                      overallComplianceScore >= 85 ? 'text-blue-600' :
                      'text-amber-600'
                    }`}>
                      {overallComplianceScore}%
                    </span>
                  </div>
                  <Progress value={overallComplianceScore} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outstanding Issues Tab */}
          <TabsContent value="outstanding-issues">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Outstanding Issues
                </CardTitle>
                <CardDescription>
                  Issues requiring attention and resolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedModel.outstandingIssues.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900">No Outstanding Issues</p>
                    <p className="text-sm text-gray-600">All compliance requirements are met</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedModel.outstandingIssues.map((issue) => (
                      <Card key={issue.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Badge variant={issue.severity === 'Critical' ? 'destructive' : 'secondary'}>
                                {issue.severity}
                              </Badge>
                              <Badge variant="outline">{issue.issueType}</Badge>
                              <Badge variant={
                                issue.status === 'Resolved' ? 'default' :
                                issue.status === 'In Progress' ? 'secondary' : 'outline'
                              }>
                                {issue.status}
                              </Badge>
                            </div>
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-2">{issue.title}</h5>
                          <p className="text-sm text-gray-700 mb-3">{issue.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                            <div>
                              <span className="font-medium">Identified:</span>{' '}
                              {new Date(issue.identifiedDate).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Target Resolution:</span>{' '}
                              {new Date(issue.targetResolutionDate).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Assigned To:</span> {issue.assignedTo}
                            </div>
                            {issue.resolutionNotes && (
                              <div className="col-span-2">
                                <span className="font-medium">Resolution Notes:</span>{' '}
                                {issue.resolutionNotes}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Audit Log Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          {selectedAuditLog && (
            <>
              <DialogHeader>
                <DialogTitle>Audit Log Details</DialogTitle>
                <DialogDescription>
                  Full details of this audit event
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-600 mb-1">Action</h5>
                    {getActionBadge(selectedAuditLog.action)}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-600 mb-1">Timestamp</h5>
                    <p className="text-sm font-mono">{new Date(selectedAuditLog.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-600 mb-1">Performed By</h5>
                    <p className="text-sm">{selectedAuditLog.performedBy}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-600 mb-1">IP Address</h5>
                    <p className="text-sm font-mono">{selectedAuditLog.ipAddress}</p>
                  </div>
                </div>
                {selectedAuditLog.details && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-600 mb-1">Details</h5>
                    <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                      {selectedAuditLog.details}
                    </p>
                  </div>
                )}
                {selectedAuditLog.changesApplied && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-600 mb-2">Changes Applied</h5>
                    <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedAuditLog.changesApplied, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

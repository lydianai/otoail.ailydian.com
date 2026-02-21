'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Shield,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  BarChart3,
  Activity,
  Bell,
  Settings,
  ChevronRight,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DemoBanner from '@/components/DemoBanner'
import { AIModelCard } from '@/components/compliance/AIModelCard'
import {
  sampleAIModels,
  getAIModelsByStatus,
  getAIModelsByRiskClass,
  getOutstandingIssues,
  getModelsRequiringAudit,
  getActiveSubmissions,
  calculateOverallComplianceScore,
  type AIModelRegistration
} from '@/lib/data/fda-ai-compliance'

export default function FDAAIComplianceDashboard() {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState<AIModelRegistration | null>(null)

  // Statistics
  const approvedModels = getAIModelsByStatus('Approved')
  const inReviewModels = getAIModelsByStatus('In Review')
  const notSubmittedModels = getAIModelsByStatus('Not Submitted')
  const highRiskModels = getAIModelsByRiskClass('High')
  const outstandingIssues = getOutstandingIssues()
  const modelsRequiringAudit = getModelsRequiringAudit()
  const activeSubmissions = getActiveSubmissions()
  const overallCompliance = calculateOverallComplianceScore()

  const handleViewModelDetails = (modelId: string) => {
    router.push(`/en/compliance/ai-devices/registry?model=${modelId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <DemoBanner />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  FDA AI/ML Compliance Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  January 2025 Draft Guidance Compliance Management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {outstandingIssues.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 rounded-full text-xs text-white flex items-center justify-center">
                    {outstandingIssues.length}
                  </span>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => router.push('/en/compliance/ai-devices/registry')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Register New AI Model
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Compliance Score */}
          <Card className="border-2 hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Overall Compliance
                </CardTitle>
                <Shield className={`h-5 w-5 ${
                  overallCompliance >= 95 ? 'text-green-600' :
                  overallCompliance >= 85 ? 'text-blue-600' :
                  overallCompliance >= 75 ? 'text-amber-600' : 'text-red-600'
                }`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold mb-2 ${
                overallCompliance >= 95 ? 'text-green-600' :
                overallCompliance >= 85 ? 'text-blue-600' :
                overallCompliance >= 75 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {overallCompliance}%
              </div>
              <Progress value={overallCompliance} className="h-2 mb-2" />
              <p className="text-xs text-gray-600">
                {sampleAIModels.length} AI Models Monitored
              </p>
            </CardContent>
          </Card>

          {/* FDA Approved Models */}
          <Card className="border-2 hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  FDA Approved
                </CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {approvedModels.length}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>{inReviewModels.length} In Review</span>
                <span>•</span>
                <span>{notSubmittedModels.length} Not Submitted</span>
              </div>
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto mt-2 text-blue-600"
                onClick={() => router.push('/en/compliance/ai-devices/registry')}
              >
                View All <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* High Risk Models */}
          <Card className="border-2 hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  High Risk Models
                </CardTitle>
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-red-600 mb-2">
                {highRiskModels.length}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                Require Enhanced Monitoring
              </div>
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-blue-600"
                onClick={() => router.push('/en/compliance/ai-devices/monitoring')}
              >
                View Details <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Outstanding Issues */}
          <Card className="border-2 hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Issues & Alerts
                </CardTitle>
                <Bell className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-amber-600 mb-2">
                {outstandingIssues.length}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {modelsRequiringAudit.length} Audits Due
              </div>
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-blue-600"
                onClick={() => router.push('/en/compliance/ai-devices/audit')}
              >
                Review Issues <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="models" className="gap-2">
              <Brain className="h-4 w-4" />
              AI Models ({sampleAIModels.length})
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2">
              <FileText className="h-4 w-4" />
              FDA Submissions ({activeSubmissions.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Critical Alerts */}
            {outstandingIssues.filter(issue => issue.severity === 'Critical' || issue.severity === 'High').length > 0 && (
              <Card className="border-2 border-red-200 bg-red-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <div>
                      <CardTitle className="text-red-900">Critical Compliance Issues</CardTitle>
                      <CardDescription className="text-red-700">
                        Immediate attention required
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {outstandingIssues
                      .filter(issue => issue.severity === 'Critical' || issue.severity === 'High')
                      .slice(0, 3)
                      .map((issue) => (
                        <div key={issue.id} className="p-4 bg-white rounded-lg border border-red-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="destructive">{issue.severity}</Badge>
                                <Badge variant="outline" className="text-xs">{issue.issueType}</Badge>
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-1">{issue.title}</h4>
                              <p className="text-sm text-gray-700">{issue.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                                <span>Identified: {new Date(issue.identifiedDate).toLocaleDateString()}</span>
                                <span>Due: {new Date(issue.targetResolutionDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <Button size="sm">Resolve</Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push('/en/compliance/ai-devices/registry')}>
                <CardHeader>
                  <Brain className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>AI Model Registry</CardTitle>
                  <CardDescription>
                    View and manage all FDA-regulated AI models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{sampleAIModels.length}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push('/en/compliance/ai-devices/labeling')}>
                <CardHeader>
                  <FileText className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>AI Labeling Manager</CardTitle>
                  <CardDescription>
                    Manage patient disclosures and FDA labeling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {sampleAIModels.filter(m => m.labelingInfo.fdaCompliant).length}/{sampleAIModels.length} Compliant
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push('/en/compliance/ai-devices/monitoring')}>
                <CardHeader>
                  <Activity className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Performance Monitoring</CardTitle>
                  <CardDescription>
                    Real-world performance tracking and drift detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Monitoring</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Deadlines */}
            {modelsRequiringAudit.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-amber-600" />
                    <div>
                      <CardTitle>Upcoming Audits & Deadlines</CardTitle>
                      <CardDescription>{modelsRequiringAudit.length} items require attention</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {modelsRequiringAudit.map((model) => (
                      <div key={model.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <div>
                          <h4 className="font-semibold text-gray-900">{model.modelName}</h4>
                          <p className="text-sm text-gray-600">
                            Audit due: {model.nextAuditDue && new Date(model.nextAuditDue).toLocaleDateString()}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">Schedule Audit</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* AI Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sampleAIModels.map((model) => (
                <AIModelCard
                  key={model.id}
                  model={model}
                  onViewDetails={handleViewModelDetails}
                />
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Monitoring</CardTitle>
                <CardDescription>Real-world model performance analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 py-12">
                  Navigate to individual model pages to view detailed performance metrics
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>FDA Submissions</CardTitle>
                <CardDescription>
                  {activeSubmissions.length} active submission{activeSubmissions.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeSubmissions.length > 0 ? (
                  <p className="text-center text-gray-600 py-12">
                    View submission details in the registry
                  </p>
                ) : (
                  <p className="text-center text-gray-600 py-12">
                    No active FDA submissions
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

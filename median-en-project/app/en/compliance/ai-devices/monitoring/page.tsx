'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Calendar,
  Clock,
  Zap,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import DemoBanner from '@/components/DemoBanner'
import { sampleAIModels, type AIModelRegistration, type PerformanceMetric } from '@/lib/data/fda-ai-compliance'

export default function AIModelMonitoringPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const modelIdFromQuery = searchParams.get('model')

  const [selectedModelId, setSelectedModelId] = useState<string>(
    modelIdFromQuery || sampleAIModels[0]?.id || ''
  )
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('30d')
  const [metricType, setMetricType] = useState<'performance' | 'drift' | 'distribution'>('performance')

  const selectedModel = useMemo(
    () => sampleAIModels.find(m => m.id === selectedModelId),
    [selectedModelId]
  )

  const latestMetric = selectedModel?.performanceMetrics[0]

  const getMetricTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0,
      icon: change >= 0 ? TrendingUp : TrendingDown
    }
  }

  const getDriftStatusBadge = (status: PerformanceMetric['driftStatus']) => {
    const variants = {
      'Normal': { color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
      'Warning': { color: 'bg-amber-100 text-amber-700', icon: AlertTriangle },
      'Critical': { color: 'bg-red-100 text-red-700', icon: AlertCircle }
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
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Real-Time Performance Monitoring
                </h1>
                <p className="text-sm text-gray-600">
                  AI model drift detection and performance tracking
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Model Selector */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Select AI Model
                </CardTitle>
                <CardDescription>
                  Choose a model to monitor its real-time performance metrics
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Select value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                      <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {latestMetric && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {(latestMetric.accuracy * 100).toFixed(1)}%
                      </div>
                      {selectedModel.performanceMetrics.length > 1 && (
                        <div className={`flex items-center gap-1 mt-1 text-sm ${
                          latestMetric.accuracy >= selectedModel.performanceMetrics[1].accuracy
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                          {latestMetric.accuracy >= selectedModel.performanceMetrics[1].accuracy ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>
                            {Math.abs((latestMetric.accuracy - selectedModel.performanceMetrics[1].accuracy) * 100).toFixed(2)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Sensitivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {(latestMetric.sensitivity * 100).toFixed(1)}%
                      </div>
                      {selectedModel.performanceMetrics.length > 1 && (
                        <div className={`flex items-center gap-1 mt-1 text-sm ${
                          latestMetric.sensitivity >= selectedModel.performanceMetrics[1].sensitivity
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                          {latestMetric.sensitivity >= selectedModel.performanceMetrics[1].sensitivity ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>
                            {Math.abs((latestMetric.sensitivity - selectedModel.performanceMetrics[1].sensitivity) * 100).toFixed(2)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <LineChart className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Specificity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {(latestMetric.specificity * 100).toFixed(1)}%
                      </div>
                      {selectedModel.performanceMetrics.length > 1 && (
                        <div className={`flex items-center gap-1 mt-1 text-sm ${
                          latestMetric.specificity >= selectedModel.performanceMetrics[1].specificity
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                          {latestMetric.specificity >= selectedModel.performanceMetrics[1].specificity ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>
                            {Math.abs((latestMetric.specificity - selectedModel.performanceMetrics[1].specificity) * 100).toFixed(2)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <PieChart className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Drift Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {(latestMetric.driftScore * 100).toFixed(1)}%
                      </div>
                      {getDriftStatusBadge(latestMetric.driftStatus)}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      latestMetric.driftStatus === 'Normal' ? 'bg-green-100' :
                      latestMetric.driftStatus === 'Warning' ? 'bg-amber-100' : 'bg-red-100'
                    }`}>
                      <Zap className={`h-6 w-6 ${
                        latestMetric.driftStatus === 'Normal' ? 'text-green-600' :
                        latestMetric.driftStatus === 'Warning' ? 'text-amber-600' : 'text-red-600'
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Detailed Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics Timeline</CardTitle>
            <CardDescription>
              Historical performance data and drift detection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="performance" value={metricType} onValueChange={(v) => setMetricType(v as any)}>
              <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="drift">Drift Analysis</TabsTrigger>
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-4">
                {selectedModel.performanceMetrics.map((metric, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <CardTitle className="text-base">
                            {new Date(metric.recordedDate).toLocaleDateString()}
                          </CardTitle>
                          <Badge variant="outline">{metric.environment}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {metric.totalSamples.toLocaleString()} samples
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Accuracy</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {(metric.accuracy * 100).toFixed(1)}%
                          </div>
                          <Progress value={metric.accuracy * 100} className="mt-2" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Precision</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {(metric.precision * 100).toFixed(1)}%
                          </div>
                          <Progress value={metric.precision * 100} className="mt-2" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Recall</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {(metric.recall * 100).toFixed(1)}%
                          </div>
                          <Progress value={metric.recall * 100} className="mt-2" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">F1 Score</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {(metric.f1Score * 100).toFixed(1)}%
                          </div>
                          <Progress value={metric.f1Score * 100} className="mt-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="drift" className="space-y-4">
                {selectedModel.performanceMetrics.map((metric, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <CardTitle className="text-base">
                            {new Date(metric.recordedDate).toLocaleDateString()}
                          </CardTitle>
                          {getDriftStatusBadge(metric.driftStatus)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Drift Score</span>
                            <span className={`text-sm font-bold ${
                              metric.driftScore < 0.3 ? 'text-green-600' :
                              metric.driftScore < 0.6 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {(metric.driftScore * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={metric.driftScore * 100} className="h-3" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Drift Type:</span>
                          <Badge variant="outline" className="ml-2">{metric.driftType}</Badge>
                        </div>
                        {metric.alerts.length > 0 && (
                          <div className="mt-4">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Active Alerts</h5>
                            <div className="space-y-2">
                              {metric.alerts.map((alert, alertIdx) => (
                                <div
                                  key={alertIdx}
                                  className={`p-3 rounded-lg border ${
                                    alert.severity === 'Critical' ? 'bg-red-50 border-red-200' :
                                    alert.severity === 'High' ? 'bg-orange-50 border-orange-200' :
                                    alert.severity === 'Medium' ? 'bg-amber-50 border-amber-200' :
                                    'bg-blue-50 border-blue-200'
                                  }`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Badge variant={alert.severity === 'Critical' ? 'destructive' : 'secondary'}>
                                          {alert.severity}
                                        </Badge>
                                        <span className="text-sm font-medium">{alert.type}</span>
                                      </div>
                                      <p className="text-sm text-gray-700">{alert.description}</p>
                                    </div>
                                    {alert.resolved ? (
                                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : (
                                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="distribution" className="space-y-4">
                {selectedModel.performanceMetrics.map((metric, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <CardTitle className="text-base">
                          {new Date(metric.recordedDate).toLocaleDateString()}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-3">Output Distribution</h5>
                          <div className="space-y-2">
                            {metric.outputDistribution.map((dist, distIdx) => (
                              <div key={distIdx} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{dist.class}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">{dist.percentage.toFixed(1)}%</span>
                                    <Badge variant="outline" className="text-xs">
                                      {dist.trend}
                                    </Badge>
                                  </div>
                                </div>
                                <Progress value={dist.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-3">Demographic Breakdown</h5>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {metric.demographicBreakdown.slice(0, 6).map((demo, demoIdx) => (
                              <div key={demoIdx} className="p-3 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-600">{demo.category}</div>
                                <div className="text-sm font-semibold text-gray-900 mt-1">{demo.subcategory}</div>
                                <div className="text-xs text-gray-600 mt-1">
                                  {demo.count.toLocaleString()} samples
                                </div>
                                <div className="text-xs font-semibold text-blue-600 mt-1">
                                  {(demo.performanceMetric * 100).toFixed(1)}% accuracy
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PerformanceMetric } from '@/lib/data/fda-ai-compliance'
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

interface PerformanceChartProps {
  metrics: PerformanceMetric[]
  modelName: string
}

export function PerformanceChart({ metrics, modelName }: PerformanceChartProps) {
  if (metrics.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Monitoring</CardTitle>
          <CardDescription>No performance data available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const latestMetric = metrics[0]
  const previousMetric = metrics[1]

  const calculateTrend = (current: number, previous?: number) => {
    if (!previous) return 0
    return ((current - previous) / previous) * 100
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <div className="h-4 w-4" />
  }

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600'
    if (trend < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const metricCards = [
    {
      label: 'Sensitivity',
      value: latestMetric.sensitivity,
      trend: previousMetric ? calculateTrend(latestMetric.sensitivity, previousMetric.sensitivity) : 0,
      target: 0.92,
      color: 'green'
    },
    {
      label: 'Specificity',
      value: latestMetric.specificity,
      trend: previousMetric ? calculateTrend(latestMetric.specificity, previousMetric.specificity) : 0,
      target: 0.88,
      color: 'blue'
    },
    {
      label: 'Precision',
      value: latestMetric.precision,
      trend: previousMetric ? calculateTrend(latestMetric.precision, previousMetric.precision) : 0,
      target: 0.85,
      color: 'purple'
    },
    {
      label: 'AUC',
      value: latestMetric.auc,
      trend: previousMetric ? calculateTrend(latestMetric.auc, previousMetric.auc) : 0,
      target: 0.90,
      color: 'indigo'
    },
    {
      label: 'F1 Score',
      value: latestMetric.f1Score,
      trend: previousMetric ? calculateTrend(latestMetric.f1Score, previousMetric.f1Score) : 0,
      target: 0.85,
      color: 'pink'
    },
    {
      label: 'Accuracy',
      value: latestMetric.accuracy,
      trend: previousMetric ? calculateTrend(latestMetric.accuracy, previousMetric.accuracy) : 0,
      target: 0.90,
      color: 'cyan'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Monitoring</CardTitle>
            <CardDescription>
              Real-world performance metrics for {modelName}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-600">Latest Report</div>
            <div className="text-sm text-gray-900">
              {new Date(latestMetric.recordedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Drift Status Alert */}
        {latestMetric.driftStatus !== 'Normal' && (
          <div className={`mt-4 p-4 rounded-lg border-l-4 ${
            latestMetric.driftStatus === 'Critical'
              ? 'bg-red-50 border-l-red-600'
              : 'bg-amber-50 border-l-amber-600'
          }`}>
            <div className="flex items-center gap-3">
              <AlertTriangle className={`h-5 w-5 ${
                latestMetric.driftStatus === 'Critical' ? 'text-red-600' : 'text-amber-600'
              }`} />
              <div>
                <div className="font-semibold text-gray-900">
                  Model Drift Detected: {latestMetric.driftStatus}
                </div>
                <div className="text-sm text-gray-700">
                  Drift Score: {(latestMetric.driftScore * 100).toFixed(1)}% | Type: {latestMetric.driftType}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metricCards.map((metric) => {
            const isAboveTarget = metric.value >= metric.target
            const percentage = (metric.value * 100).toFixed(1)

            return (
              <div
                key={metric.label}
                className={`p-4 rounded-xl border-2 ${
                  isAboveTarget
                    ? `bg-${metric.color}-50 border-${metric.color}-200`
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium ${
                    isAboveTarget ? `text-${metric.color}-600` : 'text-gray-600'
                  }`}>
                    {metric.label}
                  </span>
                  {metric.trend !== 0 && (
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
                        {Math.abs(metric.trend).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
                <div className={`text-2xl font-bold ${
                  isAboveTarget ? `text-${metric.color}-700` : 'text-gray-700'
                }`}>
                  {percentage}%
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Target: {(metric.target * 100).toFixed(0)}%
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      isAboveTarget ? `bg-${metric.color}-600` : 'bg-gray-400'
                    }`}
                    style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Confusion Matrix */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Confusion Matrix</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs font-medium text-green-600 mb-1">True Positives</div>
              <div className="text-2xl font-bold text-green-700">
                {(latestMetric.truePositiveRate * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-green-600 mt-1">Correct positive predictions</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs font-medium text-green-600 mb-1">True Negatives</div>
              <div className="text-2xl font-bold text-green-700">
                {(latestMetric.trueNegativeRate * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-green-600 mt-1">Correct negative predictions</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xs font-medium text-red-600 mb-1">False Positives</div>
              <div className="text-2xl font-bold text-red-700">
                {(latestMetric.falsePositiveRate * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-red-600 mt-1">Incorrect positive predictions</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xs font-medium text-red-600 mb-1">False Negatives</div>
              <div className="text-2xl font-bold text-red-700">
                {(latestMetric.falseNegativeRate * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-red-600 mt-1">Missed positive cases</div>
            </div>
          </div>
        </div>

        {/* Sample Statistics */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Dataset Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-600 mb-1">Total Samples</div>
              <div className="text-lg font-bold text-gray-900">
                {latestMetric.totalSamples.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Environment</div>
              <div className="text-lg font-bold text-gray-900">{latestMetric.environment}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Demographics</div>
              <div className="text-lg font-bold text-gray-900">
                {latestMetric.demographicBreakdown.length} groups
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Alerts</div>
              <div className="text-lg font-bold text-gray-900">
                {latestMetric.alerts.length}
              </div>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        {latestMetric.alerts.filter(a => !a.resolved).length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Active Alerts</h4>
            <div className="space-y-2">
              {latestMetric.alerts
                .filter(alert => !alert.resolved)
                .map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'Critical' ? 'bg-red-50 border-l-red-600' :
                      alert.severity === 'High' ? 'bg-orange-50 border-l-orange-600' :
                      alert.severity === 'Medium' ? 'bg-amber-50 border-l-amber-600' :
                      'bg-blue-50 border-l-blue-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={
                              alert.severity === 'Critical' ? 'bg-red-100 text-red-800 border-red-200' :
                              alert.severity === 'High' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                              alert.severity === 'Medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                              'bg-blue-100 text-blue-800 border-blue-200'
                            }
                          >
                            {alert.severity}
                          </Badge>
                          <span className="text-xs font-medium text-gray-600">{alert.type}</span>
                        </div>
                        <p className="text-sm text-gray-900">{alert.description}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Triggered: {new Date(alert.triggeredDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Demographic Performance Breakdown */}
        {latestMetric.demographicBreakdown.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Performance by Demographics</h4>
            <div className="space-y-2">
              {latestMetric.demographicBreakdown.map((demo, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">
                      {demo.category}: {demo.subcategory}
                    </div>
                    <div className="text-xs text-gray-600">
                      {demo.count.toLocaleString()} samples
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {(demo.performanceMetric * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">Performance</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

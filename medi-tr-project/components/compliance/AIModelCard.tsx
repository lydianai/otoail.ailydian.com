'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AIModelRegistration } from '@/lib/data/fda-ai-compliance'
import { CheckCircle2, AlertTriangle, XCircle, Clock, ExternalLink, Shield, TrendingUp, FileText } from 'lucide-react'

// Simple date formatter
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

interface AIModelCardProps {
  model: AIModelRegistration
  onViewDetails?: (modelId: string) => void
}

export function AIModelCard({ model, onViewDetails }: AIModelCardProps) {
  const getStatusIcon = (status: AIModelRegistration['fdaStatus']) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'In Review':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'Not Submitted':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'Withdrawn':
        return <XCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: AIModelRegistration['fdaStatus']) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'In Review':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Not Submitted':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Withdrawn':
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRiskClassColor = (riskClass: AIModelRegistration['riskClass']) => {
    switch (riskClass) {
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  const getComplianceScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600'
    if (score >= 85) return 'text-blue-600'
    if (score >= 75) return 'text-amber-600'
    return 'text-red-600'
  }

  const latestPerformance = model.performanceMetrics[0]

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 border-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl">{model.modelName}</CardTitle>
              <Badge variant="outline" className="text-xs">
                v{model.modelVersion}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {model.intendedUse}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(model.fdaStatus)}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge className={getStatusColor(model.fdaStatus)}>
            {model.fdaStatus}
          </Badge>
          <Badge className={getRiskClassColor(model.riskClass)} variant="outline">
            <Shield className="h-3 w-3 mr-1" />
            {model.riskClass} Risk
          </Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {model.deviceClassification}
          </Badge>
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
            {model.regulatoryPathway}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Compliance Score */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Compliance Score</div>
              <div className={`text-2xl font-bold ${getComplianceScoreColor(model.complianceScore)}`}>
                {model.complianceScore}%
              </div>
            </div>
          </div>
          {model.outstandingIssues.length > 0 && (
            <Badge variant="destructive" className="text-xs">
              {model.outstandingIssues.length} Issue{model.outstandingIssues.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        {/* Performance Metrics (if available) */}
        {latestPerformance && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs font-medium text-green-600 mb-1">Sensitivity</div>
              <div className="text-lg font-bold text-green-700">
                {(latestPerformance.sensitivity * 100).toFixed(1)}%
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs font-medium text-blue-600 mb-1">Specificity</div>
              <div className="text-lg font-bold text-blue-700">
                {(latestPerformance.specificity * 100).toFixed(1)}%
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-xs font-medium text-purple-600 mb-1">AUC</div>
              <div className="text-lg font-bold text-purple-700">
                {latestPerformance.auc.toFixed(3)}
              </div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-xs font-medium text-amber-600 mb-1">Drift Status</div>
              <div className="text-sm font-bold text-amber-700">
                {latestPerformance.driftStatus}
              </div>
            </div>
          </div>
        )}

        {/* Deployment Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Deployment Status:</span>
            <Badge
              variant="outline"
              className={
                model.deploymentEnvironment === 'Production'
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-gray-100 text-gray-800 border-gray-200'
              }
            >
              {model.deploymentEnvironment}
            </Badge>
          </div>
          {model.deploymentDate && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Deployed:</span>
              <span className="font-medium text-gray-900">
                {formatDate(new Date(model.deploymentDate))}
              </span>
            </div>
          )}
          {model.approvalDate && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">FDA Approved:</span>
              <span className="font-medium text-gray-900">
                {formatDate(new Date(model.approvalDate))}
              </span>
            </div>
          )}
          {model.nextAuditDue && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Next Audit:</span>
              <span className={`font-medium ${
                new Date(model.nextAuditDue) < new Date() ? 'text-red-600' : 'text-gray-900'
              }`}>
                {formatDate(new Date(model.nextAuditDue))}
              </span>
            </div>
          )}
        </div>

        {/* PCCP Status */}
        {model.pccp && (
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-900">PCCP Status</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-700">
                {model.pccp.allowedModifications.length} Allowed Modifications
              </span>
              <Badge
                variant="outline"
                className={
                  model.pccp.status === 'Active'
                    ? 'bg-green-100 text-green-800 border-green-200'
                    : 'bg-gray-100 text-gray-800 border-gray-200'
                }
              >
                {model.pccp.status}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          onClick={() => onViewDetails?.(model.id)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          View Details
        </Button>
        {model.fdaStatus === 'Approved' && model.approvalDate && (
          <Button variant="outline" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

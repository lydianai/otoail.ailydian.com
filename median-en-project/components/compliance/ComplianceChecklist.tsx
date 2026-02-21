'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Circle, AlertTriangle, Clock } from 'lucide-react'
import { AIModelRegistration } from '@/lib/data/fda-ai-compliance'

interface ComplianceChecklistProps {
  model: AIModelRegistration
}

interface ChecklistItem {
  id: string
  category: string
  requirement: string
  status: 'complete' | 'incomplete' | 'warning' | 'pending'
  details?: string
}

export function ComplianceChecklist({ model }: ComplianceChecklistProps) {
  const getChecklistItems = (): ChecklistItem[] => {
    const items: ChecklistItem[] = []

    // FDA Submission Status
    items.push({
      id: 'fda-submission',
      category: 'FDA Submission',
      requirement: 'FDA Regulatory Submission',
      status: model.fdaStatus === 'Approved' ? 'complete' :
              model.fdaStatus === 'In Review' ? 'pending' :
              model.fdaStatus === 'Rejected' ? 'warning' : 'incomplete',
      details: `Status: ${model.fdaStatus}`
    })

    // PCCP Requirement
    if (model.deviceClassification === 'Class II' || model.deviceClassification === 'Class III') {
      items.push({
        id: 'pccp',
        category: 'PCCP',
        requirement: 'Predetermined Change Control Plan (PCCP)',
        status: model.pccp ?
                model.pccp.status === 'Active' ? 'complete' :
                model.pccp.status === 'Approved' ? 'complete' :
                model.pccp.status === 'Submitted' ? 'pending' : 'warning' : 'incomplete',
        details: model.pccp ? `PCCP ${model.pccp.status}` : 'PCCP required but not submitted'
      })
    }

    // Labeling Compliance
    items.push({
      id: 'labeling',
      category: 'Labeling',
      requirement: 'FDA-Compliant AI Labeling',
      status: model.labelingInfo.fdaCompliant ? 'complete' : 'warning',
      details: `Last updated: ${new Date(model.labelingInfo.lastUpdated).toLocaleDateString()}`
    })

    // Patient Disclosure
    items.push({
      id: 'patient-disclosure',
      category: 'Labeling',
      requirement: 'Patient-Facing Disclosure',
      status: model.labelingInfo.patientDisclosure.enabled ? 'complete' : 'incomplete',
      details: model.labelingInfo.patientDisclosure.enabled ?
               `Available in ${model.labelingInfo.patientDisclosure.languagesAvailable.length} language(s)` :
               'Patient disclosure not configured'
    })

    // Performance Monitoring
    items.push({
      id: 'performance-monitoring',
      category: 'Performance',
      requirement: 'Real-World Performance Monitoring',
      status: model.performanceMetrics.length > 0 ? 'complete' : 'incomplete',
      details: model.performanceMetrics.length > 0 ?
               `${model.performanceMetrics.length} performance reports` :
               'No performance data recorded'
    })

    // Model Drift Detection
    if (model.performanceMetrics.length > 0) {
      const latestMetric = model.performanceMetrics[0]
      items.push({
        id: 'drift-detection',
        category: 'Performance',
        requirement: 'Model Drift Monitoring',
        status: latestMetric.driftStatus === 'Normal' ? 'complete' :
                latestMetric.driftStatus === 'Warning' ? 'warning' :
                latestMetric.driftStatus === 'Critical' ? 'warning' : 'incomplete',
        details: `Drift Status: ${latestMetric.driftStatus} (Score: ${(latestMetric.driftScore * 100).toFixed(1)}%)`
      })
    }

    // Audit Trail
    items.push({
      id: 'audit',
      category: 'Audit',
      requirement: 'Regular Compliance Audits',
      status: model.lastAuditDate ?
              new Date(model.nextAuditDue!) > new Date() ? 'complete' : 'warning' :
              'incomplete',
      details: model.lastAuditDate ?
               `Last audit: ${new Date(model.lastAuditDate).toLocaleDateString()}` :
               'No audit performed'
    })

    // Outstanding Issues
    items.push({
      id: 'outstanding-issues',
      category: 'Issues',
      requirement: 'No Outstanding Compliance Issues',
      status: model.outstandingIssues.length === 0 ? 'complete' : 'warning',
      details: model.outstandingIssues.length > 0 ?
               `${model.outstandingIssues.length} issue(s) require attention` :
               'No outstanding issues'
    })

    // Training Data Documentation
    items.push({
      id: 'training-data',
      category: 'Documentation',
      requirement: 'Training Data Documentation',
      status: model.trainingDataset.size > 0 ? 'complete' : 'incomplete',
      details: `Dataset size: ${model.trainingDataset.size.toLocaleString()} samples`
    })

    // Bias Assessment
    items.push({
      id: 'bias-assessment',
      category: 'Documentation',
      requirement: 'Bias and Fairness Assessment',
      status: model.trainingDataset.biasAssessment ? 'complete' : 'incomplete',
      details: model.trainingDataset.biasAssessment || 'Bias assessment not documented'
    })

    // Risk Management
    items.push({
      id: 'risk-management',
      category: 'Risk Management',
      requirement: 'Risk Mitigation Strategies',
      status: model.riskMitigationStrategies.length > 0 ? 'complete' : 'incomplete',
      details: `${model.riskMitigationStrategies.length} strategy(ies) documented`
    })

    // Version Control
    items.push({
      id: 'version-control',
      category: 'Version Control',
      requirement: 'Complete Change History',
      status: model.changeLog.length > 0 ? 'complete' : 'incomplete',
      details: `${model.changeLog.length} version(s) documented`
    })

    return items
  }

  const checklistItems = getChecklistItems()
  const completeCount = checklistItems.filter(item => item.status === 'complete').length
  const totalCount = checklistItems.length
  const completionPercentage = Math.round((completeCount / totalCount) * 100)

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'incomplete':
        return <Circle className="h-5 w-5 text-gray-400" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-blue-600" />
    }
  }

  const getStatusColor = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'complete':
        return 'border-l-green-600 bg-green-50'
      case 'incomplete':
        return 'border-l-gray-400 bg-gray-50'
      case 'warning':
        return 'border-l-amber-600 bg-amber-50'
      case 'pending':
        return 'border-l-blue-600 bg-blue-50'
    }
  }

  // Group items by category
  const categories = Array.from(new Set(checklistItems.map(item => item.category)))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>FDA Compliance Checklist</CardTitle>
            <CardDescription>
              Regulatory requirements for {model.modelName} v{model.modelVersion}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{completionPercentage}%</div>
            <div className="text-sm text-gray-600">{completeCount}/{totalCount} Complete</div>
          </div>
        </div>
        <Progress value={completionPercentage} className="h-2 mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {categories.map(category => {
          const categoryItems = checklistItems.filter(item => item.category === category)
          const categoryComplete = categoryItems.filter(item => item.status === 'complete').length

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{category}</h4>
                <Badge variant="outline" className="text-xs">
                  {categoryComplete}/{categoryItems.length}
                </Badge>
              </div>

              <div className="space-y-2">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border-l-4 transition-all ${getStatusColor(item.status)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-medium text-gray-900 text-sm">
                            {item.requirement}
                          </h5>
                          {item.status === 'complete' && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              Compliant
                            </Badge>
                          )}
                          {item.status === 'warning' && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                              Action Needed
                            </Badge>
                          )}
                          {item.status === 'pending' && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                              In Progress
                            </Badge>
                          )}
                        </div>
                        {item.details && (
                          <p className="text-xs text-gray-600 mt-1">{item.details}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

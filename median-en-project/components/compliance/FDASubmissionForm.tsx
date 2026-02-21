'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FDASubmission } from '@/lib/data/fda-ai-compliance'
import { FileText, Clock, CheckCircle2, AlertCircle, Send, Calendar, MessageSquare } from 'lucide-react'

// Simple date formatter
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

interface FDASubmissionFormProps {
  submissions: FDASubmission[]
  modelName: string
}

export function FDASubmissionForm({ submissions, modelName }: FDASubmissionFormProps) {
  const getStatusColor = (status: FDASubmission['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Submitted':
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Preparing':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Additional Info Requested':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  const getStatusIcon = (status: FDASubmission['status']) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'Submitted':
      case 'Under Review':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'Preparing':
        return <FileText className="h-5 w-5 text-gray-600" />
      case 'Additional Info Requested':
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case 'Rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getSubmissionTypeColor = (type: FDASubmission['submissionType']) => {
    switch (type) {
      case '510(k)':
      case 'PMA':
      case 'De Novo':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Annual Report':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'PCCP Update':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'Adverse Event':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Recall':
        return 'bg-orange-100 text-orange-800 border-orange-200'
    }
  }

  if (submissions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>FDA Submissions</CardTitle>
          <CardDescription>No FDA submissions recorded</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No submissions have been created yet</p>
            <Button className="mt-4">Create New Submission</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {submissions.map((submission) => (
        <Card key={submission.id} className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl">{modelName}</CardTitle>
                  <Badge variant="outline" className={getSubmissionTypeColor(submission.submissionType)}>
                    {submission.submissionType}
                  </Badge>
                </div>
                {submission.fdaSubmissionNumber && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Submission Number:</span>
                    <span className="font-mono font-semibold text-gray-900">
                      {submission.fdaSubmissionNumber}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(submission.status)}
                <Badge className={getStatusColor(submission.status)}>
                  {submission.status}
                </Badge>
              </div>
            </div>

            {/* Reviewer Info */}
            {(submission.leadReviewer || submission.reviewDivision) && (
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                {submission.leadReviewer && (
                  <div>
                    <span className="text-gray-600">Lead Reviewer:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {submission.leadReviewer}
                    </span>
                  </div>
                )}
                {submission.reviewDivision && (
                  <div>
                    <span className="text-gray-600">Division:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {submission.reviewDivision}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Timeline */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Submission Timeline
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Submission Date</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(new Date(submission.submissionDate))}
                  </span>
                </div>
                {submission.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      milestone.status === 'Completed'
                        ? 'bg-green-50'
                        : milestone.status === 'Delayed'
                        ? 'bg-amber-50'
                        : milestone.status === 'Blocked'
                        ? 'bg-red-50'
                        : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{milestone.name}</span>
                        <Badge
                          variant="outline"
                          className={
                            milestone.status === 'Completed'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : milestone.status === 'Delayed'
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : milestone.status === 'Blocked'
                              ? 'bg-red-100 text-red-800 border-red-200'
                              : 'bg-blue-100 text-blue-800 border-blue-200'
                          }
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Target: {formatDate(new Date(milestone.targetDate))}
                        {milestone.actualDate && (
                          <span className="ml-2">
                            | Actual: {formatDate(new Date(milestone.actualDate))}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Submission Documents
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {submission.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="h-5 w-5 text-gray-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {doc.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {doc.type} | v{doc.version} | {(doc.fileSize / 1024 / 1024).toFixed(1)} MB
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        doc.status === 'Submitted'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : doc.status === 'Final'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }
                    >
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Communications */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Communication History
              </h4>
              <div className="space-y-3">
                {submission.communications.slice(0, 5).map((comm, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      comm.type === 'FDA Question'
                        ? 'bg-amber-50 border-l-amber-600'
                        : comm.type === 'Decision Letter'
                        ? 'bg-green-50 border-l-green-600'
                        : 'bg-blue-50 border-l-blue-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                      comm.type === 'FDA Question'
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : comm.type === 'Decision Letter'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-blue-100 text-blue-800 border-blue-200'
                          }
                        >
                          {comm.type}
                        </Badge>
                        {comm.actionRequired && (
                          <Badge variant="destructive" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-600">
                        {formatDate(new Date(comm.date))}
                      </span>
                    </div>
                    <h5 className="font-medium text-gray-900 mb-1">{comm.subject}</h5>
                    <p className="text-sm text-gray-700">{comm.summary}</p>
                    {comm.dueDate && (
                      <div className="mt-2 text-xs text-gray-600">
                        Due: {formatDate(new Date(comm.dueDate))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="h-4 w-4 mr-2" />
                View Full Submission
              </Button>
              {submission.status === 'Additional Info Requested' && (
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Response
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

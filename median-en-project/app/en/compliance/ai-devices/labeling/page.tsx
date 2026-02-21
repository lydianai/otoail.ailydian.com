'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  FileText,
  ChevronDown,
  Save,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Edit,
  Languages,
  Shield,
  Users,
  AlertCircle,
  RefreshCw,
  Download,
  Upload,
  Clock,
  Brain
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import DemoBanner from '@/components/DemoBanner'
import {
  sampleAIModels,
  getAIModelById,
  type AIModelRegistration,
  type AILabeling
} from '@/lib/data/fda-ai-compliance'

export default function AILabelingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const modelIdFromQuery = searchParams.get('model')

  // State
  const [selectedModelId, setSelectedModelId] = useState<string>(modelIdFromQuery || sampleAIModels[0]?.id || '')
  const [selectedModel, setSelectedModel] = useState<AIModelRegistration | null>(null)
  const [labelingData, setLabelingData] = useState<AILabeling | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [fdaComplianceChecks, setFdaComplianceChecks] = useState<{
    plainLanguageScore: number
    readabilityGrade: number
    requiredElementsPresent: boolean[]
    warnings: string[]
  } | null>(null)

  // Load model and labeling data
  useEffect(() => {
    if (selectedModelId) {
      const model = getAIModelById(selectedModelId)
      if (model) {
        setSelectedModel(model)
        setLabelingData(model.labelingInfo)
        runFDAComplianceCheck(model.labelingInfo)
      }
    }
  }, [selectedModelId])

  const runFDAComplianceCheck = (labeling: AILabeling) => {
    // Simulate FDA compliance checking
    const plainLanguageWords = labeling.plainLanguageDescription.split(' ')
    const avgWordLength = plainLanguageWords.reduce((sum, word) => sum + word.length, 0) / plainLanguageWords.length
    const plainLanguageScore = Math.max(0, Math.min(100, 100 - (avgWordLength - 5) * 10))

    const readabilityGrade = Math.min(12, Math.max(6, avgWordLength))

    const requiredElements = [
      labeling.plainLanguageDescription.length > 0,
      labeling.patientDisclosure.enabled,
      labeling.clinicianGuidance.intendedUse.length > 0,
      labeling.clinicianGuidance.limitations.length > 0,
      labeling.clinicianGuidance.warnings.length > 0,
      labeling.trainingDataDescription.length > 0,
      labeling.performanceSpecs.length > 0,
      labeling.indicationsForUse.length > 0
    ]

    const warnings: string[] = []
    if (plainLanguageScore < 70) {
      warnings.push('Plain language description may be too technical')
    }
    if (readabilityGrade > 10) {
      warnings.push('Readability grade is above 10th grade level')
    }
    if (!labeling.patientDisclosure.enabled) {
      warnings.push('Patient disclosure is not enabled')
    }
    if (labeling.clinicianGuidance.limitations.length < 3) {
      warnings.push('FDA recommends at least 3 documented limitations')
    }
    if (labeling.performanceSpecs.length < 2) {
      warnings.push('Consider adding more performance specifications')
    }

    setFdaComplianceChecks({
      plainLanguageScore,
      readabilityGrade,
      requiredElementsPresent: requiredElements,
      warnings
    })
  }

  const handleSave = () => {
    // In production, this would save to database
    setIsEditing(false)
    setHasUnsavedChanges(false)
    if (labelingData) {
      runFDAComplianceCheck(labelingData)
    }
  }

  const handleFieldChange = (field: string, value: any) => {
    if (labelingData) {
      setLabelingData({ ...labelingData, [field]: value } as AILabeling)
      setHasUnsavedChanges(true)
    }
  }

  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here')
  }

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  if (!selectedModel || !labelingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <DemoBanner />
        <div className="container mx-auto px-6 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">Loading...</p>
            </CardContent>
          </Card>
        </div>
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
                <ChevronDown className="h-5 w-5 rotate-90" />
              </Button>
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Labeling Manager
                </h1>
                <p className="text-sm text-gray-600">
                  FDA-Compliant AI/ML Device Labeling
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Unsaved Changes
                </Badge>
              )}
              <Select value={selectedModelId} onValueChange={setSelectedModelId}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sampleAIModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.modelName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={handleExportPDF}
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              {isEditing ? (
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Labeling
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* FDA Compliance Status Card */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle>FDA Compliance Status</CardTitle>
                  <CardDescription>Automated compliance checking based on January 2025 guidance</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {labelingData.fdaCompliant ? (
                  <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    FDA Compliant
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 px-4 py-2 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Needs Review
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          {fdaComplianceChecks && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plain Language Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Plain Language Score</span>
                    <span className={`text-2xl font-bold ${getComplianceColor(fdaComplianceChecks.plainLanguageScore)}`}>
                      {Math.round(fdaComplianceChecks.plainLanguageScore)}%
                    </span>
                  </div>
                  <Progress value={fdaComplianceChecks.plainLanguageScore} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    Target: 70%+ for patient-facing content
                  </p>
                </div>

                {/* Readability Grade */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Readability Grade</span>
                    <span className={`text-2xl font-bold ${fdaComplianceChecks.readabilityGrade <= 10 ? 'text-green-600' : 'text-red-600'}`}>
                      {fdaComplianceChecks.readabilityGrade.toFixed(1)}
                    </span>
                  </div>
                  <Progress
                    value={Math.max(0, 100 - (fdaComplianceChecks.readabilityGrade - 6) * 20)}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Target: 10th grade or lower
                  </p>
                </div>

                {/* Required Elements */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Required Elements</span>
                    <span className={`text-2xl font-bold ${
                      fdaComplianceChecks.requiredElementsPresent.every(x => x) ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {fdaComplianceChecks.requiredElementsPresent.filter(x => x).length}/{fdaComplianceChecks.requiredElementsPresent.length}
                    </span>
                  </div>
                  <Progress
                    value={(fdaComplianceChecks.requiredElementsPresent.filter(x => x).length / fdaComplianceChecks.requiredElementsPresent.length) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    All elements required for approval
                  </p>
                </div>
              </div>

              {/* Warnings */}
              {fdaComplianceChecks.warnings.length > 0 && (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-900">Compliance Warnings</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-amber-800">
                      {fdaComplianceChecks.warnings.map((warning, idx) => (
                        <li key={idx}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          )}
        </Card>

        {/* Main Labeling Content */}
        <Tabs defaultValue="plain-language" className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm">
            <TabsTrigger value="plain-language" className="gap-2">
              <FileText className="h-4 w-4" />
              Plain Language
            </TabsTrigger>
            <TabsTrigger value="patient" className="gap-2">
              <Users className="h-4 w-4" />
              Patient Disclosure
            </TabsTrigger>
            <TabsTrigger value="clinician" className="gap-2">
              <Shield className="h-4 w-4" />
              Clinician Guidance
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <Brain className="h-4 w-4" />
              Performance Specs
            </TabsTrigger>
            <TabsTrigger value="training" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Training Data
            </TabsTrigger>
          </TabsList>

          {/* Plain Language Description */}
          <TabsContent value="plain-language">
            <Card>
              <CardHeader>
                <CardTitle>Plain Language Description</CardTitle>
                <CardDescription>
                  Patient-friendly explanation of AI functionality (required by FDA)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <Textarea
                    value={labelingData.plainLanguageDescription}
                    onChange={(e) => handleFieldChange('plainLanguageDescription', e.target.value)}
                    rows={8}
                    className="font-sans text-base"
                    placeholder="Explain in simple terms what this AI does and how it helps patients..."
                  />
                ) : (
                  <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <p className="text-gray-900 leading-relaxed">
                      {labelingData.plainLanguageDescription}
                    </p>
                  </div>
                )}

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>FDA Guidelines</AlertTitle>
                  <AlertDescription>
                    Use simple words (6th-8th grade reading level), avoid medical jargon, explain what the AI does and its role in patient care.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patient Disclosure */}
          <TabsContent value="patient">
            <Card>
              <CardHeader>
                <CardTitle>Patient-Facing Disclosure</CardTitle>
                <CardDescription>
                  Information shown to patients when AI is used in their care
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <Label className="text-base font-semibold">Enable Patient Disclosure</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Show disclosure to patients when AI analysis is performed
                    </p>
                  </div>
                  <Switch
                    checked={labelingData.patientDisclosure.enabled}
                    onCheckedChange={(checked) => {
                      const updated = { ...labelingData }
                      updated.patientDisclosure.enabled = checked
                      setLabelingData(updated)
                      setHasUnsavedChanges(true)
                    }}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Disclosure Title</Label>
                  {isEditing ? (
                    <Input
                      value={labelingData.patientDisclosure.title}
                      onChange={(e) => {
                        const updated = { ...labelingData }
                        updated.patientDisclosure.title = e.target.value
                        setLabelingData(updated)
                        setHasUnsavedChanges(true)
                      }}
                      placeholder="e.g., AI-Assisted Analysis"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">{labelingData.patientDisclosure.title}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Disclosure Content</Label>
                  {isEditing ? (
                    <Textarea
                      value={labelingData.patientDisclosure.content}
                      onChange={(e) => {
                        const updated = { ...labelingData }
                        updated.patientDisclosure.content = e.target.value
                        setLabelingData(updated)
                        setHasUnsavedChanges(true)
                      }}
                      rows={6}
                      placeholder="Explain to patients what AI is doing..."
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <p className="text-gray-900">{labelingData.patientDisclosure.content}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base font-semibold">Require Acknowledgment</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Patient must acknowledge before AI analysis proceeds
                    </p>
                  </div>
                  <Switch
                    checked={labelingData.patientDisclosure.acknowledgmentRequired}
                    onCheckedChange={(checked) => {
                      const updated = { ...labelingData }
                      updated.patientDisclosure.acknowledgmentRequired = checked
                      setLabelingData(updated)
                      setHasUnsavedChanges(true)
                    }}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Available Languages
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {labelingData.patientDisclosure.languagesAvailable.map((lang, idx) => (
                      <Badge key={idx} variant="secondary">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clinician Guidance */}
          <TabsContent value="clinician">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Intended Use & Clinical Context</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Intended Use</Label>
                    {isEditing ? (
                      <Textarea
                        value={labelingData.clinicianGuidance.intendedUse}
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-900">{labelingData.clinicianGuidance.intendedUse}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Clinical Context</Label>
                    {isEditing ? (
                      <Textarea
                        value={labelingData.clinicianGuidance.clinicalContext}
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-900">{labelingData.clinicianGuidance.clinicalContext}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Interpretation Guidance</Label>
                    {isEditing ? (
                      <Textarea
                        value={labelingData.clinicianGuidance.interpretation}
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-900">{labelingData.clinicianGuidance.interpretation}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Limitations & Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Limitations</Label>
                    <ul className="space-y-2">
                      {labelingData.clinicianGuidance.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-900">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Warnings</Label>
                    <ul className="space-y-2">
                      {labelingData.clinicianGuidance.warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-900">{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Contraindications</Label>
                    <ul className="space-y-2">
                      {labelingData.clinicianGuidance.contraindications.map((contraindication, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-3 bg-red-100 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-red-700 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-semibold text-gray-900">{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Specifications */}
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Specifications</CardTitle>
                <CardDescription>
                  Validated performance metrics for clinical use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labelingData.performanceSpecs.map((spec, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-600 mb-1">{spec.metric}</div>
                          <div className="text-2xl font-bold text-blue-600 mb-2">{spec.value}</div>
                          <div className="text-xs text-gray-600">{spec.conditions}</div>
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>

                <Alert className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Performance Monitoring</AlertTitle>
                  <AlertDescription>
                    Real-world performance is continuously monitored. Navigate to Monitoring page for live metrics.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Data */}
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Data Description</CardTitle>
                <CardDescription>
                  Transparency about AI model training data (FDA requirement)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Dataset Description</Label>
                  {isEditing ? (
                    <Textarea
                      value={labelingData.trainingDataDescription}
                      rows={5}
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <p className="text-gray-900">{labelingData.trainingDataDescription}</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-3 block">Indications for Use</Label>
                  <ul className="space-y-2">
                    {labelingData.indicationsForUse.map((indication, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{indication}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-3 block">Required User Qualifications</Label>
                  <ul className="space-y-2">
                    {labelingData.requiredUserQualifications.map((qualification, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                        <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="ml-2 font-semibold">{new Date(labelingData.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Compliance Check:</span>
                      <span className="ml-2 font-semibold">{new Date(labelingData.complianceCheckDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

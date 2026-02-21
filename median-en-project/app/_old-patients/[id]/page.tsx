'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Phone, Mail, MapPin, Calendar, AlertTriangle, Pill, Activity, FileText, TestTube, Heart, User, Shield, Clock, Edit, Save, X, Download, Scan, Stethoscope, Users, DollarSign, Plus, TrendingUp, CircleDot } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { cn } from '@/lib/utils'
import { generateComprehensivePatients, generateMedicalHistory, generateVitalSigns, type PatientDemographics, type MedicalHistory, type VitalSigns } from '@/lib/data/patient-data'

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [patients] = useState(() => generateComprehensivePatients(100))
  const patient = useMemo(() => patients.find(p => p.id === params.id) || patients[0], [patients, params.id])
  const [medicalHistory] = useState(() => generateMedicalHistory(patient.id))
  const [vitalSigns] = useState(() => generateVitalSigns(patient.id))
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatDate = (date: Date) => {
    if (!isClient) return date.toISOString().split('T')[0]
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
  }

  if (!isClient) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
              <Heart className="h-6 w-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="mt-6 text-base font-medium text-gray-700">Loading patient record...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'vitals', name: 'Vitals & History', icon: Activity },
    { id: 'medications', name: 'Medications', icon: Pill },
    { id: 'labs', name: 'Lab Results', icon: TestTube },
    { id: 'imaging', name: 'Imaging', icon: Scan },
    { id: 'visits', name: 'Visits', icon: Calendar },
    { id: 'billing', name: 'Billing', icon: DollarSign },
    { id: 'documents', name: 'Documents', icon: FileText },
  ]

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Premium Header */}
        <div className="bg-white border-b border-gray-200/80 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all font-semibold text-gray-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Patients
              </button>
              <div className="flex items-center gap-3">
                <button className="px-5 py-3 border-2 border-gray-200 bg-white rounded-xl hover:border-gray-300 hover:shadow-md transition-all flex items-center gap-2 font-semibold text-gray-700">
                  <Download className="h-4 w-4" />
                  Export Record
                </button>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2 font-semibold"
                  >
                    <Edit className="h-5 w-5" />
                    Edit Patient
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-3 border-2 border-gray-200 bg-white rounded-xl hover:border-gray-300 transition-all flex items-center gap-2 font-semibold text-gray-700"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
                      <Save className="h-5 w-5" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Patient Header Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 mb-6">
              <div className="flex items-start gap-6">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-blue-500/30">
                  {patient.firstName[0]}{patient.lastName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-black text-gray-900 mb-1">
                        {patient.firstName} {patient.lastName}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 font-semibold">
                        <span className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          MRN: <code className="bg-white px-2 py-1 rounded font-mono text-gray-900">{patient.mrn}</code>
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {patient.age} years old
                        </span>
                        <span className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          {patient.gender}
                        </span>
                      </div>
                    </div>
                    <div className={cn(
                      "px-4 py-2 rounded-xl font-bold text-sm border-2",
                      patient.status === 'Active' && 'bg-green-100 text-green-700 border-green-200',
                      patient.status === 'Inactive' && 'bg-gray-100 text-gray-700 border-gray-200'
                    )}>
                      {patient.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Phone className="h-4 w-4" />
                        <span className="text-xs font-semibold">Phone</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{patient.phone.mobile}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Mail className="h-4 w-4" />
                        <span className="text-xs font-semibold">Email</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{patient.email || 'Not provided'}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs font-semibold">Last Visit</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {patient.lastVisitDate ? formatDate(patient.lastVisitDate) : 'No visits'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b-2 border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-4 border-b-4 transition-all font-bold text-sm",
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Demographics & Contacts */}
              <div className="lg:col-span-2 space-y-6">
                {/* Demographics Card */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">Demographics</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date of Birth</p>
                      <p className="text-base font-bold text-gray-900">{formatDate(patient.dateOfBirth)}</p>
                      <p className="text-sm font-semibold text-gray-600">{patient.age} years old</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Gender</p>
                      <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm border-2 border-blue-200">
                        {patient.gender}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Race</p>
                      <p className="text-base font-bold text-gray-900">{patient.race}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Ethnicity</p>
                      <p className="text-base font-bold text-gray-900">{patient.ethnicity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Language</p>
                      <p className="text-base font-bold text-gray-900">{patient.preferredLanguage}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Marital Status</p>
                      <p className="text-base font-bold text-gray-900">{patient.maritalStatus}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts Card */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">Emergency Contacts</h2>
                  </div>
                  <div className="space-y-4">
                    {patient.emergencyContact ? (
                      <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-100">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-black text-gray-900">{patient.emergencyContact.name}</p>
                            <p className="text-sm font-semibold text-gray-600">{patient.emergencyContact.relationship}</p>
                          </div>
                          <span className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold text-xs">
                            Primary
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-600" />
                            <p className="text-sm font-bold text-gray-900">{patient.emergencyContact.phone}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100 text-center">
                        <p className="text-sm font-semibold text-gray-600">No emergency contacts on file</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Insurance Card */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">Insurance Information</h2>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-xs">
                        PRIMARY INSURANCE
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-xs border-2 border-green-200">
                        Active
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-4">{patient.insurance.primary.provider}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Policy Number</p>
                        <p className="text-sm font-bold text-gray-900 font-mono">{patient.insurance.primary.policyNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Group Number</p>
                        <p className="text-sm font-bold text-gray-900 font-mono">{patient.insurance.primary.groupNumber}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Coverage Period</p>
                        <p className="text-sm font-bold text-gray-900">
                          {formatDate(patient.insurance.primary.effectiveDate)} - {formatDate(patient.insurance.primary.expirationDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                      <CircleDot className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">Quick Actions</h2>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-3 font-bold">
                      <Calendar className="h-5 w-5" />
                      Schedule Appointment
                    </button>
                    <button className="w-full px-4 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all flex items-center gap-3 font-bold">
                      <Pill className="h-5 w-5" />
                      Prescribe Medication
                    </button>
                    <button className="w-full px-4 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all flex items-center gap-3 font-bold">
                      <TestTube className="h-5 w-5" />
                      Order Labs
                    </button>
                    <button className="w-full px-4 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-indigo-300 hover:shadow-lg transition-all flex items-center gap-3 font-bold">
                      <Scan className="h-5 w-5" />
                      Order Imaging
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">Contact</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Phone className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile</p>
                        <p className="text-sm font-bold text-gray-900">{patient.phone.mobile}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</p>
                        <p className="text-sm font-bold text-gray-900 break-all">{patient.email || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address</p>
                        <p className="text-sm font-bold text-gray-900">
                          {patient.address.street}<br />
                          {patient.address.city}, {patient.address.state} {patient.address.zip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VITALS & HISTORY TAB */}
          {activeTab === 'vitals' && (
            <div className="space-y-6">
              {/* Allergies Section */}
              {medicalHistory.allergies.length > 0 && (
                <div className="bg-red-50 rounded-2xl border-2 border-red-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-red-900">Allergies ({medicalHistory.allergies.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {medicalHistory.allergies.map(allergy => (
                      <div key={allergy.id} className="bg-white rounded-xl p-4 border-2 border-red-200 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-black text-red-900">{allergy.allergen}</h3>
                            <p className="text-sm font-semibold text-gray-600">{allergy.type}</p>
                          </div>
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">{allergy.reaction}</p>
                        <span className={cn(
                          "inline-flex px-3 py-1 rounded-lg font-bold text-xs",
                          allergy.severity === 'Severe' && 'bg-red-600 text-white',
                          allergy.severity === 'Moderate' && 'bg-orange-100 text-orange-700 border-2 border-orange-200',
                          allergy.severity === 'Mild' && 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200'
                        )}>
                          {allergy.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Problems */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900">Active Problems ({medicalHistory.problems.length})</h2>
                </div>
                <div className="space-y-3">
                  {medicalHistory.problems.map(problem => (
                    <div key={problem.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-black text-gray-900">{problem.description}</h3>
                          <p className="text-sm font-semibold text-gray-600 mt-1">
                            ICD-10: <code className="bg-gray-100 px-2 py-1 rounded font-mono">{problem.code}</code>
                          </p>
                          <p className="text-sm font-semibold text-gray-600">
                            Onset: {formatDate(problem.onsetDate)}
                          </p>
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-lg font-bold text-xs",
                          problem.severity === 'Severe' && 'bg-red-100 text-red-700 border-2 border-red-200',
                          problem.severity === 'Moderate' && 'bg-orange-100 text-orange-700 border-2 border-orange-200',
                          problem.severity === 'Mild' && 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200'
                        )}>
                          {problem.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Pill className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900">Current Medications ({medicalHistory.medications.length})</h2>
                </div>
                <div className="space-y-3">
                  {medicalHistory.medications.map(med => (
                    <div key={med.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-black text-gray-900">{med.name}</h3>
                          <p className="text-sm font-bold text-gray-700 mt-1">
                            {med.dosage} {med.route} - {med.frequency}
                          </p>
                          <p className="text-sm font-semibold text-gray-600">
                            Indication: {med.indication}
                          </p>
                          <p className="text-xs font-semibold text-gray-500 mt-1">
                            Prescribed by {med.prescribedBy}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-xs border-2 border-green-200">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Immunizations */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900">Immunizations ({medicalHistory.immunizations.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {medicalHistory.immunizations.map(imm => (
                    <div key={imm.id} className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-green-200 hover:shadow-lg transition-all">
                      <div>
                        <h3 className="font-bold text-gray-900">{imm.vaccine}</h3>
                        <p className="text-xs font-semibold text-gray-500">CVX: {imm.cvxCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-600">{formatDate(imm.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social History */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900">Social History</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Smoking Status</p>
                    <span className={cn(
                      "inline-flex px-3 py-1 rounded-lg font-bold text-sm",
                      medicalHistory.socialHistory.smokingStatus === 'Current' && 'bg-red-100 text-red-700 border-2 border-red-200',
                      medicalHistory.socialHistory.smokingStatus === 'Former' && 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200',
                      medicalHistory.socialHistory.smokingStatus === 'Never' && 'bg-green-100 text-green-700 border-2 border-green-200'
                    )}>
                      {medicalHistory.socialHistory.smokingStatus}
                    </span>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Alcohol Use</p>
                    <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-bold text-sm border-2 border-blue-200">
                      {medicalHistory.socialHistory.alcoholUse}
                    </span>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Drug Use</p>
                    <span className="inline-flex px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-bold text-sm border-2 border-purple-200">
                      {medicalHistory.socialHistory.drugUse}
                    </span>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Occupation</p>
                    <p className="font-bold text-gray-900">{medicalHistory.socialHistory.occupation || 'Not recorded'}</p>
                  </div>
                </div>
              </div>

              {/* Latest Vital Signs */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">Latest Vital Signs</h2>
                  </div>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-xs">
                    {formatDate(vitalSigns.recordedAt)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-white rounded-xl p-4 border-2 border-blue-100 text-center hover:shadow-lg transition-all">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Blood Pressure</p>
                    <p className="text-2xl font-black text-gray-900">{vitalSigns.bloodPressure.systolic}/{vitalSigns.bloodPressure.diastolic}</p>
                    <p className="text-xs font-semibold text-gray-600">mmHg</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-red-100 text-center hover:shadow-lg transition-all">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Heart Rate</p>
                    <p className="text-2xl font-black text-gray-900">{vitalSigns.heartRate}</p>
                    <p className="text-xs font-semibold text-gray-600">bpm</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-orange-100 text-center hover:shadow-lg transition-all">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Temperature</p>
                    <p className="text-2xl font-black text-gray-900">{vitalSigns.temperature}</p>
                    <p className="text-xs font-semibold text-gray-600">°F</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-blue-100 text-center hover:shadow-lg transition-all">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">SpO2</p>
                    <p className="text-2xl font-black text-gray-900">{vitalSigns.oxygenSaturation}</p>
                    <p className="text-xs font-semibold text-gray-600">%</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-green-100 text-center hover:shadow-lg transition-all">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Weight</p>
                    <p className="text-2xl font-black text-gray-900">{vitalSigns.weight}</p>
                    <p className="text-xs font-semibold text-gray-600">lbs</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-purple-100 text-center hover:shadow-lg transition-all">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">BMI</p>
                    <p className="text-2xl font-black text-gray-900">{vitalSigns.bmi}</p>
                    <p className="text-xs font-semibold text-gray-600">kg/m²</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MEDICATIONS TAB */}
          {activeTab === 'medications' && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-12 text-center hover:shadow-lg transition-all">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Pill className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Medications</h2>
                <p className="text-lg font-semibold text-gray-600 mb-8">
                  Comprehensive medication management system coming soon
                </p>
                <div className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold">
                  Coming Soon
                </div>
              </div>
            </div>
          )}

          {/* LAB RESULTS TAB */}
          {activeTab === 'labs' && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-12 text-center hover:shadow-lg transition-all">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <TestTube className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Lab Results</h2>
                <p className="text-lg font-semibold text-gray-600 mb-8">
                  Laboratory results and analysis portal coming soon
                </p>
                <div className="inline-flex px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold">
                  Coming Soon
                </div>
              </div>
            </div>
          )}

          {/* IMAGING TAB */}
          {activeTab === 'imaging' && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-12 text-center hover:shadow-lg transition-all">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Scan className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Medical Imaging</h2>
                <p className="text-lg font-semibold text-gray-600 mb-8">
                  Advanced imaging viewer and PACS integration coming soon
                </p>
                <div className="inline-flex px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold">
                  Coming Soon
                </div>
              </div>
            </div>
          )}

          {/* VISITS TAB */}
          {activeTab === 'visits' && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-12 text-center hover:shadow-lg transition-all">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Visit History</h2>
                <p className="text-lg font-semibold text-gray-600 mb-8">
                  Complete visit history and encounter documentation coming soon
                </p>
                <div className="inline-flex px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold">
                  Coming Soon
                </div>
              </div>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-12 text-center hover:shadow-lg transition-all">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Billing & Claims</h2>
                <p className="text-lg font-semibold text-gray-600 mb-8">
                  Comprehensive billing and insurance claims management coming soon
                </p>
                <div className="inline-flex px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-bold">
                  Coming Soon
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-12 text-center hover:shadow-lg transition-all">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-600 to-slate-600 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Documents</h2>
                <p className="text-lg font-semibold text-gray-600 mb-8">
                  Secure document management and storage system coming soon
                </p>
                <div className="inline-flex px-6 py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-xl font-bold">
                  Coming Soon
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

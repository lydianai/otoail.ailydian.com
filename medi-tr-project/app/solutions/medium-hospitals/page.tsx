'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Building2,
  Users,
  Heart,
  Bed,
  Activity,
  Stethoscope,
  TestTube,
  Pill,
  Scan,
  DollarSign,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
  Zap,
  Calendar,
  Globe,
  Lock,
  Cloud,
  FileText,
  Smartphone,
  Target,
  AlertCircle,
} from 'lucide-react';

export default function MediumHospitalsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-gray-900">Optimized for 50-200 Bed Hospitals</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Built for
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Medium Hospitals
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Complete hospital management platform designed for community hospitals and regional medical centers.
                Enterprise features with the agility your growing hospital needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/trial"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start 30-Day Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Schedule Demo
                  <Calendar className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600">150+</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Hospitals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600">45 Days</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Avg. Go-Live</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600">$1.8M</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Avg. Savings</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border-4 border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <Building2 className="h-32 w-32 text-blue-600 opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Complete Hospital Suite */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Complete Hospital Management Suite</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              All the modules you need to run a modern medium-sized hospital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Patient Management</h3>
              <p className="text-sm text-gray-700 font-medium">Complete EHR with AI clinical decision support</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
              <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Emergency Department</h3>
              <p className="text-sm text-gray-700 font-medium">Advanced ED workflows and triage</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border-2 border-indigo-200">
              <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
                <Bed className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Inpatient Care</h3>
              <p className="text-sm text-gray-700 font-medium">Real-time bed management and nursing workflows</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <div className="h-12 w-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Operating Room</h3>
              <p className="text-sm text-gray-700 font-medium">Surgical scheduling and OR management</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border-2 border-cyan-200">
              <div className="h-12 w-12 rounded-xl bg-cyan-600 flex items-center justify-center mb-4">
                <TestTube className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Laboratory (LIMS)</h3>
              <p className="text-sm text-gray-700 font-medium">Full lab integration with result management</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border-2 border-pink-200">
              <div className="h-12 w-12 rounded-xl bg-pink-600 flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Pharmacy Management</h3>
              <p className="text-sm text-gray-700 font-medium">e-Prescribing and automated dispensing</p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-6 border-2 border-violet-200">
              <div className="h-12 w-12 rounded-xl bg-violet-600 flex items-center justify-center mb-4">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Radiology (PACS)</h3>
              <p className="text-sm text-gray-700 font-medium">Digital imaging with AI-assisted reading</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Revenue Cycle</h3>
              <p className="text-sm text-gray-700 font-medium">Automated billing and claims management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features for Medium Hospitals */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Why Medium Hospitals Choose Median</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Purpose-built features for community and regional hospitals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Bed className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Advanced Bed Management</h3>
              <p className="text-gray-700 font-medium mb-4">
                Real-time bed tracking across all units with automated transfer workflows, discharge planning,
                and capacity management to optimize patient flow.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Real-time bed status dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Automated admission/transfer/discharge</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ED-to-floor seamless transitions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Capacity forecasting & analytics</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Stethoscope className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Operating Room Excellence</h3>
              <p className="text-gray-700 font-medium mb-4">
                Comprehensive OR management with scheduling, equipment tracking, preference cards,
                anesthesia records, and post-op documentation.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Multi-OR scheduling optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Surgeon preference card management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Equipment & supply tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Anesthesia charting & documentation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Business Intelligence & Analytics</h3>
              <p className="text-gray-700 font-medium mb-4">
                Real-time dashboards and advanced analytics to track clinical quality, financial performance,
                and operational efficiency.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Executive dashboards & KPIs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Quality measure tracking (Core Measures)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Financial performance analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Custom report builder</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <DollarSign className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Revenue Cycle Optimization</h3>
              <p className="text-gray-700 font-medium mb-4">
                Maximize reimbursement with automated coding assistance, claim scrubbing, denial management,
                and patient payment solutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">AI-powered coding suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Automated claim scrubbing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Denial prevention & management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Patient payment portal & plans</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Interoperability */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Seamless Integration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Connect with the systems you already use
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <Globe className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">HL7 FHIR R5</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Latest interoperability standards for seamless data exchange with other healthcare systems,
                labs, imaging centers, and HIEs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <FileText className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">Lab & Imaging Integration</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Direct integration with reference labs (Quest, LabCorp) and PACS systems. Results flow
                automatically into patient charts.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <Smartphone className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">API & Webhooks</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                RESTful API and webhooks for custom integrations. Connect with telehealth platforms,
                remote monitoring devices, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Pricing for Medium Hospitals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Flexible pricing that scales with your hospital
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Standard</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">$699</span>
                <span className="text-gray-600 font-semibold">/month</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-gray-900">Up to 100 users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-purple-600" />
                  <span className="font-bold text-gray-900">50-100 beds</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Complete EHR & Patient Portal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ED, Inpatient & Outpatient</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Lab & Pharmacy Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Revenue Cycle Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Basic Analytics & Reporting</span>
                </li>
              </ul>
              <Link
                href="/trial"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-blue-600 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">Enterprise</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">$1,499</span>
                <span className="text-gray-600 font-semibold">/month</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-gray-900">Up to 500 users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-purple-600" />
                  <span className="font-bold text-gray-900">100-200 beds</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Everything in Standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Operating Room Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">PACS & Radiology</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">AI Clinical Decision Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Advanced Analytics & BI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Dedicated Account Manager</span>
                </li>
              </ul>
              <Link
                href="/trial"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join 150+ medium hospitals already using Median to deliver better care and improve operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start 30-Day Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
            >
              Schedule Demo
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

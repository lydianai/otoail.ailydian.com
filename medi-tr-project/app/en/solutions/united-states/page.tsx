'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Shield,
  FileText,
  Building2,
  Cloud,
  Brain,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Award,
  Lock,
  Globe,
  TrendingUp,
  Users,
  Heart,
  Zap,
  BarChart3,
  AlertCircle,
  DollarSign,
  Calendar,
  Star,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  BookOpen,
  Target,
} from 'lucide-react';

export default function UnitedStatesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200">
                <span className="text-2xl">🇺🇸</span>
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-gray-900">Certified in All 50 States</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Built for
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  US Hospitals
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                The only hospital management system designed specifically for US healthcare with complete HIPAA compliance,
                state certifications, HL7 FHIR R5 integration, and FDA-cleared AI clinical decision support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/trial"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
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
                  <div className="text-3xl font-black text-blue-600">250+</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">US Hospitals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600">50/50</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">States Certified</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600">99.99%</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Uptime SLA</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border-4 border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <Shield className="h-32 w-32 text-blue-600 opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Compliance Built-In</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Meet every federal and state requirement out of the box
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <div className="h-14 w-14 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">HIPAA 2025 Compliant</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Full compliance with 2025 HIPAA Security Rule updates including mandatory MFA, enhanced encryption
                (AES-256), comprehensive audit trails, and automated breach notification within 60 days.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Two-factor authentication required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">End-to-end encryption (at rest & in transit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Complete audit log for all PHI access</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border-2 border-indigo-200">
              <div className="h-14 w-14 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">HL7 FHIR R5</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Latest FHIR Release 5 standard for seamless interoperability with legacy systems, conventional systems,
                and all major EHR systems. Real-time data exchange via FHIR API.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Bi-directional HL7 v2.x messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">RESTful FHIR API endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Smart on FHIR app integration</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="h-14 w-14 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">State Certifications</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Certified and compliant in all 50 states with state-specific workflows, reporting, and regulatory requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">CA, NY, TX, FL specialized modules</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">State-specific reporting templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Automatic regulation updates</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border-2 border-cyan-200">
              <div className="h-14 w-14 rounded-xl bg-cyan-600 flex items-center justify-center mb-4">
                <Cloud className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">SOC 2 Type II</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Annual SOC 2 Type II audits ensuring enterprise-grade security controls, continuous monitoring,
                and incident response procedures.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Annual third-party audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">24/7 security monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Penetration testing quarterly</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200">
              <div className="h-14 w-14 rounded-xl bg-pink-600 flex items-center justify-center mb-4">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">FDA-Cleared AI</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                FDA 510(k) cleared AI algorithms for clinical decision support, diagnostic assistance, and
                predictive analytics validated for clinical use.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Sepsis early detection (96% accuracy)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Drug interaction alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Readmission risk prediction</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="h-14 w-14 rounded-xl bg-green-600 flex items-center justify-center mb-4">
                <Smartphone className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Telehealth Ready</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                HIPAA-compliant video consultations with integrated e-prescribing, billing, and documentation
                workflow. Medicare/Medicaid telehealth billing codes included.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">HD video with screen sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Instant e-prescribing post-visit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Automatic CPT code generation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* US-Specific Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Built for US Healthcare Workflows</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Features designed specifically for the US healthcare system
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Revenue Cycle Management</h3>
              <p className="text-gray-700 font-medium mb-4">
                Complete RCM with automated claim generation, submission to Medicare/Medicaid/private payers,
                denial management, and payment posting.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ICD-10, CPT, HCPCS coding assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Electronic claim submission (837)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ERA/EOB processing (835)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Patient payment portal</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Heart className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Medicare/Medicaid Integration</h3>
              <p className="text-gray-700 font-medium mb-4">
                Direct integration with CMS systems for eligibility verification, claim submission, and quality reporting.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Real-time eligibility checks (270/271)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">MIPS quality measure reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Part D e-prescribing compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Medicare Advantage plan support</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Quality Reporting & Compliance</h3>
              <p className="text-gray-700 font-medium mb-4">
                Automated quality measure tracking and reporting for federal programs and accreditation bodies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Joint Commission (TJC) ready documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Core Measures tracking (SEP-1, STK-4, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">CMS star ratings optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Value-based care analytics</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Emergency Department Optimization</h3>
              <p className="text-gray-700 font-medium mb-4">
                Advanced ED workflows designed for high-volume US emergency departments with EMTALA compliance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ESI (Emergency Severity Index) triage</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Door-to-doc time tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">EMTALA screening documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Transfer center coordination</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing for US Market */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">US Healthcare Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Transparent pricing designed for US hospitals of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Community Hospital</h3>
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
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span className="font-bold text-gray-900">15,000 active patients</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Complete EHR & Patient Portal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Emergency Department Module</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Revenue Cycle Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">HIPAA Compliance Tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">24/7 Phone Support</span>
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
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">Regional Medical Center</h3>
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
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span className="font-bold text-gray-900">Unlimited patients</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Everything in Community</span>
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
                  <span className="text-gray-700 font-medium">FDA-Cleared AI Clinical Support</span>
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

            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Academic Medical Center</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">Custom</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-gray-900">1,000+ users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span className="font-bold text-gray-900">Multi-facility support</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Everything in Regional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Multi-hospital deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Custom integrations & workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">White labeling options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">99.99% uptime SLA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">On-site implementation team</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Transform Your US Hospital?
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join 250+ US hospitals already using Median for complete HIPAA compliance and better patient outcomes
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

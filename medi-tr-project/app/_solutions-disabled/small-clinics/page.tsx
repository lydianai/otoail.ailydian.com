'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Users,
  Heart,
  Calendar,
  DollarSign,
  Smartphone,
  Shield,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
  Zap,
  Clock,
  FileText,
  Star,
  Target,
  PieChart,
  Building,
  Pill,
  TestTube,
  Activity,
  Settings,
  CloudUpload,
  Lock,
} from 'lucide-react';

export default function SmallClinicsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-green-200">
                <Building className="h-5 w-5 text-green-600" />
                <span className="text-sm font-bold text-gray-900">Perfect for 1-50 Bed Facilities</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Built for
                <span className="block mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Small Clinics
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Affordable, easy-to-use hospital management system designed specifically for small clinics,
                urgent care centers, and outpatient facilities. Get enterprise features at a small clinic price.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/trial"
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start Free 30-Day Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-green-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Watch Demo
                  <Calendar className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-green-600">$299</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Starting Price</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-green-600">15min</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-green-600">0</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">IT Staff Needed</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border-4 border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                  <Heart className="h-32 w-32 text-green-600 opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Small Clinics Love Median */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Why Small Clinics Choose Median</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Enterprise capabilities without enterprise complexity or cost
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="h-14 w-14 rounded-xl bg-green-600 flex items-center justify-center mb-4">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Affordable Pricing</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Starting at just $299/month for up to 25 users. No hidden fees, no setup costs, no long-term
                contracts. Cancel anytime.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <div className="h-14 w-14 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Quick Setup</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Go live in 15 minutes. Simple onboarding process with guided setup wizard. Import your existing
                patient data with one click.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="h-14 w-14 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Easy to Use</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Intuitive interface designed for busy clinic staff. No technical training required. Your team
                will be productive from day one.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
              <div className="h-14 w-14 rounded-xl bg-red-600 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Fully Compliant</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                HIPAA compliant out of the box. Automatic updates for regulatory changes. SOC 2 Type II audited.
                Your data is safe.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border-2 border-cyan-200">
              <div className="h-14 w-14 rounded-xl bg-cyan-600 flex items-center justify-center mb-4">
                <CloudUpload className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Cloud-Based</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Access from anywhere on any device. No servers to maintain. Automatic backups. 99.9% uptime guarantee.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200">
              <div className="h-14 w-14 rounded-xl bg-pink-600 flex items-center justify-center mb-4">
                <Settings className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">All-in-One Platform</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                EHR, scheduling, billing, patient portal, and more in one system. No need for multiple vendors
                and integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Small Clinics */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Complete feature set tailored for small clinics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Patient Management</h3>
              <p className="text-gray-700 font-medium mb-4">
                Complete electronic health records with customizable templates for your specialty.
                Quick patient search, medical history, and clinical notes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Digital patient charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Customizable visit templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Medical history tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Document scanning & attachment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Calendar className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Smart Scheduling</h3>
              <p className="text-gray-700 font-medium mb-4">
                Online booking, automated reminders, and optimized scheduling to reduce no-shows and
                maximize your clinic's efficiency.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Online patient booking (24/7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">SMS & email reminders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Multi-provider calendars</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Waitlist management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <DollarSign className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Billing & Payments</h3>
              <p className="text-gray-700 font-medium mb-4">
                Simplified billing with automated insurance claims, payment processing, and patient statements.
                Get paid faster.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Electronic claim submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Credit card processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Automated patient statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Payment plan management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Smartphone className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Patient Portal & App</h3>
              <p className="text-gray-700 font-medium mb-4">
                Empower your patients with 24/7 access to their health information, appointment booking,
                and secure messaging with providers.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Mobile app (iOS & Android)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Online appointment booking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Secure provider messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Lab results & prescriptions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Pill className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">e-Prescribing</h3>
              <p className="text-gray-700 font-medium mb-4">
                Electronic prescribing with drug interaction checking, formulary lookup, and direct transmission
                to pharmacies nationwide.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Send prescriptions electronically</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Drug interaction alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Insurance formulary checking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Prescription history tracking</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <BarChart3 className="h-12 w-12 text-cyan-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Reports & Analytics</h3>
              <p className="text-gray-700 font-medium mb-4">
                Real-time dashboards and customizable reports to track your clinic's performance and
                improve operations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Revenue & collections reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Patient visit analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Provider productivity metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Custom report builder</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              No setup fees. No long-term contracts. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Starter</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">$299</span>
                <span className="text-gray-600 font-semibold">/month</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-gray-900">Up to 25 users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span className="font-bold text-gray-900">3,000 active patients</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Complete EHR System</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Online Scheduling & Patient Portal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Basic Billing & Claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">e-Prescribing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Mobile App Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Email & Phone Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">99.5% Uptime SLA</span>
                </li>
              </ul>
              <Link
                href="/trial"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-green-600 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-black rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">Professional</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">$499</span>
                <span className="text-gray-600 font-semibold">/month</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-gray-900">Up to 50 users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span className="font-bold text-gray-900">10,000 active patients</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Everything in Starter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Advanced Billing & Revenue Cycle</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Laboratory Integration (LIMS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Inventory Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Telehealth Video Visits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Advanced Analytics & Reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Priority Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">99.9% Uptime SLA</span>
                </li>
              </ul>
              <Link
                href="/trial"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 font-semibold mb-4">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">Free data migration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">Free training</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Loved by Small Clinics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              See what other small clinics are saying about Median
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                "Median transformed our small urgent care center. Setup took less than 20 minutes and our
                staff was comfortable using it within days. Best decision we've made!"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-black text-gray-900">Dr. Sarah Johnson</div>
                  <div className="text-sm text-gray-600 font-semibold">Downtown Urgent Care, Austin TX</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                "We switched from a clunky legacy system to Median and immediately saw a 40% reduction in
                no-shows thanks to the automated reminders. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-black text-gray-900">Michael Chen, MD</div>
                  <div className="text-sm text-gray-600 font-semibold">Family Health Clinic, Seattle WA</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                "As a solo practitioner, I needed something affordable and easy. Median is perfect. The
                patient portal has been a game-changer for my practice."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-black text-gray-900">Dr. Emily Rodriguez</div>
                  <div className="text-sm text-gray-600 font-semibold">Rodriguez Primary Care, Miami FL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Modernize Your Clinic?
          </h2>
          <p className="text-xl text-green-100 mb-12 font-medium">
            Join thousands of small clinics using Median. Start your free 30-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="px-8 py-4 bg-white text-green-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-green-600 transition-all flex items-center justify-center gap-2"
            >
              Watch Demo
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

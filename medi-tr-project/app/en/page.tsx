'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Shield,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Building2,
  Cloud,
  Lock,
  BarChart3,
  FileText,
  Stethoscope,
  Heart,
  Building,
  Pill,
  TestTube,
  Scan,
  Bed,
  AlertCircle,
  DollarSign,
  UserCheck,
  Package,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - English */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-100 rounded-full mb-8 animate-pulse-slow">
              <Award className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-bold text-gray-900">
                Next-Generation Hospital Management Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Transform Your Hospital with{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Median
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-semibold leading-relaxed">
              Comprehensive healthcare management system with AI-powered diagnostics, integrated EHR,
              emergency care, laboratory, pharmacy, and operating room management - all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="https://median.ailydian.com/en/patients" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-3">
                Management Center
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/en/demo" className="group px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-lg border-2 border-gray-200 hover:border-blue-500 transition-all flex items-center gap-3">
                <Play className="h-5 w-5" />
                Request Demo
              </a>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-blue-100">
                <div className="text-3xl font-black text-blue-500 mb-2">HIPAA</div>
                <div className="text-sm font-semibold text-gray-600">Compliant</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-purple-100">
                <div className="text-3xl font-black text-purple-600 mb-2">AI-Powered</div>
                <div className="text-sm font-semibold text-gray-600">Diagnostics</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-gray-100">
                <div className="text-3xl font-black text-green-600 mb-2">Secure</div>
                <div className="text-sm font-semibold text-gray-600">Data Protection</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-gray-100">
                <div className="text-3xl font-black text-amber-600 mb-2">24/7</div>
                <div className="text-sm font-semibold text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Complete Healthcare Management Suite
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              From patient intake to discharge, from emergency care to operating rooms - manage every aspect of your hospital seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Patient Management */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Patient Management</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Comprehensive Electronic Health Records (EHR) with patient demographics, medical history,
                appointments, vitals tracking, and real-time collaboration.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Electronic Health Records (EHR)
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Patient demographics & history
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Appointment scheduling
                </li>
              </ul>
            </div>

            {/* Emergency Department */}
            <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Emergency Care</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                ESI-based triage system with vital signs monitoring, ABCDE assessment,
                immediate actions tracking, and protocol activation (STEMI, Stroke, ACLS).
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  ESI triage (Level 1-5)
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  Real-time vitals monitoring
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  Protocol activation & tracking
                </li>
              </ul>
            </div>

            {/* AI Diagnostics */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Scan className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">AI Diagnostics</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Advanced medical imaging analysis with AI-powered diagnosis, differential diagnosis,
                risk stratification, and treatment recommendations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  Medical imaging analysis
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  Differential diagnosis
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  Risk stratification
                </li>
              </ul>
            </div>

            {/* Laboratory (LIMS) */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TestTube className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Laboratory (LIMS)</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Complete Laboratory Information Management System with test ordering,
                sample tracking, automated reporting, and quality control.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Test ordering & tracking
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Automated result reporting
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Quality control & validation
                </li>
              </ul>
            </div>

            {/* Pharmacy Management */}
            <div className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border-2 border-amber-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Pill className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Pharmacy Management</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Prescription verification, drug-drug interaction checking, inventory management,
                and adverse drug reaction monitoring with safety alerts.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  Prescription verification
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  Drug interaction checking
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  Inventory management
                </li>
              </ul>
            </div>

            {/* Operating Room */}
            <div className="group bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border-2 border-cyan-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Operating Room</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Complete surgical suite management with scheduling, equipment tracking,
                surgical team coordination, and real-time status monitoring.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  Surgery scheduling
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  Equipment & inventory tracking
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  Team coordination & status
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Flexible plans for hospitals of all sizes. No hidden fees, all features included.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="text-sm font-bold text-blue-500 mb-2">SMALL CLINICS</div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Basic</h3>
              <div className="flex items-center justify-center mb-6">
                <span className="text-2xl font-black text-blue-500">Competitive Pricing</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Patient management (EHR)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Appointment scheduling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Basic billing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Mobile app</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Email support</span>
                </li>
              </ul>
              <Link href="/en/contact" className="block w-full py-3 px-6 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all text-center">
                Get Pricing
              </Link>
            </div>

            {/* Professional Plan - Recommended */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 border-2 border-blue-500 hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold text-white">MEDIUM HOSPITALS</div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold text-white">
                  RECOMMENDED
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-2">Professional</h3>
              <div className="flex items-center justify-center mb-6">
                <span className="text-2xl font-black text-white">Custom Pricing</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">All basic features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Emergency department</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Laboratory (LIMS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Pharmacy management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">AI diagnostics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">24/7 phone support</span>
                </li>
              </ul>
              <Link href="/en/contact" className="block w-full py-3 px-6 bg-white text-blue-500 rounded-xl font-bold hover:bg-gray-100 transition-all text-center">
                Contact Sales
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="text-sm font-bold text-purple-600 mb-2">LARGE HOSPITALS</div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Enterprise</h3>
              <div className="flex items-center justify-center mb-6">
                <span className="text-2xl font-black text-purple-600">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">All modules included</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Radiology (PACS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Operating room management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">AI clinical decision support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Custom integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Dedicated account manager</span>
                </li>
              </ul>
              <Link href="/en/contact" className="block w-full py-3 px-6 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Transform Your Hospital Today
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8 max-w-3xl mx-auto">
            Join the next generation of healthcare management with Median. Fast setup, easy integration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/en/demo" className="px-8 py-4 bg-white text-blue-500 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all">
              Request Demo
            </Link>
            <Link href="/en/contact" className="px-8 py-4 bg-transparent text-white rounded-2xl font-black text-lg border-2 border-white hover:bg-white/10 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Median</h3>
                  <p className="text-sm text-gray-400">Healthcare Solutions</p>
                </div>
              </div>
              <p className="text-gray-400 font-semibold mb-6">
                The most trusted hospital management system. HIPAA compliant with advanced AI capabilities.
              </p>
              <div className="flex items-center gap-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-black text-white mb-4">Products</h4>
              <ul className="space-y-3">
                <li><a href="/en/features/patients" className="text-gray-400 hover:text-white font-semibold">Patient Management</a></li>
                <li><a href="/en/features/emergency" className="text-gray-400 hover:text-white font-semibold">Emergency Department</a></li>
                <li><a href="/en/features/laboratory" className="text-gray-400 hover:text-white font-semibold">Laboratory</a></li>
                <li><a href="/en/features/pharmacy" className="text-gray-400 hover:text-white font-semibold">Pharmacy</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-black text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="/en/about" className="text-gray-400 hover:text-white font-semibold">About Us</a></li>
                <li><a href="/en/contact" className="text-gray-400 hover:text-white font-semibold">Contact</a></li>
                <li><a href="/en/careers" className="text-gray-400 hover:text-white font-semibold">Careers</a></li>
                <li><a href="/en/press" className="text-gray-400 hover:text-white font-semibold">Press</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-black text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span className="font-semibold">median@ailydian.com</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span className="font-semibold">Jacksonville, Florida</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 font-semibold">
            <p>&copy; 2025 Median Healthcare Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

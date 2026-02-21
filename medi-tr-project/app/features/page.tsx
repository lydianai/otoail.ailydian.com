'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Users,
  AlertCircle,
  Bed,
  Calendar,
  TestTube,
  Pill,
  Scan,
  Stethoscope,
  DollarSign,
  UserCheck,
  Package,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Heart,
  Brain,
  Zap,
} from 'lucide-react';

export default function FeaturesPage() {
  const modules = [
    {
      icon: Users,
      title: 'Patient Management (EHR)',
      href: '/features/patients',
      color: 'blue',
      description: 'Complete Electronic Health Records with AI-powered clinical decision support, patient portal, and mobile app access',
      features: ['AI Clinical Decision Support', 'Patient Portal & Mobile App', 'Medical History Tracking', 'Medication Management', 'Allergy & Problem Lists', 'Clinical Documentation']
    },
    {
      icon: AlertCircle,
      title: 'Emergency Department',
      href: '/features/emergency',
      color: 'red',
      description: 'Real-time triage, bed management, and critical care tracking with state-of-the-art emergency workflows',
      features: ['Real-Time Triage System', 'ED Bed Management', 'Critical Care Tracking', 'Trauma Registry', 'Fast Track Workflows', 'ED Dashboard & Analytics']
    },
    {
      icon: Bed,
      title: 'Inpatient Care',
      href: '/features/inpatient',
      color: 'indigo',
      description: 'Advanced bed management, nursing workflows, and discharge planning for optimal inpatient care delivery',
      features: ['Bed Management & Census', 'Nursing Workflows', 'Admission/Transfer/Discharge', 'Rounds Management', 'Care Plans & Protocols', 'Discharge Planning']
    },
    {
      icon: Calendar,
      title: 'Appointments & Scheduling',
      href: '/features/appointments',
      color: 'purple',
      description: 'AI-powered scheduling, automated reminders, and multi-provider calendar management system',
      features: ['AI-Powered Scheduling', 'Multi-Provider Calendars', 'Automated Reminders (SMS/Email)', 'Waitlist Management', 'Telemedicine Integration', 'No-Show Prediction']
    },
    {
      icon: TestTube,
      title: 'Laboratory (LIMS)',
      href: '/features/laboratory',
      color: 'cyan',
      description: 'Full laboratory information system with specimen tracking, result management, and quality control',
      features: ['Specimen Tracking', 'Result Management', 'Quality Control & Calibration', 'Lab Instrument Integration', 'Reference Range Management', 'Critical Value Alerts']
    },
    {
      icon: Pill,
      title: 'Pharmacy Management',
      href: '/features/pharmacy',
      color: 'pink',
      description: 'e-Prescribing, drug interaction checking, inventory management, and automated dispensing system',
      features: ['e-Prescribing (EPCS)', 'Drug Interaction Checking', 'Inventory & Expiry Tracking', 'Automated Dispensing', 'Formulary Management', 'Medication Reconciliation']
    },
    {
      icon: Scan,
      title: 'Radiology (PACS)',
      href: '/features/radiology',
      color: 'violet',
      description: 'Digital imaging, DICOM integration, AI-assisted reading, and comprehensive radiology reporting',
      features: ['DICOM Integration', 'AI-Assisted Reading', 'Image Viewing & Storage', 'Radiology Reporting', 'Critical Finding Alerts', 'Workflow Management']
    },
    {
      icon: Stethoscope,
      title: 'Operating Room',
      href: '/features/operating-room',
      color: 'amber',
      description: 'Surgical scheduling, equipment tracking, anesthesia records, and comprehensive post-operative management',
      features: ['Surgical Scheduling', 'OR Time Optimization', 'Equipment & Supply Tracking', 'Anesthesia Documentation', 'Surgical Safety Checklist', 'Post-Op Management']
    },
    {
      icon: DollarSign,
      title: 'Billing & Revenue Cycle',
      href: '/features/billing',
      color: 'emerald',
      description: 'Automated billing, claims management, payment processing, and comprehensive revenue cycle analytics',
      features: ['Automated Charge Capture', 'Claims Management (837/835)', 'Payment Processing', 'Denial Management', 'Revenue Cycle Analytics', 'Patient Statements']
    },
    {
      icon: UserCheck,
      title: 'Staff & HR Management',
      href: '/features/staff',
      color: 'rose',
      description: 'Credentialing, shift scheduling, payroll integration, and performance tracking for healthcare staff',
      features: ['Credentialing & Privileges', 'Shift Scheduling', 'Time & Attendance', 'Payroll Integration', 'Performance Reviews', 'Competency Tracking']
    },
    {
      icon: Package,
      title: 'Inventory & Supply Chain',
      href: '/features/inventory',
      color: 'teal',
      description: 'Real-time inventory tracking, automated reordering, and comprehensive supplier management',
      features: ['Real-Time Inventory', 'Automated Reordering', 'Supplier Management', 'Par Level Optimization', 'Expiry Date Tracking', 'Cost Analysis']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      href: '/features/analytics',
      color: 'blue',
      description: 'Real-time dashboards, custom reports, predictive analytics, and comprehensive business intelligence',
      features: ['Real-Time Dashboards', 'Custom Report Builder', 'Predictive Analytics', 'Quality Metrics (HEDIS/MIPS)', 'Financial Analytics', 'Clinical Outcomes']
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; hover: string; }> = {
      blue: { bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', icon: 'bg-gradient-to-br from-blue-600 to-blue-700', hover: 'hover:border-blue-400' },
      red: { bg: 'from-red-50 to-red-100', border: 'border-red-200', icon: 'bg-gradient-to-br from-red-600 to-red-700', hover: 'hover:border-red-400' },
      indigo: { bg: 'from-indigo-50 to-indigo-100', border: 'border-indigo-200', icon: 'bg-gradient-to-br from-indigo-600 to-indigo-700', hover: 'hover:border-indigo-400' },
      purple: { bg: 'from-purple-50 to-purple-100', border: 'border-purple-200', icon: 'bg-gradient-to-br from-purple-600 to-purple-700', hover: 'hover:border-purple-400' },
      cyan: { bg: 'from-cyan-50 to-cyan-100', border: 'border-cyan-200', icon: 'bg-gradient-to-br from-cyan-600 to-cyan-700', hover: 'hover:border-cyan-400' },
      pink: { bg: 'from-pink-50 to-pink-100', border: 'border-pink-200', icon: 'bg-gradient-to-br from-pink-600 to-pink-700', hover: 'hover:border-pink-400' },
      violet: { bg: 'from-violet-50 to-violet-100', border: 'border-violet-200', icon: 'bg-gradient-to-br from-violet-600 to-violet-700', hover: 'hover:border-violet-400' },
      amber: { bg: 'from-amber-50 to-amber-100', border: 'border-amber-200', icon: 'bg-gradient-to-br from-amber-600 to-amber-700', hover: 'hover:border-amber-400' },
      emerald: { bg: 'from-emerald-50 to-emerald-100', border: 'border-emerald-200', icon: 'bg-gradient-to-br from-emerald-600 to-emerald-700', hover: 'hover:border-emerald-400' },
      rose: { bg: 'from-rose-50 to-rose-100', border: 'border-rose-200', icon: 'bg-gradient-to-br from-rose-600 to-rose-700', hover: 'hover:border-rose-400' },
      teal: { bg: 'from-teal-50 to-teal-100', border: 'border-teal-200', icon: 'bg-gradient-to-br from-teal-600 to-teal-700', hover: 'hover:border-teal-400' },
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Complete Hospital
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Management Platform
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
            12 integrated modules to manage every aspect of your healthcare facility. From patient care to revenue cycle,
            all in one unified platform powered by AI.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm font-bold text-gray-700 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              12 Integrated Modules
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI-Powered
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              Real-Time Data
            </div>
          </div>

          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Request Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">All Features You Need</h2>
            <p className="text-xl text-gray-600 font-semibold">Click any module to learn more</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const colors = getColorClasses(module.color);
              const Icon = module.icon;

              return (
                <Link
                  key={index}
                  href={module.href}
                  className={`group bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border-2 ${colors.border} ${colors.hover} transition-all hover:shadow-xl`}
                >
                  <div className={`h-16 w-16 rounded-2xl ${colors.icon} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-3">{module.title}</h3>
                  <p className="text-gray-700 font-semibold mb-4 leading-relaxed">{module.description}</p>

                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            See Median in Action
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            Schedule a personalized demo to see how our platform can transform your healthcare facility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black hover:shadow-2xl transition-all"
            >
              Request Demo
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent text-white rounded-2xl font-black border-2 border-white hover:bg-white/10 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

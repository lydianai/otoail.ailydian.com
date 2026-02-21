'use client';

import Header from '@/components/layout/Header';
import {
  CheckCircle,
  ArrowRight,
  FileText,
  Users,
  Calendar,
  Activity,
  Shield,
  Clock,
  Smartphone,
  Search,
  AlertCircle,
  FileCheck,
  TrendingUp,
  Bell
} from 'lucide-react';
import Link from 'next/link';

export default function PatientManagementPage() {
  const capabilities = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Comprehensive Electronic Health Records",
      description: "Complete patient medical history, vitals, medications, allergies, immunizations, and clinical notes in one unified system. Support for multiple encounters, visit types, and specialty-specific templates."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Patient Portal & Engagement",
      description: "Secure patient portal for appointment scheduling, test results, medication refills, provider messaging, and health education. Mobile apps for iOS and Android with biometric authentication."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Scheduling & Registration",
      description: "Intelligent appointment scheduling with conflict detection, resource management, waitlist automation, and patient reminders via SMS/email. Online self-scheduling with insurance verification."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Clinical Decision Support",
      description: "AI-powered clinical alerts for drug interactions, allergy warnings, duplicate therapy detection, and evidence-based care recommendations. Integrated with CDC and WHO guidelines."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Advanced Search & Reporting",
      description: "Powerful search across all patient records with custom filters. Population health analytics, chronic disease registries, quality metrics tracking, and customizable clinical reports."
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "E-Prescribing & Medication Management",
      description: "Fully integrated e-prescribing with formulary checks, prior authorization support, medication reconciliation, and pharmacy integration. Track medication adherence and refill history."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "HIPAA Compliance & Audit Trails",
      description: "Complete audit logging of all patient record access and modifications. Role-based access control, data encryption at rest and in transit, and automated compliance reporting for HIPAA, HITECH, and state regulations."
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Clinical Workflows & Task Management",
      description: "Automated clinical workflows for chronic disease management, preventive care reminders, referral tracking, and care coordination. Task lists, care plans, and team collaboration tools."
    }
  ];

  const benefits = [
    {
      title: "Reduce Documentation Time by 40%",
      description: "Smart templates, voice dictation, and AI-assisted documentation help clinicians complete charts faster while improving quality.",
      stat: "40%"
    },
    {
      title: "Improve Patient Satisfaction",
      description: "Patient portal access, shorter wait times, and better care coordination lead to higher patient satisfaction scores and retention.",
      stat: "95%"
    },
    {
      title: "Enhance Care Quality",
      description: "Clinical decision support, preventive care tracking, and population health tools help deliver evidence-based, coordinated care.",
      stat: "5-Star"
    },
    {
      title: "Boost Revenue",
      description: "Complete documentation, accurate coding suggestions, and reduced claim denials increase revenue per visit by an average of 15%.",
      stat: "+15%"
    }
  ];

  const useCases = [
    {
      specialty: "Primary Care",
      features: ["Chronic disease management", "Preventive care tracking", "Family medicine workflows", "Pediatric growth charts"]
    },
    {
      specialty: "Specialty Clinics",
      features: ["Cardiology templates", "Oncology protocols", "Endocrinology flowsheets", "Custom specialty forms"]
    },
    {
      specialty: "Multi-Site Practices",
      features: ["Centralized patient records", "Cross-site scheduling", "Provider coverage", "Unified reporting"]
    },
    {
      specialty: "Hospital Integration",
      features: ["Inpatient/outpatient continuity", "ED handoffs", "Consult management", "Discharge planning"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-gray-900">
                  Patient Management & EHR
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Complete <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Electronic Health Records</span>
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Modern, intuitive EHR system designed for clinicians. Spend less time on documentation and more time with patients. Full clinical workflows, patient portal, e-prescribing, and decision support in one platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/trial"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/demo"
                  className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-lg hover:shadow-xl transition-all border-2 border-gray-200"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black">
                      JD
                    </div>
                    <div>
                      <div className="font-black text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-600 font-semibold">MRN: 123456 | DOB: 01/15/1980</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <span className="font-bold text-gray-900">Vitals</span>
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">BP: 120/80</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-purple-600" />
                        <span className="font-bold text-gray-900">Medications</span>
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">5 active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-green-600" />
                        <span className="font-bold text-gray-900">Allergies</span>
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">Penicillin</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <span className="font-bold text-gray-900">Last Visit</span>
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Everything You Need for Patient Care
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Comprehensive EHR features designed to streamline clinical workflows and improve patient outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white mb-4">
                  {capability.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{capability.title}</h3>
                <p className="text-gray-600 font-semibold leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Measurable Impact on Your Practice
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Real results from healthcare organizations using Median EHR
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border-2 border-gray-100 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {benefit.stat}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 font-semibold text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Specialized for Your Practice
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Tailored workflows and templates for every specialty and practice setting
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 transition-all">
                <h3 className="text-xl font-black text-gray-900 mb-4">{useCase.specialty}</h3>
                <ul className="space-y-3">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & Interoperability */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Seamless Interoperability
              </h2>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Median EHR integrates with your entire healthcare ecosystem for complete care coordination
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">HL7 & FHIR Compliance</div>
                    <div className="text-gray-600 font-semibold">
                      Full support for HL7 v2, CDA, and FHIR R4 standards for bidirectional data exchange
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Health Information Exchange (HIE)</div>
                    <div className="text-gray-600 font-semibold">
                      Query and retrieve patient data from regional and national HIEs in real-time
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Laboratory Integration</div>
                    <div className="text-gray-600 font-semibold">
                      Direct integration with major lab systems for automated order sending and result receiving
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Pharmacy Networks</div>
                    <div className="text-gray-600 font-semibold">
                      SureScripts certified for e-prescribing, formulary checks, and medication history
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Medical Device Integration</div>
                    <div className="text-gray-600 font-semibold">
                      Automatic vital signs import from connected devices, scales, and monitoring equipment
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Mobile Access Anywhere</h3>
                <p className="text-gray-600 font-semibold">
                  Native iOS and Android apps for providers and patients
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Provider Mobile App</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Complete chart access and documentation</li>
                    <li>• Secure messaging with care team</li>
                    <li>• E-prescribing and lab review</li>
                    <li>• Voice dictation and photo upload</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Patient Mobile App</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Appointment scheduling and reminders</li>
                    <li>• Test results and health records</li>
                    <li>• Medication refills and tracking</li>
                    <li>• Video visits and secure messaging</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <div className="font-black text-gray-900 mb-1">Offline Mode Available</div>
                  <p className="text-sm text-gray-700 font-semibold">
                    Continue working during internet outages with automatic sync
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Modernize Your EHR?
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            Join thousands of providers who trust Median for their patient management needs. Start your free 30-day trial today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trial"
              className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all border-2 border-white/20"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="text-white/80 font-semibold mt-6">
            No credit card required • Full feature access • 30-day trial
          </p>
        </div>
      </section>
    </div>
  );
}

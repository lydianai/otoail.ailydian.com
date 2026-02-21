'use client';

import Header from '@/components/layout/Header';
import {
  CheckCircle,
  ArrowRight,
  Bed,
  ClipboardList,
  Users,
  Activity,
  UserCheck,
  FileText,
  Heart,
  Shield,
  Calendar,
  Utensils,
  Bell,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function InpatientCarePage() {
  const capabilities = [
    {
      icon: <Bed className="h-6 w-6" />,
      title: "ADT Management & Bed Census",
      description: "Comprehensive admission, discharge, and transfer workflows with real-time bed management. Track census by unit, service line, and attending physician. Automated bed assignment based on patient acuity, isolation requirements, and clinical needs."
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Nursing Workflows & Shift Handoffs",
      description: "Streamlined nursing documentation with integrated care plans, assessments, and interventions. Structured shift handoff tools using SBAR methodology. Task management, rounding checklists, and real-time patient status updates."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Medication Administration Records (MAR)",
      description: "Electronic MAR with barcode scanning for medication verification. Real-time alerts for missed doses, duplicate orders, and drug interactions. Integration with pharmacy systems for automated medication reconciliation and administration tracking."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Clinical Documentation & Care Plans",
      description: "Comprehensive clinical documentation tools including nursing notes, progress notes, and multidisciplinary care plans. Smart templates for common conditions: CHF, COPD, diabetes, pneumonia. Voice dictation and mobile documentation options."
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Discharge Planning & Coordination",
      description: "Integrated discharge planning starting from admission. Care coordination with case management, social work, and post-acute facilities. Automated discharge instructions, prescription management, and follow-up appointment scheduling."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Patient Safety & Fall Risk Management",
      description: "Automated safety rounds with real-time alerts for high-risk patients. Fall risk assessments with Morse Fall Scale integration. Pressure injury prevention protocols, restraint monitoring, and medication safety checks."
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Nutrition & Dietary Management",
      description: "Integrated dietary ordering with allergy alerts and diet restriction tracking. Real-time meal tray management and consumption documentation. Nutritional assessment tools and consultation workflows for registered dietitians."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-Disciplinary Team Coordination",
      description: "Collaborative care platform connecting physicians, nurses, therapists, pharmacists, and case managers. Real-time communication tools, team rounding support, and interdisciplinary care conferences. Integrated consult management system."
    }
  ];

  const benefits = [
    {
      title: "Reduce Length of Stay",
      description: "Streamlined workflows, better care coordination, and proactive discharge planning help patients get home faster.",
      stat: "1.2 days"
    },
    {
      title: "Improve Nurse Satisfaction",
      description: "Reduce documentation burden and administrative tasks, allowing nurses to spend more time with patients.",
      stat: "40%"
    },
    {
      title: "Decrease Readmissions",
      description: "Better discharge planning, medication reconciliation, and follow-up coordination reduce 30-day readmissions.",
      stat: "18%"
    },
    {
      title: "Enhance Patient Experience",
      description: "Coordinated care, better communication, and attentive nursing care lead to higher HCAHPS scores.",
      stat: "4.7"
    }
  ];

  const safetyFeatures = [
    {
      name: "Fall Prevention Program",
      features: ["Morse Fall Scale assessment", "High-risk patient alerts", "Hourly rounding reminders", "Bed alarm integration"]
    },
    {
      name: "Pressure Injury Prevention",
      features: ["Braden Scale documentation", "Turn clock reminders", "Skin assessment tracking", "Prevention protocol alerts"]
    },
    {
      name: "Medication Safety",
      features: ["Five rights verification", "Barcode scanning", "High-alert medication flags", "Allergy checking"]
    },
    {
      name: "Clinical Deterioration",
      features: ["Early warning scores (NEWS2)", "Rapid response activation", "Sepsis screening", "Vital sign trending"]
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
                <Bed className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-gray-900">
                  Inpatient Care Management
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Comprehensive <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Inpatient Care</span> Platform
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Complete hospital floor management system from admission to discharge. Streamline nursing workflows, enhance care coordination, and improve patient outcomes with our integrated inpatient solution.
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
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                    <h3 className="font-black text-gray-900">4 East - Medical Unit</h3>
                    <div className="text-sm font-bold text-gray-600">28/32 Beds</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Room 401 - J. Smith</div>
                          <div className="text-xs text-gray-600 font-semibold">Fall Risk - Meds Due</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-red-600">HIGH RISK</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Room 403 - M. Johnson</div>
                          <div className="text-xs text-gray-600 font-semibold">Stable - Discharge Plan</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-blue-600">DC TODAY</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 border-2 border-purple-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Room 405 - R. Davis</div>
                          <div className="text-xs text-gray-600 font-semibold">Post-op Day 2</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-purple-600">POST-OP</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Room 407 - A. Wilson</div>
                          <div className="text-xs text-gray-600 font-semibold">Stable - Routine Care</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-green-600">STABLE</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-gray-100 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-2xl font-black text-gray-900">4.2</div>
                      <div className="text-xs text-gray-600 font-semibold">Avg LOS</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">12</div>
                      <div className="text-xs text-gray-600 font-semibold">Tasks Due</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">88%</div>
                      <div className="text-xs text-gray-600 font-semibold">Occupancy</div>
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
              Complete Inpatient Management System
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Everything you need to deliver exceptional inpatient care from admission through discharge
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
              Measurable Impact on Patient Care
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Hospitals using Median Inpatient see significant improvements in quality metrics
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

      {/* Patient Safety Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Patient Safety at the Core
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Integrated safety protocols and proactive monitoring to prevent adverse events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((protocol, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{protocol.name}</h3>
                <ul className="space-y-3">
                  {protocol.features.map((feature, featureIndex) => (
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

      {/* Real-Time Monitoring */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Real-Time Patient Status</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Medication On-Time Rate</span>
                    <span className="text-2xl font-black text-green-600">96%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{width: '96%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 95%</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Fall Prevention Compliance</span>
                    <span className="text-2xl font-black text-blue-600">98%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{width: '98%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 95%</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Documentation Completion</span>
                    <span className="text-2xl font-black text-purple-600">94%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 90%</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">HCAHPS Score</span>
                    <span className="text-2xl font-black text-orange-600">4.7</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 4.5</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Data-Driven Nursing Excellence
              </h2>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Empower your nursing staff with real-time insights and automated workflows
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Real-Time Patient Monitoring</div>
                    <div className="text-gray-600 font-semibold">
                      Track patient status, vital signs, and early warning scores with automated alerts for clinical deterioration
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Intelligent Task Management</div>
                    <div className="text-gray-600 font-semibold">
                      Automated task lists, rounding reminders, and workflow optimization to ensure nothing falls through the cracks
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Seamless Shift Handoffs</div>
                    <div className="text-gray-600 font-semibold">
                      Structured SBAR handoff tools ensure critical information is communicated during shift changes
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Mobile Documentation</div>
                    <div className="text-gray-600 font-semibold">
                      Document at the bedside with mobile apps, voice dictation, and smart templates that reduce charting time
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Quality Metrics Dashboard</div>
                    <div className="text-gray-600 font-semibold">
                      Track unit-level performance, patient satisfaction, and quality indicators with customizable dashboards
                    </div>
                  </div>
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
            Transform Your Inpatient Care Delivery
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            See how Median can improve patient outcomes, enhance nursing satisfaction, and streamline hospital operations. Start your free trial today.
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
            No credit card required • Full inpatient module access • 30-day trial
          </p>
        </div>
      </section>
    </div>
  );
}

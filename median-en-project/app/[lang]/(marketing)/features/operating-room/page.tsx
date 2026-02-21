'use client';

import Header from '@/components/layout/Header';
import {
  CheckCircle,
  ArrowRight,
  Scissors,
  Calendar,
  ClipboardCheck,
  Activity,
  Package,
  Timer,
  FileText,
  DollarSign,
  Shield,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function OperatingRoomPage() {
  const capabilities = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Surgical Scheduling & Block Time",
      description: "Advanced OR scheduling with surgeon block time management, conflict detection, and automated case sequencing. Real-time availability checking, preference-based scheduling, and integrated case requests from surgeons' offices."
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "Pre-Operative Assessment & Clearance",
      description: "Comprehensive pre-op workflows including H&P documentation, anesthesia evaluation, and medical clearance tracking. Automated alerts for missing labs, consults, or clearances. Patient readiness dashboard for OR coordinators."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Anesthesia Records & Monitoring",
      description: "Integrated anesthesia information management system (AIMS) with vital signs monitoring, medication administration, and automated anesthesia records. Real-time integration with physiologic monitors and ventilators."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Intra-Operative Documentation",
      description: "Digital operative notes with procedure-specific templates, implant logging, and specimen tracking. Time-stamped surgical events including incision, critical steps, and closure. Voice-to-text dictation for efficient documentation."
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Surgical Equipment & Instrument Tracking",
      description: "Comprehensive instrument and equipment management with barcode/RFID tracking. Automated sterilization tracking, implant lot number documentation, and preference card integration. Supply chain integration for just-in-time inventory."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "PACU & Post-Op Recovery Management",
      description: "Post-anesthesia care unit module with Aldrete scoring, pain management protocols, and discharge criteria tracking. Automated alerts for abnormal vital signs, PONV protocols, and recovery milestones. Seamless handoff to inpatient units."
    },
    {
      icon: <Scissors className="h-6 w-6" />,
      title: "Surgical Preference Cards",
      description: "Digital preference card management for surgeon-specific needs including instruments, supplies, equipment positioning, and room setup requirements. Version control and easy updates with surgeon approval workflows."
    },
    {
      icon: <Timer className="h-6 w-6" />,
      title: "OR Turnover Time Tracking",
      description: "Real-time tracking of OR efficiency metrics including turnover time, first case on-time starts, and room utilization. Automated time stamps for key milestones: patient in room, incision, closure, and patient out of room."
    }
  ];

  const benefits = [
    {
      title: "Reduce Turnover Time",
      description: "Streamlined workflows and real-time coordination help decrease OR turnover time between cases.",
      stat: "12 min"
    },
    {
      title: "Increase OR Utilization",
      description: "Better scheduling, reduced delays, and efficient case management improve OR utilization rates.",
      stat: "82%"
    },
    {
      title: "First Case On-Time Starts",
      description: "Pre-op readiness tracking and automated alerts help achieve on-time starts for first cases.",
      stat: "91%"
    },
    {
      title: "Improve Surgical Margins",
      description: "Accurate case costing, supply tracking, and billing capture improve surgical profitability.",
      stat: "15%"
    }
  ];

  const safetyCompliance = [
    {
      name: "WHO Surgical Safety Checklist",
      features: ["Sign-in verification", "Time-out documentation", "Sign-out completion", "Mandatory compliance alerts"]
    },
    {
      name: "Surgical Site Verification",
      features: ["Site marking confirmation", "Laterality verification", "Consent matching", "Image availability check"]
    },
    {
      name: "Implant & Specimen Tracking",
      features: ["Lot number documentation", "Implant registry reporting", "Specimen labeling", "Pathology integration"]
    },
    {
      name: "Case Costing & Billing",
      features: ["Supply utilization tracking", "Implant cost capture", "Staff time documentation", "Automated charge posting"]
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
                <Scissors className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-gray-900">
                  Operating Room Management
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Optimize Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Operating Room</span> Performance
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Comprehensive surgical services platform that maximizes OR efficiency, ensures patient safety, and improves surgical outcomes. From scheduling to PACU discharge, manage every aspect of perioperative care.
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
                    <h3 className="font-black text-gray-900">OR Schedule - Today</h3>
                    <div className="text-sm font-bold text-gray-600">8 Rooms Active</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-600 animate-pulse"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">OR 1 - Dr. Smith</div>
                          <div className="text-xs text-gray-600 font-semibold">Total Knee - In Progress</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-green-600">2:15</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">OR 3 - Dr. Johnson</div>
                          <div className="text-xs text-gray-600 font-semibold">Cholecystectomy - Setup</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-blue-600">8m</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 border-2 border-purple-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">OR 5 - Dr. Davis</div>
                          <div className="text-xs text-gray-600 font-semibold">Spinal Fusion - PACU</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-purple-600">COMPLETE</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">OR 7 - Dr. Wilson</div>
                          <div className="text-xs text-gray-600 font-semibold">Appendectomy - Waiting</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-yellow-600">DELAYED</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-gray-100 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-2xl font-black text-gray-900">18m</div>
                      <div className="text-xs text-gray-600 font-semibold">Turnover</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">89%</div>
                      <div className="text-xs text-gray-600 font-semibold">On-Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">78%</div>
                      <div className="text-xs text-gray-600 font-semibold">Utilization</div>
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
              Complete Perioperative Management Platform
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              End-to-end surgical workflow management from pre-op to PACU discharge
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
              Drive OR Efficiency & Profitability
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Healthcare facilities using Median OR Management see substantial operational improvements
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

      {/* Safety & Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Safety & Compliance Built-In
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Enforce surgical safety protocols and maintain regulatory compliance automatically
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyCompliance.map((protocol, index) => (
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

      {/* OR Analytics Dashboard */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-6">OR Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">OR Utilization Rate</span>
                    <span className="text-2xl font-black text-green-600">82%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{width: '82%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 80%</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">First Case On-Time Starts</span>
                    <span className="text-2xl font-black text-blue-600">91%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{width: '91%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 90%</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Average Turnover Time</span>
                    <span className="text-2xl font-black text-purple-600">18 min</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 20 min</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Safety Checklist Compliance</span>
                    <span className="text-2xl font-black text-orange-600">100%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 100%</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Data-Driven Surgical Excellence
              </h2>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Make informed decisions with comprehensive OR analytics and real-time performance tracking
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Real-Time OR Dashboard</div>
                    <div className="text-gray-600 font-semibold">
                      Monitor all ORs simultaneously with live status updates, case progress, and delay notifications
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Surgeon Performance Analytics</div>
                    <div className="text-gray-600 font-semibold">
                      Track surgeon-specific metrics including case volume, average case time, and on-time performance
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Block Time Optimization</div>
                    <div className="text-gray-600 font-semibold">
                      Analyze block time utilization to optimize scheduling and maximize OR efficiency
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Case Costing & Profitability</div>
                    <div className="text-gray-600 font-semibold">
                      Track surgical case costs, supply utilization, and contribution margins for financial optimization
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Quality & Safety Reporting</div>
                    <div className="text-gray-600 font-semibold">
                      Generate reports for surgical site infections, readmissions, and other quality indicators
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
            Transform Your Operating Room Performance
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            See how Median can increase OR efficiency, improve surgical safety, and boost profitability. Start your free trial today.
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
            No credit card required • Full OR module access • 30-day trial
          </p>
        </div>
      </section>
    </div>
  );
}

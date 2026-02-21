'use client';

import Header from '@/components/layout/Header';
import {
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Clock,
  Users,
  Activity,
  MapPin,
  FileText,
  Truck,
  Radio,
  Zap,
  BarChart3,
  UserCheck,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function EmergencyDepartmentPage() {
  const capabilities = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Intelligent Triage & Prioritization",
      description: "ESI-based triage system with color-coded patient tracking, acuity scoring, and automated re-triage alerts. Track door-to-doctor times, ESI level distribution, and wait time analytics in real-time."
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Real-Time Bed Management",
      description: "Dynamic track board showing all ED beds, treatment rooms, and patient locations. Automatic bed assignment, capacity alerts, and boarding patient tracking. Integration with hospital bed management system."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Fast Track & Streaming",
      description: "Separate workflows for fast track, major trauma, pediatrics, and behavioral health. Automated patient streaming based on chief complaint and acuity. Optimize resource allocation and patient flow."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Quick Documentation Templates",
      description: "Pre-built templates for common ED presentations: chest pain, abdominal pain, trauma, stroke, sepsis. Smart macros, dot phrases, and voice dictation to reduce documentation time by 50%."
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "EMS & Ambulance Integration",
      description: "Receive pre-arrival notifications from EMS with patient vitals, mechanism of injury, and estimated arrival time. Direct communication with paramedics. Activate trauma team or stroke alerts automatically."
    },
    {
      icon: <Radio className="h-6 w-6" />,
      title: "Code & Trauma Team Activation",
      description: "One-click activation of code blue, stroke, STEMI, trauma, and sepsis protocols. Automatic team notifications via SMS, pager, and mobile app. Track response times and protocol adherence."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "ED Performance Dashboards",
      description: "Real-time monitoring of key ED metrics: door-to-doctor time, length of stay, patients per hour, left without being seen (LWBS), and admission rates. Customizable dashboards for charge nurses and directors."
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Disposition & Handoff Tools",
      description: "Streamlined admission, discharge, and transfer workflows. Electronic handoff tools for admissions and ED-to-floor transfers. Automatic bed requests and transport coordination. Discharge instructions and prescriptions."
    }
  ];

  const benefits = [
    {
      title: "Reduce Door-to-Doctor Time",
      description: "Intelligent triage, automated bed assignment, and streamlined workflows reduce wait times and improve patient throughput.",
      stat: "30%"
    },
    {
      title: "Decrease Length of Stay",
      description: "Fast documentation, integrated CPOE, and real-time bed tracking help move patients through the ED efficiently.",
      stat: "25%"
    },
    {
      title: "Lower LWBS Rates",
      description: "Better patient communication, accurate wait time estimates, and fast-track options reduce patients leaving without treatment.",
      stat: "50%"
    },
    {
      title: "Improve Patient Satisfaction",
      description: "Shorter wait times, better communication, and coordinated care lead to higher patient satisfaction scores and Press Ganey rankings.",
      stat: "4.5★"
    }
  ];

  const protocolTypes = [
    {
      name: "Trauma Activation",
      features: ["Level 1/2/3 trauma alerts", "Automatic surgeon notification", "Trauma bay preparation", "Time-stamped event tracking"]
    },
    {
      name: "Stroke Protocol",
      features: ["NIH Stroke Scale documentation", "Code stroke activation", "CT and MRI ordering", "tPA administration tracking"]
    },
    {
      name: "STEMI Protocol",
      features: ["12-lead ECG integration", "Cardiology team alert", "Cath lab activation", "Door-to-balloon tracking"]
    },
    {
      name: "Sepsis Bundle",
      features: ["Sepsis screening alerts", "3-hour bundle tracking", "Antibiotic timing", "Lactate monitoring"]
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-full mb-6">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-bold text-gray-900">
                  Emergency Department Management
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Optimize Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Emergency Department</span>
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Purpose-built ED information system that improves patient flow, reduces wait times, and enhances quality of care. From triage to disposition, manage every aspect of emergency care efficiently.
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
              <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                    <h3 className="font-black text-gray-900">ED Track Board</h3>
                    <div className="text-sm font-bold text-gray-600">12 Patients</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Bed 1 - ESI 1</div>
                          <div className="text-xs text-gray-600 font-semibold">Chest Pain - 15 min</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-red-600">CRITICAL</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 border-2 border-orange-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-orange-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Bed 3 - ESI 2</div>
                          <div className="text-xs text-gray-600 font-semibold">Abd Pain - 45 min</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-orange-600">URGENT</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Bed 5 - ESI 3</div>
                          <div className="text-xs text-gray-600 font-semibold">Laceration - 1h 20m</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-yellow-600">STABLE</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-600"></div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Fast Track - ESI 4</div>
                          <div className="text-xs text-gray-600 font-semibold">Minor injury - 30 min</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-green-600">MINOR</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-gray-100 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-2xl font-black text-gray-900">23m</div>
                      <div className="text-xs text-gray-600 font-semibold">Avg Wait</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">3.2h</div>
                      <div className="text-xs text-gray-600 font-semibold">Avg LOS</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">85%</div>
                      <div className="text-xs text-gray-600 font-semibold">Capacity</div>
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
              Complete Emergency Department Solution
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Every tool you need to manage high-acuity, fast-paced emergency care
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white mb-4">
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
              Proven Results for Emergency Departments
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Healthcare facilities using Median ED see dramatic improvements in key metrics
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

      {/* Clinical Protocols */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Built-In Clinical Protocols
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Pre-configured evidence-based protocols for time-sensitive emergencies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {protocolTypes.map((protocol, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-red-400 transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{protocol.name}</h3>
                <ul className="space-y-3">
                  {protocol.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ED Metrics & Analytics */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Real-Time ED Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Door-to-Doctor Time</span>
                    <span className="text-2xl font-black text-green-600">18 min</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 20 min</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Average Length of Stay</span>
                    <span className="text-2xl font-black text-blue-600">3.2 hrs</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 3.5 hrs</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">LWBS Rate</span>
                    <span className="text-2xl font-black text-purple-600">2.1%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: &lt;3%</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Patient Satisfaction</span>
                    <span className="text-2xl font-black text-orange-600">4.6 ★</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-1">Target: 4.5 ★</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Data-Driven ED Operations
              </h2>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Make informed decisions with comprehensive analytics and real-time dashboards
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Live Performance Tracking</div>
                    <div className="text-gray-600 font-semibold">
                      Monitor door-to-doctor, LOS, LWBS, and patient satisfaction in real-time with visual dashboards
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Historical Trend Analysis</div>
                    <div className="text-gray-600 font-semibold">
                      Identify patterns, peak hours, and seasonal variations to optimize staffing and resource allocation
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Provider Performance Metrics</div>
                    <div className="text-gray-600 font-semibold">
                      Track individual provider metrics including patients per hour, documentation time, and quality indicators
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Benchmarking & Compliance</div>
                    <div className="text-gray-600 font-semibold">
                      Compare your ED against national benchmarks and track compliance with CMS quality measures
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Custom Report Builder</div>
                    <div className="text-gray-600 font-semibold">
                      Create custom reports for administration, medical staff committees, and quality improvement initiatives
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
            Transform Your Emergency Department
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            See how Median can reduce wait times, improve patient flow, and enhance care quality. Start your free trial today.
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
            No credit card required • Full ED module access • 30-day trial
          </p>
        </div>
      </section>
    </div>
  );
}

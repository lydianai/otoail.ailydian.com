'use client';

import Header from '@/components/layout/Header';
import {
  CheckCircle,
  ArrowRight,
  FlaskConical,
  Microscope,
  BarChart3,
  QrCode,
  AlertTriangle,
  FileCheck,
  Clock,
  Zap,
  Shield,
  Network,
  TrendingUp,
  Printer
} from 'lucide-react';
import Link from 'next/link';

export default function LaboratoryPage() {
  const capabilities = [
    {
      icon: <FlaskConical className="h-6 w-6" />,
      title: "Comprehensive Test Management",
      description: "Complete test catalog management for chemistry, hematology, microbiology, immunology, molecular diagnostics, and anatomic pathology. Configure panels, profiles, and reflex testing rules. Support for both in-house and send-out tests."
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "Specimen Tracking & Barcoding",
      description: "Full specimen lifecycle tracking from collection to disposal. Barcode labeling, chain of custody documentation, and automated specimen routing. Real-time location tracking and temperature monitoring for sensitive samples."
    },
    {
      icon: <Microscope className="h-6 w-6" />,
      title: "Laboratory Instrument Integration",
      description: "Bidirectional interface with analyzers, chemistry systems, hematology counters, microbiology systems, and more. Automatic result import with delta checks, critical value alerts, and QC validation. Support for HL7, ASTM, and proprietary protocols."
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Result Verification & Release",
      description: "Configurable review and release workflows for manual and auto-verification. Delta checks against previous results, reference range validation, and critical value management. Electronic signature and audit trail for all verifications."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Critical Value Management",
      description: "Automatic critical value detection with customizable thresholds. Alerts to ordering providers via mobile app, SMS, and pager. Document notification attempts and provider acknowledgment. Critical value logs and reporting."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Quality Control & Compliance",
      description: "Integrated QC module with Westgard rules, Levey-Jennings charts, and automatic QC lockout. Track proficiency testing, instrument maintenance, and competency assessments. CAP, CLIA, and ISO 15189 compliance reporting."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Turnaround Time Monitoring",
      description: "Real-time TAT tracking from order to result for all test types. Identify bottlenecks in collection, processing, analysis, and verification. Customizable alerts for delayed specimens and aging orders. Historical trend analysis and benchmarking."
    },
    {
      icon: <Printer className="h-6 w-6" />,
      title: "Flexible Result Reporting",
      description: "Customizable result reports with graphs, trend charts, and historical comparisons. Automatic result delivery to EMR, patient portal, and referring providers. Support for PDF reports, HL7 messages, and fax delivery."
    }
  ];

  const benefits = [
    {
      title: "Reduce TAT by 35%",
      description: "Automated workflows, instrument integration, and real-time tracking significantly reduce turnaround time for all test types.",
      stat: "35%"
    },
    {
      title: "Eliminate Transcription Errors",
      description: "Bidirectional instrument interfaces and barcode tracking eliminate manual data entry errors and improve accuracy.",
      stat: "99.9%"
    },
    {
      title: "Increase Productivity",
      description: "Auto-verification, batch processing, and streamlined workflows allow staff to process 30% more specimens per day.",
      stat: "+30%"
    },
    {
      title: "Ensure Compliance",
      description: "Built-in QC, audit trails, and regulatory reporting make CAP, CLIA, and ISO compliance easier than ever.",
      stat: "100%"
    }
  ];

  const testDepartments = [
    {
      name: "Clinical Chemistry",
      features: ["Metabolic panels", "Cardiac markers", "Therapeutic drug monitoring", "Auto-verification rules"]
    },
    {
      name: "Hematology",
      features: ["CBC with differential", "Coagulation studies", "Blood smear review", "Reflex testing protocols"]
    },
    {
      name: "Microbiology",
      features: ["Culture & sensitivity", "Antibiogram tracking", "Organism identification", "Susceptibility testing"]
    },
    {
      name: "Molecular Diagnostics",
      features: ["PCR testing", "Genetic sequencing", "Viral load monitoring", "Pharmacogenomics"]
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full mb-6">
                <FlaskConical className="h-5 w-5 text-green-600" />
                <span className="text-sm font-bold text-gray-900">
                  Laboratory Information Management System
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Modern <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Laboratory LIMS</span>
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Complete laboratory information management system for clinical and anatomic pathology. Streamline workflows, ensure quality, and deliver accurate results faster with intelligent automation and instrument integration.
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
              <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                    <h3 className="font-black text-gray-900">Lab Worklist</h3>
                    <div className="text-sm font-bold text-gray-600">24 Pending</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FlaskConical className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Comprehensive Metabolic Panel</div>
                          <div className="text-xs text-gray-600 font-semibold">MRN: 123456 - STAT</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-green-600 px-2 py-1 bg-green-100 rounded">READY</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Microscope className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">CBC with Differential</div>
                          <div className="text-xs text-gray-600 font-semibold">MRN: 789012 - Routine</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-blue-600 px-2 py-1 bg-blue-100 rounded">TESTING</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 border-2 border-purple-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Lipid Panel</div>
                          <div className="text-xs text-gray-600 font-semibold">MRN: 345678 - Fasting</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-purple-600 px-2 py-1 bg-purple-100 rounded">VERIFY</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 border-2 border-orange-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Troponin I - Critical</div>
                          <div className="text-xs text-gray-600 font-semibold">MRN: 901234 - STAT</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-orange-600 px-2 py-1 bg-orange-100 rounded">CRITICAL</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-gray-100 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-2xl font-black text-gray-900">45m</div>
                      <div className="text-xs text-gray-600 font-semibold">Avg TAT</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">98.5%</div>
                      <div className="text-xs text-gray-600 font-semibold">QC Pass</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">156</div>
                      <div className="text-xs text-gray-600 font-semibold">Today</div>
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
              Complete Laboratory Management
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              End-to-end LIMS solution for all laboratory disciplines and workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center text-white mb-4">
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
              Proven Laboratory Improvements
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Labs using Median LIMS see significant gains in efficiency and quality
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

      {/* Test Departments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              All Laboratory Disciplines
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Specialized workflows and features for every laboratory department
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testDepartments.map((dept, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-400 transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center mb-4">
                  <FlaskConical className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{dept.name}</h3>
                <ul className="space-y-3">
                  {dept.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & Automation */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Seamless Integration & Automation
              </h2>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Connect with instruments, EMRs, and third-party systems for streamlined workflows
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Analyzer Connectivity</div>
                    <div className="text-gray-600 font-semibold">
                      Bidirectional interfaces with 200+ analyzers from major vendors including Abbott, Roche, Siemens, Beckman Coulter
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">EMR Integration</div>
                    <div className="text-gray-600 font-semibold">
                      Real-time order receipt from EMR and automatic result delivery via HL7, FHIR, or direct database integration
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Reference Lab Integration</div>
                    <div className="text-gray-600 font-semibold">
                      Electronic order transmission and result import from Quest, LabCorp, Mayo, and other reference laboratories
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Auto-Verification Rules</div>
                    <div className="text-gray-600 font-semibold">
                      Configurable rules engine for automatic result verification based on delta checks, reference ranges, and QC status
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Middleware Compatibility</div>
                    <div className="text-gray-600 font-semibold">
                      Works with Data Innovations, Instrument Manager, and other middleware solutions for complex integrations
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-green-600 to-teal-600 mb-4">
                  <Network className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Quality Control Made Easy</h3>
                <p className="text-gray-600 font-semibold">
                  Comprehensive QC management integrated into daily workflows
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Automated QC Rules</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Westgard multi-rule QC evaluation</li>
                    <li>• Levey-Jennings charts and trends</li>
                    <li>• Automatic instrument lockout on failure</li>
                    <li>• QC peer group comparisons</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Proficiency Testing</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• CAP and CLIA proficiency tracking</li>
                    <li>• Automated grading and reporting</li>
                    <li>• Historical PT performance analysis</li>
                    <li>• Action plan documentation</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Compliance Management</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Maintenance schedules and logs</li>
                    <li>• Competency assessment tracking</li>
                    <li>• Audit trail for all activities</li>
                    <li>• Inspection-ready documentation</li>
                  </ul>
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
            Modernize Your Laboratory Today
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            See how Median LIMS can improve turnaround times, reduce errors, and ensure compliance. Start your free trial now.
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
            No credit card required • Full LIMS access • 30-day trial
          </p>
        </div>
      </section>
    </div>
  );
}

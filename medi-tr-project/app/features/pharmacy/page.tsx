'use client';

import Header from '@/components/layout/Header';
import {
  CheckCircle,
  ArrowRight,
  Pill,
  ShoppingCart,
  Package,
  AlertCircle,
  FileCheck,
  BarChart3,
  Clock,
  Shield,
  Scan,
  TrendingUp,
  Truck,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export default function PharmacyPage() {
  const capabilities = [
    {
      icon: <Pill className="h-6 w-6" />,
      title: "Computerized Physician Order Entry (CPOE)",
      description: "Integrated e-prescribing with formulary checking, drug interaction screening, allergy alerts, and dosage recommendations. Support for controlled substances with DEA compliance. Real-time insurance formulary verification."
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Automated Dispensing Cabinet (ADC) Integration",
      description: "Bidirectional integration with Pyxis, Omnicell, and other ADC systems. Real-time medication availability, automatic restocking alerts, and controlled substance tracking. Witness verification for high-alert medications."
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Inventory Management & Par Levels",
      description: "Real-time inventory tracking across pharmacy, nursing units, and ADCs. Automated par level management, expiration date monitoring, and reorder point alerts. Barcode scanning for receiving and dispensing."
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Clinical Decision Support",
      description: "Advanced drug interaction checking with severity ratings, contraindication alerts, dose range checking, renal/hepatic dosing recommendations, and duplicate therapy detection. Integration with Micromedex, Lexicomp, or First DataBank."
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "IV Compounding & Label Printing",
      description: "Integrated IV workflow management with barcode verification, gravimetric checking, and beyond-use date calculation. Automated label generation for IVs, syringes, and unit doses. Compliance with USP 797/800 standards."
    },
    {
      icon: <Scan className="h-6 w-6" />,
      title: "Barcode Medication Administration (BCMA)",
      description: "Five-rights verification at bedside: right patient, medication, dose, route, and time. Mobile scanning for nurses with real-time allergy and interaction checks. Documentation of administration with nurse signature."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Clinical Pharmacy Dashboards",
      description: "Real-time monitoring of order verification queues, pending interventions, and clinical alerts. Track pharmacist interventions, cost savings, and medication safety metrics. Customizable dashboards for clinical and operational metrics."
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Medication Cost Management",
      description: "Formulary management with therapeutic interchange suggestions, generic substitution recommendations, and cost analysis tools. Track medication spend by category, department, and patient. Automatic authorization for restricted medications."
    }
  ];

  const benefits = [
    {
      title: "Reduce Medication Errors",
      description: "Clinical decision support, barcode verification, and automated checks reduce adverse drug events by up to 70%.",
      stat: "70%"
    },
    {
      title: "Improve Order Verification Time",
      description: "Streamlined workflows and integrated clinical tools help pharmacists verify orders 40% faster while maintaining safety.",
      stat: "40%"
    },
    {
      title: "Increase Cost Savings",
      description: "Formulary management, generic substitution, and therapeutic interchange save 15-20% on medication costs annually.",
      stat: "20%"
    },
    {
      title: "Enhance Compliance",
      description: "Complete audit trails, controlled substance tracking, and regulatory reporting ensure Joint Commission and DEA compliance.",
      stat: "100%"
    }
  ];

  const pharmacyModules = [
    {
      name: "Inpatient Pharmacy",
      features: ["Order verification queues", "Unit dose dispensing", "IV admixture workflow", "Medication reconciliation"]
    },
    {
      name: "Outpatient Pharmacy",
      features: ["Retail dispensing", "Insurance adjudication", "Prescription transfer", "Patient counseling tools"]
    },
    {
      name: "Controlled Substances",
      features: ["DEA compliance tracking", "Perpetual inventory", "Witness requirements", "Diversion monitoring"]
    },
    {
      name: "Specialty Pharmacy",
      features: ["High-cost medication management", "Prior authorization workflow", "Patient assistance programs", "Specialty drug dispensing"]
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
                <Pill className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-bold text-gray-900">
                  Pharmacy Management System
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Complete <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pharmacy Solution</span>
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Comprehensive pharmacy management system for inpatient, outpatient, and specialty pharmacy operations. Improve medication safety, streamline workflows, and reduce costs with intelligent automation.
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
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                    <h3 className="font-black text-gray-900">Pharmacy Queue</h3>
                    <div className="text-sm font-bold text-gray-600">18 Orders</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Drug Interaction Alert</div>
                          <div className="text-xs text-gray-600 font-semibold">Warfarin + NSAIDs - STAT</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-red-600">CRITICAL</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 border-2 border-orange-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Pill className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Antibiotic - Dose Verify</div>
                          <div className="text-xs text-gray-600 font-semibold">Vancomycin IV - Priority</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-orange-600">PENDING</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Formulary Alternative</div>
                          <div className="text-xs text-gray-600 font-semibold">Suggest generic option</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-blue-600">REVIEW</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Ready for Dispensing</div>
                          <div className="text-xs text-gray-600 font-semibold">12 medications verified</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-green-600">APPROVED</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-gray-100 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-2xl font-black text-gray-900">8m</div>
                      <div className="text-xs text-gray-600 font-semibold">Avg Review</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">247</div>
                      <div className="text-xs text-gray-600 font-semibold">Orders Today</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">12</div>
                      <div className="text-xs text-gray-600 font-semibold">Interventions</div>
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
              End-to-End Pharmacy Management
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              From order entry to bedside administration, manage the entire medication use process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white mb-4">
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
              Measurable Pharmacy Improvements
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Healthcare organizations see dramatic improvements in safety and efficiency
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

      {/* Pharmacy Modules */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              All Pharmacy Service Lines
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Specialized workflows for every pharmacy setting and patient population
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pharmacyModules.map((module, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-purple-400 transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                  <Pill className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{module.name}</h3>
                <ul className="space-y-3">
                  {module.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medication Safety */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Medication Safety Features</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 mb-1">Critical Drug Interaction Alerts</div>
                    <div className="text-gray-600 font-semibold text-sm">
                      Real-time screening against comprehensive drug-drug, drug-allergy, and drug-disease databases
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 mb-1">High-Alert Medication Protocols</div>
                    <div className="text-gray-600 font-semibold text-sm">
                      Special handling for insulin, anticoagulants, chemotherapy, and other ISMP high-alert medications
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                    <Scan className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 mb-1">Barcode Verification</div>
                    <div className="text-gray-600 font-semibold text-sm">
                      Multi-point barcode scanning from pharmacy to bedside ensures right patient, medication, dose, route, and time
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 mb-1">Medication Reconciliation</div>
                    <div className="text-gray-600 font-semibold text-sm">
                      Complete medication history across transitions of care with discrepancy resolution and documentation
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 mb-1">Pharmacist Intervention Tracking</div>
                    <div className="text-gray-600 font-semibold text-sm">
                      Document clinical interventions, cost savings, and medication safety improvements for quality reporting
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Patient Safety First
              </h2>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Multi-layered safety checks and clinical decision support protect patients throughout the medication use process
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Clinical Knowledge Integration</div>
                    <div className="text-gray-600 font-semibold">
                      Built-in integration with Micromedex, Lexicomp, or First DataBank for evidence-based decision support
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Allergy & Contraindication Screening</div>
                    <div className="text-gray-600 font-semibold">
                      Automatic checking against patient allergies, pregnancy status, breastfeeding, and documented contraindications
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Dose Range & Age-Based Checking</div>
                    <div className="text-gray-600 font-semibold">
                      Pediatric and geriatric dose validation, weight-based dosing calculations, and renal/hepatic adjustments
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Controlled Substance Monitoring</div>
                    <div className="text-gray-600 font-semibold">
                      DEA compliance, PDMP integration, diversion detection, and automatic reporting to state agencies
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Look-Alike/Sound-Alike Warnings</div>
                    <div className="text-gray-600 font-semibold">
                      ISMP LASA medication alerts with Tall Man lettering and visual differentiation to prevent selection errors
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
            Ready to Enhance Medication Safety?
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            See how Median Pharmacy can reduce errors, improve efficiency, and save costs. Start your free trial today.
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
            No credit card required • Full pharmacy access • 30-day trial
          </p>
        </div>
      </section>
    </div>
  );
}

'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Building2,
  Users,
  Heart,
  Globe,
  Award,
  TrendingUp,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Calendar,
  BarChart3,
  Cloud,
  Lock,
  Smartphone,
  Brain,
  Network,
  Database,
  Server,
  FileText,
  Target,
  Layers,
  GitBranch,
  Settings,
} from 'lucide-react';

export default function LargeHospitalsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-indigo-200">
                <Award className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-bold text-gray-900">Enterprise-Grade for 200+ Bed Systems</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Built for
                <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Large Hospital Systems
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Enterprise hospital management platform designed for large academic medical centers, multi-hospital
                systems, and integrated delivery networks. Scalable, secure, and built for complex healthcare organizations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Request Enterprise Demo
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-indigo-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Contact Sales
                  <Calendar className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-600">50+</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Health Systems</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-600">500K+</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Daily Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-600">99.99%</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Uptime SLA</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border-4 border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <Network className="h-32 w-32 text-indigo-600 opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Enterprise-Grade Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Built to handle the complexity of large healthcare organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border-2 border-indigo-200">
              <div className="h-14 w-14 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
                <Network className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Multi-Hospital Support</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Manage multiple hospitals, clinics, and outpatient facilities from a single platform with
                centralized administration and distributed workflows.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Unified patient record across facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Cross-facility scheduling & transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">System-wide analytics & reporting</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="h-14 w-14 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                <Database className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Unlimited Scale</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Architected to handle millions of patient records, thousands of concurrent users, and
                unlimited transactions per day without performance degradation.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Unlimited users & facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Horizontal auto-scaling infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Performance guaranteed under load</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <div className="h-14 w-14 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Advanced AI & ML</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                FDA-cleared AI algorithms for clinical decision support, predictive analytics, and
                operational optimization across your entire health system.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Sepsis & deterioration prediction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Readmission risk stratification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Capacity forecasting & optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200">
              <div className="h-14 w-14 rounded-xl bg-pink-600 flex items-center justify-center mb-4">
                <Settings className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Custom Workflows</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Configurable workflows and business rules engine to match your organization's unique
                protocols, policies, and clinical pathways.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">No-code workflow builder</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Clinical pathway templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Automated approval workflows</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="h-14 w-14 rounded-xl bg-green-600 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Military-grade security with role-based access control, advanced threat detection,
                and compliance automation for enterprise healthcare.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">SOC 2 Type II & HITRUST certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">SSO/SAML integration (Okta, Azure AD)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Advanced audit logging & monitoring</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border-2 border-cyan-200">
              <div className="h-14 w-14 rounded-xl bg-cyan-600 flex items-center justify-center mb-4">
                <GitBranch className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Integration Hub</h3>
              <p className="text-gray-700 font-medium leading-relaxed mb-4">
                Pre-built connectors for legacy systems, conventional systems, and 200+ healthcare systems.
                Enterprise service bus for complex integration scenarios.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">HL7 FHIR R5 & legacy v2.x</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Enterprise service bus (ESB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-semibold">Custom API development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Academic & Research Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Academic Medical Center Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Built for teaching hospitals and research institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <FileText className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Clinical Research Integration</h3>
              <p className="text-gray-700 font-medium mb-4">
                Integrated clinical research module with protocol management, patient enrollment tracking,
                adverse event reporting, and regulatory compliance (IRB, FDA 21 CFR Part 11).
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Study protocol builder & management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Electronic data capture (EDC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Adverse event tracking & reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">IRB submission automation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Medical Education Platform</h3>
              <p className="text-gray-700 font-medium mb-4">
                Comprehensive tools for resident and medical student education including procedure logging,
                competency tracking, case presentations, and ACGME compliance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Resident procedure logging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ACGME milestone tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Teaching case repository</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Competency assessments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Population Health Management</h3>
              <p className="text-gray-700 font-medium mb-4">
                Enterprise population health tools for ACO management, value-based care programs,
                chronic disease management, and care coordination across your health system.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ACO quality measure tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Risk stratification analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Care gap identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Outreach campaign management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Server className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Data Warehouse & Analytics</h3>
              <p className="text-gray-700 font-medium mb-4">
                Enterprise data warehouse with clinical, financial, and operational data marts.
                Self-service BI tools and advanced analytics for data-driven decision making.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Centralized data warehouse</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Self-service BI dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Predictive analytics models</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Custom report development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Support */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Enterprise Support & Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Dedicated team to ensure your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">Dedicated Account Team</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Named account executive, technical account manager, and customer success manager
                dedicated to your organization's success.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <Calendar className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">24/7/365 Support</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Round-the-clock phone, email, and portal support with guaranteed response times.
                Escalation path to engineering for critical issues.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <Target className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">Implementation Services</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Dedicated implementation team with project manager, solution architects, and trainers
                to ensure smooth deployment across your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-gray-900 mb-6">Enterprise Pricing</h2>
          <p className="text-xl text-gray-600 mb-12 font-medium">
            Custom pricing tailored to your organization's size and needs
          </p>

          <div className="bg-white rounded-3xl p-12 border-4 border-indigo-600 shadow-2xl">
            <Building2 className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-gray-900 mb-4">Custom Enterprise Plan</h3>
            <p className="text-lg text-gray-700 font-medium mb-8 max-w-2xl mx-auto">
              Flexible pricing based on number of facilities, beds, users, and required modules.
              Volume discounts available for large health systems.
            </p>

            <ul className="space-y-3 mb-10 text-left max-w-2xl mx-auto">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">Unlimited users and patient records</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">All modules and features included</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">Dedicated account team & 24/7 support</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">Custom integrations & development</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">White labeling & customization</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">99.99% uptime SLA with credits</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Contact Sales for Pricing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready for Enterprise Healthcare IT?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 font-medium">
            Join 50+ large hospital systems trusting Median for their enterprise hospital management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Request Enterprise Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              Contact Sales
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Header from '@/components/layout/Header';
import {
  CheckCircle,
  ArrowRight,
  DollarSign,
  FileText,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Shield,
  Clock,
  BarChart3,
  Send,
  RefreshCw,
  Users,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  const capabilities = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Intelligent Charge Capture",
      description: "Automatic charge capture from clinical documentation, procedures, and orders. Real-time charge posting with edit checking and duplicate prevention. Integration with CDM (Charge Description Master) for accurate pricing. Mobile charge capture for bedside procedures."
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Advanced Claims Management",
      description: "Automated claims generation with built-in scrubbing for CMS-1500, UB-04, and electronic claims. Real-time eligibility verification, pre-authorization tracking, and medical necessity checking. Batch claim submission to clearinghouses with status tracking."
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Denial Management & Appeals",
      description: "Comprehensive denial tracking with root cause analysis and trending reports. Automated denial workflows with task assignment and follow-up reminders. Appeals management with documentation templates and submission tracking. Reduce denial rates with proactive prevention."
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Payment Processing & Posting",
      description: "Integrated payment processing for credit cards, ACH, and payment plans. Automated ERA/835 posting with variance resolution. Patient statement generation with customizable templates. Payment portal integration for online bill pay and autopay setup."
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Revenue Cycle Analytics",
      description: "Real-time dashboards for A/R aging, collection rates, days in A/R, and denial rates. Payer performance analysis and contract modeling. Key performance indicators (KPIs) tracking with trend analysis. Customizable reports for finance and operations teams."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Patient Financial Management",
      description: "Patient responsibility estimation at time of service with insurance verification. Financial counseling tools and charity care screening. Payment plan setup and automated recurring billing. Patient financing options and third-party billing integration."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Coding & Compliance",
      description: "ICD-10, CPT, and HCPCS code lookup with built-in encoders. DRG and APR-DRG grouping with reimbursement estimation. Medical necessity checking against LCD/NCD policies. Compliance auditing with NCCI edits and bundling rules."
    },
    {
      icon: <Send className="h-6 w-6" />,
      title: "Insurance & Clearinghouse Integration",
      description: "Direct connections to major payers and clearinghouses (Change Healthcare, Waystar, Availity). Real-time eligibility checks and benefit verification. Electronic attachments and prior authorization submissions. Automated claim status inquiries and ERA retrieval."
    }
  ];

  const benefits = [
    {
      title: "Increase Collections",
      description: "Automated claims submission, denial management, and patient collections increase overall collection rate significantly.",
      stat: "+25%"
    },
    {
      title: "Reduce A/R Days",
      description: "Faster claim submission, automated follow-up, and efficient payment posting reduce days in accounts receivable.",
      stat: "35 Days"
    },
    {
      title: "Lower Denial Rate",
      description: "Real-time eligibility checks, coding assistance, and claim scrubbing reduce claim denials and rejections.",
      stat: "65%"
    },
    {
      title: "Improve Cash Flow",
      description: "Faster reimbursement, reduced denials, and better patient collections improve overall cash flow and revenue predictability.",
      stat: "+30%"
    }
  ];

  const rcmModules = [
    {
      name: "Patient Access",
      features: ["Insurance verification", "Benefit estimation", "Pre-authorization", "Financial counseling"]
    },
    {
      name: "Charge Capture",
      features: ["Automatic posting", "Mobile capture", "Procedure linking", "Charge reconciliation"]
    },
    {
      name: "Claims & Billing",
      features: ["Electronic claims", "Claim scrubbing", "Batch submission", "Status tracking"]
    },
    {
      name: "Collections & AR",
      features: ["Payment posting", "Denial workflows", "Patient statements", "Follow-up queues"]
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-sm font-bold text-gray-900">
                  Billing & Revenue Cycle Management
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Maximize Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Revenue Cycle</span>
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Complete revenue cycle management solution that improves collections, reduces denials, and accelerates cash flow. From patient registration to final payment, streamline every step of the billing process.
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
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                    <h3 className="font-black text-gray-900">Revenue Dashboard</h3>
                    <div className="text-sm font-bold text-green-600">This Month</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                      <div className="text-3xl font-black text-gray-900 mb-1">$847K</div>
                      <div className="text-xs text-gray-600 font-semibold">Total Collections</div>
                      <div className="text-xs text-green-600 font-bold mt-1">+18% vs last month</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                      <div className="text-3xl font-black text-gray-900 mb-1">32</div>
                      <div className="text-xs text-gray-600 font-semibold">Days in A/R</div>
                      <div className="text-xs text-green-600 font-bold mt-1">-5 days improved</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Clean Claims Rate</div>
                          <div className="text-xs text-gray-600 font-semibold">First-pass acceptance</div>
                        </div>
                      </div>
                      <span className="text-lg font-black text-green-600">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Collection Rate</div>
                          <div className="text-xs text-gray-600 font-semibold">Total collections vs charges</div>
                        </div>
                      </div>
                      <span className="text-lg font-black text-blue-600">87.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 border-2 border-orange-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Denial Rate</div>
                          <div className="text-xs text-gray-600 font-semibold">Initial claim denials</div>
                        </div>
                      </div>
                      <span className="text-lg font-black text-orange-600">4.8%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 border-2 border-purple-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Avg Payment Time</div>
                          <div className="text-xs text-gray-600 font-semibold">Submission to payment</div>
                        </div>
                      </div>
                      <span className="text-lg font-black text-purple-600">18 days</span>
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
              Complete Revenue Cycle Solution
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              End-to-end billing and revenue cycle management integrated with clinical workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white mb-4">
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
              Proven Financial Results
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Healthcare organizations using Median RCM see significant revenue improvements
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

      {/* RCM Modules */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Full Revenue Cycle Coverage
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Manage every step from patient registration through final payment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rcmModules.map((module, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-400 transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{module.name}</h3>
                <ul className="space-y-3">
                  {module.features.map((feature, featureIndex) => (
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

      {/* Automation & Intelligence */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Intelligent Revenue Cycle Automation
              </h2>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                AI and automation reduce manual work and accelerate reimbursement
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Automated Charge Capture</div>
                    <div className="text-gray-600 font-semibold">
                      AI extracts charges from clinical documentation, procedures, and orders with 99%+ accuracy, eliminating missed charges
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Smart Claim Scrubbing</div>
                    <div className="text-gray-600 font-semibold">
                      Pre-submission validation checks for errors, NCCI edits, medical necessity, and payer-specific requirements
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Predictive Denial Prevention</div>
                    <div className="text-gray-600 font-semibold">
                      Machine learning identifies high-risk claims and suggests corrections before submission to prevent denials
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Automated ERA Posting</div>
                    <div className="text-gray-600 font-semibold">
                      Electronic remittance advice automatically posted with variance resolution and denial routing for follow-up
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Intelligent Work Queues</div>
                    <div className="text-gray-600 font-semibold">
                      AI prioritizes accounts by revenue potential, aging, and payer response patterns to maximize staff efficiency
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 mb-4">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Real-Time Analytics</h3>
                <p className="text-gray-600 font-semibold">
                  Monitor revenue cycle performance with live dashboards
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Key Performance Indicators</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Days in A/R and aging analysis</li>
                    <li>• Clean claim rate and denial rate</li>
                    <li>• Collection rate and cash flow</li>
                    <li>• Net collection percentage</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Payer Performance</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Reimbursement by payer and CPT</li>
                    <li>• Average payment turnaround time</li>
                    <li>• Denial patterns and trends</li>
                    <li>• Contract variance analysis</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Staff Productivity</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Claims processed per FTE</li>
                    <li>• Average days to bill</li>
                    <li>• Collections per collector</li>
                    <li>• Work queue aging and completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Compliance & Security Built-In
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-12">
              Stay compliant with healthcare regulations and protect sensitive financial data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">HIPAA Compliance</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">End-to-end encryption</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Complete audit trails</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Role-based access control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">SOC 2 Type II certified</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Coding Compliance</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">NCCI edit checking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Medical necessity validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">LCD/NCD compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Modifier validation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">PCI Compliance</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">PCI DSS Level 1 certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Tokenized card storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Secure payment processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Fraud detection tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Improve Your Revenue Cycle?
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            See how Median RCM can increase collections, reduce denials, and accelerate cash flow. Start your free trial today.
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
            No credit card required • Full RCM access • 30-day trial
          </p>
        </div>
      </section>
    </div>
  );
}

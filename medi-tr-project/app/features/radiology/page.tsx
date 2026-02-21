'use client';

import Header from '@/components/layout/Header';
import {
  CheckCircle,
  ArrowRight,
  Scan,
  ImageIcon,
  Monitor,
  Download,
  Share2,
  Zap,
  Clock,
  Shield,
  Cloud,
  Search,
  FileText,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function RadiologyPage() {
  const capabilities = [
    {
      icon: <ImageIcon className="h-6 w-6" />,
      title: "Full DICOM PACS Storage",
      description: "Enterprise-grade Picture Archiving and Communication System with unlimited cloud storage. Support for all modalities: CT, MRI, X-Ray, Ultrasound, Nuclear Medicine, PET/CT, Mammography. DICOM 3.0 compliant with automatic image routing and prefetching."
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Advanced DICOM Viewer",
      description: "Zero-footprint HTML5 viewer accessible from any device. Multi-monitor support, 3D reconstruction, MPR/MIP rendering, hanging protocols, and measurement tools. No plugins or downloads required. FDA 510(k) cleared for diagnostic use."
    },
    {
      icon: <Scan className="h-6 w-6" />,
      title: "Radiology Information System (RIS)",
      description: "Complete RIS with scheduling, patient registration, order tracking, and technologist worklists. Modality worklist (MWL) management, automated exam protocols, and contrast tracking. Integration with billing for procedure coding."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Voice Recognition & Reporting",
      description: "Integrated speech recognition for radiology dictation with specialty-specific vocabularies. Structured reporting templates for common studies. Critical result notification and wet-read documentation. Electronic signature with timestamp."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Image Analysis",
      description: "Built-in AI algorithms for automated measurements, fracture detection, lung nodule tracking, and critical finding alerts. CAD integration for mammography and chest X-rays. Automatic comparison with prior studies and delta reporting."
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Image Sharing & CD Burning",
      description: "Secure patient portal for study sharing with referring providers and patients. Automatic DICOM CD/DVD creation with self-contained viewer. Web-based image sharing with time-limited access links. VNA integration for enterprise imaging."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Workflow & Productivity Tools",
      description: "Intelligent worklist management with priority flagging, STAT notifications, and radiologist assignment. Real-time dashboard showing pending studies, average read times, and turnaround metrics. Mobile app for critical result alerts."
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Storage & Disaster Recovery",
      description: "Secure cloud-based storage with automatic backup and geo-redundancy. Instant scalability from terabytes to petabytes. 99.99% uptime SLA with disaster recovery and business continuity. HIPAA-compliant encryption at rest and in transit."
    }
  ];

  const benefits = [
    {
      title: "Reduce Report TAT",
      description: "Intelligent worklists, voice recognition, and structured templates reduce average radiology report turnaround time significantly.",
      stat: "45%"
    },
    {
      title: "Lower Storage Costs",
      description: "Cloud-native architecture with intelligent archiving reduces on-premise storage costs compared to traditional PACS hardware.",
      stat: "60%"
    },
    {
      title: "Improve Accuracy",
      description: "AI-powered analysis, critical finding alerts, and automatic prior comparison help reduce missed findings and improve diagnostic accuracy.",
      stat: "35%"
    },
    {
      title: "Increase Access",
      description: "Zero-footprint viewer and mobile apps provide secure access to images from anywhere, improving care coordination and consultation.",
      stat: "24/7"
    }
  ];

  const modalities = [
    {
      name: "Computed Tomography",
      features: ["Multi-phase studies", "3D reconstruction", "MPR/MIP rendering", "Dose tracking"]
    },
    {
      name: "Magnetic Resonance",
      features: ["Multi-sequence viewing", "Diffusion analysis", "Spectroscopy", "Functional MRI"]
    },
    {
      name: "Digital Radiography",
      features: ["Auto-windowing", "Edge enhancement", "Bone suppression", "CAD integration"]
    },
    {
      name: "Ultrasound",
      features: ["Cine loop playback", "Doppler analysis", "3D/4D rendering", "OB measurements"]
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full mb-6">
                <Scan className="h-5 w-5 text-cyan-600" />
                <span className="text-sm font-bold text-gray-900">
                  Radiology PACS & RIS
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Cloud-Native <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Radiology PACS</span>
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Enterprise radiology imaging platform with unlimited cloud storage, advanced DICOM viewer, AI-powered analysis, and complete RIS workflow. Access images anywhere, reduce costs, and improve diagnostic accuracy.
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
              <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                    <h3 className="font-black text-gray-900">Radiology Worklist</h3>
                    <div className="text-sm font-bold text-gray-600">32 Studies</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Scan className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">CT Head - STAT</div>
                          <div className="text-xs text-gray-600 font-semibold">Acute stroke protocol - 5 min ago</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-red-600 px-2 py-1 bg-red-100 rounded">CRITICAL</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 border-2 border-orange-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <ImageIcon className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Chest X-Ray PA/Lateral</div>
                          <div className="text-xs text-gray-600 font-semibold">Pre-op clearance - 15 min ago</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-orange-600 px-2 py-1 bg-orange-100 rounded">URGENT</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">MRI Brain w/wo Contrast</div>
                          <div className="text-xs text-gray-600 font-semibold">Headache workup - 45 min ago</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-blue-600 px-2 py-1 bg-blue-100 rounded">PENDING</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">Ultrasound Abdomen</div>
                          <div className="text-xs text-gray-600 font-semibold">RUQ pain - Dictated</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-green-600 px-2 py-1 bg-green-100 rounded">COMPLETE</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-gray-100 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-2xl font-black text-gray-900">18m</div>
                      <div className="text-xs text-gray-600 font-semibold">Avg TAT</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">2.4TB</div>
                      <div className="text-xs text-gray-600 font-semibold">Storage</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900">98%</div>
                      <div className="text-xs text-gray-600 font-semibold">Uptime</div>
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
              Complete Radiology Platform
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Integrated PACS, RIS, and advanced imaging tools in one cloud-native solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white mb-4">
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
              Transform Your Radiology Department
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Radiology departments using Median PACS see dramatic operational improvements
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

      {/* Modality Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              All Imaging Modalities Supported
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Advanced viewing and analysis tools optimized for every modality type
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modalities.map((modality, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-cyan-400 transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center mb-4">
                  <Scan className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{modality.name}</h3>
                <ul className="space-y-3">
                  {modality.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                AI-Powered Diagnostic Tools
              </h2>
              <p className="text-xl text-gray-600 font-semibold mb-8 leading-relaxed">
                Leverage artificial intelligence to improve diagnostic accuracy and workflow efficiency
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Automatic Critical Finding Detection</div>
                    <div className="text-gray-600 font-semibold">
                      AI algorithms flag potential pneumothorax, intracranial hemorrhage, pulmonary embolism, and other critical findings
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Lung Nodule Tracking & Growth Analysis</div>
                    <div className="text-gray-600 font-semibold">
                      Automated detection, measurement, and tracking of pulmonary nodules across serial studies with volumetric analysis
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Bone Fracture Detection</div>
                    <div className="text-gray-600 font-semibold">
                      Deep learning models identify potential fractures on X-rays and CT scans, reducing missed findings
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Automated Measurements & Quantification</div>
                    <div className="text-gray-600 font-semibold">
                      AI-powered automatic measurements for cardiac chambers, tumor volumes, vessel diameters, and organ densities
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-black text-gray-900 mb-1">Prior Exam Comparison & Delta Reporting</div>
                    <div className="text-gray-600 font-semibold">
                      Intelligent matching of current and prior studies with automatic highlighting of interval changes
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 mb-4">
                  <Download className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Universal Access & Sharing</h3>
                <p className="text-gray-600 font-semibold">
                  Share images securely with referring providers, specialists, and patients
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Zero-Footprint Web Viewer</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Access from any device, no installation</li>
                    <li>• Full diagnostic quality on any screen</li>
                    <li>• Advanced tools: MPR, MIP, 3D rendering</li>
                    <li>• FDA 510(k) cleared for primary diagnosis</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">Patient Portal Integration</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Patients access their imaging studies</li>
                    <li>• Share with providers of their choice</li>
                    <li>• Download images and reports as PDF</li>
                    <li>• Reduce CD burning and mailing costs</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="font-black text-gray-900 mb-1">External Provider Sharing</div>
                  <ul className="text-sm text-gray-700 font-semibold space-y-1">
                    <li>• Generate secure time-limited sharing links</li>
                    <li>• No login required for recipients</li>
                    <li>• Automatic DICOM CD/DVD creation</li>
                    <li>• VNA and XDS-I integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Infrastructure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Enterprise Cloud Infrastructure
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-12">
              Built on secure, scalable cloud architecture with industry-leading reliability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Security & Compliance</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">HIPAA compliant encryption</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">SOC 2 Type II certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">FDA 510(k) cleared viewer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Complete audit trails</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-6">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Unlimited Scalability</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Pay-as-you-grow pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Automatic storage expansion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Multi-site support included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">No hardware to maintain</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">High Performance</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">99.99% uptime SLA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Fast image retrieval (&lt;2s)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Intelligent prefetching</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold text-sm">Global CDN delivery</span>
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
            Modernize Your Radiology Imaging
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            Experience the future of radiology with cloud-native PACS, AI-powered tools, and unlimited storage. Start your free trial today.
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
            No credit card required • Full PACS access • 30-day trial
          </p>
        </div>
      </section>
    </div>
  );
}

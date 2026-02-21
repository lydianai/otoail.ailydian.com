'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Heart,
  Brain,
  Bone,
  Activity,
  Baby,
  Eye,
  Stethoscope,
  Shield,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
  Zap,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  FileText,
  Target,
  Star,
  Pill,
  Scan,
  TestTube,
} from 'lucide-react';

export default function SpecialtyPage() {
  const specialties = [
    {
      icon: Heart,
      name: 'Cardiology Centers',
      color: 'red',
      description: 'Cardiac cath labs, EP studies, heart failure clinics, and cardiovascular surgery',
    },
    {
      icon: Bone,
      name: 'Orthopedic Hospitals',
      color: 'blue',
      description: 'Joint replacement, spine surgery, sports medicine, and orthopedic rehabilitation',
    },
    {
      icon: Brain,
      name: 'Neurology Centers',
      color: 'purple',
      description: 'Stroke centers, neurosurgery, epilepsy monitoring, and cognitive neurology',
    },
    {
      icon: Baby,
      name: "Women's & Children's",
      color: 'pink',
      description: 'Obstetrics, NICU, pediatric specialty care, and maternal-fetal medicine',
    },
    {
      icon: Activity,
      name: 'Oncology Centers',
      color: 'indigo',
      description: 'Medical oncology, radiation therapy, surgical oncology, and survivorship care',
    },
    {
      icon: Eye,
      name: 'Ophthalmology Centers',
      color: 'cyan',
      description: 'Cataract surgery, LASIK, retina specialists, and glaucoma management',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-pink-200">
                <Award className="h-5 w-5 text-pink-600" />
                <span className="text-sm font-bold text-gray-900">Specialized Solutions for Specialty Care</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Built for
                <span className="block mt-2 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  Specialty Centers
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Purpose-built hospital management system for specialty hospitals and surgical centers.
                Workflows, templates, and features designed for your specific medical specialty.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/trial"
                  className="px-8 py-4 bg-gradient-to-r from-pink-600 to-red-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-pink-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Schedule Demo
                  <Calendar className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-600">200+</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Specialty Centers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-600">35+</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Specialties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-600">98%</div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border-4 border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-pink-100 to-red-100 rounded-2xl flex items-center justify-center">
                  <Stethoscope className="h-32 w-32 text-pink-600 opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Tailored for Your Specialty</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Pre-configured workflows and templates for every medical specialty
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className={`h-14 w-14 rounded-xl bg-${specialty.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <specialty.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{specialty.name}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{specialty.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 font-semibold mb-4">
              Also supporting: Dermatology, ENT, Gastroenterology, Urology, Plastic Surgery, Pain Management,
              Psychiatry, and 25+ more specialties
            </p>
          </div>
        </div>
      </section>

      {/* Specialty-Specific Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Specialty-Optimized Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Features designed specifically for specialty medicine
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <FileText className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Specialty Templates</h3>
              <p className="text-gray-700 font-medium mb-4">
                Hundreds of specialty-specific documentation templates, order sets, and clinical pathways
                created by specialists for specialists.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Procedure note templates by specialty</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Specialty-specific order sets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Clinical pathway protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Customizable templates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Stethoscope className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Procedure Management</h3>
              <p className="text-gray-700 font-medium mb-4">
                Advanced scheduling, documentation, and billing for specialty procedures including
                surgical centers, cath labs, endoscopy suites, and more.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Multi-room procedure scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Equipment & supply tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Anesthesia charting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Recovery room management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <Scan className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Imaging Integration</h3>
              <p className="text-gray-700 font-medium mb-4">
                Seamless integration with specialty imaging systems including PACS, cardiology CVIS,
                ophthalmology imaging, and diagnostic equipment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">DICOM image viewer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Cardiology CVIS integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Structured reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Image-guided procedure support</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <DollarSign className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Specialty Billing</h3>
              <p className="text-gray-700 font-medium mb-4">
                Optimized billing workflows for specialty procedures with accurate CPT coding,
                modifier management, and pre-authorization tracking.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Specialty-specific CPT codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Modifier automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Pre-authorization management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Bundled payment tracking</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <TestTube className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Specialized Lab Orders</h3>
              <p className="text-gray-700 font-medium mb-4">
                Specialty-specific lab panels and reference ranges with integration to specialized
                testing laboratories and genetic testing services.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Custom lab panels by specialty</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Reference lab integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Genetic testing workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Pathology result integration</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <BarChart3 className="h-12 w-12 text-cyan-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Specialty Analytics</h3>
              <p className="text-gray-700 font-medium mb-4">
                Specialty-specific quality metrics, outcomes tracking, and registry reporting
                for accreditation and certification requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Quality measure dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Outcomes tracking & benchmarking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Registry reporting (STS, ACC, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Accreditation report automation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Highlights */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Specialty-Specific Examples</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              See how Median supports different specialties
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
              <Heart className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">Cardiology Centers</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Cath lab scheduling & reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">EP study documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Echo/stress test integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">ACC registry reporting</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <Bone className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">Orthopedic Hospitals</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Joint replacement protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Implant tracking & registry</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">PT/OT therapy management</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Outcomes tracking (HOOS, KOOS)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border-2 border-indigo-200">
              <Activity className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-3">Oncology Centers</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Chemo protocol management</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Radiation therapy planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Tumor board scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Cancer registry (SEER, NCDB)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Specialty Center Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Affordable pricing tailored for specialty practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Specialty Professional</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">$899</span>
                <span className="text-gray-600 font-semibold">/month</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-600" />
                  <span className="font-bold text-gray-900">Up to 100 users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-gray-900">Unlimited patients</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Specialty-specific templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Procedure management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Imaging integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Specialty billing optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Quality metrics & reporting</span>
                </li>
              </ul>
              <Link
                href="/trial"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-pink-600 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-pink-600 to-red-600 text-white text-xs font-black rounded-full">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">Specialty Enterprise</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-gray-900">$1,699</span>
                <span className="text-gray-600 font-semibold">/month</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-600" />
                  <span className="font-bold text-gray-900">Unlimited users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-gray-900">Multi-location support</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Everything in Professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Custom template development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Advanced analytics & BI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Registry reporting automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Custom integrations</span>
                </li>
              </ul>
              <Link
                href="/trial"
                className="w-full block text-center py-3 rounded-xl font-bold bg-gradient-to-r from-pink-600 to-red-600 text-white hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Optimize Your Specialty Practice?
          </h2>
          <p className="text-xl text-pink-100 mb-12 font-medium">
            Join 200+ specialty centers using Median for specialized workflows and better outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="px-8 py-4 bg-white text-pink-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-pink-600 transition-all flex items-center justify-center gap-2"
            >
              Schedule Demo
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

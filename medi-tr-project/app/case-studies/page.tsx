'use client';

import Header from '@/components/layout/Header';
import {
  Building2,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Download,
  Star,
  Award,
  Target,
  Zap,
  Heart,
  BarChart3,
  FileText,
  Calendar,
} from 'lucide-react';

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      hospital: 'Memorial Regional Medical Center',
      location: 'Dallas, Texas',
      size: '450 beds',
      type: 'Large Hospital System',
      logo: '🏥',
      challenge: 'Long emergency department wait times and inefficient patient flow causing 35% patient dissatisfaction',
      solution: 'Implemented Median Emergency Department module with AI-powered triage and real-time bed management',
      results: [
        { metric: '40%', label: 'Reduction in ED wait times' },
        { metric: '28%', label: 'Increase in patient throughput' },
        { metric: '92%', label: 'Patient satisfaction score' },
        { metric: '$2.3M', label: 'Annual cost savings' },
      ],
      testimonial: 'Median transformed our emergency department operations. The real-time visibility and AI-powered workflows have dramatically improved patient care and staff efficiency.',
      author: 'Dr. James Patterson',
      role: 'Chief Medical Officer',
      category: 'Emergency Care',
      color: 'red',
    },
    {
      hospital: 'St. Mary\'s Community Hospital',
      location: 'Portland, Oregon',
      size: '180 beds',
      type: 'Community Hospital',
      logo: '⛪',
      challenge: 'Paper-based processes leading to medication errors and delayed lab results affecting patient safety',
      solution: 'Full Median EHR deployment including e-prescribing, LIMS integration, and clinical decision support',
      results: [
        { metric: '85%', label: 'Reduction in medication errors' },
        { metric: '60%', label: 'Faster lab result delivery' },
        { metric: '99.2%', label: 'System uptime' },
        { metric: '$1.8M', label: 'ROI in first year' },
      ],
      testimonial: 'Moving from paper to Median was seamless. Our clinical staff adopted the system quickly, and patient safety metrics improved dramatically within months.',
      author: 'Sarah Mitchell, RN',
      role: 'Director of Nursing',
      category: 'EHR Implementation',
      color: 'blue',
    },
    {
      hospital: 'University Medical Center',
      location: 'Boston, Massachusetts',
      size: '650 beds',
      type: 'Academic Medical Center',
      logo: '🎓',
      challenge: 'Revenue cycle inefficiencies with 18% claim denial rate and 65-day average collection period',
      solution: 'Deployed Median Revenue Cycle Management with automated coding, claims scrubbing, and denial management',
      results: [
        { metric: '6%', label: 'Claim denial rate (down from 18%)' },
        { metric: '38 days', label: 'Average collection period' },
        { metric: '23%', label: 'Increase in clean claims' },
        { metric: '$8.5M', label: 'Additional annual revenue' },
      ],
      testimonial: 'The automated claims processing and denial management features have transformed our revenue cycle. We\'re collecting faster and losing less revenue to denials.',
      author: 'Michael Chang',
      role: 'CFO',
      category: 'Revenue Cycle',
      color: 'emerald',
    },
    {
      hospital: 'Sunrise Surgical Center',
      location: 'Phoenix, Arizona',
      size: '8 ORs',
      type: 'Specialty Surgical Center',
      logo: '🌅',
      challenge: 'Poor OR utilization at 62% with frequent scheduling conflicts and equipment tracking issues',
      solution: 'Implemented Median Operating Room Management with intelligent scheduling and inventory tracking',
      results: [
        { metric: '89%', label: 'OR utilization rate' },
        { metric: '45%', label: 'More procedures per month' },
        { metric: '0', label: 'Scheduling conflicts' },
        { metric: '$3.2M', label: 'Additional revenue' },
      ],
      testimonial: 'Median\'s OR scheduling intelligence has maximized our surgical capacity. We\'re performing more procedures with the same resources.',
      author: 'Dr. Rebecca Torres',
      role: 'Medical Director',
      category: 'Surgical Services',
      color: 'purple',
    },
    {
      hospital: 'Coastal Family Health Network',
      location: 'Miami, Florida',
      size: '12 locations',
      type: 'Multi-Site Clinic',
      logo: '🌴',
      challenge: 'Disconnected systems across 12 locations preventing care coordination and data sharing',
      solution: 'Unified Median platform across all locations with centralized patient records and analytics',
      results: [
        { metric: '100%', label: 'Data visibility across sites' },
        { metric: '35%', label: 'Improvement in care coordination' },
        { metric: '50%', label: 'Reduction in duplicate tests' },
        { metric: '$1.2M', label: 'Annual savings' },
      ],
      testimonial: 'Having a single platform across all our locations has revolutionized how we coordinate patient care. No more faxing records or calling for lab results.',
      author: 'Dr. Maria Rodriguez',
      role: 'Network Medical Director',
      category: 'Multi-Site',
      color: 'cyan',
    },
    {
      hospital: 'Mountainview Regional Hospital',
      location: 'Denver, Colorado',
      size: '320 beds',
      type: 'Regional Hospital',
      logo: '⛰️',
      challenge: 'Limited telehealth capabilities restricting access for rural patients 100+ miles away',
      solution: 'Deployed Median Telemedicine platform with integrated billing and prescription workflows',
      results: [
        { metric: '5,000+', label: 'Virtual visits per month' },
        { metric: '98%', label: 'Patient satisfaction' },
        { metric: '75%', label: 'Reduction in travel for patients' },
        { metric: '$2.1M', label: 'New revenue stream' },
      ],
      testimonial: 'Median\'s telemedicine solution has allowed us to reach rural patients who previously had no access to specialty care. It\'s been transformative for our community.',
      author: 'Jennifer Brooks',
      role: 'VP of Patient Services',
      category: 'Telemedicine',
      color: 'indigo',
    },
  ];

  const industryMetrics = [
    { number: '500+', label: 'Healthcare Facilities', icon: Building2 },
    { number: '2M+', label: 'Patients Managed', icon: Users },
    { number: '$150M+', label: 'In Cost Savings', icon: DollarSign },
    { number: '94%', label: 'Customer Satisfaction', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Real Results from Real Hospitals</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
            Customer
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Discover how healthcare facilities across the United States are transforming patient care,
            improving efficiency, and driving better outcomes with Median.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industryMetrics.map((metric, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <metric.icon className="h-8 w-8 text-blue-600 mb-3 mx-auto" />
                <div className="text-3xl font-black text-blue-600">{metric.number}</div>
                <div className="text-sm text-gray-600 font-semibold mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-24">
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br from-${study.color}-50 to-white rounded-3xl overflow-hidden border-2 border-${study.color}-200 shadow-2xl`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Story */}
                <div className="p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl">{study.logo}</div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-900">{study.hospital}</h2>
                      <p className="text-sm text-gray-600 font-semibold">{study.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-8">
                    <span className={`px-3 py-1 bg-${study.color}-100 text-${study.color}-800 text-xs font-black rounded-full`}>
                      {study.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-black rounded-full">
                      {study.size}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-black rounded-full">
                      {study.type}
                    </span>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
                        <Target className="h-5 w-5 text-red-600" />
                        Challenge
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed">{study.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
                        <Zap className={`h-5 w-5 text-${study.color}-600`} />
                        Solution
                      </h3>
                      <p className="text-gray-700 font-medium leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-${study.color}-200 mb-6`}>
                    <div className="flex gap-3 mb-4">
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-${study.color}-600 to-${study.color}-700 flex items-center justify-center flex-shrink-0`}>
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-black text-gray-900">{study.author}</div>
                        <div className="text-sm text-gray-600 font-semibold">{study.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed italic">
                      "{study.testimonial}"
                    </p>
                  </div>

                  <button className={`w-full py-4 bg-gradient-to-r from-${study.color}-600 to-${study.color}-700 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2`}>
                    <Download className="h-5 w-5" />
                    Download Full Case Study
                  </button>
                </div>

                {/* Right Column - Results */}
                <div className={`bg-gradient-to-br from-${study.color}-600 to-${study.color}-700 p-12 flex flex-col justify-center`}>
                  <div className="flex items-center gap-2 mb-8">
                    <BarChart3 className="h-6 w-6 text-white" />
                    <h3 className="text-2xl font-black text-white">Key Results</h3>
                  </div>

                  <div className="space-y-6">
                    {study.results.map((result, j) => (
                      <div key={j} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
                        <div className="text-5xl font-black text-white mb-2">{result.metric}</div>
                        <div className="text-lg text-white font-bold">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-white">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-bold">Implementation completed in 90 days</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Ready to Transform Your Healthcare Facility?</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join hundreds of healthcare facilities achieving exceptional results with Median
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Schedule a Demo
              <Calendar className="h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
              <FileText className="h-5 w-5" />
              Request All Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black">Median</span>
          </div>
          <p className="text-gray-400 font-semibold mb-8">
            Delivering measurable results for healthcare facilities
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Brain,
  Shield,
  Users,
  DollarSign,
  Zap,
  Heart,
  Lock,
  BarChart3,
  BookOpen,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function WhitepapersPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI & Innovation', 'Compliance & Security', 'ROI & Business', 'Clinical Excellence', 'Industry Trends'];

  const whitepapers = [
    {
      title: 'The ROI of AI-Powered Clinical Decision Support Systems',
      subtitle: 'A comprehensive analysis of cost savings and patient outcome improvements',
      description: 'This whitepaper examines real-world data from 150+ hospitals implementing AI clinical decision support, revealing average ROI of 340% within 18 months and 25% reduction in diagnostic errors.',
      category: 'AI & Innovation',
      pages: 32,
      publishDate: 'December 2025',
      readTime: '25 min',
      downloads: '3,245',
      icon: Brain,
      color: 'purple',
      featured: true,
      keyFindings: [
        '340% average ROI within 18 months',
        '25% reduction in diagnostic errors',
        '18% improvement in treatment outcomes',
        '$2.8M average annual savings per facility',
      ],
    },
    {
      title: 'HIPAA Compliance in 2025: Complete Implementation Guide',
      subtitle: 'Navigate the latest security rule updates and compliance requirements',
      description: 'An authoritative guide to HIPAA Security Rule compliance, covering the 2025 updates including enhanced MFA requirements, breach notification protocols, and audit logging standards.',
      category: 'Compliance & Security',
      pages: 45,
      publishDate: 'November 2025',
      readTime: '35 min',
      downloads: '5,892',
      icon: Shield,
      color: 'blue',
      featured: true,
      keyFindings: [
        '2025 Security Rule requirement changes',
        'Step-by-step compliance checklist',
        'Risk assessment methodology',
        'Incident response frameworks',
      ],
    },
    {
      title: 'Emergency Department Optimization: A Data-Driven Approach',
      subtitle: 'Strategies to reduce wait times and improve patient flow',
      description: 'Learn how leading hospitals are using real-time analytics and AI-powered triage to reduce ED wait times by 40% while improving patient satisfaction scores.',
      category: 'Clinical Excellence',
      pages: 28,
      publishDate: 'October 2025',
      readTime: '22 min',
      downloads: '4,156',
      icon: TrendingUp,
      color: 'red',
      featured: false,
      keyFindings: [
        '40% reduction in average wait times',
        '28% increase in patient throughput',
        '92% patient satisfaction scores',
        'Best practices from 200+ hospitals',
      ],
    },
    {
      title: 'The Future of Interoperability: HL7 FHIR R5 Implementation',
      subtitle: 'Technical guide to modern healthcare data exchange',
      description: 'Complete technical overview of HL7 FHIR R5 standards, implementation patterns, and integration strategies for seamless data exchange across healthcare systems.',
      category: 'Industry Trends',
      pages: 52,
      publishDate: 'September 2025',
      readTime: '40 min',
      downloads: '2,834',
      icon: Zap,
      color: 'emerald',
      featured: false,
      keyFindings: [
        'FHIR R5 vs R4 comparison',
        'API implementation patterns',
        'Security and authentication',
        'Real-world integration examples',
      ],
    },
    {
      title: 'Revenue Cycle Optimization: Maximizing Collections in 2025',
      subtitle: 'Strategies to reduce denials and accelerate payment cycles',
      description: 'Data-driven strategies for improving revenue cycle performance, including automated coding, claims scrubbing, and denial management techniques.',
      category: 'ROI & Business',
      pages: 38,
      publishDate: 'August 2025',
      readTime: '30 min',
      downloads: '4,567',
      icon: DollarSign,
      color: 'emerald',
      featured: false,
      keyFindings: [
        '67% reduction in claim denials',
        '22 days faster average collection',
        '$8.5M average annual revenue increase',
        'Automated workflow best practices',
      ],
    },
    {
      title: 'Cybersecurity in Healthcare: 2025 Threat Landscape',
      subtitle: 'Protecting patient data in an evolving threat environment',
      description: 'Comprehensive analysis of healthcare cybersecurity threats, including ransomware trends, zero-trust architecture, and incident response strategies.',
      category: 'Compliance & Security',
      pages: 41,
      publishDate: 'July 2025',
      readTime: '33 min',
      downloads: '3,921',
      icon: Lock,
      color: 'red',
      featured: false,
      keyFindings: [
        '300% increase in ransomware attacks',
        'Zero-trust architecture framework',
        'Incident response playbooks',
        'Employee training best practices',
      ],
    },
    {
      title: 'Patient Engagement Strategies That Work',
      subtitle: 'Proven methods to improve satisfaction and outcomes',
      description: 'Research-backed patient engagement strategies using portal technology, mobile apps, and automated communications to improve satisfaction by 35%.',
      category: 'Clinical Excellence',
      pages: 26,
      publishDate: 'June 2025',
      readTime: '20 min',
      downloads: '5,234',
      icon: Users,
      color: 'blue',
      featured: false,
      keyFindings: [
        '35% improvement in patient satisfaction',
        '42% increase in portal adoption',
        '28% reduction in no-shows',
        'Multi-channel engagement tactics',
      ],
    },
    {
      title: 'Healthcare Analytics: From Data to Actionable Insights',
      subtitle: 'Building a data-driven healthcare organization',
      description: 'Comprehensive guide to healthcare analytics including predictive modeling, real-time dashboards, and business intelligence strategies.',
      category: 'ROI & Business',
      pages: 48,
      publishDate: 'May 2025',
      readTime: '38 min',
      downloads: '3,478',
      icon: BarChart3,
      color: 'purple',
      featured: false,
      keyFindings: [
        'Predictive analytics use cases',
        'Real-time dashboard design',
        'Data governance frameworks',
        'ROI measurement methodologies',
      ],
    },
    {
      title: 'Telemedicine Implementation: Complete Playbook',
      subtitle: 'Launching and scaling virtual care programs',
      description: 'Step-by-step guide to implementing telemedicine programs, covering technology selection, workflow design, reimbursement, and quality metrics.',
      category: 'Industry Trends',
      pages: 35,
      publishDate: 'April 2025',
      readTime: '28 min',
      downloads: '4,892',
      icon: Zap,
      color: 'cyan',
      featured: false,
      keyFindings: [
        'Technology selection criteria',
        'Workflow integration strategies',
        'Reimbursement optimization',
        'Quality metric tracking',
      ],
    },
  ];

  const filteredWhitepapers = selectedCategory === 'All'
    ? whitepapers
    : whitepapers.filter(wp => wp.category === selectedCategory);

  const featuredWhitepapers = whitepapers.filter(wp => wp.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Research & Insights</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
            Healthcare
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Whitepapers
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            In-depth research, analysis, and best practices from healthcare technology experts. Download
            comprehensive guides to help you make informed decisions.
          </p>

          <div className="flex items-center justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-blue-600">35,000+</div>
              <div className="text-sm text-gray-600 font-semibold">Total Downloads</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-4xl font-black text-purple-600">9</div>
              <div className="text-sm text-gray-600 font-semibold">Research Papers</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-4xl font-black text-pink-600">100%</div>
              <div className="text-sm text-gray-600 font-semibold">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Whitepapers */}
      {selectedCategory === 'All' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-12">
              <Award className="h-8 w-8 text-amber-600" />
              <h2 className="text-4xl font-black text-gray-900">Featured Research</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredWhitepapers.map((paper, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br from-${paper.color}-50 to-white rounded-3xl p-8 border-2 border-${paper.color}-200 hover:shadow-2xl transition-all relative`}
                >
                  <span className="absolute top-6 right-6 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full">
                    FEATURED
                  </span>

                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-${paper.color}-500 to-${paper.color}-600 flex items-center justify-center mb-6`}>
                    <paper.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-2">{paper.title}</h3>
                  <p className={`text-${paper.color}-600 font-bold mb-4`}>{paper.subtitle}</p>
                  <p className="text-gray-600 font-medium mb-6 leading-relaxed">{paper.description}</p>

                  <div className="space-y-2 mb-6">
                    {paper.keyFindings.map((finding, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle className={`h-4 w-4 text-${paper.color}-600 flex-shrink-0`} />
                        <span className="text-sm text-gray-700 font-semibold">{finding}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600 font-semibold mb-6">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {paper.pages} pages
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {paper.publishDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {paper.readTime}
                    </div>
                  </div>

                  <button className={`w-full py-4 bg-gradient-to-r from-${paper.color}-600 to-${paper.color}-700 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2`}>
                    <Download className="h-5 w-5" />
                    Download Whitepaper
                  </button>

                  <div className="text-center mt-3 text-xs text-gray-500 font-semibold">
                    {paper.downloads} downloads
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Whitepapers */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12">
            {selectedCategory === 'All' ? 'All Whitepapers' : selectedCategory}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWhitepapers.map((paper, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all group"
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-${paper.color}-500 to-${paper.color}-600 flex items-center justify-center mb-4`}>
                  <paper.icon className="h-6 w-6 text-white" />
                </div>

                <span className={`inline-block px-3 py-1 bg-${paper.color}-100 text-${paper.color}-800 text-xs font-black rounded-full mb-4`}>
                  {paper.category}
                </span>

                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {paper.title}
                </h3>

                <p className="text-sm text-gray-600 font-medium mb-4 leading-relaxed line-clamp-3">
                  {paper.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-600 font-semibold mb-4">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {paper.pages}p
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {paper.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {paper.downloads}
                  </div>
                </div>

                <button className={`w-full py-3 bg-${paper.color}-50 text-${paper.color}-600 font-bold rounded-xl hover:bg-${paper.color}-100 transition-all flex items-center justify-center gap-2`}>
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Want Custom Research?</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Our team can provide customized research and analysis tailored to your healthcare facility's specific needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Request Custom Research
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Download All Whitepapers
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
            Leading healthcare innovation through research
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

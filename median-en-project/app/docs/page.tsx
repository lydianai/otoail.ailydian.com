'use client';

import Header from '@/components/layout/Header';
import {
  BookOpen,
  Code,
  Rocket,
  Zap,
  Shield,
  Database,
  Cloud,
  Smartphone,
  FileText,
  Video,
  MessageCircle,
  ArrowRight,
  Search,
  Star,
  CheckCircle,
  Heart,
  Globe,
  Lock,
  Workflow,
  Terminal,
  Package,
} from 'lucide-react';

export default function DocsPage() {
  const quickStartGuides = [
    {
      title: 'Getting Started',
      description: 'Set up your Median environment in 15 minutes',
      icon: Rocket,
      color: 'blue',
      duration: '15 min',
      link: '/docs/getting-started',
    },
    {
      title: 'Authentication',
      description: 'Configure SSO, MFA, and user management',
      icon: Lock,
      color: 'purple',
      duration: '10 min',
      link: '/docs/authentication',
    },
    {
      title: 'API Integration',
      description: 'Connect your systems with Median APIs',
      icon: Code,
      color: 'emerald',
      duration: '20 min',
      link: '/docs/api',
    },
    {
      title: 'Mobile Setup',
      description: 'Deploy Median mobile apps for your staff',
      icon: Smartphone,
      color: 'pink',
      duration: '12 min',
      link: '/docs/mobile',
    },
  ];

  const docCategories = [
    {
      title: 'Platform Overview',
      description: 'Understand Median architecture, modules, and capabilities',
      icon: Globe,
      color: 'blue',
      articles: 24,
      popular: true,
      topics: [
        'System Architecture',
        'Module Overview',
        'Deployment Options',
        'Scalability & Performance',
      ],
    },
    {
      title: 'API Reference',
      description: 'Complete REST API documentation with code examples',
      icon: Code,
      color: 'purple',
      articles: 156,
      popular: true,
      topics: [
        'Patient Management API',
        'Appointments API',
        'Billing API',
        'Lab Results API',
      ],
    },
    {
      title: 'Integration Guides',
      description: 'Connect with EHR systems, labs, pharmacies, and more',
      icon: Workflow,
      color: 'emerald',
      articles: 42,
      popular: true,
      topics: [
        'HL7 FHIR Integration',
        'EHR Connectors',
        'Lab Integration',
        'Pharmacy Networks',
      ],
    },
    {
      title: 'Security & Compliance',
      description: 'HIPAA, SOC 2, and security implementation guides',
      icon: Shield,
      color: 'red',
      articles: 31,
      popular: true,
      topics: [
        'HIPAA Compliance',
        'Data Encryption',
        'Audit Logging',
        'Access Control',
      ],
    },
    {
      title: 'Mobile Development',
      description: 'Build and customize Median mobile applications',
      icon: Smartphone,
      color: 'cyan',
      articles: 28,
      popular: false,
      topics: [
        'iOS SDK',
        'Android SDK',
        'React Native',
        'Mobile UI Components',
      ],
    },
    {
      title: 'Database & Storage',
      description: 'Data models, schemas, and storage optimization',
      icon: Database,
      color: 'indigo',
      articles: 19,
      popular: false,
      topics: [
        'Data Models',
        'Schema Design',
        'Backup & Recovery',
        'Performance Tuning',
      ],
    },
    {
      title: 'Cloud Deployment',
      description: 'Deploy Median on AWS, Azure, or Google Cloud',
      icon: Cloud,
      color: 'amber',
      articles: 35,
      popular: false,
      topics: [
        'AWS Deployment',
        'Azure Setup',
        'Google Cloud',
        'Kubernetes',
      ],
    },
    {
      title: 'CLI & Tools',
      description: 'Command-line tools and developer utilities',
      icon: Terminal,
      color: 'gray',
      articles: 22,
      popular: false,
      topics: [
        'CLI Reference',
        'Migration Tools',
        'Testing Utilities',
        'Deployment Scripts',
      ],
    },
  ];

  const popularArticles = [
    { title: 'Patient API: Complete Guide', views: '12.5K', category: 'API Reference' },
    { title: 'HIPAA Compliance Checklist', views: '10.2K', category: 'Security' },
    { title: 'HL7 FHIR Integration Tutorial', views: '9.8K', category: 'Integrations' },
    { title: 'SSO Setup with Okta', views: '8.4K', category: 'Authentication' },
    { title: 'Mobile App Deployment Guide', views: '7.9K', category: 'Mobile' },
  ];

  const sdks = [
    { name: 'JavaScript / TypeScript', icon: '🟨', downloads: '45K/month' },
    { name: 'Python', icon: '🐍', downloads: '38K/month' },
    { name: 'Java', icon: '☕', downloads: '32K/month' },
    { name: 'C# / .NET', icon: '💜', downloads: '28K/month' },
    { name: 'Ruby', icon: '💎', downloads: '12K/month' },
    { name: 'PHP', icon: '🐘', downloads: '15K/month' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-bold text-gray-900">Developer Documentation</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
              Median
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Everything you need to integrate, customize, and deploy Median. Comprehensive guides,
              API references, and code examples.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-semibold text-gray-900 text-lg shadow-lg"
                />
                <kbd className="absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-600">
                  Ctrl K
                </kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-blue-600">357</div>
              <div className="text-sm text-gray-600 font-semibold">Articles</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-3xl font-black text-purple-600">156</div>
              <div className="text-sm text-gray-600 font-semibold">API Endpoints</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-3xl font-black text-pink-600">6</div>
              <div className="text-sm text-gray-600 font-semibold">Official SDKs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guides */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <Rocket className="h-8 w-8 text-blue-600" />
            <h2 className="text-4xl font-black text-gray-900">Quick Start Guides</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartGuides.map((guide, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-${guide.color}-50 to-white rounded-2xl p-6 border-2 border-${guide.color}-200 hover:border-${guide.color}-400 hover:shadow-2xl transition-all group cursor-pointer`}
              >
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-${guide.color}-500 to-${guide.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <guide.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium mb-4 leading-relaxed">{guide.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-semibold">{guide.duration}</span>
                  <ArrowRight className={`h-5 w-5 text-${guide.color}-600`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-gray-900">Documentation</h2>
            <span className="text-sm text-gray-600 font-semibold">{docCategories.reduce((acc, cat) => acc + cat.articles, 0)} articles</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {docCategories.map((category, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all group cursor-pointer"
              >
                {category.popular && (
                  <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full mb-4">
                    POPULAR
                  </span>
                )}

                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium mb-4 leading-relaxed">{category.description}</p>

                <div className="text-xs text-gray-500 font-semibold mb-4">{category.articles} articles</div>

                <div className="space-y-1">
                  {category.topics.map((topic, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      <span className="text-xs text-gray-700 font-semibold">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles & SDKs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Popular Articles */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Star className="h-6 w-6 text-amber-600" />
                <h2 className="text-3xl font-black text-gray-900">Popular Articles</h2>
              </div>

              <div className="space-y-4">
                {popularArticles.map((article, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-600 font-semibold">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.views} views</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 ml-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official SDKs */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Package className="h-6 w-6 text-purple-600" />
                <h2 className="text-3xl font-black text-gray-900">Official SDKs</h2>
              </div>

              <div className="space-y-4">
                {sdks.map((sdk, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{sdk.icon}</div>
                        <div>
                          <h3 className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">
                            {sdk.name}
                          </h3>
                          <div className="text-xs text-gray-600 font-semibold">{sdk.downloads}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-200">
                <h3 className="font-black text-gray-900 mb-2">Need another language?</h3>
                <p className="text-sm text-gray-700 font-medium mb-4">
                  Request support for additional languages or contribute to our open-source SDKs.
                </p>
                <button className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all">
                  Request SDK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Need Help?</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Our developer support team is here to help you succeed with Median
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
              <MessageCircle className="h-10 w-10 text-white mb-4 mx-auto" />
              <h3 className="font-black text-white mb-2">Live Chat</h3>
              <p className="text-sm text-blue-100 mb-4">Chat with our developer support team</p>
              <button className="text-white font-bold hover:underline">Start Chat</button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
              <FileText className="h-10 w-10 text-white mb-4 mx-auto" />
              <h3 className="font-black text-white mb-2">Support Tickets</h3>
              <p className="text-sm text-blue-100 mb-4">Submit a technical support request</p>
              <button className="text-white font-bold hover:underline">Create Ticket</button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
              <Video className="h-10 w-10 text-white mb-4 mx-auto" />
              <h3 className="font-black text-white mb-2">Video Tutorials</h3>
              <p className="text-sm text-blue-100 mb-4">Watch step-by-step implementation videos</p>
              <button className="text-white font-bold hover:underline">Watch Now</button>
            </div>
          </div>

          <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
            View All Support Options
            <ArrowRight className="h-5 w-5" />
          </button>
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
            Building the future of healthcare technology
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

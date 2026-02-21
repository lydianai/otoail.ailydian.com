'use client';

import Header from '@/components/layout/Header';
import {
  Newspaper,
  Award,
  Download,
  ArrowRight,
  Calendar,
  ExternalLink,
  FileText,
  Image,
  Video,
  Mail,
  Phone,
  Building2,
  TrendingUp,
  Users,
  Globe,
  Heart,
  Sparkles,
  Quote,
  PlayCircle,
} from 'lucide-react';

export default function PressPage() {
  const pressReleases = [
    {
      date: 'December 15, 2025',
      title: 'Median Announces $150M Series D Funding to Expand Global Healthcare Platform',
      excerpt: 'Leading healthcare technology company secures major funding round to accelerate international expansion and AI development.',
      category: 'Funding',
      link: '#',
    },
    {
      date: 'November 28, 2025',
      title: 'Median Surpasses 500 Healthcare Facility Milestone in US and Turkey',
      excerpt: 'Platform now serves over 2 million patients across two continents with 99.9% customer satisfaction rate.',
      category: 'Company News',
      link: '#',
    },
    {
      date: 'October 10, 2025',
      title: 'Median Launches AI-Powered Clinical Decision Support System',
      excerpt: 'FDA-cleared AI algorithms now available to help physicians make faster, more accurate diagnoses.',
      category: 'Product Launch',
      link: '#',
    },
    {
      date: 'September 5, 2025',
      title: 'Median Achieves SOC 2 Type II Certification',
      excerpt: 'Major security milestone demonstrates commitment to protecting patient data and healthcare information.',
      category: 'Compliance',
      link: '#',
    },
    {
      date: 'August 20, 2025',
      title: 'Median Partners with legacy systems for Seamless EHR Integration',
      excerpt: 'New certified integration enables bi-directional data exchange with modern healthcare EHR systems nationwide.',
      category: 'Partnership',
      link: '#',
    },
    {
      date: 'July 12, 2025',
      title: 'Median Named "Best Hospital Management Platform" by HIMSS',
      excerpt: 'Industry recognition highlights innovation in healthcare technology and patient care improvement.',
      category: 'Awards',
      link: '#',
    },
  ];

  const mediaCoverage = [
    {
      outlet: 'TechCrunch',
      logo: '📰',
      date: 'Dec 16, 2025',
      headline: 'Median raises $150M to revolutionize hospital management with AI',
      link: '#',
    },
    {
      outlet: 'Healthcare IT News',
      logo: '🏥',
      date: 'Dec 10, 2025',
      headline: 'How Median is transforming emergency department workflows',
      link: '#',
    },
    {
      outlet: 'Forbes',
      logo: '💼',
      date: 'Nov 22, 2025',
      headline: 'The Future of Healthcare: Inside Median\'s AI-Powered Platform',
      link: '#',
    },
    {
      outlet: 'The Wall Street Journal',
      logo: '📊',
      date: 'Nov 5, 2025',
      headline: 'Median expands to Turkey, eyes European market growth',
      link: '#',
    },
    {
      outlet: 'VentureBeat',
      logo: '⚡',
      date: 'Oct 18, 2025',
      headline: 'Median\'s AI clinical decision support clears FDA review',
      link: '#',
    },
    {
      outlet: 'MedCity News',
      logo: '🌆',
      date: 'Oct 3, 2025',
      headline: 'Hospital systems report 40% efficiency gains with Median',
      link: '#',
    },
  ];

  const awards = [
    {
      year: '2025',
      award: 'Best Hospital Management Platform',
      organization: 'HIMSS (Healthcare Information and Management Systems Society)',
      icon: '🏆',
    },
    {
      year: '2025',
      award: 'Top 50 Healthcare IT Companies',
      organization: 'Becker\'s Hospital Review',
      icon: '⭐',
    },
    {
      year: '2025',
      award: 'Innovation in Patient Care Award',
      organization: 'American Hospital Association',
      icon: '💡',
    },
    {
      year: '2024',
      award: 'Fast Company Most Innovative Companies',
      organization: 'Fast Company',
      icon: '🚀',
    },
    {
      year: '2024',
      award: 'Deloitte Technology Fast 500',
      organization: 'Deloitte',
      icon: '📈',
    },
    {
      year: '2024',
      award: 'Best Startup Healthcare Platform',
      organization: 'Med Tech Breakthrough Awards',
      icon: '🎯',
    },
  ];

  const pressKitItems = [
    {
      title: 'Company Logo Pack',
      description: 'High-resolution logos in various formats (PNG, SVG, EPS)',
      icon: Image,
      fileSize: '12 MB',
      format: 'ZIP',
    },
    {
      title: 'Brand Guidelines',
      description: 'Complete brand identity and usage guidelines',
      icon: FileText,
      fileSize: '8 MB',
      format: 'PDF',
    },
    {
      title: 'Product Screenshots',
      description: 'High-quality screenshots of Median platform',
      icon: Image,
      fileSize: '45 MB',
      format: 'ZIP',
    },
    {
      title: 'Executive Headshots',
      description: 'Professional photos of leadership team',
      icon: Users,
      fileSize: '25 MB',
      format: 'ZIP',
    },
    {
      title: 'Company Fact Sheet',
      description: 'Key statistics, milestones, and company information',
      icon: FileText,
      fileSize: '2 MB',
      format: 'PDF',
    },
    {
      title: 'Demo Videos',
      description: 'Platform walkthrough and feature demonstrations',
      icon: Video,
      fileSize: '120 MB',
      format: 'MP4',
    },
  ];

  const mediaContact = {
    name: 'Sarah Johnson',
    title: 'VP of Communications',
    email: 'press@lydianmedi.com',
    phone: '+1 (800) 555-0199',
  };

  const companyStats = [
    { number: '500+', label: 'Healthcare Facilities', icon: Building2 },
    { number: '2M+', label: 'Patients Managed', icon: Users },
    { number: '45', label: 'US States', icon: Globe },
    { number: '$150M', label: 'Total Funding', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
            <Newspaper className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Press & Media Center</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
            Median in the
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              News
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Latest news, press releases, and media coverage about Median's mission to transform healthcare
            through innovative technology.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {companyStats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <stat.icon className="h-8 w-8 text-blue-600 mb-3 mx-auto" />
                <div className="text-3xl font-black text-blue-600">{stat.number}</div>
                <div className="text-sm text-gray-600 font-semibold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Press Releases */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Press Releases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Official announcements and company news
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pressReleases.map((release, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-black rounded-full">
                    {release.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                    <Calendar className="h-4 w-4" />
                    {release.date}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {release.title}
                </h3>

                <p className="text-gray-600 font-medium mb-6 leading-relaxed">{release.excerpt}</p>

                <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                  Read Full Release
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl border-2 border-blue-600 hover:bg-blue-50 transition-all">
              View All Press Releases
            </button>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Media Coverage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Median featured in leading publications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaCoverage.map((coverage, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{coverage.logo}</div>
                  <div>
                    <h3 className="font-black text-gray-900">{coverage.outlet}</h3>
                    <p className="text-xs text-gray-600 font-semibold">{coverage.date}</p>
                  </div>
                </div>

                <p className="text-gray-800 font-bold mb-4 leading-relaxed group-hover:text-purple-600 transition-colors">
                  {coverage.headline}
                </p>

                <button className="flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all text-sm">
                  Read Article
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Award className="h-8 w-8 text-amber-600" />
              <h2 className="text-5xl font-black text-gray-900">Awards & Recognition</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Industry recognition for innovation and excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border-2 border-amber-200 hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-4 text-center">{award.icon}</div>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full mb-4">
                    {award.year}
                  </span>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{award.award}</h3>
                  <p className="text-sm text-gray-600 font-semibold">{award.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Press Kit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Download logos, images, and media resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressKitItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600 font-semibold">{item.format}</div>
                    <div className="text-xs text-gray-500">{item.fileSize}</div>
                  </div>
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 font-medium mb-4 text-sm">{item.description}</p>

                <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />
                  Download
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white text-green-600 font-black rounded-2xl border-2 border-green-600 hover:bg-green-50 transition-all flex items-center gap-2 mx-auto">
              <Download className="h-5 w-5" />
              Download Complete Press Kit
            </button>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4">Media Inquiries</h2>
            <p className="text-xl text-blue-100 mb-8 font-medium">
              For press inquiries, interviews, or media requests, please contact:
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-black mb-2">{mediaContact.name}</h3>
              <p className="text-blue-100 font-semibold mb-6">{mediaContact.title}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <Mail className="h-5 w-5" />
                  <a href={`mailto:${mediaContact.email}`} className="font-bold hover:underline">
                    {mediaContact.email}
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Phone className="h-5 w-5" />
                  <a href={`tel:${mediaContact.phone}`} className="font-bold hover:underline">
                    {mediaContact.phone}
                  </a>
                </div>
              </div>
            </div>

            <p className="text-sm text-blue-200">
              We typically respond to media inquiries within 24 hours
            </p>
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
            Transforming healthcare through innovation
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

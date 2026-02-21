'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import {
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  Brain,
  Shield,
  Zap,
  Heart,
  Search,
  Filter,
  Clock,
  Tag,
  ExternalLink,
} from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Industry Insights',
    'Product Updates',
    'AI & Technology',
    'Compliance',
    'Best Practices',
    'Customer Stories',
  ];

  const featuredPost = {
    title: 'The Future of AI in Healthcare: 2025 Trends and Predictions',
    excerpt: 'Explore how artificial intelligence is reshaping clinical decision-making, patient care, and hospital operations in the modern healthcare landscape.',
    author: 'Dr. Emily Chen',
    role: 'Chief Medical Officer',
    date: 'December 20, 2025',
    readTime: '12 min read',
    category: 'AI & Technology',
    image: '🤖',
    featured: true,
  };

  const blogPosts = [
    {
      title: 'HIPAA Compliance in 2025: What Healthcare Facilities Need to Know',
      excerpt: 'Stay up-to-date with the latest HIPAA security rule updates and ensure your facility remains compliant with evolving healthcare regulations.',
      author: 'Sarah Johnson',
      role: 'Compliance Director',
      date: 'December 18, 2025',
      readTime: '8 min read',
      category: 'Compliance',
      image: '🔒',
    },
    {
      title: 'Reducing Emergency Department Wait Times by 40%: A Case Study',
      excerpt: 'Learn how Memorial Hospital implemented Median and dramatically improved patient flow in their emergency department.',
      author: 'Michael Roberts',
      role: 'Healthcare Consultant',
      date: 'December 15, 2025',
      readTime: '10 min read',
      category: 'Customer Stories',
      image: '🏥',
    },
    {
      title: '10 Best Practices for Successful EHR Implementation',
      excerpt: 'Expert tips and strategies for a smooth electronic health record system deployment that maximizes adoption and minimizes disruption.',
      author: 'Jennifer Lee',
      role: 'Implementation Specialist',
      date: 'December 12, 2025',
      readTime: '15 min read',
      category: 'Best Practices',
      image: '📋',
    },
    {
      title: 'New Features: Advanced Analytics Dashboard and Predictive Insights',
      excerpt: 'Discover the latest Median platform updates including real-time analytics, predictive modeling, and customizable reporting tools.',
      author: 'David Martinez',
      role: 'Product Manager',
      date: 'December 10, 2025',
      readTime: '6 min read',
      category: 'Product Updates',
      image: '📊',
    },
    {
      title: 'The Impact of Telemedicine on Rural Healthcare Access',
      excerpt: 'How telehealth technology is bridging the gap in healthcare access for rural and underserved communities across America.',
      author: 'Dr. Amanda Williams',
      role: 'Telemedicine Director',
      date: 'December 8, 2025',
      readTime: '9 min read',
      category: 'Industry Insights',
      image: '🌐',
    },
    {
      title: 'Cybersecurity Threats in Healthcare: Protecting Patient Data',
      excerpt: 'Understanding modern cybersecurity challenges in healthcare and implementing effective strategies to protect sensitive patient information.',
      author: 'Robert Chen',
      role: 'Chief Security Officer',
      date: 'December 5, 2025',
      readTime: '11 min read',
      category: 'Compliance',
      image: '🛡️',
    },
    {
      title: 'Streamlining Revenue Cycle Management with Automation',
      excerpt: 'How automated billing and claims processing can reduce denials, accelerate payments, and improve financial performance.',
      author: 'Lisa Thompson',
      role: 'Revenue Cycle Expert',
      date: 'December 3, 2025',
      readTime: '7 min read',
      category: 'Best Practices',
      image: '💰',
    },
    {
      title: 'Interoperability in Healthcare: Breaking Down Data Silos',
      excerpt: 'The importance of HL7 FHIR standards and how seamless data exchange is transforming patient care coordination.',
      author: 'James Wilson',
      role: 'Integration Architect',
      date: 'November 30, 2025',
      readTime: '13 min read',
      category: 'Industry Insights',
      image: '🔗',
    },
    {
      title: 'How AI is Improving Clinical Decision Support',
      excerpt: 'Real-world examples of AI-powered clinical decision support systems reducing diagnostic errors and improving patient outcomes.',
      author: 'Dr. Rachel Green',
      role: 'Clinical Informatics',
      date: 'November 28, 2025',
      readTime: '10 min read',
      category: 'AI & Technology',
      image: '🧠',
    },
  ];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const popularTags = [
    'HIPAA',
    'AI Healthcare',
    'EHR',
    'Telemedicine',
    'Patient Care',
    'Compliance',
    'Data Security',
    'Hospital Management',
    'Clinical Workflows',
    'Revenue Cycle',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Healthcare Insights & Resources</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
            Median
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Expert insights on healthcare technology, industry trends, compliance updates, and best practices
            for modern hospital management.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-semibold text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-600 flex-shrink-0" />
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

      {/* Featured Post */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-12">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-black rounded-full">
                  FEATURED
                </span>
                <h2 className="text-4xl font-black text-gray-900 mt-6 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-600 font-medium mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900">{featuredPost.author}</div>
                    <div className="text-sm text-gray-600 font-semibold">{featuredPost.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 font-semibold mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>

                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2">
                  Read Article
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-12">
                <div className="text-9xl">{featuredPost.image}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-gray-900">Latest Articles</h2>
            <div className="text-sm text-gray-600 font-semibold">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all group cursor-pointer overflow-hidden"
              >
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center">
                  <div className="text-7xl">{post.image}</div>
                </div>

                <div className="p-6">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-black rounded-full">
                    {post.category}
                  </span>

                  <h3 className="text-xl font-black text-gray-900 mt-4 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 font-medium mb-4 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 text-sm truncate">{post.author}</div>
                      <div className="text-xs text-gray-600 font-semibold truncate">{post.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <button className="w-full py-2 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-all flex items-center justify-center gap-2">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl border-2 border-blue-600 hover:bg-blue-50 transition-all">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Popular Topics</h2>
            <p className="text-gray-600 font-medium">Explore articles by topic</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Tag className="h-4 w-4" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Stay Informed</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Subscribe to our newsletter for the latest healthcare insights and Median updates
          </p>

          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-white/30 bg-white/10 text-white placeholder-white/60 font-semibold focus:outline-none focus:border-white"
              />
              <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Join 10,000+ healthcare professionals receiving our weekly newsletter
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
            Sharing knowledge to advance healthcare
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

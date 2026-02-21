'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Video,
  Book,
  FileText,
  Zap,
  Users,
  Settings,
  Shield,
  CreditCard,
  Smartphone,
  ChevronDown,
  ChevronRight,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: Book, count: 124 },
    { name: 'Getting Started', icon: Zap, count: 18 },
    { name: 'Account & Billing', icon: CreditCard, count: 22 },
    { name: 'Features', icon: Settings, count: 45 },
    { name: 'Security', icon: Shield, count: 15 },
    { name: 'Mobile Apps', icon: Smartphone, count: 12 },
    { name: 'Integrations', icon: Users, count: 12 },
  ];

  const faqs = [
    {
      category: 'Getting Started',
      question: 'How do I get started with Median?',
      answer: 'Getting started with Median is easy! Sign up for a free 30-day trial, and you\'ll receive onboarding emails with step-by-step guides. Our implementation team will schedule a kickoff call to understand your needs and create a customized deployment plan. Most facilities are up and running within 90 days.',
    },
    {
      category: 'Getting Started',
      question: 'What information do I need to set up my account?',
      answer: 'You\'ll need your facility information (name, address, NPI number), administrator contact details, staff roster, and your current system details for data migration. Our team will guide you through each step and help gather any additional information needed.',
    },
    {
      category: 'Getting Started',
      question: 'How long does implementation take?',
      answer: 'Implementation typically takes 60-90 days depending on your facility size and complexity. This includes data migration, staff training, workflow configuration, and integration setup. We provide a dedicated implementation manager to ensure a smooth transition.',
    },
    {
      category: 'Account & Billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), ACH bank transfers, and wire transfers. For enterprise customers, we also offer invoice-based billing with net-30 terms.',
    },
    {
      category: 'Account & Billing',
      question: 'Can I change my plan at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, changes take effect immediately. When downgrading, changes take effect at the end of your current billing cycle. There are no cancellation fees.',
    },
    {
      category: 'Account & Billing',
      question: 'Do you offer discounts for annual payments?',
      answer: 'Yes, we offer a 15% discount when you pay annually instead of monthly. Enterprise customers can also negotiate custom pricing based on facility size and specific needs.',
    },
    {
      category: 'Features',
      question: 'Can Median integrate with our existing EHR system?',
      answer: 'Yes! Median integrates with all major EHR systems including legacy systems, outdated platforms, conventional systems, and athenahealth. We support HL7 v2.x, FHIR R4/R5, and direct API integrations. Our integration team will assess your current system and recommend the best approach.',
    },
    {
      category: 'Features',
      question: 'Is telemedicine included in all plans?',
      answer: 'Telemedicine is included in Professional and Enterprise plans. It includes HD video consultations, screen sharing, integrated prescribing, and automated billing. The Basic plan includes audio-only consultations.',
    },
    {
      category: 'Features',
      question: 'How does the AI clinical decision support work?',
      answer: 'Our AI clinical decision support uses FDA-cleared algorithms to analyze patient data and provide evidence-based recommendations. It integrates seamlessly into your clinical workflow, offering real-time alerts for drug interactions, diagnostic suggestions, and treatment protocols.',
    },
    {
      category: 'Security',
      question: 'Is Median HIPAA compliant?',
      answer: 'Yes, Median is fully HIPAA compliant and we sign Business Associate Agreements (BAA) with all customers. We undergo regular third-party audits and maintain SOC 2 Type II certification. All data is encrypted at rest and in transit using AES-256 encryption.',
    },
    {
      category: 'Security',
      question: 'Where is my data stored?',
      answer: 'For US customers, data is stored in HIPAA-compliant data centers within the United States (AWS US-East and US-West regions). For Turkish customers, data is stored in Turkey-based data centers to comply with KVKK requirements. We never store data outside your designated region.',
    },
    {
      category: 'Security',
      question: 'How do you handle data backups?',
      answer: 'We perform automated backups every 6 hours with point-in-time recovery capabilities. Backups are encrypted and stored in geographically separate locations. We retain backups for 90 days and provide instant recovery options.',
    },
    {
      category: 'Mobile Apps',
      question: 'Are mobile apps available for iOS and Android?',
      answer: 'Yes! Median mobile apps are available for both iOS (iOS 14+) and Android (Android 8+). The apps provide full access to patient records, scheduling, messaging, and clinical tools. Download from the App Store or Google Play.',
    },
    {
      category: 'Mobile Apps',
      question: 'Can patients access Median on mobile?',
      answer: 'Yes, we offer a separate patient portal app that allows patients to view their records, schedule appointments, message providers, access lab results, and make payments. It\'s available on iOS and Android.',
    },
    {
      category: 'Integrations',
      question: 'Which pharmacy networks do you integrate with?',
      answer: 'We integrate with all major pharmacy networks including Surescripts for ePrescribing, CVS Health, Walgreens, and independent pharmacy networks. Prescriptions can be sent electronically with automatic status updates.',
    },
    {
      category: 'Integrations',
      question: 'Do you support lab integrations?',
      answer: 'Yes, we integrate with Quest Diagnostics, LabCorp, BioReference, ARUP, and most regional lab networks. Electronic orders can be placed directly from Median with automatic result delivery back to the patient chart.',
    },
  ];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageCircle,
      color: 'blue',
      availability: '24/7',
      responseTime: 'Instant',
      action: 'Start Chat',
    },
    {
      title: 'Email Support',
      description: 'Send us an email and get a response within 4 hours',
      icon: Mail,
      color: 'purple',
      availability: '24/7',
      responseTime: '< 4 hours',
      action: 'Send Email',
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with a support specialist',
      icon: Phone,
      color: 'emerald',
      availability: 'Mon-Fri 8AM-8PM EST',
      responseTime: 'Immediate',
      action: 'Call Now',
    },
    {
      title: 'Video Call',
      description: 'Schedule a screen-share session with our team',
      icon: Video,
      color: 'pink',
      availability: 'By appointment',
      responseTime: 'Same day',
      action: 'Schedule Call',
    },
  ];

  const popularTopics = [
    { title: 'Setting up your first patient record', views: '15.2K', category: 'Getting Started' },
    { title: 'How to schedule appointments', views: '12.8K', category: 'Features' },
    { title: 'Understanding billing and claims', views: '11.4K', category: 'Account & Billing' },
    { title: 'Configuring user permissions', views: '10.9K', category: 'Security' },
    { title: 'Integrating with modern healthcare EHR', views: '9.7K', category: 'Integrations' },
    { title: 'Mobile app installation guide', views: '8.5K', category: 'Mobile Apps' },
  ];

  const systemStatus = {
    status: 'operational',
    uptime: '99.98%',
    incidents: 0,
    lastUpdate: '2 minutes ago',
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">24/7 Support Available</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
            How can we
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Search our knowledge base, browse FAQs, or contact our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, guides..."
                className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-semibold text-gray-900 text-lg shadow-lg"
              />
            </div>
          </div>

          {/* System Status */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-bold text-gray-900">All Systems Operational</span>
                <span className="text-sm text-gray-600 font-semibold">{systemStatus.uptime} uptime</span>
              </div>
              <button className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                View Status
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Get Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Choose the support channel that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-${option.color}-50 to-white rounded-2xl p-6 border-2 border-${option.color}-200 hover:shadow-2xl transition-all cursor-pointer`}
              >
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-${option.color}-500 to-${option.color}-600 flex items-center justify-center mb-4`}>
                  <option.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 font-medium mb-4">{option.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                    <Clock className="h-3 w-3" />
                    {option.availability}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                    <Zap className="h-3 w-3" />
                    {option.responseTime} response
                  </div>
                </div>

                <button className={`w-full py-3 bg-${option.color}-50 text-${option.color}-600 font-bold rounded-xl hover:bg-${option.color}-100 transition-all`}>
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-gray-900">Popular Topics</h2>
            <button className="text-blue-600 font-bold hover:underline">View All</button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTopics.map((topic, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-600 font-semibold">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {topic.category}
                      </span>
                      <span>{topic.views} views</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Find answers to common questions about Median
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  selectedCategory === cat.name
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.name}
                <span className="text-xs">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-gray-900 mb-1">{faq.question}</h3>
                      <span className="text-xs text-blue-600 font-semibold">{faq.category}</span>
                    </div>
                  </div>
                  {openFaq === i ? (
                    <ChevronDown className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-6 pl-16">
                    <p className="text-gray-700 font-medium leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Still Need Help?</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Our support team is standing by to assist you with any questions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Contact Support
              <MessageCircle className="h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
              <Video className="h-5 w-5" />
              Schedule Demo
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
            Here to help you succeed
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  Users,
  PlayCircle,
  Download,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Heart,
  Zap,
  Brain,
  Shield,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

export default function WebinarsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingWebinars = [
    {
      title: 'AI-Powered Clinical Decision Support: Real-World Implementation',
      description: 'Learn how leading hospitals are implementing AI clinical decision support systems to reduce diagnostic errors and improve patient outcomes. Live Q&A with healthcare CIOs.',
      date: 'January 15, 2026',
      time: '2:00 PM EST',
      duration: '60 minutes',
      speaker: 'Dr. Emily Chen',
      role: 'Chief Medical Officer, Median',
      attendees: '847 registered',
      icon: Brain,
      color: 'purple',
      topics: [
        'FDA-cleared AI algorithms overview',
        'Implementation roadmap and timeline',
        'ROI analysis and case studies',
        'Integration with existing EHR systems',
      ],
      featured: true,
    },
    {
      title: 'HIPAA Compliance 2026: What\'s Changing and How to Prepare',
      description: 'Stay ahead of upcoming HIPAA Security Rule updates. Our compliance experts break down the changes and provide actionable steps for your facility.',
      date: 'January 22, 2026',
      time: '1:00 PM EST',
      duration: '45 minutes',
      speaker: 'Sarah Johnson',
      role: 'Compliance Director, Median',
      attendees: '623 registered',
      icon: Shield,
      color: 'blue',
      topics: [
        '2026 Security Rule updates',
        'Enhanced MFA requirements',
        'Audit log standards',
        'Breach notification protocols',
      ],
      featured: true,
    },
    {
      title: 'Emergency Department Optimization Workshop',
      description: 'Interactive workshop on reducing ED wait times, improving patient flow, and maximizing throughput using data-driven strategies.',
      date: 'January 29, 2026',
      time: '3:00 PM EST',
      duration: '90 minutes',
      speaker: 'Michael Roberts',
      role: 'Healthcare Consultant',
      attendees: '512 registered',
      icon: TrendingUp,
      color: 'red',
      topics: [
        'Real-time triage optimization',
        'Bed management best practices',
        'Staff workflow efficiency',
        'Patient satisfaction strategies',
      ],
      featured: false,
    },
    {
      title: 'Revenue Cycle Management: Maximizing Collections in 2026',
      description: 'Proven strategies to reduce claim denials, accelerate payments, and optimize your revenue cycle with automation and analytics.',
      date: 'February 5, 2026',
      time: '2:00 PM EST',
      duration: '60 minutes',
      speaker: 'Lisa Thompson',
      role: 'Revenue Cycle Expert',
      attendees: '734 registered',
      icon: DollarSign,
      color: 'emerald',
      topics: [
        'Automated coding and billing',
        'Claims scrubbing techniques',
        'Denial management strategies',
        'Payment acceleration tactics',
      ],
      featured: false,
    },
  ];

  const recordedWebinars = [
    {
      title: 'Median Platform Deep Dive: Features and Best Practices',
      description: 'Comprehensive tour of the Median platform covering all major modules, workflows, and optimization tips from our product experts.',
      date: 'December 10, 2025',
      duration: '75 minutes',
      views: '2,847',
      rating: '4.9',
      speaker: 'David Martinez',
      role: 'Product Manager',
      icon: Zap,
      color: 'blue',
    },
    {
      title: 'Telemedicine Success Stories: Lessons from 500+ Implementations',
      description: 'Real-world case studies from hospitals that successfully launched telemedicine programs, including ROI data and patient satisfaction metrics.',
      date: 'November 18, 2025',
      duration: '60 minutes',
      views: '3,521',
      rating: '4.8',
      speaker: 'Dr. Amanda Williams',
      role: 'Telemedicine Director',
      icon: Video,
      color: 'cyan',
    },
    {
      title: 'Healthcare Cybersecurity: Protecting Against Ransomware',
      description: 'Critical strategies for defending your healthcare facility against ransomware attacks and other cybersecurity threats.',
      date: 'October 25, 2025',
      duration: '55 minutes',
      views: '4,189',
      rating: '4.9',
      speaker: 'Robert Chen',
      role: 'Chief Security Officer',
      icon: Shield,
      color: 'red',
    },
    {
      title: 'Interoperability Made Simple: HL7 FHIR Implementation',
      description: 'Technical deep dive into FHIR standards, API implementation, and achieving seamless data exchange across healthcare systems.',
      date: 'September 30, 2025',
      duration: '90 minutes',
      views: '2,634',
      rating: '4.7',
      speaker: 'James Wilson',
      role: 'Integration Architect',
      icon: Zap,
      color: 'purple',
    },
    {
      title: 'Patient Engagement Strategies That Actually Work',
      description: 'Data-backed strategies for improving patient engagement through portal technology, mobile apps, and automated communications.',
      date: 'August 15, 2025',
      duration: '65 minutes',
      views: '3,892',
      rating: '4.8',
      speaker: 'Jennifer Lee',
      role: 'Patient Experience Director',
      icon: Users,
      color: 'pink',
    },
    {
      title: 'Operating Room Efficiency: Maximizing Surgical Capacity',
      description: 'Learn how intelligent scheduling and resource management can increase OR utilization by 40% and boost surgical revenue.',
      date: 'July 20, 2025',
      duration: '70 minutes',
      views: '2,156',
      rating: '4.9',
      speaker: 'Dr. Rebecca Torres',
      role: 'Surgical Services Director',
      icon: TrendingUp,
      color: 'amber',
    },
  ];

  const webinarSeries = [
    {
      title: 'Healthcare Leadership Series',
      description: 'Monthly interviews with healthcare executives sharing insights on digital transformation',
      episodes: 12,
      frequency: 'Monthly',
      icon: Award,
    },
    {
      title: 'Technical Deep Dives',
      description: 'Quarterly technical sessions for IT teams covering integrations and implementations',
      episodes: 4,
      frequency: 'Quarterly',
      icon: Zap,
    },
    {
      title: 'Compliance Updates',
      description: 'Regular updates on healthcare compliance, regulations, and best practices',
      episodes: 6,
      frequency: 'Bi-monthly',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
            <Video className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Free Educational Webinars</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
            Healthcare
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Webinars
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Join our expert-led webinars to stay current with healthcare technology trends, best practices,
            and Median platform capabilities. All webinars are free to attend.
          </p>

          <div className="flex items-center justify-center gap-8">
            <div>
              <div className="text-4xl font-black text-blue-600">15,000+</div>
              <div className="text-sm text-gray-600 font-semibold">Total Attendees</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-4xl font-black text-purple-600">50+</div>
              <div className="text-sm text-gray-600 font-semibold">Webinars Available</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-4xl font-black text-pink-600">4.8★</div>
              <div className="text-sm text-gray-600 font-semibold">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 justify-center">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-2xl font-black transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming Webinars
            </button>
            <button
              onClick={() => setActiveTab('recorded')}
              className={`px-8 py-3 rounded-2xl font-black transition-all ${
                activeTab === 'recorded'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              On-Demand Library
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      {activeTab === 'upcoming' && (
        <>
          {/* Featured Upcoming */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-12">
                <Star className="h-8 w-8 text-amber-600" />
                <h2 className="text-4xl font-black text-gray-900">Featured Webinars</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {upcomingWebinars.filter(w => w.featured).map((webinar, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br from-${webinar.color}-50 to-white rounded-3xl p-8 border-2 border-${webinar.color}-200 hover:shadow-2xl transition-all relative`}
                  >
                    <span className="absolute top-6 right-6 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full">
                      FEATURED
                    </span>

                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-${webinar.color}-500 to-${webinar.color}-600 flex items-center justify-center mb-6`}>
                      <webinar.icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-3">{webinar.title}</h3>
                    <p className="text-gray-600 font-medium mb-6 leading-relaxed">{webinar.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        {webinar.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                        <Clock className="h-4 w-4 text-purple-600" />
                        {webinar.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                        <Video className="h-4 w-4 text-pink-600" />
                        {webinar.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                        <Users className="h-4 w-4 text-emerald-600" />
                        {webinar.attendees}
                      </div>
                    </div>

                    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-${webinar.color}-200 mb-6`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-10 w-10 rounded-full bg-gradient-to-br from-${webinar.color}-600 to-${webinar.color}-700 flex items-center justify-center flex-shrink-0`}>
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-black text-gray-900">{webinar.speaker}</div>
                          <div className="text-xs text-gray-600 font-semibold">{webinar.role}</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {webinar.topics.map((topic, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <CheckCircle className={`h-3 w-3 text-${webinar.color}-600 flex-shrink-0`} />
                            <span className="text-xs text-gray-700 font-semibold">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className={`w-full py-4 bg-gradient-to-r from-${webinar.color}-600 to-${webinar.color}-700 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2`}>
                      Register Now - Free
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* All Upcoming */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black text-gray-900 mb-8">More Upcoming Webinars</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {upcomingWebinars.filter(w => !w.featured).map((webinar, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-${webinar.color}-500 to-${webinar.color}-600 flex items-center justify-center flex-shrink-0`}>
                        <webinar.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-gray-900 mb-2">{webinar.title}</h3>
                        <p className="text-sm text-gray-600 font-medium">{webinar.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600 font-semibold mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {webinar.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {webinar.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {webinar.attendees}
                      </div>
                    </div>

                    <button className={`w-full py-3 bg-${webinar.color}-50 text-${webinar.color}-600 font-bold rounded-xl hover:bg-${webinar.color}-100 transition-all`}>
                      Register Free
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Recorded Webinars */}
      {activeTab === 'recorded' && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black text-gray-900 mb-12">On-Demand Webinar Library</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recordedWebinars.map((webinar, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all group overflow-hidden"
                >
                  <div className={`bg-gradient-to-br from-${webinar.color}-100 to-${webinar.color}-200 h-40 flex items-center justify-center relative`}>
                    <webinar.icon className={`h-16 w-16 text-${webinar.color}-600`} />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-sm font-bold text-amber-600">
                        <Star className="h-4 w-4 fill-amber-600" />
                        {webinar.rating}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">{webinar.views} views</div>
                    </div>

                    <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {webinar.title}
                    </h3>

                    <p className="text-sm text-gray-600 font-medium mb-4 leading-relaxed line-clamp-2">
                      {webinar.description}
                    </p>

                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                      <div className={`h-8 w-8 rounded-full bg-gradient-to-br from-${webinar.color}-600 to-${webinar.color}-700 flex items-center justify-center flex-shrink-0`}>
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 text-xs truncate">{webinar.speaker}</div>
                        <div className="text-xs text-gray-600 font-semibold truncate">{webinar.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600 font-semibold mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {webinar.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {webinar.date}
                      </div>
                    </div>

                    <button className="w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-all flex items-center justify-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Webinar Series */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Webinar Series</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Subscribe to our ongoing webinar series for continuous learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {webinarSeries.map((series, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border-2 border-purple-200 hover:shadow-xl transition-all text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <series.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-3">{series.title}</h3>
                <p className="text-gray-600 font-medium mb-6 leading-relaxed">{series.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="text-sm text-gray-700 font-semibold">
                    {series.episodes} episodes per year
                  </div>
                  <div className="text-sm text-purple-600 font-bold">{series.frequency}</div>
                </div>

                <button className="w-full py-3 bg-purple-50 text-purple-600 font-bold rounded-xl hover:bg-purple-100 transition-all">
                  Subscribe to Series
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Never Miss a Webinar</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Subscribe to our webinar calendar and get reminders for upcoming sessions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Subscribe to Calendar
              <Calendar className="h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Download Webinar Guide
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
            Educating healthcare professionals worldwide
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

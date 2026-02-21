'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Heart,
  Code,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar,
  DollarSign,
  Laptop,
  Coffee,
  Lightbulb,
  Target,
  Star,
  Rocket,
  Shield,
  Brain,
  Building2,
} from 'lucide-react';

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      icon: Code,
    },
    {
      title: 'Product Manager - Clinical Workflows',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      icon: Target,
    },
    {
      title: 'Clinical Solutions Architect',
      department: 'Customer Success',
      location: 'Remote (US)',
      type: 'Full-time',
      icon: Heart,
    },
    {
      title: 'Machine Learning Engineer - Healthcare AI',
      department: 'AI/ML',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      icon: Brain,
    },
    {
      title: 'Healthcare Implementation Specialist',
      department: 'Customer Success',
      location: 'Istanbul, Turkey',
      type: 'Full-time',
      icon: Users,
    },
    {
      title: 'Security Engineer',
      department: 'Security',
      location: 'Remote',
      type: 'Full-time',
      icon: Shield,
    },
    {
      title: 'Sales Executive - Enterprise Healthcare',
      department: 'Sales',
      location: 'Multiple Locations',
      type: 'Full-time',
      icon: TrendingUp,
    },
    {
      title: 'UI/UX Designer - Healthcare',
      department: 'Design',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      icon: Lightbulb,
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive medical, dental, vision. Mental health support. Fitness stipend.',
    },
    {
      icon: DollarSign,
      title: 'Competitive Pay',
      description: 'Top of market salary. Equity for all employees. Annual bonuses.',
    },
    {
      icon: Calendar,
      title: 'Time Off',
      description: 'Unlimited PTO policy. Paid parental leave. Company-wide shutdowns.',
    },
    {
      icon: Laptop,
      title: 'Remote Flexibility',
      description: 'Work from anywhere. Home office stipend. Co-working space allowance.',
    },
    {
      icon: Rocket,
      title: 'Career Growth',
      description: 'Learning & development budget. Conference attendance. Mentorship programs.',
    },
    {
      icon: Coffee,
      title: 'Great Culture',
      description: 'Team events. Catered meals. Collaborative environment.',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Every line of code we write impacts patient care. Our work saves lives.',
    },
    {
      icon: Zap,
      title: 'Move Fast',
      description: 'Ship early, iterate quickly. We value speed and learning from feedback.',
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Cross-functional teams. Open communication. No silos or politics.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Challenge the status quo. Bring new ideas. Take calculated risks.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-8">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Join Our Mission to Transform Healthcare</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Build the Future of
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Healthcare
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-4xl mx-auto mb-12">
            Join a team of talented engineers, designers, and healthcare professionals building software
            that doctors love and patients depend on. Work that matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#openings"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              View Open Positions
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/about"
              className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Learn About Us
              <Users className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">350+</div>
              <div className="text-gray-600 font-semibold">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 mb-2">25+</div>
              <div className="text-gray-600 font-semibold">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-pink-600 mb-2">$150M</div>
              <div className="text-gray-600 font-semibold">Series B Funding</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-indigo-600 mb-2">4.8/5</div>
              <div className="text-gray-600 font-semibold">Glassdoor Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Why Median?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Work on meaningful problems with talented people
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-xl transition-all text-center"
              >
                <div className="h-16 w-16 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              We take care of our team so they can focus on taking care of patients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-3xl p-12 border-4 border-blue-200 text-center">
            <Star className="h-16 w-16 text-yellow-400 fill-current mx-auto mb-6" />
            <h3 className="text-3xl font-black text-gray-900 mb-4">And Much More...</h3>
            <p className="text-lg text-gray-700 font-medium max-w-3xl mx-auto">
              401(k) matching, professional development budget, latest tech equipment, stock options,
              relocation assistance, visa sponsorship, and more. We invest in our people.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Find your next role at Median
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {openPositions.map((position, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <position.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-sm rounded-lg">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 font-bold text-sm rounded-lg">
                        {position.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      {position.location}
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 font-semibold mb-6">
              Don't see the right role? We're always looking for talented people.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-xl transition-all"
            >
              Send Us Your Resume
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Where We Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Offices in two countries, remote opportunities worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-6 mb-6">
                <div className="h-20 w-20 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-4xl">
                  🇺🇸
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">San Francisco</h3>
                  <p className="text-blue-600 font-bold text-lg">United States Headquarters</p>
                </div>
              </div>
              <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                Our main office in the heart of Silicon Valley. State-of-the-art workspace with views
                of the Bay. Walking distance to Caltrain and BART.
              </p>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-900 font-bold">100 California Street, Suite 500</p>
                  <p className="text-gray-700 font-medium">San Francisco, CA 94111</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-6 mb-6">
                <div className="h-20 w-20 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 text-4xl">
                  🇹🇷
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">Istanbul</h3>
                  <p className="text-red-600 font-bold text-lg">Turkey Office</p>
                </div>
              </div>
              <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                Modern office in Levent business district. Close to metro and major highways. Growing
                team serving Turkish healthcare market.
              </p>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-900 font-bold">Levent Mahallesi, Büyükdere Caddesi No: 201</p>
                  <p className="text-gray-700 font-medium">Şişli, Istanbul 34394</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-2xl p-8 border-2 border-gray-200 text-center">
            <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-gray-900 mb-3">Remote-First Culture</h3>
            <p className="text-lg text-gray-700 font-medium max-w-3xl mx-auto">
              Many of our positions are available remotely. We have team members across the US, Europe,
              and beyond. Work from wherever you're most productive.
            </p>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Our Hiring Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Transparent and respectful of your time
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center">
                1
              </div>
              <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-black text-gray-900 mb-2">Application Review</h3>
                <p className="text-gray-700 font-medium">
                  Submit your resume and cover letter. We review all applications within 3-5 business days.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-600 text-white font-black text-xl flex items-center justify-center">
                2
              </div>
              <div className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-black text-gray-900 mb-2">Phone Screen (30 min)</h3>
                <p className="text-gray-700 font-medium">
                  Initial conversation with recruiter to discuss your background, the role, and Median.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-pink-600 text-white font-black text-xl flex items-center justify-center">
                3
              </div>
              <div className="flex-1 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
                <h3 className="text-xl font-black text-gray-900 mb-2">Technical/Role Interview (1-2 hrs)</h3>
                <p className="text-gray-700 font-medium">
                  For engineers: coding interview. For others: role-specific exercise or case study.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">
                4
              </div>
              <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-black text-gray-900 mb-2">Team Interviews (2-3 hrs)</h3>
                <p className="text-gray-700 font-medium">
                  Meet with future teammates and cross-functional partners. Focus on culture fit and collaboration.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-600 text-white font-black text-xl flex items-center justify-center">
                5
              </div>
              <div className="flex-1 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200">
                <h3 className="text-xl font-black text-gray-900 mb-2">Offer & Onboarding</h3>
                <p className="text-gray-700 font-medium">
                  Receive offer, negotiate if needed, and start your Median journey!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <p className="text-lg text-gray-700 font-medium">
              <strong className="text-gray-900">Timeline:</strong> Our goal is to complete the entire process
              within 2-3 weeks. We respect your time and provide timely feedback at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join us in transforming healthcare. Apply to one of our open positions today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#openings"
              className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              View Open Positions
              <Briefcase className="h-5 w-5" />
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
            >
              Get in Touch
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

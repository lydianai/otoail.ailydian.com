'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Heart,
  Users,
  Globe,
  Award,
  Target,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Briefcase,
  Star,
  Building2,
  Lightbulb,
  UserCheck,
  Rocket,
} from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former Chief Medical Information Officer at Stanford Health. 15+ years building healthcare technology.',
      icon: Users,
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google Health engineer. Led Epic integration teams at 3 major health systems.',
      icon: Zap,
    },
    {
      name: 'Dr. Emily Thompson',
      role: 'Chief Medical Officer',
      bio: 'Board-certified emergency physician. Former EM residency director with focus on healthcare IT.',
      icon: Heart,
    },
    {
      name: 'David Kim',
      role: 'VP of Engineering',
      bio: 'Previously led engineering at Athenahealth. MIT Computer Science, Stanford MBA.',
      icon: Rocket,
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-First',
      description: 'Every feature we build starts with the question: How does this improve patient care?',
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Healthcare data is sacred. We treat every patient record with the highest security standards.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Healthcare technology should evolve as fast as medicine does. We push boundaries daily.',
    },
    {
      icon: UserCheck,
      title: 'Partnership',
      description: 'We succeed when our customers succeed. Their feedback drives our product roadmap.',
    },
  ];

  const milestones = [
    { year: '2019', event: 'Median founded by healthcare and technology veterans' },
    { year: '2020', event: 'First 10 hospitals go live during COVID-19 pandemic' },
    { year: '2021', event: 'Expanded to Turkey, achieved KVKK compliance' },
    { year: '2022', event: 'Reached 200+ hospitals, FDA cleared AI algorithms' },
    { year: '2023', event: '500+ facilities, Series B funding, SOC 2 Type II certified' },
    { year: '2024', event: 'Launched enterprise platform, 1M+ patients managed daily' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-8">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Trusted by 500+ Healthcare Facilities</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            We're Building the Future of
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Healthcare Technology
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-4xl mx-auto mb-12">
            Median was founded by physicians and engineers who experienced firsthand the frustrations of
            outdated hospital systems. We're on a mission to build software that healthcare professionals
            actually love to use.
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-semibold">Hospitals & Clinics</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 mb-2">2M+</div>
              <div className="text-gray-600 font-semibold">Patients Managed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-pink-600 mb-2">350+</div>
              <div className="text-gray-600 font-semibold">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600 font-semibold">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 border-2 border-blue-200">
              <Target className="h-16 w-16 text-blue-600 mb-6" />
              <h2 className="text-4xl font-black text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-700 font-medium leading-relaxed">
                To empower healthcare providers with intuitive, intelligent technology that improves patient
                outcomes, reduces administrative burden, and makes healthcare more accessible and affordable
                for everyone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-12 border-2 border-purple-200">
              <Globe className="h-16 w-16 text-purple-600 mb-6" />
              <h2 className="text-4xl font-black text-gray-900 mb-6">Our Vision</h2>
              <p className="text-xl text-gray-700 font-medium leading-relaxed">
                A world where every hospital, regardless of size or location, has access to world-class
                healthcare technology. Where clinicians spend more time with patients and less time fighting
                with software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black text-gray-900 mb-12 text-center">Our Story</h2>

          <div className="bg-white rounded-3xl p-12 border-2 border-gray-200 shadow-xl">
            <p className="text-lg text-gray-700 font-medium leading-relaxed mb-6">
              Median was born in 2019 from a simple observation: healthcare providers deserve better software.
              Our founders, Dr. Sarah Chen and Michael Rodriguez, met while working on a digital health project
              at Stanford Hospital.
            </p>
            <p className="text-lg text-gray-700 font-medium leading-relaxed mb-6">
              Sarah, an emergency medicine physician and Chief Medical Information Officer, was frustrated by
              the clunky EHR systems that pulled her attention away from patients. Michael, a software engineer
              who had worked on healthcare integrations at Google, knew that better technology was possible.
            </p>
            <p className="text-lg text-gray-700 font-medium leading-relaxed mb-6">
              They started Median with a radical idea: what if hospital software was actually designed for
              the people who use it every day? What if it was fast, intuitive, and actually helped doctors
              provide better care?
            </p>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              Five years later, Median serves 500+ hospitals across the United States and Turkey. We've
              processed over 50 million patient encounters, and our AI clinical decision support has helped
              identify over 10,000 cases of sepsis early. But we're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              World-class team with deep expertise in healthcare and technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
                <div className="flex items-start gap-6">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <member.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-1">{member.name}</h3>
                    <div className="text-blue-600 font-bold mb-3">{member.role}</div>
                    <p className="text-gray-700 font-medium leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all text-center">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Key milestones in the Median story
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24">
                  <div className="text-2xl font-black text-blue-600">{milestone.year}</div>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                    <p className="text-lg text-gray-900 font-bold">{milestone.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Global Presence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Serving hospitals around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-3xl">
                  🇺🇸
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">United States HQ</h3>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 font-medium">
                      100 California Street, Suite 500<br />
                      San Francisco, CA 94111
                    </p>
                  </div>
                  <p className="text-gray-600 font-semibold">Contact: sales@lydianmedi.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 text-3xl">
                  🇹🇷
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Turkey Office</h3>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 font-medium">
                      Levent Mahallesi, Büyükdere Caddesi No: 201<br />
                      Şişli, Istanbul 34394
                    </p>
                  </div>
                  <p className="text-gray-600 font-semibold">Contact: tr-satis@lydianmedi.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Whether you're a healthcare provider looking for better software or a talented professional
            wanting to make an impact in healthcare, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/careers"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
            >
              View Open Positions
              <Briefcase className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Heart,
  Zap,
  Shield,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Award,
  CheckCircle,
  X,
  ArrowRight,
  Calendar,
  Star,
  Globe,
  Brain,
  Smartphone,
  Cloud,
  Target,
  ThumbsUp,
} from 'lucide-react';

export default function WhyMedianPage() {
  const competitors = [
    { name: 'Legacy EHR Systems', color: 'gray' },
    { name: 'Epic', color: 'red' },
    { name: 'traditional systems', color: 'blue' },
  ];

  const comparisons = [
    {
      feature: 'Implementation Time',
      vitalcare: '2-6 weeks',
      others: '6-18 months',
      winner: true,
    },
    {
      feature: 'User Training Required',
      vitalcare: '2-4 hours',
      others: '40-80 hours',
      winner: true,
    },
    {
      feature: 'Setup Cost',
      vitalcare: '$0',
      others: '$50K - $500K',
      winner: true,
    },
    {
      feature: 'Monthly Cost (100 beds)',
      vitalcare: '$699 - $1,499',
      others: '$3,000 - $15,000',
      winner: true,
    },
    {
      feature: 'Customer Satisfaction',
      vitalcare: '4.9/5.0',
      others: '3.2/5.0',
      winner: true,
    },
    {
      feature: 'Support Response Time',
      vitalcare: '< 15 minutes',
      others: '2-24 hours',
      winner: true,
    },
    {
      feature: 'Mobile App',
      vitalcare: 'Native iOS & Android',
      others: 'Limited or web-only',
      winner: true,
    },
    {
      feature: 'AI Clinical Support',
      vitalcare: 'FDA-cleared, built-in',
      others: 'Optional add-on',
      winner: true,
    },
  ];

  const reasons = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second response times. No lag, no waiting. Median is built on modern cloud architecture that scales automatically.',
      color: 'yellow',
    },
    {
      icon: Heart,
      title: 'Loved by Clinicians',
      description: 'Designed by doctors for doctors. Intuitive workflows that reduce clicks and cognitive load, letting physicians focus on patients.',
      color: 'red',
    },
    {
      icon: DollarSign,
      title: '70% Cost Savings',
      description: 'No hidden fees, no surprise costs. Transparent pricing that saves hospitals an average of $1.8M annually vs legacy systems.',
      color: 'green',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 Type II, HIPAA, HITRUST certified. Military-grade encryption. Your data is protected by the same security as Fortune 500 banks.',
      color: 'blue',
    },
    {
      icon: Clock,
      title: 'Quick Implementation',
      description: 'Go live in weeks, not months. Our streamlined onboarding process and expert implementation team get you up and running fast.',
      color: 'purple',
    },
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'FDA-cleared AI for sepsis detection, readmission prediction, and clinical decision support. Improve outcomes with machine learning.',
      color: 'indigo',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Full-featured native apps for iOS and Android. Access patient charts, place orders, and review results from anywhere.',
      color: 'pink',
    },
    {
      icon: Globe,
      title: 'Global Support',
      description: '24/7/365 support in multiple languages. Average response time under 15 minutes. We are here when you need us.',
      color: 'cyan',
    },
  ];

  const testimonials = [
    {
      quote: "We switched from traditional systems to Median and immediately saw a 40% reduction in documentation time. Our physicians actually enjoy using the software now.",
      author: "Dr. Michael Chen",
      role: "Chief Medical Officer",
      hospital: "Regional Medical Center, Seattle",
      rating: 5,
    },
    {
      quote: "Median saved our small hospital $200K in the first year alone. The implementation took 3 weeks vs the 9 months quoted by modern healthcare. Best decision we ever made.",
      author: "Jennifer Martinez",
      role: "Hospital Administrator",
      hospital: "Community Hospital, Austin",
      rating: 5,
    },
    {
      quote: "As a 500-bed academic medical center, we needed enterprise features at a reasonable cost. Median delivered on both. Their AI sepsis detection has saved lives.",
      author: "Dr. Robert Williams",
      role: "CIO",
      hospital: "University Medical Center, Boston",
      rating: 5,
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
            <span className="text-sm font-bold text-gray-900">Rated #1 by Healthcare IT Professionals</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Why Choose
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Median?
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-4xl mx-auto mb-12">
            Modern hospitals deserve modern software. Here's why 500+ healthcare facilities chose Median
            over legacy EHR systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Schedule Demo
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8 Key Reasons */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">8 Reasons to Choose Median</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              What makes Median different from other hospital management systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-${reason.color}-50 to-${reason.color}-100 rounded-2xl p-8 border-2 border-${reason.color}-200 hover:shadow-xl transition-all`}
              >
                <div className={`h-14 w-14 rounded-xl bg-${reason.color}-600 flex items-center justify-center mb-4`}>
                  <reason.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Median vs Legacy Systems</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              See how we stack up against traditional EHR vendors
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-200">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="font-black text-white text-lg">Feature</div>
              <div className="font-black text-white text-lg text-center">Median</div>
              <div className="font-black text-white text-lg text-center">Legacy Systems</div>
            </div>

            {/* Rows */}
            {comparisons.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-4 p-6 ${
                  i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="font-bold text-gray-900">{row.feature}</div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="font-bold text-green-600">{row.vitalcare}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <X className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className="font-medium text-gray-600">{row.others}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-gray-900 mb-6">Calculate Your Savings</h2>
          <p className="text-xl text-gray-600 mb-12 font-medium">
            See how much you could save by switching to Median
          </p>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-12 border-4 border-green-200">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <div className="text-4xl font-black text-gray-900 mb-2">$1.8M</div>
                <div className="text-gray-700 font-bold">Average Annual Savings</div>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <div className="text-4xl font-black text-gray-900 mb-2">40%</div>
                <div className="text-gray-700 font-bold">Less Documentation Time</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <div className="text-4xl font-black text-gray-900 mb-2">25%</div>
                <div className="text-gray-700 font-bold">Revenue Increase</div>
              </div>
            </div>

            <p className="text-gray-700 font-medium mb-6">
              Based on average results from 200-bed hospitals switching from legacy EHR systems
            </p>

            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 hover:shadow-xl transition-all"
            >
              Get Custom ROI Analysis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Real feedback from hospitals that made the switch
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 font-medium mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 font-semibold">{testimonial.role}</div>
                    <div className="text-sm text-gray-500 font-medium">{testimonial.hospital}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Built for Modern Healthcare</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Features that set Median apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <Brain className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-3">AI That Actually Works</h3>
              <p className="text-gray-700 font-medium mb-4">
                Our FDA-cleared AI has detected over 10,000 cases of sepsis early, with 96% accuracy.
                Real clinical decision support that saves lives, not just marketing buzzwords.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Sepsis early detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Readmission risk prediction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Drug interaction alerts</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <Smartphone className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-3">True Mobile Experience</h3>
              <p className="text-gray-700 font-medium mb-4">
                Not a clunky web wrapper. Native iOS and Android apps built from the ground up for mobile.
                Access full patient charts, place orders, and review results from anywhere.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Native iOS & Android apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Offline mode support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Biometric authentication</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <Cloud className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-3">Cloud-Native Architecture</h3>
              <p className="text-gray-700 font-medium mb-4">
                Built on modern cloud infrastructure from day one. Automatic scaling, instant updates,
                and 99.99% uptime. No servers to maintain, no downtime for upgrades.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Auto-scaling infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Zero-downtime updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Disaster recovery built-in</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200">
              <ThumbsUp className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-3">Actually Easy to Use</h3>
              <p className="text-gray-700 font-medium mb-4">
                Designed by doctors who were frustrated with legacy EHRs. Intuitive workflows that reduce
                clicks, minimize cognitive load, and let clinicians focus on patient care.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">2-4 hours training (not weeks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Smart shortcuts & templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Voice dictation built-in</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Make the Switch?
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join 500+ hospitals that chose Median over legacy EHR systems. See the difference yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Free 30-Day Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
            >
              Schedule Live Demo
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

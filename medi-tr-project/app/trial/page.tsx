'use client';

import Header from '@/components/layout/Header';
import { CheckCircle, Shield, Clock, Zap, Mail, Phone, Building2, User, CreditCard, X } from 'lucide-react';
import { useState } from 'react';

export default function TrialPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    facilitySize: '',
    country: 'US',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trial signup:', formData);
    alert('Welcome to Median! Check your email for login credentials.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-bold text-gray-900">
              30-Day Free Trial - No Credit Card Required
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Start Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Free Trial</span>
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-8">
            Experience the full power of Median for 30 days. No commitments, no credit card, just pure innovation.
          </p>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-center">
              <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="font-black text-gray-900 text-sm">No Credit Card</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="font-black text-gray-900 text-sm">30 Days Free</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-center">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="font-black text-gray-900 text-sm">Instant Access</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 text-center">
              <X className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <div className="font-black text-gray-900 text-sm">Cancel Anytime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Create Your Free Account</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none font-semibold"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none font-semibold"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none font-semibold"
                      placeholder="john.doe@hospital.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none font-semibold"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Organization Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none font-semibold"
                      placeholder="City General Hospital"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Facility Size *
                  </label>
                  <select
                    required
                    value={formData.facilitySize}
                    onChange={(e) => setFormData({...formData, facilitySize: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none font-semibold"
                  >
                    <option value="">Select facility size</option>
                    <option value="1-25">1-25 beds (Small Clinic)</option>
                    <option value="26-50">26-50 beds (Medium Clinic)</option>
                    <option value="51-200">51-200 beds (Hospital)</option>
                    <option value="201-500">201-500 beds (Large Hospital)</option>
                    <option value="500+">500+ beds (Healthcare System)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none font-semibold"
                  >
                    <option value="US">United States 🇺🇸</option>
                    <option value="TR">Turkey 🇹🇷</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none font-semibold"
                    placeholder="Create a strong password"
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500 mt-1 font-semibold">
                    Minimum 8 characters
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-black text-lg hover:shadow-2xl transition-all"
                >
                  Start My Free Trial
                </button>

                <p className="text-sm text-gray-500 text-center font-semibold">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                  Trial automatically expires after 30 days - no charges.
                </p>
              </form>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">What's Included in Your Trial</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Full Platform Access</div>
                    <div className="text-sm text-gray-600 font-semibold">
                      Access all modules including EHR, Emergency, Lab, Pharmacy, and more
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Sample Data Included</div>
                    <div className="text-sm text-gray-600 font-semibold">
                      Pre-loaded sample patients and data to explore features immediately
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Onboarding Support</div>
                    <div className="text-sm text-gray-600 font-semibold">
                      Dedicated support team to help you get started
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Video Tutorials</div>
                    <div className="text-sm text-gray-600 font-semibold">
                      Comprehensive training videos for all modules
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Mobile Apps</div>
                    <div className="text-sm text-gray-600 font-semibold">
                      iOS and Android apps for physicians and patients
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Priority Support</div>
                    <div className="text-sm text-gray-600 font-semibold">
                      Email and chat support during business hours
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100 mb-8">
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Security & Compliance
                </h4>
                <ul className="space-y-2 text-sm font-semibold text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    HIPAA compliant environment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    SOC 2 Type II certified
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    99.9% uptime SLA
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
                <h4 className="font-black text-gray-900 mb-3">After Your Trial</h4>
                <p className="text-sm text-gray-700 font-semibold mb-4">
                  Your trial automatically expires after 30 days. No automatic charges.
                  If you love Median, simply choose a plan to continue.
                </p>
                <p className="text-sm text-gray-700 font-semibold">
                  Need more time? Contact us for a trial extension - we're happy to help!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            What Trial Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="h-5 w-5 text-blue-600" />
                ))}
              </div>
              <p className="text-gray-700 font-semibold mb-4">
                "Within the first week of our trial, we knew Median was the right choice.
                The interface is intuitive and the features are exactly what we needed."
              </p>
              <div className="font-black text-gray-900">Dr. Sarah Johnson</div>
              <div className="text-sm text-gray-600 font-semibold">Community Health Center, CA</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="h-5 w-5 text-purple-600" />
                ))}
              </div>
              <p className="text-gray-700 font-semibold mb-4">
                "The trial gave us confidence to switch from modern healthcare. Median's support team
                was incredibly helpful in getting us set up."
              </p>
              <div className="font-black text-gray-900">Michael Chen, CIO</div>
              <div className="text-sm text-gray-600 font-semibold">Regional Medical Center, TX</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="h-5 w-5 text-green-600" />
                ))}
              </div>
              <p className="text-gray-700 font-semibold mb-4">
                "No credit card required means no risk. We could fully explore the platform
                and make an informed decision. Highly recommend!"
              </p>
              <div className="font-black text-gray-900">Lisa Martinez, Admin</div>
              <div className="text-sm text-gray-600 font-semibold">City Clinic, FL</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

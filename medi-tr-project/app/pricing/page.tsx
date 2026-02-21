'use client';

import Header from '@/components/layout/Header';
import { CheckCircle, ArrowRight, Star, Shield, Clock, Headphones } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Simple, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transparent Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-12">
            Choose the perfect plan for your healthcare facility. No hidden fees, all features included.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`font-bold ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all"
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${billingCycle === 'annual' ? 'translate-x-9' : 'translate-x-1'}`} />
            </button>
            <span className={`font-bold ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-400'}`}>
              Annual <span className="text-green-600 text-sm">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:shadow-2xl transition-all">
              <div className="mb-6">
                <div className="text-sm font-bold text-blue-600 mb-2">SMALL CLINICS</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Basic</h3>
                <div className="flex items-baseline justify-center py-4">
                  <span className="text-5xl font-black text-gray-900">
                    ${billingCycle === 'monthly' ? '499' : '399'}
                  </span>
                  <span className="text-xl text-gray-600 font-semibold ml-2">/month</span>
                </div>
                <p className="text-sm text-center text-gray-500 font-semibold">
                  {billingCycle === 'annual' ? 'Billed annually ($4,788/year)' : 'Billed monthly'}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Up to 25 users</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">3,000 active patients</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Patient Management (EHR)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Appointment Scheduling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Basic Billing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Mobile App Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Email Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">99.5% Uptime SLA</span>
                </li>
              </ul>

              <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                Start Free Trial
              </button>
            </div>

            {/* Professional Plan - Recommended */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 border-2 border-blue-600 transform scale-105 hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-white">MEDIUM HOSPITALS</div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold text-white">
                  RECOMMENDED
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Professional</h3>
              <div className="flex items-baseline justify-center py-4">
                <span className="text-5xl font-black text-white">
                  ${billingCycle === 'monthly' ? '1,499' : '1,199'}
                </span>
                <span className="text-xl text-white/90 font-semibold ml-2">/month</span>
              </div>
              <p className="text-sm text-center text-white/80 font-semibold mb-2">
                {billingCycle === 'annual' ? 'Billed annually ($14,388/year)' : 'Billed monthly'}
              </p>

              <ul className="space-y-4 mb-8 mt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Up to 100 users</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">15,000 active patients</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Everything in Basic</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Emergency Department</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Inpatient Care</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Laboratory (LIMS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Pharmacy Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Telehealth</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Priority Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">99.9% Uptime SLA</span>
                </li>
              </ul>

              <button className="w-full py-3 px-6 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:shadow-2xl transition-all">
              <div className="mb-6">
                <div className="text-sm font-bold text-purple-600 mb-2">LARGE HOSPITALS</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Enterprise</h3>
                <div className="flex items-baseline justify-center py-4">
                  <span className="text-5xl font-black text-gray-900">
                    Custom
                  </span>
                </div>
                <p className="text-sm text-center text-gray-500 font-semibold">
                  Tailored pricing for large healthcare systems
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Unlimited users</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Unlimited patients</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Everything in Professional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Radiology (PACS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Operating Room Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">AI Clinical Decision Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">White Labeling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Dedicated Account Manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">24/7 Phone Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">99.99% Uptime SLA</span>
                </li>
              </ul>

              <button className="w-full py-3 px-6 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            Why Healthcare Facilities Choose Median
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600 font-semibold">
                Full HIPAA compliance with SOC 2 Type II certification and annual audits
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Quick Setup</h3>
              <p className="text-gray-600 font-semibold">
                Get started in 1-2 weeks vs 6-12 months with traditional systems
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 font-semibold">
                Round-the-clock support from healthcare IT specialists
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Do you offer a free trial?
              </h3>
              <p className="text-gray-600 font-semibold">
                Yes! We offer a 30-day free trial with full access to all features. No credit card required.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600 font-semibold">
                Absolutely. You can upgrade or downgrade your plan at any time with no penalties.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 font-semibold">
                We accept all major credit cards, ACH transfers, and wire transfers for annual plans.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-gray-600 font-semibold">
                No setup fees for Basic and Professional plans. Enterprise plans include complimentary white-glove onboarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            Start your 30-day free trial today. No credit card required.
          </p>
          <button className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3">
            Start Free Trial
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

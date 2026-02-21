'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Building2,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Globe,
  Headphones,
  Heart,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    beds: '',
    country: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        beds: '',
        country: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Get in
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto">
            Our team is here to help. Whether you have questions about Median, need a demo, or want
            to discuss your hospital's specific needs, we're ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-700 font-medium mb-3">24/7 Available</p>
              <div className="space-y-1">
                <p className="text-blue-600 font-bold">US: +1 (800) 555-0123</p>
                <p className="text-red-600 font-bold">TR: +90 (212) 555-0123</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 text-center">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-700 font-medium mb-3">Response within 2 hours</p>
              <div className="space-y-1">
                <p className="text-purple-600 font-bold">sales@lydianmedi.com</p>
                <p className="text-purple-600 font-bold">support@lydianmedi.com</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200 text-center">
              <MessageCircle className="h-12 w-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-700 font-medium mb-3">Instant answers</p>
              <button className="px-6 py-2 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors">
                Start Chat
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 text-center">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Schedule Demo</h3>
              <p className="text-gray-700 font-medium mb-3">Live product tour</p>
              <Link
                href="/demo"
                className="inline-block px-6 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 font-medium mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {submitted && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <p className="text-green-800 font-bold">Thank you! We'll be in touch soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="john.smith@hospital.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Hospital/Clinic Name *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="General Hospital"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Your Role *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-medium"
                    >
                      <option value="">Select role...</option>
                      <option value="physician">Physician</option>
                      <option value="cio">CIO / IT Director</option>
                      <option value="cfo">CFO / Finance Director</option>
                      <option value="ceo">CEO / Administrator</option>
                      <option value="nurse">Nurse / Clinical Staff</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Number of Beds</label>
                    <select
                      name="beds"
                      value={formData.beds}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-medium"
                    >
                      <option value="">Select size...</option>
                      <option value="1-50">1-50 beds (Small Clinic)</option>
                      <option value="50-100">50-100 beds</option>
                      <option value="100-200">100-200 beds (Medium Hospital)</option>
                      <option value="200-500">200-500 beds (Large Hospital)</option>
                      <option value="500+">500+ beds (Health System)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-medium"
                  >
                    <option value="">Select country...</option>
                    <option value="US">🇺🇸 United States</option>
                    <option value="TR">🇹🇷 Turkey</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none font-medium"
                    placeholder="Tell us about your hospital's needs and how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Our Offices</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-16 w-16 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 text-3xl">
                      🇺🇸
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-1">United States HQ</h3>
                      <p className="text-blue-600 font-bold">San Francisco, California</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Address</p>
                        <p className="text-gray-700 font-medium">
                          100 California Street, Suite 500<br />
                          San Francisco, CA 94111
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Phone</p>
                        <p className="text-gray-700 font-medium">+1 (800) 555-0123</p>
                        <p className="text-gray-600 text-sm">Toll-free for US & Canada</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Email</p>
                        <p className="text-gray-700 font-medium">sales@lydianmedi.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Business Hours</p>
                        <p className="text-gray-700 font-medium">Mon-Fri: 8:00 AM - 6:00 PM PST</p>
                        <p className="text-gray-600 text-sm">Support available 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-16 w-16 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0 text-3xl">
                      🇹🇷
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-1">Turkey Office</h3>
                      <p className="text-red-600 font-bold">Istanbul</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Adres</p>
                        <p className="text-gray-700 font-medium">
                          Levent Mahallesi, Büyükdere Caddesi No: 201<br />
                          Şişli, Istanbul 34394
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Telefon</p>
                        <p className="text-gray-700 font-medium">+90 (212) 555-0123</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">E-posta</p>
                        <p className="text-gray-700 font-medium">median@ailydian.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Çalışma Saatleri</p>
                        <p className="text-gray-700 font-medium">Pzt-Cum: 09:00 - 18:00 GMT+3</p>
                        <p className="text-gray-600 text-sm">7/24 destek mevcut</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
                <Headphones className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-black text-gray-900 mb-3">24/7 Technical Support</h3>
                <p className="text-gray-700 font-medium mb-4">
                  Our support team is available around the clock to help with any technical issues
                  or questions about Median.
                </p>
                <p className="text-purple-600 font-bold">support@lydianmedi.com</p>
                <p className="text-purple-600 font-bold">Emergency: +1 (800) 555-9999</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Have a Quick Question?</h2>
          <p className="text-xl text-gray-600 mb-8 font-medium">
            Check out our frequently asked questions or schedule a personalized demo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Schedule Demo
              <Calendar className="h-5 w-5" />
            </Link>
            <Link
              href="/trial"
              className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

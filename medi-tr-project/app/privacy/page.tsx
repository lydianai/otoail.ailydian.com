'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Shield, Eye, Lock, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600 font-semibold">Last Updated: January 1, 2025</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-12">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-4">Your Privacy is Our Priority</h2>
            <p className="text-gray-700 font-semibold">
              Median is committed to protecting your privacy and personal health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information in compliance with HIPAA, KVKK, and GDPR regulations.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">1. Information We Collect</h2>
          <p className="text-gray-700 font-semibold mb-4">We collect information necessary to provide healthcare services and platform functionality:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Protected Health Information (PHI) including medical records, diagnoses, treatments, and prescriptions</li>
            <li>Personal identifiers (name, date of birth, address, phone, email)</li>
            <li>Insurance information and payment details</li>
            <li>Technical data (IP address, browser type, device information)</li>
            <li>Usage data (features accessed, time spent, interaction patterns)</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>Treatment:</strong> To provide, coordinate, and manage healthcare services</li>
            <li><strong>Payment:</strong> To process billing and insurance claims</li>
            <li><strong>Healthcare Operations:</strong> Quality improvement, training, and compliance activities</li>
            <li><strong>Platform Functionality:</strong> To provide, maintain, and improve our services</li>
            <li><strong>Communication:</strong> To send important notifications and updates</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">3. Data Sharing and Disclosure</h2>
          <p className="text-gray-700 font-semibold mb-4">We only share your information when necessary and permitted by law:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>With your healthcare providers for treatment purposes</li>
            <li>With your insurance company for payment processing</li>
            <li>With Business Associates under signed BAAs (HIPAA-compliant vendors)</li>
            <li>As required by law (court orders, regulatory requirements)</li>
            <li>In emergencies to protect health and safety</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">4. Your Privacy Rights</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-black text-gray-900 mb-3">Under HIPAA (US)</h3>
              <ul className="space-y-2 text-sm text-gray-700 font-semibold">
                <li>• Right to access your medical records</li>
                <li>• Right to request corrections</li>
                <li>• Right to accounting of disclosures</li>
                <li>• Right to request restrictions</li>
                <li>• Right to confidential communications</li>
              </ul>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-black text-gray-900 mb-3">Under KVKK (Turkey)</h3>
              <ul className="space-y-2 text-sm text-gray-700 font-semibold">
                <li>• Öğrenme hakkı (Right to learn)</li>
                <li>• Bilgi talep etme (Right to access)</li>
                <li>• Düzeltme hakkı (Right to rectification)</li>
                <li>• Silme hakkı (Right to erasure)</li>
                <li>• İtiraz hakkı (Right to object)</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">5. Data Security</h2>
          <p className="text-gray-700 font-semibold">
            We implement industry-leading security measures including AES-256 encryption, multi-factor authentication, regular security audits, and SOC 2 Type II compliance. For detailed information, see our <Link href="/security" className="text-blue-600 font-bold hover:underline">Security & Compliance page</Link>.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">6. Data Retention</h2>
          <p className="text-gray-700 font-semibold">
            We retain your information as required by law: 7 years for US HIPAA compliance, and as required by Turkish health regulations. You may request deletion after these periods, subject to legal obligations.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">7. International Data Transfers</h2>
          <p className="text-gray-700 font-semibold">
            US patient data is stored in US data centers. Turkish patient data is stored exclusively in Turkey. We comply with all applicable data localization requirements.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">8. Contact Us</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <p className="text-gray-700 font-semibold mb-4">For privacy-related questions or to exercise your rights:</p>
            <p className="text-gray-900 font-bold">Privacy Officer / Data Protection Officer</p>
            <p className="text-gray-700 font-semibold">Email: privacy@lydianmedi.com</p>
            <p className="text-gray-700 font-semibold">US Phone: +1 (800) 555-0123</p>
            <p className="text-gray-700 font-semibold">TR Phone: +90 (212) 555-0123</p>
          </div>

          <p className="text-sm text-gray-600 font-semibold mt-12 italic">
            This Privacy Policy is provided in accordance with HIPAA § 164.520, KVKK Article 10, and GDPR Articles 12-14.
          </p>
        </div>
      </section>
    </div>
  );
}

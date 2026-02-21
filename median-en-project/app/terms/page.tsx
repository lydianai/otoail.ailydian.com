'use client';

import Header from '@/components/layout/Header';
import { FileText, Shield, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 font-semibold">Last Updated: January 1, 2025</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-8 mb-12">
            <FileText className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 font-semibold">
              By accessing or using Median's hospital management platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">1. Service Description</h2>
          <p className="text-gray-700 font-semibold">
            Median provides a cloud-based hospital management system (HMS) including electronic health records (EHR), practice management, billing, and related healthcare IT services ("Services"). Our Services are designed for healthcare providers, facilities, and authorized personnel only.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">2. Account Registration and Access</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>You must be an authorized healthcare professional or facility representative to register</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must provide accurate and complete information during registration</li>
            <li>Each user must have a unique account (no credential sharing)</li>
            <li>You will notify us immediately of any unauthorized access</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">3. Acceptable Use Policy</h2>
          <p className="text-gray-700 font-semibold mb-4">You agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Violate any applicable laws or regulations</li>
            <li>Access or attempt to access accounts or data you're not authorized to view</li>
            <li>Interfere with or disrupt the Services or servers</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
            <li>Use the Services for any fraudulent or illegal purpose</li>
            <li>Share your credentials with unauthorized persons</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">4. HIPAA and KVKK Compliance</h2>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 my-6">
            <Shield className="h-10 w-10 text-blue-600 mb-3" />
            <p className="text-gray-700 font-semibold">
              Median is a HIPAA-compliant Business Associate and KVKK-compliant Data Processor. We will enter into a Business Associate Agreement (BAA) with covered entities. You agree to comply with all applicable privacy and security regulations when using our Services.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">5. Subscription and Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Subscription fees are billed monthly or annually as selected</li>
            <li>Prices are subject to change with 30 days' notice</li>
            <li>Refunds are provided per our refund policy</li>
            <li>Non-payment may result in service suspension</li>
            <li>You are responsible for all taxes applicable to your subscription</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">6. Data Ownership and Backup</h2>
          <p className="text-gray-700 font-semibold">
            You retain all rights to your patient data and medical records. Median claims no ownership over your data. We provide automated daily backups and will make your data available for export in standard formats upon request. You are responsible for maintaining your own backup copies.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">7. Service Level Agreement (SLA)</h2>
          <p className="text-gray-700 font-semibold mb-4">
            We guarantee 99.9% uptime for our Services, measured monthly. If we fail to meet this SLA, you may be eligible for service credits as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>99.0% - 99.9% uptime: 10% service credit</li>
            <li>95.0% - 99.0% uptime: 25% service credit</li>
            <li>Below 95.0% uptime: 50% service credit</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">8. Limitation of Liability</h2>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 my-6">
            <AlertCircle className="h-10 w-10 text-amber-600 mb-3" />
            <p className="text-gray-700 font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, VITALCARE'S LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE 12 MONTHS PRECEDING THE CLAIM. WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES. VITALCARE IS A TECHNOLOGY PLATFORM; CLINICAL DECISIONS REMAIN THE RESPONSIBILITY OF LICENSED HEALTHCARE PROFESSIONALS.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">9. Termination</h2>
          <p className="text-gray-700 font-semibold">
            Either party may terminate with 30 days' written notice. Upon termination, you will have 60 days to export your data. We may terminate immediately for material breach of these Terms. You remain responsible for fees accrued before termination.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">10. Governing Law and Dispute Resolution</h2>
          <p className="text-gray-700 font-semibold">
            For US customers: Governed by California law. Disputes resolved through binding arbitration in San Francisco, CA.<br/>
            For Turkish customers: Governed by Turkish law. Disputes resolved in Istanbul courts.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">11. Contact Information</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <p className="text-gray-900 font-bold mb-2">Median Healthcare Solutions</p>
            <p className="text-gray-700 font-semibold">Legal Department</p>
            <p className="text-gray-700 font-semibold">Email: legal@lydianmedi.com</p>
            <p className="text-gray-700 font-semibold">US: 100 California Street, Suite 500, San Francisco, CA 94111</p>
            <p className="text-gray-700 font-semibold">TR: Levent Mahallesi, Büyükdere Caddesi No: 201, Şişli, Istanbul 34394</p>
          </div>

          <p className="text-sm text-gray-600 font-semibold mt-12 italic">
            These Terms constitute the entire agreement between you and Median. Changes to these Terms will be posted on this page.
          </p>
        </div>
      </section>
    </div>
  );
}

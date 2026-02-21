'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Shield, Lock, CheckCircle, Award, FileText, Cloud, Eye, Server, Key, AlertTriangle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Security &<span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Compliance</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            Bank-level security with HIPAA, KVKK, and SOC 2 Type II compliance. Your patient data is protected by the most advanced security measures in healthcare technology.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <Shield className="h-16 w-16 text-blue-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">HIPAA Compliant</h3>
              <p className="text-gray-700 font-semibold mb-4">Full compliance with Health Insurance Portability and Accountability Act (HIPAA) 2025 Security Rule requirements.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />256-bit AES encryption</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />Multi-factor authentication (MFA)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />72-hour breach notification</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />Comprehensive audit trails</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />Annual risk assessments</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />Business Associate Agreements (BAA)</li>
              </ul>
              <Link href="/hipaa" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-bold hover:gap-3 transition-all">Learn More →</Link>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
              <Shield className="h-16 w-16 text-red-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">KVKK Compliant</h3>
              <p className="text-gray-700 font-semibold mb-4">Full compliance with Turkish Personal Data Protection Law (KVKK - Law No. 6698) and GDPR standards.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-red-600" />Data localization in Turkey</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-red-600" />72-hour breach notification to KVK Board</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-red-600" />Data processing inventory (VERBİS)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-red-600" />Consent management system</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-red-600" />Data subject rights portal</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-red-600" />Explicit consent mechanisms</li>
              </ul>
              <Link href="/kvkk" className="inline-flex items-center gap-2 mt-6 text-red-600 font-bold hover:gap-3 transition-all">Learn More →</Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <Award className="h-16 w-16 text-purple-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">SOC 2 Type II</h3>
              <p className="text-gray-700 font-semibold mb-4">Annual third-party security audits covering Security, Availability, Processing Integrity, Confidentiality, and Privacy.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Annual independent audits</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />99.99% uptime SLA</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Disaster recovery (RPO &lt;15min)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Business continuity planning</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Continuous SIEM monitoring</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Penetration testing</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <Lock className="h-16 w-16 text-green-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Encryption</h3>
              <p className="text-gray-700 font-semibold mb-4">Military-grade encryption protects your data at rest and in transit using industry-leading cryptographic standards.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />AES-256 encryption at rest</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />TLS 1.3 for data in transit</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Database-level encryption</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Encrypted backups</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Key management (AWS KMS/HSM)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />End-to-end encryption</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border-2 border-amber-200">
              <Key className="h-16 w-16 text-amber-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Access Control</h3>
              <p className="text-gray-700 font-semibold mb-4">Role-based access control (RBAC) with granular permissions ensures only authorized personnel access sensitive data.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Multi-factor authentication (MFA)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Single Sign-On (SSO/SAML)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Role-based access control</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Session management</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />IP whitelisting</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Audit logs for all access</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border-2 border-cyan-200">
              <Server className="h-16 w-16 text-cyan-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Infrastructure Security</h3>
              <p className="text-gray-700 font-semibold mb-4">Enterprise-grade infrastructure with redundancy, monitoring, and protection against modern cyber threats.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />US & Turkey data centers</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />DDoS protection (Cloudflare)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />Web Application Firewall (WAF)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />Intrusion detection/prevention</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />Daily automated backups</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />Geographic redundancy</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-black mb-6">Questions About Security?</h2>
          <p className="text-xl font-semibold mb-8 text-white/90">Our security team is here to answer all your questions and provide detailed compliance documentation.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-2xl font-black hover:shadow-2xl transition-all">Contact Security Team</Link>
        </div>
      </section>
    </div>
  );
}

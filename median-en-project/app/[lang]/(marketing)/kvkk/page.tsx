'use client';

import Header from '@/components/layout/Header';
import { Shield, Lock, Eye, FileText, AlertTriangle, CheckCircle, Database } from 'lucide-react';

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 text-center mb-6">KVKK Compliance</h1>
          <p className="text-xl text-gray-600 font-medium text-center max-w-3xl mx-auto">
            Median is fully compliant with the Turkish Personal Data Protection Law (KVKK - Law No. 6698) and GDPR standards. We protect personal health data with comprehensive technical and administrative measures required by Turkish law.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-10 border-2 border-red-200">
            <Shield className="h-16 w-16 text-red-600 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Data Localization (Article 9)</h2>
            <p className="text-gray-700 font-semibold mb-6">All personal health data of Turkish citizens is stored exclusively within Turkey's borders, in compliance with KVKK and Ministry of Health regulations:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Istanbul Data Center</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />ISO 27001 certified facility</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />24/7 physical security</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />Primary patient data storage</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ankara Backup Center</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />Redundant infrastructure</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />Daily encrypted backups</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />Disaster recovery site</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-10 border-2 border-purple-200">
            <FileText className="h-16 w-16 text-purple-600 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">VERBİS Registration (Article 16)</h2>
            <p className="text-gray-700 font-semibold mb-6">Median is registered with the Data Controllers Registry Information System (VERBİS) maintained by the Personal Data Protection Authority:</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-4xl font-black text-purple-600 mb-2">Registered</p>
                <p className="text-gray-900 font-bold">Data Controller</p>
                <p className="text-sm text-gray-700 font-semibold mt-2">Official VERBİS registration number on file</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-4xl font-black text-purple-600 mb-2">Updated</p>
                <p className="text-gray-900 font-bold">Processing Inventory</p>
                <p className="text-sm text-gray-700 font-semibold mt-2">Annual updates to data processing activities</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-4xl font-black text-purple-600 mb-2">Documented</p>
                <p className="text-gray-900 font-bold">Legal Basis</p>
                <p className="text-sm text-gray-700 font-semibold mt-2">Clear legal grounds for all data processing</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 border-2 border-blue-200">
            <Eye className="h-16 w-16 text-blue-600 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Data Subject Rights (Article 11)</h2>
            <p className="text-gray-700 font-semibold mb-6">Median provides a comprehensive portal for data subjects to exercise their rights under KVKK:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Right to Learn (Öğrenme Hakkı)</p>
                  <p className="text-sm text-gray-700 font-semibold">Patients can request information about whether their personal data is being processed</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Right to Access (Bilgi Talep Etme)</p>
                  <p className="text-sm text-gray-700 font-semibold">Full access to their personal health data within 30 days</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Right to Rectification (Düzeltme Hakkı)</p>
                  <p className="text-sm text-gray-700 font-semibold">Request correction of incomplete or inaccurate data</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Right to Erasure (Silme Hakkı)</p>
                  <p className="text-sm text-gray-700 font-semibold">Request deletion of data when legal grounds cease to exist</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Right to Object (İtiraz Hakkı)</p>
                  <p className="text-sm text-gray-700 font-semibold">Object to processing based on legitimate interests</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Right to Data Portability (Taşınabilirlik)</p>
                  <p className="text-sm text-gray-700 font-semibold">Receive data in structured, machine-readable format</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-10 border-2 border-green-200">
            <Lock className="h-16 w-16 text-green-600 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Explicit Consent (Article 5)</h2>
            <p className="text-gray-700 font-semibold mb-6">Health data is sensitive personal data under KVKK. Median obtains explicit consent for all health data processing:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Aydınlatma Metni (Privacy Notice)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Clear, plain Turkish language</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Data controller identity</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Purpose of data processing</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Data transfer information</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Data subject rights</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Açık Rıza (Explicit Consent)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Separate checkbox for health data</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Specific and informed consent</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Freely given (no pre-ticked boxes)</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Withdrawal mechanism available</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />Audit trail of all consents</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-10 border-2 border-amber-200">
            <AlertTriangle className="h-16 w-16 text-amber-600 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Data Breach Notification (Article 12)</h2>
            <p className="text-gray-700 font-semibold mb-6">Median maintains comprehensive breach notification procedures compliant with KVKK and KVK Board regulations:</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <p className="text-4xl font-black text-amber-600 mb-2">72 Hours</p>
                <p className="text-gray-900 font-bold">KVK Board Notification</p>
                <p className="text-sm text-gray-700 font-semibold mt-2">Breach notification to Personal Data Protection Authority within 72 hours</p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <p className="text-4xl font-black text-amber-600 mb-2">Immediate</p>
                <p className="text-gray-900 font-bold">Data Subject Notification</p>
                <p className="text-sm text-gray-700 font-semibold mt-2">Affected individuals notified without undue delay</p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <p className="text-4xl font-black text-amber-600 mb-2">24/7</p>
                <p className="text-gray-900 font-bold">Monitoring & Response</p>
                <p className="text-sm text-gray-700 font-semibold mt-2">Security operations center with incident response team</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-10 border-2 border-cyan-200">
            <Database className="h-16 w-16 text-cyan-600 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Technical & Administrative Measures (Article 12)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Measures</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />AES-256 encryption at rest and TLS 1.3 in transit</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Pseudonymization and data minimization</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Access control and authentication (MFA)</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Automated backup and disaster recovery</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Intrusion detection and prevention systems</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Administrative Measures</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Data Protection Officer (DPO) appointed</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Employee KVKK training programs</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Data processing agreements with vendors</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Regular risk assessments and audits</li>
                  <li className="flex items-start gap-2 text-gray-700 font-semibold"><CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />Documented policies and procedures</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

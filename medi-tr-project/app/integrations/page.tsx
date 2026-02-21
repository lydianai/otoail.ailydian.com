'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Globe, CheckCircle, Heart, Database, Zap, Cloud, FileText, Building, Activity } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Integrations &<span className="block mt-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">APIs</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            Seamless interoperability with major EHR systems, health information exchanges, and government health networks. Connect with legacy systems, e-Nabız, and more.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <Database className="h-16 w-16 text-blue-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">HL7 FHIR R5</h3>
              <p className="text-gray-700 font-semibold mb-4">Latest Fast Healthcare Interoperability Resources (FHIR) standard for complete EHR data exchange and interoperability.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />FHIR R5 certified</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />CMS interoperability compliance</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />SMART on FHIR apps</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />RESTful API endpoints</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />OAuth 2.0 security</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-blue-600" />Patient/Provider/Observation resources</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <Heart className="h-16 w-16 text-green-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">e-Nabız Integration</h3>
              <p className="text-gray-700 font-semibold mb-4">Direct integration with Turkey's Ministry of Health Personal Health System (e-Nabız) for automatic data exchange.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Real-time data sync</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Patient records upload</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Prescription reporting</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Lab results transmission</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Imaging reports sync</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-green-600" />Ministry of Health compliance</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <FileText className="h-16 w-16 text-purple-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Medula & SGK</h3>
              <p className="text-gray-700 font-semibold mb-4">Full integration with Turkish Social Security Institution (SGK) Medula system for automated billing and reimbursement.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Automatic provizyon (authorization)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Invoice submission (XML)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />SUT pricing integration</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Claims tracking</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />Payment reconciliation</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-purple-600" />SGK reporting module</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border-2 border-amber-200">
              <Building className="h-16 w-16 text-amber-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">legacy systems</h3>
              <p className="text-gray-700 font-semibold mb-4">Bidirectional integration with modern healthcare (EpicCare, MyChart) and traditional systems Millennium for hospital systems.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Epic Integration Engine</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />traditional systems Millennium ADT/ORM</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />HL7 v2.x messaging</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Patient demographics sync</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Orders & results exchange</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-amber-600" />Medication reconciliation</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border-2 border-cyan-200">
              <Activity className="h-16 w-16 text-cyan-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Lab & Imaging Systems</h3>
              <p className="text-gray-700 font-semibold mb-4">Integration with laboratory analyzers, PACS systems, and diagnostic imaging equipment via HL7/DICOM protocols.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />DICOM integration (radiology)</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />LIS bidirectional interface</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />Lab analyzer connectivity</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />Automated result importing</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />Critical value alerts</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-cyan-600" />Image viewing integration</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200">
              <Cloud className="h-16 w-16 text-pink-600 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">RESTful APIs</h3>
              <p className="text-gray-700 font-semibold mb-4">Comprehensive REST API for custom integrations, third-party apps, and workflow automation.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-pink-600" />OpenAPI 3.0 specification</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-pink-600" />OAuth 2.0 / JWT authentication</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-pink-600" />Webhooks for real-time events</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-pink-600" />Rate limiting & throttling</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-pink-600" />Developer documentation</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle className="h-4 w-4 text-pink-600" />Sandbox environment</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-black mb-6">Need Custom Integration?</h2>
          <p className="text-xl font-semibold mb-8 text-white/90">Our integration team can build custom connectors for your existing systems.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-green-600 rounded-2xl font-black hover:shadow-2xl transition-all">Contact Integration Team</Link>
        </div>
      </section>
    </div>
  );
}

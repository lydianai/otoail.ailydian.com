'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import {
  Code,
  Terminal,
  Key,
  Zap,
  Shield,
  Globe,
  Database,
  CheckCircle,
  Copy,
  ExternalLink,
  ArrowRight,
  Heart,
  Lock,
  Activity,
  Users,
  Calendar,
  FileText,
  Pill,
  TestTube,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

export default function APIDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('patients');

  const apiEndpoints = [
    {
      category: 'Patient Management',
      icon: Users,
      color: 'blue',
      endpoints: [
        { method: 'GET', path: '/api/v1/patients', description: 'List all patients' },
        { method: 'POST', path: '/api/v1/patients', description: 'Create new patient' },
        { method: 'GET', path: '/api/v1/patients/:id', description: 'Get patient by ID' },
        { method: 'PUT', path: '/api/v1/patients/:id', description: 'Update patient' },
        { method: 'DELETE', path: '/api/v1/patients/:id', description: 'Delete patient' },
      ],
    },
    {
      category: 'Appointments',
      icon: Calendar,
      color: 'purple',
      endpoints: [
        { method: 'GET', path: '/api/v1/appointments', description: 'List appointments' },
        { method: 'POST', path: '/api/v1/appointments', description: 'Schedule appointment' },
        { method: 'PUT', path: '/api/v1/appointments/:id', description: 'Update appointment' },
        { method: 'DELETE', path: '/api/v1/appointments/:id', description: 'Cancel appointment' },
      ],
    },
    {
      category: 'Laboratory',
      icon: TestTube,
      color: 'cyan',
      endpoints: [
        { method: 'GET', path: '/api/v1/lab/orders', description: 'List lab orders' },
        { method: 'POST', path: '/api/v1/lab/orders', description: 'Create lab order' },
        { method: 'GET', path: '/api/v1/lab/results/:id', description: 'Get lab results' },
        { method: 'POST', path: '/api/v1/lab/results', description: 'Submit lab results' },
      ],
    },
    {
      category: 'Pharmacy',
      icon: Pill,
      color: 'pink',
      endpoints: [
        { method: 'GET', path: '/api/v1/prescriptions', description: 'List prescriptions' },
        { method: 'POST', path: '/api/v1/prescriptions', description: 'Create prescription' },
        { method: 'GET', path: '/api/v1/medications', description: 'Search medications' },
        { method: 'POST', path: '/api/v1/prescriptions/:id/fill', description: 'Fill prescription' },
      ],
    },
    {
      category: 'Billing',
      icon: DollarSign,
      color: 'emerald',
      endpoints: [
        { method: 'GET', path: '/api/v1/invoices', description: 'List invoices' },
        { method: 'POST', path: '/api/v1/invoices', description: 'Create invoice' },
        { method: 'POST', path: '/api/v1/payments', description: 'Process payment' },
        { method: 'GET', path: '/api/v1/claims', description: 'List insurance claims' },
      ],
    },
  ];

  const features = [
    {
      title: 'RESTful Architecture',
      description: 'Clean, predictable REST API following industry best practices',
      icon: Globe,
      color: 'blue',
    },
    {
      title: 'OAuth 2.0 Authentication',
      description: 'Secure authentication with industry-standard OAuth 2.0 protocol',
      icon: Lock,
      color: 'purple',
    },
    {
      title: 'Rate Limiting',
      description: '10,000 requests per hour with automatic throttling',
      icon: Activity,
      color: 'emerald',
    },
    {
      title: 'HL7 FHIR R5 Support',
      description: 'Full support for FHIR R5 resources and operations',
      icon: Database,
      color: 'cyan',
    },
    {
      title: 'Comprehensive SDKs',
      description: 'Official SDKs for JavaScript, Python, Java, C#, Ruby, and PHP',
      icon: Code,
      color: 'amber',
    },
    {
      title: '99.99% Uptime SLA',
      description: 'Enterprise-grade reliability with redundant infrastructure',
      icon: Zap,
      color: 'red',
    },
  ];

  const codeExample = `// Initialize Median API client
const Median = require('@lydianmedi/sdk');

const client = new Median({
  apiKey: 'your_api_key_here',
  environment: 'production'
});

// Create a new patient
const patient = await client.patients.create({
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1980-05-15',
  gender: 'male',
  email: 'john.doe@example.com',
  phone: '+1-555-0123',
  address: {
    street: '123 Main St',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101'
  }
});

console.log('Patient created:', patient.id);

// Schedule an appointment
const appointment = await client.appointments.create({
  patientId: patient.id,
  providerId: 'dr_smith_123',
  departmentId: 'cardiology',
  appointmentDate: '2026-01-20T10:00:00Z',
  duration: 30,
  type: 'consultation',
  notes: 'Follow-up for cardiac evaluation'
});

console.log('Appointment scheduled:', appointment.id);`;

  const quickStart = `# Install Median SDK
npm install @lydianmedi/sdk

# Or using Python
pip install vitalcare-sdk

# Or using Java (Maven)
<dependency>
  <groupId>com.vitalcare</groupId>
  <artifactId>vitalcare-sdk</artifactId>
  <version>2.0.0</version>
</dependency>`;

  const authExample = `// Authentication with OAuth 2.0
const token = await Median.auth.getAccessToken({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  grantType: 'client_credentials'
});

// Use token in API requests
const client = new Median({
  accessToken: token.access_token
});`;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
            <Code className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">RESTful API • HL7 FHIR R5</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
            Median
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              API Reference
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Comprehensive REST API for healthcare integrations. Build powerful applications with our
            well-documented, standards-compliant API.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Get API Key
              <Key className="h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Terminal className="h-5 w-5" />
              Try Interactive API
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12">
            <div>
              <div className="text-3xl font-black text-blue-600">156</div>
              <div className="text-sm text-gray-600 font-semibold">API Endpoints</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-3xl font-black text-purple-600">10K</div>
              <div className="text-sm text-gray-600 font-semibold">Requests/Hour</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-3xl font-black text-pink-600">99.99%</div>
              <div className="text-sm text-gray-600 font-semibold">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Quick Start</h2>
              <p className="text-lg text-gray-600 font-medium mb-8 leading-relaxed">
                Get started with the Median API in minutes. Install our SDK, authenticate, and make your first API call.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-black">1</span>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-2">Install SDK</h3>
                    <p className="text-gray-600 font-medium">Choose your preferred language and install the official SDK</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-black">2</span>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-2">Get API Keys</h3>
                    <p className="text-gray-600 font-medium">Generate your API credentials from the dashboard</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 font-black">3</span>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-2">Make API Calls</h3>
                    <p className="text-gray-600 font-medium">Start building with our comprehensive API endpoints</p>
                  </div>
                </div>
              </div>

              <button className="mt-8 px-6 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-all flex items-center gap-2">
                View Complete Guide
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm font-semibold ml-4">installation.sh</span>
                <button className="ml-auto text-gray-400 hover:text-white transition-colors">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                <code>{quickStart}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">API Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Enterprise-grade API built for healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 border-2 border-${feature.color}-200 hover:shadow-2xl transition-all`}
              >
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-4`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-gray-900 mb-12">API Endpoints</h2>

          <div className="space-y-8">
            {apiEndpoints.map((category, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 flex items-center justify-center`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">{category.category}</h3>
                </div>

                <div className="space-y-3">
                  {category.endpoints.map((endpoint, j) => (
                    <div
                      key={j}
                      className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded-lg font-black text-xs ${
                            endpoint.method === 'GET'
                              ? 'bg-blue-100 text-blue-800'
                              : endpoint.method === 'POST'
                              ? 'bg-green-100 text-green-800'
                              : endpoint.method === 'PUT'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="font-mono text-sm text-gray-900 font-semibold flex-1">
                          {endpoint.path}
                        </code>
                        <span className="text-sm text-gray-600 font-medium">{endpoint.description}</span>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Example Code</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              See how easy it is to integrate Median into your application
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm font-semibold ml-4">example.js</span>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Copy className="h-4 w-4" />
                <span className="text-sm font-semibold">Copy</span>
              </button>
            </div>
            <pre className="text-green-400 font-mono text-sm overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Ready to Build?</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Get your API keys and start integrating Median into your healthcare applications today
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Get Started Free
              <Key className="h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
              <FileText className="h-5 w-5" />
              View Full Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black">Median</span>
          </div>
          <p className="text-gray-400 font-semibold mb-8">
            Building powerful healthcare integrations
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

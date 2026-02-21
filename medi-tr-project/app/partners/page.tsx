'use client';

import Header from '@/components/layout/Header';
import {
  Building2,
  Plug,
  Shield,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Code,
  Database,
  Cloud,
  Lock,
  Workflow,
  FileText,
  Pill,
  TestTube,
  Scan,
  Heart,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
} from 'lucide-react';

export default function PartnersPage() {
  const ehrIntegrations = [
    {
      name: 'legacy systems',
      logo: '🏥',
      category: 'Enterprise EHR',
      status: 'Certified',
      description: 'Seamless bi-directional integration with modern healthcare EHR for patient data sync',
      features: ['HL7 FHIR R5', 'Real-time sync', 'ADT messages', 'Lab results'],
    },
    {
      name: 'traditional systems Oracle Health',
      logo: '⚡',
      category: 'Enterprise EHR',
      status: 'Certified',
      description: 'Native integration with traditional systems Millennium and Oracle Health platforms',
      features: ['FHIR API', 'Smart on FHIR', 'CDS Hooks', 'OAuth 2.0'],
    },
    {
      name: 'outdated platforms',
      logo: '🔷',
      category: 'Community Hospital',
      status: 'Certified',
      description: 'Comprehensive integration with outdated platforms Expanse and Magic platforms',
      features: ['HL7 v2.x', 'Direct messaging', 'Order entry', 'Results delivery'],
    },
    {
      name: 'conventional systems',
      logo: '📊',
      category: 'Practice Management',
      status: 'Certified',
      description: 'Full integration suite for conventional systems Sunrise and TouchWorks',
      features: ['API integration', 'Patient portal sync', 'ePrescribing', 'Scheduling'],
    },
    {
      name: 'Athenahealth',
      logo: '🌐',
      category: 'Cloud EHR',
      status: 'Certified',
      description: 'Cloud-based integration with athenaOne platform',
      features: ['REST API', 'Claims data', 'Patient engagement', 'Analytics'],
    },
    {
      name: 'NextGen Healthcare',
      logo: '🚀',
      category: 'Ambulatory EHR',
      status: 'Certified',
      description: 'Integrated workflow with NextGen Office and Enterprise',
      features: ['Mirth Connect', 'FHIR R4', 'Clinical data exchange', 'Billing sync'],
    },
  ];

  const labIntegrations = [
    {
      name: 'Quest Diagnostics',
      logo: '🧪',
      type: 'National Lab Network',
      description: 'Electronic ordering and results delivery from Quest labs nationwide',
    },
    {
      name: 'LabCorp',
      logo: '🔬',
      type: 'National Lab Network',
      description: 'Integrated test ordering and result management with LabCorp',
    },
    {
      name: 'BioReference Laboratories',
      logo: '🧬',
      type: 'Specialty Testing',
      description: 'Specialized testing services with automated result integration',
    },
    {
      name: 'ARUP Laboratories',
      logo: '⚗️',
      type: 'Reference Lab',
      description: 'Academic reference lab integration for complex testing',
    },
  ];

  const pharmacyIntegrations = [
    {
      name: 'Surescripts',
      logo: '💊',
      type: 'ePrescribing Network',
      description: 'National ePrescribing network for electronic prescription routing',
    },
    {
      name: 'CVS Health',
      logo: '❤️',
      type: 'Retail Pharmacy',
      description: 'Direct integration with CVS pharmacies for prescription fulfillment',
    },
    {
      name: 'Walgreens',
      logo: '🏪',
      type: 'Retail Pharmacy',
      description: 'Walgreens pharmacy network integration and status updates',
    },
    {
      name: 'McKesson',
      logo: '📦',
      type: 'Wholesale Distribution',
      description: 'Supply chain management and pharmaceutical distribution',
    },
  ];

  const technologyPartners = [
    {
      name: 'Amazon Web Services',
      logo: '☁️',
      category: 'Cloud Infrastructure',
      tier: 'Advanced Technology Partner',
      description: 'HIPAA-compliant cloud hosting on AWS infrastructure',
      benefits: ['99.99% uptime SLA', 'Global data centers', 'Enterprise security', 'Auto-scaling'],
    },
    {
      name: 'Microsoft Azure',
      logo: '🔷',
      category: 'Cloud Platform',
      tier: 'Gold Partner',
      description: 'Azure cloud services for healthcare workloads',
      benefits: ['HITRUST certified', 'AI/ML services', 'Hybrid cloud', 'Compliance tools'],
    },
    {
      name: 'Google Cloud',
      logo: '🌈',
      category: 'Cloud & AI',
      tier: 'Healthcare Partner',
      description: 'Google Cloud Healthcare API and AI capabilities',
      benefits: ['Healthcare API', 'FHIR stores', 'BigQuery analytics', 'AI diagnostics'],
    },
    {
      name: 'Twilio',
      logo: '📱',
      category: 'Communications',
      tier: 'Technology Partner',
      description: 'SMS, voice, and video communications platform',
      benefits: ['Appointment reminders', 'Telehealth', '2FA authentication', 'Patient notifications'],
    },
    {
      name: 'Stripe',
      logo: '💳',
      category: 'Payment Processing',
      tier: 'Strategic Partner',
      description: 'Healthcare-compliant payment processing',
      benefits: ['PCI compliance', 'Payment plans', 'Automated billing', 'Global payments'],
    },
    {
      name: 'Okta',
      logo: '🔐',
      category: 'Identity & Access',
      tier: 'Security Partner',
      description: 'Enterprise identity and access management',
      benefits: ['SSO integration', 'MFA', 'User provisioning', 'Audit logs'],
    },
  ];

  const partnerPrograms = [
    {
      title: 'Technology Alliance',
      icon: Code,
      color: 'blue',
      description: 'Build integrations with our comprehensive API platform',
      benefits: [
        'Full API access and documentation',
        'Dedicated technical support',
        'Co-marketing opportunities',
        'Joint solution development',
      ],
      cta: 'Apply Now',
    },
    {
      title: 'Reseller Program',
      icon: TrendingUp,
      color: 'purple',
      description: 'Become an authorized Median reseller in your region',
      benefits: [
        'Competitive commission structure',
        'Sales enablement resources',
        'Lead generation support',
        'Training and certification',
      ],
      cta: 'Learn More',
    },
    {
      title: 'Implementation Partner',
      icon: Users,
      color: 'emerald',
      description: 'Help healthcare facilities deploy and optimize Median',
      benefits: [
        'Certified training programs',
        'Implementation methodology',
        'Project management tools',
        'Revenue sharing model',
      ],
      cta: 'Get Started',
    },
  ];

  const successMetrics = [
    { number: '500+', label: 'Partner Integrations', icon: Plug },
    { number: '250+', label: 'Technology Partners', icon: Building2 },
    { number: '99.9%', label: 'Integration Uptime', icon: Zap },
    { number: '24/7', label: 'Partner Support', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-blue-200 mb-6">
            <Award className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">Trusted Partner Ecosystem</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
            Partners &
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Integrations
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Median integrates seamlessly with the healthcare tools you already use. From EHR systems to lab
            networks, our certified integrations ensure smooth data flow across your entire ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Become a Partner
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <FileText className="h-5 w-5" />
              View Integration Docs
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {successMetrics.map((metric, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <metric.icon className="h-8 w-8 text-blue-600 mb-3 mx-auto" />
                <div className="text-3xl font-black text-blue-600">{metric.number}</div>
                <div className="text-sm text-gray-600 font-semibold mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EHR Integrations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Database className="h-8 w-8 text-blue-600" />
              <h2 className="text-5xl font-black text-gray-900">EHR Integrations</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Certified integrations with leading Electronic Health Record systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ehrIntegrations.map((integration, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{integration.logo}</div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-black rounded-full">
                    {integration.status}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2">{integration.name}</h3>
                <p className="text-sm text-blue-600 font-bold mb-3">{integration.category}</p>
                <p className="text-gray-600 font-medium mb-4 leading-relaxed">{integration.description}</p>

                <div className="space-y-2">
                  {integration.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Integrations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <TestTube className="h-8 w-8 text-cyan-600" />
              <h2 className="text-5xl font-black text-gray-900">Laboratory Integrations</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Connected to major lab networks for seamless ordering and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labIntegrations.map((lab, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4 text-center">{lab.logo}</div>
                <h3 className="text-xl font-black text-gray-900 mb-2 text-center">{lab.name}</h3>
                <p className="text-sm text-cyan-600 font-bold mb-3 text-center">{lab.type}</p>
                <p className="text-gray-600 font-medium text-sm text-center leading-relaxed">{lab.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pharmacy Integrations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Pill className="h-8 w-8 text-pink-600" />
              <h2 className="text-5xl font-black text-gray-900">Pharmacy Integrations</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Electronic prescribing and pharmacy network connections
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pharmacyIntegrations.map((pharmacy, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all group"
              >
                <div className="text-5xl mb-4 text-center">{pharmacy.logo}</div>
                <h3 className="text-xl font-black text-gray-900 mb-2 text-center">{pharmacy.name}</h3>
                <p className="text-sm text-pink-600 font-bold mb-3 text-center">{pharmacy.type}</p>
                <p className="text-gray-600 font-medium text-sm text-center leading-relaxed">{pharmacy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Cloud className="h-8 w-8 text-purple-600" />
              <h2 className="text-5xl font-black text-gray-900">Technology Partners</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Powered by industry-leading technology platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyPartners.map((partner, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{partner.logo}</div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-black rounded-full">
                    {partner.tier}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-sm text-purple-600 font-bold mb-3">{partner.category}</p>
                <p className="text-gray-600 font-medium mb-4 leading-relaxed">{partner.description}</p>

                <div className="space-y-2">
                  {partner.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-semibold">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Programs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Partner Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Join our ecosystem and grow your business with Median
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerPrograms.map((program, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-${program.color}-50 to-white rounded-3xl p-8 border-2 border-${program.color}-200 hover:shadow-2xl transition-all`}
              >
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-${program.color}-500 to-${program.color}-600 flex items-center justify-center mb-6`}>
                  <program.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 font-medium mb-6 leading-relaxed">{program.description}</p>

                <ul className="space-y-3 mb-8">
                  {program.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 bg-gradient-to-r from-${program.color}-600 to-${program.color}-700 text-white font-bold rounded-xl hover:shadow-xl transition-all`}>
                  {program.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Ready to Integrate?</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Connect your healthcare ecosystem with Median's comprehensive integration platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Schedule Integration Call
              <Calendar className="h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
              <Code className="h-5 w-5" />
              View API Documentation
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
            Building the future of healthcare together
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Median Healthcare Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

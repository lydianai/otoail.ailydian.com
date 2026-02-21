'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Book, Code, FileText, Zap, Database, Shield, ArrowRight } from 'lucide-react';

export default function TurkishDocsPage() {
  const sections = [
    {
      icon: Zap,
      title: 'Başlarken',
      color: 'red',
      links: [
        { name: 'Hızlı Başlangıç Kılavuzu', href: '#' },
        { name: 'Kurulum & Yapılandırma', href: '#' },
        { name: 'Sistem Gereksinimleri', href: '#' },
        { name: 'İlk Giriş & Kurulum', href: '#' },
      ]
    },
    {
      icon: Code,
      title: 'API Referansı',
      color: 'rose',
      links: [
        { name: 'REST API Genel Bakış', href: '#' },
        { name: 'Kimlik Doğrulama & Yetkilendirme', href: '#' },
        { name: 'HL7 FHIR R5 Uç Noktaları', href: '#' },
        { name: 'Webhook Entegrasyonu', href: '#' },
      ]
    },
    {
      icon: Database,
      title: 'Entegrasyonlar',
      color: 'red',
      links: [
        { name: 'e-Nabız Entegrasyonu', href: '#' },
        { name: 'SGK Medula Bağlantısı', href: '#' },
        { name: 'Laboratuvar Cihaz Entegrasyonu', href: '#' },
        { name: 'DICOM PACS Entegrasyonu', href: '#' },
      ]
    },
    {
      icon: Shield,
      title: 'Güvenlik & Uyumluluk',
      color: 'rose',
      links: [
        { name: 'KVKK Uyumluluk Kılavuzu', href: '#' },
        { name: 'Veri Şifreleme', href: '#' },
        { name: 'Erişim Kontrol Politikaları', href: '#' },
        { name: 'Denetim Günlükleri', href: '#' },
      ]
    },
    {
      icon: FileText,
      title: 'Modül Kılavuzları',
      color: 'red',
      links: [
        { name: 'Hasta Yönetimi (EHR)', href: '#' },
        { name: 'Acil Servis Modülü', href: '#' },
        { name: 'Laboratuvar (LIMS)', href: '#' },
        { name: 'Eczane Yönetimi', href: '#' },
      ]
    },
    {
      icon: Book,
      title: 'En İyi Uygulamalar',
      color: 'rose',
      links: [
        { name: 'İş Akışı Optimizasyonu', href: '#' },
        { name: 'Veri Yedekleme Stratejileri', href: '#' },
        { name: 'Kullanıcı Eğitim Programları', href: '#' },
        { name: 'Performans İyileştirme', href: '#' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
              Dokümantasyon
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-12">
            Median platformunu kullanmak için ihtiyacınız olan her şey. API referansları, entegrasyon kılavuzları ve en iyi uygulamalar.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Dokümanlarda ara..."
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 font-semibold focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all"
                >
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-${section.color}-500 to-${section.color}-600 flex items-center justify-center mb-6`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-6">
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-red-500 font-semibold flex items-center gap-2 group"
                        >
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* API Quick Start */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                API ile Hızlı Başlayın
              </h2>
              <p className="text-lg text-gray-600 font-semibold mb-6">
                RESTful API'miz ve HL7 FHIR R5 desteğimiz ile dakikalar içinde entegrasyon yapın. Kapsamlı API dokümantasyonu, örnek kod ve Postman koleksiyonları.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-black text-sm">1</span>
                  </div>
                  <span className="text-gray-700 font-semibold">API anahtarınızı Median panosundan alın</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-rose-600 font-black text-sm">2</span>
                  </div>
                  <span className="text-gray-700 font-semibold">İsteklerinizin başlığında API anahtarınızı kullanın</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-black text-sm">3</span>
                  </div>
                  <span className="text-gray-700 font-semibold">API uç noktalarımızı çağırmaya başlayın</span>
                </li>
              </ul>
              <Link
                href="#"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-black hover:shadow-2xl transition-all"
              >
                API Dokümantasyonu
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 font-mono text-sm">
              <div className="text-green-400 mb-4"># Örnek API İsteği</div>
              <div className="text-gray-300">
                <span className="text-purple-400">curl</span> -X GET \<br />
                &nbsp;&nbsp;<span className="text-yellow-400">"https://api.vitalcare.com/v1/patients"</span> \<br />
                &nbsp;&nbsp;-H <span className="text-yellow-400">"Authorization: Bearer YOUR_API_KEY"</span> \<br />
                &nbsp;&nbsp;-H <span className="text-yellow-400">"Content-Type: application/json"</span>
              </div>
              <div className="mt-6 text-green-400"># Yanıt</div>
              <div className="text-gray-300">
                {'{'}<br />
                &nbsp;&nbsp;<span className="text-cyan-400">"data"</span>: [<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">"id"</span>: <span className="text-yellow-400">"12345"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">"name"</span>: <span className="text-yellow-400">"Ahmet Yılmaz"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">"mrn"</span>: <span className="text-yellow-400">"MRN-001"</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
                &nbsp;&nbsp;]<br />
                {'}'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Yardıma mı İhtiyacınız Var?
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            Destek ekibimiz size yardımcı olmak için burada. Canlı sohbet, e-posta veya telefon desteği.
          </p>
          <Link
            href="/tr/help"
            className="inline-block px-8 py-4 bg-white text-red-500 rounded-2xl font-black text-lg hover:shadow-2xl transition-all"
          >
            Destek Merkezi
          </Link>
        </div>
      </section>
    </div>
  );
}

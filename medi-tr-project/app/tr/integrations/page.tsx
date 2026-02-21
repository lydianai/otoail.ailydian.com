'use client';

import Header from '@/components/layout/Header';
import { CheckCircle, ArrowRight, Plug, Database, Cloud, FileText, Activity } from 'lucide-react';

export default function TurkishIntegrationsPage() {
  const integrations = [
    {
      category: 'Türkiye Sağlık Sistemleri',
      icon: Activity,
      color: 'red',
      items: [
        { name: 'e-Nabız Kişisel Sağlık Sistemi', description: 'T.C. Sağlık Bakanlığı hasta kayıtları entegrasyonu', protocol: 'HL7 v2.x' },
        { name: 'SGK Medula Provizyon', description: 'Sosyal Güvenlik Kurumu provizyon sistemi', protocol: 'Web Services' },
        { name: 'SGK Medula Fatura', description: 'Otomatik fatura gönderimi ve takibi', protocol: 'Web Services' },
        { name: 'İlaç Takip Sistemi (İTS)', description: 'İlaç seri numarası ve kayıt bildirimi', protocol: 'REST API' },
        { name: 'Reçete Bilgi Sistemi (RBS)', description: 'E-reçete entegrasyonu', protocol: 'Web Services' },
        { name: 'Aile Hekimliği Bilgi Sistemi (AHBS)', description: 'Aile hekimliği raporlaması', protocol: 'HL7 v2.x' },
      ]
    },
    {
      category: 'Uluslararası EHR Sistemleri',
      icon: Database,
      color: 'rose',
      items: [
        { name: 'legacy systems', description: 'Epic Interconnect API entegrasyonu', protocol: 'HL7 FHIR R5' },
        { name: 'traditional systems Millennium', description: 'traditional systems Open Engine API', protocol: 'HL7 FHIR R4' },
        { name: 'conventional systems', description: 'conventional systems API çerçevesi', protocol: 'HL7 v2.x' },
        { name: 'MEDITECH', description: 'MEDITECH Magic/Expanse', protocol: 'HL7 v2.5' },
      ]
    },
    {
      category: 'Laboratuvar Sistemleri',
      icon: FileText,
      color: 'red',
      items: [
        { name: 'Roche Cobas', description: 'Roche Cobas enstrüman entegrasyonu', protocol: 'ASTM E1394' },
        { name: 'Abbott Architect', description: 'Abbott klinik kimya analizörleri', protocol: 'HL7 v2.5' },
        { name: 'Siemens Atellica', description: 'Siemens lab otomasyonu', protocol: 'HL7 v2.x' },
        { name: 'Beckman Coulter', description: 'Beckman DXC/AU sistemleri', protocol: 'ASTM' },
      ]
    },
    {
      category: 'Radyoloji & PACS',
      icon: Cloud,
      color: 'rose',
      items: [
        { name: 'GE Healthcare PACS', description: 'GE Centricity PACS entegrasyonu', protocol: 'DICOM 3.0' },
        { name: 'Philips IntelliSpace', description: 'Philips görüntüleme sistemleri', protocol: 'DICOM 3.0' },
        { name: 'Siemens Syngo', description: 'Siemens radyoloji iş akışı', protocol: 'DICOM/HL7' },
        { name: 'Canon Medical', description: 'Canon görüntüleme çözümleri', protocol: 'DICOM 3.0' },
      ]
    },
    {
      category: 'Ödeme & Sigorta',
      icon: Plug,
      color: 'red',
      items: [
        { name: 'SGK', description: 'Sosyal Güvenlik Kurumu faturalandırma', protocol: 'Web Services' },
        { name: 'Özel Sağlık Sigortaları', description: 'Acıbadem Sigorta, Allianz, Axa, vb.', protocol: 'REST API' },
        { name: 'Stripe', description: 'Özel hasta ödemeleri', protocol: 'REST API' },
        { name: 'İyzico', description: 'Türkiye ödeme işleme', protocol: 'REST API' },
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
              Güçlü Entegrasyonlar
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-12">
            Median, mevcut sağlık BT ekosisteminizle sorunsuz bir şekilde bağlanır. e-Nabız, SGK Medula, HL7 FHIR R5 ve 100+ tıbbi cihaz desteği.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm font-bold text-gray-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-red-500" />
              HL7 FHIR R5
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-rose-600" />
              DICOM 3.0
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-red-500" />
              e-Nabız API
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-rose-600" />
              SGK Medula
            </div>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      {integrations.map((category, idx) => {
        const Icon = category.icon;
        return (
          <section key={idx} className={`py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-red-50 to-rose-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-12">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 flex items-center justify-center`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900">
                  {category.category}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-red-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-black text-gray-900">{item.name}</h3>
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                        {item.protocol}
                      </span>
                    </div>
                    <p className="text-gray-600 font-semibold">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* API Documentation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-black text-white mb-6">
              Özel Entegrasyon mu Gerekiyor?
            </h2>
            <p className="text-xl text-white/90 font-semibold mb-8 max-w-3xl mx-auto">
              Entegrasyon ekibimiz, benzersiz sistemlerinizle özel entegrasyonlar oluşturabilir. RESTful API'miz ve HL7 FHIR R5 desteğimiz, Median'i mevcut iş akışlarınıza bağlamayı kolaylaştırır.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/tr/docs"
                className="px-8 py-4 bg-white text-red-500 rounded-2xl font-black text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
              >
                API Dokümanları
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/tr/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur border-2 border-white text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all"
              >
                Entegrasyon Ekibi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Endüstri Standartlarına Uygun
            </h2>
            <p className="text-lg text-gray-600 font-semibold max-w-3xl mx-auto">
              Median, sağlık BT'de tüm önemli birlikte çalışabilirlik standartlarını destekler.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-red-100 text-center">
              <div className="text-3xl font-black text-red-500 mb-2">HL7 FHIR R5</div>
              <p className="text-sm text-gray-600 font-semibold">Hızlı Sağlık Birlikte Çalışabilirlik Kaynakları</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-rose-100 text-center">
              <div className="text-3xl font-black text-rose-600 mb-2">DICOM 3.0</div>
              <p className="text-sm text-gray-600 font-semibold">Tıpta Dijital Görüntüleme ve İletişim</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-red-100 text-center">
              <div className="text-3xl font-black text-red-500 mb-2">HL7 v2.x</div>
              <p className="text-sm text-gray-600 font-semibold">Eski sistem mesajlaşma desteği</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-rose-100 text-center">
              <div className="text-3xl font-black text-rose-600 mb-2">ICD-10-CM</div>
              <p className="text-sm text-gray-600 font-semibold">Uluslararası Hastalık Sınıflandırması</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

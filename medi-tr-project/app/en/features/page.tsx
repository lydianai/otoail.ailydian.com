'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Users,
  AlertCircle,
  Bed,
  Calendar,
  TestTube,
  Pill,
  Scan,
  Stethoscope,
  DollarSign,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Heart,
  Brain,
  Zap,
} from 'lucide-react';

export default function TurkishFeaturesPage() {
  const modules = [
    {
      icon: Users,
      title: 'Hasta Yönetimi (EHR)',
      color: 'red',
      description: 'Yapay zeka destekli klinik karar desteği, hasta portalı ve mobil uygulama erişimi ile eksiksiz Elektronik Sağlık Kayıtları',
      features: ['Yapay Zeka Klinik Karar Desteği', 'Hasta Portalı & Mobil Uygulama', 'Tıbbi Geçmiş Takibi', 'İlaç Yönetimi', 'Alerji & Problem Listeleri', 'Klinik Dokümantasyon']
    },
    {
      icon: AlertCircle,
      title: 'Acil Servis',
      color: 'rose',
      description: 'Son teknoloji acil servis iş akışları ile gerçek zamanlı triyaj, yatak yönetimi ve kritik bakım takibi',
      features: ['Gerçek Zamanlı Triyaj Sistemi', 'Acil Yatak Yönetimi', 'Kritik Bakım Takibi', 'Travma Kayıt Sistemi', 'Hızlı İzleme İş Akışları', 'Acil Dashboard & Analitik']
    },
    {
      icon: Bed,
      title: 'Yatan Hasta Bakımı',
      color: 'red',
      description: 'Optimal yatan hasta bakımı için gelişmiş yatak yönetimi, hemşirelik iş akışları ve taburcu planlama',
      features: ['Yatak Yönetimi & Sayım', 'Hemşirelik İş Akışları', 'Kabul/Nakil/Taburcu', 'Vizit Yönetimi', 'Bakım Planları & Protokoller', 'Taburcu Planlama']
    },
    {
      icon: Calendar,
      title: 'Randevu & Planlama',
      color: 'rose',
      description: 'Yapay zeka destekli planlama, otomatik hatırlatmalar ve çoklu sağlayıcı takvim yönetim sistemi',
      features: ['Yapay Zeka Destekli Planlama', 'Çoklu Sağlayıcı Takvimleri', 'Otomatik Hatırlatmalar (SMS/Email)', 'Bekleme Listesi Yönetimi', 'Telesağlık Entegrasyonu', 'Gelmeme Tahmini']
    },
    {
      icon: TestTube,
      title: 'Laboratuvar (LIMS)',
      color: 'red',
      description: 'Numune takibi, sonuç yönetimi ve kalite kontrolü ile tam laboratuvar bilgi sistemi',
      features: ['Numune Takibi', 'Sonuç Yönetimi', 'Kalite Kontrol & Kalibrasyon', 'Lab Cihaz Entegrasyonu', 'Referans Aralık Yönetimi', 'Kritik Değer Uyarıları']
    },
    {
      icon: Pill,
      title: 'Eczane Yönetimi',
      color: 'rose',
      description: 'e-Reçete, ilaç etkileşim kontrolü, envanter yönetimi ve otomatik ilaç dağıtım sistemi',
      features: ['e-Reçete', 'İlaç Etkileşim Kontrolü', 'Envanter & Son Kullanma Takibi', 'Otomatik Dağıtım', 'Formüler Yönetimi', 'İlaç Uzlaştırma']
    },
    {
      icon: Scan,
      title: 'Radyoloji (PACS)',
      color: 'red',
      description: 'Dijital görüntüleme, DICOM entegrasyonu, yapay zeka destekli okuma ve kapsamlı radyoloji raporlama',
      features: ['DICOM Entegrasyonu', 'Yapay Zeka Destekli Okuma', 'Görüntü Görüntüleme & Depolama', 'Radyoloji Raporlama', 'Kritik Bulgu Uyarıları', 'İş Akışı Yönetimi']
    },
    {
      icon: Stethoscope,
      title: 'Ameliyathane',
      color: 'rose',
      description: 'Cerrahi planlama, ekipman takibi, anestezi kayıtları ve kapsamlı ameliyat sonrası yönetim',
      features: ['Cerrahi Planlama', 'Ameliyathane Zamanı Optimizasyonu', 'Ekipman & Malzeme Takibi', 'Anestezi Dokümantasyonu', 'Cerrahi Güvenlik Kontrol Listesi', 'Ameliyat Sonrası Yönetim']
    },
    {
      icon: DollarSign,
      title: 'Faturalandırma & Gelir',
      color: 'red',
      description: 'Otomatik faturalandırma, talep yönetimi, ödeme işleme ve kapsamlı gelir döngüsü analitiği',
      features: ['Otomatik Ücret Yakalama', 'SGK/Özel Sigorta Yönetimi', 'Ödeme İşleme', 'Red Yönetimi', 'Gelir Döngüsü Analitiği', 'Hasta Bildirimleri']
    },
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: 'Yapay Zeka Klinik Karar Desteği',
      description: 'Makine öğrenimi tabanlı teşhis önerileri, ilaç etkileşim uyarıları ve risk skorlaması'
    },
    {
      icon: Zap,
      title: 'Akıllı Otomasyon',
      description: 'Otomatik dokümantasyon, akıllı planlama ve tahmine dayalı analitik iş akışlarını optimize eder'
    },
    {
      icon: Heart,
      title: 'Hasta Katılımı',
      description: 'Mobil uygulamalar, telehealth entegrasyonu ve kişiselleştirilmiş bakım planları'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
                Eksiksiz Sağlık Platformu
              </span>
            </h1>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Küçük kliniklerden büyük hastane sistemlerine kadar tüm sağlık tesisleriniz için
              entegre, yapay zeka destekli modüller. e-Nabız, SGK ve Medula ile tam uyumlu.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-black text-red-500 mb-2">Güvenilir</div>
              <div className="text-gray-600 font-semibold">Platform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-rose-600 mb-2">Güvenli</div>
              <div className="text-gray-600 font-semibold">Veri Yönetimi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-red-500 mb-2">Yüksek</div>
              <div className="text-gray-600 font-semibold">Erişilebilirlik</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-rose-600 mb-2">24/7</div>
              <div className="text-gray-600 font-semibold">Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Temel Klinik Modüller
            </h2>
            <p className="text-lg text-gray-600 font-semibold max-w-3xl mx-auto">
              Modern sağlık tesisinin ihtiyaç duyduğu her şey. Tam entegre, yapay zeka destekli ve kullanımı kolay.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-${module.color}-500 to-${module.color}-600 flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 font-semibold mb-6">
                    {module.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {module.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Yapay Zeka ile Güçlendirilmiş
            </h2>
            <p className="text-lg text-gray-600 font-semibold max-w-3xl mx-auto">
              En son makine öğrenimi teknolojisi, klinik sonuçları iyileştirir ve iş akışlarını optimize eder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border-2 border-red-100 hover:shadow-xl transition-all"
                >
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-semibold">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Uyumluluk & Güvenlik
            </h2>
            <p className="text-lg text-gray-600 font-semibold max-w-3xl mx-auto">
              Türkiye sağlık mevzuatına tam uyumlu. Verileriniz her zaman güvende.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">KVKK Uyumlu</h3>
              <p className="text-sm text-gray-600 font-semibold">
                Türkiye Kişisel Verilerin Korunması Kanunu'na tam uyum
              </p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">e-Nabız Entegrasyonu</h3>
              <p className="text-sm text-gray-600 font-semibold">
                T.C. Sağlık Bakanlığı e-Nabız sistemi ile sorunsuz entegrasyon
              </p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">SGK/Medula</h3>
              <p className="text-sm text-gray-600 font-semibold">
                SGK Medula provizyon ve fatura sistemleri ile tam entegrasyon
              </p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">ISO 27001</h3>
              <p className="text-sm text-gray-600 font-semibold">
                Uluslararası bilgi güvenliği standardı sertifikası
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Hastanenizi Dönüştürmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            30 günlük ücretsiz denemeye bugün başlayın. Kredi kartı gerekmez.
          </p>
          <Link
            href="/tr/demo"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-red-500 rounded-2xl font-black text-lg hover:shadow-2xl transition-all"
          >
            Ücretsiz Demo Alın
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

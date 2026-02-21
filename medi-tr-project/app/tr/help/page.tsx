'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { MessageCircle, Mail, Phone, Book, Video, Search, HelpCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function TurkishHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Başlarken',
      questions: [
        {
          q: 'Median kurulumu ne kadar sürer?',
          a: 'Küçük klinikler için 1-2 hafta, orta ölçekli hastaneler için 2-4 hafta. Kurumsal dağıtımlar tesise göre değişir ancak genellikle geleneksel HIS\'lerden 5-10 kat daha hızlıdır.'
        },
        {
          q: 'Ücretsiz deneme sunuyor musunuz?',
          a: 'Evet! Kredi kartı gerektirmeyen 30 günlük tam özellikli ücretsiz deneme sunuyoruz. Deneme sürenizde tüm modüllere, yapay zeka özelliklerine ve destek kaynaklarına erişebilirsiniz.'
        },
        {
          q: 'Mevcut sistemimden veri aktarabilir miyim?',
          a: 'Kesinlikle. Veri geçiş ekibimiz mevcut EHR/HIS sisteminizden hasta kayıtlarını, randevuları ve geçmiş verileri aktarmanıza yardımcı olur. HL7, CSV ve özel formatları destekliyoruz.'
        },
      ]
    },
    {
      category: 'Faturalandırma & Fiyatlandırma',
      questions: [
        {
          q: 'Fiyatlandırmanız nasıl çalışır?',
          a: 'Kullanıcı sayısına ve aktif hasta sayısına göre fiyatlandırıyoruz. Gizli ücret yok - tüm özellikler planınıza dahildir. Yıllık aboneliklerle %20 tasarruf edin.'
        },
        {
          q: 'İstediğim zaman planımı değiştirebilir miyim?',
          a: 'Evet, istediğiniz zaman yükseltebilir veya düşürebilirsiniz. Değişiklikler hemen yürürlüğe girer ve kullanım oranına göre fatura kesilir.'
        },
        {
          q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
          a: 'Kredi kartları (Visa, Mastercard, Amex), havale ve Türk bankalarından EFT kabul ediyoruz. Kurumsal müşteriler için fatura seçeneği mevcuttur.'
        },
      ]
    },
    {
      category: 'Teknik Destek',
      questions: [
        {
          q: 'Destek saatleriniz nedir?',
          a: 'Temel plan: E-posta desteği (24 saat yanıt). Profesyonel plan: Öncelikli destek (4 saat yanıt). Kurumsal plan: 7/24 telefon/e-posta/sohbet desteği.'
        },
        {
          q: 'Eğitim sağlıyor musunuz?',
          a: 'Evet! Video eğitimleri, canlı webinarlar, yerinde eğitim ve kapsamlı dokümantasyon içeren eksiksiz eğitim programı sunuyoruz.'
        },
        {
          q: 'Sistemde bir sorun olursa ne yaparım?',
          a: 'Panodan destek bileti açın, support@lydianmedi.com adresine e-posta gönderin veya (Kurumsal) acil durum hattımızı arayın. 99.9%+ çalışma süresi SLA\'mız vardır.'
        },
      ]
    },
    {
      category: 'Güvenlik & Uyumluluk',
      questions: [
        {
          q: 'Verilerim güvende mi?',
          a: 'Evet. AES-256 şifreleme, çok faktörlü kimlik doğrulama, SOC 2 Type II sertifikası ve tam KVKK uyumluluğu kullanıyoruz. Veriler Türkiye veri merkezlerinde saklanır.'
        },
        {
          q: 'KVKK uyumlu musunuz?',
          a: 'Evet, Türkiye Kişisel Verilerin Korunması Kanunu (KVKK) ve GDPR\'a tam uyumluyuz. VERBİS kaydı, rıza yönetimi ve veri sahibi hakları dahildir.'
        },
        {
          q: 'Verilerimi dışa aktarabilir miyim?',
          a: 'Evet, verilerinizi istediğiniz zaman dışa aktarabilirsiniz. JSON, CSV, HL7 FHIR dahil birden fazla format destekliyoruz.'
        },
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
            Size Nasıl <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Yardımcı</span> Olabiliriz?
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-12">
            Sık sorulan soruları arayın, dokümanlara göz atın veya destek ekibimizle iletişime geçin.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Bir soru veya anahtar kelime arayın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-200 font-semibold focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">Canlı Sohbet</h3>
              <p className="text-gray-600 font-semibold mb-6">
                Destek ekibimizle gerçek zamanlı konuşun. Ortalama yanıt süresi 2 dakika.
              </p>
              <button className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all">
                Sohbeti Başlat
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-rose-500 hover:shadow-2xl transition-all text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">E-posta Desteği</h3>
              <p className="text-gray-600 font-semibold mb-6">
                Bize e-posta gönderin, 4-24 saat içinde yanıt vereceğiz.
              </p>
              <a
                href="mailto:support@lydianmedi.com"
                className="inline-block px-6 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all"
              >
                E-posta Gönder
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">Telefon Desteği</h3>
              <p className="text-gray-600 font-semibold mb-6">
                Kurumsal müşteriler için 7/24 telefon desteği.
              </p>
              <a
                href="tel:+908501234567"
                className="inline-block px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
              >
                +90 850 123 4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-lg text-gray-600 font-semibold">
              Median hakkında en çok sorulan sorular.
            </p>
          </div>

          {faqs.map((category, idx) => (
            <div key={idx} className="mb-12">
              <h3 className="text-2xl font-black text-gray-900 mb-6">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.questions.map((faq, faqIdx) => (
                  <div key={faqIdx} className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-100">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <HelpCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-black text-gray-900 mb-2">
                          {faq.q}
                        </h4>
                        <p className="text-gray-700 font-semibold">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Diğer Kaynaklar
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/tr/docs" className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
                Dokümantasyon
              </h3>
              <p className="text-gray-600 font-semibold">
                API referansları, entegrasyon kılavuzları ve teknik dokümanlar
              </p>
            </Link>

            <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-rose-500 hover:shadow-2xl transition-all">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                Video Eğitimleri
              </h3>
              <p className="text-gray-600 font-semibold">
                Adım adım video eğitimleri ve webinarlar
              </p>
            </div>

            <Link href="/tr/blog" className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
                Blog & Rehberler
              </h3>
              <p className="text-gray-600 font-semibold">
                En iyi uygulamalar, sağlık BT trendleri ve müşteri hikayeleri
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

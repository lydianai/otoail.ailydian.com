'use client';

import Header from '@/components/layout/Header';
import { CheckCircle, ArrowRight, Star, Shield, Clock, Headphones } from 'lucide-react';
import { useState } from 'react';

export default function TurkishPricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Basit, <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Şeffaf Fiyatlandırma</span>
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-12">
            Sağlık tesisiniz için mükemmel planı seçin. Gizli ücret yok, tüm özellikler dahil.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`font-bold ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
              Aylık
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 bg-gradient-to-r from-red-500 to-rose-600 rounded-full transition-all"
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${billingCycle === 'annual' ? 'translate-x-9' : 'translate-x-1'}`} />
            </button>
            <span className={`font-bold ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-400'}`}>
              Yıllık <span className="text-green-600 text-sm">(%20 Tasarruf)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:shadow-2xl transition-all">
              <div className="mb-6">
                <div className="text-sm font-bold text-red-500 mb-2">KÜÇÜK KLİNİKLER</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Temel</h3>
                <div className="flex items-baseline justify-center py-4">
                  <span className="text-3xl font-black text-gray-900">
                    Rekabetçi Fiyatlandırma
                  </span>
                </div>
                <p className="text-sm text-center text-gray-500 font-semibold">
                  İhtiyaçlarınıza özel fiyat teklifi
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Hasta Yönetimi (EHR)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Randevu Planlama</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Temel Faturalandırma</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Mobil Uygulama Erişimi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">E-posta Desteği</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Güvenli Veri Koruma</span>
                </li>
              </ul>

              <button className="w-full py-3 px-6 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all">
                Fiyat Teklifi Alın
              </button>
            </div>

            {/* Professional Plan - Recommended */}
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-8 border-2 border-red-500 transform scale-105 hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-white">ORTA HASTANELER</div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold text-white">
                  ÖNERİLEN
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Profesyonel</h3>
              <div className="flex items-baseline justify-center py-4">
                <span className="text-3xl font-black text-white">
                  İhtiyacınıza Özel Fiyat
                </span>
              </div>
              <p className="text-sm text-center text-white/80 font-semibold mb-2">
                Orta ölçekli hastaneler için özel paketler
              </p>

              <ul className="space-y-4 mb-8 mt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Temel Plandaki Her Şey</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Acil Servis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Yatan Hasta Bakımı</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Laboratuvar (LIMS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Eczane Yönetimi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Telesağlık</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Öncelikli Destek</span>
                </li>
              </ul>

              <button className="w-full py-3 px-6 bg-white text-red-500 rounded-xl font-bold hover:bg-gray-100 transition-all">
                İletişime Geçin
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:shadow-2xl transition-all">
              <div className="mb-6">
                <div className="text-sm font-bold text-rose-600 mb-2">BÜYÜK HASTANELER</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Kurumsal</h3>
                <div className="flex items-baseline justify-center py-4">
                  <span className="text-5xl font-black text-gray-900">
                    Özel
                  </span>
                </div>
                <p className="text-sm text-center text-gray-500 font-semibold">
                  Büyük sağlık sistemleri için özel fiyatlandırma
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Profesyoneldeki Her Şey</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Radyoloji (PACS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Ameliyathane Yönetimi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Yapay Zeka Klinik Karar Desteği</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Özel Etiket</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Özel Hesap Yöneticisi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">7/24 Telefon Desteği</span>
                </li>
              </ul>

              <button className="w-full py-3 px-6 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all">
                Satış Ekibine Ulaşın
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            Sağlık Tesisleri Neden Median'i Seçiyor
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">KVKK Uyumlu</h3>
              <p className="text-gray-600 font-semibold">
                SOC 2 Type II sertifikasyonu ve yıllık denetimlerle tam KVKK uyumluluğu
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Hızlı Kurulum</h3>
              <p className="text-gray-600 font-semibold">
                Geleneksel sistemlerle 6-12 ay yerine 1-2 haftada başlayın
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">7/24 Destek</h3>
              <p className="text-gray-600 font-semibold">
                Sağlık BT uzmanlarından kesintisiz destek
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-12">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Ücretsiz deneme sunuyor musunuz?
              </h3>
              <p className="text-gray-600 font-semibold">
                Evet! Tüm özelliklere tam erişim ile 30 günlük ücretsiz deneme sunuyoruz. Kredi kartı gerekmez.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Daha sonra plan değiştirebilir miyim?
              </h3>
              <p className="text-gray-600 font-semibold">
                Kesinlikle. Planınızı ceza ödemeden istediğiniz zaman yükseltebilir veya düşürebilirsiniz.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Hangi ödeme yöntemlerini kabul ediyorsunuz?
              </h3>
              <p className="text-gray-600 font-semibold">
                Tüm büyük kredi kartlarını, havale ve yıllık planlar için EFT'yi kabul ediyoruz.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Kurulum ücreti var mı?
              </h3>
              <p className="text-gray-600 font-semibold">
                Temel ve Profesyonel planlar için kurulum ücreti yoktur. Kurumsal planlar ücretsiz beyaz eldiven entegrasyon hizmeti içerir.
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
          <button className="group px-8 py-4 bg-white text-red-500 rounded-2xl font-black text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3">
            Ücretsiz Deneme Başlat
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

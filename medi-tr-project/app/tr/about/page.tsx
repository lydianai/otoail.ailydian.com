'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Users, Globe, Award, Heart, TrendingUp, Shield, Zap, Target } from 'lucide-react';

export default function TurkishAboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Sağlık Hizmetlerinin <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Geleceğini</span> İnşa Ediyoruz
            </h1>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Median, küresel sağlık hizmetlerini daha erişilebilir, verimli ve hasta odaklı hale getirmek için yapay zeka destekli teknoloji sağlar.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Misyonumuz
              </h2>
              <p className="text-lg text-gray-700 font-semibold mb-6">
                Modern teknoloji ile sağlık hizmeti sağlayıcılarını güçlendirmek, daha iyi hasta sonuçlarını mümkün kılmak ve sağlık hizmetlerini küresel olarak dönüştürmektir.
              </p>
              <p className="text-lg text-gray-700 font-semibold">
                2019'da kurulan Median, sağlık tesislerine daha iyi bakım sunmaları için modern teknoloji çözümleri sağlamaktadır.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
                <div className="text-4xl font-black text-red-500 mb-2">Küresel</div>
                <div className="text-sm font-bold text-gray-700">Hizmet Ağı</div>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 border-2 border-rose-200">
                <div className="text-4xl font-black text-rose-600 mb-2">Güvenli</div>
                <div className="text-sm font-bold text-gray-700">Veri Yönetimi</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
                <div className="text-4xl font-black text-red-500 mb-2">Modern</div>
                <div className="text-sm font-bold text-gray-700">Teknoloji</div>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 border-2 border-rose-200">
                <div className="text-4xl font-black text-rose-600 mb-2">Yüksek</div>
                <div className="text-sm font-bold text-gray-700">Erişilebilirlik</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Değerlerimiz
            </h2>
            <p className="text-lg text-gray-600 font-semibold max-w-3xl mx-auto">
              Yaptığımız her şey bu temel ilkelerle yönlendirilir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-red-100">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Hasta Öncelikli</h3>
              <p className="text-gray-600 font-semibold">
                Her karar ve özellik, hasta bakımını ve sonuçları iyileştirmek için tasarlanmıştır.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-rose-100">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Güvenlik Birinci</h3>
              <p className="text-gray-600 font-semibold">
                KVKK uyumluluğu ve banka düzeyinde güvenlik standart olarak gelir.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-red-100">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">İnovasyon</h3>
              <p className="text-gray-600 font-semibold">
                Yapay zeka ve makine öğrenimi ile sağlık hizmetlerinin sınırlarını zorlarız.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-rose-100">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Mükemmellik</h3>
              <p className="text-gray-600 font-semibold">
                Yaptığımız her şeyde en yüksek kalite ve güvenilirlik standardını hedefliyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Sertifikalar & Uyumluluk
            </h2>
            <p className="text-lg text-gray-600 font-semibold max-w-3xl mx-auto">
              En yüksek sağlık BT güvenlik ve uyumluluk standartlarını karşılar veya aşarız.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">KVKK Uyumlu</h3>
              <p className="text-sm text-gray-600 font-semibold">
                Türkiye Kişisel Verilerin Korunması Kanunu
              </p>
            </div>

            <div className="text-center">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-4">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">SOC 2 Type II</h3>
              <p className="text-sm text-gray-600 font-semibold">
                Yıllık bağımsız güvenlik denetimleri
              </p>
            </div>

            <div className="text-center">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">ISO 27001</h3>
              <p className="text-sm text-gray-600 font-semibold">
                Bilgi güvenliği yönetim sistemi
              </p>
            </div>

            <div className="text-center">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">HL7 FHIR R5</h3>
              <p className="text-sm text-gray-600 font-semibold">
                Küresel sağlık verileri birlikte çalışabilirliği
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ekibimize Katılın
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            Küresel sağlık hizmetlerini dönüştürmeye yardımcı olun. Açık pozisyonları görün.
          </p>
          <Link
            href="/careers"
            className="inline-block px-8 py-4 bg-white text-red-500 rounded-2xl font-black text-lg hover:shadow-2xl transition-all"
          >
            Kariyer Fırsatlarını Görün
          </Link>
        </div>
      </section>
    </div>
  );
}

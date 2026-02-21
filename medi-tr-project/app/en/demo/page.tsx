'use client';

import Header from '@/components/layout/Header';
import { Calendar, Clock, User, Mail, Phone, Building2, MapPin, Users, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function TurkishDemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    facilitySize: '',
    country: 'TR',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo talebi:', formData);
    alert('Teşekkür ederiz! Demo randevunuzu planlamak için en kısa sürede sizinle iletişime geçeceğiz.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Canlı Demo</span> Randevusu Alın
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto mb-8">
            Median'i canlı olarak görün. Sağlık BT uzmanlarımız size platformu tanıtacak ve
            tüm sorularınızı yanıtlayacak. 30 dakikalık özel demo seansı.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm font-bold text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-500" />
              30 dakika
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Ücretsiz danışma
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-rose-600" />
              Kişiselleştirilmiş demo
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Demo Talebinizi Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Ad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                      placeholder="Ahmet"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                      placeholder="Yılmaz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    İş E-postası *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                      placeholder="ahmet.yilmaz@hastane.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Telefon Numarası *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                      placeholder="+90 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Kuruluş Adı *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                      placeholder="Şehir Hastanesi"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Göreviniz *
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                  >
                    <option value="">Görevinizi seçin</option>
                    <option value="cio">BT Direktörü</option>
                    <option value="cmo">Başhekim / Tıbbi Direktör</option>
                    <option value="ceo">Genel Müdür / Yönetici</option>
                    <option value="manager">Bölüm Yöneticisi</option>
                    <option value="physician">Doktor</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tesis Büyüklüğü *
                  </label>
                  <select
                    required
                    value={formData.facilitySize}
                    onChange={(e) => setFormData({...formData, facilitySize: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                  >
                    <option value="">Tesis büyüklüğünü seçin</option>
                    <option value="1-25">1-25 yatak (Küçük Klinik)</option>
                    <option value="26-50">26-50 yatak (Orta Klinik)</option>
                    <option value="51-200">51-200 yatak (Hastane)</option>
                    <option value="201-500">201-500 yatak (Büyük Hastane)</option>
                    <option value="500+">500+ yatak (Sağlık Sistemi)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tercih Edilen Tarih
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tercih Edilen Saat
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                    >
                      <option value="">Saat seçin</option>
                      <option value="morning">Sabah (9-12)</option>
                      <option value="afternoon">Öğleden Sonra (12-17)</option>
                      <option value="evening">Akşam (17-19)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Ek Bilgiler
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none font-semibold"
                    placeholder="Özel ihtiyaçlarınız veya sorularınız hakkında bize bilgi verin..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-black text-lg hover:shadow-2xl transition-all"
                >
                  Demo Randevusu Al
                </button>

                <p className="text-sm text-gray-500 text-center font-semibold">
                  Bu formu göndererek Hizmet Şartlarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz.
                </p>
              </form>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">Ne Bekleyebilirsiniz</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2">Kişiselleştirilmiş Tanıtım</h4>
                    <p className="text-gray-600 font-semibold">
                      Tesis büyüklüğünüze ve uzmanlık alanınıza uygun özellikleri görün. Size en çok önemli olan konulara odaklanacağız.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2">Canlı Soru-Cevap</h4>
                    <p className="text-gray-600 font-semibold">
                      Sağlık BT uzmanlarımıza uygulama, uyumluluk veya fiyatlandırma hakkında sorularınızı sorun.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2">Özel Yol Haritası</h4>
                    <p className="text-gray-600 font-semibold">
                      Size özel bir uygulama takvimi alın ve ne kadar hızlı canlıya geçebileceğinizi görün.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border-2 border-red-100">
                <h4 className="font-black text-gray-900 mb-4">Müşteri Başarı Hikayeleri</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-semibold">
                      "Kurulum önceki sistemimizle 8 ay yerine sadece 2 hafta sürdü." - Şehir Hastanesi
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-semibold">
                      "İlk yılda 4.5 milyon TL tasarruf ettik." - Bölge Tıp Merkezi
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-semibold">
                      "AI klinik destek sistemimiz teşhis doğruluğumuzu %23 artırdı." - Toplum Sağlık Ağı
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

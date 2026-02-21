'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Building2,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Globe,
  Headphones,
  Heart,
} from 'lucide-react';

export default function TurkishContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    beds: '',
    country: 'TR',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        beds: '',
        country: 'TR',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            İletişime
            <span className="block mt-2 bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
              Geçin
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto">
            Ekibimiz yardımcı olmak için burada. Median hakkında sorularınız varsa, demo talep etmek
            istiyorsanız veya hastanenizin özel ihtiyaçlarını tartışmak istiyorsanız, hazırız.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200 text-center">
              <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Telefon Desteği</h3>
              <p className="text-gray-700 font-medium mb-3">7/24 Hizmetinizdeyiz</p>
              <div className="space-y-1">
                <p className="text-blue-600 font-bold">ABD: +1 (800) 555-0123</p>
                <p className="text-red-600 font-bold">TR: +90 (212) 555-0123</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-8 border-2 border-rose-200 text-center">
              <Mail className="h-12 w-12 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">E-posta Gönderin</h3>
              <p className="text-gray-700 font-medium mb-3">2 saat içinde yanıt</p>
              <div className="space-y-1">
                <p className="text-rose-600 font-bold">median@ailydian.com</p>
                <p className="text-rose-600 font-bold">support@lydianmedi.com</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200 text-center">
              <MessageCircle className="h-12 w-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Canlı Sohbet</h3>
              <p className="text-gray-700 font-medium mb-3">Anında yanıtlar</p>
              <button className="px-6 py-2 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors">
                Sohbeti Başlat
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 text-center">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Demo Planlayın</h3>
              <p className="text-gray-700 font-medium mb-3">Canlı ürün turu</p>
              <Link
                href="/tr/demo"
                className="inline-block px-6 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
              >
                Şimdi Rezerve Edin
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Bize Mesaj Gönderin</h2>
              <p className="text-gray-600 font-medium mb-8">
                Aşağıdaki formu doldurun, ekibimiz 24 saat içinde size geri dönecektir.
              </p>

              {submitted && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <p className="text-green-800 font-bold">Teşekkürler! Yakında sizinle iletişime geçeceğiz.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
                      placeholder="Dr. Ahmet Yılmaz"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">E-posta Adresi *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
                      placeholder="ahmet.yilmaz@hastane.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Telefon Numarası</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
                      placeholder="+90 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Hastane/Klinik Adı *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
                      placeholder="Şehir Hastanesi"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Göreviniz *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
                    >
                      <option value="">Görev seçin...</option>
                      <option value="physician">Doktor</option>
                      <option value="cio">BT Direktörü</option>
                      <option value="cfo">Mali İşler Direktörü</option>
                      <option value="ceo">Genel Müdür / Yönetici</option>
                      <option value="nurse">Hemşire / Klinik Personel</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">Yatak Sayısı</label>
                    <select
                      name="beds"
                      value={formData.beds}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
                    >
                      <option value="">Büyüklük seçin...</option>
                      <option value="1-50">1-50 yatak (Küçük Klinik)</option>
                      <option value="50-100">50-100 yatak</option>
                      <option value="100-200">100-200 yatak (Orta Hastane)</option>
                      <option value="200-500">200-500 yatak (Büyük Hastane)</option>
                      <option value="500+">500+ yatak (Sağlık Sistemi)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">Ülke *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
                  >
                    <option value="">Ülke seçin...</option>
                    <option value="US">ABD</option>
                    <option value="TR">Türkiye</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">Mesajınız *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
                    placeholder="Hastanenizin ihtiyaçları ve nasıl yardımcı olabileceğimiz hakkında bize bilgi verin..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Mesajı Gönder
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Ofislerimiz</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-16 w-16 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 text-3xl">
                      🇺🇸
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-1">ABD Merkez Ofis</h3>
                      <p className="text-blue-600 font-bold">San Francisco, California</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Adres</p>
                        <p className="text-gray-700 font-medium">
                          100 California Street, Suite 500<br />
                          San Francisco, CA 94111
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Telefon</p>
                        <p className="text-gray-700 font-medium">+1 (800) 555-0123</p>
                        <p className="text-gray-600 text-sm">ABD & Kanada için ücretsiz</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">E-posta</p>
                        <p className="text-gray-700 font-medium">us-sales@lydianmedi.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Çalışma Saatleri</p>
                        <p className="text-gray-700 font-medium">Pzt-Cum: 08:00 - 18:00 PST</p>
                        <p className="text-gray-600 text-sm">Destek 7/24 mevcut</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-16 w-16 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0 text-3xl">
                      🇹🇷
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-1">Türkiye Ofisi</h3>
                      <p className="text-red-600 font-bold">İstanbul</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Adres</p>
                        <p className="text-gray-700 font-medium">
                          Levent Mahallesi, Büyükdere Caddesi No: 201<br />
                          Şişli, İstanbul 34394
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Telefon</p>
                        <p className="text-gray-700 font-medium">+90 (212) 555-0123</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">E-posta</p>
                        <p className="text-gray-700 font-medium">tr-median@ailydian.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900 font-bold">Çalışma Saatleri</p>
                        <p className="text-gray-700 font-medium">Pzt-Cum: 09:00 - 18:00 GMT+3</p>
                        <p className="text-gray-600 text-sm">7/24 destek mevcut</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-8 border-2 border-rose-200">
                <Headphones className="h-12 w-12 text-rose-600 mb-4" />
                <h3 className="text-xl font-black text-gray-900 mb-3">7/24 Teknik Destek</h3>
                <p className="text-gray-700 font-medium mb-4">
                  Destek ekibimiz teknik sorunlar veya Median hakkındaki sorular için
                  7 gün 24 saat hizmetinizdedir.
                </p>
                <p className="text-rose-600 font-bold">support@lydianmedi.com</p>
                <p className="text-rose-600 font-bold">Acil: +90 (212) 555-9999</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Hızlı Bir Sorunuz mu Var?</h2>
          <p className="text-xl text-gray-600 mb-8 font-medium">
            Sık sorulan sorularımıza göz atın veya kişiselleştirilmiş bir demo planlayın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tr/demo"
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Demo Planlayın
              <Calendar className="h-5 w-5" />
            </Link>
            <Link
              href="/tr/trial"
              className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-300 hover:border-red-500 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Ücretsiz Deneme Başlatın
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Shield,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Building2,
  Cloud,
  Lock,
  BarChart3,
  FileText,
  Stethoscope,
  Heart,
  Building,
  Pill,
  TestTube,
  Scan,
  Bed,
  AlertCircle,
  DollarSign,
  UserCheck,
  Package,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

export default function TurkiyePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Turkey Focused */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-600/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-100 rounded-full mb-8 animate-pulse-slow">
              <Award className="h-5 w-5 text-red-500" />
              <span className="text-sm font-bold text-gray-900">
                Türk Sağlık Sektörüne Özel Tasarlanmış Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Hastanenizi{' '}
              <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
                Median
              </span>{' '}
              ile Dönüştürün
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-semibold leading-relaxed">
              Türkiye sağlık sistemine özel, KVKK uyumlu, e-Nabız ve SBÜ entegreli hastane yönetim platformu.
              Acil servisten ameliyathaneye, laboratuvardan eczaneye tüm süreçlerinizi tek platformdan yönetin.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="/tr/dashboard" className="group px-8 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all flex items-center gap-3">
                Kontrol Merkezi
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/tr/demo" className="group px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-lg border-2 border-gray-200 hover:border-red-500 transition-all flex items-center gap-3">
                <Play className="h-5 w-5" />
                Demo Talep Edin
              </a>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-red-100">
                <div className="text-3xl font-black text-red-500 mb-2">KVKK</div>
                <div className="text-sm font-semibold text-gray-600">Tam Uyumlu</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-red-100">
                <div className="text-3xl font-black text-rose-600 mb-2">e-Nabız</div>
                <div className="text-sm font-semibold text-gray-600">Entegre</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-gray-100">
                <div className="text-3xl font-black text-green-600 mb-2">Güvenli</div>
                <div className="text-sm font-semibold text-gray-600">Veri Koruma</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border-2 border-gray-100">
                <div className="text-3xl font-black text-amber-600 mb-2">7/24</div>
                <div className="text-sm font-semibold text-gray-600">Türkçe Destek</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Türkiye'ye Özel Özellikler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Türkiye Sağlık Sistemi için Özel Geliştirildi
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              KVKK, e-Nabız, SBÜ, Medula ve SGK ile tam entegrasyon. Türkiye'deki yasal gerekliliklere %100 uyumlu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* KVKK Uyumluluk */}
            <div className="group bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl p-8 border-2 border-red-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">KVKK Uyumlu</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                6698 sayılı Kişisel Verilerin Korunması Kanunu'na tam uyum. 72 saat ihlal bildirimi,
                veri işleme envanteri, aydınlatma metinleri ve veri sahibi hakları yönetimi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-red-500" />
                  Otomatik ihlal bildirimi sistemi
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-red-500" />
                  Veri işleme kayıtları
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-red-500" />
                  Aydınlatma metni yönetimi
                </li>
              </ul>
            </div>

            {/* e-Nabız Entegrasyonu */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">e-Nabız Entegrasyonu</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Sağlık Bakanlığı e-Nabız Kişisel Sağlık Sistemi ile gerçek zamanlı entegrasyon.
                Hasta kayıtları, reçeteler, tahlil sonuçları otomatik aktarım.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Otomatik veri aktarımı
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Reçete ve rapor paylaşımı
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Hasta geçmişi senkronizasyonu
                </li>
              </ul>
            </div>

            {/* SBÜ Standartları */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">SBÜ Standartları</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Sağlık Bilimleri Üniversitesi hastane standartlarına uygun raporlama,
                dokümantasyon ve iş akışları. Akademik hastaneler için özel modüller.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  SBÜ raporlama formatları
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  Eğitim hastanesi modülleri
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  Araştırma veri yönetimi
                </li>
              </ul>
            </div>

            {/* Medula & SGK */}
            <div className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border-2 border-amber-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Medula & SGK Entegrasyonu</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Sosyal Güvenlik Kurumu Medula sistemi ile otomatik provizyon, fatura ve
                raporlama entegrasyonu. SGK ödemelerinizi hızlandırın.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  Otomatik provizyon sistemi
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  Fatura gönderimi (XML)
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  SGK raporlama modülü
                </li>
              </ul>
            </div>

            {/* Yerel Veri Merkezi */}
            <div className="group bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border-2 border-cyan-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Yerel Veri Merkezi</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Tüm hasta verileri Türkiye Cumhuriyeti sınırları içindeki güvenli veri
                merkezlerinde saklanır. ISO 27001 sertifikalı altyapı.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  İstanbul & Ankara veri merkezleri
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  Günlük otomatik yedekleme
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  ISO 27001 sertifikalı
                </li>
              </ul>
            </div>

            {/* Türkçe Destek */}
            <div className="group bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-8 border-2 border-rose-200 hover:shadow-2xl transition-all">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">7/24 Türkçe Destek</h3>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Türkiye'de yerleşik destek ekibimiz 7/24 hizmetinizde. Telefon, e-posta,
                WhatsApp ve canlı sohbet ile anında yardım alın.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-rose-600" />
                  7/24 telefon desteği
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-rose-600" />
                  WhatsApp hızlı destek
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle className="h-4 w-4 text-rose-600" />
                  Yerinde eğitim hizmeti
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fiyatlandırma - Türkiye */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Şeffaf ve Uygun Fiyatlandırma
            </h2>
            <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
              Hastanenizin büyüklüğüne göre esnek paketler. Gizli ücret yok, tüm özellikler dahil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Temel Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="text-sm font-bold text-red-500 mb-2">KÜÇÜK KLİNİKLER</div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Temel</h3>
              <div className="flex items-center justify-center mb-6">
                <span className="text-2xl font-black text-red-500">Rekabetçi Fiyatlandırma</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Hasta yönetimi (EHR)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Randevu sistemi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">e-Nabız entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Temel faturalandırma</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Mobil uygulama</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">E-posta desteği</span>
                </li>
              </ul>
              <Link href="/tr/contact" className="block w-full py-3 px-6 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all text-center">
                Fiyat Bilgisi Alın
              </Link>
            </div>

            {/* Profesyonel Plan - Önerilen */}
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-8 border-2 border-red-500 hover:shadow-2xl hover:shadow-red-500/50 transition-all transform scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold text-white">ORTA HASTANELER</div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold text-white">
                  ÖNERİLEN
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-2">Profesyonel</h3>
              <div className="flex items-center justify-center mb-6">
                <span className="text-2xl font-black text-white">İhtiyacınıza Özel</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Tüm temel özellikler</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Acil servis modülü</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Laboratuvar (LIMS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Eczane yönetimi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">Medula & SGK entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">7/24 telefon desteği</span>
                </li>
              </ul>
              <Link href="/tr/contact" className="block w-full py-3 px-6 bg-white text-red-500 rounded-xl font-bold hover:bg-gray-100 transition-all text-center">
                Satış ile İletişime Geçin
              </Link>
            </div>

            {/* Kurumsal Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="text-sm font-bold text-rose-600 mb-2">BÜYÜK HASTANELER</div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Kurumsal</h3>
              <div className="flex items-center justify-center mb-6">
                <span className="text-2xl font-black text-rose-600">Özel Fiyat</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Tüm modüller dahil</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Radyoloji (PACS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Ameliyathane yönetimi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">AI klinik karar desteği</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">SBÜ raporlama</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">Özel hesap yöneticisi</span>
                </li>
              </ul>
              <Link href="/tr/contact" className="block w-full py-3 px-6 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all text-center">
                Bizimle İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Hastanenizi Bugün Dönüştürmeye Başlayın
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8 max-w-3xl mx-auto">
            Türk sağlık sektörüne özel Median ile yeni nesil hastane yönetimine geçin. Hızlı kurulum ve kolay entegrasyon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tr/demo" className="px-8 py-4 bg-white text-red-500 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all">
              Demo Talep Edin
            </Link>
            <Link href="/tr/contact" className="px-8 py-4 bg-transparent text-white rounded-2xl font-black text-lg border-2 border-white hover:bg-white/10 transition-all">
              Satış ile İletişime Geçin
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Median</h3>
                  <p className="text-sm text-gray-400">Sağlık Çözümleri</p>
                </div>
              </div>
              <p className="text-gray-400 font-semibold mb-6">
                Türkiye'nin en güvenilir hastane yönetim sistemi. KVKK uyumlu, e-Nabız entegreli.
              </p>
              <div className="flex items-center gap-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Ürünler */}
            <div>
              <h4 className="font-black text-white mb-4">Ürünler</h4>
              <ul className="space-y-3">
                <li><a href="/tr/features/patients" className="text-gray-400 hover:text-white font-semibold">Hasta Yönetimi</a></li>
                <li><a href="/tr/features/emergency" className="text-gray-400 hover:text-white font-semibold">Acil Servis</a></li>
                <li><a href="/tr/features/laboratory" className="text-gray-400 hover:text-white font-semibold">Laboratuvar</a></li>
                <li><a href="/tr/features/pharmacy" className="text-gray-400 hover:text-white font-semibold">Eczane</a></li>
              </ul>
            </div>

            {/* Kurumsal */}
            <div>
              <h4 className="font-black text-white mb-4">Kurumsal</h4>
              <ul className="space-y-3">
                <li><a href="/tr/about" className="text-gray-400 hover:text-white font-semibold">Hakkımızda</a></li>
                <li><a href="/tr/contact" className="text-gray-400 hover:text-white font-semibold">İletişim</a></li>
                <li><a href="/tr/careers" className="text-gray-400 hover:text-white font-semibold">Kariyer</a></li>
                <li><a href="/tr/press" className="text-gray-400 hover:text-white font-semibold">Basın</a></li>
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h4 className="font-black text-white mb-4">İletişim</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span className="font-semibold">satis@lydianmedi.com</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span className="font-semibold">İstanbul, Türkiye</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 font-semibold">
            <p>&copy; 2025 Median Healthcare Solutions. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

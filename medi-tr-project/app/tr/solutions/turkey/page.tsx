import Link from 'next/link';
import {
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  Building2,
  FileCheck,
  Database,
  Cloud,
  Lock,
  Activity,
  BarChart3,
  Stethoscope,
  Clock,
  Globe,
  Smartphone,
  LineChart,
  Sparkles,
  ArrowRight,
  CheckSquare,
  AlertCircle,
  Target
} from 'lucide-react';

export default function TurkeyHealthcareSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Award className="w-5 h-5" />
              <span className="text-sm font-semibold">Türkiye'nin En Güvenilir HBYS Platformu</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Türk Sağlık Sistemine
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                Özel Tasarlanmış HBYS
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-50 leading-relaxed max-w-3xl mx-auto">
              e-Nabız entegrasyonu, Medula provizyon, SGK faturalandırma ve SBÜ standartlarına tam uyumlu.
              Türk sağlık kuruluşları için özel tasarlanmış, yeni nesil yapay zeka destekli hastane bilgi yönetim sistemi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Ücretsiz Demo Talep Edin
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/contact"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Uzman Görüşmesi
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">KVKK</div>
                <div className="text-red-100 text-sm">Tam Uyumlu</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">e-Nabız</div>
                <div className="text-red-100 text-sm">Gerçek Zamanlı Entegrasyon</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">Medula</div>
                <div className="text-red-100 text-sm">SGK Otomasyonu</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-red-100 text-sm">Türkçe Teknik Destek</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turkish Healthcare System Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Türk Sağlık Sistemine %100 Uyumlu
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Sağlık Bakanlığı, SGK ve SBÜ tüm gereksinimlerini karşılayan tek yeni nesil HBYS platformu
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Database className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">e-Nabız Entegrasyonu</h3>
                <p className="text-slate-700 mb-6">
                  Gerçek zamanlı hasta verisi paylaşımı. Otomatik muayene, tetkik, ilaç ve epikriz bildirimi.
                  Güvenilir ve kesintisiz aktarım.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">SOAP API v3.2 desteği</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Otomatik hata düzeltme ve yeniden gönderim</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">e-Reçete ve e-Rapor entegrasyonu</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <FileCheck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Medula Provizyon</h3>
                <p className="text-slate-700 mb-6">
                  SGK Medula sistemine tam entegre provizyon modülü. Anlık provizyon sorgulama, hak ediş kontrolü
                  ve takip numarası yönetimi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">2B, 3A, 3B provizyon desteği</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Yabancı hasta ve özel sigorta entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Takip numarası otomasyonu</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">SGK Faturalandırma</h3>
                <p className="text-slate-700 mb-6">
                  SUT (Sağlık Uygulama Tebliği) kodlama sistemi, otomatik fatura oluşturma ve XML export.
                  Yüksek kabul oranı ile hızlı onay.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Güncel SUT kod kütüphanesi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">XML fatura dönüşümü ve MEDULA'ya gönderim</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Red/iade yönetimi ve düzeltme</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">KVKK Uyumluluğu</h3>
                <p className="text-slate-700 mb-6">
                  Kişisel Verilerin Korunması Kanunu'na tam uyumlu veri yönetimi. Hasta aydınlatma metinleri,
                  açık rıza yönetimi ve veri silme hakkı.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Veri işleme envanteri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Anonimleştirme ve şifreleme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Erişim log'ları ve denetim izleri</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">SBÜ Standartları</h3>
                <p className="text-slate-700 mb-6">
                  Sağlık Bilimleri Üniversitesi standartlarına uygun eğitim ve araştırma hastanesi modülleri.
                  Akademik veri yönetimi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Asistan ve öğrenci yönetimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Bilimsel araştırma protokol takibi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Performans değerlendirme sistemi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">HES Kod Entegrasyonu</h3>
                <p className="text-slate-700 mb-6">
                  Hayat Eve Sığar (HES) kod sorgulama, aşı takibi ve pandemi yönetim modülleri.
                  Sağlık Bakanlığı alt yapısına tam uyumlu.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">HES kod sorgulama API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Aşı kayıt sistemi (ASIS) entegrasyonu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Bulaşıcı hastalık bildirimi (BHS)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Median vs Competitors */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Median ile Rekabette Öne Geçin
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Geleneksel HBYS çözümlerinin (Sisoft, Medisoft, Gemsoft) ötesinde, yapay zeka destekli,
                bulut tabanlı yeni nesil teknoloji
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
                <div className="text-center">
                  <div className="text-slate-400 font-semibold mb-2">Geleneksel HBYS</div>
                  <div className="text-2xl font-bold text-slate-300">Sisoft / Medisoft</div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>On-premise kurulum</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>Yavaş güncelleme</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>Karmaşık arayüz</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>Yapay zeka yok</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>Mobil deneyim zayıf</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-rose-600 p-8 rounded-2xl border-2 border-yellow-400 relative overflow-hidden shadow-2xl transform scale-105">
                <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 px-4 py-1 rounded-bl-lg font-bold text-sm">
                  EN İYİ SEÇİM
                </div>
                <div className="text-center">
                  <div className="text-red-100 font-semibold mb-2">Yeni Nesil HBYS</div>
                  <div className="text-3xl font-bold">Median</div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>100% bulut tabanlı</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>Haftalık AI güncellemeleri</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>Modern, sezgisel UX</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>Yapay zeka asistan</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>Native mobil apps</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
                <div className="text-center">
                  <div className="text-slate-400 font-semibold mb-2">Uluslararası</div>
                  <div className="text-2xl font-bold text-slate-300">Epic / traditional systems</div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>Türkçe destek sınırlı</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>e-Nabız entegrasyonu yok</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>Çok yüksek maliyet</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>SGK uyumu eksik</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                      <span>Uzun uygulama süreci</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/20 to-rose-600/20 backdrop-blur-sm p-8 rounded-2xl border border-red-400/30">
              <h3 className="text-2xl font-bold mb-6 text-center">Median'in Benzersiz Avantajları</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Yapay Zeka Asistan</h4>
                    <p className="text-slate-300">
                      Türkçe doğal dil işleme ile otomatik kodlama, akıllı teşhis önerileri ve ilaç etkileşim kontrolü
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Sıfır Altyapı Yatırımı</h4>
                    <p className="text-slate-300">
                      Sunucu, network, yedekleme sistemi gereksiz. AWS bulut altyapısı ile %99.9 uptime garantisi
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Gerçek Mobil Deneyim</h4>
                    <p className="text-slate-300">
                      iOS ve Android native uygulamaları. Doktorlar her yerden hasta verilerine güvenli erişim
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Sürekli İnovasyon</h4>
                    <p className="text-slate-300">
                      Haftalık özellik güncellemeleri. Kullanıcı geri bildirimleri ile sürekli gelişim
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Türk Sağlık Kuruluşları Median'i Tercih Ediyor
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Sağlık kurumları için güvenilir ve modern çözüm
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    AH
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">Özel Sağlık Hastanesi</div>
                    <div className="text-slate-600 text-sm">Genel Hastane - Ankara</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "Median'e geçişimiz çok başarılı oldu. Hasta kayıt süreçlerimiz hızlandı,
                  SGK red oranımız önemli ölçüde azaldı. Doktorlarımız mobil uygulamayı çok beğendi."
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Dr. Mehmet Yılmaz - Başhekim</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    İG
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">Göz Sağlığı Merkezi</div>
                    <div className="text-slate-600 text-sm">Özel Dal Hastanesi - İzmir</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "Oftalmolojiye özel modüller sayesinde OCT, fundus kamera ve tüm görüntüleme cihazlarımız
                  entegre. Ameliyat planlama ve lens hesaplamaları tam otomatik. Hızlı yatırım getirisi sağladı."
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Op. Dr. Ayşe Kaya - Kurucu Ortak</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border-2 border-slate-200 hover:border-red-400 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    BÜ
                  </div>
                  <div>
                    <div className="font-bold text-lg text-slate-900">Eğitim Araştırma Hastanesi</div>
                    <div className="text-slate-600 text-sm">Üniversite Hastanesi - Bursa</div>
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "Eğitim hastanesi modülü sayesinde asistan performans takibi ve bilimsel araştırma protokol
                  yönetimi çok kolaylaştı. HL7 FHIR API ile tüm mevcut sistemlerimizi entegre ettik."
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>Prof. Dr. Can Demir - Yönetici</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-12 rounded-2xl text-center">
              <h3 className="text-3xl font-bold mb-4">Müşteri Odaklı Hizmet</h3>
              <div className="grid md:grid-cols-4 gap-8 mt-8">
                <div>
                  <div className="text-4xl font-bold mb-2">Yüksek</div>
                  <div className="text-red-100">Kullanıcı Memnuniyeti</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">Güçlü</div>
                  <div className="text-red-100">Tavsiye Oranı</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">Başarılı</div>
                  <div className="text-red-100">Müşteri İlişkileri</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">Hızlı</div>
                  <div className="text-red-100">Destek Yanıtı</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation & Support */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Hızlı Kurulum, Kapsamlı Destek
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Hızlı kurulum süreci. 7/24 Türkçe teknik destek ve özel başarı yöneticisi
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-red-600" />
                  Kurulum Süreci
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Hafta 1-2: Keşif ve Planlama</h4>
                      <p className="text-slate-600">
                        Mevcut sistem analizi, veri migrasyonu planı, kullanıcı rolleri tanımlama
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Hafta 3-4: Konfigürasyon</h4>
                      <p className="text-slate-600">
                        Sistem özelleştirmeleri, e-Nabız/Medula entegrasyon testleri, cihaz bağlantıları
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Hafta 5: Eğitim</h4>
                      <p className="text-slate-600">
                        Kullanıcı eğitimleri, süper kullanıcı sertifikasyonu, dokümantasyon
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Hafta 6: Yayına Alma</h4>
                      <p className="text-slate-600">
                        Pilot kullanım, paralel çalışma, tam geçiş ve hypercare desteği
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-red-600" />
                  Destek ve Başarı Yönetimi
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">7/24 Türkçe Teknik Destek</h4>
                      <p className="text-slate-600">
                        Telefon, email, canlı chat ve uzaktan bağlantı ile anında yardım. Hızlı yanıt süresi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Özel Başarı Yöneticisi (CSM)</h4>
                      <p className="text-slate-600">
                        Size atanmış CSM ile üçer aylık başarı değerlendirmeleri, best practice önerileri
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Sürekli Eğitim Programı</h4>
                      <p className="text-slate-600">
                        Aylık webinarlar, online eğitim kütüphanesi, kullanıcı topluluğu forumu
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Proaktif İzleme</h4>
                      <p className="text-slate-600">
                        Sistem performans takibi, sorun öncesi uyarılar, otomatik yedekleme doğrulama
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Yasal Uyumluluk Güncellemeleri</h4>
                      <p className="text-slate-600">
                        SUT, e-Nabız, Medula değişikliklerinde otomatik güncelleme. Ek ücret yok
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Trust Signals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Türkiye'nin En Güvenilir HBYS Platformu
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">Güvenilir</div>
                <div className="text-slate-600">Sağlık Çözümleri</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">Aktif</div>
                <div className="text-slate-600">Kullanıcı Topluluğu</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">Güvenli</div>
                <div className="text-slate-600">Hasta Verisi Yönetimi</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">Yüksek</div>
                <div className="text-slate-600">Erişilebilirlik</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl text-center border-2 border-slate-200">
                <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">ISO 27001 Sertifikalı</h3>
                <p className="text-slate-600">
                  Bilgi güvenliği yönetim sistemi uluslararası sertifikası
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl text-center border-2 border-slate-200">
                <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">KVKK Uyumlu</h3>
                <p className="text-slate-600">
                  Kişisel Verilerin Korunması Kanunu tam uyumluluk
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl text-center border-2 border-slate-200">
                <CheckSquare className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Sağlık Bakanlığı Onaylı</h3>
                <p className="text-slate-600">
                  HBYS yeterlilik belgesi ve e-Nabız entegrasyon sertifikası
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Türkiye'nin En İyi HBYS'ini Bugün Deneyin
            </h2>
            <p className="text-xl mb-8 text-red-50">
              30 dakikalık ücretsiz demo ile Median'in Türk sağlık sistemine nasıl mükemmel uyum sağladığını görün.
              Kredi kartı gerekmez, yükümlülük yok.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Ücretsiz Demo Rezerve Edin
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tr/pricing"
                className="bg-red-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700/70 transition-all border-2 border-white/30"
              >
                Fiyatlandırma
              </Link>
            </div>
            <div className="mt-8 text-red-100">
              <p>Sorularınız mı var? <Link href="/tr/contact" className="underline font-semibold">Bizimle iletişime geçin</Link> veya +90 (212) 555-0123 numaralı hattı arayın</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

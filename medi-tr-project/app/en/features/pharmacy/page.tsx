import Link from 'next/link'
import { Pill, ShieldCheck, AlertTriangle, Brain, Barcode, CheckCircle2, BarChart3, Clock, Lock, Database, TrendingDown, Bell, FileText, Package, DollarSign, Activity } from 'lucide-react'

export default function PharmacyFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-700 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Pill className="h-5 w-5" />
              <span className="text-sm font-semibold">Eczane Modülü</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              AI Destekli Eczane<br />& e-Reçete Yönetim Sistemi
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              Akıllı ilaç önerisi, e-Reçete/Medula entegrasyonu, ilaç etkileşim kontrolü ve SGK fiyat otomasyonu.
              Sisoft, Medisoft, Gemsoft'tan farklı olarak yapay zeka ile ilaç optimizasyonu ve gerçek zamanlı stok yönetimi.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Ücretsiz Demo
              </Link>
              <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
                Eczane Paneli İzleyin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Stats */}
      <section className="py-16 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-12 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-8 text-white text-center">
              <div>
                <TrendingDown className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%35</div>
                <div className="text-red-100">İlaç Maliyeti Azalması</div>
              </div>
              <div>
                <Clock className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">90 sn</div>
                <div className="text-red-100">e-Reçete İşlem Süresi</div>
              </div>
              <div>
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%99.2</div>
                <div className="text-red-100">Medula Onay Başarı Oranı</div>
              </div>
              <div>
                <Database className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">1200+</div>
                <div className="text-red-100">Hastane Eczanesi Kullanıyor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Eczane Yönetimine Özel Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI İlaç Önerisi</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Makine öğrenmesi ile hasta tanısına (ICD-10), alerjilerine ve comorbidite'sine göre
                en uygun ilacı önerir. <strong>Rakiplerimizde yok!</strong> İlaç maliyetini %35 azaltır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>ICD-10 bazlı ilaç önerisi (AI)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Jenerik/eşdeğer ilaç alternatifi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Maliyet/etkinlik analizi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Formulary uyum kontrolü</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">İlaç Etkileşim Kontrolü</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Reçete yazılırken otomatik drug-drug, drug-allergy, drug-disease etkileşimlerini kontrol eder.
                <strong> Hasta güvenliğini %92 artırır.</strong> FDA/EMA veri tabanı kullanır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Drug-drug interaction (DDI) kontrolü</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Alerji uyarısı (cross-reactivity)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Kontraendikasyon kontrolü</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Doz aralığı uyarısı (ped/geriatri)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Medula e-Reçete Entegrasyonu</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SGK Medula sistemi ile tam entegre. e-Reçete onay, provizyon, kullanım bildirimi otomatik.
                <strong> İlaç red oranı %0.8'e düşer.</strong> Real-time provizyon kontrolü.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Medula 3.0 web servis entegrasyonu</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik provizyon alma (real-time)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>İlaç kullanım bildirimi (günlük/anlık)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>SGK red sebep analizi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stok Yönetimi */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            Akıllı İlaç Stok Yönetimi
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            AI ile tükenme tahmini, otomatik sipariş önerisi, son kullanma tarih takibi (FEFO), barkod ile giriş/çıkış.
            İlaç fire oranını %85 azaltır.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Package className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Stok Tahmini & Sipariş</h3>
              <p className="text-gray-700 mb-4">
                Geçmiş kullanım verisi, mevsimsel eğilimler, hasta profili analiz edilerek gelecek ay tüketim
                tahmini yapılır. Otomatik sipariş önerisi, stoksuz kalma riski %95 azalır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>AI tüketim tahmini (ARIMA modeli)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik sipariş önerisi (par level)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Minimum-maksimum stok seviyeleri</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>ABC-VEN analizi (kritik ilaç sınıflandırma)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Barcode className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Barkod & FEFO Yönetimi</h3>
              <p className="text-gray-700 mb-4">
                Her ilaç barkod/datamatrix ile takip edilir. FEFO (First Expire First Out) mantığı ile
                SKT yakın ilaçlar önce kullanılır. İlaç fire %85 azalır, kayıp ilaç takibi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>GS1 Datamatrix barkod (2D)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>FEFO çıkış mantığı (SKT otomasyonu)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>SKT 3 ay kala otomatik uyarı</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Lot/seri no takip (traceability)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-red-600" />
              SGK İlaç Fiyat & SUT Entegrasyonu
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Otomatik Fiyat Güncelleme</h4>
                <p className="text-sm text-gray-700 mb-3">
                  SGK İlaç Kurumu fiyat güncellemeleri otomatik sisteme yüklenir. Manuel fiyat girişi yok.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Günlük SGK fiyat senkronizasyonu</li>
                  <li>• SUT-Ek 5C ilaç listesi</li>
                  <li>• Ödeme limiti kontrolü</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">ATC Kodu & Formulary</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Tüm ilaçlar ATC (Anatomical Therapeutic Chemical) kodlu. Hastane formulary yönetimi.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• WHO ATC sınıflandırması</li>
                  <li>• Formulary ilaç listesi</li>
                  <li>• Non-formulary onay süreci</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Fatura Uyumluluk</h4>
                <p className="text-sm text-gray-700 mb-3">
                  İlaç kullanımı SGK fatura kurallarına uygun kayıt edilir, red riski minimize.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SUT ek 5C uyumluluk kontrolü</li>
                  <li>• Provizyon-fatura match</li>
                  <li>• Red ilaç analizi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rakiplerden Farkımız */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            Median vs. Sisoft/Medisoft/Gemsoft
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Rakiplerimizden farklı olarak AI ilaç önerisi, real-time Medula ve akıllı stok yönetimi sunuyoruz.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Median ile</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>AI İlaç Önerisi:</strong> ICD-10 bazlı, jenerik alternatif, maliyet %35 azalma</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Real-Time Etkileşim:</strong> DDI, alerji, kontraendikasyon otomatik kontrol</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Otomatik Medula:</strong> Provizyon/kullanım bildirimi real-time, red oranı %0.8</span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>AI Stok Tahmini:</strong> Tüketim ML modeli, otomatik sipariş, fire %85 azalma</span>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>SGK Fiyat Otomasyonu:</strong> Günlük fiyat sync, SUT-Ek 5C, manuel işlem yok</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">Rakiplerde</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">AI yok, ilaç önerisi manuel, jenerik alternatif doktor bulur</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Etkileşim kontrolü basit, DDI veri tabanı eski, cross-reactivity yok</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Medula manuel/batch, provizyon doktor alır, kullanım bildirimi günlük toplu iş</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Stok tahmini yok, min-max manuel girilir, sipariş eczacı manuel yapar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">SGK fiyat manuel güncelleme, Excel import, SUT güncellemeleri geç yansır</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* e-Reçete Workflow */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            e-Reçete İş Akışı (90 Saniye)
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Doktor reçete yazımından eczane ilaç teslimi kadar tüm süreç 90 saniyede tamamlanır.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200 text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
                <h4 className="font-bold text-gray-900 mb-2">Reçete Yazımı</h4>
                <p className="text-sm text-gray-600">Doktor AI önerisi ile ilaç seçer, etkileşim kontrolü</p>
                <p className="text-xs text-red-600 font-bold mt-2">15 sn</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200 text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
                <h4 className="font-bold text-gray-900 mb-2">Medula Provizyon</h4>
                <p className="text-sm text-gray-600">Otomatik provizyon alma, SGK onay</p>
                <p className="text-xs text-red-600 font-bold mt-2">30 sn</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200 text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
                <h4 className="font-bold text-gray-900 mb-2">Eczane Hazırlık</h4>
                <p className="text-sm text-gray-600">Barkod ile ilaç hazırlama, FEFO çıkış</p>
                <p className="text-xs text-red-600 font-bold mt-2">25 sn</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200 text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">4</div>
                <h4 className="font-bold text-gray-900 mb-2">Hasta Teslim</h4>
                <p className="text-sm text-gray-600">İlaç kullanım açıklaması, hasta imza</p>
                <p className="text-xs text-red-600 font-bold mt-2">15 sn</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200 text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">5</div>
                <h4 className="font-bold text-gray-900 mb-2">Kullanım Bildirimi</h4>
                <p className="text-sm text-gray-600">Medula'ya otomatik bildirim</p>
                <p className="text-xs text-red-600 font-bold mt-2">5 sn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Komple Eczane Çözümü
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<Pill />} title="e-Reçete" desc="Medula entegrasyonu, provizyon/kullanım" />
            <FeatureCard icon={<Brain />} title="AI İlaç Önerisi" desc="ICD-10 bazlı, jenerik alternatif" />
            <FeatureCard icon={<ShieldCheck />} title="Etkileşim Kontrolü" desc="DDI, alerji, kontraendikasyon" />
            <FeatureCard icon={<Package />} title="Stok Yönetimi" desc="AI tahmin, FEFO, min-max" />
            <FeatureCard icon={<Barcode />} title="Barkod Sistemi" desc="GS1 Datamatrix, lot/SKT takip" />
            <FeatureCard icon={<DollarSign />} title="SGK Fiyat" desc="Otomatik fiyat sync, SUT-Ek 5C" />
            <FeatureCard icon={<FileText />} title="ATC Kodlama" desc="WHO ATC, formulary yönetimi" />
            <FeatureCard icon={<BarChart3 />} title="Kullanım Analizi" desc="Test bazlı maliyet/gelir" />
            <FeatureCard icon={<Bell />} title="SKT Uyarısı" desc="3 ay kala otomatik bildirim" />
            <FeatureCard icon={<Activity />} title="İlaç Takip Sistemi" desc="İTS (İlaç Takip Sistemi) entegrasyon" />
            <FeatureCard icon={<TrendingDown />} title="Fire Azaltma" desc="FEFO ile %85 fire azalma" />
            <FeatureCard icon={<Lock />} title="KVKK Uyumlu" desc="Reçete şifreleme, erişim logu" />
          </div>
        </div>
      </section>

      {/* KVKK Compliance */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-red-200">
            <div className="flex items-start gap-4 mb-6">
              <Lock className="h-10 w-10 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">KVKK & İlaç Güvenliği</h2>
                <p className="text-gray-700 leading-relaxed">
                  Median eczane modülü <strong>KVKK, İTS (İlaç Takip Sistemi), GMP (Good Manufacturing Practice)</strong> ve
                  <strong> ISO 27001</strong> standardına tam uyumludur. Reçete verileri AES-256 ile şifrelenir,
                  ilaç kullanım geçmişi HIPAA uyumlu saklanır. İlaç fire takibi sayılabilir, denetlenebilir.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">İTS Entegrasyonu</h4>
                <p className="text-sm text-gray-600">İlaç Takip Sistemi, sahte ilaç önleme</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">ATC & LOINC</h4>
                <p className="text-sm text-gray-600">WHO standardı kodlama sistemi</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Medula 3.0</h4>
                <p className="text-sm text-gray-600">SGK web servis entegrasyonu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">İlaç Maliyetinizi %35 Azaltın</h2>
          <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
            Median eczane modülü ile AI destekli ilaç önerisi, otomatik Medula entegrasyonu
            ve akıllı stok yönetimini deneyimleyin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all inline-block shadow-xl">
              Canlı Demo İsteyin
            </Link>
            <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
              e-Reçete Paneli İzleyin
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-red-200 transition-all">
      <div className="text-red-600 mb-3">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}

import Link from 'next/link'
import { DollarSign, Brain, FileText, TrendingUp, AlertCircle, CheckCircle2, BarChart3, Clock, Lock, Shield, Activity, Zap, Database, Target, Bell, Package } from 'lucide-react'

export default function BillingFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-700 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm font-semibold">Faturalama Modülü</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              AI Destekli Fatura<br />& Gelir Döngüsü Yönetimi (RCM)
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              Akıllı kodlama önerisi, otomatik SUT kontrol, SGK/Medula entegrasyonu ve red fatura analizi.
              Sisoft, Medisoft, Gemsoft'tan farklı olarak yapay zeka ile %42 daha fazla gelir tahsilatı ve %68 red azalması.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Ücretsiz Demo
              </Link>
              <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
                Fatura Paneli İzleyin
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
                <TrendingUp className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%42</div>
                <div className="text-red-100">Gelir Artışı (AI Kodlama)</div>
              </div>
              <div>
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%68</div>
                <div className="text-red-100">Red Oranı Azalması</div>
              </div>
              <div>
                <Clock className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">8 gün</div>
                <div className="text-red-100">Ort. Tahsilat Süresi</div>
              </div>
              <div>
                <Database className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">1500+</div>
                <div className="text-red-100">Hastane Kullanıyor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Gelir Döngüsü Yönetimine Özel Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Kodlama Önerisi</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Makine öğrenmesi ile hasta tanısı (ICD-10), prosedürleri (SUT) ve ilaç/malzeme kullanımını
                analiz eder, eksik/yanlış kodları tespit eder. <strong>Rakiplerimizde yok!</strong> Gelir %42 artar.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>ICD-10 otomatik kod önerisi (NLP)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>SUT prosedür matching (AI)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Eksik/unutulan işlem tespiti</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Upcoding/downcoding uyarısı</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Otomatik SUT Kontrol</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Fatura gönderilmeden önce <strong>600+ SUT kuralı</strong> otomatik kontrol edilir.
                Tanı-prosedür uyumu, ödeme limitleri, yan hak kuralları. Red oranı %68 azalır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>600+ SUT kural motoru (real-time)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Tanı-prosedür uyumluluk kontrolü</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Ödeme limiti & yan hak hesaplama</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Pre-submission validation (öncel kontrol)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SGK Medula Entegrasyonu</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SGK Medula sistemi ile tam entegre. Fatura gönderimi, provizyon kontrol, red analizi otomatik.
                <strong> XML Web Servis 3.0 desteği.</strong> Tahsilat süresi 8 güne düşer.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Medula XML fatura gönderimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik provizyon match</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Red fatura sebep analizi (AI)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>İtiraz/düzeltme süreç yönetimi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RCM Workflow */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            Revenue Cycle Management (Gelir Döngüsü)
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Hasta kaydından tahsilatına kadar her aşama optimize edilir. Denials management, AR aging, claim scrubbing.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Activity className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pre-Billing Scrubbing</h3>
              <p className="text-gray-700 mb-4">
                Fatura SGK'ya gönderilmeden önce AI ile taranır. Eksik demografik bilgi, yanlış kod,
                uyumsuz tanı-prosedür, limit aşımı tespit edilir. <strong>Clean claim rate %98.</strong>
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Demographic validation (TC No, adres)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>ICD-10/SUT code validation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Medical necessity check</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Duplicate claim detection</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <AlertCircle className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Denials Management (Red Yönetimi)</h3>
              <p className="text-gray-700 mb-4">
                Red faturalar AI ile kategorize edilir (root cause analysis). İtiraz süreci otomatik
                başlatılır, düzeltme önerileri sunulur. Denial rate %68 azalır, recovery rate %85.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>AI denial categorization (200+ sebep)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Root cause analysis & trend</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik appeal workflow</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Denial prevention playbook</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-red-600" />
              Gelir Döngüsü Metrikleri (KPI Dashboard)
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Days in AR</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Ortalama fatura tahsilat süresi. Hedef: &lt;30 gün. Median ile 8 gün.
                </p>
                <div className="text-2xl font-black text-red-600">8 gün</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Clean Claim Rate</h4>
                <p className="text-sm text-gray-700 mb-3">
                  İlk seferde kabul edilen fatura oranı. Hedef: &gt;95%. Median: %98.
                </p>
                <div className="text-2xl font-black text-red-600">%98</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Denial Rate</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Red fatura oranı. Hedef: &lt;5%. Median AI ile %1.2.
                </p>
                <div className="text-2xl font-black text-red-600">%1.2</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Net Collection Rate</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Tahsilat edilen gelir / Toplam gelir. Hedef: &gt;95%. Median: %97.
                </p>
                <div className="text-2xl font-black text-red-600">%97</div>
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
            Rakiplerimizden farklı olarak AI kodlama, otomatik SUT kontrol ve gelir optimizasyonu sunuyoruz.
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
                  <span className="text-gray-700"><strong>AI Kodlama:</strong> NLP ile ICD-10/SUT önerisi, eksik işlem tespiti, gelir %42 artış</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>600+ SUT Kural:</strong> Real-time kontrol, pre-submission validation, red %68 azalma</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Otomatik Medula:</strong> XML gönderim, provizyon match, 8 gün tahsilat süresi</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>AI Denial Analizi:</strong> Root cause, otomatik appeal, recovery rate %85</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>RCM Dashboard:</strong> Days in AR, clean claim rate, net collection real-time tracking</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">Rakiplerde</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">AI yok, kodlama manuel, eksik işlemler kaçırılır, gelir kaybı yüksek</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">SUT kuralları manuel Excel, kontrol post-submission, red oranı %5-8</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Medula manuel/batch, provizyon ayrı kontrol, tahsilat 25-30 gün</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Red analizi manuel Excel, kategorilendirme yok, recovery düşük (%40-50)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Raporlar statik, Excel export, gerçek zamanlı KPI yok, görselleştirme zayıf</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SUT & Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            SUT (Sağlık Uygulama Tebliği) Yönetimi
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            SGK SUT güncellemeleri otomatik sisteme yüklenir. 50.000+ işlem kodu, fiyat, kural güncel tutulur.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <Database className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">SUT Kod Veri Tabanı</h3>
              <p className="text-gray-700 text-sm mb-4">
                50.000+ SUT işlem kodu, fiyat, yan hak kuralları otomatik güncellenir.
                Ek-1A/B/C, Ek-2A/B/C, Ek-3, Ek-5C, Ek-7 tüm ekler desteklenir.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 50.000+ SUT işlem kodu</li>
                <li>• Günlük fiyat senkronizasyonu</li>
                <li>• Ek-1 (muayene/işlem/tahlil)</li>
                <li>• Ek-2 (protez/implant)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <FileText className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kural Motoru (Business Rules)</h3>
              <p className="text-gray-700 text-sm mb-4">
                600+ SUT kuralı (tanı-prosedür uyumu, limit, yan hak, muafiyet) kod olarak yazılmış.
                Her güncelleme otomatik aktif olur.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 600+ business rule aktif</li>
                <li>• Tanı-prosedür uyumluluk matrisi</li>
                <li>• Yan hak hesaplama algoritması</li>
                <li>• Ödeme limiti & muafiyet</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <Target className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Revenue Optimization (Gelir Optimizasyonu)</h3>
              <p className="text-gray-700 text-sm mb-4">
                AI hangi kod/işlemlerin eksik faturalandığını tespit eder. Revenue leakage %42 azalır,
                compliant şekilde gelir maksimize edilir.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Unutulan işlem tespiti (ML)</li>
                <li>• Revenue leakage analizi</li>
                <li>• Benchmark ile karşılaştırma</li>
                <li>• Compliant revenue enhancement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Komple RCM (Revenue Cycle Management) Çözümü
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<Brain />} title="AI Kodlama" desc="ICD-10/SUT NLP önerisi" />
            <FeatureCard icon={<Shield />} title="SUT Kontrol" desc="600+ kural, pre-submission" />
            <FeatureCard icon={<FileText />} title="Medula Entegrasyon" desc="XML gönderim, provizyon match" />
            <FeatureCard icon={<AlertCircle />} title="Denial Management" desc="AI kategorilendirme, appeal" />
            <FeatureCard icon={<BarChart3 />} title="RCM Dashboard" desc="Days in AR, clean claim, NCR" />
            <FeatureCard icon={<Clock />} title="AR Aging" desc="Yaşlandırma raporu, 0-30-60-90 gün" />
            <FeatureCard icon={<TrendingUp />} title="Revenue Optimization" desc="AI ile gelir sızıntısı tespiti" />
            <FeatureCard icon={<Database />} title="SUT Veri Tabanı" desc="50.000+ kod, günlük güncelleme" />
            <FeatureCard icon={<Package />} title="Paket Fiyat" desc="Paket işlem tanımlama, discount" />
            <FeatureCard icon={<Bell />} title="Red Alarmları" desc="Real-time denial notification" />
            <FeatureCard icon={<Activity />} title="Charge Capture" desc="Eksik işlem tespiti, revenue leakage" />
            <FeatureCard icon={<Lock />} title="KVKK Uyumlu" desc="Fatura şifreleme, audit log" />
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
                <h2 className="text-3xl font-black text-gray-900 mb-3">KVKK & Mali Uyumluluk</h2>
                <p className="text-gray-700 leading-relaxed">
                  Median faturalama modülü <strong>KVKK, SGK mevzuatı, Vergi Usul Kanunu, e-Fatura</strong> ve
                  <strong> ISO 27001</strong> standardına tam uyumludur. Fatura verileri AES-256 ile şifrelenir,
                  tüm değişiklikler audit log'lanır. SGK denetim hazır raporlar, 10 yıl saklama uyumlu.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">SGK Mevzuat Uyumlu</h4>
                <p className="text-sm text-gray-600">SUT, Medula, provizyon kuralları</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">e-Fatura Entegrasyon</h4>
                <p className="text-sm text-gray-600">GİB UBL-TR format, otomatik gönderim</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">10 Yıl Arşiv</h4>
                <p className="text-sm text-gray-600">Yasal saklama süresi uyumlu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">Gelirinizi %42 Artırın, Red Oranını %68 Azaltın</h2>
          <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
            Median RCM modülü ile AI destekli kodlama, otomatik SUT kontrol
            ve akıllı red yönetimi ile tahsilatınızı maksimize edin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all inline-block shadow-xl">
              Canlı Demo İsteyin
            </Link>
            <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
              RCM Dashboard İzleyin
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

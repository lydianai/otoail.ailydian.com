import Link from 'next/link'
import { FlaskConical, Microscope, Barcode, Activity, Shield, Brain, AlertTriangle, CheckCircle2, BarChart3, Clock, Zap, Lock, Database, TrendingUp, Bell, FileText } from 'lucide-react'

export default function LaboratoryFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-700 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FlaskConical className="h-5 w-5" />
              <span className="text-sm font-semibold">Laboratuvar Modülü</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              AI Destekli LIMS<br />Laboratuvar Bilgi Sistemi
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              Akıllı sonuç validasyonu, kritik değer alarmları, barkod takibi ve e-Nabız lab sonuç gönderimi.
              Sisoft, Medisoft, Gemsoft'tan farklı olarak yapay zeka ile sonuç doğrulama ve otomatik LIS entegrasyonu.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Ücretsiz Demo
              </Link>
              <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
                Lab Paneli İzleyin
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
                <Zap className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">18 dk</div>
                <div className="text-red-100">Ort. TAT (Turnaround Time)</div>
              </div>
              <div>
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%99.7</div>
                <div className="text-red-100">Sonuç Doğruluk Oranı</div>
              </div>
              <div>
                <Activity className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">5M+</div>
                <div className="text-red-100">Aylık Test Hacmi</div>
              </div>
              <div>
                <Database className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">800+</div>
                <div className="text-red-100">Lab Kullanıyor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Laboratuvar Yönetimine Özel Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Sonuç Validasyonu</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Makine öğrenmesi ile anormal sonuçları otomatik tespit eder, delta check yapar,
                hasta geçmişi ile karşılaştırır. <strong>Rakiplerimizde yok!</strong> Hatalı sonuçları %87 azaltır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik delta check (±50% fark tespiti)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>AI anomali tespiti (ML algoritması)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Referans aralık kontrolü (yaş/cinsiyet)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik re-test önerisi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kritik Değer Alarmları</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kritik lab değerleri (K&gt;6.5, Troponin yüksek, INR&gt;5 vb.) anında ilgili doktora
                SMS/push notification gönderir. <strong>HL7 OBX segment kritik flag.</strong>
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Anında SMS/e-posta/push bildirimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Test bazlı kritik değer limitleri</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Bildirim confirmation tracking</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Kritik değer audit logu (JCIA uyumlu)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">e-Nabız Lab Sonuç Gönderimi</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sonuçlar onaylandıktan sonra otomatik e-Nabız'a gönderilir. <strong>SBÜ Lab Veri Seti (LOINC kodlu)</strong>
                tam uyumlu. Real-time entegrasyon, manuel işlem yok.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik LOINC kod mapping</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>e-Nabız HL7 ORU^R01 mesajı</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time gönderim (batch değil)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Gönderim başarı/hata tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LIS Integration */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            Tam Otomatik LIS (Lab Cihaz) Entegrasyonu
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Cobas, Abbott, Roche, Siemens, Beckman gibi 200+ lab cihazı ile HL7, ASTM, LIS2-A protokolleri ile entegrasyon.
            Manuel sonuç girişine son!
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Microscope className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Çift Yönlü LIS Entegrasyonu</h3>
              <p className="text-gray-700 mb-4">
                Lab istemleri otomatik cihaza gider (work list), sonuçlar otomatik sisteme döner.
                Barkod ile hasta-numune eşleştirme. Hematoloji, biyokimya, mikrobiyoloji, immünoloji tüm bölümler desteklenir.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>HL7 2.x OML^O21 (istem), ORU^R01 (sonuç)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>ASTM E1394 ve LIS2-A protokol desteği</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>TCP/IP, Serial, USB cihaz bağlantısı</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>QC (kalite kontrol) verisi takibi</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Barcode className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Barkod & Numune Takibi</h3>
              <p className="text-gray-700 mb-4">
                Her numune için benzersiz barkod üretilir. Numune alımı, kabul, red, analiz, onay aşamaları takip edilir.
                RFID desteği ile numune konumu canlı izlenir.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Code 128, ISBT 128, PDF417 format</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Numune kabul/red yönetimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Pre-analitik hata kontrolü (hemoliz, lipemi)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Numune saklama süresi takibi</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="h-8 w-8 text-red-600" />
              Desteklenen Lab Cihazları (200+ Model)
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Biyokimya</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Roche Cobas c501/c502</li>
                  <li>• Abbott Architect ci8200</li>
                  <li>• Siemens Dimension RxL</li>
                  <li>• Beckman AU5800</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Hematoloji</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Sysmex XN-1000</li>
                  <li>• Mindray BC-6800</li>
                  <li>• Abbott Cell-Dyn Ruby</li>
                  <li>• Horiba ABX Pentra</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Mikrobiyoloji</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• BD BACTEC FX</li>
                  <li>• bioMérieux VITEK 2</li>
                  <li>• Bruker MALDI-TOF</li>
                  <li>• Copan WASPLab</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">İmmünoloji</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Roche Elecsys e801</li>
                  <li>• Abbott Alinity i</li>
                  <li>• Siemens Immulite 2000</li>
                  <li>• Snibe MAGLUMI</li>
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
            Rakiplerimizden farklı olarak AI validasyon, gerçek zamanlı e-Nabız ve 200+ cihaz entegrasyonu sunuyoruz.
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
                  <span className="text-gray-700"><strong>AI Sonuç Validasyonu:</strong> Otomatik delta check, anomali tespiti, hatalı sonuç %87 azalma</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>200+ Cihaz Entegrasyonu:</strong> HL7, ASTM, LIS2-A protokol, çift yönlü work list</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Otomatik e-Nabız:</strong> LOINC kodlu, real-time gönderim, manuel işlem yok</span>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Kritik Değer Alarmı:</strong> Anında SMS/push, doktor onay tracking (JCIA uyumlu)</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>TAT İzleme:</strong> Pre-analitik, analitik, post-analitik süre detayı, OECD benchmark</span>
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
                  <span className="text-gray-700">AI yok, manuel delta check, anomali tespiti sonradan manuel kontrol</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Sınırlı cihaz desteği (30-50 model), her cihaz için ek ücret</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">e-Nabız batch gönderim (günde 1-2 kez), LOINC mapping manuel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Kritik değer manuel bildirim, SMS sistemi yok, telefon ile aranır</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">TAT raporları Excel export, detaylı analiz yok, benchmark yok</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Test Katalog & LOINC */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            LOINC Kodlu Test Kataloğu
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            10.000+ test LOINC kodlu, e-Nabız gönderim hazır. Hematoloji, biyokimya, hormon, seroloji, mikrobiyoloji tüm paneller.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <FileText className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">LOINC Master Katalog</h3>
              <p className="text-gray-700 text-sm mb-4">
                Tüm testler LOINC kodlu, e-Nabız otomatik mapping. Yeni test ekleme, fiyat güncelleme, referans aralık yönetimi.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 10.000+ LOINC test kodu</li>
                <li>• Yaş/cinsiyet bazlı referans aralıklar</li>
                <li>• Panel/profile tanımlama</li>
                <li>• Cihaz bazlı test mapping</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <TrendingUp className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Test Kullanım Analizi</h3>
              <p className="text-gray-700 text-sm mb-4">
                Hangi testler ne kadar isteniyor? Maliyet/gelir analizi, gereksiz test tespiti, inappropriate lab kullanımı.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Test başı maliyet/gelir hesaplama</li>
                <li>• En çok istenen testler (top 100)</li>
                <li>• Klinik bazlı test profili</li>
                <li>• Inappropriate test bildirimi</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <BarChart3 className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">TAT (Turnaround Time)</h3>
              <p className="text-gray-700 text-sm mb-4">
                İstem anından sonuç onay anına kadar geçen süre. Pre-analitik, analitik, post-analitik aşama bazlı analiz.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Ortalama TAT (median/95th percentile)</li>
                <li>• Test bazlı TAT benchmarking</li>
                <li>• Bottleneck analizi (darboğaz tespiti)</li>
                <li>• OECD uyumlu metrikler</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Komple Laboratuvar Çözümü
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<FlaskConical />} title="Lab İstem" desc="CPOE (Computerized Physician Order Entry)" />
            <FeatureCard icon={<Barcode />} title="Barkod Sistemi" desc="Numune takip, Code 128, ISBT 128" />
            <FeatureCard icon={<Microscope />} title="Cihaz Entegrasyonu" desc="HL7, ASTM, LIS2-A, 200+ model" />
            <FeatureCard icon={<Activity />} title="Sonuç Girişi" desc="Manuel/otomatik, AI validasyon" />
            <FeatureCard icon={<Brain />} title="Delta Check" desc="AI ile anormal değer tespiti" />
            <FeatureCard icon={<Bell />} title="Kritik Değer" desc="SMS/push alarm, doktor onay tracking" />
            <FeatureCard icon={<Shield />} title="e-Nabız Gönderim" desc="LOINC kodlu, HL7 ORU^R01" />
            <FeatureCard icon={<BarChart3 />} title="TAT İzleme" desc="Pre/analitik/post-analitik süre" />
            <FeatureCard icon={<FileText />} title="Test Kataloğu" desc="10.000+ LOINC test kodu" />
            <FeatureCard icon={<Clock />} title="Numune Takip" desc="Alım/kabul/red/analiz/onay aşamaları" />
            <FeatureCard icon={<TrendingUp />} title="Kalite Kontrol" desc="QC verisi, Westgard kuralları" />
            <FeatureCard icon={<Lock />} title="KVKK Uyumlu" desc="Sonuç şifreleme, erişim kontrolü" />
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
                <h2 className="text-3xl font-black text-gray-900 mb-3">KVKK & Veri Güvenliği</h2>
                <p className="text-gray-700 leading-relaxed">
                  Median laboratuvar modülü <strong>KVKK, ISO 15189 (Tıbbi Laboratuvar Akreditasyonu)</strong> ve
                  <strong> ISO 27001</strong> standardına tam uyumludur. Lab sonuçları AES-256 ile şifrelenir,
                  hasta sonuçlarına sadece yetkili doktor/hemşire erişebilir. Tüm erişimler audit loglanır.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">ISO 15189 Uyumlu</h4>
                <p className="text-sm text-gray-600">Tıbbi lab akreditasyon standartları</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">LOINC & SNOMED</h4>
                <p className="text-sm text-gray-600">Uluslararası terminoloji desteği</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">HL7 v2.x & FHIR</h4>
                <p className="text-sm text-gray-600">Standart mesaj protokolleri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">Lab TAT'ınızı 18 Dakikaya İndirin</h2>
          <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
            Median LIMS ile AI destekli sonuç validasyonu, 200+ cihaz entegrasyonu
            ve otomatik e-Nabız gönderimini deneyimleyin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all inline-block shadow-xl">
              Canlı Demo İsteyin
            </Link>
            <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
              Lab Paneli İzleyin
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

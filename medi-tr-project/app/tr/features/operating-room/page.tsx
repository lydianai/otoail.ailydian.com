import Link from 'next/link'
import { Scissors, Brain, Calendar, Clock, Users, CheckCircle2, BarChart3, AlertTriangle, Lock, Package, Activity, Shield, TrendingUp, FileText, Bell, Zap } from 'lucide-react'

export default function OperatingRoomFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-700 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Scissors className="h-5 w-5" />
              <span className="text-sm font-semibold">Ameliyathane Modülü</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              AI Destekli Ameliyathane<br />Yönetim Sistemi
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              Akıllı ameliyat süresi tahmini, OR scheduling, cerrahi ekip yönetimi ve malzeme kullanım analizi.
              Sisoft, Medisoft, Gemsoft'tan farklı olarak yapay zeka ile OR verimliliği ve gerçek zamanlı kaynak optimizasyonu.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Ücretsiz Demo
              </Link>
              <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
                OR Panosu İzleyin
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
                <div className="text-4xl font-black mb-2">%28</div>
                <div className="text-red-100">OR Kullanım Artışı</div>
              </div>
              <div>
                <Clock className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">12 dk</div>
                <div className="text-red-100">Turnover Süresi</div>
              </div>
              <div>
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%92</div>
                <div className="text-red-100">On-Time Start Oranı</div>
              </div>
              <div>
                <Users className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">600+</div>
                <div className="text-red-100">Ameliyathane Kullanıyor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Ameliyathane Yönetimine Özel Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Ameliyat Süresi Tahmini</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Makine öğrenmesi ile cerrahi prosedür, cerrah, hasta özellikleri analiz edilerek
                ameliyat süresi tahmin edilir. <strong>Rakiplerimizde yok!</strong> OR kullanımı %28 artar.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Prosedür bazlı süre ML tahmini</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Cerrah/ekip verimliliği analizi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Hasta comorbidite risk faktörü</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik schedule optimizasyonu</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Akıllı OR Scheduling</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Çoklu kaynak (OR odası, ekip, ekipman) eş zamanlı optimizasyonu. Block time yönetimi,
                acil vaka ekleme, <strong>turnover süresi 12 dakika.</strong> Çizelge充填 analizi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Block time scheduling (bölüm bazlı)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Drag-drop visual scheduler</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Acil/elektif önceliklendirme</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik conflict detection</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Malzeme Kullanım Analizi</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Her ameliyatta kullanılan implant, sarf malzeme, ilaç barkod ile kayıt edilir.
                <strong> Prosedür bazlı maliyet analizi, fire %45 azalır.</strong> Lot/seri takip.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Barkod ile malzeme kayıt (GS1)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Lot/seri no traceability (FDA)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Prosedür bazlı maliyet/gelir analizi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>İmplant registry (kalça/diz protez)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OR Workflow */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            Ameliyat Süreç Yönetimi (Patient Journey)
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Hasta pre-op'tan post-op'a kadar tüm aşamalar canlı takip edilir. Anestezi, cerrahi, derlenme süreleri detaylı loglanır.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Activity className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gerçek Zamanlı OR Dashboard</h3>
              <p className="text-gray-700 mb-4">
                Tüm ameliyathaneler tek ekranda. Her odanın durumu (boş, hazırlanıyor, anestezi, cerrahi,
                derlenme, temizlik) renk kodlu gösterilir. Gecikmeler, ekip konumu, hasta vital bilgileri.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Canlı OR haritası (floor plan view)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Renk kodlu durum gösterimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Delay tracking & alert sistemi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Ekip location tracking (RFID)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Users className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cerrahi Ekip Yönetimi</h3>
              <p className="text-gray-700 mb-4">
                Cerrah, anestezi, hemşire, teknisyen atamaları. Yeterlilik/sertifika kontrolü
                (laparoskopi, robotik cerrahi). On-call schedule, çalışma saati takibi (EU directive).
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Role-based ekip ataması</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Credential/sertifika kontrolü</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>On-call & overtime yönetimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Ekip performans metrikleri</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-red-600" />
              Ameliyat Aşamaları & Süre Takibi
            </h3>
            <div className="grid md:grid-cols-6 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Pre-Op</h4>
                <p className="text-xs text-gray-600">Hasta hazırlık, consent</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">OR Giriş</h4>
                <p className="text-xs text-gray-600">Hasta transfer, pozisyon</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Anestezi</h4>
                <p className="text-xs text-gray-600">Anestezi indüksiyon</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Cerrahi</h4>
                <p className="text-xs text-gray-600">İnsizyon - kapama</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">5</div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Derlenme</h4>
                <p className="text-xs text-gray-600">PACU (recovery room)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">6</div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Turnover</h4>
                <p className="text-xs text-gray-600">Temizlik, hazırlık</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6 text-center">
              Her aşama otomatik timestamp ile kaydedilir. <strong>OECD uyumlu OR metrikleri:</strong> incision-to-closure time,
              turnover time, first-case-on-time start, prime time utilization.
            </p>
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
            Rakiplerimizden farklı olarak AI süre tahmini, gerçek zamanlı dashboard ve malzeme traceability sunuyoruz.
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
                  <span className="text-gray-700"><strong>AI Süre Tahmini:</strong> ML modeli ile prosedür/cerrah analizi, OR kullanımı %28 artış</span>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Real-Time Dashboard:</strong> Canlı OR haritası, renk kodlu durum, delay tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Malzeme Traceability:</strong> Barkod lot/seri, FDA uyumlu implant registry, fire %45 azalma</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>12 dk Turnover:</strong> Otomatik housekeeping notification, sterile ekipman takibi</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>OECD Metrikleri:</strong> Prime time utilization, first-case start, case volume analizi</span>
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
                  <span className="text-gray-700">AI yok, süre tahmini manuel/tarihsel ortalama, schedule optimize edilemez</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Statik rapor, canlı durum yok, gecikmeler manuel takip, Excel bazlı</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Malzeme manuel kayıt, lot/seri takip yok, implant registry eksik</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Turnover 25-35 dk, otomatik bildirim yok, temizlik manuel koordine</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Raporlar Excel, görselleştirme zayıf, OECD benchmark yok</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sterilizasyon & Ekipman */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            Sterilizasyon & Ekipman Takibi
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Cerrahi alet setleri, sterilizasyon döngüleri, ekipman bakım/kalibrasyon tam takip.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <Shield className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sterilizasyon Döngü Takibi</h3>
              <p className="text-gray-700 text-sm mb-4">
                Her cerrahi set barkod ile takip edilir. Sterilizasyon (autoclave) döngüleri,
                BI (Biological Indicator) test sonuçları kaydedilir. JCI/ISO 13485 uyumlu.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Cerrahi set barkod tracking</li>
                <li>• Sterilizasyon load kayıt</li>
                <li>• BI/CI test sonuç entegrasyonu</li>
                <li>• Steril raf ömrü (expiry) uyarısı</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <Package className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ekipman Bakım & Kalibrasyon</h3>
              <p className="text-gray-700 text-sm mb-4">
                Anestezi cihazları, ventilator, elektrokoter, laparoskopi kuleleri için
                periyodik bakım/kalibrasyon takvimleri. Otomatik bakım hatırlatıcıları.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Ekipman asset inventory</li>
                <li>• Preventive maintenance schedule</li>
                <li>• Kalibrasyon sertifika yönetimi</li>
                <li>• Arıza/downtime tracking</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <FileText className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cerrahi Güvenlik Kontrolleri</h3>
              <p className="text-gray-700 text-sm mb-4">
                WHO Safe Surgery Checklist (sign-in, time-out, sign-out).
                Elektronik checklist, eksik madde uyarısı, completion audit.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• WHO checklist entegrasyonu</li>
                <li>• Timeout (surgical pause) kaydı</li>
                <li>• Sponge/instrument count</li>
                <li>• Complication tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Komple Ameliyathane Çözümü
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<Calendar />} title="OR Scheduling" desc="Block time, drag-drop, acil ekleme" />
            <FeatureCard icon={<Brain />} title="AI Süre Tahmini" desc="ML prosedür/cerrah analizi" />
            <FeatureCard icon={<Activity />} title="Canlı Dashboard" desc="Real-time OR harita, durum tracking" />
            <FeatureCard icon={<Users />} title="Ekip Yönetimi" desc="Credential, on-call, overtime" />
            <FeatureCard icon={<Package />} title="Malzeme Takip" desc="Barkod lot/seri, implant registry" />
            <FeatureCard icon={<Shield />} title="Sterilizasyon" desc="Set tracking, BI test, expiry" />
            <FeatureCard icon={<Clock />} title="Turnover İzleme" desc="12 dk average, housekeeping alert" />
            <FeatureCard icon={<BarChart3 />} title="OR Metrikleri" desc="Prime time, first-case start, OECD" />
            <FeatureCard icon={<FileText />} title="WHO Checklist" desc="Safe surgery, timeout, count" />
            <FeatureCard icon={<Bell />} title="Delay Alarmları" desc="Gecikme bildirimi, root cause" />
            <FeatureCard icon={<TrendingUp />} title="Kullanım Analizi" desc="OR utilization, case volume" />
            <FeatureCard icon={<Lock />} title="KVKK Uyumlu" desc="Ameliyat kaydı şifreleme, audit" />
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
                <h2 className="text-3xl font-black text-gray-900 mb-3">KVKK & Ameliyat Güvenliği</h2>
                <p className="text-gray-700 leading-relaxed">
                  Median ameliyathane modülü <strong>KVKK, JCI (Joint Commission International), ISO 13485 (Tıbbi Cihaz)</strong> ve
                  <strong> WHO Safe Surgery</strong> standardına tam uyumludur. Ameliyat kayıtları şifrelenir,
                  cerrahi video/görüntüler HIPAA uyumlu saklanır. İmplant traceability FDA 21 CFR Part 11 uyumlu.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">JCI Akreditasyon</h4>
                <p className="text-sm text-gray-600">Uluslararası ameliyathane standartları</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">WHO Safe Surgery</h4>
                <p className="text-sm text-gray-600">Güvenli cerrahi checklist entegre</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">FDA 21 CFR Part 11</h4>
                <p className="text-sm text-gray-600">İmplant traceability uyumluluk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">OR Kullanımınızı %28 Artırın</h2>
          <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
            Median ameliyathane modülü ile AI destekli süre tahmini, gerçek zamanlı dashboard
            ve malzeme traceability ile verimliliği maksimize edin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all inline-block shadow-xl">
              Canlı Demo İsteyin
            </Link>
            <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
              OR Dashboard İzleyin
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

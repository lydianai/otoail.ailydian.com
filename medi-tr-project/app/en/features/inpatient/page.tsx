import Link from 'next/link'
import { Bed, Users, ClipboardList, Activity, Shield, Brain, Calendar, AlertTriangle, CheckCircle2, BarChart3, Clock, Stethoscope, Bell, TrendingUp, FileText, Lock } from 'lucide-react'

export default function InpatientFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-700 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Bed className="h-5 w-5" />
              <span className="text-sm font-semibold">Yatan Hasta Modülü</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              AI Destekli Yatan Hasta<br />& Yatak Yönetimi Sistemi
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              Akıllı yatak doluluk tahmini, ADT (Admission/Discharge/Transfer) otomasyonu ve e-Nabız yatış bildirimi.
              Sisoft, Medisoft ve Gemsoft'tan farklı olarak yapay zeka ile taburcu planlaması sunar.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Ücretsiz Demo
              </Link>
              <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
                Yatak Yönetim Paneli İzleyin
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
                <Bed className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%97</div>
                <div className="text-red-100">Yatak Kullanım Verimliliği</div>
              </div>
              <div>
                <Clock className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">45 dk</div>
                <div className="text-red-100">Ort. Yatak Hazırlama Süresi</div>
              </div>
              <div>
                <TrendingUp className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%23</div>
                <div className="text-red-100">Yatış Süresi Azalması</div>
              </div>
              <div>
                <Users className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">500+</div>
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
            Yatan Hasta Yönetimine Özel Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI ile Taburcu Planlaması</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Makine öğrenmesi algoritmaları ile hasta yatış süresini tahmin eder, taburcu planlamasını optimize eder.
                <strong> Rakiplerimizde yok!</strong> Yatak devir hızını %23 artırır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Tahmin edilen taburcu tarihi (AI)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik sosyal hizmet bildirimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Taburcu hazırlık checklist</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Yatak doluluk tahmin modeli</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <ClipboardList className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ADT (Kabul/Taburcu/Transfer)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                HL7 ADT mesajları ile tüm sistemler senkronize. Yatış, transfer, taburcu işlemleri
                otomatik e-Nabız'a bildirilir. <strong>SBÜ Yatan Hasta Veri Seti tam uyumlu.</strong>
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>HL7 ADT-A01, A02, A03, A08</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>e-Nabız yatış/taburcu bildirimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik yatak değişim kaydı</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Klinik arası transfer yönetimi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hasta Güvenlik Skorları</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Düşme riski (Morse), basınç yarası riski (Braden), delirium skorlaması (CAM-ICU),
                venöz tromboembolizm (Caprini). Otomatik alarm sistemi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Morse Düşme Riski Skalası</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Braden Basınç Yarası Riski</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>CAM-ICU Delirium Değerlendirme</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik hemşire alarmları</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Yatak Yönetimi Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            Gerçek Zamanlı Yatak Yönetimi Panosu
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Tüm kliniklerin yatak durumunu tek ekranda görün. Boş, dolu, temizleniyor, bakımda, izole,
            karantina durumları anlık güncellenir.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Bed className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Akıllı Yatak Tahsisi</h3>
              <p className="text-gray-700 mb-4">
                Hasta ihtiyaçları (izolasyon, yoğun bakım, monitörlü), cinsiyet, sigorta durumu,
                klinik tercihi göz önünde bulundurarak en uygun yatağı önerir.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Yatak özellik eşleştirmesi (oksijen, monitör, izolasyon)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Cinsiyet ayrımı otomatik kontrolü</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>VIP/özel oda işaretleme</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Karantina/izolasyon yatak takibi</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Calendar className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Housekeeping Entegrasyonu</h3>
              <p className="text-gray-700 mb-4">
                Temizlik ekibi ile entegre çalışır. Hasta taburcu olduktan sonra yatak otomatik
                "temizlenecek" durumuna geçer, temizlik tamamlanınca "hazır" olur.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik temizlik görev atama</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Mobil temizlik onay uygulaması</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Terminal temizlik (izolasyon) protokolü</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Yatak hazırlık süresi raporları</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-red-600" />
              Yatak Kullanım Metrikleri & Raporlar
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Doluluk Oranları</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Klinik bazında yatak doluluk %</li>
                  <li>• Zaman serisi analizi (günlük/aylık)</li>
                  <li>• Tahmini doluluk (AI tahmin)</li>
                  <li>• Benchmark karşılaştırma</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Performans Göstergeleri</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• ALOS (Average Length of Stay)</li>
                  <li>• Bed Turnover Rate</li>
                  <li>• OECD uyumlu KPI'lar</li>
                  <li>• SBÜ İSG-09 raporları</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Gelir Analizi</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Yatak başı gelir analizi</li>
                  <li>• Boş yatak maliyeti hesaplama</li>
                  <li>• Klinik karlılık raporları</li>
                  <li>• SGK fatura uyum takibi</li>
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
            Rakiplerimizden farklı olarak AI tahmin, SBÜ otomasyonu ve gerçek zamanlı entegrasyon sunuyoruz.
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
                  <span className="text-gray-700"><strong>AI Taburcu Tahmini:</strong> Makine öğrenmesi ile taburcu planlaması, yatak devir hızı %23 artış</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Otomatik e-Nabız Bildirimi:</strong> Yatış/taburcu otomatik gönderim, manuel işlem yok</span>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Gerçek Zamanlı HL7 ADT:</strong> Tüm sistemler senkron (Lab, Rad, Pharmacy)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Akıllı Alarm Sistemi:</strong> Düşme/basınç yarası risk skorları otomatik hesaplanır</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>OECD/SBÜ Raporları:</strong> Hazır dashboard'lar, manuel rapor hazırlamaya gerek yok</span>
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
                  <span className="text-gray-700">AI yok, taburcu planlaması manuel, doluluk tahmini yok</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">e-Nabız bildirimi manuel veya toplu iş ile, gerçek zamanlı değil</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">HL7 entegrasyonu ek modül, sınırlı ADT mesaj desteği</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Risk skorları manuel girilmeli, otomatik alarm sistemi yok</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Raporlar Excel export, görselleştirme zayıf, SBÜ formatları eksik</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Komple Yatan Hasta Çözümü
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<Bed />} title="Yatak Haritası" desc="Görsel kat planı, renk kodlu durum gösterimi" />
            <FeatureCard icon={<Users />} title="Hasta Listesi" desc="Klinik bazlı yatan hasta listeleri, filtreleme" />
            <FeatureCard icon={<Calendar />} title="Yatış Takvimi" desc="Planlı yatış randevuları, pre-admission" />
            <FeatureCard icon={<ClipboardList />} title="Yatış Formu" desc="ICD-10 ana tanı, comorbidite, alerji kaydı" />
            <FeatureCard icon={<Activity />} title="Vital Takibi" desc="Hasta başı vital monitör entegrasyonu (HL7)" />
            <FeatureCard icon={<Stethoscope />} title="Doktor Notları" desc="SOAP notları, progress notes, konsültasyon" />
            <FeatureCard icon={<Bell />} title="Hemşire Panosu" desc="İlaç/lab/vital reminder, task yönetimi" />
            <FeatureCard icon={<FileText />} title="Epikriz" desc="Otomatik epikriz üretimi, şablon sistemi" />
            <FeatureCard icon={<Shield />} title="e-Nabız Entegrasyonu" desc="SBÜ Yatan Hasta Veri Seti (YHVS)" />
            <FeatureCard icon={<BarChart3 />} title="ALOS Analizi" desc="Ortalama yatış süresi, benchmark" />
            <FeatureCard icon={<TrendingUp />} title="Readmission Oranı" desc="30 günlük re-hospitalization takibi" />
            <FeatureCard icon={<Lock />} title="KVKK Uyumlu" desc="Hasta verisi şifreleme, erişim logları" />
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
                  Median yatan hasta modülü <strong>KVKK (Kişisel Verilerin Korunması Kanunu)</strong> ve
                  <strong> ISO 27001</strong> standardına tam uyumludur. Hasta verileri AES-256 ile şifrelenir,
                  tüm erişimler loglanır. Rol bazlı yetkilendirme (RBAC) ile sadece yetkili kişiler verilere erişir.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Veri Şifreleme</h4>
                <p className="text-sm text-gray-600">AES-256 encryption, transit & rest</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Erişim Kontrolü</h4>
                <p className="text-sm text-gray-600">Role-Based Access Control (RBAC)</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Audit Logging</h4>
                <p className="text-sm text-gray-600">Her işlem loglanır, tamper-proof</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">Yatak Doluluk Oranınızı %97'ye Çıkarın</h2>
          <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
            Median yatan hasta modülü ile AI destekli taburcu planlaması, otomatik e-Nabız bildirimi
            ve gerçek zamanlı yatak yönetimini deneyimleyin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all inline-block shadow-xl">
              Canlı Demo İsteyin
            </Link>
            <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
              Yatak Panosu İzleyin
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

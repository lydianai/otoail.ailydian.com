import Link from 'next/link'
import { Zap, Clock, Activity, AlertCircle, Users, BarChart3, Shield, CheckCircle2, Brain, Stethoscope, HeartPulse } from 'lucide-react'

export default function EmergencyFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-700 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Activity className="h-5 w-5" />
              <span className="text-sm font-semibold">Acil Servis Modülü</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              AI Destekli Gerçek Zamanlı<br />Acil Servis Yönetimi
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              Akıllı triyaj sistemi, anlık hasta takibi ve tam SBÜ uyumlu ED izleme panosu.
              Her saniye önemli, sistem her zaman hazır.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Ücretsiz Demo
              </Link>
              <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
                Canlı Sistem İzleyin
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
                <div className="text-4xl font-black mb-2">30 sn</div>
                <div className="text-red-100">Ortalama Triyaj Süresi</div>
              </div>
              <div>
                <Activity className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%99.9</div>
                <div className="text-red-100">Sistem Uptime</div>
              </div>
              <div>
                <Clock className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%35</div>
                <div className="text-red-100">Bekleme Süresi Azalması</div>
              </div>
              <div>
                <Users className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">200+</div>
                <div className="text-red-100">Acil Servis Kullanıyor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Acil Servislere Özel Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Akıllı Triyaj Sistemi</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI destekli otomatik aciliyet sınıflandırması. Kırmızı, sarı, yeşil alan yönetimi.
                SBÜ standartlarına tam uyumlu.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik ESI skorlama</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Vital bulgu alarmları</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Kritik hasta uyarıları</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ED İzleme Panosu</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tüm acil servis hastaları tek ekranda. Gerçek zamanlı yatak doluluk oranı,
                bekleme süreleri ve personel atamaları.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Canlı hasta takip haritası</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Renk kodlu aciliyet gösterimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Bekleme süresi analizi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">112 Ambulans Entegrasyonu</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                112 acil çağrı merkezi ile entegre çalışır. Ambulans öncesi bilgiler
                otomatik sisteme aktarılır, hazırlık süresi kısalır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Ambulans ETA gösterimi</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Ön bilgi aktarımı</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Ekip hazırlık bildirimi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Komple Acil Servis Çözümü
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<AlertCircle />} title="Hızlı Hasta Kaydı" desc="Barkod, RFID, TC No ile anında kayıt" />
            <FeatureCard icon={<HeartPulse />} title="Vital Monitör Entegrasyonu" desc="Cihazlardan otomatik veri akışı" />
            <FeatureCard icon={<Clock />} title="Bekleme Süresi Takibi" desc="Hasta başı geçen süre analizi" />
            <FeatureCard icon={<BarChart3 />} title="Performans Raporları" desc="OECD uyumlu ED metrikleri" />
            <FeatureCard icon={<Shield />} title="e-Nabız Entegrasyonu" desc="SBÜ acil servis veri setleri" />
            <FeatureCard icon={<Users />} title="Ekip Yönetimi" desc="Doktor, hemşire, teknis yer belirleme" />
            <FeatureCard icon={<Zap />} title="Hızlı Lab/Radyoloji" desc="Acil istem ve sonuç takibi" />
            <FeatureCard icon={<Activity />} title="Kriz Modu" desc="Toplu olay/afet yönetim modülü" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">Acil Servisinizi Hızlandırın</h2>
          <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
            Median ED modülü ile hasta güvenliğini artırın, bekleme sürelerini azaltın.
          </p>
          <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all inline-block shadow-xl">
            Canlı Demo İsteyin
          </Link>
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

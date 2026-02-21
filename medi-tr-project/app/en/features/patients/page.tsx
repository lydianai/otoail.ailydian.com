import Link from 'next/link'
import { Users, Brain, Smartphone, Shield, FileText, Clock, BarChart, Zap, CheckCircle2, Heart, Globe, Database } from 'lucide-react'

export default function PatientsFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-600 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Users className="h-5 w-5" />
              <span className="text-sm font-semibold">Hasta Yönetimi Modülü</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              AI Destekli Kapsamlı<br />Elektronik Hasta Kayıt Sistemi
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              e-Nabız, Medula ve SBÜ ile tam entegre, KVKK uyumlu hasta yönetim platformu.
              Türkiye'nin sağlık altyapısına özel tasarlandı.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/tr/demo"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ücretsiz Demo İsteyin
              </Link>
              <Link
                href="/tr/contact"
                className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30"
              >
                İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Median'i Farklı Kılan Özellikler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sisoft, Medisoft, Gemsoft gibi yerli çözümlerin tüm özelliklerine ek olarak,
              yapay zeka destekli yeni nesil hasta yönetimi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-100 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Destekli Tıbbi Kayıt</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Yapay zeka, otomatik ICD-10 kodlama, risk analizi ve klinik karar destek sistemi ile
                doktorların iş yükünü %40 azaltır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  Otomatik tıbbi kod önerisi
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  İlaç etkileşim kontrolü
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  Klinik protokol uyarıları
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-100 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">e-Nabız & Medula Entegrasyonu</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sağlık Bakanlığı sistemleri ile gerçek zamanlı senkronizasyon.
                Hasta geçmişine anında erişim, otomatik provizyon.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  e-Nabız otomatik veri aktarımı
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  Medula provizyon entegrasyonu
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  SBÜ hasta kayıt sistemi
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border-2 border-red-100 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobil Hasta Uygulaması</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hastalar kendi kayıtlarına erişebilir, randevu alabilir,
                e-reçetelerini görüntüleyebilir. Hasta memnuniyetini artırır.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  Online randevu sistemi
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  Lab sonuçları bildirim
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0" />
                  e-Reçete entegrasyonu
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Kapsamlı Hasta Yönetim Özellikleri
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Elektronik Hasta Kaydı (EHR)"
              description="Hasta demografik bilgileri, tıbbi geçmiş, alerji ve kronik hastalık takibi"
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="Randevu Yönetimi"
              description="Çoklu branş desteği, online rezervasyon, SMS hatırlatma sistemi"
            />
            <FeatureCard
              icon={<Heart className="h-6 w-6" />}
              title="Vital Bulgular Takibi"
              description="Tansiyon, nabız, ateş, satürasyon otomatik kayıt ve trend analizi"
            />
            <FeatureCard
              icon={<Database className="h-6 w-6" />}
              title="Tıbbi Dokümantasyon"
              description="SOAP notları, epikriz, konsültasyon raporları, ameliyat notları"
            />
            <FeatureCard
              icon={<BarChart className="h-6 w-6" />}
              title="Raporlama ve Analitik"
              description="Hasta profil analizi, hastalık istatistikleri, performans metrikleri"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Hızlı Hasta Kayıt"
              description="TC Kimlik No ile otomatik bilgi çekme, barkod okuma, yüz tanıma"
            />
          </div>
        </div>
      </section>

      {/* KVKK Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-semibold">Veri Güvenliği</span>
                </div>
                <h2 className="text-4xl font-black mb-6">
                  KVKK Tam Uyumlu<br />Hasta Veri Güvenliği
                </h2>
                <p className="text-red-50 text-lg leading-relaxed mb-6">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu'na tam uyumlu.
                  Hasta verileriniz end-to-end şifreleme ile korunur.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span>AES-256 şifreleme ile veri koruma</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span>Rol tabanlı erişim kontrolü</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span>Detaylı audit log sistemi</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span>KVKK aydınlatma metni yönetimi</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <Globe className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Türkiye'ye Özel Altyapı</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">e-Nabız Entegrasyonu</span>
                      <span className="text-green-300">✓ Aktif</span>
                    </div>
                    <div className="text-sm text-red-100">Gerçek zamanlı veri senkronizasyonu</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">Medula Provizyon</span>
                      <span className="text-green-300">✓ Aktif</span>
                    </div>
                    <div className="text-sm text-red-100">SGK ödeme entegrasyonu</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">SBÜ HBYS Standartları</span>
                      <span className="text-green-300">✓ Sertifikalı</span>
                    </div>
                    <div className="text-sm text-red-100">Sağlık Bakanlığı onaylı</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Hasta Yönetiminizi Dijitalleştirin
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Median ile hasta kayıtlarınızı merkezi bir platformda yönetin,
            e-Nabız entegrasyonu ile işlerinizi hızlandırın.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tr/demo"
              className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Ücretsiz Demo Talep Edin
            </Link>
            <Link
              href="/tr/pricing"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all border-2 border-red-200"
            >
              Fiyatları İnceleyin
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 hover:shadow-lg transition-all">
      <div className="text-red-600 mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

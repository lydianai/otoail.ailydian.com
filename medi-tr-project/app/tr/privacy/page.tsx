'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function TurkishPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Gizlilik Politikası</h1>
          <p className="text-xl text-gray-600 font-semibold">Son Güncelleme: 1 Ocak 2025</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12">
            <Shield className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-4">Gizliliğiniz Önceliğimizdir</h2>
            <p className="text-gray-700 font-semibold">
              Median, gizliliğinizi ve kişisel sağlık bilgilerinizi korumaya kararlıdır. Bu Gizlilik Politikası, KVKK ve GDPR düzenlemelerine uygun olarak bilgilerinizi nasıl topladığımızı, kullandığımızı, ifşa ettiğimizi ve koruduğumuzu açıklar.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">1. Topladığımız Bilgiler</h2>
          <p className="text-gray-700 font-semibold mb-4">Sağlık hizmetleri ve platform işlevselliği sağlamak için gerekli bilgileri topluyoruz:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Tıbbi kayıtlar, teşhisler, tedaviler ve reçeteler dahil Korunan Sağlık Bilgileri (KSB)</li>
            <li>Kişisel tanımlayıcılar (ad, doğum tarihi, adres, telefon, e-posta)</li>
            <li>Sigorta bilgileri ve ödeme detayları</li>
            <li>Teknik veriler (IP adresi, tarayıcı türü, cihaz bilgileri)</li>
            <li>Kullanım verileri (erişilen özellikler, geçirilen süre, etkileşim kalıpları)</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">2. Bilgilerinizi Nasıl Kullanıyoruz</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>Tedavi:</strong> Sağlık hizmetleri sağlamak, koordine etmek ve yönetmek için</li>
            <li><strong>Ödeme:</strong> Faturalandırma ve sigorta taleplerini işlemek için</li>
            <li><strong>Sağlık Operasyonları:</strong> Kalite iyileştirme, eğitim ve uyumluluk faaliyetleri</li>
            <li><strong>Platform İşlevselliği:</strong> Hizmetlerimizi sağlamak, sürdürmek ve geliştirmek için</li>
            <li><strong>İletişim:</strong> Önemli bildirimler ve güncellemeler göndermek için</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">3. Veri Paylaşımı ve İfşa</h2>
          <p className="text-gray-700 font-semibold mb-4">Bilgilerinizi yalnızca gerekli olduğunda ve yasaların izin verdiği durumlarda paylaşırız:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Tedavi amaçları için sağlık hizmeti sağlayıcılarınızla</li>
            <li>Ödeme işleme için sigorta şirketinizle</li>
            <li>e-Nabız, SGK Medula ve yasal olarak zorunlu raporlama için T.C. Sağlık Bakanlığı ile</li>
            <li>Yasaların gerektirdiği durumlarda (mahkeme kararları, düzenleyici gereksinimler)</li>
            <li>Sağlık ve güvenliği korumak için acil durumlarda</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">4. KVKK Kapsamında Haklarınız</h2>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-black text-gray-900 mb-3">KVKK Kapsamında Veri Sahibi Haklarınız</h3>
            <ul className="space-y-2 text-gray-700 font-semibold">
              <li>• Kişisel verilerinizin işlenip işlenmediğini öğrenme hakkı</li>
              <li>• İşlenmişse bilgi talep etme hakkı</li>
              <li>• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>• Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme hakkı</li>
              <li>• Eksik veya yanlış işlenmiş ise düzeltilmesini isteme</li>
              <li>• KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini isteme</li>
              <li>• Üçüncü kişilere aktarılmışsa bu durumun bildirilmesini isteme</li>
              <li>• İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi sonucu aleyhinize bir sonuç doğması durumunda itiraz etme</li>
            </ul>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">5. Veri Güvenliği</h2>
          <p className="text-gray-700 font-semibold">
            AES-256 şifreleme, çok faktörlü kimlik doğrulama, düzenli güvenlik denetimleri ve SOC 2 Type II uyumluluğu dahil olmak üzere sektör lideri güvenlik önlemleri uyguluyoruz. Ayrıntılı bilgi için <Link href="/tr/security" className="text-red-500 font-bold hover:underline">Güvenlik & Uyumluluk sayfamıza</Link> bakın.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">6. Veri Saklama</h2>
          <p className="text-gray-700 font-semibold">
            Bilgilerinizi yasaların gerektirdiği süre boyunca saklıyoruz: Türk sağlık düzenlemelerinin gerektirdiği gibi. Bu sürelerden sonra yasal yükümlülükler saklı kalmak kaydıyla silme talep edebilirsiniz.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">7. Veri Yerelleştirme</h2>
          <p className="text-gray-700 font-semibold">
            Türkiye hasta verileri yalnızca Türkiye veri merkezlerinde saklanır. Tüm geçerli veri yerelleştirme gereksinimlerine uyuyoruz. Veriler Türkiye sınırları dışına çıkarılmaz.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">8. e-Nabız ve SGK Entegrasyonu</h2>
          <p className="text-gray-700 font-semibold">
            Median, T.C. Sağlık Bakanlığı e-Nabız Kişisel Sağlık Sistemi ve SGK Medula ile entegre çalışır. Bu entegrasyonlar yasal gerekliliktir ve hasta verilerinin güvenli bir şekilde paylaşılmasını sağlar.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">9. Başvuru ve İletişim</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <p className="text-gray-700 font-semibold mb-4">Gizlilikle ilgili sorularınız veya haklarınızı kullanmak için:</p>
            <p className="text-gray-900 font-bold">Veri Koruma Sorumlusu</p>
            <p className="text-gray-700 font-semibold">E-posta: kvkk@lydianmedi.com</p>
            <p className="text-gray-700 font-semibold">Telefon: +90 850 123 4567</p>
            <p className="text-gray-700 font-semibold mt-4">
              Başvurularınız, KVKK'nın 13. maddesi uyarınca en geç 30 gün içinde değerlendirilecek ve yanıtlanacaktır.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

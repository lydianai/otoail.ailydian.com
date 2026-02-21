'use client';

import Header from '@/components/layout/Header';
import { FileText } from 'lucide-react';

export default function TurkishTermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Hizmet Şartları</h1>
          <p className="text-xl text-gray-600 font-semibold">Son Güncelleme: 1 Ocak 2025</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12">
            <FileText className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-700 font-semibold">
              Bu Hizmet Şartları, Median sağlık bilgi sistemi platformunun ("Platform") kullanımını düzenler. Platformu kullanarak, bu şartları kabul etmiş olursunuz.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">1. Hizmet Tanımı</h2>
          <p className="text-gray-700 font-semibold">
            Median, sağlık tesisleri için bulut tabanlı Hastane Bilgi Sistemi (HIS) ve Elektronik Sağlık Kaydı (EHR) platformudur. Platform şunları içerir:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Hasta yönetimi ve EHR modülü</li>
            <li>Acil servis, yatan hasta, ameliyathane yönetimi</li>
            <li>Laboratuvar (LIMS), eczane, radyoloji (PACS) modülleri</li>
            <li>Faturalandırma ve gelir döngüsü yönetimi</li>
            <li>e-Nabız ve SGK Medula entegrasyonları</li>
            <li>Yapay zeka destekli klinik karar destek sistemleri</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">2. Kullanıcı Sorumlulukları</h2>
          <p className="text-gray-700 font-semibold mb-4">Platform kullanıcıları olarak şunları kabul edersiniz:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Doğru ve güncel bilgi sağlamak</li>
            <li>Hesap bilgilerinizi gizli tutmak ve güvenli parolalar kullanmak</li>
            <li>Platformu yalnızca yasal amaçlar için kullanmak</li>
            <li>KVKK, TSE, Sağlık Bakanlığı düzenlemeleri ve ilgili yasalara uymak</li>
            <li>Hasta verilerini korumak ve gizlilik standartlarına uymak</li>
            <li>Çok faktörlü kimlik doğrulama (MFA) kullanmak</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">3. Ödeme Şartları</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Ücretler seçilen plana göre aylık veya yıllık olarak tahsil edilir</li>
            <li>Ödeme Türk Lirası (TL) cinsinden yapılır</li>
            <li>Fiyatlar 30 gün önceden bildirimle değiştirilebilir</li>
            <li>Ödeme yapılmaması durumunda hizmet askıya alınabilir</li>
            <li>İptal durumunda kalan süre için iade yapılmaz (yıllık planlar hariç, 30 gün içinde)</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">4. Veri Mülkiyeti ve Güvenlik</h2>
          <p className="text-gray-700 font-semibold">
            Platforma girdiğiniz tüm hasta verileri size aittir. Median olarak:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Verilerinizi asla satmayız veya üçüncü taraflara kiralamayız</li>
            <li>KVKK, SOC 2 Type II ve ISO 27001 standartlarına uygun güvenlik sağlarız</li>
            <li>AES-256 şifreleme ve günlük yedekleme kullanırız</li>
            <li>Veriler Türkiye veri merkezlerinde saklanır</li>
            <li>Hizmet sonlandırmasından sonra 90 gün içinde veri dışa aktarma imkanı sağlarız</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">5. Hizmet Düzeyi Sözleşmesi (SLA)</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>Temel Plan:</strong> %99.5 çalışma süresi garantisi</li>
            <li><strong>Profesyonel Plan:</strong> %99.9 çalışma süresi garantisi</li>
            <li><strong>Kurumsal Plan:</strong> %99.99 çalışma süresi garantisi</li>
            <li>Planlı bakım çalışma süresine dahil değildir (7 gün önceden bildirilir)</li>
            <li>SLA ihlali durumunda hizmet kredisi sağlanır</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">6. Fikri Mülkiyet</h2>
          <p className="text-gray-700 font-semibold">
            Platform, yazılım, algoritmalar ve dokümantasyon Median'in mülkiyetindedir. Size kullanım hakkı verilir ancak mülkiyet devredilmez. Tersine mühendislik, kaynak koda erişim veya kopyalama yasaktır.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">7. Sorumluluk Sınırlaması</h2>
          <p className="text-gray-700 font-semibold">
            Median, platform kullanımından kaynaklanan dolaylı zararlardan sorumlu değildir. Toplam sorumluluk, son 12 ayda ödenen ücretlerle sınırlıdır. Bu sınırlama, kasıtlı eylemler veya ağır ihmal durumlarında geçerli değildir.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">8. Sözleşme Süresi ve Fesih</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Aylık planlar herhangi bir zamanda iptal edilebilir (30 gün bildirim)</li>
            <li>Yıllık planlar yıl sonunda otomatik yenilenir (60 gün önceden iptal bildirimi)</li>
            <li>Hizmet şartlarının ihlali durumunda Median hizmeti sonlandırabilir</li>
            <li>Sonlandırma durumunda 90 gün içinde verilerinizi dışa aktarabilirsiniz</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">9. Uygulanacak Hukuk</h2>
          <p className="text-gray-700 font-semibold">
            Bu sözleşme Türkiye Cumhuriyeti yasalarına tabidir. İhtilaflar İstanbul mahkemelerinde çözülür.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">10. İletişim</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <p className="text-gray-700 font-semibold mb-4">Hizmet şartlarıyla ilgili sorularınız için:</p>
            <p className="text-gray-900 font-bold">Median Yasal Departmanı</p>
            <p className="text-gray-700 font-semibold">E-posta: legal@lydianmedi.com</p>
            <p className="text-gray-700 font-semibold">Telefon: +90 850 123 4567</p>
          </div>
        </div>
      </section>
    </div>
  );
}

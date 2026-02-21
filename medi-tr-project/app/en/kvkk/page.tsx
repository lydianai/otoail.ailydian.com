'use client';

import Header from '@/components/layout/Header';
import { Shield, CheckCircle, FileText, Lock } from 'lucide-react';

export default function TurkishKVKKPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-gray-900 mb-6">KVKK Uyumluluğu</h1>
          <p className="text-xl text-gray-600 font-semibold">Kişisel Verilerin Korunması Kanunu (Kanun No. 6698)</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12">
            <Shield className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-4">KVKK'ya Tam Uyumluluk</h2>
            <p className="text-gray-700 font-semibold">
              Median, 7 Nisan 2016 tarihinde yürürlüğe giren 6698 sayılı Kişisel Verilerin Korunması Kanunu'na (KVKK) tam uyum sağlar. Bu sayfa, Türkiye'deki sağlık tesisleri için KVKK uyumluluk önlemlerimizi detaylandırır.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">KVKK Kapsamında Veri İşleme İlkeleri</h2>
          <p className="text-gray-700 font-semibold mb-4">KVKK'nın 4. maddesinde belirtilen ilkelere tam uyum:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>Hukuka ve Dürüstlük Kuralına Uygun İşleme:</strong> Tüm veri işleme faaliyetleri yasal çerçevede</li>
            <li><strong>Doğru ve Gerektiğinde Güncel Olma:</strong> Hasta verilerinin güncelliğini koruma mekanizmaları</li>
            <li><strong>Belirli, Açık ve Meşru Amaçlar İçin İşleme:</strong> Sadece sağlık hizmeti sunumu için</li>
            <li><strong>İşlendikleri Amaçla Bağlantılı, Sınırlı ve Ölçülü Olma:</strong> Minimum veri toplama prensibi</li>
            <li><strong>İlgili Mevzuatta Öngörülen Süre Kadar Saklama:</strong> Sağlık mevzuatına uygun saklama süreleri</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Veri Sahibinin Hakları (KVKK m.11)</h2>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-black text-gray-900 mb-4">Median Veri Sahibi Hakları Portalı</h3>
            <p className="text-gray-700 font-semibold mb-4">
              KVKK'nın 11. maddesi kapsamında, veri sahipleri aşağıdaki haklara sahiptir:
            </p>
            <ul className="space-y-3 text-gray-700 font-semibold">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Kişisel verisinin işlenip işlenmediğini öğrenme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Düzeltme, silme ve yok edilme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">VERBİS Kaydı ve Veri Envanteri</h2>
          <p className="text-gray-700 font-semibold">
            Median, Veri Sorumluları Sicil Bilgi Sistemi (VERBİS) üzerinde kayıtlıdır ve aşağıdaki veri envanterini tutar:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>Veri Kategorileri:</strong> Kimlik, iletişim, sağlık, finans bilgileri</li>
            <li><strong>İşleme Amaçları:</strong> Sağlık hizmeti sunumu, faturalandırma, yasal yükümlülükler</li>
            <li><strong>Veri Aktarım Bilgileri:</strong> e-Nabız, SGK Medula, sigorta şirketleri</li>
            <li><strong>Saklama Süreleri:</strong> Sağlık mevzuatı ve KVKK gerekliliklerine uygun</li>
            <li><strong>Güvenlik Önlemleri:</strong> Teknik ve idari güvenlik tedbirleri</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Açık Rıza Yönetimi</h2>
          <p className="text-gray-700 font-semibold mb-4">
            KVKK'nın 3. maddesinde tanımlanan açık rıza gerekliliklerine uyum:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Belirli bir konuya ilişkin, bilgilendirilmeye dayanan açık rıza alınır</li>
            <li>Rıza metinleri anlaşılır Türkçe ile hazırlanır</li>
            <li>Rıza kayıtları elektronik ortamda güvenli bir şekilde saklanır</li>
            <li>Hastalar rızalarını geri çekme hakkına sahiptir</li>
            <li>Özel nitelikli kişisel veriler için ayrı açık rıza alınır</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Veri Güvenliği Önlemleri</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <Lock className="h-8 w-8 text-red-500 mb-3" />
              <h3 className="text-xl font-black text-gray-900 mb-3">Teknik Tedbirler</h3>
              <ul className="space-y-2 text-sm text-gray-700 font-semibold">
                <li><CheckCircle className="h-4 w-4 text-red-500 inline mr-2" />AES-256 şifreleme</li>
                <li><CheckCircle className="h-4 w-4 text-red-500 inline mr-2" />Güvenlik duvarı ve IDS/IPS</li>
                <li><CheckCircle className="h-4 w-4 text-red-500 inline mr-2" />Düzenli güvenlik testleri</li>
                <li><CheckCircle className="h-4 w-4 text-red-500 inline mr-2" />Güvenli yedekleme sistemleri</li>
              </ul>
            </div>

            <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-6">
              <FileText className="h-8 w-8 text-rose-600 mb-3" />
              <h3 className="text-xl font-black text-gray-900 mb-3">İdari Tedbirler</h3>
              <ul className="space-y-2 text-sm text-gray-700 font-semibold">
                <li><CheckCircle className="h-4 w-4 text-rose-600 inline mr-2" />Veri sorumlusu/yönetici atama</li>
                <li><CheckCircle className="h-4 w-4 text-rose-600 inline mr-2" />Personel eğitimleri</li>
                <li><CheckCircle className="h-4 w-4 text-rose-600 inline mr-2" />Gizlilik sözleşmeleri</li>
                <li><CheckCircle className="h-4 w-4 text-rose-600 inline mr-2" />Erişim yetki matrisi</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Veri İhlali Bildirimi</h2>
          <p className="text-gray-700 font-semibold">
            KVKK'nın 12. maddesi uyarınca veri ihlali durumunda:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>İhlal durumu en kısa sürede ilgili veri sahiplerine bildirilir</li>
            <li>Kişisel Verileri Koruma Kurulu'na 72 saat içinde bildirim yapılır</li>
            <li>İhlalin niteliği, nedenleri ve alınan tedbirler detaylandırılır</li>
            <li>Olay müdahale ekibi 7/24 hazır durumdadır</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Veri Aktarımları</h2>
          <p className="text-gray-700 font-semibold mb-4">
            Median üzerinden gerçekleştirilen veri aktarımları:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>e-Nabız:</strong> T.C. Sağlık Bakanlığı yasal yükümlülük (HL7 v2.x protokolü ile)</li>
            <li><strong>SGK Medula:</strong> Sosyal Güvenlik Kurumu provizyon ve fatura (Web Services ile)</li>
            <li><strong>Özel Sigortalar:</strong> Hasta açık rızası ile, sigorta ödemesi amaçlı</li>
            <li><strong>Üçüncü Taraf Sağlık Kuruluşları:</strong> Sevk durumlarında, hasta rızası ile</li>
            <li><strong>Yurt Dışı:</strong> Veriler Türkiye sınırları dışına çıkarılmaz (KVKK m.9 uyarınca)</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Veri Saklama ve İmha</h2>
          <p className="text-gray-700 font-semibold">
            KVKK'nın 7. maddesinde belirtilen saklama ilkelerine uygun olarak:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>Hasta kayıtları Sağlık Bakanlığı mevzuatına uygun sürelerle saklanır</li>
            <li>Saklama süresi sona eren veriler güvenli imha prosedürüyle silinir</li>
            <li>Veri silme/imha kayıtları tutulur ve denetlenir</li>
            <li>İmha işlemleri veri sahibine bildirilir</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Başvuru Yöntemleri</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <p className="text-gray-700 font-semibold mb-4">KVKK haklarınızı kullanmak için başvuru yöntemleriniz:</p>

            <div className="space-y-4">
              <div>
                <p className="text-gray-900 font-bold">1. Yazılı Başvuru</p>
                <p className="text-gray-700 font-semibold">
                  Median Sağlık Teknolojileri A.Ş.<br />
                  Veri Koruma Sorumlusu<br />
                  [Adres Bilgisi]<br />
                  İstanbul, Türkiye
                </p>
              </div>

              <div>
                <p className="text-gray-900 font-bold">2. Kayıtlı Elektronik Posta (KEP)</p>
                <p className="text-gray-700 font-semibold">kvkk@lydianmedi.com</p>
              </div>

              <div>
                <p className="text-gray-900 font-bold">3. Güvenli E-posta</p>
                <p className="text-gray-700 font-semibold">kvkk@lydianmedi.com</p>
              </div>

              <div>
                <p className="text-gray-900 font-bold">4. Median Portalı</p>
                <p className="text-gray-700 font-semibold">
                  Median platformu üzerindeki "KVKK Başvuru" modülü aracılığıyla
                </p>
              </div>
            </div>

            <p className="text-gray-700 font-semibold mt-6">
              <strong>Başvuru Yanıt Süresi:</strong> KVKK'nın 13. maddesi uyarınca başvurular en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. İşlemin maliyet gerektirmesi halinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Şikayet ve İtiraz Hakkı</h2>
          <p className="text-gray-700 font-semibold">
            KVKK'nın 14. maddesi uyarınca, başvurunuzun reddedilmesi, verilen cevabın yetersiz bulunması veya süresinde cevap verilmemesi halinde; öğrendiğiniz tarihten itibaren 30 gün ve her halde başvuru tarihinden itibaren 60 gün içinde Kişisel Verileri Koruma Kurulu'na şikayette bulunma hakkına sahipsiniz.
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mt-8">
            <p className="text-gray-900 font-bold mb-2">Kişisel Verileri Koruma Kurumu</p>
            <p className="text-gray-700 font-semibold">
              Web: https://www.kvkk.gov.tr<br />
              E-posta: kvkk@kvkk.gov.tr<br />
              Telefon: 0 (312) 216 50 50
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

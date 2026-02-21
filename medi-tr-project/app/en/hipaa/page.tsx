'use client';

import Header from '@/components/layout/Header';
import { Shield, CheckCircle, Lock, Eye } from 'lucide-react';

export default function TurkishHIPAAPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-gray-900 mb-6">HIPAA Uyumluluğu</h1>
          <p className="text-xl text-gray-600 font-semibold">ABD Sağlık Sigortası Taşınabilirlik ve Sorumluluk Yasası</p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-12">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-4">HIPAA Uyumlu Platform</h2>
            <p className="text-gray-700 font-semibold">
              Median, ABD'deki sağlık tesisleri için Health Insurance Portability and Accountability Act (HIPAA) 2025 Güvenlik Kuralı gereksinimlerine tam uyumludur. Bu sayfa, ABD müşterilerimiz için HIPAA uyumluluk önlemlerimizi detaylandırır.
            </p>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">HIPAA Güvenlik Kuralı Uyumluluğu</h2>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <Lock className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="text-xl font-black text-gray-900 mb-3">Teknik Güvenlik Önlemleri</h3>
              <ul className="space-y-2 text-sm text-gray-700 font-semibold">
                <li><CheckCircle className="h-4 w-4 text-green-600 inline mr-2" />Erişim kontrolü (45 CFR § 164.312(a)(1))</li>
                <li><CheckCircle className="h-4 w-4 text-green-600 inline mr-2" />Denetim kontrolleri (45 CFR § 164.312(b))</li>
                <li><CheckCircle className="h-4 w-4 text-green-600 inline mr-2" />Bütünlük kontrolleri (45 CFR § 164.312(c)(1))</li>
                <li><CheckCircle className="h-4 w-4 text-green-600 inline mr-2" />Aktarım güvenliği (45 CFR § 164.312(e)(1))</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <Eye className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-black text-gray-900 mb-3">İdari Güvenlik Önlemleri</h3>
              <ul className="space-y-2 text-sm text-gray-700 font-semibold">
                <li><CheckCircle className="h-4 w-4 text-blue-600 inline mr-2" />Risk analizi (45 CFR § 164.308(a)(1)(ii)(A))</li>
                <li><CheckCircle className="h-4 w-4 text-blue-600 inline mr-2" />Risk yönetimi (45 CFR § 164.308(a)(1)(ii)(B))</li>
                <li><CheckCircle className="h-4 w-4 text-blue-600 inline mr-2" />İşgücü güvenliği (45 CFR § 164.308(a)(3))</li>
                <li><CheckCircle className="h-4 w-4 text-blue-600 inline mr-2" />Bilgi erişim yönetimi (45 CFR § 164.308(a)(4))</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Şifreleme ve Veri Koruması</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>256-bit AES Şifreleme:</strong> Durağan tüm ePHI (elektronik Korunan Sağlık Bilgileri) için</li>
            <li><strong>TLS 1.3:</strong> Aktarım sırasındaki tüm veriler için</li>
            <li><strong>Veritabanı Seviyesi Şifreleme:</strong> Ek koruma katmanı</li>
            <li><strong>Anahtar Yönetimi:</strong> AWS KMS ile HSM destekli anahtar depolama</li>
            <li><strong>Şifreli Yedeklemeler:</strong> Tüm yedeklemeler şifrelenir ve güvenli olarak saklanır</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Erişim Kontrolü ve Kimlik Doğrulama</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>Çok Faktörlü Kimlik Doğrulama (MFA):</strong> Tüm kullanıcı hesapları için zorunlu</li>
            <li><strong>Rol Tabanlı Erişim Kontrolü (RBAC):</strong> Granüler izin yönetimi</li>
            <li><strong>Tek Oturum Açma (SSO):</strong> SAML 2.0 desteği ile</li>
            <li><strong>Otomatik Oturum Kapatma:</strong> 15 dakika hareketsizlikten sonra</li>
            <li><strong>IP Beyaz Listesi:</strong> Kurumsal düzey erişim kısıtlamaları</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Denetim ve İzleme</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>Kapsamlı Denetim Günlükleri:</strong> Tüm ePHI erişimi ve değişikliklerinin kaydı</li>
            <li><strong>Gerçek Zamanlı İzleme:</strong> SIEM sistemi ile anormal aktivite tespiti</li>
            <li><strong>Denetim Günlüğü Saklama:</strong> 7 yıl süreyle saklanır</li>
            <li><strong>Düzenli Güvenlik Denetimleri:</strong> Yıllık penetrasyon testleri ve güvenlik değerlendirmeleri</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">İş Ortağı Anlaşmaları (BAA)</h2>
          <p className="text-gray-700 font-semibold">
            Median, HIPAA'nın İş Ortağı (Business Associate) olarak, tüm kapsanan kuruluşlarla İş Ortağı Anlaşması (BAA) imzalar. BAA'mız şunları içerir:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>ePHI kullanımı ve ifşası için izin verilen kullanımlar</li>
            <li>Güvenlik önlemleri ve alt-yüklenici gereksinimleri</li>
            <li>İhlal bildirimi prosedürleri (72 saat içinde)</li>
            <li>Sonlandırma durumunda ePHI iadesi veya imhası</li>
            <li>Denetim hakları ve uyumluluk raporlaması</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">İhlal Bildirimi</h2>
          <p className="text-gray-700 font-semibold">
            HIPAA İhlal Bildirim Kuralına (45 CFR §§ 164.400-414) uygun olarak:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li>İhlalleri keşfedilmesinden itibaren 60 gün içinde bildirilir</li>
            <li>500'den fazla kişiyi etkileyen ihlaller HHS'ye ve medyaya bildirilir</li>
            <li>Olay müdahale ekibi 7/24 hazırdır</li>
            <li>Adli analiz ve düzeltici eylem süreçleri mevcuttur</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Felaket Kurtarma ve İş Sürekliliği</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 font-semibold">
            <li><strong>RPO (Kurtarma Noktası Hedefi):</strong> 15 dakikadan az</li>
            <li><strong>RTO (Kurtarma Zamanı Hedefi):</strong> 4 saat</li>
            <li><strong>Coğrafi Yedeklilik:</strong> Çoklu ABD veri merkezi bölgeleri</li>
            <li><strong>Otomatik Yük Devretme:</strong> Kesinti durumunda</li>
            <li><strong>Düzenli Felaket Kurtarma Testleri:</strong> Üç ayda bir</li>
          </ul>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">Sertifikasyonlar</h2>
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-black text-gray-900 mb-2">SOC 2 Type II</h3>
              <p className="text-sm text-gray-600 font-semibold">Yıllık bağımsız denetim</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-black text-gray-900 mb-2">HITRUST CSF</h3>
              <p className="text-sm text-gray-600 font-semibold">Sağlık BT güvenlik çerçevesi</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-black text-gray-900 mb-2">HL7 FHIR R5</h3>
              <p className="text-sm text-gray-600 font-semibold">Birlikte çalışabilirlik standardı</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-12 mb-6">İletişim</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <p className="text-gray-700 font-semibold mb-4">HIPAA uyumluluğu veya BAA talepleri için:</p>
            <p className="text-gray-900 font-bold">HIPAA Uyumluluk Sorumlusu</p>
            <p className="text-gray-700 font-semibold">E-posta: hipaa@lydianmedi.com</p>
            <p className="text-gray-700 font-semibold">Telefon: +1 (888) 123-4567</p>
            <p className="text-gray-700 font-semibold mt-4">
              BAA talepleri 48 saat içinde işlenir ve imzalanır.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

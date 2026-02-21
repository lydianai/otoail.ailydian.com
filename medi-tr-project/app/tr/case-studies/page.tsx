'use client';

import React, { useState } from 'react';
import { Building2, TrendingUp, Users, Clock, Download, Filter, Search, CheckCircle, ArrowRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  hospital: string;
  location: string;
  size: 'small' | 'medium' | 'large';
  sizeLabel: string;
  specialty: string;
  modules: string[];
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    icon: string;
  }[];
  timeline: string;
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  pdfUrl: string;
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'ankara-sehir',
    title: 'Ankara Şehir Hastanesi: %42 Gelir Artışı ile 18 Ayda ROI',
    hospital: 'Ankara Şehir Hastanesi',
    location: 'Ankara',
    size: 'large',
    sizeLabel: '750 Yatak',
    specialty: 'Genel Hastane',
    modules: ['HBYS', 'Faturalandırma', 'e-Nabız', 'Medula'],
    challenge: 'Ankara Şehir Hastanesi, eski altyapısı nedeniyle SGK faturalandırmasında yüksek red oranları (%23) ve manuel süreçlerden kaynaklanan gelir kaybı yaşıyordu. Günlük 2,500+ hasta trafiği ile mevcut sistem yetersiz kalıyor, personel verimsiz çalışıyordu.',
    solution: 'Median HBYS tam entegrasyonu ile tüm klinik süreçler dijitalleştirildi. Akıllı faturalandırma modülü SGK kurallarını otomatik kontrol ediyor, e-Nabız ve Medula entegrasyonu gerçek zamanlı çalışıyor. 750 yatak kapasiteli hastanede 1,200+ personel 3 haftalık yoğun eğitimden geçti.',
    results: [
      { metric: 'Gelir Artışı', value: '%42', icon: 'trending-up' },
      { metric: 'SGK Red Oranı', value: '%4.2', icon: 'check-circle' },
      { metric: 'Fatura İşlem Süresi', value: '-65%', icon: 'clock' },
      { metric: 'ROI Süresi', value: '18 Ay', icon: 'dollar-sign' }
    ],
    timeline: '6 ay uygulama, 12 ay tam ROI',
    testimonial: {
      quote: 'Median ile faturalandırma süreçlerimiz tamamen değişti. SGK red oranımız %23\'ten %4\'e düştü ve gelir kaybımızı neredeyse sıfırladık. Sistemin e-Nabız entegrasyonu kusursuz çalışıyor.',
      author: 'Dr. Mehmet Yılmaz',
      position: 'Başhekim, Ankara Şehir Hastanesi'
    },
    pdfUrl: '/case-studies/ankara-sehir-hastanesi.pdf',
    image: '/images/case-studies/ankara-hospital.jpg'
  },
  {
    id: 'istanbul-ozel',
    title: 'İstanbul Özel Sağlık Merkezi: Acil Servis Bekleme Süresini %35 Azalttı',
    hospital: 'İstanbul Özel Sağlık Merkezi',
    location: 'İstanbul',
    size: 'medium',
    sizeLabel: '120 Yatak',
    specialty: 'Acil & Travma',
    modules: ['Acil Servis', 'Hasta Takip', 'PACS', 'Laboratuvar'],
    challenge: 'Acil serviste hasta bekleme süreleri ortalama 95 dakikaya ulaşmış, hasta memnuniyeti %62\'ye düşmüştü. Kağıt bazlı triyaj sistemi ve manuel laboratuvar sonuç takibi kritik vakalarda zaman kaybına neden oluyordu.',
    solution: 'Median Acil Servis modülü ile dijital triyaj, otomatik yatak yönetimi ve laboratuvar-PACS entegrasyonu hayata geçirildi. Mobil uygulama ile doktorlar laboratuvar sonuçlarına ve görüntüleme raporlarına anında erişebiliyor. Akıllı kuyruk yönetimi hasta akışını optimize etti.',
    results: [
      { metric: 'Bekleme Süresi', value: '-35%', icon: 'clock' },
      { metric: 'Hasta Memnuniyeti', value: '%91', icon: 'users' },
      { metric: 'Yatak Doluluk Oranı', value: '%87', icon: 'building' },
      { metric: 'Kritik Müdahale Süresi', value: '-42%', icon: 'trending-down' }
    ],
    timeline: '3 ay uygulama',
    testimonial: {
      quote: 'Acil servisimizde devrim yarattı. Triyaj süreci artık 2 dakika, laboratuvar sonuçları otomatik geliyor. Hasta memnuniyetimiz %91\'e çıktı, en önemlisi hayat kurtarma sürelerimiz kısaldı.',
      author: 'Uzm. Dr. Ayşe Demir',
      position: 'Acil Servis Koordinatörü, İstanbul Özel Sağlık Merkezi'
    },
    pdfUrl: '/case-studies/istanbul-ozel-saglik.pdf',
    image: '/images/case-studies/istanbul-emergency.jpg'
  },
  {
    id: 'izmir-onkoloji',
    title: 'İzmir Onkoloji Merkezi: e-Nabız Entegrasyonu ile Hasta Memnuniyeti %89\'a Çıktı',
    hospital: 'İzmir Onkoloji Merkezi',
    location: 'İzmir',
    size: 'medium',
    sizeLabel: '85 Yatak',
    specialty: 'Onkoloji',
    modules: ['HBYS', 'e-Nabız', 'Kemoterapi Yönetimi', 'Randevu'],
    challenge: 'Kemoterapi protokol takibi manuel yapılıyor, hasta geçmişi farklı sistemlerde dağınık halde bulunuyordu. e-Nabız entegrasyonu olmadığı için hastalar sürekli evrak getirmek zorunda kalıyordu. İlaç stok yönetiminde sık sık hatalar oluyordu.',
    solution: 'Median ile kemoterapi protokol yönetimi otomatikleştirildi, e-Nabız tam entegrasyonu sayesinde hasta geçmişi tek ekrandan görülebiliyor. Akıllı ilaç stok sistemi, son kullanma tarihlerini takip ediyor ve otomatik sipariş veriyor. Hasta portalı ile randevu ve sonuç takibi online hale geldi.',
    results: [
      { metric: 'Hasta Memnuniyeti', value: '%89', icon: 'users' },
      { metric: 'Protokol Hataları', value: '-78%', icon: 'check-circle' },
      { metric: 'İlaç İsrafı', value: '-45%', icon: 'trending-down' },
      { metric: 'e-Nabız Entegrasyon', value: '%100', icon: 'link' }
    ],
    timeline: '4 ay uygulama',
    testimonial: {
      quote: 'e-Nabız entegrasyonu sayesinde hastalarımızın tüm geçmişini görüyoruz. Kemoterapi protokol yönetimi artık %100 güvenli, ilaç stok takibimiz mükemmel. Hasta memnuniyetimiz rekor seviyede.',
      author: 'Prof. Dr. Zeynep Kara',
      position: 'Medikal Onkoloji Bölüm Başkanı, İzmir Onkoloji Merkezi'
    },
    pdfUrl: '/case-studies/izmir-onkoloji.pdf',
    image: '/images/case-studies/izmir-oncology.jpg'
  },
  {
    id: 'bursa-fizik-tedavi',
    title: 'Bursa Fizik Tedavi Kliniği: Dijitalleşme ile 3 Kat Büyüme',
    hospital: 'Bursa Fizik Tedavi ve Rehabilitasyon Kliniği',
    location: 'Bursa',
    size: 'small',
    sizeLabel: '15 Yatak',
    specialty: 'Fizik Tedavi',
    modules: ['Poliklinik', 'Randevu', 'Faturalandırma', 'Hasta Portal'],
    challenge: 'Küçük bir klinik olarak manuel randevu sistemi, kağıt dosyalar ve Excel\'de faturalandırma ile çalışıyorlardı. Hasta takibi zor, randevu iptalleri yüksek (%32), SGK faturalandırmasında sürekli sorunlar yaşanıyordu. Büyüme hedefleri vardı ama altyapı yetersizdi.',
    solution: 'Median\'in küçük klinikler için özel paketi ile online randevu sistemi, dijital hasta dosyaları ve otomatik faturalandırma kuruldu. WhatsApp entegrasyonu ile randevu hatırlatmaları, hasta portalı ile egzersiz programları paylaşımı başladı. Bulut tabanlı sistem sayesinde IT masrafı olmadan çalıştı.',
    results: [
      { metric: 'Hasta Sayısı', value: '+215%', icon: 'users' },
      { metric: 'Randevu İptali', value: '-68%', icon: 'calendar' },
      { metric: 'Gelir Artışı', value: '+187%', icon: 'trending-up' },
      { metric: 'SGK İşlem Süresi', value: '-85%', icon: 'clock' }
    ],
    timeline: '2 ay uygulama',
    testimonial: {
      quote: 'Median sayesinde küçük kliniğimiz modern bir sağlık kurumu haline geldi. Online randevu sistemi hasta sayımızı 3 katına çıkardı. Artık hastalarımız mobil uygulamadan egzersiz programlarını takip ediyor.',
      author: 'Uzm. Fzt. Elif Çelik',
      position: 'Kurucu Ortak, Bursa Fizik Tedavi Kliniği'
    },
    pdfUrl: '/case-studies/bursa-fizik-tedavi.pdf',
    image: '/images/case-studies/bursa-clinic.jpg'
  },
  {
    id: 'antalya-goz',
    title: 'Antalya Göz Hastanesi: PACS Entegrasyonu ile Rapor Süresi 4 Saate İndi',
    hospital: 'Antalya Göz Hastanesi',
    location: 'Antalya',
    size: 'medium',
    sizeLabel: '65 Yatak',
    specialty: 'Göz Hastalıkları',
    modules: ['PACS', 'Ameliyathane', 'Görüntü İşleme', 'AI Destekli Tanı'],
    challenge: 'Göz taramalarından elde edilen yüksek çözünürlüklü görüntüler farklı sistemlerde saklanıyor, doktorlar rapor için ortalama 12 saat bekliyordu. Retina taramalarının manuel analizi hem zaman alıyor hem de hata payı yüksekti. Görüntü arşivleme maliyetleri kontrolden çıkmıştı.',
    solution: 'Median PACS sistemi ile tüm görüntüleme cihazları entegre edildi. AI destekli retina analiz modülü diyabetik retinopati tespitinde doktorlara yardımcı oluyor. Bulut tabanlı arşivleme ile maliyet %60 azaldı. Tele-oftalmoloji özelliği ile uzaktan konsültasyon başladı.',
    results: [
      { metric: 'Rapor Süresi', value: '4 Saat', icon: 'clock' },
      { metric: 'Tanı Doğruluğu', value: '+23%', icon: 'check-circle' },
      { metric: 'Arşivleme Maliyeti', value: '-60%', icon: 'trending-down' },
      { metric: 'AI Kullanım', value: '%100', icon: 'cpu' }
    ],
    timeline: '5 ay uygulama',
    testimonial: {
      quote: 'PACS sisteminin AI entegrasyonu inanılmaz. Retina taramalarında erken dönem diyabetik retinopati tespiti %23 arttı. Artık 4 saat içinde rapor veriyoruz, maliyet de yarı yarıya düştü.',
      author: 'Op. Dr. Murat Öztürk',
      position: 'Başhekim, Antalya Göz Hastanesi'
    },
    pdfUrl: '/case-studies/antalya-goz.pdf',
    image: '/images/case-studies/antalya-eye.jpg'
  },
  {
    id: 'adana-kadin',
    title: 'Adana Kadın Doğum Hastanesi: Doğum Takibi ile Komplikasyon %47 Azaldı',
    hospital: 'Adana Kadın Doğum Hastanesi',
    location: 'Adana',
    size: 'medium',
    sizeLabel: '95 Yatak',
    specialty: 'Kadın Doğum',
    modules: ['Doğum Takip', 'NST Monitörizasyon', 'Yenidoğan', 'e-Nabız'],
    challenge: 'Yılda 3,500+ doğum yapan hastanede NST monitörleri manuel takip ediliyordu. Gebelik sürecinde hasta takibi dosyalarda, acil durumlarda bilgiye ulaşmak zaman alıyordu. Doğum salonları arasında koordinasyon sorunları yaşanıyordu.',
    solution: 'Median Doğum Takip modülü ile NST monitörleri merkezi sisteme entegre edildi. Gebe takip kartı dijitalleşti, risk skorlaması otomatik yapılıyor. Doğum salonu yönetim sistemi ile yatak koordinasyonu optimize edildi. Acil durumlar için erken uyarı sistemi kuruldu.',
    results: [
      { metric: 'Doğum Komplikasyonu', value: '-47%', icon: 'trending-down' },
      { metric: 'NST Takip', value: '%100 Otomatik', icon: 'activity' },
      { metric: 'Acil Müdahale', value: '-35%', icon: 'clock' },
      { metric: 'Hasta Memnuniyeti', value: '%94', icon: 'users' }
    ],
    timeline: '4 ay uygulama',
    testimonial: {
      quote: 'NST monitörlerinin otomatik takibi ve erken uyarı sistemi hayat kurtarıyor. Komplikasyon oranımız yarı yarıya düştü. Anne adaylarımız dijital gebe kartlarını çok sevdi.',
      author: 'Uzm. Dr. Selin Aydın',
      position: 'Kadın Doğum Uzmanı, Adana Kadın Doğum Hastanesi'
    },
    pdfUrl: '/case-studies/adana-kadin-dogum.pdf',
    image: '/images/case-studies/adana-maternity.jpg'
  },
  {
    id: 'kocaeli-dis',
    title: 'Kocaeli Diş Hastanesi: 3D Görüntüleme ile Tedavi Planlaması Dijitalleşti',
    hospital: 'Kocaeli Ağız ve Diş Sağlığı Hastanesi',
    location: 'Kocaeli',
    size: 'small',
    sizeLabel: '22 Ünit',
    specialty: 'Diş Hekimliği',
    modules: ['Diş HBYS', '3D Görüntüleme', 'Randevu', 'Laboratuvar Entegrasyonu'],
    challenge: 'İmplant planlamaları manuel yapılıyor, panoramik röntgenler CD\'lerde saklanıyordu. Diş laboratuvarı ile iletişim telefon ve WhatsApp üzerinden, hatalı ölçüler sık protez yenilenmelerine neden oluyordu. Hasta randevularının %40\'ı gelmiyordu.',
    solution: 'Median Diş HBYS ile 3D görüntüleme entegrasyonu, dijital implant planlaması ve laboratuvar iletişim modülü kuruldu. Otomatik SMS/WhatsApp hatırlatmaları, online randevu sistemi ve hasta portal eklendi. Tüm röntgenler bulutta arşivleniyor.',
    results: [
      { metric: 'İmplant Başarı', value: '+28%', icon: 'check-circle' },
      { metric: 'Protez Tekrarı', value: '-72%', icon: 'trending-down' },
      { metric: 'Randevu Katılım', value: '%88', icon: 'calendar' },
      { metric: 'Dijital İş Akışı', value: '%100', icon: 'workflow' }
    ],
    timeline: '3 ay uygulama',
    testimonial: {
      quote: '3D görüntüleme entegrasyonu implant planlamalarını mükemmelleştirdi. Laboratuvar ile dijital iletişim protez hatalarını %72 azalttı. Hasta randevularına gelme oranı %88\'e çıktı.',
      author: 'Dt. Ahmet Yalçın',
      position: 'Başhekim, Kocaeli Ağız ve Diş Sağlığı Hastanesi'
    },
    pdfUrl: '/case-studies/kocaeli-dis.pdf',
    image: '/images/case-studies/kocaeli-dental.jpg'
  },
  {
    id: 'gaziantep-kalp',
    title: 'Gaziantep Kalp Merkezi: Kardiyak Kateterizasyon Raporları Gerçek Zamanlı',
    hospital: 'Gaziantep Kardiyovasküler Merkezi',
    location: 'Gaziantep',
    size: 'medium',
    sizeLabel: '140 Yatak',
    specialty: 'Kardiyoloji',
    modules: ['Kateter Lab', 'EKG Entegrasyonu', 'Yoğun Bakım', 'PACS'],
    challenge: 'Kateter laboratuvarında müdahale sırasında veriler manuel kaydediliyor, EKG cihazları entegre değildi. Yoğun bakımdan ameliyathaneye hasta transferinde bilgi kaybı oluyordu. Kardiyak görüntüleme raporları 24 saat gecikiyordu.',
    solution: 'Median Kateter Lab modülü ile anjiyografi cihazları, EKG monitörleri ve PACS sistemi entegre edildi. Yoğun bakım modülü ile hasta transferi dijitalleşti. AI destekli EKG analizi erken uyarı veriyor. Tüm kardiyak veriler tek platformda.',
    results: [
      { metric: 'Rapor Süresi', value: 'Gerçek Zamanlı', icon: 'clock' },
      { metric: 'EKG Analiz Doğruluğu', value: '+31%', icon: 'activity' },
      { metric: 'Transfer Güvenliği', value: '+89%', icon: 'shield' },
      { metric: 'Müdahale Süresi', value: '-22%', icon: 'trending-down' }
    ],
    timeline: '6 ay uygulama',
    testimonial: {
      quote: 'Kateter lab entegrasyonu devrim yarattı. Anjiyografi sırasında tüm veriler otomatik kaydediliyor. AI destekli EKG analizi kritik aritmileri önceden tespit ediyor. Hayat kurtarıcı bir sistem.',
      author: 'Prof. Dr. Hakan Özkan',
      position: 'Kardiyoloji Bölüm Başkanı, Gaziantep Kardiyovasküler Merkezi'
    },
    pdfUrl: '/case-studies/gaziantep-kalp.pdf',
    image: '/images/case-studies/gaziantep-cardiac.jpg'
  }
];

export default function CaseStudiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');

  const specialties = Array.from(new Set(caseStudies.map(cs => cs.specialty)));
  const allModules = Array.from(new Set(caseStudies.flatMap(cs => cs.modules)));

  const filteredCaseStudies = caseStudies.filter(cs => {
    const matchesSearch = cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cs.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cs.challenge.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = selectedSize === 'all' || cs.size === selectedSize;
    const matchesSpecialty = selectedSpecialty === 'all' || cs.specialty === selectedSpecialty;
    const matchesModule = selectedModule === 'all' || cs.modules.includes(selectedModule);

    return matchesSearch && matchesSize && matchesSpecialty && matchesModule;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Vaka Çalışmaları
            </h1>
            <p className="text-xl text-rose-100 mb-8">
              Median ile başarı hikayelerini keşfedin. Türkiye'nin önde gelen sağlık kurumları
              Median HBYS ile nasıl dijitalleşti, verimliliği artırdı ve hasta memnuniyetini zirveye taşıdı?
            </p>
            <div className="flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                <span className="text-lg font-semibold">{caseStudies.length} Başarı Hikayesi</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                <span className="text-lg font-semibold">Ortalama %120 ROI</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <span className="text-lg font-semibold">50,000+ Kullanıcı</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Hastane veya başarı arayın..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Size Filter */}
              <div>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">Tüm Boyutlar</option>
                  <option value="small">Küçük (&lt;50 yatak)</option>
                  <option value="medium">Orta (50-200 yatak)</option>
                  <option value="large">Büyük (200+ yatak)</option>
                </select>
              </div>

              {/* Specialty Filter */}
              <div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">Tüm Branşlar</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Module Filter */}
              <div>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">Tüm Modüller</option>
                  {allModules.map(module => (
                    <option key={module} value={module}>{module}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-rose-600">{filteredCaseStudies.length}</span> vaka çalışması bulundu
              </p>
              {(selectedSize !== 'all' || selectedSpecialty !== 'all' || selectedModule !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSize('all');
                    setSelectedSpecialty('all');
                    setSelectedModule('all');
                  }}
                  className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtreleri Temizle
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {filteredCaseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  {/* Left Column - Header & Stats */}
                  <div className="md:col-span-1 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-rose-600 mb-3">
                        <Building2 className="w-5 h-5" />
                        <span className="font-semibold">{caseStudy.sizeLabel} • {caseStudy.location}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {caseStudy.hospital}
                      </h2>
                      <p className="text-lg text-rose-600 font-semibold mb-4">
                        {caseStudy.title.split(':')[1]}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                          {caseStudy.specialty}
                        </span>
                      </div>
                    </div>

                    {/* Key Results */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-rose-600" />
                        Temel Sonuçlar
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {caseStudy.results.map((result, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-rose-50 to-red-50 p-3 rounded-lg border border-rose-200">
                            <div className="text-2xl font-bold text-rose-600 mb-1">
                              {result.value}
                            </div>
                            <div className="text-xs text-gray-700 font-medium">
                              {result.metric}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Modules Used */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm">Kullanılan Modüller:</h4>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.modules.map((module, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {module}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Case Study Details */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Challenge */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                          Zorluk
                        </span>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {caseStudy.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          Çözüm
                        </span>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {caseStudy.solution}
                      </p>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-rose-600" />
                      <span className="font-semibold">Süreç:</span>
                      <span>{caseStudy.timeline}</span>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl border-l-4 border-rose-600">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 italic mb-4">
                            "{caseStudy.testimonial.quote}"
                          </p>
                          <div>
                            <div className="font-bold text-gray-900">
                              {caseStudy.testimonial.author}
                            </div>
                            <div className="text-sm text-gray-600">
                              {caseStudy.testimonial.position}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Download CTA */}
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-lg hover:from-rose-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl">
                        <Download className="w-5 h-5" />
                        PDF İndir - Detaylı Vaka Çalışması
                      </button>
                      <button className="flex items-center gap-2 px-6 py-3 border-2 border-rose-600 text-rose-600 rounded-lg hover:bg-rose-50 transition-all">
                        <ArrowRight className="w-5 h-5" />
                        Demo Talep Et
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Siz de Başarı Hikayemizin Bir Parçası Olun
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Median ile hastanenizi dijitalleştirin, verimliliği artırın ve ROI'nizi maksimize edin.
              Türkiye'nin önde gelen sağlık kurumlarının tercihi.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 bg-white text-rose-600 rounded-lg hover:bg-rose-50 transition-all font-bold text-lg shadow-xl">
                Ücretsiz Demo Talep Et
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-rose-600 transition-all font-bold text-lg">
                Tüm Başarı Hikayeleri (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

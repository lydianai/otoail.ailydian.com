'use client';

import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, Play, CheckCircle, User, Search, Filter, ArrowRight, Mail, Building2, Phone, Download } from 'lucide-react';

interface Speaker {
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar: string;
}

interface Webinar {
  id: string;
  title: string;
  description: string;
  type: 'upcoming' | 'recorded';
  category: 'technical' | 'clinical' | 'business' | 'compliance';
  categoryLabel: string;
  date: string;
  time?: string;
  duration: string;
  speakers: Speaker[];
  agenda: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  views?: number;
  thumbnail: string;
  recordingUrl?: string;
  registrationUrl?: string;
  qnaHighlights?: string[];
  relatedResources?: string[];
}

const webinars: Webinar[] = [
  {
    id: 'e-nabiz-2024',
    title: 'e-Nabız 2024 Yeni Özellikleri ve Entegrasyon Best Practices',
    description: 'Sağlık Bakanlığı\'nın e-Nabız sistemindeki 2024 güncellemelerini detaylı inceleyin. Yeni API v4.2, genişletilmiş veri setleri, performans iyileştirmeleri ve entegrasyon senaryoları. Canlı kod örnekleri ve soru-cevap.',
    type: 'upcoming',
    category: 'technical',
    categoryLabel: 'Teknik',
    date: '2024-12-27',
    time: '14:00',
    duration: '90 dakika',
    speakers: [
      {
        name: 'Dr. Emre Yıldırım',
        title: 'Sağlık Bilişimi Uzmanı',
        company: 'Median R&D',
        bio: '12+ yıl sağlık bilişimi deneyimi. e-Nabız entegrasyon projeleri liderliği yaptı.',
        avatar: '/avatars/emre-yildirim.jpg'
      },
      {
        name: 'Yazılım Mimarı Burak Çelik',
        title: 'Enterprise Solutions Architect',
        company: 'Median Platform',
        bio: 'Türkiye\'nin en büyük e-Nabız entegrasyon projelerinde görev aldı. 50+ hastane entegrasyonu.',
        avatar: '/avatars/burak-celik.jpg'
      }
    ],
    agenda: [
      '14:00-14:15 - e-Nabız 2024 Yenilikleri Genel Bakış',
      '14:15-14:45 - API v4.2 Breaking Changes ve Migration',
      '14:45-15:15 - Yeni Veri Setleri: Aşı, Radyoloji, Patoloji',
      '15:15-15:45 - Performans Optimizasyonu ve Best Practices',
      '15:45-16:00 - Canlı Demo: e-Nabız Entegrasyonu',
      '16:00-16:30 - Soru & Cevap'
    ],
    learningOutcomes: [
      'e-Nabız API v4.2 yeniliklerini öğreneceksiniz',
      'Migration stratejileri ve breaking changes yönetimi',
      'Performans optimizasyonu teknikleri',
      'Gerçek dünya entegrasyon senaryoları'
    ],
    targetAudience: ['Yazılım Geliştiriciler', 'Sistem Mimarları', 'Bilgi İşlem Müdürleri', 'Entegrasyon Ekipleri'],
    thumbnail: '/webinars/e-nabiz-2024.jpg',
    registrationUrl: 'https://vitalcare.com/webinar/e-nabiz-2024'
  },
  {
    id: 'ai-radiology-demo',
    title: 'AI ile Radyoloji Raporlama: Canlı Demo ve Uygulamalar',
    description: 'Yapay zeka destekli radyoloji raporlama sistemlerinin hastanelerde nasıl kullanıldığını canlı demolar ile öğrenin. CNN modelleri, görüntü segmentasyonu, otomatik patoloji tespiti ve FDA onaylı AI sistemleri.',
    type: 'upcoming',
    category: 'clinical',
    categoryLabel: 'Klinik',
    date: '2025-01-03',
    time: '15:00',
    duration: '60 dakika',
    speakers: [
      {
        name: 'Dr. Elif Şahin',
        title: 'Radyoloji Uzmanı',
        company: 'İstanbul Üniversitesi Tıp Fakültesi',
        bio: 'AI destekli radyoloji sistemleri alanında araştırmacı. 50+ bilimsel yayın.',
        avatar: '/avatars/elif-sahin.jpg'
      },
      {
        name: 'ML Engineer Cem Özdemir',
        title: 'AI/ML Lead',
        company: 'Median AI Lab',
        bio: 'Medikal görüntüleme için derin öğrenme modelleri geliştiriyor.',
        avatar: '/avatars/cem-ozdemir.jpg'
      }
    ],
    agenda: [
      '15:00-15:15 - Radyolojide AI: Mevcut Durum',
      '15:15-15:35 - Canlı Demo: AI ile Göğüs X-ray Analizi',
      '15:35-15:50 - Model Eğitimi ve Performans Metrikleri',
      '15:50-16:00 - Soru & Cevap'
    ],
    learningOutcomes: [
      'AI destekli radyoloji sistemlerinin çalışma prensipleri',
      'Klinik pratikte uygulama senaryoları',
      'Model doğruluğu ve güvenilirlik değerlendirmesi',
      'FDA onay süreci ve regülasyonlar'
    ],
    targetAudience: ['Radyologlar', 'Tıbbi Görüntüleme Teknisyenleri', 'PACS Yöneticileri', 'Hastane Yöneticileri'],
    thumbnail: '/webinars/ai-radiology.jpg',
    registrationUrl: 'https://vitalcare.com/webinar/ai-radiology-demo'
  },
  {
    id: 'blockchain-health-records',
    title: 'Blockchain ile Sağlık Kayıtları: Gelecek mi, Hayal mi?',
    description: 'Blockchain teknolojisinin sağlık kayıtlarında kullanımı, avantajları, zorlukları ve gerçek dünya uygulamaları. Hasta verisinde güvenlik, interoperability ve veri sahipliği konuları.',
    type: 'upcoming',
    category: 'technical',
    categoryLabel: 'Teknik',
    date: '2025-01-10',
    time: '14:00',
    duration: '75 dakika',
    speakers: [
      {
        name: 'Prof. Dr. Ahmet Kaya',
        title: 'Blockchain Araştırmacısı',
        company: 'Boğaziçi Üniversitesi',
        bio: 'Blockchain ve dağıtık sistemler uzmanı. Sağlık sektöründe blockchain uygulamaları.',
        avatar: '/avatars/ahmet-kaya.jpg'
      }
    ],
    agenda: [
      '14:00-14:20 - Blockchain Temelleri',
      '14:20-14:45 - Sağlık Kayıtlarında Blockchain Kullanımı',
      '14:45-15:05 - Gerçek Dünya Örnekleri',
      '15:05-15:15 - Soru & Cevap'
    ],
    learningOutcomes: [
      'Blockchain temel prensipleri',
      'Sağlık sektöründe blockchain kullanım senaryoları',
      'Güvenlik ve privacy avantajları',
      'Uygulama zorlukları ve çözümleri'
    ],
    targetAudience: ['CIO\'lar', 'Sistem Mimarları', 'Veri Güvenliği Uzmanları', 'İnovasyon Liderleri'],
    thumbnail: '/webinars/blockchain-health.jpg',
    registrationUrl: 'https://vitalcare.com/webinar/blockchain-health'
  },
  {
    id: 'kvkk-health-data',
    title: 'KVKK ve Sağlık Verileri: Hukuki Uyumluluk Rehberi',
    description: 'KVKK kapsamında sağlık verilerinin işlenmesi, hasta rızası yönetimi, veri güvenliği gereksinimleri ve yaptırımlar. Gerçek vaka örnekleri ve uyumluluk check-list.',
    type: 'recorded',
    category: 'compliance',
    categoryLabel: 'Uyumluluk',
    date: '2024-11-20',
    duration: '45 dakika',
    speakers: [
      {
        name: 'Av. Zeynep Koç',
        title: 'Sağlık Hukuku ve Veri Koruma Uzmanı',
        company: 'Median Hukuk',
        bio: 'KVKK ve sağlık hukuku alanında 10+ yıl deneyim. 30+ hastaneye KVKK danışmanlığı.',
        avatar: '/avatars/zeynep-koc.jpg'
      }
    ],
    agenda: [
      'KVKK Genel Bakış ve Sağlık Verileri',
      'Özel Nitelikli Kişisel Veri Koruma',
      'Hasta Rızası: Açık Rıza vs İmzalı Rıza',
      'Veri İşleme Envanteri Oluşturma',
      'KVKK İhlalleri ve Yaptırımlar',
      'Soru & Cevap'
    ],
    learningOutcomes: [
      'KVKK madde 6 özel nitelikli veri koruması',
      'Hasta rızası yönetim stratejileri',
      'Veri işleme envanteri hazırlama',
      'İhlal durumunda yapılması gerekenler'
    ],
    targetAudience: ['Hastane Yöneticileri', 'Hukuk Müşavirleri', 'Bilgi İşlem Müdürleri', 'Veri Sorumluları'],
    views: 1234,
    thumbnail: '/webinars/kvkk-compliance.jpg',
    recordingUrl: 'https://vitalcare.com/webinar/kvkk-health-data/recording',
    qnaHighlights: [
      'S: Hasta rızası dijital ortamda alınabilir mi? C: Evet, nitelikli elektronik imza ile alınabilir.',
      'S: KVKK ihlal cezaları nedir? C: İdari para cezaları 2 milyon TL\'ye kadar çıkabilir.',
      'S: e-Nabız\'a veri gönderimi rıza gerektirir mi? C: Hayır, yasal yükümlülük kapsamında.'
    ]
  },
  {
    id: 'emergency-digitalization',
    title: 'Acil Servis Dijitalleşmesi: Best Practices ve Başarı Hikayeleri',
    description: 'Acil servislerde dijital dönüşüm stratejileri. Triyaj otomasyonu, yatak yönetimi, laboratuvar entegrasyonu ve hasta akışı optimizasyonu. 3 farklı hastanenin başarı hikayesi.',
    type: 'recorded',
    category: 'clinical',
    categoryLabel: 'Klinik',
    date: '2024-10-15',
    duration: '38 dakika',
    speakers: [
      {
        name: 'Uzm. Dr. Ayşe Demir',
        title: 'Acil Servis Koordinatörü',
        company: 'İstanbul Özel Sağlık Merkezi',
        bio: 'Acil servis dijitalleşmesi ile bekleme sürelerini %35 azalttı.',
        avatar: '/avatars/ayse-demir.jpg'
      }
    ],
    agenda: [
      'Acil Serviste Dijitalleşme İhtiyacı',
      'Dijital Triyaj Sistemleri',
      'Yatak Yönetimi ve Hasta Akışı',
      'Lab/PACS Entegrasyonu',
      'Başarı Hikayeleri: 3 Hastane Örneği',
      'Soru & Cevap'
    ],
    learningOutcomes: [
      'Acil servis dijitalleşme stratejileri',
      'Triyaj süreç optimizasyonu',
      'Hasta bekleme sürelerini azaltma',
      'Gerçek dünya ROI hesaplamaları'
    ],
    targetAudience: ['Acil Servis Hekimleri', 'Acil Koordinatörleri', 'Hastane Yöneticileri', 'Kalite Sorumluları'],
    views: 892,
    thumbnail: '/webinars/emergency-digital.jpg',
    recordingUrl: 'https://vitalcare.com/webinar/emergency-digitalization/recording',
    qnaHighlights: [
      'S: Dijital triyaj sistemi ne kadar sürede kurulur? C: 2-3 ay içinde tam entegrasyon.',
      'S: Personel eğitimi nasıl yapılıyor? C: 1 haftalık yoğun eğitim + sürekli destek.'
    ]
  },
  {
    id: 'sgk-ai-billing',
    title: 'SGK Faturalandırmada Yapay Zeka Kullanımı: Red Oranını %80 Düşürün',
    description: 'AI destekli SGK faturalandırma sistemleri ile red oranlarını minimuma indirin. Medula provizyon otomasyonu, tanı-işlem uyumluluk kontrolü ve gerçek zamanlı validasyon.',
    type: 'recorded',
    category: 'business',
    categoryLabel: 'İş Süreçleri',
    date: '2024-09-28',
    duration: '52 dakika',
    speakers: [
      {
        name: 'Ayşe Yılmaz',
        title: 'Sağlık Faturalandırma Uzmanı',
        company: 'Median İş Süreçleri',
        bio: '15+ yıl SGK faturalandırma deneyimi. 20+ hastaneye danışmanlık.',
        avatar: '/avatars/ayse-yilmaz.jpg'
      },
      {
        name: 'Data Scientist Murat Kara',
        title: 'AI/ML Engineer',
        company: 'Median AI Lab',
        bio: 'SGK red tahmin modelleri geliştirdi. %87 doğruluk oranı.',
        avatar: '/avatars/murat-kara.jpg'
      }
    ],
    agenda: [
      'SGK Faturalandırma Zorlukları',
      'Sık Karşılaşılan Red Kodları',
      'AI ile Red Tahmin Modelleri',
      'Otomatik Validasyon Sistemleri',
      'Başarı Hikayesi: Red Oranı %23 → %4',
      'Soru & Cevap'
    ],
    learningOutcomes: [
      'SGK red kodları ve çözümleri',
      'AI destekli fatura validasyonu',
      'Gelir kaybını önleme stratejileri',
      'ROI hesaplama metodolojisi'
    ],
    targetAudience: ['Faturalandırma Sorumluları', 'Mali İşler Müdürleri', 'Hastane Yöneticileri', 'Kalite Ekipleri'],
    views: 2156,
    thumbnail: '/webinars/sgk-ai-billing.jpg',
    recordingUrl: 'https://vitalcare.com/webinar/sgk-ai-billing/recording',
    qnaHighlights: [
      'S: AI modeli hangi verileri kullanıyor? C: Geçmiş fatura verileri, red geçmişi, tanı-işlem ilişkileri.',
      'S: Kurulum süresi ne kadar? C: Veri hazırlığı 2 hafta, model eğitimi 1 hafta, toplam 3-4 hafta.'
    ]
  },
  {
    id: 'telemedicine-best-practices',
    title: 'Teletıp Platform Yönetimi: Güvenlik, Uyumluluk ve Hasta Deneyimi',
    description: 'Teletıp platformlarının hastane sistemlerine entegrasyonu, KVKK uyumlu video konsültasyon, hasta verileri güvenliği ve kullanıcı deneyimi optimizasyonu.',
    type: 'recorded',
    category: 'technical',
    categoryLabel: 'Teknik',
    date: '2024-11-05',
    duration: '47 dakika',
    speakers: [
      {
        name: 'Yazılım Mimarı Burak Çelik',
        title: 'Cloud Solutions Architect',
        company: 'Median Platform',
        bio: 'Teletıp platformları mimarisi ve güvenlik uzmanı.',
        avatar: '/avatars/burak-celik.jpg'
      }
    ],
    agenda: [
      'Teletıp Platformları Genel Bakış',
      'WebRTC ile Güvenli Video Konsültasyon',
      'KVKK ve HIPAA Uyumluluğu',
      'Hasta Portal ve Mobil Uygulama',
      'Performans ve Ölçeklenebilirlik',
      'Soru & Cevap'
    ],
    learningOutcomes: [
      'Teletıp platform mimarisi',
      'Güvenlik ve şifreleme protokolleri',
      'Yasal uyumluluk gereksinimleri',
      'Hasta deneyimi optimizasyonu'
    ],
    targetAudience: ['CIO\'lar', 'Sistem Mimarları', 'Uygulama Geliştirici', 'Dijital Sağlık Liderleri'],
    views: 743,
    thumbnail: '/webinars/telemedicine.jpg',
    recordingUrl: 'https://vitalcare.com/webinar/telemedicine-best-practices/recording'
  },
  {
    id: 'iot-patient-monitoring',
    title: 'IoT ile Hasta Monitörizasyonu: Gerçek Zamanlı Veri ve Erken Uyarı',
    description: 'IoT cihazları ile hastane ve evde hasta monitörizasyonu. Wearable devices, vital signs izleme, erken uyarı sistemleri ve AI destekli anomali tespiti.',
    type: 'recorded',
    category: 'technical',
    categoryLabel: 'Teknik',
    date: '2024-10-08',
    duration: '41 dakika',
    speakers: [
      {
        name: 'IoT Uzmanı Cem Özkan',
        title: 'IoT Solutions Architect',
        company: 'Median IoT Lab',
        bio: 'Medikal IoT cihazları entegrasyonu ve veri analitiği.',
        avatar: '/avatars/cem-ozkan.jpg'
      }
    ],
    agenda: [
      'Sağlıkta IoT: Mevcut Durum',
      'Vital Signs Monitörizasyon Cihazları',
      'HBYS ile IoT Entegrasyonu',
      'Erken Uyarı Skorlama Sistemleri',
      'Güvenlik ve Veri Yönetimi',
      'Soru & Cevap'
    ],
    learningOutcomes: [
      'IoT cihazları ile hasta izleme',
      'HBYS entegrasyon stratejileri',
      'Erken uyarı sistemleri kurulumu',
      'Veri güvenliği ve privacy'
    ],
    targetAudience: ['Biyomedikal Mühendisleri', 'Yoğun Bakım Hekimleri', 'Hemşire Koordinatörleri', 'IT Yöneticileri'],
    views: 567,
    thumbnail: '/webinars/iot-monitoring.jpg',
    recordingUrl: 'https://vitalcare.com/webinar/iot-patient-monitoring/recording'
  },
  {
    id: 'pharmacy-automation',
    title: 'Eczane Otomasyonu: İlaç Stok Yönetimi ve Robot Eczane Sistemleri',
    description: 'Hastane eczanelerinde otomasyon sistemleri. Robot eczane, akıllı stok yönetimi, son kullanma tarih takibi, barkod sistemleri ve Medula entegrasyonu.',
    type: 'recorded',
    category: 'business',
    categoryLabel: 'İş Süreçleri',
    date: '2024-09-12',
    duration: '36 dakika',
    speakers: [
      {
        name: 'Ecz. Mehmet Yalçın',
        title: 'Hastane Eczacısı',
        company: 'Ankara Şehir Hastanesi',
        bio: 'Robot eczane sistemi kurulumu ve yönetimi deneyimi.',
        avatar: '/avatars/mehmet-yalcin.jpg'
      }
    ],
    agenda: [
      'Eczane Otomasyonu Nedir?',
      'Robot Eczane Sistemleri',
      'Akıllı Stok Yönetimi',
      'İlaç Etkileşimi Kontrolü',
      'Medula ve e-Nabız Entegrasyonu',
      'Soru & Cevap'
    ],
    learningOutcomes: [
      'Eczane otomasyon sistemleri',
      'Robot eczane ROI analizi',
      'İlaç güvenliği ve hata önleme',
      'Entegrasyon gereksinimleri'
    ],
    targetAudience: ['Hastane Eczacıları', 'Eczane Müdürleri', 'Satın Alma Sorumluları', 'Hastane Yöneticileri'],
    views: 421,
    thumbnail: '/webinars/pharmacy-automation.jpg',
    recordingUrl: 'https://vitalcare.com/webinar/pharmacy-automation/recording'
  },
  {
    id: 'mobile-nursing',
    title: 'Mobil Hemşire Uygulamaları: Yatak Başı Bakım Dokümantasyonu',
    description: 'Mobil uygulama ile hemşirelik bakım planları, ilaç uygulama, vital signs kaydı ve barkod okuma. Gerçek dünya kullanım senaryoları ve hasta güvenliğine katkı.',
    type: 'recorded',
    category: 'clinical',
    categoryLabel: 'Klinik',
    date: '2024-08-22',
    duration: '33 dakika',
    speakers: [
      {
        name: 'Hemşire Selin Aydın',
        title: 'Hemşirelik Hizmetleri Koordinatörü',
        company: 'İzmir Özel Hastanesi',
        bio: 'Mobil hemşire uygulaması ile ilaç uygulama hatalarını %73 azalttı.',
        avatar: '/avatars/selin-aydin.jpg'
      }
    ],
    agenda: [
      'Geleneksel vs Dijital Hemşirelik Kaydı',
      'Mobil Uygulama Özellikleri',
      'Barkod ile İlaç Doğrulama',
      'Vital Signs ve Sıvı Takibi',
      'Hasta Güvenliğine Katkı',
      'Soru & Cevap'
    ],
    learningOutcomes: [
      'Mobil hemşire uygulamaları',
      'İlaç uygulama güvenliği',
      'Bakım planı dokümantasyonu',
      'Hasta güvenliği metrikleri'
    ],
    targetAudience: ['Hemşireler', 'Hemşirelik Müdürleri', 'Kalite Sorumluları', 'Hasta Güvenliği Ekipleri'],
    views: 689,
    thumbnail: '/webinars/mobile-nursing.jpg',
    recordingUrl: 'https://vitalcare.com/webinar/mobile-nursing/recording'
  },
  {
    id: 'data-analytics-hospital',
    title: 'Hastane Veri Analitiği: BI Dashboards ve Karar Destek Sistemleri',
    description: 'Hastane verilerinden içgörü çıkarma. Power BI/Tableau dashboards, KPI takibi, tahmine dayalı analitik ve yönetim raporları. Gerçek dashboard örnekleri.',
    type: 'recorded',
    category: 'business',
    categoryLabel: 'İş Süreçleri',
    date: '2024-11-12',
    duration: '55 dakika',
    speakers: [
      {
        name: 'Data Analyst Deniz Kaya',
        title: 'Healthcare Analytics Lead',
        company: 'Median Analytics',
        bio: 'Hastane KPI dashboards ve veri analitiği uzmanı.',
        avatar: '/avatars/deniz-kaya.jpg'
      }
    ],
    agenda: [
      'Sağlıkta Veri Analitiği',
      'Önemli KPI\'lar ve Metrikler',
      'BI Dashboard Tasarımı',
      'Tahmine Dayalı Analitik',
      'Demo: Gerçek Dashboard Örnekleri',
      'Soru & Cevap'
    ],
    learningOutcomes: [
      'Hastane veri analitiği temelleri',
      'BI dashboard tasarımı',
      'KPI tanımlama ve takibi',
      'Veri odaklı karar verme'
    ],
    targetAudience: ['Hastane Yöneticileri', 'Kalite Sorumluları', 'Veri Analistleri', 'CFO\'lar'],
    views: 1023,
    thumbnail: '/webinars/data-analytics.jpg',
    recordingUrl: 'https://vitalcare.com/webinar/data-analytics-hospital/recording'
  }
];

export default function WebinarsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'technical', label: 'Teknik' },
    { value: 'clinical', label: 'Klinik' },
    { value: 'business', label: 'İş Süreçleri' },
    { value: 'compliance', label: 'Uyumluluk' }
  ];

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || webinar.category === selectedCategory;
    const matchesType = selectedType === 'all' || webinar.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const upcomingWebinars = filteredWebinars.filter(w => w.type === 'upcoming');
  const recordedWebinars = filteredWebinars.filter(w => w.type === 'recorded');

  const handleRegistration = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setShowRegistrationModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Kayıt başarılı! ${selectedWebinar?.title} için kayıt onayı e-posta adresinize gönderildi.`);
    setShowRegistrationModal(false);
    setFormData({ name: '', email: '', phone: '', company: '', jobTitle: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-rose-500 bg-opacity-50 rounded-full text-sm font-semibold mb-6">
              <Video className="inline w-4 h-4 mr-2" />
              Web Seminerleri & Online Eğitimler
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Uzmanlardan Öğrenin, Başarınızı Artırın
            </h1>
            <p className="text-xl text-rose-100 mb-8">
              Sağlık bilişimi, HBYS entegrasyonu, yapay zeka ve daha fazlası hakkında
              canlı ve kayıtlı web seminerlerine katılın. Sektör uzmanları ile etkileşimli
              öğrenme deneyimi.
            </p>
            <div className="flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <Video className="w-6 h-6" />
                <span className="text-lg font-semibold">{webinars.length} Webinar</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  {webinars.reduce((sum, w) => sum + (w.views || 0), 0).toLocaleString('tr-TR')} İzlenme
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">Ücretsiz Katılım</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Webinar arayın..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">Tüm Webinarlar</option>
                  <option value="upcoming">Yaklaşan</option>
                  <option value="recorded">Kayıtlı</option>
                </select>
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      {upcomingWebinars.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-rose-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-8 h-8 text-rose-600" />
                <h2 className="text-3xl font-bold text-gray-900">Yaklaşan Web Seminerleri</h2>
              </div>
              <div className="grid md:grid-cols-1 gap-6">
                {upcomingWebinars.map(webinar => (
                  <div
                    key={webinar.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-rose-300"
                  >
                    <div className="grid md:grid-cols-3 gap-8 p-8">
                      {/* Left - Date & Time */}
                      <div className="md:col-span-1 flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 to-red-100 rounded-xl p-6">
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold text-rose-600 mb-2">
                            {new Date(webinar.date).getDate()}
                          </div>
                          <div className="text-lg text-gray-700 font-semibold">
                            {new Date(webinar.date).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mb-4">
                          <Clock className="w-5 h-5 text-rose-600" />
                          <span className="font-semibold">{webinar.time}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Süre: {webinar.duration}
                        </div>
                        <button
                          onClick={() => handleRegistration(webinar)}
                          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-lg hover:from-rose-700 hover:to-red-700 transition-all shadow-lg font-semibold"
                        >
                          Hemen Kayıt Ol
                        </button>
                      </div>

                      {/* Right - Content */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <span className="px-3 py-1 bg-rose-600 text-white rounded-full text-sm font-semibold">
                            {webinar.categoryLabel}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {webinar.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {webinar.description}
                        </p>

                        {/* Speakers */}
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <User className="w-5 h-5 text-rose-600" />
                            Konuşmacılar
                          </h4>
                          <div className="space-y-3">
                            {webinar.speakers.map((speaker, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                  {speaker.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{speaker.name}</div>
                                  <div className="text-sm text-gray-600">{speaker.title}</div>
                                  <div className="text-xs text-gray-500">{speaker.company}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Agenda Preview */}
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Gündem</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {webinar.agenda.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recorded Webinars */}
      {recordedWebinars.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Play className="w-8 h-8 text-rose-600" />
                <h2 className="text-3xl font-bold text-gray-900">Kayıtlı Web Seminerleri</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Anında İzleyin
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recordedWebinars.map(webinar => (
                  <div
                    key={webinar.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center">
                        <Play className="w-16 h-16 text-rose-600" />
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-semibold">
                        {webinar.categoryLabel}
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{webinar.duration}</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {webinar.title}
                      </h3>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {webinar.description}
                      </p>

                      <div className="flex items-center gap-3 pt-3 border-t">
                        <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {webinar.speakers[0].name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {webinar.speakers[0].name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {webinar.speakers[0].title}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{webinar.views?.toLocaleString('tr-TR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(webinar.date).toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <button className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all font-semibold flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Şimdi İzle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedWebinar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Webinar Kayıt
              </h3>
              <div className="bg-gradient-to-br from-rose-50 to-red-50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-gray-900 mb-1">{selectedWebinar.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedWebinar.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedWebinar.time} - {selectedWebinar.duration}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    E-posta *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building2 className="inline w-4 h-4 mr-2" />
                    Kurum *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pozisyon *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-lg hover:from-rose-700 hover:to-red-700 transition-all font-semibold"
                  >
                    Kayıt Ol
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Kurumunuza Özel Eğitim Programları
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Ekibiniz için özel webinar, workshop veya on-site eğitim programları düzenleyebiliriz.
              İhtiyaçlarınıza özel içerik ve uzman eğitmenler.
            </p>
            <button className="px-8 py-4 bg-white text-rose-600 rounded-lg hover:bg-rose-50 transition-all font-bold text-lg shadow-xl">
              Özel Eğitim Talebi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

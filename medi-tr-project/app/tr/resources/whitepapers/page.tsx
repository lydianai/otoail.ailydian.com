'use client';

import React, { useState } from 'react';
import { FileText, Download, Calendar, User, BookOpen, Search, Filter, Lock, CheckCircle, Mail, Building2, TrendingUp, Shield, X } from 'lucide-react';

interface Whitepaper {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'compliance' | 'ai-ml' | 'integration' | 'business';
  categoryLabel: string;
  pages: number;
  fileSizeMB: number;
  publishDate: string;
  author: {
    name: string;
    title: string;
    company: string;
  };
  topics: string[];
  downloadUrl: string;
  thumbnail: string;
  featured: boolean;
  downloads: number;
  readingTime: string;
}

const whitepapers: Whitepaper[] = [
  {
    id: 'e-nabiz-integration',
    title: 'Türkiye\'de e-Nabız Entegrasyonu: Teknik Uygulama Rehberi',
    description: 'e-Nabız sistemi ile HBYS entegrasyonunun A\'dan Z\'ye teknik detayları. SOAP/XML web servis protokolleri, güvenlik standartları, veri şifreleme, hasta rızası yönetimi ve pratik kod örnekleri ile kapsamlı rehber. Sağlık Bakanlığı gereksinimleri ve güncel API versiyonu (v4.2) ile uyumlu.',
    category: 'integration',
    categoryLabel: 'Entegrasyon',
    pages: 24,
    fileSizeMB: 3.2,
    publishDate: '2024-11-15',
    author: {
      name: 'Dr. Emre Yıldırım',
      title: 'Sağlık Bilişimi Uzmanı',
      company: 'Median R&D'
    },
    topics: ['e-Nabız', 'SOAP/XML', 'Web Servisleri', 'Veri Güvenliği', 'API Entegrasyonu', 'SBnet Altyapısı'],
    downloadUrl: '/whitepapers/e-nabiz-integration-guide.pdf',
    thumbnail: '/images/whitepapers/e-nabiz.jpg',
    featured: true,
    downloads: 1847,
    readingTime: '45 dakika'
  },
  {
    id: 'kvkk-compliance',
    title: 'KVKK Uyumlu HBYS Altyapısı: Mimari ve Güvenlik',
    description: 'Kişisel Verilerin Korunması Kanunu (KVKK) gereksinimlerine tam uyumlu sağlık bilgi sistemleri altyapısı tasarımı. Veri sınıflandırma, erişim kontrolü, şifreleme protokolleri, denetim logları, hasta rızası yönetimi ve KVKK madde 6 özel nitelikli kişisel veri koruma stratejileri. Hukuki ve teknik gereksinimler.',
    category: 'compliance',
    categoryLabel: 'Uyumluluk',
    pages: 32,
    fileSizeMB: 4.1,
    publishDate: '2024-10-28',
    author: {
      name: 'Av. Zeynep Koç',
      title: 'Sağlık Hukuku ve Veri Koruma Uzmanı',
      company: 'Median Hukuk Bölümü'
    },
    topics: ['KVKK', 'Veri Güvenliği', 'Hasta Hakları', 'Şifreleme', 'Erişim Kontrolü', 'Denetim Logları', 'ISO 27001'],
    downloadUrl: '/whitepapers/kvkk-compliance-architecture.pdf',
    thumbnail: '/images/whitepapers/kvkk.jpg',
    featured: true,
    downloads: 2156,
    readingTime: '60 dakika'
  },
  {
    id: 'ai-clinical-decision',
    title: 'AI ile Klinik Karar Destek: Tıbbi Hata Oranını %67 Azaltın',
    description: 'Yapay zeka destekli klinik karar destek sistemlerinin (CDSS) sağlık kurumlarında uygulanması. Makine öğrenimi modelleri ile ilaç etkileşimi tespiti, erken uyarı skorları, tanı önerileri ve tedavi protokol optimizasyonu. Gerçek dünya verileri ile %67 tıbbi hata azalması kanıtı. TensorFlow ve PyTorch modelleri.',
    category: 'ai-ml',
    categoryLabel: 'Yapay Zeka',
    pages: 18,
    fileSizeMB: 2.8,
    publishDate: '2024-12-05',
    author: {
      name: 'Prof. Dr. Mehmet Kaya',
      title: 'Tıbbi Bilişim ve AI Araştırmacısı',
      company: 'İstanbul Teknik Üniversitesi'
    },
    topics: ['Yapay Zeka', 'Makine Öğrenimi', 'Klinik Karar Destek', 'İlaç Etkileşimi', 'Erken Uyarı', 'Tıbbi Hata Önleme'],
    downloadUrl: '/whitepapers/ai-clinical-decision-support.pdf',
    thumbnail: '/images/whitepapers/ai-cdss.jpg',
    featured: true,
    downloads: 1523,
    readingTime: '40 dakika'
  },
  {
    id: 'cloud-pacs',
    title: 'Bulut Tabanlı PACS: Maliyet-Fayda Analizi',
    description: 'Geleneksel on-premise PACS sistemlerinden bulut tabanlı PACS sistemlerine geçiş için kapsamlı maliyet-fayda analizi. 5 yıllık TCO (Total Cost of Ownership) karşılaştırması, DICOM standardı, görüntü sıkıştırma teknolojileri (JPEG 2000), bant genişliği gereksinimleri, felaket kurtarma ve yedekleme stratejileri. Gerçek hastane örnekleri.',
    category: 'technical',
    categoryLabel: 'Teknik',
    pages: 28,
    fileSizeMB: 5.4,
    publishDate: '2024-09-20',
    author: {
      name: 'Mühendis Can Öztürk',
      title: 'PACS ve Medikal Görüntüleme Uzmanı',
      company: 'Median Görüntüleme Sistemleri'
    },
    topics: ['PACS', 'Bulut Altyapısı', 'DICOM', 'Maliyet Analizi', 'TCO', 'Görüntü Arşivleme', 'AWS/Azure'],
    downloadUrl: '/whitepapers/cloud-pacs-cost-analysis.pdf',
    thumbnail: '/images/whitepapers/cloud-pacs.jpg',
    featured: false,
    downloads: 892,
    readingTime: '50 dakika'
  },
  {
    id: 'medula-optimization',
    title: 'Medula Provizyon Optimizasyonu: Red Oranlarını Düşürme Stratejileri',
    description: 'SGK Medula sisteminde provizyon red oranlarını minimize etmek için teknik ve operasyonel stratejiler. Sık karşılaşılan red kodları (101, 102, 103, 401) ve çözümleri, otomatik kontrol mekanizmaları, tanı-işlem uyumsuzluklarının önlenmesi, gerçek zamanlı doğrulama ve akıllı uyarı sistemleri. Red oranını %23\'ten %4\'e düşüren kanıtlanmış yöntemler.',
    category: 'business',
    categoryLabel: 'İş Süreçleri',
    pages: 22,
    fileSizeMB: 2.6,
    publishDate: '2024-11-08',
    author: {
      name: 'Ayşe Demir',
      title: 'Sağlık Faturalandırma Uzmanı',
      company: 'Median İş Süreçleri'
    },
    topics: ['Medula', 'SGK', 'Provizyon', 'Faturalandırma', 'Red Yönetimi', 'Gelir Optimizasyonu'],
    downloadUrl: '/whitepapers/medula-optimization-strategies.pdf',
    thumbnail: '/images/whitepapers/medula.jpg',
    featured: true,
    downloads: 2341,
    readingTime: '42 dakika'
  },
  {
    id: 'hl7-fhir-interoperability',
    title: 'HL7 FHIR ile Hastane Interoperability: Modern Veri Değişimi',
    description: 'HL7 FHIR (Fast Healthcare Interoperability Resources) standardı ile modern sağlık veri değişimi. RESTful API yapısı, FHIR kaynakları (Patient, Observation, Medication), profilleme ve uzantılar, terminoloji eşleştirme (SNOMED CT, LOINC, ICD-10), güvenlik (OAuth 2.0, SMART on FHIR) ve pratik implementasyon örnekleri. Türkiye\'de FHIR kullanımı.',
    category: 'integration',
    categoryLabel: 'Entegrasyon',
    pages: 35,
    fileSizeMB: 4.8,
    publishDate: '2024-10-12',
    author: {
      name: 'Dr. Selim Arslan',
      title: 'HL7 ve Interoperability Uzmanı',
      company: 'Median Standards Team'
    },
    topics: ['HL7 FHIR', 'Interoperability', 'REST API', 'SNOMED CT', 'LOINC', 'ICD-10', 'OAuth 2.0'],
    downloadUrl: '/whitepapers/hl7-fhir-interoperability.pdf',
    thumbnail: '/images/whitepapers/fhir.jpg',
    featured: false,
    downloads: 1267,
    readingTime: '65 dakika'
  },
  {
    id: 'cybersecurity-healthcare',
    title: 'Sağlık Kurumlarında Siber Güvenlik: Ransomware ve Veri Sızıntısı Önleme',
    description: 'Sağlık sektörüne özel siber güvenlik tehditleri ve önleme stratejileri. Ransomware saldırıları, veri sızıntıları, phishing, insider threats ve DDoS ataklarına karşı savunma. Firewall konfigürasyonu, IDS/IPS, SIEM, zero-trust mimari, düzenli penetrasyon testleri ve olay müdahale planları. ISO 27001 ve NIST Cybersecurity Framework uyumlu.',
    category: 'compliance',
    categoryLabel: 'Uyumluluk',
    pages: 29,
    fileSizeMB: 3.7,
    publishDate: '2024-11-22',
    author: {
      name: 'Siber Güvenlik Uzmanı Kemal Yurt',
      title: 'CISSP, CEH',
      company: 'Median Güvenlik Operasyonları'
    },
    topics: ['Siber Güvenlik', 'Ransomware', 'Veri Sızıntısı', 'Penetrasyon Testi', 'ISO 27001', 'NIST', 'SIEM'],
    downloadUrl: '/whitepapers/healthcare-cybersecurity.pdf',
    thumbnail: '/images/whitepapers/cybersecurity.jpg',
    featured: false,
    downloads: 1654,
    readingTime: '55 dakika'
  },
  {
    id: 'telemedicine-platform',
    title: 'Teletıp Platform Mimarisi: Uzaktan Hasta Takibi ve Video Konsültasyon',
    description: 'Modern teletıp platformlarının teknik mimarisi. WebRTC ile güvenli video konsültasyon, IoT cihazları ile uzaktan vital signs izleme, elektronik reçete entegrasyonu, hasta randevu yönetimi ve ödeme sistemleri. HIPAA ve KVKK uyumlu veri aktarımı, uçtan uca şifreleme ve yüksek erişilebilirlik (99.9% uptime) için best practices.',
    category: 'technical',
    categoryLabel: 'Teknik',
    pages: 26,
    fileSizeMB: 3.9,
    publishDate: '2024-09-15',
    author: {
      name: 'Yazılım Mimarı Burak Çelik',
      title: 'Cloud Solutions Architect',
      company: 'Median Platform Team'
    },
    topics: ['Teletıp', 'WebRTC', 'IoT', 'Video Konsültasyon', 'Uzaktan İzleme', 'e-Reçete', 'Mikroservis'],
    downloadUrl: '/whitepapers/telemedicine-architecture.pdf',
    thumbnail: '/images/whitepapers/telemedicine.jpg',
    featured: false,
    downloads: 743,
    readingTime: '48 dakika'
  },
  {
    id: 'ai-radiology',
    title: 'Radyolojide Yapay Zeka: Görüntü Analizi ve Otomatik Raporlama',
    description: 'Medikal görüntüleme (X-ray, CT, MRI) için derin öğrenme modelleri. Convolutional Neural Networks (CNN) ile patoloji tespiti, görüntü segmentasyonu, nodül tespiti ve sınıflandırma. AutoML ile model eğitimi, DICOM veri seti hazırlama, model performans metrikleri (sensitivity, specificity, AUC) ve FDA onaylı AI sistemleri. Gerçek radyoloji vakalarında %94 doğruluk.',
    category: 'ai-ml',
    categoryLabel: 'Yapay Zeka',
    pages: 31,
    fileSizeMB: 6.2,
    publishDate: '2024-12-10',
    author: {
      name: 'Dr. Elif Şahin & AI Team',
      title: 'Radyoloji Uzmanı & ML Engineer',
      company: 'Median AI Research Lab'
    },
    topics: ['Yapay Zeka', 'Radyoloji', 'CNN', 'Derin Öğrenme', 'DICOM', 'Görüntü Analizi', 'AutoML', 'TensorFlow'],
    downloadUrl: '/whitepapers/ai-radiology-imaging.pdf',
    thumbnail: '/images/whitepapers/ai-radiology.jpg',
    featured: true,
    downloads: 1876,
    readingTime: '58 dakika'
  },
  {
    id: 'microservices-hbys',
    title: 'Mikroservis Mimarisi ile Modern HBYS: Ölçeklenebilirlik ve Esneklik',
    description: 'Monolitik HBYS sistemlerinden mikroservis mimarisine geçiş. Domain-driven design (DDD), API gateway, service mesh, event-driven architecture, CQRS pattern ve saga pattern ile dağıtık sistemler. Kubernetes orkestrasyon, Docker containerization, CI/CD pipeline ve zero-downtime deployment. 10,000+ eşzamanlı kullanıcıyı destekleyen mimari.',
    category: 'technical',
    categoryLabel: 'Teknik',
    pages: 33,
    fileSizeMB: 4.5,
    publishDate: '2024-10-05',
    author: {
      name: 'Sistem Mimarı Ahmet Taş',
      title: 'Enterprise Architect',
      company: 'Median Architecture Team'
    },
    topics: ['Mikroservis', 'Kubernetes', 'Docker', 'API Gateway', 'DDD', 'Event-Driven', 'CQRS', 'DevOps'],
    downloadUrl: '/whitepapers/microservices-hbys.pdf',
    thumbnail: '/images/whitepapers/microservices.jpg',
    featured: false,
    downloads: 956,
    readingTime: '62 dakika'
  }
];

export default function WhitepapersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<Whitepaper | null>(null);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [consent, setConsent] = useState(false);

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'technical', label: 'Teknik' },
    { value: 'compliance', label: 'Uyumluluk' },
    { value: 'ai-ml', label: 'Yapay Zeka' },
    { value: 'integration', label: 'Entegrasyon' },
    { value: 'business', label: 'İş Süreçleri' }
  ];

  const filteredWhitepapers = whitepapers.filter(wp => {
    const matchesSearch = wp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wp.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || wp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredWhitepapers = filteredWhitepapers.filter(wp => wp.featured);
  const regularWhitepapers = filteredWhitepapers.filter(wp => !wp.featured);

  const handleDownloadClick = (whitepaper: Whitepaper) => {
    setSelectedWhitepaper(whitepaper);
    setShowDownloadModal(true);
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && company && jobTitle && consent) {
      // In a real app, this would send data to backend
      alert(`İndirme başladı! ${selectedWhitepaper?.title} bilgisayarınıza indiriliyor.`);
      setShowDownloadModal(false);
      setEmail('');
      setCompany('');
      setJobTitle('');
      setConsent(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-rose-500 bg-opacity-50 rounded-full text-sm font-semibold mb-6">
              <FileText className="inline w-4 h-4 mr-2" />
              Teknik Dokümanlar & Whitepapers
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Sağlık Bilişimi Bilgi Merkezi
            </h1>
            <p className="text-xl text-rose-100 mb-8">
              HBYS, e-Nabız entegrasyonu, KVKK uyumluluk, yapay zeka ve daha fazlası hakkında
              derinlemesine teknik dokümanlara erişin. Uzmanlarımız tarafından hazırlanmış,
              gerçek dünya deneyimleri ile zenginleştirilmiş rehberler.
            </p>
            <div className="flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-lg font-semibold">{whitepapers.length} Whitepaper</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  {whitepapers.reduce((sum, wp) => sum + wp.downloads, 0).toLocaleString('tr-TR')} İndirme
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-6 h-6" />
                <span className="text-lg font-semibold">Uzman Yazarlar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Whitepaper veya konu arayın..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
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
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-rose-600">{filteredWhitepapers.length}</span> whitepaper bulundu
              </p>
              {(selectedCategory !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
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

      {/* Featured Whitepapers */}
      {featuredWhitepapers.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-rose-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-8 h-8 text-rose-600" />
                <h2 className="text-3xl font-bold text-gray-900">Öne Çıkan Dokümanlar</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredWhitepapers.map(whitepaper => (
                  <div
                    key={whitepaper.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-rose-200"
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-rose-600 text-white rounded-full text-sm font-semibold">
                          {whitepaper.categoryLabel}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Download className="w-4 h-4" />
                          <span>{whitepaper.downloads.toLocaleString('tr-TR')}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {whitepaper.title}
                      </h3>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {whitepaper.description}
                      </p>

                      {/* Metadata */}
                      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-rose-600">{whitepaper.pages}</div>
                          <div className="text-xs text-gray-600">Sayfa</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-rose-600">{whitepaper.fileSizeMB} MB</div>
                          <div className="text-xs text-gray-600">Dosya Boyutu</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-rose-600">{whitepaper.readingTime.split(' ')[0]}</div>
                          <div className="text-xs text-gray-600">Dakika Okuma</div>
                        </div>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                          {whitepaper.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{whitepaper.author.name}</div>
                          <div className="text-sm text-gray-600">{whitepaper.author.title}</div>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {whitepaper.topics.slice(0, 5).map((topic, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownloadClick(whitepaper)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-lg hover:from-rose-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        <Lock className="w-5 h-5" />
                        Ücretsiz İndir (Email ile)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Whitepapers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {regularWhitepapers.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Tüm Teknik Dokümanlar</h2>
                <div className="space-y-6">
                  {regularWhitepapers.map(whitepaper => (
                    <div
                      key={whitepaper.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                    >
                      <div className="grid md:grid-cols-4 gap-6 p-6">
                        {/* Left - Icon & Category */}
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-red-100 rounded-xl flex items-center justify-center mb-3">
                            <FileText className="w-10 h-10 text-rose-600" />
                          </div>
                          <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold">
                            {whitepaper.categoryLabel}
                          </span>
                        </div>

                        {/* Middle - Content */}
                        <div className="md:col-span-2 space-y-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {whitepaper.title}
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {whitepaper.description.substring(0, 200)}...
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {whitepaper.topics.slice(0, 4).map((topic, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                {topic}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{whitepaper.author.name}</span>
                            <span className="text-gray-400">•</span>
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(whitepaper.publishDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}</span>
                          </div>
                        </div>

                        {/* Right - Stats & Download */}
                        <div className="flex flex-col justify-between items-end">
                          <div className="grid grid-cols-2 gap-3 mb-4 w-full">
                            <div className="bg-rose-50 p-2 rounded text-center">
                              <div className="text-lg font-bold text-rose-600">{whitepaper.pages}</div>
                              <div className="text-xs text-gray-600">sayfa</div>
                            </div>
                            <div className="bg-rose-50 p-2 rounded text-center">
                              <div className="text-lg font-bold text-rose-600">{whitepaper.fileSizeMB}</div>
                              <div className="text-xs text-gray-600">MB</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {whitepaper.downloads.toLocaleString('tr-TR')} indirme
                          </div>
                          <button
                            onClick={() => handleDownloadClick(whitepaper)}
                            className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                          >
                            <Lock className="w-4 h-4" />
                            İndir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Download Modal */}
      {showDownloadModal && selectedWhitepaper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Whitepaper İndirme
                  </h3>
                  <p className="text-gray-600">
                    {selectedWhitepaper.title}
                  </p>
                </div>
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl mb-6">
                <div className="flex items-start gap-4">
                  <Lock className="w-12 h-12 text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Neden bilgileriniz gerekli?</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Teknik dokümanlarımız sağlık profesyonelleri için hazırlanmıştır.
                      Bilgileriniz ile size özel içerikler ve güncellemeler gönderebiliriz.
                      Verileriniz KVKK'ya uygun şekilde korunmaktadır.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleDownloadSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    E-posta Adresi *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@hastane.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building2 className="inline w-4 h-4 mr-2" />
                    Kurum Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Örnek Hastanesi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-2" />
                    Pozisyon/Ünvan *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Bilgi İşlem Müdürü"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-gray-700">
                    Median'in bana ürün güncellemeleri, teknik dokümanlar ve sektör içgörüleri
                    göndermesini kabul ediyorum. KVKK kapsamında verilerimin işlenmesini onaylıyorum.
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDownloadModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={!consent}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-lg hover:from-rose-700 hover:to-red-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    İndir ({selectedWhitepaper.fileSizeMB} MB)
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
            <Shield className="w-16 h-16 mx-auto mb-6 text-rose-100" />
            <h2 className="text-4xl font-bold mb-6">
              Özel İçerik ve Danışmanlık İster misiniz?
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Kurumunuza özel whitepaper, teknik dokümantasyon veya mimari danışmanlık için
              uzman ekibimiz ile iletişime geçin.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 bg-white text-rose-600 rounded-lg hover:bg-rose-50 transition-all font-bold text-lg shadow-xl">
                Uzmanlarla Görüşün
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-rose-600 transition-all font-bold text-lg">
                Tüm Dökümanları İnceleyin
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

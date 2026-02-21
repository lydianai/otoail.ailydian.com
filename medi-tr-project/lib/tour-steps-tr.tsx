import { Heart, Users, Shield, Zap, Database, Bell, BarChart3, Wifi, Globe, Clock, FileCheck, Brain, Activity, CheckCircle2, Building2, Watch, Stethoscope, CreditCard } from 'lucide-react'
import { TourStep } from '@/components/ProductTour'

export const trPatientsTourSteps: TourStep[] = [
  {
    title: "Medi Hasta Yönetim Sistemine Hoş Geldiniz!",
    description: "Türkiye'nin en kapsamlı, KVKK 2025-uyumlu hastane yönetim platformu. Bu tur Hastalar, MEDULA, e-Nabız ve Analitik sekmelerindeki TÜM özellikleri kapsıyor - Türk sağlık sistemine özel entegrasyonlarla donatılmış!",
    icon: <Heart className="h-8 w-8 text-red-600" />,
    highlight: "🇹🇷 Türkiye'ye Özel",
    competitiveAdvantage: "Türk sağlık sistemi için özel geliştirildi: MEDULA, e-Nabız, SUT 2025, KVKK tam uyumlu. İlk günden itibaren SGK entegrasyonu!"
  },

  // === HASTALAR SEKMESİ ÖZELLİKLERİ ===
  {
    title: "Hastalar Sekmesi: Gerçek Zamanlı Hasta Listesi",
    description: "Tek ekranda 2.847+ aktif hasta kaydı! WebSocket ile anlık durum güncellemeleri, renkli hasta kartları, kritik uyarılar. İsim, TC Kimlik No, telefon, e-posta ile milisaniyeler içinde arama. Her kartta demografi, sigorta durumu ve aktif hastalıklar.",
    icon: <Users className="h-8 w-8 text-red-600" />,
    highlight: "Anlık Güncellemeler",
    competitiveAdvantage: "Diğer HIS'ler 15 saniyede bir yenilenir, güncellemeler kaçar. Manuelde yenileme gerekir. Medi: ANI WebSocket güncellemeleri - hiçbir hasta durum değişikliğini kaçırmayın!"
  },
  {
    title: "Hastalar: Gelişmiş Filtreleme & Arama",
    description: "Hasta durumuna göre filtrele: Aktif, Taburcu, Yatan, Ayaktan, Acil. Yaş aralığı, cinsiyet, kronik hastalıklar, sigorta tipi, son ziyaret tarihi. Favori filtreleri kaydet, Excel/PDF'e aktar. AI destekli semantik arama.",
    icon: <Database className="h-8 w-8 text-purple-600" />,
    highlight: "AI Semantik Arama",
    competitiveAdvantage: "Klasik HIS'lerde 1990'lar teknolojisi arama. Sadece kelime eşleştirme. Medi: AI doğal sorguları anlar 'SGK'lı diyabetli yaşlı kadınlar' - işte bu kadar basit!"
  },
  {
    title: "Hastalar: Demografi & Ana Hasta İndeksi",
    description: "TC Kimlik No doğrulama, adres standardizasyonu (PTT onaylı), telefon/e-posta doğrulama. Hasta fotoğrafı, acil durum kişileri, yasal vasi. Ana Hasta İndeksi (MPI) tekrarları önler. KVKK uyumlu tam denetim izleri.",
    icon: <Shield className="h-8 w-8 text-green-600" />,
    highlight: "MPI Dahili",
    competitiveAdvantage: "Diğer HIS'ler MPI modülü için ekstra ücret alır. Tekrar tespiti hata veriyor. Medi: Gelişmiş MPI ÜCRETSİZ dahil, %99.9 tekrar önleme oranı!"
  },
  {
    title: "Hastalar: Kronik Hastalık Yönetimi",
    description: "ICD-10 kodlu durumlar, diyabet, hipertansiyon, KOAH için kronik bakım yönetimi (KBY) programları. İlaç uyumu takibi, rutin kontrol hatırlatıcıları. Otomatik risk puanlama, klinik karar destek uyarıları.",
    icon: <Activity className="h-8 w-8 text-rose-600" />,
    highlight: "KBY Faturalandırma",
    competitiveAdvantage: "Medi otomatik olarak KBY süresini takip eder. Diğerleri manuel zaman takibi gerektirir. KBY gelirini %300 artırın otomatik yakalama ile!"
  },
  {
    title: "Hastalar: Giyilebilir Cihaz & UİD Entegrasyonu",
    description: "Apple Watch, Fitbit, Samsung Health, Withings - hepsi entegre! Hasta kartında gerçek zamanlı vital parametreler: nabız, SpO2, tansiyon, glikoz, kilo. Anomali tespiti ile anlık sağlayıcı uyarıları. Uzaktan İzleme (Uİ) faturalandırma otomasyonu.",
    icon: <Watch className="h-8 w-8 text-cyan-600" />,
    highlight: "UİD Geliri",
    competitiveAdvantage: "Diğer HIS'lerde SIFIR giyilebilir cihaz desteği. Kurulum ücreti ve aylık ücret. Medi: ÜCRETSİZ sınırsız cihaz, otomatik faturalama. Aylık 50k+ TL UİD geliri oluşturun!"
  },
  {
    title: "Hastalar: Sosyal Belirleyiciler (SDOH)",
    description: "SDOH Z-kodlarını takip edin: barınma, gıda güvensizliği, ulaşım. Toplum kaynaklarıyla entegrasyon, yönlendirme takibi. Kalite ölçümleri ve değer bazlı bakım programları için gerekli.",
    icon: <Heart className="h-8 w-8 text-pink-600" />,
    highlight: "SDOH Hazır",
    competitiveAdvantage: "Diğer HIS'lerde SDOH modülü ekstra maliyet. SDOH takibi yok. Medi: Tam SDOH yakalama dahil, kalite ölçümlerini karşılayın, değer bazlı ödemeleri maksimize edin!"
  },

  // === MEDULA SEKMESİ ÖZELLİKLERİ ===
  {
    title: "MEDULA Sekmesi: Gerçek Zamanlı SGK Sorgulama",
    description: "Tüm SGK işlemleri için anlık doğrulama. Kayıt, randevu ve yatışta otomatik uygunluk kontrolleri. Katılım payı hesaplama, muafiyet takibi, hak detayları. 300+ SGK işlem tipi desteği.",
    icon: <Building2 className="h-8 w-8 text-amber-600" />,
    highlight: "SGK Entegrasyonu",
    competitiveAdvantage: "Diğer HIS'ler MEDULA için ekstra 100k+ TL uygulama ücreti. Manuel doğrulama haftada 20+ saat harcanıyor. Medi: ÜCRETSİZ, otomatik, yılda 200k+ TL personel maliyeti tasarrufu!"
  },
  {
    title: "MEDULA: Provizyon Otomasyonu",
    description: "Otomatik provizyon iş akışları, tüm büyük ödeyiciler için elektronik provizyon (eProvizyon). Durum takibi, ret yönetimi, itiraz iş akışları. AI destekli onay tahmini gereksiz istekleri önler.",
    icon: <CheckCircle2 className="h-8 w-8 text-emerald-600" />,
    highlight: "eProvizyon Sertifikalı",
    competitiveAdvantage: "Ön izinler diğer sistemlerde 7+ gün sürüyor. Medi'nin eProvizyon'u 24-48 saatte onay alıyor. AI %95 onay olasılığı tahmin ediyor - boş istekleri önleyin!"
  },
  {
    title: "MEDULA: SUT 2025 Uyumlu Fatura Entegrasyonu",
    description: "Otomatik fatura oluşturma, gerçek zamanlı fatura temizleme, elektronik fatura gönderimi. Fatura durum takibi, İRA/İAB işleme. AI destekli yeniden gönderim önerileriyle ret yönetimi. 500+ SUT 2025 kod veritabanı.",
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    highlight: "AI Ret Yönetimi",
    competitiveAdvantage: "Diğerleri özel fatura kuralı için 5k+ TL ücret. Fatura temizleyici hataların %30'unu kaçırıyor. Medi: AI temizleme hataların %99'unu yakalar, ret oranı %60 düşüyor!"
  },
  {
    title: "MEDULA: Gelir Döngüsü Analitiği",
    description: "Gerçek zamanlı gelir panoları: alacak yaşlandırma, alacaklardaki günler, ret oranları, ödeyici karışımı. 50+ hazır rapor: günlük gelir, sağlayıcı verimliliği, ödeyici performansı. Darboğazları anında tespit edin.",
    icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
    highlight: "Gerçek Zamanlı GDY",
    competitiveAdvantage: "Diğer HIS raporları gecelik güncelleniyor. Raporlar saatlerce sürüyor. Medi: GERÇEK ZAMANLI analitik, gelir kaçaklarını anında tespit edin, nakit akışını %40 iyileştirin!"
  },

  // === E-NABIZ SEKMESİ ÖZELLİKLERİ ===
  {
    title: "e-Nabız 2025: Gelişmiş Entegrasyon",
    description: "Sağlık Bakanlığı e-Nabız sistemiyle tam entegrasyon. Hasta tıbbi geçmişi, ilaçlar, alerji bilgileri, aşı kayıtları, laboratuvar sonuçları. Gerçek zamanlı senkronizasyon, otomatik veri paylaşımı.",
    icon: <Wifi className="h-8 w-8 text-cyan-600" />,
    highlight: "e-Nabız 2025",
    competitiveAdvantage: "Diğer HIS'lerde temel e-Nabız entegrasyonu veya hiç yok. Manuel veri girişi. Medi: 2025 gelişmiş entegrasyon, otomatik senkronizasyon, sıfır manuel giriş!"
  },
  {
    title: "e-Nabız: Organ Bağışı Modülü",
    description: "Yeni 2025 özelliği: Organ bağış kayıtları ve yakın bilgilendirme sistemi. Bağışçı durumu takibi, organ bağışı istatistikleri. Sağlık Bakanlığı yönetmeliklerine tam uyumlu.",
    icon: <Heart className="h-8 w-8 text-red-600" />,
    highlight: "Organ Bağışı 2025",
    competitiveAdvantage: "Diğer HIS'lerde organ bağışı modülü YOK. Manuel takip. Medi: 2025 organ bağışı modülü DAHIL, otomatik takip ve raporlama!"
  },
  {
    title: "e-Nabız: Lydian AI Sağlık Asistanı",
    description: "AI destekli risk analizi ve öneriler. Hasta verilerini analiz eder, erken uyarılar sağlar. Kişiselleştirilmiş sağlık önerileri, hastalık risk tahmini. e-Nabız verileriyle entegre.",
    icon: <Brain className="h-8 w-8 text-purple-600" />,
    highlight: "Lydian AI",
    competitiveAdvantage: "Diğer HIS'lerde AI sağlık asistanı modülü ekstra 100k+ TL/yıl. Medi: Lydian AI ÜCRETSİZ dahil, olumsuz olayları %35 azaltır!"
  },
  {
    title: "e-Nabız: Giyilebilir Cihaz Entegrasyonu",
    description: "Apple Health, Fitbit, Samsung Health desteği. Gerçek zamanlı vital parametreleri e-Nabız'a otomatik gönderim. Sürekli sağlık izleme, anormal değer uyarıları.",
    icon: <Watch className="h-8 w-8 text-blue-600" />,
    highlight: "Giyilebilir 2025",
    competitiveAdvantage: "Diğer HIS'lerde giyilebilir cihaz entegrasyonu YOK. e-Nabız manuel veri girişi. Medi: Otomatik giyilebilir entegrasyon, gerçek zamanlı e-Nabız senkronizasyonu!"
  },

  // === ANALİTİK & RAPORLAMA SEKMESİ ===
  {
    title: "Analitik: Gerçek Zamanlı Klinik Panolar",
    description: "Canlı hasta istatistikleri, yatak doluluk oranları, acil bekleme süreleri, ameliyathane kullanımı. Kalite ölçümü takibi. Sürükle-bırak pano oluşturucu. Otomatik e-posta raporları.",
    icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
    highlight: "Canlı Panolar",
    competitiveAdvantage: "Diğer HIS panoları saatlik yenileniyor. Gerçek zamanlı analitik yok. Medi: Her saniye canlı güncellemeler, güncel verilere dayalı kararlar alın!"
  },
  {
    title: "Analitik: Kalite Ölçümleri & Sağlık Bakanlığı Raporlama",
    description: "200+ kalite ölçümü için otomatik takip. Sağlık Bakanlığı raporlama otomasyonu. Bakım boşluğu uyarıları. Demografi, ödeyici, sağlayıcıya göre tabakalaşma.",
    icon: <CheckCircle2 className="h-8 w-8 text-green-600" />,
    highlight: "Otomasyon",
    competitiveAdvantage: "Diğer HIS'lerde manuel raporlama haftalar sürüyor. Medi: Otomatik raporlama ÜCRETSİZ, 1 tıkla raporları dışa aktar!"
  },
  {
    title: "Analitik: Popülasyon Sağlık Yönetimi",
    description: "Kronik hastalıklar için hasta kayıtları, risk tabakalaşması. Tahmine dayalı analitik. Bakım boşluğu belirleme, erişim kampanyaları.",
    icon: <Users className="h-8 w-8 text-teal-600" />,
    highlight: "Risk Stratifikasyonu",
    competitiveAdvantage: "Medi'nin AI'ı kaçırılan risk kodlarını belirler, hasta başına yıllık 3-5k TL değerinde. Diğerleri fırsatların %40'ını kaçırıyor!"
  },

  // === BİRLİKTE ÇALIŞABİLİRLİK & UYUMLULUK ===
  {
    title: "HL7 FHIR R4/R5 Birlikte Çalışabilirlik",
    description: "Sorunsuz veri alışverişi için son FHIR R4/R5 standardı. API-öncelikli mimari, sınırsız API çağrıları. Tüm Türk sağlık sistemleriyle entegrasyon.",
    icon: <Wifi className="h-8 w-8 text-cyan-600" />,
    highlight: "FHIR R5 Sertifikalı",
    competitiveAdvantage: "Diğerleri eski FHIR R2 kullanıyor. FHIR erişimi için ekstra ücret. Medi: Son R5 standardı, SINIRSI API çağrıları ÜCRETSİZ!"
  },
  {
    title: "KVKK 2025 Gelişmiş Güvenlik",
    description: "Tam KVKK 2025 uyumluluğu: zorunlu MFA, dinlenme/aktarımda şifreleme, 72 saatlik ihlal bildirimi otomasyonu. AI destekli denetim günlüğü analizi, anomali tespiti.",
    icon: <Shield className="h-8 w-8 text-red-600" />,
    highlight: "2025 Sertifikalı",
    competitiveAdvantage: "Diğerleri hala KVKK 2016 standartlarında. Güvenlik eklentileri ekstra maliyet. Medi: 2025'e ŞİMDİ hazır, ihlal başına 1.5M TL'ye kadar cezalardan kaçının!"
  },

  // === PLATFORM ÖZELLİKLERİ ===
  {
    title: "Titiz Onaylı AI Klinik Karar Desteği",
    description: "Titiz onaylı algoritmalar: sepsis tahmini (6 saat erken uyarı), ilaç etkileşimleri, düşme riski, basınç ülseri riski. Otomatik risk tabakalaşması. Kanıta dayalı bakım protokolleri.",
    icon: <Brain className="h-8 w-8 text-indigo-600" />,
    highlight: "Titiz Onaylı",
    competitiveAdvantage: "Diğer HIS'lerde AI modülü ekstra 100k+ TL/yıl. AI buhar. Medi: Titiz onaylı algoritmalar ÜCRETSİZ DAHIL, olumsuz olayları %35 azaltır!"
  },
  {
    title: "Yerel Mobil Uygulamalar (iOS & Android)",
    description: "Sağlayıcı & hasta mobil uygulamaları. Sağlayıcılar: hasta listesi, e-reçete, laboratuvar inceleme, güvenli mesajlaşma. Hastalar: randevular, laboratuvar sonuçları, tele-sağlık, fatura ödeme. KVKK uyumlu, biyometrik kimlik doğrulama.",
    icon: <Globe className="h-8 w-8 text-teal-600" />,
    highlight: "4.8★ App Store",
    competitiveAdvantage: "Diğer HIS mobil: 2010 teknolojisi. Düşük değerlendirme (yavaş, hatalı). Medi: 2025 React Native, 4.8★ değerlendirme, hızlı & güzel!"
  },
  {
    title: "7/24 Türkçe Destek & Eğitim",
    description: "Türkçe ekip, 7/24 telefon/chat/video destek. 15 dakika yanıt garantisi. Uzaktan ekran paylaşımı, video kütüphanesi, kapsamlı belgeler. Ücretsiz üç aylık eğitim oturumları.",
    icon: <Clock className="h-8 w-8 text-orange-600" />,
    highlight: "15dk Yanıt",
    competitiveAdvantage: "Diğerleri: Sadece e-posta, 24-48 saat yanıt. Yurt dışına devredilmiş. Medi: 7/24 Türkçe ekip, 15 dk SLA, telefon dahil!"
  },
  {
    title: "Sabit Fiyat: Sınırsız Kullanıcı",
    description: "Kullanıcı başına ücret YOK! 10 veya 10.000 kullanıcı - aynı sabit aylık fiyat. Sınırsız hasta kayıtları, sınırsız depolama, sınırsız konum. Sıfır gizli maliyet, şeffaf fiyatlandırma.",
    icon: <Users className="h-8 w-8 text-green-600" />,
    highlight: "Sınırsız Kullanıcı",
    competitiveAdvantage: "Diğerleri: 200 TL/kullanıcı/ay (100 kullanıcı = yılda 240k TL!). Medi: Sabit aylık ücret, sınırsız kullanıcı. Toplam sahip olma maliyetinde %80 tasarruf!"
  },
  {
    title: "48 Saatlik Kurulum & Ücretsiz Taşıma",
    description: "48 saatte kurulum! Herhangi bir HIS'den ÜCRETSİZ veri taşıma. Tam eğitim paketi dahil. Para iade garantisi ile 30 günlük risksiz deneme.",
    icon: <CheckCircle2 className="h-8 w-8 text-emerald-600" />,
    highlight: "48 Saatlik Kurulum",
    competitiveAdvantage: "Diğer HIS'ler: 18-24 ay kurulum, 1M+ TL maliyet. 12-18 ay. Medi: 48 SAAT, sabit ücret, ücretsiz taşıma. Hemen üretken olun!"
  },

  // === 🚀 YENİ ARALIK 2025: BLOCKCHAIN SAĞLIK SİSTEMİ ===
  {
    title: "🔐 Blockchain Hasta Kasası (Oasis Sapphire)",
    description: "Devrim niteliğinde blockchain destekli hasta kayıtları! Verileriniz Intel SGX TEE ile Oasis Sapphire'da şifreli. Hasta sahipli sağlık verisi - kayıtlarınıza kimler erişebileceğini SİZ kontrol edin! AES-256-GCM şifreleme, değişmez denetim kayıtları, KVKK uyumlu. FHIR R5 kayıtlarını saniyeler içinde doğrudan blockchain'e yükleyin!",
    icon: <Shield className="h-8 w-8 text-red-600" />,
    highlight: "🆕 Aralık 2025",
    competitiveAdvantage: "Diğer HIS'ler: Merkezi sunucular = TEK hata noktası, veri ihlalleri 10M+ TL maliyetli. Medi Blockchain: SIFIR merkezi veritabanı, hacklemek matematiksel olarak imkansız! Her ihlal maliyeti 0 TL. İhlal sorumluluğunda milyonlar tasarruf!"
  },
  {
    title: "⚡ 2 Saniyelik MEDULA Provizyon (Avalanche)",
    description: "Avalanche blockchain'de ANI SGK provizyon onayı! Geleneksel: 30-45 gün. Medi: 2 SANİYE blockchain kesinliği ile! 1.000 TL altı talepler için otomatik onay. Gerçek zamanlı değerlendirme, anında ödeme. Akıllı kontratlar evrak işini ortadan kaldırır - %95 daha hızlı işlem!",
    icon: <Zap className="h-8 w-8 text-purple-600" />,
    highlight: "2-Sn Ödeme",
    competitiveAdvantage: "Diğer HIS provizyon: 30-45 gün ortalama, manuel inceleme. Medi Blockchain: 2 SANİYE! Nakit akışını aylık 500k+ TL iyileştirin. Hastalar iadelerini ANINDA alır!"
  },
  {
    title: "🎯 Akıllı Rıza Yönetimi",
    description: "Blockchain destekli rıza yönetimi! Belirli sağlayıcılara zaman sınırlı erişim (saat/gün/ay) verin. Otomatik süre dolumu, anında iptal. Kimin neye, ne zaman eriştiğinin gerçek zamanlı denetim kaydını görün. Acil 'camı kır' erişimi 24 saatlik otomatik süre dolumu ile. Sevk, ikinci görüş için mükemmel!",
    icon: <Users className="h-8 w-8 text-green-600" />,
    highlight: "Ayrıntılı Kontrol",
    competitiveAdvantage: "Diğer HIS'ler: Hepsi veya hiçbiri erişim, manuel takip. Medi: AYRINTILI zaman bazlı izinler! KVKK ihlallerini %80 azaltın, olay başına 50k TL cezalardan kaçının!"
  },
  {
    title: "💰 Maliyet Tasarrufu: Blockchain vs Geleneksel",
    description: "Blockchain ile BÜYÜK tasarruf! Pahalı merkezi sunucu yok (yılda 200k TL tasarruf). Veritabanı lisansı yok (yılda 50k TL tasarruf). İhlal sigortası yok (yılda 100k TL tasarruf). İşlem maliyetleri: <0.01 TL vs 5-15 TL geleneksel. Toplam 5 yıllık tasarruf: Diğer HIS'lere kıyasla 2M+ TL!",
    icon: <BarChart3 className="h-8 w-8 text-emerald-600" />,
    highlight: "2M+ TL Tasarruf",
    competitiveAdvantage: "Diğer HIS Toplam Sahip Olma Maliyeti: 5 yılda 5-8M TL. Medi Blockchain: 5 yılda 500k TL. DAHA FAZLA özellik alırken 2-7M TL tasarruf edin!"
  },
  {
    title: "🔬 Gerçek Dünya Blockchain Faydaları",
    description: "Kanıtlanmış üretim kullanımı! Hasta kayıtları: Değişmez, değiştirilemez/silinemez. SGK provizyon: Şeffaf, doğrulanabilir ödemeler. Denetim uyumluluğu: Otomatik, kurcalanamaz kayıtlar. Birlikte çalışabilirlik: Blockchain üzerinden HERHANGİ bir hastane ile kayıt paylaşın. Veri taşınabilirliği: Hastalar verilerinin SONSUZA KADAR sahibidir!",
    icon: <CheckCircle2 className="h-8 w-8 text-blue-600" />,
    highlight: "Üretime Hazır",
    competitiveAdvantage: "Diğer HIS 'blockchain': Pazarlama buharı, hala merkezi veritabanı. Medi: GERÇEK Oasis + Avalanche entegrasyonu, Aralık 2025'te üretimde canlı!"
  },
  {
    title: "🏥 Organ Bağışı Blockchain Kaydı",
    description: "Türkiye'de İLK! Organ bağış kayıtları blockchain'de güvenle saklanıyor. Değiştirilemez, silinemiyor. Bağışçı durumu anlık güncelleniyor. Aile onayı blockchain'de kayıtlı. e-Nabız ile otomatik senkronizasyon. Sağlık Bakanlığı yönetmeliklerine %100 uyumlu. Hayat kurtaran teknoloji!",
    icon: <Heart className="h-8 w-8 text-red-600" />,
    highlight: "🇹🇷 Türkiye İlk",
    competitiveAdvantage: "Diğer HIS'lerde organ bağışı YOK veya manuel Excel takibi. Medi: Blockchain güvencesiyle ÖMÜRboyu güvenli kayıt! Her yıl 1000+ hayat kurtarma potansiyeli!"
  }
]

export const trPatientsTourConfig = {
  storageKey: 'medi-tr-patients-tour-completed',
  title: '🇹🇷 Medi Tur',
  subtitle: 'Türkiye\'nin En Gelişmiş Hastane Yönetim Sistemi',
  completionMessage: 'Tüm özellikleri keşfetmek için turu tamamlayın!'
}

/**
 * TÜRKİYE SAĞLIK SİSTEMİ - HASTA YÖNETİMİ TİP TANIMLARI
 * KVKK, MEDULA ve e-Nabız Uyumlu
 * Production-Ready - Gerçek Hastane Kullanımı İçin
 */

// ============================================
// TEMEL HASTA BİLGİLERİ (KVKK Korumalı)
// ============================================

export interface PatientTR {
  // Sistem ID (UUID v4)
  id: string

  // TC Kimlik Bilgileri (KVKK Özel Kategori)
  tcKimlikNo: string // 11 haneli TC Kimlik No (şifreli saklanır)

  // Temel Kimlik Bilgileri
  ad: string
  soyad: string
  anneAdi: string
  babaAdi: string
  dogumTarihi: Date
  cinsiyet: 'ERKEK' | 'KADIN' | 'DIGER'

  // İletişim Bilgileri
  telefon: string
  telefonIkinci?: string
  email?: string

  // Adres Bilgileri
  adres: {
    il: string
    ilce: string
    mahalle: string
    cadde: string
    binaNo: string
    daireNo?: string
    postaKodu?: string
  }

  // SGK ve Sigorta Bilgileri
  sgk: {
    sicilNo?: string
    kurumKodu?: string // 01: SSK, 02: Emekli Sandığı, 03: Bağ-Kur, vs.
    sosyalGuvenlikTipi: 'SGK' | 'EMEKLI_SANDIGI' | 'OZEL_SIGORTA' | 'YOK'
    tcSosyalGuvenlikNo?: string
    bagliOlunanBirim?: string
  }

  // MEDULA Entegrasyon Bilgileri
  medula: {
    aktif: boolean
    sonProvizyonTarihi?: Date
    sonProvizyonDurumu?: 'ONAYLANDI' | 'REDDEDILDI' | 'BEKLEMEDE'
    kumulatifTutar?: number // Yıllık toplam harcama
    takipNo?: string
  }

  // e-Nabız Entegrasyon
  enabiz: {
    aktif: boolean
    sonSenkronizasyon?: Date
    kanGrubu?: 'A_RH_POZITIF' | 'A_RH_NEGATIF' | 'B_RH_POZITIF' | 'B_RH_NEGATIF' |
                'AB_RH_POZITIF' | 'AB_RH_NEGATIF' | 'O_RH_POZITIF' | 'O_RH_NEGATIF'
    organBagisci?: boolean
    asiKayitlari?: AsiKaydi[]
  }

  // Hasta Durumu
  durum: 'AKTIF' | 'PASIF' | 'VEFAT_ETMIS' | 'TRANSFER'
  hastaTipi: 'AYAKTAN' | 'YATAN' | 'ACIL' | 'AMELIYAT'

  // Metadata
  kayitTarihi: Date
  guncellemeTarihi: Date
  kaydedenKullanici: string
  hastaneKodu: string // Hangi hastaneye kayıtlı

  // KVKK Rıza Yönetimi
  kvkkRiza: {
    acikRiza: boolean
    acikRizaTarihi?: Date
    ticariElektronikIleti: boolean
    ucuncuKisiPaylasim: boolean
    arastirmaAmacliKullanim: boolean
  }

  // Audit Log için
  sonErisimTarihi?: Date
  sonErisenKullanici?: string
}

// ============================================
// MEDULA PROVIZYON İŞLEMLERİ
// ============================================

export interface MEDULAProvizyon {
  id: string
  hastaId: string

  // Provizyon Bilgileri
  provizyonNo: string
  takipNo: string
  islemTarihi: Date

  // SGK Bilgileri
  kurumKodu: string
  kurumAdi: string
  takipTipi: '1' | '2' | '3' // 1: Normal, 2: Acil, 3: Travma

  // İşlem Detayları
  islemKodu: string
  islemAdi: string
  islemTutari: number
  sgkPayi: number
  hastaPayi: number

  // Durum
  durum: 'ONAYLANDI' | 'REDDEDILDI' | 'BEKLEMEDE' | 'IPTAL'
  redNedeni?: string
  onayTarihi?: Date

  // Doktor Bilgileri
  doktorTescilNo: string
  doktorAdi: string
  bransKodu: string

  // Entegrasyon Metadata
  medulaRequestId: string
  medulaResponseXml?: string
  hataKodu?: string
  hataMesaji?: string
}

// ============================================
// e-NABIZ (ENABIZ) ENTEGRASYONU
// ============================================

export interface ENabizSenkronizasyon {
  id: string
  hastaId: string

  // Senkronizasyon Bilgileri
  senkronizasyonTarihi: Date
  senkronizasyonTipi: 'EPIKRIZ' | 'RECETE' | 'TAHLIL' | 'GORUNTULEME' | 'TANI' | 'AMELIYAT'

  // Veri İçeriği (JSON format)
  veriPaketi: Record<string, any>

  // Durum
  durum: 'BASARILI' | 'BASARISIZ' | 'BEKLEMEDE'
  hataMesaji?: string

  // Metadata
  gonderilenKullanici: string
  enabizDokumanId?: string
}

export interface AsiKaydi {
  asiAdi: string
  asiKodu: string // e-Nabız standart kodları
  uygulamaTarihi: Date
  dozNo: number
  uygulananYer: string
  lotNo?: string
  enabizKayitli: boolean
}

// ============================================
// HASTA KABUL İŞLEMLERI
// ============================================

export interface HastaKabul {
  id: string
  hastaId: string

  // Kabul Bilgileri
  kabulTarihi: Date
  kabulTipi: 'POLIKLINIK' | 'ACIL' | 'YATIS' | 'AMELIYAT'
  protokolNo: string // HIS protokol numarası

  // Klinik/Bölüm Bilgileri
  klinikKodu: string
  klinikAdi: string
  bransKodu: string

  // Doktor Bilgileri
  doktorId: string
  doktorAdi: string
  doktorTescilNo: string

  // Ödeme Bilgileri
  odemeSekli: 'SGK' | 'NAKIT' | 'KREDI_KARTI' | 'OZEL_SIGORTA' | 'ANLASMALI_KURUM'
  kurumKodu?: string

  // MEDULA
  medulaProvizyonGerekli: boolean
  medulaProvizyonId?: string
  medulaDurumu?: 'ONAYLANDI' | 'REDDEDILDI' | 'BEKLEMEDE'

  // Durum
  durum: 'AKTIF' | 'TAMAMLANDI' | 'IPTAL'
  cikisTarihi?: Date

  // Fatura Bilgileri
  toplamTutar?: number
  sgkPayi?: number
  hastaPayi?: number
  faturaNo?: string
  faturaDurumu?: 'KESILMEDI' | 'KESILDI' | 'ODENDI'
}

// ============================================
// TIBBİ KAYITLAR
// ============================================

export interface TibbiKayit {
  id: string
  hastaId: string
  hastaKabulId: string

  // Kayıt Bilgileri
  kayitTarihi: Date
  kayitTipi: 'ANAMNEZ' | 'MUAYENE' | 'TANI' | 'RECETE' | 'ISTEM' | 'SONUC'

  // Tıbbi İçerik
  icerik: string // Şifreli saklanır (KVKK)
  taniKodlari?: string[] // ICD-10 kodları

  // Doktor Bilgileri
  doktorId: string
  doktorImza: string // Dijital imza hash

  // e-Nabız Gönderim
  enabizGonderildi: boolean
  enabizGonderimTarihi?: Date
}

export interface Recete {
  id: string
  hastaId: string
  hastaKabulId: string

  // e-Reçete Bilgileri
  eReceteNo: string
  receteTarihi: Date
  receteTipi: 'NORMAL' | 'KIRMIZI' | 'YESIL' | 'TURUNCU' | 'MOR'

  // Doktor Bilgileri
  doktorId: string
  doktorTescilNo: string
  doktorDijitalImza: string

  // İlaçlar
  ilaclar: ReceteIlac[]

  // MEDULA Entegrasyon
  medulaGonderildi: boolean
  medulaGonderimTarihi?: Date
  medulaOnayDurumu?: 'ONAYLANDI' | 'REDDEDILDI'

  // Durum
  durum: 'AKTIF' | 'KULLANILDI' | 'IPTAL'
  kullanimTarihi?: Date
  eczaneKodu?: string
}

export interface ReceteIlac {
  ilacKodu: string // SUT kodu
  ilacAdi: string
  kutuMiktari: number
  kullanimTalimati: string
  dozu: string
  periyot: string
  kullanimSuresi: number // Gün olarak
  sgkOdeme: boolean
}

// ============================================
// VİTAL SİGNS (CANLI BELIRTILER)
// ============================================

export interface VitalSigns {
  id: string
  hastaId: string

  // Ölçüm Zamanı
  olcumZamani: Date

  // Vital Signs
  sistolik?: number // mmHg
  diyastolik?: number // mmHg
  nabiz?: number // /dk
  ates?: number // °C
  solunum?: number // /dk
  spo2?: number // %
  agriSkoru?: number // 0-10
  bilinc?: 'ACIK' | 'SERSEM' | 'STUPOR' | 'KOMA'

  // Ölçen Personel
  olcenPersonelId: string
  olcenPersonelAdi: string

  // IoT Device (eğer varsa)
  cihazId?: string
  cihazTipi?: 'MANUEL' | 'WEARABLE' | 'BEDSIDE_MONITOR'
}

// ============================================
// YATAN HASTA YÖNETİMİ
// ============================================

export interface YatanHasta {
  id: string
  hastaId: string
  hastaKabulId: string

  // Yatış Bilgileri
  yatisTarihi: Date
  tahminiTaburcuTarihi?: Date

  // Yatak Bilgileri
  servisKodu: string
  servisAdi: string
  odaNo: string
  yatakNo: string
  yatakTipi: 'NORMAL' | 'YOGUN_BAKIM' | 'AMELIYAT_SONRASI' | 'IZOLASYON'

  // Klinik Bilgileri
  klinikKodu: string
  klinikAdi: string
  sorumluDoktorId: string

  // Durum
  durum: 'YATMAKTA' | 'TABURCU' | 'SEVK' | 'VEFAT' | 'KACAK'
  taburcuTarihi?: Date
  taburcuTipi?: 'NORMAL' | 'ISTEGE_BAGLI' | 'SEVK' | 'VEFAT'

  // Fatura
  gunlukYatakUcreti: number
  toplamGun?: number
  toplamTutar?: number
}

// ============================================
// REAL-TIME COLLABORATION
// ============================================

export interface UserPresence {
  userId: string
  userName: string
  patientId: string
  action: 'VIEWING' | 'EDITING' | 'IDLE'
  lastActivity: Date
  socketId: string
}

export interface ActivityLog {
  id: string
  patientId: string
  userId: string
  userName: string
  userRole: string
  action: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  details?: Record<string, any>
}

// ============================================
// KVKK AUDIT LOG
// ============================================

export interface KVKKAuditLog {
  id: string
  hastaId: string

  // Erişim Bilgileri
  erisimTarihi: Date
  erisimTipi: 'OKUMA' | 'GUNCELLEME' | 'SILME' | 'YAZDIRMA' | 'EXPORT'

  // Kullanıcı Bilgileri
  kullaniciId: string
  kullaniciAdi: string
  kullaniciRolu: string
  departman: string

  // Teknik Bilgiler
  ipAdresi: string
  userAgent: string
  sessionId: string

  // Erişilen Veri
  erisilenveriAlani: string[]
  veriDetayi?: Record<string, any>

  // Yasal Gerekçe (KVKK Madde 6)
  hukukiNeden: 'ACIK_RIZA' | 'KANUNI_YETKI' | 'SÖZLEŞME' | 'HAYATI_ÇIKAR' | 'KAMU_YARARI' | 'MEŞRU_MENFAAT'
}

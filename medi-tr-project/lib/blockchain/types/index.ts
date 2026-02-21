/**
 * Blockchain Healthcare Platform - Type Definitions
 * TR System (KVKK Compliant)
 * Oasis Network + Avalanche Hybrid Architecture
 */

// ==================== HASTA KİMLİĞİ ====================
export interface MerkeziyetsizKimlik {
  did: string; // Decentralized Identifier
  tcKimlikNo?: string; // Encrypted TC Kimlik No
  publicKey: string;
  encryptedPrivateKey: string;
  olusturmaTarihi: number;
  sonGuncelleme: number;
  iptalEdildi: boolean;
  kvkkOnayı: KVKKOnay;
}

export interface KVKKOnay {
  acikRizaVerildi: boolean;
  aydinlatmaMetniOkundu: boolean;
  veriİslemeOnayı: {
    tedavi: boolean;
    arastirma: boolean;
    sigorta: boolean;
    eNabizPaylasim: boolean;
  };
  onayTarihi: number;
  iptalTarihi?: number;
  blockchainTxHash: string;
}

// ==================== BLOCKCHAIN SAĞLIK KAYDI ====================
export interface BlockchainSaglikKaydi {
  hastaDID: string;
  kayitId: string;
  sifreliVeri: string; // AES-256-GCM şifreli
  kayitTipi: 'muayene' | 'tetkik' | 'ilac' | 'ameliyat' | 'tani';
  timestamp: number;
  saglikKurumuDID: string;
  doktorTC?: string; // Encrypted
  ipfsHash?: string;
  oasisTxHash: string;
  metadata: {
    boyut: number;
    versiyon: string;
    checksum: string;
  };
}

// ==================== MEDULA BLOCKCHAIN ENT EGRASYONU ====================
export interface BlockchainMedulaProvizyon {
  provizyonId: string;
  hastaDID: string;
  hastanetKodu: string;

  // MEDULA verileri
  takipNo: string;
  protokolNo: string;
  sutKodu: string; // SUT 2025 kodu
  islemTarihi: number;

  // Finansal
  tutar: bigint; // kuruş cinsinden
  sgkPayi: bigint;
  hastaPayi: bigint;

  // Blockchain
  avalancheTxHash: string;
  gonderilmeTarihi: number;
  onayTarihi?: number;
  durum: 'beklemede' | 'onaylandi' | 'reddedildi' | 'itiraz';

  // Akıllı kontrat olayları
  olaylar: MedulaOlay[];
}

export interface MedulaOlay {
  olayTipi: 'gonderildi' | 'dogrulandi' | 'onaylandi' | 'reddedildi' | 'odendi';
  timestamp: number;
  txHash: string;
  aciklama: string;
  sgkYanit?: string;
}

// ==================== E-NABIZ BLOCKCHAIN ENTEGRASYonu ====================
export interface BlockchainEnabizKayit {
  hastaDID: string;
  kayitId: string;

  // e-Nabız servisleri
  servisTipi: 'recete' | 'tahlil' | 'rapor' | 'asiBilgisi' | 'organBagisi';
  enabizReferansNo: string;

  // Veri
  sifreliIcerik: string; // TEE-encrypted
  dosyaTipi?: string;

  // Blockchain
  oasisTxHash: string;
  kayitTarihi: number;
  sonErisim?: number;

  // KVKK
  veriSahibiOnayı: boolean;
  paylasimIzni: string[]; // DID listesi
  silmeHakkiKullanildi: boolean;
}

// ==================== ORGAN BAĞIŞI BLOCKCHAIN ====================
export interface BlockchainOrganBagisi {
  bagisciDID: string;
  tcKimlikNo: string; // Encrypted

  // Bağış bilgileri
  organlar: string[]; // ['karaciger', 'bobrek', 'kornea']
  bagisOnayı: boolean;
  aileonayı: boolean;

  // Yasal
  vekalet: string[]; // Aile DID'leri
  notaryOnay?: string; // Noterden onay hash'i

  // Blockchain
  kayitTxHash: string;
  guncellemeTxHash?: string;
  kayitTarihi: number;
  sonGuncellemeTarihi?: number;

  // e-Nabız senkronizasyonu
  enabizSenkron: boolean;
  enabizReferansNo?: string;

  // Immutability
  iptalEdildi: boolean;
  iptalTarihi?: number;
  iptalNedeni?: string;
}

// ==================== OASIS CONFIG (TR) ====================
export interface OasisConfigTR {
  network: 'sapphire-mainnet' | 'sapphire-testnet';
  rpcUrl: string;
  chainId: number;
  contracts: {
    hastaKasasi: string; // Patient vault
    kvkkYonetici: string; // KVKK consent manager
    erisimKontrol: string;
    organBagisi: string;
  };
  teeAktif: boolean;
  sifrelemeAlgoritma: 'AES-256-GCM';
}

// ==================== AVALANCHE CONFIG (TR) ====================
export interface AvalancheConfigTR {
  network: 'mainnet' | 'fuji-testnet';
  subnetId: string; // TR-Healthcare-L1
  rpcUrl: string;
  chainId: number;
  contracts: {
    medulaIslemci: string;
    enabizKoprüsü: string;
    odemeToken: string; // HEALTH-TR token
    sgkRejistresi: string;
  };
  validators: string[]; // Türk hastaneleri + SGK
  gasToken: 'HEALTH-TR';
  veriYerlesimi: 'turkey'; // KVKK data residency
}

// ==================== GENOMİK VERI PAZARI ====================
export interface GenomikVeriListesi {
  genomDID: string;
  hastaDID: string;
  sifreliGenom: string;
  genomSaglayici: '23andMe' | 'AncestryDNA' | 'Genetiks';
  ozellikler: string[];
  etnikKoken: string[];

  // Pazar
  fiyatTL: number;
  kullanimAmaci: 'arastirma' | 'klinik' | 'ikisi';
  erisimSüresi: number;

  // Gizlilik
  anonimize: boolean;
  kimliksizlestirilmis: boolean;
  zkKanit: boolean;

  // Satışlar
  toplamSatis: number;
  toplamGelir: bigint;
  aktifLisanslar: number;
}

// ==================== AI KLİNİK KARAR DESTEK ====================
export interface GizliAITeshis {
  istekId: string;
  hastaDID: string;

  // Girdi (TEE'de şifreli)
  sifreliSemptomlar: string;
  sifreliVitallar: string;
  sifreliLabSonuclari: string;

  // AI Model
  modelVersiyon: string;
  modelTipi: 'sepsis-tahmini' | 'teshis-asistani' | 'ilac-etkilesimi';

  // Çıktı
  riskSkoru: number; // 0-100
  oneriler: string[];
  guvenilirlik: number;

  // Blockchain
  oasisTxHash: string;
  hesaplamaTarihi: number;
  teeDogrulamaKaniti: string;
}

// ==================== ÇAPRAZ ZİNCİR KÖPRÜ ====================
export interface CaprazZincirMesaj {
  mesajId: string;
  kaynakZincir: 'oasis' | 'avalanche';
  hedefZincir: 'oasis' | 'avalanche';
  mesajTipi: 'kvkk-guncelleme' | 'medula-odeme' | 'kayit-istegi';
  payload: string;

  // LayerZero
  nonce: number;
  gasLimit: bigint;

  // Durum
  durum: 'beklemede' | 'iletildi' | 'teslim-edildi' | 'basarisiz';
  kaynakTxHash: string;
  hedefTxHash?: string;
  timestamp: number;
}

// ==================== KVKK DENETİM KAYDI ====================
export interface KVKKBlockchainDenetim {
  denetimId: string;
  islem: 'goruntuleme' | 'olusturma' | 'guncelleme' | 'silme' | 'paylasim' | 'disa-aktarma';
  kaynakTipi: 'hasta-kaydi' | 'kvkk-onay' | 'medula-provizyon';
  kaynakId: string;

  // Aktör
  aktorDID: string;
  aktorRol: 'hasta' | 'doktor' | 'hastane' | 'sgk' | 'arastirmaci';
  aktorIP: string;

  // Bağlam
  amac: string;
  gerekce?: string;

  // Blockchain değişmezlik
  blockchainTxHash: string;
  blokNumarasi: number;
  timestamp: number;

  // KVKK özel
  kisiselVeriErisildi: boolean;
  acikreizaDogrulandi: boolean;
  veriMinimizasyonu: boolean;
  saklama72SaatBildirimi?: boolean;
}

// ==================== SAĞLIK BAKANLIĞI RAPORLAMA ====================
export interface SaglikBakanligiRapor {
  raporId: string;
  raporTipi: 'haftalik' | 'aylik' | 'yillik' | 'ozel';
  baslangicTarihi: number;
  bitisTarihi: number;

  // İstatistikler
  toplamHasta: number;
  toplamMuayene: number;
  toplamProvizyon: number;
  toplamSGKOdeme: bigint;

  // e-Nabız entegrasyonu
  enabizSenkronSayisi: number;
  organBagisiSayisi: number;

  // Blockchain doğrulama
  blockchainKaniti: string;
  raporHash: string;
  olusturmaTarihi: number;

  // Compliance
  kvkkUyumlu: boolean;
  sutUyumlu: boolean;
  bakanlikOnayı?: string;
}

// ==================== WEB3 CÜZDAN BAĞLANTISI ====================
export interface Web3CuzdanBaglantisi {
  adres: string;
  saglayici: 'metamask' | 'walletconnect' | 'coinbase-wallet';
  chainId: number;
  network: 'oasis' | 'avalanche';
  baglanti: boolean;
  bakiye: bigint;
  nonce: number;
}

// ==================== AKILLI SÖZLEŞME ETKİLEŞİMİ ====================
export interface KontratCagriParametreleri {
  kontratAdresi: string;
  fonksiyonAdi: string;
  parametreler: any[];
  deger?: bigint;
  gasLimiti?: bigint;
  imzalayan: string;
}

export interface KontratCagriSonucu {
  txHash: string;
  blokNumarasi: number;
  kullanilanGas: bigint;
  durum: 'basarili' | 'basarisiz';
  donusDegeri?: any;
  olaylar: KontratOlay[];
}

export interface KontratOlay {
  olayAdi: string;
  parametreler: Record<string, any>;
  blokNumarasi: number;
  txHash: string;
}

// ==================== ŞİFRELEME ARAÇLARI ====================
export interface Sifrelemesonucu {
  sifreliMetin: string;
  iv: string;
  authTag: string;
  algoritma: 'AES-256-GCM';
  sifrelenmeTarihi: number;
}

export interface TEEHesaplamaIstegi {
  hesaplamaId: string;
  fonksiyonAdi: string;
  sifreliGirdiler: string[];
  teeNodeUrl: string;
  dogrulamaGerekli: boolean;
}

export interface TEEHesaplamaSonucu {
  hesaplamaId: string;
  sonuc: any;
  dogrulamaKaniti: string;
  kullanilanGas: number;
  hesaplamaSüresi: number;
}

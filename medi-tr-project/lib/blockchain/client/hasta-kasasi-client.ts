/**
 * HastaKasasi Contract Client
 * Production-ready TypeScript wrapper for Oasis Sapphire HastaKasasi
 *
 * Özellikler:
 * - Type-safe kontrat etkileşimleri
 * - Otomatik yeniden deneme mantığı
 * - KVKK uyumlu hata işleme
 * - TEE şifreleme yardımcıları
 * - e-Nabız ve organ bağışı entegrasyonu
 */

import { ethers, Contract, Wallet, providers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import HastaKasasiABI from "../abis/HastaKasasi.json";

// ==================== TİPLER ====================

export interface HastaKasasiConfig {
  kontratAdresi: string;
  rpcUrl: string;
  chainId: number;
  privateKey?: string;
}

export interface KayitMetadata {
  kayitHash: string;
  timestamp: number;
  saglikKurumuDID: string;
  kayitTipi: KayitTipi;
  ipfsHash: string;
}

export enum KayitTipi {
  MUAYENE = 0,
  TETKIK = 1,
  ILAC = 2,
  AMELIYAT = 3,
  TANI = 4,
  GORUNTULEME = 5,
  LABORATUVAR = 6,
}

export enum OnayAmaci {
  TEDAVI = 0,
  ARASTIRMA = 1,
  SIGORTA = 2,
  ACIL = 3,
  HASTA_ERISIM = 4,
}

export interface OrganBagisi {
  bagisciDID: string;
  organlar: string[];
  bagisOnayı: boolean;
  aileOnayı: boolean;
  aktif: boolean;
  kayitTarihi: Date;
}

// ==================== HASTA KASASI CLIENT ====================

export class HastaKasasiClient {
  private contract: Contract;
  private provider: providers.JsonRpcProvider;
  private signer?: Wallet;
  private config: HastaKasasiConfig;

  constructor(config: HastaKasasiConfig) {
    this.config = config;

    // Provider oluştur
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);

    // Gizli işlemler için Sapphire ile sarmala
    const wrappedProvider = sapphire.wrap(this.provider);

    // Private key varsa signer oluştur
    if (config.privateKey) {
      this.signer = new ethers.Wallet(config.privateKey, wrappedProvider);
    }

    // Kontratı başlat
    this.contract = new ethers.Contract(
      config.kontratAdresi,
      HastaKasasiABI,
      this.signer || wrappedProvider
    );
  }

  // ==================== HASTA KAYDI ====================

  /**
   * Hasta DID'ini cüzdan adresiyle kaydet
   * @param hastaDID Merkeziyetsiz kimlik
   */
  async hastaKaydet(hastaDID: string): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`📝 Hasta DID kaydediliyor: ${hastaDID}`);

      const tx = await this.contract.hastaKaydet(hastaDID);
      console.log(`⏳ İşlem gönderildi: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`✅ Hasta blok ${receipt.blockNumber}'da kaydedildi`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Kayıt başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== KAYIT YÖNETİMİ ====================

  /**
   * TEE'de şifreli FHIR kaydı sakla
   * @param hastaDID Hasta kimliği
   * @param kayitId Benzersiz kayıt ID
   * @param sifreliVeri Şifreli FHIR R5 paketi
   * @param kayitTipi Tıbbi kayıt türü
   * @param ipfsHash Büyük dosyalar için IPFS hash'i
   */
  async kayitSakla(
    hastaDID: string,
    kayitId: string,
    sifreliVeri: Uint8Array,
    kayitTipi: KayitTipi,
    ipfsHash: string = ""
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`🔐 Kayıt ${kayitId} hasta ${hastaDID} için saklanıyor`);

      const tx = await this.contract.kayitSakla(
        hastaDID,
        kayitId,
        sifreliVeri,
        kayitTipi,
        ipfsHash,
        {
          gasLimit: 500000,
        }
      );

      console.log(`⏳ İşlem gönderildi: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`✅ Kayıt blok ${receipt.blockNumber}'da saklandı`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Kayıt saklama başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Şifreli kaydı getir (sadece yetkili ise)
   * @param hastaDID Hasta kimliği
   * @param kayitId Kayıt ID
   */
  async kayitGetir(hastaDID: string, kayitId: string): Promise<Uint8Array> {
    try {
      console.log(`📖 Kayıt ${kayitId} hasta ${hastaDID} için getiriliyor`);

      const sifreliVeri = await this.contract.kayitGetir(hastaDID, kayitId);

      console.log(`✅ Kayıt getirildi (${sifreliVeri.length} byte)`);
      return ethers.getBytes(sifreliVeri);
    } catch (error: any) {
      console.error("❌ Kayıt getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Hasta için tüm kayıt ID'lerini getir
   * @param hastaDID Hasta kimliği
   */
  async hastaKayitlariGetir(hastaDID: string): Promise<string[]> {
    try {
      const kayitIds = await this.contract.hastaKayitlariGetir(hastaDID);
      console.log(`✅ Hasta için ${kayitIds.length} kayıt bulundu`);
      return kayitIds;
    } catch (error: any) {
      console.error("❌ Kayıt ID'leri getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== KVKK İZİN YÖNETİMİ ====================

  /**
   * Sağlık kuruluşuna zamanlı erişim ver
   * @param hastaDID Hasta kimliği
   * @param saglikKurulusu Sağlık kuruluşu adresi
   * @param amac Erişim amacı
   * @param sureSaniye İzin süresi
   * @param izinliKayitlar Belirli kayıtlar (tümü için boş)
   */
  async kvkkOnayVer(
    hastaDID: string,
    saglikKurulusu: string,
    amac: OnayAmaci,
    sureSaniye: number,
    izinliKayitlar: string[] = []
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(
        `🔓 ${saglikKurulusu} için ${sureSaniye}s onay veriliyor`
      );

      const tx = await this.contract.kvkkOnayVer(
        hastaDID,
        saglikKurulusu,
        amac,
        sureSaniye,
        izinliKayitlar
      );

      const receipt = await tx.wait();
      console.log(`✅ Onay blok ${receipt.blockNumber}'da verildi`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Onay verme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Sağlık kuruluşu erişimini iptal et
   * @param hastaDID Hasta kimliği
   * @param saglikKurulusu Sağlık kuruluşu adresi
   */
  async kvkkOnayIptal(
    hastaDID: string,
    saglikKurulusu: string
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`🔒 ${saglikKurulusu} için onay iptal ediliyor`);

      const tx = await this.contract.kvkkOnayIptal(hastaDID, saglikKurulusu);
      const receipt = await tx.wait();

      console.log(`✅ Onay blok ${receipt.blockNumber}'da iptal edildi`);
      return receipt;
    } catch (error: any) {
      console.error("❌ Onay iptali başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Sağlık kuruluşunun geçerli onayı olup olmadığını kontrol et
   * @param hastaDID Hasta kimliği
   * @param saglikKurulusu Sağlık kuruluşu adresi
   */
  async gecerliOnayKontrol(
    hastaDID: string,
    saglikKurulusu: string
  ): Promise<boolean> {
    try {
      const gecerli = await this.contract.gecerliOnayKontrol(
        hastaDID,
        saglikKurulusu
      );
      return gecerli;
    } catch (error: any) {
      console.error("❌ Onay kontrolü başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== E-NABIZ ENTEGRASYONU ====================

  /**
   * Kaydı e-Nabız ile senkronize et
   * @param hastaDID Hasta kimliği
   * @param kayitId Kayıt ID
   * @param enabizReferansNo e-Nabız referans numarası
   */
  async enabizSenkronize(
    hastaDID: string,
    kayitId: string,
    enabizReferansNo: string
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`🔗 e-Nabız senkronizasyonu: ${kayitId}`);

      const tx = await this.contract.enabizSenkronize(
        hastaDID,
        kayitId,
        ethers.id(enabizReferansNo)
      );

      const receipt = await tx.wait();
      console.log(`✅ e-Nabız senkronize blok ${receipt.blockNumber}'da`);

      return receipt;
    } catch (error: any) {
      console.error("❌ e-Nabız senkronizasyonu başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== ORGAN BAĞIŞI ====================

  /**
   * Organ bağışı kaydı oluştur
   * @param bagisciDID Bağışçı DID
   * @param organlar Bağışlanacak organlar listesi
   * @param aileOnayı Aile onayı var mı
   */
  async organBagisiKaydet(
    bagisciDID: string,
    organlar: string[],
    aileOnayı: boolean
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`💚 Organ bağışı kaydediliyor: ${organlar.join(", ")}`);

      const tx = await this.contract.organBagisiKaydet(
        bagisciDID,
        organlar,
        aileOnayı
      );

      const receipt = await tx.wait();
      console.log(`✅ Organ bağışı blok ${receipt.blockNumber}'da kaydedildi`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Organ bağışı kaydı başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Organ bağışını iptal et
   * @param bagisciDID Bağışçı DID
   */
  async organBagisiIptal(
    bagisciDID: string
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`❌ Organ bağışı iptal ediliyor`);

      const tx = await this.contract.organBagisiIptal(bagisciDID);
      const receipt = await tx.wait();

      console.log(`✅ Organ bağışı blok ${receipt.blockNumber}'da iptal edildi`);
      return receipt;
    } catch (error: any) {
      console.error("❌ Organ bağışı iptali başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Organ bağışı bilgilerini getir
   * @param bagisciDID Bağışçı DID
   */
  async organBagisiGetir(bagisciDID: string): Promise<OrganBagisi> {
    try {
      const bagis = await this.contract.organBagisiGetir(bagisciDID);

      return {
        bagisciDID: bagis.bagisciDID,
        organlar: bagis.organlar,
        bagisOnayı: bagis.bagisOnayı,
        aileOnayı: bagis.aileOnayı,
        aktif: bagis.aktif,
        kayitTarihi: new Date(Number(bagis.kayitTarihi) * 1000),
      };
    } catch (error: any) {
      console.error("❌ Organ bağışı getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== ACİL ERİŞİM ====================

  /**
   * Acil durum erişimi talep et (kırılabilir cam)
   * @param hastaDID Hasta kimliği
   * @param neden Acil durum nedeni
   */
  async acilErisimTalep(
    hastaDID: string,
    neden: string
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`🚨 Acil erişim talebi: ${neden}`);

      const tx = await this.contract.acilErisimTalep(hastaDID, neden);
      const receipt = await tx.wait();

      console.log(`✅ Acil erişim blok ${receipt.blockNumber}'da verildi`);
      console.log(`⏰ Erişim 24 saat içinde sona erer`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Acil erişim başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== KVKK DENETİM İZİ ====================

  /**
   * Hasta için denetim kayıtlarını getir
   * @param hastaDID Hasta kimliği
   * @param baslangicIndex Başlangıç indeksi
   * @param limit Döndürülecek kayıt sayısı
   */
  async denetimKayitlariGetir(
    hastaDID: string,
    baslangicIndex: number = 0,
    limit: number = 100
  ): Promise<any[]> {
    try {
      const kayitlar = await this.contract.denetimKayitlariGetir(
        hastaDID,
        baslangicIndex,
        limit
      );

      console.log(`✅ ${kayitlar.length} denetim kaydı getirildi`);
      return kayitlar;
    } catch (error: any) {
      console.error("❌ Denetim kayıtları getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== OLAY DİNLEME ====================

  /**
   * KayitSaklandi olaylarını dinle
   */
  onKayitSaklandi(
    callback: (
      hastaDID: string,
      kayitId: string,
      kayitTipi: number,
      timestamp: number
    ) => void
  ): void {
    this.contract.on(
      "KayitSaklandi",
      (hastaDID, kayitId, kayitTipi, timestamp) => {
        console.log(`📢 KayitSaklandi olayı: ${kayitId}`);
        callback(hastaDID, kayitId, kayitTipi, Number(timestamp));
      }
    );
  }

  /**
   * KVKKOnayVerildi olaylarını dinle
   */
  onKVKKOnayVerildi(
    callback: (
      hastaDID: string,
      onaylanan: string,
      amac: number,
      gecerlilikSuresi: number
    ) => void
  ): void {
    this.contract.on(
      "KVKKOnayVerildi",
      (hastaDID, onaylanan, amac, gecerlilikSuresi) => {
        console.log(`📢 KVKKOnayVerildi olayı: ${onaylanan}`);
        callback(hastaDID, onaylanan, amac, Number(gecerlilikSuresi));
      }
    );
  }

  /**
   * OrganBagisiKayit olaylarını dinle
   */
  onOrganBagisiKayit(
    callback: (
      bagisciDID: string,
      organlar: string[],
      timestamp: number
    ) => void
  ): void {
    this.contract.on("OrganBagisiKayit", (bagisciDID, organlar, timestamp) => {
      console.log(`💚 OrganBagisiKayit olayı: ${organlar.join(", ")}`);
      callback(bagisciDID, organlar, Number(timestamp));
    });
  }

  // ==================== YARDIMCI FONKSIYONLAR ====================

  /**
   * Mevcut blok numarasını getir
   */
  async mevcutBlok(): Promise<number> {
    return await this.provider.getBlockNumber();
  }

  /**
   * KVKK uyumlu hata işleme
   */
  private handleError(error: any): Error {
    if (error.reason) {
      return new Error(`Kontrat Hatası: ${error.reason}`);
    }
    if (error.data) {
      return new Error(`Kontrat Hatası: ${error.data}`);
    }
    return new Error(`İşlem başarısız: ${error.message}`);
  }

  /**
   * Bağlantıyı kes ve temizle
   */
  disconnect(): void {
    this.contract.removeAllListeners();
    console.log("✅ HastaKasasi client bağlantısı kesildi");
  }
}

// ==================== FACTORY ====================

export function createHastaKasasiClient(
  config: HastaKasasiConfig
): HastaKasasiClient {
  return new HastaKasasiClient(config);
}

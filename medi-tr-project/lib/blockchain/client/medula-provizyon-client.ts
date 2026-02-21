/**
 * MedulaProvizyon Contract Client
 * Production-ready TypeScript wrapper for Avalanche MedulaProvizyon
 *
 * Özellikler:
 * - Gerçek zamanlı SGK provizyon gönderimi ve onayı
 * - Limit altı otomatik onay
 * - HEALTH-TR token entegrasyonu
 * - SUT 2025 kod doğrulaması
 * - e-Nabız senkronizasyonu
 */

import { ethers, Contract, Wallet, providers } from "ethers";
import MedulaProvizyonABI from "../abis/MedulaProvizyon.json";

// ==================== TİPLER ====================

export interface MedulaProvizyonConfig {
  kontratAdresi: string;
  rpcUrl: string;
  chainId: number;
  privateKey?: string;
  healthTRTokenAdresi: string;
}

export interface ProvizyonGonderimi {
  provizyonId: string;
  hastaDID: string;
  takipNo: string;
  protokolNo: string;
  sutKodu: string;
  islemAdi: string;
  islemTarihi: Date;
  tutar: bigint; // kuruş cinsinden
  oasisIzinTxHash: string;
}

export interface ProvizyonDetay {
  hastaDID: string;
  hastane: string;
  sutKodu: string;
  tutar: bigint;
  sgkPayi: bigint;
  durum: ProvizyonDurum;
  gonderilmeTarihi: Date;
}

export enum ProvizyonDurum {
  GONDERILDI = 0,
  INCELEMEDE = 1,
  ONAYLANDI = 2,
  REDDEDILDI = 3,
  ITIRAZ = 4,
  ODENDI = 5,
  IPTAL = 6,
}

// ==================== MEDULA PROVIZYON CLIENT ====================

export class MedulaProvizyonClient {
  private contract: Contract;
  private provider: providers.JsonRpcProvider;
  private signer?: Wallet;
  private config: MedulaProvizyonConfig;

  constructor(config: MedulaProvizyonConfig) {
    this.config = config;

    // Provider oluştur
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);

    // Private key varsa signer oluştur
    if (config.privateKey) {
      this.signer = new ethers.Wallet(config.privateKey, this.provider);
    }

    // Kontratı başlat
    this.contract = new ethers.Contract(
      config.kontratAdresi,
      MedulaProvizyonABI,
      this.signer || this.provider
    );
  }

  // ==================== HASTANE FONKSİYONLARI ====================

  /**
   * MEDULA'ya provizyon gönder
   * @param provizyon Provizyon gönderim detayları
   */
  async provizyonGonder(
    provizyon: ProvizyonGonderimi
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`💳 Provizyon gönderiliyor ${provizyon.provizyonId}`);
      console.log(`   Tutar: ${this.formatTRY(provizyon.tutar)} TRY`);
      console.log(`   SUT Kodu: ${provizyon.sutKodu}`);
      console.log(`   İşlem: ${provizyon.islemAdi}`);

      const tx = await this.contract.provizyonGonder(
        ethers.id(provizyon.provizyonId),
        ethers.id(provizyon.hastaDID),
        provizyon.takipNo,
        provizyon.protokolNo,
        provizyon.sutKodu,
        provizyon.islemAdi,
        Math.floor(provizyon.islemTarihi.getTime() / 1000),
        provizyon.tutar,
        provizyon.oasisIzinTxHash,
        {
          gasLimit: 500000,
        }
      );

      console.log(`⏳ İşlem gönderildi: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`✅ Provizyon blok ${receipt.blockNumber}'da gönderildi`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Provizyon gönderimi başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Reddedilen provizyona itiraz et
   * @param provizyonId Provizyon ID
   */
  async provizyonItiraz(
    provizyonId: string
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`📋 Provizyon itirazı: ${provizyonId}`);

      const tx = await this.contract.provizyonItiraz(ethers.id(provizyonId));
      const receipt = await tx.wait();

      console.log(`✅ İtiraz blok ${receipt.blockNumber}'da kaydedildi`);
      return receipt;
    } catch (error: any) {
      console.error("❌ İtiraz başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Hastane provizyonlarını getir
   * @param hastaneAdresi Hastane cüzdan adresi
   */
  async hastaneProvizyonlariGetir(hastaneAdresi: string): Promise<string[]> {
    try {
      const provizyonIds = await this.contract.hastaneProvizyonlariGetir(
        hastaneAdresi
      );
      console.log(`✅ Hastane için ${provizyonIds.length} provizyon bulundu`);
      return provizyonIds;
    } catch (error: any) {
      console.error("❌ Provizyon listesi getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Provizyonu e-Nabız ile senkronize et
   * @param provizyonId Provizyon ID
   * @param enabizReferansNo e-Nabız referans numarası
   */
  async enabizSenkronize(
    provizyonId: string,
    enabizReferansNo: string
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`🔗 e-Nabız senkronizasyonu: ${provizyonId}`);

      const tx = await this.contract.enabizSenkronize(
        ethers.id(provizyonId),
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

  // ==================== SGK FONKSİYONLARI ====================

  /**
   * Provizyon manuel onayla
   * @param provizyonId Provizyon ID
   * @param onaylandi True ise onayla, false ise reddet
   * @param sgkPayi SGK payı (onaylanırsa, kuruş)
   * @param redNedeni Red nedeni (reddedilirse)
   */
  async provizyonOnayla(
    provizyonId: string,
    onaylandi: boolean,
    sgkPayi: bigint = 0n,
    redNedeni: string = ""
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`⚖️ Provizyon onaylanıyor ${provizyonId}`);
      console.log(`   Karar: ${onaylandi ? "ONAYLANDI" : "REDDEDİLDİ"}`);

      if (onaylandi) {
        console.log(`   SGK Payı: ${this.formatTRY(sgkPayi)} TRY`);
      } else {
        console.log(`   Red Nedeni: ${redNedeni}`);
      }

      const tx = await this.contract.provizyonOnayla(
        ethers.id(provizyonId),
        onaylandi,
        sgkPayi,
        redNedeni
      );

      const receipt = await tx.wait();
      console.log(`✅ Provizyon blok ${receipt.blockNumber}'da onaylandı`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Provizyon onaylama başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Onaylı provizyonu öde
   * HEALTH-TR token için önceden onay gereklidir
   * @param provizyonId Provizyon ID
   */
  async provizyonOde(
    provizyonId: string
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(`💰 Provizyon ödeniyor ${provizyonId}`);

      const tx = await this.contract.provizyonOde(ethers.id(provizyonId), {
        gasLimit: 300000,
      });

      const receipt = await tx.wait();
      console.log(`✅ Provizyon blok ${receipt.blockNumber}'da ödendi`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Provizyon ödemesi başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * SUT kodu için fiyat belirle
   * @param hastaneAdresi Hastane adresi
   * @param sutKodu SUT 2025 kodu
   * @param fiyat Fiyat (kuruş)
   */
  async sutFiyatBelirle(
    hastaneAdresi: string,
    sutKodu: string,
    fiyat: bigint
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(
        `📊 SUT fiyat ayarı: ${sutKodu} = ${this.formatTRY(fiyat)} TRY`
      );

      const tx = await this.contract.sutFiyatBelirle(
        hastaneAdresi,
        sutKodu,
        fiyat
      );
      const receipt = await tx.wait();

      console.log(`✅ SUT fiyat blok ${receipt.blockNumber}'da güncellendi`);
      return receipt;
    } catch (error: any) {
      console.error("❌ SUT fiyat güncelleme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * SUT fiyatını getir
   * @param hastane Hastane adresi
   * @param sutKodu SUT kodu
   */
  async sutFiyatGetir(hastane: string, sutKodu: string): Promise<bigint> {
    try {
      const fiyat = await this.contract.sutFiyatGetir(hastane, sutKodu);
      console.log(`💵 SUT fiyat ${sutKodu}: ${this.formatTRY(fiyat)} TRY`);
      return fiyat;
    } catch (error: any) {
      console.error("❌ SUT fiyat getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== GÖRÜNTÜLEME FONKSİYONLARI ====================

  /**
   * Provizyon detaylarını getir
   * @param provizyonId Provizyon ID
   */
  async provizyonGetir(provizyonId: string): Promise<ProvizyonDetay> {
    try {
      const provizyon = await this.contract.provizyonGetir(
        ethers.id(provizyonId)
      );

      return {
        hastaDID: provizyon.hastaDID,
        hastane: provizyon.hastane,
        sutKodu: provizyon.sutKodu,
        tutar: provizyon.tutar,
        sgkPayi: provizyon.sgkPayi,
        durum: provizyon.durum,
        gonderilmeTarihi: new Date(Number(provizyon.gonderilmeTarihi) * 1000),
      };
    } catch (error: any) {
      console.error("❌ Provizyon getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * SGK istatistiklerini getir
   */
  async sgkIstatistikGetir(): Promise<{
    toplamProvizyon: number;
    onaylanan: number;
    reddedilen: number;
    toplamOdenen: bigint;
    bekleyen: number;
  }> {
    try {
      const istatistik = await this.contract.sgkIstatistikGetir();

      console.log(`📊 SGK İstatistikleri:`);
      console.log(`   Toplam: ${istatistik.toplamProvizyon}`);
      console.log(`   Onaylanan: ${istatistik.onaylanan}`);
      console.log(`   Reddedilen: ${istatistik.reddedilen}`);
      console.log(`   Ödenen: ${this.formatTRY(istatistik.toplamOdenen)} TRY`);
      console.log(`   Bekleyen: ${istatistik.bekleyen}`);

      return {
        toplamProvizyon: Number(istatistik.toplamProvizyon),
        onaylanan: Number(istatistik.onaylanan),
        reddedilen: Number(istatistik.reddedilen),
        toplamOdenen: istatistik.toplamOdenen,
        bekleyen: Number(istatistik.bekleyen),
      };
    } catch (error: any) {
      console.error("❌ İstatistik getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== HEALTH-TR TOKEN ENTEGRASYONU ====================

  /**
   * Kontrat için HEALTH-TR token harcama onayı ver
   * Provizyon ödemeden önce gerekli
   * @param tutar Onaylanacak tutar (kuruş)
   */
  async healthTROnayVer(tutar: bigint): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Yazma işlemleri için signer gerekli");
    }

    try {
      console.log(
        `💵 Kontrat için ${this.formatTRY(tutar)} TRY onaylanıyor`
      );

      // HEALTH-TR token kontratı
      const healthTRContract = new ethers.Contract(
        this.config.healthTRTokenAdresi,
        [
          "function approve(address spender, uint256 amount) returns (bool)",
        ],
        this.signer
      );

      const tx = await healthTRContract.approve(
        this.config.kontratAdresi,
        tutar
      );

      const receipt = await tx.wait();
      console.log(`✅ HEALTH-TR onay blok ${receipt.blockNumber}'da verildi`);

      return receipt;
    } catch (error: any) {
      console.error("❌ HEALTH-TR onayı başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * HEALTH-TR bakiyesini getir
   * @param adres Cüzdan adresi
   */
  async healthTRBakiye(adres: string): Promise<bigint> {
    try {
      const healthTRContract = new ethers.Contract(
        this.config.healthTRTokenAdresi,
        ["function balanceOf(address account) view returns (uint256)"],
        this.provider
      );

      const bakiye = await healthTRContract.balanceOf(adres);
      console.log(`💰 HEALTH-TR Bakiye: ${this.formatTRY(bakiye)} TRY`);

      return bakiye;
    } catch (error: any) {
      console.error("❌ HEALTH-TR bakiye getirme başarısız:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== OLAY DİNLEME ====================

  /**
   * ProvizyonGonderildi olaylarını dinle
   */
  onProvizyonGonderildi(
    callback: (
      provizyonId: string,
      hastaDID: string,
      hastane: string,
      sutKodu: string,
      tutar: bigint
    ) => void
  ): void {
    this.contract.on(
      "ProvizyonGonderildi",
      (provizyonId, hastaDID, hastane, sutKodu, tutar) => {
        console.log(
          `📢 ProvizyonGonderildi: ${provizyonId} - ${this.formatTRY(tutar)} TRY`
        );
        callback(provizyonId, hastaDID, hastane, sutKodu, tutar);
      }
    );
  }

  /**
   * ProvizyonOnaylandi olaylarını dinle
   */
  onProvizyonOnaylandi(
    callback: (provizyonId: string, sgkPayi: bigint, hastaPayi: bigint) => void
  ): void {
    this.contract.on("ProvizyonOnaylandi", (provizyonId, sgkPayi, hastaPayi) => {
      console.log(
        `📢 ProvizyonOnaylandi: ${provizyonId} - SGK: ${this.formatTRY(sgkPayi)} TRY`
      );
      callback(provizyonId, sgkPayi, hastaPayi);
    });
  }

  /**
   * ProvizyonOdendi olaylarını dinle
   */
  onProvizyonOdendi(
    callback: (provizyonId: string, hastane: string, tutar: bigint) => void
  ): void {
    this.contract.on("ProvizyonOdendi", (provizyonId, hastane, tutar) => {
      console.log(
        `💰 ProvizyonOdendi: ${provizyonId} - ${this.formatTRY(tutar)} TRY`
      );
      callback(provizyonId, hastane, tutar);
    });
  }

  // ==================== YARDIMCI FONKSIYONLAR ====================

  /**
   * TRY tutarını formatla (kuruş'tan TRY'ye)
   */
  private formatTRY(tutar: bigint): string {
    return (Number(tutar) / 100).toFixed(2);
  }

  /**
   * TRY tutarını kuruş'a çevir
   */
  parseTRY(tutar: string): bigint {
    return BigInt(Math.round(parseFloat(tutar) * 100));
  }

  /**
   * Hata işleme
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
    console.log("✅ MedulaProvizyon client bağlantısı kesildi");
  }
}

// ==================== FACTORY ====================

export function createMedulaProvizyonClient(
  config: MedulaProvizyonConfig
): MedulaProvizyonClient {
  return new MedulaProvizyonClient(config);
}

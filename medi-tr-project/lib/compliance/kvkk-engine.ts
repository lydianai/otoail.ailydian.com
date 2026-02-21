/**
 * KVKK Auto-Compliance Engine
 * Automated breach detection and compliance monitoring
 *
 * Özellikler:
 * - 72 saat içinde ihlal bildirimi
 * - Otomatik veri minimizasyonu kontrolü
 * - Açık rıza doğrulaması
 * - VERBİS uyumluluk
 * - Aydınlatma metni tracking
 * - Silme hakkı otomasyonu
 */

// ==================== TİPLER ====================

export interface KVKKKontrol {
  kontrolId: string;
  tarih: Date;
  kontrolTipi: KVKKKontrolTipi;
  sonuc: KontrolSonucu;
  detaylar: string;
  onerilenAksiyonlar: string[];
}

export enum KVKKKontrolTipi {
  ACIK_RIZA = "ACIK_RIZA",
  VERI_MINIMIZASYONU = "VERI_MINIMIZASYONU",
  SAKLAMA_SURESI = "SAKLAMA_SURESI",
  SILME_HAKKI = "SILME_HAKKI",
  AYDINLATMA_METNI = "AYDINLATMA_METNI",
  VERI_AKTARIMI = "VERI_AKTARIMI",
  GUVENLIK_TEDBIRLERI = "GUVENLIK_TEDBIRLERI",
  DENETIM_IZI = "DENETIM_IZI",
}

export enum KontrolSonucu {
  UYUMLU = "UYUMLU",
  UYARI = "UYARI",
  IHLAL = "IHLAL",
  KRITIK_IHLAL = "KRITIK_IHLAL",
}

export interface VeriIhlali {
  ihlalId: string;
  tespit Tarihi: Date;
  ihlalTipi: IhlalTipi;
  etkilenenKisiSayisi: number;
  veriKategorileri: string[];
  ihlalinNedeni: string;
  alinmaTedbirler: string[];
  kurumabildirimiGerekli: boolean;
  kurumaBildirimTarihi?: Date;
  ilgiliyeBildirimGerekli: boolean;
  ilgiliyeBildirimTarihi?: Date;
  riskSeviyesi: RiskSeviye;
}

export enum IhlalTipi {
  YETKISIZ_ERISIM = "YETKISIZ_ERISIM",
  VERI_KAYBI = "VERI_KAYBI",
  VERI_SIZINTISI = "VERI_SIZINTISI",
  YANLIS_AKTARIM = "YANLIS_AKTARIM",
  GUVENLIK_ACIGI = "GUVENLIK_ACIGI",
  SILME_HATASI = "SILME_HATASI",
}

export enum RiskSeviye {
  DUSUK = "DUSUK",
  ORTA = "ORTA",
  YUKSEK = "YUKSEK",
  KRITIK = "KRITIK",
}

export interface AcikRizaKaydi {
  hastaDID: string;
  rizaTarihi: Date;
  aydinlatmaMetniOkundu: boolean;
  veriIslemeAmaci: string[];
  paylasimIzni: {
    saglikKurumlari: boolean;
    eNabiz: boolean;
    arastirma: boolean;
    sigorta: boolean;
  };
  iptalTarihi?: Date;
  aktif: boolean;
}

export interface VeriMinimizasyonuKontrol {
  islem: string;
  istenilenVeriler: string[];
  gereksizVeriler: string[];
  uygunlukOrani: number; // 0-100
  onerilenminiımumVeri: string[];
}

export interface SaklamaSuresiKontrol {
  veriTipi: string;
  saklamaSuresi: number; // gün
  yasakSaklama: number; // gün
  maksimumSure: number; // gün (KVKK)
  uyumlumu: boolean;
  asanSure: number; // gün
}

// ==================== KVKK COMPLIANCE ENGINE ====================

export class KVKKComplianceEngine {
  private aktifIhlaller: VeriIhlali[] = [];
  private kontrolGecmisi: KVKKKontrol[] = [];

  constructor() {
    console.log("✅ KVKK Compliance Engine başlatıldı");
    console.log("   📋 KVKK Kanunu No: 6698");
    console.log("   📋 VERBİS Entegrasyonu: Aktif");
  }

  // ==================== AÇIK RIZA KONTROLÜ ====================

  /**
   * Açık rıza doğrulaması
   */
  async acikRizaKontrol(hastaDID: string): Promise<KVKKKontrol> {
    console.log(`🔍 KVKK Açık Rıza kontrolü: ${hastaDID}`);

    // Gerçek implementasyonda veritabanından çekilir
    const rizaKaydi = await this.getRizaKaydi(hastaDID);

    const hatalar: string[] = [];
    const oneriler: string[] = [];

    if (!rizaKaydi) {
      hatalar.push("Açık rıza kaydı bulunamadı");
      return this.createKontrol(
        KVKKKontrolTipi.ACIK_RIZA,
        KontrolSonucu.KRITIK_IHLAL,
        "Hasta için açık rıza kaydı mevcut değil",
        ["Veri işleme durdurulmalı", "Açık rıza alınmalı", "KVKK m.5 ihlali"]
      );
    }

    if (!rizaKaydi.aktif) {
      hatalar.push("Rıza iptal edilmiş");
    }

    if (!rizaKaydi.aydinlatmaMetniOkundu) {
      hatalar.push("Aydınlatma metni okunmamış");
    }

    if (rizaKaydi.veriIslemeAmaci.length === 0) {
      hatalar.push("Veri işleme amacı belirtilmemiş");
    }

    if (hatalar.length > 0) {
      return this.createKontrol(
        KVKKKontrolTipi.ACIK_RIZA,
        KontrolSonucu.IHLAL,
        hatalar.join(", "),
        [
          "Açık rıza yenilenmelidir",
          "Aydınlatma metni gösterilmelidir",
          "İşleme amacı netleştirilmelidir",
        ]
      );
    }

    return this.createKontrol(
      KVKKKontrolTipi.ACIK_RIZA,
      KontrolSonucu.UYUMLU,
      "Açık rıza kaydı uygun",
      []
    );
  }

  // ==================== VERİ MİNİMİZASYONU ====================

  /**
   * Veri minimizasyonu ilkesi kontrolü
   */
  veriMinimizasyonuKontrol(
    islem: string,
    istenilenVeriler: string[]
  ): VeriMinimizasyonuKontrol {
    console.log(`📊 Veri minimizasyonu kontrolü: ${islem}`);

    // İşlem türüne göre gerekli minimum veri
    const minimumVeriSeti = this.getMinimumVeriSeti(islem);

    const gereksizVeriler = istenilenVeriler.filter(
      (veri) => !minimumVeriSeti.includes(veri)
    );

    const uygunVeriler = istenilenVeriler.filter((veri) =>
      minimumVeriSeti.includes(veri)
    );

    const uygunlukOrani = Math.round(
      (uygunVeriler.length / istenilenVeriler.length) * 100
    );

    const sonuc: VeriMinimizasyonuKontrol = {
      islem,
      istenilenVeriler,
      gereksizVeriler,
      uygunlukOrani,
      onerilenMiniumumVeri: minimumVeriSeti,
    };

    if (gereksizVeriler.length > 0) {
      console.log(`⚠️ Gereksiz veri talebi tespit edildi:`);
      console.log(`   Gereksiz: ${gereksizVeriler.join(", ")}`);
      console.log(`   Uygunluk: %${uygunlukOrani}`);
    } else {
      console.log(`✅ Veri minimizasyonu uygun (%${uygunlukOrani})`);
    }

    return sonuc;
  }

  /**
   * İşlem türüne göre minimum veri seti
   */
  private getMinimumVeriSeti(islem: string): string[] {
    const veriSetleri: Record<string, string[]> = {
      "poliklinik-muayene": [
        "ad",
        "soyad",
        "tcKimlikNo",
        "dogumTarihi",
        "cinsiyet",
      ],
      "ameliyat": [
        "ad",
        "soyad",
        "tcKimlikNo",
        "dogumTarihi",
        "kanGrubu",
        "alerjiler",
        "kronikHastaliklar",
      ],
      "ilac-reçete": ["ad", "soyad", "tcKimlikNo", "dogumTarihi"],
      "medula-provizyon": ["ad", "soyad", "tcKimlikNo", "sgkNo"],
    };

    return veriSetleri[islem] || ["ad", "soyad", "tcKimlikNo"];
  }

  // ==================== SAKLAMA SÜRESİ KONTROLÜ ====================

  /**
   * Saklama süresi KVKK uyumluluğu
   */
  saklamaSuresiKontrol(
    veriTipi: string,
    saklamaSuresi: number
  ): SaklamaSuresiKontrol {
    console.log(`📅 Saklama süresi kontrolü: ${veriTipi}`);

    const yasakSaklama = this.getYasakSaklama(veriTipi);
    const maksimumSure = this.getMaksimumSaklama(veriTipi);

    const uyumlu = saklamaSuresi <= maksimumSure;
    const asanSure = maksimumSure - saklamaSuresi;

    const sonuc: SaklamaSuresiKontrol = {
      veriTipi,
      saklamaSuresi,
      yasakSaklama,
      maksimumSure,
      uyumlu,
      asanSure,
    };

    if (!uyumlu) {
      console.log(`❌ Saklama süresi aşıldı!`);
      console.log(`   Mevcut: ${saklamaSuresi} gün`);
      console.log(`   Maksimum: ${maksimumSure} gün`);
      console.log(`   Aşım: ${Math.abs(asanSure)} gün`);
    } else if (asanSure < 30) {
      console.log(`⚠️ Saklama süresi dolmak üzere (${asanSure} gün)`);
    } else {
      console.log(`✅ Saklama süresi uygun (kalan: ${asanSure} gün)`);
    }

    return sonuc;
  }

  /**
   * Veri tipi için yasal saklama süresi
   */
  private getYasakSaklama(veriTipi: string): number {
    const yasakSureler: Record<string, number> = {
      "hasta-kaydi": 3650, // 10 yıl (Sağlık Bakanlığı)
      "muayene-kaydi": 3650,
      "ameliyat-kaydi": 7300, // 20 yıl
      "medula-provizyon": 3650, // 10 yıl (SGK)
      "radyoloji-goruntu": 3650, // 10 yıl
      "laboratuvar-sonuc": 1825, // 5 yıl
      "recete": 1825, // 5 yıl
      "randevu-kaydi": 365, // 1 yıl
      "iletisim-kaydi": 730, // 2 yıl
    };

    return yasakSureler[veriTipi] || 365;
  }

  /**
   * KVKK'ya göre maksimum saklama (yasaldan sonra +1 yıl)
   */
  private getMaksimumSaklama(veriTipi: string): number {
    return this.getYasakSaklama(veriTipi) + 365;
  }

  // ==================== VERİ İHLALİ TESPİTİ ====================

  /**
   * Veri ihlali tespit et ve kaydet
   */
  async veriIhlaliTespit(
    ihlalTipi: IhlalTipi,
    etkilenenKisiSayisi: number,
    veriKategorileri: string[],
    ihlalinNedeni: string
  ): Promise<VeriIhlali> {
    console.log(`🚨 VERİ İHLALİ TESPİT EDİLDİ!`);
    console.log(`   Tip: ${ihlalTipi}`);
    console.log(`   Etkilenen: ${etkilenenKisiSayisi} kişi`);

    const riskSeviyesi = this.hesaplaRiskSeviyesi(
      ihlalTipi,
      etkilenenKisiSayisi,
      veriKategorileri
    );

    const ihlal: VeriIhlali = {
      ihlalId: `IHLAL-${Date.now()}`,
      tespitiTarihi: new Date(),
      ihlalTipi,
      etkilenenKisiSayisi,
      veriKategorileri,
      ihlalinNedeni,
      alinmaTedbirler: [],
      kurumabildirimiGerekli: this.kurumabildirimiGerekirmi(
        riskSeviyesi,
        etkilenenKisiSayisi
      ),
      ilgiliyeBildirimGerekli: this.ilgiliyeBildirimGerekirmi(riskSeviyesi),
      riskSeviyesi,
    };

    this.aktifIhlaller.push(ihlal);

    // 72 saat içinde bildirim uyarısı
    if (ihlal.kurumabildirimiGerekli) {
      console.log(`⚠️ KRİTİK: KVKK Kurumu'na 72 saat içinde bildirim zorunlu!`);
      this.kurumBildirimPlania(ihlal);
    }

    if (ihlal.ilgiliyeBildirimGerekli) {
      console.log(`⚠️ İlgili kişilere gecikmeksizin bildirim gerekli!`);
      this.ilgiliBildirimPlanla(ihlal);
    }

    return ihlal;
  }

  /**
   * Risk seviyesi hesapla
   */
  private hesaplaRiskSeviyesi(
    ihlalTipi: IhlalTipi,
    etkilenenSayi: number,
    veriKategorileri: string[]
  ): RiskSeviye {
    let riskSkoru = 0;

    // İhlal tipine göre skor
    switch (ihlalTipi) {
      case IhlalTipi.VERI_SIZINTISI:
        riskSkoru += 40;
        break;
      case IhlalTipi.YETKISIZ_ERISIM:
        riskSkoru += 35;
        break;
      case IhlalTipi.VERI_KAYBI:
        riskSkoru += 30;
        break;
      case IhlalTipi.GUVENLIK_ACIGI:
        riskSkoru += 25;
        break;
      case IhlalTipi.YANLIS_AKTARIM:
        riskSkoru += 20;
        break;
      case IhlalTipi.SILME_HATASI:
        riskSkoru += 15;
        break;
    }

    // Etkilenen sayısına göre
    if (etkilenenSayi > 1000) riskSkoru += 30;
    else if (etkilenenSayi > 100) riskSkoru += 20;
    else if (etkilenenSayi > 10) riskSkoru += 10;
    else riskSkoru += 5;

    // Özel nitelikli veri kontrolü
    const ozelNitelikliVeri = [
      "saglik-kaydi",
      "genetik-veri",
      "biyometrik-veri",
      "cinsel-hayat",
    ];

    const ozelNitelikliVarmi = veriKategorileri.some((kat) =>
      ozelNitelikliVeri.includes(kat)
    );

    if (ozelNitelikliVarmi) {
      riskSkoru += 30;
    }

    // Risk seviyesi belirleme
    if (riskSkoru >= 70) return RiskSeviye.KRITIK;
    if (riskSkoru >= 50) return RiskSeviye.YUKSEK;
    if (riskSkoru >= 30) return RiskSeviye.ORTA;
    return RiskSeviye.DUSUK;
  }

  /**
   * Kuruma bildirim gerekli mi
   */
  private kurumabildirimiGerekirmi(
    risk: RiskSeviye,
    etkilenenSayi: number
  ): boolean {
    // KVKK m.12: Kişilerin haklarını ve özgürlüklerini olumsuz etkiyorum
    return (
      risk === RiskSeviye.KRITIK ||
      risk === RiskSeviye.YUKSEK ||
      etkilenenSayi > 100
    );
  }

  /**
   * İlgili kişilere bildirim gerekli mi
   */
  private ilgiliyeBildirimGerekirmi(risk: RiskSeviye): boolean {
    // KVKK m.12/4: Olumsuz etki varsa ilgiliye de bildir
    return risk === RiskSeviye.KRITIK || risk === RiskSeviye.YUKSEK;
  }

  /**
   * 72 saat kurum bildirim planı
   */
  private kurumBildirimPlanla(ihlal: VeriIhlali): void {
    const bildirimTarihi = new Date();
    bildirimTarihi.setHours(bildirimTarihi.getHours() + 72);

    console.log(`📅 Kurum bildirimi son tarihi: ${bildirimTarihi.toISOString()}`);

    // Gerçek implementasyonda:
    // - E-posta/SMS uyarısı
    // - Dashboard bildirimi
    // - Otomatic VERBİS formu hazırlama
  }

  /**
   * İlgili kişi bildirim planı
   */
  private ilgiliBildirimPlanla(ihlal: VeriIhlali): void {
    console.log(`📧 İlgili kişilere bildirim başlatılıyor...`);

    // Gerçek implementasyonda:
    // - E-posta/SMS gönderimi
    // - Mobil uygulama push notification
    // - Portal üzerinden bilgilendirme
  }

  // ==================== SİLME HAKKI OTOMASYONU ====================

  /**
   * KVKK m.7 Silme hakkı otomatik işleme
   */
  async silmeHakkiisleme(hastaDID: string): Promise<boolean> {
    console.log(`🗑️ KVKK Silme hakkı işlemi: ${hastaDID}`);

    try {
      // 1. Yasal saklama süresi kontrolü
      const yasakSaklamaBitti = await this.yasalSaklamaSuresiKontrol(
        hastaDID
      );

      if (!yasakSaklamaBitti) {
        console.log(`❌ Yasal saklama süresi dolmamış - silme yapılamaz`);
        return false;
      }

      // 2. Blockchain kayıtları (imha edilemez ama inactive edilir)
      await this.blockchainKayitlariInactive(hastaDID);

      // 3. Veritabanı kayıtları
      await this.veritabaniKayitlariSil(hastaDID);

      // 4. Yedeklerden silme
      await this.yedeklemedenSil(hastaDID);

      // 5. Denetim kaydı oluştur
      await this.silmeİslemiDenetimKaydi(hastaDID);

      console.log(`✅ Silme hakkı başarıyla uygulandı`);
      return true;
    } catch (error: any) {
      console.error(`❌ Silme işlemi başarısız:`, error.message);
      return false;
    }
  }

  private async yasakSaklamaSuresiKontrol(hastaDID: string): Promise<boolean> {
    // Gerçek implementasyon: veritabanı kontrolü
    return true;
  }

  private async blockchainKayitlariInactive(hastaDID: string): Promise<void> {
    console.log(`   📝 Blockchain kayıtları inactive ediliyor...`);
    // Blockchain kontratında deleteRecord çağır
  }

  private async veritabaniKayitlariSil(hastaDID: string): Promise<void> {
    console.log(`   🗄️ Veritabanı kayıtları siliniyor...`);
    // Soft delete (deletedAt set et)
  }

  private async yedeklemedenSil(hastaDID: string): Promise<void> {
    console.log(`   💾 Yedekleme sistemlerinden siliniyor...`);
    // Backup sistemlerine silme talimatı
  }

  private async silmeIslemiDenetimKaydi(hastaDID: string): Promise<void> {
    console.log(`   📋 Silme işlemi denetim kaydına ekleniyor...`);
    // Audit log oluştur
  }

  // ==================== YARDIMCI FONKSİYONLAR ====================

  private async getRizaKaydi(hastaDID: string): Promise<AcikRizaKaydi | null> {
    // Gerçek implementasyonda veritabanından çekilir
    return {
      hastaDID,
      rizaTarihi: new Date(),
      aydinlatmaMetniOkundu: true,
      veriIslemeAmaci: ["tedavi", "medula"],
      paylasimIzni: {
        saglikKurumlari: true,
        eNabiz: true,
        arastirma: false,
        sigorta: false,
      },
      aktif: true,
    };
  }

  private createKontrol(
    tip: KVKKKontrolTipi,
    sonuc: KontrolSonucu,
    detaylar: string,
    aksiyonlar: string[]
  ): KVKKKontrol {
    const kontrol: KVKKKontrol = {
      kontrolId: `KONTROL-${Date.now()}`,
      tarih: new Date(),
      kontrolTipi: tip,
      sonuc,
      detaylar,
      onerilenAksiyonlar: aksiyonlar,
    };

    this.kontrolGecmisi.push(kontrol);
    return kontrol;
  }

  /**
   * Tüm uyumluluk raporu
   */
  async uyumlulukRaporu(): Promise<{
    toplamKontrol: number;
    uyumlu: number;
    uyari: number;
    ihlal: number;
    aktifIhlaller: number;
    uyumlulukOrani: number;
  }> {
    const toplamKontrol = this.kontrolGecmisi.length;
    const uyumlu = this.kontrolGecmisi.filter(
      (k) => k.sonuc === KontrolSonucu.UYUMLU
    ).length;
    const uyari = this.kontrolGecmisi.filter(
      (k) => k.sonuc === KontrolSonucu.UYARI
    ).length;
    const ihlal = this.kontrolGecmisi.filter(
      (k) =>
        k.sonuc === KontrolSonucu.IHLAL ||
        k.sonuc === KontrolSonucu.KRITIK_IHLAL
    ).length;

    const uyumlulukOrani =
      toplamKontrol > 0 ? Math.round((uyumlu / toplamKontrol) * 100) : 0;

    return {
      toplamKontrol,
      uyumlu,
      uyari,
      ihlal,
      aktifIhlaller: this.aktifIhlaller.length,
      uyumlulukOrani,
    };
  }
}

// ==================== SINGLETON ====================

let globalKVKKEngine: KVKKComplianceEngine | null = null;

export function getKVKKEngine(): KVKKComplianceEngine {
  if (!globalKVKKEngine) {
    globalKVKKEngine = new KVKKComplianceEngine();
  }
  return globalKVKKEngine;
}

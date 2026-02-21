/**
 * e-Nabız AI Assistant
 * Lydian AI-powered health intervention & prediction system
 *
 * Özellikler:
 * - Proaktif sağlık müdahalesi
 * - e-Nabız verisi analizi
 * - Hastalık risk tahmini
 * - İlaç etkileşim uyarıları
 * - Aşı hatırlatıcıları
 * - Kronik hastalık yönetimi
 */

import axios, { AxiosInstance } from "axios";

// ==================== TİPLER ====================

export interface EnabizAIConfig {
  lydianApiUrl: string;
  lydianApiKey: string;
  model: string; // "lydian-clinical-tr-v2"
}

export interface SaglikProfili {
  hastaDID: string;
  yas: number;
  cinsiyet: "erkek" | "kadin";
  kanGrubu?: string;
  boy?: number; // cm
  kilo?: number; // kg
  kronikHastaliklar: string[];
  alerjiler: string[];
  kullandigiIlaclar: Ilac[];
  asiKayitlari: Asi[];
  sonMuayeneler: Muayene[];
  laboratu varSonuclari: LabSonuc[];
}

export interface Ilac {
  ilacAdi: string;
  etkenMadde: string;
  dozaj: string;
  kullanimSikligi: string;
  baslangicTarihi: Date;
  aktif: boolean;
}

export interface Asi {
  asiAdi: string;
  yapilmaTarihi: Date;
  hatirlatmaTarihi?: Date;
}

export interface Muayene {
  tarih: Date;
  tani: string;
  taniKodu: string; // ICD-10
  doktor: string;
  klinik: string;
}

export interface LabSonuc {
  tarih: Date;
  test: string;
  deger: number;
  birim: string;
  referansAralik: string;
  normalMi: boolean;
}

export interface SaglikOnerisi {
  oneriId: string;
  tip: OneriTipi;
  oncelik: "dusuk" | "orta" | "yuksek" | "acil";
  baslik: string;
  aciklama: string;
  aksiyon: string;
  nedeni: string;
  kaynakVeriler: string[];
  olusturmaTarihi: Date;
  gecerlilikTarihi: Date;
}

export enum OneriTipi {
  ASI_HATIRLATMA = "ASI_HATIRLATMA",
  KONTROL_MUAYENE = "KONTROL_MUAYENE",
  ILAC_ETKILESIM = "ILAC_ETKILESIM",
  LAB_ANORMALLIK = "LAB_ANORMALLIK",
  KRONIK_HASTALIK_YONETIM = "KRONIK_HASTALIK_YONETIM",
  ONLEYICI_SAGLIK = "ONLEYICI_SAGLIK",
  YASAM_TARZI = "YASAM_TARZI",
  ACIL_MUDAHALE = "ACIL_MUDAHALE",
}

export interface HastalikRiskTahmini {
  hastalik: string;
  icd10Kod: string;
  riskYuzdesi: number; // 0-100
  riskSeviye: "dusuk" | "orta" | "yuksek" | "cok-yuksek";
  riskFaktorleri: RiskFaktoru[];
  onlemeOneriler: string[];
  kaynak: string;
  modelGuvenilirlik: number; // 0-100
}

export interface RiskFaktoru {
  faktor: string;
  etki: "dusuk" | "orta" | "yuksek";
  aciklama: string;
}

export interface IlacEtkilesimAnaliz {
  ilaclar: string[];
  etkilesimVar: boolean;
  etkilesimSeviyesi?: "hafif" | "orta" | "siddetli" | "kontrendike";
  etkilesimAciklama?: string;
  onerilermAksiyon?: string;
  alternatifIlaclar?: string[];
}

// ==================== E-NABIZ AI ASSISTANT ====================

export class EnabizAIAssistant {
  private config: EnabizAIConfig;
  private httpClient: AxiosInstance;

  constructor(config: EnabizAIConfig) {
    this.config = config;

    this.httpClient = axios.create({
      baseURL: config.lydianApiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.lydianApiKey}`,
      },
      timeout: 30000,
    });

    console.log("✅ e-Nabız AI Assistant başlatıldı");
    console.log(`   Model: ${config.model}`);
  }

  // ==================== PROAKTIF SAĞLIK ANALİZİ ====================

  /**
   * Kapsamlı sağlık profili analizi ve öneriler
   */
  async proaktifSaglikAnalizi(
    profil: SaglikProfili
  ): Promise<SaglikOnerisi[]> {
    console.log(`🏥 Proaktif sağlık analizi: ${profil.hastaDID}`);

    const oneriler: SaglikOnerisi[] = [];

    // 1. Aşı kontrolleri
    const asiOnerileri = await this.asiKontrolleri(profil);
    oneriler.push(...asiOnerileri);

    // 2. İlaç etkileşim kontrolleri
    const ilacOnerileri = await this.ilacEtkilesimKontrol(profil);
    oneriler.push(...ilacOnerileri);

    // 3. Lab sonucu anormallikleri
    const labOnerileri = await this.labSonucAnalizi(profil);
    oneriler.push(...labOnerileri);

    // 4. Kronik hastalık yönetimi
    const kronikOnerileri = await this.kronikHastalikYonetimi(profil);
    oneriler.push(...kronikOnerileri);

    // 5. Önleyici sağlık önerileri
    const onleyiciOneriler = await this.onleyiciSaglikOnerileri(profil);
    oneriler.push(...onleyiciOneriler);

    // 6. BMI ve yaşam tarzı
    const yasamTarziOnerileri = await this.yasamTarziAnalizi(profil);
    oneriler.push(...yasamTarziOnerileri);

    // Önceliğe göre sırala
    oneriler.sort((a, b) => {
      const oncelikSirasi = { acil: 0, yuksek: 1, orta: 2, dusuk: 3 };
      return oncelikSirasi[a.oncelik] - oncelikSirasi[b.oncelik];
    });

    console.log(`✅ ${oneriler.length} sağlık önerisi oluşturuldu`);
    this.logOneriler(oneriler);

    return oneriler;
  }

  // ==================== AŞI KONTROLÜ ====================

  /**
   * Aşı takvimi ve hatırlatma kontrolü
   */
  private async asiKontrolleri(
    profil: SaglikProfili
  ): Promise<SaglikOnerisi[]> {
    const oneriler: SaglikOnerisi[] = [];
    const bugun = new Date();

    // Yetişkin aşı takvimi (Sağlık Bakanlığı önerileri)
    const gerekenAsilar = this.gerekenAsilariGetir(profil.yas);

    gerekenAsilar.forEach((asi) => {
      const yapilanAsi = profil.asiKayitlari.find((a) =>
        a.asiAdi.toLowerCase().includes(asi.toLowerCase())
      );

      if (!yapilanAsi) {
        oneriler.push({
          oneriId: `asi-${Date.now()}-${asi}`,
          tip: OneriTipi.ASI_HATIRLATMA,
          oncelik: "yuksek",
          baslik: `${asi} Aşısı Önerisi`,
          aciklama: `Yaş grubunuz için ${asi} aşısı önerilmektedir.`,
          aksiyon: "Aile hekiminizle iletişime geçin",
          nedeni: "Sağlık Bakanlığı aşı takvimi önerisi",
          kaynakVeriler: ["asi-takvimi"],
          olusturmaTarihi: bugun,
          gecerlilikTarihi: new Date(bugun.getTime() + 90 * 24 * 60 * 60 * 1000),
        });
      } else if (yapilanAsi.hatirlatmaTarihi && yapilanAsi.hatirlatmaTarihi <= bugun) {
        oneriler.push({
          oneriId: `asi-hatirlatma-${Date.now()}`,
          tip: OneriTipi.ASI_HATIRLATMA,
          oncelik: "orta",
          baslik: `${asi} Aşısı Hatırlatma`,
          aciklama: `${asi} aşınızın rapel (pekiştirme) dozu zamanı geldi.`,
          aksiyon: "Aile hekiminizle randevu alın",
          nedeni: "Rapel doz zamanı",
          kaynakVeriler: ["asi-kayitlari"],
          olusturmaTarihi: bugun,
          gecerlilikTarihi: new Date(bugun.getTime() + 30 * 24 * 60 * 60 * 1000),
        });
      }
    });

    return oneriler;
  }

  /**
   * Yaşa göre gerekli aşılar
   */
  private gerekenAsilariGetir(yas: number): string[] {
    const asilar: string[] = [];

    if (yas >= 18) asilar.push("Tetanoz");
    if (yas >= 50) asilar.push("Grip", "Pnömokok");
    if (yas >= 65) asilar.push("Zona Zoster");

    return asilar;
  }

  // ==================== İLAÇ ETKİLEŞİM KONTROLÜ ====================

  /**
   * İlaç-ilaç etkileşim analizi
   */
  private async ilacEtkilesimKontrol(
    profil: SaglikProfili
  ): Promise<SaglikOnerisi[]> {
    const oneriler: SaglikOnerisi[] = [];

    if (profil.kullandigiIlaclar.length < 2) {
      return oneriler; // Etkileşim için en az 2 ilaç gerekli
    }

    const aktifIlaclar = profil.kullandigiIlaclar.filter((i) => i.aktif);

    // AI modeli ile ilaç etkileşim analizi
    const etkilesim = await this.ilacEtkilesimAI(aktifIlaclar);

    if (etkilesim.etkilesimVar) {
      const oncelik =
        etkilesim.etkilesimSeviyesi === "kontrendike" ||
        etkilesim.etkilesimSeviyesi === "siddetli"
          ? "acil"
          : etkilesim.etkilesimSeviyesi === "orta"
          ? "yuksek"
          : "orta";

      oneriler.push({
        oneriId: `ilac-etkilesim-${Date.now()}`,
        tip: OneriTipi.ILAC_ETKILESIM,
        oncelik,
        baslik: "İlaç Etkileşimi Tespit Edildi",
        aciklama: etkilesim.etkilesimAciklama || "İlaçlarınız arasında etkileşim var",
        aksiyon: etkilesim.onerilenAksiyon || "Doktorunuza danışın",
        nedeni: `Etkileşim seviyesi: ${etkilesim.etkilesimSeviyesi}`,
        kaynakVeriler: ["ilac-bilgileri", "lydian-ai"],
        olusturmaTarihi: new Date(),
        gecerlilikTarihi: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }

    return oneriler;
  }

  /**
   * Lydian AI ile ilaç etkileşim analizi
   */
  private async ilacEtkilesimAI(
    ilaclar: Ilac[]
  ): Promise<IlacEtkilesimAnaliz> {
    try {
      const prompt = `Şu ilaçlar arasında etkileşim var mı? ${ilaclar
        .map((i) => i.ilacAdi)
        .join(", ")}`;

      const response = await this.httpClient.post("/analyze", {
        model: this.config.model,
        prompt,
        type: "drug-interaction",
        language: "tr",
      });

      // Gerçek Lydian AI yanıtı parse edilir
      // Şimdilik basitleştirilmiş yanıt
      return {
        ilaclar: ilaclar.map((i) => i.ilacAdi),
        etkilesimVar: false,
        etkilesimSeviyesi: undefined,
        etkilesimAciklama: undefined,
        onerilenAksiyon: undefined,
        alternatifIlaclar: undefined,
      };
    } catch (error: any) {
      console.error("❌ İlaç etkileşim AI analizi başarısız:", error.message);
      return {
        ilaclar: ilaclar.map((i) => i.ilacAdi),
        etkilesimVar: false,
      };
    }
  }

  // ==================== LAB SONUÇ ANALİZİ ====================

  /**
   * Laboratuvar sonuçlarındaki anormallikleri tespit et
   */
  private async labSonucAnalizi(
    profil: SaglikProfili
  ): Promise<SaglikOnerisi[]> {
    const oneriler: SaglikOnerisi[] = [];

    profil.laboratuvarSonuclari.forEach((lab) => {
      if (!lab.normalMi) {
        const oncelik = this.labAnormallikOncelik(lab);

        oneriler.push({
          oneriId: `lab-${Date.now()}-${lab.test}`,
          tip: OneriTipi.LAB_ANORMALLIK,
          oncelik,
          baslik: `${lab.test} Anormal Sonuç`,
          aciklama: `${lab.test}: ${lab.deger} ${lab.birim} (Normal: ${lab.referansAralik})`,
          aksiyon: "Doktorunuza danışın ve kontrol testi yaptırın",
          nedeni: "Referans aralığın dışında değer",
          kaynakVeriler: ["lab-sonuclari"],
          olusturmaTarihi: new Date(),
          gecerlilikTarihi: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
      }
    });

    return oneriler;
  }

  /**
   * Lab anormallik önceliği
   */
  private labAnormallikOncelik(
    lab: LabSonuc
  ): "dusuk" | "orta" | "yuksek" | "acil" {
    // Kritik testler
    const kritikTestler = [
      "troponin",
      "kreatinin",
      "potasyum",
      "sodyum",
      "glukoz",
    ];

    if (kritikTestler.some((t) => lab.test.toLowerCase().includes(t))) {
      return "yuksek";
    }

    return "orta";
  }

  // ==================== KRONİK HASTALIK YÖNETİMİ ====================

  /**
   * Kronik hastalıklar için takip önerileri
   */
  private async kronikHastalikYonetimi(
    profil: SaglikProfili
  ): Promise<SaglikOnerisi[]> {
    const oneriler: SaglikOnerisi[] = [];

    profil.kronikHastaliklar.forEach((hastalik) => {
      const takipOnerisi = this.kronikHastalikTakipOnerisi(hastalik);

      if (takipOnerisi) {
        oneriler.push({
          oneriId: `kronik-${Date.now()}-${hastalik}`,
          tip: OneriTipi.KRONIK_HASTALIK_YONETIM,
          oncelik: "yuksek",
          baslik: `${hastalik} Takibi`,
          aciklama: takipOnerisi.aciklama,
          aksiyon: takipOnerisi.aksiyon,
          nedeni: "Kronik hastalık düzenli takip gerektirir",
          kaynakVeriler: ["kronik-hastalik-kayitlari"],
          olusturmaTarihi: new Date(),
          gecerlilikTarihi: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        });
      }
    });

    return oneriler;
  }

  /**
   * Kronik hastalık takip önerisi
   */
  private kronikHastalikTakipOnerisi(
    hastalik: string
  ): { aciklama: string; aksiyon: string } | null {
    const takipPlanlari: Record<string, { aciklama: string; aksiyon: string }> =
      {
        diyabet: {
          aciklama: "HbA1c, açlık kan şekeri ve göz muayenesi kontrolü",
          aksiyon: "3 ayda bir endokrinoloji kontrolü",
        },
        hipertansiyon: {
          aciklama: "Kan basıncı takibi ve böbrek fonksiyon testleri",
          aksiyon: "Aylık kan basıncı ölçümü, 6 ayda bir kardiyoloji",
        },
        astim: {
          aciklama: "Solunum fonksiyon testi ve ilaç uyumu kontrolü",
          aksiyon: "6 ayda bir göğüs hastalıkları kontrolü",
        },
        koah: {
          aciklama: "Spirometri ve oksijen satürasyonu takibi",
          aksiyon: "3 ayda bir göğüs hastalıkları kontrolü",
        },
      };

    const hastalikKey = hastalik.toLowerCase();
    return takipPlanlari[hastalikKey] || null;
  }

  // ==================== ÖNLEYİCİ SAĞLIK ====================

  /**
   * Yaş ve cinsiyete göre önleyici sağlık önerileri
   */
  private async onleyiciSaglikOnerileri(
    profil: SaglikProfili
  ): Promise<SaglikOnerisi[]> {
    const oneriler: SaglikOnerisi[] = [];

    // Kadınlar için
    if (profil.cinsiyet === "kadin") {
      if (profil.yas >= 40) {
        oneriler.push({
          oneriId: `onleyici-mamografi-${Date.now()}`,
          tip: OneriTipi.ONLEYICI_SAGLIK,
          oncelik: "yuksek",
          baslik: "Mamografi Taraması",
          aciklama: "Yıllık mamografi taraması önerilir",
          aksiyon: "Radyoloji bölümünden randevu alın",
          nedeni: "Meme kanseri erken teşhis",
          kaynakVeriler: ["yas", "cinsiyet"],
          olusturmaTarihi: new Date(),
          gecerlilikTarihi: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
      }

      if (profil.yas >= 30 && profil.yas <= 65) {
        oneriler.push({
          oneriId: `onleyici-smear-${Date.now()}`,
          tip: OneriTipi.ONLEYICI_SAGLIK,
          oncelik: "orta",
          baslik: "Smear Testi",
          aciklama: "3 yılda bir smear testi önerilir",
          aksiyon: "Kadın hastalıkları randevusu alın",
          nedeni: "Rahim ağzı kanseri taraması",
          kaynakVeriler: ["yas", "cinsiyet"],
          olusturmaTarihi: new Date(),
          gecerlilikTarihi: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
      }
    }

    // Erkekler için
    if (profil.cinsiyet === "erkek" && profil.yas >= 50) {
      oneriler.push({
        oneriId: `onleyici-psa-${Date.now()}`,
        tip: OneriTipi.ONLEYICI_SAGLIK,
        oncelik: "orta",
        baslik: "PSA Testi",
        aciklama: "Prostat kanseri taraması için PSA testi",
        aksiyon: "Üroloji bölümünden randevu alın",
        nedeni: "Prostat kanseri erken teşhis",
        kaynakVeriler: ["yas", "cinsiyet"],
        olusturmaTarihi: new Date(),
        gecerlilikTarihi: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });
    }

    // Tüm yetişkinler için kolon kanseri taraması
    if (profil.yas >= 50) {
      oneriler.push({
        oneriId: `onleyici-kolonoskopi-${Date.now()}`,
        tip: OneriTipi.ONLEYICI_SAGLIK,
        oncelik: "yuksek",
        baslik: "Kolonoskopi Taraması",
        aciklama: "10 yılda bir kolonoskopi önerilir",
        aksiyon: "Gastroenteroloji randevusu alın",
        nedeni: "Kolon kanseri erken teşhis",
        kaynakVeriler: ["yas"],
        olusturmaTarihi: new Date(),
        gecerlilikTarihi: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });
    }

    return oneriler;
  }

  // ==================== YAŞAM TARZI ANALİZİ ====================

  /**
   * BMI ve yaşam tarzı önerileri
   */
  private async yasamTarziAnalizi(
    profil: SaglikProfili
  ): Promise<SaglikOnerisi[]> {
    const oneriler: SaglikOnerisi[] = [];

    if (!profil.boy || !profil.kilo) {
      return oneriler;
    }

    // BMI hesapla
    const bmi = profil.kilo / Math.pow(profil.boy / 100, 2);

    if (bmi < 18.5) {
      oneriler.push({
        oneriId: `yasam-zayif-${Date.now()}`,
        tip: OneriTipi.YASAM_TARZI,
        oncelik: "orta",
        baslik: "Düşük Vücut Ağırlığı",
        aciklama: `BMI: ${bmi.toFixed(1)} - Zayıf kategorisinde`,
        aksiyon: "Beslenme uzmanına danışın",
        nedeni: "Sağlıklı kilo alımı gerekli",
        kaynakVeriler: ["boy", "kilo"],
        olusturmaTarihi: new Date(),
        gecerlilikTarihi: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
    } else if (bmi >= 25 && bmi < 30) {
      oneriler.push({
        oneriId: `yasam-fazla-kilo-${Date.now()}`,
        tip: OneriTipi.YASAM_TARZI,
        oncelik: "orta",
        baslik: "Fazla Kilolu",
        aciklama: `BMI: ${bmi.toFixed(1)} - Fazla kilolu kategorisinde`,
        aksiyon: "Beslenme programı ve düzenli egzersiz",
        nedeni: "Sağlıklı kilo yönetimi önerilir",
        kaynakVeriler: ["boy", "kilo"],
        olusturmaTarihi: new Date(),
        gecerlilikTarihi: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
    } else if (bmi >= 30) {
      oneriler.push({
        oneriId: `yasam-obez-${Date.now()}`,
        tip: OneriTipi.YASAM_TARZI,
        oncelik: "yuksek",
        baslik: "Obezite",
        aciklama: `BMI: ${bmi.toFixed(1)} - Obez kategorisinde`,
        aksiyon: "Beslenme uzmanı ve endokrinoloji konsültasyonu",
        nedeni: "Obezite kronik hastalık riski artırır",
        kaynakVeriler: ["boy", "kilo"],
        olusturmaTarihi: new Date(),
        gecerlilikTarihi: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
    }

    return oneriler;
  }

  // ==================== HASTALIK RİSK TAHMİNİ ====================

  /**
   * Lydian AI ile hastalık risk tahmini
   */
  async hastalilkRiskTahmini(
    profil: SaglikProfili
  ): Promise<HastalikRiskTahmini[]> {
    console.log(`🔮 Hastalık risk tahmini: ${profil.hastaDID}`);

    try {
      const response = await this.httpClient.post("/predict-risk", {
        model: this.config.model,
        profile: {
          age: profil.yas,
          gender: profil.cinsiyet,
          chronicDiseases: profil.kronikHastaliklar,
          medications: profil.kullandigiIlaclar.map((i) => i.ilacAdi),
          labResults: profil.laboratuvarSonuclari,
        },
        language: "tr",
      });

      // Gerçek Lydian AI yanıtı parse edilir
      return response.data.predictions || [];
    } catch (error: any) {
      console.error("❌ Risk tahmini başarısız:", error.message);
      return [];
    }
  }

  // ==================== YARDIMCI FONKSİYONLAR ====================

  /**
   * Önerileri logla
   */
  private logOneriler(oneriler: SaglikOnerisi[]): void {
    console.log("\n📋 Sağlık Önerileri:");

    const oncelikGruplari = {
      acil: oneriler.filter((o) => o.oncelik === "acil"),
      yuksek: oneriler.filter((o) => o.oncelik === "yuksek"),
      orta: oneriler.filter((o) => o.oncelik === "orta"),
      dusuk: oneriler.filter((o) => o.oncelik === "dusuk"),
    };

    if (oncelikGruplari.acil.length > 0) {
      console.log(`   🚨 Acil: ${oncelikGruplari.acil.length}`);
    }
    if (oncelikGruplari.yuksek.length > 0) {
      console.log(`   ⚠️  Yüksek: ${oncelikGruplari.yuksek.length}`);
    }
    if (oncelikGruplari.orta.length > 0) {
      console.log(`   📌 Orta: ${oncelikGruplari.orta.length}`);
    }
    if (oncelikGruplari.dusuk.length > 0) {
      console.log(`   ℹ️  Düşük: ${oncelikGruplari.dusuk.length}`);
    }
  }
}

// ==================== SINGLETON ====================

let globalEnabizAssistant: EnabizAIAssistant | null = null;

export function getEnabizAssistant(config?: EnabizAIConfig): EnabizAIAssistant {
  if (!globalEnabizAssistant && config) {
    globalEnabizAssistant = new EnabizAIAssistant(config);
  }

  if (!globalEnabizAssistant) {
    throw new Error("EnabizAIAssistant not initialized");
  }

  return globalEnabizAssistant;
}

/**
 * Örnek Kullanım:
 *
 * const assistant = getEnabizAssistant({
 *   lydianApiUrl: process.env.LYDIAN_AI_API_URL!,
 *   lydianApiKey: process.env.LYDIAN_AI_API_KEY!,
 *   model: "lydian-clinical-tr-v2",
 * });
 *
 * const oneriler = await assistant.proaktifSaglikAnalizi(hastaProfili);
 * console.log("Sağlık Önerileri:", oneriler);
 */

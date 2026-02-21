/**
 * MEDULA+ Optimizer - SUT 2025 Kod Eşleştirme
 * NLP-powered SUT code matcher for provizyon rejection prevention
 *
 * Özellikler:
 * - Doğal dil işleme ile SUT kod önerisi
 * - Red nedeni analizi ve önleme
 * - Otomatik kod düzeltme
 * - SGK kuralları uyumluluk kontrolü
 * - Tarih ve miktar validasyonu
 */

import natural from "natural";
import compromise from "compromise";

// ==================== TİPLER ====================

export interface SUTKodu {
  kod: string;
  tanim: string;
  birim: string;
  fiyat: number; // TRY
  kategori: SUTKategori;
  kosullar: string[];
  uyarilar: string[];
}

export enum SUTKategori {
  MUAYENE = "MUAYENE",
  TETKIK = "TETKIK",
  AMELIYAT = "AMELIYAT",
  GORUNTULEME = "GORUNTULEME",
  LABORATUVAR = "LABORATUVAR",
  FIZIK_TEDAVI = "FIZIK_TEDAVI",
  ENJEKSIYON = "ENJEKSIYON",
  PANSUMAN = "PANSUMAN",
  KONSULTASYON = "KONSULTASYON",
}

export interface ProvizyonAnaliz {
  islemAciklamasi: string;
  onerilenKodlar: SUTOneri[];
  hatalar: ProvizyonHata[];
  uygunlukSkoru: number; // 0-100
  riskDegerlendirmesi: RiskSeviye;
  optimizasyonOnerisi: string[];
}

export interface SUTOneri {
  sutKodu: string;
  tanim: string;
  guvenilirlik: number; // 0-100
  fiyat: number;
  benzerlikSkoru: number;
  neden: string;
}

export interface ProvizyonHata {
  tip: HataTipi;
  mesaj: string;
  cozum: string;
  onemDerecesi: "dusuk" | "orta" | "yuksek" | "kritik";
}

export enum HataTipi {
  YANLIS_KOD = "YANLIS_KOD",
  EKSIK_KOSUL = "EKSIK_KOSUL",
  TARIH_HATASI = "TARIH_HATASI",
  MIKTAR_HATASI = "MIKTAR_HATASI",
  TEKRAR_GIRISI = "TEKRAR_GIRISI",
  UYUMSUZ_TANI = "UYUMSUZ_TANI",
  FIYAT_ASIMI = "FIYAT_ASIMI",
}

export enum RiskSeviye {
  DUSUK = "DUSUK",
  ORTA = "ORTA",
  YUKSEK = "YUKSEK",
  KRITIK = "KRITIK",
}

// ==================== SUT 2025 VERITABANI (ÖRNEK) ====================

const SUT_2025_DATABASE: SUTKodu[] = [
  {
    kod: "100101",
    tanim: "Dahiliye Poliklinik Muayenesi",
    birim: "işlem",
    fiyat: 50.0,
    kategori: SUTKategori.MUAYENE,
    kosullar: ["Poliklinik şartları gerekli"],
    uyarilar: ["Günde bir kez uygulanabilir"],
  },
  {
    kod: "100201",
    tanim: "Genel Cerrahi Poliklinik Muayenesi",
    birim: "işlem",
    fiyat: 50.0,
    kategori: SUTKategori.MUAYENE,
    kosullar: [],
    uyarilar: [],
  },
  {
    kod: "100301",
    tanim: "Kardiyoloji Poliklinik Muayenesi",
    birim: "işlem",
    fiyat: 60.0,
    kategori: SUTKategori.MUAYENE,
    kosullar: ["Uzman hekim gerekli"],
    uyarilar: [],
  },
  {
    kod: "210101",
    tanim: "Tam Kan Sayımı (Hemogram)",
    birim: "test",
    fiyat: 15.0,
    kategori: SUTKategori.LABORATUVAR,
    kosullar: [],
    uyarilar: ["Günde bir kez"],
  },
  {
    kod: "210201",
    tanim: "Açlık Kan Şekeri",
    birim: "test",
    fiyat: 8.0,
    kategori: SUTKategori.LABORATUVAR,
    kosullar: ["8 saatlik açlık gerekli"],
    uyarilar: [],
  },
  {
    kod: "220101",
    tanim: "PA Akciğer Grafisi",
    birim: "film",
    fiyat: 25.0,
    kategori: SUTKategori.GORUNTULEME,
    kosullar: [],
    uyarilar: ["Tekrar çekim için gerekçe belirtilmeli"],
  },
  {
    kod: "220301",
    tanim: "Bilgisayarlı Tomografi (BT) - Beyin",
    birim: "tetkik",
    fiyat: 150.0,
    kategori: SUTKategori.GORUNTULEME,
    kosullar: ["Gerekçe raporu zorunlu"],
    uyarilar: ["Provizyon zorunlu"],
  },
  {
    kod: "310101",
    tanim: "EKG (Elektrokardiyografi)",
    birim: "kayıt",
    fiyat: 12.0,
    kategori: SUTKategori.TETKIK,
    kosullar: [],
    uyarilar: [],
  },
  {
    kod: "410101",
    tanim: "İntramusküler (IM) Enjeksiyon",
    birim: "işlem",
    fiyat: 5.0,
    kategori: SUTKategori.ENJEKSIYON,
    kosullar: [],
    uyarilar: [],
  },
  {
    kod: "510101",
    tanim: "Basit Yara Pansumanı",
    birim: "işlem",
    fiyat: 15.0,
    kategori: SUTKategori.PANSUMAN,
    kosullar: [],
    uyarilar: ["Yara boyutuna göre farklı kodlar"],
  },
];

// ==================== MEDULA+ OPTIMIZER ====================

export class MedulaOptimizer {
  private tokenizer: natural.WordTokenizer;
  private tfidf: natural.TfIdf;
  private stemmer: natural.PorterStemmerTr;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.tfidf = new natural.TfIdf();
    this.stemmer = natural.PorterStemmerTr;

    // SUT veritabanını TF-IDF için hazırla
    SUT_2025_DATABASE.forEach((sut) => {
      this.tfidf.addDocument(this.normalizeText(sut.tanim));
    });

    console.log("✅ MEDULA+ Optimizer başlatıldı");
    console.log(`   SUT 2025 Veritabanı: ${SUT_2025_DATABASE.length} kod`);
  }

  // ==================== ANA ANALİZ FONKSİYONU ====================

  /**
   * İşlem açıklamasını analiz et ve SUT kodları öner
   * @param islemAciklamasi Doğal dildeki işlem açıklaması
   * @param hastaYasi Hasta yaşı (validasyon için)
   * @param taniKodu ICD-10 tanı kodu (uyumluluk kontrolü için)
   */
  async analizEt(
    islemAciklamasi: string,
    hastaYasi?: number,
    taniKodu?: string
  ): Promise<ProvizyonAnaliz> {
    console.log(`🔍 İşlem analiz ediliyor: "${islemAciklamasi}"`);

    // 1. Metin normalizasyonu ve tokenization
    const normalizedText = this.normalizeText(islemAciklamasi);
    const tokens = this.tokenizer.tokenize(normalizedText);

    // 2. NLP ile anahtar kelime çıkarımı
    const keywords = this.extractKeywords(islemAciklamasi);

    // 3. SUT kod eşleştirme (TF-IDF benzerliği)
    const onerilenKodlar = this.matchSUTCodes(normalizedText, keywords);

    // 4. Hata kontrolü
    const hatalar = this.validateProvizyon(
      islemAciklamasi,
      onerilenKodlar,
      hastaYasi,
      taniKodu
    );

    // 5. Risk değerlendirmesi
    const riskDegerlendirmesi = this.calculateRisk(hatalar, onerilenKodlar);

    // 6. Uygunluk skoru
    const uygunlukSkoru = this.calculateComplianceScore(
      hatalar,
      onerilenKodlar
    );

    // 7. Optimizasyon önerileri
    const optimizasyonOnerisi = this.generateOptimizationSuggestions(
      hatalar,
      onerilenKodlar
    );

    const analiz: ProvizyonAnaliz = {
      islemAciklamasi,
      onerilenKodlar,
      hatalar,
      uygunlukSkoru,
      riskDegerlendirmesi,
      optimizasyonOnerisi,
    };

    this.logAnalysisResults(analiz);

    return analiz;
  }

  // ==================== NLP İŞLEME ====================

  /**
   * Metni normalize et (Türkçe karakter desteği)
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[ğ]/g, "g")
      .replace(/[ü]/g, "u")
      .replace(/[ş]/g, "s")
      .replace(/[ı]/g, "i")
      .replace(/[ö]/g, "o")
      .replace(/[ç]/g, "c")
      .replace(/[^a-z0-9\s]/g, "")
      .trim();
  }

  /**
   * Anahtar kelime çıkarımı (NLP)
   */
  private extractKeywords(text: string): string[] {
    const doc = compromise(text);

    // Türkçe için özel keyword extraction
    const keywords: string[] = [];

    // Tıbbi terimler
    const medicalTerms = [
      "muayene",
      "tetkik",
      "tahlil",
      "ameliyat",
      "grafi",
      "tomografi",
      "ultrason",
      "ekg",
      "ekokardiyografi",
      "kan",
      "idrar",
      "röntgen",
      "pansuman",
      "enjeksiyon",
      "aşı",
    ];

    medicalTerms.forEach((term) => {
      if (text.toLowerCase().includes(term)) {
        keywords.push(term);
      }
    });

    // Vücut bölgeleri
    const bodyParts = [
      "kalp",
      "akciğer",
      "beyin",
      "karaciğer",
      "böbrek",
      "mide",
      "bağırsak",
      "göz",
      "kulak",
      "burun",
      "boğaz",
      "diz",
      "omuz",
      "bel",
    ];

    bodyParts.forEach((part) => {
      if (text.toLowerCase().includes(part)) {
        keywords.push(part);
      }
    });

    return [...new Set(keywords)]; // Unique keywords
  }

  /**
   * SUT kodlarını eşleştir (TF-IDF benzerliği)
   */
  private matchSUTCodes(
    normalizedText: string,
    keywords: string[]
  ): SUTOneri[] {
    const matches: SUTOneri[] = [];

    this.tfidf.tfidfs(normalizedText, (i, measure) => {
      if (measure > 0) {
        const sut = SUT_2025_DATABASE[i];
        const benzerlikSkoru = Math.round(measure * 100);

        // Anahtar kelime bonus
        let bonus = 0;
        keywords.forEach((keyword) => {
          if (sut.tanim.toLowerCase().includes(keyword)) {
            bonus += 10;
          }
        });

        const guvenilirlik = Math.min(benzerlikSkoru + bonus, 100);

        if (guvenilirlik >= 30) {
          matches.push({
            sutKodu: sut.kod,
            tanim: sut.tanim,
            guvenilirlik,
            fiyat: sut.fiyat,
            benzerlikSkoru,
            neden: this.explainMatch(normalizedText, sut, keywords),
          });
        }
      }
    });

    // En yüksek güvenilirliğe göre sırala
    matches.sort((a, b) => b.guvenilirlik - a.guvenilirlik);

    return matches.slice(0, 5); // Top 5
  }

  /**
   * Eşleşme nedenini açıkla
   */
  private explainMatch(
    query: string,
    sut: SUTKodu,
    keywords: string[]
  ): string {
    const matchedKeywords = keywords.filter((kw) =>
      sut.tanim.toLowerCase().includes(kw)
    );

    if (matchedKeywords.length > 0) {
      return `Eşleşen terimler: ${matchedKeywords.join(", ")}`;
    }

    return "Metin benzerliğine göre eşleşti";
  }

  // ==================== VALİDASYON ====================

  /**
   * Provizyon validasyonu
   */
  private validateProvizyon(
    islemAciklamasi: string,
    onerilenKodlar: SUTOneri[],
    hastaYasi?: number,
    taniKodu?: string
  ): ProvizyonHata[] {
    const hatalar: ProvizyonHata[] = [];

    // 1. Kod seçimi kontrolü
    if (onerilenKodlar.length === 0) {
      hatalar.push({
        tip: HataTipi.YANLIS_KOD,
        mesaj: "Uygun SUT kodu bulunamadı",
        cozum: "İşlem açıklamasını daha detaylı yazın",
        onemDerecesi: "yuksek",
      });
    } else if (onerilenKodlar[0].guvenilirlik < 50) {
      hatalar.push({
        tip: HataTipi.YANLIS_KOD,
        mesaj: "Düşük güvenilirlikli kod eşleşmesi",
        cozum: `Önerilen: ${onerilenKodlar[0].sutKodu} - ${onerilenKodlar[0].tanim}`,
        onemDerecesi: "orta",
      });
    }

    // 2. Yaş kontrolü
    if (hastaYasi !== undefined) {
      if (hastaYasi < 0 || hastaYasi > 120) {
        hatalar.push({
          tip: HataTipi.MIKTAR_HATASI,
          mesaj: "Geçersiz hasta yaşı",
          cozum: "Hasta yaşını kontrol edin",
          onemDerecesi: "kritik",
        });
      }
    }

    // 3. Tanı uyumluluğu
    if (taniKodu) {
      const uyumluMu = this.checkDiagnosisCompatibility(
        taniKodu,
        onerilenKodlar
      );
      if (!uyumluMu) {
        hatalar.push({
          tip: HataTipi.UYUMSUZ_TANI,
          mesaj: "Tanı kodu ile işlem uyumsuz olabilir",
          cozum: "Tanı ve işlem uyumluluğunu kontrol edin",
          onemDerecesi: "yuksek",
        });
      }
    }

    // 4. Koşul kontrolü
    onerilenKodlar.forEach((oneri) => {
      const sut = SUT_2025_DATABASE.find((s) => s.kod === oneri.sutKodu);
      if (sut && sut.kosullar.length > 0) {
        hatalar.push({
          tip: HataTipi.EKSIK_KOSUL,
          mesaj: `${sut.kod} için koşullar var`,
          cozum: `Koşullar: ${sut.kosullar.join(", ")}`,
          onemDerecesi: "orta",
        });
      }
    });

    return hatalar;
  }

  /**
   * Tanı uyumluluğu kontrolü (basitleştirilmiş)
   */
  private checkDiagnosisCompatibility(
    icd10: string,
    sutKodlari: SUTOneri[]
  ): boolean {
    // Gerçek implementasyonda ICD-10 ve SUT uyumluluk tablosu kullanılır
    // Şimdilik basit kontrol
    if (icd10.startsWith("J")) {
      // Solunum sistemi hastalıkları
      return sutKodlari.some((s) =>
        s.tanim.toLowerCase().includes("akciğer")
      );
    }

    if (icd10.startsWith("I")) {
      // Dolaşım sistemi hastalıkları
      return sutKodlari.some(
        (s) =>
          s.tanim.toLowerCase().includes("kalp") ||
          s.tanim.toLowerCase().includes("kardiyoloji")
      );
    }

    return true; // Varsayılan: uyumlu
  }

  // ==================== RİSK DEĞERLENDİRME ====================

  /**
   * Red riski hesapla
   */
  private calculateRisk(
    hatalar: ProvizyonHata[],
    onerilenKodlar: SUTOneri[]
  ): RiskSeviye {
    const kritikHataSayisi = hatalar.filter(
      (h) => h.onemDerecesi === "kritik"
    ).length;
    const yuksekHataSayisi = hatalar.filter(
      (h) => h.onemDerecesi === "yuksek"
    ).length;

    if (kritikHataSayisi > 0) {
      return RiskSeviye.KRITIK;
    }

    if (yuksekHataSayisi >= 2) {
      return RiskSeviye.YUKSEK;
    }

    if (onerilenKodlar.length > 0 && onerilenKodlar[0].guvenilirlik < 50) {
      return RiskSeviye.YUKSEK;
    }

    if (hatalar.length >= 3) {
      return RiskSeviye.ORTA;
    }

    return RiskSeviye.DUSUK;
  }

  /**
   * Uygunluk skoru hesapla
   */
  private calculateComplianceScore(
    hatalar: ProvizyonHata[],
    onerilenKodlar: SUTOneri[]
  ): number {
    let skor = 100;

    // Hata cezaları
    hatalar.forEach((hata) => {
      switch (hata.onemDerecesi) {
        case "kritik":
          skor -= 30;
          break;
        case "yuksek":
          skor -= 20;
          break;
        case "orta":
          skor -= 10;
          break;
        case "dusuk":
          skor -= 5;
          break;
      }
    });

    // Kod güvenilirlik bonusu
    if (onerilenKodlar.length > 0) {
      const topKodGuvenilirlik = onerilenKodlar[0].guvenilirlik;
      if (topKodGuvenilirlik < 50) {
        skor -= 20;
      } else if (topKodGuvenilirlik >= 80) {
        skor += 10;
      }
    } else {
      skor -= 40; // Kod bulunamadı
    }

    return Math.max(0, Math.min(100, skor));
  }

  // ==================== OPTİMİZASYON ÖNERİLERİ ====================

  /**
   * Optimizasyon önerileri oluştur
   */
  private generateOptimizationSuggestions(
    hatalar: ProvizyonHata[],
    onerilenKodlar: SUTOneri[]
  ): string[] {
    const oneriler: string[] = [];

    // Hatalara göre öneriler
    hatalar.forEach((hata) => {
      oneriler.push(`⚠️ ${hata.mesaj}: ${hata.cozum}`);
    });

    // En iyi kod önerisi
    if (onerilenKodlar.length > 0) {
      const topKod = onerilenKodlar[0];
      oneriler.push(
        `✅ Önerilen SUT Kodu: ${topKod.sutKodu} - ${topKod.tanim} (${topKod.fiyat} TL)`
      );

      if (topKod.guvenilirlik >= 80) {
        oneriler.push("💡 Yüksek güvenilirlikli eşleşme - onaylayabilirsiniz");
      } else if (topKod.guvenilirlik < 50) {
        oneriler.push("⚠️ Düşük güvenilirlik - manuel kontrol önerilir");
      }
    }

    // Alternatif kodlar
    if (onerilenKodlar.length > 1) {
      oneriler.push(
        `📋 Alternatif kodlar: ${onerilenKodlar
          .slice(1, 3)
          .map((k) => k.sutKodu)
          .join(", ")}`
      );
    }

    return oneriler;
  }

  // ==================== LOGLAMA ====================

  /**
   * Analiz sonuçlarını logla
   */
  private logAnalysisResults(analiz: ProvizyonAnaliz): void {
    console.log("\n📊 MEDULA+ Analiz Sonuçları:");
    console.log(`   Uygunluk Skoru: ${analiz.uygunlukSkoru}/100`);
    console.log(`   Risk: ${analiz.riskDegerlendirmesi}`);
    console.log(`   Önerilen Kod Sayısı: ${analiz.onerilenKodlar.length}`);
    console.log(`   Hata Sayısı: ${analiz.hatalar.length}`);

    if (analiz.onerilenKodlar.length > 0) {
      console.log(
        `   En İyi Eşleşme: ${analiz.onerilenKodlar[0].sutKodu} (%${analiz.onerilenKodlar[0].guvenilirlik})`
      );
    }
  }
}

// ==================== SINGLETON ====================

let globalMedulaOptimizer: MedulaOptimizer | null = null;

export function getMedulaOptimizer(): MedulaOptimizer {
  if (!globalMedulaOptimizer) {
    globalMedulaOptimizer = new MedulaOptimizer();
  }
  return globalMedulaOptimizer;
}

/**
 * Örnek Kullanım:
 *
 * const optimizer = getMedulaOptimizer();
 *
 * const analiz = await optimizer.analizEt(
 *   "Hasta akciğer grafisi çektirdi",
 *   45, // yaş
 *   "J18.9" // ICD-10: Pnömoni
 * );
 *
 * console.log("Önerilen Kod:", analiz.onerilenKodlar[0].sutKodu);
 * console.log("Risk:", analiz.riskDegerlendirmesi);
 */

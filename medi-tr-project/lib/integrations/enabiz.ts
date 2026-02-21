/**
 * e-NABIZ ENTEGRASYON KATMANI
 * Sağlık Bakanlığı e-Nabız Web Servisleri - Production Ready
 *
 * e-Nabız 6 Ana Servis:
 * 1. Epikriz Servisi (Çıkış Özeti)
 * 2. Reçete Servisi
 * 3. Tahlil Servisi (Laboratuvar)
 * 4. Görüntüleme Servisi (Radyoloji)
 * 5. Tanı Servisi
 * 6. Ameliyat Servisi
 */

import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import crypto from 'crypto'

// ============================================
// e-NABIZ CONFIGURATION
// ============================================

interface ENabizConfig {
  // Sağlık Bakanlığı Credentials
  saglikTesisKodu: string
  kullaniciAdi: string
  kullaniciParola: string

  // e-Nabız Endpoints
  endpoints: {
    epikriz: string
    recete: string
    tahlil: string
    goruntuleme: string
    tani: string
    ameliyat: string
    asiKaydi: string
  }

  // Timeout
  timeout: number

  // Test/Production Mode
  testMode: boolean
}

const getENabizConfig = (): ENabizConfig => {
  if (!process.env.ENABIZ_SAGLIK_TESIS_KODU) {
    throw new Error('ENABIZ_SAGLIK_TESIS_KODU environment variable is required')
  }

  return {
    saglikTesisKodu: process.env.ENABIZ_SAGLIK_TESIS_KODU,
    kullaniciAdi: process.env.ENABIZ_KULLANICI_ADI || '',
    kullaniciParola: process.env.ENABIZ_KULLANICI_PAROLA || '',

    endpoints: {
      epikriz: process.env.ENABIZ_EPIKRIZ_URL || 'https://enabiz.saglik.gov.tr/EpikrizServisi',
      recete: process.env.ENABIZ_RECETE_URL || 'https://enabiz.saglik.gov.tr/ReceteServisi',
      tahlil: process.env.ENABIZ_TAHLIL_URL || 'https://enabiz.saglik.gov.tr/TahlilServisi',
      goruntuleme: process.env.ENABIZ_GORUNTULEME_URL || 'https://enabiz.saglik.gov.tr/GoruntulemServisi',
      tani: process.env.ENABIZ_TANI_URL || 'https://enabiz.saglik.gov.tr/TaniServisi',
      ameliyat: process.env.ENABIZ_AMELIYAT_URL || 'https://enabiz.saglik.gov.tr/AmeliyatServisi',
      asiKaydi: process.env.ENABIZ_ASI_URL || 'https://enabiz.saglik.gov.tr/AsiServisi',
    },

    timeout: parseInt(process.env.ENABIZ_TIMEOUT || '30000'),
    testMode: process.env.ENABIZ_TEST_MODE === 'true',
  }
}

// ============================================
// e-NABIZ SOAP CLIENT
// ============================================

class ENabizClient {
  protected config: ENabizConfig
  protected parser: XMLParser
  protected builder: XMLBuilder

  constructor() {
    this.config = getENabizConfig()
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    })
    this.builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      format: true,
    })
  }

  /**
   * SOAP İstek Oluştur
   */
  protected buildSOAPEnvelope(body: any): string {
    const envelope = {
      'soap:Envelope': {
        '@_xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
        '@_xmlns:enb': 'http://saglik.gov.tr/enabiz',
        'soap:Header': {},
        'soap:Body': body,
      },
    }

    return this.builder.build(envelope)
  }

  /**
   * SOAP İstek Gönder
   */
  protected async sendSOAPRequest(
    endpoint: string,
    soapAction: string,
    body: any
  ): Promise<any> {
    const soapEnvelope = this.buildSOAPEnvelope(body)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': soapAction,
        },
        body: soapEnvelope,
        signal: AbortSignal.timeout(this.config.timeout),
      })

      if (!response.ok) {
        throw new Error(`e-Nabız HTTP Error: ${response.status} ${response.statusText}`)
      }

      const xmlResponse = await response.text()
      return this.parser.parse(xmlResponse)

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`e-Nabız Connection Error: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Unique Document ID Oluştur
   */
  protected generateDocumentId(): string {
    return `${this.config.saglikTesisKodu}-${Date.now()}-${crypto.randomBytes(6).toString('hex')}`
  }
}

// ============================================
// 1. EPİKRİZ SERVİSİ (Çıkış Özeti)
// ============================================

export interface EpikrizRequest {
  // Hasta Bilgileri
  tcKimlikNo: string

  // Yatış Bilgileri
  yatisTarihi: string // YYYY-MM-DD
  cikisTarihi: string // YYYY-MM-DD
  yatisSuresi: number // Gün

  // Klinik Bilgileri
  klinikKodu: string
  klinikAdi: string

  // Doktor Bilgileri
  doktorTescilNo: string
  doktorAdi: string

  // Tanılar (ICD-10)
  girisKlinikTani: string
  cikisKlinikTani: string
  ikincilTanilar?: string[]

  // Yapılan İşlemler
  yapilanIslemler?: Array<{
    islemKodu: string
    islemAdi: string
    islemTarihi: string
  }>

  // Ameliyatlar
  ameliyatlar?: Array<{
    ameliyatKodu: string
    ameliyatAdi: string
    ameliyatTarihi: string
  }>

  // Kullanılan İlaçlar
  kullanılanIlaclar?: Array<{
    ilacKodu: string
    ilacAdi: string
    dozu: string
  }>

  // Epikriz Metni
  anamez: string
  fizikMuayene: string
  laboratuvarBulgulari: string
  taniVeTedavi: string
  oneriler: string
}

export interface EpikrizResponse {
  success: boolean
  documentId: string
  enabizDokumanNo?: string
  durum: 'BASARILI' | 'BASARISIZ'
  hataMesaji?: string
  rawXML: string
}

export class EpikrizServisi extends ENabizClient {
  /**
   * Epikriz Gönder
   */
  async epikrizGonder(request: EpikrizRequest): Promise<EpikrizResponse> {
    const documentId = this.generateDocumentId()

    const body = {
      'enb:epikrizKaydet': {
        'enb:saglikTesisKodu': this.config.saglikTesisKodu,
        'enb:kullaniciAdi': this.config.kullaniciAdi,
        'enb:kullaniciParola': this.config.kullaniciParola,
        'enb:dokumanId': documentId,
        'enb:tcKimlikNo': request.tcKimlikNo,
        'enb:yatisBilgileri': {
          'enb:yatisTarihi': request.yatisTarihi,
          'enb:cikisTarihi': request.cikisTarihi,
          'enb:yatisSuresi': request.yatisSuresi,
          'enb:klinikKodu': request.klinikKodu,
          'enb:klinikAdi': request.klinikAdi,
        },
        'enb:doktorBilgileri': {
          'enb:doktorTescilNo': request.doktorTescilNo,
          'enb:doktorAdi': request.doktorAdi,
        },
        'enb:tanilar': {
          'enb:girisKlinikTani': request.girisKlinikTani,
          'enb:cikisKlinikTani': request.cikisKlinikTani,
          'enb:ikincilTanilar': request.ikincilTanilar?.map((tani) => ({
            'enb:taniKodu': tani,
          })),
        },
        'enb:epikrizMetni': {
          'enb:anamez': request.anamez,
          'enb:fizikMuayene': request.fizikMuayene,
          'enb:laboratuvarBulgulari': request.laboratuvarBulgulari,
          'enb:taniVeTedavi': request.taniVeTedavi,
          'enb:oneriler': request.oneriler,
        },
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.epikriz,
        'http://saglik.gov.tr/enabiz/epikrizKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['enb:epikrizKaydetResponse']

      const isSuccess = result['enb:sonucKodu'] === '0'

      return {
        success: isSuccess,
        documentId,
        enabizDokumanNo: result['enb:dokumanNo'],
        durum: isSuccess ? 'BASARILI' : 'BASARISIZ',
        hataMesaji: result['enb:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        documentId,
        durum: 'BASARISIZ',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// 2. REÇETE SERVİSİ
// ============================================

export interface ENabizReceteRequest {
  tcKimlikNo: string
  eReceteNo: string // MEDULA'dan alınan e-reçete numarası
  receteTarihi: string
  doktorTescilNo: string
  ilaclar: Array<{
    ilacKodu: string
    ilacAdi: string
    kutuMiktari: number
    kullanimTalimati: string
  }>
}

export interface ENabizReceteResponse {
  success: boolean
  documentId: string
  enabizDokumanNo?: string
  durum: 'BASARILI' | 'BASARISIZ'
  hataMesaji?: string
  rawXML: string
}

export class ENabizReceteServisi extends ENabizClient {
  /**
   * Reçete Bilgisi Gönder
   */
  async receteBilgisiGonder(request: ENabizReceteRequest): Promise<ENabizReceteResponse> {
    const documentId = this.generateDocumentId()

    const body = {
      'enb:receteKaydet': {
        'enb:saglikTesisKodu': this.config.saglikTesisKodu,
        'enb:kullaniciAdi': this.config.kullaniciAdi,
        'enb:kullaniciParola': this.config.kullaniciParola,
        'enb:dokumanId': documentId,
        'enb:tcKimlikNo': request.tcKimlikNo,
        'enb:eReceteNo': request.eReceteNo,
        'enb:receteTarihi': request.receteTarihi,
        'enb:doktorTescilNo': request.doktorTescilNo,
        'enb:ilaclar': {
          'enb:ilac': request.ilaclar.map((ilac) => ({
            'enb:ilacKodu': ilac.ilacKodu,
            'enb:ilacAdi': ilac.ilacAdi,
            'enb:kutuMiktari': ilac.kutuMiktari,
            'enb:kullanimTalimati': ilac.kullanimTalimati,
          })),
        },
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.recete,
        'http://saglik.gov.tr/enabiz/receteKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['enb:receteKaydetResponse']

      const isSuccess = result['enb:sonucKodu'] === '0'

      return {
        success: isSuccess,
        documentId,
        enabizDokumanNo: result['enb:dokumanNo'],
        durum: isSuccess ? 'BASARILI' : 'BASARISIZ',
        hataMesaji: result['enb:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        documentId,
        durum: 'BASARISIZ',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// 3. TAHLİL SERVİSİ (Laboratuvar)
// ============================================

export interface TahlilRequest {
  tcKimlikNo: string
  tahlilTarihi: string
  doktorTescilNo: string

  // Tahlil Sonuçları
  sonuclar: Array<{
    testKodu: string // LOINC veya ulusal kod
    testAdi: string
    sonuc: string
    birim: string
    referansAraligi?: string
    normallik?: 'NORMAL' | 'DUSUK' | 'YUKSEK'
  }>
}

export interface TahlilResponse {
  success: boolean
  documentId: string
  enabizDokumanNo?: string
  durum: 'BASARILI' | 'BASARISIZ'
  hataMesaji?: string
  rawXML: string
}

export class TahlilServisi extends ENabizClient {
  /**
   * Tahlil Sonucu Gönder
   */
  async tahlilSonucuGonder(request: TahlilRequest): Promise<TahlilResponse> {
    const documentId = this.generateDocumentId()

    const body = {
      'enb:tahlilKaydet': {
        'enb:saglikTesisKodu': this.config.saglikTesisKodu,
        'enb:kullaniciAdi': this.config.kullaniciAdi,
        'enb:kullaniciParola': this.config.kullaniciParola,
        'enb:dokumanId': documentId,
        'enb:tcKimlikNo': request.tcKimlikNo,
        'enb:tahlilTarihi': request.tahlilTarihi,
        'enb:doktorTescilNo': request.doktorTescilNo,
        'enb:sonuclar': {
          'enb:sonuc': request.sonuclar.map((sonuc) => ({
            'enb:testKodu': sonuc.testKodu,
            'enb:testAdi': sonuc.testAdi,
            'enb:sonuc': sonuc.sonuc,
            'enb:birim': sonuc.birim,
            'enb:referansAraligi': sonuc.referansAraligi || '',
            'enb:normallik': sonuc.normallik || 'NORMAL',
          })),
        },
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.tahlil,
        'http://saglik.gov.tr/enabiz/tahlilKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['enb:tahlilKaydetResponse']

      const isSuccess = result['enb:sonucKodu'] === '0'

      return {
        success: isSuccess,
        documentId,
        enabizDokumanNo: result['enb:dokumanNo'],
        durum: isSuccess ? 'BASARILI' : 'BASARISIZ',
        hataMesaji: result['enb:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        documentId,
        durum: 'BASARISIZ',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// 4. GÖRÜNTÜLEME SERVİSİ (Radyoloji)
// ============================================

export interface GoruntulemRequest {
  tcKimlikNo: string
  goruntulenmeTarihi: string
  doktorTescilNo: string
  goruntulemeTipi: 'RONTGEN' | 'MR' | 'BT' | 'USG' | 'MAMOGRAFI' | 'DIGER'
  bolge: string
  sonuc: string
  pdfDosyaBase64?: string // PDF raporu (Base64)
  dicomDosyaURL?: string // DICOM görüntü URL'si
}

export interface GoruntulemResponse {
  success: boolean
  documentId: string
  enabizDokumanNo?: string
  durum: 'BASARILI' | 'BASARISIZ'
  hataMesaji?: string
  rawXML: string
}

export class GoruntulemServisi extends ENabizClient {
  /**
   * Görüntüleme Sonucu Gönder
   */
  async goruntulemeGonder(request: GoruntulemRequest): Promise<GoruntulemResponse> {
    const documentId = this.generateDocumentId()

    const body = {
      'enb:goruntulemKaydet': {
        'enb:saglikTesisKodu': this.config.saglikTesisKodu,
        'enb:kullaniciAdi': this.config.kullaniciAdi,
        'enb:kullaniciParola': this.config.kullaniciParola,
        'enb:dokumanId': documentId,
        'enb:tcKimlikNo': request.tcKimlikNo,
        'enb:goruntulenmeTarihi': request.goruntulenmeTarihi,
        'enb:doktorTescilNo': request.doktorTescilNo,
        'enb:goruntulemeTipi': request.goruntulemeTipi,
        'enb:bolge': request.bolge,
        'enb:sonuc': request.sonuc,
        'enb:pdfDosya': request.pdfDosyaBase64 || '',
        'enb:dicomURL': request.dicomDosyaURL || '',
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.goruntuleme,
        'http://saglik.gov.tr/enabiz/goruntulemKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['enb:goruntulemKaydetResponse']

      const isSuccess = result['enb:sonucKodu'] === '0'

      return {
        success: isSuccess,
        documentId,
        enabizDokumanNo: result['enb:dokumanNo'],
        durum: isSuccess ? 'BASARILI' : 'BASARISIZ',
        hataMesaji: result['enb:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        documentId,
        durum: 'BASARISIZ',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// 5. TANI SERVİSİ
// ============================================

export interface TaniRequest {
  tcKimlikNo: string
  muayeneTarihi: string
  doktorTescilNo: string
  taniKodlari: string[] // ICD-10 kodları
  taniAciklamalari: string[]
}

export interface TaniResponse {
  success: boolean
  documentId: string
  enabizDokumanNo?: string
  durum: 'BASARILI' | 'BASARISIZ'
  hataMesaji?: string
  rawXML: string
}

export class TaniServisi extends ENabizClient {
  /**
   * Tanı Bilgisi Gönder
   */
  async taniGonder(request: TaniRequest): Promise<TaniResponse> {
    const documentId = this.generateDocumentId()

    const body = {
      'enb:taniKaydet': {
        'enb:saglikTesisKodu': this.config.saglikTesisKodu,
        'enb:kullaniciAdi': this.config.kullaniciAdi,
        'enb:kullaniciParola': this.config.kullaniciParola,
        'enb:dokumanId': documentId,
        'enb:tcKimlikNo': request.tcKimlikNo,
        'enb:muayeneTarihi': request.muayeneTarihi,
        'enb:doktorTescilNo': request.doktorTescilNo,
        'enb:tanilar': {
          'enb:tani': request.taniKodlari.map((kod, index) => ({
            'enb:taniKodu': kod,
            'enb:taniAciklama': request.taniAciklamalari[index] || '',
          })),
        },
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.tani,
        'http://saglik.gov.tr/enabiz/taniKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['enb:taniKaydetResponse']

      const isSuccess = result['enb:sonucKodu'] === '0'

      return {
        success: isSuccess,
        documentId,
        enabizDokumanNo: result['enb:dokumanNo'],
        durum: isSuccess ? 'BASARILI' : 'BASARISIZ',
        hataMesaji: result['enb:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        documentId,
        durum: 'BASARISIZ',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// 6. AMELİYAT SERVİSİ
// ============================================

export interface AmeliyatRequest {
  tcKimlikNo: string
  ameliyatTarihi: string
  ameliyatKodu: string // ICD-10-PCS veya ulusal kod
  ameliyatAdi: string
  cerrahDoktorTescilNo: string
  anesteziyologDoktorTescilNo?: string
  ameliyatSuresi: number // Dakika
  anesteziyoloji: 'GENEL' | 'LOKAL' | 'SPINAL' | 'EPIDURAL'
  ameliyatNotu: string
}

export interface AmeliyatResponse {
  success: boolean
  documentId: string
  enabizDokumanNo?: string
  durum: 'BASARILI' | 'BASARISIZ'
  hataMesaji?: string
  rawXML: string
}

export class AmeliyatServisi extends ENabizClient {
  /**
   * Ameliyat Bilgisi Gönder
   */
  async ameliyatGonder(request: AmeliyatRequest): Promise<AmeliyatResponse> {
    const documentId = this.generateDocumentId()

    const body = {
      'enb:ameliyatKaydet': {
        'enb:saglikTesisKodu': this.config.saglikTesisKodu,
        'enb:kullaniciAdi': this.config.kullaniciAdi,
        'enb:kullaniciParola': this.config.kullaniciParola,
        'enb:dokumanId': documentId,
        'enb:tcKimlikNo': request.tcKimlikNo,
        'enb:ameliyatTarihi': request.ameliyatTarihi,
        'enb:ameliyatKodu': request.ameliyatKodu,
        'enb:ameliyatAdi': request.ameliyatAdi,
        'enb:cerrahDoktorTescilNo': request.cerrahDoktorTescilNo,
        'enb:anesteziyologDoktorTescilNo': request.anesteziyologDoktorTescilNo || '',
        'enb:ameliyatSuresi': request.ameliyatSuresi,
        'enb:anesteziyoloji': request.anesteziyoloji,
        'enb:ameliyatNotu': request.ameliyatNotu,
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.ameliyat,
        'http://saglik.gov.tr/enabiz/ameliyatKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['enb:ameliyatKaydetResponse']

      const isSuccess = result['enb:sonucKodu'] === '0'

      return {
        success: isSuccess,
        documentId,
        enabizDokumanNo: result['enb:dokumanNo'],
        durum: isSuccess ? 'BASARILI' : 'BASARISIZ',
        hataMesaji: result['enb:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        documentId,
        durum: 'BASARISIZ',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// 7. AŞI KAYIT SERVİSİ
// ============================================

export interface AsiKayitRequest {
  tcKimlikNo: string
  asiAdi: string
  asiKodu: string // e-Nabız standart aşı kodu
  uygulamaTarihi: string
  dozNo: number
  uygulananYer: string
  lotNo?: string
  doktorTescilNo: string
}

export interface AsiKayitResponse {
  success: boolean
  documentId: string
  enabizDokumanNo?: string
  durum: 'BASARILI' | 'BASARISIZ'
  hataMesaji?: string
  rawXML: string
}

export class AsiKayitServisi extends ENabizClient {
  /**
   * Aşı Kaydı Gönder
   */
  async asiKaydiGonder(request: AsiKayitRequest): Promise<AsiKayitResponse> {
    const documentId = this.generateDocumentId()

    const body = {
      'enb:asiKaydet': {
        'enb:saglikTesisKodu': this.config.saglikTesisKodu,
        'enb:kullaniciAdi': this.config.kullaniciAdi,
        'enb:kullaniciParola': this.config.kullaniciParola,
        'enb:dokumanId': documentId,
        'enb:tcKimlikNo': request.tcKimlikNo,
        'enb:asiAdi': request.asiAdi,
        'enb:asiKodu': request.asiKodu,
        'enb:uygulamaTarihi': request.uygulamaTarihi,
        'enb:dozNo': request.dozNo,
        'enb:uygulananYer': request.uygulananYer,
        'enb:lotNo': request.lotNo || '',
        'enb:doktorTescilNo': request.doktorTescilNo,
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.asiKaydi,
        'http://saglik.gov.tr/enabiz/asiKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['enb:asiKaydetResponse']

      const isSuccess = result['enb:sonucKodu'] === '0'

      return {
        success: isSuccess,
        documentId,
        enabizDokumanNo: result['enb:dokumanNo'],
        durum: isSuccess ? 'BASARILI' : 'BASARISIZ',
        hataMesaji: result['enb:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        documentId,
        durum: 'BASARISIZ',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// EXPORT ALL SERVICES
// ============================================

export const enabizServices = {
  epikriz: new EpikrizServisi(),
  recete: new ENabizReceteServisi(),
  tahlil: new TahlilServisi(),
  goruntuleme: new GoruntulemServisi(),
  tani: new TaniServisi(),
  ameliyat: new AmeliyatServisi(),
  asiKayit: new AsiKayitServisi(),
}

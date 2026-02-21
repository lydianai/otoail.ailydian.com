/**
 * MEDULA ENTEGRASYON KATMANI
 * SGK Web Servisleri - Production Ready
 *
 * MEDULA 4 Ana Servis:
 * 1. Hasta Tescil Servisi
 * 2. Provizyon İşlem Servisi
 * 3. Rapor Servisi
 * 4. Reçete Servisi
 */

import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import crypto from 'crypto'

// ============================================
// MEDULA CONFIGURATION
// ============================================

interface MEDULAConfig {
  // SGK Credentials (Production)
  saglikTesisKodu: string // Hastane tesil kodu
  kullaniciAdi: string
  kullaniciParola: string

  // MEDULA Endpoints
  endpoints: {
    hastaTescil: string
    provizyon: string
    rapor: string
    recete: string
  }

  // Timeouts
  timeout: number

  // Test/Production Mode
  testMode: boolean
}

const getMEDULAConfig = (): MEDULAConfig => {
  if (!process.env.MEDULA_SAGLIK_TESIS_KODU) {
    throw new Error('MEDULA_SAGLIK_TESIS_KODU environment variable is required')
  }

  return {
    saglikTesisKodu: process.env.MEDULA_SAGLIK_TESIS_KODU,
    kullaniciAdi: process.env.MEDULA_KULLANICI_ADI || '',
    kullaniciParola: process.env.MEDULA_KULLANICI_PAROLA || '',

    endpoints: {
      hastaTescil: process.env.MEDULA_HASTA_TESCIL_URL || 'https://medula.sgk.gov.tr/HastaTescilServisi',
      provizyon: process.env.MEDULA_PROVIZYON_URL || 'https://medula.sgk.gov.tr/ProvizyonServisi',
      rapor: process.env.MEDULA_RAPOR_URL || 'https://medula.sgk.gov.tr/RaporServisi',
      recete: process.env.MEDULA_RECETE_URL || 'https://medula.sgk.gov.tr/ReceteServisi',
    },

    timeout: parseInt(process.env.MEDULA_TIMEOUT || '30000'),
    testMode: process.env.MEDULA_TEST_MODE === 'true',
  }
}

// ============================================
// MEDULA SOAP CLIENT
// ============================================

class MEDULAClient {
  private config: MEDULAConfig
  private parser: XMLParser
  private builder: XMLBuilder

  constructor() {
    this.config = getMEDULAConfig()
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
  private buildSOAPEnvelope(body: any): string {
    const envelope = {
      'soap:Envelope': {
        '@_xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
        '@_xmlns:med': 'http://sgk.gov.tr/medula',
        'soap:Header': {},
        'soap:Body': body,
      },
    }

    return this.builder.build(envelope)
  }

  /**
   * SOAP İstek Gönder
   */
  private async sendSOAPRequest(
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
        throw new Error(`MEDULA HTTP Error: ${response.status} ${response.statusText}`)
      }

      const xmlResponse = await response.text()
      return this.parser.parse(xmlResponse)

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`MEDULA Connection Error: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Unique Request ID Oluştur
   */
  private generateRequestId(): string {
    return `${this.config.saglikTesisKodu}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
  }
}

// ============================================
// 1. HASTA TESCİL SERVİSİ
// ============================================

export interface HastaTescilRequest {
  tcKimlikNo: string
  ad: string
  soyad: string
  dogumTarihi: string // YYYY-MM-DD
  cinsiyet: 'E' | 'K' // E: Erkek, K: Kadın
  anneAdi?: string
  babaAdi?: string
}

export interface HastaTescilResponse {
  success: boolean
  requestId: string

  // Hasta Bilgileri
  tcKimlikNo: string
  ad: string
  soyad: string
  dogumTarihi: string

  // SGK Bilgileri
  sgkSicilNo?: string
  kurumKodu?: string
  kurumAdi?: string

  // Hata
  hataKodu?: string
  hataMesaji?: string

  // Raw Response
  rawXML: string
}

export class HastaTescilServisi extends MEDULAClient {
  /**
   * Hasta Bilgilerini SGK'dan Sorgula
   */
  async hastaBilgisiSorgula(request: HastaTescilRequest): Promise<HastaTescilResponse> {
    const requestId = this.generateRequestId()

    const body = {
      'med:hastaBilgisiSorgula': {
        'med:saglikTesisKodu': this.config.saglikTesisKodu,
        'med:kullaniciAdi': this.config.kullaniciAdi,
        'med:kullaniciParola': this.config.kullaniciParola,
        'med:islemId': requestId,
        'med:tcKimlikNo': request.tcKimlikNo,
        'med:ad': request.ad,
        'med:soyad': request.soyad,
        'med:dogumTarihi': request.dogumTarihi,
        'med:cinsiyet': request.cinsiyet,
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.hastaTescil,
        'http://sgk.gov.tr/medula/hastaBilgisiSorgula',
        body
      )

      // Parse SOAP Response
      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['med:hastaBilgisiSorgulaResponse']

      return {
        success: result['med:sonucKodu'] === '0000',
        requestId,
        tcKimlikNo: result['med:tcKimlikNo'] || request.tcKimlikNo,
        ad: result['med:ad'] || '',
        soyad: result['med:soyad'] || '',
        dogumTarihi: result['med:dogumTarihi'] || '',
        sgkSicilNo: result['med:sgkSicilNo'],
        kurumKodu: result['med:kurumKodu'],
        kurumAdi: result['med:kurumAdi'],
        hataKodu: result['med:sonucKodu'] !== '0000' ? result['med:sonucKodu'] : undefined,
        hataMesaji: result['med:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        requestId,
        tcKimlikNo: request.tcKimlikNo,
        ad: request.ad,
        soyad: request.soyad,
        dogumTarihi: request.dogumTarihi,
        hataKodu: 'CONNECTION_ERROR',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// 2. PROVİZYON İŞLEM SERVİSİ
// ============================================

export interface ProvizyonRequest {
  // Hasta Bilgileri
  tcKimlikNo: string
  ad: string
  soyad: string
  dogumTarihi: string

  // Kurum Bilgileri
  kurumKodu: string
  takipTipi: '1' | '2' | '3' // 1: Normal, 2: Acil, 3: Travma

  // İşlem Bilgileri
  islemKodu: string // SUT kodu
  islemTarihi: string // YYYY-MM-DD

  // Doktor Bilgileri
  doktorTescilNo: string
  bransKodu: string

  // Fiyat Bilgileri
  islemTutari: number
}

export interface ProvizyonResponse {
  success: boolean
  requestId: string

  // Provizyon Bilgileri
  provizyonNo?: string
  takipNo?: string

  // Tutar Bilgileri
  islemTutari: number
  sgkPayi?: number
  hastaPayi?: number

  // Durum
  durum: 'ONAYLANDI' | 'REDDEDILDI' | 'BEKLEMEDE'
  onayTarihi?: string

  // Hata
  hataKodu?: string
  hataMesaji?: string

  // Raw Response
  rawXML: string
}

export class ProvizyonServisi extends MEDULAClient {
  /**
   * Provizyon Al
   */
  async provizyonAl(request: ProvizyonRequest): Promise<ProvizyonResponse> {
    const requestId = this.generateRequestId()

    const body = {
      'med:provizyonAl': {
        'med:saglikTesisKodu': this.config.saglikTesisKodu,
        'med:kullaniciAdi': this.config.kullaniciAdi,
        'med:kullaniciParola': this.config.kullaniciParola,
        'med:islemId': requestId,
        'med:tcKimlikNo': request.tcKimlikNo,
        'med:ad': request.ad,
        'med:soyad': request.soyad,
        'med:dogumTarihi': request.dogumTarihi,
        'med:kurumKodu': request.kurumKodu,
        'med:takipTipi': request.takipTipi,
        'med:islemKodu': request.islemKodu,
        'med:islemTarihi': request.islemTarihi,
        'med:doktorTescilNo': request.doktorTescilNo,
        'med:bransKodu': request.bransKodu,
        'med:islemTutari': request.islemTutari.toFixed(2),
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.provizyon,
        'http://sgk.gov.tr/medula/provizyonAl',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['med:provizyonAlResponse']

      const isSuccess = result['med:sonucKodu'] === '0000'

      return {
        success: isSuccess,
        requestId,
        provizyonNo: result['med:provizyonNo'],
        takipNo: result['med:takipNo'],
        islemTutari: request.islemTutari,
        sgkPayi: result['med:sgkPayi'] ? parseFloat(result['med:sgkPayi']) : undefined,
        hastaPayi: result['med:hastaPayi'] ? parseFloat(result['med:hastaPayi']) : undefined,
        durum: isSuccess ? 'ONAYLANDI' : 'REDDEDILDI',
        onayTarihi: result['med:onayTarihi'],
        hataKodu: !isSuccess ? result['med:sonucKodu'] : undefined,
        hataMesaji: result['med:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        requestId,
        islemTutari: request.islemTutari,
        durum: 'REDDEDILDI',
        hataKodu: 'CONNECTION_ERROR',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }

  /**
   * Provizyon İptal
   */
  async provizyonIptal(
    provizyonNo: string,
    takipNo: string,
    iptalNedeni: string
  ): Promise<{ success: boolean; hataMesaji?: string }> {
    const requestId = this.generateRequestId()

    const body = {
      'med:provizyonIptal': {
        'med:saglikTesisKodu': this.config.saglikTesisKodu,
        'med:kullaniciAdi': this.config.kullaniciAdi,
        'med:kullaniciParola': this.config.kullaniciParola,
        'med:islemId': requestId,
        'med:provizyonNo': provizyonNo,
        'med:takipNo': takipNo,
        'med:iptalNedeni': iptalNedeni,
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.provizyon,
        'http://sgk.gov.tr/medula/provizyonIptal',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['med:provizyonIptalResponse']

      return {
        success: result['med:sonucKodu'] === '0000',
        hataMesaji: result['med:sonucMesaji'],
      }

    } catch (error) {
      return {
        success: false,
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
      }
    }
  }

  /**
   * Provizyon Sorgula
   */
  async provizyonSorgula(
    tcKimlikNo: string,
    baslangicTarihi: string,
    bitisTarihi: string
  ): Promise<{
    success: boolean
    provizyonlar: Array<{
      provizyonNo: string
      takipNo: string
      islemTarihi: string
      islemKodu: string
      islemAdi: string
      durum: string
      sgkPayi: number
      hastaPayi: number
    }>
    hataMesaji?: string
  }> {
    const requestId = this.generateRequestId()

    const body = {
      'med:provizyonSorgula': {
        'med:saglikTesisKodu': this.config.saglikTesisKodu,
        'med:kullaniciAdi': this.config.kullaniciAdi,
        'med:kullaniciParola': this.config.kullaniciParola,
        'med:islemId': requestId,
        'med:tcKimlikNo': tcKimlikNo,
        'med:baslangicTarihi': baslangicTarihi,
        'med:bitisTarihi': bitisTarihi,
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.provizyon,
        'http://sgk.gov.tr/medula/provizyonSorgula',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['med:provizyonSorgulaResponse']

      const provizyonlar = Array.isArray(result['med:provizyonlar'])
        ? result['med:provizyonlar']
        : result['med:provizyonlar']
        ? [result['med:provizyonlar']]
        : []

      return {
        success: true,
        provizyonlar: provizyonlar.map((p: any) => ({
          provizyonNo: p['med:provizyonNo'],
          takipNo: p['med:takipNo'],
          islemTarihi: p['med:islemTarihi'],
          islemKodu: p['med:islemKodu'],
          islemAdi: p['med:islemAdi'],
          durum: p['med:durum'],
          sgkPayi: parseFloat(p['med:sgkPayi'] || '0'),
          hastaPayi: parseFloat(p['med:hastaPayi'] || '0'),
        })),
      }

    } catch (error) {
      return {
        success: false,
        provizyonlar: [],
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
      }
    }
  }
}

// ============================================
// 3. RAPOR SERVİSİ
// ============================================

export interface RaporRequest {
  tcKimlikNo: string
  raporTipi: 'ISTIRAHAT' | 'ENGELLILIK' | 'GEBELIK' | 'DIGER'
  baslangicTarihi: string
  bitisTarihi: string
  taniKodu: string // ICD-10
  doktorTescilNo: string
  aciklama?: string
}

export interface RaporResponse {
  success: boolean
  requestId: string
  raporNo?: string
  durum: 'ONAYLANDI' | 'REDDEDILDI'
  hataKodu?: string
  hataMesaji?: string
  rawXML: string
}

export class RaporServisi extends MEDULAClient {
  /**
   * Rapor Kaydet
   */
  async raporKaydet(request: RaporRequest): Promise<RaporResponse> {
    const requestId = this.generateRequestId()

    const body = {
      'med:raporKaydet': {
        'med:saglikTesisKodu': this.config.saglikTesisKodu,
        'med:kullaniciAdi': this.config.kullaniciAdi,
        'med:kullaniciParola': this.config.kullaniciParola,
        'med:islemId': requestId,
        'med:tcKimlikNo': request.tcKimlikNo,
        'med:raporTipi': request.raporTipi,
        'med:baslangicTarihi': request.baslangicTarihi,
        'med:bitisTarihi': request.bitisTarihi,
        'med:taniKodu': request.taniKodu,
        'med:doktorTescilNo': request.doktorTescilNo,
        'med:aciklama': request.aciklama || '',
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.rapor,
        'http://sgk.gov.tr/medula/raporKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['med:raporKaydetResponse']

      const isSuccess = result['med:sonucKodu'] === '0000'

      return {
        success: isSuccess,
        requestId,
        raporNo: result['med:raporNo'],
        durum: isSuccess ? 'ONAYLANDI' : 'REDDEDILDI',
        hataKodu: !isSuccess ? result['med:sonucKodu'] : undefined,
        hataMesaji: result['med:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        requestId,
        durum: 'REDDEDILDI',
        hataKodu: 'CONNECTION_ERROR',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// 4. REÇETE SERVİSİ
// ============================================

export interface ReceteIlac {
  ilacKodu: string // SUT kodu
  kutuMiktari: number
  kullanimTalimati: string
}

export interface ReceteRequest {
  tcKimlikNo: string
  receteTipi: 'NORMAL' | 'KIRMIZI' | 'YESIL' | 'TURUNCU' | 'MOR'
  doktorTescilNo: string
  ilaclar: ReceteIlac[]
  taniKodu: string // ICD-10
}

export interface ReceteResponse {
  success: boolean
  requestId: string
  eReceteNo?: string
  durum: 'ONAYLANDI' | 'REDDEDILDI'
  hataKodu?: string
  hataMesaji?: string
  rawXML: string
}

export class ReceteServisi extends MEDULAClient {
  /**
   * e-Reçete Kaydet
   */
  async eReceteKaydet(request: ReceteRequest): Promise<ReceteResponse> {
    const requestId = this.generateRequestId()

    const body = {
      'med:eReceteKaydet': {
        'med:saglikTesisKodu': this.config.saglikTesisKodu,
        'med:kullaniciAdi': this.config.kullaniciAdi,
        'med:kullaniciParola': this.config.kullaniciParola,
        'med:islemId': requestId,
        'med:tcKimlikNo': request.tcKimlikNo,
        'med:receteTipi': request.receteTipi,
        'med:doktorTescilNo': request.doktorTescilNo,
        'med:taniKodu': request.taniKodu,
        'med:ilaclar': {
          'med:ilac': request.ilaclar.map((ilac) => ({
            'med:ilacKodu': ilac.ilacKodu,
            'med:kutuMiktari': ilac.kutuMiktari,
            'med:kullanimTalimati': ilac.kullanimTalimati,
          })),
        },
      },
    }

    try {
      const response = await this.sendSOAPRequest(
        this.config.endpoints.recete,
        'http://sgk.gov.tr/medula/eReceteKaydet',
        body
      )

      const soapBody = response['soap:Envelope']['soap:Body']
      const result = soapBody['med:eReceteKaydetResponse']

      const isSuccess = result['med:sonucKodu'] === '0000'

      return {
        success: isSuccess,
        requestId,
        eReceteNo: result['med:eReceteNo'],
        durum: isSuccess ? 'ONAYLANDI' : 'REDDEDILDI',
        hataKodu: !isSuccess ? result['med:sonucKodu'] : undefined,
        hataMesaji: result['med:sonucMesaji'],
        rawXML: this.builder.build(response),
      }

    } catch (error) {
      return {
        success: false,
        requestId,
        durum: 'REDDEDILDI',
        hataKodu: 'CONNECTION_ERROR',
        hataMesaji: error instanceof Error ? error.message : 'Bilinmeyen hata',
        rawXML: '',
      }
    }
  }
}

// ============================================
// EXPORT ALL SERVICES
// ============================================

export const medulaServices = {
  hastaTescil: new HastaTescilServisi(),
  provizyon: new ProvizyonServisi(),
  rapor: new RaporServisi(),
  recete: new ReceteServisi(),
}

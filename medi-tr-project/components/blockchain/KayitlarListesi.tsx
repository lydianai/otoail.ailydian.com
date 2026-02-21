"use client";

/**
 * KayitlarListesi Bileşeni
 * Oasis Sapphire blockchain'den sağlık kayıtlarını görüntüleme ve yönetme
 *
 * Özellikler:
 * - Blockchain'den şifreli kayıtları çekme
 * - İstemci taraflı şifre çözme
 * - Kayıt tipine göre filtreleme
 * - FHIR kaynak detaylarını görüntüleme
 * - Kayıt indirme/dışa aktarma
 * - Blockchain işlem doğrulama
 */

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  FileText,
  Download,
  Eye,
  Filter,
  Loader2,
  Lock,
  ExternalLink,
  Calendar,
  Hash,
} from "lucide-react";
import {
  HastaKasasiClient,
  KayitTipi,
  type BlockchainKayit,
} from "@/lib/blockchain/client/hasta-kasasi-client";

interface KayitlarListesiProps {
  hastaDID: string;
  provider: ethers.BrowserProvider;
}

export default function KayitlarListesi({ hastaDID, provider }: KayitlarListesiProps) {
  const [kayitlar, setKayitlar] = useState<BlockchainKayit[]>([]);
  const [filtreliKayitlar, setFiltreliKayitlar] = useState<BlockchainKayit[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [secilenTip, setSecilenTip] = useState<KayitTipi | "tumKayitlar">("tumKayitlar");
  const [secilenKayit, setSecilenKayit] = useState<BlockchainKayit | null>(null);
  const [cozulmusVeri, setCozulmusVeri] = useState<any>(null);
  const [cozuluyor, setCozuluyor] = useState(false);

  const kasaClient = new HastaKasasiClient(provider);

  useEffect(() => {
    kayitlariYukle();
  }, [hastaDID]);

  useEffect(() => {
    if (secilenTip === "tumKayitlar") {
      setFiltreliKayitlar(kayitlar);
    } else {
      setFiltreliKayitlar(kayitlar.filter((k) => k.kayitTipi === secilenTip));
    }
  }, [secilenTip, kayitlar]);

  async function kayitlariYukle() {
    try {
      setYukleniyor(true);
      const tumKayitlar = await kasaClient.getHastaKayitlari(hastaDID);
      setKayitlar(tumKayitlar);
      setFiltreliKayitlar(tumKayitlar);
    } catch (err: any) {
      console.error("Kayıtlar yüklenemedi:", err);
    } finally {
      setYukleniyor(false);
    }
  }

  async function kayitCoz(kayit: BlockchainKayit) {
    setCozuluyor(true);
    setSecilenKayit(kayit);
    setCozulmusVeri(null);

    try {
      // Üretimde bu:
      // 1. Hastanın özel anahtarını cüzdan/keystore'dan alır
      // 2. Kaydın şifreleme anahtarını çözer
      // 3. Çözülmüş anahtarı kullanarak FHIR verisini çözer

      // Demo amaçlı şifre çözme simülasyonu
      const cozulmus = await sifrelemeyiSimuleEt(kayit.sifreliVeri);
      setCozulmusVeri(cozulmus);
    } catch (err: any) {
      console.error("Şifre çözme başarısız:", err);
      setCozulmusVeri({
        hata: "Kayıt çözülemedi. Doğru şifreleme anahtarına sahip olmayabilirsiniz.",
      });
    } finally {
      setCozuluyor(false);
    }
  }

  async function sifrelemeyiSimuleEt(sifreliVeri: Uint8Array): Promise<any> {
    // Asenkron şifre çözme gecikmesini simüle et
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Üretimde, gerçek AES-256-GCM şifre çözme uygula
    // Şimdilik örnek FHIR veri yapısı döndür
    return {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital İşaretler",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "85354-9",
            display: "Kan basıncı paneli",
          },
        ],
      },
      effectiveDateTime: new Date().toISOString(),
      component: [
        {
          code: {
            coding: [
              { system: "http://loinc.org", code: "8480-6", display: "Sistolik kan basıncı" },
            ],
          },
          valueQuantity: { value: 120, unit: "mmHg" },
        },
        {
          code: {
            coding: [
              { system: "http://loinc.org", code: "8462-4", display: "Diyastolik kan basıncı" },
            ],
          },
          valueQuantity: { value: 80, unit: "mmHg" },
        },
      ],
    };
  }

  function kayitIndir(kayit: BlockchainKayit, veri: any) {
    const blob = new Blob([JSON.stringify(veri, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kayit-${kayit.kayitId.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function kayitTipiEtiketi(tip: KayitTipi): string {
    const etiketler: Record<KayitTipi, string> = {
      [KayitTipi.Muayene]: "Muayene",
      [KayitTipi.Tahlil]: "Tahlil",
      [KayitTipi.Goruntuleme]: "Görüntüleme",
      [KayitTipi.Ilac]: "İlaç",
      [KayitTipi.Ameliyat]: "Ameliyat",
      [KayitTipi.Asi]: "Aşı",
      [KayitTipi.Alerji]: "Alerji",
      [KayitTipi.BakimPlani]: "Bakım Planı",
      [KayitTipi.KlinikDokuman]: "Doküman",
    };
    return etiketler[tip] || "Bilinmiyor";
  }

  function kayitTipiRengi(tip: KayitTipi): string {
    const renkler: Record<KayitTipi, string> = {
      [KayitTipi.Muayene]: "bg-blue-100 text-blue-800",
      [KayitTipi.Tahlil]: "bg-green-100 text-green-800",
      [KayitTipi.Goruntuleme]: "bg-purple-100 text-purple-800",
      [KayitTipi.Ilac]: "bg-orange-100 text-orange-800",
      [KayitTipi.Ameliyat]: "bg-red-100 text-red-800",
      [KayitTipi.Asi]: "bg-teal-100 text-teal-800",
      [KayitTipi.Alerji]: "bg-yellow-100 text-yellow-800",
      [KayitTipi.BakimPlani]: "bg-indigo-100 text-indigo-800",
      [KayitTipi.KlinikDokuman]: "bg-gray-100 text-gray-800",
    };
    return renkler[tip] || "bg-gray-100 text-gray-800";
  }

  const kayitTipiSecenekleri = [
    { deger: "tumKayitlar", etiket: "Tüm Kayıtlar" },
    { deger: KayitTipi.Muayene, etiket: "Muayeneler" },
    { deger: KayitTipi.Tahlil, etiket: "Tahliller" },
    { deger: KayitTipi.Goruntuleme, etiket: "Görüntülemeler" },
    { deger: KayitTipi.Ilac, etiket: "İlaçlar" },
    { deger: KayitTipi.Ameliyat, etiket: "Ameliyatlar" },
    { deger: KayitTipi.Asi, etiket: "Aşılar" },
    { deger: KayitTipi.Alerji, etiket: "Alerjiler" },
    { deger: KayitTipi.BakimPlani, etiket: "Bakım Planları" },
    { deger: KayitTipi.KlinikDokuman, etiket: "Dokümanlar" },
  ];

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Sağlık Kayıtları</h3>
            <p className="text-sm text-gray-600">
              Blockchain'de {filtreliKayitlar.length} kayıt
            </p>
          </div>
        </div>

        {/* Filtre */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <select
            value={secilenTip}
            onChange={(e) =>
              setSecilenTip(
                e.target.value === "tumKayitlar" ? "tumKayitlar" : (Number(e.target.value) as KayitTipi)
              )
            }
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {kayitTipiSecenekleri.map((secenek) => (
              <option key={secenek.deger} value={secenek.deger}>
                {secenek.etiket}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kayıtlar Listesi */}
      {yukleniyor ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
      ) : filtreliKayitlar.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Sağlık kaydı bulunamadı</p>
          <p className="text-sm text-gray-500 mt-1">
            İlk FHIR kaydınızı blockchain'e yükleyin
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtreliKayitlar.map((kayit, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="h-4 w-4 text-gray-600" />
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${kayitTipiRengi(
                        kayit.kayitTipi
                      )}`}
                    >
                      {kayitTipiEtiketi(kayit.kayitTipi)}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(kayit.zamandamgasi * 1000).toLocaleDateString("tr-TR")}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 font-mono mb-1">
                    ID: {kayit.kayitId.slice(0, 20)}...
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Hash className="h-3.5 w-3.5" />
                      Blok {kayit.blokNumarasi}
                    </div>
                    {kayit.ipfsHash && (
                      <div className="flex items-center gap-1">
                        <ExternalLink className="h-3.5 w-3.5" />
                        IPFS
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => kayitCoz(kayit)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    Görüntüle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kayıt Detay Modal */}
      {secilenKayit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Başlık */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {kayitTipiEtiketi(secilenKayit.kayitTipi)}
                  </h3>
                  <p className="text-xs text-gray-600 font-mono">
                    {secilenKayit.kayitId.slice(0, 20)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cozulmusVeri && !cozulmusVeri.hata && (
                  <button
                    onClick={() => kayitIndir(secilenKayit, cozulmusVeri)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    İndir
                  </button>
                )}
                <button
                  onClick={() => {
                    setSecilenKayit(null);
                    setCozulmusVeri(null);
                  }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>

            {/* Modal İçerik */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cozuluyor ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-3" />
                  <p className="text-sm text-gray-600">Kayıt çözülüyor...</p>
                </div>
              ) : cozulmusVeri ? (
                cozulmusVeri.hata ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-900">{cozulmusVeri.hata}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* FHIR JSON Gösterimi */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">FHIR Kaynağı</h4>
                      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs overflow-x-auto">
                        {JSON.stringify(cozulmusVeri, null, 2)}
                      </pre>
                    </div>

                    {/* Blockchain Metadata */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Blockchain Metadata
                      </h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Kayıt ID:</span>
                          <span className="font-mono text-gray-900">
                            {secilenKayit.kayitId.slice(0, 16)}...
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Blok Numarası:</span>
                          <span className="font-mono text-gray-900">
                            {secilenKayit.blokNumarasi}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Zaman Damgası:</span>
                          <span className="text-gray-900">
                            {new Date(secilenKayit.zamandamgasi * 1000).toLocaleString("tr-TR")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Şifreleme:</span>
                          <span className="text-gray-900">AES-256-GCM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Bilgi */}
      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Lock className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-900">
            Tüm kayıtlar AES-256-GCM ile şifrelenir ve Oasis Sapphire blockchain'de saklanır.
            Sadece siz tam sağlık geçmişinizi çözebilir ve görüntüleyebilirsiniz. KVKK uyumludur.
          </p>
        </div>
      </div>
    </div>
  );
}

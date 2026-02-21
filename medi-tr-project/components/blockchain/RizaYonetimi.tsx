"use client";

/**
 * RizaYonetimi Bileşeni
 * Oasis Sapphire blockchain üzerinde sağlayıcı erişim rızalarını yönetme
 *
 * Özellikler:
 * - Sağlık kuruluşlarına zaman sınırlı rıza verme
 * - Aktif rızaları görüntüleme ve iptal etme
 * - Amaç bazlı erişim kontrolü
 * - Rıza verme/iptal denetim kaydı
 * - KVKK-uyumlu rıza yönetimi
 */

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Shield,
  Clock,
  UserCheck,
  X,
  Plus,
  AlertCircle,
  CheckCircle,
  Loader2,
  FileText,
} from "lucide-react";
import {
  HastaKasasiClient,
  RizaAmaci,
  type Riza,
} from "@/lib/blockchain/client/hasta-kasasi-client";

interface RizaYonetimiProps {
  hastaDID: string;
  provider: ethers.BrowserProvider;
  onRizaGuncelle?: () => void;
}

interface YeniRizaFormu {
  saglikKurulusuAdresi: string;
  amac: RizaAmaci;
  sureDays: number;
  izinVerilenKayitlar: string[];
}

export default function RizaYonetimi({
  hastaDID,
  provider,
  onRizaGuncelle,
}: RizaYonetimiProps) {
  const [rizalar, setRizalar] = useState<Riza[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yeniRizaFormuGoster, setYeniRizaFormuGoster] = useState(false);
  const [yeniRiza, setYeniRiza] = useState<YeniRizaFormu>({
    saglikKurulusuAdresi: "",
    amac: RizaAmaci.Tedavi,
    sureDays: 30,
    izinVerilenKayitlar: [],
  });
  const [rizaVeriliyor, setRizaVeriliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [basarili, setBasarili] = useState<string | null>(null);

  const kasaClient = new HastaKasasiClient(provider);

  useEffect(() => {
    rizalariYukle();
  }, [hastaDID]);

  async function rizalariYukle() {
    try {
      setYukleniyor(true);
      const aktifRizalar = await kasaClient.getAktifRizalar(hastaDID);
      setRizalar(aktifRizalar);
    } catch (err: any) {
      console.error("Rızalar yüklenemedi:", err);
      setHata("Rızalar blockchain'den yüklenemedi");
    } finally {
      setYukleniyor(false);
    }
  }

  async function rizaVer() {
    if (!yeniRiza.saglikKurulusuAdresi) {
      setHata("Sağlık kuruluşu adresi gerekli");
      return;
    }

    if (!ethers.isAddress(yeniRiza.saglikKurulusuAdresi)) {
      setHata("Geçersiz Ethereum adresi");
      return;
    }

    setRizaVeriliyor(true);
    setHata(null);
    setBasarili(null);

    try {
      const sureSaniye = yeniRiza.sureDays * 24 * 60 * 60;
      const izinVerilenKayitlarBytes = yeniRiza.izinVerilenKayitlar.map((id) =>
        ethers.id(id)
      );

      const makbuz = await kasaClient.kvkkOnayVer(
        hastaDID,
        yeniRiza.saglikKurulusuAdresi,
        yeniRiza.amac,
        sureSaniye,
        izinVerilenKayitlarBytes
      );

      setBasarili(`Rıza başarıyla verildi! TX: ${makbuz.hash.slice(0, 10)}...`);

      // Formu sıfırla
      setYeniRiza({
        saglikKurulusuAdresi: "",
        amac: RizaAmaci.Tedavi,
        sureDays: 30,
        izinVerilenKayitlar: [],
      });
      setYeniRizaFormuGoster(false);

      // Rızaları yeniden yükle
      await rizalariYukle();
      onRizaGuncelle?.();
    } catch (err: any) {
      console.error("Rıza verilemedi:", err);
      setHata(err.message || "Rıza verilemedi");
    } finally {
      setRizaVeriliyor(false);
    }
  }

  async function rizaIptalEt(saglikKurulusuAdresi: string) {
    if (!confirm("Bu sağlık kuruluşunun erişimini iptal etmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const makbuz = await kasaClient.rizaIptalEt(hastaDID, saglikKurulusuAdresi);
      setBasarili(`Rıza başarıyla iptal edildi! TX: ${makbuz.hash.slice(0, 10)}...`);

      // Rızaları yeniden yükle
      await rizalariYukle();
      onRizaGuncelle?.();
    } catch (err: any) {
      console.error("Rıza iptal edilemedi:", err);
      setHata(err.message || "Rıza iptal edilemedi");
    }
  }

  function sureFormatla(saniye: number): string {
    const gunler = Math.floor(saniye / (24 * 60 * 60));
    if (gunler > 0) return `${gunler} gün`;

    const saatler = Math.floor(saniye / (60 * 60));
    if (saatler > 0) return `${saatler} saat`;

    const dakikalar = Math.floor(saniye / 60);
    return `${dakikalar} dakika`;
  }

  function bitisTarihiFormatla(timestamp: number): string {
    const tarih = new Date(timestamp * 1000);
    const simdi = new Date();
    const farkMs = tarih.getTime() - simdi.getTime();
    const farkGun = Math.floor(farkMs / (1000 * 60 * 60 * 24));

    if (farkGun < 0) return "Süresi doldu";
    if (farkGun === 0) return "Bugün sona eriyor";
    if (farkGun === 1) return "Yarın sona eriyor";
    if (farkGun < 7) return `${farkGun} gün içinde sona eriyor`;

    return tarih.toLocaleDateString("tr-TR");
  }

  function amacEtiketi(amac: RizaAmaci): string {
    const etiketler: Record<RizaAmaci, string> = {
      [RizaAmaci.Tedavi]: "Tedavi",
      [RizaAmaci.Arastirma]: "Araştırma",
      [RizaAmaci.Sigorta]: "Sigorta",
      [RizaAmaci.Acil]: "Acil",
      [RizaAmaci.IkinciFikirAl]: "İkinci Görüş",
    };
    return etiketler[amac] || "Bilinmiyor";
  }

  function amacRengi(amac: RizaAmaci): string {
    const renkler: Record<RizaAmaci, string> = {
      [RizaAmaci.Tedavi]: "bg-blue-100 text-blue-800",
      [RizaAmaci.Arastirma]: "bg-purple-100 text-purple-800",
      [RizaAmaci.Sigorta]: "bg-green-100 text-green-800",
      [RizaAmaci.Acil]: "bg-red-100 text-red-800",
      [RizaAmaci.IkinciFikirAl]: "bg-yellow-100 text-yellow-800",
    };
    return renkler[amac] || "bg-gray-100 text-gray-800";
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Rıza Yönetimi</h3>
            <p className="text-sm text-gray-600">
              Sağlık kayıtlarınıza kimler erişebileceğini kontrol edin
            </p>
          </div>
        </div>

        <button
          onClick={() => setYeniRizaFormuGoster(!yeniRizaFormuGoster)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {yeniRizaFormuGoster ? (
            <>
              <X className="h-4 w-4" />
              İptal
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Erişim Ver
            </>
          )}
        </button>
      </div>

      {/* Başarı/Hata Mesajları */}
      {basarili && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-900">{basarili}</p>
          </div>
        </div>
      )}

      {hata && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-900">{hata}</p>
          </div>
        </div>
      )}

      {/* Yeni Rıza Formu */}
      {yeniRizaFormuGoster && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h4 className="font-semibold text-gray-900">Yeni Erişim Onayı Ver</h4>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sağlık Kuruluşu Cüzdan Adresi
            </label>
            <input
              type="text"
              value={yeniRiza.saglikKurulusuAdresi}
              onChange={(e) =>
                setYeniRiza({ ...yeniRiza, saglikKurulusuAdresi: e.target.value })
              }
              placeholder="0x..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Erişim Amacı
            </label>
            <select
              value={yeniRiza.amac}
              onChange={(e) =>
                setYeniRiza({
                  ...yeniRiza,
                  amac: Number(e.target.value) as RizaAmaci,
                })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={RizaAmaci.Tedavi}>Tedavi</option>
              <option value={RizaAmaci.Arastirma}>Araştırma</option>
              <option value={RizaAmaci.Sigorta}>Sigorta</option>
              <option value={RizaAmaci.Acil}>Acil</option>
              <option value={RizaAmaci.IkinciFikirAl}>İkinci Görüş</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Erişim Süresi
            </label>
            <select
              value={yeniRiza.sureDays}
              onChange={(e) =>
                setYeniRiza({ ...yeniRiza, sureDays: Number(e.target.value) })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={1}>1 gün</option>
              <option value={7}>7 gün</option>
              <option value={30}>30 gün</option>
              <option value={90}>90 gün</option>
              <option value={180}>180 gün</option>
              <option value={365}>1 yıl</option>
            </select>
          </div>

          <button
            onClick={rizaVer}
            disabled={rizaVeriliyor}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {rizaVeriliyor ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Rıza Veriliyor...
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4" />
                Rıza Ver
              </>
            )}
          </button>
        </div>
      )}

      {/* Aktif Rızalar Listesi */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Aktif Rızalar ({rizalar.length})</h4>

        {yukleniyor ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : rizalar.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Aktif rıza bulunmuyor</p>
            <p className="text-sm text-gray-500 mt-1">
              Sağlık kuruluşlarına kayıtlarınızı paylaşmak için erişim verin
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {rizalar.map((riza, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <UserCheck className="h-5 w-5 text-blue-600" />
                      <p className="text-sm font-mono text-gray-900">
                        {riza.saglikKurulusu.slice(0, 8)}...{riza.saglikKurulusu.slice(-6)}
                      </p>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${amacRengi(
                          riza.amac
                        )}`}
                      >
                        {amacEtiketi(riza.amac)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {bitisTarihiFormatla(riza.bitisSuresi)}
                      </div>
                      {riza.izinVerilenKayitlar.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          {riza.izinVerilenKayitlar.length} kayıt
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => rizaIptalEt(riza.saglikKurulusu)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    İptal Et
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bilgi */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900">
            Tüm rıza verme ve iptal işlemleri blockchain'e kaydedilir. İstediğiniz zaman
            erişimi iptal edebilirsiniz. Acil erişim talepleri ayrı olarak kayıt altına alınır.
            KVKK Madde 11 uyumludur.
          </p>
        </div>
      </div>
    </div>
  );
}

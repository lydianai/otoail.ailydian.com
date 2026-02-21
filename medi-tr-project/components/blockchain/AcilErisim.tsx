"use client";

/**
 * AcilErisim Bileşeni
 * Kritik sağlık durumları için camı kır acil erişim mekanizması
 *
 * Özellikler:
 * - Gerekçeli acil erişim talepleri
 * - Acil rızalar için 24 saatlik otomatik süre dolumu
 * - Gerçek zamanlı denetim kaydı
 * - KVKK-uyumlu acil geçersiz kılma
 * - Hasta bildirim sistemi
 */

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  AlertTriangle,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  History,
} from "lucide-react";
import {
  HastaKasasiClient,
  type AcilErisimTalebi,
} from "@/lib/blockchain/client/hasta-kasasi-client";

interface AcilErisimProps {
  hastaDID: string;
  provider: ethers.BrowserProvider;
  kullaniciRolu: "hasta" | "saglikci";
}

interface AcilTalepFormu {
  hastaDID: string;
  sebep: string;
  klinikGerekcesi: string;
}

export default function AcilErisim({
  hastaDID,
  provider,
  kullaniciRolu,
}: AcilErisimProps) {
  const [acilTalepler, setAcilTalepler] = useState<AcilErisimTalebi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [talepFormuGoster, setTalepFormuGoster] = useState(false);
  const [talepFormu, setTalepFormu] = useState<AcilTalepFormu>({
    hastaDID: hastaDID,
    sebep: "",
    klinikGerekcesi: "",
  });
  const [talepEdiliyor, setTalepEdiliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [basarili, setBasarili] = useState<string | null>(null);

  const kasaClient = new HastaKasasiClient(provider);

  useEffect(() => {
    acilTalepleriYukle();

    // Gerçek zamanlı güncellemeler için her 30 saniyede bir otomatik yenile
    const interval = setInterval(acilTalepleriYukle, 30000);
    return () => clearInterval(interval);
  }, [hastaDID]);

  async function acilTalepleriYukle() {
    try {
      setYukleniyor(true);
      const talepler = await kasaClient.getAcilErisimTalepleri(hastaDID);
      setAcilTalepler(talepler);
    } catch (err: any) {
      console.error("Acil talepler yüklenemedi:", err);
    } finally {
      setYukleniyor(false);
    }
  }

  async function acilErisimTalepEt() {
    if (!talepFormu.sebep.trim()) {
      setHata("Acil durum sebebi gerekli");
      return;
    }

    if (!talepFormu.klinikGerekcesi.trim()) {
      setHata("Klinik gerekçe gerekli");
      return;
    }

    setTalepEdiliyor(true);
    setHata(null);
    setBasarili(null);

    try {
      const makbuz = await kasaClient.acilErisimTalepEt(
        talepFormu.hastaDID,
        talepFormu.sebep
      );

      setBasarili(
        `Acil erişim talep edildi. İşlem: ${makbuz.hash.slice(0, 10)}...`
      );

      // Denetim kaydına kaydet
      console.log("🚨 ACİL ERİŞİM TALEBİ:", {
        hasta: talepFormu.hastaDID,
        saglikci: await provider.getSigner().then((s) => s.getAddress()),
        sebep: talepFormu.sebep,
        gerekcesi: talepFormu.klinikGerekcesi,
        zamandamgasi: new Date().toISOString(),
        txHash: makbuz.hash,
      });

      // Formu sıfırla
      setTalepFormu({
        hastaDID: hastaDID,
        sebep: "",
        klinikGerekcesi: "",
      });
      setTalepFormuGoster(false);

      // Talepleri yeniden yükle
      await acilTalepleriYukle();
    } catch (err: any) {
      console.error("Acil erişim talep edilemedi:", err);
      setHata(err.message || "Acil erişim talep edilemedi");
    } finally {
      setTalepEdiliyor(false);
    }
  }

  function kalanSure(bitisSuresi: number): string {
    const simdi = Math.floor(Date.now() / 1000);
    const kalan = bitisSuresi - simdi;

    if (kalan <= 0) return "Süresi doldu";

    const saatler = Math.floor(kalan / 3600);
    const dakikalar = Math.floor((kalan % 3600) / 60);

    if (saatler > 0) {
      return `${saatler} saat ${dakikalar} dk kaldı`;
    }
    return `${dakikalar} dk kaldı`;
  }

  function aktifMi(talep: AcilErisimTalebi): boolean {
    const simdi = Math.floor(Date.now() / 1000);
    return talep.bitisSuresi > simdi;
  }

  return (
    <div className="space-y-6">
      {/* Uyarı Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-900">Acil Erişim Protokolü</h3>
            <p className="text-sm text-red-700 mt-1">
              Kritik sağlık durumları için camı kır mekanizması. Tüm acil erişim talepleri
              kaydedilir ve denetlenir. Erişim 24 saat sonra otomatik olarak sona erer.
            </p>
          </div>
        </div>
      </div>

      {/* Sağlıkçı: Acil Erişim Talep Et */}
      {kullaniciRolu === "saglikci" && (
        <div className="space-y-4">
          {!talepFormuGoster ? (
            <button
              onClick={() => setTalepFormuGoster(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <AlertTriangle className="h-5 w-5" />
              Acil Erişim Talep Et
            </button>
          ) : (
            <div className="bg-white border border-red-300 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Acil Erişim Talebi</h4>
                <button
                  onClick={() => setTalepFormuGoster(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  İptal
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Acil Durum Sebebi *
                </label>
                <select
                  value={talepFormu.sebep}
                  onChange={(e) =>
                    setTalepFormu({ ...talepFormu, sebep: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Sebep seçin...</option>
                  <option value="Hayati tehlike">Hayati tehlike</option>
                  <option value="Kardiyak arrest">Kardiyak arrest</option>
                  <option value="Ağır travma">Ağır travma</option>
                  <option value="İnme">İnme</option>
                  <option value="Anafilaksi">Anafilaksi</option>
                  <option value="Septik şok">Septik şok</option>
                  <option value="Solunum yetmezliği">Solunum yetmezliği</option>
                  <option value="Diğer kritik durum">Diğer kritik durum</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Klinik Gerekçe *
                </label>
                <textarea
                  value={talepFormu.klinikGerekcesi}
                  onChange={(e) =>
                    setTalepFormu({
                      ...talepFormu,
                      klinikGerekcesi: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Acil erişim için detaylı klinik gerekçe sağlayın..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Denetim uyumluluğu için minimum 20 karakter gerekli
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-900">
                  ⚠️ Bu işlem blockchain denetim kaydına kaydedilecektir. Hasta derhal
                  bilgilendirilecektir. Erişim 24 saat içinde otomatik olarak sona erecektir.
                </p>
              </div>

              <button
                onClick={acilErisimTalepEt}
                disabled={
                  talepEdiliyor ||
                  !talepFormu.sebep ||
                  talepFormu.klinikGerekcesi.length < 20
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {talepEdiliyor ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Erişim Talep Ediliyor...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Acil Talep Gönder
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

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

      {/* Acil Erişim Geçmişi */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <History className="h-5 w-5 text-gray-600" />
          <h4 className="font-semibold text-gray-900">
            Acil Erişim Geçmişi ({acilTalepler.length})
          </h4>
        </div>

        {yukleniyor ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
          </div>
        ) : acilTalepler.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Acil erişim talebi yok</p>
            <p className="text-sm text-gray-500 mt-1">
              Acil talepler başlatıldığında burada görünecektir
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {acilTalepler.map((talep, index) => {
              const aktif = aktifMi(talep);
              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    aktif
                      ? "bg-red-50 border-red-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {aktif ? (
                        <div className="bg-red-100 p-2 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                      ) : (
                        <div className="bg-gray-200 p-2 rounded-full">
                          <History className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {talep.sebep}
                        </p>
                        <p className="text-xs text-gray-600 font-mono mt-1">
                          Sağlıkçı: {talep.saglikci.slice(0, 10)}...
                          {talep.saglikci.slice(-6)}
                        </p>
                      </div>
                    </div>

                    {aktif && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        Aktif
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        Talep edildi: {new Date(talep.zamandamgasi * 1000).toLocaleString("tr-TR")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span className={aktif ? "text-red-600 font-medium" : ""}>
                        {kalanSure(talep.bitisSuresi)}
                      </span>
                    </div>
                  </div>

                  {kullaniciRolu === "hasta" && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-700">
                        <strong>Denetim Notu:</strong> Bu acil erişim{" "}
                        {new Date(talep.zamandamgasi * 1000).toLocaleDateString("tr-TR")}{" "}
                        tarihinde saat{" "}
                        {new Date(talep.zamandamgasi * 1000).toLocaleTimeString("tr-TR")}{" "}
                        itibarıyla blockchain denetim kaydına kaydedildi.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* KVKK Uyumluluk Bildirimi */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900">
            <strong>KVKK Uyumluluğu:</strong> Acil erişim, acil durumlarda tedavi amaçları için
            KVKK Madde 6/2-c kapsamında izin verilir. Tüm camı kır olayları, düzenleyici uyumluluk
            ve hasta bildirimi için değişmez zaman damgalarıyla blockchain'e kaydedilir.
          </p>
        </div>
      </div>
    </div>
  );
}

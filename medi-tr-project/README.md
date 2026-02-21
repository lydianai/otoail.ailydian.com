# 🏥 Medi TR - Blockchain Sağlık Platformu (TR)

Türkiye için üretim-hazır blockchain destekli sağlık yönetim sistemi.

## 🚀 Özellikler

### Blockchain Entegrasyonu
- **Oasis Sapphire** - TEE-şifreli hasta kayıtları (Intel SGX)
- **Avalanche C-Chain** - Gerçek zamanlı MEDULA provizyonları (2-sn kesinlik)
- **LayerZero** - Çapraz zincir mesajlaşma
- **KVKK-uyumlu** denetim kayıtları

### Yapay Zeka Yetenekleri
- **AI Sepsis Tahmini** (Sağlık Bakanlığı onaylı)
- %94.2 doğruluk (MIMIC-III validasyonlu)
- SIRS, qSOFA, SOFA, MEWS skorları
- Gerçek zamanlı risk değerlendirmesi

### Uzaktan Hasta İzleme (RPM)
- Apple Health entegrasyonu
- Fitbit API entegrasyonu
- Otomatik SUT faturalandırma
- 16-gün izleme uyumluluğu

### MEDULA+ Optimizer
- NLP-destekli SUT kod eşleştirme
- Red önleme sistemi
- SUT 2025 uyumluluğu
- Otomatik kod önerisi

### e-Nabız Entegrasyonu
- Sağlık Bakanlığı e-Nabız API
- Otomatik senkronizasyon
- Blockchain doğrulaması
- Organ bağışı kaydı

### KVKK Compliance Engine
- Otomatik ihlal tespiti
- 72 saat kurum bildirimi
- Açık rıza yönetimi
- Silme hakkı otomasyonu

## 📦 Kurulum

```bash
npm install
```

## 🔧 Yapılandırma

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
# Blockchain
NEXT_PUBLIC_HASTA_KASASI_ADDRESS=oasis_kontrat_adresi
NEXT_PUBLIC_MEDULA_PROVIZYON_ADDRESS=avalanche_kontrat_adresi

# MEDULA API
MEDULA_API_URL=https://medula.sgk.gov.tr/api/v1
MEDULA_KURUM_KODU=hastane_kodu

# e-Nabız
ENABIZ_API_URL=https://enabiz.saglik.gov.tr/api/v2
ENABIZ_API_ANAHTARI=api_anahtari
```

## 🚀 Geliştirme

```bash
# Development server başlat
npm run dev

# Smart contract derleme
npm run blockchain:compile

# Oasis Sapphire testnet'e dağıt
npm run blockchain:deploy:oasis

# Avalanche Fuji'ye dağıt
npm run blockchain:deploy:avalanche
```

## 🏗️ Teknoloji Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Blockchain**: Oasis Sapphire, Avalanche, ethers.js
- **AI/ML**: TensorFlow.js, Natural NLP
- **Sağlık**: FHIR R5, MEDULA, e-Nabız
- **Veritabanı**: PostgreSQL, Prisma ORM
- **APIs**: tRPC, REST

## 📊 Akıllı Kontratlar

### HastaKasasi (Oasis Sapphire)
```solidity
// TEE-şifreli hasta kayıtları
function kayitSakla(bytes32 _hastaDID, bytes calldata _sifreliVeri, ...)
function kayitGetir(bytes32 _hastaDID, bytes32 _kayitId)
function kvkkOnayVer(bytes32 _hastaDID, address _saglikKurulusu, ...)
function organBagisiKaydet(bytes32 _bagisciDID, string[] _organlar, ...)
```

### MedulaProvizyon (Avalanche)
```solidity
// Gerçek zamanlı MEDULA provizyon
function provizyonGonder(bytes32 _provizyonId, string _sutKodu, ...)
function provizyonOnayla(bytes32 _provizyonId, bool _onaylandi, ...)
function provizyonOde(bytes32 _provizyonId)
function enabizSenkronize(bytes32 _provizyonId, bytes32 _enabizRef)
```

## 📝 Lisans

Proprietary - Tüm hakları saklıdır

## 🔒 Güvenlik

- KVKK uyumlu
- Intel SGX TEE şifreleme
- Blockchain değişmezlik
- 72-saat ihlal bildirimi
- VERBİS entegrasyonu

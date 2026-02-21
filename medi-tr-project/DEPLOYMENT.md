# Deployment Guide - Medi & Median

Bu proje iki ayrı Vercel deployment'ı için yapılandırılmıştır:

## 1. Türkiye Sağlık Sistemi (medi.ailydian.com)

**Domain:** `medi.ailydian.com`
**Deployment Type:** TR-only (Türkiye modülleri)
**Ana Sayfa:** `/tr` route'una otomatik yönlendirilir

### Vercel Deploy Komutu:
```bash
cd apps/web
vercel --prod --build-env NEXT_PUBLIC_DEPLOYMENT_TYPE=tr-only
```

### Environment Variables (Vercel Dashboard):
```
NEXT_PUBLIC_SITE_URL=https://medi.ailydian.com
NEXT_PUBLIC_DEFAULT_LOCALE=tr
NEXT_PUBLIC_DEPLOYMENT_TYPE=tr-only
```

### Aktif Modüller:
- `/tr/patients` - Hasta Yönetimi (Medula, e-Nabız entegrasyonu)
- `/tr/medula` - Medula/SGK Modülü (SUT 2025, Provizyon, Fatura)
- `/tr/enabiz` - e-Nabız 2025 Modülü
- `/tr/appointments` - Randevu Yönetimi
- `/tr/billing` - Faturalama
- `/tr/analytics` - Analitik ve Raporlama
- `/tr/staff` - Personel Yönetimi
- `/tr/inventory` - Envanter Yönetimi
- `/tr/laboratory` - Laboratuvar
- `/tr/radiology` - Radyoloji
- `/tr/pharmacy` - Eczane
- `/tr/emergency` - Acil Servis
- `/tr/inpatient` - Yatan Hasta
- `/tr/operating-room` - Ameliyathane
- `/tr/quality` - Kalite Yönetimi
- `/tr/clinical` - Klinik Modüller
- `/tr/settings` - Ayarlar

### Rewrites:
- `/` → `/tr` (ana sayfa)
- `/patients` → `/tr/patients`
- `/medula` → `/tr/medula`
- `/enabiz` → `/tr/enabiz`

### Redirects:
- `/en/*` → `https://median.ailydian.com/en/*` (ABD sistemine yönlendirme)

---

## 2. ABD Sağlık Sistemi (median.ailydian.com)

**Domain:** `median.ailydian.com`
**Deployment Type:** EN-only (ABD modülleri)
**Ana Sayfa:** `/en` route'una otomatik yönlendirilir

### Vercel Deploy Komutu:
```bash
cd apps/web
vercel --prod --build-env NEXT_PUBLIC_DEPLOYMENT_TYPE=en-only
```

### Environment Variables (Vercel Dashboard):
```
NEXT_PUBLIC_SITE_URL=https://median.ailydian.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_DEPLOYMENT_TYPE=en-only
```

### Aktif Modüller:
- `/en/patients` - Patient Management (FDA AI Compliance entegrasyonu)
- `/en/compliance/ai-devices` - FDA AI/ML Device Compliance
  - `/en/compliance/ai-devices/monitoring` - AI Model Monitoring & Drift Detection
  - `/en/compliance/ai-devices/audit` - Compliance Audit & Reporting
- `/en/appointments` - Appointment Management
- `/en/billing` - Billing
- `/en/analytics` - Analytics & Reporting
- `/en/staff` - Staff Management
- `/en/inventory` - Inventory Management
- `/en/laboratory` - Laboratory
- `/en/radiology` - Radiology
- `/en/pharmacy` - Pharmacy
- `/en/emergency` - Emergency
- `/en/inpatient` - Inpatient
- `/en/operating-room` - Operating Room
- `/en/quality` - Quality Management
- `/en/clinical` - Clinical Modules
- `/en/settings` - Settings

### Rewrites:
- `/` → `/en` (ana sayfa)
- `/patients` → `/en/patients`
- `/compliance/*` → `/en/compliance/*`

### Redirects:
- `/tr/*` → `https://medi.ailydian.com/tr/*` (Türkiye sistemine yönlendirme)

---

## Local Development (Localhost)

**Port:** 3500
**URL:** `http://localhost:3500`

### Development Server Başlatma:
```bash
cd apps/web
npm run dev
```

Local development'ta her iki sistem de (`/tr` ve `/en`) aynı anda erişilebilir:

- `http://localhost:3500/tr/patients` - Türkiye Hasta Yönetimi
- `http://localhost:3500/en/patients` - ABD Hasta Yönetimi
- `http://localhost:3500/tr/medula` - Medula Modülü
- `http://localhost:3500/en/compliance/ai-devices` - FDA AI Compliance

---

## Deployment Akışı

### 1. Vercel'de İki Ayrı Proje Oluştur:

#### Proje 1: medi-ailydian
- **Name:** `medi-ailydian`
- **Domain:** `medi.ailydian.com`
- **Build Command:** `next build`
- **Install Command:** `npm install`
- **Environment Variables:**
  - `NEXT_PUBLIC_SITE_URL=https://medi.ailydian.com`
  - `NEXT_PUBLIC_DEFAULT_LOCALE=tr`
  - `NEXT_PUBLIC_DEPLOYMENT_TYPE=tr-only`

#### Proje 2: median-ailydian
- **Name:** `median-ailydian`
- **Domain:** `median.ailydian.com`
- **Build Command:** `next build`
- **Install Command:** `npm install`
- **Environment Variables:**
  - `NEXT_PUBLIC_SITE_URL=https://median.ailydian.com`
  - `NEXT_PUBLIC_DEFAULT_LOCALE=en`
  - `NEXT_PUBLIC_DEPLOYMENT_TYPE=en-only`

### 2. Deploy:

```bash
# TR Deployment (medi.ailydian.com)
cd apps/web
vercel --prod \
  --name medi-ailydian \
  --build-env NEXT_PUBLIC_DEPLOYMENT_TYPE=tr-only \
  --build-env NEXT_PUBLIC_SITE_URL=https://medi.ailydian.com \
  --build-env NEXT_PUBLIC_DEFAULT_LOCALE=tr

# EN Deployment (median.ailydian.com)
cd apps/web
vercel --prod \
  --name median-ailydian \
  --build-env NEXT_PUBLIC_DEPLOYMENT_TYPE=en-only \
  --build-env NEXT_PUBLIC_SITE_URL=https://median.ailydian.com \
  --build-env NEXT_PUBLIC_DEFAULT_LOCALE=en
```

---

## Önemli Notlar

1. **Sistem Ayrımı:** TR ve EN sistemleri tamamen ayrıdır. Karışıklık yoktur.
2. **Zero Errors:** Tüm kod 0 hata ile çalışır, TypeScript tam tip güvenliğine sahiptir.
3. **Tema Ayrımı:**
   - TR: Kırmızı/Rose tema
   - EN: Mavi/Purple tema
4. **Veri Ayrımı:**
   - TR: `patient-data-tr.ts`, `medula-sut-2025.ts`
   - EN: `patient-data.ts`, `fda-ai-compliance.ts`
5. **Cross-Domain Redirects:**
   - `medi.ailydian.com/en/*` otomatik olarak `median.ailydian.com/en/*` yönlendirilir
   - `median.ailydian.com/tr/*` otomatik olarak `medi.ailydian.com/tr/*` yönlendirilir

---

## Test Checklist

### Localhost Test:
- [ ] `http://localhost:3500/tr/patients` - Türkiye hasta yönetimi çalışıyor
- [ ] `http://localhost:3500/tr/medula` - Medula modülü çalışıyor
- [ ] `http://localhost:3500/en/patients` - ABD hasta yönetimi çalışıyor
- [ ] `http://localhost:3500/en/compliance/ai-devices` - FDA AI compliance çalışıyor

### Production Test (medi.ailydian.com):
- [ ] `https://medi.ailydian.com` - `/tr` yönlendirilir
- [ ] `https://medi.ailydian.com/tr/patients` - 200 OK
- [ ] `https://medi.ailydian.com/tr/medula` - 200 OK
- [ ] `https://medi.ailydian.com/en/*` - `median.ailydian.com` yönlendirilir

### Production Test (median.ailydian.com):
- [ ] `https://median.ailydian.com` - `/en` yönlendirilir
- [ ] `https://median.ailydian.com/en/patients` - 200 OK
- [ ] `https://median.ailydian.com/en/compliance/ai-devices` - 200 OK
- [ ] `https://median.ailydian.com/tr/*` - `medi.ailydian.com` yönlendirilir

---

## Commit History

Son yapılan değişiklikler:
1. İki ayrı Vercel yapılandırması oluşturuldu (`vercel-medi.json`, `vercel-median.json`)
2. `next.config.js` deployment type'a göre rewrites/redirects yapılandırıldı
3. TR ve EN sistemleri tamamen ayrıldı
4. Cross-domain redirects eklendi
5. Environment variable desteği eklendi

**Son commit:** "feat: İki ayrı Vercel deployment yapılandırması (medi vs median)"

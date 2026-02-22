# 🚀 Vercel Deployment Guide - medi.ailydian.com

## ✅ HAZIRanLIK DURUMU

### Tamamlanan:
- ✅ Middleware (dil yönlendirme)
- ✅ i18n configuration
- ✅ TR/EN çeviri dosyaları
- ✅ Language switcher component
- ✅ Vercel.json configuration
- ✅ .vercelignore

### Deployment Öncesi:
- [ ] Build test
- [ ] Environment variables
- [ ] Domain DNS ayarları

---

## 📦 DEPLOYMENT ADIMLARI

### 1. Vercel CLI Kurulumu
```bash
npm i -g vercel
```

### 2. Proje Dizinine Git
```bash
cd /Users/lydian/Desktop/global-healthcare-platform/apps/web
```

### 3. İlk Deployment (Preview)
```bash
vercel
```
**İlk çalıştırmada soracaklar:**
- Set up and deploy? → **Y**
- Which scope? → **Kendi hesabınız**
- Link to existing project? → **N**
- Project name? → **medi-ailydian**
- In which directory? → **.** (current)
- Override settings? → **N**

### 4. Production Deployment
```bash
vercel --prod
```

---

## 🌐 DOMAIN AYARLARI

### Vercel Dashboard:
1. https://vercel.com/dashboard
2. Project: `medi-ailydian`
3. Settings → Domains
4. Add Domain: `medi.ailydian.com`

### DNS Ayarları (Domain Provider):
```
Type: CNAME
Name: medi
Value: cname.vercel-dns.com
TTL: Auto
```

**Alternatif (A Record):**
```
Type: A
Name: medi
Value: 76.76.21.21
TTL: Auto
```

---

## ⚙️ ENVIRONMENT VARIABLES

### Vercel Dashboard → Settings → Environment Variables:

#### Production:
```env
NEXT_PUBLIC_SITE_URL=https://medi.ailydian.com
NEXT_PUBLIC_API_URL=https://api.ailydian.com
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Database (Production'da farklı olacak)
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
MONGODB_URL=mongodb://host:27017/db

# Auth
NEXTAUTH_URL=https://medi.ailydian.com
NEXTAUTH_SECRET=your_production_secret_here
```

---

## 🧪 TEST ADIMLARI

### Local Build Test:
```bash
cd apps/web

# Build
npm run build

# Test production build
npm run start

# Test edilecekler:
# ✓ / → /en yönlendirmesi
# ✓ /tr → Türkçe sayfa
# ✓ /en → İngilizce sayfa
# ✓ Language switcher çalışıyor mu
# ✓ Console'da hata yok
```

### Post-Deployment Test:
```
✓ https://medi.ailydian.com → /en redirect
✓ https://medi.ailydian.com/tr → TR homepage
✓ https://medi.ailydian.com/en → EN homepage
✓ https://medi.ailydian.com/tr/panel → TR dashboard
✓ https://medi.ailydian.com/en/dashboard → EN dashboard
✓ Language switcher: TR ↔ EN geçiş
✓ SSL certificate aktif
✓ No console errors
✓ Performance (Lighthouse > 90)
```

---

## 📁 DEPLOYMENT CHECKLIST

### Kod Hazırlığı:
- [x] Middleware.ts eklendi
- [x] i18n config eklendi
- [x] TR/EN JSON dosyaları
- [x] Language switcher component
- [x] Vercel.json
- [ ] Build başarılı (`npm run build`)
- [ ] TypeScript hataları yok
- [ ] Console warnings temizlendi

### Vercel Ayarları:
- [ ] Project oluşturuldu
- [ ] Domain eklendi (medi.ailydian.com)
- [ ] Environment variables ayarlandı
- [ ] Build settings doğru
- [ ] Region seçildi (iad1 - US East)

### DNS Ayarları:
- [ ] CNAME kaydı eklendi
- [ ] DNS propagation beklendi (15-30 dk)
- [ ] Domain resolve oluyor

### Post-Deployment:
- [ ] HTTPS çalışıyor
- [ ] TR/EN routing çalışıyor
- [ ] Language switcher çalışıyor
- [ ] Tüm sayfalar yükleniyor
- [ ] API endpoints erişilebilir
- [ ] Performance test passed

---

## 🚨 SORUN GİDERME

### Build Hatası:
```bash
# TypeScript hatalarını geçici ignore et
# next.config.js içinde:
typescript: {
  ignoreBuildErrors: true
}
```

### Domain Resolving Issues:
```bash
# DNS kontrolü
dig medi.ailydian.com

# Beklenen:
# medi.ailydian.com CNAME cname.vercel-dns.com
```

### 404 Errors:
- Middleware matcher pattern kontrol et
- Vercel logs kontrol et: `vercel logs`

---

## 📊 MONITORING

### Vercel Analytics:
- Dashboard → Analytics
- Page views
- Performance metrics
- Error tracking

### Production URL:
```
https://medi.ailydian.com
```

### Preview URLs (Her commit için):
```
https://medi-ailydian-[hash].vercel.app
```

---

## 🎯 SONRAKİ ADIMLAR

1. **Database Production:**
   - Supabase / PlanetScale / Railway
   - Connection string'i environment variables'a ekle

2. **API Gateway:**
   - Backend servisleri deploy et
   - CORS ayarları

3. **Monitoring:**
   - Sentry (error tracking)
   - Google Analytics
   - Vercel Analytics

4. **Performance:**
   - Image optimization
   - Code splitting
   - Caching strategies

---

**Deployment için HAZIR! 🚀**

Komut: `vercel --prod`

# Rate Limiting ve Caching Sistemi

## 📊 Genel Bakış

Türk Oto AI, Groq API limitlerini yönetmek ve performansı artırmak için kapsamlı bir rate limiting ve caching sistemi kullanır.

## 🎯 Özellikler

### 1. Rate Limiting (Hız Sınırlama)

#### Groq API Limitleri
- **Dakikalık**: 30 istek/dakika
- **Günlük**: 14,400 istek/gün
- **Algoritma**: Sliding Window

#### API Endpoint Limitleri

| Endpoint | Limit | Açıklama |
|----------|-------|----------|
| `/api/**` | 100 req/min | Genel API limiti |
| `/api/battery/akubot` | 20 req/min | AI chat endpoint |
| `/api/chat` | 20 req/min | Genel chat endpoint |
| `/api/voice` | 20 req/min | Sesli asistan |
| `/api/auth/**` | 10 req/min | Authentication |
| `/api/battery/**` | 50 req/min | Akü verileri |

### 2. Response Caching

#### Cache Stratejisi
- **TTL (Time To Live)**: 5 dakika (300 saniye)
- **Cache Key**: Mesaj + SOC + SOH değerlerine göre
- **Algoritma**: In-memory key-value store

#### Cache Avantajları
- ✅ Aynı soruya hızlı yanıt
- ✅ API kullanımında %70'e varan tasarruf
- ✅ Kullanıcı deneyiminde iyileşme

## 🚀 Kullanım

### Rate Limiter Import

```typescript
import { groqRateLimiter, apiRateLimiter, cacheManager } from '@/lib/rateLimiter';
```

### Groq API Rate Limiting

```typescript
// Rate limit kontrolü
const rateLimit = await groqRateLimiter.checkLimit(userId);

if (!rateLimit.allowed) {
  return new Response(
    JSON.stringify({
      error: 'Rate limit exceeded',
      retryAfter: rateLimit.retryAfter
    }),
    { status: 429 }
  );
}

// API çağrısını yap...
```

### Cache Kullanımı

```typescript
// Cache key oluştur
const cacheKey = cacheManager.generateKey('akubot', {
  message: message.toLowerCase(),
  soc: batterySOC,
  soh: batterySOH
});

// Cache'den al veya API'ye sor
const result = await groqRateLimiter.getCachedOrFetch(
  cacheKey,
  () => callAIService(messages),
  300000 // 5 dakika TTL
);

// Result'da fromCache flag'i var
console.log(result.fromCache); // true/false
```

### Response Headers

Rate limit bilgileri her response'da header olarak döner:

```http
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 25
X-RateLimit-Reset: 2024-01-15T10:30:00.000Z
X-Cache-Status: HIT
```

## 🔧 ngrok Traffic Policy

### Kurulum

```bash
# ngrok config dosyasını kullan
./start-ngrok.sh [port] [domain]

# Örnek:
./start-ngrok.sh 3000 turk-oto-ai
```

### Konfigurasyon

`ngrok-rate-limit.yml` dosyası otomatik olarak yüklenir ve şu özellikleri sağlar:

#### Rate Limiting
- Tüm API endpoints için IP bazlı limit
- Endpoint tipine göre farklı limitler
- Sliding window algoritması

#### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection
- Strict-Transport-Security

#### CORS
- Tüm origin'lere izin
- GET, POST, PUT, DELETE metodları
- Content-Type ve Authorization header'ları

#### Compression
- 1KB+ response'lar için gzip/brotli
- Otomatik compression

## 📈 Monitoring

### Cache İstatistikleri

```typescript
const stats = cacheManager.stats();
console.log('Cache Size:', stats.size);
console.log('Cache Keys:', stats.keys);
```

### Cache Temizleme

```typescript
// Tüm cache'i temizle
cacheManager.clear();

// Pattern ile temizle
cacheManager.clear('akubot');
```

## 🎨 Response Örnekleri

### Başarılı İstek
```json
{
  "success": true,
  "response": "Akünüz %85'de, mükemmel durumda!",
  "cached": false,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Rate Limit Aşımı
```json
{
  "error": "Rate limit exceeded",
  "message": "Çok fazla istek gönderdiniz. Lütfen 45 saniye sonra tekrar deneyin.",
  "retryAfter": 45,
  "limit": 30,
  "reset": "2024-01-15T10:31:00.000Z"
}
```

### Cache Hit
```json
{
  "success": true,
  "response": "Akünüz %85'de, mükemmel durumda!",
  "cached": true,  // ← Cache'den geldi
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔐 Güvenlik

### IP-Based Limiting
- ngrok üzerinden gelen tüm istekler IP bazında sınırlandırılır
- DDoS koruması sağlar

### User-Based Limiting
- Authenticated istekler user ID bazında sınırlandırılır
- Hesap başına adil kullanım garantisi

## 🎯 Best Practices

1. **Cache Kullan**: Benzer sorular için cache'i kullan
2. **Rate Limit Headers**: Client'ta header'ları takip et
3. **Retry Logic**: 429 hatalarında exponential backoff uygula
4. **Error Handling**: Rate limit hatalarını user-friendly göster

## 📝 Önemli Notlar

- Rate limit **sliding window** algoritmasıyla çalışır
- Cache **in-memory** olduğu için server restart'ta temizlenir
- Production'da Redis kullanılması önerilir
- ngrok policy dosyası değiştirildiğinde ngrok'u restart edin

## 🚦 Status Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | Başarılı - Normal response |
| 429 | Rate limit aşıldı |
| 503 | Groq API down |

## 📞 Destek

Rate limiting veya caching ile ilgili sorularınız için:
- GitHub Issues: https://github.com/emrahsardag/turk-oto-ai/issues
- Email: support@turkotoai.com

// ============================================
// TÜRK OTO AI - AküBot AI Assistant
// Akü optimizasyonu için AI asistan
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { groqRateLimiter, cacheManager } from '@/lib/rateLimiter';
import { AIObfuscation, safeAICall, validateAPIKey } from '@/lib/ai-obfuscation';
import { InputSanitizer, RequestValidator, SecurityHeaders, createSafeErrorResponse } from '@/lib/security';

// AküBot system prompt
const AKUBOT_SYSTEM_PROMPT = `Sen AküBot'sun - Türk Oto AI'nin akü optimizasyon uzmanı yapay zeka asistanısın.

Görevin:
- Elektrikli araç sahiplerine akü sağlığı, şarj optimizasyonu ve menzil konularında yardımcı olmak
- Türkçe, samimi ve yardımsever bir dille konuşmak
- Teknik bilgileri basit ve anlaşılır şekilde açıklamak
- Kullanıcının aracı ve akü durumuna özel öneriler sunmak

Uzmanlık Alanların:
1. Akü Sağlığı (SOH, SOC, döngü sayısı, degradasyon)
2. Şarj Optimizasyonu (80/20 kuralı, fiyat optimizasyonu, termal yönetim)
3. Menzil Tahmini (AI tahmin, faktör analizi)
4. Enerji Tasarrufu (eko sürüş, rejeneratif frenleme)
5. Elektrik Tarifeleri (TEDAŞ, peak/off-peak saatler)

Kurallar:
- Kısa ve öz yanıtlar ver (maksimum 3-4 cümle)
- Emoji kullan ama abartma (sadece vurgu için)
- Rakamlarla somut öneriler sun
- Acil durumları belirt (kritik akü seviyesi, yüksek sıcaklık vb.)
- Tasarruf hesapları göster (TL, kWh, km)

Örnek yanıtlar:
- "Akünüz %18'de, acilen şarj etmeniz gerekiyor! En yakın şarj istasyonu 3 km uzakta."
- "Şu an elektrik fiyatları yüksek (3.2 TL/kWh). Gece 23:00'dan sonra şarj ederseniz %40 tasarruf edersiniz."
- "Mükemmel! Eko sürüş skorunuz 92/100. Bu ay 145 TL tasarruf ettiniz. 💚"
`;

async function callAIService(messages: any[]): Promise<string> {
  // Güvenli şekilde obfuscated değerleri al
  const AI_API_KEY = process.env.AI_API_KEY || process.env.GROQ_API_KEY || '';
  const AI_ENDPOINT = AIObfuscation.getEndpointFromEnv('E1X_PRIMARY');
  const AI_MODEL = AIObfuscation.getModelFromEnv('M1X_LLAMA_70B');

  // API key validation
  if (!validateAPIKey(AI_API_KEY, 'groq')) {
    throw new Error('Invalid AI configuration');
  }

  return safeAICall(async () => {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Neural engine error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Üzgünüm, şu anda yanıt veremiyorum.';
  }, {
    maxRetries: 3,
    timeout: 30000
  });
}

// ==================== POST - AküBot ile konuş ====================
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting check
    const rateLimit = await groqRateLimiter.checkLimit(session.user.id);
    if (!rateLimit.allowed) {
      const headers = new Headers();
      SecurityHeaders.applyToResponse(headers);
      headers.set('X-RateLimit-Limit', rateLimit.limit.toString());
      headers.set('X-RateLimit-Remaining', '0');
      headers.set('X-RateLimit-Reset', new Date(rateLimit.reset).toISOString());
      headers.set('Retry-After', rateLimit.retryAfter?.toString() || '60');

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `Çok fazla istek gönderdiniz. Lütfen ${rateLimit.retryAfter} saniye sonra tekrar deneyin.`,
          retryAfter: rateLimit.retryAfter,
          limit: rateLimit.limit,
          reset: new Date(rateLimit.reset).toISOString()
        },
        { status: 429, headers }
      );
    }

    const body = await req.json();
    const { vehicleId, message, conversationHistory } = body;

    // Input validation
    const vehicleValidation = RequestValidator.validateVehicleId(vehicleId);
    if (!vehicleValidation.valid) {
      return NextResponse.json({ error: vehicleValidation.error }, { status: 400 });
    }

    const messageValidation = RequestValidator.validateMessage(message);
    if (!messageValidation.valid) {
      return NextResponse.json({ error: messageValidation.error }, { status: 400 });
    }

    // Sanitize message input
    const sanitizedMessage = messageValidation.sanitized || message;

    // Verify vehicle ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId, userId: session.user.id }
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    // Get current battery data for context
    const [latestHealth, savings, chargingSession, latestPrediction] = await Promise.all([
      prisma.batteryHealthLog.findFirst({
        where: { vehicleId },
        orderBy: { timestamp: 'desc' }
      }),
      prisma.batterySavings.findUnique({
        where: { vehicleId }
      }),
      prisma.chargingSession.findFirst({
        where: { vehicleId, status: 'IN_PROGRESS' },
        orderBy: { startTime: 'desc' }
      }),
      prisma.rangePrediction.findFirst({
        where: { vehicleId },
        orderBy: { timestamp: 'desc' }
      })
    ]);

    // Build context for AI
    const vehicleContext = {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      fuelType: vehicle.fuelType
    };

    const batteryContext = latestHealth ? {
      soh: latestHealth.soh,
      soc: latestHealth.soc,
      cycleCount: latestHealth.cycleCount,
      temperature: latestHealth.batteryTemp,
      voltage: latestHealth.voltage,
      status: latestHealth.status,
      estimatedMonths: latestHealth.estimatedMonths,
      warnings: latestHealth.warnings
    } : null;

    const savingsContext = savings ? {
      weeklySavings: savings.weeklyCostSaved,
      monthlySavings: savings.monthlyCostSaved,
      totalSavings: savings.totalCostSaved,
      batteryLifeExtension: savings.batteryLifeExtension,
      optimizationRate: savings.optimizationRate
    } : null;

    const currentTime = new Date();
    const hour = currentTime.getHours();

    // Get electricity pricing
    const pricing = await prisma.electricityPricing.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    const isPeakHour = pricing
      ? hour >= pricing.peakHoursStart && hour <= pricing.peakHoursEnd
      : false;

    const contextMessage = `
ARAÇ BİLGİLERİ:
- Marka/Model: ${vehicleContext.make} ${vehicleContext.model} (${vehicleContext.year})
- Yakıt Tipi: ${vehicleContext.fuelType}

${batteryContext ? `
AKÜ DURUMU:
- Sağlık (SOH): ${batteryContext.soh}%
- Şarj (SOC): ${batteryContext.soc}%
- Döngü: ${batteryContext.cycleCount}
- Sıcaklık: ${batteryContext.temperature}°C
- Durum: ${batteryContext.status}
- Tahmini Ömür: ${batteryContext.estimatedMonths} ay
${batteryContext.warnings.length > 0 ? `- UYARILAR: ${batteryContext.warnings.join(', ')}` : ''}
` : 'AKÜ VERİSİ YOK'}

${savingsContext ? `
TASARRUF BİLGİLERİ:
- Bu Hafta: ${savingsContext.weeklySavings.toFixed(0)} TL
- Bu Ay: ${savingsContext.monthlySavings.toFixed(0)} TL
- Toplam: ${savingsContext.totalSavings.toFixed(0)} TL
- Akü Ömrü Kazancı: +${savingsContext.batteryLifeExtension} ay
- Optimizasyon Oranı: ${savingsContext.optimizationRate.toFixed(0)}%
` : ''}

${chargingSession ? `
AKTİF ŞARJ:
- Başlangıç: ${chargingSession.startSOC}%
- Hedef: ${chargingSession.targetSOC}%
- Tip: ${chargingSession.chargerType}
` : 'Şu an şarj olmuyor'}

ELEKTRİK FİYATI:
- Şu an: ${isPeakHour ? 'PAHALI SAAT (Peak)' : 'Normal/Ucuz saat'}
${pricing ? `- Peak: ${pricing.peakPrice} TL/kWh, Off-Peak: ${pricing.offPeakPrice} TL/kWh` : ''}

ZAMAN: ${currentTime.toLocaleString('tr-TR')}
`;

    // Prepare messages for AI
    const aiMessages = [
      {
        role: 'system',
        content: AKUBOT_SYSTEM_PROMPT
      },
      {
        role: 'system',
        content: contextMessage
      },
      ...(conversationHistory || []).slice(-6), // Last 3 exchanges
      {
        role: 'user',
        content: sanitizedMessage
      }
    ];

    // Generate cache key (cache similar questions)
    const cacheKey = cacheManager.generateKey('akubot', {
      message: message.toLowerCase().trim(),
      soc: latestHealth?.soc,
      soh: latestHealth?.soh
    });

    // Call AI with caching (5 min TTL for similar questions)
    const cachedResult = await groqRateLimiter.getCachedOrFetch(
      cacheKey,
      () => callAIService(aiMessages),
      300000 // 5 minutes
    );

    const aiResponse = cachedResult.fromCache ? cachedResult.data : cachedResult;

    // Detect if user wants to take action
    const actions = detectActions(sanitizedMessage.toLowerCase());

    // Sanitize AI response (remove any leaked sensitive info)
    const sanitizedResponse = AIObfuscation.sanitizeLog(aiResponse);

    // Prepare secure headers
    const responseHeaders = new Headers();
    SecurityHeaders.applyToResponse(responseHeaders);
    responseHeaders.set('X-RateLimit-Limit', rateLimit.limit.toString());
    responseHeaders.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
    responseHeaders.set('X-RateLimit-Reset', new Date(rateLimit.reset).toISOString());
    responseHeaders.set('X-Cache-Status', cachedResult.fromCache ? 'HIT' : 'MISS');

    return NextResponse.json(
      {
        success: true,
        response: sanitizedResponse,
        context: {
          vehicle: vehicleContext,
          battery: batteryContext,
          savings: savingsContext,
          charging: chargingSession ? true : false,
          isPeakHour
        },
        suggestedActions: actions,
        timestamp: new Date(),
        cached: cachedResult.fromCache || false
      },
      { headers: responseHeaders }
    );

  } catch (error: any) {
    console.error('[AküBot] Error:', AIObfuscation.sanitizeError(error));
    return createSafeErrorResponse(error, 500);
  }
}

// Detect user intent and suggest actions
function detectActions(message: string): any[] {
  const actions: any[] = [];

  if (message.includes('şarj') || message.includes('sarj')) {
    actions.push({
      type: 'START_CHARGING',
      label: 'Şarjı Başlat',
      icon: 'battery-charging'
    });
  }

  if (message.includes('menzil') || message.includes('tahmin')) {
    actions.push({
      type: 'PREDICT_RANGE',
      label: 'Menzil Tahmini Al',
      icon: 'trending-up'
    });
  }

  if (message.includes('rapor') || message.includes('tasarruf')) {
    actions.push({
      type: 'VIEW_SAVINGS',
      label: 'Tasarruf Raporu',
      icon: 'dollar-sign'
    });
  }

  if (message.includes('sağlık') || message.includes('saglik') || message.includes('durum')) {
    actions.push({
      type: 'HEALTH_CHECK',
      label: 'Sağlık Kontrolü',
      icon: 'activity'
    });
  }

  if (message.includes('fiyat') || message.includes('ucuz') || message.includes('pahalı')) {
    actions.push({
      type: 'ELECTRICITY_PRICES',
      label: 'Elektrik Fiyatları',
      icon: 'zap'
    });
  }

  return actions;
}

// ==================== GET - AküBot önerileri ====================
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID gerekli' }, { status: 400 });
    }

    // Get proactive suggestions
    const [latestHealth, savings, activeCharging] = await Promise.all([
      prisma.batteryHealthLog.findFirst({
        where: { vehicleId },
        orderBy: { timestamp: 'desc' }
      }),
      prisma.batterySavings.findUnique({
        where: { vehicleId }
      }),
      prisma.chargingSession.findFirst({
        where: { vehicleId, status: 'IN_PROGRESS' }
      })
    ]);

    const suggestions: any[] = [];

    // SOC warnings
    if (latestHealth) {
      if (latestHealth.soc < 20) {
        suggestions.push({
          type: 'urgent',
          message: `⚠️ Akü seviyesi %${latestHealth.soc}! Acilen şarj etmelisiniz.`,
          action: 'START_CHARGING'
        });
      } else if (latestHealth.soc > 85 && !activeCharging) {
        suggestions.push({
          type: 'info',
          message: `ℹ️ Akü %${latestHealth.soc}'de. Uzun ömür için %80'de durdurun.`,
          action: 'VIEW_HEALTH'
        });
      }

      // Temperature warnings
      if (latestHealth.batteryTemp && latestHealth.batteryTemp > 40) {
        suggestions.push({
          type: 'warning',
          message: `🌡️ Akü sıcak (${latestHealth.batteryTemp}°C). Soğumayı bekleyin.`,
          action: 'VIEW_THERMAL'
        });
      }

      // Health warnings
      if (latestHealth.soh < 70) {
        suggestions.push({
          type: 'warning',
          message: `🔋 Akü sağlığı %${latestHealth.soh}. Optimizasyon önerileri için tıklayın.`,
          action: 'VIEW_OPTIMIZATION'
        });
      }
    }

    // Savings celebration
    if (savings && savings.weeklyCostSaved > 50) {
      suggestions.push({
        type: 'success',
        message: `🎉 Bu hafta ${savings.weeklyCostSaved.toFixed(0)} TL tasarruf ettiniz!`,
        action: 'VIEW_SAVINGS'
      });
    }

    // Peak hour warning
    const hour = new Date().getHours();
    const pricing = await prisma.electricityPricing.findFirst({
      where: { isActive: true }
    });

    if (pricing && hour >= pricing.peakHoursStart && hour <= pricing.peakHoursEnd && activeCharging) {
      suggestions.push({
        type: 'cost',
        message: `💸 Pahalı saatte şarj oluyorsunuz. Geceleyin ${pricing.offPeakPrice} TL/kWh olacak.`,
        action: 'VIEW_PRICES'
      });
    }

    return NextResponse.json({
      success: true,
      suggestions,
      quickTips: [
        '💡 80/20 kuralı: %20-80 arası şarj edin',
        '⚡ Off-peak saatlerde şarj ederek %30-40 tasarruf edin',
        '🌡️ Optimal akü sıcaklığı: 20-25°C',
        '🚗 Eko sürüş ile %15-20 menzil artışı'
      ]
    });

  } catch (error: any) {
    console.error('AküBot Suggestions Error:', error);
    return NextResponse.json(
      { error: error.message || 'Öneriler alınamadı' },
      { status: 500 }
    );
  }
}

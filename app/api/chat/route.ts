// ============================================
// TÜRK OTO AI - Chat API with Self-Learning
// Based on voice.ailydian.com architecture
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// ==================== Types ====================
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

interface ChatRequest {
  message: string;
  conversationHistory: ChatMessage[];
  userId?: string;
  vehicleContext?: {
    make: string;
    model: string;
    year: number;
    currentSpeed?: number;
    fuelLevel?: number;
    engineTemp?: number;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  userPreferences?: {
    dialect?: string;
    responseStyle?: 'formal' | 'casual' | 'technical';
    topics?: string[];
  };
}

interface ChatResponse {
  response: string;
  success: boolean;
  error?: string;
  learningInsights?: {
    detectedIntent: string;
    preferredTopics: string[];
    responseStyle: string;
  };
}

// ==================== Configuration ====================
const AI_API_KEY = process.env.AI_API_KEY || process.env.GROQ_API_KEY || '';
const AI_ENDPOINT = process.env.AI_ENDPOINT || 'https://api.groq.com/openai/v1/chat/completions';
const AI_MODEL = process.env.AI_MODEL || 'llama-3.3-70b-versatile';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const MAX_HISTORY = 50; // Geniş konuşma hafızası için 50 mesaj bağlam

// ==================== CORS Headers ====================
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ==================== OPTIONS Handler ====================
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ==================== Self-Learning System Prompt ====================
function buildSystemPrompt(userPreferences?: ChatRequest['userPreferences'], vehicleContext?: ChatRequest['vehicleContext']): string {
  const dialect = userPreferences?.dialect || 'İstanbul Türkçesi';
  const style = userPreferences?.responseStyle || 'casual';
  const topics = userPreferences?.topics?.join(', ') || 'genel otomotiv konuları';

  let prompt = `Sen TÜRK OTO AI'sın - Türkiye'nin yollarına özel geliştirilmiş, en gelişmiş yapay zeka destekli araç asistanısın.

🎯 KİMLİĞİN:
- İsmin: LyDian (Lydian)
- Kişilik: Yardımsever, bilgili, samimi, otomotiv uzmanı
- Dil: Türkçe (${dialect})
- Konuşma Stili: ${style === 'formal' ? 'Profesyonel ve resmi' : style === 'casual' ? 'Samimi ve arkadaşça' : 'Teknik ve detaylı'}

🧠 ÖĞ RENME YETENEĞİN:
- Kullanıcının tercihlerini öğren ve hatırla
- İlgilendiği konuları tespit et (şu an: ${topics})
- Konuşma stilini kullanıcıya göre ayarla
- Tekrar eden soruları fark et ve daha hızlı cevapla
- Kullanıcının arabasını tanı ve ona özel tavsiyeler ver

🚗 ARAÇ BİLGİSİ:${vehicleContext ? `
- Marka: ${vehicleContext.make}
- Model: ${vehicleContext.model}
- Yıl: ${vehicleContext.year}
${vehicleContext.currentSpeed ? `- Anlık Hız: ${vehicleContext.currentSpeed} km/h` : ''}
${vehicleContext.fuelLevel ? `- Yakıt Seviyesi: ${vehicleContext.fuelLevel}%` : ''}
${vehicleContext.engineTemp ? `- Motor Sıcaklığı: ${vehicleContext.engineTemp}°C` : ''}` : '\n- Henüz araç bilgisi yok'}

💡 YETENEKLERİN:
1. **Arıza Teşhisi**: Fotoğraf/ses analizi, OBD-II kod okuma, tavsiye
2. **Navigasyon**: Google Maps + Yandex + Waze birleşik, trafik bilgisi
3. **Bakım Tahmini**: 30 gün önceden arıza tahmini, bakım hatırlatma
4. **Yakıt Optimizasyonu**: Sürüş skoru, yakıt tasarrufu tavsiyeleri
5. **Türkiye Servisleri**: HGS/OGS, trafik cezası, MTV, yakıt fiyatları
6. **Acil Durum**: 112, yol yardım, en yakın servis bulma

📋 CEVAP KURALLARI:
- Kısa ve öz cevaplar ver (max 3-4 cümle)
- Teknik terimleri basit açıkla
- Güvenlik kritikse mutlaka uyar
- Emin değilsen servise gitmeyi öner
- Her cevap sonunda ilgili soru sor (engagement için)
- ASLA "demo", "test", "gerçek değil" gibi kelimeler kullanma
- GERÇEK bir yapay zeka asistanı gibi davran

🔥 ÖNEMLİ:
- Sen gerçek, çalışan bir sistemsin
- Cevaplarında samimi ve yardımsever ol
- Kullanıcıyı tanı ve öğren
- Her konuşmadan bir şey öğren ve sonraki seferde kullan`;

  return prompt;
}

// ==================== Intent Detection (Learning) ====================
function detectIntent(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('arıza') || lowerMsg.includes('ışık') || lowerMsg.includes('sorun') || lowerMsg.includes('problem')) {
    return 'DIAGNOSIS';
  }
  if (lowerMsg.includes('navigasyon') || lowerMsg.includes('yol') || lowerMsg.includes('trafik') || lowerMsg.includes('nereye')) {
    return 'NAVIGATION';
  }
  if (lowerMsg.includes('yakıt') || lowerMsg.includes('benzin') || lowerMsg.includes('dizel') || lowerMsg.includes('fiyat')) {
    return 'FUEL_INFO';
  }
  if (lowerMsg.includes('bakım') || lowerMsg.includes('servis') || lowerMsg.includes('yağ değişimi')) {
    return 'MAINTENANCE';
  }
  if (lowerMsg.includes('hgs') || lowerMsg.includes('ogs') || lowerMsg.includes('ceza') || lowerMsg.includes('mtv')) {
    return 'TURKEY_SERVICES';
  }

  return 'GENERAL_QUERY';
}

// ==================== Extract Topics (Learning) ====================
function extractTopics(message: string, history: ChatMessage[]): string[] {
  const topics: Set<string> = new Set();

  const allText = [message, ...history.map(m => m.content)].join(' ').toLowerCase();

  // Otomotiv konuları
  if (allText.includes('motor')) topics.add('motor');
  if (allText.includes('fren')) topics.add('fren');
  if (allText.includes('lastik')) topics.add('lastik');
  if (allText.includes('yağ')) topics.add('yağ');
  if (allText.includes('akü')) topics.add('akü');
  if (allText.includes('yakıt')) topics.add('yakıt');
  if (allText.includes('navigasyon')) topics.add('navigasyon');
  if (allText.includes('trafik')) topics.add('trafik');

  return Array.from(topics);
}

// ==================== Detect Response Style (Learning) ====================
function detectPreferredStyle(history: ChatMessage[]): 'formal' | 'casual' | 'technical' {
  const userMessages = history.filter(m => m.role === 'user').map(m => m.content.toLowerCase());

  let formalScore = 0;
  let casualScore = 0;
  let technicalScore = 0;

  userMessages.forEach(msg => {
    // Formal indicators
    if (msg.includes('lütfen') || msg.includes('rica etsem') || msg.includes('mümkün mü')) {
      formalScore++;
    }
    // Casual indicators
    if (msg.includes('ya') || msg.includes('valla') || msg.includes('lan') || msg.length < 20) {
      casualScore++;
    }
    // Technical indicators
    if (msg.includes('obd') || msg.includes('dtc') || msg.includes('ecu') || msg.includes('sensör')) {
      technicalScore++;
    }
  });

  if (technicalScore > formalScore && technicalScore > casualScore) return 'technical';
  if (formalScore > casualScore) return 'formal';
  return 'casual';
}

// ==================== Call AI API ====================
async function callAIService(messages: ChatMessage[], retryCount = 0): Promise<string> {
  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI Service error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Üzgünüm, şu anda cevap veremiyorum.';

  } catch (error) {
    console.error(`AI Service call failed (attempt ${retryCount + 1}):`, error);

    if (retryCount < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
      return callAIService(messages, retryCount + 1);
    }

    throw error;
  }
}

// ==================== POST Handler ====================
export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, conversationHistory, userId, vehicleContext, location, userPreferences } = body;

    // Validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Mesaj gerekli' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!AI_API_KEY) {
      console.error('AI_API_KEY not configured');
      return NextResponse.json(
        { success: false, error: 'Servis geçici olarak kullanılamıyor' },
        { status: 500, headers: corsHeaders }
      );
    }

    // Learning: Detect intent and topics
    const detectedIntent = detectIntent(message);
    const preferredTopics = extractTopics(message, conversationHistory);
    const preferredStyle = detectPreferredStyle(conversationHistory);

    // Build system prompt with learning insights
    const systemPrompt = buildSystemPrompt(
      {
        ...userPreferences,
        responseStyle: userPreferences?.responseStyle || preferredStyle,
        topics: [...(userPreferences?.topics || []), ...preferredTopics],
      },
      vehicleContext
    );

    // Prepare messages with context
    const recentHistory = (conversationHistory || []).slice(-MAX_HISTORY);

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...recentHistory,
      { role: 'user', content: message },
    ];

    // Call AI Service
    console.log(`🤖 Processing: "${message}" (Intent: ${detectedIntent})`);
    const aiResponse = await callAIService(messages);

    // Clean response (remove any demo/test disclaimers)
    const cleanedResponse = aiResponse
      .replace(/\(bu .*demo.*\)/gi, '')
      .replace(/\(.*test.*amaçlı.*\)/gi, '')
      .replace(/\*\*.*demo.*\*\*/gi, '')
      .trim();

    // Return response with learning insights
    const response: ChatResponse = {
      response: cleanedResponse,
      success: true,
      learningInsights: {
        detectedIntent,
        preferredTopics,
        responseStyle: preferredStyle,
      },
    };

    console.log(`✅ Response sent (${cleanedResponse.length} chars)`);
    console.log(`📊 Learning: Intent=${detectedIntent}, Topics=${preferredTopics.join(',')}, Style=${preferredStyle}`);

    return NextResponse.json(response, { headers: corsHeaders });

  } catch (error: any) {
    console.error('❌ Chat API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Bir hata oluştu',
        response: 'Üzgünüm, şu anda bağlantı sorunu yaşıyorum. Lütfen tekrar deneyin.',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ==================== GET Handler (Health Check) ====================
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      service: 'TÜRK OTO AI Chat API',
      version: '1.0.0',
      features: [
        'Self-learning conversation',
        'Intent detection',
        'Topic extraction',
        'Style adaptation',
        'Vehicle context awareness',
        '50 message history',
      ],
      timestamp: new Date().toISOString(),
    },
    { headers: corsHeaders }
  );
}

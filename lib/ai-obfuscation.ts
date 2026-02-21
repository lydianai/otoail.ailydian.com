// ============================================
// TÜRK OTO AI - AI Model Obfuscation
// AI provider isimlerini şifreler ve gizler
// ============================================

/**
 * AI Model kod haritası
 * Gerçek model isimleri kodlanmış halde saklanır
 */
const MODEL_MAP = {
  // Groq Models
  'M1X_LLAMA_70B': 'llama-3.3-70b-versatile',
  'M2X_LLAMA_8B': 'llama-3.1-8b-instant',
  'M3X_MIXTRAL': 'mixtral-8x7b-32768',

  // OpenAI Models (yedek)
  'M4X_GPT4': 'gpt-4-turbo-preview',
  'M5X_GPT35': 'gpt-3.5-turbo',

  // Anthropic Models (yedek)
  'M6X_SONNET': 'claude-3-5-sonnet-20241022',
  'M7X_HAIKU': 'claude-3-haiku-20240307'
} as const;

/**
 * Provider kod haritası
 */
const PROVIDER_MAP = {
  'P1X_PRIMARY': 'groq',
  'P2X_FALLBACK_A': 'openai',
  'P3X_FALLBACK_B': 'anthropic'
} as const;

/**
 * Endpoint kod haritası
 */
const ENDPOINT_MAP = {
  'E1X_PRIMARY': 'https://api.groq.com/openai/v1/chat/completions',
  'E2X_FALLBACK_A': 'https://api.openai.com/v1/chat/completions',
  'E3X_FALLBACK_B': 'https://api.anthropic.com/v1/messages'
} as const;

/**
 * Hassas terimleri şifreler
 */
const SENSITIVE_TERMS: Record<string, string> = {
  'groq': 'neural-engine',
  'openai': 'cognitive-core',
  'anthropic': 'reasoning-matrix',
  'claude': 'advisor-ai',
  'gpt': 'transformer-model',
  'llama': 'language-core',
  'mixtral': 'hybrid-engine'
};

/**
 * Reverse mapping (decode için)
 */
const REVERSE_SENSITIVE_TERMS = Object.entries(SENSITIVE_TERMS).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {} as Record<string, string>
);

export class AIObfuscation {
  /**
   * Model kodunu gerçek isme çevirir
   */
  static decodeModel(code: keyof typeof MODEL_MAP): string {
    return MODEL_MAP[code];
  }

  /**
   * Provider kodunu gerçek isme çevirir
   */
  static decodeProvider(code: keyof typeof PROVIDER_MAP): string {
    return PROVIDER_MAP[code];
  }

  /**
   * Endpoint kodunu gerçek URL'e çevirir
   */
  static decodeEndpoint(code: keyof typeof ENDPOINT_MAP): string {
    return ENDPOINT_MAP[code];
  }

  /**
   * Loglardaki hassas terimleri şifreler
   */
  static sanitizeLog(message: string): string {
    let sanitized = message;

    Object.entries(SENSITIVE_TERMS).forEach(([term, replacement]) => {
      const regex = new RegExp(term, 'gi');
      sanitized = sanitized.replace(regex, replacement);
    });

    return sanitized;
  }

  /**
   * Hata mesajlarındaki hassas bilgileri temizler
   */
  static sanitizeError(error: any): any {
    if (typeof error === 'string') {
      return this.sanitizeLog(error);
    }

    if (error instanceof Error) {
      return {
        message: this.sanitizeLog(error.message),
        stack: undefined // Stack trace'i kaldır
      };
    }

    if (typeof error === 'object' && error !== null) {
      const sanitized: any = {};

      Object.keys(error).forEach(key => {
        if (key === 'stack' || key === 'trace') {
          return; // Stack trace'leri atla
        }

        if (typeof error[key] === 'string') {
          sanitized[key] = this.sanitizeLog(error[key]);
        } else {
          sanitized[key] = error[key];
        }
      });

      return sanitized;
    }

    return error;
  }

  /**
   * API response'larındaki hassas bilgileri temizler
   */
  static sanitizeResponse(response: any): any {
    if (!response) return response;

    const sanitized = { ...response };

    // Model ismini şifrele
    if (sanitized.model) {
      sanitized.model = this.sanitizeLog(sanitized.model);
    }

    // Provider bilgilerini kaldır
    delete sanitized.provider;
    delete sanitized.endpoint;

    // Metadata'dan hassas bilgileri temizle
    if (sanitized.metadata) {
      sanitized.metadata = this.sanitizeLog(JSON.stringify(sanitized.metadata));
    }

    return sanitized;
  }

  /**
   * Environment variable'dan güvenli model adı al
   */
  static getModelFromEnv(fallbackCode: keyof typeof MODEL_MAP = 'M1X_LLAMA_70B'): string {
    const envModel = process.env.AI_MODEL;

    if (!envModel) {
      return this.decodeModel(fallbackCode);
    }

    // Eğer env'de kod varsa decode et
    if (envModel.startsWith('M') && envModel.includes('X_')) {
      return this.decodeModel(envModel as keyof typeof MODEL_MAP);
    }

    // Direkt model ismi verilmişse kullan
    return envModel;
  }

  /**
   * Environment variable'dan güvenli endpoint al
   */
  static getEndpointFromEnv(fallbackCode: keyof typeof ENDPOINT_MAP = 'E1X_PRIMARY'): string {
    const envEndpoint = process.env.AI_ENDPOINT;

    if (!envEndpoint) {
      return this.decodeEndpoint(fallbackCode);
    }

    // Eğer env'de kod varsa decode et
    if (envEndpoint.startsWith('E') && envEndpoint.includes('X_')) {
      return this.decodeEndpoint(envEndpoint as keyof typeof ENDPOINT_MAP);
    }

    // Direkt URL verilmişse kullan
    return envEndpoint;
  }

  /**
   * Console log'ları otomatik sanitize et
   */
  static createSafeLogger() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: any[]) => {
      const sanitized = args.map(arg =>
        typeof arg === 'string' ? this.sanitizeLog(arg) : arg
      );
      originalLog.apply(console, sanitized);
    };

    console.error = (...args: any[]) => {
      const sanitized = args.map(arg =>
        typeof arg === 'string' ? this.sanitizeLog(arg) : this.sanitizeError(arg)
      );
      originalError.apply(console, sanitized);
    };

    console.warn = (...args: any[]) => {
      const sanitized = args.map(arg =>
        typeof arg === 'string' ? this.sanitizeLog(arg) : arg
      );
      originalWarn.apply(console, sanitized);
    };
  }
}

/**
 * Güvenli AI çağrısı wrapper
 */
export async function safeAICall<T>(
  callFn: () => Promise<T>,
  options: {
    maxRetries?: number;
    timeout?: number;
    onError?: (error: any) => void;
  } = {}
): Promise<T> {
  const { maxRetries = 3, timeout = 30000, onError } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('AI request timeout')), timeout);
      });

      // Race between API call and timeout
      const result = await Promise.race([
        callFn(),
        timeoutPromise
      ]);

      return result;

    } catch (error: any) {
      const sanitizedError = AIObfuscation.sanitizeError(error);

      console.error(`[AI Call] Attempt ${attempt}/${maxRetries} failed:`, sanitizedError);

      if (onError) {
        onError(sanitizedError);
      }

      // Son denemeyse hatayı fırlat
      if (attempt === maxRetries) {
        throw new Error('AI service unavailable');
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw new Error('AI service unavailable');
}

/**
 * API key validation (güvenli)
 */
export function validateAPIKey(key: string | undefined, provider: string): boolean {
  if (!key) {
    console.error(`[Security] Missing API key for ${AIObfuscation.sanitizeLog(provider)}`);
    return false;
  }

  // Key formatını kontrol et (prefix'e göre)
  const validPrefixes: Record<string, string[]> = {
    'groq': ['gsk_'],
    'openai': ['sk-'],
    'anthropic': ['sk-ant-']
  };

  const prefixes = validPrefixes[provider.toLowerCase()];
  if (!prefixes) return true; // Bilinmeyen provider

  const isValid = prefixes.some(prefix => key.startsWith(prefix));

  if (!isValid) {
    console.error(`[Security] Invalid API key format for ${AIObfuscation.sanitizeLog(provider)}`);
  }

  return isValid;
}

// Production'da otomatik sanitize logger'ı aktif et
if (process.env.NODE_ENV === 'production') {
  AIObfuscation.createSafeLogger();
}

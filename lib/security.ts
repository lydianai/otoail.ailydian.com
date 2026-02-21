// ============================================
// TÜRK OTO AI - Security Layer
// Input validation, sanitization, XSS protection
// ============================================

import { NextRequest } from 'next/server';

/**
 * XSS ve injection saldırılarını önlemek için input sanitization
 */
export class InputSanitizer {
  /**
   * Tehlikeli karakterleri temizle
   */
  static sanitizeString(input: string): string {
    if (!input || typeof input !== 'string') return '';

    return input
      .replace(/[<>]/g, '') // HTML tags
      .replace(/javascript:/gi, '') // JS injection
      .replace(/on\w+=/gi, '') // Event handlers
      .replace(/eval\(/gi, '') // eval calls
      .replace(/script/gi, '') // script tags
      .trim()
      .slice(0, 10000); // Max 10K karakter
  }

  /**
   * SQL injection karakterlerini temizle
   */
  static sanitizeSQL(input: string): string {
    if (!input || typeof input !== 'string') return '';

    return input
      .replace(/['";\\]/g, '') // SQL özel karakterler
      .replace(/--/g, '') // SQL comment
      .replace(/\/\*/g, '') // Multi-line comment start
      .replace(/\*\//g, '') // Multi-line comment end
      .replace(/xp_/gi, '') // SQL Server extended procedures
      .replace(/union/gi, '') // UNION attacks
      .replace(/select/gi, '') // SELECT queries
      .replace(/drop/gi, '') // DROP statements
      .replace(/insert/gi, '') // INSERT statements
      .replace(/update/gi, '') // UPDATE statements
      .replace(/delete/gi, '') // DELETE statements
      .trim();
  }

  /**
   * Email validation
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * URL validation
   */
  static isValidURL(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }

  /**
   * UUID validation
   */
  static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Numeric validation
   */
  static isValidNumber(value: any, options: { min?: number; max?: number } = {}): boolean {
    const num = Number(value);

    if (isNaN(num) || !isFinite(num)) return false;

    if (options.min !== undefined && num < options.min) return false;
    if (options.max !== undefined && num > options.max) return false;

    return true;
  }

  /**
   * Sanitize object (recursive)
   */
  static sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized = {} as T;

    Object.keys(obj).forEach(key => {
      const value = obj[key];

      if (typeof value === 'string') {
        sanitized[key as keyof T] = this.sanitizeString(value) as any;
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        sanitized[key as keyof T] = this.sanitizeObject(value);
      } else if (Array.isArray(value)) {
        sanitized[key as keyof T] = value.map(item =>
          typeof item === 'string' ? this.sanitizeString(item) : item
        ) as any;
      } else {
        sanitized[key as keyof T] = value;
      }
    });

    return sanitized;
  }

  /**
   * Rate limit key'den IP çıkar (güvenli)
   */
  static extractSafeIP(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIP = req.headers.get('x-real-ip');
    const remoteAddr = req.headers.get('x-vercel-forwarded-for');

    const ip = forwarded?.split(',')[0] || realIP || remoteAddr || 'unknown';

    // IP validation
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}$/i;

    if (ipv4Regex.test(ip) || ipv6Regex.test(ip)) {
      return ip;
    }

    return 'unknown';
  }
}

/**
 * Request validation middleware
 */
export class RequestValidator {
  /**
   * Validate vehicle ID
   */
  static validateVehicleId(vehicleId: any): { valid: boolean; error?: string } {
    if (!vehicleId || typeof vehicleId !== 'string') {
      return { valid: false, error: 'Vehicle ID gerekli' };
    }

    if (!InputSanitizer.isValidUUID(vehicleId)) {
      return { valid: false, error: 'Geçersiz vehicle ID formatı' };
    }

    return { valid: true };
  }

  /**
   * Validate message input
   */
  static validateMessage(message: any): { valid: boolean; error?: string; sanitized?: string } {
    if (!message || typeof message !== 'string') {
      return { valid: false, error: 'Mesaj gerekli' };
    }

    const trimmed = message.trim();

    if (trimmed.length === 0) {
      return { valid: false, error: 'Mesaj boş olamaz' };
    }

    if (trimmed.length > 5000) {
      return { valid: false, error: 'Mesaj çok uzun (max 5000 karakter)' };
    }

    const sanitized = InputSanitizer.sanitizeString(trimmed);

    return { valid: true, sanitized };
  }

  /**
   * Validate battery data
   */
  static validateBatteryData(data: any): { valid: boolean; error?: string } {
    const { soc, soh, voltage, current, temperature } = data;

    if (soc !== undefined && !InputSanitizer.isValidNumber(soc, { min: 0, max: 100 })) {
      return { valid: false, error: 'Geçersiz SOC değeri (0-100)' };
    }

    if (soh !== undefined && !InputSanitizer.isValidNumber(soh, { min: 0, max: 100 })) {
      return { valid: false, error: 'Geçersiz SOH değeri (0-100)' };
    }

    if (voltage !== undefined && !InputSanitizer.isValidNumber(voltage, { min: 0, max: 1000 })) {
      return { valid: false, error: 'Geçersiz voltage değeri' };
    }

    if (current !== undefined && !InputSanitizer.isValidNumber(current, { min: -500, max: 500 })) {
      return { valid: false, error: 'Geçersiz current değeri' };
    }

    if (temperature !== undefined && !InputSanitizer.isValidNumber(temperature, { min: -40, max: 80 })) {
      return { valid: false, error: 'Geçersiz sıcaklık değeri (-40 ile 80 arası)' };
    }

    return { valid: true };
  }

  /**
   * Validate charging session
   */
  static validateChargingSession(data: any): { valid: boolean; error?: string } {
    const { startSOC, targetSOC, chargerType, powerKw } = data;

    if (!startSOC || !InputSanitizer.isValidNumber(startSOC, { min: 0, max: 100 })) {
      return { valid: false, error: 'Geçersiz başlangıç SOC (0-100)' };
    }

    if (!targetSOC || !InputSanitizer.isValidNumber(targetSOC, { min: 0, max: 100 })) {
      return { valid: false, error: 'Geçersiz hedef SOC (0-100)' };
    }

    if (targetSOC <= startSOC) {
      return { valid: false, error: 'Hedef SOC başlangıçtan büyük olmalı' };
    }

    const validChargerTypes = ['AC_SLOW', 'AC_FAST', 'DC_FAST', 'DC_ULTRA'];
    if (!chargerType || !validChargerTypes.includes(chargerType)) {
      return { valid: false, error: 'Geçersiz şarj tipi' };
    }

    if (powerKw && !InputSanitizer.isValidNumber(powerKw, { min: 0, max: 350 })) {
      return { valid: false, error: 'Geçersiz güç değeri (0-350 kW)' };
    }

    return { valid: true };
  }
}

/**
 * Security headers helper
 */
export class SecurityHeaders {
  /**
   * Get secure headers for API responses
   */
  static getSecureHeaders(): Record<string, string> {
    return {
      // XSS Protection
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',

      // CSP (Content Security Policy)
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://api.groq.com https://*.vercel.app",
        "frame-ancestors 'none'"
      ].join('; '),

      // HSTS (HTTP Strict Transport Security)
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

      // Referrer Policy
      'Referrer-Policy': 'strict-origin-when-cross-origin',

      // Permissions Policy
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',

      // CORS
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
        ? 'https://otoai.ailydian.com'
        : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    };
  }

  /**
   * Apply security headers to response
   */
  static applyToResponse(headers: Headers): void {
    const secureHeaders = this.getSecureHeaders();

    Object.entries(secureHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }
}

/**
 * API key masking (logs için)
 */
export function maskAPIKey(key: string | undefined): string {
  if (!key) return '[NOT_SET]';

  if (key.length < 10) return '[INVALID]';

  const prefix = key.substring(0, 7);
  const suffix = key.substring(key.length - 4);

  return `${prefix}...${suffix}`;
}

/**
 * Sensitive data detector
 */
export function containsSensitiveData(text: string): boolean {
  const sensitivePatterns = [
    /sk-[a-zA-Z0-9]{32,}/i, // API keys
    /gsk_[a-zA-Z0-9]{32,}/i, // Groq keys
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Emails
    /\b\d{16}\b/, // Credit card
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /Bearer\s+[A-Za-z0-9\-._~+\/]+=*/i // Bearer tokens
  ];

  return sensitivePatterns.some(pattern => pattern.test(text));
}

/**
 * Safe error response
 */
export function createSafeErrorResponse(error: any, statusCode: number = 500): Response {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const headers = new Headers();
  SecurityHeaders.applyToResponse(headers);

  // Production'da detaylı hata gösterme
  const errorMessage = isDevelopment
    ? error.message || 'An error occurred'
    : 'Bir hata oluştu. Lütfen tekrar deneyin.';

  return new Response(
    JSON.stringify({
      error: errorMessage,
      timestamp: new Date().toISOString()
    }),
    {
      status: statusCode,
      headers
    }
  );
}

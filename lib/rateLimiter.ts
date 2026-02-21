// ============================================
// TÜRK OTO AI - Rate Limiter & Cache Manager
// Groq API rate limiting ve response caching
// ============================================

import { redisRateLimiter, redisCache } from './redis';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyPrefix: string;
}

interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

class InMemoryStore {
  private store: Map<string, number[]> = new Map();
  private cache: Map<string, CacheEntry> = new Map();

  // Rate limiting
  increment(key: string): number {
    const now = Date.now();
    const requests = this.store.get(key) || [];

    // Add current request
    requests.push(now);
    this.store.set(key, requests);

    return requests.length;
  }

  resetKey(key: string): void {
    this.store.delete(key);
  }

  cleanupOldRequests(key: string, windowMs: number): void {
    const now = Date.now();
    const requests = this.store.get(key) || [];
    const validRequests = requests.filter(timestamp => now - timestamp < windowMs);

    if (validRequests.length > 0) {
      this.store.set(key, validRequests);
    } else {
      this.store.delete(key);
    }
  }

  getRequestCount(key: string): number {
    return (this.store.get(key) || []).length;
  }

  // Caching
  setCache(key: string, data: any, ttl: number = 300000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  getCache(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Singleton instance
const store = new InMemoryStore();

/**
 * Rate Limiter Middleware
 * Redis-backed with fallback to in-memory
 */
export async function rateLimiter(
  identifier: string,
  config: RateLimitConfig = {
    maxRequests: 100,
    windowMs: 60000, // 1 minute
    keyPrefix: 'ratelimit'
  }
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}> {
  const key = `${config.keyPrefix}:${identifier}`;

  // Try Redis first
  try {
    const result = await redisRateLimiter.checkLimit(
      key,
      config.maxRequests,
      config.windowMs
    );

    return {
      success: result.allowed,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.retryAfter
    };
  } catch (error) {
    console.warn('[RateLimiter] Redis failed, using in-memory fallback');
  }

  // Fallback to in-memory
  store.cleanupOldRequests(key, config.windowMs);
  const currentCount = store.getRequestCount(key);

  if (currentCount >= config.maxRequests) {
    const oldestRequest = store['store'].get(key)?.[0] || Date.now();
    const resetTime = oldestRequest + config.windowMs;
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: resetTime,
      retryAfter
    };
  }

  store.increment(key);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - currentCount - 1,
    reset: Date.now() + config.windowMs
  };
}

/**
 * Cache Manager
 * Redis-backed with fallback to in-memory
 */
export const cacheManager = {
  /**
   * Get cached response
   */
  async get(key: string): Promise<any | null> {
    try {
      const cached = await redisCache.get(key);
      if (cached !== null) return cached;
    } catch (error) {
      console.warn('[CacheManager] Redis get failed, using in-memory');
    }
    return store.getCache(key);
  },

  /**
   * Set cache with TTL
   */
  async set(key: string, data: any, ttl: number = 300000): Promise<void> {
    try {
      await redisCache.set(key, data, ttl);
    } catch (error) {
      console.warn('[CacheManager] Redis set failed, using in-memory');
      store.setCache(key, data, ttl);
    }
  },

  /**
   * Generate cache key from request
   */
  generateKey(prefix: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(k => `${k}:${JSON.stringify(params[k])}`)
      .join('|');
    return `${prefix}:${sortedParams}`;
  },

  /**
   * Clear cache by pattern
   */
  async clear(pattern?: string): Promise<void> {
    try {
      await redisCache.clear(pattern);
    } catch (error) {
      console.warn('[CacheManager] Redis clear failed, using in-memory');
    }
    store.clearCache(pattern);
  },

  /**
   * Get cache statistics
   */
  async stats(): Promise<{ size: number; keys: string[] }> {
    try {
      return await redisCache.stats();
    } catch (error) {
      console.warn('[CacheManager] Redis stats failed, using in-memory');
      return store.getCacheStats();
    }
  }
};

/**
 * Groq API Rate Limiter
 * Groq'un free tier limitlerini yönetir
 */
export const groqRateLimiter = {
  /**
   * Check if request can proceed
   * Groq Free: 30 requests/minute, 14400/day
   */
  async checkLimit(userId: string): Promise<{
    allowed: boolean;
    limit: number;
    remaining: number;
    reset: number;
    retryAfter?: number;
  }> {
    // Per-minute limit
    const minuteLimit = await rateLimiter(userId, {
      maxRequests: 30,
      windowMs: 60000,
      keyPrefix: 'groq:minute'
    });

    if (!minuteLimit.success) {
      return {
        allowed: false,
        limit: 30,
        remaining: 0,
        reset: minuteLimit.reset,
        retryAfter: minuteLimit.retryAfter
      };
    }

    // Per-day limit
    const dayLimit = await rateLimiter(userId, {
      maxRequests: 14400,
      windowMs: 86400000, // 24 hours
      keyPrefix: 'groq:day'
    });

    if (!dayLimit.success) {
      return {
        allowed: false,
        limit: 14400,
        remaining: 0,
        reset: dayLimit.reset,
        retryAfter: dayLimit.retryAfter
      };
    }

    return {
      allowed: true,
      limit: 30,
      remaining: minuteLimit.remaining,
      reset: minuteLimit.reset
    };
  },

  /**
   * Get cached AI response or fetch new
   */
  async getCachedOrFetch(
    cacheKey: string,
    fetchFn: () => Promise<any>,
    ttl: number = 300000
  ): Promise<any> {
    // Try cache first
    const cached = await cacheManager.get(cacheKey);
    if (cached) {
      console.log('[GROQ] Cache hit:', cacheKey);
      return { ...cached, fromCache: true };
    }

    // Fetch new
    console.log('[GROQ] Cache miss, fetching:', cacheKey);
    const result = await fetchFn();

    // Cache the result
    await cacheManager.set(cacheKey, result, ttl);

    return { ...result, fromCache: false };
  }
};

/**
 * API Rate Limiter (Genel kullanım)
 * Tüm API endpoints için kullanılabilir
 */
export const apiRateLimiter = {
  /**
   * Standard API rate limit (100 req/min per IP)
   */
  async checkStandard(ip: string): Promise<{
    allowed: boolean;
    limit: number;
    remaining: number;
    reset: number;
    retryAfter?: number;
  }> {
    const result = await rateLimiter(ip, {
      maxRequests: 100,
      windowMs: 60000,
      keyPrefix: 'api:standard'
    });

    return {
      allowed: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.retryAfter
    };
  },

  /**
   * Strict API rate limit (20 req/min per IP) - Expensive operations
   */
  async checkStrict(ip: string): Promise<{
    allowed: boolean;
    limit: number;
    remaining: number;
    reset: number;
    retryAfter?: number;
  }> {
    const result = await rateLimiter(ip, {
      maxRequests: 20,
      windowMs: 60000,
      keyPrefix: 'api:strict'
    });

    return {
      allowed: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.retryAfter
    };
  }
};

/**
 * Rate limit response helper
 */
export function createRateLimitResponse(result: {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}): Response {
  const headers = new Headers({
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString()
  });

  if (!result.allowed && result.retryAfter) {
    headers.set('Retry-After', result.retryAfter.toString());
  }

  if (!result.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: `Too many requests. Please try again in ${result.retryAfter} seconds.`,
        retryAfter: result.retryAfter
      }),
      {
        status: 429,
        headers
      }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers
  });
}

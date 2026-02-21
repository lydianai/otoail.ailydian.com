// ============================================
// TÜRK OTO AI - Redis Client
// Production-grade caching & rate limiting
// ============================================

import Redis from 'ioredis';

// Redis client singleton
let redis: Redis | null = null;

/**
 * Get Redis client
 * Falls back to in-memory if Redis unavailable (development)
 */
export function getRedisClient(): Redis | null {
  // Skip Redis in development if not configured
  if (process.env.NODE_ENV === 'development' && !process.env.REDIS_URL) {
    console.log('[Redis] Not configured, using in-memory store');
    return null;
  }

  if (redis) {
    return redis;
  }

  try {
    const redisUrl = process.env.REDIS_URL || process.env.KV_URL;

    if (!redisUrl) {
      console.warn('[Redis] No URL configured, falling back to in-memory');
      return null;
    }

    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      reconnectOnError(err) {
        const targetErrors = ['READONLY', 'ECONNRESET', 'ETIMEDOUT'];
        return targetErrors.some(targetError => err.message.includes(targetError));
      }
    });

    redis.on('connect', () => {
      console.log('[Redis] Connected successfully');
    });

    redis.on('error', (err) => {
      console.error('[Redis] Error:', err.message);
    });

    redis.on('close', () => {
      console.log('[Redis] Connection closed');
    });

    return redis;
  } catch (error) {
    console.error('[Redis] Failed to initialize:', error);
    return null;
  }
}

/**
 * Redis-backed Rate Limiter
 * Uses Redis for distributed rate limiting
 */
export class RedisRateLimiter {
  private redis: Redis | null;
  private prefix: string;

  constructor(prefix: string = 'ratelimit') {
    this.redis = getRedisClient();
    this.prefix = prefix;
  }

  /**
   * Check rate limit using sliding window (Redis ZSET)
   */
  async checkLimit(
    key: string,
    maxRequests: number,
    windowMs: number
  ): Promise<{
    allowed: boolean;
    limit: number;
    remaining: number;
    reset: number;
    retryAfter?: number;
  }> {
    // Fallback to in-memory if Redis unavailable
    if (!this.redis) {
      return {
        allowed: true,
        limit: maxRequests,
        remaining: maxRequests - 1,
        reset: Date.now() + windowMs
      };
    }

    const now = Date.now();
    const windowStart = now - windowMs;
    const fullKey = `${this.prefix}:${key}`;

    try {
      // Multi-command transaction
      const pipeline = this.redis.pipeline();

      // Remove old entries outside window
      pipeline.zremrangebyscore(fullKey, 0, windowStart);

      // Count current entries
      pipeline.zcard(fullKey);

      // Add current request
      pipeline.zadd(fullKey, now, `${now}-${Math.random()}`);

      // Set expiry
      pipeline.expire(fullKey, Math.ceil(windowMs / 1000));

      const results = await pipeline.exec();

      if (!results) {
        throw new Error('Pipeline execution failed');
      }

      // Get count (before adding current)
      const count = (results[1][1] as number) || 0;

      if (count >= maxRequests) {
        // Get oldest request timestamp for reset calculation
        const oldest = await this.redis.zrange(fullKey, 0, 0, 'WITHSCORES');
        const oldestTimestamp = oldest.length > 1 ? parseInt(oldest[1]) : now;
        const resetTime = oldestTimestamp + windowMs;
        const retryAfter = Math.ceil((resetTime - now) / 1000);

        return {
          allowed: false,
          limit: maxRequests,
          remaining: 0,
          reset: resetTime,
          retryAfter
        };
      }

      return {
        allowed: true,
        limit: maxRequests,
        remaining: maxRequests - count - 1,
        reset: now + windowMs
      };
    } catch (error) {
      console.error('[Redis] Rate limit check failed:', error);
      // Fail open - allow request if Redis fails
      return {
        allowed: true,
        limit: maxRequests,
        remaining: maxRequests - 1,
        reset: Date.now() + windowMs
      };
    }
  }

  /**
   * Get current usage stats
   */
  async getStats(key: string): Promise<{
    count: number;
    keys: string[];
  }> {
    if (!this.redis) {
      return { count: 0, keys: [] };
    }

    try {
      const fullKey = `${this.prefix}:${key}`;
      const count = await this.redis.zcard(fullKey);
      const members = await this.redis.zrange(fullKey, 0, -1);

      return {
        count,
        keys: members
      };
    } catch (error) {
      console.error('[Redis] Get stats failed:', error);
      return { count: 0, keys: [] };
    }
  }

  /**
   * Reset rate limit for a key
   */
  async reset(key: string): Promise<void> {
    if (!this.redis) return;

    try {
      const fullKey = `${this.prefix}:${key}`;
      await this.redis.del(fullKey);
    } catch (error) {
      console.error('[Redis] Reset failed:', error);
    }
  }
}

/**
 * Redis-backed Cache Manager
 */
export class RedisCache {
  private redis: Redis | null;
  private prefix: string;

  constructor(prefix: string = 'cache') {
    this.redis = getRedisClient();
    this.prefix = prefix;
  }

  /**
   * Get cached value
   */
  async get<T = any>(key: string): Promise<T | null> {
    if (!this.redis) return null;

    try {
      const fullKey = `${this.prefix}:${key}`;
      const value = await this.redis.get(fullKey);

      if (!value) return null;

      return JSON.parse(value) as T;
    } catch (error) {
      console.error('[Redis] Cache get failed:', error);
      return null;
    }
  }

  /**
   * Set cached value with TTL
   */
  async set(key: string, value: any, ttlMs: number = 300000): Promise<void> {
    if (!this.redis) return;

    try {
      const fullKey = `${this.prefix}:${key}`;
      const ttlSeconds = Math.ceil(ttlMs / 1000);

      await this.redis.setex(
        fullKey,
        ttlSeconds,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error('[Redis] Cache set failed:', error);
    }
  }

  /**
   * Delete cached value
   */
  async delete(key: string): Promise<void> {
    if (!this.redis) return;

    try {
      const fullKey = `${this.prefix}:${key}`;
      await this.redis.del(fullKey);
    } catch (error) {
      console.error('[Redis] Cache delete failed:', error);
    }
  }

  /**
   * Clear cache by pattern
   */
  async clear(pattern?: string): Promise<void> {
    if (!this.redis) return;

    try {
      const searchPattern = pattern
        ? `${this.prefix}:*${pattern}*`
        : `${this.prefix}:*`;

      const keys = await this.redis.keys(searchPattern);

      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('[Redis] Cache clear failed:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async stats(): Promise<{
    size: number;
    keys: string[];
  }> {
    if (!this.redis) {
      return { size: 0, keys: [] };
    }

    try {
      const keys = await this.redis.keys(`${this.prefix}:*`);
      return {
        size: keys.length,
        keys: keys.map(k => k.replace(`${this.prefix}:`, ''))
      };
    } catch (error) {
      console.error('[Redis] Stats failed:', error);
      return { size: 0, keys: [] };
    }
  }

  /**
   * Get or set with fetch function
   */
  async getOrSet<T = any>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlMs: number = 300000
  ): Promise<{ data: T; fromCache: boolean }> {
    // Try cache first
    const cached = await this.get<T>(key);
    if (cached !== null) {
      console.log(`[Redis Cache] HIT: ${key}`);
      return { data: cached, fromCache: true };
    }

    // Fetch new data
    console.log(`[Redis Cache] MISS: ${key}`);
    const data = await fetchFn();

    // Cache it
    await this.set(key, data, ttlMs);

    return { data, fromCache: false };
  }
}

/**
 * Close Redis connection (for cleanup)
 */
export async function closeRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}

// Export singleton instances
export const redisRateLimiter = new RedisRateLimiter('ratelimit');
export const redisCache = new RedisCache('cache');

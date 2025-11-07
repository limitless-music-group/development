// packages/rate-limit/index.ts
import { Ratelimit } from "@upstash/ratelimit";
import { redis, isUsingRedis } from "./config";
import { memoryRateLimitCache, generateKey } from "./memory";
import type { RateLimitConfigInput, RateLimitResult } from "./types";
import { RATE_LIMIT_PRESETS, RateLimitPresetName } from "./constants";

/**
 * Check and increment rate limit for an IP address
 *
 * @param ip - The IP address to check
 * @param config - Rate limit configuration
 * @returns Rate limit result indicating if the request is allowed
 * @throws {Error} If maxRequests or windowSeconds are not finite positive numbers
 */
export async function checkRateLimit(
  ip: string,
  configOrPreset: RateLimitConfigInput | RateLimitPresetName
): Promise<RateLimitResult> {
  /**
   * Resolve preset or custom config
   */
  const config =
    typeof configOrPreset === 'string'
      ? { ...RATE_LIMIT_PRESETS[configOrPreset], identifier: configOrPreset }
      : configOrPreset;


  if (isUsingRedis) {
    /**
     * Distributed Redis-backed rate limiting
     */
    const rateLimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.maxRequests, `${config.windowSeconds}s`),
      prefix: config.identifier ?? 'opus',
    })

    const result = await rateLimit.limit(ip);

    return {
      allowed: result.success,
      remaining: result.remaining,
      limit: config.maxRequests,
      resetAt: Math.floor(result.reset / 1000),
      retryAfter: result.reset / 1000 - Math.floor(Date.now() / 1000),
    };
  }

  /**
   * Local fallback
   */
  const key = generateKey(ip, config.identifier);
  const now = Math.floor(Date.now() / 1000);
  let entry = memoryRateLimitCache.get(key);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 1, resetAt: now + config.windowSeconds };
    memoryRateLimitCache.set(key, entry);
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      limit: config.maxRequests, 
      resetAt: entry.resetAt,
    };
  }

  entry.count++;
  memoryRateLimitCache.set(key, entry);

  if (entry.count > config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      limit: config.maxRequests,
      resetAt: entry.resetAt,
      retryAfter: entry.resetAt - now,
    };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    limit: config.maxRequests,
    resetAt: entry.resetAt,
  };
}


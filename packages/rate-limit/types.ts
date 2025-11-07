// packages/rate-limit/types.ts

import { RatelimitConfig as UpstashConfig } from "@upstash/ratelimit"

/**
 * Information returned by the rate limit check.
 */
export type RateLimitInfo = {
  remaining: number
  limit: number
  resetAt: number
}

export type RateLimitConfigInput = {
    /**
   * Maximum number of requests allowed within the window
   *
   * Must be a finite positive number greater than 0
   */
  maxRequests: number;

  /**
   * Time window in seconds
   *
   * Must be a finite positive number greater than 0
   */
  windowSeconds: number;

  /**
   * Optional identifier for the rate limit (e.g., "api", "auth", "public")
   */
  identifier?: string;
}

/**
 * Internal resolved configuration that includes Upstash or memory details.
 */
export type ResolvedRateLimitConfig = RateLimitConfigInput & Partial<UpstashConfig>;


export type RateLimitResult = {
  /**
   * Whether the request is allowed
   */
  allowed: boolean

  /**
   * Number of requests remaining in the current window
   */
  remaining: number

  /**
   * Total limit for the window
   */
  limit: number

  /**
   * Timestamp when the rate limit will reset (in seconds)
   */
  resetAt: number

  /**
   * Number of seconds to wait before retrying
   */
  retryAfter?: number
}

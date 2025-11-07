// packages/rate-limit/constants.ts

import { RateLimitConfigSchema } from "./schema";

/**
 * Predefined rate limit configurations
 */
export const RATE_LIMIT_PRESETS = {
  // Very strict - for sensitive endpoints (e.g., password reset)
  STRICT: {
    maxRequests: 5,
    windowSeconds: 60,
  },
  // Moderate - for general public endpoints
  MODERATE: {
    maxRequests: 30,
    windowSeconds: 60,
  },
  // Lenient - for high-traffic public endpoints
  LENIENT: {
    maxRequests: 100,
    windowSeconds: 60,
  },
  // Very lenient - for static content or health checks
  VERY_LENIENT: {
    maxRequests: 300,
    windowSeconds: 60,
  },
} as const;

// Validate presets once at module load (fail fast if misconfigured)
for (const [key, value] of Object.entries(RATE_LIMIT_PRESETS)) {
  const result = RateLimitConfigSchema.safeParse(value);
  if (!result.success) {
    throw new Error(`[RateLimit] Invalid preset "${key}": ${result.error.message}`);
  }
}

export type RateLimitPresetName = keyof typeof RATE_LIMIT_PRESETS;
export type RateLimitPreset = (typeof RATE_LIMIT_PRESETS)[RateLimitPresetName];

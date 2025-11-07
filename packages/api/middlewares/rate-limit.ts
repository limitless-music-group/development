// packages/api/middlewares/rate-limit.ts

import { ORPCError } from "@orpc/server"
import type { PublicContext } from "@/types"
import type { MiddlewareNextFn } from "@orpc/server";
import { RateLimitConfigSchema } from "@/packages/rate-limit/schema";
import { RATE_LIMIT_PRESETS } from "@/packages/rate-limit/constants";
import { checkRateLimit } from "@/packages/rate-limit";
import { RateLimitConfigInput } from "@/packages/rate-limit/types";


/**
 * Rate limiting middleware for oRPC
 *
 * This middleware applies IP-based rate limiting to protect against abuse and DoS attacks.
 * It should be applied to public endpoints that don't require authentication.
 * 
 * Applies IP-based rate limiting using the shared `@packages/rate-limit` module.
 * Automatically switches between Upstash Redis (in production) and
 * an in-memory cache (in development/test).
 *
 * @example
 * ```ts
 * const publicProcedure = baseProcedure
 *   .use(rateLimitMiddleware({ maxRequests: 30, windowSeconds: 60 }))
 *
 * export const getPublicData = publicProcedure
 *   .handler(async () => {
 *     // Handler implementation
 *   })
 * ```
 */
export const ratelimitMiddleware = (config: RateLimitConfigInput) => {
  // Validate config early (even for custom calls)
  const parsed = RateLimitConfigSchema.safeParse(config);
  if (!parsed.success) {
    throw new Error(`[RateLimit] Invalid middleware config: ${parsed.error.message}`);
  }

  return async ({
    context,
    next,
  }: {
    context: PublicContext
    next: MiddlewareNextFn<unknown>
  }) => {
    const ip = context.ip || 'unknown';
    const result = await checkRateLimit(ip, parsed.data);

    if (!result.allowed) {
      throw new ORPCError('TOO_MANY_REQUESTS', {
        message: `Rate limit exceeded. Try again in ${result.retryAfter ?? "a few"} seconds.`,
        data: {
          retryAfter: result.retryAfter,
          limit: result.limit,
          resetAt: result.resetAt,
          identifier: parsed.data.identifier,
        }
      });
    }

    return next({
      context: {
        ...context,
        rateLimit: {
          remaining: result.remaining,
          limit: result.limit,
          resetAt: result.resetAt
        },
      },
    });
  };
};

/** Predefined middleware shortcuts */

/**
 * Strict rate limit - for sensitive endpoints (e.g., password reset, email sending)
 * 5 requests per minute
 */
export const strictRateLimit = () => 
  ratelimitMiddleware({ ...RATE_LIMIT_PRESETS.STRICT, identifier: 'strict' })
/**
 * Moderate rate limit - for general public endpoints (default)
 * 30 requests per minute
 */
export const moderateRateLimit = () => 
  ratelimitMiddleware({ ...RATE_LIMIT_PRESETS.MODERATE, identifier: 'moderate' })
/**
 * Lenient rate limit - for high-traffic public endpoints
 * 100 requests per minute
 */
export const lenientRateLimit = () => 
  ratelimitMiddleware({ ...RATE_LIMIT_PRESETS.LENIENT, identifier: 'lenient' })
/**
 * Very lenient rate limit - for static content or health checks
 * 300 requests per minute
 */
export const veryLenientRateLimit = () => 
  ratelimitMiddleware({ ...RATE_LIMIT_PRESETS.VERY_LENIENT, identifier: 'very-lenient' })
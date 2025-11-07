import { z } from 'zod';

export const RateLimitConfigSchema = z.object({
  maxRequests: z
    .number()
    .int()
    .positive()
    .lte(10000, "Unreasonable request cap")
  ,
  windowSeconds: z
    .number()
    .int()
    .positive()
    .lte(86400, "Window too long (max 24h)")
  ,
  identifier: z
    .string()
    .min(1, 'Identifier name is required')
    .optional()
  ,
})

export type RateLimitConfigInput = z.infer<typeof RateLimitConfigSchema>

import type { RateLimitInfo } from '@packages/rate-limit/types';
import type { Session, User } from "@packages/auth/types";

export type PermissionContext = {
  isNormalUser: boolean
  canOnlyAccessDefaultContainers: boolean
};

export type ORPCContext { 
  session: Session | null
  user: User | null
  permissions?: PermissionContext
    /**
   * IP address of the request
   * Used for rate limiting and security logging
   */
  ip: string
  /**
   * Rate limit information for the current request
   * Available after rate limiting middleware is applied
   */
  rateLimit?: RateLimitInfo
}



export type AuthenticatedContext = ORPCContext & {
  session: Session
  user: User
}

export type PublicContext = ORPCContext
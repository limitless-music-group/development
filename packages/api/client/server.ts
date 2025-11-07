import { createRouterClient } from "@orpc/server"
import type { RouterClient } from "@orpc/server"

import { router } from "@/routers"
import type { ORPCContext } from "@/types"

/**
 * Server-side oRPC client for SSR optimization
 * This eliminates HTTP requests during server-side rendering
 */
export function createServerClient(
  context: ORPCContext
): RouterClient<typeof router> {
  return globalThis.$client = createRouterClient(router, {
    context: () => context,
  })
}

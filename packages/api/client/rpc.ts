import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import type { RouterClient } from "@orpc/server"

import type { APIRouterClient, router } from "@/routers"

declare global {
  var $client: RouterClient<typeof router> | undefined;
}

// Create the RPC link
const link = new RPCLink({
  url: `${process.env.NEXT_PUBLIC_API_URL}/rpc`,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: 'include',
    });
  },
  headers: async () => {
    if (typeof window !== 'undefined') {
      return {};
    }

    const { headers } = await import('next/headers');
    return Object.fromEntries(await headers());
  }
})

/**
 * Create the oRPC client with proper typing
 * 
 * Fallback to client-side client if server-side client is not available.
 */
export const rpcClient: APIRouterClient = globalThis.$client ?? (createORPCClient(link) as RouterClient<typeof router>)
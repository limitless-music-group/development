import type { RouterClient } from '@orpc/server';
import { RPCLink } from '@orpc/client/fetch';
import { createORPCClient } from "@orpc/client";
import type { APIRouterClient } from '@/routers';
import { router } from '@/routers';

declare global {
  var $client: RouterClient<typeof router> | undefined;
}


export const link = new RPCLink({
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
  },

    // return `${process.env.NEXT_PUBLIC_API_URL}/rpc`;

})

/**
 * Fallback to client-side client if server-side client is not available.
 */
export const client: APIRouterClient = globalThis.$client ?? (createORPCClient(link) as RouterClient<typeof router>)
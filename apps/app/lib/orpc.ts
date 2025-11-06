import { env } from "@/config/env";
import { RPCLink } from "@orpc/client/fetch";

const link = new RPCLink({
  url: env.NEXT_PUBLIC_API_URL,
  headers: async () => {
    if (typeof window !== 'undefined') {
      return {}
    }

    const { headers } = await import('next/headers');
    return await headers()
  }
})

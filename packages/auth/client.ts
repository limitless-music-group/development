import type { auth } from './auth';
import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
})
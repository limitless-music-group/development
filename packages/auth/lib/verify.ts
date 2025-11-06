'use server';

import { headers } from 'next/headers';
import { auth } from '@/auth';

export async function verifySession() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  return session
}
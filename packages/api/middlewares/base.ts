import type { MiddlewareNextFn } from '@orpc/server';
import { PublicContext } from '@/types';

export const publicMiddleware = async({
  context, 
  next,
}: {
  context: PublicContext
  next: typeMiddlewareNextFn<PublicContext>
}) => {
  return next({ context })
}


export const base = ;
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().startsWith('postgresql://').includes('neondb_owner'),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  })
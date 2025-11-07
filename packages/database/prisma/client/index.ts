import 'server-only';

import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/generated/client';
import ws from 'ws';

import { keys } from '@/keys';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let database: PrismaClient

if (process.env.NODE_ENV === 'production') {
  // Production: Use Neon serverless adapter
  neonConfig.webSocketConstructor = ws;
  neonConfig.poolQueryViaFetch = true;
  const connectionString = keys().DATABASE_URL;
  const adapter = new PrismaNeon({ connectionString })

  database = globalForPrisma.prisma || new PrismaClient({ adapter });
} else {
  // Development: Use standard Prisma client
  database = globalForPrisma.prisma || new PrismaClient();
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = database;
}

export { database }

export * from '@/generated/client';
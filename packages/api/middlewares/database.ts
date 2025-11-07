import { database, PrismaClient } from "@/packages/database";
import { os } from "@orpc/server";

export const dbProvider = os
  .$context<{ db?: Awaited<ReturnType<typeof database>>}>()
  .middleware(async ({ context, next }) => {
    /**
     * If database already exists, skip the connection.
     */
    const db = context.db ?? await connectDb()

    return next({ context: { db } })
  });


import { PrismaClient } from "../client";

import { seedCredentials } from "./credentials"
import { seedTags } from "./tags"
import { seedUsers } from "./users"

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...")

  // Add all seeder functions here in the correct order
  await seedUsers(prisma)
  await seedTags(prisma)
  await seedCredentials(prisma)

  console.log("✅ Database seeding completed")
}

main()
  .catch((e) => {
    console.error("❌ Database seeding failed")
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
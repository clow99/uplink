import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const demoUserEmail = process.env.DEMO_USER_EMAIL ?? "demo@uplink.local";
const demoUserPassword = process.env.DEMO_USER_PASSWORD ?? "demo-password";

async function main() {
  const hashedPassword = await bcrypt.hash(demoUserPassword, 10);

  await prisma.user.upsert({
    where: { email: demoUserEmail },
    update: {
      name: "Demo User",
      password: hashedPassword,
    },
    create: {
      email: demoUserEmail,
      name: "Demo User",
      password: hashedPassword,
    },
  });

  console.log(`Seeded demo user: ${demoUserEmail}`);
}

main()
  .catch((error) => {
    console.error("Failed to seed demo user.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

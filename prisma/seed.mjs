import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.CRM_SEED_ADMIN_EMAIL || "admin@local";
  const adminPassword = process.env.CRM_SEED_ADMIN_PASSWORD || "admin1234";

  const salesEmail = process.env.CRM_SEED_SALES_EMAIL || "sales@local";
  const salesPassword = process.env.CRM_SEED_SALES_PASSWORD || "sales1234";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: { active: true, role: "admin", passwordHash },
    create: {
      email: adminEmail.toLowerCase(),
      role: "admin",
      active: true,
      passwordHash,
    },
  });

  const salesPasswordHash = await bcrypt.hash(salesPassword, 10);

  await prisma.user.upsert({
    where: { email: salesEmail.toLowerCase() },
    update: { active: true, role: "sales", passwordHash: salesPasswordHash },
    create: {
      email: salesEmail.toLowerCase(),
      role: "sales",
      active: true,
      passwordHash: salesPasswordHash,
    },
  });

  const stageCount = await prisma.pipelineStage.count();
  if (stageCount === 0) {
    const stages = [
      { name: "New", order: 1, probabilityDefault: 10, isWon: false, isLost: false },
      { name: "Qualified", order: 2, probabilityDefault: 30, isWon: false, isLost: false },
      { name: "Discovery", order: 3, probabilityDefault: 50, isWon: false, isLost: false },
      { name: "Proposal", order: 4, probabilityDefault: 70, isWon: false, isLost: false },
      { name: "Won", order: 5, probabilityDefault: 100, isWon: true, isLost: false },
      { name: "Lost", order: 6, probabilityDefault: 0, isWon: false, isLost: true },
    ];

    await prisma.pipelineStage.createMany({ data: stages });
  }

  const rules = [
    { eventName: "lead.created", description: "Log lead creation" },
    { eventName: "deal.stage_changed", description: "Log stage change" },
    { eventName: "lead.score_threshold_crossed", description: "Log score threshold" },
    { eventName: "task.overdue", description: "Log overdue task" },
  ];

  for (const r of rules) {
    const existing = await prisma.automationRule.findFirst({
      where: { eventName: r.eventName },
      select: { id: true },
    });

    if (!existing) {
      await prisma.automationRule.create({
        data: { eventName: r.eventName, description: r.description, active: true },
      });
    }
  }

  console.log("Seed complete:", {
    adminEmail: admin.email,
    salesEmail: salesEmail.toLowerCase(),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

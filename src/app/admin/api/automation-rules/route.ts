import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const CreateSchema = z.object({
  eventName: z.string().min(1),
  conditionJson: z.unknown(),
  description: z.string().optional(),
  active: z.boolean().optional().default(true),
});

export async function GET() {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const rules = await prisma.automationRule.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, rules }, { status: 200 });
}

export async function POST(req: Request) {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  let parsed: z.infer<typeof CreateSchema>;
  try {
    parsed = CreateSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const rule = await prisma.automationRule.create({
    data: {
      eventName: parsed.eventName,
      conditionJson: parsed.conditionJson,
      description: parsed.description,
      active: parsed.active,
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "automation_rule",
      entityId: rule.id,
      action: "automation_rule.created",
      metadata: { created_by: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "automation_rule.created",
      entityType: "automation_rule",
      entityId: rule.id,
      payload: { ruleId: rule.id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true, rule }, { status: 201 });
}

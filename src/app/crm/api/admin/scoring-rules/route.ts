import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const CreateSchema = z.object({
  name: z.string().min(1),
  field: z.enum(["source", "status", "manual"]),
  operator: z.enum(["eq", "contains", "exists"]),
  value: z.string().optional().default(""),
  weight: z.number().int(),
  active: z.boolean(),
});

export async function GET() {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const rules = await prisma.scoringRule.findMany({ orderBy: { createdAt: "desc" } });
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

  const rule = await prisma.scoringRule.create({
    data: {
      active: parsed.active,
      name: parsed.name,
      field: parsed.field,
      operator: parsed.operator,
      value: parsed.operator === "exists" ? "" : parsed.value,
      weight: parsed.weight,
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "scoring_rule",
      entityId: rule.id,
      action: "scoring_rule.created",
      metadata: { created_by: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "scoring_rule.created",
      entityType: "scoring_rule",
      entityId: rule.id,
      payload: { ruleId: rule.id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

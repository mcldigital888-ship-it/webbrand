import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const PatchSchema = z.object({
  active: z.boolean().optional(),
  name: z.string().min(1).optional(),
  field: z.enum(["source", "status", "manual"]).optional(),
  operator: z.enum(["eq", "contains", "exists"]).optional(),
  value: z.string().optional(),
  weight: z.number().int().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  let parsed: z.infer<typeof PatchSchema>;
  try {
    parsed = PatchSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.scoringRule.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const nextOperator = parsed.operator ?? existing.operator;

  const updated = await prisma.scoringRule.update({
    where: { id },
    data: {
      active: parsed.active ?? existing.active,
      name: parsed.name ?? existing.name,
      field: parsed.field ?? existing.field,
      operator: nextOperator,
      value: nextOperator === "exists" ? "" : parsed.value ?? existing.value,
      weight: parsed.weight ?? existing.weight,
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "scoring_rule",
      entityId: updated.id,
      action: "scoring_rule.updated",
      metadata: { before: existing, after: updated, changed_by: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "scoring_rule.updated",
      entityType: "scoring_rule",
      entityId: updated.id,
      payload: { ruleId: updated.id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const existing = await prisma.scoringRule.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  await prisma.scoringRule.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      entityType: "scoring_rule",
      entityId: id,
      action: "scoring_rule.deleted",
      metadata: { deleted_by: session.userId, rule: existing },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "scoring_rule.deleted",
      entityType: "scoring_rule",
      entityId: id,
      payload: { ruleId: id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

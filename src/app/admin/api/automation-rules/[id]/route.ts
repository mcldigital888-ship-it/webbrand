import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const PatchSchema = z
  .object({
    eventName: z.string().min(1).optional(),
    conditionJson: z.unknown().optional(),
    description: z.string().optional().nullable(),
    active: z.boolean().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "Empty payload" });

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;

  let parsed: z.infer<typeof PatchSchema>;
  try {
    parsed = PatchSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.automationRule.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.automationRule.update({
    where: { id },
    data: {
      eventName: parsed.eventName,
      conditionJson: parsed.conditionJson,
      description: parsed.description === null ? null : parsed.description,
      active: parsed.active,
    },
  });

  const action =
    typeof parsed.active === "boolean" && Object.keys(parsed).length === 1
      ? "automation_rule.toggled"
      : "automation_rule.updated";

  await prisma.activityLog.create({
    data: {
      entityType: "automation_rule",
      entityId: updated.id,
      action,
      metadata: { updated_by: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: action,
      entityType: "automation_rule",
      entityId: updated.id,
      payload: { ruleId: updated.id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true, rule: updated }, { status: 200 });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;

  const existing = await prisma.automationRule.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  await prisma.automationRule.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      entityType: "automation_rule",
      entityId: id,
      action: "automation_rule.deleted",
      metadata: { deleted_by: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "automation_rule.deleted",
      entityType: "automation_rule",
      entityId: id,
      payload: { ruleId: id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

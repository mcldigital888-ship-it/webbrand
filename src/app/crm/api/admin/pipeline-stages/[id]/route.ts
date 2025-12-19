import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const PatchSchema = z.object({
  name: z.string().min(1).optional(),
  probabilityDefault: z.number().int().min(0).max(100).optional(),
  isWon: z.boolean().optional(),
  isLost: z.boolean().optional(),
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

  const existing = await prisma.pipelineStage.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const nextIsWon = typeof parsed.isWon === "boolean" ? parsed.isWon : existing.isWon;
  const nextIsLost = typeof parsed.isLost === "boolean" ? parsed.isLost : existing.isLost;

  if (nextIsWon && nextIsLost) {
    return NextResponse.json(
      { ok: false, error: "Stage cannot be both won and lost" },
      { status: 400 }
    );
  }

  const updated = await prisma.pipelineStage.update({
    where: { id },
    data: {
      name: parsed.name ?? existing.name,
      probabilityDefault: parsed.probabilityDefault ?? existing.probabilityDefault,
      isWon: nextIsWon,
      isLost: nextIsLost,
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "pipeline_stage",
      entityId: updated.id,
      action: "pipeline_stage.updated",
      metadata: { before: existing, after: updated, changed_by: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "pipeline_stage.updated",
      entityType: "pipeline_stage",
      entityId: updated.id,
      payload: { stageId: updated.id },
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

  const stage = await prisma.pipelineStage.findUnique({ where: { id } });
  if (!stage) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const dealCount = await prisma.deal.count({ where: { stageId: id } });
  if (dealCount > 0) {
    return NextResponse.json(
      { ok: false, error: "Cannot delete stage with deals" },
      { status: 400 }
    );
  }

  await prisma.pipelineStage.delete({ where: { id } });

  await prisma.activityLog.create({
    data: {
      entityType: "pipeline_stage",
      entityId: id,
      action: "pipeline_stage.deleted",
      metadata: { deleted_by: session.userId, stage },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "pipeline_stage.deleted",
      entityType: "pipeline_stage",
      entityId: id,
      payload: { stageId: id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

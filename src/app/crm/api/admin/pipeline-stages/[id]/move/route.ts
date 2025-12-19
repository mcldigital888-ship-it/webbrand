import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const BodySchema = z.object({
  direction: z.enum(["up", "down"]),
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

  let parsed: z.infer<typeof BodySchema>;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const stages = await prisma.pipelineStage.findMany({ orderBy: { order: "asc" } });
  const idx = stages.findIndex((s) => s.id === id);
  if (idx === -1) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const swapWith = parsed.direction === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= stages.length) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const a = stages[idx];
  const b = stages[swapWith];

  await prisma.$transaction([
    prisma.pipelineStage.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.pipelineStage.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  await prisma.activityLog.create({
    data: {
      entityType: "pipeline_stage",
      entityId: a.id,
      action: "pipeline_stage.reordered",
      metadata: { a: a.id, b: b.id, changed_by: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "pipeline_stage.reordered",
      entityType: "pipeline_stage",
      entityId: a.id,
      payload: { a: a.id, b: b.id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const BodySchema = z.object({
  dealId: z.string().min(1),
  toStageId: z.string().min(1),
});

export async function PATCH(req: Request) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let parsed: z.infer<typeof BodySchema>;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const deal = await prisma.deal.findUnique({
    where: { id: parsed.dealId },
    include: { lead: true },
  });

  if (!deal) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  if (session.role === "sales" && deal.ownerId !== session.userId) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const fromStageId = deal.stageId;
  if (fromStageId === parsed.toStageId) {
    return NextResponse.json({ ok: true, deal }, { status: 200 });
  }

  const toStage = await prisma.pipelineStage.findUnique({
    where: { id: parsed.toStageId },
  });

  if (!toStage) {
    return NextResponse.json({ ok: false, error: "Invalid stage" }, { status: 400 });
  }

  const updated = await prisma.deal.update({
    where: { id: deal.id },
    data: {
      stageId: parsed.toStageId,
      probability: deal.probabilityManual ? deal.probability : toStage.probabilityDefault,
    },
    include: {
      lead: { select: { name: true, email: true } },
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "deal",
      entityId: updated.id,
      action: "deal.stage_changed",
      metadata: {
        stage_from: fromStageId,
        stage_to: parsed.toStageId,
        changed_by: session.userId,
      },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "deal.stage_changed",
      entityType: "deal",
      entityId: updated.id,
      payload: {
        dealId: updated.id,
        stage_from: fromStageId,
        stage_to: parsed.toStageId,
      },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true, deal: updated }, { status: 200 });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const BodySchema = z.object({
  leadId: z.string().min(1),
});

export async function POST(req: Request) {
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

  const lead = await prisma.lead.findUnique({
    where: { id: parsed.leadId },
    select: { id: true, ownerId: true },
  });

  if (!lead) {
    return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });
  }

  if (session.role === "sales" && lead.ownerId !== session.userId) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const stage = await prisma.pipelineStage.findFirst({
    orderBy: { order: "asc" },
  });

  if (!stage) {
    return NextResponse.json(
      { ok: false, error: "No pipeline stages configured" },
      { status: 400 }
    );
  }

  const ownerId = lead.ownerId || (session.role === "sales" ? session.userId : null);

  const deal = await prisma.deal.create({
    data: {
      leadId: lead.id,
      stageId: stage.id,
      value: 0,
      probability: stage.probabilityDefault,
      probabilityManual: false,
      ownerId,
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "deal",
      entityId: deal.id,
      action: "deal.created",
      metadata: {
        leadId: lead.id,
        stage_id: stage.id,
        created_by: session.userId,
      },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "deal.created",
      entityType: "deal",
      entityId: deal.id,
      payload: {
        dealId: deal.id,
        leadId: lead.id,
        stageId: stage.id,
      },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true, id: deal.id }, { status: 201 });
}

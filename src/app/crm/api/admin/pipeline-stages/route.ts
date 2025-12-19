import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const CreateSchema = z.object({
  name: z.string().min(1),
  probabilityDefault: z.number().int().min(0).max(100),
  isWon: z.boolean(),
  isLost: z.boolean(),
});

export async function GET() {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const stages = await prisma.pipelineStage.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ok: true, stages }, { status: 200 });
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

  if (parsed.isWon && parsed.isLost) {
    return NextResponse.json(
      { ok: false, error: "Stage cannot be both won and lost" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.pipelineStage.aggregate({
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max.order || 0) + 1;

  const stage = await prisma.pipelineStage.create({
    data: {
      name: parsed.name,
      order: nextOrder,
      probabilityDefault: parsed.probabilityDefault,
      isWon: parsed.isWon,
      isLost: parsed.isLost,
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "pipeline_stage",
      entityId: stage.id,
      action: "pipeline_stage.created",
      metadata: { created_by: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "pipeline_stage.created",
      entityType: "pipeline_stage",
      entityId: stage.id,
      payload: { stageId: stage.id },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

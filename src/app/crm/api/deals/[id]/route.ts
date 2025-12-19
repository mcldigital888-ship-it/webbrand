import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const PatchSchema = z.object({
  value: z.number().int().nonnegative().optional(),
  probability: z.number().int().min(0).max(100).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let parsed: z.infer<typeof PatchSchema>;
  try {
    parsed = PatchSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const deal = await prisma.deal.findUnique({
    where: { id },
  });

  if (!deal) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  if (session.role === "sales" && deal.ownerId !== session.userId) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.deal.update({
    where: { id },
    data: {
      value: parsed.value ?? deal.value,
      probability: parsed.probability ?? deal.probability,
      probabilityManual:
        typeof parsed.probability === "number" ? true : deal.probabilityManual,
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "deal",
      entityId: updated.id,
      action: "deal.updated",
      metadata: {
        changed_by: session.userId,
        value: updated.value,
        probability: updated.probability,
        probability_manual: updated.probabilityManual,
      },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "deal.updated",
      entityType: "deal",
      entityId: updated.id,
      payload: {
        dealId: updated.id,
        value: updated.value,
        probability: updated.probability,
        probability_manual: updated.probabilityManual,
      },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true, deal: updated }, { status: 200 });
}

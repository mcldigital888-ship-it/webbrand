import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const BodySchema = z.object({
  ownerId: z.string().min(1).nullable(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  let parsed: z.infer<typeof BodySchema>;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const lead = await prisma.lead.findUnique({
    where: { id },
    select: { id: true, ownerId: true },
  });

  if (!lead) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  if (parsed.ownerId) {
    const target = await prisma.user.findFirst({
      where: { id: parsed.ownerId, role: "sales", active: true },
      select: { id: true },
    });

    if (!target) {
      return NextResponse.json(
        { ok: false, error: "Invalid owner" },
        { status: 400 }
      );
    }
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: { ownerId: parsed.ownerId },
    select: { id: true, ownerId: true },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "lead",
      entityId: updated.id,
      action: "lead.owner_changed",
      metadata: {
        owner_from: lead.ownerId,
        owner_to: updated.ownerId,
        changed_by: session.userId,
      },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "lead.owner_changed",
      entityType: "lead",
      entityId: updated.id,
      payload: {
        leadId: updated.id,
        owner_from: lead.ownerId,
        owner_to: updated.ownerId,
      },
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";
import { recalcLeadScore } from "@/lib/crm/scoring";

const CreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getCrmSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let parsed: z.infer<typeof CreateSchema>;
  try {
    parsed = CreateSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || null,
      source: parsed.source || null,
      ownerId: session.role === "sales" ? session.userId : null,
      status: "new",
      score: 0,
    },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "lead",
      entityId: lead.id,
      action: "lead.created",
      metadata: { createdBy: session.userId },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "lead.created",
      entityType: "lead",
      entityId: lead.id,
      payload: { leadId: lead.id },
      status: "pending",
    },
  });

  await recalcLeadScore({ leadId: lead.id, changedBy: session.userId });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

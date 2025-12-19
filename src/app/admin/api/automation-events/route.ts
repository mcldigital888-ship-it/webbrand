import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

const QuerySchema = z.object({
  eventName: z.string().optional().default(""),
  status: z.string().optional().default(""),
  from: z.string().optional().default(""),
  to: z.string().optional().default(""),
  take: z.coerce.number().int().min(1).max(200).optional().default(50),
});

export async function GET(req: Request) {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  let q: z.infer<typeof QuerySchema>;
  try {
    q = QuerySchema.parse({
      eventName: url.searchParams.get("event_name") || "",
      status: url.searchParams.get("status") || "",
      from: url.searchParams.get("from") || "",
      to: url.searchParams.get("to") || "",
      take: url.searchParams.get("take") || undefined,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid query" }, { status: 400 });
  }

  const createdAt: { gte?: Date; lte?: Date } = {};
  if (q.from) {
    const d = new Date(q.from);
    if (!Number.isNaN(d.getTime())) createdAt.gte = d;
  }
  if (q.to) {
    const d = new Date(q.to);
    if (!Number.isNaN(d.getTime())) createdAt.lte = d;
  }

  const where: any = {};
  if (q.eventName) where.eventName = q.eventName;
  if (q.status) where.status = q.status;
  if (createdAt.gte || createdAt.lte) where.createdAt = createdAt;

  const [events, eventNames] = await Promise.all([
    prisma.automationEvent.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: q.take,
    }),
    prisma.automationEvent.findMany({
      distinct: ["eventName"],
      select: { eventName: true },
      orderBy: { eventName: "asc" },
    }),
  ]);

  return NextResponse.json(
    {
      ok: true,
      events: events.map((e) => ({
        id: e.id,
        eventName: e.eventName,
        entityType: e.entityType,
        entityId: e.entityId,
        status: e.status,
        payload: e.payload,
        createdAt: e.createdAt.toISOString(),
      })),
      eventNames: eventNames.map((x) => x.eventName),
    },
    { status: 200 }
  );
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/admin/session";
import type { Prisma } from "@prisma/client";

function parseJsonOrThrow(v: unknown): Prisma.InputJsonValue {
  return v as Prisma.InputJsonValue;
}

const ParamsSchema = z.object({
  id: z.string().min(1),
});

const EmptyToUndefined = z.preprocess((v) => {
  if (typeof v === "string" && v.trim() === "") return undefined;
  return v;
}, z.string().optional());

const JsonOrUndefined = z.preprocess((v) => {
  if (v === null) return undefined;
  if (typeof v === "string" && v.trim() === "") return undefined;
  return v;
}, z.unknown().optional());

const PatchSchema = z
  .object({
    goal: EmptyToUndefined,
    businessType: EmptyToUndefined,
    industry: EmptyToUndefined,
    teamSize: EmptyToUndefined,
    revenueRange: EmptyToUndefined,
    offer: EmptyToUndefined,
    avgTicketRange: EmptyToUndefined,
    monthlyLeadsRange: EmptyToUndefined,

    painPoints: JsonOrUndefined,
    biggestBottleneck: EmptyToUndefined,
    toolsUsed: JsonOrUndefined,
    targetMarket: EmptyToUndefined,

    name: EmptyToUndefined,
    email: EmptyToUndefined,
    company: EmptyToUndefined,
    whatsapp: EmptyToUndefined,

    proposalJson: JsonOrUndefined,
    pdfPath: EmptyToUndefined,
    status: z.enum(["RECEIVED", "GENERATED", "FAILED"]).optional(),
    attemptCount: z.coerce.number().int().min(0).optional(),
    lastError: EmptyToUndefined,
  })
  .strict();

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const paramsRaw = await ctx.params;

  let params: z.infer<typeof ParamsSchema>;
  try {
    params = ParamsSchema.parse(paramsRaw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  const item = await prisma.auditSubmission.findUnique({ where: { id: params.id } });
  if (!item) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      ok: true,
      item: {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      },
    },
    { status: 200 }
  );
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const paramsRaw = await ctx.params;

  let params: z.infer<typeof ParamsSchema>;
  try {
    params = ParamsSchema.parse(paramsRaw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  let parsed: z.infer<typeof PatchSchema>;
  try {
    parsed = PatchSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const data: Prisma.AuditSubmissionUpdateInput = {};

  if (parsed.goal !== undefined) data.goal = parsed.goal;
  if (parsed.businessType !== undefined) data.businessType = parsed.businessType;
  if (parsed.industry !== undefined) data.industry = parsed.industry;
  if (parsed.teamSize !== undefined) data.teamSize = parsed.teamSize;
  if (parsed.revenueRange !== undefined) data.revenueRange = parsed.revenueRange;
  if (parsed.offer !== undefined) data.offer = parsed.offer;
  if (parsed.avgTicketRange !== undefined) data.avgTicketRange = parsed.avgTicketRange;
  if (parsed.monthlyLeadsRange !== undefined) data.monthlyLeadsRange = parsed.monthlyLeadsRange;

  if (parsed.painPoints !== undefined) data.painPoints = parseJsonOrThrow(parsed.painPoints);
  if (parsed.biggestBottleneck !== undefined) data.biggestBottleneck = parsed.biggestBottleneck;
  if (parsed.toolsUsed !== undefined) data.toolsUsed = parseJsonOrThrow(parsed.toolsUsed);
  if (parsed.targetMarket !== undefined) data.targetMarket = parsed.targetMarket;

  if (parsed.name !== undefined) data.name = parsed.name;
  if (parsed.email !== undefined) data.email = parsed.email;
  if (parsed.company !== undefined) data.company = parsed.company;
  if (parsed.whatsapp !== undefined) data.whatsapp = parsed.whatsapp;

  if (parsed.proposalJson !== undefined) data.proposalJson = parseJsonOrThrow(parsed.proposalJson);
  if (parsed.pdfPath !== undefined) data.pdfPath = parsed.pdfPath;
  if (parsed.status !== undefined) data.status = parsed.status;
  if (parsed.attemptCount !== undefined) data.attemptCount = parsed.attemptCount;
  if (parsed.lastError !== undefined) data.lastError = parsed.lastError;

  const updated = await prisma.auditSubmission.update({ where: { id: params.id }, data });

  return NextResponse.json(
    {
      ok: true,
      item: {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    },
    { status: 200 }
  );
}

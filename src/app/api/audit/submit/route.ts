import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { postToWebhook } from "@/lib/webhook";
import { generateAuditPdf } from "@/lib/audit/generate";

const BodySchema = z.object({
  pageUrl: z.string().optional().default(""),
  utm: z.record(z.string(), z.string()).optional().default({}),
  consent: z.boolean().default(false),

  goal: z.string().min(1),
  businessType: z.string().min(1),
  industry: z.string().min(1),
  teamSize: z.string().min(1),
  revenueRange: z.string().min(1),
  offer: z.string().optional(),
  avgTicketRange: z.string().optional(),
  monthlyLeadsRange: z.string().optional(),

  painPoints: z.array(z.string()).min(1),
  biggestBottleneck: z.string().optional(),
  toolsUsed: z.array(z.string()).optional(),
  targetMarket: z.string().optional(),

  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  whatsapp: z.string().optional(),
});

export async function POST(req: Request) {
  let parsed: z.infer<typeof BodySchema>;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const submission = await prisma.auditSubmission.create({
    data: {
      goal: parsed.goal,
      businessType: parsed.businessType,
      industry: parsed.industry,
      teamSize: parsed.teamSize,
      revenueRange: parsed.revenueRange,
      offer: parsed.offer || null,
      avgTicketRange: parsed.avgTicketRange || null,
      monthlyLeadsRange: parsed.monthlyLeadsRange || null,
      painPoints: parsed.painPoints,
      biggestBottleneck: parsed.biggestBottleneck || null,
      toolsUsed: parsed.toolsUsed && parsed.toolsUsed.length ? parsed.toolsUsed : undefined,
      targetMarket: parsed.targetMarket || null,
      name: parsed.name,
      email: parsed.email,
      company: parsed.company,
      whatsapp: parsed.whatsapp || null,
      status: "RECEIVED",
    },
    select: { id: true, createdAt: true },
  });

  // Preserve current automation: forward to existing webhook pipeline server-side.
  // IMPORTANT: do not log PII.
  postToWebhook({
    form_name: "audit_blueprint",
    timestamp: submission.createdAt.toISOString(),
    page_url: parsed.pageUrl,
    utm: parsed.utm,
    fields: {
      goal: parsed.goal,
      business_type: parsed.businessType,
      industry: parsed.industry,
      team_size: parsed.teamSize,
      revenue_range: parsed.revenueRange,
      offer: parsed.offer,
      avg_ticket_range: parsed.avgTicketRange,
      monthly_leads_range: parsed.monthlyLeadsRange,
      pain_points: parsed.painPoints,
      biggest_bottleneck: parsed.biggestBottleneck,
      tools_used: parsed.toolsUsed,
      target_market: parsed.targetMarket,
      name: parsed.name,
      email: parsed.email,
      company: parsed.company,
      whatsapp: parsed.whatsapp,
    },
    consent: parsed.consent,
  }).catch(() => {
    return;
  });

  // Trigger generation asynchronously. Errors are persisted to DB (status/lastError).
  void generateAuditPdf(submission.id).catch(() => {
    return;
  });

  return NextResponse.json({ ok: true, auditId: submission.id }, { status: 201 });
}

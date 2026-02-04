import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/admin/session";
import { generateProposalPack } from "@/lib/audit/openai";

const ParamsSchema = z.object({
  id: z.string().min(1),
});

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
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

  const submission = await prisma.auditSubmission.findUnique({ where: { id: params.id } });
  if (!submission) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  try {
    const proposal = await generateProposalPack({
      goal: submission.goal,
      businessType: submission.businessType,
      industry: submission.industry,
      teamSize: submission.teamSize,
      revenueRange: submission.revenueRange,
      offer: submission.offer,
      avgTicketRange: submission.avgTicketRange,
      monthlyLeadsRange: submission.monthlyLeadsRange,
      painPoints: (submission.painPoints as unknown as string[]) || [],
      biggestBottleneck: submission.biggestBottleneck,
      toolsUsed: (submission.toolsUsed as unknown as string[] | null) || null,
      targetMarket: submission.targetMarket,
      company: submission.company,
    });

    const updated = await prisma.auditSubmission.update({
      where: { id: submission.id },
      data: { proposalJson: proposal, lastError: null },
    });

    return NextResponse.json({ ok: true, proposalJson: updated.proposalJson }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error && err.message ? err.message : "Generation failed";
    await prisma.auditSubmission.update({
      where: { id: submission.id },
      data: { lastError: message, status: "FAILED" },
    });

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

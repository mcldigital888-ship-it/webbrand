import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateProposalPack } from "@/lib/audit/openai";
import AuditProposalPdf from "@/lib/audit/pdf";
import { allowRateLimit, getClientIp } from "@/lib/audit/rateLimit";
import { getAuditPdfPath, getAuditPdfDir } from "@/lib/audit/storage";
import { getAuditDownloadUrl } from "@/lib/audit/url";

const BodySchema = z.object({
  auditId: z.string().min(1),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);

  let parsed: z.infer<typeof BodySchema>;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const submission = await prisma.auditSubmission.findUnique({
    where: { id: parsed.auditId },
  });

  if (!submission) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const rateKey = `audit_generate:${ip}:${submission.id}`;
  const rateKeyGlobal = `audit_generate:${submission.id}`;
  if (!allowRateLimit({ key: rateKey, max: 10 }) || !allowRateLimit({ key: rateKeyGlobal, max: 40 })) {
    return NextResponse.json({ ok: false, error: "Rate limited" }, { status: 429 });
  }

  const fs = await import("node:fs/promises");

  const downloadUrl = getAuditDownloadUrl(submission.id);
  const filePath = submission.pdfPath || getAuditPdfPath(submission.id);

  const fileExists = async (p: string) => {
    try {
      await fs.access(p);
      return true;
    } catch {
      return false;
    }
  };

  // Idempotent: already generated, file exists.
  if (submission.status === "GENERATED" && submission.pdfPath) {
    if (await fileExists(submission.pdfPath)) {
      return NextResponse.json({ ok: true, pdfUrl: downloadUrl }, { status: 200 });
    }
    // If status says generated but file is missing, fall through and try to re-render.
  }

  // If we already have proposalJson but no file yet, skip OpenAI and just render.
  const proposalFromDb = submission.proposalJson as unknown;

  try {
    await prisma.auditSubmission.update({
      where: { id: submission.id },
      data: {
        attemptCount: { increment: 1 },
        lastError: null,
        status: submission.status === "FAILED" ? "RECEIVED" : submission.status,
      },
    });

    const proposal =
      submission.proposalJson ? (proposalFromDb as any)
        : await generateProposalPack({
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

    const { renderToBuffer } = await import("@react-pdf/renderer");
    const path = await import("node:path");

    const pdfBuffer = await renderToBuffer(
      AuditProposalPdf({
        auditId: submission.id,
        company: submission.company,
        createdAt: submission.createdAt.toISOString().slice(0, 10),
        proposal,
      })
    );

    await fs.mkdir(getAuditPdfDir(), { recursive: true });
    const normalizedPath = path.resolve(filePath);
    await fs.writeFile(normalizedPath, pdfBuffer);

    await prisma.auditSubmission.update({
      where: { id: submission.id },
      data: {
        proposalJson: proposal,
        pdfPath: normalizedPath,
        status: "GENERATED",
        lastError: null,
      },
    });

    return NextResponse.json({ ok: true, pdfUrl: downloadUrl }, { status: 200 });
  } catch {
    await prisma.auditSubmission.update({
      where: { id: submission.id },
      data: { status: "FAILED", lastError: "Generation failed" },
    });

    return NextResponse.json({ ok: false, error: "Generation failed" }, { status: 500 });
  }
}

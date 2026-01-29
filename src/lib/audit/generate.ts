import { prisma } from "@/lib/db";
import { generateProposalPack } from "@/lib/audit/openai";
import AuditProposalPdf from "@/lib/audit/pdf";
import { getAuditPdfDir, getAuditPdfPath } from "@/lib/audit/storage";
import { getAuditDownloadUrl } from "@/lib/audit/url";

export async function generateAuditPdf(auditId: string) {
  const submission = await prisma.auditSubmission.findUnique({ where: { id: auditId } });
  if (!submission) {
    throw new Error("Not found");
  }

  const fs = await import("node:fs/promises");
  const path = await import("node:path");

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

  if (submission.status === "GENERATED" && submission.pdfPath) {
    if (await fileExists(submission.pdfPath)) {
      return { pdfUrl: downloadUrl };
    }
  }

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

    const proposal = submission.proposalJson
      ? (proposalFromDb as any)
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

    return { pdfUrl: downloadUrl };
  } catch (err) {
    const message = err instanceof Error && err.message ? err.message : "Generation failed";

    await prisma.auditSubmission.update({
      where: { id: submission.id },
      data: { status: "FAILED", lastError: message },
    });

    throw new Error(message);
  }
}

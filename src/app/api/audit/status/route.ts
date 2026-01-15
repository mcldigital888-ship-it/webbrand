import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAuditDownloadUrl } from "@/lib/audit/storage";

const QuerySchema = z.object({
  auditId: z.string().min(1),
});

export async function GET(req: Request) {
  const url = new URL(req.url);

  let parsed: z.infer<typeof QuerySchema>;
  try {
    parsed = QuerySchema.parse({ auditId: url.searchParams.get("auditId") || "" });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid auditId" }, { status: 400 });
  }

  const submission = await prisma.auditSubmission.findUnique({
    where: { id: parsed.auditId },
    select: { status: true, pdfPath: true, lastError: true },
  });

  if (!submission) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      ok: true,
      status: submission.status,
      pdfUrl: submission.status === "GENERATED" && submission.pdfPath ? getAuditDownloadUrl(parsed.auditId) : null,
      error: submission.lastError || null,
    },
    { status: 200 }
  );
}

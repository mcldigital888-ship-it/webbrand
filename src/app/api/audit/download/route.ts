import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { allowRateLimit, getClientIp } from "@/lib/audit/rateLimit";

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

  const ip = getClientIp(req);
  const key = `audit_download:${ip}:${parsed.auditId}`;
  const keyGlobal = `audit_download:${parsed.auditId}`;
  if (!allowRateLimit({ key, max: 20 }) || !allowRateLimit({ key: keyGlobal, max: 80 })) {
    return NextResponse.json({ ok: false, error: "Rate limited" }, { status: 429 });
  }

  const submission = await prisma.auditSubmission.findUnique({
    where: { id: parsed.auditId },
    select: { pdfPath: true, status: true },
  });

  if (!submission) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  if (submission.status !== "GENERATED" || !submission.pdfPath) {
    return NextResponse.json({ ok: false, error: "Not ready" }, { status: 409 });
  }

  const fs = await import("node:fs/promises");
  const { createReadStream } = await import("node:fs");

  try {
    await fs.access(submission.pdfPath);
  } catch {
    return NextResponse.json({ ok: false, error: "File missing" }, { status: 404 });
  }

  const stream = createReadStream(submission.pdfPath);

  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=webrrand-audit-${parsed.auditId}.pdf`,
      "Cache-Control": "no-store",
    },
  });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { allowRateLimit, getClientIp } from "@/lib/audit/rateLimit";
import { generateAuditPdf } from "@/lib/audit/generate";

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

  try {
    const { pdfUrl } = await generateAuditPdf(submission.id);
    return NextResponse.json({ ok: true, pdfUrl }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error && err.message ? err.message : "Generation failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

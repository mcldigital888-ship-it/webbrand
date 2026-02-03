import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin/session";
import { generateAuditPdf } from "@/lib/audit/generate";

const ParamsSchema = z.object({
  id: z.string().min(1),
});

const BodySchema = z
  .object({
    force: z.boolean().optional(),
  })
  .optional();

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
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

  let body: z.infer<typeof BodySchema>;
  try {
    const raw = await req.json().catch(() => undefined);
    body = BodySchema.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  try {
    const { pdfUrl } = await generateAuditPdf(params.id, { force: body?.force });
    return NextResponse.json({ ok: true, pdfUrl }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error && err.message ? err.message : "Generation failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin/session";
import { ProposalSchema } from "@/lib/audit/proposalSchema";

const ParamsSchema = z.object({
  id: z.string().min(1),
});

const BodySchema = z.object({
  proposalJson: z.unknown(),
});

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
    body = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const parsed = ProposalSchema.safeParse(body.proposalJson);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
    }));

    return NextResponse.json(
      { ok: false, error: "Invalid proposalJson", issues, auditId: params.id },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true, auditId: params.id }, { status: 200 });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/admin/session";

const QuerySchema = z.object({
  email: z.string().optional().default(""),
  status: z.string().optional().default(""),
  page: z.coerce.number().int().min(1).optional().default(1),
});

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);

  let q: z.infer<typeof QuerySchema>;
  try {
    q = QuerySchema.parse({
      email: url.searchParams.get("email") || "",
      status: url.searchParams.get("status") || "",
      page: url.searchParams.get("page") || undefined,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid query" }, { status: 400 });
  }

  const pageSize = 20;
  const skip = (q.page - 1) * pageSize;

  const where: any = {};
  if (q.email) where.email = { contains: q.email, mode: "insensitive" };
  if (q.status) where.status = q.status;

  const [total, items] = await Promise.all([
    prisma.auditSubmission.count({ where }),
    prisma.auditSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        createdAt: true,
        name: true,
        email: true,
        company: true,
        businessType: true,
        industry: true,
        status: true,
        pdfPath: true,
        attemptCount: true,
        lastError: true,
      },
    }),
  ]);

  return NextResponse.json(
    {
      ok: true,
      items: items.map((it) => ({
        ...it,
        createdAt: it.createdAt.toISOString(),
      })),
      total,
      page: q.page,
      pageSize,
    },
    { status: 200 }
  );
}

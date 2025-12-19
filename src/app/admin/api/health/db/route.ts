import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCrmSession } from "@/lib/crm/session";

export async function POST() {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const [leadCount, userCount] = await Promise.all([
      prisma.lead.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json(
      { ok: true, leadCount, userCount },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "DB error" }, { status: 500 });
  }
}

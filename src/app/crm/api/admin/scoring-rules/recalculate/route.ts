import { NextResponse } from "next/server";
import { getCrmSession } from "@/lib/crm/session";
import { recalcAllLeadScores } from "@/lib/crm/scoring";

export async function POST() {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const result = await recalcAllLeadScores({ changedBy: session.userId });
  return NextResponse.json({ ok: true, ...result }, { status: 200 });
}

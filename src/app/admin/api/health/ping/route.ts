import { NextResponse } from "next/server";
import { getCrmSession } from "@/lib/crm/session";

export async function POST() {
  const session = await getCrmSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json({ ok: true, now: new Date().toISOString() }, { status: 200 });
}

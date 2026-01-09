import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/admin/session";

export async function POST(req: Request) {
  await clearAdminSession();

  const accept = req.headers.get("accept") || "";
  if (accept.includes("application/json")) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const url = new URL(req.url);
  return NextResponse.redirect(new URL("/admin", url.origin));
}

import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/admin/session";

export async function POST(req: Request) {
  try {
    const user = process.env.ADMIN_USER;
    const pass = process.env.ADMIN_PASS;

    if (!user || !pass) {
      return NextResponse.json(
        { ok: false, error: "Admin credentials are not configured." },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => null)) as
      | { email?: string; password?: string }
      | null;

    const email = (body?.email || "").trim();
    const password = body?.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Missing credentials." },
        { status: 400 }
      );
    }

    const ok = email === user && password === pass;
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    await setAdminSession({ role: "admin", user: email });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Admin login failed.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

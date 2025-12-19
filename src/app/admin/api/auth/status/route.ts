import { NextResponse } from "next/server";
import { getCrmSession } from "@/lib/crm/session";

export async function GET() {
  const session = await getCrmSession();

  if (!session) {
    return NextResponse.json(
      { ok: true, show: true, href: "/admin/login", label: "Admin Login" },
      { status: 200 }
    );
  }

  if (session.role !== "admin") {
    return NextResponse.json({ ok: true, show: false }, { status: 200 });
  }

  return NextResponse.json(
    { ok: true, show: true, href: "/admin", label: "Admin Panel" },
    { status: 200 }
  );
}

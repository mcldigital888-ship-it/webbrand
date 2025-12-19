import { NextResponse } from "next/server";
import { clearCrmSession } from "@/lib/crm/session";

export async function POST(req: Request) {
  await clearCrmSession();
  const url = new URL(req.url);
  return NextResponse.redirect(new URL("/admin/login", url.origin));
}

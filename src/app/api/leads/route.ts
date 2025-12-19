import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error:
        "This project is configured as a webhook-only integration hub. This API route is disabled.",
    },
    { status: 410 }
  );
}

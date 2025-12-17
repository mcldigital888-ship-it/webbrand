import { NextResponse } from "next/server";

function env(name: string) {
  const v = process.env[name];
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : null;
}

async function hubspotRequest<T>(token: string, path: string): Promise<T> {
  const res = await fetch(`https://api.hubapi.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HubSpot ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function GET(req: Request) {
  const token = env("HUBSPOT_PRIVATE_APP_TOKEN");
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Missing HUBSPOT_PRIVATE_APP_TOKEN" },
      { status: 400 }
    );
  }

  const adminKey = env("INTERNAL_ADMIN_KEY");
  if (adminKey) {
    const provided = req.headers.get("x-admin-key");
    if (provided !== adminKey) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  try {
    const pipelines = await hubspotRequest<unknown>(
      token,
      "/crm/v3/pipelines/deals"
    );

    return NextResponse.json({ ok: true, pipelines }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Failed" },
      { status: 500 }
    );
  }
}

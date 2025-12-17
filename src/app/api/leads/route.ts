import { NextResponse } from "next/server";

type LeadPayload = {
  source: "oracolo" | "contact";
  businessType: string;
  goal: string;
  email: string;
  answers: Record<string, unknown>;
  timestamp: string;
};

type HubSpotResult =
  | { ok: true; contactId?: string; dealId?: string }
  | { ok: false; error: string };

type EmailResult = { ok: true } | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function env(name: string) {
  const v = process.env[name];
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : null;
}

function integrationsEnabled() {
  return env("INTEGRATIONS_ENABLED") === "true";
}

async function sendResendEmail({
  apiKey,
  from,
  to,
  subject,
  text,
}: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${msg || res.statusText}`);
  }
}

function leadSummaryText(lead: LeadPayload) {
  const lines = [
    `source: ${lead.source}`,
    `email: ${lead.email}`,
    `businessType: ${lead.businessType || "-"}`,
    `goal: ${lead.goal || "-"}`,
    `timestamp: ${lead.timestamp}`,
    `answers: ${JSON.stringify(lead.answers, null, 2)}`,
  ];
  return lines.join("\n");
}

async function sendEmails(lead: LeadPayload): Promise<EmailResult> {
  if (!integrationsEnabled()) return { ok: true };
  const apiKey = env("RESEND_API_KEY");
  const from = env("EMAIL_FROM");
  const adminTo = env("EMAIL_ADMIN_TO");

  if (!apiKey || !from || !adminTo) return { ok: true };

  try {
    const adminSubject =
      lead.source === "oracolo"
        ? "New lead (Oracolo) / Nuovo lead (Oracolo)"
        : "New lead (Contact) / Nuovo lead (Contatto)";

    const adminText =
      "New lead received / Nuovo lead ricevuto\n\n" + leadSummaryText(lead);

    await sendResendEmail({
      apiKey,
      from,
      to: adminTo,
      subject: adminSubject,
      text: adminText,
    });

    const userSubject = "We received your brief / Abbiamo ricevuto il tuo brief";
    const userText =
      "Thanks — we received your brief. We will reply within 24h.\n" +
      "Grazie — abbiamo ricevuto il tuo brief. Ti risponderemo entro 24 ore.\n\n" +
      "Summary / Riepilogo:\n" +
      leadSummaryText(lead);

    await sendResendEmail({
      apiKey,
      from,
      to: lead.email,
      subject: userSubject,
      text: userText,
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Email failed" };
  }
}

async function hubspotRequest<T>(
  token: string,
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`https://api.hubapi.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HubSpot ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

function mapDealStage({
  source,
}: {
  source: LeadPayload["source"];
}): { pipelineId: string | null; stageId: string | null } {
  const pipelineId = env("HUBSPOT_PIPELINE_ID");

  const stageNew = env("HUBSPOT_STAGE_NEW");
  const stageQualified = env("HUBSPOT_STAGE_QUALIFIED");
  const stageDiscoveryCall = env("HUBSPOT_STAGE_DISCOVERY_CALL");

  if (source === "oracolo") {
    return { pipelineId, stageId: stageDiscoveryCall || stageQualified || stageNew };
  }

  return { pipelineId, stageId: stageNew || stageQualified || stageDiscoveryCall };
}

async function sendToHubSpot(lead: LeadPayload): Promise<HubSpotResult> {
  if (!integrationsEnabled()) return { ok: true };
  const token = env("HUBSPOT_PRIVATE_APP_TOKEN");
  if (!token) return { ok: true };

  try {
    const contactProps: Record<string, string> = {
      email: lead.email,
    };

    const fullName =
      typeof lead.answers.fullName === "string" ? lead.answers.fullName.trim() : "";
    if (fullName) contactProps.firstname = fullName.split(" ")[0] || fullName;

    const company =
      typeof lead.answers.company === "string" ? lead.answers.company.trim() : "";
    if (company) contactProps.company = company;

    const website =
      typeof lead.answers.website === "string" ? lead.answers.website.trim() : "";
    if (website) contactProps.website = website;

    const sourceProperty = env("HUBSPOT_SOURCE_PROPERTY");
    if (sourceProperty) contactProps[sourceProperty] = lead.source;

    const goalProperty = env("HUBSPOT_GOAL_PROPERTY");
    if (goalProperty && lead.goal) contactProps[goalProperty] = lead.goal;

    const businessTypeProperty = env("HUBSPOT_BUSINESS_TYPE_PROPERTY");
    if (businessTypeProperty && lead.businessType)
      contactProps[businessTypeProperty] = lead.businessType;

    const leadScoreProperty = env("HUBSPOT_LEAD_SCORE_PROPERTY");
    if (leadScoreProperty && lead.source === "oracolo") {
      contactProps[leadScoreProperty] = env("HUBSPOT_ORACOLO_LEAD_SCORE") || "high";
    }

    const contactSearch = await hubspotRequest<{
      total: number;
      results: Array<{ id: string }>;
    }>(token, "/crm/v3/objects/contacts/search", {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: lead.email,
              },
            ],
          },
        ],
        limit: 1,
      }),
    });

    const existingContactId = contactSearch.results[0]?.id;

    const contactId = existingContactId
      ? existingContactId
      : (
          await hubspotRequest<{ id: string }>(
            token,
            "/crm/v3/objects/contacts",
            {
              method: "POST",
              body: JSON.stringify({ properties: { email: lead.email } }),
            }
          )
        ).id;

    await hubspotRequest<unknown>(token, `/crm/v3/objects/contacts/${contactId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties: contactProps }),
    });

    const { pipelineId, stageId } = mapDealStage({ source: lead.source });
    const shouldCreateDeal = env("HUBSPOT_CREATE_DEAL") !== "false";

    if (!shouldCreateDeal || !pipelineId || !stageId) {
      return { ok: true, contactId };
    }

    const dealName =
      env("HUBSPOT_DEAL_NAME") ||
      `${lead.source.toUpperCase()} lead - ${lead.email}`;

    const dealProps: Record<string, string> = {
      dealname: dealName,
      pipeline: pipelineId,
      dealstage: stageId,
    };

    const dealCreate = await hubspotRequest<{ id: string }>(
      token,
      "/crm/v3/objects/deals",
      {
        method: "POST",
        body: JSON.stringify({ properties: dealProps }),
      }
    );

    await hubspotRequest<unknown>(
      token,
      `/crm/v3/objects/deals/${dealCreate.id}/associations/contacts/${contactId}/deal_to_contact`,
      { method: "PUT" }
    );

    return { ok: true, contactId, dealId: dealCreate.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "HubSpot integration failed",
    };
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }

  const payload = body as Partial<LeadPayload>;

  if (payload.source !== "oracolo" && payload.source !== "contact") {
    return NextResponse.json(
      { ok: false, error: "Invalid source" },
      { status: 400 }
    );
  }

  if (typeof payload.email !== "string" || payload.email.trim().length === 0) {
    return NextResponse.json(
      { ok: false, error: "Email is required" },
      { status: 400 }
    );
  }

  if (!payload.timestamp || typeof payload.timestamp !== "string") {
    return NextResponse.json(
      { ok: false, error: "Timestamp is required" },
      { status: 400 }
    );
  }

  if (!payload.answers || !isRecord(payload.answers)) {
    return NextResponse.json(
      { ok: false, error: "Answers must be an object" },
      { status: 400 }
    );
  }

  const lead: LeadPayload = {
    source: payload.source,
    businessType: typeof payload.businessType === "string" ? payload.businessType : "",
    goal: typeof payload.goal === "string" ? payload.goal : "",
    email: payload.email.trim(),
    answers: payload.answers,
    timestamp: payload.timestamp,
  };

  const id = globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  console.log("[lead]", { id, ...lead });

  const hubspot = await sendToHubSpot(lead);
  if (!hubspot.ok) {
    console.error("[hubspot]", hubspot.error);
  }

  const email = await sendEmails(lead);
  if (!email.ok) {
    console.error("[email]", email.error);
  }

  return NextResponse.json(
    {
      ok: true,
      id,
      hubspot: hubspot.ok
        ? { ok: true, contactId: hubspot.contactId, dealId: hubspot.dealId }
        : { ok: false, error: hubspot.error },
      email: email.ok ? { ok: true } : { ok: false, error: email.error },
    },
    { status: 201 }
  );
}

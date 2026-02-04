import type { ProposalPack } from "@/lib/audit/proposal";
import { ProposalSchema } from "@/lib/audit/proposalSchema";

type AuditAnswers = {
  goal: string;
  businessType: string;
  industry: string;
  teamSize: string;
  revenueRange: string;
  offer?: string | null;
  avgTicketRange?: string | null;
  monthlyLeadsRange?: string | null;
  painPoints: string[];
  biggestBottleneck?: string | null;
  toolsUsed?: string[] | null;
  targetMarket?: string | null;
  company: string;
};

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function fetchOpenAiWithRetry(input: AuditAnswers) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const payload = {
    model: "gpt-4o-mini",
    temperature: 0.2,
    response_format: { type: "json_object" as const },
    messages: [
      { role: "system" as const, content: "Return only valid JSON. No markdown." },
      { role: "user" as const, content: buildPrompt(input) },
    ],
  };

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) return res;

    const status = res.status;
    const retryable = status === 429 || (status >= 500 && status <= 599);

    let detail = "";
    try {
      const j = (await res.json().catch(() => null)) as any;
      const msg = j?.error?.message;
      const code = j?.error?.code;
      detail = msg ? ` (${code ? `${code}: ` : ""}${msg})` : "";
    } catch {
      detail = "";
    }

    if (!retryable || attempt === maxAttempts) {
      throw new Error(`OpenAI error: ${status}${detail}`);
    }

    const backoffMs = 800 * Math.pow(2, attempt - 1);
    await sleep(backoffMs);
  }

  throw new Error("OpenAI error: retry exhausted");
}

function buildPrompt(input: AuditAnswers) {
  return [
    "You are WEBRRAND. You build revenue systems (not websites).",
    "Generate a concrete, outcome-driven Revenue System Blueprint proposal pack.",
    "Avoid buzzwords. Be specific. Include KPIs, deliverables, and a realistic timeline.",
    "Do NOT include any personal data such as email or phone in the output.",
    "Include at least 5 quick wins for the first 7 days.",
    "For each offer option, include KPI impact (leads, conversion, sales, ops).",
    "Output MUST be valid JSON only. No markdown. No extra keys.",
    "",
    "Audit answers:",
    JSON.stringify(input),
  ].join("\n");
}

export async function generateProposalPack(input: AuditAnswers): Promise<ProposalPack> {
  const res = await fetchOpenAiWithRetry(input);

  const data = (await res.json().catch(() => null)) as
    | {
        choices?: Array<{ message?: { content?: string } }>;
      }
    | null;

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned empty content");
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(content);
  } catch {
    throw new Error("OpenAI response was not valid JSON");
  }

  return ProposalSchema.parse(parsedJson);
}

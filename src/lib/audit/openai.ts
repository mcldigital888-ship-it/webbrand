import { z } from "zod";
import type { ProposalPack } from "@/lib/audit/proposal";

const ProposalSchema: z.ZodType<ProposalPack> = z.object({
  summary: z.object({
    oneLiner: z.string().min(1),
    coreProblem: z.string().min(1),
    primaryGoal: z.string().min(1),
    expectedImpact: z.object({
      leads: z.string().min(1),
      conversion: z.string().min(1),
      sales: z.string().min(1),
      ops: z.string().min(1),
    }),
  }),
  currentState: z.object({
    assumptions: z.array(z.string().min(1)).default([]),
    risks: z.array(z.string().min(1)).default([]),
    quickWins: z.array(z.string().min(1)).min(5),
  }),
  blueprint: z.object({
    systemFlow: z.tuple([
      z.literal("Traffic"),
      z.literal("Landing"),
      z.literal("CRM"),
      z.literal("Automation"),
      z.literal("Sales"),
      z.literal("Dashboard"),
    ]),
    recommendedModules: z.array(
      z.object({
        module: z.enum(["WEB", "MARKETING", "CRM", "AI", "INTEGRATIONS"]),
        why: z.string().min(1),
        deliverables: z.array(z.string().min(1)).min(1),
        kpis: z.array(z.string().min(1)).min(1),
      })
    ),
    timeline: z.array(
      z.object({
        phase: z.enum(["Diagnose", "Build", "Scale"]),
        duration: z.string().min(1),
        deliverables: z.array(z.string().min(1)).min(1),
      })
    ),
  }),
  kpiPlan: z.object({
    northStar: z.string().min(1),
    metrics: z.array(
      z.object({
        name: z.string().min(1),
        definition: z.string().min(1),
        target: z.string().min(1),
      })
    ),
  }),
  offer: z.object({
    recommendedPackage: z.enum([
      "Lead Generation",
      "Website Conversion",
      "Sales System",
      "AI Operations",
      "Smart Retail",
      "Full System",
    ]),
    scope: z.array(z.string().min(1)).min(1),
    options: z.array(
      z.object({
        name: z.string().min(1),
        adds: z.array(z.string().min(1)).min(1),
        impact: z.object({
          leads: z.string().min(1),
          conversion: z.string().min(1),
          sales: z.string().min(1),
          ops: z.string().min(1),
        }),
      })
    ),
    pricingNote: z.string().min(1),
  }),
  nextSteps: z.object({
    actions: z.array(z.string().min(1)).min(1),
    callToAction: z.string().min(1),
  }),
});

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
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Return only valid JSON. No markdown." },
        { role: "user", content: buildPrompt(input) },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI error: ${res.status}`);
  }

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

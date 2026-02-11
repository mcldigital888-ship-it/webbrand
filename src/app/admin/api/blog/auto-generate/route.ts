import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin/session";

const BodySchema = z.object({
  topic: z.string().min(2).max(200),
  audience: z.string().min(2).max(200),
  primaryKeyword: z.string().min(2).max(120),
  secondaryKeywords: z.string().max(400).optional().default(""),
  language: z.enum(["en", "it"]).default("en"),
  tone: z.enum(["professional", "friendly", "direct"]).default("direct"),
  length: z.enum(["short", "medium", "long"]).default("medium"),
  includeCta: z.boolean().default(true),
});

type Input = z.infer<typeof BodySchema>;

type Generated = {
  title: string;
  metaDescription: string;
  outline: string;
  markdown: string;
};

const GeneratedSchema = z.object({
  title: z.string().min(3).max(140),
  metaDescription: z.string().min(40).max(220),
  outline: z.string().min(20),
  markdown: z.string().min(200),
});

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function buildPrompt(input: Input) {
  const secondary = input.secondaryKeywords?.trim();
  const includeCta = input.includeCta ? "YES" : "NO";

  return [
    "You are an expert marketing copywriter for WEBRRAND.",
    "Write a high-quality blog post about a marketing service topic.",
    "Do NOT include any personal data such as email or phone.",
    "Use clear, specific language. Avoid fluff.",
    "Output MUST be valid JSON only. No markdown. No extra keys.",
    "JSON shape:",
    JSON.stringify({
      title: "...",
      metaDescription: "...",
      outline: "...",
      markdown: "...",
    }),
    "Constraints:",
    `Language: ${input.language}`,
    `Tone: ${input.tone}`,
    `Length: ${input.length}`,
    `Include CTA section at the end: ${includeCta}`,
    "Inputs:",
    `Topic: ${input.topic}`,
    `Audience: ${input.audience}`,
    `Primary keyword: ${input.primaryKeyword}`,
    `Secondary keywords: ${secondary && secondary.length > 0 ? secondary : "(none)"}`,
    "Markdown rules:",
    "- Use one H1 title",
    "- Use H2 sections, and optional H3 subsections",
    "- Add bullet lists where helpful",
    "- Keep paragraphs short",
    "- Include a short FAQ section if length is medium/long",
  ].join("\n");
}

async function fetchOpenAiJson(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const payload = {
    model: "gpt-4o-mini",
    temperature: 0.4,
    response_format: { type: "json_object" as const },
    messages: [
      { role: "system" as const, content: "Return only valid JSON. No markdown." },
      { role: "user" as const, content: prompt },
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

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  let input: Input;
  try {
    input = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  try {
    const prompt = buildPrompt(input);
    const res = await fetchOpenAiJson(prompt);

    const data = (await res.json().catch(() => null)) as any;
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ ok: false, error: "OpenAI returned empty content" }, { status: 502 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json({ ok: false, error: "OpenAI response was not valid JSON" }, { status: 502 });
    }

    const gen: Generated = GeneratedSchema.parse(parsed);

    const baseSlug = slugify(gen.title);
    const suffix = Math.random().toString(36).slice(2, 8);
    const slug = `${baseSlug.length > 0 ? baseSlug : slugify(`${input.primaryKeyword}-${Date.now()}`)}-${suffix}`;

    return NextResponse.json(
      {
        ok: true,
        content: {
          title: gen.title,
          slug,
          metaDescription: gen.metaDescription,
          outline: gen.outline,
          markdown: gen.markdown,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error && err.message ? err.message : "Generation failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

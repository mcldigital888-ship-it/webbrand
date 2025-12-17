import Link from "next/link";
import PageShell from "@/components/PageShell";

const sub = [
  { href: "/solutions/ai-automation/assistants", label: "Assistants" },
  { href: "/solutions/ai-automation/automations", label: "Automations" },
  { href: "/solutions/ai-automation/ai-apps", label: "AI Apps" },
];

export default function AiAutomationPage() {
  return (
    <PageShell
      kicker="AI & Automations"
      title="Less manual work. More output."
      subtitle={
        <>
          AI is only useful when it connects to your workflows. We deliver assistants,
          automations, and AI apps that drive measurable outcomes.
          <br />
          L’AI è utile solo quando si collega ai tuoi workflow. Forniamo assistant,
          automazioni e app AI con risultati misurabili.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request AI Demo / Richiedi Demo AI" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {sub.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-sm font-semibold text-[var(--color-navy)] hover:border-black/10"
          >
            {s.label}
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">
            Typical outcomes
          </div>
          <ul className="space-y-2 text-sm text-[var(--color-slate)]">
            <li className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
              <span>Faster support and operations</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
              <span>Automated lead qualification + routing</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
              <span>Reduced busywork across teams</span>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}

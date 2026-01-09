import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "AI & Technology",
  description:
    "Automation, AI workflows and internal tools to scale marketing efforts—built for speed and smarter decisions.",
  openGraph: {
    title: "AI & Technology | Webrrand",
    description:
      "Automation, AI workflows and internal tools to scale marketing efforts—built for speed and smarter decisions.",
    type: "website",
  },
};

const whatWeDo = [
  {
    en: "Audit of bottlenecks and repetitive tasks",
    it: "Audit di colli di bottiglia e task ripetitivi",
  },
  { en: "AI-assisted content workflows", it: "Workflow contenuti con AI" },
  { en: "Automation setup and routing", it: "Setup automazioni e routing" },
  { en: "Dashboards and reporting", it: "Dashboard e report" },
];

export default function AiServicePage() {
  return (
    <PageShell
      kicker="Services"
      title={<Bilingual en="AI & Technology" it="AI & tecnologia" />}
      subtitle={
        <Bilingual
          en="Speed up marketing with automation and smarter workflows."
          it="Accelera il marketing con automazione e workflow più intelligenti."
        />
      }
      primaryCta={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            <Bilingual en="What we do" it="Cosa facciamo" />
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
            {whatWeDo.map((b) => (
              <li key={b.en} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>
                  <Bilingual en={b.en} it={b.it} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            <Bilingual en="How it creates impact" it="Come crea impatto" />
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                <Bilingual en="Problem" it="Problema" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Manual work slows execution and hides signal."
                  it="Il lavoro manuale rallenta l’esecuzione e nasconde il segnale."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                <Bilingual en="Solution" it="Soluzione" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="We automate workflows, connect systems, and ship internal tools."
                  it="Automatizziamo workflow, colleghiamo sistemi e creiamo strumenti interni."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                <Bilingual en="Result" it="Risultato" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Faster cycles, cleaner reporting, and smarter decisions."
                  it="Cicli più rapidi, report più puliti e decisioni migliori."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              <Bilingual en="Related products" it="Prodotti correlati" />
            </h2>
            <p className="text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="Start with a productized setup for faster results."
                it="Inizia con un setup productized per risultati più rapidi."
              />
            </p>
          </div>
          <Link
            href="/services#ai-setup"
            className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
          >
            <Bilingual en="AI Marketing Setup →" it="Setup AI Marketing →" />
          </Link>
        </div>
      </section>

      <CTASection
        title={<Bilingual en="Ready to scale with AI?" it="Pronto a scalare con l’AI?" />}
        subtitle={
          <Bilingual
            en="We’ll identify quick wins, ship workflows, and measure the time saved."
            it="Identifichiamo quick win, implementiamo workflow e misuriamo il tempo risparmiato."
          />
        }
        primary={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
      />
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/content";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = caseStudies.find((x) => x.slug === params.slug);
  const title = c ? `${c.client} | Work | Webrrand` : "Work | Webrrand";
  const description = c
    ? `${c.oneLiner} Outcome: ${c.outcome}.`
    : "Case study.";

  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug);

  if (!c) {
    return (
      <div className="space-y-4">
        <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--ds-text)]">
          <Bilingual en="Case not found" it="Caso non trovato" />
        </h1>
        <Link className="text-sm font-semibold text-[var(--ds-accent)]" href="/work">
          <Bilingual en="Back to Work" it="Torna ai lavori" />
        </Link>
      </div>
    );
  }

  const index = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <div className="space-y-14">
      <header className="space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
          {c.client}
        </div>
        <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
          {c.outcome}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--color-slate)]">{c.oneLiner}</p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Challenge</div>
          <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">{c.challenge}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Solution</div>
          <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">{c.solution}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Result</div>
          <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">{c.result}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {c.images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)]"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center bg-white">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--color-cyan)]/15 blur-2xl" />
              <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[var(--color-blue)]/10 blur-2xl" />
              <div className="relative text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                {img.alt}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Tech stack</div>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-slate)]">
            {c.techStack.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Deliverables</div>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-slate)]">
            {c.deliverables.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title={<Bilingual en="Ready to build your next wave?" it="Pronto a costruire la tua prossima crescita?" />}
        subtitle={
          <Bilingual
            en="We’ll turn your goal into a clear plan—then ship the system."
            it="Trasformiamo l’obiettivo in un piano chiaro—poi realizziamo il sistema."
          />
        }
        primary={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
        secondary={{ href: "/work", label: <Bilingual en="Back to Work" it="Torna ai lavori" /> }}
      />

      <div className="flex items-center justify-between">
        <Link className="text-sm font-semibold text-[var(--ds-accent)]" href="/work">
          <Bilingual en="All cases" it="Tutti i casi" />
        </Link>
        <Link
          className="text-sm font-semibold text-[var(--ds-accent)]"
          href={`/work/${next.slug}`}
        >
          <Bilingual en="Next case" it="Caso successivo" />
        </Link>
      </div>
    </div>
  );
}

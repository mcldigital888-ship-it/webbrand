import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";
import ServicePillarCard from "@/components/ServicePillarCard";
import PackageCard from "@/components/PackageCard";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy, design, growth and AI—integrated into one clear system.",
  openGraph: {
    title: "Services | Webrrand",
    description:
      "Strategy, design, growth and AI—integrated into one clear system.",
    type: "website",
  },
};

const steps = ["Discover", "Design", "Build", "Launch", "Optimize"];

export default function ServicesPage() {
  return (
    <PageShell
      kicker={<Bilingual en="Services" it="Servizi" />}
      title={
        <Bilingual
          en="Services that build, launch and scale brands."
          it="Servizi per costruire, lanciare e scalare brand."
        />
      }
      subtitle={
        <Bilingual
          en="Strategy, design, growth and AI — integrated into one clear system."
          it="Strategia, design, crescita e AI — integrati in un unico sistema chiaro."
        />
      }
      primaryCta={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
    >
      <section className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/contact"
          className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
        >
          <Bilingual en="Book a Call" it="Prenota una call" />
        </Link>
        <Link
          href="/services#products"
          className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
        >
          <Bilingual en="View Products" it="Vedi i prodotti" />
        </Link>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
            <Bilingual en="Core capabilities" it="Capacità principali" />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ServicePillarCard
            href="/services/strategy"
            title={<Bilingual en="Strategy & Consulting" it="Strategia & consulenza" />}
            outcomeLabel={<Bilingual en="Outcome" it="Risultato" />}
            text={
              <Bilingual
                en="Brand, growth and go-to-market strategies built on data and insight."
                it="Strategie di brand, crescita e go-to-market basate su dati e insight."
              />
            }
            outcome={
              <Bilingual
                en="What to build, where to compete, and how to grow."
                it="Cosa costruire, dove competere e come crescere."
              />
            }
          />

          <ServicePillarCard
            href="/services/brand"
            title={<Bilingual en="Brand & Identity" it="Brand & identità" />}
            outcomeLabel={<Bilingual en="Outcome" it="Risultato" />}
            text={
              <Bilingual
                en="Visual identity and messaging systems that define how brands look and speak."
                it="Sistemi di identità visiva e messaggi che definiscono come un brand appare e comunica."
              />
            }
            outcome={
              <Bilingual
                en="A clear, consistent and recognizable brand."
                it="Un brand chiaro, coerente e riconoscibile."
              />
            }
          />

          <ServicePillarCard
            href="/services/web"
            title={<Bilingual en="Digital Experience / Web" it="Esperienza digitale / Web" />}
            outcomeLabel={<Bilingual en="Outcome" it="Risultato" />}
            text={
              <Bilingual
                en="High-performance websites and digital products designed to convert."
                it="Siti ad alte prestazioni e prodotti digitali progettati per convertire."
              />
            }
            outcome={
              <Bilingual
                en="A fast, scalable and premium digital presence."
                it="Una presenza digitale veloce, scalabile e premium."
              />
            }
          />

          <ServicePillarCard
            href="/services/performance"
            title={<Bilingual en="Performance & Growth" it="Performance & crescita" />}
            outcomeLabel={<Bilingual en="Outcome" it="Risultato" />}
            text={
              <Bilingual
                en="Data-driven marketing systems focused on measurable growth."
                it="Sistemi di marketing data-driven focalizzati su crescita misurabile."
              />
            }
            outcome={
              <Bilingual
                en="Traffic, conversions and revenue growth."
                it="Traffico, conversioni e crescita del fatturato."
              />
            }
          />

          <ServicePillarCard
            href="/services/content"
            title={<Bilingual en="Content & Media" it="Contenuti & media" />}
            outcomeLabel={<Bilingual en="Outcome" it="Risultato" />}
            text={
              <Bilingual
                en="Content and campaigns designed to attract, engage and retain."
                it="Contenuti e campagne progettati per attrarre, coinvolgere e fidelizzare."
              />
            }
            outcome={
              <Bilingual
                en="Visibility, engagement and brand relevance."
                it="Visibilità, engagement e rilevanza del brand."
              />
            }
          />

          <ServicePillarCard
            href="/services/ai"
            title={<Bilingual en="AI & Technology" it="AI & tecnologia" />}
            outcomeLabel={<Bilingual en="Outcome" it="Risultato" />}
            text={
              <Bilingual
                en="Automation, AI workflows and internal tools to scale marketing efforts."
                it="Automazioni, workflow AI e strumenti interni per scalare il marketing."
              />
            }
            outcome={
              <Bilingual
                en="Speed, efficiency and smarter decisions."
                it="Velocità, efficienza e decisioni più intelligenti."
              />
            }
          />
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="space-y-2">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
            <Bilingual en="How it works" it="Come funziona" />
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
            <Bilingual
              en="A structured process that connects strategy, creativity and performance."
              it="Un processo strutturato che collega strategia, creatività e performance."
            />
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
          {steps.map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)]"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
            <Bilingual en="Productized services for faster results." it="Servizi productized per risultati più rapidi." />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div id="brand-launch" className="scroll-mt-24">
            <PackageCard
              title={<Bilingual en="🚀 Brand Launch" it="🚀 Lancio brand" />}
              items={[
                <Bilingual key="1" en="Strategy" it="Strategia" />,
                <Bilingual key="2" en="Brand identity" it="Identità di brand" />,
                <Bilingual key="3" en="Website" it="Sito web" />,
                <Bilingual key="4" en="Launch content" it="Contenuti di lancio" />,
              ]}
              duration={<Bilingual en="4–6 weeks" it="4–6 settimane" />}
              ctaLabel={<Bilingual en="Launch your brand →" it="Lancia il tuo brand →" />}
              href="/contact"
            />
          </div>

          <div id="growth-sprint" className="scroll-mt-24">
            <PackageCard
              title={<Bilingual en="📈 Growth Sprint" it="📈 Sprint di crescita" />}
              items={[
                <Bilingual key="1" en="Funnel design" it="Design del funnel" />,
                <Bilingual key="2" en="Paid ads" it="Paid ads" />,
                <Bilingual key="3" en="CRO" it="CRO" />,
                <Bilingual key="4" en="Weekly reporting" it="Report settimanale" />,
              ]}
              duration={<Bilingual en="30–60 days" it="30–60 giorni" />}
              ctaLabel={<Bilingual en="Start a sprint →" it="Inizia uno sprint →" />}
              href="/contact"
            />
          </div>

          <div id="website-sprint" className="scroll-mt-24">
            <PackageCard
              title={<Bilingual en="🌐 Website Sprint" it="🌐 Sprint sito web" />}
              items={[
                <Bilingual key="1" en="UX/UI" it="UX/UI" />,
                <Bilingual key="2" en="Development" it="Sviluppo" />,
                <Bilingual key="3" en="SEO ready" it="SEO ready" />,
                <Bilingual key="4" en="Fast delivery" it="Consegna rapida" />,
              ]}
              duration={<Bilingual en="2–4 weeks" it="2–4 settimane" />}
              ctaLabel={<Bilingual en="Build your website →" it="Costruisci il tuo sito →" />}
              href="/contact"
            />
          </div>

          <div id="ai-setup" className="scroll-mt-24">
            <PackageCard
              title={<Bilingual en="🤖 AI Marketing Setup" it="🤖 Setup AI per marketing" />}
              items={[
                <Bilingual key="1" en="Automation setup" it="Setup automazioni" />,
                <Bilingual key="2" en="Dashboards" it="Dashboard" />,
                <Bilingual key="3" en="Content workflows" it="Workflow contenuti" />,
              ]}
              duration={<Bilingual en="Custom" it="Su misura" />}
              ctaLabel={<Bilingual en="Scale with AI →" it="Scala con l’AI →" />}
              href="/contact"
            />
          </div>
        </div>
      </section>

      <CTASection
        title={<Bilingual en="Ready to build, launch or scale?" it="Pronto a costruire, lanciare o scalare?" />}
        subtitle={<Bilingual en="One clear system. Measurable outcomes." it="Un sistema chiaro. Risultati misurabili." />}
        primary={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
      />
    </PageShell>
  );
}

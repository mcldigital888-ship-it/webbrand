import type { Metadata } from "next";
import Link from "next/link";
import Bilingual from "@/components/Bilingual";
import SectionBand from "@/components/SectionBand";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Get organized. Automate. Convert.",
  openGraph: {
    title: "Webrrand",
    description:
      "Get organized. Automate. Convert.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="space-y-10">
      <SectionBand tone="accent" className="overflow-hidden">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-wide text-[var(--color-navy)]/70">
              <Bilingual en="WEBRRAND" it="WEBRRAND" />
            </div>
            <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-6xl">
              <Bilingual
                it={<>Metti ordine. Automatizza. Converti.</>}
                en={<>Get organized. Automate. Convert.</>}
              />
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-slate)]">
              <Bilingual
                it="Sito pubblico semplice e veloce, con accesso al pannello admin (CRM, dashboard e automazioni)."
                en="A simple, fast public website with access to the admin panel (CRM, dashboard and automation)."
              />
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                <Bilingual en="Contact" it="Contatti" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-white"
              >
                <Bilingual en="Open Admin Panel" it="Apri pannello admin" />
              </Link>
            </div>
            <p className="text-sm font-medium text-[var(--color-slate)]">
              <Bilingual
                it="Navigazione chiara · IT/EN · Stile consistente"
                en="Clean navigation · IT/EN · Consistent styling"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="CRM" it="CRM" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Manage contacts, leads and sales steps in one place."
                  it="Gestisci contatti, lead e fasi di vendita in un unico posto."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Dashboard" it="Dashboard" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Track KPIs with a simple, fast overview."
                  it="Monitora i KPI con una panoramica semplice e veloce."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6 md:col-span-3">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Automation" it="Automazione" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Log events and run repeatable actions to reduce manual work."
                  it="Traccia eventi ed esegui azioni ripetibili per ridurre il lavoro manuale."
                />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual it="Pagine pubbliche essenziali" en="Essential public pages" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                it="Home, Chi siamo, Servizi, Contatti, Privacy e Termini: tutto con navigazione pulita e switch lingua IT/EN."
                en="Home, About, Services, Contact, Privacy and Terms: clean navigation with an IT/EN language switcher."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual it="Sito pubblico" en="Public website" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  it="Pagine chiare e coerenti, con CTA verso contatto e pannello admin."
                  en="Clear, consistent pages with CTAs to Contact and the Admin panel."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual it="Pannello admin" en="Admin panel" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  it="CRM, dashboard e automazioni (file PHP in /public_html)."
                  en="CRM, dashboard and automation (PHP files under /public_html)."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual it="Compatibilità server" en="Server compatibility" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  it="Nginx instrada PHP a PHP-FPM e il resto a Next.js."
                  en="Nginx routes PHP to PHP-FPM and everything else to Next.js."
                />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>
    </div>
  );
}

import Link from "next/link";
import FinalCtaBand from "@/components/FinalCtaBand";
import ModuleChooser from "@/components/ModuleChooser";
import OracoloSteps from "@/components/OracoloSteps";

export default function Home() {
  const modules = [
    {
      title: "My website should sell / Il mio sito deve vendere",
      who: "For B2B teams with traffic but low conversion / Per team B2B con traffico ma bassa conversione",
      bullets: ["Conversion-focused UX", "Clear CTAs + tracking"],
      href: "/solutions/website-conversion",
      cta: "Request Web Audit / Richiedi Web Audit",
    },
    {
      title: "I need an ads landing page / Mi serve una landing per ads",
      who: "For paid traffic that needs one page, one goal / Per traffico a pagamento: una pagina, un obiettivo",
      bullets: ["Fast, focused layout", "Form + follow-up ready"],
      href: "/solutions/landing-ads",
      cta: "Request Landing Page / Richiedi Landing",
    },
    {
      title: "I want a lead system / Voglio un sistema lead",
      who: "For businesses needing funnel + nurture / Per aziende che vogliono funnel + nurture",
      bullets: ["Funnel structure", "CRM + automated follow-up"],
      href: "/solutions/lead-generation",
      cta: "Request Lead System / Richiedi sistema lead",
    },
    {
      title: "I need CRM + sales system / Mi serve CRM + vendite",
      who: "For teams stuck in Excel, losing deals / Per team bloccati su Excel, con deal persi",
      bullets: ["Pipeline clarity", "Sales automation + reporting"],
      href: "/solutions/crm-sales",
      cta: "Request CRM Audit / Richiedi audit CRM",
    },
    {
      title: "AI / automation / AI / automazione",
      who: "For ops-heavy teams that want speed / Per team operativi che vogliono velocità",
      bullets: ["Assistants", "Automations + AI apps"],
      href: "/solutions/ai-automation",
      cta: "Request AI Demo / Richiedi Demo AI",
    },
    {
      title: "Food / Retail solution / Soluzioni Food / Retail",
      who: "For ordering, kiosk, and in-store efficiency / Per ordini, kiosk e efficienza in store",
      bullets: ["Smart ordering", "Kiosk / totem setups"],
      href: "/solutions/food-retail",
      cta: "Request Kiosk Demo / Richiedi demo kiosk",
    },
  ];

  return (
    <div className="space-y-16">
      <section className="space-y-8">
        <div className="space-y-5">
          <p className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
            Conversion-first digital systems & AI
            <span className="text-[var(--color-slate)]"> / </span>
            Sistemi digitali & AI orientati alla conversione
          </p>
          <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
            What do you want to improve right now?
            <span className="text-[var(--color-slate)]"> / </span>
            Cosa vuoi migliorare adesso?
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-slate)]">
            Pick one. We’ll route you to the fastest path to revenue, leads, or
            automation—without fluff.
            <br />
            Scegli una sola opzione. Ti portiamo al percorso più rapido verso ricavi,
            lead o automazione—senza parole inutili.
          </p>
        </div>
      </section>

      <OracoloSteps />

      <ModuleChooser
        title="Choose the right module / Scegli il modulo giusto"
        subtitle="Pick one outcome. One module. One next step. / Scegli un risultato. Un modulo. Un prossimo step."
        items={modules}
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ProofCard
          title="ROI-first / ROI prima di tutto"
          desc="Every page has one goal: qualified leads. / Ogni pagina ha un obiettivo: lead qualificati."
        />
        <ProofCard
          title="CRM-ready / Pronto per CRM"
          desc="Forms route into a sales pipeline. / I form entrano in una pipeline di vendita."
        />
        <ProofCard
          title="Automation / Automazione"
          desc="AI + workflows that reduce manual work. / AI + workflow che riducono lavoro manuale."
        />
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              How we work / Come lavoriamo
            </h2>
            <p className="text-[var(--color-slate)]">
              Diagnose in 7 days. Deliver in 14–30. Scale monthly.
              <br />
              Diagnosi in 7 giorni. Delivery in 14–30. Scale mensile.
            </p>
          </div>
          <Link
            href="/process"
            className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            See the process / Vedi il processo
          </Link>
        </div>
      </section>

      <FinalCtaBand
        title="Request the next step / Richiedi il prossimo step"
        subtitle="Tell us your goal and timeline. We’ll reply with the fastest path. / Dicci obiettivo e timeline. Ti rispondiamo con il percorso più rapido."
      />
    </div>
  );
}

function ProofCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
      <div className="space-y-2">
        <div className="text-sm font-semibold text-[var(--color-navy)]">{title}</div>
        <div className="text-sm leading-6 text-[var(--color-slate)]">{desc}</div>
      </div>
    </div>
  );
}

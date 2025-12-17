import Link from "next/link";
import FinalCtaBand from "@/components/FinalCtaBand";
import ModuleChooser from "@/components/ModuleChooser";
import OracoloSteps from "@/components/OracoloSteps";

export default function Home() {
  const modules = [
    {
      title: (
        <>
          Il mio sito deve vendere
          <br />
          My website should sell
        </>
      ),
      who: (
        <>
          Per team B2B con traffico ma bassa conversione
          <br />
          For B2B teams with traffic but low conversion
        </>
      ),
      bullets: [
        <>
          Audit conversione + tracking
          <br />
          Conversion + tracking audit
        </>,
        <>
          Struttura CTA + microcopy orientati all’azione
          <br />
          CTA structure + action-driven microcopy
        </>,
      ],
      href: "/solutions/website-conversion",
      cta: (
        <>
          Richiedi Web Audit
          <br />
          Request Web Audit
        </>
      ),
    },
    {
      title: (
        <>
          Mi serve una landing per ads
          <br />
          I need an ads landing page
        </>
      ),
      who: (
        <>
          Per traffico a pagamento: una pagina, un obiettivo
          <br />
          For paid traffic: one page, one goal
        </>
      ),
      bullets: [
        <>
          Struttura “message match” (annuncio → pagina)
          <br />
          Message-match structure (ad → page)
        </>,
        <>
          Form + routing verso CRM/follow-up
          <br />
          Form + routing into CRM/follow-up
        </>,
      ],
      href: "/solutions/landing-ads",
      cta: (
        <>
          Richiedi Landing
          <br />
          Request Landing
        </>
      ),
    },
    {
      title: (
        <>
          Voglio un sistema lead
          <br />
          I want a lead system
        </>
      ),
      who: (
        <>
          Per aziende che vogliono funnel + nurture
          <br />
          For teams that need funnel + nurture
        </>
      ),
      bullets: [
        <>
          Mappa funnel + touchpoint
          <br />
          Funnel map + touchpoints
        </>,
        <>
          Pipeline CRM + follow-up automatici
          <br />
          CRM pipeline + automated follow-up
        </>,
      ],
      href: "/solutions/lead-generation",
      cta: (
        <>
          Richiedi sistema lead
          <br />
          Request lead system
        </>
      ),
    },
    {
      title: (
        <>
          Mi serve CRM + vendite
          <br />
          I need CRM + sales system
        </>
      ),
      who: (
        <>
          Per team bloccati su Excel, con deal persi
          <br />
          For teams stuck in spreadsheets, losing deals
        </>
      ),
      bullets: [
        <>
          Pipeline chiara + stage + next action
          <br />
          Clear pipeline + stages + next actions
        </>,
        <>
          Automazioni + report per il team
          <br />
          Automations + reporting
        </>,
      ],
      href: "/solutions/crm-sales",
      cta: (
        <>
          Richiedi audit CRM
          <br />
          Request CRM audit
        </>
      ),
    },
    {
      title: (
        <>
          AI / automazione
          <br />
          AI / automation
        </>
      ),
      who: (
        <>
          Per team operativi che vogliono velocità
          <br />
          For ops-heavy teams that want speed
        </>
      ),
      bullets: [
        <>
          Assistenti per task ripetitivi
          <br />
          Assistants for repetitive tasks
        </>,
        <>
          Automazioni + micro-app AI
          <br />
          Automations + small AI apps
        </>,
      ],
      href: "/solutions/ai-automation",
      cta: (
        <>
          Richiedi demo AI
          <br />
          Request AI demo
        </>
      ),
    },
    {
      title: (
        <>
          Soluzioni Food / Retail
          <br />
          Food / Retail solutions
        </>
      ),
      who: (
        <>
          Per ordini, kiosk e efficienza in store
          <br />
          For ordering, kiosks, and in-store efficiency
        </>
      ),
      bullets: [
        <>
          Flussi di ordering (meno errori)
          <br />
          Ordering flows (fewer mistakes)
        </>,
        <>
          Setup kiosk/totem + rollout
          <br />
          Kiosk/totem setup + rollout
        </>,
      ],
      href: "/solutions/food-retail",
      cta: (
        <>
          Richiedi demo kiosk
          <br />
          Request kiosk demo
        </>
      ),
    },
  ];

  return (
    <div className="space-y-16">
      <section className="space-y-8">
        <div className="space-y-5">
          <p className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
            Sistemi digitali & AI orientati alla conversione
            <br />
            Conversion-first digital systems & AI
          </p>
          <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
            Cosa vuoi migliorare adesso?
            <br />
            What do you want to improve right now?
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-slate)]">
            Scegli una sola opzione. Ti portiamo al percorso più rapido verso ricavi,
            lead o automazione—senza parole inutili.
            <br />
            Pick one option. We’ll route you to the fastest path to revenue, leads, or
            automation—without fluff.
          </p>
        </div>
      </section>

      <OracoloSteps />

      <ModuleChooser
        title={
          <>
            Scegli il modulo giusto
            <br />
            Choose the right module
          </>
        }
        subtitle={
          <>
            Un risultato. Un modulo. Un prossimo step.
            <br />
            One outcome. One module. One next step.
          </>
        }
        items={modules}
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ProofCard
          title="ROI prima di tutto"
          desc={
            "Ogni pagina ha un obiettivo misurabile: lead qualificati.\nEvery page has one measurable goal: qualified leads."
          }
        />
        <ProofCard
          title="Pronto per CRM"
          desc={
            "I form entrano in una pipeline di vendita con ownership.\nForms route into a sales pipeline with clear ownership."
          }
        />
        <ProofCard
          title="Automazione"
          desc={
            "AI + workflow che riducono lavoro manuale e tempi morti.\nAI + workflows that reduce manual work and delays."
          }
        />
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              Come lavoriamo
              <br />
              How we work
            </h2>
            <p className="text-[var(--color-slate)]">
              Diagnosi in 7 giorni. Delivery in 14–30. Scale mensile.
              <br />
              Diagnose in 7 days. Deliver in 14–30. Scale monthly.
            </p>
          </div>
          <Link
            href="/process"
            className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            Vedi il processo
            <br />
            See the process
          </Link>
        </div>
      </section>

      <FinalCtaBand
        title={
          <>
            Richiedi il prossimo step
            <br />
            Request the next step
          </>
        }
        subtitle={
          <>
            Dicci obiettivo e timeline. Ti rispondiamo con il percorso più rapido.
            <br />
            Tell us your goal and timeline. We’ll reply with the fastest path.
          </>
        }
      />
    </div>
  );
}

function ProofCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
      <div className="space-y-2">
        <div className="text-sm font-semibold text-[var(--color-navy)]">{title}</div>
        <div className="whitespace-pre-line text-sm leading-6 text-[var(--color-slate)]">
          {desc}
        </div>
      </div>
    </div>
  );
}

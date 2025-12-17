import PageShell from "@/components/PageShell";
import CtaButton from "@/components/CtaButton";

export default function CaseStudiesPage() {
  return (
    <PageShell
      kicker="Case Studies"
      title="Proof, not promises"
      subtitle={
        <>
          Short case snapshots showing what changed, what we built, and which metrics
          moved.
          <br />
          Casi brevi: cosa abbiamo cambiato, cosa abbiamo costruito e quali metriche
          sono migliorate.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request a Call / Richiedi una call" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6"
          >
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[var(--color-slate)]">
                Case #{i + 1}
              </div>
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Placeholder case title
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                What we changed → what improved. (Replace with real metrics.)
                <br />
                Cosa abbiamo cambiato → cosa è migliorato. (Sostituisci con metriche reali.)
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              Want a case study for your exact situation?
            </div>
            <div className="text-sm leading-6 text-[var(--color-slate)]">
              Share your goal and we’ll reply with a relevant example.
              <br />
              Condividi il tuo obiettivo e ti rispondiamo con un esempio rilevante.
            </div>
          </div>
          <CtaButton href="/contact">Contact</CtaButton>
        </div>
      </section>
    </PageShell>
  );
}

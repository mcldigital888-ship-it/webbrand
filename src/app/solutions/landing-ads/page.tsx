import PageShell from "@/components/PageShell";

export default function LandingAdsPage() {
  return (
    <PageShell
      kicker="Landing Page for Ads"
      title="One page. One goal. Zero distraction."
      subtitle={
        <>
          A landing page is not a mini-website. It’s a conversion machine built for
          one action.
          <br />
          Una landing non è un mini-sito. È una macchina di conversione costruita per
          un’unica azione.
        </>
      }
      primaryCta={{ href: "/contact", label: "Request Landing Page / Richiedi Landing" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Who it’s for" bullets={["Paid traffic campaigns", "Offer validation", "Lead capture at scale"]} />
        <Card title="What you receive / Cosa ricevi" bullets={["Focused page structure", "Message match", "Form + CRM-ready routing"]} />
        <Card title="Principles" bullets={["1 page", "1 target", "0 distraction"]} />
      </section>

      <FinalCta
        title="Want the landing spec in 24 hours? / Vuoi la struttura in 24 ore?"
        desc="Tell us your offer and ad channel. We’ll reply with structure + CTA recommendation. / Dicci offerta e canale ads. Ti rispondiamo con struttura + CTA consigliata."
        href="/contact"
        label="Request Landing"
      />
    </PageShell>
  );
}

function Card({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
      <div className="space-y-3">
        <div className="text-sm font-semibold text-[var(--color-navy)]">{title}</div>
        <ul className="space-y-2 text-sm text-[var(--color-slate)]">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FinalCta({
  title,
  desc,
  href,
  label,
}: {
  title: string;
  desc: string;
  href: string;
  label: string;
}) {
  return (
    <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-[var(--color-navy)]">{title}</div>
          <div className="text-sm leading-6 text-[var(--color-slate)]">{desc}</div>
        </div>
        <a
          href={href}
          className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
        >
          {label}
        </a>
      </div>
    </section>
  );
}

import Link from "next/link";
import PageShell from "@/components/PageShell";

const items = [
  {
    href: "/solutions/website-conversion",
    title: "Website Conversion",
    desc: "Not a pretty site. A selling site.",
    bullets: ["Conversion UX", "Clear CTA structure", "Tracking-ready"],
    cta: "Request Web Audit / Richiedi Web Audit",
  },
  {
    href: "/solutions/landing-ads",
    title: "Landing Page for Ads",
    desc: "One page. One goal. Zero distraction.",
    bullets: ["Fast load", "Form + follow-up", "Ad-message match"],
    cta: "Request Landing Page / Richiedi Landing",
  },
  {
    href: "/solutions/lead-generation",
    title: "Lead Generation / Growth Engine",
    desc: "Funnel + CRM + nurture system.",
    bullets: ["Funnel mapping", "CRM pipeline", "Automated nurture"],
    cta: "Request Lead System / Richiedi sistema lead",
  },
  {
    href: "/solutions/crm-sales",
    title: "CRM & Sales System",
    desc: "Stop using Excel. Start closing.",
    bullets: ["Pipeline clarity", "Automation", "Reporting"],
    cta: "Request CRM Audit / Richiedi audit CRM",
  },
  {
    href: "/solutions/ai-automation",
    title: "AI & Automations",
    desc: "Assistants, automations, AI apps.",
    bullets: ["AI assistants", "Workflow automation", "Custom AI apps"],
    cta: "Request AI Demo / Richiedi Demo AI",
  },
  {
    href: "/solutions/food-retail",
    title: "Food / Retail Smart Solutions",
    desc: "Ordering + kiosk + in-store efficiency.",
    bullets: ["Ordering flows", "Kiosk/totem", "Operational speed"],
    cta: "Request Kiosk Demo / Richiedi demo kiosk",
  },
];

export default function SolutionsPage() {
  return (
    <PageShell
      kicker="Solutions"
      title="Pick the system that moves revenue"
      subtitle={
        <>
          Each solution is designed for one measurable outcome: more qualified leads,
          higher conversion, faster operations.
          <br />
          Ogni soluzione è progettata per un risultato misurabile: lead più qualificati,
          conversioni più alte, operazioni più veloci.
        </>
      }
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.href}
            className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  {item.title}
                </div>
                <div className="text-sm leading-6 text-[var(--color-slate)]">
                  {item.desc}
                </div>
              </div>
              <ul className="space-y-2 text-sm text-[var(--color-slate)]">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={item.href}
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                {item.cta}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

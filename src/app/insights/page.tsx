import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import InsightsExplorer from "@/components/InsightsExplorer";
import { insights } from "@/lib/content";
import Bilingual from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Insights | Webrrand",
  description:
    "Short notes on strategy, brand, web, performance, and content—focused on measurable impact.",
  openGraph: {
    title: "Insights | Webrrand",
    description:
      "Short notes on strategy, brand, web, performance, and content—focused on measurable impact.",
    type: "website",
  },
};

export default function InsightsPage() {
  return (
    <PageShell
      kicker={<Bilingual en="Insights" it="Insight" />}
      title={<Bilingual en="Signals, not noise" it="Segnali, non rumore" />}
      subtitle={
        <Bilingual
          en="Short notes on what works. Built for teams that ship."
          it="Note brevi su cosa funziona. Per team che consegnano."
        />
      }
      primaryCta={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
    >
      <InsightsExplorer items={insights} />

      <CTASection
        title={<Bilingual en="Want the right playbook?" it="Vuoi il playbook giusto?" />}
        subtitle={
          <Bilingual
            en="Tell us your context. We’ll reply with a relevant insight and a practical next step."
            it="Dicci il contesto. Rispondiamo con un insight rilevante e un prossimo step pratico."
          />
        }
        primary={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
        secondary={{ href: "/work", label: <Bilingual en="View Work" it="Vedi lavori" /> }}
      />
    </PageShell>
  );
}

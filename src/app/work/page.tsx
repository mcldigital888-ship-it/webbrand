import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import WorkGrid from "@/components/WorkGrid";
import { caseStudies } from "@/lib/content";
import Bilingual from "@/components/Bilingual";

export const metadata: Metadata = {
  title: "Work | Webrrand",
  description:
    "Case studies focused on measurable outcomes: clarity, conversion, and growth systems.",
  openGraph: {
    title: "Work | Webrrand",
    description:
      "Case studies focused on measurable outcomes: clarity, conversion, and growth systems.",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <PageShell
      kicker={<Bilingual en="Work" it="Lavori" />}
      title={<Bilingual en="Proof over promises" it="Prove, non promesse" />}
      subtitle={
        <Bilingual
          en="Short case studies showing the problem, the approach, and the result."
          it="Casi studio brevi che mostrano il problema, l’approccio e il risultato."
        />
      }
      primaryCta={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
    >
      <WorkGrid items={caseStudies} />

      <CTASection
        title={<Bilingual en="Want results like this?" it="Vuoi risultati così?" />}
        subtitle={
          <Bilingual
            en="Tell us your goal and timeline. We’ll respond with a relevant case and a clear next step."
            it="Dicci obiettivo e tempistiche. Rispondiamo con un caso rilevante e un prossimo step chiaro."
          />
        }
        primary={{ href: "/contact", label: <Bilingual en="Book a Call" it="Prenota una call" /> }}
      />
    </PageShell>
  );
}

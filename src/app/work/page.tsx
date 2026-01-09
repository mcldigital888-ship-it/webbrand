import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import WorkGrid from "@/components/WorkGrid";
import { caseStudies } from "@/lib/content";

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
      kicker="Work"
      title="Proof over promises"
      subtitle="Short case studies showing the problem, the approach, and the result."
      primaryCta={{ href: "/contact", label: "Book a Call" }}
    >
      <WorkGrid items={caseStudies} />

      <CTASection
        title="Want results like this?"
        subtitle="Tell us your goal and timeline. We’ll respond with a relevant case and a clear next step."
        primary={{ href: "/contact", label: "Book a Call" }}
      />
    </PageShell>
  );
}

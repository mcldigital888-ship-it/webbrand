import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import InsightsExplorer from "@/components/InsightsExplorer";
import { insights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights | Webbrand",
  description:
    "Short notes on strategy, brand, web, performance, and content—focused on measurable impact.",
  openGraph: {
    title: "Insights | Webbrand",
    description:
      "Short notes on strategy, brand, web, performance, and content—focused on measurable impact.",
    type: "website",
  },
};

export default function InsightsPage() {
  return (
    <PageShell
      kicker="Insights"
      title="Signals, not noise"
      subtitle="Short notes on what works. Built for teams that ship."
      primaryCta={{ href: "/contact", label: "Book a Call" }}
    >
      <InsightsExplorer items={insights} />

      <CTASection
        title="Want the right playbook?"
        subtitle="Tell us your context. We’ll reply with a relevant insight and a practical next step."
        primary={{ href: "/contact", label: "Book a Call" }}
        secondary={{ href: "/work", label: "View Work" }}
      />
    </PageShell>
  );
}

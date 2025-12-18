import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About | Webbrand",
  description:
    "A premium studio built to ship strategy, brand, and web systems with measurable impact.",
  openGraph: {
    title: "About | Webbrand",
    description:
      "A premium studio built to ship strategy, brand, and web systems with measurable impact.",
    type: "website",
  },
};

const values = [
  {
    title: "Clarity",
    desc: "Short words. Sharp structure. Fewer decisions—better ones.",
  },
  {
    title: "Craft",
    desc: "Premium doesn’t mean loud. It means disciplined.",
  },
  {
    title: "Measurable impact",
    desc: "We optimize for outcomes, not opinions.",
  },
];

const steps = ["Discover", "Design", "Build", "Launch", "Optimize"];

export default function AboutPage() {
  return (
    <PageShell
      kicker="About"
      title="Built to ship the signal"
      subtitle="We combine AI speed with human judgment to create systems that drive measurable growth."
      primaryCta={{ href: "/contact", label: "Book a Call" }}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6"
          >
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">{v.title}</div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">{v.desc}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="space-y-2">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            Our process
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
            A simple five-step loop designed for speed, clarity, and continuous improvement.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
          {steps.map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)]"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            Team
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-slate)]">
            Small, senior, and fast. We partner with specialists when needed—but keep the core tight.
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            Mission
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-slate)]">
            Help modern teams ship premium digital systems that turn attention into action.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to build together?"
        subtitle="If you value clarity, speed, and measurable impact—let’s talk."
        primary={{ href: "/contact", label: "Book a Call" }}
        secondary={{ href: "/work", label: "View Work" }}
      />
    </PageShell>
  );
}

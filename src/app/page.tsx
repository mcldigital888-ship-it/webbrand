import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import LogoBand from "@/components/LogoBand";
import MetricCards from "@/components/MetricCards";
import ServiceCards from "@/components/ServiceCards";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Ultra modern studio for strategy, brand, web, and performance—built for measurable growth.",
  openGraph: {
    title: "Webbrand",
    description:
      "Ultra modern studio for strategy, brand, web, and performance—built for measurable growth.",
    type: "website",
  },
};

const metrics = [
  { label: "Projects", value: "40+" },
  { label: "Avg. lift", value: "+18%" },
  { label: "Time-to-launch", value: "2–6w" },
  { label: "Countries", value: "8" },
];

const services = [
  {
    title: "Marketing & Growth Strategy",
    description: "Positioning, channel focus, and a measurable plan.",
    href: "/services/strategy",
  },
  {
    title: "Brand Identity",
    description: "Premium identity systems that scale.",
    href: "/services/brand",
  },
  {
    title: "Digital Experience",
    description: "Websites built for clarity, speed, and conversion.",
    href: "/services/web",
  },
  {
    title: "Performance & Analytics",
    description: "Tracking, dashboards, and experiments.",
    href: "/services/performance",
  },
  {
    title: "Content & Social",
    description: "Content systems that compound.",
    href: "/services/content",
  },
  {
    title: "All services",
    description: "The full menu—pick the track that fits.",
    href: "/services",
  },
];

const process = ["Discover", "Design", "Build", "Launch", "Optimize"];

const testimonials = [
  {
    quote: "The work was fast, sharp, and measurable. Zero fluff.",
    name: "Head of Growth",
    company: "Client A",
  },
  {
    quote: "Finally a site that looks premium and sells clearly.",
    name: "Founder",
    company: "Client B",
  },
  {
    quote: "Tracking fixed, dashboards clean, decisions became obvious.",
    name: "Marketing Lead",
    company: "Client C",
  },
];

export default function Home() {
  const featured = caseStudies.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="space-y-8">
        <Reveal>
          <div className="space-y-5">
            <p className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
              AI-powered studio
            </p>
            <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-6xl">
              Build the next wave.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-slate)]">
              AI + data + craft. Built for measurable growth.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                Book a Call
              </Link>
              <Link
                href="/work"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              >
                View Work
              </Link>
            </div>
            <p className="text-sm font-medium text-[var(--color-slate)]">
              Trusted by modern teams.
            </p>
          </div>
        </Reveal>
      </section>

      <LogoBand />

      <MetricCards metrics={metrics} />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Pillar
          title="Strategy"
          desc="Define the signal. Align the team. Set measurable priorities."
        />
        <Pillar
          title="Build"
          desc="Brand + web systems that look premium and move fast."
        />
        <Pillar
          title="Scale"
          desc="Performance, analytics, and content that compound."
        />
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              Services
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
              Pick a track. Ship a system. Measure the lift.
            </p>
          </div>
        </div>
        <ServiceCards items={services} />
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
            Featured work
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
            Problem. Approach. Result.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {featured.map((c) => (
            <Reveal key={c.slug}>
              <Link
                href={`/work/${c.slug}`}
                className="group rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                      {c.client}
                    </div>
                    <div className="text-xs font-semibold text-[var(--color-navy)]">
                      {c.outcome}
                    </div>
                  </div>
                  <div className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-navy)]">
                    {c.oneLiner}
                  </div>
                  <div className="grid grid-cols-1 gap-3 text-sm leading-6 text-[var(--color-slate)]">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                        Problem
                      </div>
                      <div>{c.challenge}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                        Approach
                      </div>
                      <div>{c.solution}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
                        Result
                      </div>
                      <div>{c.result}</div>
                    </div>
                  </div>
                  <div className="pt-1 text-sm font-semibold text-[var(--color-navy)]">
                    View case
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
            Process
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
            A simple loop designed to ship.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
          {process.map((s) => (
            <Reveal key={s}>
              <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-5">
                <div className="text-sm font-semibold text-[var(--color-navy)]">{s}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-navy)] p-8 text-white">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight">
              What clients say
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-white/70">
              Short quotes. Clear signal.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.quote} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="space-y-3">
                  <div className="text-sm leading-6">“{t.quote}”</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    {t.name} · {t.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              Newsletter
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
              One email. One useful idea. No noise.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-3">
            <input
              className="h-11 flex-1 rounded-xl border border-black/10 bg-white px-3 text-sm text-[var(--color-navy)] outline-none focus:border-[var(--color-blue)]"
              placeholder="you@company.com"
              inputMode="email"
            />
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-xl bg-[var(--color-blue)] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              Join
            </button>
          </form>
        </div>
      </section>

      <CTASection
        title="Ready to build your next wave?"
        subtitle="Bring your goal. We’ll ship the system—and measure the impact."
        primary={{ href: "/contact", label: "Book a Call" }}
        secondary={{ href: "/work", label: "View Work" }}
      />
    </div>
  );
}

function Pillar({ title, desc }: { title: string; desc: string }) {
  return (
    <Reveal>
      <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 transition-transform duration-300 hover:-translate-y-0.5">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-cyan)]/15 blur-2xl" />
        </div>
        <div className="relative space-y-2">
          <div className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-navy)]">
            {title}
          </div>
          <div className="text-sm leading-6 text-[var(--color-slate)]">{desc}</div>
        </div>
      </div>
    </Reveal>
  );
}

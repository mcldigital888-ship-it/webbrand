import type { Metadata } from "next";
import Link from "next/link";
import Bilingual from "@/components/Bilingual";
import SectionBand from "@/components/SectionBand";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Webrrand builds revenue systems that turn visitors into paying customers — automatically.",
  openGraph: {
    title: "Webrrand",
    description:
      "Webrrand builds revenue systems that turn visitors into paying customers — automatically.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="space-y-10">
      <SectionBand tone="accent" className="overflow-hidden">
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-wide text-[var(--ds-muted)]">
              <Bilingual en="WEBRRAND" it="WEBRRAND" />
            </div>
            <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-6xl">
              <Bilingual
                en={<>Turn website visitors into paying customers — automatically.</>}
                it={<>Turn website visitors into paying customers — automatically.</>}
              />
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--ds-muted)]">
              <Bilingual
                en="Webrrand builds websites, funnels, CRM and AI that work together to generate, qualify and close leads for you."
                it="Webrrand builds websites, funnels, CRM and AI that work together to generate, qualify and close leads for you."
              />
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/audit"
                className="ds-btn ds-btn-primary ds-btn-lg"
              >
                <Bilingual en="Get a Free System Audit" it="Get a Free System Audit" />
              </Link>
              <Link
                href="#how-it-works"
                className="ds-btn ds-btn-ghost"
              >
                <Bilingual en="See How It Works" it="See How It Works" />
              </Link>
            </div>
            <p className="text-sm font-medium text-[var(--ds-muted)]">
              <Bilingual
                en="WEBRRAND builds revenue systems, not websites."
                it="WEBRRAND builds revenue systems, not websites."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="More leads" it="More leads" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">
                <Bilingual
                  en="Convert traffic with landing pages built for response."
                  it="Convert traffic with landing pages built for response."
                />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Automatic follow-up" it="Automatic follow-up" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">
                <Bilingual
                  en="CRM + automation that responds in minutes, not days."
                  it="CRM + automation that responds in minutes, not days."
                />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6 md:col-span-3">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Sales clarity" it="Sales clarity" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">
                <Bilingual
                  en="Pipeline + dashboards so you know what’s working (and what’s leaking)."
                  it="Pipeline + dashboards so you know what’s working (and what’s leaking)."
                />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ds-text)] sm:text-3xl">
              <Bilingual en="Get clarity in one audit." it="Get clarity in one audit." />
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--ds-muted)]">
              <Bilingual
                en="We review your funnel, follow-up, and tracking — then send a clear next step."
                it="We review your funnel, follow-up, and tracking — then send a clear next step."
              />
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/audit" className="ds-btn ds-btn-primary ds-btn-lg">
              <Bilingual en="Get a Free System Audit" it="Get a Free System Audit" />
            </Link>
            <Link href="/contact" className="ds-btn ds-btn-ghost ds-btn-lg">
              <Bilingual en="Contact" it="Contact" />
            </Link>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              <Bilingual en="Built for your industry" it="Built for your industry" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              <Bilingual
                en="Each system is pre-optimized for your sector with proven KPIs — so you launch faster and scale with clarity."
                it="Each system is pre-optimized for your sector with proven KPIs — so you launch faster and scale with clarity."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            {[
              "Food & Hospitality",
              "Retail",
              "B2B Services",
              "Franchise",
              "Professionals",
            ].map((t) => (
              <div
                key={t}
                className="ds-glass rounded-2xl p-5 text-sm font-semibold text-[var(--ds-text)]"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              <Bilingual en="Your growth is leaking." it="Your growth is leaking." />
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              <Bilingual
                en="Most businesses don’t have a lead generation problem — they have a follow-up and conversion problem."
                it="Most businesses don’t have a lead generation problem — they have a follow-up and conversion problem."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="What’s happening today" it="What’s happening today" />
              </div>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]" />
                  <Bilingual en="Leads are lost after the first visit." it="Leads are lost after the first visit." />
                </div>
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]" />
                  <Bilingual en="Sales doesn’t follow up consistently." it="Sales doesn’t follow up consistently." />
                </div>
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]" />
                  <Bilingual en="Your website doesn’t convert." it="Your website doesn’t convert." />
                </div>
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]" />
                  <Bilingual en="Ads waste budget on low-quality leads." it="Ads waste budget on low-quality leads." />
                </div>
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]" />
                  <Bilingual en="No visibility into what’s working." it="No visibility into what’s working." />
                </div>
              </div>
            </div>

            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="The cost" it="The cost" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual
                  en="You pay for traffic… then lose the sale because the system can’t capture, qualify, and follow up fast enough."
                  it="You pay for traffic… then lose the sale because the system can’t capture, qualify, and follow up fast enough."
                />
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">
                  <Bilingual en="Simple fix" it="Simple fix" />
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--ds-text)]">
                  <Bilingual
                    en="Replace disconnected tools with one revenue system."
                    it="Replace disconnected tools with one revenue system."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div id="how-it-works" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              <Bilingual en="One system. One flow." it="One system. One flow." />
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              <Bilingual
                en="Traffic is useless without a path to revenue. Webrrand connects every step — from first click to closed deal."
                it="Traffic is useless without a path to revenue. Webrrand connects every step — from first click to closed deal."
              />
            </p>
          </div>

          <div className="ds-glass rounded-2xl p-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Traffic" it="Traffic" />
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Landing" it="Landing" />
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="CRM" it="CRM" />
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Automation" it="Automation" />
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Sales" it="Sales" />
              </div>
              <div className="hidden items-center justify-center text-[var(--ds-muted)] md:flex">→</div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-[var(--ds-text)] md:col-span-2">
                <Bilingual en="Dashboard" it="Dashboard" />
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[var(--ds-muted)]">
              <Bilingual
                en="So leads get captured, qualified, followed up, and tracked — without manual chaos."
                it="So leads get captured, qualified, followed up, and tracked — without manual chaos."
              />
            </p>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              <Bilingual en="We don’t sell tools." it="We don’t sell tools." />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              <Bilingual
                en="We install revenue systems. Web, marketing, CRM, automation and AI — built to work together."
                it="We install revenue systems. Web, marketing, CRM, automation and AI — built to work together."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            {[
              "Web",
              "Marketing",
              "CRM",
              "AI",
              "Integrations",
            ].map((m) => (
              <div
                key={m}
                className="ds-glass rounded-2xl p-5 text-sm font-semibold text-[var(--ds-text)]"
              >
                {m}
              </div>
            ))}
          </div>

          <div className="ds-glass rounded-2xl p-5">
            <div className="text-sm font-semibold text-[var(--ds-text)]">
              <Bilingual en="Everything works together." it="Everything works together." />
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--ds-muted)]">
              <Bilingual
                en="One measurable system that generates leads, follows up automatically, and helps sales close more deals."
                it="One measurable system that generates leads, follows up automatically, and helps sales close more deals."
              />
            </p>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              <Bilingual en="Results you can measure" it="Results you can measure" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ds-muted)]">
              <Bilingual
                en="Illustrative but realistic outcomes when the whole system works together."
                it="Illustrative but realistic outcomes when the whole system works together."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-lg font-semibold text-[var(--ds-text)]">
                <Bilingual en="More qualified leads" it="More qualified leads" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual
                  en="Landing pages + follow-up designed to convert interest into booked conversations."
                  it="Landing pages + follow-up designed to convert interest into booked conversations."
                />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-lg font-semibold text-[var(--ds-text)]">
                <Bilingual en="Faster follow-up" it="Faster follow-up" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual
                  en="Automation that responds in minutes, keeps momentum, and saves your team time."
                  it="Automation that responds in minutes, keeps momentum, and saves your team time."
                />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-lg font-semibold text-[var(--ds-text)]">
                <Bilingual en="Clear pipeline visibility" it="Clear pipeline visibility" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual
                  en="Dashboards + CRM structure so you know what’s working and what to fix next."
                  it="Dashboards + CRM structure so you know what’s working and what to fix next."
                />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              <Bilingual en="Who it’s for" it="Who it’s for" />
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              <Bilingual
                en="If you need predictable leads and a faster path to sales, this is built for you."
                it="If you need predictable leads and a faster path to sales, this is built for you."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Small B2B companies" it="Small B2B companies" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual en="More pipeline, less guesswork." it="More pipeline, less guesswork." />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Agencies" it="Agencies" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual en="Productized systems you can deliver." it="Productized systems you can deliver." />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Restaurants / retail" it="Restaurants / retail" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual en="Local traffic to booked customers." it="Local traffic to booked customers." />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Franchises" it="Franchises" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual en="Consistent lead flow across locations." it="Consistent lead flow across locations." />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Service businesses" it="Service businesses" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual en="Follow-up that wins the job." it="Follow-up that wins the job." />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              <Bilingual en="How it works" it="How it works" />
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              <Bilingual
                en="A simple 3-step process designed to get results fast — then improve them every month."
                it="A simple 3-step process designed to get results fast — then improve them every month."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">01</div>
              <div className="mt-2 text-lg font-semibold text-[var(--ds-text)]">
                <Bilingual en="Diagnose" it="Diagnose" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual en="We analyze your current funnel." it="We analyze your current funnel." />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">02</div>
              <div className="mt-2 text-lg font-semibold text-[var(--ds-text)]">
                <Bilingual en="Build" it="Build" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual en="We install the system." it="We install the system." />
              </div>
            </div>
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-xs font-semibold tracking-wide text-[var(--ds-muted)]">03</div>
              <div className="mt-2 text-lg font-semibold text-[var(--ds-text)]">
                <Bilingual en="Scale" it="Scale" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual en="We optimize every month." it="We optimize every month." />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
              <Bilingual en="Packages" it="Packages" />
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
              <Bilingual
                en="Outcome-based packages — pick what you want to achieve, and we’ll build the system around it."
                it="Outcome-based packages — pick what you want to achieve, and we’ll build the system around it."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Get More Leads" it="Get More Leads" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual
                  en="Increase inbound leads with high-converting pages and smarter acquisition."
                  it="Increase inbound leads with high-converting pages and smarter acquisition."
                />
              </div>
              <div className="mt-5">
                <Link
                  href="/audit"
                  className="ds-btn ds-btn-ghost ds-btn-sm"
                >
                  <Bilingual en="Start audit" it="Start audit" />
                </Link>
              </div>
            </div>

            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Get More Sales" it="Get More Sales" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual
                  en="Improve close rate with CRM stages, follow-up automation, and sales visibility."
                  it="Improve close rate with CRM stages, follow-up automation, and sales visibility."
                />
              </div>
              <div className="mt-5">
                <Link
                  href="/audit"
                  className="ds-btn ds-btn-ghost ds-btn-sm"
                >
                  <Bilingual en="Start audit" it="Start audit" />
                </Link>
              </div>
            </div>

            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Automate Operations" it="Automate Operations" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual
                  en="Reduce manual work with automation across leads, messaging, and internal workflows."
                  it="Reduce manual work with automation across leads, messaging, and internal workflows."
                />
              </div>
              <div className="mt-5">
                <Link
                  href="/audit"
                  className="ds-btn ds-btn-ghost ds-btn-sm"
                >
                  <Bilingual en="Start audit" it="Start audit" />
                </Link>
              </div>
            </div>

            <div className="ds-glass ds-lift rounded-2xl p-6">
              <div className="text-sm font-semibold text-[var(--ds-text)]">
                <Bilingual en="Smart Retail System" it="Smart Retail System" />
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--ds-muted)]">
                <Bilingual
                  en="Turn local demand into customers with tracking, follow-up, and simple reporting."
                  it="Turn local demand into customers with tracking, follow-up, and simple reporting."
                />
              </div>
              <div className="mt-5">
                <Link
                  href="/audit"
                  className="ds-btn ds-btn-ghost ds-btn-sm"
                >
                  <Bilingual en="Start audit" it="Start audit" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="accent">
        <div className="space-y-4">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ds-text)]">
            <Bilingual
              en="Tell us what you want to achieve — get a plan in 24h"
              it="Tell us what you want to achieve — get a plan in 24h"
            />
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--ds-muted)]">
            <Bilingual
              en="Get a clear roadmap of what to fix, what to build, and what will move revenue this month."
              it="Get a clear roadmap of what to fix, what to build, and what will move revenue this month."
            />
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/audit"
              className="ds-btn ds-btn-primary ds-btn-lg"
            >
              <Bilingual en="Start Now" it="Start Now" />
            </Link>
            <Link
              href="/audit"
              className="ds-btn ds-btn-ghost ds-btn-lg"
            >
              <Bilingual en="Get a Free System Audit" it="Get a Free System Audit" />
            </Link>
          </div>
        </div>
      </SectionBand>
    </div>
  );
}

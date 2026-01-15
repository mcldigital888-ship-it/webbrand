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
            <div className="text-sm font-semibold tracking-wide text-[var(--color-navy)]/70">
              <Bilingual en="WEBRRAND" it="WEBRRAND" />
            </div>
            <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-6xl">
              <Bilingual
                en={<>Turn website visitors into paying customers — automatically.</>}
                it={<>Turn website visitors into paying customers — automatically.</>}
              />
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--color-slate)]">
              <Bilingual
                en="Webrrand builds websites, funnels, CRM and AI that work together to generate, qualify and close leads for you."
                it="Webrrand builds websites, funnels, CRM and AI that work together to generate, qualify and close leads for you."
              />
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/audit"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                <Bilingual en="Get a Free System Audit" it="Get a Free System Audit" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-white"
              >
                <Bilingual en="See How It Works" it="See How It Works" />
              </Link>
            </div>
            <p className="text-sm font-medium text-[var(--color-slate)]">
              <Bilingual
                en="WEBRRAND builds revenue systems, not websites."
                it="WEBRRAND builds revenue systems, not websites."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="More leads" it="More leads" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Convert traffic with landing pages built for response."
                  it="Convert traffic with landing pages built for response."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Automatic follow-up" it="Automatic follow-up" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="CRM + automation that responds in minutes, not days."
                  it="CRM + automation that responds in minutes, not days."
                />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 p-6 md:col-span-3">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Sales clarity" it="Sales clarity" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Pipeline + dashboards so you know what’s working (and what’s leaking)."
                  it="Pipeline + dashboards so you know what’s working (and what’s leaking)."
                />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="Built for your industry" it="Built for your industry" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
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
                className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)]"
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
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="Your growth is leaking." it="Your growth is leaking." />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="Most businesses don’t have a lead generation problem — they have a follow-up and conversion problem."
                it="Most businesses don’t have a lead generation problem — they have a follow-up and conversion problem."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="What’s happening today" it="What’s happening today" />
              </div>
              <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-slate)]">
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue)]" />
                  <Bilingual en="Leads are lost after the first visit." it="Leads are lost after the first visit." />
                </div>
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue)]" />
                  <Bilingual en="Sales doesn’t follow up consistently." it="Sales doesn’t follow up consistently." />
                </div>
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue)]" />
                  <Bilingual en="Your website doesn’t convert." it="Your website doesn’t convert." />
                </div>
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue)]" />
                  <Bilingual en="Ads waste budget on low-quality leads." it="Ads waste budget on low-quality leads." />
                </div>
                <div className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue)]" />
                  <Bilingual en="No visibility into what’s working." it="No visibility into what’s working." />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="The cost" it="The cost" />
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="You pay for traffic… then lose the sale because the system can’t capture, qualify, and follow up fast enough."
                  it="You pay for traffic… then lose the sale because the system can’t capture, qualify, and follow up fast enough."
                />
              </p>
              <div className="mt-5 rounded-2xl border border-black/5 bg-[var(--color-background)] p-4">
                <div className="text-xs font-semibold tracking-wide text-[var(--color-navy)]/70">
                  <Bilingual en="Simple fix" it="Simple fix" />
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--color-navy)]">
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
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="One system. One flow." it="One system. One flow." />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="Traffic is useless without a path to revenue. Webrrand connects every step — from first click to closed deal."
                it="Traffic is useless without a path to revenue. Webrrand connects every step — from first click to closed deal."
              />
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
              <div className="rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Traffic" it="Traffic" />
              </div>
              <div className="hidden items-center justify-center text-[var(--color-slate)] md:flex">→</div>
              <div className="rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Landing" it="Landing" />
              </div>
              <div className="hidden items-center justify-center text-[var(--color-slate)] md:flex">→</div>
              <div className="rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="CRM" it="CRM" />
              </div>
              <div className="hidden items-center justify-center text-[var(--color-slate)] md:flex">→</div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-6">
              <div className="rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Automation" it="Automation" />
              </div>
              <div className="hidden items-center justify-center text-[var(--color-slate)] md:flex">→</div>
              <div className="rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Sales" it="Sales" />
              </div>
              <div className="hidden items-center justify-center text-[var(--color-slate)] md:flex">→</div>
              <div className="rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)] md:col-span-2">
                <Bilingual en="Dashboard" it="Dashboard" />
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--color-slate)]">
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
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="We don’t sell tools." it="We don’t sell tools." />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
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
                className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-semibold text-[var(--color-navy)]"
              >
                {m}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-5">
            <div className="text-sm font-semibold text-[var(--color-navy)]">
              <Bilingual en="Everything works together." it="Everything works together." />
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
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
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="Results you can measure" it="Results you can measure" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="Illustrative but realistic outcomes when the whole system works together."
                it="Illustrative but realistic outcomes when the whole system works together."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--color-navy)]">+40–60%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="More qualified leads" it="More qualified leads" />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--color-navy)]">+25–40%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Higher conversion rate" it="Higher conversion rate" />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--color-navy)]">+30%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Sales close rate" it="Sales close rate" />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--color-navy)]">–40%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Manual work" it="Manual work" />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="Real results" it="Real results" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="Examples of what happens when you replace disconnected tools with one revenue system."
                it="Examples of what happens when you replace disconnected tools with one revenue system."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--color-navy)]">+127%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Qualified leads (E-commerce)" it="Qualified leads (E-commerce)" />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--color-navy)]">–43%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Sales cycle (B2B)" it="Sales cycle (B2B)" />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--color-navy)]">+18%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Average ticket (Restaurant)" it="Average ticket (Restaurant)" />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-3xl font-semibold tracking-tight text-[var(--color-navy)]">–64%</div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="No-show (Hotel)" it="No-show (Hotel)" />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="Who it’s for" it="Who it’s for" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="If you need predictable leads and a faster path to sales, this is built for you."
                it="If you need predictable leads and a faster path to sales, this is built for you."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Small B2B companies" it="Small B2B companies" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="More pipeline, less guesswork." it="More pipeline, less guesswork." />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Agencies" it="Agencies" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Productized systems you can deliver." it="Productized systems you can deliver." />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Restaurants / retail" it="Restaurants / retail" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Local traffic to booked customers." it="Local traffic to booked customers." />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Franchises" it="Franchises" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Consistent lead flow across locations." it="Consistent lead flow across locations." />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Service businesses" it="Service businesses" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="Follow-up that wins the job." it="Follow-up that wins the job." />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="muted">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="How it works" it="How it works" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="A simple 3-step process designed to get results fast — then improve them every month."
                it="A simple 3-step process designed to get results fast — then improve them every month."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-xs font-semibold tracking-wide text-[var(--color-navy)]/70">01</div>
              <div className="mt-2 text-lg font-semibold text-[var(--color-navy)]">
                <Bilingual en="Diagnose" it="Diagnose" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="We analyze your current funnel." it="We analyze your current funnel." />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-xs font-semibold tracking-wide text-[var(--color-navy)]/70">02</div>
              <div className="mt-2 text-lg font-semibold text-[var(--color-navy)]">
                <Bilingual en="Build" it="Build" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="We install the system." it="We install the system." />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-xs font-semibold tracking-wide text-[var(--color-navy)]/70">03</div>
              <div className="mt-2 text-lg font-semibold text-[var(--color-navy)]">
                <Bilingual en="Scale" it="Scale" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en="We optimize every month." it="We optimize every month." />
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              <Bilingual en="Packages" it="Packages" />
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              <Bilingual
                en="Outcome-based packages — pick what you want to achieve, and we’ll build the system around it."
                it="Outcome-based packages — pick what you want to achieve, and we’ll build the system around it."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Get More Leads" it="Get More Leads" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Increase inbound leads with high-converting pages and smarter acquisition."
                  it="Increase inbound leads with high-converting pages and smarter acquisition."
                />
              </div>
              <div className="mt-5">
                <Link
                  href="/audit"
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  <Bilingual en="Start audit" it="Start audit" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Get More Sales" it="Get More Sales" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Improve close rate with CRM stages, follow-up automation, and sales visibility."
                  it="Improve close rate with CRM stages, follow-up automation, and sales visibility."
                />
              </div>
              <div className="mt-5">
                <Link
                  href="/audit"
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  <Bilingual en="Start audit" it="Start audit" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Automate Operations" it="Automate Operations" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Reduce manual work with automation across leads, messaging, and internal workflows."
                  it="Reduce manual work with automation across leads, messaging, and internal workflows."
                />
              </div>
              <div className="mt-5">
                <Link
                  href="/audit"
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                >
                  <Bilingual en="Start audit" it="Start audit" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en="Smart Retail System" it="Smart Retail System" />
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual
                  en="Turn local demand into customers with tracking, follow-up, and simple reporting."
                  it="Turn local demand into customers with tracking, follow-up, and simple reporting."
                />
              </div>
              <div className="mt-5">
                <Link
                  href="/audit"
                  className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
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
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
            <Bilingual
              en="Tell us what you want to achieve — get a plan in 24h"
              it="Tell us what you want to achieve — get a plan in 24h"
            />
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
            <Bilingual
              en="Get a clear roadmap of what to fix, what to build, and what will move revenue this month."
              it="Get a clear roadmap of what to fix, what to build, and what will move revenue this month."
            />
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/audit"
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              <Bilingual en="Start Now" it="Start Now" />
            </Link>
            <Link
              href="/audit"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-white"
            >
              <Bilingual en="Get a Free System Audit" it="Get a Free System Audit" />
            </Link>
          </div>
        </div>
      </SectionBand>
    </div>
  );
}

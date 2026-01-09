import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import { insights } from "@/lib/content";

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = insights.find((x) => x.slug === params.slug);
  const title = post ? `${post.title} | Insights | Webrrand` : "Insights | Webrrand";
  const description = post ? post.excerpt : "Insight.";

  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default function InsightDetailPage({ params }: { params: { slug: string } }) {
  const post = insights.find((x) => x.slug === params.slug);

  if (!post) {
    return (
      <div className="space-y-4">
        <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
          Insight not found
        </h1>
        <Link className="text-sm font-semibold text-[var(--color-blue)]" href="/insights">
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <PageShell
      kicker="Insights"
      title={post.title}
      subtitle={post.excerpt}
      primaryCta={{ href: "/contact", label: "Book a Call" }}
    >
      <section className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-slate)]">
            {post.category}
            <span className="text-[var(--color-slate)]"> · </span>
            {post.date}
          </div>

          <div className="space-y-3 text-sm leading-6 text-[var(--color-slate)]">
            <p>
              This is a short, focused note designed to be practical.
            </p>
            <p>
              If you want, we can map this insight into a concrete checklist for your website + custom CRM.
            </p>
            <p>
              The goal: clarity in the message, fewer steps in the funnel, and measurable outcomes.
            </p>
          </div>

          <div className="pt-2">
            <Link className="text-sm font-semibold text-[var(--color-blue)]" href="/insights">
              All insights
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Want the playbook for your case?"
        subtitle="Share your context. We’ll reply with a relevant insight and a practical next step."
        primary={{ href: "/contact", label: "Book a Call" }}
        secondary={{ href: "/work", label: "View Work" }}
      />
    </PageShell>
  );
}

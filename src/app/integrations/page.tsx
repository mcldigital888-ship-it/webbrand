import Link from "next/link";

export default function IntegrationsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          Integrations
        </div>
        <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
          Connect everything without rebuilding your site.
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
          This site is built as a central hub: forms → webhook → automation → CRM/WhatsApp/Email/Analytics.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">What we connect</div>
          <div className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
            <div>CRM: HubSpot / Zoho / GHL / Pipedrive</div>
            <div>WhatsApp: Twilio / 360dialog / BSP</div>
            <div>Email: Brevo / Mailchimp / HubSpot sequences</div>
            <div>Analytics: GA4 / Meta Pixel / server-side later</div>
            <div>AI: Make / n8n / external assistants</div>
          </div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="text-sm font-semibold text-[var(--color-navy)]">Start</div>
          <div className="mt-3 text-sm text-[var(--color-slate)]">
            Use Oracolo to submit your brief.
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Link
              href="/oracolo"
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              data-cta="integrations_oracolo"
            >
              Start Oracolo
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              data-cta="integrations_contact"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

export default function AiSystemsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          AI Systems
        </div>
        <h1 className="max-w-4xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-5xl">
          AI assistants and automations (explained).
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
          This website does not run AI. It is prepared to connect to AI workflows later via Make/n8n/Zapier and APIs.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 md:col-span-2">
          <div className="space-y-4 text-sm leading-6 text-[var(--color-slate)]">
            <div>
              Examples of what can be connected tomorrow:
            </div>
            <div>
              - Form → CRM → Email/WhatsApp follow-up (automation tool handles messaging)
            </div>
            <div>
              - Lead scoring triggers → tasks, reminders, routing
            </div>
            <div>
              - Knowledge base + support assistant (external platform)
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--color-navy)]">Next step</div>
            <div className="text-sm text-[var(--color-slate)]">
              Submit your goal and constraints. We’ll recommend the safest integration path.
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/oracolo"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                data-cta="ai_oracolo"
              >
                Start Oracolo
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
                data-cta="ai_contact"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CTASection from "@/components/CTASection";
import Bilingual from "@/components/Bilingual";
import aboutPhoto from "../../../fotos/generalbackgorund.png";

export const metadata: Metadata = {
  title: "About | Webrrand",
  description:
    "A premium studio built to ship strategy, brand, and web systems with measurable impact.",
  openGraph: {
    title: "About | Webrrand",
    description:
      "A premium studio built to ship strategy, brand, and web systems with measurable impact.",
    type: "website",
  },
};

const values = [
  {
    title: { en: "Clarity", it: "Chiarezza" },
    desc: {
      en: "Short words. Sharp structure. Fewer decisions—better ones.",
      it: "Poche parole. Struttura netta. Meno decisioni — migliori.",
    },
  },
  {
    title: { en: "Craft", it: "Qualità" },
    desc: {
      en: "Premium doesn’t mean loud. It means disciplined.",
      it: "Premium non vuol dire rumoroso. Vuol dire disciplina.",
    },
  },
  {
    title: { en: "Measurable impact", it: "Impatto misurabile" },
    desc: {
      en: "We optimize for outcomes, not opinions.",
      it: "Ottimizziamo per risultati, non opinioni.",
    },
  },
];

const steps = ["Discover", "Design", "Build", "Launch", "Optimize"];

export default function AboutPage() {
  return (
    <PageShell
      kicker={<Bilingual en="About" it="Chi siamo" />}
      title={<Bilingual en="Built to ship the signal" it="Costruito per far arrivare il messaggio" />}
      subtitle={
        <Bilingual
          en="We combine speed with judgment to create systems that drive measurable growth."
          it="Uniamo velocità e giudizio per creare sistemi che portano crescita misurabile."
        />
      }
      primaryCta={{ href: "/contact", label: <Bilingual en="Contact" it="Contatti" /> }}
    >
      <section className="overflow-hidden rounded-2xl border border-white/10">
        <div
          className="h-64 w-full bg-contain bg-center bg-no-repeat md:h-72"
          style={{ backgroundImage: `url(${aboutPhoto.src})` }}
          aria-hidden="true"
        />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title.en}
            className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6"
          >
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                <Bilingual en={v.title.en} it={v.title.it} />
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                <Bilingual en={v.desc.en} it={v.desc.it} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-8">
        <div className="space-y-2">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            <Bilingual en="Our process" it="Il processo" />
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-slate)]">
            <Bilingual
              en="A simple five-step loop designed for speed, clarity, and continuous improvement."
              it="Un ciclo semplice in 5 step progettato per velocità, chiarezza e miglioramento continuo."
            />
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
          {steps.map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm font-semibold text-[var(--ds-text)]"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            <Bilingual en="Team" it="Team" />
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-slate)]">
            <Bilingual
              en="Small, senior, and fast. We partner with specialists when needed—but keep the core tight."
              it="Piccolo, senior e veloce. Collaboriamo con specialisti quando serve, mantenendo il core essenziale."
            />
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
            <Bilingual en="Mission" it="Mission" />
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-slate)]">
            <Bilingual
              en="Help modern teams ship premium digital systems that turn attention into action."
              it="Aiutare team moderni a costruire sistemi digitali che trasformano attenzione in azione."
            />
          </p>
        </div>
      </section>

      <CTASection
        title={<Bilingual en="Ready to build together?" it="Pronto a costruire insieme?" />}
        subtitle={
          <Bilingual
            en="If you value clarity, speed, and measurable impact—let’s talk."
            it="Se cerchi chiarezza, velocità e impatto misurabile, parliamone."
          />
        }
        primary={{ href: "/contact", label: <Bilingual en="Contact" it="Contatti" /> }}
        secondary={{ href: "/services", label: <Bilingual en="View Services" it="Vedi servizi" /> }}
      />
    </PageShell>
  );
}

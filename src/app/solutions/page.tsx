export default function SolutionsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm font-semibold tracking-wide text-[var(--color-cyan)]">
          Soluzioni
          <span className="text-[var(--color-slate)]"> / </span>
          Solutions
        </div>
        <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-navy)] sm:text-6xl">
          Sei qui per una di queste cose. Clicca e vai dritto.
          <br />
          You’re here for one of these. Click and go straight.
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
          Ogni percorso è progettato per un obiettivo specifico, con KPI e deliverable chiari.
          <br />
          Each track is built around one goal, with clear KPIs and deliverables.
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-[var(--color-background)] p-6 sm:p-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <GoalRow
              number="1"
              titleIt="Mi serve un sito che converta"
              titleEn="I need a website that converts"
              descIt="Architettura UX, copy strategico, tracking eventi e integrazione CRM."
              descEn="Conversion UX, strategic copy, event tracking, and CRM integration."
              href="#sito-che-converte"
            />
            <GoalRow
              number="2"
              titleIt="Mi serve una landing per ADS"
              titleEn="I need a landing page for ads"
              descIt="Pagina singola ottimizzata per campagne: anti-frizione e tracciamento completo."
              descEn="Single-page optimized for campaigns: zero friction and full tracking."
              href="#landing-ads"
            />
            <GoalRow
              number="3"
              titleIt="Mi serve gestione social + contenuti"
              titleEn="I need social + content"
              descIt="Calendario editoriale, produzione, format ricorrenti e collegamento a funnel/CRM."
              descEn="Editorial calendar, production, repeatable formats, connected to funnel/CRM."
              href="#social-contenuti"
            />
            <GoalRow
              number="4"
              titleIt="Voglio più lead (funnel completo)"
              titleEn="I want more leads (full funnel)"
              descIt="Lead magnet, nurturing automatizzato, retargeting e dashboard performance."
              descEn="Lead magnet, automated nurturing, retargeting, and performance dashboard."
              href="#funnel-completo"
            />
            <GoalRow
              number="5"
              titleIt="Voglio un CRM che chiuda"
              titleEn="I want a CRM that closes"
              descIt="Pipeline, scoring, follow-up multi-canale e reporting vendite in real-time."
              descEn="Pipeline, lead scoring, multi-channel follow-up, real-time sales reporting."
              href="#crm-che-chiude"
            />
            <GoalRow
              number="6"
              titleIt="Voglio automazioni e AI"
              titleEn="I want automations + AI"
              descIt="Workflow intelligenti, assistenti conversazionali e AI apps verticali."
              descEn="Workflows, conversational assistants, vertical AI apps."
              href="#automazioni-ai"
            />
            <GoalRow
              number="7"
              titleIt="Mi servono integrazioni / software custom"
              titleEn="I need integrations / custom software"
              descIt="Collegamento strumenti esistenti, eliminazione passaggi manuali, custom quando serve."
              descEn="Connect existing tools, remove manual steps, custom when needed."
              href="#integrazioni-custom"
            />
            <GoalRow
              number="8"
              titleIt="Food/Retail: voglio soluzioni smart"
              titleEn="Food/Retail: I need smart solutions"
              descIt="Ordering, loyalty, upsell e data capture integrati con gestionale e CRM."
              descEn="Ordering, loyalty, upsell and data capture connected to POS/CRM."
              href="#food-retail"
            />
          </div>
        </div>
      </section>

      <TrackSection
        id="sito-che-converte"
        kickerIt="Sito che converte"
        kickerEn="Conversion-first website"
        problemIt="Un sito bello non basta. Deve guidare e convertire."
        problemEn="A pretty site isn’t enough. It must guide and convert."
        build={[
          { it: "Architettura pagine + copy UX", en: "Information architecture + UX copy" },
          { it: "CTA structure + proof + FAQ", en: "CTA structure + proof + FAQ" },
          { it: "Tracking eventi + integrazione CRM", en: "Event tracking + CRM integration" },
        ]}
        kpis={[
          { it: "Conversion rate: +25–40% (target)", en: "Conversion rate: +25–40% (target)" },
          { it: "Drop-off ridotto sopra il fold", en: "Reduced above-the-fold drop-off" },
        ]}
        ctaHref="/oracolo?track=sito-che-converte"
        ctaIt="Start with this"
        ctaEn="Start with this"
      />

      <TrackSection
        id="landing-ads"
        kickerIt="Landing per ADS"
        kickerEn="Landing for ads"
        problemIt="1 pagina, 1 obiettivo, 0 distrazioni."
        problemEn="One page, one goal, zero distractions."
        build={[
          { it: "Headline testate + varianti", en: "Tested headlines + variants" },
          { it: "Hero + proof immediata + benefici", en: "Hero + immediate proof + benefits" },
          { it: "Form ottimizzato + automazioni follow-up", en: "Optimized form + follow-up automations" },
          { it: "Tracking eventi completo + retargeting audiences", en: "Full event tracking + retargeting audiences" },
        ]}
        kpis={[
          { it: "CPL target: -15–35%", en: "CPL target: -15–35%" },
          { it: "Form completion rate: +10–25%", en: "Form completion rate: +10–25%" },
        ]}
        ctaHref="/oracolo?track=landing-ads"
        ctaIt="Start with this"
        ctaEn="Start with this"
        extra={
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Cosa include (Deliverable)
                <span className="text-[var(--color-slate)]"> / </span>
                What’s included
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                Struttura anti-frizione progettata per massimizzare conversioni: promessa chiara, prove, form ottimizzato,
                follow-up e tracking completo.
                <span className="text-[var(--color-slate)]"> / </span>
                A frictionless structure designed to maximize conversions: clear promise, proof, optimized form, follow-up,
                and full tracking.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DeliverableCard
                titleIt="Headline testate + varianti"
                titleEn="Tested headlines + variants"
                bodyIt="Versioni multiple + A/B test continuo per identificare messaggi che performano (problema, risultato, velocità, garanzia)."
                bodyEn="Multiple variants + ongoing A/B testing to identify the best-performing message (problem, outcome, speed, guarantee)."
              />
              <DeliverableCard
                titleIt="Hero + proof immediata"
                titleEn="Hero + immediate proof"
                bodyIt="Promessa principale sopra il fold + credibilità visibile (numeri, rating, certificazioni, media mention)."
                bodyEn="Above-the-fold promise + visible credibility (numbers, ratings, certifications, media mentions)."
              />
              <DeliverableCard
                titleIt="Benefici + credibilità"
                titleEn="Benefits + credibility"
                bodyIt="Benefici concreti e misurabili supportati da proof (prima/dopo, case, testimonial)."
                bodyEn="Concrete, measurable benefits supported by proof (before/after, case, testimonials)."
              />
              <DeliverableCard
                titleIt="Form ottimizzato"
                titleEn="Optimized form"
                bodyIt="Campi minimi ma utili, labels chiare, microcopy rassicurante, validazione friendly."
                bodyEn="Minimal but useful fields, clear labels, reassuring microcopy, friendly validation."
              />
              <DeliverableCard
                titleIt="Tracking eventi completo"
                titleEn="Full event tracking"
                bodyIt="Eventi su scroll, click, form start/submit/abandon, video play, CTA. Tutto in un conversion dashboard."
                bodyEn="Events for scroll, clicks, form start/submit/abandon, video plays, CTAs. Centralized in a conversion dashboard."
              />
              <DeliverableCard
                titleIt="Automazioni follow-up"
                titleEn="Follow-up automations"
                bodyIt="Lead entra in CRM con sorgente campagna. Sequenze email/WhatsApp + reminder task."
                bodyEn="Lead enters CRM with campaign source. Email/WhatsApp sequences + task reminders."
              />
              <DeliverableCard
                titleIt="Retargeting audiences"
                titleEn="Retargeting audiences"
                bodyIt="Pixel + audience (visitors, form-start, video 50%, scroll 75%). Messaggi personalizzati per segmento."
                bodyEn="Pixel + audiences (visitors, form-start, video 50%, scroll 75%). Segment-based messaging."
              />
              <DeliverableCard
                titleIt="Trigger neuromarketing"
                titleEn="Neuromarketing triggers"
                bodyIt="Urgency/garanzia/social proof quantificato usati con criterio per ridurre indecisione."
                bodyEn="Urgency/guarantee/quantified social proof used deliberately to reduce hesitation."
              />
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Esempi di CTA efficaci
                <span className="text-[var(--color-slate)]"> / </span>
                Effective CTAs
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { it: "Prenota Demo", en: "Book a demo" },
                  { it: "Richiedi Preventivo", en: "Request a quote" },
                  { it: "Scarica Guida", en: "Download guide" },
                  { it: "Calcola Risparmio", en: "Calculate savings" },
                ].map((c) => (
                  <div key={c.en} className="rounded-xl border border-black/5 bg-[var(--color-background)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)]">
                    {c.it}
                    <span className="text-[var(--color-slate)]"> / </span>
                    {c.en}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <TrackSection
        id="social-contenuti"
        tone="green"
        kickerIt="Social + contenuti"
        kickerEn="Social + content"
        problemIt="Non post per post. Un sistema che costruisce domanda e porta contatti."
        problemEn="Not posts for posts. A system that builds demand and generates contacts."
        build={[
          { it: "Pilastri contenuto + format ricorrenti", en: "Content pillars + repeatable formats" },
          { it: "Calendario editoriale + produzione", en: "Editorial calendar + production" },
          { it: "Community management + reporting", en: "Community management + reporting" },
          { it: "Collegamento a funnel/landing/CRM", en: "Connected to funnel/landing/CRM" },
        ]}
        kpis={[
          { it: "Lead qualificati via DM/form", en: "Qualified leads via DM/form" },
          { it: "Cost per lead stabile", en: "Stable cost per lead" },
        ]}
        ctaHref="/oracolo?track=social-contenuti"
        ctaIt="Start with this"
        ctaEn="Start with this"
        extra={
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-white">
                Cosa include (super specific)
                <span className="text-white/70"> / </span>
                What’s included (super specific)
              </div>
              <div className="text-sm leading-6 text-white/75">
                Strategia → formati → produzione → distribuzione → ottimizzazione. Ogni contenuto è collegato a un’azione
                tracciabile.
                <span className="text-white/70"> / </span>
                Strategy → formats → production → distribution → optimization. Every piece is connected to a trackable
                action.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ToneGridCard
                tone="green"
                titleIt="Analisi iniziale"
                titleEn="Initial analysis"
                bodyIt="Audit profilo: cosa funziona, benchmark, gap contenuti, opportunità non sfruttate."
                bodyEn="Profile audit: what works, benchmarks, content gaps, missed opportunities."
              />
              <ToneGridCard
                tone="green"
                titleIt="Pilastri contenuto"
                titleEn="Content pillars"
                bodyIt="Definizione 4–6 pilastri (expertise, behind the scenes, proof, education) con KPI e CTA."
                bodyEn="Define 4–6 pillars (expertise, BTS, proof, education) with KPIs and CTAs."
              />
              <ToneGridCard
                tone="green"
                titleIt="Format ricorrenti"
                titleEn="Repeatable formats"
                bodyIt="10–15 format testati (reels, carousel, stories, Q&A, case) per produzione efficiente."
                bodyEn="10–15 tested formats (reels, carousels, stories, Q&A, cases) for efficient production."
              />
              <ToneGridCard
                tone="green"
                titleIt="Calendario editoriale"
                titleEn="Editorial calendar"
                bodyIt="Piano mensile con distribution plan, timing, e hook/CTA per ogni contenuto."
                bodyEn="Monthly plan with distribution, timing, and hook/CTA per asset."
              />
              <ToneGridCard
                tone="green"
                titleIt="Community management"
                titleEn="Community management"
                bodyIt="Gestione commenti/DM: risposta in 2h in orario lavorativo, escalation lead."
                bodyEn="Comment/DM handling: 2h response during business hours, lead escalation."
              />
              <ToneGridCard
                tone="green"
                titleIt="Reporting"
                titleEn="Reporting"
                bodyIt="KPI reali: reach, engagement rate, click, lead, attribuzione. Ottimizzazione mensile."
                bodyEn="Real KPIs: reach, engagement rate, clicks, leads, attribution. Monthly optimization."
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <div className="text-sm font-semibold text-white">
                Format che convertono
                <span className="text-white/70"> / </span>
                Formats that convert
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  {
                    it: "Hook → Problema → Prova → CTA",
                    en: "Hook → Problem → Proof → CTA",
                  },
                  {
                    it: "Serie episodiche (settimana)",
                    en: "Episodic series (weekly)",
                  },
                  {
                    it: "Proof (prima/dopo, case, BTS)",
                    en: "Proof (before/after, cases, BTS)",
                  },
                ].map((c) => (
                  <div key={c.en} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                    {c.it}
                    <span className="text-white/70"> / </span>
                    {c.en}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <TrackSection
        id="funnel-completo"
        kickerIt="Funnel completo"
        kickerEn="Full funnel"
        problemIt="Lead arrivano ma non si trasformano in vendite."
        problemEn="Leads come in but don’t turn into revenue."
        build={[
          { it: "Lead magnet + landing + nurturing", en: "Lead magnet + landing + nurturing" },
          { it: "Retargeting + audience segmentation", en: "Retargeting + audience segmentation" },
          { it: "CRM pipeline + scoring", en: "CRM pipeline + scoring" },
        ]}
        kpis={[
          { it: "Lead→meeting: +20–35%", en: "Lead→meeting: +20–35%" },
          { it: "Tempo risposta ridotto", en: "Reduced response time" },
        ]}
        ctaHref="/oracolo?track=funnel-completo"
        ctaIt="Start with this"
        ctaEn="Start with this"
        extra={
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">
                Marketing che porta clienti, non vanity metrics
                <span className="text-[var(--color-slate)]"> / </span>
                Marketing that brings clients, not vanity metrics
              </div>
              <div className="text-sm leading-6 text-[var(--color-slate)]">
                Social, campagne e content sono integrati con landing ottimizzate, CRM e tracciamenti completi.
                Misuriamo lead generati, demo prenotate e vendite chiuse. Ogni euro speso deve avere ROI tracciabile.
                <span className="text-[var(--color-slate)]"> / </span>
                Social, campaigns and content connect to optimized landing pages, CRM, and full tracking.
                We measure generated leads, booked demos and closed revenue. Every euro must have trackable ROI.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-black/5 bg-white p-6 md:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      itT: "Content Creation",
                      enT: "Content creation",
                      itD: "Format replicabili, hook, CTA, lead magnet.",
                      enD: "Repeatable formats, hooks, CTAs, lead magnets.",
                    },
                    {
                      itT: "Paid Advertising",
                      enT: "Paid advertising",
                      itD: "Campagne Meta/Google con tracking e budget allocato dove converte.",
                      enD: "Meta/Google campaigns with tracking and budget allocated where it converts.",
                    },
                    {
                      itT: "Lead Capture",
                      enT: "Lead capture",
                      itD: "Form + CRM + routing, friction ridotta, qualification.",
                      enD: "Forms + CRM + routing, reduced friction, qualification.",
                    },
                    {
                      itT: "Nurturing",
                      enT: "Nurturing",
                      itD: "Sequenze email/WhatsApp basate su comportamento e scoring.",
                      enD: "Email/WhatsApp sequences based on behavior and scoring.",
                    },
                    {
                      itT: "Sales Conversion",
                      enT: "Sales conversion",
                      itD: "CRM, pipeline, follow-up, closing routine.",
                      enD: "CRM, pipeline, follow-up, closing routine.",
                    },
                    {
                      itT: "Optimization",
                      enT: "Optimization",
                      itD: "Analisi dati, A/B test continuo, budget reallocation.",
                      enD: "Data analysis, continuous A/B testing, budget reallocation.",
                    },
                  ].map((x) => (
                    <div key={x.enT} className="rounded-xl border border-black/5 bg-[var(--color-background)] p-4">
                      <div className="text-sm font-semibold text-[var(--color-navy)]">
                        {x.itT}
                        <span className="text-[var(--color-slate)]"> / </span>
                        {x.enT}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-[var(--color-slate)]">
                        {x.itD}
                        <span className="text-[var(--color-slate)]"> / </span>
                        {x.enD}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-6">
                <div className="text-sm font-semibold text-[var(--color-navy)]">
                  Scegli cosa ti serve
                  <span className="text-[var(--color-slate)]"> / </span>
                  Choose what you need
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {[
                    {
                      itT: "Social Media Management",
                      enT: "Social media management",
                      itD: "Gestione completa profili: calendario, community, DM, collegamento a funnel.",
                      enD: "Full profile management: calendar, community, DMs, funnel connection.",
                      track: "social-contenuti",
                    },
                    {
                      itT: "Growth Engine (funnel completo)",
                      enT: "Growth engine (full funnel)",
                      itD: "Sistema integrato: acquisizione lead + nurturing + dashboard performance.",
                      enD: "Integrated system: lead acquisition + nurturing + performance dashboard.",
                      track: "funnel-completo",
                    },
                    {
                      itT: "Ads Performance",
                      enT: "Ads performance",
                      itD: "Campaign build, testing, budget optimization, conversion tracking.",
                      enD: "Campaign build, testing, budget optimization, conversion tracking.",
                      track: "landing-ads",
                    },
                    {
                      itT: "Content System",
                      enT: "Content system",
                      itD: "Piano + produzione contenuti scalabile: 1 contenuto master → 10+ varianti.",
                      enD: "Scalable content production: 1 master asset → 10+ variants.",
                      track: "social-contenuti",
                    },
                  ].map((c) => (
                    <a
                      key={c.enT}
                      href={`/oracolo?track=${c.track}`}
                      className="rounded-xl border border-[rgba(7,22,51,0.12)] bg-white px-4 py-3 transition-colors hover:bg-[var(--color-background)]"
                    >
                      <div className="text-sm font-semibold text-[var(--color-navy)]">
                        {c.itT}
                        <span className="text-[var(--color-slate)]"> / </span>
                        {c.enT}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-[var(--color-slate)]">
                        {c.itD}
                        <span className="text-[var(--color-slate)]"> / </span>
                        {c.enD}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/oracolo?track=funnel-completo"
                className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                Richiedi Growth Plan (30 giorni)
                <span className="text-white/70"> / </span>
                Request Growth Plan (30 days)
              </a>
              <a
                href="/case-studies"
                className="inline-flex w-fit rounded-full border border-[var(--color-navy)]/15 px-5 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]"
              >
                Vedi case marketing
                <span className="text-[var(--color-slate)]"> / </span>
                See marketing cases
              </a>
            </div>
          </div>
        }
      />

      <TrackSection
        id="crm-che-chiude"
        tone="orange"
        kickerIt="CRM che chiude"
        kickerEn="CRM that closes"
        problemIt="Un CRM che archivia contatti non basta: deve qualificare, assegnare priorità e chiudere."
        problemEn="A CRM that just stores contacts isn’t enough: it must qualify, prioritize, and close."
        build={[
          { it: "Pipeline strutturata + stage", en: "Structured pipeline + stages" },
          { it: "Lead scoring automatico", en: "Automatic lead scoring" },
          { it: "Automazioni follow-up multi-canale", en: "Multi-channel follow-up automations" },
          { it: "Dashboard vendite real-time", en: "Real-time sales dashboard" },
        ]}
        kpis={[
          { it: "Tempo risposta: -30–60%", en: "Response time: -30–60%" },
          { it: "Tasso chiusura: +10–25%", en: "Close rate: +10–25%" },
        ]}
        ctaHref="/oracolo?track=crm-che-chiude"
        ctaIt="Start with this"
        ctaEn="Start with this"
        extra={
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ToneGridCard
                tone="orange"
                titleIt="Pipeline strutturata"
                titleEn="Structured pipeline"
                bodyIt="Stadi chiari, regole, ownership, criteri di avanzamento, e routine operative documentate."
                bodyEn="Clear stages, rules, ownership, advancement criteria, and documented operating routines."
              />
              <ToneGridCard
                tone="orange"
                titleIt="Lead scoring automatico"
                titleEn="Automatic lead scoring"
                bodyIt="Punteggio su sorgente, intent, comportamento, fit. Priorità automatica per i lead più caldi."
                bodyEn="Score by source, intent, behavior, fit. Automatic prioritization for hottest leads."
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <div className="text-sm font-semibold text-white">
                Automazioni follow-up
                <span className="text-white/70"> / </span>
                Follow-up automations
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {[
                  { n: "1", it: "Nuovo lead entra (T+0)", en: "New lead enters (T+0)" },
                  { n: "2", it: "Lead qualificato (T+24h)", en: "Lead qualified (T+24h)" },
                  { n: "3", it: "Demo prenotata (T+1d)", en: "Demo booked (T+1d)" },
                  { n: "4", it: "Proposta inviata (T+2d)", en: "Proposal sent (T+2d)" },
                  { n: "5", it: "Silenzio → ripresa (T+7d)", en: "Silence → reactivation (T+7d)" },
                ].map((s) => (
                  <div key={s.n} className="grid grid-cols-[36px_1fr] gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-semibold text-black">
                      {s.n}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {s.it}
                      <span className="text-white/70"> / </span>
                      {s.en}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <div className="text-sm font-semibold text-white">
                Dashboard vendite
                <span className="text-white/70"> / </span>
                Sales dashboard
              </div>
              <div className="mt-2 text-sm leading-6 text-white/75">
                Metriche monitorate: lead in ingresso, conversion rate per stage, tempo medio, attività team, top
                performers e lag.
                <span className="text-white/70"> / </span>
                Metrics: incoming leads, stage conversion, average time, team activity, top performers, and lag.
              </div>
            </div>
          </div>
        }
      />

      <TrackSection
        id="automazioni-ai"
        kickerIt="Automazioni + AI"
        kickerEn="Automations + AI"
        problemIt="Troppi passaggi manuali. Serve velocità, controllo e governance."
        problemEn="Too many manual steps. You need speed, control, and governance."
        build={[
          { it: "AI automations per processi ripetitivi", en: "AI automations for repetitive processes" },
          { it: "AI assistants per supporto/qualifica", en: "AI assistants for support/qualification" },
          { it: "AI apps verticali (per settore/uso)", en: "Vertical AI apps (per sector/use case)" },
        ]}
        kpis={[
          { it: "Lavoro manuale: -15–30%", en: "Manual work: -15–30%" },
          { it: "Tempo ciclo: più veloce", en: "Cycle time: faster" },
        ]}
        ctaHref="/oracolo?track=automazioni-ai"
        ctaIt="Start with this"
        ctaEn="Start with this"
      />

      <TrackSection
        id="integrazioni-custom"
        kickerIt="Integrazioni / software custom"
        kickerEn="Integrations / custom software"
        problemIt="Tool scollegati = errori, ritardi, duplicazioni."
        problemEn="Disconnected tools = errors, delays, duplication."
        build={[
          { it: "Mappatura stack + flussi", en: "Stack + flow mapping" },
          { it: "Integrazioni con CRM/POS/ERP", en: "Integrations with CRM/POS/ERP" },
          { it: "Automazioni operative + custom", en: "Operational automation + custom" },
        ]}
        kpis={[
          { it: "Errori operativi ridotti", en: "Fewer operational errors" },
          { it: "Tempo interno risparmiato", en: "Saved internal time" },
        ]}
        ctaHref="/oracolo?track=integrazioni-custom"
        ctaIt="Start with this"
        ctaEn="Start with this"
        tone="green"
        extra={
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-white">
                Software e integrazioni. Zero lavoro manuale.
                <span className="text-white/70"> / </span>
                Software & integrations. Zero manual work.
              </div>
              <div className="text-sm leading-6 text-white/75">
                Colleghiamo POS, gestionali, ERP, CRM, marketing tools, chat, delivery e qualsiasi tool del tuo stack.
                Eliminazione passaggi manuali, riduzione errori, velocizzazione processi.
                <span className="text-white/70"> / </span>
                We connect POS/ERP/CRM/marketing tools/chat/delivery and any part of your stack to remove manual steps,
                reduce errors and speed up operations.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ToneGridCard
                tone="green"
                titleIt="Integrazioni native"
                titleEn="Native integrations"
                bodyIt="API ufficiali, webhooks, sincronizzazioni bidirezionali, gestione errori e log operazioni."
                bodyEn="Official APIs, webhooks, bi-directional sync, error handling, and operation logs."
              />
              <ToneGridCard
                tone="green"
                titleIt="Middleware custom"
                titleEn="Custom middleware"
                bodyIt="Quando standard non basta: estrazione dati, trasformazione formato, validazione, fallback e notifiche."
                bodyEn="When standard isn’t enough: data extraction, format transforms, validation, fallbacks and alerts."
              />
              <ToneGridCard
                tone="green"
                titleIt="Dashboard centralizzate"
                titleEn="Centralized dashboards"
                bodyIt="Vista unica su vendite/marketing/ops: KPI, alert, export, decision-making veloce."
                bodyEn="Single view across sales/marketing/ops: KPIs, alerts, exports, faster decisions."
              />
              <ToneGridCard
                tone="green"
                titleIt="Tool interni custom"
                titleEn="Custom internal tools"
                bodyIt="Configuratori, calcolatori, workflow approval, gestione prodotti/ordini/progetti su misura."
                bodyEn="Configurators, calculators, approvals, custom product/order/project workflows."
              />
              <ToneGridCard
                tone="green"
                titleIt="Automazioni Zapier/Make"
                titleEn="Zapier/Make automations"
                bodyIt="Quick wins: trigger/eventi tra app senza logica complessa. Setup veloce, manutenzione minima."
                bodyEn="Quick wins: event triggers across apps without complex logic. Fast setup, minimal maintenance."
              />
              <ToneGridCard
                tone="green"
                titleIt="Manutenzione evolutiva"
                titleEn="Ongoing maintenance"
                bodyIt="Le integrazioni cambiano: monitoraggio continuo, aggiornamenti, supporto su malfunzionamenti."
                bodyEn="Integrations change: continuous monitoring, updates, and support when things break."
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <div className="text-sm font-semibold text-white">
                Processo integrazione
                <span className="text-white/70"> / </span>
                Integration process
              </div>
              <ol className="mt-4 space-y-2 text-sm text-white/75">
                {[ 
                  {
                    it: "Audit stack: sistemi in uso, flussi, passaggi manuali, punti rottura.",
                    en: "Stack audit: systems in use, flows, manual steps, breakpoints.",
                  },
                  {
                    it: "Prioritizzazione: integrazioni con ROI più alto (tempo/errore/revenue).",
                    en: "Prioritization: highest-ROI integrations (time/errors/revenue).",
                  },
                  {
                    it: "Design flussi: architettura, mappatura campi, edge cases, piano fallback.",
                    en: "Flow design: architecture, field mapping, edge cases, fallback plan.",
                  },
                  {
                    it: "Implementazione: sviluppo, staging, validazione dati, go-live controllato e monitoring.",
                    en: "Implementation: build, staging, data validation, controlled go-live and monitoring.",
                  },
                  {
                    it: "Documentazione: diagrammi, schede tecniche, troubleshooting per il team.",
                    en: "Documentation: diagrams, tech sheets, troubleshooting for your team.",
                  },
                ].map((s, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                    <span>
                      {s.it}
                      <span className="text-white/70"> / </span>
                      {s.en}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/oracolo?track=integrazioni-custom"
                  className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-95"
                >
                  Richiedi Integration Check
                  <span className="text-black/60"> / </span>
                  Request integration check
                </a>
                <a
                  href="/contact"
                  className="inline-flex w-fit rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Descrivi stack
                  <span className="text-white/70"> / </span>
                  Describe your stack
                </a>
              </div>
            </div>
          </div>
        }
      />

      <TrackSection
        id="food-retail"
        kickerIt="Food/Retail smart"
        kickerEn="Food/Retail smart"
        problemIt="Code in cassa, errori, scontrino medio basso e poca raccolta dati."
        problemEn="Queues, errors, low average order value, weak data capture."
        build={[
          { it: "Ordering kiosk (totem) + upsell", en: "Ordering kiosk (totem) + upsell" },
          { it: "Loyalty + CRM integration", en: "Loyalty + CRM integration" },
          { it: "Data capture + automazioni", en: "Data capture + automations" },
        ]}
        kpis={[
          { it: "Tempo ordine: -X%", en: "Order time: -X%" },
          { it: "AOV/upsell: +X%", en: "AOV/upsell: +X%" },
        ]}
        ctaHref="/oracolo?track=food-retail"
        ctaIt="Start with this"
        ctaEn="Start with this"
      />

      <section className="rounded-3xl border border-black/5 bg-[var(--color-background)] p-6 sm:p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-navy)]">
              Soluzioni verticali per settori
              <br />
              Vertical solutions by sector
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--color-slate)]">
              Ogni settore ha problemi e KPI diversi. Costruiamo pacchetti verticali con moduli ottimizzati per il tuo
              mercato.
              <span className="text-[var(--color-slate)]"> / </span>
              Each sector has different bottlenecks and KPIs. We ship vertical packages built from optimized modules.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">Food / Hospitality</div>
              <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--color-slate)]">
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Problemi:</span> ordini caotici, no-show,
                  scontrino medio basso.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Soluzione:</span> totem + CRM loyalty +
                  automazioni.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">KPI:</span> AOV, no-show rate, ritorno clienti.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">Retail</div>
              <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--color-slate)]">
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Problemi:</span> ecommerce/negozio scollegati,
                  inventory non sincronizzato.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Soluzione:</span> omnichannel + POS/CRM +
                  retargeting.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">KPI:</span> conversion rate, CLV, stock turnover.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">Servizi B2B</div>
              <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--color-slate)]">
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Problemi:</span> lead dispersi, follow-up lento,
                  forecast imprecise.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Soluzione:</span> sito + landing + CRM pipeline +
                  nurturing.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">KPI:</span> lead qualified, close rate, cycle time.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6 md:col-span-2">
              <div className="text-sm font-semibold text-[var(--color-navy)]">Franchise</div>
              <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--color-slate)]">
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Problemi:</span> inconsistenza tra sedi, training
                  non standardizzato, marketing locale disperso.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Soluzione:</span> CRM centralizzato + dashboard
                  multi-sede + best practices.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">KPI:</span> compliance, performance per sede,
                  customer satisfaction.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-sm font-semibold text-[var(--color-navy)]">Studi / Professionisti</div>
              <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--color-slate)]">
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Problemi:</span> acquisizione casuale, nessun
                  sistema referral, poco follow-up.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">Soluzione:</span> sito + prenotazioni + CRM +
                  automazioni.
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-navy)]">KPI:</span> conversion, referral rate, DSO.
                </div>
              </div>
            </div>
          </div>

          <div>
            <a
              href="/oracolo"
              className="inline-flex w-fit rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              Vedi soluzione per il tuo settore
              <span className="text-white/70"> / </span>
              See your sector solution
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function GoalRow({
  number,
  titleIt,
  titleEn,
  descIt,
  descEn,
  href,
}: {
  number: string;
  titleIt: string;
  titleEn: string;
  descIt: string;
  descEn: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group grid grid-cols-[44px_1fr] gap-4 rounded-2xl border border-[rgba(7,22,51,0.12)] bg-white p-5 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(88,101,242,0.10)] text-sm font-semibold text-[var(--color-navy)]">
        {number}
      </div>
      <div className="space-y-1">
        <div className="text-sm font-semibold text-[var(--color-navy)]">
          {titleIt}
          <span className="text-[var(--color-slate)]"> / </span>
          {titleEn}
        </div>
        <div className="text-sm leading-6 text-[var(--color-slate)]">
          {descIt}
          <span className="text-[var(--color-slate)]"> / </span>
          {descEn}
        </div>
      </div>
    </a>
  );
}

function TrackSection({
  id,
  kickerIt,
  kickerEn,
  problemIt,
  problemEn,
  build,
  kpis,
  ctaHref,
  ctaIt,
  ctaEn,
  tone,
  extra,
}: {
  id: string;
  kickerIt: string;
  kickerEn: string;
  problemIt: string;
  problemEn: string;
  build: { it: string; en: string }[];
  kpis: { it: string; en: string }[];
  ctaHref: string;
  ctaIt: string;
  ctaEn: string;
  tone?: "green" | "orange";
  extra?: React.ReactNode;
}) {
  const toneClass =
    tone === "green"
      ? "bg-[#0b3d2a] text-white border-white/10"
      : tone === "orange"
        ? "bg-[#ff5a1f] text-white border-white/10"
        : "bg-[var(--color-surface)] text-[var(--color-navy)] border-black/5";

  const mutedText =
    tone ? "text-white/75" : "text-[var(--color-slate)]";

  return (
    <section id={id} className={["rounded-3xl border p-7 sm:p-10", toneClass].join(" ")}>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className={["text-xs font-semibold uppercase tracking-wide", mutedText].join(" ")}>
            {kickerIt} / {kickerEn}
          </div>
          <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight">
            {problemIt}
            <br />
            {problemEn}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={["rounded-2xl border p-6", tone ? "border-white/10 bg-white/10" : "border-black/5 bg-white"].join(" ")}>
            <div className={["text-sm font-semibold", tone ? "text-white" : "text-[var(--color-navy)]"].join(" ")}>
              What we build
              <span className={mutedText}> / </span>
              Cosa costruiamo
            </div>
            <ul className={["mt-4 space-y-2 text-sm", mutedText].join(" ")}>
              {build.map((b) => (
                <li key={b.en} className="flex gap-2">
                  <span className={["mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full", tone ? "bg-white/70" : "bg-[var(--color-cyan)]"].join(" ")} />
                  <span>
                    {b.it}
                    <span className={mutedText}> / </span>
                    {b.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={["rounded-2xl border p-6", tone ? "border-white/10 bg-white/10" : "border-black/5 bg-white"].join(" ")}>
            <div className={["text-sm font-semibold", tone ? "text-white" : "text-[var(--color-navy)]"].join(" ")}>
              KPI targets
              <span className={mutedText}> / </span>
              KPI target
            </div>
            <ul className={["mt-4 space-y-2 text-sm", mutedText].join(" ")}>
              {kpis.map((k) => (
                <li key={k.en} className="flex gap-2">
                  <span className={["mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full", tone ? "bg-white/70" : "bg-[var(--color-cyan)]"].join(" ")} />
                  <span>
                    {k.it}
                    <span className={mutedText}> / </span>
                    {k.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={ctaHref}
            className={[
              "inline-flex w-fit rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-95",
              tone ? "bg-white text-black" : "bg-[var(--color-blue)] text-white",
            ].join(" ")}
          >
            {ctaIt}
            <span className={tone ? "text-black/60" : "text-white/70"}> / </span>
            {ctaEn}
          </a>
          <a
            href="#top"
            className={[
              "inline-flex w-fit rounded-full border px-6 py-3 text-sm font-semibold transition-colors",
              tone
                ? "border-white/25 text-white hover:bg-white/10"
                : "border-[var(--color-navy)]/15 text-[var(--color-navy)] hover:border-[var(--color-navy)]/25 hover:bg-[var(--color-navy)]/[0.03]",
            ].join(" ")}
          >
            Back to top
            <span className={mutedText}> / </span>
            Torna su
          </a>
        </div>

        {extra ? <div className="pt-2">{extra}</div> : null}
      </div>
    </section>
  );
}

function DeliverableCard({
  titleIt,
  titleEn,
  bodyIt,
  bodyEn,
}: {
  titleIt: string;
  titleEn: string;
  bodyIt: string;
  bodyEn: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="space-y-2">
        <div className="text-sm font-semibold text-[var(--color-navy)]">
          {titleIt}
          <span className="text-[var(--color-slate)]"> / </span>
          {titleEn}
        </div>
        <div className="text-sm leading-6 text-[var(--color-slate)]">
          {bodyIt}
          <span className="text-[var(--color-slate)]"> / </span>
          {bodyEn}
        </div>
      </div>
    </div>
  );
}

function ToneGridCard({
  tone,
  titleIt,
  titleEn,
  bodyIt,
  bodyEn,
}: {
  tone: "green" | "orange";
  titleIt: string;
  titleEn: string;
  bodyIt: string;
  bodyEn: string;
}) {
  const base = "rounded-2xl border p-6";
  const wrap =
    tone === "green"
      ? "border-white/10 bg-white/10"
      : "border-white/10 bg-white/10";
  const title = "text-sm font-semibold text-white";
  const body = "text-sm leading-6 text-white/75";

  return (
    <div className={[base, wrap].join(" ")}>
      <div className="space-y-2">
        <div className={title}>
          {titleIt}
          <span className="text-white/70"> / </span>
          {titleEn}
        </div>
        <div className={body}>
          {bodyIt}
          <span className="text-white/70"> / </span>
          {bodyEn}
        </div>
      </div>
    </div>
  );
}

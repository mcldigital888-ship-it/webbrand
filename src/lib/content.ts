export type WorkTag = "Web" | "Brand" | "Performance" | "Content";

export type CaseStudy = {
  slug: string;
  client: string;
  outcome: string;
  oneLiner: string;
  tags: WorkTag[];
  challenge: string;
  solution: string;
  result: string;
  images: { alt: string }[];
  techStack: string[];
  deliverables: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "client-a-digital-refresh",
    client: "Client A",
    outcome: "+32% qualified leads",
    oneLiner: "Premium site rebuild with clearer messaging and faster paths to conversion.",
    tags: ["Web", "Performance"],
    challenge: "Strong traffic, weak conversion. Messaging didn’t match intent.",
    solution: "Re-structured IA, rebuilt key pages, and instrumented the funnel.",
    result: "Lift in form completions and higher-quality inquiries within 6 weeks.",
    images: [{ alt: "Project image 1" }, { alt: "Project image 2" }, { alt: "Project image 3" }],
    techStack: ["Next.js", "Tailwind", "Analytics"],
    deliverables: ["IA + UX", "UI system", "Build + launch"],
  },
  {
    slug: "client-b-brand-system",
    client: "Client B",
    outcome: "Sharper positioning",
    oneLiner: "Identity system designed to scale across web, product, and content.",
    tags: ["Brand", "Content"],
    challenge: "Inconsistent visuals and unclear voice across channels.",
    solution: "Built a brand system with tokens, guidelines, and templates.",
    result: "Cleaner output from the team and faster content production.",
    images: [{ alt: "Project image 1" }, { alt: "Project image 2" }, { alt: "Project image 3" }],
    techStack: ["Design system", "Figma"],
    deliverables: ["Brand identity", "Guidelines", "Templates"],
  },
  {
    slug: "client-c-performance-stack",
    client: "Client C",
    outcome: "Tracking fixed",
    oneLiner: "Analytics + experimentation foundation for repeatable growth.",
    tags: ["Performance", "Web"],
    challenge: "Decisions were based on partial data and inconsistent tracking.",
    solution: "Defined events, repaired instrumentation, and shipped dashboards.",
    result: "Reliable reporting and a clear experimentation cadence.",
    images: [{ alt: "Project image 1" }, { alt: "Project image 2" }, { alt: "Project image 3" }],
    techStack: ["Analytics", "Tagging"],
    deliverables: ["Tracking plan", "Dashboards", "Experiment reporting"],
  },
];

export type InsightCategory = "Strategy" | "Brand" | "Web" | "Performance" | "Content";

export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  date: string;
};

export const insights: InsightPost[] = [
  {
    slug: "message-hierarchy-that-converts",
    title: "Message hierarchy that converts",
    excerpt: "Big type is not the strategy. Clarity is. Here’s the hierarchy we use to guide decisions.",
    category: "Web",
    date: "2025-12-01",
  },
  {
    slug: "ai-speed-human-judgment",
    title: "AI speed, human judgment",
    excerpt: "AI compresses cycles. Humans protect the signal. This is how we run a modern studio.",
    category: "Strategy",
    date: "2025-11-18",
  },
  {
    slug: "tracking-first-growth",
    title: "Tracking-first growth",
    excerpt: "If you can’t trust the numbers, you can’t scale. Start with instrumentation.",
    category: "Performance",
    date: "2025-10-22",
  },
];

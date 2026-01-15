export type ProposalPack = {
  summary: {
    oneLiner: string;
    coreProblem: string;
    primaryGoal: string;
    expectedImpact: {
      leads: string;
      conversion: string;
      sales: string;
      ops: string;
    };
  };
  currentState: {
    assumptions: string[];
    risks: string[];
    quickWins: string[];
  };
  blueprint: {
    systemFlow: [
      "Traffic",
      "Landing",
      "CRM",
      "Automation",
      "Sales",
      "Dashboard",
    ];
    recommendedModules: Array<{
      module: "WEB" | "MARKETING" | "CRM" | "AI" | "INTEGRATIONS";
      why: string;
      deliverables: string[];
      kpis: string[];
    }>;
    timeline: Array<{
      phase: "Diagnose" | "Build" | "Scale";
      duration: string;
      deliverables: string[];
    }>;
  };
  kpiPlan: {
    northStar: string;
    metrics: Array<{ name: string; definition: string; target: string }>;
  };
  offer: {
    recommendedPackage:
      | "Lead Generation"
      | "Website Conversion"
      | "Sales System"
      | "AI Operations"
      | "Smart Retail"
      | "Full System";
    scope: string[];
    options: Array<{
      name: string;
      adds: string[];
      impact: {
        leads: string;
        conversion: string;
        sales: string;
        ops: string;
      };
    }>;
    pricingNote: string;
  };
  nextSteps: {
    actions: string[];
    callToAction: string;
  };
};

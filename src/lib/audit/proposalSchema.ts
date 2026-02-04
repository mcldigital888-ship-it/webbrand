import { z } from "zod";
import type { ProposalPack } from "@/lib/audit/proposal";

export const ProposalSchema: z.ZodType<ProposalPack> = z.object({
  summary: z.object({
    oneLiner: z.string().min(1),
    coreProblem: z.string().min(1),
    primaryGoal: z.string().min(1),
    expectedImpact: z.object({
      leads: z.string().min(1),
      conversion: z.string().min(1),
      sales: z.string().min(1),
      ops: z.string().min(1),
    }),
  }),
  currentState: z.object({
    assumptions: z.array(z.string().min(1)).default([]),
    risks: z.array(z.string().min(1)).default([]),
    quickWins: z.array(z.string().min(1)).min(5),
  }),
  blueprint: z.object({
    systemFlow: z.tuple([
      z.literal("Traffic"),
      z.literal("Landing"),
      z.literal("CRM"),
      z.literal("Automation"),
      z.literal("Sales"),
      z.literal("Dashboard"),
    ]),
    recommendedModules: z.array(
      z.object({
        module: z.enum(["WEB", "MARKETING", "CRM", "AI", "INTEGRATIONS"]),
        why: z.string().min(1),
        deliverables: z.array(z.string().min(1)).min(1),
        kpis: z.array(z.string().min(1)).min(1),
      })
    ),
    timeline: z.array(
      z.object({
        phase: z.enum(["Diagnose", "Build", "Scale"]),
        duration: z.string().min(1),
        deliverables: z.array(z.string().min(1)).min(1),
      })
    ),
  }),
  kpiPlan: z.object({
    northStar: z.string().min(1),
    metrics: z.array(
      z.object({
        name: z.string().min(1),
        definition: z.string().min(1),
        target: z.string().min(1),
      })
    ),
  }),
  offer: z.object({
    recommendedPackage: z.enum([
      "Lead Generation",
      "Website Conversion",
      "Sales System",
      "AI Operations",
      "Smart Retail",
      "Full System",
    ]),
    scope: z.array(z.string().min(1)).min(1),
    options: z.array(
      z.object({
        name: z.string().min(1),
        adds: z.array(z.string().min(1)).min(1),
        impact: z.object({
          leads: z.string().min(1),
          conversion: z.string().min(1),
          sales: z.string().min(1),
          ops: z.string().min(1),
        }),
      })
    ),
    pricingNote: z.string().min(1),
  }),
  nextSteps: z.object({
    actions: z.array(z.string().min(1)).min(1),
    callToAction: z.string().min(1),
  }),
});

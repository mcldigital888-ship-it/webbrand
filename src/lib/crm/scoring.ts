import { prisma } from "@/lib/db";

export type ScoringField = "source" | "status" | "manual";
export type ScoringOperator = "eq" | "contains" | "exists";

export function computeScoreFromRules({
  lead,
  rules,
}: {
  lead: { source: string | null; status: string; utmData: unknown };
  rules: Array<{
    active: boolean;
    field: string;
    operator: string;
    value: string;
    weight: number;
  }>;
}) {
  let score = 0;

  for (const r of rules) {
    if (!r.active) continue;

    const field = r.field as ScoringField;
    const op = r.operator as ScoringOperator;

    let fieldValue = "";
    if (field === "source") fieldValue = lead.source || "";
    else if (field === "status") fieldValue = lead.status || "";
    else fieldValue = "";

    const value = r.value || "";

    const matched =
      op === "exists"
        ? fieldValue.trim().length > 0
        : op === "contains"
          ? fieldValue.toLowerCase().includes(value.toLowerCase())
          : fieldValue.toLowerCase() === value.toLowerCase();

    if (matched) score += r.weight;
  }

  return score;
}

export async function recalcLeadScore({
  leadId,
  changedBy,
}: {
  leadId: string;
  changedBy: string;
}) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { id: true, score: true, source: true, status: true, utmData: true },
  });

  if (!lead) return;

  const rules = await prisma.scoringRule.findMany({
    where: { active: true },
    select: { active: true, field: true, operator: true, value: true, weight: true },
  });

  const nextScore = computeScoreFromRules({ lead, rules });

  if (nextScore === lead.score) return;

  await prisma.lead.update({
    where: { id: lead.id },
    data: { score: nextScore },
  });

  await prisma.activityLog.create({
    data: {
      entityType: "lead",
      entityId: lead.id,
      action: "lead.score_updated",
      metadata: { score_from: lead.score, score_to: nextScore, changed_by: changedBy },
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventName: "lead.score_updated",
      entityType: "lead",
      entityId: lead.id,
      payload: { leadId: lead.id, score_from: lead.score, score_to: nextScore },
      status: "pending",
    },
  });

  const thresholds = await prisma.scoreThreshold.findMany({
    orderBy: { minScore: "asc" },
    select: { id: true, name: true, minScore: true },
  });

  for (const t of thresholds) {
    const crossed = lead.score < t.minScore && nextScore >= t.minScore;
    if (!crossed) continue;

    await prisma.activityLog.create({
      data: {
        entityType: "lead",
        entityId: lead.id,
        action: "lead.score_threshold_crossed",
        metadata: {
          threshold_id: t.id,
          threshold_name: t.name,
          min_score: t.minScore,
          score_from: lead.score,
          score_to: nextScore,
          changed_by: changedBy,
        },
      },
    });

    await prisma.automationEvent.create({
      data: {
        eventName: "lead.score_threshold_crossed",
        entityType: "lead",
        entityId: lead.id,
        payload: {
          leadId: lead.id,
          threshold_id: t.id,
          threshold_name: t.name,
          min_score: t.minScore,
          score_from: lead.score,
          score_to: nextScore,
        },
        status: "pending",
      },
    });
  }
}

export async function recalcAllLeadScores({
  changedBy,
}: {
  changedBy: string;
}) {
  const rules = await prisma.scoringRule.findMany({
    where: { active: true },
    select: { active: true, field: true, operator: true, value: true, weight: true },
  });

  const thresholds = await prisma.scoreThreshold.findMany({
    orderBy: { minScore: "asc" },
    select: { id: true, name: true, minScore: true },
  });

  const leads = await prisma.lead.findMany({
    select: { id: true, score: true, source: true, status: true, utmData: true },
  });

  let updatedCount = 0;

  for (const lead of leads) {
    const nextScore = computeScoreFromRules({ lead, rules });
    if (nextScore === lead.score) continue;

    await prisma.lead.update({
      where: { id: lead.id },
      data: { score: nextScore },
    });

    updatedCount += 1;

    await prisma.activityLog.create({
      data: {
        entityType: "lead",
        entityId: lead.id,
        action: "lead.score_updated",
        metadata: { score_from: lead.score, score_to: nextScore, changed_by: changedBy },
      },
    });

    await prisma.automationEvent.create({
      data: {
        eventName: "lead.score_updated",
        entityType: "lead",
        entityId: lead.id,
        payload: { leadId: lead.id, score_from: lead.score, score_to: nextScore },
        status: "pending",
      },
    });

    for (const t of thresholds) {
      const crossed = lead.score < t.minScore && nextScore >= t.minScore;
      if (!crossed) continue;

      await prisma.activityLog.create({
        data: {
          entityType: "lead",
          entityId: lead.id,
          action: "lead.score_threshold_crossed",
          metadata: {
            threshold_id: t.id,
            threshold_name: t.name,
            min_score: t.minScore,
            score_from: lead.score,
            score_to: nextScore,
            changed_by: changedBy,
          },
        },
      });

      await prisma.automationEvent.create({
        data: {
          eventName: "lead.score_threshold_crossed",
          entityType: "lead",
          entityId: lead.id,
          payload: {
            leadId: lead.id,
            threshold_id: t.id,
            threshold_name: t.name,
            min_score: t.minScore,
            score_from: lead.score,
            score_to: nextScore,
          },
          status: "pending",
        },
      });
    }
  }

  return { updatedCount, leadCount: leads.length };
}

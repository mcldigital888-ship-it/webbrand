import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ProposalPack } from "@/lib/audit/proposal";

Font.register({
  family: "Inter",
  fonts: [],
});

const styles = StyleSheet.create({
  page: {
    padding: 42,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#0B1C2D",
    lineHeight: 1.4,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 10,
  },
  coverSub: {
    fontSize: 12,
    color: "#334155",
    marginBottom: 22,
  },
  pill: {
    border: "1px solid #E2E8F0",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
  },
  h3: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 8,
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    color: "#64748B",
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "#2563EB",
    marginTop: 5,
  },
  grid2: {
    flexDirection: "row",
    gap: 14,
  },
  col: {
    flex: 1,
  },
  card: {
    border: "1px solid #E2E8F0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  kpiValue: {
    fontSize: 14,
    fontWeight: 700,
  },
  table: {
    border: "1px solid #E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#F1F5F9",
  },
  tableCell: {
    padding: 8,
    borderRight: "1px solid #E2E8F0",
    fontSize: 9,
  },
  tableCellLast: {
    padding: 8,
    fontSize: 9,
  },
  tableCellStrong: {
    fontSize: 9,
    fontWeight: 700,
  },
});

function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((t, i) => (
        <View key={`${t}-${i}`} style={styles.bulletRow}>
          <View style={styles.bulletDot} />
          <Text>{t}</Text>
        </View>
      ))}
    </View>
  );
}

export default function AuditProposalPdf({
  auditId,
  company,
  createdAt,
  proposal,
}: {
  auditId: string;
  company: string;
  createdAt: string;
  proposal: ProposalPack;
}) {
  const quickWinsTop = proposal.currentState.quickWins.slice(0, 5);

  return (
    <Document title={`WEBRRAND Revenue System Blueprint ${company}`}> 
      <Page size="A4" style={styles.page}>
        <Text style={{ fontSize: 12, color: "#2563EB", marginBottom: 14 }}>
          WEBRRAND
        </Text>
        <Text style={styles.coverTitle}>Revenue System Blueprint</Text>
        <Text style={styles.coverSub}>
          Company: {company} · Date: {createdAt} · Audit ID: {auditId}
        </Text>

        <View style={styles.pill}>
          <Text style={styles.label}>One-liner</Text>
          <Text>{proposal.summary.oneLiner}</Text>
        </View>

        <View style={styles.grid2}>
          <View style={[styles.col, styles.card]}>
            <Text style={styles.label}>Primary goal</Text>
            <Text>{proposal.summary.primaryGoal}</Text>
          </View>
          <View style={[styles.col, styles.card]}>
            <Text style={styles.label}>Core problem</Text>
            <Text>{proposal.summary.coreProblem}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Expected impact</Text>
          <View style={styles.grid2}>
            <View style={styles.col}>
              <Text style={styles.kpiValue}>{proposal.summary.expectedImpact.leads}</Text>
              <Text style={styles.label}>Leads</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.kpiValue}>{proposal.summary.expectedImpact.conversion}</Text>
              <Text style={styles.label}>Conversion</Text>
            </View>
          </View>
          <View style={[styles.grid2, { marginTop: 8 }]}>
            <View style={styles.col}>
              <Text style={styles.kpiValue}>{proposal.summary.expectedImpact.sales}</Text>
              <Text style={styles.label}>Sales</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.kpiValue}>{proposal.summary.expectedImpact.ops}</Text>
              <Text style={styles.label}>Ops</Text>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Quick wins (first 7 days)</Text>
        <View style={styles.card}>
          <Text style={styles.label}>5 concrete actions to unlock momentum</Text>
          <BulletList items={quickWinsTop} />
        </View>
        <View style={styles.card}>
          <Text style={styles.h3}>Why this matters</Text>
          <Text>
            These actions are designed to reduce leakage immediately while the full system is being installed.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Current state</Text>

        <View style={styles.grid2}>
          <View style={[styles.col, styles.card]}>
            <Text style={styles.h3}>Assumptions</Text>
            <BulletList items={proposal.currentState.assumptions} />
          </View>
          <View style={[styles.col, styles.card]}>
            <Text style={styles.h3}>Risks</Text>
            <BulletList items={proposal.currentState.risks} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.h3}>Quick wins (7 days)</Text>
          <BulletList items={proposal.currentState.quickWins} />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Blueprint</Text>
        <View style={styles.card}>
          <Text style={styles.h3}>System flow</Text>
          <Text>{proposal.blueprint.systemFlow.join(" → ")}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.h3}>Recommended modules</Text>
          {proposal.blueprint.recommendedModules.map((m, idx) => (
            <View key={`${m.module}-${idx}`} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: 700 }}>{m.module}</Text>
              <Text style={{ color: "#334155", marginBottom: 6 }}>{m.why}</Text>
              <Text style={styles.label}>Deliverables</Text>
              <BulletList items={m.deliverables} />
              <Text style={[styles.label, { marginTop: 6 }]}>KPIs</Text>
              <BulletList items={m.kpis} />
            </View>
          ))}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Timeline</Text>
        {proposal.blueprint.timeline.map((p, idx) => (
          <View key={`${p.phase}-${idx}`} style={styles.card}>
            <Text style={{ fontSize: 12, fontWeight: 700 }}>
              {p.phase} · {p.duration}
            </Text>
            <BulletList items={p.deliverables} />
          </View>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>KPI plan</Text>
        <View style={styles.card}>
          <Text style={styles.label}>North star</Text>
          <Text>{proposal.kpiPlan.northStar}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.h3}>Metrics</Text>
          {proposal.kpiPlan.metrics.map((m, idx) => (
            <View key={`${m.name}-${idx}`} style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: 700 }}>{m.name}</Text>
              <Text style={{ color: "#334155" }}>{m.definition}</Text>
              <Text style={{ color: "#2563EB" }}>Target: {m.target}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Offer</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Recommended package</Text>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>{proposal.offer.recommendedPackage}</Text>
          <Text style={[styles.h3, { marginTop: 10 }]}>Scope</Text>
          <BulletList items={proposal.offer.scope} />
          <Text style={[styles.h3, { marginTop: 10 }]}>Options</Text>
          {proposal.offer.options.map((o, idx) => (
            <View key={`${o.name}-${idx}`} style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: 700 }}>{o.name}</Text>
              <BulletList items={o.adds} />
            </View>
          ))}

          <Text style={[styles.h3, { marginTop: 10 }]}>Options comparison (impact)</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableCellStrong, { flex: 2 }]}>Option</Text>
              <Text style={[styles.tableCell, styles.tableCellStrong, { flex: 1 }]}>Leads</Text>
              <Text style={[styles.tableCell, styles.tableCellStrong, { flex: 1 }]}>Conversion</Text>
              <Text style={[styles.tableCell, styles.tableCellStrong, { flex: 1 }]}>Sales</Text>
              <Text style={[styles.tableCellLast, styles.tableCellStrong, { flex: 1 }]}>Ops</Text>
            </View>
            {proposal.offer.options.map((o, idx) => (
              <View key={`${o.name}-row-${idx}`} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{o.name}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{o.impact.leads}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{o.impact.conversion}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{o.impact.sales}</Text>
                <Text style={[styles.tableCellLast, { flex: 1 }]}>{o.impact.ops}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 10 }]}>{proposal.offer.pricingNote}</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Next steps</Text>
        <View style={styles.card}>
          <BulletList items={proposal.nextSteps.actions} />
          <Text style={{ marginTop: 8, fontSize: 12, fontWeight: 700 }}>
            {proposal.nextSteps.callToAction}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

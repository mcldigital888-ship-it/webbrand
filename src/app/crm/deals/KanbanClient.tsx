"use client";

import { useMemo, useState } from "react";

type Stage = {
  id: string;
  name: string;
  order: number;
  probabilityDefault: number;
  isWon: boolean;
  isLost: boolean;
};

type Deal = {
  id: string;
  leadId: string;
  stageId: string;
  value: number;
  probability: number;
  probabilityManual: boolean;
  ownerId: string | null;
  lead: { name: string; email: string };
};

export default function KanbanClient({
  stages,
  initialDeals,
  canMoveAny,
}: {
  stages: Stage[];
  initialDeals: Deal[];
  canMoveAny: boolean;
}) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [moving, setMoving] = useState<Record<string, boolean>>({});

  const byStage = useMemo(() => {
    const map = new Map<string, Deal[]>();
    for (const s of stages) map.set(s.id, []);
    for (const d of deals) {
      const arr = map.get(d.stageId);
      if (arr) arr.push(d);
    }
    return map;
  }, [deals, stages]);

  async function moveDeal({ dealId, toStageId }: { dealId: string; toStageId: string }) {
    setMoving((p) => ({ ...p, [dealId]: true }));

    const prev = deals;
    const next = deals.map((d) => (d.id === dealId ? { ...d, stageId: toStageId } : d));
    setDeals(next);

    try {
      const res = await fetch("/crm/api/deals/move", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealId, toStageId }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; deal: Deal }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || data.ok === false) {
        setDeals(prev);
        return;
      }

      setDeals((current) => current.map((d) => (d.id === data.deal.id ? data.deal : d)));
    } finally {
      setMoving((p) => ({ ...p, [dealId]: false }));
    }
  }

  function onDragStart(e: React.DragEvent, dealId: string) {
    e.dataTransfer.setData("text/plain", dealId);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDrop(e: React.DragEvent, toStageId: string) {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("text/plain");
    if (!dealId) return;

    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;

    if (!canMoveAny && !deal.ownerId) return;

    if (deal.stageId === toStageId) return;
    void moveDeal({ dealId, toStageId });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-[var(--color-navy)]">Pipeline</div>
          <div className="text-xs text-[var(--color-slate)]">Drag deals between stages</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stages
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((stage) => {
            const items = byStage.get(stage.id) || [];
            return (
              <div
                key={stage.id}
                className="rounded-2xl border border-black/5 bg-[var(--color-background)] p-3"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, stage.id)}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs font-semibold text-[var(--color-navy)]">
                    {stage.name}
                  </div>
                  <div className="text-xs text-[var(--color-slate)]">{items.length}</div>
                </div>

                <div className="space-y-2">
                  {items.map((d) => (
                    <a
                      key={d.id}
                      href={`/crm/deals/${d.id}`}
                      draggable
                      onDragStart={(e) => onDragStart(e, d.id)}
                      className="block rounded-xl border border-black/5 bg-white p-3 hover:bg-[var(--color-surface)]"
                      aria-disabled={moving[d.id]}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-[var(--color-navy)]">
                            {d.lead.name}
                          </div>
                          <div className="truncate text-xs text-[var(--color-slate)]">
                            {d.lead.email}
                          </div>
                        </div>
                        <div className="shrink-0 text-right text-xs text-[var(--color-slate)]">
                          <div>{d.probability}%</div>
                          <div>${d.value}</div>
                        </div>
                      </div>
                      {moving[d.id] ? (
                        <div className="mt-2 text-xs text-[var(--color-slate)]">Moving...</div>
                      ) : null}
                    </a>
                  ))}

                  {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-black/10 bg-white/60 p-3 text-xs text-[var(--color-slate)]">
                      Drop here
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

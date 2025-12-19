export default async function AdminAutomationEventsPage() {
  const { prisma } = await import("@/lib/db");
  const { requireAdminPanel } = await import("@/lib/admin/rbac");
  const AutomationEventsClient = (await import("@/app/admin/(panel)/automation-events/AutomationEventsClient"))
    .default;

  await requireAdminPanel();

  const [events, eventNames] = await Promise.all([
    prisma.automationEvent.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.automationEvent.findMany({
      distinct: ["eventName"],
      select: { eventName: true },
      orderBy: { eventName: "asc" },
    }),
  ]);

  const initialEvents = events.map((e) => ({
    id: e.id,
    eventName: e.eventName,
    entityType: e.entityType,
    entityId: e.entityId,
    status: e.status,
    payload: e.payload,
    createdAt: e.createdAt.toISOString(),
  }));

  return (
    <AutomationEventsClient
      initialEvents={initialEvents}
      initialEventNames={eventNames.map((x) => x.eventName)}
    />
  );
}

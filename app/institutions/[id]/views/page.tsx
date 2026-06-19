import { ViewStatCard } from "./_components/ViewStatCard"
import type { ViewEvent, ViewSummary } from "@/types/views"

async function getViewSummary(id: string): Promise<ViewSummary> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/views/summary`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load view summary")
  return res.json()
}

async function getViewEvents(id: string): Promise<ViewEvent[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/views`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load view events")
  return res.json()
}

export default async function InstitutionViewsPage({
  params,
}: {
  params: { id: string }
}) {
  const [summary, events] = await Promise.all([
    getViewSummary(params.id),
    getViewEvents(params.id),
  ])

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Views & Engagement
        </h1>
        <p className="text-sm text-muted-foreground">
          Analytics for all user interactions with this institution.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ViewStatCard label="Total views" value={summary.total_views ?? 0} />
        <ViewStatCard label="Page views" value={summary.page_views ?? 0} />
        <ViewStatCard label="Program views" value={summary.program_views ?? 0} />
        <ViewStatCard label="AI questions" value={summary.ai_questions ?? 0} />
        <ViewStatCard label="Leads" value={summary.leads ?? 0} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Recent events</h2>
        <ul className="space-y-2 text-xs">
          {events.map((e) => (
            <li key={e.id} className="border-b pb-2 last:border-b-0">
              <div className="font-medium">{e.type}</div>
              <div className="text-muted-foreground">
                {new Date(e.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
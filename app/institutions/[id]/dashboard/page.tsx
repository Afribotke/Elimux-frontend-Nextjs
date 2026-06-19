import type { InstitutionDashboardSummary } from "@/types/institution"

async function getInstitutionDashboard(
  id: string
): Promise<InstitutionDashboardSummary> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/dashboard`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to load institution dashboard")
  }

  return res.json()
}

export default async function InstitutionDashboardPage({
  params,
}: {
  params: { id: string }
}) {
  const dashboard = await getInstitutionDashboard(params.id)

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dashboard.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dashboard.email ?? "No email provided"}
          </p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <div>Institution ID: {dashboard.institution_id}</div>
          <div>
            Joined: {new Date(dashboard.created_at).toLocaleDateString()}
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-medium text-muted-foreground mb-1">
            Programs
          </h2>
          <p className="text-2xl font-semibold">
            {dashboard.total_programs}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-medium text-muted-foreground mb-1">
            Applications
          </h2>
          <p className="text-2xl font-semibold">
            {dashboard.total_applications}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-medium text-muted-foreground mb-1">
            Students
          </h2>
          <p className="text-2xl font-semibold">
            {dashboard.total_students}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-medium text-muted-foreground mb-1">
            Views
          </h2>
          <p className="text-2xl font-semibold">
            {dashboard.total_views}
          </p>
        </div>
      </section>
    </main>
  )
}
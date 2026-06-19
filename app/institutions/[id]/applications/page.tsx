import { ApplicationCard } from "./_components/ApplicationCard"
import type { Application, ApplicationSummary } from "@/types/application"

async function getApplications(id: string): Promise<Application[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/applications`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load applications")
  return res.json()
}

async function getApplicationSummaries(id: string): Promise<ApplicationSummary[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/applications/summary`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load application summaries")
  return res.json()
}

export default async function InstitutionApplicationsPage({ params }: { params: { id: string } }) {
  const [applications, summaries] = await Promise.all([
    getApplications(params.id),
    getApplicationSummaries(params.id),
  ])

  const summaryById = new Map(summaries.map((s) => [s.application_id, s]))

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
        <p className="text-sm text-muted-foreground">
          All applications submitted to this institution.
        </p>
      </header>

      {applications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No applications found.</p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              summary={summaryById.get(app.id)}
            />
          ))}
        </section>
      )}
    </main>
  )
}
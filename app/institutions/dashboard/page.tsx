import Link from "next/link"
import type { InstitutionDashboardSummary } from "@/types/institution"

async function getInstitutions(): Promise<InstitutionDashboardSummary[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/dashboard`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to load institutions dashboard")
  }

  return res.json()
}

export default async function InstitutionsDashboardPage() {
  const institutions = await getInstitutions()

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Institutions dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of all institutions on ElimuX
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {institutions.map((inst) => (
          <Link
            key={inst.institution_id}
            href={`/institutions/${inst.institution_id}/dashboard`}
            className="rounded-lg border bg-card p-4 shadow-sm hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium">{inst.name}</h2>
              <span className="text-xs text-muted-foreground">
                {new Date(inst.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {inst.email ?? "No email provided"}
            </p>
            <dl className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-muted-foreground">Programs</dt>
                <dd className="font-semibold">{inst.total_programs}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Applications</dt>
                <dd className="font-semibold">{inst.total_applications}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Students</dt>
                <dd className="font-semibold">{inst.total_students}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Views</dt>
                <dd className="font-semibold">{inst.total_views}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </section>
    </main>
  )
}

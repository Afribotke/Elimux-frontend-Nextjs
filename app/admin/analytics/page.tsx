import { StatCard } from "./_components/StatCard"
import type { AdminAnalytics, AdminInstitutionStat } from "@/types/admin-analytics"

async function getAdminAnalytics(): Promise<AdminAnalytics> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/analytics`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load admin analytics")
  return res.json()
}

async function getInstitutionStats(): Promise<AdminInstitutionStat[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/analytics/institutions`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load institution stats")
  return res.json()
}

export default async function AdminAnalyticsPage() {
  const [analytics, institutions] = await Promise.all([
    getAdminAnalytics(),
    getInstitutionStats(),
  ])

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Platform Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Global metrics across all institutions on ElimuX.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Institutions" value={analytics.total_institutions ?? 0} />
        <StatCard label="Programs" value={analytics.total_programs ?? 0} />
        <StatCard label="Students" value={analytics.total_students ?? 0} />
        <StatCard label="Applications" value={analytics.total_applications ?? 0} />
        <StatCard label="Views" value={analytics.total_views ?? 0} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Institution breakdown</h2>
        <ul className="space-y-2 text-xs">
          {institutions.map((inst) => (
            <li key={inst.institution_id} className="border-b pb-2 last:border-b-0">
              <div className="font-medium">{inst.name}</div>
              <div className="text-muted-foreground">
                Programs: {inst.total_programs} â€¢ Students: {inst.total_students} â€¢ Applications: {inst.total_applications} â€¢ Views: {inst.total_views}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
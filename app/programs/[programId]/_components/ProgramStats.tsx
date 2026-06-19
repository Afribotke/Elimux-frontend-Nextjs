import type { ProgramDetailStats } from "@/types/program-detail"

export function ProgramStats({ stats }: { stats: ProgramDetailStats }) {
  return (
    <section className="grid grid-cols-3 gap-4">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="text-xs text-muted-foreground">Views</div>
        <div className="text-2xl font-semibold">{stats.total_views}</div>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="text-xs text-muted-foreground">Applications</div>
        <div className="text-2xl font-semibold">{stats.total_applications}</div>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="text-xs text-muted-foreground">Students</div>
        <div className="text-2xl font-semibold">{stats.total_students}</div>
      </div>
    </section>
  )
}
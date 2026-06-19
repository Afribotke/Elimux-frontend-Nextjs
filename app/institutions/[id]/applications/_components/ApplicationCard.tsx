import type { Application } from "@/types/application"
import type { ApplicationSummary } from "@/types/application"

type Props = {
  application: Application
  summary?: ApplicationSummary
}

export function ApplicationCard({ application, summary }: Props) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm space-y-2">
      <header className="flex items-center justify-between">
        <h3 className="font-medium">Application #{application.id}</h3>
        <span className="text-xs text-muted-foreground">
          {new Date(application.created_at).toLocaleDateString()}
        </span>
      </header>

      {summary && (
        <p className="text-sm text-muted-foreground">
          {summary.student_name ?? "Unknown student"} â†’ {summary.program_name}
        </p>
      )}

      <div className="text-xs">
        <span className="text-muted-foreground">Status: </span>
        <span className="font-semibold">{application.status}</span>
      </div>
    </article>
  )
}
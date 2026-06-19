import type { Program } from "@/types/program"
import type { ProgramSummary } from "@/types/program"

type Props = {
  program: Program
  summary?: ProgramSummary
}

export function ProgramCard({ program, summary }: Props) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm space-y-2">
      <header className="flex items-center justify-between gap-2">
        <h3 className="font-medium">{program.name}</h3>
        <span className="text-xs text-muted-foreground">
          {new Date(program.created_at).toLocaleDateString()}
        </span>
      </header>

      {program.description && (
        <p className="text-sm text-muted-foreground line-clamp-2">
          {program.description}
        </p>
      )}

      <dl className="grid grid-cols-3 gap-2 text-xs mt-2">
        <div>
          <dt className="text-muted-foreground">Level</dt>
          <dd className="font-semibold">
            {program.level ?? "N/A"}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Duration</dt>
          <dd className="font-semibold">
            {program.duration ?? "N/A"}
          </dd>
        </div>
        {summary && (
          <div>
            <dt className="text-muted-foreground">Views</dt>
            <dd className="font-semibold">
              {summary.total_views}
            </dd>
          </div>
        )}
      </dl>

      {summary && (
        <dl className="grid grid-cols-2 gap-2 text-xs mt-2">
          <div>
            <dt className="text-muted-foreground">Applications</dt>
            <dd className="font-semibold">
              {summary.total_applications}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Students</dt>
            <dd className="font-semibold">
              {summary.total_students}
            </dd>
          </div>
        </dl>
      )}
    </article>
  )
}
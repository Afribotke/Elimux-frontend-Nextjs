import type { Student, StudentSummary } from "@/types/student"

type Props = {
  student: Student
  summary?: StudentSummary
}

export function StudentCard({ student, summary }: Props) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm space-y-2">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-medium">{student.name}</h3>
          <p className="text-xs text-muted-foreground">
            {student.email ?? "No email"}
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(student.created_at).toLocaleDateString()}
        </span>
      </header>

      <div className="text-xs text-muted-foreground">
        Country:{" "}
        <span className="font-semibold">
          {student.country ?? "Unknown"}
        </span>
      </div>

      {summary && (
        <dl className="grid grid-cols-2 gap-2 text-xs mt-2">
          <div>
            <dt className="text-muted-foreground">Applications</dt>
            <dd className="font-semibold">
              {summary.total_applications}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Programs</dt>
            <dd className="font-semibold">
              {summary.total_programs}
            </dd>
          </div>
        </dl>
      )}
    </article>
  )
}
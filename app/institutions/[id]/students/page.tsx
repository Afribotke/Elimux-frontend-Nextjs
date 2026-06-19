import { StudentCard } from "./_components/StudentCard"
import type { Student, StudentSummary } from "@/types/student"

async function getStudents(id: string): Promise<Student[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/students`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load students")
  return res.json()
}

async function getStudentSummaries(id: string): Promise<StudentSummary[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/students/summary`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load student summaries")
  return res.json()
}

export default async function InstitutionStudentsPage({
  params,
}: {
  params: { id: string }
}) {
  const [students, summaries] = await Promise.all([
    getStudents(params.id),
    getStudentSummaries(params.id),
  ])

  const summaryById = new Map(
    summaries.map((s) => [s.student_id, s])
  )

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Students
        </h1>
        <p className="text-sm text-muted-foreground">
          Students associated with this institution, with basic engagement metrics.
        </p>
      </header>

      {students.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No students found for this institution.
        </p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              summary={summaryById.get(student.id)}
            />
          ))}
        </section>
      )}
    </main>
  )
}
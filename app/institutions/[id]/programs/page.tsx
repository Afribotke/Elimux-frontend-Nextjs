import { ProgramCard } from "./_components/ProgramCard"
import type { Program, ProgramSummary } from "@/types/program"

async function getPrograms(
  institutionId: string
): Promise<Program[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${institutionId}/programs`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to load programs")
  }

  return res.json()
}

async function getProgramSummaries(
  institutionId: string
): Promise<ProgramSummary[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${institutionId}/programs/summary`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to load program summaries")
  }

  return res.json()
}

export default async function InstitutionProgramsPage({
  params,
}: {
  params: { id: string }
}) {
  const [programs, summaries] = await Promise.all([
    getPrograms(params.id),
    getProgramSummaries(params.id),
  ])

  const summaryByProgramId = new Map(
    summaries.map((s) => [s.program_id, s])
  )

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Programs
        </h1>
        <p className="text-sm text-muted-foreground">
          Programs offered by this institution, with live metrics.
        </p>
      </header>

      {programs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No programs found for this institution.
        </p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              summary={summaryByProgramId.get(program.id)}
            />
          ))}
        </section>
      )}
    </main>
  )
}
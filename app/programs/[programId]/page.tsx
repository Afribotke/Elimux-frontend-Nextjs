import { ProgramHeader } from "./_components/ProgramHeader"
import { ProgramStats } from "./_components/ProgramStats"
import type { ProgramDetail, ProgramDetailStats } from "@/types/program-detail"

async function getProgram(id: string): Promise<ProgramDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/programs/${id}`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load program detail")
  return res.json()
}

async function getStats(id: string): Promise<ProgramDetailStats> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/programs/${id}/stats`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load program stats")
  return res.json()
}

export default async function ProgramDetailPage({
  params,
}: {
  params: { programId: string }
}) {
  const [program, stats] = await Promise.all([
    getProgram(params.programId),
    getStats(params.programId),
  ])

  return (
    <main className="p-6 space-y-6">
      <ProgramHeader program={program} />
      <ProgramStats stats={stats} />

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Description</h2>
        <p className="text-sm text-muted-foreground">
          {program.description ?? "No description provided."}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Requirements</h2>
        <p className="text-sm text-muted-foreground">
          {program.requirements ?? "No requirements provided."}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Fees</h2>
        <p className="text-sm text-muted-foreground">
          {program.fees ?? "No fee information provided."}
        </p>
      </section>
    </main>
  )
}
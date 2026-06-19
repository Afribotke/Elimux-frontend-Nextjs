import type { ProgramDetail } from "@/types/program-detail"

export function ProgramHeader({ program }: { program: ProgramDetail }) {
  return (
    <header className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">
        {program.name}
      </h1>
      <p className="text-sm text-muted-foreground">
        {program.level ?? "N/A"} â€¢ {program.duration ?? "N/A"} â€¢ {program.mode ?? "N/A"}
      </p>
    </header>
  )
}
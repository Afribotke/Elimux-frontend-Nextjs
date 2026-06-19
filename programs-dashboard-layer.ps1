param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Programs Dashboard automation (Option C)..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/institutions/[id]/programs",
  "app/api/institutions/[id]/programs/summary",
  "app/institutions/[id]/programs",
  "app/institutions/[id]/programs/_components"
)

foreach ($p in $paths) {
  $full = Join-Path $ProjectRoot $p
  if (-not (Test-Path $full)) {
    Write-Host "Creating folder: $full" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $full -Force | Out-Null
  } else {
    Write-Host "Folder exists: $full" -ForegroundColor DarkGray
  }
}

function Write-File($relativePath, $content) {
  $fullPath = Join-Path $ProjectRoot $relativePath
  Write-Host "Writing: $fullPath" -ForegroundColor Green
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $content, $utf8NoBom)
}

# 2) Types for programs + summary
Write-File "types/program.ts" @'
export interface Program {
  id: string
  institution_id: string
  name: string
  description: string | null
  level: string | null
  duration: string | null
  created_at: string
}

export interface ProgramSummary {
  program_id: string
  institution_id: string
  program_name: string
  total_applications: number
  total_students: number
  total_views: number
  created_at: string
}
'@

# 3) API: /api/institutions/[id]/programs (raw list from table)
Write-File "app/api/institutions/[id]/programs/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { Program } from "@/types/program"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<Program[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 4) API: /api/institutions/[id]/programs/summary (metrics from view)
Write-File "app/api/institutions/[id]/programs/summary/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ProgramSummary } from "@/types/program"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_programs_summary")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<ProgramSummary[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch program summaries" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 5) UI component: ProgramCard
Write-File "app/institutions/[id]/programs/_components/ProgramCard.tsx" @'
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
'@

# 6) UI page: /institutions/[id]/programs
Write-File "app/institutions/[id]/programs/page.tsx" @'
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
'@

# 7) Git
if (-not $SkipGit) {
  if (Test-Path (Join-Path $ProjectRoot ".git")) {
    Write-Host "Staging changes with git..." -ForegroundColor Cyan
    git -C $ProjectRoot add .
    git -C $ProjectRoot commit -m "Add programs dashboard (API + UI, Option C)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Programs Dashboard automation complete." -ForegroundColor Cyan

param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Program Detail Page automation..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/programs/[programId]",
  "app/api/programs/[programId]/stats",
  "app/programs/[programId]",
  "app/programs/[programId]/_components"
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

# 2) Types for program detail + stats
Write-File "types/program-detail.ts" @'
export interface ProgramDetail {
  id: string
  institution_id: string
  name: string
  description: string | null
  level: string | null
  duration: string | null
  fees: string | null
  mode: string | null
  requirements: string | null
  created_at: string
}

export interface ProgramDetailStats {
  program_id: string
  total_views: number
  total_applications: number
  total_students: number
  created_at: string
}
'@

# 3) API: /api/programs/[programId] (raw program data)
Write-File "app/api/programs/[programId]/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ProgramDetail } from "@/types/program-detail"

export async function GET(
  _req: Request,
  { params }: { params: { programId: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("id", params.programId)
    .maybeSingle<ProgramDetail>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch program detail" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}
'@

# 4) API: /api/programs/[programId]/stats (view)
Write-File "app/api/programs/[programId]/stats/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ProgramDetailStats } from "@/types/program-detail"

export async function GET(
  _req: Request,
  { params }: { params: { programId: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("program_detail_stats")
    .select("*")
    .eq("program_id", params.programId)
    .maybeSingle<ProgramDetailStats>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch program stats" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}
'@

# 5) UI component: ProgramHeader
Write-File "app/programs/[programId]/_components/ProgramHeader.tsx" @'
import type { ProgramDetail } from "@/types/program-detail"

export function ProgramHeader({ program }: { program: ProgramDetail }) {
  return (
    <header className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">
        {program.name}
      </h1>
      <p className="text-sm text-muted-foreground">
        {program.level ?? "N/A"} • {program.duration ?? "N/A"} • {program.mode ?? "N/A"}
      </p>
    </header>
  )
}
'@

# 6) UI component: ProgramStats
Write-File "app/programs/[programId]/_components/ProgramStats.tsx" @'
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
'@

# 7) UI page: /programs/[programId]
Write-File "app/programs/[programId]/page.tsx" @'
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
'@

# 8) Git commit
if (-not $SkipGit) {
  if (Test-Path (Join-Path $ProjectRoot ".git")) {
    Write-Host "Staging changes with git..." -ForegroundColor Cyan
    git -C $ProjectRoot add .
    git -C $ProjectRoot commit -m "Add program detail page (API + UI)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Program Detail Page automation complete." -ForegroundColor Cyan

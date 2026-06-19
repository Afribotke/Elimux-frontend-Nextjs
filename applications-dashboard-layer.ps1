param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Applications Dashboard automation (Option C)..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/institutions/[id]/applications",
  "app/api/institutions/[id]/applications/summary",
  "app/institutions/[id]/applications",
  "app/institutions/[id]/applications/_components"
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

# 2) Types for applications + summary
Write-File "types/application.ts" @'
export interface Application {
  id: string
  institution_id: string
  program_id: string
  student_id: string
  status: string
  created_at: string
}

export interface ApplicationSummary {
  application_id: string
  institution_id: string
  program_name: string
  student_name: string | null
  status: string
  created_at: string
}
'@

# 3) API: /api/institutions/[id]/applications (raw list)
Write-File "app/api/institutions/[id]/applications/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { Application } from "@/types/application"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<Application[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 4) API: /api/institutions/[id]/applications/summary (view)
Write-File "app/api/institutions/[id]/applications/summary/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ApplicationSummary } from "@/types/application"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_applications_summary")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<ApplicationSummary[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch application summaries" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 5) UI component: ApplicationCard
Write-File "app/institutions/[id]/applications/_components/ApplicationCard.tsx" @'
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
          {summary.student_name ?? "Unknown student"} → {summary.program_name}
        </p>
      )}

      <div className="text-xs">
        <span className="text-muted-foreground">Status: </span>
        <span className="font-semibold">{application.status}</span>
      </div>
    </article>
  )
}
'@

# 6) UI page: /institutions/[id]/applications
Write-File "app/institutions/[id]/applications/page.tsx" @'
import { ApplicationCard } from "./_components/ApplicationCard"
import type { Application, ApplicationSummary } from "@/types/application"

async function getApplications(id: string): Promise<Application[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/applications`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load applications")
  return res.json()
}

async function getApplicationSummaries(id: string): Promise<ApplicationSummary[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/applications/summary`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load application summaries")
  return res.json()
}

export default async function InstitutionApplicationsPage({ params }: { params: { id: string } }) {
  const [applications, summaries] = await Promise.all([
    getApplications(params.id),
    getApplicationSummaries(params.id),
  ])

  const summaryById = new Map(summaries.map((s) => [s.application_id, s]))

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
        <p className="text-sm text-muted-foreground">
          All applications submitted to this institution.
        </p>
      </header>

      {applications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No applications found.</p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              summary={summaryById.get(app.id)}
            />
          ))}
        </section>
      )}
    </main>
  )
}
'@

# 7) Git commit
if (-not $SkipGit) {
  if (Test-Path (Join-Path $ProjectRoot ".git")) {
    Write-Host "Staging changes with git..." -ForegroundColor Cyan
    git -C $ProjectRoot add .
    git -C $ProjectRoot commit -m "Add applications dashboard (API + UI, Option C)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Applications Dashboard automation complete." -ForegroundColor Cyan

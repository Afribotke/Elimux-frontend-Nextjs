param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Views Analytics Dashboard automation..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/institutions/[id]/views",
  "app/api/institutions/[id]/views/summary",
  "app/institutions/[id]/views",
  "app/institutions/[id]/views/_components"
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

# 2) Types for views + summary
Write-File "types/views.ts" @'
export interface ViewEvent {
  id: string
  institution_id: string
  type: string
  program_id: string | null
  meta: any
  created_at: string
}

export interface ViewSummary {
  institution_id: string
  total_views: number
  program_views: number
  page_views: number
  ai_questions: number
  leads: number
  created_at: string
}
'@

# 3) API: /api/institutions/[id]/views (raw events)
Write-File "app/api/institutions/[id]/views/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ViewEvent } from "@/types/views"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_events")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<ViewEvent[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch view events" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 4) API: /api/institutions/[id]/views/summary (view)
Write-File "app/api/institutions/[id]/views/summary/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ViewSummary } from "@/types/views"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_views_summary")
    .select("*")
    .eq("institution_id", params.id)
    .maybeSingle<ViewSummary>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch view summary" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}
'@

# 5) UI component: ViewStatCard
Write-File "app/institutions/[id]/views/_components/ViewStatCard.tsx" @'
type Props = {
  label: string
  value: number
}

export function ViewStatCard({ label, value }: Props) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
'@

# 6) UI page: /institutions/[id]/views
Write-File "app/institutions/[id]/views/page.tsx" @'
import { ViewStatCard } from "./_components/ViewStatCard"
import type { ViewEvent, ViewSummary } from "@/types/views"

async function getViewSummary(id: string): Promise<ViewSummary> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/views/summary`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load view summary")
  return res.json()
}

async function getViewEvents(id: string): Promise<ViewEvent[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/views`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load view events")
  return res.json()
}

export default async function InstitutionViewsPage({
  params,
}: {
  params: { id: string }
}) {
  const [summary, events] = await Promise.all([
    getViewSummary(params.id),
    getViewEvents(params.id),
  ])

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Views & Engagement
        </h1>
        <p className="text-sm text-muted-foreground">
          Analytics for all user interactions with this institution.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ViewStatCard label="Total views" value={summary.total_views ?? 0} />
        <ViewStatCard label="Page views" value={summary.page_views ?? 0} />
        <ViewStatCard label="Program views" value={summary.program_views ?? 0} />
        <ViewStatCard label="AI questions" value={summary.ai_questions ?? 0} />
        <ViewStatCard label="Leads" value={summary.leads ?? 0} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Recent events</h2>
        <ul className="space-y-2 text-xs">
          {events.map((e) => (
            <li key={e.id} className="border-b pb-2 last:border-b-0">
              <div className="font-medium">{e.type}</div>
              <div className="text-muted-foreground">
                {new Date(e.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
'@

# 7) Git commit
if (-not $SkipGit) {
  if (Test-Path (Join-Path $ProjectRoot ".git")) {
    Write-Host "Staging changes with git..." -ForegroundColor Cyan
    git -C $ProjectRoot add .
    git -C $ProjectRoot commit -m "Add views analytics dashboard (API + UI)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Views Analytics Dashboard automation complete." -ForegroundColor Cyan

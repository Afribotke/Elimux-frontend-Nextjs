param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Admin Analytics Dashboard automation..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/admin/analytics",
  "app/api/admin/analytics/institutions",
  "app/admin/analytics",
  "app/admin/analytics/_components"
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

# 2) Types for admin analytics
Write-File "types/admin-analytics.ts" @'
export interface AdminAnalytics {
  total_institutions: number
  total_programs: number
  total_students: number
  total_applications: number
  total_views: number
}

export interface AdminInstitutionStat {
  institution_id: string
  name: string
  total_programs: number
  total_students: number
  total_applications: number
  total_views: number
  created_at: string
}
'@

# 3) API: /api/admin/analytics (global metrics)
Write-File "app/api/admin/analytics/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { AdminAnalytics } from "@/types/admin-analytics"

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("admin_analytics_summary")
    .select("*")
    .maybeSingle<AdminAnalytics>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch admin analytics" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}
'@

# 4) API: /api/admin/analytics/institutions (per-institution metrics)
Write-File "app/api/admin/analytics/institutions/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { AdminInstitutionStat } from "@/types/admin-analytics"

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("admin_institution_stats")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<AdminInstitutionStat[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch institution analytics" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 5) UI component: StatCard
Write-File "app/admin/analytics/_components/StatCard.tsx" @'
type Props = {
  label: string
  value: number
}

export function StatCard({ label, value }: Props) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
'@

# 6) UI page: /admin/analytics
Write-File "app/admin/analytics/page.tsx" @'
import { StatCard } from "./_components/StatCard"
import type { AdminAnalytics, AdminInstitutionStat } from "@/types/admin-analytics"

async function getAdminAnalytics(): Promise<AdminAnalytics> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/analytics`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load admin analytics")
  return res.json()
}

async function getInstitutionStats(): Promise<AdminInstitutionStat[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/analytics/institutions`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load institution stats")
  return res.json()
}

export default async function AdminAnalyticsPage() {
  const [analytics, institutions] = await Promise.all([
    getAdminAnalytics(),
    getInstitutionStats(),
  ])

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Platform Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Global metrics across all institutions on ElimuX.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Institutions" value={analytics.total_institutions ?? 0} />
        <StatCard label="Programs" value={analytics.total_programs ?? 0} />
        <StatCard label="Students" value={analytics.total_students ?? 0} />
        <StatCard label="Applications" value={analytics.total_applications ?? 0} />
        <StatCard label="Views" value={analytics.total_views ?? 0} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Institution breakdown</h2>
        <ul className="space-y-2 text-xs">
          {institutions.map((inst) => (
            <li key={inst.institution_id} className="border-b pb-2 last:border-b-0">
              <div className="font-medium">{inst.name}</div>
              <div className="text-muted-foreground">
                Programs: {inst.total_programs} • Students: {inst.total_students} • Applications: {inst.total_applications} • Views: {inst.total_views}
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
    git -C $ProjectRoot commit -m "Add admin analytics dashboard (API + UI)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Admin Analytics Dashboard automation complete." -ForegroundColor Cyan

param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Next.js Dashboard UI automation..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "app/institutions/dashboard",
  "app/institutions/[id]/dashboard"
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

# 2) Admin institutions dashboard list page
Write-File "app/institutions/dashboard/page.tsx" @'
import Link from "next/link"
import type { InstitutionDashboardSummary } from "@/types/institution"

async function getInstitutions(): Promise<InstitutionDashboardSummary[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/dashboard`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to load institutions dashboard")
  }

  return res.json()
}

export default async function InstitutionsDashboardPage() {
  const institutions = await getInstitutions()

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Institutions dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of all institutions on ElimuX
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {institutions.map((inst) => (
          <Link
            key={inst.institution_id}
            href={`/institutions/${inst.institution_id}/dashboard`}
            className="rounded-lg border bg-card p-4 shadow-sm hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium">{inst.name}</h2>
              <span className="text-xs text-muted-foreground">
                {new Date(inst.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {inst.email ?? "No email provided"}
            </p>
            <dl className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-muted-foreground">Programs</dt>
                <dd className="font-semibold">{inst.total_programs}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Applications</dt>
                <dd className="font-semibold">{inst.total_applications}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Students</dt>
                <dd className="font-semibold">{inst.total_students}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Views</dt>
                <dd className="font-semibold">{inst.total_views}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </section>
    </main>
  )
}
'@

# 3) Single institution dashboard page
Write-File "app/institutions/[id]/dashboard/page.tsx" @'
import type { InstitutionDashboardSummary } from "@/types/institution"

async function getInstitutionDashboard(
  id: string
): Promise<InstitutionDashboardSummary> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/dashboard`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to load institution dashboard")
  }

  return res.json()
}

export default async function InstitutionDashboardPage({
  params,
}: {
  params: { id: string }
}) {
  const dashboard = await getInstitutionDashboard(params.id)

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dashboard.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dashboard.email ?? "No email provided"}
          </p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <div>Institution ID: {dashboard.institution_id}</div>
          <div>
            Joined: {new Date(dashboard.created_at).toLocaleDateString()}
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-medium text-muted-foreground mb-1">
            Programs
          </h2>
          <p className="text-2xl font-semibold">
            {dashboard.total_programs}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-medium text-muted-foreground mb-1">
            Applications
          </h2>
          <p className="text-2xl font-semibold">
            {dashboard.total_applications}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-medium text-muted-foreground mb-1">
            Students
          </h2>
          <p className="text-2xl font-semibold">
            {dashboard.total_students}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="text-xs font-medium text-muted-foreground mb-1">
            Views
          </h2>
          <p className="text-2xl font-semibold">
            {dashboard.total_views}
          </p>
        </div>
      </section>
    </main>
  )
}
'@

# 4) Git
if (-not $SkipGit) {
  if (Test-Path (Join-Path $ProjectRoot ".git")) {
    Write-Host "Staging changes with git..." -ForegroundColor Cyan
    git -C $ProjectRoot add .
    git -C $ProjectRoot commit -m "Add institutions dashboard UI layer" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Next.js Dashboard UI automation complete." -ForegroundColor Cyan

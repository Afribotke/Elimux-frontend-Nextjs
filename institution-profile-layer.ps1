param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Institution Profile Dashboard automation..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/institutions/[id]/profile",
  "app/api/institutions/[id]/profile/stats",
  "app/institutions/[id]/profile",
  "app/institutions/[id]/profile/_components"
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

# 2) Types for institution profile + stats
Write-File "types/institution-profile.ts" @'
export interface InstitutionProfile {
  id: string
  name: string
  type: string
  country: string
  city: string | null
  description: string | null
  website: string | null
  logo_url: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  created_at: string
}

export interface InstitutionProfileStats {
  institution_id: string
  total_programs: number
  total_students: number
  total_applications: number
  total_views: number
  created_at: string
}
'@

# 3) API: /api/institutions/[id]/profile (raw institution data)
Write-File "app/api/institutions/[id]/profile/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionProfile } from "@/types/institution-profile"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institutions")
    .select(`
      id,
      name,
      type,
      country,
      city,
      description,
      branding:branding->logoUrl,
      website:branding->website,
      contact:contact->name,
      contact_email:contact->email,
      contact_phone:contact->phone,
      created_at
    `)
    .eq("id", params.id)
    .maybeSingle<InstitutionProfile>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch institution profile" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}
'@

# 4) API: /api/institutions/[id]/profile/stats (view)
Write-File "app/api/institutions/[id]/profile/stats/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionProfileStats } from "@/types/institution-profile"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_profile_stats")
    .select("*")
    .eq("institution_id", params.id)
    .maybeSingle<InstitutionProfileStats>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch institution profile stats" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}
'@

# 5) UI component: ProfileHeader
Write-File "app/institutions/[id]/profile/_components/ProfileHeader.tsx" @'
import type { InstitutionProfile } from "@/types/institution-profile"

export function ProfileHeader({ profile }: { profile: InstitutionProfile }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {profile.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {profile.type.toUpperCase()} • {profile.country}
        </p>
      </div>

      {profile.logo_url && (
        <img
          src={profile.logo_url}
          alt={profile.name}
          className="h-12 w-12 rounded-md object-cover border"
        />
      )}
    </header>
  )
}
'@

# 6) UI component: ProfileStats
Write-File "app/institutions/[id]/profile/_components/ProfileStats.tsx" @'
import type { InstitutionProfileStats } from "@/types/institution-profile"

export function ProfileStats({ stats }: { stats: InstitutionProfileStats }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="text-xs text-muted-foreground">Programs</div>
        <div className="text-2xl font-semibold">{stats.total_programs}</div>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="text-xs text-muted-foreground">Students</div>
        <div className="text-2xl font-semibold">{stats.total_students}</div>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="text-xs text-muted-foreground">Applications</div>
        <div className="text-2xl font-semibold">{stats.total_applications}</div>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="text-xs text-muted-foreground">Views</div>
        <div className="text-2xl font-semibold">{stats.total_views}</div>
      </div>
    </section>
  )
}
'@

# 7) UI page: /institutions/[id]/profile
Write-File "app/institutions/[id]/profile/page.tsx" @'
import { ProfileHeader } from "./_components/ProfileHeader"
import { ProfileStats } from "./_components/ProfileStats"
import type { InstitutionProfile, InstitutionProfileStats } from "@/types/institution-profile"

async function getProfile(id: string): Promise<InstitutionProfile> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/profile`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load profile")
  return res.json()
}

async function getStats(id: string): Promise<InstitutionProfileStats> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/profile/stats`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load stats")
  return res.json()
}

export default async function InstitutionProfilePage({ params }: { params: { id: string } }) {
  const [profile, stats] = await Promise.all([
    getProfile(params.id),
    getStats(params.id),
  ])

  return (
    <main className="p-6 space-y-6">
      <ProfileHeader profile={profile} />
      <ProfileStats stats={stats} />

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">About</h2>
        <p className="text-sm text-muted-foreground">
          {profile.description ?? "No description provided."}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Contact</h2>
        <p className="text-sm text-muted-foreground">
          {profile.contact_name ?? "N/A"} • {profile.contact_email ?? "N/A"} • {profile.contact_phone ?? "N/A"}
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
    git -C $ProjectRoot commit -m "Add institution profile dashboard (API + UI)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Institution Profile Dashboard automation complete." -ForegroundColor Cyan

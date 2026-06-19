param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Next.js API layer automation..." -ForegroundColor Cyan

# Normalize absolute path
$ProjectRoot = (Resolve-Path $ProjectRoot).Path

Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "lib/supabase",
  "types",
  "app/api/institutions/[id]/dashboard",
  "app/api/institutions/dashboard",
  "app/api/institutions/[id]"
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

# 2) Write files (absolute paths)
Write-File "lib/supabase/server.ts" @'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export function createSupabaseServer() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
'@

Write-File "types/institution.ts" @'
export interface InstitutionDashboardSummary {
  institution_id: string
  name: string
  email: string | null
  logo_url: string | null
  created_at: string

  total_programs: number
  total_applications: number
  total_students: number
  total_views: number
}
'@

Write-File "app/api/institutions/[id]/dashboard/route.ts" @'
import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import type { InstitutionDashboardSummary } from '@/types/institution'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from('institution_dashboard_summary')
    .select('*')
    .eq('institution_id', params.id)
    .maybeSingle<InstitutionDashboardSummary>()

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch institution dashboard' },
      { status: 500 }
    )
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Institution not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}
'@

Write-File "app/api/institutions/dashboard/route.ts" @'
import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import type { InstitutionDashboardSummary } from '@/types/institution'

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from('institution_dashboard_summary')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<InstitutionDashboardSummary[]>()

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch institutions dashboard' },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

Write-File "app/api/institutions/[id]/route.ts" @'
import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from('institutions')
    .select('*')
    .eq('id', params.id)
    .maybeSingle()

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch institution' },
      { status: 500 }
    )
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Institution not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}
'@

Write-Host "==> Next.js API layer automation complete." -ForegroundColor Cyan

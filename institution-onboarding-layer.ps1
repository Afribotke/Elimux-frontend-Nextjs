param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Institution Onboarding Workflow automation..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/institutions/onboard",
  "app/api/institutions/[id]/onboarding",
  "app/api/institutions/[id]/onboarding/verify",
  "app/institutions/onboard",
  "app/institutions/[id]/onboarding",
  "app/institutions/[id]/onboarding/_components"
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

# 2) Types for onboarding workflow
Write-File "types/institution-onboarding.ts" @'
export interface InstitutionOnboarding {
  id: string
  name: string
  type: string
  country: string
  email: string
  phone: string | null
  website: string | null
  documents_submitted: boolean
  verification_status: "pending" | "approved" | "rejected"
  created_at: string
}

export interface InstitutionVerificationStatus {
  institution_id: string
  status: "pending" | "approved" | "rejected"
  reviewed_by: string | null
  reviewed_at: string | null
}
'@

# 3) API: POST /api/institutions/onboard (create onboarding record)
Write-File "app/api/institutions/onboard/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = createSupabaseServer()
  const body = await req.json()

  const { data, error } = await supabase
    .from("institutions")
    .insert({
      name: body.name,
      type: body.type,
      country: body.country,
      email: body.email,
      phone: body.phone,
      website: body.website,
      documents_submitted: false,
      verification_status: "pending",
    })
    .select("*")
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Failed to create onboarding record" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
'@

# 4) API: GET /api/institutions/[id]/onboarding (fetch onboarding state)
Write-File "app/api/institutions/[id]/onboarding/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionOnboarding } from "@/types/institution-onboarding"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institutions")
    .select("*")
    .eq("id", params.id)
    .maybeSingle<InstitutionOnboarding>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch onboarding state" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}
'@

# 5) API: POST /api/institutions/[id]/onboarding/verify (update verification)
Write-File "app/api/institutions/[id]/onboarding/verify/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()
  const body = await req.json()

  const { data, error } = await supabase
    .from("institutions")
    .update({
      verification_status: body.status,
      documents_submitted: body.documents_submitted ?? true,
    })
    .eq("id", params.id)
    .select("*")
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Failed to update verification status" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
'@

# 6) UI component: OnboardingProgress
Write-File "app/institutions/[id]/onboarding/_components/OnboardingProgress.tsx" @'
export function OnboardingProgress({
  status,
}: {
  status: "pending" | "approved" | "rejected"
}) {
  const steps = [
    { label: "Account Created", done: true },
    { label: "Documents Submitted", done: status !== "pending" },
    { label: "Verification Complete", done: status === "approved" },
  ]

  return (
    <ul className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex items-center gap-3">
          <div
            className={`h-4 w-4 rounded-full ${
              s.done ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <span className="text-sm">{s.label}</span>
        </li>
      ))}
    </ul>
  )
}
'@

# 7) UI page: /institutions/onboard
Write-File "app/institutions/onboard/page.tsx" @'
"use client"

import { useState } from "react"

export default function InstitutionOnboardPage() {
  const [loading, setLoading] = useState(false)

  async function submitForm(e: any) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.target)
    const payload = Object.fromEntries(form.entries())

    await fetch("/api/institutions/onboard", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    setLoading(false)
    alert("Institution onboarding started successfully.")
  }

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Institution Onboarding
      </h1>

      <form onSubmit={submitForm} className="space-y-4">
        <input name="name" placeholder="Institution Name" className="input" required />
        <input name="type" placeholder="Type (University, College, etc.)" className="input" required />
        <input name="country" placeholder="Country" className="input" required />
        <input name="email" placeholder="Email" className="input" required />
        <input name="phone" placeholder="Phone" className="input" />
        <input name="website" placeholder="Website" className="input" />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Submitting..." : "Start Onboarding"}
        </button>
      </form>
    </main>
  )
}
'@

# 8) UI page: /institutions/[id]/onboarding
Write-File "app/institutions/[id]/onboarding/page.tsx" @'
import { OnboardingProgress } from "./_components/OnboardingProgress"
import type { InstitutionOnboarding } from "@/types/institution-onboarding"

async function getOnboarding(id: string): Promise<InstitutionOnboarding> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/onboarding`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load onboarding state")
  return res.json()
}

export default async function InstitutionOnboardingPage({
  params,
}: {
  params: { id: string }
}) {
  const onboarding = await getOnboarding(params.id)

  return (
    <main className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight">
        Onboarding Progress
      </h1>

      <OnboardingProgress status={onboarding.verification_status} />

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Institution Info</h2>
        <p className="text-sm text-muted-foreground">
          {onboarding.name} • {onboarding.type} • {onboarding.country}
        </p>
      </section>
    </main>
  )
}
'@

# 9) Git commit
if (-not $SkipGit) {
  if (Test-Path (Join-Path $ProjectRoot ".git")) {
    Write-Host "Staging changes with git..." -ForegroundColor Cyan
    git -C $ProjectRoot add .
    git -C $ProjectRoot commit -m "Add institution onboarding workflow (API + UI)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Institution Onboarding Workflow automation complete." -ForegroundColor Cyan

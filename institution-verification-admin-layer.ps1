param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Institution Verification Admin Panel automation..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/admin/institutions/verification",
  "app/admin/institutions/verification",
  "app/admin/institutions/verification/_components"
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

# 2) Types for admin verification view
Write-File "types/institution-verification-admin.ts" @'
export type VerificationStatus = "pending" | "approved" | "rejected"

export interface InstitutionVerificationAdminItem {
  institution_id: string
  name: string
  country: string
  type: string
  verification_status: VerificationStatus
  documents_count: number
  created_at: string
}
'@

# 3) API: /api/admin/institutions/verification (list institutions + status)
Write-File "app/api/admin/institutions/verification/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionVerificationAdminItem } from "@/types/institution-verification-admin"

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("admin_institution_verification_summary")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<InstitutionVerificationAdminItem[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch institution verification list" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 4) UI component: StatusBadge
Write-File "app/admin/institutions/verification/_components/StatusBadge.tsx" @'
import type { VerificationStatus } from "@/types/institution-verification-admin"

export function StatusBadge({ status }: { status: VerificationStatus }) {
  const color =
    status === "approved"
      ? "bg-green-100 text-green-800"
      : status === "rejected"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800"

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
      {status.toUpperCase()}
    </span>
  )
}
'@

# 5) UI component: VerificationRow
Write-File "app/admin/institutions/verification/_components/VerificationRow.tsx" @'
"use client"

import { useState } from "react"
import { StatusBadge } from "./StatusBadge"
import type { InstitutionVerificationAdminItem, VerificationStatus } from "@/types/institution-verification-admin"

type Props = {
  item: InstitutionVerificationAdminItem
  onUpdated: () => void
}

export function VerificationRow({ item, onUpdated }: Props) {
  const [loading, setLoading] = useState<VerificationStatus | null>(null)

  async function updateStatus(status: VerificationStatus) {
    setLoading(status)
    await fetch(`/api/institutions/${item.institution_id}/onboarding/verify`, {
      method: "POST",
      body: JSON.stringify({
        status,
        documents_submitted: true,
      }),
    })
    setLoading(null)
    onUpdated()
  }

  return (
    <tr className="border-b last:border-b-0 text-xs">
      <td className="px-3 py-2 font-medium">{item.name}</td>
      <td className="px-3 py-2 text-muted-foreground">{item.country}</td>
      <td className="px-3 py-2 text-muted-foreground">{item.type}</td>
      <td className="px-3 py-2">
        <StatusBadge status={item.verification_status} />
      </td>
      <td className="px-3 py-2 text-center">{item.documents_count}</td>
      <td className="px-3 py-2 space-x-2 text-right">
        <button
          onClick={() => updateStatus("approved")}
          disabled={loading !== null}
          className="rounded-md bg-green-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading === "approved" ? "Approving..." : "Approve"}
        </button>
        <button
          onClick={() => updateStatus("rejected")}
          disabled={loading !== null}
          className="rounded-md bg-red-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading === "rejected" ? "Rejecting..." : "Reject"}
        </button>
      </td>
    </tr>
  )
}
'@

# 6) UI page: /admin/institutions/verification
Write-File "app/admin/institutions/verification/page.tsx" @'
"use client"

import { useEffect, useState } from "react"
import { VerificationRow } from "./_components/VerificationRow"
import type { InstitutionVerificationAdminItem } from "@/types/institution-verification-admin"

export default function InstitutionVerificationAdminPage() {
  const [items, setItems] = useState<InstitutionVerificationAdminItem[]>([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    setLoading(true)
    const res = await fetch("/api/admin/institutions/verification", {
      cache: "no-store",
    })
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Institution Verification
        </h1>
        <p className="text-sm text-muted-foreground">
          Review documents and approve or reject institution verification requests.
        </p>
      </header>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading institutions...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No institutions pending or available for verification.
        </p>
      ) : (
        <section className="overflow-x-auto rounded-lg border bg-card">
          <table className="min-w-full text-left">
            <thead className="border-b bg-muted text-[11px] uppercase text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Institution</th>
                <th className="px-3 py-2 font-medium">Country</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium text-center">Documents</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <VerificationRow
                  key={item.institution_id}
                  item={item}
                  onUpdated={loadData}
                />
              ))}
            </tbody>
          </table>
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
    git -C $ProjectRoot commit -m "Add institution verification admin panel (API + UI)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Institution Verification Admin Panel automation complete." -ForegroundColor Cyan

param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Institution Document Upload automation..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/institutions/[id]/documents",
  "app/institutions/[id]/documents",
  "app/institutions/[id]/documents/_components"
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

# 2) Types for institution documents
Write-File "types/institution-document.ts" @'
export type InstitutionDocumentType =
  | "registration_certificate"
  | "accreditation_letter"
  | "tax_pin"
  | "compliance_certificate"
  | "other"

export interface InstitutionDocument {
  id: string
  institution_id: string
  type: InstitutionDocumentType
  name: string
  url: string
  uploaded_at: string
  uploaded_by: string | null
}
'@

# 3) API: GET/POST /api/institutions/[id]/documents
Write-File "app/api/institutions/[id]/documents/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionDocument } from "@/types/institution-document"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_documents")
    .select("*")
    .eq("institution_id", params.id)
    .order("uploaded_at", { ascending: false })
    .returns<InstitutionDocument[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()
  const body = await req.json()

  const { data, error } = await supabase
    .from("institution_documents")
    .insert({
      institution_id: params.id,
      type: body.type,
      name: body.name,
      url: body.url,
      uploaded_by: body.uploaded_by ?? null,
    })
    .select("*")
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
'@

# 4) UI component: DocumentCard
Write-File "app/institutions/[id]/documents/_components/DocumentCard.tsx" @'
import type { InstitutionDocument } from "@/types/institution-document"

export function DocumentCard({ doc }: { doc: InstitutionDocument }) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm space-y-2">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-medium">{doc.name}</h3>
          <p className="text-xs text-muted-foreground">
            {doc.type.replace("_", " ")}
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(doc.uploaded_at).toLocaleDateString()}
        </span>
      </header>

      <a
        href={doc.url}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-blue-600 hover:underline"
      >
        View document
      </a>

      {doc.uploaded_by && (
        <p className="text-xs text-muted-foreground">
          Uploaded by: {doc.uploaded_by}
        </p>
      )}
    </article>
  )
}
'@

# 5) UI page: /institutions/[id]/documents
Write-File "app/institutions/[id]/documents/page.tsx" @'
"use client"

import { useEffect, useState } from "react"
import { DocumentCard } from "./_components/DocumentCard"
import type { InstitutionDocument, InstitutionDocumentType } from "@/types/institution-document"

type Props = {
  params: { id: string }
}

export default function InstitutionDocumentsPage({ params }: Props) {
  const [docs, setDocs] = useState<InstitutionDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  async function loadDocuments() {
    setLoading(true)
    const res = await fetch(`/api/institutions/${params.id}/documents`, {
      cache: "no-store",
    })
    const data = await res.json()
    setDocs(data)
    setLoading(false)
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())

    await fetch(`/api/institutions/${params.id}/documents`, {
      method: "POST",
      body: JSON.stringify(payload),
    })

    setSubmitting(false)
    e.currentTarget.reset()
    await loadDocuments()
  }

  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Institution Documents
        </h1>
        <p className="text-sm text-muted-foreground">
          Upload and manage compliance and verification documents.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold">Upload document</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            name="type"
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          >
            <option value="">Select document type</option>
            <option value="registration_certificate">Registration certificate</option>
            <option value="accreditation_letter">Accreditation letter</option>
            <option value="tax_pin">Tax PIN</option>
            <option value="compliance_certificate">Compliance certificate</option>
            <option value="other">Other</option>
          </select>

          <input
            name="name"
            placeholder="Document name"
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />

          <input
            name="url"
            placeholder="Document URL (from storage)"
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />

          <input
            name="uploaded_by"
            placeholder="Uploaded by (optional)"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Uploading..." : "Upload document"}
          </button>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Uploaded documents</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading documents...</p>
        ) : docs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {docs.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
'@

# 6) Git commit
if (-not $SkipGit) {
  if (Test-Path (Join-Path $ProjectRoot ".git")) {
    Write-Host "Staging changes with git..." -ForegroundColor Cyan
    git -C $ProjectRoot add .
    git -C $ProjectRoot commit -m "Add institution document upload (API + UI)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Institution Document Upload automation complete." -ForegroundColor Cyan

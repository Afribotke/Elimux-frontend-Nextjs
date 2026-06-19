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
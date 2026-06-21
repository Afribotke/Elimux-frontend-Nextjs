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


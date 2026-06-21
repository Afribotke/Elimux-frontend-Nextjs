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

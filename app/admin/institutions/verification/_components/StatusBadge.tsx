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


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
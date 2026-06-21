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



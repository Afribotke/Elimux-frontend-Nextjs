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


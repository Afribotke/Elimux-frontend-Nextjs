export interface InstitutionProfile {
  id: string
  name: string
  type: string
  country: string
  city: string | null
  description: string | null
  website: string | null
  logo_url: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  created_at: string
}

export interface InstitutionProfileStats {
  institution_id: string
  total_programs: number
  total_students: number
  total_applications: number
  total_views: number
  created_at: string
}



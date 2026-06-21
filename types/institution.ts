export interface InstitutionDashboardSummary {
  institution_id: string
  name: string
  email: string | null
  logo_url: string | null
  created_at: string

  total_programs: number
  total_applications: number
  total_students: number
  total_views: number
}


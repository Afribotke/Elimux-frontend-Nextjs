export interface Student {
  id: string
  institution_id: string
  name: string
  email: string | null
  country: string | null
  created_at: string
}

export interface StudentSummary {
  student_id: string
  institution_id: string
  name: string
  email: string | null
  country: string | null
  total_applications: number
  total_programs: number
  created_at: string
}

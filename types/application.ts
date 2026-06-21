export interface Application {
  id: string
  institution_id: string
  program_id: string
  student_id: string
  status: string
  created_at: string
}

export interface ApplicationSummary {
  application_id: string
  institution_id: string
  program_name: string
  student_name: string | null
  status: string
  created_at: string
}


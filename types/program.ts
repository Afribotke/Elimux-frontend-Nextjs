export interface Program {
  id: string
  institution_id: string
  name: string
  description: string | null
  level: string | null
  duration: string | null
  created_at: string
}

export interface ProgramSummary {
  program_id: string
  institution_id: string
  program_name: string
  total_applications: number
  total_students: number
  total_views: number
  created_at: string
}
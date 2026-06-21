export interface ProgramDetail {
  id: string
  institution_id: string
  name: string
  description: string | null
  level: string | null
  duration: string | null
  fees: string | null
  mode: string | null
  requirements: string | null
  created_at: string
}

export interface ProgramDetailStats {
  program_id: string
  total_views: number
  total_applications: number
  total_students: number
  created_at: string
}

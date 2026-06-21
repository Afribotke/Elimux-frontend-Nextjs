export interface AdminAnalytics {
  total_institutions: number
  total_programs: number
  total_students: number
  total_applications: number
  total_views: number
}

export interface AdminInstitutionStat {
  institution_id: string
  name: string
  total_programs: number
  total_students: number
  total_applications: number
  total_views: number
  created_at: string
}

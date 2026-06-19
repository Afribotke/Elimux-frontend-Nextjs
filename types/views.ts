export interface ViewEvent {
  id: string
  institution_id: string
  type: string
  program_id: string | null
  meta: any
  created_at: string
}

export interface ViewSummary {
  institution_id: string
  total_views: number
  program_views: number
  page_views: number
  ai_questions: number
  leads: number
  created_at: string
}
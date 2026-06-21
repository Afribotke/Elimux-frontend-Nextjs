export type Programs = {
  id: string
  institution_id: string
  name: string
  level: string
  duration_months: number
  tuition_fee: number
  mode: 'online' | 'onsite' | 'hybrid'
  created_at: string
  created_by: string
}


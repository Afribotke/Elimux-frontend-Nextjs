export type Applications = {
  id: string
  institution_id: string
  student_id: string
  program_id: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  created_by: string
}

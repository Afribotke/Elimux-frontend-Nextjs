import { z } from 'zod'

export const applicationsSchema = z.object({
  student_id: z.string(),
  program_id: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
})
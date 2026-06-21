import { z } from 'zod'

export const staffSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.enum(["admin", "staff"]),
})

import { z } from 'zod'

export const programsSchema = z.object({
  name: z.string(),
  level: z.string(),
  duration_months: z.number(),
  tuition_fee: z.number(),
  mode: z.enum(["online", "onsite", "hybrid"]),
})
import { z } from 'zod'

export const documentsSchema = z.object({
  name: z.string(),
  url: z.string(),
  type: z.string(),
})
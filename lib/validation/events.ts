import { z } from 'zod'

export const eventsSchema = z.object({
  title: z.string(),
  date: z.string(),
  location: z.string(),
})
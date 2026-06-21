import { z } from 'zod'

export const messagesSchema = z.object({
  sender_id: z.string(),
  receiver_id: z.string(),
  content: z.string(),
})


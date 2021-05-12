import * as z from "zod"

export const AdminMessage = z.object({
  content: z.string(),
  chatId: z.number().int(),
})

export const UserMessage = z.object({
  content: z.string(),
  chatId: z.number().int(),
  partId: z.number().int(),
})

export const MarkMessage = z.object({
  chatId: z.number().int(),
})

export const NewChat = z.object({
  opponentId: z.number().int(),
})

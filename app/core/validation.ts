import * as z from "zod"

export const Position = z.object({
  new_longitude: z.number().max(180).min(-180),
  new_latitude: z.number().max(180).min(-180),
})

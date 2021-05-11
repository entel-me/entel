import db from "db"
import { Ctx, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { Position } from "../validation"

export default resolver.pipe(resolver.zod(Position), async ({ new_longitude, new_latitude }, context: Ctx) => {
  context.session.$authorize()
  await db.user.update({
    where: { id: context.session.userId },
    data: { last_latitude: new_latitude, last_longitude: new_longitude },
  })
  log.info("A Position was updated.")
})

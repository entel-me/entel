import db from "db"
import { Ctx } from "blitz"
import { dbLogger as log } from "app/lib/logger"

export default async function removeAllItems({ id }, context: Ctx) {
  context.session.$authorize()
  await db.item.deleteMany({
    where: { listId: id },
  })
  log.debug("Items were removed.")
}

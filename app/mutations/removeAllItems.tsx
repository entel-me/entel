import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function removeAllItems({ id }, context: Ctx) {
  context.session.$authorize()
  await db.item.deleteMany({
    where: { listId: id },
  })
  const log: Logger = new Logger({ name: "db" })
  log.debug("Items were removed.")
}

import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function updateStoreComment({ id, store, comment }, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: id },
    data: { store: store, comment: comment },
  })
  const log: Logger = new Logger({ name: "db" })
  log.info("A store or/and comment of a shoppinglist were updated.")
}

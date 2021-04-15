import db from "db"
import { Ctx } from "blitz"
import { dbLogger as log } from "app/lib/logger"

export default async function updateStoreComment({ id, store, comment }, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: id },
    data: { store: store, comment: comment },
  })
  log.info("A store or/and comment of a shoppinglist were updated.")
}

import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { StoreCommentUpdate } from "../validation"

export default resolver.pipe(
  resolver.zod(StoreCommentUpdate),
  resolver.authorize(),
  async ({ id, store, comment }, context) => {
    await db.shoppinglist.update({
      where: { id: id },
      data: { store: store, comment: comment },
    })
    log.info("A store or/and comment of a shoppinglist were updated.")
  }
)

import db from "db"
import { AuthorizationError, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { StoreCommentUpdate } from "../validation"

export default resolver.pipe(
  resolver.zod(StoreCommentUpdate),
  resolver.authorize(),
  async ({ id, store, comment }, context) => {

    const listToChange = await db.shoppinglist.findFirst({
      where: { id: id, creatorId: context.session.userId },
    })
    if (!listToChange) throw new AuthorizationError("You are not allowed to archive this list.")
    await db.shoppinglist.update({
      where: { id: id },
      data: { store: store, comment: comment },
    })
    log.info("A store or/and comment of a shoppinglist were updated.")
  }
)

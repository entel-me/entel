import db from "db"
import { AuthorizationError, Ctx, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { List } from "../validation"
import removeAllItems from "./removeAllItems"

export default resolver.pipe(
  resolver.zod(List),
  resolver.authorize(),
  async ({ id }, context: Ctx) => {
    context.session.$authorize()

    const listToChange = await db.shoppinglist.findFirst({
      where: { id: id, creatorId: context.session.userId },
    })
    if (!listToChange) throw new AuthorizationError("You are not allowed to archive this list.")

    await removeAllItems({id: id}, context)

    await db.shoppinglist.delete({
      where: { id: id },
    })
    log.debug("A shoopinglist was removed.")
  }
)

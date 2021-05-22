import db from "db"
import { AuthorizationError, Ctx, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { List } from "../validation"

export default resolver.pipe(
  resolver.zod(List),
  resolver.authorize(),
  async ({ id }, context: Ctx) => {
    context.session.$authorize()

    const listToChange = await db.shoppinglist.findFirst({
      where: { id: id, creatorId: context.session.userId },
    })
    if (!listToChange) throw new AuthorizationError("You are not allowed to archive this list.")

    await db.shoppinglist.update({
      where: { id: id },
      data: { status: 0 },
    })
    log.debug("List changed status to 'in progress'.")
  }
)

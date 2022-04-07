import db from "db"
import { AuthorizationError, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { List } from "../validation"

export default resolver.pipe(
  resolver.zod(List),
  resolver.authorize(),
  async ({ id }, context) => {

    const listToChange = await db.shoppinglist.findFirst({
      where: { id: id, creatorId: context.session.userId },
    })
    if (!listToChange) throw new AuthorizationError("You are not allowed to archive this list.")

    await db.shoppinglist.update({
      where: { id: id },
      data: { status: 2 },
    })
    log.info("List changed status to 'archived'.")
  }
)


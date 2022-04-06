import db from "db"
import { AuthorizationError, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { List } from "../validation"

export default resolver.pipe(
  resolver.zod(List),
  resolver.authorize(),
  async ({ id }, context) => {

    const accpetedList = await db.shoppinglist.findFirst({
      where: { id: id, acceptorId: context.session.userId },
    })
    if (!accpetedList)
      throw new AuthorizationError("You are not allowed to mark this list as done.")

    await db.shoppinglist.update({
      where: { id: id },
      data: { status: 2, acceptedBy: { disconnect: true } },
    })
    log.debug("List changed status to '2'.")
  }
)


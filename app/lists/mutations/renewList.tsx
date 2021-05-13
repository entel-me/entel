import db from "db"
import { Ctx, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { List } from "../validation"

export default resolver.pipe(
  resolver.zod(List),
  resolver.authorize(),
  async ({ id }, context: Ctx) => {
    context.session.$authorize()
    await db.shoppinglist.update({
      where: { id: id },
      data: { status: 0 },
    })
    log.debug("List changed status to 'in progress'.")
  }
)

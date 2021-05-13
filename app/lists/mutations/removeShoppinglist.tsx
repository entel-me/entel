import db from "db"
import { Ctx, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { List } from "../validation"

export default resolver.pipe(
  resolver.zod(List),
  resolver.authorize(),
  async ({ id }, context: Ctx) => {
    context.session.$authorize()
    await db.item.deleteMany({
      where: { listId: id },
    })

    await db.shoppinglist.delete({
      where: { id: id },
    })
    log.debug("A shoopinglist was removed.")
  }
)

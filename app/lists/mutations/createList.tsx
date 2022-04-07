import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { NewList } from "../validation"

export default resolver.pipe(
  resolver.zod(NewList),
  resolver.authorize(),
  async ({ store, specialWish }, context) => {
    const lists = await db.shoppinglist.create({
      data: {
        createdBy: { connect: { id: context.session.userId } },
        store: store,
        comment: specialWish,
        status: 0,
      },
      select: { id: true },
    })
    log.debug("Created new shoppinglist.")
    return lists
  }
)

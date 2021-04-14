import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function createList({ store, specialWish }, context: Ctx) {
  context.session.$authorize()
  const lists = await db.shoppinglist.create({
    data: {
      createdBy: { connect: { id: context.session.userId } },
      store: store,
      comment: specialWish,
      status: 0,
    },
    select: { id: true },
  })
  const log: Logger = new Logger({ name: "db" })
  log.debug("Created new shoppinglist.")
  return lists
}

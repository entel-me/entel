import db from "db"
import { Ctx } from "blitz"

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
  return lists
}

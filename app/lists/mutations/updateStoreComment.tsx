import db from "db"
import { Ctx } from "blitz"

export default async function updateStoreComment({ id, store, comment }, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: id },
    data: { store: store, comment: comment },
  })
}

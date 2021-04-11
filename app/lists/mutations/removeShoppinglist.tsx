import db from "db"
import { Ctx } from "blitz"

export default async function removeShoppinglist({ id }, context: Ctx) {
  context.session.$authorize()
  await db.item.deleteMany({
    where: { listId: id },
  })

  await db.shoppinglist.delete({
    where: { id: id },
  })
}

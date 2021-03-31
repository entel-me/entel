import db from "db"
import { Ctx } from "blitz"

export default async function doneList(listId, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { status: 2 },
  })
}

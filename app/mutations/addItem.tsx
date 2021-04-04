import db from "db"
import { Ctx } from "blitz"

export default async function acceptList(listId, itemName, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { acceptedBy: { connect: { id: context.session.userId } } },
  })
}

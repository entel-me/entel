import db from "db"
import { Ctx } from "blitz"

export default async function acceptList(listId, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { status: 1, acceptedBy: { connect: { id: context.session.userId } } },
  })
}

import db from "db"
import { Ctx } from "blitz"

export default async function addItem({ listId, itemName }, context: Ctx) {
  context.session.$authorize()
  await db.item.create({
    data: { name: itemName, listedIn: { connect: { id: listId } } },
  })
}

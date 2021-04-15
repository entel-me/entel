import db from "db"
import { Ctx } from "blitz"
import { dbLogger as log } from "app/lib/logger"

export default async function addItem({ listId, itemName }, context: Ctx) {
  context.session.$authorize()
  await db.item.create({
    data: { name: itemName, listedIn: { connect: { id: listId } } },
  })
  log.info("New item was created.")
}

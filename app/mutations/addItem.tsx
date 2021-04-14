import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function addItem({ listId, itemName }, context: Ctx) {
  context.session.$authorize()
  await db.item.create({
    data: { name: itemName, listedIn: { connect: { id: listId } } },
  })
  const log: Logger = new Logger({ name: "db" })
  log.info("New item was created.")
}

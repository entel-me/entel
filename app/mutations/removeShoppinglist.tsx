import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function removeShoppinglist({ id }, context: Ctx) {
  context.session.$authorize()
  await db.item.deleteMany({
    where: { listId: id },
  })

  await db.shoppinglist.delete({
    where: { id: id },
  })
  const log: Logger = new Logger({ name: "db" })
  log.debug("A shoopinglist was removed.")
}

import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function renewList(listId, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { status: 0 },
  })
  const log: Logger = new Logger({ name: "db" })
  log.debug("List changed status to 'in progress'.")
}

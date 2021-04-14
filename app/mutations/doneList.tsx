import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function doneList(listId, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { status: 2, acceptedBy: { disconnect: true } },
  })
  const log: Logger = new Logger({ name: "db" })
  log.debug("List changed status to '2'.")
}

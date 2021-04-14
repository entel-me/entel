import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function archiveList(listId, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { status: 2 },
  })
  const log: Logger = new Logger({ name: "db" })
  log.info("List changed status to 'archived'.")
}

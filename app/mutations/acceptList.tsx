import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function acceptList(listId, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { status: 1, acceptedBy: { connect: { id: context.session.userId } } },
  })
  const log: Logger = new Logger({ name: "db" })
  log.info("List changed status to '2'.")
}

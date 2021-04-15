import db from "db"
import { Ctx } from "blitz"
import { dbLogger as log } from "app/lib/logger"

export default async function acceptList(listId, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { status: 1, acceptedBy: { connect: { id: context.session.userId } } },
  })
  log.info("List changed status to 'in progress'.")
}

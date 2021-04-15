import db from "db"
import { Ctx } from "blitz"
import { dbLogger as log } from "app/lib/logger"

export default async function renewList(listId, context: Ctx) {
  context.session.$authorize()
  await db.shoppinglist.update({
    where: { id: listId },
    data: { status: 0 },
  })
  log.debug("List changed status to 'in progress'.")
}

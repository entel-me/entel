import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { List } from "../validation"

export default resolver.pipe(resolver.zod(List), resolver.authorize(), async ({ id }, context) => {
  await db.shoppinglist.update({
    where: { id: id },
    data: { status: 2 },
  })
  log.info("List changed status to 'archived'.")
})

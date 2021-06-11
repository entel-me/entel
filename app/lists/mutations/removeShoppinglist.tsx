import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { List } from "../validation"

export default resolver.pipe(resolver.zod(List), resolver.authorize(), async ({ id }, context) => {
  await db.item.deleteMany({
    where: { listId: id },
  })

  await db.shoppinglist.delete({
    where: { id: id },
  })
  log.debug("A shoopinglist was removed.")
})

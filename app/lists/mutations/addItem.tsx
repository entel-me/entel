import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { NewItem } from "../validation"

export default resolver.pipe(
  resolver.zod(NewItem),
  resolver.authorize(),
  async ({ listId, itemName }, context) => {
    await db.item.create({
      data: { name: itemName, listedIn: { connect: { id: listId } } },
    })
    log.info("New item was created.")
  }
)

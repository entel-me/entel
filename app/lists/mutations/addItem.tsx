import db from "db"
import { AuthorizationError, resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { NewItem } from "../validation"

export default resolver.pipe(
  resolver.zod(NewItem),
  resolver.authorize(),
  async ({ listId, itemName }, context) => {
    
    const listToChange = await db.shoppinglist.findFirst({
      where: { id: listId, creatorId: context.session.userId },
    })
    if (!listToChange) throw new AuthorizationError("You are not allowed to add an item to this shoppinglist.")
      
    await db.item.create({
      data: { name: itemName, listedIn: { connect: { id: listId } } },
    })
    log.info("New item was created.")
  }
)

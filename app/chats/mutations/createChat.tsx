import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { NewChat } from "../validation"

export default resolver.pipe(
  resolver.zod(NewChat),
  resolver.authorize(),
  async ({ opponentId }, context) => {
    const lists = await db.chat.create({
      data: {
        participatingUsers: { connect: [{ id: context.session.userId }, { id: opponentId }] },
      },

      select: { id: true },
    })
    log.debug("Created new chat.")
    return lists
  }
)

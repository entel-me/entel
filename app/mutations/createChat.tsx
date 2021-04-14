import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function createChat({ opponentId }, context: Ctx) {
  context.session.$authorize()
  const lists = await db.chat.create({
    data: {
      participatingUsers: { connect: [{ id: context.session.userId }, { id: opponentId }] },
    },

    select: { id: true },
  })
  const log: Logger = new Logger({ name: "db" })
  log.debug("Created new chat.")
  return lists
}

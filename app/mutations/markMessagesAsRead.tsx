import db from "db"
import { Ctx } from "blitz"
import { Logger } from "tslog"

export default async function markMessagesAsRead({ chatId }, context: Ctx) {
  context.session.$authorize()
  await db.message.updateMany({
    where: { sentInId: chatId, sentToId: context.session.userId },
    data: { wasRead: true },
  })
  const log: Logger = new Logger({ name: "db" })
  log.debug("Messages marked as read.")
}

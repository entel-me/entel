import db from "db"
import { Ctx } from "blitz"
import { dbLogger as log } from "app/lib/logger"

export default async function markMessagesAsRead({ chatId }, context: Ctx) {
  context.session.$authorize()
  await db.message.updateMany({
    where: { sentInId: chatId, sentToId: context.session.userId },
    data: { wasRead: true },
  })
  log.debug("Messages marked as read.")
}

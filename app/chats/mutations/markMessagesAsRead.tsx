import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { MarkMessage } from "../validation"

export default resolver.pipe(
  resolver.zod(MarkMessage),
  resolver.authorize(),
  async ({ chatId }, context) => {
    await db.message.updateMany({
      where: { sentInId: chatId, sentToId: context.session.userId },
      data: { wasRead: true },
    })
    log.debug("Messages marked as read.")
  }
)

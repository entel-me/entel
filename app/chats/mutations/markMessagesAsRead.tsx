import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { MarkMessage } from "../validation"
import checkIfPartOfChat from "./checkIfPartOfChat"

export default resolver.pipe(
  resolver.zod(MarkMessage),
  resolver.authorize(),
  async ({ chatId }, context) => {

    await checkIfPartOfChat({ chatId }, context)
    await db.message.updateMany({
      where: { sentInId: chatId, sentToId: context.session.userId },
      data: { wasRead: true },
    })
    log.debug("Messages marked as read.")
  }
)

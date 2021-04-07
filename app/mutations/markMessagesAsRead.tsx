import db from "db"
import { Ctx } from "blitz"

export default async function markMessagesAsRead({ chatId }, context: Ctx) {
  context.session.$authorize()
  await db.message.updateMany({
    where: { sentInId: chatId, sentToId: context.session.userId },
    data: { wasRead: true },
  })
}

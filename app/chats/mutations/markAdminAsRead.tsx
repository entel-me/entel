import db from "db"
import { resolver } from "blitz"
import { dbLogger as log } from "app/lib/logger"
import { MarkMessage } from "../validation"

export default resolver.pipe(
  resolver.zod(MarkMessage),
  resolver.authorize(),
  async ({ chatId }, context) => {
    const admins = await db.adminMessage.findMany({
      where: { sentInId: chatId, wasReadBy: { none: { id: context.session.userId } } },
      select: { id: true },
    })
    const promisses = admins.map(async (mes) => {
      await db.adminMessage.update({
        where: { id: mes.id },
        data: { wasReadBy: { connect: { id: context.session.userId! } } },
      })
    })
    await Promise.all(promisses)
    log.debug("AdminMessages marked as read.")
  }
)

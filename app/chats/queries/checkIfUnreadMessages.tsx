import db from "db"
import { Ctx } from "blitz"

export default async function checkIfUnreadMessage(_ = null, context: Ctx) {
  context.session.$authorize()
  const unreadAdminMessagesCnt = db.adminMessage.count({
    where: {
      sentIn: { participatingUsers: { some: { id: context.session.userId } } },
      wasReadBy: { none: { id: context.session.userId } },
    },
  })

  const unreadNormalMessagesCnt = db.message.count({
    where: { sentToId: context.session.userId, wasRead: false },
  })

  return (
    (await Promise.all([unreadAdminMessagesCnt, unreadNormalMessagesCnt])).reduce(
      (pre, curr) => pre + curr
    ) != 0
  )
}

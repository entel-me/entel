import db from "db"
import { Ctx } from "blitz"

export default async function getChats(_ = null, context: Ctx) {
  context.session.$authorize()
  const lists = await db.chat.findMany({
    where: { participatingUsers: { some: { id: context.session.userId } } },
    select: {
      id: true,
      participatingUsers: { select: { id: true, name: true } },
    },
  })
  return lists
}

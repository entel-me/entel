import db from "db"
import { Ctx } from "blitz"

export default async function createChat({ opponentId }, context: Ctx) {
  context.session.$authorize()
  const lists = await db.chat.create({
    data: {
      participatingUsers: { connect: [{ id: context.session.userId }, { id: opponentId }] },
    },

    select: { id: true },
  })
  return lists
}

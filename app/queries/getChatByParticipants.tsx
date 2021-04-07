import db from "db"
import { Ctx } from "blitz"

export default async function getChatByParticipants({ ownerId }, context: Ctx) {
  context.session.$authorize()
  const chat = await db.chat.findFirst({
    where: {
      AND: [
        { participatingUsers: { some: { id: context.session.userId } } },
        { participatingUsers: { some: { id: ownerId } } },
      ],
    },
    select: {
      id: true,
      participatingUsers: { select: { id: true, name: true } },
    },
  })
  return chat
}

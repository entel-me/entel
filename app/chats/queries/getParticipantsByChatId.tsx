import db from "db"
import { Ctx } from "blitz"

export default async function getParticipantsByChatId({ id }, context: Ctx) {
  context.session.$authorize()
  const list = await db.user.findMany({
    where: { participatesIn: { some: { id: id } } },
    select: {
      name: true,
      id: true,
    },
  })
  return list
}

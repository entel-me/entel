import db from "db"
import { Ctx } from "blitz"

export default async function getUserByChatId({ id }, context: Ctx) {
  context.session.$authorize()
  const list = await db.user.findFirst({
    where: { participatesIn: { some: { id: id } }, NOT: { id: context.session.userId } },
    select: {
      name: true,
      id: true,
    },
  })
  return list!
}

import db from "db"
import { Ctx } from "blitz"

export default async function getActiveLists(_ = null, context: Ctx) {
  context.session.$authorize()
  const lists = await db.shoppinglist.findMany({
    where: { acceptorId: context.session.userId, status: 1 },
    select: {
      id: true,
      comment: true,
      store: true,
      items: { select: { name: true } },
      createdBy: { select: { name: true, position_x: true, position_y: true } },
    },
  })
  return lists
}

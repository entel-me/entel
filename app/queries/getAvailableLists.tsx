import db from "db"
import { Ctx } from "blitz"

export default async function getAvailableLists(_ = null, context: Ctx) {
  context.session.$authorize()
  const lists = await db.shoppinglist.findMany({
    where: { NOT: { creatorId: context.session.userId }, status: 0 },
    select: {
      id: true,
      comment: true,
      store: true,
      items: { select: { name: true } },
      createdBy: { select: { name: true, last_latitude: true, last_longitude: true } },
    },
  })
  return lists
}

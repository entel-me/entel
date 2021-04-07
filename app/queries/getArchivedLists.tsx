import db from "db"
import { Ctx } from "blitz"

export default async function getArchivedLists(_ = null, context: Ctx) {
  context.session.$authorize()
  const lists = await db.shoppinglist.findMany({
    where: { creatorId: context.session.userId, status: 2 },
    select: {
      id: true,
      comment: true,
      store: true,
      items: { select: { name: true } },
      acceptedBy: { select: { name: true, id: true } },
    },
  })
  return lists
}

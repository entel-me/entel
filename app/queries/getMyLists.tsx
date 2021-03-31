import db from "db"
import { Ctx } from "blitz"

export default async function getOwnListByStatus(wantedStatus, context: Ctx) {
  context.session.$authorize()
  const lists = await db.shoppinglist.findMany({
    where: { creatorId: context.session.userId, status: wantedStatus },
    select: { id: true, status: true, comment:true, store: true, items: { select: { name: true}}, acceptedBy: {select: { name: true}}},
  })
  return lists
}
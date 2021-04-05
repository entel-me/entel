import db from "db"
import { Ctx } from "blitz"

export default async function removeAllItems({ id }, context: Ctx) {
  context.session.$authorize()
  await db.item.deleteMany({
    where: { listId: id },
  })
}

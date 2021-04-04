import db from "db"
import { Ctx } from "blitz"

export default async function updatePosition({ new_longitude, new_latitude }, context: Ctx) {
  context.session.$authorize()
  await db.user.update({
    where: { id: context.session.userId },
    data: { last_latitude: new_latitude, last_longitude: new_longitude },
  })
}

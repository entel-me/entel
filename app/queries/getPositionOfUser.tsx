import db from "db"
import { Ctx } from "blitz"

export default async function getPosition(_ = null, context: Ctx) {
  context.session.$authorize()
  const position = await db.user.findUnique({
    where: { id: context.session.userId},
    select: { position_x: true, position_y: true}
  })
  return {user_x: position!.position_x, user_y: position!.position_y}
}
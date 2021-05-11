import db from "db"
import { Ctx, resolver } from "blitz"

export default resolver.pipe(resolver.authorize(), async (_ = null, context: Ctx) => {
  context.session.$authorize()
  const position = await db.user.findUnique({
    where: { id: context.session.userId },
    select: { last_latitude: true, last_longitude: true },
  })
  return { user_latitude: position!.last_latitude, user_longitude: position!.last_longitude }
})

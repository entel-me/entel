import db from "db"
import { AuthorizationError, Ctx, resolver } from "blitz"
import { CheckIfPartOfChat } from "../validation"

export default resolver.pipe(
  resolver.zod(CheckIfPartOfChat),
  resolver.authorize(),
  async ({ chatId }, context: Ctx) => {
    context.session.$authorize()

    const users = await db.user.findMany({
      where: { participatesIn: { some: { id: chatId } } },
    })
    if (!users.find((user) => user.id === context.session.userId))
      throw new AuthorizationError("You are not part of this chat.")

    return users
  }
)

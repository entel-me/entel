import db from "db"
import { Ctx } from "blitz"

export default async function createAdminMessage({ content, chatId }, context: Ctx) {
  context.session.$authorize()
  await db.adminMessage.create({
    data: { content: content, sentIn: { connect: { id: chatId } } },
  })
}

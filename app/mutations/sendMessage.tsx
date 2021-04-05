import db from "db"
import { Ctx } from "blitz"

export default async function sendMessage({ content, chatId, partId }, context: Ctx) {
  context.session.$authorize()
  await db.message.create({
    data: {
      content: content,
      sentIn: { connect: { id: chatId } },
      sentFrom: { connect: { id: context.session.userId } },
      sentTo: { connect: { id: partId } },
    },
  })
}

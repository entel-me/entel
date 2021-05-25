import db from "db"
import { Ctx, resolver } from "blitz"
import { newMessageMailer } from "emails/newMessageMailer"
import { dbLogger as log } from "app/lib/logger"
import { Message } from "../validation"
import checkIfPartOfChat from "./checkIfPartOfChat"

export default resolver.pipe(
  resolver.zod(Message),
  resolver.authorize(),
  async ({ content, chatId }, context: Ctx) => {
    context.session.$authorize()

    const users = await checkIfPartOfChat({ chatId }, context)

    const part = users.find((user) => user.id !== context.session.userId)!
    const me = users.find((user) => user.id === context.session.userId)!

    await db.message.create({
      data: {
        content: content,
        sentIn: { connect: { id: chatId } },
        sentFrom: { connect: { id: context.session.userId } },
        sentTo: { connect: { id: part.id } },
      },
    })
    newMessageMailer({
      chatid: String(chatId),
      from: me.name!,
      messageContent: content,
      to: part.email,
    })
    log.info("A Message was sent.")
  }
)

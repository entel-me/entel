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

    await db.adminMessage.create({
      data: { content: content, sentIn: { connect: { id: chatId } } },
    })

    users.forEach((user) =>
      newMessageMailer({
        chatid: String(chatId),
        from: "admin",
        messageContent: content,
        to: user.email,
      })
    )
    log.info("AdminMessage was sent")
  }
)

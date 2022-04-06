import db from "db"
import { resolver } from "blitz"
import { newMessageMailer } from "emails/newMessageMailer"
import { dbLogger as log } from "app/lib/logger"
import { Message } from "../validation"

export default resolver.pipe(
  resolver.zod(Message),
  resolver.authorize(),
  async ({ content, chatId }, context) => {
    await db.adminMessage.create({
      data: { content: content, sentIn: { connect: { id: chatId } } },
    })
    await sentMail(chatId, content)

    log.info("AdminMessage was sent")
  }
)

async function sentMail(chatId, content) {
  const parti = await db.user.findMany({
    where: { participatesIn: { some: { id: chatId } } },
    select: { email: true },
  })

  const mailers = parti.map(async (part) => {
    await newMessageMailer({
      chatid: chatId,
      from: "admin",
      messageContent: content,
      to: part.email,
    })
  })
  Promise.all(mailers)
}

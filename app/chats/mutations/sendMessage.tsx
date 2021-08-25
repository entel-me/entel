import db from "db"
import { AuthenticationError, resolver } from "blitz"
import { newMessageMailer } from "emails/newMessageMailer"
import { dbLogger as log } from "app/lib/logger"
import { Message } from "../validation"

export default resolver.pipe(
  resolver.zod(Message),
  resolver.authorize(),
  async ({ content, chatId }, context) => {
    const part = await db.user.findFirst({
      where: { participatesIn: { some: { id: chatId } }, NOT: { id: context.session.userId } },
      select: { id: true },
    })
    if (!part) throw new AuthenticationError("You are not allowed to send this user a message.")
    const partId = part.id
    await db.message.create({
      data: {
        content: content,
        sentIn: { connect: { id: chatId } },
        sentFrom: { connect: { id: context.session.userId } },
        sentTo: { connect: { id: partId } },
      },
    })

    sentMail(chatId, partId, content, context)
    log.info("A Message was sent.")
  }
)

async function sentMail(chatId, partId, content, context) {
  const partner = await db.user.findFirst({
    where: { id: partId },
    select: { email: true },
  })
  const me = await db.user.findFirst({
    where: { id: context.session.userId! },
    select: { name: true },
  })
  await newMessageMailer({
    chatid: chatId,
    from: me!.name!,
    messageContent: content,
    to: partner!.email,
  })
}

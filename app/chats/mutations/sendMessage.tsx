import db from "db"
import { Ctx } from "blitz"
import { newMessageMailer } from "mailers/newMessageMailer"
import { dbLogger as log } from "app/lib/logger"

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

  sentMail(chatId, partId, content, context)
  log.info("A Message was sent.")
}

async function sentMail(chatId, partId, content, context: Ctx) {
  const partner = await db.user.findFirst({
    where: { id: partId },
    select: { email: true },
  })
  const me = await db.user.findFirst({
    where: { id: context.session.userId! },
    select: { name: true },
  })
  newMessageMailer({
    chatid: chatId,
    from: me!.name!,
    messageContent: content,
    to: partner!.email,
  }).send()
}

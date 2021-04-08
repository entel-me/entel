import db from "db"
import { Ctx } from "blitz"

interface Message {
  content: string
  sentAt: Date
  sentFrom?: { name: string | null; id: number }
}

export default async function getMessagesByChat({ chatId }, context: Ctx) {
  context.session.$authorize()
  const messages: Promise<Message[]> = db.message.findMany({
    where: { sentInId: chatId },
    select: {
      content: true,
      sentAt: true,
      sentFrom: { select: { name: true, id: true } },
    },
  })

  const adminMessages: Promise<Message[]> = db.adminMessage.findMany({
    where: { sentInId: chatId },
    orderBy: { sentAt: "desc" },
    select: {
      content: true,
      sentAt: true,
    },
  })
  const messageList = await Promise.all([messages, adminMessages])
  return messageList[0]
    .concat(messageList[1])
    .sort((mA, mB) => mA.sentAt.getTime() - mB.sentAt.getTime())
}

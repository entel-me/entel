import db from "db"
import { Ctx } from "blitz"

interface Message {
  content: string
  sentAt: Date
  sentFrom?: { name: string | null; id: number }
}

export default async function getMessagesByChat({ chatId }, context: Ctx) {
  context.session.$authorize()
  const messages: Message[] = await db.message.findMany({
    where: { sentInId: chatId },
    select: {
      content: true,
      sentAt: true,
      sentFrom: { select: { name: true, id: true } },
    },
  })

  const adminMessages: Message[] = await db.adminMessage.findMany({
    where: { sentInId: chatId },
    orderBy: { sentAt: "desc" },
    select: {
      content: true,
      sentAt: true,
    },
  })

  return messages.concat(adminMessages).sort((mA, mB) => mA.sentAt.getTime() - mB.sentAt.getTime())
}

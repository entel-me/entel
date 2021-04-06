import db from "db"
import { Ctx } from "blitz"
import { NumberLiteralType } from "typescript"

interface Message {
  content: string
  sentAt: Date
  sentFrom?: { name: string | null }
}

export default async function getLastMessage({ chatId }, context: Ctx) {
  context.session.$authorize()
  const lastMessage: Message | null = await db.message.findFirst({
    where: { sentInId: chatId },
    orderBy: { sentAt: "desc" },
    select: {
      content: true,
      sentAt: true,
      sentFrom: { select: { name: true } },
    },
  })

  const lastAdminMessage: Message | null = await db.adminMessage.findFirst({
    where: { sentInId: chatId },
    orderBy: { sentAt: "desc" },
    select: {
      content: true,
      sentAt: true,
    },
  })

  if (lastAdminMessage && lastMessage) {
    return lastAdminMessage.sentAt > lastMessage.sentAt ? lastAdminMessage : lastMessage
  } else if (lastAdminMessage) {
    return lastAdminMessage
  } else {
    return lastMessage
  }
}

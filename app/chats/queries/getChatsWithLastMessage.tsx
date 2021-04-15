import db from "db"
import { Ctx } from "blitz"

export interface Message {
  content: string
  sentAt: Date
  sentFrom?: { name: string | null }
}

export default async function getChatsWithLastMessage(_ = null, context: Ctx) {
  context.session.$authorize()
  const chats = await db.chat.findMany({
    where: { participatingUsers: { some: { id: context.session.userId } } },
    select: {
      id: true,
      participatingUsers: { select: { id: true, name: true } },
    },
  })

  const chatsAndMessage = chats.map(async ({ id, participatingUsers }) => {
    const lastMessage: Message | null = await db.message.findFirst({
      where: { sentInId: id },
      orderBy: { sentAt: "desc" },
      select: {
        content: true,
        sentAt: true,
        sentFrom: { select: { name: true } },
      },
    })

    const lastAdminMessage: Message | null = await db.adminMessage.findFirst({
      where: { sentInId: id },
      orderBy: { sentAt: "desc" },
      select: {
        content: true,
        sentAt: true,
      },
    })

    const unreadNormalMessagesCnt = db.message.count({
      where: { sentInId: id, sentToId: context.session.userId!, wasRead: false },
    })
    const unreadAdminMessagesCnt = db.adminMessage.count({
      where: { sentInId: id, wasReadBy: { none: { id: context.session.userId! } } },
    })
    const unreadMessagesCnt = (
      await Promise.all([unreadAdminMessagesCnt, unreadNormalMessagesCnt])
    ).reduce((pre, curr) => pre + curr)

    if (lastAdminMessage && lastMessage) {
      return {
        lastMessage: lastAdminMessage.sentAt > lastMessage.sentAt ? lastAdminMessage : lastMessage,
        unreadMessagesCnt: unreadMessagesCnt,
        id: id,
        participatingUsers: participatingUsers,
      }
    } else if (lastAdminMessage) {
      return {
        lastMessage: lastAdminMessage,
        unreadMessagesCnt: unreadMessagesCnt,
        id: id,
        participatingUsers: participatingUsers,
      }
    }
    return {
      lastMessage: lastMessage,
      unreadMessagesCnt: unreadMessagesCnt,
      id: id,
      participatingUsers: participatingUsers,
    }
  })
  const result = await Promise.all(chatsAndMessage)
  return result
}

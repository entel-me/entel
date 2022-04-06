import { Ctx } from "blitz"
import db from "db"
import createChat from "./createChat"

beforeEach(async () => {
  await db.$reset()
})

describe("markAdminAsRead mutation", () => {
  it("works correctly", async () => {
    // Create test user
    const userA = await db.user.create({
      data: {
        email: "userA@email.com",
      },
    })
    const userB = await db.user.create({
      data: {
        email: "userB@email.com",
      },
    })
    const mockCtx: any = {
      session: {
        $authorize: jest.fn,
        userId: userA.id,
      },
    }
    // Call mutation
    await createChat({ opponentId: userB.id }, mockCtx as Ctx)
    const chats = await db.chat.findMany({
      where: { participatingUsers: { every: { OR: [{ id: userB.id }, { id: userA.id }] } } },
      include: { participatingUsers: true, adminMessages: true, messages: true },
    })

    expect(chats.length).toBe(1)
    const chat = chats[0]
    expect(chat.participatingUsers.length).toBe(2)
    expect(chat.adminMessages.length).toBe(0)
    expect(chat.messages.length).toBe(0)
  })
})

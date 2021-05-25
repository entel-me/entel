import { AuthorizationError, Ctx } from "blitz"
import db from "db"
import markAdminAsRead from "./markAdminAsRead"

beforeEach(async () => {
  await db.$reset()
})

describe("markAdminAsRead mutation", () => {
  it("does throw error if user isn't part of the chat", async () => {
    // create test user
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
    const userC = await db.user.create({
      data: {
        email: "userC@email.com",
      },
    })
    const chat = await db.chat.create({
      data: {
        participatingUsers: {
          connect: [{ id: userA.id }, { id: userB.id }],
        },
        adminMessages: {
          create: {
            content: "entel rocks",
          },
        },
      },
    })
    const mockCtx: any = {
      session: {
        $authorize: jest.fn,
        userId: userC.id,
      },
    }

    // try to mark an AdminMessage as read without being part of the chat
    expect(markAdminAsRead({ chatId: chat.id }, mockCtx as Ctx)).rejects.toThrow(AuthorizationError)

    const messages = await db.adminMessage.findMany({
      where: { sentInId: chat.id },
      include: { wasReadBy: true },
    })

    expect(messages.length).toBe(1)
    const message = messages[0]
    expect(message.wasReadBy.length).toBe(0)
  })

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
    const chat = await db.chat.create({
      data: {
        participatingUsers: {
          connect: [{ id: userA.id }, { id: userB.id }],
        },
        adminMessages: {
          create: {
            content: "entel rocks",
          },
        },
      },
    })
    const mockCtx: any = {
      session: {
        $authorize: jest.fn,
        userId: userA.id,
      },
    }
    // Call mutation
    await markAdminAsRead({ chatId: chat.id }, mockCtx as Ctx)
    const messages = await db.adminMessage.findMany({
      where: { sentInId: chat.id },
      include: { wasReadBy: true },
    })

    expect(messages.length).toBe(1)
    const message = messages[0]
    expect(message.wasReadBy.length).toBe(1)
    expect(message.wasReadBy[0].id).toBe(userA.id)
  })
})

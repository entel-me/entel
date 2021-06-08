import { AuthorizationError, Ctx } from "blitz"
import db from "db"
import markMessagesAsRead from "./markMessagesAsRead"

beforeEach(async () => {
  await db.$reset()
})

describe("markMessageAsRead mutation", () => {
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
        messages: {
          create: {
            content: "entel rocks",
            sentFrom: { connect: { id: userB.id } },
            sentTo: { connect: { id: userA.id } },
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

    // try to mark an Message as read without being part of the chat
    expect(markMessagesAsRead({ chatId: chat.id }, mockCtx as Ctx)).rejects.toThrow(
      AuthorizationError
    )

    const messages = await db.message.findMany({
      where: { sentInId: chat.id },
    })

    expect(messages.length).toBe(1)
    const message = messages[0]
    expect(message.wasRead).toBe(false)
  })

  it("doesn't change anything if the other user opens the message", async () => {
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
        messages: {
          create: {
            content: "entel rocks",
            sentFrom: { connect: { id: userB.id } },
            sentTo: { connect: { id: userA.id } },
          },
        },
      },
    })
    const mockCtx: any = {
      session: {
        $authorize: jest.fn,
        userId: userB.id,
      },
    }
    // Call mutation
    await markMessagesAsRead({ chatId: chat.id }, mockCtx as Ctx)
    const messages = await db.message.findMany({
      where: { sentInId: chat.id },
    })

    expect(messages.length).toBe(1)
    const message = messages[0]
    expect(message.wasRead).toBe(false)
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
        messages: {
          create: {
            content: "entel rocks",
            sentFrom: { connect: { id: userB.id } },
            sentTo: { connect: { id: userA.id } },
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
    await markMessagesAsRead({ chatId: chat.id }, mockCtx as Ctx)
    const messages = await db.message.findMany({
      where: { sentInId: chat.id },
    })

    expect(messages.length).toBe(1)
    const message = messages[0]
    expect(message.wasRead).toBe(true)
  })
})

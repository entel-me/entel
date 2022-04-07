import { AuthorizationError, Ctx } from "blitz"
import Email from "email-templates"
import db from "db"
import sendMessage from "./sendMessage"

beforeEach(async () => {
  await db.$reset()
})

describe("sendMessage mutation", () => {
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
      },
    })
    const mockCtx: any = {
      session: {
        $authorize: jest.fn,
        userId: userC.id,
      },
    }

    // try to send a Message without being part of the chat
    const content = "entel rocks"
    expect(sendMessage({ content: content, chatId: chat.id }, mockCtx as Ctx)).rejects.toThrow(
      AuthorizationError
    )
  })

  it("works correctly", async () => {
    const sendMock = (Email.prototype.send = jest.fn())
    // Create test user
    const users = await db.user.findMany({})
    console.log(users)
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
      },
    })
    const mockCtx: any = {
      session: {
        $authorize: jest.fn,
        userId: userA.id,
      },
    }
    // Call mutation
    const content = "entel rocks"
    await sendMessage({ content: content, chatId: chat.id }, mockCtx as Ctx)

    const messages = await db.message.findMany({
      where: { sentInId: chat.id },
    })
    expect(messages.length).toBe(1)
    const message = messages[0]
    expect(message.content).toBe(content)
    expect(message.sentInId).toBe(chat.id)
    expect(message.sentFromId).toBe(userA.id)
    expect(message.sentToId).toBe(userB.id)
    expect(message.wasRead).toBe(false)
    expect(sendMock).toBeCalledTimes(1)
  })
})

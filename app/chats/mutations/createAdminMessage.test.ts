import { AuthorizationError, Ctx } from "blitz"
import Email from "email-templates"
import db from "db"
import createAdminMessage from "./createAdminMessage"

beforeEach(async () => {
  await db.$reset()
})

describe("createAdminMessage mutation", () => {
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

    // try to send an AdminMessage without being part of the chat
    const content = "entel rocks"
    expect(
      createAdminMessage({ content: content, chatId: chat.id }, mockCtx as Ctx)
    ).rejects.toThrow(AuthorizationError)
  })

  it("works correctly", async () => {
    const sendMock = (Email.prototype.send = jest.fn())
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
    await createAdminMessage({ content: content, chatId: chat.id }, mockCtx as Ctx)
    const messages = await db.adminMessage.findMany({
      where: { sentInId: chat.id },
      include: { wasReadBy: true },
    })

    expect(messages.length).toBe(1)
    const message = messages[0]
    expect(message.content).toBe(content)
    expect(message.sentInId).toBe(chat.id)

    expect(message.wasReadBy.length).toBe(0)
    expect(sendMock).toBeCalledTimes(2)
  })
})

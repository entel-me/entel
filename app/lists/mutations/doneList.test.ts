import { Ctx } from "blitz"
import db from "db"
import doneList from "./doneList"

beforeEach(async () => {
  await db.$reset()
})

describe("doneList mutation", () => {
  it("works correctly", async () => {
    // Create test user
    const userA = await db.user.create({
      data: {
        email: "userA@example.com",
      },
      select: { id: true },
    })

    const userB = await db.user.create({
      data: {
        email: "userB@example.com",
      },
      select: { id: true },
    })

    const mockCtx: any = {
      session: {
        $create: jest.fn,
        $authorize: jest.fn,
        userId: userB.id,
      },
    }

    // Create list
    const store = "Entel shop"
    const comment = "just entel things please"
    const list = await db.shoppinglist.create({
      data: {
        createdBy: { connect: { id: userA.id } },
        store: store,
        comment: comment,
        status: 0,
        acceptedBy:{
            connect: {
                id: userB.id
            }
        }
      },
      select: { id: true },
    })

    // Invoke the mutation
    await doneList({ id: list.id }, mockCtx as Ctx)

    const donedList = await db.shoppinglist.findFirst({
      where: { id: list.id },
    })
    expect(donedList?.acceptorId).toBeNull()
    expect(donedList?.status).toBe(2)
  })
})

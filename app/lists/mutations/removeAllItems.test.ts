import { AuthorizationError, Ctx } from "blitz"
import db from "db"
import removeAllItems from "./removeAllItems"

beforeEach(async () => {
  await db.$reset()
})

describe("removeAllItems mutation", () => {
  it("throws error if unauthorized", async () => {
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
      },
      select: { id: true },
    })

    // Invoke the mutation illegally
    await expect(async () => await removeAllItems({ id: list.id }, mockCtx as Ctx)).rejects.toThrow(
      AuthorizationError
    )
  })

  it("works correctly", async () => {
    // Create test user
    const user = await db.user.create({
      data: {
        email: "user@example.com",
      },
      select: { id: true },
    })

    const mockCtx: any = {
      session: {
        $create: jest.fn,
        $authorize: jest.fn,
        userId: user.id,
      },
    }

    // Create list
    const store = "Entel shop"
    const comment = "just entel things please"
    const list = await db.shoppinglist.create({
      data: {
        createdBy: { connect: { id: user.id } },
        store: store,
        comment: comment,
        status: 0,
      },
      select: { id: true },
    })
    const item1 = await db.item.create({
        data: {
            name: "item1",
            listedIn: {
                connect: {
                    id: list.id
                }
            }
        }
    })
    const item2 = await db.item.create({
        data: {
            name: "item2",
            listedIn: {
                connect: {
                    id: list.id
                }
            }
        }
    })
    

    // Invoke the mutation
    await removeAllItems({ id: list.id }, mockCtx as Ctx)

    const clearedList = await db.shoppinglist.findFirst({
      where: { id: list.id },
      include: {items: true}
    })
    expect(clearedList?.items.length).toBe(0)

    const newItem1 = await db.item.findFirst({
        where: {id: item1.id}
    })
    expect(newItem1).toBeNull()

    const newItem2 = await db.item.findFirst({
        where: {id: item2.id}
    })
    expect(newItem2).toBeNull()

  })
})

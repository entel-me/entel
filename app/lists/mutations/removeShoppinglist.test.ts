import { AuthorizationError, Ctx } from "blitz"
import db from "db"
import removeShoppinglist from "./removeShoppinglist"

beforeEach(async () => {
  await db.$reset()
})

describe("removeShoppingList mutation", () => {
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
    await expect(
      async () => await removeShoppinglist({ id: list.id }, mockCtx as Ctx)
    ).rejects.toThrow(AuthorizationError)
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
        items: {
          create: [
            {
              name: "item1",
            },
            {
              name: "item2",
            },
          ],
        },
      },
      select: { id: true },
    })

    // Invoke the mutation
    await removeShoppinglist({ id: list.id }, mockCtx as Ctx)

    const removedList = await db.shoppinglist.findFirst({
      where: { id: list.id },
    })
    expect(removedList).toBeNull()

    const removedListItems = await db.item.findMany({
      where: { listId: list.id },
    })
    expect(removedListItems.length).toBe(0)
  })
})

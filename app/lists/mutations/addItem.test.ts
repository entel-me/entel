import { Ctx } from "blitz"
import db from "db"
import addItem from "./addItem"

beforeEach(async () => {
  await db.$reset()
})

describe("addItem mutation", () => {
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

    // Invoke the mutation
    const itemsName = ["Item1", "Item2", "Item3"]
    await addItem({ listId: list.id, itemName: itemsName[0] }, mockCtx as Ctx)
    await addItem({ listId: list.id, itemName: itemsName[1] }, mockCtx as Ctx)
    await addItem({ listId: list.id, itemName: itemsName[2] }, mockCtx as Ctx)


    const items = await db.item.findMany({
        where: {listId: list.id},
    })
    expect(items.length).toBe(3)
    expect(items.map(item => item.name).sort()).toEqual(itemsName.sort())
  })
})

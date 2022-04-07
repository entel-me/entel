import { Ctx } from "blitz"
import createList from "./createList"
import db from "db"

beforeEach(async () => {
  await db.$reset()
})

describe("createList mutation", () => {
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

    const store = "Entel shop"
    const comment = "just entel things please"

    // Invoke the mutation
    await createList(
      { store: store, specialWish: comment },
      mockCtx as Ctx
    )

    const lists = await db.shoppinglist.findMany({where: {creatorId: user.id}})
    expect(lists.length).toBe(1)
    const list = lists[0]

    expect(list.status).toBe(0)
    expect(list.comment).toBe(comment)
    expect(list.store).toBe(store)
    
  })
})

import { AuthorizationError, Ctx } from "blitz"
import db from "db"
import updateStoreComment from "./updateStoreComment"

beforeEach(async () => {
  await db.$reset()
})

describe("updateStoreComment mutation", () => {
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
    const comment = "just entel things"
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
    const newStore = "Another entel shop"
    const newComment = "just entel things please"
    await expect(
      updateStoreComment({ id: list.id, comment: newComment, store: newStore }, mockCtx as Ctx)
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
        status: 2,
      },
      select: { id: true },
    })

    // Invoke the mutation
    const newStore = "Another entel shop"
    const newComment = "just entel things please"
    await updateStoreComment({ id: list.id, comment: newComment, store: newStore }, mockCtx as Ctx)

    const updatedList = await db.shoppinglist.findFirst({
      where: { id: list.id },
    })
    expect(updatedList?.comment).toBe(newComment)
    expect(updatedList?.store).toBe(newStore)
  })
})

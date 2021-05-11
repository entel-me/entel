import { hash256, Ctx } from "blitz"
import db from "db"
import signup from "app/auth/queries/signup"

beforeEach(async () => {
  await db.$reset()
})

describe("signup queue", () => {
  it("does throw error if token doesn't exist", async () => {
    // use not existing token
    await expect(signup({ token: "plain-token" }, {} as Ctx)).resolves.toBe(null)
  })

  it("does throw error if token expired", async () => {
    // create expired test token
    const generatedToken = "plain-token"
    const date = new Date()
    date.setHours(date.getHours() - 5)
    const goodPassword = "good-password"
    await db.tokenMailVerification.create({
      data: {
        type: "LOGIN_VERIFY",
        expiresAt: date,
        hashedToken: hash256(generatedToken),
        sentTo: "user@email.com",
        name: "user",
        hashedPassword: hash256(goodPassword),
      },
    })
    // use expired token
    expect(signup({ token: generatedToken }, {} as Ctx)).resolves.toBe(null)
  })

  it("works correctly", async () => {
    // create test token
    const generatedToken = "a-token"
    const date = new Date()
    date.setHours(date.getHours() + 4)
    const goodPassword = "good-password"
    await db.tokenMailVerification.create({
      data: {
        type: "LOGIN_VERIFY",
        expiresAt: date,
        hashedToken: hash256(generatedToken),
        sentTo: "user@email.com",
        name: "user",
        hashedPassword: hash256(goodPassword),
      },
    })
    // Invoke the queue
    const user = await signup({ token: generatedToken }, {} as Ctx)

    // delete's existing tokens
    const tokens = await db.tokenMailVerification.findMany({
      where: { type: "LOGIN_VERIFY", hashedToken: hash256(generatedToken) },
    })
    expect(tokens.length).toBe(0)

    // Verify results
    expect(user!.name).toBe("user")
    expect(user!.email).toBe("user@email.com")
    expect(user!.role).toBe("USER")
  })
})

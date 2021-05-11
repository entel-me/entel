import { hash256, Ctx, SecurePassword } from "blitz"
import Email from "email-templates"
import db from "db"
import verifyMail from "./verifyMail"

beforeEach(async () => {
  await db.$reset()
})

const generatedToken = "plain-token"
jest.mock("blitz", () => ({
  ...jest.requireActual<object>("blitz")!,
  generateToken: () => generatedToken,
}))

describe("verifyMail mutation", () => {
  it("does throw error if user already exists", async () => {
    // create test user
    await db.user.create({
      data: {
        email: "no-user@email.com",
      },
    })
    // try to create account with mail of existing user
    await expect(
      verifyMail(
        { email: "no-user@email.com", name: "no-user", password: "new-password" },
        {} as Ctx
      )
    ).rejects.toThrow()
  })

  it("works correctly", async () => {
    const sendMock = (Email.prototype.send = jest.fn())
    // Create test token
    const oldDate = new Date()
    oldDate.setHours(oldDate.getHours() + 2)
    const oldPassword = "old-password"
    await db.tokenMailVerification.create({
      data: {
        type: "LOGIN_VERIFY",
        expiresAt: oldDate,
        hashedToken: hash256("bad-token"),
        sentTo: "bad-user@email.com",
        name: "bad-user",
        hashedPassword: oldPassword,
      },
    })
    const newPassword = "new-password"
    // Invoke the mutation
    await verifyMail({ email: "user@email.com", name: "user", password: newPassword }, {} as Ctx)

    // delete's existing tokens
    const tokens = await db.tokenMailVerification.findMany({ where: { sentTo: "user@email.com" } })
    expect(tokens.length).toBe(1)
    const token = tokens[0]

    // Verify results
    expect(token.type).toBe("LOGIN_VERIFY")
    expect(token.expiresAt > new Date()).toBe(true)
    expect(token.hashedToken).toBe(hash256(generatedToken))
    expect(token.sentTo).toBe("user@email.com")
    expect(token.name).toBe("user")
    expect(await SecurePassword.verify(token.hashedPassword, newPassword)).toBe(
      SecurePassword.VALID
    )
    expect(sendMock).toBeCalled()
  })
})

import resetPassword from "./resetPassword"
import db from "db"
import { hash256, SecurePassword } from "blitz"
import * as login from "./login"

beforeEach(async () => {
  await db.$reset()
})

const mockCtx: any = {
  session: {
    $create: jest.fn(),
  },
}

describe("resetPassword mutation", () => {
  it("works correctly", async () => {
    const spy = jest.spyOn(login, "default")

    // Create test user
    const goodToken = "randomPasswordResetToken"
    const expiredToken = "expiredRandomPasswordResetToken"
    const future = new Date()
    future.setHours(future.getHours() + 4)
    const past = new Date()
    past.setHours(past.getHours() - 4)

    const user = await db.user.create({
      data: {
        email: "user@example.com",
        tokens: {
          // Create old token to ensure it's deleted
          create: [
            {
              type: "RESET_PASSWORD",
              hashedToken: hash256(expiredToken),
              expiresAt: past,
              sentTo: "user@example.com",
            },
            {
              type: "RESET_PASSWORD",
              hashedToken: hash256(goodToken),
              expiresAt: future,
              sentTo: "user@example.com",
            },
          ],
        },
      },
      include: { tokens: true },
    })

    const newPassword = "newPassword"

    // Non-existent token
    await expect(
      resetPassword({ token: "no-token", password: "", passwordConfirmation: "" }, mockCtx)
    ).rejects.toThrowError()

    // Expired token
    await expect(
      resetPassword(
        { token: expiredToken, password: newPassword, passwordConfirmation: newPassword },
        mockCtx
      )
    ).rejects.toThrowError()

    // Good token
    await resetPassword(
      { token: goodToken, password: newPassword, passwordConfirmation: newPassword },
      mockCtx
    )

    // Delete's the token
    const numberOfTokens = await db.token.count({ where: { userId: user.id } })
    expect(numberOfTokens).toBe(0)

    // Created session
    expect(mockCtx.session.$create).toBeCalled()

    // Verify login
    const loggedInUser = await spy.mock.results[0].value
    expect(loggedInUser.id).toBe(user.id)

    // Updates user's password
    const updatedUser = await db.user.findFirst({ where: { id: user.id } })
    expect(await SecurePassword.verify(updatedUser!.hashedPassword, newPassword)).toBe(
      SecurePassword.VALID
    )
  })
})

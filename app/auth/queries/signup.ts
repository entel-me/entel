import { hash256, Ctx, resolver } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"

export default resolver.pipe(resolver.zod(Signup), async ({ token }, context: Ctx) => {
  const hashedToken = hash256(token)
  const userData = await db.tokenMailVerification.findFirst({
    where: { hashedToken: hashedToken, type: "LOGIN_VERIFY" },
    select: { name: true, hashedPassword: true, sentTo: true, expiresAt: true },
  })
  if (!userData) return null

  await db.tokenMailVerification.deleteMany({
    where: { type: "LOGIN_VERIFY", hashedToken: hashedToken },
  })

  if (userData.expiresAt < new Date()) return null

  const user = await db.user.create({
    data: {
      name: userData.name,
      email: userData?.sentTo.toLowerCase().trim(),
      hashedPassword: userData?.hashedPassword,
      role: "USER",
    },
  })

  return user
})

import { AuthorizationError, hash256, Ctx, resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default async function signup({ token }, context: Ctx) {
  const hashedToken = hash256(token)
  const userData = await db.tokenMailVerification.findFirst({
    where: { hashedToken: hashedToken, type: "LOGIN_VERIFY" },
    select: { name: true, hashedPassword: true, sentTo: true },
  })
  if (!userData) return null

  const user = await db.user.create({
    data: {
      name: userData.name,
      email: userData?.sentTo.toLowerCase().trim(),
      hashedPassword: userData?.hashedPassword,
      role: "USER",
    },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}

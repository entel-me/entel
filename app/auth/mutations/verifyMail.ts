import { resolver, generateToken, hash256, SecurePassword, AuthenticationError } from "blitz"
import db from "db"
import { forgotPasswordMailer } from "emails/forgotPasswordMailer"
import { verifyMailMailer } from "emails/verifyMailMailer"
import { VerifyMail } from "../validations"

const VERIFY_MAIL_TOKEN_EXPIRATION_IN_HOURS = 4

export default resolver.pipe(resolver.zod(VerifyMail), async ({ email, name, password }) => {
  const user = await db.user.findFirst({ where: { email: email.toLowerCase() } })
  if (user) throw new AuthenticationError()

  // 4. Delete any existing password reset tokens
  await db.tokenMailVerification.deleteMany({ where: { type: "LOGIN_VERIFY", sentTo: email } })
  const hashedPassword = await SecurePassword.hash(password.trim())

  const token = generateToken()
  const hashedToken = hash256(token)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + VERIFY_MAIL_TOKEN_EXPIRATION_IN_HOURS)
  await db.tokenMailVerification.create({
    data: {
      type: "LOGIN_VERIFY",
      expiresAt,
      hashedToken,
      sentTo: email,
      name,
      hashedPassword,
    },
  })

  await verifyMailMailer({ to: email, token })
})

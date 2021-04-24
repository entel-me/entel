import smtp from "integrations/mail"
import nodemailer from "nodemailer"
import { appLogger as log } from "app/lib/logger"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`

  const msg = {
    from: process.env.MAIL_MAIL,
    to: to,
    subject: "Reset the password of your entel account",
    html: `
      <h1>Reset Your Password</h1>
      <a href="${resetUrl}">
        Click here
      </a>
      <p>or use the following link to set a new password:</p>
      <p>${resetUrl}</p>
    `,
  }

  return {
    async send() {
      if (process.env.APP_ENV === "production") {
        await smtp.sendMail(msg)
        log.info("An email was sent by fotgotPasswordMailer.")
      } else {
        // Preview email in the browser
        const info = await smtp.sendMail(msg)
        log.info(
          `An preview mail was created by fotgotPasswordMailer at ${nodemailer.getTestMessageUrl(
            info
          )}.`
        )
      }
    },
  }
}

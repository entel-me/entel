import getMailer from "integrations/mail"
import nodemailer from "nodemailer"
import { appLogger as log } from "app/lib/logger"

type ResetPasswordMailer = {
  to: string
  token: string
}

export async function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`
  const info = await getMailer().send({
    template: "forgotPassword",
    message: {
      to: to,
      from: process.env.MAIL_MAIL,
      attachments: [
        {
          filename: "entel.png",
          path: "public/logo_1.png",
          cid: "entel_logo",
        },
      ],
    },
    locals: {
      resetUrl: resetUrl,
    },
  })

  log.info("An email was sent by fotgotPasswordMailer.")
  if (process.env.APP_ENV === "development") {
    log.info(`You can see the mail at ${nodemailer.getTestMessageUrl(info)}.`)
  }
}

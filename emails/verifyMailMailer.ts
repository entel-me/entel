import getMailer from "integrations/mail"
import nodemailer from "nodemailer"
import { appLogger as log } from "app/lib/logger"
type verifyMailMailerProps = {
  to: string
  token: string
}

export async function verifyMailMailer({ to, token }: verifyMailMailerProps) {
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const verifyUrl = `${origin}/verify-mail?token=${token}`

  const info = await getMailer().send({
    template: "verifyMail",
    message: {
      to: to,
      attachments: [
        {
          filename: "entel.png",
          path: "public/logo_1.png",
          cid: "entel_logo",
        },
      ],
    },
    locals: {
      verifyUrl: verifyUrl,
    },
  })

  log.info("An email was sent by verifyMailMailer.")
  if (process.env.APP_ENV === "development") {
    log.info(`You can see the mail at ${nodemailer.getTestMessageUrl(info)}.`)
  }
}

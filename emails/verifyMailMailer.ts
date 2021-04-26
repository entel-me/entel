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
  if (process.env.APP_ENV !== "production") {
    log.info(`You can see the mail at ${nodemailer.getTestMessageUrl(info)}.`)
  }
  /*

  const msg = {
    from: process.env.MAIL_MAIL,
    to: to,
    subject: "entel: Verify your E-Mail",
    html: `
      <h1>Verify your E-Mail</h1>
      <a href="${verifyUrl}">
        Click here
      </a>
      <p>or use the following link to verify your E-Mail:</p>
      <p>${verifyUrl}</p>
    `,
  }

  return {
    async send() {
      if (process.env.APP_ENV === "production") {
        await smtp.sendMail(msg)
        log.info("An email was sent by verifyMailMailer.")
      } else {
        // Preview email in the browser
        const info = await smtp.sendMail(msg)
        log.info(
          `An preview mail was created by verifyMailMailer at ${nodemailer.getTestMessageUrl(
            info
          )}.`
        )
      }
    },
  }
  */
}

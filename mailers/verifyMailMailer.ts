/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import previewEmail from "preview-email"
import nodemailer from "nodemailer"
import { appLogger as log } from "app/lib/logger"

type verifyMailMailerProps = {
  to: string
  token: string
}

export function verifyMailMailer({ to, token }: verifyMailMailerProps) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const verifyUrl = `${origin}/verify-mail?token=${token}`

  var smtp = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  })

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
      if (process.env.NODE_ENV === "production") {
        await smtp.sendMail(msg)
        log.info("An email was sent by verifyMailMailer.")
      } else {
        // Preview email in the browser
        await previewEmail(msg)
        log.info("An preview mail was created by verifyMailMailer.")
      }
    },
  }
}

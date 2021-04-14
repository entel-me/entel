/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import previewEmail from "preview-email"
import nodemailer from "nodemailer"
import { Logger } from "tslog"
type NewMessageMailerProps = {
  to: string
  from: string
  chatid: string
  messageContent: string
}

export function newMessageMailer({ to, chatid, from, messageContent }: NewMessageMailerProps) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const chatUrl = `${origin}/chats/${chatid}`

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
    subject: "You have a new message on entel",
    html: `
      <h1>You have a message on entel</h1>
      <p>"${messageContent}"<p>
      <p>from ${from}<p>
      <p> To answer ${from} directly, <a href=${chatUrl}>click here<a></p>
      <p>or use the following link:</p>
      <p>${chatUrl}</p>
    `,
  }
  const log: Logger = new Logger({ name: "mailer" })

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        await smtp.sendMail(msg)
        log.info("An email was sent.")
      } else {
        // Preview email in the browser
        await previewEmail(msg)
        log.info("An preview mail was created.")
      }
    },
  }
}

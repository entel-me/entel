/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import previewEmail from "preview-email"
import nodemailer from "nodemailer"
type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`

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
      if (process.env.NODE_ENV === "production") {
        await smtp.sendMail(msg)
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}

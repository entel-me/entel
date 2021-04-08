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

  /*
  var smtp = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    auth: {
        user: 'info@antonykamp.de',
        pass: ''
    }
  });
  */
  const msg = {
    from: "info@antonykamp.de",
    to: to,
    subject: "Your Password Reset Instructions",
    html: `
      <h1>Reset Your Password</h1>
      <h3>NOTE: You must set up a production email integration in mailers/forgotPasswordMailer.ts</h3>

      <a href="${resetUrl}">
        Click here to set a new password
      </a>
    `,
  }

  return {
    async send() {
      previewEmail(msg).then(console.log).catch(console.error)
      // await smtp.sendMail(msg)
    },
  }
}

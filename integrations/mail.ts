import nodemailer from "nodemailer"
import Email from "email-templates"

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
})

export default function getMailer() {
  return new Email({
    message: {
      from: process.env.MAIL_MAIL,
    },
    send: true,
    transport: transporter,
    preview: false,
    views: {
      options: {
        extension: "hbs",
      },
    },
  })
}

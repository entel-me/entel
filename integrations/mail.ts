import nodemailer from "nodemailer"

export default nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
})

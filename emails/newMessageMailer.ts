import getMailer from "integrations/mail"
import nodemailer from "nodemailer"
import { appLogger as log } from "app/lib/logger"

type NewMessageMailerProps = {
  to: string
  from: string
  chatid: string
  messageContent: string
}

export async function newMessageMailer({
  to,
  chatid,
  from,
  messageContent,
}: NewMessageMailerProps) {
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const chatUrl = `${origin}/chats/${chatid}`

  const info = await getMailer().send({
    template: "newMessage",
    message: {
      to: to,
    },
    locals: {
      messageContent: messageContent,
      from: from,
      chatUrl: chatUrl,
    },
  })

  log.info("An email was sent by newMessageMailer.")
  if (process.env.APP_ENV !== "production") {
    log.info(`You can see the mail at ${nodemailer.getTestMessageUrl(info)}.`)
  }
  /*
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

  return {
    async send() {
      if (process.env.APP_ENV === "production") {
        await smtp.sendMail(msg)
        log.info("An email was sent by newMessageMailer.")
      } else {
        // Preview email in the browser
        const info = await smtp.sendMail(msg)
        log.info(
          `An preview mail was created by newMessageMailer at ${nodemailer.getTestMessageUrl(
            info
          )}.`
        )
      }
    },
  }
  */
}

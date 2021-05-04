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
      attachments: [
        {
          filename: "entel.png",
          path: "public/logo_1.png",
          cid: "entel_logo",
        },
      ],
    },
    locals: {
      messageContent: messageContent,
      from: from,
      chatUrl: chatUrl,
    },
  })

  log.info("An email was sent by newMessageMailer.")
  if (process.env.APP_ENV === "development") {
    log.info(`You can see the mail at ${nodemailer.getTestMessageUrl(info)}.`)
  }
}

import type * as React from "react"
import { render } from "@react-email/components"
import { aws, sesClient } from "./aws-ses.server"

interface EmailProps {
  /**
   * Either To or BCC required
   */
  to?: string[]
  bcc?: string[]
  subject: string
  email: React.ReactNode
}

export async function sendEmail({ bcc, to, subject, email }: EmailProps) {
  try {
    const [html, text] = await Promise.all([
      render(email),
      render(email, {
        plainText: true,
      }),
    ])

    const emailCommand = new aws.SendEmailCommand({
      Destination: {
        ToAddresses: to,
        BccAddresses: bcc,
      },
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: html,
          },
          Text: {
            Charset: "UTF-8",
            Data: text,
          },
        },
      },
      Source: "Coders for Causes <noreply@mail.codersforcauses.org>",
      ReplyToAddresses: ["Coders for Causes <hello@codersforcauses.org>"],
    })

    const mail = await sesClient.send(emailCommand)
    return mail
  } catch (err) {
    console.log(JSON.stringify(err, null, 2))
  }
}

import { NextResponse } from "next/server"
import { Resend } from "resend"

import { MembershipRenewalReminderEmail } from "../../../components/email-template"

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { data } = await resend.emails.send({
      from: "Coders for Causes <send@codersforcauses.org>",
      to: ["kxxxyun@gmail.com"],
      subject: "Reminder of your membership renewal",
      react: MembershipRenewalReminderEmail({ Firstname: "John" }),
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

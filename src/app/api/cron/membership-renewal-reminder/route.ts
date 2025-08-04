import * as Sentry from "@sentry/nextjs"
import { eq } from "drizzle-orm"
import type { NextRequest } from "next/server"
import { Resend } from "resend"

import { MembershipRenewalReminderEmail } from "~/components/email-template"

import { env } from "~/env"
import { db } from "~/server/db"
import { User } from "~/server/db/schema"

const resend = new Resend(process.env.RESEND_API_KEY)

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  let pendings: (typeof User.$inferSelect)[] = []
  let count = 0

  await Sentry.withMonitor("reminder-memberships-renewal", async () => {
    try {
      pendings = await db.select().from(User).where(eq(User.reminder_pending, true))
      console.log(pendings.length)
    } catch (err) {
      Sentry.captureException(err)
      console.error(" Failed to query pending members:", err)

      throw err
    }
  })

  if (!pendings.length) {
    return new Response("No pending members", { status: 200 })
  }
  if (pendings.length >= 100) {
    for (const member of pendings.slice(0, 99)) {
      try {
        await resend.emails.send({
          from: "Coders for Causes <send@codersforcauses.org>",
          to: member.email,
          subject: "Reminder of your membership renewal",
          react: MembershipRenewalReminderEmail({}),
        })

        await db.update(User).set({ reminder_pending: false }).where(eq(User.id, member.id))
      } catch (err) {
        console.error(`Failed to send email to ${member.email}`, err)
        Sentry.captureException(err, { extra: { memberId: member.id } })
      }
    }
    for (const member of pendings.slice(99)) {
      await db.update(User).set({ reminder_pending: false }).where(eq(User.id, member.id))
    }
    count = 99
  } else {
    for (const member of pendings) {
      try {
        await resend.emails.send({
          from: "Coders for Causes <noreply@codersforcauses.org>",
          to: member.email,
          subject: "Reminder of your membership renewal",
          react: MembershipRenewalReminderEmail({ Firstname: member.preferred_name }),
        })

        await db.update(User).set({ reminder_pending: false }).where(eq(User.id, member.id))
      } catch (err) {
        console.error(`Failed to send email to ${member.email}`, err)
        Sentry.captureException(err, { extra: { memberId: member.id } })
      }
    }
    count = pendings.length
  }

  return Response.json({
    success: true,
    message: `${count} emails have been sent.`,
    count: { count },
  })
}

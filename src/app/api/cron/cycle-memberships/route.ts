import * as Sentry from "@sentry/nextjs"
import { format } from "date-fns"
import { lte } from "drizzle-orm"
import type { NextRequest } from "next/server"
import { Resend } from "resend"

import { MembershipRenewalReminderEmail } from "~/components/email-template"

import { env } from "~/env"
import { db } from "~/server/db"
import { User } from "~/server/db/schema"

export const dynamic = "force-dynamic"
const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  let dbRes: (typeof User.$inferSelect)[] = []
  const today = new Date()

  await Sentry.withMonitor("cycle-memberships", async () => {
    dbRes = await db
      .update(User)
      .set({ role: null, membership_expiry: null })
      .where(lte(User.membership_expiry, today))
      .returning()
  })

  for (const user of dbRes) {
    try {
      const formattedToday = format(today, "dd MMM yyyy")
      await resend.emails.send({
        from: "Coders for Causes <noreply@codersforcauses.org>",
        to: user.email,
        subject: "Reminder of your membership renewal",
        react: MembershipRenewalReminderEmail({
          firstname: user.preferred_name,
          membershipEndDate: formattedToday,
        }),
      })
    } catch (err) {
      console.error(`Failed to send email to ${user.email}`, err)
      Sentry.captureException(err, { extra: { memberId: user.id } })
    }
  }

  return Response.json({
    success: true,
    message: `${dbRes.length} Memberships for ${today.toISOString().slice(0, 10)} have been cycled.`,
    count: dbRes.length,
  })
}

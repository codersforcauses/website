import type { NextRequest } from "next/server"
import { env } from "~/env"
import { db } from "~/server/db"
import { User } from "~/server/db/schema"
import { eq } from "drizzle-orm"
import * as Sentry from "@sentry/nextjs"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  let dbRes: (typeof User.$inferSelect)[] = []

  await Sentry.withMonitor("cycle-memberships", async () => {
    // TODO backup with xata cli and put into aws bucket
    dbRes = await db.update(User).set({ role: null }).where(eq(User.role, "member")).returning()
    console.log(dbRes.length)
  })

  if (!dbRes.length) {
    return new Response("Internal Server Error", {
      status: 500,
    })
  }

  return Response.json({
    success: true,
    message: `Memberships for ${new Date().getFullYear()} have been cycled.`,
    count: dbRes.length,
  })
}

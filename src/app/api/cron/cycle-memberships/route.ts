import type { NextRequest } from "next/server"
import { env } from "~/env"
import { db } from "~/server/db"
import { users } from "~/server/db/schema"
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

  await Sentry.withMonitor("cycle-memberships", async () => {
    // TODO backup with xata cli and put into aws bucket
    const dbRes = await db.select().from(users).where(eq(users.role, "member"))
    // const dbRes = await db.update(users).set({ role: null }).where(eq(users.role, "member")).returning()
    return Response.json({
      success: true,
      message: `Memberships for ${new Date().getFullYear()} have been cycled.`,
      count: dbRes.length,
    })
  })

  return new Response("Internal Server Error", {
    status: 500,
  })
}

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

  const checkInId = Sentry.captureCheckIn({
    monitorSlug: "cycle-memberships",
    status: "in_progress",
  })

  // TODO backup with xata cli and put into aws bucket

  try {
    const dbRes = await db.select().from(users).where(eq(users.role, "member"))
    // const dbRes = await db.update(users).set({ role: null }).where(eq(users.role, "member")).returning()

    Sentry.captureCheckIn({
      checkInId,
      monitorSlug: "cycle-memberships",
      status: "ok",
    })

    return Response.json({
      success: true,
      message: `Memberships for ${new Date().getFullYear()} have been cycled.`,
      count: dbRes.length,
    })
  } catch (e) {
    Sentry.captureCheckIn({
      checkInId,
      monitorSlug: "cycle-memberships",
      status: "error",
    })
    console.error(e)
    return new Response("Internal Server Error", {
      status: 500,
    })
  }
}

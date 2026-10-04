import * as Sentry from "@sentry/nextjs"
import { ilike, sql } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { env } from "~/env"
import { db } from "~/server/db"
import { users } from "~/server/db/schema"

export const dynamic = "force-dynamic"

// TODO: test this
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  let dbRes: Record<"id" | "preferredName" | "role", string | null>[] = []
  // TODO: Check if this works since the role change in schema
  await Sentry.withMonitor("cycle-memberships", async () => {
    // TODO backup with xata cli and put into aws bucket
    await db.transaction(async (tx) => {
      const prev = await tx
        .select({ id: users.id, preferredName: users.preferredName, role: users.role })
        .from(users)
        .where(ilike(users.role, "%member%"))
      dbRes = await tx
        .update(users)
        .set({
          role: sql`CASE
            WHEN ${users.role} = 'member' THEN NULL
            WHEN ${users.role} ILIKE 'member,%' THEN REPLACE(${users.role}, 'member,', '')
            WHEN ${users.role} ILIKE '%,member' THEN REPLACE(${users.role}, ',member', '')
            WHEN ${users.role} ILIKE '%,member,%' THEN REPLACE(${users.role}, ',member', '')
            ELSE ${users.role}
          END`,
          // role: sql`REPLACE(${users.role}, 'member', 'mem-${old-yr}')`, // need to check if to use current yr or old yr depending on cronjob run
        })
        .where(ilike(users.role, "%member%"))
        .returning({ id: users.id, preferredName: users.preferredName, role: users.role })

      const mapping = prev.map((_p) => {
        const mapped = dbRes.find(({ id }) => id === _p.id)
        return {
          id: _p.id,
          name: _p.preferredName,
          old_role: _p.role,
          new_role: mapped?.role ?? "not-found",
        }
      })

      console.table(mapping)
      tx.rollback()
    })
  })
  console.log(dbRes.length)

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

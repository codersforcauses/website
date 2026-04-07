import { sql } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { env } from "~/env"
import { db } from "~/server/db"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  let dbHealth
  try {
    const result = await db.execute<{ healthy: boolean }>(sql`SELECT true as healthy`)
    dbHealth = result.rows[0]?.healthy
  } catch (err) {
    dbHealth = false
  }

  return Response.json(
    {
      db: dbHealth,
    },
    { status: dbHealth ? 200 : 503 },
  )
}

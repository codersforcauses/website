import { type ProcedureType } from "@trpc/server"
import { Ratelimit, type RatelimitConfig } from "@upstash/ratelimit"
import { createRedis } from "./redis"
import { type TRPCContext } from "./trpc"

export const createRatelimit = (limiter: RatelimitConfig["limiter"]) =>
  new Ratelimit({
    redis: createRedis(),
    limiter,
    ephemeralCache: new Map(),
    analytics: true,
  })

export const buildIdentifier = ({ ctx, type, path }: { ctx: TRPCContext; type: ProcedureType; path: string }) => {
  return `${ctx.user?.id ?? ctx.ip ?? "unknown"}:${type}:${path}`
}

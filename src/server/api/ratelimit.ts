import { type ProcedureType } from "@trpc/server"
import { Ratelimit, type RatelimitConfig } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { type TRPCContext } from "./trpc"

export const createRatelimit = (limiter: RatelimitConfig["limiter"]) =>
  new Ratelimit({
    redis: Redis.fromEnv(),
    limiter,
    analytics: true,
    ephemeralCache: new Map(),
  })

export const buildIdentifier = ({ ctx, type, path }: { ctx: TRPCContext; type: ProcedureType; path: string }) => {
  return `${ctx.user?.id ?? ctx.ip ?? "unknown"}:${type}:${path}`
}

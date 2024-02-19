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

export const buildIdentifier = (ctx: TRPCContext) => {
  return `${ctx.user?.id ?? ctx.ip ?? "unknown"}:${ctx.method}:${ctx.path}`
}

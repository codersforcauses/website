import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { type TRPCContext } from "./trpc"

export const globalRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10s"),
  analytics: true,
  ephemeralCache: new Map(),
})

export const buildIdentifier = (ctx: TRPCContext) => {
  return `${ctx.user?.id ?? ctx.ip ?? "unknown"}:${ctx.method}:${ctx.path}`
}

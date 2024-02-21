import { type ProcedureType } from "@trpc/server"
import { Ratelimit, type RatelimitConfig } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { type TRPCContext } from "./trpc"
import { env } from "~/env"

export const createRatelimit = (limiter: RatelimitConfig["limiter"]) =>
  new Ratelimit({
    redis: new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
      retry: {
        retries: 5,
        backoff: (retryCount) => Math.exp(retryCount) * 100,
      },
    }),
    limiter,
    ephemeralCache: new Map(),
    analytics: true,
  })

export const buildIdentifier = ({ ctx, type, path }: { ctx: TRPCContext; type: ProcedureType; path: string }) => {
  return `${ctx.user?.id ?? ctx.ip ?? "unknown"}:${type}:${path}`
}

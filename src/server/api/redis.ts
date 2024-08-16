import { Redis } from "@upstash/redis"
import { env } from "~/env"
import { createClient } from "@redis/client"

export const createRedis = () => {
  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
    retry: {
      retries: 5,
      backoff: (retryCount) => Math.exp(retryCount) * 100,
    },
    enableTelemetry: false,
  })

  return redis
}

export const createRedisClient = async () => {
  const client = createClient({
    url: env.REDIS_CLIENT_URL,
  })

  client.on("error", function (err) {
    throw err
  })
  await client.connect()

  return client
}

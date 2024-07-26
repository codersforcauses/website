import * as Sentry from "@sentry/nextjs"

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: "__DSN__",
      // Your Node.js Sentry configuration...
    })
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: "https://237a767d0f7c4a79b052b6df86adb720@o1131895.ingest.sentry.io/6176944",

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    })
  }
}

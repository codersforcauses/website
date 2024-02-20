/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    typedRoutes: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  future: {},
}

// export default config

export default process.env.SKIP_ENV_VALIDATION
  ? config
  : import("@builder.io/react-hydration-overlay/next").then(({ withHydrationOverlay }) =>
      withHydrationOverlay({
        appRootSelector: "main",
      })(config),
    )

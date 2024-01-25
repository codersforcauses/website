export const SITE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://codersforcauses.org"
    : process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000"

export const NAMED_ROLES = ["member", "committee", "past", "honorary", "admin"] as const

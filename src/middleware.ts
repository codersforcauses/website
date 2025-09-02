import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

import { db } from "./server/db"
import { User } from "./server/db/schema"

const adminRoles = ["admin", "committee"]

const isAdminPage = createRouteMatcher(["/dashboard/admin(.*)"])
const isProtectedPage = createRouteMatcher(["/dashboard(.*)", "/profile/settings(.*)"])
const isAuthPage = createRouteMatcher(["/join(.*)", "/create-account(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const clerkId = auth().userId

  if (isAdminPage(req) && clerkId) {
    const user = await db.query.User.findFirst({
      where: eq(User.clerk_id, clerkId),
    })

    if (!adminRoles.includes(user?.role ?? "")) {
      // non-existent clerk role so we go to 404 page cleanly
      auth().protect({
        role: "lmfaooo",
      })
    }
  }

  if (isProtectedPage(req)) {
    auth().protect()
  }

  if (isAuthPage(req) && clerkId) {
    return Response.redirect(new URL("/dashboard", req.url))
  }
})

export const config = {
  matcher: [
    "/",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // // Always run for API routes
    // "/(api|trpc)(.*)",
    // Ignore trpc routes because they are handled by the server
    "/api(.*)",
  ],
}

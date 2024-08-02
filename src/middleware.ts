import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { db } from "./server/db"
import { users } from "./server/db/schema"

const adminRoles = ["admin", "committee"]

const isAdminPage = createRouteMatcher(["/dashboard/admin(.*)"])
const isProtectedPage = createRouteMatcher(["/dashboard(.*)", "/profile/settings(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const userId = auth().userId

  if (isAdminPage(req) && userId) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    console.log("MIDDLEWARE", user)

    if (!adminRoles.includes(user?.role ?? "")) {
      console.log("YOU ARE NOT ADMIN")
      auth().redirectToSignIn()
    }
  }

  if (isProtectedPage(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}

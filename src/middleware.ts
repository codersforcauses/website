import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedPage = createRouteMatcher(["/dashboard(.*)", "/profile/settings(.*)"])
const isAuthPage = createRouteMatcher(["/join(.*)"])

export default clerkMiddleware(async (auth, req) => {
  // Only require authentication for protected pages
  if (isProtectedPage(req)) {
    await auth.protect()
  }

  // Redirect authenticated users away from /join
  const session = await auth()
  const clerkId = session.userId
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

import { authMiddleware } from "@clerk/nextjs"

const publicPages = ["/about", "/verification", "/create-account", "/join"]
const publicAPIRoutes = ["/api/trpc/user.create"]

export default authMiddleware({
  publicRoutes: [...publicPages, ...publicAPIRoutes],
  // ignoredRoutes: ["/(api|trpc)(.*)"],
  debug: true,
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

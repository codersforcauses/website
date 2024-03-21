import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/projects(.*)",
    "/events",
    "/faq",
    "/branding",
    "/create-account",
    "/verification",
    "/join",
    "/api/trpc(.*)", // handled by trpc
  ],
  signInUrl: "/join",
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
}

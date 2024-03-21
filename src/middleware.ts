import { authMiddleware } from "@clerk/nextjs"
import { getUserCookie } from "./app/actions"
import { type User } from "./lib/types"
import { NextResponse } from "next/server"

const adminRoutes = ["/dashboard/admin"]

const adminRoles: Array<User["role"]> = ["admin", "committee"]

export default authMiddleware({
  async afterAuth(auth, req) {
    if (auth.isApiRoute || auth.isPublicRoute) {
      return NextResponse.next() // handled by trpc
    }

    const user = await getUserCookie()
    if (!auth.userId || !user) {
      return NextResponse.redirect(new URL("/join", req.nextUrl.origin))
    }

    if (!auth.isPublicRoute) {
      if (adminRoutes.includes(req.nextUrl.pathname) && !adminRoles.includes(user.role)) {
        return NextResponse.redirect(new URL("/404", req.nextUrl.origin)) // TODO create forbidden page
      }

      return NextResponse.next()
    }

    return NextResponse.next()
  },
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
  ],
  apiRoutes: ["/api/trpc/(.)"],
  signInUrl: "/join",
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
}

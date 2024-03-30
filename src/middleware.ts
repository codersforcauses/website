import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { getUserCookie } from "./app/actions"

const adminRoles = ["admin", "committee"]

const adminPages = ["/dashboard/admin"]
const createAccountPage = ["/create-account"]
const protectedPages = ["/dashboard", "/profile/settings", ...adminPages, ...createAccountPage]

export default authMiddleware({
  async afterAuth(auth, req) {
    if (protectedPages.includes(req.nextUrl.pathname)) {
      const joinURL = new URL("/join", req.nextUrl.origin)
      const dashboardURL = new URL("/dashboard", req.nextUrl.origin)
      if (!auth.userId) {
        return NextResponse.redirect(joinURL)
      }

      if (adminPages.includes(req.nextUrl.pathname)) {
        const user = await getUserCookie()
        if (!adminRoles.includes(user?.role ?? "")) {
          return NextResponse.redirect(dashboardURL)
        } else {
          return NextResponse.next()
        }
      }

      if (!adminPages.includes(req.nextUrl.pathname) && req.nextUrl.pathname !== "/dashboard") {
        return NextResponse.redirect(dashboardURL)
      }
    }
    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
}

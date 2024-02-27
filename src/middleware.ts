import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { getUserCookie, hasUserCookie, removeUserCookie } from "./app/actions"

const adminRoles = ["admin", "committee"]

const adminPages = ["/dashboard/admin"]
const protectedPages = ["/dashboard", "/profile/settings"]

export default authMiddleware({
  async afterAuth(auth, req) {
    // if (!auth.userId && (await hasUserCookie())) {
    //   await removeUserCookie()
    // }
    if (!auth.userId && protectedPages.includes(req.nextUrl.pathname)) {
      const joinURL = new URL("/join", req.nextUrl.origin)
      return NextResponse.redirect(joinURL)
    }
    if (adminPages.includes(req.nextUrl.pathname)) {
      const user = await getUserCookie()
      if (!adminRoles.includes(user?.role ?? "")) {
        const dashboardURL = new URL("/dashboard", req.nextUrl.origin)
        return NextResponse.redirect(dashboardURL)
      }
    }
    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
}

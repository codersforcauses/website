import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

const protectedPages = ["/dashboard", "/dashboard/admin", "/profile/settings"]

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && protectedPages.includes(req.nextUrl.pathname)) {
      const joinURL = new URL("/join", req.nextUrl.origin)
      return NextResponse.redirect(joinURL)
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
}

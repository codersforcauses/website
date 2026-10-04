import { cache } from "react"
import { headers } from "next/headers"

import { auth } from "./auth"

export const getSession = cache(async () => await auth.api.getSession({ headers: await headers() }))

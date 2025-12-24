// ! DO NOT CHANGE DIRECTORY

import { createAuthClient } from "better-auth/react"
import { adminClient, emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins"

import type { auth } from "./auth"
import { ac, admin, committee, member, returning } from "./permissions"

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    emailOTPClient(),
    adminClient({
      ac,
      roles: {
        member,
        committee,
        returning,
        admin,
      },
    }),
  ],
})

import { adminAc, defaultStatements } from "better-auth/plugins/admin/access"
import { createAccessControl } from "better-auth/plugins/access"

export const statement = {
  ...defaultStatements,
  project: ["create", "update", "delete", "apply"],
  vote: ["create", "vote", "list", "update", "delete"],
} as const

export const ac = createAccessControl(statement)

export const member = ac.newRole({
  project: ["apply"],
  vote: ["vote"],
})

export const returning = ac.newRole({
  vote: ["list"],
})

export const committee = ac.newRole({
  ...adminAc.statements,
  project: ["create", "update", "delete"],
  vote: ["vote"],
})

export const admin = ac.newRole({
  ...adminAc.statements,
  project: ["create", "update", "delete"],
  vote: ["create", "list", "update", "delete"],
})

"use client"

import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { enAU } from "date-fns/locale"
import { siDiscord, siGithub } from "simple-icons"
import { match, P } from "ts-pattern"

import type { User as DBUser } from "~/lib/types"
import { authClient } from "~/lib/auth-client"
import { NAMED_ROLES } from "~/lib/constants"
import { AlertDialogTrigger } from "~/ui/alert-dialog"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"

export type User = Omit<DBUser, "emailVerified" | "squareCustomerId" | "subscribe" | "updatedAt">
type NamedRoles = (typeof NAMED_ROLES)[number]

function roleVariant(role: NamedRoles) {
  switch (role) {
    case "admin":
    case "committee":
      return "default"
    case "honorary":
    case "past":
      return "secondary"
    default:
      return "outline"
  }
}

export const columns: ColumnDef<User>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="grid grid-rows-2 gap-px">
        <div className="flex items-center gap-1">
          <span className="font-medium">{row.original.preferredName}</span>
          {row.original.banned && (
            <Tooltip>
              <TooltipTrigger className="size-4">
                <span className="material-symbols-sharp text-base! leading-none!">person_off</span>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex flex-col">
                <span className="text-[0.6rem]">
                  Banned
                  {row.original?.banExpires && <> until {format(row.original.banExpires, "PPpp", { locale: enAU })}</>}
                </span>
                <span>{row.original.banReason}</span>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <span className="text-xs text-neutral-600 dark:text-neutral-400">{row.original.name}</span>
      </div>
    ),
    meta: {
      headerClassName: "w-[--header-name-size] max-w-[--header-name-size] min-w-[--header-name-size]",
      cellClassName: "w-[--col-name-size] max-w-[--col-name-size] min-w-[--col-name-size]",
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
    meta: {
      headerClassName: "w-[--header-email-size] max-w-[--header-email-size] min-w-[--header-email-size]",
      cellClassName: "w-[--col-email-size] max-w-[--col-email-size] min-w-[--col-email-size]",
    },
  },
  {
    id: "pronouns",
    header: "Pronouns",
    accessorKey: "pronouns",
    maxSize: 100,
    enableSorting: false,
    meta: {
      headerClassName: "w-[--header-pronouns-size] max-w-[--header-pronouns-size] min-w-[--header-pronouns-size]",
      cellClassName: "w-[--col-pronouns-size] max-w-[--col-pronouns-size] min-w-[--col-pronouns-size] text-xs",
    },
  },
  {
    id: "roles",
    header: "Roles",
    enableSorting: false,
    cell: ({ row }) => {
      const roles = row.original.role?.split(",") as NamedRoles[]
      return roles ? (
        <div className="flex flex-wrap gap-px">
          {roles.map((role) => (
            <Badge key={role} variant={roleVariant(role)} className="flex-initial">
              {role}
            </Badge>
          ))}
        </div>
      ) : null
    },
    meta: {
      headerClassName: "w-[--header-roles-size] max-w-42 min-w-[--header-roles-size]",
      cellClassName: "w-[--col-roles-size] max-w-42 min-w-[--col-roles-size] select-none",
    },
  },
  {
    id: "university",
    header: "University",
    enableSorting: false,
    accessorFn: (user) => (user.studentNumber ? `${user.studentNumber} (UWA)` : user.university),
    meta: {
      headerClassName: "w-[--header-university-size] max-w-[--header-university-size] min-w-[--header-university-size]",
      cellClassName: "w-[--col-university-size] max-w-[--col-university-size] min-w-[--col-university-size] text-xs",
    },
  },
  {
    id: "socials",
    header: "Socials",
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex flex-wrap gap-px">
          {user.github && (
            <Badge className="flex-initial">
              <svg aria-label="Github logo" viewBox="0 0 24 24" className="fill-current select-none">
                <path d={siGithub.path} />
              </svg>
              {user.github}
            </Badge>
          )}
          {user.discord && (
            <Badge className="flex-initial bg-[#5865F2] dark:bg-[#5865F2] dark:text-neutral-50">
              <svg aria-label="Discord logo" viewBox="0 0 24 24" className="fill-current select-none">
                <path d={siDiscord.path} />
              </svg>
              {user.discord}
            </Badge>
          )}
        </div>
      )
    },
    meta: {
      headerClassName: "w-[--header-socials-size] max-w-52 min-w-[--header-socials-size]",
      cellClassName: "w-[--col-socials-size] max-w-52 min-w-[--col-socials-size]",
    },
  },
  {
    id: "createdAt",
    header: "Date joined",
    cell: ({ row }) => (
      <div className="grid grid-rows-2">
        <span>{format(row.original.createdAt, "PP", { locale: enAU })}</span>
        <span>{format(row.original.createdAt, "p", { locale: enAU })}</span>
      </div>
    ),
    meta: {
      headerClassName: "w-[--header-createdAt-size] max-w-[--header-createdAt-size] min-w-[--header-createdAt-size]",
      cellClassName: "w-[--col-createdAt-size] max-w-[--col-createdAt-size] min-w-[--col-createdAt-size] text-xs",
    },
  },
  {
    id: "actions",
    size: 52,
    enableSorting: false,
    cell: ({ row, table }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-800"
          >
            <Button aria-label={`More actions for ${user.name}`} variant="ghost" size="icon">
              <span aria-hidden className="material-symbols-sharp">
                more_horiz
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(user.id)}>Copy user ID</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/profile/${user.id}`} target="_blank">
                Go to profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem
                    checked={!user.role}
                    onCheckedChange={async () => {
                      await authClient.admin.setRole({
                        userId: user.id,
                        role: "",
                      })

                      table.options.meta?.refetch?.()
                    }}
                  >
                    none
                  </DropdownMenuCheckboxItem>
                  {NAMED_ROLES.map((role) => (
                    <DropdownMenuCheckboxItem
                      key={role}
                      checked={user.role?.toLowerCase().includes(role)}
                      onCheckedChange={async (val) => {
                        // state machine from ts-pattern instead of nested if else
                        const newRole = match({
                          val,
                          role: user.role,
                        })
                          .with({ val: true, role: null }, () => role)
                          .with({ val: true, role: P.not(null) }, () => user.role?.split(",").concat(role))
                          .with({ val: false, role: P.not(null) }, () => user.role?.split(",").filter((r) => r != role))
                          .with({ val: false, role: null }, () => "")
                          .exhaustive()

                        await authClient.admin.setRole({
                          userId: user.id,
                          role: newRole,
                        })
                        table.options.meta?.refetch?.()
                      }}
                    >
                      {role}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            {user.banned ? (
              <DropdownMenuItem
                onSelect={async () => {
                  await authClient.admin.unbanUser({
                    userId: user.id,
                  })
                  table.options.meta?.refetch?.()
                }}
              >
                Unban user
              </DropdownMenuItem>
            ) : (
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => {
                    table.options.meta?.setID?.(user.id)
                    table.options.meta?.setType?.("ban")
                  }}
                >
                  Ban user
                </DropdownMenuItem>
              </AlertDialogTrigger>
            )}

            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => {
                  table.options.meta?.setID?.(user.id)
                  table.options.meta?.setType?.("delete")
                }}
              >
                Delete user
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    meta: {
      headerClassName: "w-[--header-actions-size] max-w-[--header-actions-size] min-w-[--header-actions-size]",
      cellClassName: "w-[--col-actions-size] max-w-[--col-actions-size] min-w-[--col-actions-size]",
    },
  },
]
